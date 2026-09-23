// Preparação dos dados do relatório personalizado.
// Puro: sem I/O, sem dependências de servidor — usado no cliente e no servidor.
import {
  calcularValuation,
  type ValuationInput,
  type ValuationResult,
  type Ajuste,
  type Confianca,
  OUTRO,
  OUTRA_INDUSTRIA,
} from "./valuation.ts";
import {
  t,
  type ReportLang,
  formatEURLang,
  formatPercentLang,
  formatMultipleLang,
  formatFactorXLang,
  formatDateLang,
} from "./report-i18n/index.ts";

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

export type ReportData = ReturnType<typeof buildReportData>;

// --- Mapeadores de textos gerados pelo motor de cálculo (chaves canónicas em PT) ---

const CONF_LEVEL_WORD: Record<Confianca, Record<ReportLang, string>> = {
  Baixa: { pt: "Baixa", en: "Low", es: "Baja" },
  Média: { pt: "Média", en: "Medium", es: "Media" },
  Alta: { pt: "Alta", en: "High", es: "Alta" },
};

function traduzirLinhaEbitdaLabel(label: string, ano: number, lang: ReportLang): string {
  const L = t(lang).engine.linhasEbitda;
  if (label === `EBITDA reportado ${ano}`) return L.reportado(ano);
  if (label === "Despesas extraordinárias não recorrentes") return L.despesasExtraordinarias;
  if (label === "Renda teórica de mercado (imóvel próprio)") return L.rendaTeorica;
  if (label === "Acréscimo de renda até valor de mercado") return L.acrescimoRenda;
  if (label === "EBITDA normalizado") return L.normalizado;
  return label;
}

function traduzirAjuste(a: Ajuste, lang: ReportLang): { label: string; detalhe: string } {
  const A = t(lang).engine.ajustes;
  switch (a.label) {
    case "Volume de negócios": {
      const map: Record<string, string> = {
        "Faturação abaixo de 5M€": A.volumeNegocios.abaixo5M,
        "Faturação entre 5M€ e 20M€": A.volumeNegocios.entre5e20M,
        "Faturação de 20M€ ou mais": A.volumeNegocios.acima20M,
      };
      return { label: A.volumeNegocios.label, detalhe: map[a.detalhe] ?? a.detalhe };
    }
    case "Dimensão dos resultados": {
      const map: Record<string, string> = {
        "EBITDA normalizado abaixo de 2M€": A.dimensaoResultados.abaixo2M,
        "EBITDA normalizado de 2M€ ou mais": A.dimensaoResultados.acimaIgual2M,
      };
      return { label: A.dimensaoResultados.label, detalhe: map[a.detalhe] ?? a.detalhe };
    }
    case "Idade da empresa": {
      const map: Record<string, string> = {
        "Menos de 3 anos": A.idadeEmpresa.menos3,
        "Mais de 10 anos": A.idadeEmpresa.mais10,
        "Entre 3 e 10 anos": A.idadeEmpresa.entre3e10,
      };
      return { label: A.idadeEmpresa.label, detalhe: map[a.detalhe] ?? a.detalhe };
    }
    case "Crescimento": {
      if (a.detalhe === "Histórico insuficiente")
        return { label: A.crescimento.label, detalhe: A.crescimento.historicoInsuficiente };
      if (a.detalhe === "Faturação em queda face ao ano mais antigo indicado")
        return { label: A.crescimento.label, detalhe: A.crescimento.emQueda };
      if (a.detalhe === "Crescimento acumulado até 10%")
        return { label: A.crescimento.label, detalhe: A.crescimento.ate10 };
      const mAcum = /^Crescimento acumulado de (\d+)%$/.exec(a.detalhe);
      if (mAcum) return { label: A.crescimento.label, detalhe: A.crescimento.acumulado(mAcum[1]) };
      return { label: A.crescimento.label, detalhe: a.detalhe };
    }
    case "Unidades / localizações": {
      const map: Record<string, string> = {
        "Não indicado": A.unidades.naoIndicado,
        "Operação concentrada numa única localização": A.unidades.unica,
        "Operação multi-unidade (mais de 3 localizações)": A.unidades.maisDe3,
        "Não aplicável ao modelo de negócio": A.unidades.naoAplicavel,
        "Operação em 2-3 localizações": A.unidades.entre2e3,
      };
      return { label: A.unidades.label, detalhe: map[a.detalhe] ?? a.detalhe };
    }
    case "Concentração de clientes": {
      const map: Record<string, string> = {
        "Não indicada": A.concentracaoClientes.naoIndicada,
        "Base de clientes diversificada": A.concentracaoClientes.diversificada,
        "Concentração moderada nos 5 maiores clientes": A.concentracaoClientes.moderada,
        "Forte dependência dos 5 maiores clientes": A.concentracaoClientes.forte,
      };
      return { label: A.concentracaoClientes.label, detalhe: map[a.detalhe] ?? a.detalhe };
    }
    case "Geografia dos clientes": {
      const map: Record<string, string> = {
        "Não indicada": A.geografia.naoIndicada,
        "Equilíbrio nacional/internacional": A.geografia.equilibrio,
      };
      return { label: A.geografia.label, detalhe: map[a.detalhe] ?? a.detalhe };
    }
    case "Dependência do acionista (faturação)": {
      const map: Record<string, string> = {
        "Não indicada": A.depFaturacao.naoIndicada,
        "Carteira pouco dependente do acionista": A.depFaturacao.baixa,
        "Forte dependência comercial do acionista": A.depFaturacao.alta,
        "Dependência moderada do acionista": A.depFaturacao.moderada,
      };
      return { label: A.depFaturacao.label, detalhe: map[a.detalhe] ?? a.detalhe };
    }
    case "Dependência do acionista (gestão)": {
      const map: Record<string, string> = {
        "Não indicada": A.depGestao.naoIndicada,
        "Gestão autónoma face ao acionista": A.depGestao.baixa,
        "Gestão fortemente centrada no acionista": A.depGestao.alta,
        "Dependência moderada do acionista": A.depGestao.moderada,
      };
      return { label: A.depGestao.label, detalhe: map[a.detalhe] ?? a.detalhe };
    }
    case "Intensidade de investimento (capex)": {
      const map: Record<string, string> = {
        "Não indicada": A.capex.naoIndicada,
        "Capex recorrente reduzido face à faturação": A.capex.reduzido,
        "Capex recorrente relevante face à faturação": A.capex.relevante,
        "Capex recorrente elevado face à faturação": A.capex.elevado,
      };
      return { label: A.capex.label, detalhe: map[a.detalhe] ?? a.detalhe };
    }
    default:
      return { label: a.label, detalhe: a.detalhe };
  }
}

