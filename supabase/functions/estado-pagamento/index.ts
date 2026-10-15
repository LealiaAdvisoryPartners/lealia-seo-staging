/**
 * Consulta do estado de um pagamento, usada pelo checkout quando o cliente volta
 * da Stripe. Se a sessão já estiver paga e o webhook ainda não tiver chegado,
 * confirma-a aqui (mesmo caminho idempotente).
 */
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders, json } from "../_shared/valuation/cors.ts";
import { obterSessao } from "../_shared/payments/stripe.ts";
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

  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  const { data: pagamento } = await admin
    .from("payments")
    .select("id, status, request_id, submission_id, amount, currency")
    .eq("ifthenpay_order_id", orderId)
    .maybeSingle();
  if (!pagamento) return json({ ok: false, erro: "inexistente" }, 404);

  // Dados reais da compra confirmada (para o evento purchase); sem dados pessoais.
  const compra = async () => {
    const { data } = await admin.from("payments").select("status, amount, currency").eq("id", pagamento.id).maybeSingle();
    const valor = Number(data?.amount);
    const moeda = String(data?.currency ?? "").toUpperCase();
    if (data?.status !== "paid" || !Number.isFinite(valor) || valor <= 0 || !/^[A-Z]{3}$/.test(moeda)) return undefined;
    return { transaction_id: orderId, value: valor, currency: moeda, payment_status: "paid" as const };
  };

  // O relatório completo só está disponível depois da libertação (mesma regra dos e-mails).
  const disponibilidade = async () => {
    const { data: lead } = await admin
      .from("leads")
      .select("email_relatorio_agendado_para, full_report_enviado_em")
      .eq("id", pagamento.submission_id)
      .maybeSingle();
    if (!lead) return false;
    if (lead.full_report_enviado_em) return true;
    const libertacao = lead.email_relatorio_agendado_para as string | null;
    return !libertacao || new Date(libertacao) <= new Date();
  };

  if (pagamento.status === "pending" && pagamento.request_id?.startsWith("cs_")) {
    try {
      const sessao = await obterSessao(pagamento.request_id);
      if (sessao.pago) {
        await confirmarPagamento(admin, orderId, {
          requestId: sessao.id,
          montante: sessao.montante,
          origem: "sondagem",
          detalhes: { paymentIntent: sessao.paymentIntent },
        });
        return json({ ok: true, estado: "paid", disponivel: await disponibilidade(), compra: await compra() });
      }
      if (sessao.expirada) {
        await admin.from("payments").update({ status: "expired" }).eq("id", pagamento.id).eq("status", "pending");
        return json({ ok: true, estado: "expired" });
      }
    } catch (e) {
      console.error(`Falha a consultar Stripe ${orderId}`, e instanceof Error ? e.message : e);
    }
  }

  const disponivel = pagamento.status === "paid" ? await disponibilidade() : false;
  return json({ ok: true, estado: pagamento.status, disponivel, ...(pagamento.status === "paid" ? { compra: await compra() } : {}) });
});
