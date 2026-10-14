// Job diário (08:53 Lisboa): liberta os relatórios cuja hora (n+2) chegou —
// completo para quem pagou antes, sample para quem não pagou.
// Reservas atómicas garantem um único envio por lead, mesmo com sobreposição.
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders, json } from "../_shared/valuation/cors.ts";
import { calcularExpiracaoRelatorio, HORA_ENVIO_LISBOA, horaLisboa } from "../_shared/valuation/report-schedule.ts";
import { enviarResumoAvaliacao } from "../_shared/valuation/valuation-email.ts";
import { entregarRelatorioCompleto, registarEvento, reservarEnvioResumo } from "../_shared/payments/orquestracao.ts";

const LOTE = 20;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);

  // Agendador (pg_cron) autentica-se com a chave publicável; RELATORIOS_CRON_KEY
  // é a chave privilegiada (única que permite forçar fora da hora).
  // O lote é idempotente e só envia relatórios cuja hora já chegou.
  const chave = Deno.env.get("RELATORIOS_CRON_KEY");
  const auth = req.headers.get("authorization") ?? "";
  const apikey = req.headers.get("apikey") ?? "";
  const publicas = [Deno.env.get("SUPABASE_ANON_KEY"), ...(() => {
    try { return Object.values(JSON.parse(Deno.env.get("SUPABASE_PUBLISHABLE_KEYS") ?? "{}")) as string[]; } catch { return []; }
  })()].filter(Boolean) as string[];
  const privilegiado = !!chave && auth === `Bearer ${chave}`;
  const agendador = publicas.some((k) => auth === `Bearer ${k}` || apikey === k);
  if (!privilegiado && !agendador) return json({ ok: false, error: "Unauthorized" }, 401);

  // O agendador corre às 07:53 e 08:53 UTC; só a execução das 8h de Lisboa atua
  // (cobre horário de verão e de inverno).
  const forcar = privilegiado && new URL(req.url).searchParams.get("forcar") === "1";
  if (!forcar && horaLisboa() !== HORA_ENVIO_LISBOA) {
    return json({ ok: true, ignorado: "fora_da_hora_lisboa" });
  }

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const agora = new Date();

  // 1) Relatórios completos pagos antes da hora de libertação.
  const { data: pagos } = await supabaseAdmin
    .from("leads")
    .select("*")
    .eq("status", "full_paid")
    .is("full_report_enviado_em", null)
    .lte("email_relatorio_agendado_para", agora.toISOString())
    .limit(LOTE);
  let completosEnviados = 0;
  for (const lead of pagos ?? []) {
    try {
      if (await entregarRelatorioCompleto(supabaseAdmin, lead as Record<string, unknown>)) completosEnviados++;
    } catch (e) {
      console.error(`Falha ao entregar relatório completo do lead ${lead.id}`, e instanceof Error ? e.message : e);
    }
  }

  // 2) Samples para quem não pagou.
  const { data: pendentes, error } = await supabaseAdmin
    .from("leads")
    .select("*")
    .eq("status", "pending")
    .is("email_relatorio_enviado_em", null)
    .not("email_relatorio_agendado_para", "is", null)
    .lte("email_relatorio_agendado_para", agora.toISOString())
    .eq("calculo_possivel", true)
    .order("email_relatorio_agendado_para", { ascending: true })
    .limit(LOTE);

  if (error) {
    console.error("Falha a ler relatórios pendentes", error.message);
    return json({ ok: false, erro: error.message }, 500);
  }

  let enviados = 0;
  let travadosPorPagamento = 0;
  for (const lead of pendentes ?? []) {
    const linha = lead as Record<string, unknown>;
    const id = linha["id"] as string;

    await registarEvento(supabaseAdmin, "sample_send_attempted", { submissionId: id });

    // REGRA DURA: a reserva é condicional ao estado "pending" no instante exato do
    // envio. Se o relatório completo foi pago entretanto, o resumo nunca sai.
    const reservado = await reservarEnvioResumo(supabaseAdmin, id);
    if (!reservado) {
      travadosPorPagamento++;
      await registarEvento(supabaseAdmin, "sample_send_skipped_paid", { submissionId: id });
      continue;
    }

    const relatorioUrl = (linha["relatorio_url"] as string | null) ?? null;
    const pdfUrl = (linha["relatorio_pdf_url"] as string | null) ?? null;

    let ok = false;
    try {
      ok = await enviarResumoAvaliacao(supabaseAdmin, id, linha, relatorioUrl, pdfUrl);
    } catch (e) {
      console.error(`Falha inesperada ao enviar resumo do lead ${id}`, e instanceof Error ? e.message : e);
    }

    await supabaseAdmin
      .from("leads")
      .update({
        relatorio_expira_em: calcularExpiracaoRelatorio(new Date()).toISOString(),
        ...(ok ? { relatorio_estado: "enviado", relatorio_enviado_em: new Date().toISOString() } : {}),
      })
      .eq("id", id);

    if (ok) {
      enviados++;
      await registarEvento(supabaseAdmin, "sample_sent", { submissionId: id, detalhes: { relatorioUrl } });
    }
  }

  return json({ ok: true, processados: pendentes?.length ?? 0, enviados, travadosPorPagamento, completosEnviados });
});
