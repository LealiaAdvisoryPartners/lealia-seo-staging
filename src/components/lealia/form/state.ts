import { digitsOnly } from "@/lib/money";

export type FormState = {
  pais: string;
  idade_empresa: string;
  industria: string;
  subindustria: string;
  atividade_principal: string;
  num_colaboradores: string;
  unidades: string;
  num_clientes_ativos: string;
  ano_referencia: string;
  tipo_periodo: string;
  faturacao_ano1: string;
  faturacao_ano2: string;
  faturacao_ano3: string;
  ebitda_ano1: string;
  ebitda_ano2: string;
  ebitda_ano3: string;
  despesas_extraordinarias_ano1: string;
  despesas_extraordinarias_ano2: string;
  despesas_extraordinarias_ano3: string;
  caixa_e_depositos: string;
  divida_financeira: string;
  capex_anual_recorrente: string;
  depreciacoes_amortizacoes: string;
  pct_top5_clientes: string;
  pct_top1_clientes: string;
  backlog_contratado: string;
  geografia_clientes: string;
  dependencia_faturacao: string;
  dependencia_gestao: string;
  proprietario_imovel: string;
  renda_reflete_mercado: string;
  acrescimo_renda_anual: string;
  incluir_imovel_perimetro: string;
  valorizacao_imovel: string;
  metodo_avaliacao_imovel: string;
  ano_avaliacao_imovel: string;
  estrutura_transacao: string;
  motivo_interesse: string;
  horizonte_temporal: string;
  pct_a_transacionar: string;
  permanencia_pos_venda: string;
  tipo_investidor: string;
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  cargo: string;
  consentimento_rgpd: boolean;
  idioma: "pt" | "en" | "es";
};

export const emptyForm: FormState = {
  pais: "Portugal",
  idade_empresa: "",
  industria: "",
  subindustria: "",
  atividade_principal: "",
  num_colaboradores: "",
  unidades: "",
  num_clientes_ativos: "",
  ano_referencia: "2025",
  tipo_periodo: "",
  faturacao_ano1: "",
  faturacao_ano2: "",
  faturacao_ano3: "",
  ebitda_ano1: "",
  ebitda_ano2: "",
  ebitda_ano3: "",
  despesas_extraordinarias_ano1: "",
  despesas_extraordinarias_ano2: "",
  despesas_extraordinarias_ano3: "",
  caixa_e_depositos: "",
  divida_financeira: "",
  capex_anual_recorrente: "",
  depreciacoes_amortizacoes: "",
  pct_top5_clientes: "",
  pct_top1_clientes: "",
  backlog_contratado: "",
  geografia_clientes: "",
  dependencia_faturacao: "",
  dependencia_gestao: "",
  proprietario_imovel: "",
  renda_reflete_mercado: "",
  acrescimo_renda_anual: "",
  incluir_imovel_perimetro: "",
  valorizacao_imovel: "",
  metodo_avaliacao_imovel: "",
  ano_avaliacao_imovel: "",
  estrutura_transacao: "",
  motivo_interesse: "",
  horizonte_temporal: "",
  pct_a_transacionar: "",
  permanencia_pos_venda: "",
  tipo_investidor: "",
  nome: "",
  email: "",
  telefone: "",
  empresa: "",
  cargo: "",
  consentimento_rgpd: false,
  idioma: "pt",
};

export const STORAGE_KEY = "lealia:avaliacao:form:v6";

export const isNum = (v: string) => v.trim() !== "" && !Number.isNaN(Number(v));
export const filled = (v: string) => digitsOnly(v).replace("-", "") !== "";
export const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim());
export const pctOk = (v: string) => v === "" || (isNum(v) && Number(v) >= 0 && Number(v) <= 100);
