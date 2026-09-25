/**
 * Inicia o pagamento do relatório completo (299€) para uma submissão.
 *
 * Aceita a submissão por `ref`: o slug legível do relatório ou o token público.
 * Cria sempre um registo em `payments` com estado "pending", ligado ao
 * `submission_id`, e envia essa referência curta à ifthenpay como `orderId`.
 */
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders, json } from "../_shared/valuation/cors.ts";
import {
  MOEDA,
  PRECO_RELATORIO_COMPLETO,
  gerarOrderId,
  iniciarCartao,
  iniciarMbway,
  normalizarTelemovel,
  type MetodoPagamento,
} from "../_shared/payments/ifthenpay.ts";
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
  const metodo = String(body.metodo ?? "") as MetodoPagamento;
  if (!ref || (!UUID.test(ref) && !SLUG.test(ref))) return json({ ok: false, erro: "referencia_invalida" }, 400);
  if (metodo !== "mbway" && metodo !== "credit_card") return json({ ok: false, erro: "metodo_invalido" }, 400);

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const coluna = UUID.test(ref) ? "relatorio_token" : "relatorio_slug";
  const { data: lead, error } = await supabaseAdmin.from("leads").select("*").eq(coluna, ref).maybeSingle();
  if (error || !lead) return json({ ok: false, erro: "submissao_inexistente" }, 404);

  if (lead.status === "full_paid") {
    return json({ ok: false, erro: "ja_pago" }, 409);
  }

  const idioma = IDIOMAS.has(String(body.idioma)) ? (String(body.idioma) as "pt" | "en" | "es") : (lead.idioma ?? "pt");
  const origin = texto(body.origin, 200) ?? req.headers.get("origin") ?? "";
  const base = origin.replace(/\/$/, "");
  const orderId = gerarOrderId();
  const descricao = `Relatorio completo de avaliacao${lead.empresa ? ` - ${String(lead.empresa).slice(0, 60)}` : ""}`;

  const registo = {
    submission_id: lead.id as string,
    ifthenpay_order_id: orderId,
    method: metodo,
    status: "pending",
    amount: PRECO_RELATORIO_COMPLETO,
    currency: MOEDA,
    nif: texto(body.nif, 20),
    nome_fiscal: texto(body.nome_fiscal, 160),
    morada_fiscal: texto(body.morada_fiscal, 300),
    fatura_estado: texto(body.nif, 20) ? "pendente" : "nao_aplicavel",
  };

  const { data: pagamento, error: erroPagamento } = await supabaseAdmin
    .from("payments")
    .insert(registo)
    .select("*")
    .single();

  if (erroPagamento || !pagamento) {
    console.error("Falha a criar pagamento", erroPagamento?.message);
    return json({ ok: false, erro: "falha_registo" }, 500);
  }

  try {
    if (metodo === "mbway") {
      const telemovel = normalizarTelemovel(String(body.telemovel ?? lead.telefone ?? ""));
      if (!telemovel) {
        await supabaseAdmin.from("payments").update({ status: "failed" }).eq("id", pagamento.id);
        return json({ ok: false, erro: "telemovel_invalido" }, 400);
      }

      const resposta = await iniciarMbway({
        orderId,
        montante: PRECO_RELATORIO_COMPLETO,
        telemovel,
        email: String(lead.email ?? ""),
        descricao,
      });

      await supabaseAdmin
        .from("payments")
        .update({ request_id: resposta.requestId, payment_details: { inicio: resposta.detalhes } })
        .eq("id", pagamento.id);

      await registarEvento(supabaseAdmin, "payment_initiated", {
        submissionId: lead.id as string,
        paymentId: pagamento.id,
        detalhes: { orderId, metodo, telemovel },
      });

      return json({ ok: true, metodo, orderId, paymentId: pagamento.id });
    }

    // O retorno da gateway devolve sempre o cliente ao checkout, nunca
    // diretamente ao relatório (que só é libertado no seu horário próprio).
    const raiz = base || "https://lealiaap.com";
    const refPublica = String(lead.relatorio_slug ?? lead.relatorio_token ?? "");
    const checkout = `${raiz}/${idioma}/upgrade?ref=${encodeURIComponent(refPublica)}`;
    const resposta = await iniciarCartao({
      orderId,
      montante: PRECO_RELATORIO_COMPLETO,
      idioma,
      successUrl: `${checkout}&pagamento=sucesso`,
      errorUrl: `${checkout}&pagamento=erro`,
      cancelUrl: `${checkout}&pagamento=cancelado`,
      descricao,
    });

    await supabaseAdmin
      .from("payments")
      .update({ request_id: resposta.requestId, payment_details: { inicio: resposta.detalhes } })
      .eq("id", pagamento.id);

    await registarEvento(supabaseAdmin, "payment_initiated", {
      submissionId: lead.id as string,
      paymentId: pagamento.id,
      detalhes: { orderId, metodo },
    });

    return json({ ok: true, metodo, orderId, paymentId: pagamento.id, paymentUrl: resposta.paymentUrl });
  } catch (e) {
    const motivo = e instanceof Error ? e.message : String(e);
    console.error(`Falha a iniciar pagamento ${orderId}`, motivo);
    await supabaseAdmin
      .from("payments")
      .update({ status: "failed", payment_details: { erro: motivo.slice(0, 500) } })
      .eq("id", pagamento.id);
    await registarEvento(supabaseAdmin, "payment_failed", {
      submissionId: lead.id as string,
      paymentId: pagamento.id,
      detalhes: { orderId, metodo, motivo: motivo.slice(0, 500) },
    });
    return json({ ok: false, erro: "falha_gateway" }, 502);
  }
});
