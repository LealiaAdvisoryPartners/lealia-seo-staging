/// server mirror – see src/lib/report-i18n.ts for source
// Dicionário central de textos do relatório de avaliação (PT | EN | ES).
/// server mirror – see src/lib/report-i18n.ts for source
// Puro: sem I/O. Usado tanto no cliente (src/lib/report-data.tsx,
/// server mirror – see src/lib/report-i18n.ts for source
// src/components/lealia/ReportDocument.tsx) como no servidor (mirror em
/// server mirror – see src/lib/report-i18n.ts for source
// supabase/functions/_shared/valuation/report-i18n.ts). Mantenha os dois
/// server mirror – see src/lib/report-i18n.ts for source
// ficheiros idênticos em conteúdo — apenas a extensão de import difere.
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
export type ReportLang = "pt" | "en" | "es";
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
const LOCALE_MAP: Record<ReportLang, string> = {
/// server mirror – see src/lib/report-i18n.ts for source
  pt: "pt-PT",
/// server mirror – see src/lib/report-i18n.ts for source
  en: "en-GB",
/// server mirror – see src/lib/report-i18n.ts for source
  es: "es-ES",
/// server mirror – see src/lib/report-i18n.ts for source
};
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
/** Separador de milhares/decimais consistente com o locale, com espaço inquebrável. */
/// server mirror – see src/lib/report-i18n.ts for source
export function formatEURLang(n: number, lang: ReportLang = "pt"): string {
/// server mirror – see src/lib/report-i18n.ts for source
  const neg = n < 0;
/// server mirror – see src/lib/report-i18n.ts for source
  const s = Math.abs(Math.round(n))
/// server mirror – see src/lib/report-i18n.ts for source
    .toString()
/// server mirror – see src/lib/report-i18n.ts for source
    .replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
/// server mirror – see src/lib/report-i18n.ts for source
  return `${neg ? "-" : ""}${s}\u00a0€`;
/// server mirror – see src/lib/report-i18n.ts for source
}
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
/** Agrupamento de milhares (sem símbolo de moeda), com espaço inquebrável. */
/// server mirror – see src/lib/report-i18n.ts for source
export function groupThousandsLang(n: number, lang: ReportLang = "pt"): string {
/// server mirror – see src/lib/report-i18n.ts for source
  const neg = n < 0;
/// server mirror – see src/lib/report-i18n.ts for source
  const s = Math.abs(Math.round(n))
/// server mirror – see src/lib/report-i18n.ts for source
    .toString()
/// server mirror – see src/lib/report-i18n.ts for source
    .replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
/// server mirror – see src/lib/report-i18n.ts for source
  return (neg ? "-" : "") + s;
/// server mirror – see src/lib/report-i18n.ts for source
}
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
const decimalSep = (lang: ReportLang) => (lang === "pt" || lang === "es" ? "," : ".");
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
/** Percentagem formatada com uma casa decimal (ou `casas`), símbolo de acordo com o locale. */
/// server mirror – see src/lib/report-i18n.ts for source
export function formatPercentLang(v: number, lang: ReportLang = "pt", casas = 1): string {
/// server mirror – see src/lib/report-i18n.ts for source
  return `${v.toFixed(casas).replace(".", decimalSep(lang))}%`;
/// server mirror – see src/lib/report-i18n.ts for source
}
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
/** Múltiplo formatado como "3,25x" (pt/es) ou "3.25x" (en). */
/// server mirror – see src/lib/report-i18n.ts for source
export function formatMultipleLang(v: number | null, lang: ReportLang = "pt"): string {
/// server mirror – see src/lib/report-i18n.ts for source
  if (v === null) return "—";
/// server mirror – see src/lib/report-i18n.ts for source
  return `${v.toFixed(2).replace(".", decimalSep(lang))}x`;
/// server mirror – see src/lib/report-i18n.ts for source
}
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
/** Número com uma casa decimal e "x" (ex.: rácio dívida/EBITDA). */
/// server mirror – see src/lib/report-i18n.ts for source
export function formatFactorXLang(v: number, lang: ReportLang = "pt"): string {
/// server mirror – see src/lib/report-i18n.ts for source
  return `${v.toFixed(1).replace(".", decimalSep(lang))}x`;
/// server mirror – see src/lib/report-i18n.ts for source
}
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
/** Número com três casas decimais (ex.: fator de desconto DCF). */
/// server mirror – see src/lib/report-i18n.ts for source
export function formatFactor3Lang(v: number, lang: ReportLang = "pt"): string {
/// server mirror – see src/lib/report-i18n.ts for source
  return v.toFixed(3).replace(".", decimalSep(lang));
/// server mirror – see src/lib/report-i18n.ts for source
}
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
/** Data no formato dd/mm/aaaa (pt) ou equivalente local. */
/// server mirror – see src/lib/report-i18n.ts for source
export function formatDateLang(input: string | number | Date, lang: ReportLang = "pt"): string {
/// server mirror – see src/lib/report-i18n.ts for source
  const d = new Date(input);
/// server mirror – see src/lib/report-i18n.ts for source
  return d.toLocaleDateString(LOCALE_MAP[lang], { day: "2-digit", month: "2-digit", year: "numeric" });
/// server mirror – see src/lib/report-i18n.ts for source
}
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
// ---------------------------------------------------------------------------
/// server mirror – see src/lib/report-i18n.ts for source
// Dicionário de textos
/// server mirror – see src/lib/report-i18n.ts for source
// ---------------------------------------------------------------------------
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
const pt = {
/// server mirror – see src/lib/report-i18n.ts for source
  common: {
/// server mirror – see src/lib/report-i18n.ts for source
    naoIndicado: "Não indicado",
/// server mirror – see src/lib/report-i18n.ts for source
    nao: "Não",
/// server mirror – see src/lib/report-i18n.ts for source
    neutro: "Neutro",
/// server mirror – see src/lib/report-i18n.ts for source
    positivo: "Positivo",
/// server mirror – see src/lib/report-i18n.ts for source
    negativo: "Negativo",
/// server mirror – see src/lib/report-i18n.ts for source
    naoAplicavel: "n.a.",
/// server mirror – see src/lib/report-i18n.ts for source
    tracoLongo: "—",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  perfil: {
/// server mirror – see src/lib/report-i18n.ts for source
    atividadePrincipal: "Atividade principal",
/// server mirror – see src/lib/report-i18n.ts for source
    setor: "Setor",
/// server mirror – see src/lib/report-i18n.ts for source
    geografia: "Geografia",
/// server mirror – see src/lib/report-i18n.ts for source
    unidadesLocalizacoes: "Unidades / localizações",
/// server mirror – see src/lib/report-i18n.ts for source
    anosAtividade: "Anos de atividade",
/// server mirror – see src/lib/report-i18n.ts for source
    anosAtividadeValor: (n: number) => `${n} anos`,
/// server mirror – see src/lib/report-i18n.ts for source
    colaboradores: "Colaboradores",
/// server mirror – see src/lib/report-i18n.ts for source
    anoReferencia: "Ano de referência",
/// server mirror – see src/lib/report-i18n.ts for source
    periodoReferencia: "Período de referência",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  ponte: {
/// server mirror – see src/lib/report-i18n.ts for source
    enterpriseValueBase: "Enterprise Value base",
/// server mirror – see src/lib/report-i18n.ts for source
    maisCaixa: "Mais: caixa, depósitos e outros equivalentes",
/// server mirror – see src/lib/report-i18n.ts for source
    menosDivida: "Menos: dívida total",
/// server mirror – see src/lib/report-i18n.ts for source
    maisImovel: "Mais: imóvel no perímetro",
/// server mirror – see src/lib/report-i18n.ts for source
    equityValueBase: "Equity Value base",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  historico: {
/// server mirror – see src/lib/report-i18n.ts for source
    umAno: "Foi disponibilizado um ano de histórico financeiro.",
/// server mirror – see src/lib/report-i18n.ts for source
    variosAnos: (n: number) => `Foram disponibilizados ${n} anos de histórico financeiro.`,
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  imovel: {
/// server mirror – see src/lib/report-i18n.ts for source
    propriedadeIncluida: "Propriedade da empresa · incluído no perímetro",
/// server mirror – see src/lib/report-i18n.ts for source
    propriedadeExcluida: "Propriedade da empresa · fora do perímetro",
/// server mirror – see src/lib/report-i18n.ts for source
    arrendadoTerceiros: "Arrendado a terceiros",
/// server mirror – see src/lib/report-i18n.ts for source
    incluidoPerimetro: "Incluído no perímetro",
/// server mirror – see src/lib/report-i18n.ts for source
    excluidoPerimetro: "Excluído do perímetro",
/// server mirror – see src/lib/report-i18n.ts for source
    arrendado: "Arrendado",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  drivers: {
/// server mirror – see src/lib/report-i18n.ts for source
    crescimentoSustentado: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Crescimento sustentado",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao:
/// server mirror – see src/lib/report-i18n.ts for source
        "A faturação evoluiu positivamente no período analisado. Trajetórias de crescimento demonstradas suportam o topo do intervalo de múltiplos e reduzem o peso relativo do risco de execução na negociação.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    dimensaoRelevante: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Dimensão relevante",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: (fat1: string, ebitda: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `Com faturação de ${fat1} e EBITDA normalizado de ${ebitda}, a empresa situa-se acima do limiar de dimensão a partir do qual investidores institucionais e compradores estratégicos internacionais competem ativamente, alargando o universo de contrapartes.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    rendibilidadeAcimaMedia: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Rendibilidade acima da média",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: (margem: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `A margem EBITDA normalizada de ${margem} evidencia poder de fixação de preço e disciplina de custos, atributos que os compradores remuneram com múltiplos superiores aos de referência setorial.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    conversaoCaixa: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Forte conversão de EBITDA em caixa",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: (capexRacio: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `O CAPEX recorrente representa apenas ${capexRacio} do EBITDA normalizado. Um modelo pouco intensivo em investimento liberta caixa para serviço de dívida de aquisição, o que é determinante para compradores financeiros.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    gestaoAutonoma: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Gestão autónoma do acionista",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao:
/// server mirror – see src/lib/report-i18n.ts for source
        "A operação funciona com baixa dependência do acionista na gestão corrente. A existência de uma segunda linha capaz de assegurar continuidade reduz o risco de transição e encurta períodos de permanência exigidos pelo comprador.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    relacoesTransferiveis: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Relações comerciais transferíveis",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao:
/// server mirror – see src/lib/report-i18n.ts for source
        "A faturação não depende materialmente da relação pessoal do acionista com os clientes, o que reduz a probabilidade de erosão de receita após o closing e limita a necessidade de earn-outs ou garantias adicionais.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    carteiraDiversificada: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Carteira de clientes diversificada",
/// server mirror – see src/lib/report-i18n.ts for source
      descricaoTop5: (top5: number) => `Os cinco maiores clientes representam ${top5}% da faturação`,
/// server mirror – see src/lib/report-i18n.ts for source
      descricaoTop1: (top1: number) => `O maior cliente representa ${top1}% da faturação`,
/// server mirror – see src/lib/report-i18n.ts for source
      descricaoFim:
/// server mirror – see src/lib/report-i18n.ts for source
        ", um nível de concentração confortável que reduz o risco comercial percebido e diminui a pressão sobre o pacote de garantias.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    visibilidadeReceita: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Visibilidade de receita contratada",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: (backlog: string, racio: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `O backlog contratado de ${backlog} equivale a ${racio} da faturação anual, conferindo previsibilidade ao plano de negócios apresentado ao comprador.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    modeloReplicavel: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Modelo replicável em várias unidades",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: (unidades: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `A operação em ${unidades} demonstra que o modelo de negócio é replicável e não depende de um único ativo ou equipa, suportando teses de consolidação e de expansão pós-aquisição.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    exposicaoInternacional: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Exposição internacional",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: (geografia: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `A distribuição de clientes (${geografia}) reduz a dependência de um único mercado e torna a empresa relevante para compradores estrangeiros que procuram presença na região.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    posicaoLiquida: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Posição líquida de caixa",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: (valor: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `A empresa apresenta uma posição líquida positiva de ${valor}, o que acresce diretamente ao Equity Value e reforça a capacidade negocial do acionista quanto ao mecanismo de preço.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    trackRecord: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Track record consolidado",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: (anos: number) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `${anos} anos de atividade sustentam a leitura de resiliência do modelo de negócio ao longo de diferentes ciclos e reduzem o risco operacional percebido pelo comprador.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    imovelValorizado: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Ativo imobiliário valorizado externamente",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: (metodo: string, valor: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `O imóvel próprio incluído no perímetro está suportado por ${metodo} (${valor}), acrescendo ao Equity Value com um valor defensável em due diligence.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  recomendacoes: {
/// server mirror – see src/lib/report-i18n.ts for source
    reforcarGestao:
/// server mirror – see src/lib/report-i18n.ts for source
      "Reforçar a equipa de gestão e documentar processos e relações comerciais, reduzindo a dependência do acionista.",
/// server mirror – see src/lib/report-i18n.ts for source
    diversificarClientes: "Diversificar a base de clientes e formalizar contratos plurianuais com os principais clientes.",
/// server mirror – see src/lib/report-i18n.ts for source
    avaliarReplicabilidade: "Avaliar a replicabilidade do modelo noutras localizações, demonstrando potencial de escala ao investidor.",
/// server mirror – see src/lib/report-i18n.ts for source
    documentarCapex: "Documentar as necessidades de investimento, distinguindo capex de manutenção de capex de expansão.",
/// server mirror – see src/lib/report-i18n.ts for source
    prepararHistorico: "Preparar o histórico financeiro dos últimos três exercícios e a respetiva documentação de suporte.",
/// server mirror – see src/lib/report-i18n.ts for source
    definirImovel: "Definir antecipadamente se o imóvel deve integrar o perímetro da transação e obter uma avaliação independente.",
/// server mirror – see src/lib/report-i18n.ts for source
    validarMargem: "Validar a margem EBITDA e a classificação dos itens considerados extraordinários.",
/// server mirror – see src/lib/report-i18n.ts for source
    explicarContracao: "Preparar uma explicação sustentada da contração de faturação e do plano de recuperação.",
/// server mirror – see src/lib/report-i18n.ts for source
    validarComLealia: "Validar esta avaliação indicativa com a equipa da Lealia Advisory Partners antes de qualquer decisão de mercado.",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  resumo: {
/// server mirror – see src/lib/report-i18n.ts for source
    comResultado: (params: {
/// server mirror – see src/lib/report-i18n.ts for source
      equityMin: string;
/// server mirror – see src/lib/report-i18n.ts for source
      equityMax: string;
/// server mirror – see src/lib/report-i18n.ts for source
      evMin: string;
/// server mirror – see src/lib/report-i18n.ts for source
      evMax: string;
/// server mirror – see src/lib/report-i18n.ts for source
      ebitdaBase: string;
/// server mirror – see src/lib/report-i18n.ts for source
      multMin: string;
/// server mirror – see src/lib/report-i18n.ts for source
      multMax: string;
/// server mirror – see src/lib/report-i18n.ts for source
      ano: number;
/// server mirror – see src/lib/report-i18n.ts for source
      tipoPeriodo: string;
/// server mirror – see src/lib/report-i18n.ts for source
      fat1: string;
/// server mirror – see src/lib/report-i18n.ts for source
      margem: string | null;
/// server mirror – see src/lib/report-i18n.ts for source
    }) =>
/// server mirror – see src/lib/report-i18n.ts for source
      `Com base nos dados disponibilizados, estima-se um <strong>valor indicativo para os acionistas entre ${params.equityMin} e ${params.equityMax}</strong>. ` +
/// server mirror – see src/lib/report-i18n.ts for source
      `O intervalo resulta de um Enterprise Value entre ${params.evMin} e ${params.evMax}, ` +
/// server mirror – see src/lib/report-i18n.ts for source
      `calculado sobre um EBITDA normalizado de ${params.ebitdaBase} ` +
/// server mirror – see src/lib/report-i18n.ts for source
      `e um múltiplo EV/EBITDA implícito ajustado de ${params.multMin}–${params.multMax}. ` +
/// server mirror – see src/lib/report-i18n.ts for source
      `Em ${params.ano} (${params.tipoPeriodo}), a empresa apresentou uma faturação de ${params.fat1}` +
/// server mirror – see src/lib/report-i18n.ts for source
      `${params.margem !== null ? ` e uma margem EBITDA de ${params.margem}` : ""}.`,
/// server mirror – see src/lib/report-i18n.ts for source
    semResultado:
/// server mirror – see src/lib/report-i18n.ts for source
      "Com os dados indicados não é possível apresentar um valor indicativo por múltiplo de EBITDA. Este relatório apresenta, ainda assim, o perfil operacional da empresa e as principais recomendações aplicáveis.",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  mensagemAcionista: {
/// server mirror – see src/lib/report-i18n.ts for source
    historicoLimitado:
/// server mirror – see src/lib/report-i18n.ts for source
      "A principal oportunidade de preservação de valor antes de uma transação reside na consolidação de três exercícios financeiros reconciliados e na documentação dos ajustamentos ao EBITDA, reduzindo as lacunas de informação que tipicamente geram desconto em due diligence.",
/// server mirror – see src/lib/report-i18n.ts for source
    dependenciaAlta:
/// server mirror – see src/lib/report-i18n.ts for source
      "A principal oportunidade de criação de valor reside na redução da dependência do acionista, através do reforço da equipa de gestão e da formalização das relações comerciais em nome da empresa, aumentando a transferibilidade do negócio.",
/// server mirror – see src/lib/report-i18n.ts for source
    concentracaoAlta:
/// server mirror – see src/lib/report-i18n.ts for source
      "A principal oportunidade de criação de valor reside na diversificação da carteira de clientes e na formalização contratual das contas mais relevantes, reduzindo o risco comercial percebido pelo comprador.",
/// server mirror – see src/lib/report-i18n.ts for source
    padrao:
/// server mirror – see src/lib/report-i18n.ts for source
      "A principal oportunidade de criação de valor reside na validação da qualidade dos resultados, na documentação dos ajustamentos ao EBITDA e na redução das lacunas de informação que poderão gerar desconto em due diligence.",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  riscos: {
/// server mirror – see src/lib/report-i18n.ts for source
    historicoLimitado: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "Histórico financeiro limitado",
/// server mirror – see src/lib/report-i18n.ts for source
      evidenciaUm: "1 exercício disponibilizado",
/// server mirror – see src/lib/report-i18n.ts for source
      evidenciaVarios: (n: number) => `${n} exercícios disponibilizados`,
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Reduz a confiança na sustentabilidade dos resultados e pode condicionar o múltiplo",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Preparar e reconciliar a informação financeira dos últimos três exercícios",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    dependenciaGestao: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "Dependência de gestão do acionista",
/// server mirror – see src/lib/report-i18n.ts for source
      evidencia: (dep: string) => `Dependência do acionista na gestão: ${dep}`,
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Aumenta o risco de transição e de continuidade operacional após a transação",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Reforçar a equipa de gestão e documentar os processos-chave",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    concentracaoClientes: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "Concentração de clientes",
/// server mirror – see src/lib/report-i18n.ts for source
      evidencia: (top5: number) => `Cinco maiores clientes: ${top5}% da faturação`,
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Aumenta a exposição à perda de clientes relevantes",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Diversificar a carteira comercial e formalizar contratos plurianuais",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    dependenciaComercial: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "Dependência comercial do acionista",
/// server mirror – see src/lib/report-i18n.ts for source
      evidencia: (dep: string) => `Dependência do acionista na faturação: ${dep}`,
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Reduz a transferibilidade das relações comerciais após a transação",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Transferir contas-chave para gestores de conta e contratar em nome da empresa",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    localizacaoUnica: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "Operação numa única localização",
/// server mirror – see src/lib/report-i18n.ts for source
      evidencia: "Atividade concentrada num único site",
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Limita a escalabilidade e concentra o risco operacional e geográfico",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Avaliar replicabilidade do modelo e planos de expansão para novas localizações",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    posicaoLiquidaElevada: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "Posição Líquida elevada",
/// server mirror – see src/lib/report-i18n.ts for source
      evidencia: (racio: string) => `Posição Líquida equivalente a ${racio} o EBITDA normalizado`,
/// server mirror – see src/lib/report-i18n.ts for source
      evidenciaSemDados: "Posição Líquida equivalente a — o EBITDA normalizado",
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Reduz o Equity Value e pode limitar o financiamento de aquisição",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Reduzir dívida, otimizar caixa e preparar um mapa financeiro atualizado",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    capexElevado: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "CAPEX elevado",
/// server mirror – see src/lib/report-i18n.ts for source
      evidencia: (capex: string) => `CAPEX recorrente de ${capex} face ao EBITDA normalizado`,
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Limita a conversão de EBITDA em geração de caixa",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Separar CAPEX de manutenção e de crescimento e validar necessidades futuras",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    imovelSemAvaliacao: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "Imóvel próprio sem avaliação independente",
/// server mirror – see src/lib/report-i18n.ts for source
      evidencia: (metodo: string) => `Método de avaliação indicado: ${metodo}`,
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Introduz incerteza no Equity Value quando o imóvel integra o perímetro",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Obter avaliação independente e definir o perímetro da transação",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    ajustamentosPorValidar: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "Ajustamentos ao EBITDA por validar",
/// server mirror – see src/lib/report-i18n.ts for source
      evidencia: (valor: string) => `Ajustamentos de ${valor} declarados sem suporte documental`,
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Pode gerar descontos ou ajustamentos durante a due diligence",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Preparar reconciliação contabilística e documentação de suporte",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    contracaoFaturacao: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "Contração da faturação",
/// server mirror – see src/lib/report-i18n.ts for source
      evidencia: "Evolução negativa da faturação no período indicado",
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Pode condicionar o múltiplo aplicável e a leitura de sustentabilidade",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Documentar as causas e evidenciar a inflexão através de indicadores recentes",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    niveis: { alto: "Alto", medio: "Médio", baixo: "Baixo" },
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  plano: {
/// server mirror – see src/lib/report-i18n.ts for source
    consolidarHistorico: "Consolidar três exercícios de informação financeira reconciliada",
/// server mirror – see src/lib/report-i18n.ts for source
    reconciliarEbitda: "Reconciliar EBITDA reportado e normalizado e documentar os ajustamentos",
/// server mirror – see src/lib/report-i18n.ts for source
    confirmarDivida: "Confirmar dívida total e caixa, depósitos e outros equivalentes disponíveis à data de referência",
/// server mirror – see src/lib/report-i18n.ts for source
    analisarFundoManeio: "Analisar o fundo de maneio normativo e a sazonalidade do negócio",
/// server mirror – see src/lib/report-i18n.ts for source
    reduzirDependencia: "Reduzir a dependência do acionista e criar plano de sucessão",
/// server mirror – see src/lib/report-i18n.ts for source
    mapearConcentracao: "Mapear a concentração de clientes e formalizar contratos relevantes",
/// server mirror – see src/lib/report-i18n.ts for source
    separarCapex: "Separar CAPEX de manutenção e de crescimento",
/// server mirror – see src/lib/report-i18n.ts for source
    definirImovel: "Definir o tratamento do imóvel e obter avaliação independente",
/// server mirror – see src/lib/report-i18n.ts for source
    demonstrarReplicabilidade: "Demonstrar a replicabilidade do modelo noutras localizações",
/// server mirror – see src/lib/report-i18n.ts for source
    definirEstrutura: "Definir a estrutura da transação e o perímetro pretendido",
/// server mirror – see src/lib/report-i18n.ts for source
    prioridade: { alta: "Alta", media: "Média" },
/// server mirror – see src/lib/report-i18n.ts for source
    impacto: { alto: "Alto", muitoAlto: "Muito alto", medioAlto: "Médio/alto", medio: "Médio" },
/// server mirror – see src/lib/report-i18n.ts for source
    esforco: { alto: "Alto", medio: "Médio", baixo: "Baixo" },
/// server mirror – see src/lib/report-i18n.ts for source
    prazo: {
/// server mirror – see src/lib/report-i18n.ts for source
      semanas2a6: "2-6 semanas",
/// server mirror – see src/lib/report-i18n.ts for source
      semanas1a3: "1-3 semanas",
/// server mirror – see src/lib/report-i18n.ts for source
      semanas1a2: "1-2 semanas",
/// server mirror – see src/lib/report-i18n.ts for source
      semanas2a4: "2-4 semanas",
/// server mirror – see src/lib/report-i18n.ts for source
      meses3a12: "3-12 meses",
/// server mirror – see src/lib/report-i18n.ts for source
      semanas4a8: "4-8 semanas",
/// server mirror – see src/lib/report-i18n.ts for source
      meses6a12: "6-12 meses",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  implicacoesParticipacao: {
/// server mirror – see src/lib/report-i18n.ts for source
    minoritaria:
/// server mirror – see src/lib/report-i18n.ts for source
      "Numa participação minoritária não existe prémio de controlo e o investidor valoriza sobretudo a governação, os direitos de saída e o plano de crescimento. É frequente o valor por ação refletir um desconto de minoria.",
/// server mirror – see src/lib/report-i18n.ts for source
    maioritaria:
/// server mirror – see src/lib/report-i18n.ts for source
      "Numa venda maioritária o comprador assume o controlo e tende a incorporar prémio de controlo, exigindo em contrapartida continuidade da gestão e mecanismos de alinhamento como earn-out ou rollover de parte do capital.",
/// server mirror – see src/lib/report-i18n.ts for source
    totalidade:
/// server mirror – see src/lib/report-i18n.ts for source
      "Na venda da totalidade o comprador paga tipicamente prémio de controlo, mas exige um período de transição, garantias de continuidade dos clientes e um pacote de representações e garantias mais alargado.",
/// server mirror – see src/lib/report-i18n.ts for source
    indefinida:
/// server mirror – see src/lib/report-i18n.ts for source
      "A percentagem a transacionar ainda não está definida. A decisão condiciona o universo de investidores, a existência de prémio de controlo e a estrutura de pagamento.",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  limitacoes: {
/// server mirror – see src/lib/report-i18n.ts for source
    infoDeclarada: "A estimativa assenta exclusivamente na informação declarada, sem verificação documental ou auditoria.",
/// server mirror – see src/lib/report-i18n.ts for source
    fundoManeio: "Não foi realizada análise de fundo de maneio normativo nem de sazonalidade do negócio.",
/// server mirror – see src/lib/report-i18n.ts for source
    transacoesComparaveis: "Não foram analisadas transações comparáveis específicas nem o apetite atual de investidores para o ativo.",
/// server mirror – see src/lib/report-i18n.ts for source
    historicoInferior: "O histórico financeiro disponível é inferior a três exercícios.",
/// server mirror – see src/lib/report-i18n.ts for source
    setorGenerico: "O setor indicado não tem múltiplos específicos disponíveis; foi usada uma referência genérica de mercado.",
/// server mirror – see src/lib/report-i18n.ts for source
    periodoNaoEncerrado: "O período de referência não corresponde a contas encerradas, o que aumenta a incerteza da estimativa.",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  qualidade: {
/// server mirror – see src/lib/report-i18n.ts for source
    notaUmAno:
/// server mirror – see src/lib/report-i18n.ts for source
      "Com apenas um período financeiro, não é possível avaliar com robustez o crescimento, a estabilidade de margens, a conversão de resultados em caixa ou a sustentabilidade do EBITDA. Esta limitação reduz a confiança da avaliação e pode condicionar o múltiplo aplicável.",
/// server mirror – see src/lib/report-i18n.ts for source
    margensEstaveis: "As margens EBITDA mantiveram-se estáveis no período analisado, o que sustenta a leitura de recorrência dos resultados.",
/// server mirror – see src/lib/report-i18n.ts for source
    margensModeradas: "As margens EBITDA apresentam variação moderada no período analisado, justificando a validação dos fatores que explicam a oscilação.",
/// server mirror – see src/lib/report-i18n.ts for source
    margensRelevantes: "As margens EBITDA apresentam variação relevante no período analisado, o que exige explicação documentada em due diligence.",
/// server mirror – see src/lib/report-i18n.ts for source
    conversaoCaixaComCapex: (capex: string, pct: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
      `Após CAPEX recorrente de ${capex}, a conversão indicativa de EBITDA em caixa operacional é de ${pct}, antes de fundo de maneio, juros e impostos. Limitação: sem a desagregação entre CAPEX de manutenção e de crescimento, o fluxo de caixa livre subjacente à avaliação fica sujeito a correção em due diligence.`,
/// server mirror – see src/lib/report-i18n.ts for source
    conversaoCaixaSemCapex:
/// server mirror – see src/lib/report-i18n.ts for source
      "Não foi indicado CAPEX recorrente. Limitação: sem este dado não é possível estimar a conversão de EBITDA em caixa, o que reduz a fiabilidade do valor calculado e tende a traduzir-se em desconto por parte de um comprador.",
/// server mirror – see src/lib/report-i18n.ts for source
    fundoManeio:
/// server mirror – see src/lib/report-i18n.ts for source
      "O fundo de maneio não foi analisado nesta fase. Limitação: sem a normalização do fundo de maneio não é possível fixar com precisão a ponte entre Enterprise Value e Equity Value, podendo originar ajustamentos de closing euro-a-euro no preço final.",
/// server mirror – see src/lib/report-i18n.ts for source
    backlog: (valor: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
      `Foi indicado backlog contratado de ${valor}. Limitação: sem detalhe das margens, prazos de execução e condições de cancelamento, a visibilidade de receita não foi incorporada quantitativamente na avaliação — apenas considerada de forma qualitativa.`,
/// server mirror – see src/lib/report-i18n.ts for source
    concentracaoTop5: (top5: number) => `Concentração comercial: os cinco maiores clientes representam ${top5}% da faturação`,
/// server mirror – see src/lib/report-i18n.ts for source
    concentracaoTop1: (top1: number) => ` e o maior cliente ${top1}%`,
/// server mirror – see src/lib/report-i18n.ts for source
    concentracaoFim: ". Limitação: a dependência de poucos clientes aumenta o risco percebido da receita e condiciona diretamente o múltiplo aplicável na avaliação.",
/// server mirror – see src/lib/report-i18n.ts for source
    ajustamentosDeclarados: (valor: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
      `Foram declarados ajustamentos não recorrentes de ${valor}. Limitação: até serem validados documentalmente, o EBITDA ajustado — e, por consequência, o intervalo de avaliação apresentado — fica sujeito a revisão.`,
/// server mirror – see src/lib/report-i18n.ts for source
    ajustamentosNaoDeclarados:
/// server mirror – see src/lib/report-i18n.ts for source
      "Não foram declarados ajustamentos não recorrentes ao EBITDA. Limitação: qualquer normalização identificada em due diligence (remunerações de sócios, rendas fora de mercado, proveitos não recorrentes) poderá alterar o EBITDA base e o valor calculado.",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  alertas: {
/// server mirror – see src/lib/report-i18n.ts for source
    umPeriodo: "Apenas foi disponibilizado um período financeiro. A análise de crescimento e estabilidade de margens não é conclusiva.",
/// server mirror – see src/lib/report-i18n.ts for source
    ajustamentosSemSuporte: 'Existem ajustamentos ao EBITDA sem suporte documental. Devem ser classificados como "a validar em due diligence".',
/// server mirror – see src/lib/report-i18n.ts for source
    fundoManeioNaoAnalisado: "Não foi analisado o fundo de maneio. O Equity Value poderá ser afetado por ajustamentos de closing.",
/// server mirror – see src/lib/report-i18n.ts for source
    imovelSemAvaliacao: "O valor do imóvel foi introduzido sem avaliação independente. O Equity Value poderá sofrer alteração material.",
/// server mirror – see src/lib/report-i18n.ts for source
    imovelSemValor: "O imóvel foi incluído no perímetro sem valor indicado, pelo que não foi somado ao Equity Value.",
/// server mirror – see src/lib/report-i18n.ts for source
    periodoNaoClassificado: "O período financeiro de referência não foi classificado (contas encerradas, estimativa ou orçamento).",
/// server mirror – see src/lib/report-i18n.ts for source
    concentracaoInconsistente: "O peso dos cinco maiores clientes é inferior ao do maior cliente. Os dados devem ser revistos.",
/// server mirror – see src/lib/report-i18n.ts for source
    minoritariaAtencao: "O valor de uma participação minoritária não corresponde a uma proporção simples do Equity Value de 100%.",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  implicacoesEstrutura: {
/// server mirror – see src/lib/report-i18n.ts for source
    venda50: { estrutura: "Venda de 50%–51%", implicacao: "Exige regras claras de governação e acordo de acionistas" },
/// server mirror – see src/lib/report-i18n.ts for source
    venda60: { estrutura: "Venda de 60%–80%", implicacao: "Comprador obtém controlo; pode existir rollover relevante" },
/// server mirror – see src/lib/report-i18n.ts for source
    venda90: { estrutura: "Venda de 90%", implicacao: "Participação residual exige proteção e regras de saída" },
/// server mirror – see src/lib/report-i18n.ts for source
    venda100: { estrutura: "Venda de 100%", implicacao: "Estrutura mais simples; continuidade de gestão torna-se crítica" },
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  notas: {
/// server mirror – see src/lib/report-i18n.ts for source
    equity: "O Equity Value apresentado é indicativo e calculado antes de ajustamentos de closing, normalização de fundo de maneio, contingências, impostos aplicáveis e validação em due diligence.",
/// server mirror – see src/lib/report-i18n.ts for source
    minoria: "O valor de uma participação minoritária não deve ser assumido como uma simples proporção do Equity Value de 100%. O valor pode variar em função de controlo, direitos de governação, liquidez e estrutura da transação.",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  // ---------------------------------------------------------------------
/// server mirror – see src/lib/report-i18n.ts for source
  // ReportDocument.tsx
/// server mirror – see src/lib/report-i18n.ts for source
  // ---------------------------------------------------------------------
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  doc: {
/// server mirror – see src/lib/report-i18n.ts for source
    disclaimer:
/// server mirror – see src/lib/report-i18n.ts for source
      "O presente relatório constitui uma estimativa indicativa da avaliação da empresa, gerada com base na informação fornecida pelo utilizador, não configurando aconselhamento financeiro, proposta contratual, recomendação de investimento ou avaliação formal para efeitos legais, fiscais ou contabilísticos; os valores apresentados dependem da qualidade e exatidão dos dados introduzidos e das condições de mercado vigentes à data de elaboração deste documento.",
/// server mirror – see src/lib/report-i18n.ts for source
    footer: (empresa: string) => `Lealia Advisory Partners · Relatório de avaliação indicativa${empresa ? ` para ${empresa}` : ""}`,
/// server mirror – see src/lib/report-i18n.ts for source
    efeito: { neutro: "Neutro", positivo: "Positivo", negativo: "Negativo" },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    waterfall: {
/// server mirror – see src/lib/report-i18n.ts for source
      caption: "Equity Bridge · milhares de €",
/// server mirror – see src/lib/report-i18n.ts for source
      ariaLabel: "Gráfico waterfall da Equity Bridge",
/// server mirror – see src/lib/report-i18n.ts for source
      enterpriseValue: "Enterprise Value",
/// server mirror – see src/lib/report-i18n.ts for source
      equityValue: "Equity Value",
/// server mirror – see src/lib/report-i18n.ts for source
      divida: "Dívida",
/// server mirror – see src/lib/report-i18n.ts for source
      caixa: "Caixa",
/// server mirror – see src/lib/report-i18n.ts for source
      imovel: "Imóvel",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    dcf: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "DCF Valuation",
/// server mirror – see src/lib/report-i18n.ts for source
      hTitulo: "Avaliação por fluxos de caixa descontados",
/// server mirror – see src/lib/report-i18n.ts for source
      semDados: "Não é possível apresentar uma análise DCF com a informação disponibilizada. Em particular, o custo de capital estimado tem de ser superior à taxa de crescimento na perpetuidade.",
/// server mirror – see src/lib/report-i18n.ts for source
      mapaFluxos: "Mapa de fluxos de caixa",
/// server mirror – see src/lib/report-i18n.ts for source
      unidadeMilhares: "milhares de €",
/// server mirror – see src/lib/report-i18n.ts for source
      linha: "Linha",
/// server mirror – see src/lib/report-i18n.ts for source
      tv: "TV",
/// server mirror – see src/lib/report-i18n.ts for source
      receita: "Receita",
/// server mirror – see src/lib/report-i18n.ts for source
      ebitda: "EBITDA",
/// server mirror – see src/lib/report-i18n.ts for source
      margemEbitda: "Margem EBITDA",
/// server mirror – see src/lib/report-i18n.ts for source
      da: "(−) D&A",
/// server mirror – see src/lib/report-i18n.ts for source
      ebit: "= EBIT",
/// server mirror – see src/lib/report-i18n.ts for source
      impostoEbit: "(−) Imposto s/ EBIT",
/// server mirror – see src/lib/report-i18n.ts for source
      nopat: "= NOPAT",
/// server mirror – see src/lib/report-i18n.ts for source
      maisDa: "(+) D&A",
/// server mirror – see src/lib/report-i18n.ts for source
      menosCapex: "(−) Capex",
/// server mirror – see src/lib/report-i18n.ts for source
      fcff: "= FCFF unlevered",
/// server mirror – see src/lib/report-i18n.ts for source
      fatorDesconto: "Fator de desconto",
/// server mirror – see src/lib/report-i18n.ts for source
      pvFcff: "= PV do FCFF",
/// server mirror – see src/lib/report-i18n.ts for source
      legenda: "A = exercício histórico · F = ano projetado · TV = valor terminal. Fluxo unlevered: o financiamento é refletido no custo de capital e na dívida líquida. TV por perpetuidade sobre o FCFF do ano 8.",
/// server mirror – see src/lib/report-i18n.ts for source
      pressupostosForecast: "Pressupostos do forecast",
/// server mirror – see src/lib/report-i18n.ts for source
      crescimentoInicial: "Crescimento inicial",
/// server mirror – see src/lib/report-i18n.ts for source
      anoEstabilizacao: "Ano de estabilização",
/// server mirror – see src/lib/report-i18n.ts for source
      anoN: (n: number) => `Ano ${n}`,
/// server mirror – see src/lib/report-i18n.ts for source
      crescimentoEstabilizado: "Crescimento estabilizado",
/// server mirror – see src/lib/report-i18n.ts for source
      crescimentoPerpetuidade: "Crescimento na perpetuidade",
/// server mirror – see src/lib/report-i18n.ts for source
      margemEbitdaProjetada: "Margem EBITDA projetada",
/// server mirror – see src/lib/report-i18n.ts for source
      capexPctReceita: "Capex (% receita)",
/// server mirror – see src/lib/report-i18n.ts for source
      daPctReceita: "D&A (% receita)",
/// server mirror – see src/lib/report-i18n.ts for source
      fundoManeio: "Fundo de maneio",
/// server mirror – see src/lib/report-i18n.ts for source
      naoProjetado: "Não projetado",
/// server mirror – see src/lib/report-i18n.ts for source
      taxaImposto: "Taxa de imposto (CIT)",
/// server mirror – see src/lib/report-i18n.ts for source
      indicadoresAvaliacao: "Indicadores de avaliação",
/// server mirror – see src/lib/report-i18n.ts for source
      enterpriseValue: "Enterprise Value",
/// server mirror – see src/lib/report-i18n.ts for source
      equityValue: "Equity Value",
/// server mirror – see src/lib/report-i18n.ts for source
      evEbitdaImplicito: "EV / EBITDA implícito",
/// server mirror – see src/lib/report-i18n.ts for source
      evReceitaImplicito: "EV / Receita implícito",
/// server mirror – see src/lib/report-i18n.ts for source
      wacc: "Custo médio ponderado de capital",
/// server mirror – see src/lib/report-i18n.ts for source
      riskFree: "Risk-free rate (Rf)",
/// server mirror – see src/lib/report-i18n.ts for source
      beta: "Beta unlevered / levered (β)",
/// server mirror – see src/lib/report-i18n.ts for source
      erp: "Equity Risk Premium (ERP)",
/// server mirror – see src/lib/report-i18n.ts for source
      crp: "Country Risk Premium (CRP)",
/// server mirror – see src/lib/report-i18n.ts for source
      premioDimensao: "Prémio de dimensão (PME)",
/// server mirror – see src/lib/report-i18n.ts for source
      premioEspecifico: "Prémio específico (iliquidez)",
/// server mirror – see src/lib/report-i18n.ts for source
      premioAtivoEspecifico: "Prémio específico do ativo",
/// server mirror – see src/lib/report-i18n.ts for source
      costOfEquity: "Cost of Equity (Ke)",
/// server mirror – see src/lib/report-i18n.ts for source
      costOfDebt: "Cost of Debt pre / post tax (Kd)",
/// server mirror – see src/lib/report-i18n.ts for source
      pesoEquityDivida: "Peso de equity / dívida (E / D)",
/// server mirror – see src/lib/report-i18n.ts for source
      waccLabel: "WACC",
/// server mirror – see src/lib/report-i18n.ts for source
      resultados: "Resultados",
/// server mirror – see src/lib/report-i18n.ts for source
      pvExplicito: "PV do forecast explícito (8 anos)",
/// server mirror – see src/lib/report-i18n.ts for source
      pvTerminal: "PV do valor terminal",
/// server mirror – see src/lib/report-i18n.ts for source
      pesoTerminal: "Peso do valor terminal no EV",
/// server mirror – see src/lib/report-i18n.ts for source
      ajusteDividaLiquida: "Ajustamento de dívida líquida",
/// server mirror – see src/lib/report-i18n.ts for source
      imovel: "Imóvel",
/// server mirror – see src/lib/report-i18n.ts for source
      notaCustoCapital: (pais: string, citNota: string, extra: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `Custo de capital estimado numa ótica prudente: às referências setoriais acrescem prémios de dimensão e de iliquidez, porque uma PME não cotada tem risco superior ao das cotadas do setor. Beta, ERP, CRP, estrutura de capital e spread são proxies setoriais; CIT de ${pais} (${citNota})${extra ? ` ${extra}` : ""}`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    sensitivity: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Sensitivity Analysis",
/// server mirror – see src/lib/report-i18n.ts for source
      hTitulo: "Análise de sensibilidade",
/// server mirror – see src/lib/report-i18n.ts for source
      semDados: "Sem análise DCF disponível, não é possível apresentar as matrizes de sensibilidade.",
/// server mirror – see src/lib/report-i18n.ts for source
      sensibilidadeEv: "Sensibilidade do Enterprise Value",
/// server mirror – see src/lib/report-i18n.ts for source
      notaMatriz: "A célula destacada corresponde ao cenário base apresentado no slide anterior. As matrizes isolam o efeito de cada variável, mantendo constantes os restantes pressupostos.",
/// server mirror – see src/lib/report-i18n.ts for source
      transparenciaPressupostos: "Transparência de pressupostos",
/// server mirror – see src/lib/report-i18n.ts for source
      introTransparencia: "Os pressupostos do modelo combinam a informação introduzida no formulário com referências setoriais de mercado, seguindo um critério conservador - na dúvida, adota-se o valor que resulta numa avaliação mais prudente. A tabela seguinte consolida os pressupostos estruturantes da avaliação e a respetiva fonte ou método de derivação.",
/// server mirror – see src/lib/report-i18n.ts for source
      parametro: "Parâmetro",
/// server mirror – see src/lib/report-i18n.ts for source
      valor: "Valor",
/// server mirror – see src/lib/report-i18n.ts for source
      metodoFonte: "Método / fonte",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    lockedPages: {
/// server mirror – see src/lib/report-i18n.ts for source
      p4: "Âmbito e limitações",
/// server mirror – see src/lib/report-i18n.ts for source
      p5: "Método e alternativas",
/// server mirror – see src/lib/report-i18n.ts for source
      p6: "Ajustes ao múltiplo",
/// server mirror – see src/lib/report-i18n.ts for source
      p7: "Cenários e sensibilidade",
/// server mirror – see src/lib/report-i18n.ts for source
      p8: "Equity Bridge e contexto da transação",
/// server mirror – see src/lib/report-i18n.ts for source
      p9: "Drivers de Valor & Riscos",
/// server mirror – see src/lib/report-i18n.ts for source
      p10: "DCF Valuation",
/// server mirror – see src/lib/report-i18n.ts for source
      p11: "Sensitivity Analysis",
/// server mirror – see src/lib/report-i18n.ts for source
      p12: "Preparação para o mercado",
/// server mirror – see src/lib/report-i18n.ts for source
      p13: "Processo de M&A",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    conteudoReservado: "Conteúdo reservado",
/// server mirror – see src/lib/report-i18n.ts for source
    lockedTexto: "Esta secção faz parte do relatório completo. Agende uma reunião de 20 minutos com a equipa da Lealia para visualizar a análise integral e a discussão dos resultados.",
/// server mirror – see src/lib/report-i18n.ts for source
    lockedCta: "Agendar reunião para ver o relatório completo",
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    cover: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Preliminary Valuation",
/// server mirror – see src/lib/report-i18n.ts for source
      preparadoPara: "Preparado para",
/// server mirror – see src/lib/report-i18n.ts for source
      data: "Data",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p2: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Sumário executivo",
/// server mirror – see src/lib/report-i18n.ts for source
      evIndicativo: "Enterprise Value indicativo",
/// server mirror – see src/lib/report-i18n.ts for source
      equityIndicativo: "Equity Value Indicativo",
/// server mirror – see src/lib/report-i18n.ts for source
      faturacaoAno: "Faturação do ano de referência",
/// server mirror – see src/lib/report-i18n.ts for source
      ebitdaNormalizado: "EBITDA normalizado",
/// server mirror – see src/lib/report-i18n.ts for source
      margemNormalizada: "Margem EBITDA normalizada",
/// server mirror – see src/lib/report-i18n.ts for source
      multiploImplicito: "Múltiplo implícito",
/// server mirror – see src/lib/report-i18n.ts for source
      posicaoLiquida: "Posição Líquida",
/// server mirror – see src/lib/report-i18n.ts for source
      posicaoLiquidaHint: "caixa / (dívida)",
/// server mirror – see src/lib/report-i18n.ts for source
      completudeInformacao: "Completude da informação",
/// server mirror – see src/lib/report-i18n.ts for source
      metodologia: "Metodologia de avaliação",
/// server mirror – see src/lib/report-i18n.ts for source
      metodo1Titulo: "Determinação do EBITDA normalizado",
/// server mirror – see src/lib/report-i18n.ts for source
      metodo1: (ebitda: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `EBITDA reportado último exercício de referência, excluindo o impacto de despesas extraordinárias não recorrentes e, se aplicável, considerando o impacto de uma correção teórica sobre a renda do imóvel ao mercado. O EBITDA normalizado é de ${ebitda}.`,
/// server mirror – see src/lib/report-i18n.ts for source
      metodo2Titulo: "Múltiplo setorial de base",
/// server mirror – see src/lib/report-i18n.ts for source
      metodo2: "Definido com referência aos múltiplos praticados em transações recentes e comparáveis no setor e na região.",
/// server mirror – see src/lib/report-i18n.ts for source
      metodo3Titulo: "Ajustes de perfil e risco",
/// server mirror – see src/lib/report-i18n.ts for source
      metodo3: "Dimensão, maturidade, crescimento, recorrência de receita, concentração de clientes, geografia, dependência do acionista e intensidade de investimento, com um limite global aplicado ao conjunto dos ajustes.",
/// server mirror – see src/lib/report-i18n.ts for source
      metodo4Titulo: "Equity Bridge",
/// server mirror – see src/lib/report-i18n.ts for source
      metodo4: "Ao Enterprise Value soma-se a caixa, depósitos e outros equivalentes, deduz-se a dívida total, e, se aplicável, soma-se o imóvel incluído no perímetro da transação e o impacto pro-forma em caixa resultante da alienação de ativos não operacionais, obtendo-se o Equity Value antes de ajustamentos de closing.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p3: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Perfil da empresa e outros indicadores",
/// server mirror – see src/lib/report-i18n.ts for source
      perfilEmpresa: "Perfil da empresa",
/// server mirror – see src/lib/report-i18n.ts for source
      indicador: "Indicador",
/// server mirror – see src/lib/report-i18n.ts for source
      valor: "Valor",
/// server mirror – see src/lib/report-i18n.ts for source
      historicoFinanceiro: "Histórico financeiro",
/// server mirror – see src/lib/report-i18n.ts for source
      ano: "Ano",
/// server mirror – see src/lib/report-i18n.ts for source
      faturacao: "Faturação",
/// server mirror – see src/lib/report-i18n.ts for source
      ebitda: "EBITDA",
/// server mirror – see src/lib/report-i18n.ts for source
      extraordinarios: "Extraordinários",
/// server mirror – see src/lib/report-i18n.ts for source
      normalizacoes: "Normalizações",
/// server mirror – see src/lib/report-i18n.ts for source
      cagrFaturacao: "CAGR da faturação",
/// server mirror – see src/lib/report-i18n.ts for source
      cagrEbitda: "CAGR do EBITDA normalizado",
/// server mirror – see src/lib/report-i18n.ts for source
      semInfoSuficiente: "Sem informação suficiente",
/// server mirror – see src/lib/report-i18n.ts for source
      normalizacaoEbitda: "Normalização do EBITDA",
/// server mirror – see src/lib/report-i18n.ts for source
      linha: "Linha",
/// server mirror – see src/lib/report-i18n.ts for source
      notaNormalizacao: "Os ajustamentos de normalização aproximam o resultado operacional recorrente num cenário pós-transação.",
/// server mirror – see src/lib/report-i18n.ts for source
      outrosIndicadores: "Outros Indicadores",
/// server mirror – see src/lib/report-i18n.ts for source
      caixaDepositos: "Caixa, depósitos e outros equivalentes",
/// server mirror – see src/lib/report-i18n.ts for source
      dividaTotal: "Dívida total",
/// server mirror – see src/lib/report-i18n.ts for source
      capexAnual: "CAPEX anual recorrente",
/// server mirror – see src/lib/report-i18n.ts for source
      unidadesLocalizacoes: "Unidades / localizações",
/// server mirror – see src/lib/report-i18n.ts for source
      concentracaoMaiorCliente: "% Concentração no maior cliente",
/// server mirror – see src/lib/report-i18n.ts for source
      concentracaoTop5: "% Concentração no top 5 clientes",
/// server mirror – see src/lib/report-i18n.ts for source
      clientesAtivos: "Clientes ativos",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p4: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Âmbito e limitações",
/// server mirror – see src/lib/report-i18n.ts for source
      hTitulo: "Âmbito e limitações deste relatório",
/// server mirror – see src/lib/report-i18n.ts for source
      naturezaDocumento: "Natureza do documento",
/// server mirror – see src/lib/report-i18n.ts for source
      natureza1: "Trata-se de uma avaliação indicativa preliminar, elaborada exclusivamente a partir da informação fornecida pelo utilizador, sem verificação independente, auditoria ou revisão dos dados.",
/// server mirror – see src/lib/report-i18n.ts for source
      natureza2: "Não constitui aconselhamento financeiro, fiscal, contabilístico ou jurídico, nem uma recomendação de investimento ou desinvestimento.",
/// server mirror – see src/lib/report-i18n.ts for source
      natureza3: "Não configura uma avaliação formal (fairness opinion) para efeitos legais, fiscais, contabilísticos ou regulatórios, nem uma proposta contratual ou oferta vinculativa.",
/// server mirror – see src/lib/report-i18n.ts for source
      natureza4: "O documento destina-se ao uso exclusivo do destinatário identificado na capa e não deve ser divulgado a terceiros sem autorização escrita da Lealia Advisory Partners.",
/// server mirror – see src/lib/report-i18n.ts for source
      limitacoesFatores: "Limitações e fatores de variação",
/// server mirror – see src/lib/report-i18n.ts for source
      limitacao1: "Os valores apresentados dependem da qualidade, exatidão e completude dos dados introduzidos. Dados incompletos ou incorretos alteram materialmente o resultado.",
/// server mirror – see src/lib/report-i18n.ts for source
      limitacao2: "As referências de mercado utilizadas refletem condições vigentes à data de elaboração e podem variar rapidamente com o contexto macroeconómico, setorial e de financiamento.",
/// server mirror – see src/lib/report-i18n.ts for source
      limitacao3: "O preço efetivo de uma transação depende do perfil do comprador, da estrutura do negócio, das garantias, dos ajustamentos de closing e do processo negocial.",
/// server mirror – see src/lib/report-i18n.ts for source
      limitacao4: "Uma avaliação definitiva exige due diligence financeira, fiscal, legal e operacional, bem como a validação documental dos ajustamentos ao EBITDA.",
/// server mirror – see src/lib/report-i18n.ts for source
      semResponsabilidade: "A Lealia Advisory Partners não assume responsabilidade por decisões tomadas com base exclusiva neste documento.",
/// server mirror – see src/lib/report-i18n.ts for source
      leituraComplementar: "Leitura complementar",
/// server mirror – see src/lib/report-i18n.ts for source
      leituraFinal: "A sazonalidade e o CAPEX de manutenção face ao CAPEX de crescimento não foram desagregados nesta fase. Limitação: sem esta leitura não é possível aferir a recorrência mensal dos resultados nem a sustentabilidade do fluxo de caixa, pelo que o valor calculado não reflete eventuais picos ou necessidades estacionais de tesouraria.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p5: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Método e alternativas",
/// server mirror – see src/lib/report-i18n.ts for source
      porqueMultiplos: "Porquê múltiplos de EBITDA",
/// server mirror – see src/lib/report-i18n.ts for source
      par1: "A avaliação por múltiplos é uma abordagem de mercado: o valor de uma empresa é inferido a partir dos preços pagos por investidores em transações recentes por empresas com perfil comparável. No contexto de M&A de PME, o EBITDA é habitualmente utilizado como referência, por refletir a capacidade de geração de resultados operacionais antes do impacto da estrutura de financiamento, política de amortizações e do regime fiscal.",
/// server mirror – see src/lib/report-i18n.ts for source
      par2: "É também o método mais adequado a uma estimativa preliminar: exige poucos pressupostos discricionários, é transparente e reflete diretamente o apetite atual do mercado pelo setor. A sua limitação é a dependência da qualidade dos comparáveis e o facto de captar a fotografia atual do negócio, e não um plano de crescimento futuro.",
/// server mirror – see src/lib/report-i18n.ts for source
      par3: "O EV/EBITDA tende a ser mais adequado para empresas com EBITDA positivo, operações relativamente estáveis e estruturas de custos comparáveis às das empresas utilizadas como referência. É menos informativo quando a empresa apresenta resultados operacionais negativos ou muito voláteis, quando existem diferenças significativas de crescimento ou margem face aos comparáveis, ou quando o negócio se encontra numa fase de forte transformação.",
/// server mirror – see src/lib/report-i18n.ts for source
      par4: "A avaliação por múltiplos é, assim, uma referência simples, transparente e alinhada com o mercado, especialmente útil quando existem comparáveis sólidos e para suportar uma primeira estimativa de valor. A sua principal limitação é depender da qualidade desses comparáveis e não refletir, por si só, o potencial futuro do negócio.",
/// server mirror – see src/lib/report-i18n.ts for source
      nota: "Numa transação real, os múltiplos são o ponto de partida da negociação e são depois confrontados com uma análise de fluxos de caixa e com a due diligence.",
/// server mirror – see src/lib/report-i18n.ts for source
      metodosAlternativos: "Métodos alternativos",
/// server mirror – see src/lib/report-i18n.ts for source
      dcfTitulo: "DCF - fluxos de caixa descontados",
/// server mirror – see src/lib/report-i18n.ts for source
      dcfNota: "(ver slides 10 & 11)",
/// server mirror – see src/lib/report-i18n.ts for source
      dcfDesc: "Projeta os fluxos de caixa futuros e desconta-os a uma taxa que reflete o custo do capital (WACC). É o método mais rigoroso quando existe um plano de negócios credível, mas é muito sensível aos pressupostos.",
/// server mirror – see src/lib/report-i18n.ts for source
      outrosMultiplosTitulo: "Outros múltiplos de transação",
/// server mirror – see src/lib/report-i18n.ts for source
      outrosMultiplosDesc: "Para além do EV/EBITDA, podem ser utilizados múltiplos como EV/Receitas, EV/EBIT ou P/E, dependendo do setor, da maturidade e da rentabilidade da empresa. A sua relevância depende da comparabilidade das empresas e da qualidade da informação disponível.",
/// server mirror – see src/lib/report-i18n.ts for source
      metricasSetorTitulo: "Métricas específicas do setor",
/// server mirror – see src/lib/report-i18n.ts for source
      metricasSetorDesc: "Complementa os múltiplos financeiros através de métricas operacionais relevantes para cada negócio, como valor por unidade, cliente, cama, subscritor ou metro quadrado. É particularmente útil em setores onde estes indicadores explicam de forma mais direta o potencial económico da empresa.",
/// server mirror – see src/lib/report-i18n.ts for source
      valorPatrimonialTitulo: "Valor patrimonial / liquidação",
/// server mirror – see src/lib/report-i18n.ts for source
      valorPatrimonialDesc: "Avalia os ativos líquidos ao seu valor de mercado. Relevante em negócios intensivos em ativos, funcionando como valor mínimo de referência.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p6: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Ajustes ao múltiplo",
/// server mirror – see src/lib/report-i18n.ts for source
      hTitulo: "Ajustes aplicados ao múltiplo setorial",
/// server mirror – see src/lib/report-i18n.ts for source
      fator: "Fator",
/// server mirror – see src/lib/report-i18n.ts for source
      leitura: "Leitura",
/// server mirror – see src/lib/report-i18n.ts for source
      efeito: "Efeito",
/// server mirror – see src/lib/report-i18n.ts for source
      semAjustes: "Não foram aplicados ajustes ao múltiplo setorial de base.",
/// server mirror – see src/lib/report-i18n.ts for source
      nota: "O conjunto dos ajustes está limitado a um intervalo global de −40% a +35% sobre o múltiplo setorial de base, evitando que a combinação de fatores produza resultados extremos. Todos os fatores assentam em informação declarada e carecem de validação documental.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p7: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Cenários e sensibilidade",
/// server mirror – see src/lib/report-i18n.ts for source
      cenariosValorizacao: "Cenários de valorização",
/// server mirror – see src/lib/report-i18n.ts for source
      cenario: "Cenário",
/// server mirror – see src/lib/report-i18n.ts for source
      pressupostos: "Pressupostos",
/// server mirror – see src/lib/report-i18n.ts for source
      multiplo: "Múltiplo",
/// server mirror – see src/lib/report-i18n.ts for source
      enterpriseValue: "Enterprise Value",
/// server mirror – see src/lib/report-i18n.ts for source
      equityValue: "Equity Value",
/// server mirror – see src/lib/report-i18n.ts for source
      semCenarios: "Sem cenários disponíveis para os dados fornecidos.",
/// server mirror – see src/lib/report-i18n.ts for source
      sensibilidadeEv: "Sensibilidade do Enterprise Value",
/// server mirror – see src/lib/report-i18n.ts for source
      variacaoEbitda: "Variação do EBITDA",
/// server mirror – see src/lib/report-i18n.ts for source
      ebitda: "EBITDA",
/// server mirror – see src/lib/report-i18n.ts for source
      notaSensibilidade: "A tabela mostra como o Enterprise Value reage a variações do EBITDA normalizado e do múltiplo aplicado. O Equity Value acompanha estas variações, ajustado pela dívida total, caixa, depósitos e outros equivalentes, e o imóvel indicado na equity bridge.",
/// server mirror – see src/lib/report-i18n.ts for source
      semSensibilidade: "Sem análise de sensibilidade disponível.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p8: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Equity Bridge e contexto da transação",
/// server mirror – see src/lib/report-i18n.ts for source
      equityBridge: "Equity Bridge",
/// server mirror – see src/lib/report-i18n.ts for source
      componente: "Componente",
/// server mirror – see src/lib/report-i18n.ts for source
      valor: "Valor",
/// server mirror – see src/lib/report-i18n.ts for source
      contextoEstrutura: "Contexto e estrutura da transação",
/// server mirror – see src/lib/report-i18n.ts for source
      parametro: "Parâmetro",
/// server mirror – see src/lib/report-i18n.ts for source
      detalhe: "Detalhe",
/// server mirror – see src/lib/report-i18n.ts for source
      motivoTransacao: "Motivo da transação",
/// server mirror – see src/lib/report-i18n.ts for source
      pctATransacionar: "Percentagem de capital a transacionar",
/// server mirror – see src/lib/report-i18n.ts for source
      estruturaPretendida: "Estrutura pretendida",
/// server mirror – see src/lib/report-i18n.ts for source
      horizonteTemporal: "Horizonte temporal",
/// server mirror – see src/lib/report-i18n.ts for source
      permanenciaAcionista: "Permanência do acionista",
/// server mirror – see src/lib/report-i18n.ts for source
      imovel: "Imóvel",
/// server mirror – see src/lib/report-i18n.ts for source
      tipoInvestidor: "Tipo de investidor preferencial",
/// server mirror – see src/lib/report-i18n.ts for source
      estrutura: "Estrutura",
/// server mirror – see src/lib/report-i18n.ts for source
      implicacao: "Implicação",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p9: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Drivers de Valor & Riscos",
/// server mirror – see src/lib/report-i18n.ts for source
      driversValor: "Drivers de Valor",
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Driver",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: "Descrição",
/// server mirror – see src/lib/report-i18n.ts for source
      semDrivers: "Não foram identificados drivers de valor específicos com base na informação disponibilizada.",
/// server mirror – see src/lib/report-i18n.ts for source
      riscosMitigantes: "Riscos e mitigantes",
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "Risco",
/// server mirror – see src/lib/report-i18n.ts for source
      evidenciaDisponivel: "Evidência disponível",
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Impacto",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Mitigante",
/// server mirror – see src/lib/report-i18n.ts for source
      semRiscos: "Não foram identificados riscos materiais específicos com base na informação disponibilizada.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p12: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Preparação para o mercado",
/// server mirror – see src/lib/report-i18n.ts for source
      planoPreparacao: "Plano de preparação priorizado",
/// server mirror – see src/lib/report-i18n.ts for source
      notaSecao: "Esta secção destina-se a quem está a considerar avançar com um processo de M&A. A nossa equipa pode ajudá-lo a preparar o negócio para maximizar o valor na venda. Contacte-nos para uma conversa inicial sem compromisso.",
/// server mirror – see src/lib/report-i18n.ts for source
      prioridade: "Prioridade",
/// server mirror – see src/lib/report-i18n.ts for source
      acao: "Ação",
/// server mirror – see src/lib/report-i18n.ts for source
      impactoEsperado: "Impacto esperado",
/// server mirror – see src/lib/report-i18n.ts for source
      esforco: "Esforço",
/// server mirror – see src/lib/report-i18n.ts for source
      recomendacoesImediatas: "Recomendações imediatas",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p13: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Processo de M&A",
/// server mirror – see src/lib/report-i18n.ts for source
      hTitulo: "Como decorre um processo de M&A",
/// server mirror – see src/lib/report-i18n.ts for source
      notaSecao: "Esta secção destina-se a quem está a considerar avançar com um processo de M&A. A nossa equipa pode ajudá-lo a preparar o negócio para maximizar o valor na venda. Contacte-nos para uma conversa inicial sem compromisso.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p14: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Próximo passo e contactos",
/// server mirror – see src/lib/report-i18n.ts for source
      obrigado: "Obrigado.",
/// server mirror – see src/lib/report-i18n.ts for source
      lead: "Obrigado pelo seu tempo. Este relatório é um ponto de partida: a conversão de uma estimativa indicativa numa avaliação sustentada exige a validação dos números, a análise de transações comparáveis recentes e a leitura do apetite atual de investidores financeiros e estratégicos para o seu setor.",
/// server mirror – see src/lib/report-i18n.ts for source
      proximoPassoTitulo: "Próximo passo · Reunião de 20 minutos",
/// server mirror – see src/lib/report-i18n.ts for source
      proximoPassoDesc: "Revisão conjunta dos pressupostos deste relatório com a equipa da Lealia e apresentação do relatório completo.",
/// server mirror – see src/lib/report-i18n.ts for source
      agendarReuniao: "Agendar reunião",
/// server mirror – see src/lib/report-i18n.ts for source
      contactos: "Contactos",
/// server mirror – see src/lib/report-i18n.ts for source
      managingPartner: "Managing Partner",
/// server mirror – see src/lib/report-i18n.ts for source
      notaFinal: (empresa: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `Documento de natureza indicativa, preparado exclusivamente para ${empresa}. Não constitui aconselhamento financeiro nem proposta contratual.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source
};
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
const en: typeof pt = {
/// server mirror – see src/lib/report-i18n.ts for source
  common: {
/// server mirror – see src/lib/report-i18n.ts for source
    naoIndicado: "Not provided",
/// server mirror – see src/lib/report-i18n.ts for source
    nao: "No",
/// server mirror – see src/lib/report-i18n.ts for source
    neutro: "Neutral",
/// server mirror – see src/lib/report-i18n.ts for source
    positivo: "Positive",
/// server mirror – see src/lib/report-i18n.ts for source
    negativo: "Negative",
/// server mirror – see src/lib/report-i18n.ts for source
    naoAplicavel: "n/a",
/// server mirror – see src/lib/report-i18n.ts for source
    tracoLongo: "—",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  perfil: {
/// server mirror – see src/lib/report-i18n.ts for source
    atividadePrincipal: "Core activity",
/// server mirror – see src/lib/report-i18n.ts for source
    setor: "Sector",
/// server mirror – see src/lib/report-i18n.ts for source
    geografia: "Geography",
/// server mirror – see src/lib/report-i18n.ts for source
    unidadesLocalizacoes: "Units / locations",
/// server mirror – see src/lib/report-i18n.ts for source
    anosAtividade: "Years in operation",
/// server mirror – see src/lib/report-i18n.ts for source
    anosAtividadeValor: (n: number) => `${n} years`,
/// server mirror – see src/lib/report-i18n.ts for source
    colaboradores: "Employees",
/// server mirror – see src/lib/report-i18n.ts for source
    anoReferencia: "Reference year",
/// server mirror – see src/lib/report-i18n.ts for source
    periodoReferencia: "Reference period",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  ponte: {
/// server mirror – see src/lib/report-i18n.ts for source
    enterpriseValueBase: "Base Enterprise Value",
/// server mirror – see src/lib/report-i18n.ts for source
    maisCaixa: "Plus: cash, deposits and other equivalents",
/// server mirror – see src/lib/report-i18n.ts for source
    menosDivida: "Less: total debt",
/// server mirror – see src/lib/report-i18n.ts for source
    maisImovel: "Plus: real estate within perimeter",
/// server mirror – see src/lib/report-i18n.ts for source
    equityValueBase: "Base Equity Value",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  historico: {
/// server mirror – see src/lib/report-i18n.ts for source
    umAno: "One year of financial history was provided.",
/// server mirror – see src/lib/report-i18n.ts for source
    variosAnos: (n: number) => `${n} years of financial history were provided.`,
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  imovel: {
/// server mirror – see src/lib/report-i18n.ts for source
    propriedadeIncluida: "Company-owned · included in perimeter",
/// server mirror – see src/lib/report-i18n.ts for source
    propriedadeExcluida: "Company-owned · outside perimeter",
/// server mirror – see src/lib/report-i18n.ts for source
    arrendadoTerceiros: "Leased to third parties",
/// server mirror – see src/lib/report-i18n.ts for source
    incluidoPerimetro: "Included in perimeter",
/// server mirror – see src/lib/report-i18n.ts for source
    excluidoPerimetro: "Excluded from perimeter",
/// server mirror – see src/lib/report-i18n.ts for source
    arrendado: "Leased",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  drivers: {
/// server mirror – see src/lib/report-i18n.ts for source
    crescimentoSustentado: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Sustained growth",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao:
/// server mirror – see src/lib/report-i18n.ts for source
        "Revenue evolved positively over the period analysed. A demonstrated growth trajectory supports the upper end of the multiple range and reduces the relative weight of execution risk in the negotiation.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    dimensaoRelevante: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Relevant scale",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: (fat1: string, ebitda: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `With revenue of ${fat1} and normalised EBITDA of ${ebitda}, the company sits above the scale threshold at which institutional investors and international strategic buyers compete actively, widening the pool of counterparties.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    rendibilidadeAcimaMedia: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Above-average profitability",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: (margem: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `The normalised EBITDA margin of ${margem} evidences pricing power and cost discipline, attributes that buyers reward with multiples above the sector benchmark.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    conversaoCaixa: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Strong EBITDA-to-cash conversion",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: (capexRacio: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `Recurring capex represents only ${capexRacio} of normalised EBITDA. A capital-light model frees up cash for acquisition debt service, which is decisive for financial buyers.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    gestaoAutonoma: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Management independent of the shareholder",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao:
/// server mirror – see src/lib/report-i18n.ts for source
        "The business operates with low reliance on the shareholder for day-to-day management. A second layer of leadership able to ensure continuity reduces transition risk and shortens the retention period required by the buyer.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    relacoesTransferiveis: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Transferable commercial relationships",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao:
/// server mirror – see src/lib/report-i18n.ts for source
        "Revenue does not materially depend on the shareholder's personal relationships with clients, which reduces the likelihood of revenue erosion after closing and limits the need for earn-outs or additional guarantees.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    carteiraDiversificada: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Diversified client portfolio",
/// server mirror – see src/lib/report-i18n.ts for source
      descricaoTop5: (top5: number) => `The top five clients account for ${top5}% of revenue`,
/// server mirror – see src/lib/report-i18n.ts for source
      descricaoTop1: (top1: number) => `The largest client accounts for ${top1}% of revenue`,
/// server mirror – see src/lib/report-i18n.ts for source
      descricaoFim:
/// server mirror – see src/lib/report-i18n.ts for source
        ", a comfortable concentration level that reduces perceived commercial risk and eases pressure on the indemnity package.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    visibilidadeReceita: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Contracted revenue visibility",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: (backlog: string, racio: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `The contracted backlog of ${backlog} equates to ${racio} of annual revenue, lending predictability to the business plan presented to the buyer.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    modeloReplicavel: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Model replicable across units",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: (unidades: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `Operations across ${unidades} demonstrate that the business model is replicable and does not rely on a single asset or team, supporting consolidation and post-acquisition expansion theses.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    exposicaoInternacional: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "International exposure",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: (geografia: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `The client distribution (${geografia}) reduces reliance on a single market and makes the company relevant to foreign buyers seeking a presence in the region.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    posicaoLiquida: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Net cash position",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: (valor: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `The company holds a positive net cash position of ${valor}, which adds directly to Equity Value and strengthens the shareholder's negotiating position on the pricing mechanism.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    trackRecord: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Established track record",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: (anos: number) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `${anos} years of operation support the reading of business model resilience across different cycles and reduce the operational risk perceived by the buyer.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    imovelValorizado: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Externally appraised real estate asset",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: (metodo: string, valor: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `The owned property included in the perimeter is supported by ${metodo} (${valor}), adding to Equity Value with a value that is defensible in due diligence.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  recomendacoes: {
/// server mirror – see src/lib/report-i18n.ts for source
    reforcarGestao:
/// server mirror – see src/lib/report-i18n.ts for source
      "Strengthen the management team and document processes and commercial relationships, reducing reliance on the shareholder.",
/// server mirror – see src/lib/report-i18n.ts for source
    diversificarClientes: "Diversify the client base and formalise multi-year contracts with key clients.",
/// server mirror – see src/lib/report-i18n.ts for source
    avaliarReplicabilidade: "Assess the replicability of the model in other locations, demonstrating scale potential to the investor.",
/// server mirror – see src/lib/report-i18n.ts for source
    documentarCapex: "Document investment needs, distinguishing maintenance capex from growth capex.",
/// server mirror – see src/lib/report-i18n.ts for source
    prepararHistorico: "Prepare the financial history of the last three financial years together with supporting documentation.",
/// server mirror – see src/lib/report-i18n.ts for source
    definirImovel: "Decide in advance whether the property should be included in the transaction perimeter and obtain an independent valuation.",
/// server mirror – see src/lib/report-i18n.ts for source
    validarMargem: "Validate the EBITDA margin and the classification of items treated as extraordinary.",
/// server mirror – see src/lib/report-i18n.ts for source
    explicarContracao: "Prepare a well-supported explanation of the revenue contraction and the recovery plan.",
/// server mirror – see src/lib/report-i18n.ts for source
    validarComLealia: "Validate this indicative valuation with the Lealia Advisory Partners team before any market decision.",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  resumo: {
/// server mirror – see src/lib/report-i18n.ts for source
    comResultado: (params: {
/// server mirror – see src/lib/report-i18n.ts for source
      equityMin: string;
/// server mirror – see src/lib/report-i18n.ts for source
      equityMax: string;
/// server mirror – see src/lib/report-i18n.ts for source
      evMin: string;
/// server mirror – see src/lib/report-i18n.ts for source
      evMax: string;
/// server mirror – see src/lib/report-i18n.ts for source
      ebitdaBase: string;
/// server mirror – see src/lib/report-i18n.ts for source
      multMin: string;
/// server mirror – see src/lib/report-i18n.ts for source
      multMax: string;
/// server mirror – see src/lib/report-i18n.ts for source
      ano: number;
/// server mirror – see src/lib/report-i18n.ts for source
      tipoPeriodo: string;
/// server mirror – see src/lib/report-i18n.ts for source
      fat1: string;
/// server mirror – see src/lib/report-i18n.ts for source
      margem: string | null;
/// server mirror – see src/lib/report-i18n.ts for source
    }) =>
/// server mirror – see src/lib/report-i18n.ts for source
      `Based on the data provided, we estimate an <strong>indicative value for shareholders of between ${params.equityMin} and ${params.equityMax}</strong>. ` +
/// server mirror – see src/lib/report-i18n.ts for source
      `The range results from an Enterprise Value of between ${params.evMin} and ${params.evMax}, ` +
/// server mirror – see src/lib/report-i18n.ts for source
      `calculated on normalised EBITDA of ${params.ebitdaBase} ` +
/// server mirror – see src/lib/report-i18n.ts for source
      `and an implied adjusted EV/EBITDA multiple of ${params.multMin}–${params.multMax}. ` +
/// server mirror – see src/lib/report-i18n.ts for source
      `In ${params.ano} (${params.tipoPeriodo}), the company reported revenue of ${params.fat1}` +
/// server mirror – see src/lib/report-i18n.ts for source
      `${params.margem !== null ? ` and an EBITDA margin of ${params.margem}` : ""}.`,
/// server mirror – see src/lib/report-i18n.ts for source
    semResultado:
/// server mirror – see src/lib/report-i18n.ts for source
      "Based on the information provided, it is not possible to present an indicative value using an EBITDA multiple. This report nonetheless presents the company's operating profile and the main applicable recommendations.",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  mensagemAcionista: {
/// server mirror – see src/lib/report-i18n.ts for source
    historicoLimitado:
/// server mirror – see src/lib/report-i18n.ts for source
      "The main opportunity to preserve value ahead of a transaction lies in consolidating three reconciled financial years and documenting the EBITDA adjustments, reducing the information gaps that typically drive discounts in due diligence.",
/// server mirror – see src/lib/report-i18n.ts for source
    dependenciaAlta:
/// server mirror – see src/lib/report-i18n.ts for source
      "The main opportunity to create value lies in reducing reliance on the shareholder, by strengthening the management team and formalising commercial relationships in the company's name, increasing the transferability of the business.",
/// server mirror – see src/lib/report-i18n.ts for source
    concentracaoAlta:
/// server mirror – see src/lib/report-i18n.ts for source
      "The main opportunity to create value lies in diversifying the client portfolio and formalising contracts with the most relevant accounts, reducing the commercial risk perceived by the buyer.",
/// server mirror – see src/lib/report-i18n.ts for source
    padrao:
/// server mirror – see src/lib/report-i18n.ts for source
      "The main opportunity to create value lies in validating the quality of earnings, documenting the EBITDA adjustments and reducing information gaps that could otherwise drive a discount in due diligence.",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  riscos: {
/// server mirror – see src/lib/report-i18n.ts for source
    historicoLimitado: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "Limited financial history",
/// server mirror – see src/lib/report-i18n.ts for source
      evidenciaUm: "1 financial year provided",
/// server mirror – see src/lib/report-i18n.ts for source
      evidenciaVarios: (n: number) => `${n} financial years provided`,
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Reduces confidence in the sustainability of results and may constrain the multiple",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Prepare and reconcile financial information for the last three financial years",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    dependenciaGestao: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "Reliance on shareholder management",
/// server mirror – see src/lib/report-i18n.ts for source
      evidencia: (dep: string) => `Reliance on the shareholder for management: ${dep}`,
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Increases transition risk and operational continuity risk after the transaction",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Strengthen the management team and document key processes",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    concentracaoClientes: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "Client concentration",
/// server mirror – see src/lib/report-i18n.ts for source
      evidencia: (top5: number) => `Top five clients: ${top5}% of revenue`,
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Increases exposure to the loss of key clients",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Diversify the client portfolio and formalise multi-year contracts",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    dependenciaComercial: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "Commercial reliance on the shareholder",
/// server mirror – see src/lib/report-i18n.ts for source
      evidencia: (dep: string) => `Reliance on the shareholder for revenue generation: ${dep}`,
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Reduces the transferability of commercial relationships after the transaction",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Transfer key accounts to account managers and contract in the company's name",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    localizacaoUnica: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "Single-site operation",
/// server mirror – see src/lib/report-i18n.ts for source
      evidencia: "Activity concentrated in a single site",
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Limits scalability and concentrates operational and geographic risk",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Assess model replicability and expansion plans for new locations",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    posicaoLiquidaElevada: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "High net debt position",
/// server mirror – see src/lib/report-i18n.ts for source
      evidencia: (racio: string) => `Net debt equivalent to ${racio} normalised EBITDA`,
/// server mirror – see src/lib/report-i18n.ts for source
      evidenciaSemDados: "Net debt equivalent to — normalised EBITDA",
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Reduces Equity Value and may limit acquisition financing",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Reduce debt, optimise cash and prepare an updated financial statement",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    capexElevado: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "High capex",
/// server mirror – see src/lib/report-i18n.ts for source
      evidencia: (capex: string) => `Recurring capex of ${capex} relative to normalised EBITDA`,
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Limits the conversion of EBITDA into cash generation",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Separate maintenance capex from growth capex and validate future needs",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    imovelSemAvaliacao: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "Owned property without an independent valuation",
/// server mirror – see src/lib/report-i18n.ts for source
      evidencia: (metodo: string) => `Valuation method indicated: ${metodo}`,
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Introduces uncertainty into Equity Value when the property is included in the perimeter",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Obtain an independent valuation and define the transaction perimeter",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    ajustamentosPorValidar: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "EBITDA adjustments pending validation",
/// server mirror – see src/lib/report-i18n.ts for source
      evidencia: (valor: string) => `Adjustments of ${valor} declared without supporting documentation`,
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "May result in discounts or adjustments during due diligence",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Prepare an accounting reconciliation and supporting documentation",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    contracaoFaturacao: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "Revenue contraction",
/// server mirror – see src/lib/report-i18n.ts for source
      evidencia: "Negative revenue trend over the period indicated",
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "May constrain the applicable multiple and the reading of sustainability",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Document the causes and evidence the turnaround through recent indicators",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    niveis: { alto: "High", medio: "Medium", baixo: "Low" },
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  plano: {
/// server mirror – see src/lib/report-i18n.ts for source
    consolidarHistorico: "Consolidate three years of reconciled financial information",
/// server mirror – see src/lib/report-i18n.ts for source
    reconciliarEbitda: "Reconcile reported and normalised EBITDA and document the adjustments",
/// server mirror – see src/lib/report-i18n.ts for source
    confirmarDivida: "Confirm total debt and cash, deposits and other equivalents available at the reference date",
/// server mirror – see src/lib/report-i18n.ts for source
    analisarFundoManeio: "Analyse normative working capital and the seasonality of the business",
/// server mirror – see src/lib/report-i18n.ts for source
    reduzirDependencia: "Reduce reliance on the shareholder and create a succession plan",
/// server mirror – see src/lib/report-i18n.ts for source
    mapearConcentracao: "Map client concentration and formalise relevant contracts",
/// server mirror – see src/lib/report-i18n.ts for source
    separarCapex: "Separate maintenance capex from growth capex",
/// server mirror – see src/lib/report-i18n.ts for source
    definirImovel: "Define the treatment of the property and obtain an independent valuation",
/// server mirror – see src/lib/report-i18n.ts for source
    demonstrarReplicabilidade: "Demonstrate the replicability of the model in other locations",
/// server mirror – see src/lib/report-i18n.ts for source
    definirEstrutura: "Define the transaction structure and the intended perimeter",
/// server mirror – see src/lib/report-i18n.ts for source
    prioridade: { alta: "High", media: "Medium" },
/// server mirror – see src/lib/report-i18n.ts for source
    impacto: { alto: "High", muitoAlto: "Very high", medioAlto: "Medium/high", medio: "Medium" },
/// server mirror – see src/lib/report-i18n.ts for source
    esforco: { alto: "High", medio: "Medium", baixo: "Low" },
/// server mirror – see src/lib/report-i18n.ts for source
    prazo: {
/// server mirror – see src/lib/report-i18n.ts for source
      semanas2a6: "2-6 weeks",
/// server mirror – see src/lib/report-i18n.ts for source
      semanas1a3: "1-3 weeks",
/// server mirror – see src/lib/report-i18n.ts for source
      semanas1a2: "1-2 weeks",
/// server mirror – see src/lib/report-i18n.ts for source
      semanas2a4: "2-4 weeks",
/// server mirror – see src/lib/report-i18n.ts for source
      meses3a12: "3-12 months",
/// server mirror – see src/lib/report-i18n.ts for source
      semanas4a8: "4-8 weeks",
/// server mirror – see src/lib/report-i18n.ts for source
      meses6a12: "6-12 months",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  implicacoesParticipacao: {
/// server mirror – see src/lib/report-i18n.ts for source
    minoritaria:
/// server mirror – see src/lib/report-i18n.ts for source
      "In a minority stake there is no control premium, and the investor mainly values governance, exit rights and the growth plan. The value per share often reflects a minority discount.",
/// server mirror – see src/lib/report-i18n.ts for source
    maioritaria:
/// server mirror – see src/lib/report-i18n.ts for source
      "In a majority sale the buyer takes control and tends to pay a control premium, in exchange typically requiring management continuity and alignment mechanisms such as an earn-out or a rollover of part of the capital.",
/// server mirror – see src/lib/report-i18n.ts for source
    totalidade:
/// server mirror – see src/lib/report-i18n.ts for source
      "In a full sale the buyer typically pays a control premium, but requires a transition period, client continuity guarantees and a broader package of representations and warranties.",
/// server mirror – see src/lib/report-i18n.ts for source
    indefinida:
/// server mirror – see src/lib/report-i18n.ts for source
      "The percentage to be sold has not yet been defined. This decision shapes the universe of investors, the existence of a control premium and the payment structure.",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  limitacoes: {
/// server mirror – see src/lib/report-i18n.ts for source
    infoDeclarada: "The estimate relies exclusively on the information declared, without documentary verification or audit.",
/// server mirror – see src/lib/report-i18n.ts for source
    fundoManeio: "No analysis of normative working capital or business seasonality was performed.",
/// server mirror – see src/lib/report-i18n.ts for source
    transacoesComparaveis: "No specific comparable transactions or current investor appetite for the asset were analysed.",
/// server mirror – see src/lib/report-i18n.ts for source
    historicoInferior: "The financial history available covers fewer than three financial years.",
/// server mirror – see src/lib/report-i18n.ts for source
    setorGenerico: "No sector-specific multiples are available for the sector indicated; a generic market reference was used.",
/// server mirror – see src/lib/report-i18n.ts for source
    periodoNaoEncerrado: "The reference period does not correspond to closed accounts, which increases the uncertainty of the estimate.",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  qualidade: {
/// server mirror – see src/lib/report-i18n.ts for source
    notaUmAno:
/// server mirror – see src/lib/report-i18n.ts for source
      "With only one financial period, it is not possible to robustly assess growth, margin stability, cash conversion or the sustainability of EBITDA. This limitation reduces confidence in the valuation and may constrain the applicable multiple.",
/// server mirror – see src/lib/report-i18n.ts for source
    margensEstaveis: "EBITDA margins remained stable over the period analysed, supporting the reading of earnings recurrence.",
/// server mirror – see src/lib/report-i18n.ts for source
    margensModeradas: "EBITDA margins show moderate variation over the period analysed, warranting validation of the factors explaining the fluctuation.",
/// server mirror – see src/lib/report-i18n.ts for source
    margensRelevantes: "EBITDA margins show significant variation over the period analysed, which requires a documented explanation in due diligence.",
/// server mirror – see src/lib/report-i18n.ts for source
    conversaoCaixaComCapex: (capex: string, pct: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
      `After recurring capex of ${capex}, the indicative conversion of EBITDA into operating cash is ${pct}, before working capital, interest and taxes. Limitation: without a breakdown between maintenance and growth capex, the free cash flow underlying the valuation remains subject to correction in due diligence.`,
/// server mirror – see src/lib/report-i18n.ts for source
    conversaoCaixaSemCapex:
/// server mirror – see src/lib/report-i18n.ts for source
      "No recurring capex was indicated. Limitation: without this data it is not possible to estimate the conversion of EBITDA into cash, which reduces the reliability of the value calculated and tends to translate into a discount by a buyer.",
/// server mirror – see src/lib/report-i18n.ts for source
    fundoManeio:
/// server mirror – see src/lib/report-i18n.ts for source
      "Working capital has not been analysed at this stage. Limitation: without normalising working capital it is not possible to precisely set the bridge between Enterprise Value and Equity Value, which may give rise to euro-for-euro closing adjustments to the final price.",
/// server mirror – see src/lib/report-i18n.ts for source
    backlog: (valor: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
      `A contracted backlog of ${valor} was indicated. Limitation: without detail on margins, delivery timelines and cancellation terms, revenue visibility was not incorporated quantitatively into the valuation — it was only considered qualitatively.`,
/// server mirror – see src/lib/report-i18n.ts for source
    concentracaoTop5: (top5: number) => `Commercial concentration: the top five clients account for ${top5}% of revenue`,
/// server mirror – see src/lib/report-i18n.ts for source
    concentracaoTop1: (top1: number) => ` and the largest client for ${top1}%`,
/// server mirror – see src/lib/report-i18n.ts for source
    concentracaoFim: ". Limitation: reliance on a few clients increases the perceived risk of revenue and directly constrains the multiple applicable in the valuation.",
/// server mirror – see src/lib/report-i18n.ts for source
    ajustamentosDeclarados: (valor: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
      `Non-recurring adjustments of ${valor} were declared. Limitation: until validated with supporting documentation, the adjusted EBITDA — and consequently the valuation range presented — remains subject to revision.`,
/// server mirror – see src/lib/report-i18n.ts for source
    ajustamentosNaoDeclarados:
/// server mirror – see src/lib/report-i18n.ts for source
      "No non-recurring adjustments to EBITDA were declared. Limitation: any normalisation identified in due diligence (shareholder remuneration, off-market rents, non-recurring income) could change the base EBITDA and the value calculated.",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  alertas: {
/// server mirror – see src/lib/report-i18n.ts for source
    umPeriodo: "Only one financial period was provided. The growth and margin stability analysis is not conclusive.",
/// server mirror – see src/lib/report-i18n.ts for source
    ajustamentosSemSuporte: 'There are EBITDA adjustments without supporting documentation. They should be classified as "to be validated in due diligence".',
/// server mirror – see src/lib/report-i18n.ts for source
    fundoManeioNaoAnalisado: "Working capital has not been analysed. Equity Value may be affected by closing adjustments.",
/// server mirror – see src/lib/report-i18n.ts for source
    imovelSemAvaliacao: "The property value was entered without an independent valuation. Equity Value may change materially.",
/// server mirror – see src/lib/report-i18n.ts for source
    imovelSemValor: "The property was included in the perimeter without a stated value, so it was not added to Equity Value.",
/// server mirror – see src/lib/report-i18n.ts for source
    periodoNaoClassificado: "The reference financial period has not been classified (closed accounts, estimate or budget).",
/// server mirror – see src/lib/report-i18n.ts for source
    concentracaoInconsistente: "The share of the top five clients is lower than that of the largest client. The data should be reviewed.",
/// server mirror – see src/lib/report-i18n.ts for source
    minoritariaAtencao: "The value of a minority stake does not correspond to a simple proportion of the 100% Equity Value.",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  implicacoesEstrutura: {
/// server mirror – see src/lib/report-i18n.ts for source
    venda50: { estrutura: "Sale of 50%–51%", implicacao: "Requires clear governance rules and a shareholders' agreement" },
/// server mirror – see src/lib/report-i18n.ts for source
    venda60: { estrutura: "Sale of 60%–80%", implicacao: "Buyer obtains control; a significant rollover may apply" },
/// server mirror – see src/lib/report-i18n.ts for source
    venda90: { estrutura: "Sale of 90%", implicacao: "Residual stake requires protection and exit rules" },
/// server mirror – see src/lib/report-i18n.ts for source
    venda100: { estrutura: "Sale of 100%", implicacao: "Simpler structure; management continuity becomes critical" },
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  notas: {
/// server mirror – see src/lib/report-i18n.ts for source
    equity: "The Equity Value presented is indicative and calculated before closing adjustments, working capital normalisation, contingencies, applicable taxes and due diligence validation.",
/// server mirror – see src/lib/report-i18n.ts for source
    minoria: "The value of a minority stake should not be assumed to be a simple proportion of the 100% Equity Value. The value may vary depending on control, governance rights, liquidity and the transaction structure.",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  doc: {
/// server mirror – see src/lib/report-i18n.ts for source
    disclaimer:
/// server mirror – see src/lib/report-i18n.ts for source
      "This report constitutes an indicative estimate of the company's valuation, generated on the basis of information provided by the user. It does not constitute financial advice, a contractual proposal, an investment recommendation or a formal valuation for legal, tax or accounting purposes; the values presented depend on the quality and accuracy of the data entered and on market conditions prevailing on the date this document was prepared.",
/// server mirror – see src/lib/report-i18n.ts for source
    footer: (empresa: string) => `Lealia Advisory Partners · Indicative Valuation Report${empresa ? ` for ${empresa}` : ""}`,
/// server mirror – see src/lib/report-i18n.ts for source
    efeito: { neutro: "Neutral", positivo: "Positive", negativo: "Negative" },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    waterfall: {
/// server mirror – see src/lib/report-i18n.ts for source
      caption: "Equity Bridge · € thousands",
/// server mirror – see src/lib/report-i18n.ts for source
      ariaLabel: "Equity Bridge waterfall chart",
/// server mirror – see src/lib/report-i18n.ts for source
      enterpriseValue: "Enterprise Value",
/// server mirror – see src/lib/report-i18n.ts for source
      equityValue: "Equity Value",
/// server mirror – see src/lib/report-i18n.ts for source
      divida: "Debt",
/// server mirror – see src/lib/report-i18n.ts for source
      caixa: "Cash",
/// server mirror – see src/lib/report-i18n.ts for source
      imovel: "Property",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    dcf: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "DCF Valuation",
/// server mirror – see src/lib/report-i18n.ts for source
      hTitulo: "Discounted cash flow valuation",
/// server mirror – see src/lib/report-i18n.ts for source
      semDados: "It is not possible to present a DCF analysis with the information provided. In particular, the estimated cost of capital must be higher than the perpetuity growth rate.",
/// server mirror – see src/lib/report-i18n.ts for source
      mapaFluxos: "Cash flow map",
/// server mirror – see src/lib/report-i18n.ts for source
      unidadeMilhares: "€ thousands",
/// server mirror – see src/lib/report-i18n.ts for source
      linha: "Line",
/// server mirror – see src/lib/report-i18n.ts for source
      tv: "TV",
/// server mirror – see src/lib/report-i18n.ts for source
      receita: "Revenue",
/// server mirror – see src/lib/report-i18n.ts for source
      ebitda: "EBITDA",
/// server mirror – see src/lib/report-i18n.ts for source
      margemEbitda: "EBITDA margin",
/// server mirror – see src/lib/report-i18n.ts for source
      da: "(−) D&A",
/// server mirror – see src/lib/report-i18n.ts for source
      ebit: "= EBIT",
/// server mirror – see src/lib/report-i18n.ts for source
      impostoEbit: "(−) Tax on EBIT",
/// server mirror – see src/lib/report-i18n.ts for source
      nopat: "= NOPAT",
/// server mirror – see src/lib/report-i18n.ts for source
      maisDa: "(+) D&A",
/// server mirror – see src/lib/report-i18n.ts for source
      menosCapex: "(−) Capex",
/// server mirror – see src/lib/report-i18n.ts for source
      fcff: "= Unlevered FCFF",
/// server mirror – see src/lib/report-i18n.ts for source
      fatorDesconto: "Discount factor",
/// server mirror – see src/lib/report-i18n.ts for source
      pvFcff: "= PV of FCFF",
/// server mirror – see src/lib/report-i18n.ts for source
      legenda: "A = historical year · F = forecast year · TV = terminal value. Unlevered flow: financing is reflected in the cost of capital and in net debt. TV based on a perpetuity of the year-8 FCFF.",
/// server mirror – see src/lib/report-i18n.ts for source
      pressupostosForecast: "Forecast assumptions",
/// server mirror – see src/lib/report-i18n.ts for source
      crescimentoInicial: "Initial growth",
/// server mirror – see src/lib/report-i18n.ts for source
      anoEstabilizacao: "Stabilisation year",
/// server mirror – see src/lib/report-i18n.ts for source
      anoN: (n: number) => `Year ${n}`,
/// server mirror – see src/lib/report-i18n.ts for source
      crescimentoEstabilizado: "Stabilised growth",
/// server mirror – see src/lib/report-i18n.ts for source
      crescimentoPerpetuidade: "Perpetuity growth",
/// server mirror – see src/lib/report-i18n.ts for source
      margemEbitdaProjetada: "Projected EBITDA margin",
/// server mirror – see src/lib/report-i18n.ts for source
      capexPctReceita: "Capex (% of revenue)",
/// server mirror – see src/lib/report-i18n.ts for source
      daPctReceita: "D&A (% of revenue)",
/// server mirror – see src/lib/report-i18n.ts for source
      fundoManeio: "Working capital",
/// server mirror – see src/lib/report-i18n.ts for source
      naoProjetado: "Not projected",
/// server mirror – see src/lib/report-i18n.ts for source
      taxaImposto: "Tax rate (CIT)",
/// server mirror – see src/lib/report-i18n.ts for source
      indicadoresAvaliacao: "Valuation indicators",
/// server mirror – see src/lib/report-i18n.ts for source
      enterpriseValue: "Enterprise Value",
/// server mirror – see src/lib/report-i18n.ts for source
      equityValue: "Equity Value",
/// server mirror – see src/lib/report-i18n.ts for source
      evEbitdaImplicito: "Implied EV / EBITDA",
/// server mirror – see src/lib/report-i18n.ts for source
      evReceitaImplicito: "Implied EV / Revenue",
/// server mirror – see src/lib/report-i18n.ts for source
      wacc: "Weighted average cost of capital",
/// server mirror – see src/lib/report-i18n.ts for source
      riskFree: "Risk-free rate (Rf)",
/// server mirror – see src/lib/report-i18n.ts for source
      beta: "Unlevered / levered beta (β)",
/// server mirror – see src/lib/report-i18n.ts for source
      erp: "Equity Risk Premium (ERP)",
/// server mirror – see src/lib/report-i18n.ts for source
      crp: "Country Risk Premium (CRP)",
/// server mirror – see src/lib/report-i18n.ts for source
      premioDimensao: "Size premium (SME)",
/// server mirror – see src/lib/report-i18n.ts for source
      premioEspecifico: "Specific premium (illiquidity)",
/// server mirror – see src/lib/report-i18n.ts for source
      premioAtivoEspecifico: "Asset-specific premium",
/// server mirror – see src/lib/report-i18n.ts for source
      costOfEquity: "Cost of Equity (Ke)",
/// server mirror – see src/lib/report-i18n.ts for source
      costOfDebt: "Cost of Debt pre / post tax (Kd)",
/// server mirror – see src/lib/report-i18n.ts for source
      pesoEquityDivida: "Equity / debt weight (E / D)",
/// server mirror – see src/lib/report-i18n.ts for source
      waccLabel: "WACC",
/// server mirror – see src/lib/report-i18n.ts for source
      resultados: "Results",
/// server mirror – see src/lib/report-i18n.ts for source
      pvExplicito: "PV of explicit forecast (8 years)",
/// server mirror – see src/lib/report-i18n.ts for source
      pvTerminal: "PV of terminal value",
/// server mirror – see src/lib/report-i18n.ts for source
      pesoTerminal: "Weight of terminal value in EV",
/// server mirror – see src/lib/report-i18n.ts for source
      ajusteDividaLiquida: "Net debt adjustment",
/// server mirror – see src/lib/report-i18n.ts for source
      imovel: "Property",
/// server mirror – see src/lib/report-i18n.ts for source
      notaCustoCapital: (pais: string, citNota: string, extra: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `Cost of capital estimated on a prudent basis: size and illiquidity premiums are added to sector references, since an unlisted SME carries higher risk than listed sector peers. Beta, ERP, CRP, capital structure and spread are sector proxies; ${pais} CIT (${citNota})${extra ? ` ${extra}` : ""}`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    sensitivity: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Sensitivity Analysis",
/// server mirror – see src/lib/report-i18n.ts for source
      hTitulo: "Sensitivity analysis",
/// server mirror – see src/lib/report-i18n.ts for source
      semDados: "No DCF analysis is available, so the sensitivity matrices cannot be presented.",
/// server mirror – see src/lib/report-i18n.ts for source
      sensibilidadeEv: "Enterprise Value sensitivity",
/// server mirror – see src/lib/report-i18n.ts for source
      notaMatriz: "The highlighted cell corresponds to the base scenario presented on the previous slide. The matrices isolate the effect of each variable, holding the remaining assumptions constant.",
/// server mirror – see src/lib/report-i18n.ts for source
      transparenciaPressupostos: "Assumption transparency",
/// server mirror – see src/lib/report-i18n.ts for source
      introTransparencia: "The model's assumptions combine the information entered in the form with sector market references, following a conservative criterion — when in doubt, the value that results in a more prudent valuation is adopted. The table below sets out the valuation's structuring assumptions and their source or derivation method.",
/// server mirror – see src/lib/report-i18n.ts for source
      parametro: "Parameter",
/// server mirror – see src/lib/report-i18n.ts for source
      valor: "Value",
/// server mirror – see src/lib/report-i18n.ts for source
      metodoFonte: "Method / source",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    lockedPages: {
/// server mirror – see src/lib/report-i18n.ts for source
      p4: "Scope and limitations",
/// server mirror – see src/lib/report-i18n.ts for source
      p5: "Method and alternatives",
/// server mirror – see src/lib/report-i18n.ts for source
      p6: "Multiple adjustments",
/// server mirror – see src/lib/report-i18n.ts for source
      p7: "Scenarios and sensitivity",
/// server mirror – see src/lib/report-i18n.ts for source
      p8: "Equity Bridge and transaction context",
/// server mirror – see src/lib/report-i18n.ts for source
      p9: "Value Drivers & Risks",
/// server mirror – see src/lib/report-i18n.ts for source
      p10: "DCF Valuation",
/// server mirror – see src/lib/report-i18n.ts for source
      p11: "Sensitivity Analysis",
/// server mirror – see src/lib/report-i18n.ts for source
      p12: "Market preparation",
/// server mirror – see src/lib/report-i18n.ts for source
      p13: "M&A process",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    conteudoReservado: "Reserved content",
/// server mirror – see src/lib/report-i18n.ts for source
    lockedTexto: "This section is part of the full report. Schedule a 20-minute meeting with the Lealia team to view the full analysis and discuss the results.",
/// server mirror – see src/lib/report-i18n.ts for source
    lockedCta: "Schedule a meeting to view the full report",
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    cover: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Preliminary Valuation",
/// server mirror – see src/lib/report-i18n.ts for source
      preparadoPara: "Prepared for",
/// server mirror – see src/lib/report-i18n.ts for source
      data: "Date",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p2: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Executive summary",
/// server mirror – see src/lib/report-i18n.ts for source
      evIndicativo: "Indicative Enterprise Value",
/// server mirror – see src/lib/report-i18n.ts for source
      equityIndicativo: "Indicative Equity Value",
/// server mirror – see src/lib/report-i18n.ts for source
      faturacaoAno: "Reference-year revenue",
/// server mirror – see src/lib/report-i18n.ts for source
      ebitdaNormalizado: "Normalised EBITDA",
/// server mirror – see src/lib/report-i18n.ts for source
      margemNormalizada: "Normalised EBITDA margin",
/// server mirror – see src/lib/report-i18n.ts for source
      multiploImplicito: "Implied multiple",
/// server mirror – see src/lib/report-i18n.ts for source
      posicaoLiquida: "Net Position",
/// server mirror – see src/lib/report-i18n.ts for source
      posicaoLiquidaHint: "cash / (debt)",
/// server mirror – see src/lib/report-i18n.ts for source
      completudeInformacao: "Information completeness",
/// server mirror – see src/lib/report-i18n.ts for source
      metodologia: "Valuation methodology",
/// server mirror – see src/lib/report-i18n.ts for source
      metodo1Titulo: "Determining normalised EBITDA",
/// server mirror – see src/lib/report-i18n.ts for source
      metodo1: (ebitda: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `EBITDA reported for the last reference financial year, excluding the impact of non-recurring extraordinary expenses and, where applicable, factoring in a theoretical adjustment of property rent to market levels. Normalised EBITDA is ${ebitda}.`,
/// server mirror – see src/lib/report-i18n.ts for source
      metodo2Titulo: "Base sector multiple",
/// server mirror – see src/lib/report-i18n.ts for source
      metodo2: "Set by reference to the multiples applied in recent, comparable transactions in the sector and region.",
/// server mirror – see src/lib/report-i18n.ts for source
      metodo3Titulo: "Profile and risk adjustments",
/// server mirror – see src/lib/report-i18n.ts for source
      metodo3: "Scale, maturity, growth, revenue recurrence, client concentration, geography, reliance on the shareholder and investment intensity, subject to an overall cap applied to the combined adjustments.",
/// server mirror – see src/lib/report-i18n.ts for source
      metodo4Titulo: "Equity Bridge",
/// server mirror – see src/lib/report-i18n.ts for source
      metodo4: "Cash, deposits and other equivalents are added to Enterprise Value, total debt is deducted, and, where applicable, the property included in the transaction perimeter and the pro-forma cash impact of disposing of non-operating assets are added, arriving at Equity Value before closing adjustments.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p3: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Company profile and other indicators",
/// server mirror – see src/lib/report-i18n.ts for source
      perfilEmpresa: "Company profile",
/// server mirror – see src/lib/report-i18n.ts for source
      indicador: "Indicator",
/// server mirror – see src/lib/report-i18n.ts for source
      valor: "Value",
/// server mirror – see src/lib/report-i18n.ts for source
      historicoFinanceiro: "Financial history",
/// server mirror – see src/lib/report-i18n.ts for source
      ano: "Year",
/// server mirror – see src/lib/report-i18n.ts for source
      faturacao: "Revenue",
/// server mirror – see src/lib/report-i18n.ts for source
      ebitda: "EBITDA",
/// server mirror – see src/lib/report-i18n.ts for source
      extraordinarios: "Extraordinary items",
/// server mirror – see src/lib/report-i18n.ts for source
      normalizacoes: "Normalisations",
/// server mirror – see src/lib/report-i18n.ts for source
      cagrFaturacao: "Revenue CAGR",
/// server mirror – see src/lib/report-i18n.ts for source
      cagrEbitda: "Normalised EBITDA CAGR",
/// server mirror – see src/lib/report-i18n.ts for source
      semInfoSuficiente: "Insufficient information",
/// server mirror – see src/lib/report-i18n.ts for source
      normalizacaoEbitda: "EBITDA normalisation",
/// server mirror – see src/lib/report-i18n.ts for source
      linha: "Line",
/// server mirror – see src/lib/report-i18n.ts for source
      notaNormalizacao: "The normalisation adjustments approximate recurring operating income under a post-transaction scenario.",
/// server mirror – see src/lib/report-i18n.ts for source
      outrosIndicadores: "Other indicators",
/// server mirror – see src/lib/report-i18n.ts for source
      caixaDepositos: "Cash, deposits and other equivalents",
/// server mirror – see src/lib/report-i18n.ts for source
      dividaTotal: "Total debt",
/// server mirror – see src/lib/report-i18n.ts for source
      capexAnual: "Recurring annual capex",
/// server mirror – see src/lib/report-i18n.ts for source
      unidadesLocalizacoes: "Units / locations",
/// server mirror – see src/lib/report-i18n.ts for source
      concentracaoMaiorCliente: "% Concentration in largest client",
/// server mirror – see src/lib/report-i18n.ts for source
      concentracaoTop5: "% Concentration in top 5 clients",
/// server mirror – see src/lib/report-i18n.ts for source
      clientesAtivos: "Active clients",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p4: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Scope and limitations",
/// server mirror – see src/lib/report-i18n.ts for source
      hTitulo: "Scope and limitations of this report",
/// server mirror – see src/lib/report-i18n.ts for source
      naturezaDocumento: "Nature of the document",
/// server mirror – see src/lib/report-i18n.ts for source
      natureza1: "This is a preliminary indicative valuation, prepared exclusively from information provided by the user, without independent verification, audit or review of the data.",
/// server mirror – see src/lib/report-i18n.ts for source
      natureza2: "It does not constitute financial, tax, accounting or legal advice, nor an investment or divestment recommendation.",
/// server mirror – see src/lib/report-i18n.ts for source
      natureza3: "It does not constitute a formal valuation (fairness opinion) for legal, tax, accounting or regulatory purposes, nor a contractual proposal or binding offer.",
/// server mirror – see src/lib/report-i18n.ts for source
      natureza4: "This document is intended solely for the use of the recipient identified on the cover page and must not be disclosed to third parties without the written authorisation of Lealia Advisory Partners.",
/// server mirror – see src/lib/report-i18n.ts for source
      limitacoesFatores: "Limitations and factors of variation",
/// server mirror – see src/lib/report-i18n.ts for source
      limitacao1: "The values presented depend on the quality, accuracy and completeness of the data entered. Incomplete or incorrect data will materially change the result.",
/// server mirror – see src/lib/report-i18n.ts for source
      limitacao2: "The market references used reflect conditions prevailing on the date of preparation and may change rapidly with the macroeconomic, sector and financing context.",
/// server mirror – see src/lib/report-i18n.ts for source
      limitacao3: "The actual transaction price depends on the buyer's profile, the deal structure, the guarantees, closing adjustments and the negotiation process.",
/// server mirror – see src/lib/report-i18n.ts for source
      limitacao4: "A definitive valuation requires financial, tax, legal and operational due diligence, as well as documentary validation of the EBITDA adjustments.",
/// server mirror – see src/lib/report-i18n.ts for source
      semResponsabilidade: "Lealia Advisory Partners assumes no responsibility for decisions made based solely on this document.",
/// server mirror – see src/lib/report-i18n.ts for source
      leituraComplementar: "Further reading",
/// server mirror – see src/lib/report-i18n.ts for source
      leituraFinal: "Seasonality and maintenance capex relative to growth capex have not been broken down at this stage. Limitation: without this analysis it is not possible to assess the monthly recurrence of results or the sustainability of cash flow, so the value calculated does not reflect any seasonal peaks or treasury needs.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p5: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Method and alternatives",
/// server mirror – see src/lib/report-i18n.ts for source
      porqueMultiplos: "Why EBITDA multiples",
/// server mirror – see src/lib/report-i18n.ts for source
      par1: "Multiples-based valuation is a market approach: a company's value is inferred from prices paid by investors in recent transactions for companies with a comparable profile. In SME M&A, EBITDA is commonly used as the reference metric because it reflects the capacity to generate operating results before the impact of financing structure, depreciation policy and the tax regime.",
/// server mirror – see src/lib/report-i18n.ts for source
      par2: "It is also the most appropriate method for a preliminary estimate: it requires few discretionary assumptions, is transparent and directly reflects current market appetite for the sector. Its limitation is dependence on the quality of the comparables and the fact that it captures a snapshot of the current business rather than a future growth plan.",
/// server mirror – see src/lib/report-i18n.ts for source
      par3: "EV/EBITDA tends to be most appropriate for companies with positive EBITDA, relatively stable operations and cost structures comparable to the companies used as reference. It is less informative when the company reports negative or highly volatile operating results, when there are significant differences in growth or margin relative to the comparables, or when the business is undergoing significant transformation.",
/// server mirror – see src/lib/report-i18n.ts for source
      par4: "Multiples-based valuation is thus a simple, transparent and market-aligned reference, particularly useful when solid comparables exist and to support an initial estimate of value. Its main limitation is its dependence on the quality of those comparables and the fact that it does not, on its own, reflect the future potential of the business.",
/// server mirror – see src/lib/report-i18n.ts for source
      nota: "In an actual transaction, multiples are the starting point of the negotiation and are subsequently tested against a cash flow analysis and due diligence.",
/// server mirror – see src/lib/report-i18n.ts for source
      metodosAlternativos: "Alternative methods",
/// server mirror – see src/lib/report-i18n.ts for source
      dcfTitulo: "DCF - discounted cash flows",
/// server mirror – see src/lib/report-i18n.ts for source
      dcfNota: "(see slides 10 & 11)",
/// server mirror – see src/lib/report-i18n.ts for source
      dcfDesc: "Projects future cash flows and discounts them at a rate reflecting the cost of capital (WACC). It is the most rigorous method when a credible business plan exists, but it is highly sensitive to the underlying assumptions.",
/// server mirror – see src/lib/report-i18n.ts for source
      outrosMultiplosTitulo: "Other transaction multiples",
/// server mirror – see src/lib/report-i18n.ts for source
      outrosMultiplosDesc: "In addition to EV/EBITDA, multiples such as EV/Revenue, EV/EBIT or P/E may be used, depending on the sector, maturity and profitability of the company. Their relevance depends on the comparability of the companies and the quality of the information available.",
/// server mirror – see src/lib/report-i18n.ts for source
      metricasSetorTitulo: "Sector-specific metrics",
/// server mirror – see src/lib/report-i18n.ts for source
      metricasSetorDesc: "Complements financial multiples with operating metrics relevant to each business, such as value per unit, client, bed, subscriber or square metre. Particularly useful in sectors where these indicators more directly explain the company's economic potential.",
/// server mirror – see src/lib/report-i18n.ts for source
      valorPatrimonialTitulo: "Asset value / liquidation",
/// server mirror – see src/lib/report-i18n.ts for source
      valorPatrimonialDesc: "Values net assets at their market value. Relevant for asset-intensive businesses, acting as a reference floor value.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p6: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Multiple adjustments",
/// server mirror – see src/lib/report-i18n.ts for source
      hTitulo: "Adjustments applied to the sector multiple",
/// server mirror – see src/lib/report-i18n.ts for source
      fator: "Factor",
/// server mirror – see src/lib/report-i18n.ts for source
      leitura: "Assessment",
/// server mirror – see src/lib/report-i18n.ts for source
      efeito: "Effect",
/// server mirror – see src/lib/report-i18n.ts for source
      semAjustes: "No adjustments were applied to the base sector multiple.",
/// server mirror – see src/lib/report-i18n.ts for source
      nota: "The combined adjustments are capped within an overall range of −40% to +35% of the base sector multiple, preventing the combination of factors from producing extreme results. All factors are based on declared information and require documentary validation.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p7: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Scenarios and sensitivity",
/// server mirror – see src/lib/report-i18n.ts for source
      cenariosValorizacao: "Valuation scenarios",
/// server mirror – see src/lib/report-i18n.ts for source
      cenario: "Scenario",
/// server mirror – see src/lib/report-i18n.ts for source
      pressupostos: "Assumptions",
/// server mirror – see src/lib/report-i18n.ts for source
      multiplo: "Multiple",
/// server mirror – see src/lib/report-i18n.ts for source
      enterpriseValue: "Enterprise Value",
/// server mirror – see src/lib/report-i18n.ts for source
      equityValue: "Equity Value",
/// server mirror – see src/lib/report-i18n.ts for source
      semCenarios: "No scenarios available for the data provided.",
/// server mirror – see src/lib/report-i18n.ts for source
      sensibilidadeEv: "Enterprise Value sensitivity",
/// server mirror – see src/lib/report-i18n.ts for source
      variacaoEbitda: "EBITDA variation",
/// server mirror – see src/lib/report-i18n.ts for source
      ebitda: "EBITDA",
/// server mirror – see src/lib/report-i18n.ts for source
      notaSensibilidade: "The table shows how Enterprise Value responds to variations in normalised EBITDA and the multiple applied. Equity Value moves accordingly, adjusted for total debt, cash, deposits and other equivalents, and the property indicated in the equity bridge.",
/// server mirror – see src/lib/report-i18n.ts for source
      semSensibilidade: "No sensitivity analysis available.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p8: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Equity Bridge and transaction context",
/// server mirror – see src/lib/report-i18n.ts for source
      equityBridge: "Equity Bridge",
/// server mirror – see src/lib/report-i18n.ts for source
      componente: "Component",
/// server mirror – see src/lib/report-i18n.ts for source
      valor: "Value",
/// server mirror – see src/lib/report-i18n.ts for source
      contextoEstrutura: "Transaction context and structure",
/// server mirror – see src/lib/report-i18n.ts for source
      parametro: "Parameter",
/// server mirror – see src/lib/report-i18n.ts for source
      detalhe: "Detail",
/// server mirror – see src/lib/report-i18n.ts for source
      motivoTransacao: "Reason for the transaction",
/// server mirror – see src/lib/report-i18n.ts for source
      pctATransacionar: "Percentage of capital to be sold",
/// server mirror – see src/lib/report-i18n.ts for source
      estruturaPretendida: "Intended structure",
/// server mirror – see src/lib/report-i18n.ts for source
      horizonteTemporal: "Time horizon",
/// server mirror – see src/lib/report-i18n.ts for source
      permanenciaAcionista: "Shareholder retention",
/// server mirror – see src/lib/report-i18n.ts for source
      imovel: "Property",
/// server mirror – see src/lib/report-i18n.ts for source
      tipoInvestidor: "Preferred investor type",
/// server mirror – see src/lib/report-i18n.ts for source
      estrutura: "Structure",
/// server mirror – see src/lib/report-i18n.ts for source
      implicacao: "Implication",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p9: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Value Drivers & Risks",
/// server mirror – see src/lib/report-i18n.ts for source
      driversValor: "Value Drivers",
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Driver",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: "Description",
/// server mirror – see src/lib/report-i18n.ts for source
      semDrivers: "No specific value drivers were identified based on the information provided.",
/// server mirror – see src/lib/report-i18n.ts for source
      riscosMitigantes: "Risks and mitigants",
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "Risk",
/// server mirror – see src/lib/report-i18n.ts for source
      evidenciaDisponivel: "Available evidence",
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Impact",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Mitigant",
/// server mirror – see src/lib/report-i18n.ts for source
      semRiscos: "No specific material risks were identified based on the information provided.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p12: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Market preparation",
/// server mirror – see src/lib/report-i18n.ts for source
      planoPreparacao: "Prioritised preparation plan",
/// server mirror – see src/lib/report-i18n.ts for source
      notaSecao: "This section is intended for those considering moving forward with an M&A process. Our team can help you prepare the business to maximise value at sale. Contact us for an initial no-obligation conversation.",
/// server mirror – see src/lib/report-i18n.ts for source
      prioridade: "Priority",
/// server mirror – see src/lib/report-i18n.ts for source
      acao: "Action",
/// server mirror – see src/lib/report-i18n.ts for source
      impactoEsperado: "Expected impact",
/// server mirror – see src/lib/report-i18n.ts for source
      esforco: "Effort",
/// server mirror – see src/lib/report-i18n.ts for source
      recomendacoesImediatas: "Immediate recommendations",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p13: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "M&A process",
/// server mirror – see src/lib/report-i18n.ts for source
      hTitulo: "How an M&A process unfolds",
/// server mirror – see src/lib/report-i18n.ts for source
      notaSecao: "This section is intended for those considering moving forward with an M&A process. Our team can help you prepare the business to maximise value at sale. Contact us for an initial no-obligation conversation.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p14: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Next step and contacts",
/// server mirror – see src/lib/report-i18n.ts for source
      obrigado: "Thank you.",
/// server mirror – see src/lib/report-i18n.ts for source
      lead: "Thank you for your time. This report is a starting point: turning an indicative estimate into a substantiated valuation requires validating the figures, analysing recent comparable transactions and reading current appetite among financial and strategic investors for your sector.",
/// server mirror – see src/lib/report-i18n.ts for source
      proximoPassoTitulo: "Next step · 20-minute meeting",
/// server mirror – see src/lib/report-i18n.ts for source
      proximoPassoDesc: "A joint review of this report's assumptions with the Lealia team and presentation of the full report.",
/// server mirror – see src/lib/report-i18n.ts for source
      agendarReuniao: "Schedule a meeting",
/// server mirror – see src/lib/report-i18n.ts for source
      contactos: "Contacts",
/// server mirror – see src/lib/report-i18n.ts for source
      managingPartner: "Managing Partner",
/// server mirror – see src/lib/report-i18n.ts for source
      notaFinal: (empresa: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `This is an indicative document, prepared exclusively for ${empresa}. It does not constitute financial advice or a contractual proposal.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source
};
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
const es: typeof pt = {
/// server mirror – see src/lib/report-i18n.ts for source
  common: {
/// server mirror – see src/lib/report-i18n.ts for source
    naoIndicado: "No indicado",
/// server mirror – see src/lib/report-i18n.ts for source
    nao: "No",
/// server mirror – see src/lib/report-i18n.ts for source
    neutro: "Neutro",
/// server mirror – see src/lib/report-i18n.ts for source
    positivo: "Positivo",
/// server mirror – see src/lib/report-i18n.ts for source
    negativo: "Negativo",
/// server mirror – see src/lib/report-i18n.ts for source
    naoAplicavel: "n.d.",
/// server mirror – see src/lib/report-i18n.ts for source
    tracoLongo: "—",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  perfil: {
/// server mirror – see src/lib/report-i18n.ts for source
    atividadePrincipal: "Actividad principal",
/// server mirror – see src/lib/report-i18n.ts for source
    setor: "Sector",
/// server mirror – see src/lib/report-i18n.ts for source
    geografia: "Geografía",
/// server mirror – see src/lib/report-i18n.ts for source
    unidadesLocalizacoes: "Unidades / ubicaciones",
/// server mirror – see src/lib/report-i18n.ts for source
    anosAtividade: "Años de actividad",
/// server mirror – see src/lib/report-i18n.ts for source
    anosAtividadeValor: (n: number) => `${n} años`,
/// server mirror – see src/lib/report-i18n.ts for source
    colaboradores: "Empleados",
/// server mirror – see src/lib/report-i18n.ts for source
    anoReferencia: "Año de referencia",
/// server mirror – see src/lib/report-i18n.ts for source
    periodoReferencia: "Periodo de referencia",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  ponte: {
/// server mirror – see src/lib/report-i18n.ts for source
    enterpriseValueBase: "Enterprise Value base",
/// server mirror – see src/lib/report-i18n.ts for source
    maisCaixa: "Más: caja, depósitos y otros equivalentes",
/// server mirror – see src/lib/report-i18n.ts for source
    menosDivida: "Menos: deuda total",
/// server mirror – see src/lib/report-i18n.ts for source
    maisImovel: "Más: inmueble dentro del perímetro",
/// server mirror – see src/lib/report-i18n.ts for source
    equityValueBase: "Equity Value base",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  historico: {
/// server mirror – see src/lib/report-i18n.ts for source
    umAno: "Se facilitó un año de histórico financiero.",
/// server mirror – see src/lib/report-i18n.ts for source
    variosAnos: (n: number) => `Se facilitaron ${n} años de histórico financiero.`,
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  imovel: {
/// server mirror – see src/lib/report-i18n.ts for source
    propriedadeIncluida: "Propiedad de la empresa · incluido en el perímetro",
/// server mirror – see src/lib/report-i18n.ts for source
    propriedadeExcluida: "Propiedad de la empresa · fuera del perímetro",
/// server mirror – see src/lib/report-i18n.ts for source
    arrendadoTerceiros: "Arrendado a terceros",
/// server mirror – see src/lib/report-i18n.ts for source
    incluidoPerimetro: "Incluido en el perímetro",
/// server mirror – see src/lib/report-i18n.ts for source
    excluidoPerimetro: "Excluido del perímetro",
/// server mirror – see src/lib/report-i18n.ts for source
    arrendado: "Arrendado",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  drivers: {
/// server mirror – see src/lib/report-i18n.ts for source
    crescimentoSustentado: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Crecimiento sostenido",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao:
/// server mirror – see src/lib/report-i18n.ts for source
        "La facturación evolucionó positivamente en el periodo analizado. Las trayectorias de crecimiento demostradas respaldan la parte alta del rango de múltiplos y reducen el peso relativo del riesgo de ejecución en la negociación.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    dimensaoRelevante: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Dimensión relevante",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: (fat1: string, ebitda: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `Con una facturación de ${fat1} y un EBITDA normalizado de ${ebitda}, la empresa se sitúa por encima del umbral de tamaño a partir del cual inversores institucionales y compradores estratégicos internacionales compiten activamente, ampliando el universo de contrapartes.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    rendibilidadeAcimaMedia: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Rentabilidad superior a la media",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: (margem: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `El margen EBITDA normalizado del ${margem} evidencia poder de fijación de precios y disciplina de costes, atributos que los compradores retribuyen con múltiplos superiores a la referencia sectorial.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    conversaoCaixa: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Fuerte conversión de EBITDA en caja",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: (capexRacio: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `El capex recurrente representa solo el ${capexRacio} del EBITDA normalizado. Un modelo poco intensivo en inversión libera caja para el servicio de la deuda de adquisición, un factor determinante para los compradores financieros.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    gestaoAutonoma: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Gestión autónoma del accionista",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao:
/// server mirror – see src/lib/report-i18n.ts for source
        "La operación funciona con baja dependencia del accionista en la gestión diaria. La existencia de una segunda línea capaz de garantizar la continuidad reduce el riesgo de transición y acorta los periodos de permanencia exigidos por el comprador.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    relacoesTransferiveis: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Relaciones comerciales transferibles",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao:
/// server mirror – see src/lib/report-i18n.ts for source
        "La facturación no depende de forma material de la relación personal del accionista con los clientes, lo que reduce la probabilidad de erosión de ingresos tras el cierre y limita la necesidad de earn-outs o garantías adicionales.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    carteiraDiversificada: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Cartera de clientes diversificada",
/// server mirror – see src/lib/report-i18n.ts for source
      descricaoTop5: (top5: number) => `Los cinco mayores clientes representan el ${top5}% de la facturación`,
/// server mirror – see src/lib/report-i18n.ts for source
      descricaoTop1: (top1: number) => `El mayor cliente representa el ${top1}% de la facturación`,
/// server mirror – see src/lib/report-i18n.ts for source
      descricaoFim:
/// server mirror – see src/lib/report-i18n.ts for source
        ", un nivel de concentración cómodo que reduce el riesgo comercial percibido y disminuye la presión sobre el paquete de garantías.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    visibilidadeReceita: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Visibilidad de ingresos contratados",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: (backlog: string, racio: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `El backlog contratado de ${backlog} equivale al ${racio} de la facturación anual, aportando previsibilidad al plan de negocio presentado al comprador.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    modeloReplicavel: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Modelo replicable en varias unidades",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: (unidades: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `La operación en ${unidades} demuestra que el modelo de negocio es replicable y no depende de un único activo o equipo, lo que respalda tesis de consolidación y de expansión tras la adquisición.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    exposicaoInternacional: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Exposición internacional",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: (geografia: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `La distribución de clientes (${geografia}) reduce la dependencia de un único mercado y hace a la empresa relevante para compradores extranjeros que buscan presencia en la región.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    posicaoLiquida: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Posición de caja neta",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: (valor: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `La empresa presenta una posición de caja neta positiva de ${valor}, lo que se suma directamente al Equity Value y refuerza la capacidad negociadora del accionista respecto al mecanismo de precio.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    trackRecord: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Trayectoria consolidada",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: (anos: number) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `${anos} años de actividad respaldan la lectura de resiliencia del modelo de negocio a lo largo de distintos ciclos y reducen el riesgo operativo percibido por el comprador.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    imovelValorizado: {
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Activo inmobiliario valorado externamente",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: (metodo: string, valor: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `El inmueble propio incluido en el perímetro está respaldado por ${metodo} (${valor}), lo que se suma al Equity Value con un valor defendible en la due diligence.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  recomendacoes: {
/// server mirror – see src/lib/report-i18n.ts for source
    reforcarGestao:
/// server mirror – see src/lib/report-i18n.ts for source
      "Reforzar el equipo directivo y documentar los procesos y las relaciones comerciales, reduciendo la dependencia del accionista.",
/// server mirror – see src/lib/report-i18n.ts for source
    diversificarClientes: "Diversificar la base de clientes y formalizar contratos plurianuales con los principales clientes.",
/// server mirror – see src/lib/report-i18n.ts for source
    avaliarReplicabilidade: "Evaluar la replicabilidad del modelo en otras ubicaciones, demostrando el potencial de escala al inversor.",
/// server mirror – see src/lib/report-i18n.ts for source
    documentarCapex: "Documentar las necesidades de inversión, distinguiendo el capex de mantenimiento del capex de expansión.",
/// server mirror – see src/lib/report-i18n.ts for source
    prepararHistorico: "Preparar el histórico financiero de los últimos tres ejercicios y la documentación de soporte correspondiente.",
/// server mirror – see src/lib/report-i18n.ts for source
    definirImovel: "Definir con antelación si el inmueble debe integrar el perímetro de la transacción y obtener una valoración independiente.",
/// server mirror – see src/lib/report-i18n.ts for source
    validarMargem: "Validar el margen EBITDA y la clasificación de las partidas consideradas extraordinarias.",
/// server mirror – see src/lib/report-i18n.ts for source
    explicarContracao: "Preparar una explicación fundamentada de la contracción de la facturación y del plan de recuperación.",
/// server mirror – see src/lib/report-i18n.ts for source
    validarComLealia: "Validar esta valoración indicativa con el equipo de Lealia Advisory Partners antes de tomar cualquier decisión de mercado.",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  resumo: {
/// server mirror – see src/lib/report-i18n.ts for source
    comResultado: (params: {
/// server mirror – see src/lib/report-i18n.ts for source
      equityMin: string;
/// server mirror – see src/lib/report-i18n.ts for source
      equityMax: string;
/// server mirror – see src/lib/report-i18n.ts for source
      evMin: string;
/// server mirror – see src/lib/report-i18n.ts for source
      evMax: string;
/// server mirror – see src/lib/report-i18n.ts for source
      ebitdaBase: string;
/// server mirror – see src/lib/report-i18n.ts for source
      multMin: string;
/// server mirror – see src/lib/report-i18n.ts for source
      multMax: string;
/// server mirror – see src/lib/report-i18n.ts for source
      ano: number;
/// server mirror – see src/lib/report-i18n.ts for source
      tipoPeriodo: string;
/// server mirror – see src/lib/report-i18n.ts for source
      fat1: string;
/// server mirror – see src/lib/report-i18n.ts for source
      margem: string | null;
/// server mirror – see src/lib/report-i18n.ts for source
    }) =>
/// server mirror – see src/lib/report-i18n.ts for source
      `Con base en los datos facilitados, se estima un <strong>valor indicativo para los accionistas de entre ${params.equityMin} y ${params.equityMax}</strong>. ` +
/// server mirror – see src/lib/report-i18n.ts for source
      `El rango resulta de un Enterprise Value de entre ${params.evMin} y ${params.evMax}, ` +
/// server mirror – see src/lib/report-i18n.ts for source
      `calculado sobre un EBITDA normalizado de ${params.ebitdaBase} ` +
/// server mirror – see src/lib/report-i18n.ts for source
      `y un múltiplo EV/EBITDA implícito ajustado de ${params.multMin}–${params.multMax}. ` +
/// server mirror – see src/lib/report-i18n.ts for source
      `En ${params.ano} (${params.tipoPeriodo}), la empresa presentó una facturación de ${params.fat1}` +
/// server mirror – see src/lib/report-i18n.ts for source
      `${params.margem !== null ? ` y un margen EBITDA del ${params.margem}` : ""}.`,
/// server mirror – see src/lib/report-i18n.ts for source
    semResultado:
/// server mirror – see src/lib/report-i18n.ts for source
      "Con los datos indicados no es posible presentar un valor indicativo mediante múltiplo de EBITDA. Este informe presenta, no obstante, el perfil operativo de la empresa y las principales recomendaciones aplicables.",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  mensagemAcionista: {
/// server mirror – see src/lib/report-i18n.ts for source
    historicoLimitado:
/// server mirror – see src/lib/report-i18n.ts for source
      "La principal oportunidad de preservación de valor antes de una transacción reside en consolidar tres ejercicios financieros conciliados y documentar los ajustes al EBITDA, reduciendo las lagunas de información que habitualmente generan descuentos en la due diligence.",
/// server mirror – see src/lib/report-i18n.ts for source
    dependenciaAlta:
/// server mirror – see src/lib/report-i18n.ts for source
      "La principal oportunidad de creación de valor reside en reducir la dependencia del accionista, mediante el refuerzo del equipo directivo y la formalización de las relaciones comerciales a nombre de la empresa, aumentando la transferibilidad del negocio.",
/// server mirror – see src/lib/report-i18n.ts for source
    concentracaoAlta:
/// server mirror – see src/lib/report-i18n.ts for source
      "La principal oportunidad de creación de valor reside en diversificar la cartera de clientes y formalizar contractualmente las cuentas más relevantes, reduciendo el riesgo comercial percibido por el comprador.",
/// server mirror – see src/lib/report-i18n.ts for source
    padrao:
/// server mirror – see src/lib/report-i18n.ts for source
      "La principal oportunidad de creación de valor reside en validar la calidad de los resultados, documentar los ajustes al EBITDA y reducir las lagunas de información que podrían generar descuentos en la due diligence.",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  riscos: {
/// server mirror – see src/lib/report-i18n.ts for source
    historicoLimitado: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "Histórico financiero limitado",
/// server mirror – see src/lib/report-i18n.ts for source
      evidenciaUm: "1 ejercicio facilitado",
/// server mirror – see src/lib/report-i18n.ts for source
      evidenciaVarios: (n: number) => `${n} ejercicios facilitados`,
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Reduce la confianza en la sostenibilidad de los resultados y puede condicionar el múltiplo",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Preparar y conciliar la información financiera de los últimos tres ejercicios",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    dependenciaGestao: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "Dependencia de la gestión del accionista",
/// server mirror – see src/lib/report-i18n.ts for source
      evidencia: (dep: string) => `Dependencia del accionista en la gestión: ${dep}`,
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Aumenta el riesgo de transición y de continuidad operativa tras la transacción",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Reforzar el equipo directivo y documentar los procesos clave",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    concentracaoClientes: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "Concentración de clientes",
/// server mirror – see src/lib/report-i18n.ts for source
      evidencia: (top5: number) => `Cinco mayores clientes: ${top5}% de la facturación`,
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Aumenta la exposición a la pérdida de clientes relevantes",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Diversificar la cartera comercial y formalizar contratos plurianuales",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    dependenciaComercial: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "Dependencia comercial del accionista",
/// server mirror – see src/lib/report-i18n.ts for source
      evidencia: (dep: string) => `Dependencia del accionista en la facturación: ${dep}`,
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Reduce la transferibilidad de las relaciones comerciales tras la transacción",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Transferir las cuentas clave a gestores de cuenta y contratar a nombre de la empresa",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    localizacaoUnica: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "Operación en una única ubicación",
/// server mirror – see src/lib/report-i18n.ts for source
      evidencia: "Actividad concentrada en una única sede",
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Limita la escalabilidad y concentra el riesgo operativo y geográfico",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Evaluar la replicabilidad del modelo y los planes de expansión a nuevas ubicaciones",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    posicaoLiquidaElevada: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "Posición neta elevada",
/// server mirror – see src/lib/report-i18n.ts for source
      evidencia: (racio: string) => `Posición neta equivalente a ${racio} el EBITDA normalizado`,
/// server mirror – see src/lib/report-i18n.ts for source
      evidenciaSemDados: "Posición neta equivalente a — el EBITDA normalizado",
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Reduce el Equity Value y puede limitar la financiación de la adquisición",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Reducir la deuda, optimizar la caja y preparar un estado financiero actualizado",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    capexElevado: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "Capex elevado",
/// server mirror – see src/lib/report-i18n.ts for source
      evidencia: (capex: string) => `Capex recurrente de ${capex} frente al EBITDA normalizado`,
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Limita la conversión de EBITDA en generación de caja",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Separar el capex de mantenimiento del de crecimiento y validar las necesidades futuras",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    imovelSemAvaliacao: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "Inmueble propio sin valoración independiente",
/// server mirror – see src/lib/report-i18n.ts for source
      evidencia: (metodo: string) => `Método de valoración indicado: ${metodo}`,
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Introduce incertidumbre en el Equity Value cuando el inmueble integra el perímetro",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Obtener una valoración independiente y definir el perímetro de la transacción",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    ajustamentosPorValidar: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "Ajustes al EBITDA pendientes de validar",
/// server mirror – see src/lib/report-i18n.ts for source
      evidencia: (valor: string) => `Ajustes de ${valor} declarados sin soporte documental`,
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Puede generar descuentos o ajustes durante la due diligence",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Preparar la conciliación contable y la documentación de soporte",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    contracaoFaturacao: {
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "Contracción de la facturación",
/// server mirror – see src/lib/report-i18n.ts for source
      evidencia: "Evolución negativa de la facturación en el periodo indicado",
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Puede condicionar el múltiplo aplicable y la lectura de sostenibilidad",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Documentar las causas y evidenciar la inflexión mediante indicadores recientes",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    niveis: { alto: "Alto", medio: "Medio", baixo: "Bajo" },
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  plano: {
/// server mirror – see src/lib/report-i18n.ts for source
    consolidarHistorico: "Consolidar tres ejercicios de información financiera conciliada",
/// server mirror – see src/lib/report-i18n.ts for source
    reconciliarEbitda: "Conciliar el EBITDA reportado y normalizado y documentar los ajustes",
/// server mirror – see src/lib/report-i18n.ts for source
    confirmarDivida: "Confirmar la deuda total y la caja, depósitos y otros equivalentes disponibles en la fecha de referencia",
/// server mirror – see src/lib/report-i18n.ts for source
    analisarFundoManeio: "Analizar el fondo de maniobra normativo y la estacionalidad del negocio",
/// server mirror – see src/lib/report-i18n.ts for source
    reduzirDependencia: "Reducir la dependencia del accionista y crear un plan de sucesión",
/// server mirror – see src/lib/report-i18n.ts for source
    mapearConcentracao: "Mapear la concentración de clientes y formalizar los contratos relevantes",
/// server mirror – see src/lib/report-i18n.ts for source
    separarCapex: "Separar el capex de mantenimiento del de crecimiento",
/// server mirror – see src/lib/report-i18n.ts for source
    definirImovel: "Definir el tratamiento del inmueble y obtener una valoración independiente",
/// server mirror – see src/lib/report-i18n.ts for source
    demonstrarReplicabilidade: "Demostrar la replicabilidad del modelo en otras ubicaciones",
/// server mirror – see src/lib/report-i18n.ts for source
    definirEstrutura: "Definir la estructura de la transacción y el perímetro pretendido",
/// server mirror – see src/lib/report-i18n.ts for source
    prioridade: { alta: "Alta", media: "Media" },
/// server mirror – see src/lib/report-i18n.ts for source
    impacto: { alto: "Alto", muitoAlto: "Muy alto", medioAlto: "Medio/alto", medio: "Medio" },
/// server mirror – see src/lib/report-i18n.ts for source
    esforco: { alto: "Alto", medio: "Medio", baixo: "Bajo" },
/// server mirror – see src/lib/report-i18n.ts for source
    prazo: {
/// server mirror – see src/lib/report-i18n.ts for source
      semanas2a6: "2-6 semanas",
/// server mirror – see src/lib/report-i18n.ts for source
      semanas1a3: "1-3 semanas",
/// server mirror – see src/lib/report-i18n.ts for source
      semanas1a2: "1-2 semanas",
/// server mirror – see src/lib/report-i18n.ts for source
      semanas2a4: "2-4 semanas",
/// server mirror – see src/lib/report-i18n.ts for source
      meses3a12: "3-12 meses",
/// server mirror – see src/lib/report-i18n.ts for source
      semanas4a8: "4-8 semanas",
/// server mirror – see src/lib/report-i18n.ts for source
      meses6a12: "6-12 meses",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  implicacoesParticipacao: {
/// server mirror – see src/lib/report-i18n.ts for source
    minoritaria:
/// server mirror – see src/lib/report-i18n.ts for source
      "En una participación minoritaria no existe prima de control y el inversor valora sobre todo la gobernanza, los derechos de salida y el plan de crecimiento. Es frecuente que el valor por acción refleje un descuento de minoría.",
/// server mirror – see src/lib/report-i18n.ts for source
    maioritaria:
/// server mirror – see src/lib/report-i18n.ts for source
      "En una venta mayoritaria el comprador asume el control y tiende a incorporar una prima de control, exigiendo a cambio continuidad de la gestión y mecanismos de alineación como un earn-out o un rollover de parte del capital.",
/// server mirror – see src/lib/report-i18n.ts for source
    totalidade:
/// server mirror – see src/lib/report-i18n.ts for source
      "En la venta de la totalidad el comprador suele pagar una prima de control, pero exige un periodo de transición, garantías de continuidad de los clientes y un paquete más amplio de manifestaciones y garantías.",
/// server mirror – see src/lib/report-i18n.ts for source
    indefinida:
/// server mirror – see src/lib/report-i18n.ts for source
      "El porcentaje a transmitir aún no está definido. Esta decisión condiciona el universo de inversores, la existencia de una prima de control y la estructura de pago.",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  limitacoes: {
/// server mirror – see src/lib/report-i18n.ts for source
    infoDeclarada: "La estimación se basa exclusivamente en la información declarada, sin verificación documental ni auditoría.",
/// server mirror – see src/lib/report-i18n.ts for source
    fundoManeio: "No se realizó un análisis del fondo de maniobra normativo ni de la estacionalidad del negocio.",
/// server mirror – see src/lib/report-i18n.ts for source
    transacoesComparaveis: "No se analizaron transacciones comparables específicas ni el apetito actual de los inversores por el activo.",
/// server mirror – see src/lib/report-i18n.ts for source
    historicoInferior: "El histórico financiero disponible es inferior a tres ejercicios.",
/// server mirror – see src/lib/report-i18n.ts for source
    setorGenerico: "El sector indicado no dispone de múltiplos específicos; se utilizó una referencia de mercado genérica.",
/// server mirror – see src/lib/report-i18n.ts for source
    periodoNaoEncerrado: "El periodo de referencia no corresponde a cuentas cerradas, lo que aumenta la incertidumbre de la estimación.",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  qualidade: {
/// server mirror – see src/lib/report-i18n.ts for source
    notaUmAno:
/// server mirror – see src/lib/report-i18n.ts for source
      "Con un único periodo financiero no es posible evaluar con solidez el crecimiento, la estabilidad de los márgenes, la conversión de resultados en caja ni la sostenibilidad del EBITDA. Esta limitación reduce la confianza de la valoración y puede condicionar el múltiplo aplicable.",
/// server mirror – see src/lib/report-i18n.ts for source
    margensEstaveis: "Los márgenes EBITDA se mantuvieron estables en el periodo analizado, lo que respalda la lectura de recurrencia de los resultados.",
/// server mirror – see src/lib/report-i18n.ts for source
    margensModeradas: "Los márgenes EBITDA presentan una variación moderada en el periodo analizado, lo que justifica validar los factores que explican la oscilación.",
/// server mirror – see src/lib/report-i18n.ts for source
    margensRelevantes: "Los márgenes EBITDA presentan una variación relevante en el periodo analizado, lo que exige una explicación documentada en la due diligence.",
/// server mirror – see src/lib/report-i18n.ts for source
    conversaoCaixaComCapex: (capex: string, pct: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
      `Tras un capex recurrente de ${capex}, la conversión indicativa de EBITDA en caja operativa es del ${pct}, antes de fondo de maniobra, intereses e impuestos. Limitación: sin la desagregación entre capex de mantenimiento y de crecimiento, el flujo de caja libre subyacente a la valoración queda sujeto a corrección en la due diligence.`,
/// server mirror – see src/lib/report-i18n.ts for source
    conversaoCaixaSemCapex:
/// server mirror – see src/lib/report-i18n.ts for source
      "No se indicó capex recurrente. Limitación: sin este dato no es posible estimar la conversión de EBITDA en caja, lo que reduce la fiabilidad del valor calculado y suele traducirse en un descuento por parte del comprador.",
/// server mirror – see src/lib/report-i18n.ts for source
    fundoManeio:
/// server mirror – see src/lib/report-i18n.ts for source
      "El fondo de maniobra no ha sido analizado en esta fase. Limitación: sin la normalización del fondo de maniobra no es posible fijar con precisión el puente entre el Enterprise Value y el Equity Value, lo que puede originar ajustes de cierre euro a euro en el precio final.",
/// server mirror – see src/lib/report-i18n.ts for source
    backlog: (valor: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
      `Se indicó un backlog contratado de ${valor}. Limitación: sin el detalle de los márgenes, los plazos de ejecución y las condiciones de cancelación, la visibilidad de ingresos no se incorporó cuantitativamente a la valoración, solo se consideró de forma cualitativa.`,
/// server mirror – see src/lib/report-i18n.ts for source
    concentracaoTop5: (top5: number) => `Concentración comercial: los cinco mayores clientes representan el ${top5}% de la facturación`,
/// server mirror – see src/lib/report-i18n.ts for source
    concentracaoTop1: (top1: number) => ` y el mayor cliente el ${top1}%`,
/// server mirror – see src/lib/report-i18n.ts for source
    concentracaoFim: ". Limitación: la dependencia de pocos clientes aumenta el riesgo percibido de los ingresos y condiciona directamente el múltiplo aplicable en la valoración.",
/// server mirror – see src/lib/report-i18n.ts for source
    ajustamentosDeclarados: (valor: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
      `Se declararon ajustes no recurrentes de ${valor}. Limitación: hasta que se validen documentalmente, el EBITDA ajustado —y, en consecuencia, el rango de valoración presentado— queda sujeto a revisión.`,
/// server mirror – see src/lib/report-i18n.ts for source
    ajustamentosNaoDeclarados:
/// server mirror – see src/lib/report-i18n.ts for source
      "No se declararon ajustes no recurrentes al EBITDA. Limitación: cualquier normalización identificada en la due diligence (remuneraciones de socios, rentas fuera de mercado, ingresos no recurrentes) podría modificar el EBITDA base y el valor calculado.",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  alertas: {
/// server mirror – see src/lib/report-i18n.ts for source
    umPeriodo: "Solo se facilitó un periodo financiero. El análisis de crecimiento y de estabilidad de los márgenes no es concluyente.",
/// server mirror – see src/lib/report-i18n.ts for source
    ajustamentosSemSuporte: 'Existen ajustes al EBITDA sin soporte documental. Deben clasificarse como "a validar en due diligence".',
/// server mirror – see src/lib/report-i18n.ts for source
    fundoManeioNaoAnalisado: "No se ha analizado el fondo de maniobra. El Equity Value podría verse afectado por ajustes de cierre.",
/// server mirror – see src/lib/report-i18n.ts for source
    imovelSemAvaliacao: "El valor del inmueble se introdujo sin valoración independiente. El Equity Value podría sufrir una alteración material.",
/// server mirror – see src/lib/report-i18n.ts for source
    imovelSemValor: "El inmueble se incluyó en el perímetro sin valor indicado, por lo que no se sumó al Equity Value.",
/// server mirror – see src/lib/report-i18n.ts for source
    periodoNaoClassificado: "El periodo financiero de referencia no ha sido clasificado (cuentas cerradas, estimación o presupuesto).",
/// server mirror – see src/lib/report-i18n.ts for source
    concentracaoInconsistente: "El peso de los cinco mayores clientes es inferior al del mayor cliente. Los datos deben revisarse.",
/// server mirror – see src/lib/report-i18n.ts for source
    minoritariaAtencao: "El valor de una participación minoritaria no corresponde a una proporción simple del Equity Value al 100%.",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  implicacoesEstrutura: {
/// server mirror – see src/lib/report-i18n.ts for source
    venda50: { estrutura: "Venta del 50%–51%", implicacao: "Exige reglas claras de gobernanza y un pacto de socios" },
/// server mirror – see src/lib/report-i18n.ts for source
    venda60: { estrutura: "Venta del 60%–80%", implicacao: "El comprador obtiene el control; puede existir un rollover relevante" },
/// server mirror – see src/lib/report-i18n.ts for source
    venda90: { estrutura: "Venta del 90%", implicacao: "La participación residual exige protección y reglas de salida" },
/// server mirror – see src/lib/report-i18n.ts for source
    venda100: { estrutura: "Venta del 100%", implicacao: "Estructura más sencilla; la continuidad de la gestión se vuelve crítica" },
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  notas: {
/// server mirror – see src/lib/report-i18n.ts for source
    equity: "El Equity Value presentado es indicativo y se calcula antes de los ajustes de cierre, la normalización del fondo de maniobra, las contingencias, los impuestos aplicables y la validación en la due diligence.",
/// server mirror – see src/lib/report-i18n.ts for source
    minoria: "El valor de una participación minoritaria no debe asumirse como una simple proporción del Equity Value al 100%. El valor puede variar en función del control, los derechos de gobernanza, la liquidez y la estructura de la transacción.",
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
  doc: {
/// server mirror – see src/lib/report-i18n.ts for source
    disclaimer:
/// server mirror – see src/lib/report-i18n.ts for source
      "El presente informe constituye una estimación indicativa de la valoración de la empresa, generada a partir de la información facilitada por el usuario, y no constituye asesoramiento financiero, propuesta contractual, recomendación de inversión ni valoración formal a efectos legales, fiscales o contables; los valores presentados dependen de la calidad y exactitud de los datos introducidos y de las condiciones de mercado vigentes en la fecha de elaboración de este documento.",
/// server mirror – see src/lib/report-i18n.ts for source
    footer: (empresa: string) => `Lealia Advisory Partners · Informe de valoración indicativa${empresa ? ` para ${empresa}` : ""}`,
/// server mirror – see src/lib/report-i18n.ts for source
    efeito: { neutro: "Neutro", positivo: "Positivo", negativo: "Negativo" },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    waterfall: {
/// server mirror – see src/lib/report-i18n.ts for source
      caption: "Equity Bridge · miles de €",
/// server mirror – see src/lib/report-i18n.ts for source
      ariaLabel: "Gráfico waterfall del Equity Bridge",
/// server mirror – see src/lib/report-i18n.ts for source
      enterpriseValue: "Enterprise Value",
/// server mirror – see src/lib/report-i18n.ts for source
      equityValue: "Equity Value",
/// server mirror – see src/lib/report-i18n.ts for source
      divida: "Deuda",
/// server mirror – see src/lib/report-i18n.ts for source
      caixa: "Caja",
/// server mirror – see src/lib/report-i18n.ts for source
      imovel: "Inmueble",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    dcf: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "DCF Valuation",
/// server mirror – see src/lib/report-i18n.ts for source
      hTitulo: "Valoración por flujos de caja descontados",
/// server mirror – see src/lib/report-i18n.ts for source
      semDados: "No es posible presentar un análisis DCF con la información facilitada. En particular, el coste de capital estimado debe ser superior a la tasa de crecimiento a perpetuidad.",
/// server mirror – see src/lib/report-i18n.ts for source
      mapaFluxos: "Mapa de flujos de caja",
/// server mirror – see src/lib/report-i18n.ts for source
      unidadeMilhares: "miles de €",
/// server mirror – see src/lib/report-i18n.ts for source
      linha: "Línea",
/// server mirror – see src/lib/report-i18n.ts for source
      tv: "TV",
/// server mirror – see src/lib/report-i18n.ts for source
      receita: "Ingresos",
/// server mirror – see src/lib/report-i18n.ts for source
      ebitda: "EBITDA",
/// server mirror – see src/lib/report-i18n.ts for source
      margemEbitda: "Margen EBITDA",
/// server mirror – see src/lib/report-i18n.ts for source
      da: "(−) D&A",
/// server mirror – see src/lib/report-i18n.ts for source
      ebit: "= EBIT",
/// server mirror – see src/lib/report-i18n.ts for source
      impostoEbit: "(−) Impuesto s/ EBIT",
/// server mirror – see src/lib/report-i18n.ts for source
      nopat: "= NOPAT",
/// server mirror – see src/lib/report-i18n.ts for source
      maisDa: "(+) D&A",
/// server mirror – see src/lib/report-i18n.ts for source
      menosCapex: "(−) Capex",
/// server mirror – see src/lib/report-i18n.ts for source
      fcff: "= FCFF unlevered",
/// server mirror – see src/lib/report-i18n.ts for source
      fatorDesconto: "Factor de descuento",
/// server mirror – see src/lib/report-i18n.ts for source
      pvFcff: "= VP del FCFF",
/// server mirror – see src/lib/report-i18n.ts for source
      legenda: "A = ejercicio histórico · F = año proyectado · TV = valor terminal. Flujo unlevered: la financiación se refleja en el coste de capital y en la deuda neta. TV por perpetuidad sobre el FCFF del año 8.",
/// server mirror – see src/lib/report-i18n.ts for source
      pressupostosForecast: "Hipótesis del forecast",
/// server mirror – see src/lib/report-i18n.ts for source
      crescimentoInicial: "Crecimiento inicial",
/// server mirror – see src/lib/report-i18n.ts for source
      anoEstabilizacao: "Año de estabilización",
/// server mirror – see src/lib/report-i18n.ts for source
      anoN: (n: number) => `Año ${n}`,
/// server mirror – see src/lib/report-i18n.ts for source
      crescimentoEstabilizado: "Crecimiento estabilizado",
/// server mirror – see src/lib/report-i18n.ts for source
      crescimentoPerpetuidade: "Crecimiento a perpetuidad",
/// server mirror – see src/lib/report-i18n.ts for source
      margemEbitdaProjetada: "Margen EBITDA proyectado",
/// server mirror – see src/lib/report-i18n.ts for source
      capexPctReceita: "Capex (% de ingresos)",
/// server mirror – see src/lib/report-i18n.ts for source
      daPctReceita: "D&A (% de ingresos)",
/// server mirror – see src/lib/report-i18n.ts for source
      fundoManeio: "Fondo de maniobra",
/// server mirror – see src/lib/report-i18n.ts for source
      naoProjetado: "No proyectado",
/// server mirror – see src/lib/report-i18n.ts for source
      taxaImposto: "Tipo impositivo (CIT)",
/// server mirror – see src/lib/report-i18n.ts for source
      indicadoresAvaliacao: "Indicadores de valoración",
/// server mirror – see src/lib/report-i18n.ts for source
      enterpriseValue: "Enterprise Value",
/// server mirror – see src/lib/report-i18n.ts for source
      equityValue: "Equity Value",
/// server mirror – see src/lib/report-i18n.ts for source
      evEbitdaImplicito: "EV / EBITDA implícito",
/// server mirror – see src/lib/report-i18n.ts for source
      evReceitaImplicito: "EV / Ingresos implícito",
/// server mirror – see src/lib/report-i18n.ts for source
      wacc: "Coste medio ponderado de capital",
/// server mirror – see src/lib/report-i18n.ts for source
      riskFree: "Tipo libre de riesgo (Rf)",
/// server mirror – see src/lib/report-i18n.ts for source
      beta: "Beta unlevered / levered (β)",
/// server mirror – see src/lib/report-i18n.ts for source
      erp: "Equity Risk Premium (ERP)",
/// server mirror – see src/lib/report-i18n.ts for source
      crp: "Country Risk Premium (CRP)",
/// server mirror – see src/lib/report-i18n.ts for source
      premioDimensao: "Prima de tamaño (pyme)",
/// server mirror – see src/lib/report-i18n.ts for source
      premioEspecifico: "Prima específica (iliquidez)",
/// server mirror – see src/lib/report-i18n.ts for source
      premioAtivoEspecifico: "Prima específica del activo",
/// server mirror – see src/lib/report-i18n.ts for source
      costOfEquity: "Cost of Equity (Ke)",
/// server mirror – see src/lib/report-i18n.ts for source
      costOfDebt: "Cost of Debt antes / después de impuestos (Kd)",
/// server mirror – see src/lib/report-i18n.ts for source
      pesoEquityDivida: "Peso de equity / deuda (E / D)",
/// server mirror – see src/lib/report-i18n.ts for source
      waccLabel: "WACC",
/// server mirror – see src/lib/report-i18n.ts for source
      resultados: "Resultados",
/// server mirror – see src/lib/report-i18n.ts for source
      pvExplicito: "VP del forecast explícito (8 años)",
/// server mirror – see src/lib/report-i18n.ts for source
      pvTerminal: "VP del valor terminal",
/// server mirror – see src/lib/report-i18n.ts for source
      pesoTerminal: "Peso del valor terminal en el EV",
/// server mirror – see src/lib/report-i18n.ts for source
      ajusteDividaLiquida: "Ajuste de deuda neta",
/// server mirror – see src/lib/report-i18n.ts for source
      imovel: "Inmueble",
/// server mirror – see src/lib/report-i18n.ts for source
      notaCustoCapital: (pais: string, citNota: string, extra: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `Coste de capital estimado con un criterio prudente: a las referencias sectoriales se añaden primas de tamaño e iliquidez, ya que una pyme no cotizada tiene un riesgo superior al de las cotizadas del sector. Beta, ERP, CRP, estructura de capital y spread son proxies sectoriales; CIT de ${pais} (${citNota})${extra ? ` ${extra}` : ""}`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    sensitivity: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Sensitivity Analysis",
/// server mirror – see src/lib/report-i18n.ts for source
      hTitulo: "Análisis de sensibilidad",
/// server mirror – see src/lib/report-i18n.ts for source
      semDados: "No hay un análisis DCF disponible, por lo que no es posible presentar las matrices de sensibilidad.",
/// server mirror – see src/lib/report-i18n.ts for source
      sensibilidadeEv: "Sensibilidad del Enterprise Value",
/// server mirror – see src/lib/report-i18n.ts for source
      notaMatriz: "La celda destacada corresponde al escenario base presentado en la diapositiva anterior. Las matrices aíslan el efecto de cada variable, manteniendo constantes las demás hipótesis.",
/// server mirror – see src/lib/report-i18n.ts for source
      transparenciaPressupostos: "Transparencia de hipótesis",
/// server mirror – see src/lib/report-i18n.ts for source
      introTransparencia: "Las hipótesis del modelo combinan la información introducida en el formulario con referencias sectoriales de mercado, siguiendo un criterio conservador: en caso de duda, se adopta el valor que resulta en una valoración más prudente. La siguiente tabla recoge las hipótesis estructurales de la valoración y su fuente o método de obtención.",
/// server mirror – see src/lib/report-i18n.ts for source
      parametro: "Parámetro",
/// server mirror – see src/lib/report-i18n.ts for source
      valor: "Valor",
/// server mirror – see src/lib/report-i18n.ts for source
      metodoFonte: "Método / fuente",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    lockedPages: {
/// server mirror – see src/lib/report-i18n.ts for source
      p4: "Alcance y limitaciones",
/// server mirror – see src/lib/report-i18n.ts for source
      p5: "Método y alternativas",
/// server mirror – see src/lib/report-i18n.ts for source
      p6: "Ajustes al múltiplo",
/// server mirror – see src/lib/report-i18n.ts for source
      p7: "Escenarios y sensibilidad",
/// server mirror – see src/lib/report-i18n.ts for source
      p8: "Equity Bridge y contexto de la transacción",
/// server mirror – see src/lib/report-i18n.ts for source
      p9: "Drivers de valor y riesgos",
/// server mirror – see src/lib/report-i18n.ts for source
      p10: "DCF Valuation",
/// server mirror – see src/lib/report-i18n.ts for source
      p11: "Sensitivity Analysis",
/// server mirror – see src/lib/report-i18n.ts for source
      p12: "Preparación para el mercado",
/// server mirror – see src/lib/report-i18n.ts for source
      p13: "Proceso de M&A",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
    conteudoReservado: "Contenido reservado",
/// server mirror – see src/lib/report-i18n.ts for source
    lockedTexto: "Esta sección forma parte del informe completo. Agende una reunión de 20 minutos con el equipo de Lealia para ver el análisis íntegro y comentar los resultados.",
/// server mirror – see src/lib/report-i18n.ts for source
    lockedCta: "Agendar una reunión para ver el informe completo",
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    cover: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Preliminary Valuation",
/// server mirror – see src/lib/report-i18n.ts for source
      preparadoPara: "Preparado para",
/// server mirror – see src/lib/report-i18n.ts for source
      data: "Fecha",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p2: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Resumen ejecutivo",
/// server mirror – see src/lib/report-i18n.ts for source
      evIndicativo: "Enterprise Value indicativo",
/// server mirror – see src/lib/report-i18n.ts for source
      equityIndicativo: "Equity Value indicativo",
/// server mirror – see src/lib/report-i18n.ts for source
      faturacaoAno: "Facturación del año de referencia",
/// server mirror – see src/lib/report-i18n.ts for source
      ebitdaNormalizado: "EBITDA normalizado",
/// server mirror – see src/lib/report-i18n.ts for source
      margemNormalizada: "Margen EBITDA normalizado",
/// server mirror – see src/lib/report-i18n.ts for source
      multiploImplicito: "Múltiplo implícito",
/// server mirror – see src/lib/report-i18n.ts for source
      posicaoLiquida: "Posición neta",
/// server mirror – see src/lib/report-i18n.ts for source
      posicaoLiquidaHint: "caja / (deuda)",
/// server mirror – see src/lib/report-i18n.ts for source
      completudeInformacao: "Completitud de la información",
/// server mirror – see src/lib/report-i18n.ts for source
      metodologia: "Metodología de valoración",
/// server mirror – see src/lib/report-i18n.ts for source
      metodo1Titulo: "Determinación del EBITDA normalizado",
/// server mirror – see src/lib/report-i18n.ts for source
      metodo1: (ebitda: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `EBITDA reportado en el último ejercicio de referencia, excluyendo el impacto de gastos extraordinarios no recurrentes y, si procede, considerando el impacto de una corrección teórica de la renta del inmueble al mercado. El EBITDA normalizado es de ${ebitda}.`,
/// server mirror – see src/lib/report-i18n.ts for source
      metodo2Titulo: "Múltiplo sectorial base",
/// server mirror – see src/lib/report-i18n.ts for source
      metodo2: "Definido por referencia a los múltiplos aplicados en transacciones recientes y comparables del sector y la región.",
/// server mirror – see src/lib/report-i18n.ts for source
      metodo3Titulo: "Ajustes de perfil y riesgo",
/// server mirror – see src/lib/report-i18n.ts for source
      metodo3: "Tamaño, madurez, crecimiento, recurrencia de ingresos, concentración de clientes, geografía, dependencia del accionista e intensidad de inversión, con un límite global aplicado al conjunto de los ajustes.",
/// server mirror – see src/lib/report-i18n.ts for source
      metodo4Titulo: "Equity Bridge",
/// server mirror – see src/lib/report-i18n.ts for source
      metodo4: "Al Enterprise Value se le suma la caja, los depósitos y otros equivalentes, se deduce la deuda total y, si procede, se suma el inmueble incluido en el perímetro de la transacción y el impacto pro forma en caja resultante de la enajenación de activos no operativos, obteniendo el Equity Value antes de los ajustes de cierre.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p3: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Perfil de la empresa y otros indicadores",
/// server mirror – see src/lib/report-i18n.ts for source
      perfilEmpresa: "Perfil de la empresa",
/// server mirror – see src/lib/report-i18n.ts for source
      indicador: "Indicador",
/// server mirror – see src/lib/report-i18n.ts for source
      valor: "Valor",
/// server mirror – see src/lib/report-i18n.ts for source
      historicoFinanceiro: "Histórico financiero",
/// server mirror – see src/lib/report-i18n.ts for source
      ano: "Año",
/// server mirror – see src/lib/report-i18n.ts for source
      faturacao: "Facturación",
/// server mirror – see src/lib/report-i18n.ts for source
      ebitda: "EBITDA",
/// server mirror – see src/lib/report-i18n.ts for source
      extraordinarios: "Extraordinarios",
/// server mirror – see src/lib/report-i18n.ts for source
      normalizacoes: "Normalizaciones",
/// server mirror – see src/lib/report-i18n.ts for source
      cagrFaturacao: "CAGR de la facturación",
/// server mirror – see src/lib/report-i18n.ts for source
      cagrEbitda: "CAGR del EBITDA normalizado",
/// server mirror – see src/lib/report-i18n.ts for source
      semInfoSuficiente: "Información insuficiente",
/// server mirror – see src/lib/report-i18n.ts for source
      normalizacaoEbitda: "Normalización del EBITDA",
/// server mirror – see src/lib/report-i18n.ts for source
      linha: "Línea",
/// server mirror – see src/lib/report-i18n.ts for source
      notaNormalizacao: "Los ajustes de normalización aproximan el resultado operativo recurrente en un escenario posterior a la transacción.",
/// server mirror – see src/lib/report-i18n.ts for source
      outrosIndicadores: "Otros indicadores",
/// server mirror – see src/lib/report-i18n.ts for source
      caixaDepositos: "Caja, depósitos y otros equivalentes",
/// server mirror – see src/lib/report-i18n.ts for source
      dividaTotal: "Deuda total",
/// server mirror – see src/lib/report-i18n.ts for source
      capexAnual: "Capex anual recurrente",
/// server mirror – see src/lib/report-i18n.ts for source
      unidadesLocalizacoes: "Unidades / ubicaciones",
/// server mirror – see src/lib/report-i18n.ts for source
      concentracaoMaiorCliente: "% Concentración en el mayor cliente",
/// server mirror – see src/lib/report-i18n.ts for source
      concentracaoTop5: "% Concentración en el top 5 de clientes",
/// server mirror – see src/lib/report-i18n.ts for source
      clientesAtivos: "Clientes activos",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p4: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Alcance y limitaciones",
/// server mirror – see src/lib/report-i18n.ts for source
      hTitulo: "Alcance y limitaciones de este informe",
/// server mirror – see src/lib/report-i18n.ts for source
      naturezaDocumento: "Naturaleza del documento",
/// server mirror – see src/lib/report-i18n.ts for source
      natureza1: "Se trata de una valoración indicativa preliminar, elaborada exclusivamente a partir de la información facilitada por el usuario, sin verificación independiente, auditoría ni revisión de los datos.",
/// server mirror – see src/lib/report-i18n.ts for source
      natureza2: "No constituye asesoramiento financiero, fiscal, contable o jurídico, ni una recomendación de inversión o desinversión.",
/// server mirror – see src/lib/report-i18n.ts for source
      natureza3: "No constituye una valoración formal (fairness opinion) a efectos legales, fiscales, contables o regulatorios, ni una propuesta contractual u oferta vinculante.",
/// server mirror – see src/lib/report-i18n.ts for source
      natureza4: "El documento está destinado al uso exclusivo del destinatario identificado en la portada y no debe divulgarse a terceros sin autorización escrita de Lealia Advisory Partners.",
/// server mirror – see src/lib/report-i18n.ts for source
      limitacoesFatores: "Limitaciones y factores de variación",
/// server mirror – see src/lib/report-i18n.ts for source
      limitacao1: "Los valores presentados dependen de la calidad, exactitud y exhaustividad de los datos introducidos. Datos incompletos o incorrectos alteran materialmente el resultado.",
/// server mirror – see src/lib/report-i18n.ts for source
      limitacao2: "Las referencias de mercado utilizadas reflejan las condiciones vigentes en la fecha de elaboración y pueden variar rápidamente según el contexto macroeconómico, sectorial y de financiación.",
/// server mirror – see src/lib/report-i18n.ts for source
      limitacao3: "El precio efectivo de una transacción depende del perfil del comprador, de la estructura del negocio, de las garantías, de los ajustes de cierre y del proceso de negociación.",
/// server mirror – see src/lib/report-i18n.ts for source
      limitacao4: "Una valoración definitiva exige due diligence financiera, fiscal, legal y operativa, así como la validación documental de los ajustes al EBITDA.",
/// server mirror – see src/lib/report-i18n.ts for source
      semResponsabilidade: "Lealia Advisory Partners no asume responsabilidad alguna por decisiones adoptadas basándose exclusivamente en este documento.",
/// server mirror – see src/lib/report-i18n.ts for source
      leituraComplementar: "Lectura complementaria",
/// server mirror – see src/lib/report-i18n.ts for source
      leituraFinal: "La estacionalidad y el capex de mantenimiento frente al capex de crecimiento no se han desglosado en esta fase. Limitación: sin este análisis no es posible evaluar la recurrencia mensual de los resultados ni la sostenibilidad del flujo de caja, por lo que el valor calculado no refleja posibles picos o necesidades estacionales de tesorería.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p5: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Método y alternativas",
/// server mirror – see src/lib/report-i18n.ts for source
      porqueMultiplos: "Por qué múltiplos de EBITDA",
/// server mirror – see src/lib/report-i18n.ts for source
      par1: "La valoración por múltiplos es un enfoque de mercado: el valor de una empresa se infiere a partir de los precios pagados por inversores en transacciones recientes de empresas con un perfil comparable. En el contexto de M&A de pymes, el EBITDA se utiliza habitualmente como referencia, por reflejar la capacidad de generación de resultados operativos antes del impacto de la estructura de financiación, la política de amortizaciones y el régimen fiscal.",
/// server mirror – see src/lib/report-i18n.ts for source
      par2: "Es también el método más adecuado para una estimación preliminar: exige pocas hipótesis discrecionales, es transparente y refleja directamente el apetito actual del mercado por el sector. Su limitación es la dependencia de la calidad de los comparables y el hecho de captar la fotografía actual del negocio, y no un plan de crecimiento futuro.",
/// server mirror – see src/lib/report-i18n.ts for source
      par3: "El EV/EBITDA tiende a ser más adecuado para empresas con EBITDA positivo, operaciones relativamente estables y estructuras de costes comparables a las de las empresas utilizadas como referencia. Es menos informativo cuando la empresa presenta resultados operativos negativos o muy volátiles, cuando existen diferencias significativas de crecimiento o margen frente a los comparables, o cuando el negocio atraviesa una fase de fuerte transformación.",
/// server mirror – see src/lib/report-i18n.ts for source
      par4: "La valoración por múltiplos es, por tanto, una referencia sencilla, transparente y alineada con el mercado, especialmente útil cuando existen comparables sólidos y para respaldar una primera estimación de valor. Su principal limitación es depender de la calidad de esos comparables y no reflejar, por sí sola, el potencial futuro del negocio.",
/// server mirror – see src/lib/report-i18n.ts for source
      nota: "En una transacción real, los múltiplos son el punto de partida de la negociación y después se contrastan con un análisis de flujos de caja y con la due diligence.",
/// server mirror – see src/lib/report-i18n.ts for source
      metodosAlternativos: "Métodos alternativos",
/// server mirror – see src/lib/report-i18n.ts for source
      dcfTitulo: "DCF - flujos de caja descontados",
/// server mirror – see src/lib/report-i18n.ts for source
      dcfNota: "(ver diapositivas 10 y 11)",
/// server mirror – see src/lib/report-i18n.ts for source
      dcfDesc: "Proyecta los flujos de caja futuros y los descuenta a una tasa que refleja el coste del capital (WACC). Es el método más riguroso cuando existe un plan de negocio creíble, pero es muy sensible a las hipótesis empleadas.",
/// server mirror – see src/lib/report-i18n.ts for source
      outrosMultiplosTitulo: "Otros múltiplos de transacción",
/// server mirror – see src/lib/report-i18n.ts for source
      outrosMultiplosDesc: "Además del EV/EBITDA, pueden emplearse múltiplos como EV/Ingresos, EV/EBIT o PER, según el sector, la madurez y la rentabilidad de la empresa. Su relevancia depende de la comparabilidad de las empresas y de la calidad de la información disponible.",
/// server mirror – see src/lib/report-i18n.ts for source
      metricasSetorTitulo: "Métricas específicas del sector",
/// server mirror – see src/lib/report-i18n.ts for source
      metricasSetorDesc: "Complementa los múltiplos financieros con métricas operativas relevantes para cada negocio, como el valor por unidad, cliente, cama, suscriptor o metro cuadrado. Es particularmente útil en sectores donde estos indicadores explican de forma más directa el potencial económico de la empresa.",
/// server mirror – see src/lib/report-i18n.ts for source
      valorPatrimonialTitulo: "Valor patrimonial / liquidación",
/// server mirror – see src/lib/report-i18n.ts for source
      valorPatrimonialDesc: "Valora los activos netos a su valor de mercado. Relevante en negocios intensivos en activos, funcionando como valor mínimo de referencia.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p6: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Ajustes al múltiplo",
/// server mirror – see src/lib/report-i18n.ts for source
      hTitulo: "Ajustes aplicados al múltiplo sectorial",
/// server mirror – see src/lib/report-i18n.ts for source
      fator: "Factor",
/// server mirror – see src/lib/report-i18n.ts for source
      leitura: "Lectura",
/// server mirror – see src/lib/report-i18n.ts for source
      efeito: "Efecto",
/// server mirror – see src/lib/report-i18n.ts for source
      semAjustes: "No se aplicaron ajustes al múltiplo sectorial base.",
/// server mirror – see src/lib/report-i18n.ts for source
      nota: "El conjunto de los ajustes está limitado a un rango global de −40% a +35% sobre el múltiplo sectorial base, evitando que la combinación de factores produzca resultados extremos. Todos los factores se basan en información declarada y requieren validación documental.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p7: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Escenarios y sensibilidad",
/// server mirror – see src/lib/report-i18n.ts for source
      cenariosValorizacao: "Escenarios de valoración",
/// server mirror – see src/lib/report-i18n.ts for source
      cenario: "Escenario",
/// server mirror – see src/lib/report-i18n.ts for source
      pressupostos: "Hipótesis",
/// server mirror – see src/lib/report-i18n.ts for source
      multiplo: "Múltiplo",
/// server mirror – see src/lib/report-i18n.ts for source
      enterpriseValue: "Enterprise Value",
/// server mirror – see src/lib/report-i18n.ts for source
      equityValue: "Equity Value",
/// server mirror – see src/lib/report-i18n.ts for source
      semCenarios: "No hay escenarios disponibles para los datos facilitados.",
/// server mirror – see src/lib/report-i18n.ts for source
      sensibilidadeEv: "Sensibilidad del Enterprise Value",
/// server mirror – see src/lib/report-i18n.ts for source
      variacaoEbitda: "Variación del EBITDA",
/// server mirror – see src/lib/report-i18n.ts for source
      ebitda: "EBITDA",
/// server mirror – see src/lib/report-i18n.ts for source
      notaSensibilidade: "La tabla muestra cómo reacciona el Enterprise Value a las variaciones del EBITDA normalizado y del múltiplo aplicado. El Equity Value evoluciona en consecuencia, ajustado por la deuda total, la caja, los depósitos y otros equivalentes, y el inmueble indicado en el equity bridge.",
/// server mirror – see src/lib/report-i18n.ts for source
      semSensibilidade: "No hay análisis de sensibilidad disponible.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p8: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Equity Bridge y contexto de la transacción",
/// server mirror – see src/lib/report-i18n.ts for source
      equityBridge: "Equity Bridge",
/// server mirror – see src/lib/report-i18n.ts for source
      componente: "Componente",
/// server mirror – see src/lib/report-i18n.ts for source
      valor: "Valor",
/// server mirror – see src/lib/report-i18n.ts for source
      contextoEstrutura: "Contexto y estructura de la transacción",
/// server mirror – see src/lib/report-i18n.ts for source
      parametro: "Parámetro",
/// server mirror – see src/lib/report-i18n.ts for source
      detalhe: "Detalle",
/// server mirror – see src/lib/report-i18n.ts for source
      motivoTransacao: "Motivo de la transacción",
/// server mirror – see src/lib/report-i18n.ts for source
      pctATransacionar: "Porcentaje de capital a transmitir",
/// server mirror – see src/lib/report-i18n.ts for source
      estruturaPretendida: "Estructura pretendida",
/// server mirror – see src/lib/report-i18n.ts for source
      horizonteTemporal: "Horizonte temporal",
/// server mirror – see src/lib/report-i18n.ts for source
      permanenciaAcionista: "Permanencia del accionista",
/// server mirror – see src/lib/report-i18n.ts for source
      imovel: "Inmueble",
/// server mirror – see src/lib/report-i18n.ts for source
      tipoInvestidor: "Tipo de inversor preferente",
/// server mirror – see src/lib/report-i18n.ts for source
      estrutura: "Estructura",
/// server mirror – see src/lib/report-i18n.ts for source
      implicacao: "Implicación",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p9: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Drivers de valor y riesgos",
/// server mirror – see src/lib/report-i18n.ts for source
      driversValor: "Drivers de valor",
/// server mirror – see src/lib/report-i18n.ts for source
      driver: "Driver",
/// server mirror – see src/lib/report-i18n.ts for source
      descricao: "Descripción",
/// server mirror – see src/lib/report-i18n.ts for source
      semDrivers: "No se identificaron drivers de valor específicos con base en la información facilitada.",
/// server mirror – see src/lib/report-i18n.ts for source
      riscosMitigantes: "Riesgos y mitigantes",
/// server mirror – see src/lib/report-i18n.ts for source
      risco: "Riesgo",
/// server mirror – see src/lib/report-i18n.ts for source
      evidenciaDisponivel: "Evidencia disponible",
/// server mirror – see src/lib/report-i18n.ts for source
      impacto: "Impacto",
/// server mirror – see src/lib/report-i18n.ts for source
      mitigante: "Mitigante",
/// server mirror – see src/lib/report-i18n.ts for source
      semRiscos: "No se identificaron riesgos materiales específicos con base en la información facilitada.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p12: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Preparación para el mercado",
/// server mirror – see src/lib/report-i18n.ts for source
      planoPreparacao: "Plan de preparación priorizado",
/// server mirror – see src/lib/report-i18n.ts for source
      notaSecao: "Esta sección está dirigida a quienes estén considerando avanzar en un proceso de M&A. Nuestro equipo puede ayudarle a preparar el negocio para maximizar el valor en la venta. Contáctenos para una conversación inicial sin compromiso.",
/// server mirror – see src/lib/report-i18n.ts for source
      prioridade: "Prioridad",
/// server mirror – see src/lib/report-i18n.ts for source
      acao: "Acción",
/// server mirror – see src/lib/report-i18n.ts for source
      impactoEsperado: "Impacto esperado",
/// server mirror – see src/lib/report-i18n.ts for source
      esforco: "Esfuerzo",
/// server mirror – see src/lib/report-i18n.ts for source
      recomendacoesImediatas: "Recomendaciones inmediatas",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p13: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Proceso de M&A",
/// server mirror – see src/lib/report-i18n.ts for source
      hTitulo: "Cómo se desarrolla un proceso de M&A",
/// server mirror – see src/lib/report-i18n.ts for source
      notaSecao: "Esta sección está dirigida a quienes estén considerando avanzar en un proceso de M&A. Nuestro equipo puede ayudarle a preparar el negocio para maximizar el valor en la venta. Contáctenos para una conversación inicial sin compromiso.",
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
    p14: {
/// server mirror – see src/lib/report-i18n.ts for source
      titulo: "Siguiente paso y contactos",
/// server mirror – see src/lib/report-i18n.ts for source
      obrigado: "Gracias.",
/// server mirror – see src/lib/report-i18n.ts for source
      lead: "Gracias por su tiempo. Este informe es un punto de partida: convertir una estimación indicativa en una valoración fundamentada exige validar las cifras, analizar transacciones comparables recientes y conocer el apetito actual de inversores financieros y estratégicos por su sector.",
/// server mirror – see src/lib/report-i18n.ts for source
      proximoPassoTitulo: "Siguiente paso · Reunión de 20 minutos",
/// server mirror – see src/lib/report-i18n.ts for source
      proximoPassoDesc: "Revisión conjunta de las hipótesis de este informe con el equipo de Lealia y presentación del informe completo.",
/// server mirror – see src/lib/report-i18n.ts for source
      agendarReuniao: "Agendar una reunión",
/// server mirror – see src/lib/report-i18n.ts for source
      contactos: "Contactos",
/// server mirror – see src/lib/report-i18n.ts for source
      managingPartner: "Managing Partner",
/// server mirror – see src/lib/report-i18n.ts for source
      notaFinal: (empresa: string) =>
/// server mirror – see src/lib/report-i18n.ts for source
        `Documento de carácter indicativo, preparado exclusivamente para ${empresa}. No constituye asesoramiento financiero ni una propuesta contractual.`,
/// server mirror – see src/lib/report-i18n.ts for source
    },
/// server mirror – see src/lib/report-i18n.ts for source
  },
/// server mirror – see src/lib/report-i18n.ts for source
};
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
export const REPORT_I18N: Record<ReportLang, typeof pt> = { pt, en, es };
/// server mirror – see src/lib/report-i18n.ts for source

/// server mirror – see src/lib/report-i18n.ts for source
export function t(lang: ReportLang = "pt"): typeof pt {
/// server mirror – see src/lib/report-i18n.ts for source
  return REPORT_I18N[lang];
/// server mirror – see src/lib/report-i18n.ts for source
}
