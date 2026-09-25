// Ported from src/lib/report.functions.ts (obterRelatorio server function).
// Public endpoint: returns the fixed report snapshot for a lead by token (readable
// slug or legacy uuid). Public callers only ever get the "teaser" version, unless
// they present the correct admin key (`chave`), in which case they get the "completo"
// version. Never exposes email/telefone/relatorio_token_admin.
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders, json } from "../_shared/valuation/cors.ts";
import { buildReportFromLead, redigirRelatorioTeaser, type ReportData, type ReportLead } from "../_shared/valuation/report-data/index.ts";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SLUG = /^[a-z0-9-]{3,60}$/;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, motivo: "invalido" }, 400);
  }
  if (!body || typeof body !== "object") return json({ ok: false, motivo: "invalido" }, 400);

  const token = String(body.token ?? "").trim();
  if (!token || (!UUID.test(token) && !SLUG.test(token))) {
    return json({ ok: false, motivo: "invalido" }, 400);
  }
  const chaveBruta = typeof body.chave === "string" ? body.chave : null;
  const chave = chaveBruta && UUID.test(chaveBruta) ? chaveBruta : null;

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const coluna = UUID.test(token) ? "relatorio_token" : "relatorio_slug";
  const { data: lead, error } = await supabaseAdmin
    .from("leads")
    .select("*")
    .eq(coluna, token)
    .maybeSingle();

  if (error || !lead) return json({ ok: false, motivo: "inexistente" });

  const linha = lead as Record<string, unknown>;
  // Acesso completo: chave interna da equipa, ou chave do comprador numa
  // submissão cujo relatório completo já foi pago.
  const chaveAdmin = chave === (linha["relatorio_token_admin"] as string | null);
  const chaveComprador =
    chave === (linha["full_report_token"] as string | null) && linha["status"] === "full_paid";
  const completo = !!chave && (chaveAdmin || chaveComprador);

  // Maturação: antes da libertação (D+2 às 08:53) o link público não revela
  // nada. Só a equipa (chave admin) ou o comprador com relatório já entregue.
  if (!completo && !linha["email_relatorio_enviado_em"]) {
    return json({ ok: false, motivo: "em_preparacao" });
  }

  const expiraEm = linha["relatorio_expira_em"] as string | null;
  if (!completo && expiraEm && new Date(expiraEm).getTime() < Date.now()) {
    return json({ ok: false, motivo: "expirado" });
  }

  const { email: _e, telefone: _t, relatorio_token_admin: _a, ...resto } = linha;
  const guardado = linha["relatorio_dados"] as ReportData | null;
  const relatorio = guardado ?? buildReportFromLead(resto as unknown as ReportLead);

  return json({
    ok: true,
    modo: completo ? "completo" : "teaser",
    estado: (linha["status"] as string | null) ?? "pending",
    ref: (linha["relatorio_slug"] as string | null) ?? (linha["relatorio_token"] as string),
    pdfUrl: completo
      ? ((linha["relatorio_pdf_admin_url"] as string | null) ?? null)
      : ((linha["relatorio_pdf_url"] as string | null) ?? null),
    relatorio: completo ? relatorio : redigirRelatorioTeaser(relatorio),
  });
});