function traduzirCenarioPressuposto(nome: string, pressuposto: string, lang: ReportLang): string {
  const C = t(lang).engine.cenarios;
  if (nome === "Conservador") return C.conservador;
  if (nome === "Base") return C.base;
  if (nome === "Otimista") return C.otimista;
  return pressuposto;
}

const DIMENSAO_MAP: Record<string, keyof ReturnType<typeof t>["engine"]["dimensoes"]> = {
  "Histórico financeiro": "historicoFinanceiro",
  "Qualidade do EBITDA": "qualidadeEbitda",
  "Posição financeira": "posicaoFinanceira",
  "Enquadramento setorial": "enquadramentoSetorial",
  "Perfil de risco": "perfilRisco",
};

const ITEM_CONFIANCA_MAP: Record<string, keyof ReturnType<typeof t>["engine"]["itensConfianca"]> = {
  "Faturação do ano de referência": "faturacaoAnoReferencia",
  "Faturação do ano anterior": "faturacaoAnoAnterior",
  "Faturação de há três anos": "faturacaoTresAnos",
  "EBITDA do ano anterior": "ebitdaAnoAnterior",
  "EBITDA de há três anos": "ebitdaTresAnos",
  "Tipo de período de referência": "tipoPeriodoReferencia",
  "Despesas extraordinárias identificadas": "despesasExtraordinariasIdentificadas",
  "Enquadramento do imóvel de operação": "enquadramentoImovel",
  "Capex anual recorrente": "capexAnualRecorrente",
  "Caixa e depósitos": "caixaDepositos",
  "Dívida financeira": "dividaFinanceira",
  "Indústria identificada": "industriaIdentificada",
  "Sub-indústria identificada": "subindustriaIdentificada",
  "Atividade principal descrita": "atividadePrincipalDescrita",
  "Concentração dos 5 maiores clientes": "concentracaoTop5",
  "Peso do maior cliente": "pesoMaiorCliente",
  "Unidades / localizações": "unidadesLocalizacoes",
  "Geografia dos clientes": "geografiaClientes",
  "Dependência do acionista (faturação)": "depFaturacao",
  "Dependência do acionista (gestão)": "depGestao",
};

/**
 * Prepara todos os dados (valores formatados, flags e textos dinâmicos) que o
 * template do relatório consome. `result` deve vir de `calcularValuation`
 * com o mesmo input, garantindo números idênticos aos da página.
 */
