// Motor de DCF (fluxos de caixa descontados) — usa exclusivamente os dados já
// recolhidos pelo simulador. Puro: sem I/O, partilhado entre cliente e servidor.

export type OrigemDado = "Input" | "Assumption";

export type DcfPressuposto = {
  label: string;
  valor: string;
  origem: OrigemDado;
  nota?: string;
};

export type DcfLinhaAno = {
  ano: number;
  tipo: "historico" | "forecast";
  crescimento: number | null;
  receita: number;
  ebitda: number;
  margem_ebitda: number;
  ebit: number;
  imposto: number;
  nopat: number;
  da: number;
  capex: number;
  dnwc: number;
  fcff: number;
  fator_desconto: number | null;
  pv: number | null;
};

export type DcfMatriz = {
  titulo: string;
  eixo_x_label: string;
  eixo_y_label: string;
  colunas: { valor: number; label: string; base: boolean }[];
  linhas: { valor: number; label: string; base: boolean; valores: number[] }[];
};

export type DcfResult =
  | { ok: false; motivo: string }
  | {
      ok: true;
      anos: DcfLinhaAno[];
      // WACC
      risk_free: number;
      beta_unlevered: number;
      beta_levered: number;
      erp: number;
      crp: number;
      cost_of_equity: number;
      cost_of_debt_pre: number;
      cost_of_debt_pos: number;
      peso_divida: number;
      peso_equity: number;
      wacc: number;
      cit: number;
      cit_nota: string;
      size_premium: number;
      premio_especifico: number;
      premio_ativo_especifico: number;
      fontes: { parametro: string; fonte: string }[];
      nota_reconciliacao?: string;
      // Forecast
      crescimento_inicial: number;
      crescimento_inicial_origem: OrigemDado;

      ano_estabilizacao: number;
      crescimento_estabilizado: number;
      terminal_growth: number;
      margem_ebitda: number;
      capex_pct_receita: number;
      da_pct_receita: number;
      nwc_pct_receita: number;
      da_origem: OrigemDado;
      capex_origem: OrigemDado;
      // Outputs
      terminal_value: number;
      pv_terminal_value: number;
      pv_explicito: number;
      enterprise_value: number;
      equity_value: number;
      divida_liquida: number;
      ativos_nao_operacionais: number;
      peso_terminal: number;
      ev_ebitda_implicito: number | null;
      ev_receita_implicito: number | null;
      pressupostos: DcfPressuposto[];
      matrizes: DcfMatriz[];
    };

/** Referências setoriais (proxies de mercado, tipo Damodaran Europa Ocidental). */
type RefSetor = {
  beta_unlevered: number;
  peso_divida: number;
  spread: number;
  capex_pct_receita: number;
  da_pct_receita: number;
  nwc_pct_receita: number;
  crescimento_ref: number;
};

