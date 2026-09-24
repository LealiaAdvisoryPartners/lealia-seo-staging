/**
 * Cliente da API ifthenpay para os dois métodos ativos:
 *  - MB WAY (push para a app, autorizado no telemóvel)
 *  - Cartão (Visa/Mastercard + Apple Pay + Google Pay, via gateway 3DS)
 *
 * Restrição crítica: o `orderId` do MB WAY está limitado a 15 caracteres, pelo
 * que nunca se pode enviar o uuid da submissão. Usamos uma referência curta
 * (`gerarOrderId`) guardada em `payments.ifthenpay_order_id`, que é o elo
 * inequívoco entre o pagamento e a submissão.
 */

export const PRECO_RELATORIO_COMPLETO = 299.0;
export const MOEDA = "EUR";

export type MetodoPagamento = "mbway" | "credit_card";

const BASE = "https://api.ifthenpay.com";
const ALFABETO = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // sem I/O para evitar confusão

/** Referência curta e única: "LP" + 10 caracteres (12 no total, cabe nos 15 do MB WAY). */
export function gerarOrderId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(10));
  let s = "";
  for (const b of bytes) s += ALFABETO[b % ALFABETO.length];
  return `LP${s}`;
}

/** ifthenpay espera sempre o montante como decimal com ponto: "299.00". */
export const formatarMontante = (v: number) => v.toFixed(2);

/** "912345678" / "+351 912 345 678" → "351#912345678" */
export function normalizarTelemovel(bruto: string, indicativoPorDefeito = "351"): string | null {
  const limpo = (bruto ?? "").replace(/[^\d+]/g, "");
  if (!limpo) return null;
  if (limpo.startsWith("+")) {
    const digitos = limpo.slice(1);
    // Indicativos ibéricos: 351 (PT), 34 (ES).
    const indicativo = digitos.startsWith("351") ? "351" : digitos.startsWith("34") ? "34" : digitos.slice(0, 3);
    const numero = digitos.slice(indicativo.length);
    return numero.length >= 9 ? `${indicativo}#${numero}` : null;
  }
  if (limpo.startsWith("351") && limpo.length >= 12) return `351#${limpo.slice(3)}`;
  return limpo.length === 9 ? `${indicativoPorDefeito}#${limpo}` : null;
}

async function pedir(url: string, body: unknown): Promise<Record<string, unknown>> {
  const resposta = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const texto = await resposta.text();
  let dados: Record<string, unknown> = {};
  try {
    dados = texto ? JSON.parse(texto) : {};
  } catch {
    dados = { RawResponse: texto };
  }
  if (!resposta.ok) {
    throw new Error(`ifthenpay ${resposta.status}: ${texto.slice(0, 300)}`);
  }
  return dados;
}

const campo = (d: Record<string, unknown>, ...nomes: string[]) => {
  for (const n of nomes) {
    const v = d[n] ?? d[n.charAt(0).toLowerCase() + n.slice(1)];
    if (v !== undefined && v !== null && v !== "") return String(v);
  }
  return null;
};

export interface RespostaMbway {
  requestId: string | null;
  detalhes: Record<string, unknown>;
}

/** Dispara o pedido de autorização na app MB WAY do cliente. */
export async function iniciarMbway(opcoes: {
  orderId: string;
  montante: number;
  telemovel: string;
  email: string;
  descricao: string;
}): Promise<RespostaMbway> {
  const mbWayKey = Deno.env.get("IFTHENPAY_MBWAY_KEY");
  if (!mbWayKey) throw new Error("IFTHENPAY_MBWAY_KEY não configurada");

  const dados = await pedir(`${BASE}/spg/payment/mbway`, {
    mbWayKey,
    orderId: opcoes.orderId,
    amount: formatarMontante(opcoes.montante),
    mobileNumber: opcoes.telemovel,
    email: opcoes.email,
    description: opcoes.descricao.slice(0, 200),
  });

  const estado = campo(dados, "Status");
  if (estado && estado !== "000") {
    throw new Error(`MB WAY recusado (${estado}): ${campo(dados, "Message") ?? "sem detalhe"}`);
  }
  return { requestId: campo(dados, "RequestId"), detalhes: dados };
}

/** Consulta o estado de um pedido MB WAY já iniciado. */
export async function estadoMbway(requestId: string): Promise<"pending" | "paid" | "failed"> {
  const mbWayKey = Deno.env.get("IFTHENPAY_MBWAY_KEY");
  if (!mbWayKey) throw new Error("IFTHENPAY_MBWAY_KEY não configurada");

  const url = `${BASE}/spg/payment/mbway/status?mbWayKey=${encodeURIComponent(mbWayKey)}&requestId=${encodeURIComponent(requestId)}`;
  const resposta = await fetch(url);
  if (!resposta.ok) return "pending";
  const texto = await resposta.text();
  let dados: Record<string, unknown> = {};
  try {
    dados = texto ? JSON.parse(texto) : {};
  } catch {
    return "pending";
  }
  const estado = (campo(dados, "CodePayment", "Status") ?? "").toUpperCase();
  if (estado === "000" || estado === "PAID" || estado === "SUCCESS") return "paid";
  if (estado === "020" || estado === "REJECTED" || estado === "EXPIRED" || estado === "DECLINED") return "failed";
  return "pending";
}

export interface RespostaCartao {
  paymentUrl: string;
  requestId: string | null;
  detalhes: Record<string, unknown>;
}

/** Cria a sessão da gateway de cartão (inclui Apple Pay e Google Pay quando ativos). */
export async function iniciarCartao(opcoes: {
  orderId: string;
  montante: number;
  idioma: "pt" | "en" | "es";
  successUrl: string;
  errorUrl: string;
  cancelUrl: string;
  descricao: string;
}): Promise<RespostaCartao> {
  const ccardKey = Deno.env.get("IFTHENPAY_CCARD_KEY");
  if (!ccardKey) throw new Error("IFTHENPAY_CCARD_KEY não configurada");

  const dados = await pedir(`${BASE}/creditcard/init/${encodeURIComponent(ccardKey)}`, {
    orderId: opcoes.orderId,
    amount: formatarMontante(opcoes.montante),
    description: opcoes.descricao.slice(0, 200),
    successUrl: opcoes.successUrl,
    errorUrl: opcoes.errorUrl,
    cancelUrl: opcoes.cancelUrl,
    language: opcoes.idioma.toUpperCase(),
  });

  const estado = campo(dados, "Status");
  if (estado && estado !== "0" && estado !== "000") {
    throw new Error(`Cartão recusado (${estado}): ${campo(dados, "Message") ?? "sem detalhe"}`);
  }
  const paymentUrl = campo(dados, "PaymentUrl");
  if (!paymentUrl) throw new Error("ifthenpay não devolveu o endereço de pagamento");
  return { paymentUrl, requestId: campo(dados, "RequestId"), detalhes: dados };
}
