// Ported from src/routes/api/public/enviar-relatorios.ts.
// Batch job: sends the scheduled "resumo de avaliação" email to leads whose
// send time has arrived. Invoked every 15 minutes by pg_cron (see migration).
// Reservation pattern (`update ... .is("email_relatorio_enviado_em", null)`) guarantees
// a lead is never emailed twice, even if the job overlaps itself or retries.
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders, json } from "../_shared/valuation/cors.ts";
import { calcularExpiracaoRelatorio } from "../_shared/valuation/report-schedule.ts";
import { enviarResumoAvaliacao } from "../_shared/valuation/valuation-email.ts";

const LOTE = 20;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);

  // Só o agendador (pg_cron) pode disparar este lote.
  const chave = Deno.env.get("RELATORIOS_CRON_KEY");
  const auth = req.headers.get("authorization") ?? "";
  if (!chave || auth !== `Bearer ${chave}`) return json({ ok: false, error: "Unauthorized" }, 401);


  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const agora = new Date();
  const { data: pendentes, error } = await supabaseAdmin
    .from("leads")
    .select("*")
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
  for (const lead of pendentes ?? []) {
    const linha = lead as Record<string, unknown>;
    const id = linha["id"] as string;

    // Segurança: não envia relatório quando o cálculo não foi possível.
    if (linha["calculo_possivel"] !== true) {
      await supabaseAdmin
        .from("leads")
        .update({ email_relatorio_enviado_em: new Date().toISOString() })
        .eq("id", id)
        .is("email_relatorio_enviado_em", null);
      console.info(`Lead ${id} ignorado: cálculo não possível`);
      continue;
    }

    // Marca já a tentativa para garantir que não há envios duplicados.
    const { error: reservaErro } = await supabaseAdmin
      .from("leads")
      .update({ email_relatorio_enviado_em: new Date().toISOString() })
      .eq("id", id)
      .is("email_relatorio_enviado_em", null);
    if (reservaErro) {
      console.error(`Falha a reservar envio do lead ${id}`, reservaErro.message);
      continue;
    }

    const relatorioUrl = (linha["relatorio_url"] as string | null) ?? null;
    const pdfUrl = (linha["relatorio_pdf_url"] as string | null) ?? null;

    let ok = false;
    try {
      ok = await enviarResumoAvaliacao(supabaseAdmin, id, linha, relatorioUrl, pdfUrl);
    } catch (e) {
      // Nunca deve travar o lote: regista e continua com o próximo lead.
      console.error(`Falha inesperada ao enviar resumo do lead ${id}`, e instanceof Error ? e.message : e);
    }

    await supabaseAdmin
      .from("leads")
      .update({
        // 7 dias de validade a contar do momento em que o utilizador recebe o link.
        relatorio_expira_em: calcularExpiracaoRelatorio(new Date()).toISOString(),
        ...(ok
          ? { relatorio_estado: "enviado", relatorio_enviado_em: new Date().toISOString() }
          : {}),
      })
      .eq("id", id);

    if (ok) enviados++;
  }

  return json({ ok: true, processados: pendentes?.length ?? 0, enviados });
});