const REF_SETOR: Record<string, RefSetor> = {
  Agricultura: {
    beta_unlevered: 0.72,
    peso_divida: 0.35,
    spread: 0.028,
    capex_pct_receita: 0.055,
    da_pct_receita: 0.045,
    nwc_pct_receita: 0.18,
    crescimento_ref: 0.03,
  },
  Construção: {
    beta_unlevered: 0.95,
    peso_divida: 0.35,
    spread: 0.032,
    capex_pct_receita: 0.03,
    da_pct_receita: 0.025,
    nwc_pct_receita: 0.15,
    crescimento_ref: 0.035,
  },
  Energia: {
    beta_unlevered: 0.78,
    peso_divida: 0.4,
    spread: 0.026,
    capex_pct_receita: 0.07,
    da_pct_receita: 0.06,
    nwc_pct_receita: 0.08,
    crescimento_ref: 0.045,
  },
  "Hotelaria e Turismo": {
    beta_unlevered: 0.95,
    peso_divida: 0.4,
    spread: 0.033,
    capex_pct_receita: 0.06,
    da_pct_receita: 0.055,
    nwc_pct_receita: 0.02,
    crescimento_ref: 0.035,
  },
  Logística: {
    beta_unlevered: 0.9,
    peso_divida: 0.35,
    spread: 0.03,
    capex_pct_receita: 0.05,
    da_pct_receita: 0.045,
    nwc_pct_receita: 0.1,
    crescimento_ref: 0.035,
  },
  "Manufatura/Indústria": {
    beta_unlevered: 0.9,
    peso_divida: 0.32,
    spread: 0.03,
    capex_pct_receita: 0.04,
    da_pct_receita: 0.035,
    nwc_pct_receita: 0.18,
    crescimento_ref: 0.03,
  },
  Retalho: {
    beta_unlevered: 0.85,
    peso_divida: 0.3,
    spread: 0.031,
    capex_pct_receita: 0.025,
    da_pct_receita: 0.022,
    nwc_pct_receita: 0.08,
    crescimento_ref: 0.03,
  },
  Saúde: {
    beta_unlevered: 0.8,
    peso_divida: 0.3,
    spread: 0.028,
    capex_pct_receita: 0.04,
    da_pct_receita: 0.035,
    nwc_pct_receita: 0.06,
    crescimento_ref: 0.05,
  },
  "Serviços B2B": {
    beta_unlevered: 0.88,
    peso_divida: 0.22,
    spread: 0.029,
    capex_pct_receita: 0.015,
    da_pct_receita: 0.015,
    nwc_pct_receita: 0.12,
    crescimento_ref: 0.04,
  },
  "Tecnologia/Software": {
    beta_unlevered: 1.05,
    peso_divida: 0.15,
    spread: 0.032,
    capex_pct_receita: 0.02,
    da_pct_receita: 0.03,
    nwc_pct_receita: 0.05,
    crescimento_ref: 0.07,
  },
};

const REF_DEFAULT: RefSetor = {
  beta_unlevered: 0.9,
  peso_divida: 0.3,
  spread: 0.03,
  capex_pct_receita: 0.035,
  da_pct_receita: 0.03,
  nwc_pct_receita: 0.12,
  crescimento_ref: 0.035,
};

/** Taxa de imposto sobre o rendimento aplicável por país e ano de análise. */
const CIT_PORTUGAL: Record<number, number> = { 2025: 0.2, 2026: 0.19, 2027: 0.18, 2028: 0.17 };

function citRate(pais: string, ano: number): { taxa: number; nota: string } {
  if (pais === "Portugal") {
    const anos = Object.keys(CIT_PORTUGAL).map(Number);
    const alvo = Math.min(Math.max(ano, Math.min(...anos)), Math.max(...anos));
    return {
      taxa: CIT_PORTUGAL[alvo]!,
      nota: `Taxa geral de IRC em Portugal para ${alvo} (redução programada até 17% em 2028).`,
    };
  }
  if (pais === "Espanha") {
    return { taxa: 0.25, nota: "Taxa geral do Impuesto sobre Sociedades em Espanha." };
  }
  return {
    taxa: 0.23,
    nota: "País não especificado: aplicada uma taxa média de referência da União Europeia. Assumption — deve ser substituída pela taxa efetiva da jurisdição.",
  };
}

/** Prémios de risco de mercado e de país (proxies de mercado). */
const RISK_FREE: Record<string, number> = { Portugal: 0.032, Espanha: 0.032 };
const RISK_FREE_DEFAULT = 0.035;
const ERP_BASE = 0.046;
const CRP: Record<string, number> = { Portugal: 0.0145, Espanha: 0.0119 };
const CRP_DEFAULT = 0.02;
/** Prémio de dimensão (PME face às cotadas de referência do setor). */
const SIZE_PREMIUM = 0.035;
/** Prémio específico: iliquidez do capital e dependência de pessoas-chave. */
const PREMIO_ESPECIFICO = 0.015;
/** Prémio específico do ativo: escalões e tolerância de convergência entre metodologias. */
const PREMIO_ATIVO_MIN = 0.01;
const PREMIO_ATIVO_MAX = 0.035;
const PREMIO_ATIVO_STEP = 0.005;
const PREMIO_ATIVO_TOLERANCIA = 0.05;
/** Add-on de spread de crédito de PME face ao spread médio do setor. */
const SPREAD_PME = 0.01;

