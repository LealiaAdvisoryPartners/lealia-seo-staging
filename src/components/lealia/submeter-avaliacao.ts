/**
 * Conversão do formulário (tudo strings) para os dois consumidores: o motor de
 * avaliação e o registo do lead. Os campos comuns são convertidos uma só vez.
 */
import { parseMoney } from "@/lib/money";
import type { FormState } from "@/components/lealia/form";
import type { ValuationInput, ValuationResult } from "@core/valuation";
import type { LeadPayload } from "@/lib/leads";

const num = (v: string) => parseMoney(v) ?? 0;
const optNum = (v: string) => parseMoney(v);
const pct = (v: string) => (v === "" ? null : Number(v));
const opt = (v: string) => v || null;

/** Campos partilhados, com os nomes usados na base de dados. */
const camposComuns = (d: FormState) => ({
  pais: d.pais,
  industria: d.industria,
  subindustria: opt(d.subindustria),
  idade_empresa: num(d.idade_empresa),
  ano_referencia: Number(d.ano_referencia) || 2025,
  faturacao_ano1: num(d.faturacao_ano1),
  faturacao_ano2: optNum(d.faturacao_ano2),
  faturacao_ano3: optNum(d.faturacao_ano3),
  ebitda_ano1: num(d.ebitda_ano1),
  ebitda_ano2: optNum(d.ebitda_ano2),
  ebitda_ano3: optNum(d.ebitda_ano3),
  despesas_extraordinarias_ano1: num(d.despesas_extraordinarias_ano1),
  despesas_extraordinarias_ano2: num(d.despesas_extraordinarias_ano2),
  despesas_extraordinarias_ano3: num(d.despesas_extraordinarias_ano3),
  caixa_e_depositos: optNum(d.caixa_e_depositos),
  divida_financeira: optNum(d.divida_financeira),
  capex_anual_recorrente: optNum(d.capex_anual_recorrente),
  depreciacoes_amortizacoes: optNum(d.depreciacoes_amortizacoes),
  pct_top5_clientes: pct(d.pct_top5_clientes),
  pct_top1_clientes: pct(d.pct_top1_clientes),
  geografia_clientes: opt(d.geografia_clientes),
  proprietario_imovel: opt(d.proprietario_imovel),
  renda_reflete_mercado: opt(d.renda_reflete_mercado),
  acrescimo_renda_anual: optNum(d.acrescimo_renda_anual),
  incluir_imovel_perimetro: opt(d.incluir_imovel_perimetro),
  valorizacao_imovel: optNum(d.valorizacao_imovel),
  metodo_avaliacao_imovel: opt(d.metodo_avaliacao_imovel),
  ano_avaliacao_imovel: optNum(d.ano_avaliacao_imovel),
  tipo_periodo: opt(d.tipo_periodo),
  atividade_principal: opt(d.atividade_principal),
  num_colaboradores: opt(d.num_colaboradores),
  unidades: opt(d.unidades),
  num_clientes_ativos: opt(d.num_clientes_ativos),
  backlog_contratado: optNum(d.backlog_contratado),
  permanencia_pos_venda: opt(d.permanencia_pos_venda),
  tipo_investidor: opt(d.tipo_investidor),
});

/** Input do motor de avaliação: caixa e dívida nunca são nulas no cálculo. */
export function valuationInputDoFormulario(d: FormState): ValuationInput {
  const c = camposComuns(d);
  return {
    ...c,
    caixa_e_depositos: c.caixa_e_depositos ?? 0,
    divida_financeira: c.divida_financeira ?? 0,
    dependencia_faturacao: opt(d.dependencia_faturacao),
    dependencia_gestao: opt(d.dependencia_gestao),
  };
}

/** Lead a gravar: dados de contacto, motivação e o resultado do cálculo. */
export function leadDoFormulario(d: FormState, r: ValuationResult): LeadPayload {
  const c = camposComuns(d);
  return {
    ...c,
    nome: d.nome,
    email: d.email,
    telefone: opt(d.telefone),
    empresa: d.empresa,
    cargo: opt(d.cargo),
    idioma: d.idioma,
    dependencia_acionista_faturacao: opt(d.dependencia_faturacao),
    dependencia_acionista_gestao: opt(d.dependencia_gestao),
    divida_liquida: r.ok
      ? r.divida_liquida
      : (c.divida_financeira ?? 0) - (c.caixa_e_depositos ?? 0),
    estrutura_transacao: opt(d.estrutura_transacao),
    pct_a_transacionar: opt(d.pct_a_transacionar),
    motivo_interesse: opt(d.motivo_interesse),
    horizonte_temporal: opt(d.horizonte_temporal),
    consentimento_rgpd: d.consentimento_rgpd,
    calculo_possivel: r.ok,
    ev_min: r.ok ? r.ev_min : null,
    ev_max: r.ok ? r.ev_max : null,
    equity_min: r.ok ? r.equity_min : null,
    equity_max: r.ok ? r.equity_max : null,
    multiplo_ajustado_min: r.ok ? r.multiplo_ajustado_min : null,
    multiplo_ajustado_max: r.ok ? r.multiplo_ajustado_max : null,
    confianca: r.ok ? r.confianca : null,
  };
}
