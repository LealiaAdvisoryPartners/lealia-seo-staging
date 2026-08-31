// Motor de cálculo de valuation — lógica v3 (análise multifatorial de risco).
// EBITDA base = ano de referência (mais recente) normalizado. Ajustes combinados
// com cap global de -40%/+35% sobre o múltiplo base.

import { calcularDCF, type DcfResult } from "./dcf";

export type SectorMultiple = {
  industria: string;
  subindustria: string;
  multiplo_min: number;
  multiplo_max: number;
  fonte_nota?: string;
};

export const OUTRO = "Outro";
export const OUTRA_INDUSTRIA = "Outro (não listado)";

// Sub-indústrias com múltiplos definidos (sem as opções "Outro", que usam fallback).
export const INDUSTRIA_MULTIPLOS: SectorMultiple[] = [
  { industria: "Agricultura", subindustria: "Agroindústria", multiplo_min: 5.0, multiplo_max: 7.0 },
  { industria: "Agricultura", subindustria: "Produção agrícola", multiplo_min: 4.5, multiplo_max: 6.5 },

  { industria: "Construção", subindustria: "Construção e obras públicas", multiplo_min: 4.0, multiplo_max: 6.0 },
  { industria: "Construção", subindustria: "Produtos de Construção", multiplo_min: 7.5, multiplo_max: 10.0 },
  { industria: "Construção", subindustria: "Promoção imobiliária", multiplo_min: 4.5, multiplo_max: 7.0 },

  { industria: "Energia", subindustria: "Distribuição/Retalho energético", multiplo_min: 5.0, multiplo_max: 7.5 },
  { industria: "Energia", subindustria: "Eficiência energética/Serviços", multiplo_min: 6.0, multiplo_max: 9.0 },

  { industria: "Hotelaria e Turismo", subindustria: "Hotéis", multiplo_min: 7.0, multiplo_max: 10.0 },
  { industria: "Hotelaria e Turismo", subindustria: "Restauração", multiplo_min: 4.0, multiplo_max: 6.5 },

  { industria: "Logística", subindustria: "Logística/Armazenagem", multiplo_min: 5.5, multiplo_max: 8.0 },
  { industria: "Logística", subindustria: "Transporte", multiplo_min: 4.5, multiplo_max: 7.0 },

  { industria: "Manufatura/Indústria", subindustria: "Alimentar/Agroindústria", multiplo_min: 5.0, multiplo_max: 7.0 },
  { industria: "Manufatura/Indústria", subindustria: "Componentes automóvel", multiplo_min: 4.5, multiplo_max: 6.5 },
  { industria: "Manufatura/Indústria", subindustria: "Metalomecânica", multiplo_min: 4.5, multiplo_max: 6.5 },
  { industria: "Manufatura/Indústria", subindustria: "Plásticos/Embalagem", multiplo_min: 5.0, multiplo_max: 7.0 },
  { industria: "Manufatura/Indústria", subindustria: "Têxtil", multiplo_min: 4.0, multiplo_max: 6.0 },
  { industria: "Manufatura/Indústria", subindustria: "Maquinaria industrial", multiplo_min: 7.0, multiplo_max: 9.5 },

  { industria: "Retalho", subindustria: "Retalho especializado", multiplo_min: 4.0, multiplo_max: 6.0 },
  { industria: "Retalho", subindustria: "Retalho generalista", multiplo_min: 3.5, multiplo_max: 5.5 },

  {
    industria: "Saúde",
    subindustria: "Clínicas dentárias",
    multiplo_min: 7.0,
    multiplo_max: 10.0,
    fonte_nota: "Prémio se multi-unidade",
  },
  { industria: "Saúde", subindustria: "Clínicas médicas gerais", multiplo_min: 6.0, multiplo_max: 8.5 },
  { industria: "Saúde", subindustria: "Diagnóstico/Imagiologia", multiplo_min: 7.5, multiplo_max: 10.5 },
  { industria: "Saúde", subindustria: "Farmácias/Distribuição farmacêutica", multiplo_min: 5.5, multiplo_max: 8.0 },
  { industria: "Saúde", subindustria: "Lares/Cuidados continuados", multiplo_min: 6.5, multiplo_max: 9.0 },
  { industria: "Saúde", subindustria: "Clínicas veterinárias", multiplo_min: 8.5, multiplo_max: 11.0 },

  { industria: "Serviços B2B", subindustria: "Consultoria", multiplo_min: 5.0, multiplo_max: 7.5 },
  { industria: "Serviços B2B", subindustria: "Serviços profissionais", multiplo_min: 5.0, multiplo_max: 8.0 },

  { industria: "Tecnologia/Software", subindustria: "Cibersegurança", multiplo_min: 9.0, multiplo_max: 13.0 },
  { industria: "Tecnologia/Software", subindustria: "SaaS B2B", multiplo_min: 8.0, multiplo_max: 13.0 },
  {
    industria: "Tecnologia/Software",
    subindustria: "Serviços de TI/Consultoria tecnológica",
    multiplo_min: 6.0,
    multiplo_max: 9.0,
  },
];