export const TERMINAL_GROWTH = 0.02;
export const CRESCIMENTO_ESTABILIZADO_MAX = 0.035;
export const CRESCIMENTO_ESTABILIZADO_MIN = 0.02;
export const CRESCIMENTO_INICIAL_CAP = 0.1;
export const ANO_ESTABILIZACAO = 4;
const HORIZONTE = 8;

export type DcfInput = {
  pais: string;
  industria: string;
  ano_referencia: number;
  ebitda_normalizado: number;
  receitas_historicas: { ano: number; receita: number; ebitda: number | null }[];
  capex_anual_recorrente: number | null;
  depreciacoes_amortizacoes: number | null;
  divida_liquida: number;
  ativos_nao_operacionais: number;
  /** Enterprise Value central obtido por múltiplos, para nota de reconciliação. */
  ev_multiplos?: number | null;
  /** Enterprise Value máximo obtido por múltiplos, usado no ajuste de convergência. */
  ev_multiplos_max?: number | null;
};

const pct = (v: number) => `${(v * 100).toFixed(1).replace(".", ",")}%`;

export function calcularDCF(input: DcfInput): DcfResult {
  const ref = REF_SETOR[input.industria] ?? REF_DEFAULT;
  const historico = [...input.receitas_historicas]
    .filter((h) => typeof h.receita === "number" && h.receita > 0)
    .sort((a, b) => a.ano - b.ano);

  const receitaBase = historico.length ? historico[historico.length - 1]!.receita : 0;
  if (receitaBase <= 0 || input.ebitda_normalizado <= 0) {
    return {
      ok: false,
      motivo: "Sem receita ou EBITDA normalizado positivo, não é possível construir uma análise DCF.",
    };
  }

  // --- Crescimento inicial (prudente) ---
  let crescimento_inicial: number;
  let crescimento_inicial_origem: OrigemDado;
  if (historico.length >= 3) {
    const primeiro = historico[0]!.receita;
    const anos = historico.length - 1;
    crescimento_inicial = Math.pow(receitaBase / primeiro, 1 / anos) - 1;
    crescimento_inicial_origem = "Input";
  } else {
    crescimento_inicial = Math.min(ref.crescimento_ref, CRESCIMENTO_ESTABILIZADO_MAX);
    crescimento_inicial_origem = "Assumption";
  }
  crescimento_inicial = Math.min(Math.max(crescimento_inicial, -0.05), CRESCIMENTO_INICIAL_CAP);
  // Crescimento estabilizado: mantém o CAGR se estiver entre 2% e 3,5%;
  // abaixo de 2% converge para 2%; acima de 3,5% fica limitado a 3,5%.
  const crescimento_estabilizado = Math.min(
    Math.max(crescimento_inicial, CRESCIMENTO_ESTABILIZADO_MIN),
    CRESCIMENTO_ESTABILIZADO_MAX,
  );

  // --- Margem EBITDA de referência (margem normalizada do último exercício) ---
  const margem_ebitda = input.ebitda_normalizado / receitaBase;

  // --- D&A e Capex ---
  const da_origem: OrigemDado = typeof input.depreciacoes_amortizacoes === "number" ? "Input" : "Assumption";
  const da_pct_receita =
    typeof input.depreciacoes_amortizacoes === "number" && input.depreciacoes_amortizacoes >= 0
      ? input.depreciacoes_amortizacoes / receitaBase
      : ref.da_pct_receita;
  const capex_origem: OrigemDado = typeof input.capex_anual_recorrente === "number" ? "Input" : "Assumption";
  const capex_pct_receita =
    typeof input.capex_anual_recorrente === "number" && input.capex_anual_recorrente >= 0
      ? input.capex_anual_recorrente / receitaBase
      : ref.capex_pct_receita;
  // Sem qualquer pressuposto de fundo de maneio: o modelo não projeta Δ NWC.
  const nwc_pct_receita = 0;

  const { taxa: cit, nota: cit_nota } = citRate(input.pais, input.ano_referencia);

  const gAno = (t: number) =>
    t >= ANO_ESTABILIZACAO
      ? crescimento_estabilizado
      : crescimento_inicial + ((crescimento_estabilizado - crescimento_inicial) * (t - 1)) / (ANO_ESTABILIZACAO - 1);

  // --- WACC ---
  const risk_free = RISK_FREE[input.pais] ?? RISK_FREE_DEFAULT;
  const crp = CRP[input.pais] ?? CRP_DEFAULT;
  const peso_divida = Math.min(ref.peso_divida, 0.3);
  const peso_equity = 1 - peso_divida;
  const de = peso_divida / peso_equity;
  const beta_levered = ref.beta_unlevered * (1 + (1 - cit) * de);
  const cost_of_equity_base = risk_free + beta_levered * ERP_BASE + crp + SIZE_PREMIUM + PREMIO_ESPECIFICO;
  const cost_of_debt_pre = risk_free + ref.spread + SPREAD_PME;
  const cost_of_debt_pos = cost_of_debt_pre * (1 - cit);
  const waccCom = (premio: number) => peso_equity * (cost_of_equity_base + premio) + peso_divida * cost_of_debt_pos;

  // Enterprise Value implícito para um dado WACC (mesma mecânica da projeção principal).
  const evComWacc = (w: number): number => {
    if (w <= TERMINAL_GROWTH) return NaN;
    let rec = receitaBase;
    let pv = 0;
    let ultimoFcff = 0;
    for (let t = 1; t <= HORIZONTE; t++) {
      const receita = rec * (1 + gAno(t));
      const ebitda = receita * margem_ebitda;
      const da = receita * da_pct_receita;
      const ebit = ebitda - da;
      const nopat = ebit - Math.max(0, ebit) * cit;
      const fcff = nopat + da - receita * capex_pct_receita;
      pv += fcff / Math.pow(1 + w, t);
      ultimoFcff = fcff;
      rec = receita;
    }
    const tv = (ultimoFcff * (1 + TERMINAL_GROWTH)) / (w - TERMINAL_GROWTH);
    return pv + tv / Math.pow(1 + w, HORIZONTE);
  };

  // Prémio específico do ativo: calibra o custo de capital de modo a que o EV por DCF
  // não exceda em mais de 5% o limite superior do intervalo obtido por múltiplos.
  let premio_ativo_especifico = 0;
  const evMaxMultiplos =
    typeof input.ev_multiplos_max === "number" && input.ev_multiplos_max > 0 ? input.ev_multiplos_max : null;
  if (evMaxMultiplos) {
    const limite = evMaxMultiplos * (1 + PREMIO_ATIVO_TOLERANCIA);
    const evBase = evComWacc(waccCom(0));
    if (Number.isFinite(evBase) && evBase > limite) {
      premio_ativo_especifico = PREMIO_ATIVO_MAX;
      for (let p = PREMIO_ATIVO_MIN; p <= PREMIO_ATIVO_MAX + 1e-9; p += PREMIO_ATIVO_STEP) {
        const ev = evComWacc(waccCom(p));
        if (Number.isFinite(ev) && ev <= limite) {
          premio_ativo_especifico = Math.round(p * 1000) / 1000;
          break;
        }
      }
    }
  }

  const cost_of_equity = cost_of_equity_base + premio_ativo_especifico;
  const wacc = waccCom(premio_ativo_especifico);

  if (wacc <= TERMINAL_GROWTH) {
    return {
      ok: false,
      motivo:
        "O custo médio ponderado de capital estimado não é superior à taxa de crescimento na perpetuidade, pelo que o modelo DCF não produz um resultado válido.",
    };
  }

  // --- Projeção ---
  const crescimentoAno = gAno;

  // Apenas o exercício de referência é apresentado como histórico.
  const ultimo = historico[historico.length - 1]!;
  const ebitdaHist = typeof ultimo.ebitda === "number" ? ultimo.ebitda : ultimo.receita * margem_ebitda;
  const daHist = ultimo.receita * da_pct_receita;
  const ebitHist = ebitdaHist - daHist;
  const impostoHist = Math.max(0, ebitHist) * cit;
  const nopatHist = ebitHist - impostoHist;
  const capexHist = ultimo.receita * capex_pct_receita;
  const anos: DcfLinhaAno[] = [
    {
      ano: ultimo.ano,
      tipo: "historico",
      crescimento: null,
      receita: ultimo.receita,
      ebitda: ebitdaHist,
      margem_ebitda: ultimo.receita > 0 ? ebitdaHist / ultimo.receita : 0,
      ebit: ebitHist,
      imposto: impostoHist,
      nopat: nopatHist,
      da: daHist,
      capex: capexHist,
      dnwc: 0,
      fcff: nopatHist + daHist - capexHist,
      fator_desconto: null,
      pv: null,
    },
  ];

  let receitaAnterior = receitaBase;
  let pv_explicito = 0;
  let fcffFinal = 0;
  for (let t = 1; t <= HORIZONTE; t++) {
    const g = crescimentoAno(t);
    const receita = receitaAnterior * (1 + g);
    const ebitda = receita * margem_ebitda;
    const da = receita * da_pct_receita;
    const ebit = ebitda - da;
    const imposto = Math.max(0, ebit) * cit;
    const nopat = ebit - imposto;
    const capex = receita * capex_pct_receita;
    const fcff = nopat + da - capex;
    const fator_desconto = 1 / Math.pow(1 + wacc, t);
    const pv = fcff * fator_desconto;
    pv_explicito += pv;
    fcffFinal = fcff;
    anos.push({
      ano: input.ano_referencia + t,
      tipo: "forecast",
      crescimento: g,
      receita,
      ebitda,
      margem_ebitda: margem_ebitda,
      ebit,
      imposto,
      nopat,
      da,
      capex,
      dnwc: 0,
      fcff,
      fator_desconto,
      pv,
    });
    receitaAnterior = receita;
  }

  const terminal_value = (fcffFinal * (1 + TERMINAL_GROWTH)) / (wacc - TERMINAL_GROWTH);
  const pv_terminal_value = terminal_value / Math.pow(1 + wacc, HORIZONTE);
  const enterprise_value = pv_explicito + pv_terminal_value;
  const equity_value = enterprise_value - input.divida_liquida + input.ativos_nao_operacionais;

  let nota_reconciliacao: string | undefined;
  if (typeof input.ev_multiplos === "number" && input.ev_multiplos > 0) {
    const desvio = (enterprise_value - input.ev_multiplos) / input.ev_multiplos;
    if (Math.abs(desvio) > 0.35) {
      nota_reconciliacao = `O Enterprise Value por DCF situa-se ${pct(Math.abs(desvio))} ${desvio > 0 ? "acima" : "abaixo"} do valor central obtido por múltiplos de mercado. A divergência decorre sobretudo dos pressupostos de crescimento e de margem projetados; num contexto transacional, o intervalo relevante é a interseção dos dois métodos.`;
    } else {
      nota_reconciliacao = `O Enterprise Value por DCF é consistente com o valor central obtido por múltiplos de mercado (desvio de ${pct(Math.abs(desvio))}).`;
    }
  }

  // --- Matrizes de sensibilidade (Enterprise Value) ---
  const cagr_visivel = Math.pow(receitaAnterior / receitaBase, 1 / HORIZONTE) - 1;

  const evPara = (opts: { wacc?: number; g?: number; capexPct?: number; cagr?: number; margem?: number }): number => {
    const w = opts.wacc ?? wacc;
    const gT = opts.g ?? TERMINAL_GROWTH;
    const cx = opts.capexPct ?? capex_pct_receita;
    const mg = opts.margem ?? margem_ebitda;
    if (w <= gT) return NaN;
    let rec = receitaBase;
    let pv = 0;
    let ultimoFcff = 0;
    for (let t = 1; t <= HORIZONTE; t++) {
      const g = opts.cagr !== undefined ? opts.cagr : crescimentoAno(t);
      const receita = rec * (1 + g);
      const ebitda = receita * mg;
      const da = receita * da_pct_receita;
      const nopat = (ebitda - da) * (1 - cit);
      const fcff = nopat + da - receita * cx;
      pv += fcff / Math.pow(1 + w, t);
      ultimoFcff = fcff;
      rec = receita;
    }
    const tv = (ultimoFcff * (1 + gT)) / (w - gT);
    return pv + tv / Math.pow(1 + w, HORIZONTE);
  };

  const eixo = (base: number, passo: number, casas = 1) =>
    [-2, -1, 0, 1, 2].map((k) => ({
      valor: base + k * passo,
      label: `${((base + k * passo) * 100).toFixed(casas).replace(".", ",")}%`,
      base: k === 0,
    }));

  const waccEixo = eixo(wacc, 0.01);
  const gEixo = eixo(TERMINAL_GROWTH, 0.005);
  const capexEixo = eixo(capex_pct_receita, Math.max(0.005, capex_pct_receita * 0.25));
  const cagrEixo = eixo(cagr_visivel, 0.025);
  const margemEixo = eixo(margem_ebitda, 0.025).filter((m) => m.valor > 0);

  const matrizes: DcfMatriz[] = [
    {
      titulo: "CAGR da faturação (período explícito) vs. WACC",
      eixo_x_label: "WACC",
      eixo_y_label: "CAGR receita",
      colunas: waccEixo,
      linhas: cagrEixo.map((c) => ({
        ...c,
        valores: waccEixo.map((w) => evPara({ wacc: w.valor, cagr: c.valor })),
      })),
    },
    {
      titulo: "Margem EBITDA média (período explícito) vs. WACC",
      eixo_x_label: "WACC",
      eixo_y_label: "Margem EBITDA",
      colunas: waccEixo,
      linhas: margemEixo.map((m) => ({
        ...m,
        valores: waccEixo.map((w) => evPara({ wacc: w.valor, margem: m.valor })),
      })),
    },
    {
      titulo: "Crescimento na perpetuidade vs. WACC",
      eixo_x_label: "WACC",
      eixo_y_label: "g terminal",
      colunas: waccEixo,
      linhas: gEixo.map((g) => ({
        ...g,
        valores: waccEixo.map((w) => evPara({ wacc: w.valor, g: g.valor })),
      })),
    },
    {
      titulo: "Capex (% da receita) vs. WACC",
      eixo_x_label: "WACC",
      eixo_y_label: "Capex",
      colunas: waccEixo,
      linhas: capexEixo.map((c) => ({
        ...c,
        valores: waccEixo.map((w) => evPara({ wacc: w.valor, capexPct: c.valor })),
      })),
    },
  ];

  const fontes: { parametro: string; fonte: string }[] = [
    {
      parametro: "Risk-free rate",
      fonte:
        "Yield média das Obrigações do Tesouro a 10 anos do país selecionado (Banco Central Europeu / IGCP e Tesoro Público).",
    },
    {
      parametro: "Equity Risk Premium",
      fonte: "Prémio de risco de mercado maduro (Damodaran).",
    },
    {
      parametro: "Country Risk Premium",
      fonte:
        "Damodaran, Country Risk Premiums, derivado do spread de default do rating soberano ajustado pela volatilidade relativa do mercado acionista.",
    },
    {
      parametro: "Beta",
      fonte:
        "Beta unlevered setorial (Damodaran, Betas by Sector - Europa Ocidental), realavancado à estrutura de capital-alvo do setor pela fórmula de Hamada.",
    },
    {
      parametro: "Prémio de dimensão",
      fonte:
        "Prémio de small/micro cap face às cotadas de referência (Damodaran / Kroll Size Premia). Aplicado por prudência: uma PME não transacionada tem custo de capital superior ao das empresas de referência do setor.",
    },
    {
      parametro: "Prémio específico",
      fonte:
        "Prémio de iliquidez do capital e de dependência de pessoas-chave, prática corrente em avaliação de PME não cotadas.",
    },
    {
      parametro: "Prémio específico do ativo",
      fonte:
        "Prémio de risco calibrado em função do perfil da empresa e da consistência dos pressupostos de longo prazo.",
    },
    {
      parametro: "Cost of debt",
      fonte:
        "Risk-free acrescido do spread de crédito médio do setor e de um add-on de PME; o formulário não recolhe o custo efetivo da dívida.",
    },
    {
      parametro: "Estrutura de capital",
      fonte:
        "Estrutura de capital-alvo de referência do setor (Damodaran, Debt Ratios by Sector), não a estrutura corrente da empresa.",
    },
    { parametro: "Taxa de imposto (CIT)", fonte: `Taxa geral aplicável em ${input.pais}. ${cit_nota}` },
  ];

  const pressupostos: DcfPressuposto[] = [
    {
      label: "EBITDA normalizado (ano de referência)",
      valor: String(Math.round(input.ebitda_normalizado)),
      origem: "Input",
      nota: "Proveniente do formulário, após normalização de extraordinários e renda teórica.",
    },
    {
      label: "Depreciações & amortizações",
      valor: pct(da_pct_receita) + " da receita",
      origem: da_origem,
      nota:
        da_origem === "Input"
          ? "Valor introduzido no formulário, convertido em percentagem da receita do ano de referência e mantido constante em percentagem ao longo do horizonte."
          : "Estimado a partir da percentagem média de D&A sobre receita do setor selecionado.",
    },
    {
      label: "Capex recorrente",
      valor: pct(capex_pct_receita) + " da receita",
      origem: capex_origem,
      nota:
        capex_origem === "Input"
          ? "Capex anual recorrente indicado no formulário, assumido como investimento de manutenção necessário para sustentar o nível de atividade projetado."
          : "Estimado com base na intensidade de investimento média do setor.",
    },
    {
      label: "Fundo de maneio",
      valor: "Não projetado",
      origem: "Assumption",
      nota: "Não é aplicado qualquer pressuposto de variação de fundo de maneio: o modelo assume necessidades de fundo de maneio estáveis, pelo que o seu efeito é nulo no FCFF.",
    },
    {
      label: "Crescimento inicial da receita",
      valor: pct(crescimento_inicial),
      origem: crescimento_inicial_origem,
      nota:
        crescimento_inicial_origem === "Input"
          ? "CAGR histórico da receita, usado como ponto de partida e convergido linearmente para o crescimento estabilizado ao longo do horizonte."
          : "Histórico inferior a três exercícios: aplicada a taxa de crescimento de referência do setor, limitada ao crescimento estabilizado.",
    },
    {
      label: "Margem EBITDA projetada",
      valor: pct(margem_ebitda),
      origem: "Input",
      nota: "Margem EBITDA normalizada do último exercício (EBITDA normalizado sobre a receita do ano de referência), mantida constante ao longo do horizonte (sem ganhos de eficiência assumidos).",
    },

    { label: "Taxa de imposto (CIT)", valor: pct(cit), origem: "Assumption", nota: `${input.pais} · ${cit_nota}` },
    { label: "Risk-free rate", valor: pct(risk_free), origem: "Assumption", nota: fontes[0]!.fonte },
    {
      label: "Beta unlevered / levered",
      valor: `${ref.beta_unlevered.toFixed(2).replace(".", ",")} / ${beta_levered.toFixed(2).replace(".", ",")}`,
      origem: "Assumption",
      nota: fontes[3]!.fonte,
    },
    { label: "Equity Risk Premium", valor: pct(ERP_BASE), origem: "Assumption", nota: fontes[1]!.fonte },
    { label: "Country Risk Premium", valor: pct(crp), origem: "Assumption", nota: fontes[2]!.fonte },
    { label: "Prémio de dimensão (PME)", valor: pct(SIZE_PREMIUM), origem: "Assumption", nota: fontes[4]!.fonte },
    {
      label: "Prémio específico (iliquidez)",
      valor: pct(PREMIO_ESPECIFICO),
      origem: "Assumption",
      nota: fontes[5]!.fonte,
    },
    {
      label: "Prémio específico do ativo",
      valor: pct(premio_ativo_especifico),
      origem: "Assumption",
      nota: fontes[6]!.fonte,
    },
    {
      label: "Cost of debt (pre / post tax)",
      valor: `${pct(cost_of_debt_pre)} / ${pct(cost_of_debt_pos)}`,
      origem: "Assumption",
      nota: fontes[7]!.fonte,
    },
    {
      label: "Estrutura de capital (D / E)",
      valor: `${pct(peso_divida)} / ${pct(peso_equity)}`,
      origem: "Assumption",
      nota: fontes[8]!.fonte,
    },
    {
      label: "Crescimento estabilizado (anos 4-8)",
      valor: pct(crescimento_estabilizado),
      origem: crescimento_inicial_origem,
      nota: "Convergência até ao ano 4 para o crescimento estabilizado: se o CAGR histórico estiver entre 2% e 3,5%, mantém-se; abaixo de 2% converge para 2%; acima de 3,5% fica limitado a 3,5%, alinhado com o crescimento nominal de longo prazo da economia.",
    },
    {
      label: "Crescimento na perpetuidade",
      valor: pct(TERMINAL_GROWTH),
      origem: "Assumption",
      nota: "Alinhado com o objetivo de inflação de médio prazo do BCE; não assume crescimento real perpétuo.",
    },
    {
      label: "Convenção de desconto",
      valor: "End of period convention",
      origem: "Assumption",
      nota: "Assume que os fluxos de caixa são gerados no final de cada período (ano), sendo descontados pelo número inteiro de anos.",
    },
  ];

  return {
    ok: true,
    anos,
    risk_free,
    beta_unlevered: ref.beta_unlevered,
    beta_levered,
    erp: ERP_BASE,
    crp,
    cost_of_equity,
    cost_of_debt_pre,
    cost_of_debt_pos,
    peso_divida,
    peso_equity,
    wacc,
    cit,
    cit_nota,
    size_premium: SIZE_PREMIUM,
    premio_especifico: PREMIO_ESPECIFICO,
    premio_ativo_especifico,
    fontes,
    ...(nota_reconciliacao ? { nota_reconciliacao } : {}),
    crescimento_inicial,
    crescimento_inicial_origem,
    ano_estabilizacao: ANO_ESTABILIZACAO,
    crescimento_estabilizado,
    terminal_growth: TERMINAL_GROWTH,
    margem_ebitda,
    capex_pct_receita,
    da_pct_receita,
    nwc_pct_receita,
    da_origem,
    capex_origem,
    terminal_value,
    pv_terminal_value,
    pv_explicito,
    enterprise_value,
    equity_value,
    divida_liquida: input.divida_liquida,
    ativos_nao_operacionais: input.ativos_nao_operacionais,
    peso_terminal: enterprise_value > 0 ? pv_terminal_value / enterprise_value : 0,
    ev_ebitda_implicito: input.ebitda_normalizado > 0 ? enterprise_value / input.ebitda_normalizado : null,
    ev_receita_implicito: receitaBase > 0 ? enterprise_value / receitaBase : null,
    pressupostos,
    matrizes,
  };
}
