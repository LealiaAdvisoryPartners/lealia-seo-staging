/**
 * Inicia o pagamento do relatório completo (299€) via Stripe Checkout
 * (cartão, Apple Pay, Google Pay). Aceita a submissão por `ref`: o slug do
 * relatório ou o token público. Cria um registo `payments` "pending" ligado ao
 * `submission_id`, com uma referência curta enviada à Stripe.
 */
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders, json } from "../_shared/valuation/cors.ts";
import { MOEDA, PRECO_RELATORIO_COMPLETO, criarSessaoCheckout, gerarOrderId } from "../_shared/payments/stripe.ts";
import { registarEvento } from "../_shared/payments/orquestracao.ts";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SLUG = /^[a-z0-9-]{3,60}$/;
const IDIOMAS = new Set(["pt", "en", "es"]);

const texto = (v: unknown, max: number) => {
  const s = String(v ?? "").trim();
  return s ? s.slice(0, max) : null;
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, erro: "invalido" }, 400);
  }

  const ref = String(body.ref ?? "").trim();
  if (!ref || (!UUID.test(ref) && !SLUG.test(ref))) return json({ ok: false, erro: "referencia_invalida" }, 400);

  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  const coluna = UUID.test(ref) ? "relatorio_token" : "relatorio_slug";
  const { data: lead, error } = await admin.from("leads").select("*").eq(coluna, ref).maybeSingle();
  if (error || !lead) return json({ ok: false, erro: "submissao_inexistente" }, 404);
  if (lead.status === "full_paid") return json({ ok: false, erro: "ja_pago" }, 409);

  const idioma = IDIOMAS.has(String(body.idioma)) ? (String(body.idioma) as "pt" | "en" | "es") : (lead.idioma ?? "pt");
  const base = (texto(body.origin, 200) ?? req.headers.get("origin") ?? "https://lealiaap.com").replace(/\/$/, "");
  const orderId = gerarOrderId();
  const nif = texto(body.nif, 20);

  const { data: pagamento, error: erroPagamento } = await admin
    .from("payments")
    .insert({
      submission_id: lead.id as string,
      ifthenpay_order_id: orderId,
      method: "credit_card",
      status: "pending",
      amount: PRECO_RELATORIO_COMPLETO,
      currency: MOEDA,
      nif,
      nome_fiscal: texto(body.nome_fiscal, 160),
      morada_fiscal: texto(body.morada_fiscal, 300),
      fatura_estado: nif ? "pendente" : "nao_aplicavel",
    })
    .select("*")
    .single();

  if (erroPagamento || !pagamento) {
    console.error("Falha a criar pagamento", erroPagamento?.message);
    return json({ ok: false, erro: "falha_registo" }, 500);
  }

  // O retorno devolve sempre o cliente ao checkout, nunca ao relatório
  // (que só é libertado no seu horário próprio).
  const refPublica = String(lead.relatorio_slug ?? lead.relatorio_token ?? "");
  const checkout = `${base}/${idioma}/upgrade?ref=${encodeURIComponent(refPublica)}`;

  try {
    const sessao = await criarSessaoCheckout({
      orderId,
      submissionId: lead.id as string,
      email: String(lead.email ?? ""),
      idioma,
      descricao: `Relatório completo de avaliação${lead.empresa ? ` — ${String(lead.empresa).slice(0, 60)}` : ""}`,
      successUrl: `${checkout}&pagamento=sucesso&pedido=${orderId}`,
      cancelUrl: `${checkout}&pagamento=cancelado`,
    });

    await admin.from("payments").update({ request_id: sessao.id }).eq("id", pagamento.id);
    await registarEvento(admin, "payment_initiated", {
      submissionId: lead.id as string,
      paymentId: pagamento.id,
      detalhes: { orderId, sessao: sessao.id },
    });

    return json({ ok: true, orderId, paymentId: pagamento.id, paymentUrl: sessao.url });
  } catch (e) {
    const motivo = e instanceof Error ? e.message : String(e);
    console.error(`Falha a iniciar pagamento ${orderId}`, motivo);
    await admin
      .from("payments")
      .update({ status: "failed", payment_details: { erro: motivo.slice(0, 500) } })
      .eq("id", pagamento.id);
    await registarEvento(admin, "payment_failed", {
      submissionId: lead.id as string,
      paymentId: pagamento.id,
      detalhes: { orderId, motivo: motivo.slice(0, 500) },
    });
    return json({ ok: false, erro: "falha_gateway" }, 502);
  }
});
