/**
 * Callback da ifthenpay (HTTP GET), comum a MB WAY e cartão:
 *   ?chave=<anti-phishing>&orderId=<ref>&amount=<valor>&requestId=<id>&datahora=<data>
 *
 * A ifthenpay repete a chamada até receber 200, por isso todo o fluxo é
 * idempotente: um pagamento já confirmado devolve 200 sem reenviar nada.
 */
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/valuation/cors.ts";
import { confirmarPagamento } from "../_shared/payments/orquestracao.ts";

const ok = (corpo: string) =>
  new Response(corpo, { status: 200, headers: { ...corsHeaders, "Content-Type": "text/plain" } });

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const url = new URL(req.url);
  const p = url.searchParams;

  const chaveEsperada = Deno.env.get("IFTHENPAY_ANTIPHISHING_KEY");
  if (!chaveEsperada) {
    console.error("IFTHENPAY_ANTIPHISHING_KEY não configurada");
    return new Response("misconfigured", { status: 500, headers: corsHeaders });
  }
  if (p.get("chave") !== chaveEsperada) {
    console.warn("Callback ifthenpay com chave inválida");
    return new Response("forbidden", { status: 403, headers: corsHeaders });
  }

  const orderId = (p.get("orderId") ?? p.get("order_id") ?? "").trim();
  if (!orderId) return new Response("missing orderId", { status: 400, headers: corsHeaders });

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const resultado = await confirmarPagamento(supabaseAdmin, orderId, {
    requestId: p.get("requestId"),
    montante: p.get("amount"),
    origem: "webhook",
    detalhes: Object.fromEntries(p.entries()),
  });

  if (!resultado.ok && resultado.motivo === "pagamento_inexistente") {
    console.error(`Callback ifthenpay para orderId desconhecido: ${orderId}`);
    return new Response("unknown order", { status: 404, headers: corsHeaders });
  }
  if (!resultado.ok) {
    console.error(`Falha a processar callback ${orderId}: ${resultado.motivo}`);
    return new Response("error", { status: 500, headers: corsHeaders });
  }

  return ok("OK");
});