const ptCollator = new Intl.Collator("pt", { sensitivity: "base" });

export const INDUSTRIAS: string[] = [
  ...Array.from(new Set(INDUSTRIA_MULTIPLOS.map((m) => m.industria))).sort((a, b) => ptCollator.compare(a, b)),
  OUTRA_INDUSTRIA,
];

export const subindustriasDe = (industria: string): string[] => {
  if (industria === OUTRA_INDUSTRIA) return [];
  const subs = INDUSTRIA_MULTIPLOS.filter((m) => m.industria === industria)
    .map((m) => m.subindustria)
    .sort((a, b) => ptCollator.compare(a, b));
  return subs.length ? [...subs, OUTRO] : [];
};

export const PAISES = ["Portugal", "Espanha", OUTRO];

export const ANOS_REFERENCIA = [2026, 2025, 2024];

export const GEOGRAFIAS = [
  "Nacional (<10% exportação)",
  "Maioritariamente nacional (10%-35% exportação)",
  "Equilibrado (35%-65% exportação)",
  "Maioritariamente internacional (65%-90% exportação)",
  "Internacional (>90% exportação)",
];
export const GEOGRAFIA_EQUILIBRADO = GEOGRAFIAS[2]!;

export const DEPENDENCIAS_FATURACAO = ["Baixa (0-20%)", "Média (20-50%)", "Alta (50-100%)"];
export const DEPENDENCIAS_GESTAO = ["Baixa", "Média", "Alta"];

export const ESTRUTURAS_TRANSACAO = [
  "Venda de capital",
  "Venda de ativos",
  "Emissão de dívida",
  "Não sei / a explorar",
  "Outro",
];

export const MOTIVOS_INTERESSE = [
  "Sucessão",
  "Expansão",
  "Prospeção de mercado",
  "Carve-Out",
  "Rentabilização do investimento",
  "Outro",
];

export const HORIZONTES = ["Imediato (0-6 meses)", "1-2 anos", "Sem prazo definido"];

export const PCT_TRANSACIONAR = [
  "Minoritária (<50%)",
  "Maioritária (50-90%)",
  "Totalidade (90-100%)",
  "Ainda não decidido",
  "Não aplicável",
];

export const TIPOS_PERIODO = [
  "Exercício encerrado (contas aprovadas)",
  "LTM — últimos 12 meses",
  "Ano em curso anualizado",
  "Estimativa de fecho do ano",
  "Orçamento / plano de negócios",
];

export const NUM_COLABORADORES = ["1-9", "10-24", "25-49", "50-99", "100-249", "250+"];

export const UNIDADES = ["Localização única", "2-3 localizações", "Mais de 3 localizações", "Não aplicável"];

export const NUM_CLIENTES_ATIVOS = ["1-5", "6-20", "21-50", "51-200", "200+"];

export const METODOS_AVALIACAO_IMOVEL = [
  "Avaliação independente recente",
  "Avaliação bancária",
  "Estimativa do acionista",
  "Valor contabilístico",
];

export const PERMANENCIAS_POS_VENDA = [
  "Saída imediata",
  "Transição até 12 meses",
  "Permanência 1-3 anos",
  "Permanência de longo prazo",
  "Ainda não decidido",
];

export const TIPOS_INVESTIDOR = [
  "Investidor estratégico (setor)",
  "Private equity / financeiro",
  "Family office",
  "Gestão interna (MBO)",
  "Indiferente / a explorar",
];

const MULTIPLO_GENERICO_PAIS: Record<string, { min: number; max: number }> = {
  Portugal: { min: 4.5, max: 6.5 },
  Espanha: { min: 5.0, max: 7.0 },
  [OUTRO]: { min: 4.75, max: 6.75 },
};

