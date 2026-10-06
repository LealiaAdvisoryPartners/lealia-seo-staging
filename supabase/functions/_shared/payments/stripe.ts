/**
 * Cliente mínimo da API Stripe (conta própria da Lealia) para o Checkout alojado:
 * cartão, Apple Pay e Google Pay. O `orderId` curto (guardado em
 * `payments.ifthenpay_order_id`, nome histórico) segue como `client_reference_id`.
 */

export const PRECO_RELATORIO_COMPLETO = 299.0;
export const MOEDA = "EUR";

const BASE = "https://api.stripe.com/v1";
const ALFABETO = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";

/** Referência curta e única: "LP" + 10 caracteres. */
export function gerarOrderId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(10));
  let s = "";
  for (const b of bytes) s += ALFABETO[b % ALFABETO.length];
  return `LP${s}`;
}

async function stripe(caminho: string, corpo?: Record<string, string>): Promise<Record<string, unknown>> {
  const chave = Deno.env.get("STRIPE_SECRET_KEY");
  if (!chave) throw new Error("STRIPE_SECRET_KEY não configurada");
  const resposta = await fetch(`${BASE}${caminho}`, {
    method: corpo ? "POST" : "GET",
    headers: { Authorization: `Bearer ${chave}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: corpo ? new URLSearchParams(corpo) : undefined,
  });
  const dados = await resposta.json();
  if (!resposta.ok) throw new Error(`Stripe ${resposta.status}: ${JSON.stringify(dados).slice(0, 300)}`);
  return dados;
}

/** Cria a sessão de Checkout e devolve o endereço de pagamento. */
export async function criarSessaoCheckout(opcoes: {
  orderId: string;
  submissionId: string;
  email: string;
  idioma: "pt" | "en" | "es";
  descricao: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<{ id: string; url: string }> {
  const sessao = await stripe("/checkout/sessions", {
    mode: "payment",
    client_reference_id: opcoes.orderId,
    customer_email: opcoes.email,
    locale: opcoes.idioma,
    success_url: opcoes.successUrl,
    cancel_url: opcoes.cancelUrl,
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": MOEDA.toLowerCase(),
    "line_items[0][price_data][unit_amount]": String(Math.round(PRECO_RELATORIO_COMPLETO * 100)),
    "line_items[0][price_data][product_data][name]": opcoes.descricao.slice(0, 200),
    "metadata[order_id]": opcoes.orderId,
    "metadata[submission_id]": opcoes.submissionId,
    "payment_intent_data[metadata][order_id]": opcoes.orderId,
  });
  return { id: String(sessao.id), url: String(sessao.url) };
}

/** Lê a sessão diretamente da Stripe (fonte de verdade, nunca o payload recebido). */
export async function obterSessao(id: string) {
  const s = await stripe(`/checkout/sessions/${encodeURIComponent(id)}`);
  return {
    id: String(s.id),
    orderId: (s.client_reference_id as string | null) ?? null,
    pago: s.payment_status === "paid",
    expirada: s.status === "expired",
    montante: typeof s.amount_total === "number" ? (s.amount_total / 100).toFixed(2) : null,
    paymentIntent: (s.payment_intent as string | null) ?? null,
  };
}
