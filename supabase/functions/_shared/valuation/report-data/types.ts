// Tipos partilhados pelos construtores de secções do relatório.
import type { ValuationInput, ValuationResult } from "../valuation.ts";
import { t, type ReportLang } from "../report-i18n/index.ts";
import type { Formatters } from "./helpers.ts";

/** Subconjunto de campos do lead necessários ao relatório. */
export type ReportLead = {
  nome: string;
  email?: string;
  cargo?: string | null;
  empresa: string;
  pais: string;
  industria: string;
  subindustria?: string | null;
  atividade_principal?: string | null;
  num_colaboradores?: string | null;
  unidades?: string | null;
  num_clientes_ativos?: string | null;
  idade_empresa?: number | null;
  ano_referencia?: number | null;
  tipo_periodo?: string | null;
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
  pct_top5_clientes?: number | null;
  pct_top1_clientes?: number | null;
  backlog_contratado?: number | null;
  geografia_clientes?: string | null;
  dependencia_acionista_faturacao?: string | null;
  dependencia_acionista_gestao?: string | null;
  proprietario_imovel?: string | null;
  renda_reflete_mercado?: string | null;
  acrescimo_renda_anual?: number | null;
  incluir_imovel_perimetro?: string | null;
  valorizacao_imovel?: number | null;
  metodo_avaliacao_imovel?: string | null;
  ano_avaliacao_imovel?: number | null;
  estrutura_transacao?: string | null;
  pct_a_transacionar?: string | null;
  permanencia_pos_venda?: string | null;
  tipo_investidor?: string | null;
  motivo_interesse?: string | null;
  horizonte_temporal?: string | null;
  created_at?: string | null;
};

/** Converte a linha do lead na entrada exata do motor de cálculo. */
export function valuationInputFromLead(lead: ReportLead): ValuationInput {
  return {
    pais: lead.pais,
    industria: lead.industria,
    subindustria: lead.subindustria ?? "",
    idade_empresa: lead.idade_empresa ?? 0,
    ano_referencia: lead.ano_referencia ?? new Date().getFullYear(),
    tipo_periodo: lead.tipo_periodo ?? null,
    atividade_principal: lead.atividade_principal ?? null,
    num_colaboradores: lead.num_colaboradores ?? null,
    unidades: lead.unidades ?? null,
    num_clientes_ativos: lead.num_clientes_ativos ?? null,
    faturacao_ano1: lead.faturacao_ano1 ?? 0,
    faturacao_ano2: lead.faturacao_ano2 ?? null,
    faturacao_ano3: lead.faturacao_ano3 ?? null,
    ebitda_ano1: lead.ebitda_ano1 ?? 0,
    ebitda_ano2: lead.ebitda_ano2 ?? null,
    ebitda_ano3: lead.ebitda_ano3 ?? null,
    despesas_extraordinarias_ano1: lead.despesas_extraordinarias_ano1 ?? 0,
    despesas_extraordinarias_ano2: lead.despesas_extraordinarias_ano2 ?? 0,
    despesas_extraordinarias_ano3: lead.despesas_extraordinarias_ano3 ?? 0,
    caixa_e_depositos: lead.caixa_e_depositos ?? 0,
    divida_financeira: lead.divida_financeira ?? 0,
    capex_anual_recorrente: lead.capex_anual_recorrente ?? null,
    depreciacoes_amortizacoes: lead.depreciacoes_amortizacoes ?? null,
    pct_top5_clientes: lead.pct_top5_clientes ?? null,
    pct_top1_clientes: lead.pct_top1_clientes ?? null,
    backlog_contratado: lead.backlog_contratado ?? null,
    geografia_clientes: lead.geografia_clientes ?? null,
    dependencia_faturacao: lead.dependencia_acionista_faturacao ?? null,
    dependencia_gestao: lead.dependencia_acionista_gestao ?? null,
    proprietario_imovel: lead.proprietario_imovel ?? null,
    renda_reflete_mercado: lead.renda_reflete_mercado ?? null,
    acrescimo_renda_anual: lead.acrescimo_renda_anual ?? null,
    incluir_imovel_perimetro: lead.incluir_imovel_perimetro ?? null,
    valorizacao_imovel: lead.valorizacao_imovel ?? null,
    metodo_avaliacao_imovel: lead.metodo_avaliacao_imovel ?? null,
    ano_avaliacao_imovel: lead.ano_avaliacao_imovel ?? null,
    permanencia_pos_venda: lead.permanencia_pos_venda ?? null,
    tipo_investidor: lead.tipo_investidor ?? null,
  };
}

export type LinhaHistorico = {
  ano: number;
  faturacao: string;
  ebitda: string;
  normalizacoes: string;
  despesas: string;
};

/** Um ano de histórico ainda não formatado, filtrado dos campos vazios do lead. */
export type AnoBruto = {
  ano: number;
  faturacao?: number | null;
  ebitda?: number | null;
  desp?: number | null;
};

export type Driver = { driver: string; descricao: string };

export type Risco = {
  risco: string;
  evidencia: string;
  impacto: string;
  mitigante: string;
  nivel: string;
};

/** Todas as flags booleanas derivadas do lead/resultado, reutilizadas por várias secções. */
export type ReportFlags = {
  industria_saude: boolean;
  industria_energia: boolean;
  industria_tecnologia: boolean;
  industria_manufatura: boolean;
  industria_generica: boolean;
  concentracao_alta: boolean;
  concentracao_baixa: boolean;
  dependencia_gestao_alta: boolean;
  dependencia_gestao_baixa: boolean;
  dependencia_faturacao_alta: boolean;
  unidade_unica: boolean;
  crescimento_forte: boolean;
  crescimento_negativo: boolean;
  capex_intensivo: boolean;
  empresa_jovem: boolean;
  tem_imovel_proprio: boolean;
  imovel_no_perimetro: boolean;
  tem_ajuste_imovel: boolean;
  tem_divida: boolean;
  mostrar_equity: boolean;
  tem_anos_anteriores: boolean;
};

/**
 * Inputs partilhados por todos os construtores de secção: computados uma
 * única vez a partir do lead e do resultado do motor de cálculo, para que
 * cada secção seja uma função pura de `Ctx` (mais os parâmetros específicos
 * que precisar).
 */
export type Ctx = {
  lead: ReportLead;
  result: ValuationResult;
  r: Extract<ValuationResult, { ok: true }> | null;
  ok: boolean;
  lang: ReportLang;
  L: ReturnType<typeof t>;
  ano: number;
  fat1: number;
  NAO_INDICADO: string;
  fmt: Formatters;

  anosBrutos: AnoBruto[];
  historico: LinhaHistorico[];
  impactoRenda: number | null;
  normalizacaoRenda: string;

  margem_ebitda_ajustada: number | null;
  proprietario: boolean;
  imovelNoPerimetro: boolean;
  top5: number | null | undefined;
  top1: number | null | undefined;
  depGest: string | null;
  depFat: string | null;
  capex: number | null | undefined;
  caixa: number | null | undefined;
  divida: number | null | undefined;
  posicaoLiquida: number | null;
  backlog: number | null | undefined;
  backlogRacio: number | null;
  ebitdaBase: number | null;
  capexRacio: number | null;
  racioDivida: number | null;
  geografiaInternacional: boolean;
  multiUnidade: boolean;
  imovelAvaliadoExternamente: boolean;
  crescimento_forte: boolean;
  crescimento_negativo: boolean;

  flags: ReportFlags;
};