export function buildReportData(lead: ReportLead, result: ValuationResult, lang: ReportLang = "pt") {
  const L = t(lang);
  const ok = result.ok;
  const r = result.ok ? result : null;
  const ano = lead.ano_referencia ?? new Date().getFullYear();
  const fat1 = lead.faturacao_ano1 ?? 0;

  const NAO_INDICADO = L.common.naoIndicado;
  const pct1 = (v: number) => formatPercentLang(v, lang);
  const eur = (v?: number | null) => (typeof v === "number" ? formatEURLang(Math.round(v), lang) : NAO_INDICADO);

  // Histórico: apenas anos efetivamente preenchidos.
  const anosBrutos = [
    { ano, faturacao: lead.faturacao_ano1, ebitda: lead.ebitda_ano1, desp: lead.despesas_extraordinarias_ano1 },
    {
      ano: ano - 1,
      faturacao: lead.faturacao_ano2,
      ebitda: lead.ebitda_ano2,
      desp: lead.despesas_extraordinarias_ano2,
    },
    {
      ano: ano - 2,
      faturacao: lead.faturacao_ano3,
      ebitda: lead.ebitda_ano3,
      desp: lead.despesas_extraordinarias_ano3,
    },
  ].filter((a) => typeof a.faturacao === "number" || typeof a.ebitda === "number");

  // Impacto da normalização da renda em cada período (recorrente e anual):
  // é o mesmo ajuste que entra no EBITDA normalizado, com sinal negativo.
  const impactoRenda = r && r.ajuste_ebitda_imovel !== 0 ? r.ajuste_ebitda_imovel : null;
  const normalizacaoRenda = impactoRenda !== null ? `−${eur(Math.abs(impactoRenda))}` : L.common.tracoLongo;


  const historico: LinhaHistorico[] = anosBrutos.map((a) => ({
    ano: a.ano,
    faturacao: eur(a.faturacao),
    ebitda: eur(a.ebitda),
    normalizacoes: normalizacaoRenda,
    despesas: typeof a.desp === "number" && a.desp !== 0 ? eur(a.desp) : L.common.tracoLongo,
  }));

  const margem_ebitda_ajustada = r && fat1 > 0 ? (r.ebitda_base / fat1) * 100 : null;

  const proprietario = lead.proprietario_imovel === "Sim";
  const imovelNoPerimetro = proprietario && lead.incluir_imovel_perimetro === "Sim";
  const top5 = lead.pct_top5_clientes;
  const depGest = lead.dependencia_acionista_gestao ?? null;
  const depFat = lead.dependencia_acionista_faturacao ?? null;
  const capex = lead.capex_anual_recorrente;

  const crescimentoAjuste = r?.ajustes.find((a) => a.label === "Crescimento");
  const crescimento_forte = !!crescimentoAjuste && crescimentoAjuste.multiplicador > 1;
  const crescimento_negativo = !!crescimentoAjuste && crescimentoAjuste.multiplicador < 1;

  const capex_intensivo = !!(r && typeof capex === "number" && r.ebitda_base > 0 && capex / r.ebitda_base > 0.3);

  const flags = {
    industria_saude: lead.industria === "Saúde",
    industria_energia: lead.industria === "Energia",
    industria_tecnologia: lead.industria === "Tecnologia",
    industria_manufatura: lead.industria === "Manufatura/Indústria",
    industria_generica: lead.industria === OUTRA_INDUSTRIA || (lead.subindustria ?? "") === OUTRO,
    concentracao_alta: typeof top5 === "number" && top5 > 60,
    concentracao_baixa: typeof top5 === "number" && top5 < 30,
    dependencia_gestao_alta: depGest === "Alta",
    dependencia_gestao_baixa: depGest === "Baixa",
    dependencia_faturacao_alta: !!depFat?.startsWith("Alta"),
    unidade_unica: lead.unidades === "Localização única",
    crescimento_forte,
    crescimento_negativo,
    capex_intensivo,
    empresa_jovem: typeof lead.idade_empresa === "number" && lead.idade_empresa < 3,
    tem_imovel_proprio: proprietario,
    imovel_no_perimetro: imovelNoPerimetro,
    tem_ajuste_imovel: !!r && r.ajuste_ebitda_imovel !== 0,
    tem_divida: !!r && r.tem_divida,
    mostrar_equity: !!r,
    tem_anos_anteriores: historico.length > 1,
  };

  // --- Drivers de valor — apenas fatores efetivamente favoráveis ---
  // Regra: um candidato só entra na tabela quando a evidência disponível é
  // positiva. Situações desfavoráveis (concentração, dependência, capex
  // elevado, contração) nunca aparecem aqui — pertencem à secção de riscos.
  type Driver = { driver: string; descricao: string };
  const margemFmt = margem_ebitda_ajustada !== null ? pct1(margem_ebitda_ajustada) : null;
  const capexRacio = r && typeof capex === "number" && r.ebitda_base > 0 ? capex / r.ebitda_base : null;
  const top1 = lead.pct_top1_clientes;
  const ebitdaBase = r?.ebitda_base ?? null;
  const caixa = lead.caixa_e_depositos;
  const divida = lead.divida_financeira;
  const posicaoLiquida =
    typeof caixa === "number" || typeof divida === "number" ? (caixa ?? 0) - (divida ?? 0) : null;
  const backlog = lead.backlog_contratado;
  const backlogRacio = typeof backlog === "number" && fat1 > 0 ? backlog / fat1 : null;
  const geografiaInternacional =
    !!lead.geografia_clientes && !lead.geografia_clientes.startsWith("Nacional");
  const multiUnidade =
    !!lead.unidades && lead.unidades !== "Localização única" && lead.unidades !== "Não aplicável";
  const imovelAvaliadoExternamente =
    imovelNoPerimetro &&
    typeof lead.valorizacao_imovel === "number" &&
    (lead.metodo_avaliacao_imovel === "Avaliação independente recente" ||
      lead.metodo_avaliacao_imovel === "Avaliação bancária");

  // Ordenados por relevância para o comprador: primeiro o que move o múltiplo.
  const driversCandidatos: Array<[boolean, Driver]> = [
    [flags.crescimento_forte, L.drivers.crescimentoSustentado],
    [
      (typeof fat1 === "number" && fat1 >= 20_000_000) || (ebitdaBase !== null && ebitdaBase >= 2_000_000),
      { driver: L.drivers.dimensaoRelevante.driver, descricao: L.drivers.dimensaoRelevante.descricao(eur(fat1), eur(ebitdaBase)) },
    ],
    [
      margem_ebitda_ajustada !== null && margem_ebitda_ajustada >= 15,
      { driver: L.drivers.rendibilidadeAcimaMedia.driver, descricao: L.drivers.rendibilidadeAcimaMedia.descricao(margemFmt ?? "—") },
    ],
    [
      capexRacio !== null && capexRacio <= 0.15,
      {
        driver: L.drivers.conversaoCaixa.driver,
        descricao: L.drivers.conversaoCaixa.descricao(capexRacio !== null ? pct1(capexRacio * 100) : "—"),
      },
    ],
    [flags.dependencia_gestao_baixa, L.drivers.gestaoAutonoma],
    [!!depFat?.startsWith("Baixa"), L.drivers.relacoesTransferiveis],
    [
      (typeof top5 === "number" && top5 <= 40) || (typeof top1 === "number" && top1 <= 15),
      {
        driver: L.drivers.carteiraDiversificada.driver,
        descricao:
          (typeof top5 === "number"
            ? L.drivers.carteiraDiversificada.descricaoTop5(top5)
            : L.drivers.carteiraDiversificada.descricaoTop1(top1 ?? 0)) + L.drivers.carteiraDiversificada.descricaoFim,
      },
    ],
    [
      backlogRacio !== null && backlogRacio >= 0.25,
      {
        driver: L.drivers.visibilidadeReceita.driver,
        descricao: L.drivers.visibilidadeReceita.descricao(eur(backlog), backlogRacio !== null ? pct1(backlogRacio * 100) : "—"),
      },
    ],
    [
      multiUnidade,
      { driver: L.drivers.modeloReplicavel.driver, descricao: L.drivers.modeloReplicavel.descricao((lead.unidades ?? "").toLowerCase()) },
    ],
    [
      geografiaInternacional,
      { driver: L.drivers.exposicaoInternacional.driver, descricao: L.drivers.exposicaoInternacional.descricao(lead.geografia_clientes ?? "") },
    ],
    [
      posicaoLiquida !== null && posicaoLiquida > 0,
      { driver: L.drivers.posicaoLiquida.driver, descricao: L.drivers.posicaoLiquida.descricao(eur(posicaoLiquida)) },
    ],
    [
      typeof lead.idade_empresa === "number" && lead.idade_empresa >= 10,
      { driver: L.drivers.trackRecord.driver, descricao: L.drivers.trackRecord.descricao(lead.idade_empresa ?? 0) },
    ],
    [
      imovelAvaliadoExternamente,
      {
        driver: L.drivers.imovelValorizado.driver,
        descricao: L.drivers.imovelValorizado.descricao((lead.metodo_avaliacao_imovel ?? "").toLowerCase(), eur(lead.valorizacao_imovel)),
      },
    ],
  ];

  const drivers: Driver[] = driversCandidatos
    .filter(([c]) => c)
    .map(([, d]) => d)
    .slice(0, 6);


  // Recomendações derivadas dos drivers.
  const recomendacoes: string[] = [];
  if (flags.dependencia_gestao_alta || flags.dependencia_faturacao_alta) recomendacoes.push(L.recomendacoes.reforcarGestao);
  if (flags.concentracao_alta) recomendacoes.push(L.recomendacoes.diversificarClientes);
  if (flags.unidade_unica) recomendacoes.push(L.recomendacoes.avaliarReplicabilidade);
  if (flags.capex_intensivo) recomendacoes.push(L.recomendacoes.documentarCapex);
  if (historico.length < 3) recomendacoes.push(L.recomendacoes.prepararHistorico);
  if (flags.tem_imovel_proprio) recomendacoes.push(L.recomendacoes.definirImovel);
  if (r?.aviso_margem) recomendacoes.push(L.recomendacoes.validarMargem);
  if (flags.crescimento_negativo) recomendacoes.push(L.recomendacoes.explicarContracao);
  recomendacoes.push(L.recomendacoes.validarComLealia);

  const resumo_textual = r
    ? L.resumo.comResultado({
        equityMin: eur(r.equity_min),
        equityMax: eur(r.equity_max),
        evMin: eur(r.ev_min),
        evMax: eur(r.ev_max),
        ebitdaBase: eur(r.ebitda_base),
        multMin: formatMultipleLang(r.multiplo_ajustado_min, lang),
        multMax: formatMultipleLang(r.multiplo_ajustado_max, lang),
        ano,
        tipoPeriodo: lead.tipo_periodo ?? "",
        fat1: eur(fat1),
        margem: margem_ebitda_ajustada !== null ? pct1(margem_ebitda_ajustada) : null,
      })
    : L.resumo.semResultado;

  // --- Mensagem ao acionista: principal oportunidade de criação/preservação de valor ---
  const mensagem_acionista =
    historico.length < 3
      ? L.mensagemAcionista.historicoLimitado
      : flags.dependencia_gestao_alta || flags.dependencia_faturacao_alta
        ? L.mensagemAcionista.dependenciaAlta
        : flags.concentracao_alta
          ? L.mensagemAcionista.concentracaoAlta
          : L.mensagemAcionista.padrao;

  // --- Perfil da empresa ---
  const perfil = [
    { label: L.perfil.atividadePrincipal, valor: lead.atividade_principal || NAO_INDICADO },
    { label: L.perfil.setor, valor: `${lead.industria}${lead.subindustria ? ` · ${lead.subindustria}` : ""}` },
    { label: L.perfil.geografia, valor: lead.pais },
    { label: L.perfil.unidadesLocalizacoes, valor: lead.unidades || NAO_INDICADO },
    { label: L.perfil.anosAtividade, valor: lead.idade_empresa ? L.perfil.anosAtividadeValor(lead.idade_empresa) : NAO_INDICADO },
    { label: L.perfil.colaboradores, valor: lead.num_colaboradores || NAO_INDICADO },


    { label: L.perfil.anoReferencia, valor: String(ano) },
    { label: L.perfil.periodoReferencia, valor: lead.tipo_periodo || NAO_INDICADO },
  ];

  // --- Normalização do EBITDA (waterfall) ---
  const linhas_ebitda = (r?.linhas_ebitda ?? []).map((l) => ({
    label: traduzirLinhaEbitdaLabel(l.label, ano, lang),
    tipo: l.tipo,
    valor: l.valor,
    formatado: `${l.tipo === "ajuste" && l.valor > 0 ? "+" : ""}${eur(l.valor)}`,
  }));

  // --- Equity Bridge ---
  const ponte = r
    ? [
        { label: L.ponte.enterpriseValueBase, valor: r.ev_medio, tipo: "base" as const },
        { label: L.ponte.maisCaixa, valor: r.caixa, tipo: "ajuste" as const },
        { label: L.ponte.menosDivida, valor: -r.divida_financeira, tipo: "ajuste" as const },
        ...(r.valor_imovel > 0
          ? [
              {
                label: L.ponte.maisImovel,
                valor: r.valor_imovel,
                tipo: "ajuste" as const,
              },
            ]
          : []),
        {
          label: L.ponte.equityValueBase,
          valor: Math.round((r.equity_min + r.equity_max) / 2),
          tipo: "total" as const,
        },
      ].map((l) => ({
        ...l,
        formatado: `${l.tipo === "ajuste" && l.valor > 0 ? "+" : ""}${eur(l.valor)}`,
      }))
    : [];

  const cenarios = (r?.cenarios ?? []).map((c) => ({
    nome: c.nome,
    multiplo: formatMultipleLang(c.multiplo, lang),
    ev: eur(c.ev),
    equity: eur(c.equity),
    pressuposto: traduzirCenarioPressuposto(c.nome, c.pressuposto, lang),
  }));

  const sensibilidade = r
    ? {
        colunas: r.sensibilidade.multiplos.map((m) => formatMultipleLang(m, lang)),
        linhas: r.sensibilidade.linhas.map((l) => ({
          variacao: l.variacao,
          ebitda: eur(l.ebitda),
          valores: l.valores.map((v) => eur(v)),
          destaque: l.variacao === "Base",
        })),
      }
    : null;

  const dimensoes_confianca = (r?.dimensoes_confianca ?? []).map((d) => {
    const dimKey = DIMENSAO_MAP[d.dimensao];
    return {
      dimensao: dimKey ? L.engine.dimensoes[dimKey] : d.dimensao,
      peso: d.peso,
      percentagem: Math.round(d.cobertura * 100),
      em_falta: d.em_falta.map((item) => {
        const itemKey = ITEM_CONFIANCA_MAP[item];
        return itemKey ? L.engine.itensConfianca[itemKey] : item;
      }),
    };
  });

  // --- Riscos e mitigantes — apenas com evidência preenchida, máximo de quatro ---
  type Risco = {
    risco: string;
    evidencia: string;
    impacto: string;
    mitigante: string;
    nivel: "Alto" | "Médio" | "Baixo";
  };
  const racioDivida = r && r.ebitda_base > 0 ? r.divida_liquida / r.ebitda_base : null;

  const riscosCandidatos: Array<[boolean, Risco]> = [
    [
      historico.length < 3,
      {
        risco: L.riscos.historicoLimitado.risco,
        evidencia: historico.length === 1 ? L.riscos.historicoLimitado.evidenciaUm : L.riscos.historicoLimitado.evidenciaVarios(historico.length),
        impacto: L.riscos.historicoLimitado.impacto,
        mitigante: L.riscos.historicoLimitado.mitigante,
        nivel: "Alto",
      },
    ],
    [
      flags.dependencia_gestao_alta,
      {
        risco: L.riscos.dependenciaGestao.risco,
        evidencia: L.riscos.dependenciaGestao.evidencia(depGest ?? ""),
        impacto: L.riscos.dependenciaGestao.impacto,
        mitigante: L.riscos.dependenciaGestao.mitigante,
        nivel: "Alto",
      },
    ],
    [
      flags.concentracao_alta,
      {
        risco: L.riscos.concentracaoClientes.risco,
        evidencia: L.riscos.concentracaoClientes.evidencia(top5 ?? 0),
        impacto: L.riscos.concentracaoClientes.impacto,
        mitigante: L.riscos.concentracaoClientes.mitigante,
        nivel: "Alto",
      },
    ],
    [
      flags.dependencia_faturacao_alta,
      {
        risco: L.riscos.dependenciaComercial.risco,
        evidencia: L.riscos.dependenciaComercial.evidencia(depFat ?? ""),
        impacto: L.riscos.dependenciaComercial.impacto,
        mitigante: L.riscos.dependenciaComercial.mitigante,
        nivel: "Alto",
      },
    ],
    [
      lead.unidades === "Localização única",
      {
        risco: L.riscos.localizacaoUnica.risco,
        evidencia: L.riscos.localizacaoUnica.evidencia,
        impacto: L.riscos.localizacaoUnica.impacto,
        mitigante: L.riscos.localizacaoUnica.mitigante,
        nivel: "Médio",
      },
    ],
    [
      !!racioDivida && racioDivida > 3,
      {
        risco: L.riscos.posicaoLiquidaElevada.risco,
        evidencia:
          racioDivida !== null
            ? L.riscos.posicaoLiquidaElevada.evidencia(formatFactorXLang(racioDivida, lang))
            : L.riscos.posicaoLiquidaElevada.evidenciaSemDados,
        impacto: L.riscos.posicaoLiquidaElevada.impacto,
        mitigante: L.riscos.posicaoLiquidaElevada.mitigante,
        nivel: "Alto",
      },
    ],
    [
      flags.capex_intensivo,
      {
        risco: L.riscos.capexElevado.risco,
        evidencia: L.riscos.capexElevado.evidencia(eur(capex)),
        impacto: L.riscos.capexElevado.impacto,
        mitigante: L.riscos.capexElevado.mitigante,
        nivel: "Médio",
      },
    ],
    [
      flags.tem_imovel_proprio && lead.metodo_avaliacao_imovel !== "Avaliação independente",
      {
        risco: L.riscos.imovelSemAvaliacao.risco,
        evidencia: L.riscos.imovelSemAvaliacao.evidencia(lead.metodo_avaliacao_imovel || NAO_INDICADO),
        impacto: L.riscos.imovelSemAvaliacao.impacto,
        mitigante: L.riscos.imovelSemAvaliacao.mitigante,
        nivel: "Médio",
      },
    ],
    [
      typeof lead.despesas_extraordinarias_ano1 === "number" && lead.despesas_extraordinarias_ano1 !== 0,
      {
        risco: L.riscos.ajustamentosPorValidar.risco,
        evidencia: L.riscos.ajustamentosPorValidar.evidencia(eur(lead.despesas_extraordinarias_ano1)),
        impacto: L.riscos.ajustamentosPorValidar.impacto,
        mitigante: L.riscos.ajustamentosPorValidar.mitigante,
        nivel: "Médio",
      },
    ],
    [
      flags.crescimento_negativo,
      {
        risco: L.riscos.contracaoFaturacao.risco,
        evidencia: L.riscos.contracaoFaturacao.evidencia,
        impacto: L.riscos.contracaoFaturacao.impacto,
        mitigante: L.riscos.contracaoFaturacao.mitigante,
        nivel: "Alto",
      },
    ],
  ];

  const riscos: Risco[] = riscosCandidatos
    .filter(([c]) => c)
    .map(([, x]) => x)
    .slice(0, 4);

  // --- Plano de preparação priorizado ---
  const plano = [
    ...(historico.length < 3
      ? [
          {
            prioridade: L.plano.prioridade.alta,
            acao: L.plano.consolidarHistorico,
            impacto: L.plano.impacto.alto,
            esforco: L.plano.esforco.medio,
            prazo: L.plano.prazo.semanas2a6,
          },
        ]
      : []),
    {
      prioridade: L.plano.prioridade.alta,
      acao: L.plano.reconciliarEbitda,
      impacto: L.plano.impacto.alto,
      esforco: L.plano.esforco.medio,
      prazo: L.plano.prazo.semanas1a3,
    },
    {
      prioridade: L.plano.prioridade.alta,
      acao: L.plano.confirmarDivida,
      impacto: L.plano.impacto.alto,
      esforco: L.plano.esforco.baixo,
      prazo: L.plano.prazo.semanas1a2,
    },
    {
      prioridade: L.plano.prioridade.alta,
      acao: L.plano.analisarFundoManeio,
      impacto: L.plano.impacto.alto,
      esforco: L.plano.esforco.medio,
      prazo: L.plano.prazo.semanas2a4,
    },
    ...(flags.dependencia_gestao_alta || flags.dependencia_faturacao_alta
      ? [
          {
            prioridade: L.plano.prioridade.alta,
            acao: L.plano.reduzirDependencia,
            impacto: L.plano.impacto.muitoAlto,
            esforco: L.plano.esforco.alto,
            prazo: L.plano.prazo.meses3a12,
          },
        ]
      : []),
    ...(flags.concentracao_alta
      ? [
          {
            prioridade: L.plano.prioridade.media,
            acao: L.plano.mapearConcentracao,
            impacto: L.plano.impacto.medioAlto,
            esforco: L.plano.esforco.medio,
            prazo: L.plano.prazo.semanas2a4,
          },
        ]
      : []),
    ...(flags.capex_intensivo
      ? [
          {
            prioridade: L.plano.prioridade.media,
            acao: L.plano.separarCapex,
            impacto: L.plano.impacto.medioAlto,
            esforco: L.plano.esforco.medio,
            prazo: L.plano.prazo.semanas2a4,
          },
        ]
      : []),
    ...(flags.tem_imovel_proprio
      ? [
          {
            prioridade: L.plano.prioridade.media,
            acao: L.plano.definirImovel,
            impacto: L.plano.impacto.medioAlto,
            esforco: L.plano.esforco.baixo,
            prazo: L.plano.prazo.semanas4a8,
          },
        ]
      : []),
    ...(flags.unidade_unica
      ? [
          {
            prioridade: L.plano.prioridade.media,
            acao: L.plano.demonstrarReplicabilidade,
            impacto: L.plano.impacto.medio,
            esforco: L.plano.esforco.alto,
            prazo: L.plano.prazo.meses6a12,
          },
        ]
      : []),
    {
      prioridade: L.plano.prioridade.media,
      acao: L.plano.definirEstrutura,
      impacto: L.plano.impacto.alto,
      esforco: L.plano.esforco.medio,
      prazo: L.plano.prazo.semanas2a4,
    },
  ].slice(0, 8);

  // --- Implicações da percentagem a transacionar ---
  const pctT = lead.pct_a_transacionar ?? "";
  const implicacoes_participacao = pctT.startsWith("Minoritária")
    ? L.implicacoesParticipacao.minoritaria
    : pctT.startsWith("Maioritária")
      ? L.implicacoesParticipacao.maioritaria
      : pctT.startsWith("Totalidade")
        ? L.implicacoesParticipacao.totalidade
        : L.implicacoesParticipacao.indefinida;

  // --- Limitações da análise ---
  const limitacoes = [
    L.limitacoes.infoDeclarada,
    L.limitacoes.fundoManeio,
    L.limitacoes.transacoesComparaveis,
    ...(historico.length < 3 ? [L.limitacoes.historicoInferior] : []),
    ...(flags.industria_generica ? [L.limitacoes.setorGenerico] : []),
    ...((lead.tipo_periodo ?? "").startsWith("Orçamento") || (lead.tipo_periodo ?? "").startsWith("Estimativa")
      ? [L.limitacoes.periodoNaoEncerrado]
      : []),
  ];

  // --- Dados para o gráfico de evolução ---
  const grafico_evolucao = [...anosBrutos]
    .reverse()
    .filter((a) => typeof a.faturacao === "number")
    .map((a) => ({
      ano: a.ano,
      faturacao: a.faturacao as number,
      ebitda: typeof a.ebitda === "number" ? a.ebitda : 0,
      ebitda_normalizado:
        (typeof a.ebitda === "number" ? a.ebitda : 0) + (typeof a.desp === "number" ? a.desp : 0),
      faturacao_formatada: eur(a.faturacao),
      ebitda_formatado: eur(a.ebitda),
    }));
  const maxGrafico = Math.max(1, ...grafico_evolucao.map((g) => g.faturacao));

  // --- Qualidade dos resultados ---
  const serie = grafico_evolucao.filter((g) => g.faturacao > 0);
  const cagr = (ini: number, fim: number, anos: number) =>
    ini > 0 && fim > 0 && anos > 0 ? (Math.pow(fim / ini, 1 / anos) - 1) * 100 : null;

  const cagrFaturacao =
    serie.length >= 2 ? cagr(serie[0]!.faturacao, serie[serie.length - 1]!.faturacao, serie.length - 1) : null;
  // CAGR do EBITDA calculado sobre o EBITDA normalizado (EBITDA + extraordinários),
  // coerente com a base de avaliação.
  const serieEbitda = serie.filter((g) => g.ebitda_normalizado > 0);
  const cagrEbitda =
    serieEbitda.length >= 2
      ? cagr(
          serieEbitda[0]!.ebitda_normalizado,
          serieEbitda[serieEbitda.length - 1]!.ebitda_normalizado,
          serieEbitda.length - 1,
        )
      : null;

  const margensSerie = serie
    .filter((g) => g.ebitda !== 0)
    .map((g) => ({ ano: g.ano, margem: (g.ebitda / g.faturacao) * 100 }));
  const amplitudeMargem =
    margensSerie.length >= 2
      ? Math.max(...margensSerie.map((m) => m.margem)) - Math.min(...margensSerie.map((m) => m.margem))
      : null;

  const qualidade = {
    tem_serie: serie.length >= 2,
    apenas_um_ano: serie.length <= 1,
    nota_um_ano: L.qualidade.notaUmAno,
    cagr_faturacao: cagrFaturacao !== null ? pct1(cagrFaturacao) : null,
    cagr_ebitda: cagrEbitda !== null ? pct1(cagrEbitda) : null,
    margens: margensSerie.map((m) => ({ ano: m.ano, margem: pct1(m.margem), valor: m.margem })),
    comentario_margens:
      amplitudeMargem === null
        ? null
        : amplitudeMargem <= 2
          ? L.qualidade.margensEstaveis
          : amplitudeMargem <= 5
            ? L.qualidade.margensModeradas
            : L.qualidade.margensRelevantes,
    conversao_caixa:
      r && typeof capex === "number" && r.ebitda_base > 0
        ? L.qualidade.conversaoCaixaComCapex(eur(capex), pct1(((r.ebitda_base - capex) / r.ebitda_base) * 100))
        : L.qualidade.conversaoCaixaSemCapex,
    fundo_maneio: L.qualidade.fundoManeio,
    backlog:
      typeof lead.backlog_contratado === "number" ? L.qualidade.backlog(eur(lead.backlog_contratado)) : null,
    concentracao:
      typeof top5 === "number"
        ? L.qualidade.concentracaoTop5(top5) +
          (typeof lead.pct_top1_clientes === "number" ? L.qualidade.concentracaoTop1(lead.pct_top1_clientes) : "") +
          L.qualidade.concentracaoFim
        : null,
    ajustamentos:
      typeof lead.despesas_extraordinarias_ano1 === "number" && lead.despesas_extraordinarias_ano1 !== 0
        ? L.qualidade.ajustamentosDeclarados(eur(lead.despesas_extraordinarias_ano1))
        : L.qualidade.ajustamentosNaoDeclarados,
  };

  // --- Alertas automáticos ---
  const alertas: string[] = [];
  if (serie.length <= 1) alertas.push(L.alertas.umPeriodo);
  if (typeof lead.despesas_extraordinarias_ano1 === "number" && lead.despesas_extraordinarias_ano1 !== 0)
    alertas.push(L.alertas.ajustamentosSemSuporte);
  alertas.push(L.alertas.fundoManeioNaoAnalisado);
  if (proprietario && lead.metodo_avaliacao_imovel !== "Avaliação independente") alertas.push(L.alertas.imovelSemAvaliacao);
  if (imovelNoPerimetro && !(typeof lead.valorizacao_imovel === "number" && lead.valorizacao_imovel > 0))
    alertas.push(L.alertas.imovelSemValor);
  if (!lead.tipo_periodo) alertas.push(L.alertas.periodoNaoClassificado);
  if (typeof top5 === "number" && typeof lead.pct_top1_clientes === "number" && top5 < lead.pct_top1_clientes)
    alertas.push(L.alertas.concentracaoInconsistente);
  if ((lead.pct_a_transacionar ?? "").startsWith("Minoritária")) alertas.push(L.alertas.minoritariaAtencao);

  // --- Implicações da estrutura de participação ---
  const implicacoes_estrutura = [
    L.implicacoesEstrutura.venda50,
    L.implicacoesEstrutura.venda60,
    L.implicacoesEstrutura.venda90,
    L.implicacoesEstrutura.venda100,
  ];

  const NOTA_EQUITY = L.notas.equity;
  const NOTA_MINORIA = L.notas.minoria;

  const dataRelatorio = formatDateLang(lead.created_at ?? Date.now(), lang);

  return {
    ok,
    motivo: result.ok ? null : (result as { ok: false; motivo: string }).motivo,
    lang,

    empresa: lead.empresa,
    nome: lead.nome,
    cargo: lead.cargo ?? null,
    pais: lead.pais,
    industria: lead.industria,
    subindustria: lead.subindustria ?? null,
    idade_empresa: lead.idade_empresa ?? null,
    ano_referencia: ano,
    data_relatorio: dataRelatorio,
    estrutura_transacao: lead.estrutura_transacao ?? null,
    pct_a_transacionar: lead.pct_a_transacionar ?? null,
    motivo_interesse: lead.motivo_interesse ?? null,
    horizonte_temporal: lead.horizonte_temporal ?? null,

    faturacao_ano1_formatado: eur(lead.faturacao_ano1),
    ebitda_ano1_formatado: eur(lead.ebitda_ano1),
    despesas_extraordinarias_ano1_formatado: eur(lead.despesas_extraordinarias_ano1),
    ebitda_normalizado_formatado: r ? eur(r.ebitda_base) : NAO_INDICADO,
    ajuste_imovel_formatado: r && r.ajuste_ebitda_imovel !== 0 ? eur(Math.abs(r.ajuste_ebitda_imovel)) : null,
    margem_ebitda_ajustada,
    margem_ebitda_ajustada_formatada: margem_ebitda_ajustada !== null ? pct1(margem_ebitda_ajustada) : L.common.tracoLongo,

    ev_min_formatado: r ? eur(r.ev_min) : L.common.tracoLongo,
    ev_max_formatado: r ? eur(r.ev_max) : L.common.tracoLongo,
    ev_medio_formatado: r ? eur(r.ev_medio) : L.common.tracoLongo,
    equity_min_formatado: r ? eur(r.equity_min) : L.common.tracoLongo,
    equity_max_formatado: r ? eur(r.equity_max) : L.common.tracoLongo,
    divida_liquida_formatado: r
      ? eur(r.divida_liquida)
      : eur((lead.divida_financeira ?? 0) - (lead.caixa_e_depositos ?? 0)),
    valor_imovel_formatado: r && r.valor_imovel > 0 ? eur(r.valor_imovel) : null,

    multiplo_base_min: r?.multiplo_base_min ?? null,
    multiplo_base_max: r?.multiplo_base_max ?? null,
    multiplo_ajustado_min: r?.multiplo_ajustado_min ?? null,
    multiplo_ajustado_max: r?.multiplo_ajustado_max ?? null,

    caixa_formatado: eur(lead.caixa_e_depositos),
    divida_financeira_formatado: eur(lead.divida_financeira),
    capex_formatado: eur(lead.capex_anual_recorrente),
    concentracao_top5: typeof top5 === "number" ? `${top5}%` : NAO_INDICADO,
    geografia_clientes: lead.geografia_clientes || NAO_INDICADO,
    dependencia_faturacao: depFat || NAO_INDICADO,
    dependencia_gestao: depGest || NAO_INDICADO,
    imovel_descricao: proprietario
      ? imovelNoPerimetro
        ? L.imovel.propriedadeIncluida
        : L.imovel.propriedadeExcluida
      : lead.proprietario_imovel === "Não"
        ? L.imovel.arrendadoTerceiros
        : NAO_INDICADO,
    valorizacao_imovel_formatado: typeof lead.valorizacao_imovel === "number" ? eur(lead.valorizacao_imovel) : null,

    pontos_confianca: r?.pontos_confianca ?? null,
    confianca: (r ? CONF_LEVEL_WORD[r.confianca][lang] : null) as Confianca | null,
    confianca_explicacao: r
      ? r.confianca === "Baixa"
        ? L.engine.confExplicacao.baixa
        : r.confianca === "Média"
          ? L.engine.confExplicacao.media
          : L.engine.confExplicacao.alta
      : null,
    anos_preenchidos: r?.anos_preenchidos ?? historico.length,
    historico,
    nota_historico: historico.length === 1 ? L.historico.umAno : L.historico.variosAnos(historico.length),

    ajustes: (r?.ajustes ?? []).map((a) => {
      const trad = traduzirAjuste(a, lang);
      return { ...a, label: trad.label, detalhe: trad.detalhe };
    }) as Ajuste[],
    aviso_margem: r?.aviso_margem ?? null,
    nota_setor: r?.nota_setor ?? null,
    resumo_textual,
    drivers,
    recomendacoes,

    // --- Novas secções ---
    perfil,
    tipo_periodo: lead.tipo_periodo ?? null,
    atividade_principal: lead.atividade_principal ?? null,
    num_colaboradores: lead.num_colaboradores ?? null,
    unidades: lead.unidades ?? null,
    num_clientes_ativos: lead.num_clientes_ativos ?? null,
    concentracao_top1: typeof lead.pct_top1_clientes === "number" ? `${lead.pct_top1_clientes}%` : NAO_INDICADO,
    backlog_formatado: typeof lead.backlog_contratado === "number" ? eur(lead.backlog_contratado) : null,
    metodo_avaliacao_imovel: lead.metodo_avaliacao_imovel ?? null,
    ano_avaliacao_imovel: lead.ano_avaliacao_imovel ?? null,
    permanencia_pos_venda: lead.permanencia_pos_venda ?? null,
    tipo_investidor: lead.tipo_investidor ?? null,

    linhas_ebitda,
    ponte,
    posicao_liquida: r?.posicao_liquida ?? null,
    posicao_liquida_valor: r ? r.caixa - r.divida_financeira : null,
    divida_liquida_absoluta_formatado: r ? eur(Math.abs(r.divida_liquida)) : NAO_INDICADO,
    racio_divida_ebitda: r && r.ebitda_base > 0 ? formatFactorXLang(r.divida_liquida / r.ebitda_base, lang) : L.common.tracoLongo,
    cenarios,
    sensibilidade,
    dimensoes_confianca,
    riscos,
    plano,
    implicacoes_participacao,
    implicacoes_estrutura,
    qualidade,
    alertas,
    mensagem_acionista,
    nota_equity: NOTA_EQUITY,
    nota_minoria: NOTA_MINORIA,
    imovel_no_perimetro_texto: proprietario
      ? imovelNoPerimetro
        ? L.imovel.incluidoPerimetro
        : L.imovel.excluidoPerimetro
      : L.imovel.arrendado,
    limitacoes,
    grafico_evolucao,
    grafico_max: maxGrafico,

    // --- DCF (mesma engine, mesmos dados) ---
    dcf: r && r.dcf.ok ? r.dcf : null,
    dcf_motivo: r && !r.dcf.ok ? (r.dcf as { ok: false; motivo: string }).motivo : null,
    ...flags,
  };
}

