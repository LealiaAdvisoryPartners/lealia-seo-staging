// Ported from src/lib/leads.functions.ts (registarLead server function).
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders, json } from "../_shared/valuation/cors.ts";
import { registarEvento } from "../_shared/payments/orquestracao.ts";
import { gerarSlugRelatorio } from "../_shared/valuation/report-slug.ts";
import { buildReportFromLead } from "../_shared/valuation/report-data/index.ts";
import { calcularEnvioRelatorio } from "../_shared/valuation/report-schedule.ts";
import { gerarPdfRelatorio } from "../_shared/valuation/report-pdf.ts";
import {
  enviarConfirmacaoSubmissao,
  notificarEquipaNovoLead,
} from "../_shared/valuation/valuation-email.ts";

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test((v ?? "").trim());

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);

  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return json({ ok: false, error: "Dados inválidos" }, 400);
  }

  if (!data || typeof data !== "object") return json({ ok: false, error: "Dados inválidos" }, 400);

  const nome = String(data.nome ?? "").trim();
  const empresa = String(data.empresa ?? "").trim();
  const telefone = String(data.telefone ?? "").trim();
  const cargo = String(data.cargo ?? "").trim();
  const email = String(data.email ?? "");

  if (!nome || !empresa || !telefone || !cargo || !emailOk(email)) {
    return json({ ok: false, error: "Dados de contacto inválidos" }, 400);
  }
  if (!data.consentimento_rgpd) return json({ ok: false, error: "Consentimento em falta" }, 400);

  // Honeypot: bots preenchem, humanos não.
  const hp = typeof data.hp === "string" ? data.hp : "";
  if (hp.trim() !== "") return json({ ok: true, emailEnviado: false });

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { hp: _hp, origin: origemBruta, ...lead } = data as Record<string, unknown> & { origin?: string };

  const { data: inserido, error } = await supabaseAdmin.from("leads").insert(lead).select("*").single();
  if (error) {
    console.error("Falha ao gravar lead", error.message);
    return json({ ok: false, emailEnviado: false }, 500);
  }

  const linha = inserido as Record<string, unknown>;

  // Cópia estática do relatório: fica congelada no momento da criação.
  let relatorioDados: unknown = null;
  try {
    const { email: _e, telefone: _t, ...resto } = linha;
    const idioma = lead.idioma === "en" || lead.idioma === "es" ? lead.idioma : "pt";
    relatorioDados = buildReportFromLead(resto as never, idioma);
  } catch (e) {
    console.error("Falha ao construir relatório estático", e);
  }

  let slug: string | null = null;
  for (let tentativa = 0; tentativa < 5 && !slug; tentativa++) {
    // 1ª tentativa: sufixo determinístico (últimos 4 caracteres do id do lead).
    const candidato = gerarSlugRelatorio(
      String(lead.empresa ?? ""),
      tentativa === 0 ? String(inserido.id) : null,
    );
    const { error: slugError } = await supabaseAdmin
      .from("leads")
      .update({ relatorio_slug: candidato, relatorio_dados: relatorioDados as never })
      .eq("id", inserido.id);
    if (!slugError) slug = candidato;
    else if (!slugError.message.includes("duplicate")) {
      console.error("Falha ao gravar slug do relatório", slugError.message);
      break;
    }
  }

  const identificador = slug ?? (linha["relatorio_token"] as string);

  const origin = typeof origemBruta === "string" && origemBruta ? origemBruta : req.headers.get("origin") ?? "";
  const base = origin.replace(/\/$/, "");
  // Link limpo, na raiz do domínio: lealiaap.com/empresa-abcd
  const relatorioUrl = base ? `${base}/${identificador}` : null;
  const relatorioAdminUrl = relatorioUrl ? `${relatorioUrl}?k=${linha["relatorio_token_admin"] as string}` : null;

  // Geração opcional do PDF (só quando existe serviço de conversão configurado).
  let pdfUrl: string | null = null;
  let pdfAdminUrl: string | null = null;
  if (relatorioUrl && relatorioAdminUrl) {
    pdfUrl = await gerarPdfRelatorio(inserido.id, relatorioUrl);
    pdfAdminUrl = await gerarPdfRelatorio(inserido.id, relatorioAdminUrl, "admin");
    if (pdfUrl || pdfAdminUrl) {
      await supabaseAdmin
        .from("leads")
        .update({ relatorio_estado: "gerado", relatorio_gerado_em: new Date().toISOString() })
        .eq("id", inserido.id);
    }
  }

  // O utilizador recebe já a confirmação; o sample fica elegível 16h depois.
  // O envio efetivo ocorre na execução diária seguinte do job de relatórios.
  const agendadoPara = calcularEnvioRelatorio(new Date());

  await supabaseAdmin
    .from("leads")
    .update({ relatorio_url: relatorioUrl, email_relatorio_agendado_para: agendadoPara.toISOString() })
    .eq("id", inserido.id);

  const emailEnviado = await enviarConfirmacaoSubmissao(inserido.id, {
    nome: String(lead.nome ?? ""),
    email: String(lead.email ?? ""),
    empresa: String(lead.empresa ?? ""),
    calculo_possivel: !!lead.calculo_possivel,
    idioma: typeof lead.idioma === "string" ? lead.idioma : "pt",
  });
  await notificarEquipaNovoLead(inserido.id, lead as Record<string, unknown>, relatorioAdminUrl, pdfAdminUrl);

  await registarEvento(supabaseAdmin, "submission_created", {
    submissionId: inserido.id as string,
    detalhes: { empresa: lead.empresa ?? null, idioma: lead.idioma ?? "pt" },
  });

  return json({ ok: true, emailEnviado, relatorioUrl, pdfUrl, ref: identificador });
});
