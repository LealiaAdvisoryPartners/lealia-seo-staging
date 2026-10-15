import { supabase } from "@/integrations/supabase/client";
import type { Attribution } from "@core/attribution";

export type LeadPayload = {
  nome: string;
  email: string;
  telefone?: string | null;
  empresa: string;
  cargo?: string | null;
  pais: string;
  industria: string;
  subindustria?: string | null;
  idade_empresa?: number | null;
  ano_referencia?: number | null;
  faturacao_ano1?: number | null;
  faturacao_ano2?: number | null;
  faturacao_ano3?: number | null;
  ebitda_ano1?: number | null;
  ebitda_ano2?: number | null;
  ebitda_ano3?: number | null;
  despesas_extraordinarias_ano1?: number | null;
  despesas_extraordinarias_ano2?: number | null;
  despesas_extraordinarias_ano3?: number | null;
  caixa_e_depositos?: number | null;
  divida_financeira?: number | null;
  capex_anual_recorrente?: number | null;
  depreciacoes_amortizacoes?: number | null;
  divida_liquida?: number | null;
  pct_top5_clientes?: number | null;
  geografia_clientes?: string | null;
  dependencia_acionista_faturacao?: string | null;
  dependencia_acionista_gestao?: string | null;
  proprietario_imovel?: string | null;
  renda_reflete_mercado?: string | null;
  acrescimo_renda_anual?: number | null;
  incluir_imovel_perimetro?: string | null;
  valorizacao_imovel?: number | null;
  estrutura_transacao?: string | null;
  pct_a_transacionar?: string | null;
  motivo_interesse?: string | null;
  horizonte_temporal?: string | null;
  tipo_periodo?: string | null;
  atividade_principal?: string | null;
  num_colaboradores?: string | null;
  unidades?: string | null;
  num_clientes_ativos?: string | null;
  pct_top1_clientes?: number | null;
  backlog_contratado?: number | null;
  metodo_avaliacao_imovel?: string | null;
  ano_avaliacao_imovel?: number | null;
  permanencia_pos_venda?: string | null;
  tipo_investidor?: string | null;

  consentimento_rgpd: boolean;
  calculo_possivel: boolean;
  ev_min?: number | null;
  ev_max?: number | null;
  equity_min?: number | null;
  equity_max?: number | null;
  multiplo_ajustado_min?: number | null;
  multiplo_ajustado_max?: number | null;
  confianca?: string | null;
  hp?: string;
  idioma?: "pt" | "en" | "es" | null;
  /** Origem da visita (first/last touch); validada de novo no servidor. */
  atribuicao?: Attribution | null;
  /** Origem do browser, usada para construir o link do relatório. */
  origin?: string;
};

export type RegistarLeadResponse = {
  ok: boolean;
  emailEnviado?: boolean;
  relatorioUrl?: string | null;
  pdfUrl?: string | null;
  /** Slug legível da avaliação; âncora do pagamento do relatório completo. */
  ref?: string | null;
};

/** Regista o lead através da edge function "registar-lead". */
export async function registarLead(payload: LeadPayload): Promise<RegistarLeadResponse> {
  const { data, error } = await supabase.functions.invoke("registar-lead", {
    body: { ...payload, origin: typeof window !== "undefined" ? window.location.origin : payload.origin },
  });
  if (error) throw error;
  return data as RegistarLeadResponse;
}
