/**
 * Webhook da Stripe (checkout.session.completed / async_payment_succeeded).
 * Não confia no payload: relê a sessão na API da Stripe com a chave secreta e só
 * confirma se estiver paga. Confirmação idempotente (repetições não reenviam nada).
 */
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/valuation/cors.ts";
import { obterSessao } from "../_shared/payments/stripe.ts";
import { confirmarPagamento } from "../_shared/payments/orquestracao.ts";

const resposta = (corpo: string, status = 200) =>
  new Response(corpo, { status, headers: { ...corsHeaders, "Content-Type": "text/plain" } });

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return resposta("method not allowed", 405);

  let evento: { type?: string; data?: { object?: { id?: string; object?: string } } };
  try {
    evento = await req.json();
  } catch {
    return resposta("invalid", 400);
  }

  const objeto = evento.data?.object;
  if (objeto?.object !== "checkout.session" || !objeto.id?.startsWith("cs_")) return resposta("ignored");

  try {
    const sessao = await obterSessao(objeto.id);
    if (!sessao.pago || !sessao.orderId) return resposta("not paid");
    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const r = await confirmarPagamento(admin, sessao.orderId, {
      requestId: sessao.id,
      montante: sessao.montante,
      origem: "stripe_webhook",
      detalhes: { evento: evento.type ?? null, paymentIntent: sessao.paymentIntent },
    });
    return resposta(r.ok ? "ok" : `error: ${r.motivo}`, r.ok ? 200 : 500);
  } catch (e) {
    console.error("Falha no webhook Stripe", e instanceof Error ? e.message : e);
    return resposta("error", 500);
  }
});