export type ValuationInput = {
  pais: string;
  industria: string;
  subindustria: string;
  idade_empresa: number;
  ano_referencia: number;
  tipo_periodo?: string | null;
  atividade_principal?: string | null;
  num_colaboradores?: string | null;
  unidades?: string | null;
  num_clientes_ativos?: string | null;
  faturacao_ano1: number;
  faturacao_ano2: number | null;
  faturacao_ano3: number | null;
  ebitda_ano1: number;
  ebitda_ano2: number | null;
  ebitda_ano3: number | null;
  despesas_extraordinarias_ano1: number;
  despesas_extraordinarias_ano2: number;
  despesas_extraordinarias_ano3: number;
  caixa_e_depositos?: number | null;
  divida_financeira?: number | null;
  capex_anual_recorrente?: number | null;
  depreciacoes_amortizacoes?: number | null;
  pct_top5_clientes?: number | null;
  pct_top1_clientes?: number | null;
  backlog_contratado?: number | null;
  geografia_clientes?: string | null;
  dependencia_faturacao?: string | null;
  dependencia_gestao?: string | null;
  proprietario_imovel?: string | null;
  renda_reflete_mercado?: string | null;
  acrescimo_renda_anual?: number | null;
  incluir_imovel_perimetro?: string | null;
  valorizacao_imovel?: number | null;
  metodo_avaliacao_imovel?: string | null;
  ano_avaliacao_imovel?: number | null;
  permanencia_pos_venda?: string | null;
  tipo_investidor?: string | null;
};

export type EfeitoAjuste = "Positivo" | "Neutro" | "Negativo";
export type Ajuste = {
  label: string;
  detalhe: string;
  multiplicador: number;
  semDados?: boolean;
  /** Efeito qualitativo explícito apresentado no relatório (sobrepõe-se ao multiplicador). */
  efeito?: EfeitoAjuste;
};
export type Confianca = "Baixa" | "Média" | "Alta";

export const CONF_EXPLICACAO: Record<Confianca, string> = {
  Baixa: "Confiança baixa — a estimativa foi calculada com informação limitada.",
  Média: "Confiança média — existe informação relevante, mas alguns dados adicionais poderão melhorar a análise.",
  Alta: "Confiança alta — a informação fornecida cobre as dimensões críticas de uma avaliação preliminar.",
};

export type DimensaoConfianca = {
  dimensao: string;
  peso: number;
  /** 0 a 1 */
  cobertura: number;
  em_falta: string[];
};

const has = (v: unknown) => v !== null && v !== undefined && v !== "";

/**
 * Índice de confiança multidimensional (0–100), baseado na cobertura da
 * informação por dimensão de análise. Não influencia EBITDA, múltiplos ou valores.
 */
export function calcularIndiceConfianca(input: ValuationInput): {
  pontos: number;
  confianca: Confianca;
  dimensoes: DimensaoConfianca[];
} {
  const dim = (dimensao: string, peso: number, itens: Array<[string, boolean]>): DimensaoConfianca => {
    const ok = itens.filter(([, v]) => v).length;
    return {
      dimensao,
      peso,
      cobertura: itens.length ? ok / itens.length : 0,
      em_falta: itens.filter(([, v]) => !v).map(([label]) => label),
    };
  };

  const dimensoes: DimensaoConfianca[] = [
    dim("Histórico financeiro", 25, [
      ["Faturação do ano de referência", has(input.faturacao_ano1)],
      ["Faturação do ano anterior", has(input.faturacao_ano2)],
      ["Faturação de há três anos", has(input.faturacao_ano3)],
      ["EBITDA do ano anterior", has(input.ebitda_ano2)],
      ["EBITDA de há três anos", has(input.ebitda_ano3)],
    ]),
    dim("Qualidade do EBITDA", 20, [
      ["Tipo de período de referência", has(input.tipo_periodo)],
      ["Despesas extraordinárias identificadas", has(input.despesas_extraordinarias_ano1)],
      ["Enquadramento do imóvel de operação", has(input.proprietario_imovel)],
      ["Capex anual recorrente", has(input.capex_anual_recorrente)],
    ]),
    dim("Posição financeira", 20, [
      ["Caixa e depósitos", has(input.caixa_e_depositos)],
      ["Dívida financeira", has(input.divida_financeira)],
    ]),
    dim("Enquadramento setorial", 15, [
      ["Indústria identificada", input.industria !== OUTRA_INDUSTRIA],
      ["Sub-indústria identificada", !!input.subindustria && input.subindustria !== OUTRO],
      ["Atividade principal descrita", has(input.atividade_principal)],
    ]),
    dim("Perfil de risco", 20, [
      ["Concentração dos 5 maiores clientes", has(input.pct_top5_clientes)],
      ["Peso do maior cliente", has(input.pct_top1_clientes)],
      ["Unidades / localizações", has(input.unidades)],
      ["Geografia dos clientes", has(input.geografia_clientes)],
      ["Dependência do acionista (faturação)", has(input.dependencia_faturacao)],
      ["Dependência do acionista (gestão)", has(input.dependencia_gestao)],
    ]),
  ];

  const pontos = Math.round(dimensoes.reduce((s, d) => s + d.peso * d.cobertura, 0));
  const confianca: Confianca = pontos < 50 ? "Baixa" : pontos < 75 ? "Média" : "Alta";
  return { pontos, confianca, dimensoes };
}

