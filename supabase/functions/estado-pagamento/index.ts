/**
 * Consulta do estado de um pagamento, usada pelo ecrã de checkout enquanto
 * o cliente autoriza na app MB WAY ou volta da gateway de cartão.
 *
 * Para MB WAY também interroga a ifthenpay: se o pagamento já estiver liquidado
 * e o callback ainda não tiver chegado, confirma-o aqui (mesmo caminho idempotente).
 */
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders, json } from "../_shared/valuation/cors.ts";
import { estadoMbway } from "../_shared/payments/ifthenpay.ts";
import { confirmarPagamento } from "../_shared/payments/orquestracao.ts";

const ORDER_ID = /^[A-Z0-9]{4,15}$/;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, erro: "invalido" }, 400);
  }

  const orderId = String(body.orderId ?? "").trim().toUpperCase();
  if (!ORDER_ID.test(orderId)) return json({ ok: false, erro: "referencia_invalida" }, 400);

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data: pagamento } = await supabaseAdmin
    .from("payments")
    .select("id, submission_id, method, status, request_id")
    .eq("ifthenpay_order_id", orderId)
    .maybeSingle();

  if (!pagamento) return json({ ok: false, erro: "inexistente" }, 404);

  if (pagamento.status === "pending" && pagamento.method === "mbway" && pagamento.request_id) {
    try {
      const estado = await estadoMbway(pagamento.request_id);
      if (estado === "paid") {
        await confirmarPagamento(supabaseAdmin, orderId, {
          requestId: pagamento.request_id,
          origem: "sondagem",
        });
        return json({ ok: true, estado: "paid" });
      }
      if (estado === "failed") {
        await supabaseAdmin.from("payments").update({ status: "failed" }).eq("id", pagamento.id).eq("status", "pending");
        return json({ ok: true, estado: "failed" });
      }
    } catch (e) {
      console.error(`Falha a consultar MB WAY ${orderId}`, e instanceof Error ? e.message : e);
    }
  }

  const { data: atual } = await supabaseAdmin
    .from("payments")
    .select("status")
    .eq("ifthenpay_order_id", orderId)
    .maybeSingle();

  return json({ ok: true, estado: atual?.status ?? pagamento.status });
});
