import { supabase } from "@/integrations/supabase/client";
import type { Language } from "@/lib/routing";

export const PRECO_RELATORIO_COMPLETO = 299;

export type MetodoPagamento = "credit_card";

export type EstadoPagamento = "pending" | "paid" | "expired" | "failed";

export interface DadosFaturacao {
  nif?: string | null;
  nome_fiscal?: string | null;
  morada_fiscal?: string | null;
}

export interface PedidoPagamento extends DadosFaturacao {
  ref: string;
  metodo: MetodoPagamento;
  idioma: Language;
  telemovel?: string | null;
}

export interface RespostaPagamento {
  ok: boolean;
  erro?: string;
  orderId?: string;
  paymentId?: string;
  paymentUrl?: string;
}

/** Cria o pedido de pagamento do relatório completo para uma submissão. */
export async function criarPagamento(pedido: PedidoPagamento): Promise<RespostaPagamento> {
  const { data, error } = await supabase.functions.invoke("criar-pagamento", {
    body: { ...pedido, origin: typeof window !== "undefined" ? window.location.origin : undefined },
  });
  if (error) {
    // A função devolve o motivo no corpo, mesmo em respostas de erro.
    const corpo = (error as { context?: { body?: unknown } })?.context?.body;
    if (corpo && typeof corpo === "object") return corpo as RespostaPagamento;
    return { ok: false, erro: "falha_rede" };
  }
  return data as RespostaPagamento;
}

/** Consulta o estado de um pagamento já iniciado e se o relatório completo já está disponível. */
export async function consultarPagamento(
  orderId: string,
): Promise<{ estado: EstadoPagamento; disponivel: boolean } | null> {
  const { data, error } = await supabase.functions.invoke("estado-pagamento", { body: { orderId } });
  if (error) return null;
  const resposta = data as { ok?: boolean; estado?: EstadoPagamento; disponivel?: boolean };
  return resposta?.estado ? { estado: resposta.estado, disponivel: !!resposta.disponivel } : null;
}