export type LinhaEbitda = { label: string; valor: number; tipo: "base" | "ajuste" | "total" };

export type Cenario = {
  nome: "Conservador" | "Base" | "Otimista";
  multiplo: number;
  ev: number;
  equity: number;
  pressuposto: string;
};

export type LinhaSensibilidade = { variacao: string; ebitda: number; valores: number[] };

export type ValuationResult =
  | { ok: false; motivo: string }
  | {
      ok: true;
      ebitda_reportado: number;
      ebitda_base: number;
      linhas_ebitda: LinhaEbitda[];
      ano_referencia: number;
      multiplo_base_min: number;
      multiplo_base_max: number;
      multiplo_ajustado_min: number;
      multiplo_ajustado_max: number;
      multiplo_ajustado_medio: number;
      fator_ajustes: number;
      ev_min: number;
      ev_max: number;
      ev_medio: number;
      divida_financeira: number;
      caixa: number;
      divida_liquida: number;
      posicao_liquida: "Posição Líquida";
      equity_min: number;
      equity_max: number;
      equity_medio: number;
      tem_divida: boolean;
      ajuste_ebitda_imovel: number;
      valor_imovel: number;
      cenarios: Cenario[];
      sensibilidade: { multiplos: number[]; linhas: LinhaSensibilidade[] };
      ajustes: Ajuste[];
      confianca: Confianca;
      pontos_confianca: number;
      dimensoes_confianca: DimensaoConfianca[];
      anos_preenchidos: number;
      dcf: DcfResult;
      nota_setor?: string;
      aviso_margem?: string;
    };

// Renda teórica anual como % do valor do imóvel — constante isolada e editável.
// Aplica-se sempre que a empresa é proprietária, quer o imóvel fique ou não
// no perímetro da transação.
export const TAXA_RENDA_IMPLICITA = 0.055;

// Limiares mínimos abaixo dos quais o método de múltiplo de EBITDA não é fiável.
export const FATURACAO_MINIMA = 50_000;
export const EBITDA_MINIMO = 10_000;

export const EBITDA_NEGATIVO_MSG =
  "Com um EBITDA normalizado muito reduzido, negativo ou nulo, o método de múltiplo de EBITDA não permite uma estimativa fiável. Isto não significa que a sua empresa não tenha valor, mas sim que pode ser mais adequado avaliar por múltiplo de faturação ou potencial de recuperação. Agende uma reunião gratuita para analisarmos o seu caso em detalhe.";

export const FATURACAO_MINIMA_MSG =
  "Com uma faturação anual abaixo de 50.000 €, o método de múltiplo de EBITDA não permite uma estimativa fiável. Isto não significa que a sua empresa não tenha valor: fale connosco para analisarmos a situação específica e ajudarmos com um processo de avaliação personalizado.";

export const EQUITY_NEGATIVO_MSG =
  "Com o nível atual de endividamento face ao valor estimado da operação, não é possível apresentar uma avaliação indicativa fiável. Isto não significa que a sua empresa não tenha valor: fale connosco para analisarmos a situação específica e ajudarmos com um processo de avaliação personalizado.";

const NOTA_SETOR_GENERICO =
  "Como o seu setor específico não está listado, esta estimativa usa uma média geral de mercado, assim sendo, o valor real pode variar significativamente. Recomendamos agendar uma reunião para uma análise ajustada ao seu setor.";

export const AVISO_MARGEM =
  "A margem EBITDA indicada parece elevada para o setor — reveja os valores antes de continuar.";

const roundToThousand = (n: number) => Math.round(n / 1000) * 1000;

