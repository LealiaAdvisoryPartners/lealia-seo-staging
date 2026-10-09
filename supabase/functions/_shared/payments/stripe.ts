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

export const TAXA_IVA = 0.23;
const TOTAL_CENT = Math.round(PRECO_RELATORIO_COMPLETO * 100);
const BASE_CENT = Math.round(TOTAL_CENT / (1 + TAXA_IVA));
const IVA_CENT = TOTAL_CENT - BASE_CENT;

const ROTULOS = {
  pt: { base: "Valor base (sem IVA)", iva: "IVA (23%)", fat: "Faturação", cf: "Consumidor final (sem NIF)" },
  en: { base: "Net amount (excl. VAT)", iva: "VAT (23%)", fat: "Invoicing", cf: "Final consumer (no VAT number)" },
  es: { base: "Importe base (sin IVA)", iva: "IVA (23%)", fat: "Facturación", cf: "Consumidor final (sin NIF)" },
} as const;

/** Cria a sessão de Checkout e devolve o endereço de pagamento. */
export async function criarSessaoCheckout(opcoes: {
  orderId: string;
  submissionId: string;
  email: string;
  idioma: "pt" | "en" | "es";
  descricao: string;
  successUrl: string;
  cancelUrl: string;
  nif?: string | null;
  nomeFiscal?: string | null;
}): Promise<{ id: string; url: string }> {
  const r = ROTULOS[opcoes.idioma] ?? ROTULOS.pt;
  const faturacao = opcoes.nif
    ? `${r.fat}: NIF ${opcoes.nif}${opcoes.nomeFiscal ? ` — ${opcoes.nomeFiscal}` : ""}`
    : `${r.fat}: ${r.cf}`;
  const moeda = MOEDA.toLowerCase();
  const taxa = await obterTaxaIva(opcoes.idioma === "en" ? "VAT" : "IVA");
  const sessao = await stripe("/checkout/sessions", {
    mode: "payment",
    client_reference_id: opcoes.orderId,
    customer_email: opcoes.email,
    locale: opcoes.idioma,
    success_url: opcoes.successUrl,
    cancel_url: opcoes.cancelUrl,
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": moeda,
    "line_items[0][price_data][unit_amount]": String(BASE_CENT),
    "line_items[0][price_data][product_data][name]": opcoes.descricao.slice(0, 200),
    "line_items[0][price_data][product_data][description]": faturacao.slice(0, 300),
    "line_items[0][tax_rates][0]": taxa,
    "custom_text[submit][message]": faturacao.slice(0, 1000),
    "metadata[order_id]": opcoes.orderId,
    "metadata[submission_id]": opcoes.submissionId,
    "metadata[nif]": opcoes.nif ?? "",
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