/** Atalho: calcula e prepara o relatório a partir da linha do lead. */
export function buildReportFromLead(lead: ReportLead, lang: ReportLang = "pt") {
  const result = calcularValuation(valuationInputFromLead(lead));
  return buildReportData(lead, result, lang);
}

/**
 * Versão "teaser" do relatório: remove por completo o conteúdo das páginas
 * bloqueadas (4 a 11), de modo a que esses dados nunca sejam enviados para o
 * browser do cliente. As páginas 1, 2, 3 e a final mantêm-se intactas.
 */
export function redigirRelatorioTeaser(d: ReportData): ReportData {
  return {
    ...d,
    dcf: null,
    dcf_motivo: null,
    qualidade: {
      ...d.qualidade,
      tem_serie: false,
      apenas_um_ano: false,
      nota_um_ano: "",
      cagr_faturacao: null,
      cagr_ebitda: null,
      comentario_margens: "",
      margens: [],
      ajustamentos: "",
      concentracao: "",
      backlog: "",
      conversao_caixa: "",
      fundo_maneio: "",
    },
    grafico_evolucao: [],
    ajustes: [],
    cenarios: [],
    sensibilidade: { colunas: [], linhas: [] },
    ponte: [],
    drivers: [],
    riscos: [],
    plano: [],
    recomendacoes: [],
    implicacoes_estrutura: [],
    implicacoes_participacao: "",
    dimensoes_confianca: [],
    limitacoes: [],
    alertas: [],
    mensagem_acionista: "",
  };
}