function multiploBase(input: ValuationInput): { min: number; max: number; nota?: string } {
  if (input.industria === OUTRA_INDUSTRIA) {
    const g = MULTIPLO_GENERICO_PAIS[input.pais] ?? MULTIPLO_GENERICO_PAIS[OUTRO]!;
    return { min: g.min, max: g.max, nota: NOTA_SETOR_GENERICO };
  }
  const exato = INDUSTRIA_MULTIPLOS.find(
    (m) => m.industria === input.industria && m.subindustria === input.subindustria,
  );
  if (exato) return { min: exato.multiplo_min, max: exato.multiplo_max };

  // Sub-indústria "Outro": média da indústria.
  const daIndustria = INDUSTRIA_MULTIPLOS.filter((m) => m.industria === input.industria);
  if (daIndustria.length) {
    const min = daIndustria.reduce((s, m) => s + m.multiplo_min, 0) / daIndustria.length;
    const max = daIndustria.reduce((s, m) => s + m.multiplo_max, 0) / daIndustria.length;
    return { min, max };
  }
  const g = MULTIPLO_GENERICO_PAIS[input.pais] ?? MULTIPLO_GENERICO_PAIS[OUTRO]!;
  return { min: g.min, max: g.max, nota: NOTA_SETOR_GENERICO };
}

// A faturação posiciona uma sub-banda dentro do intervalo setorial (funil de dimensão).
// É sobre esta banda — e não sobre o intervalo setorial completo — que atuam os ajustes.
function bandaPorFaturacao(setorMin: number, setorMax: number, faturacao: number) {
  const [pctMin, pctMax] =
    faturacao < 2_000_000
      ? [0, 0.25]
      : faturacao < 5_000_000
        ? [0.15, 0.4]
        : faturacao < 20_000_000
          ? [0.35, 0.65]
          : [0.5, 1.0];
  const amplitude = setorMax - setorMin;
  return { min: setorMin + pctMin * amplitude, max: setorMin + pctMax * amplitude };
}

export function calcularValuation(input: ValuationInput): ValuationResult {
  const ebitda_base = input.ebitda_ano1 + input.despesas_extraordinarias_ano1;

  // --- Ajuste de imóvel / instalações ---
  let ajuste_ebitda_imovel = 0;
  let valor_imovel_a_adicionar = 0;
  if (input.proprietario_imovel === "Não") {
    if (input.renda_reflete_mercado === "Não" && (input.acrescimo_renda_anual ?? 0) > 0) {
      ajuste_ebitda_imovel = -(input.acrescimo_renda_anual ?? 0);
    }
  } else if (input.proprietario_imovel === "Sim") {
    const valorImovel = input.valorizacao_imovel ?? 0;
    // O desconto de renda teórica aplica-se sempre, quer o imóvel fique ou não no
    // perímetro — reflete o custo real de ocupação que o negócio operacional
    // deveria suportar.
    ajuste_ebitda_imovel = -(valorImovel * TAXA_RENDA_IMPLICITA);
    // O valor do imóvel só se soma ao Equity Value se ficar incluído no perímetro
    // da transação.
    if (input.incluir_imovel_perimetro === "Sim") {
      valor_imovel_a_adicionar = valorImovel;
    }
  }

  // O ajuste do imóvel entra ANTES do múltiplo: todo o cálculo a seguir usa este EBITDA.
  const ebitda_normalizado_final = ebitda_base + ajuste_ebitda_imovel;

  if (input.faturacao_ano1 < FATURACAO_MINIMA) {
    return { ok: false, motivo: FATURACAO_MINIMA_MSG };
  }

  if (ebitda_normalizado_final < EBITDA_MINIMO) {
    return { ok: false, motivo: EBITDA_NEGATIVO_MSG };
  }

  const anos = [
    { fat: input.faturacao_ano1, ebi: input.ebitda_ano1 },
    { fat: input.faturacao_ano2, ebi: input.ebitda_ano2 },
    { fat: input.faturacao_ano3, ebi: input.ebitda_ano3 },
  ];
  const preenchidos = anos.filter((a) => a.fat !== null && a.ebi !== null);
  const anos_preenchidos = preenchidos.length;

  const base = multiploBase(input);

  // Ajuste de dimensão: EBITDA normalizado abaixo de 2M€ desloca o intervalo
  // setorial em 1 ponto absoluto (min e max) antes de qualquer outro racional.
  const DESLOCAMENTO_EBITDA = 1.0;
  const ebitda_abaixo_2m = ebitda_normalizado_final < 2_000_000;
  const setor_ajustado_min = base.min - (ebitda_abaixo_2m ? DESLOCAMENTO_EBITDA : 0);
  const setor_ajustado_max = base.max - (ebitda_abaixo_2m ? DESLOCAMENTO_EBITDA : 0);

  const ajuste_idade = input.idade_empresa < 3 ? 0.85 : input.idade_empresa > 10 ? 1.0 : 0.95;

  const f = input.faturacao_ano1;
  const banda = bandaPorFaturacao(setor_ajustado_min, setor_ajustado_max, f);

  let crescimento: number | null = null;
  if (anos_preenchidos >= 2) {
    const maisAntigo = preenchidos[preenchidos.length - 1]!.fat!;
    if (maisAntigo > 0) crescimento = (input.faturacao_ano1 - maisAntigo) / maisAntigo;
  }
  const ajuste_crescimento = crescimento === null ? 1.0 : crescimento < 0 ? 0.9 : crescimento > 0.1 ? 1.05 : 1.0;

  const unidades = input.unidades || null;
  const ajuste_unidades = unidades === "Localização única" ? 0.9 : unidades === "Mais de 3 localizações" ? 1.05 : 1.0;

  const top5 = input.pct_top5_clientes ?? null;
  const ajuste_concentracao = top5 === null ? 1.0 : top5 < 30 ? 1.0 : top5 <= 60 ? 1.0 : 0.95;

  const geo = input.geografia_clientes || null;
  const ajuste_geografia = geo === GEOGRAFIA_EQUILIBRADO ? 1.0 : 0.95;

  const depFat = input.dependencia_faturacao ?? null;
  const ajuste_dep_faturacao =
    depFat === null ? 1.0 : depFat.startsWith("Baixa") ? 1.0 : depFat.startsWith("Alta") ? 0.9 : 1.0;

  const depGest = input.dependencia_gestao ?? null;
  const ajuste_dep_gestao = depGest === null ? 1.0 : depGest === "Baixa" ? 1.0 : depGest === "Alta" ? 0.9 : 1.0;

  const capex = input.capex_anual_recorrente ?? null;
  let ajuste_capex = 1.0;
  let capex_intensidade: number | null = null;
  if (capex !== null && capex >= 0) {
    capex_intensidade = capex / f;
    ajuste_capex = capex_intensidade < 0.02 ? 1.0 : capex_intensidade <= 0.05 ? 1.0 : 0.95;
  }

  // Cap global: o conjunto de ajustes nunca desvia o múltiplo mais de -40%/+35%.
  const fator_bruto =
    ajuste_idade *
    ajuste_crescimento *
    ajuste_unidades *
    ajuste_concentracao *
    ajuste_geografia *
    ajuste_dep_faturacao *
    ajuste_dep_gestao *
    ajuste_capex;
  const fator = Math.min(Math.max(fator_bruto, 0.6), 1.35);

  // Os ajustes atuam sobre a banda funilada pela faturação, não sobre o intervalo setorial completo.
  const multiplo_ajustado_min = banda.min * fator;
  const multiplo_ajustado_max = banda.max * fator;
  const multiplo_ajustado_medio = (multiplo_ajustado_min + multiplo_ajustado_max) / 2;

  const ev_min = roundToThousand(ebitda_normalizado_final * multiplo_ajustado_min);
  const ev_max = roundToThousand(ebitda_normalizado_final * multiplo_ajustado_max);

  const divida_financeira = input.divida_financeira ?? 0;
  const caixa = input.caixa_e_depositos ?? 0;
  const divida_liquida = divida_financeira - caixa;
  const posicao_liquida: "Posição Líquida" = "Posição Líquida";

  const equityDe = (ev: number) => roundToThousand(ev - divida_liquida + valor_imovel_a_adicionar);
  const equity_min = equityDe(ev_min);
  const equity_max = equityDe(ev_max);
  const equity_medio = roundToThousand((equity_min + equity_max) / 2);

  // Equity value mínimo negativo: a estrutura de capital não permite uma
  // estimativa fiável por múltiplo de EBITDA.
  if (equity_min < 0) {
    return { ok: false, motivo: EQUITY_NEGATIVO_MSG };
  }

  const cenarios: Cenario[] = [
    {
      nome: "Conservador",
      multiplo: multiplo_ajustado_min,
      ev: ev_min,
      equity: equityDe(ev_min),
      pressuposto:
        "Comprador financeiro, ausência de prémio estratégico; múltiplo no limite inferior do intervalo ajustado.",
    },
    {
      nome: "Base",
      multiplo: multiplo_ajustado_medio,
      ev: roundToThousand(ebitda_normalizado_final * multiplo_ajustado_medio),
      equity: equityDe(roundToThousand(ebitda_normalizado_final * multiplo_ajustado_medio)),
      pressuposto: "Processo normal, informação financeira preparada e continuidade operacional assegurada.",
    },
    {
      nome: "Otimista",
      multiplo: multiplo_ajustado_max,
      ev: ev_max,
      equity: equityDe(ev_max),
      pressuposto:
        "Comprador estratégico com sinergias identificadas, com vários interessados e preparação prévia do negócio.",
    },
  ];

  const multiplosSens = [
    multiplo_ajustado_min,
    (multiplo_ajustado_min + multiplo_ajustado_medio) / 2,
    multiplo_ajustado_medio,
    (multiplo_ajustado_medio + multiplo_ajustado_max) / 2,
    multiplo_ajustado_max,
  ];
  const sensibilidade = {
    multiplos: multiplosSens,
    linhas: [-0.1, -0.05, 0, 0.05, 0.1].map((v) => {
      const eb = ebitda_normalizado_final * (1 + v);
      return {
        variacao: v === 0 ? "Base" : `${v > 0 ? "+" : "−"}${Math.abs(v * 100).toFixed(0)}%`,
        ebitda: eb,
        valores: multiplosSens.map((m) => roundToThousand(eb * m)),
      };
    }),
  };

  const linhas_ebitda: LinhaEbitda[] = [
    { label: `EBITDA reportado ${input.ano_referencia}`, valor: input.ebitda_ano1, tipo: "base" },
    {
      label: "Despesas extraordinárias não recorrentes",
      valor: input.despesas_extraordinarias_ano1,
      tipo: "ajuste",
    },
    ...(ajuste_ebitda_imovel !== 0
      ? [
          {
            label:
              input.proprietario_imovel === "Sim"
                ? "Renda teórica de mercado (imóvel próprio)"
                : "Acréscimo de renda até valor de mercado",
            valor: ajuste_ebitda_imovel,
            tipo: "ajuste" as const,
          },
        ]
      : []),
    { label: "EBITDA normalizado", valor: ebitda_normalizado_final, tipo: "total" },
  ];

  // Efeitos qualitativos definidos manualmente (apenas apresentação; multiplicador 1.0).
  const faturacao_ref = input.faturacao_ano1;
  const efeito_faturacao: EfeitoAjuste =
    faturacao_ref < 5_000_000 ? "Negativo" : faturacao_ref < 20_000_000 ? "Neutro" : "Positivo";

  const ajustes: Ajuste[] = [
    {
      label: "Volume de negócios",
      detalhe:
        faturacao_ref < 5_000_000
          ? "Faturação abaixo de 5M€"
          : faturacao_ref < 20_000_000
            ? "Faturação entre 5M€ e 20M€"
            : "Faturação de 20M€ ou mais",
      multiplicador: 1.0,
      efeito: efeito_faturacao,
    },
    {
      label: "Dimensão dos resultados",
      detalhe: ebitda_abaixo_2m ? `EBITDA normalizado abaixo de 2M€` : "EBITDA normalizado de 2M€ ou mais",
      multiplicador: 1.0,
      efeito: ebitda_abaixo_2m ? "Negativo" : "Positivo",
    },
    {
      label: "Idade da empresa",
      detalhe:
        input.idade_empresa < 3
          ? "Menos de 3 anos"
          : input.idade_empresa > 10
            ? "Mais de 10 anos"
            : "Entre 3 e 10 anos",
      multiplicador: ajuste_idade,
    },
    {
      label: "Crescimento",
      detalhe:
        crescimento === null
          ? "Histórico insuficiente"
          : crescimento < 0
            ? "Faturação em queda face ao ano mais antigo indicado"
            : crescimento > 0.1
              ? `Crescimento acumulado de ${(crescimento * 100).toFixed(0)}%`
              : "Crescimento acumulado até 10%",
      multiplicador: ajuste_crescimento,
      semDados: crescimento === null,
    },
    {
      label: "Unidades / localizações",
      detalhe:
        unidades === null
          ? "Não indicado"
          : unidades === "Localização única"
            ? "Operação concentrada numa única localização"
            : unidades === "Mais de 3 localizações"
              ? "Operação multi-unidade (mais de 3 localizações)"
              : unidades === "Não aplicável"
                ? "Não aplicável ao modelo de negócio"
                : "Operação em 2-3 localizações",
      multiplicador: ajuste_unidades,
      semDados: unidades === null,
    },
    {
      label: "Concentração de clientes",
      detalhe:
        top5 === null
          ? "Não indicada"
          : top5 < 30
            ? "Base de clientes diversificada"
            : top5 <= 60
              ? "Concentração moderada nos 5 maiores clientes"
              : "Forte dependência dos 5 maiores clientes",
      multiplicador: ajuste_concentracao,
      semDados: top5 === null,
    },
    {
      label: "Geografia dos clientes",
      detalhe:
        geo === null ? "Não indicada" : geo === GEOGRAFIA_EQUILIBRADO ? "Equilíbrio nacional/internacional" : geo,
      multiplicador: ajuste_geografia,
      semDados: geo === null,
    },
    {
      label: "Dependência do acionista (faturação)",
      detalhe:
        depFat === null
          ? "Não indicada"
          : depFat.startsWith("Baixa")
            ? "Carteira pouco dependente do acionista"
            : depFat.startsWith("Alta")
              ? "Forte dependência comercial do acionista"
              : "Dependência moderada do acionista",
      multiplicador: ajuste_dep_faturacao,
      semDados: depFat === null,
    },
    {
      label: "Dependência do acionista (gestão)",
      detalhe:
        depGest === null
          ? "Não indicada"
          : depGest === "Baixa"
            ? "Gestão autónoma face ao acionista"
            : depGest === "Alta"
              ? "Gestão fortemente centrada no acionista"
              : "Dependência moderada do acionista",
      multiplicador: ajuste_dep_gestao,
      semDados: depGest === null,
    },
    {
      label: "Intensidade de investimento (capex)",
      detalhe:
        capex_intensidade === null
          ? "Não indicada"
          : capex_intensidade < 0.15
            ? "Capex recorrente reduzido face à faturação"
            : capex_intensidade <= 0.3
              ? "Capex recorrente relevante face à faturação"
              : "Capex recorrente elevado face à faturação",
      multiplicador: ajuste_capex,
      semDados: capex_intensidade === null,
    },
  ];

  const { pontos: pontos_confianca, confianca, dimensoes: dimensoes_confianca } = calcularIndiceConfianca(input);

  // DCF — mesma base de dados e mesmo EBITDA normalizado usados no método de múltiplos.
  const dcf = calcularDCF({
    pais: input.pais,
    industria: input.industria,
    ano_referencia: input.ano_referencia,
    ebitda_normalizado: ebitda_normalizado_final,
    receitas_historicas: [
      { ano: input.ano_referencia - 2, receita: input.faturacao_ano3 ?? 0, ebitda: input.ebitda_ano3 },
      { ano: input.ano_referencia - 1, receita: input.faturacao_ano2 ?? 0, ebitda: input.ebitda_ano2 },
      { ano: input.ano_referencia, receita: input.faturacao_ano1, ebitda: ebitda_normalizado_final },
    ].filter((h) => h.receita > 0),
    capex_anual_recorrente: input.capex_anual_recorrente ?? null,
    depreciacoes_amortizacoes: input.depreciacoes_amortizacoes ?? null,
    divida_liquida,
    ativos_nao_operacionais: valor_imovel_a_adicionar,
    ev_multiplos: (ev_min + ev_max) / 2,

  });

  return {
    ok: true,
    ebitda_reportado: input.ebitda_ano1,
    ebitda_base: ebitda_normalizado_final,
    linhas_ebitda,
    ano_referencia: input.ano_referencia,
    multiplo_base_min: base.min,
    multiplo_base_max: base.max,
    multiplo_ajustado_min,
    multiplo_ajustado_max,
    multiplo_ajustado_medio,
    fator_ajustes: fator,
    ev_min,
    ev_max,
    ev_medio: roundToThousand((ev_min + ev_max) / 2),
    divida_financeira,
    caixa,
    divida_liquida,
    posicao_liquida,
    // O valor do imóvel só entra no Equity Value final, nunca no Enterprise Value.
    equity_min,
    equity_max,
    equity_medio,
    tem_divida: divida_liquida !== 0,
    ajuste_ebitda_imovel,
    valor_imovel: valor_imovel_a_adicionar,
    cenarios,
    sensibilidade,
    ajustes,
    confianca,
    pontos_confianca,
    dimensoes_confianca,
    anos_preenchidos,
    dcf,
    ...(base.nota ? { nota_setor: base.nota } : {}),
    ...(ebitda_normalizado_final > input.faturacao_ano1 * 0.7 ? { aviso_margem: AVISO_MARGEM } : {}),
  };
}

export const formatEUR = (n: number) => {
  const neg = n < 0;
  const s = Math.abs(Math.round(n)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
  return `${neg ? "-" : ""}${s}\u00a0€`;
};
