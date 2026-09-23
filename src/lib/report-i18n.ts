// Dicionário central de textos do relatório de avaliação (PT | EN | ES).
// Puro: sem I/O. Usado tanto no cliente (src/lib/report-data.tsx,
// src/components/lealia/ReportDocument.tsx) como no servidor (mirror em
// supabase/functions/_shared/valuation/report-i18n.ts). Mantenha os dois
// ficheiros idênticos em conteúdo — apenas a extensão de import difere.

export type ReportLang = "pt" | "en" | "es";

const LOCALE_MAP: Record<ReportLang, string> = {
  pt: "pt-PT",
  en: "en-GB",
  es: "es-ES",
};

/** Separador de milhares/decimais consistente com o locale, com espaço inquebrável. */
export function formatEURLang(n: number, lang: ReportLang = "pt"): string {
  const neg = n < 0;
  const s = Math.abs(Math.round(n))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
  return `${neg ? "-" : ""}${s}\u00a0€`;
}

/** Agrupamento de milhares (sem símbolo de moeda), com espaço inquebrável. */
export function groupThousandsLang(n: number, lang: ReportLang = "pt"): string {
  const neg = n < 0;
  const s = Math.abs(Math.round(n))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
  return (neg ? "-" : "") + s;
}

const decimalSep = (lang: ReportLang) => (lang === "pt" || lang === "es" ? "," : ".");

/** Percentagem formatada com uma casa decimal (ou `casas`), símbolo de acordo com o locale. */
export function formatPercentLang(v: number, lang: ReportLang = "pt", casas = 1): string {
  return `${v.toFixed(casas).replace(".", decimalSep(lang))}%`;
}

/** Múltiplo formatado como "3,25x" (pt/es) ou "3.25x" (en). */
export function formatMultipleLang(v: number | null, lang: ReportLang = "pt"): string {
  if (v === null) return "—";
  return `${v.toFixed(2).replace(".", decimalSep(lang))}x`;
}

/** Número com uma casa decimal e "x" (ex.: rácio dívida/EBITDA). */
export function formatFactorXLang(v: number, lang: ReportLang = "pt"): string {
  return `${v.toFixed(1).replace(".", decimalSep(lang))}x`;
}

/** Número com três casas decimais (ex.: fator de desconto DCF). */
export function formatFactor3Lang(v: number, lang: ReportLang = "pt"): string {
  return v.toFixed(3).replace(".", decimalSep(lang));
}

/** Data no formato dd/mm/aaaa (pt) ou equivalente local. */
export function formatDateLang(input: string | number | Date, lang: ReportLang = "pt"): string {
  const d = new Date(input);
  return d.toLocaleDateString(LOCALE_MAP[lang], { day: "2-digit", month: "2-digit", year: "numeric" });
}

// ---------------------------------------------------------------------------
// Dicionário de textos
// ---------------------------------------------------------------------------

const pt = {
  common: {
    naoIndicado: "Não indicado",
    nao: "Não",
    neutro: "Neutro",
    positivo: "Positivo",
    negativo: "Negativo",
    naoAplicavel: "n.a.",
    tracoLongo: "—",
  },

  perfil: {
    atividadePrincipal: "Atividade principal",
    setor: "Setor",
    geografia: "Geografia",
    unidadesLocalizacoes: "Unidades / localizações",
    anosAtividade: "Anos de atividade",
    anosAtividadeValor: (n: number) => `${n} anos`,
    colaboradores: "Colaboradores",
    anoReferencia: "Ano de referência",
    periodoReferencia: "Período de referência",
  },

  ponte: {
    enterpriseValueBase: "Enterprise Value base",
    maisCaixa: "Mais: caixa, depósitos e outros equivalentes",
    menosDivida: "Menos: dívida total",
    maisImovel: "Mais: imóvel no perímetro",
    equityValueBase: "Equity Value base",
  },

  historico: {
    umAno: "Foi disponibilizado um ano de histórico financeiro.",
    variosAnos: (n: number) => `Foram disponibilizados ${n} anos de histórico financeiro.`,
  },

  imovel: {
    propriedadeIncluida: "Propriedade da empresa · incluído no perímetro",
    propriedadeExcluida: "Propriedade da empresa · fora do perímetro",
    arrendadoTerceiros: "Arrendado a terceiros",
    incluidoPerimetro: "Incluído no perímetro",
    excluidoPerimetro: "Excluído do perímetro",
    arrendado: "Arrendado",
  },

  drivers: {
    crescimentoSustentado: {
      driver: "Crescimento sustentado",
      descricao:
        "A faturação evoluiu positivamente no período analisado. Trajetórias de crescimento demonstradas suportam o topo do intervalo de múltiplos e reduzem o peso relativo do risco de execução na negociação.",
    },
    dimensaoRelevante: {
      driver: "Dimensão relevante",
      descricao: (fat1: string, ebitda: string) =>
        `Com faturação de ${fat1} e EBITDA normalizado de ${ebitda}, a empresa situa-se acima do limiar de dimensão a partir do qual investidores institucionais e compradores estratégicos internacionais competem ativamente, alargando o universo de contrapartes.`,
    },
    rendibilidadeAcimaMedia: {
      driver: "Rendibilidade acima da média",
      descricao: (margem: string) =>
        `A margem EBITDA normalizada de ${margem} evidencia poder de fixação de preço e disciplina de custos, atributos que os compradores remuneram com múltiplos superiores aos de referência setorial.`,
    },
    conversaoCaixa: {
      driver: "Forte conversão de EBITDA em caixa",
      descricao: (capexRacio: string) =>
        `O CAPEX recorrente representa apenas ${capexRacio} do EBITDA normalizado. Um modelo pouco intensivo em investimento liberta caixa para serviço de dívida de aquisição, o que é determinante para compradores financeiros.`,
    },
    gestaoAutonoma: {
      driver: "Gestão autónoma do acionista",
      descricao:
        "A operação funciona com baixa dependência do acionista na gestão corrente. A existência de uma segunda linha capaz de assegurar continuidade reduz o risco de transição e encurta períodos de permanência exigidos pelo comprador.",
    },
    relacoesTransferiveis: {
      driver: "Relações comerciais transferíveis",
      descricao:
        "A faturação não depende materialmente da relação pessoal do acionista com os clientes, o que reduz a probabilidade de erosão de receita após o closing e limita a necessidade de earn-outs ou garantias adicionais.",
    },
    carteiraDiversificada: {
      driver: "Carteira de clientes diversificada",
      descricaoTop5: (top5: number) => `Os cinco maiores clientes representam ${top5}% da faturação`,
      descricaoTop1: (top1: number) => `O maior cliente representa ${top1}% da faturação`,
      descricaoFim:
        ", um nível de concentração confortável que reduz o risco comercial percebido e diminui a pressão sobre o pacote de garantias.",
    },
    visibilidadeReceita: {
      driver: "Visibilidade de receita contratada",
      descricao: (backlog: string, racio: string) =>
        `O backlog contratado de ${backlog} equivale a ${racio} da faturação anual, conferindo previsibilidade ao plano de negócios apresentado ao comprador.`,
    },
    modeloReplicavel: {
      driver: "Modelo replicável em várias unidades",
      descricao: (unidades: string) =>
        `A operação em ${unidades} demonstra que o modelo de negócio é replicável e não depende de um único ativo ou equipa, suportando teses de consolidação e de expansão pós-aquisição.`,
    },
    exposicaoInternacional: {
      driver: "Exposição internacional",
      descricao: (geografia: string) =>
        `A distribuição de clientes (${geografia}) reduz a dependência de um único mercado e torna a empresa relevante para compradores estrangeiros que procuram presença na região.`,
    },
    posicaoLiquida: {
      driver: "Posição líquida de caixa",
      descricao: (valor: string) =>
        `A empresa apresenta uma posição líquida positiva de ${valor}, o que acresce diretamente ao Equity Value e reforça a capacidade negocial do acionista quanto ao mecanismo de preço.`,
    },
    trackRecord: {
      driver: "Track record consolidado",
      descricao: (anos: number) =>
        `${anos} anos de atividade sustentam a leitura de resiliência do modelo de negócio ao longo de diferentes ciclos e reduzem o risco operacional percebido pelo comprador.`,
    },
    imovelValorizado: {
      driver: "Ativo imobiliário valorizado externamente",
      descricao: (metodo: string, valor: string) =>
        `O imóvel próprio incluído no perímetro está suportado por ${metodo} (${valor}), acrescendo ao Equity Value com um valor defensável em due diligence.`,
    },
  },

  recomendacoes: {
    reforcarGestao:
      "Reforçar a equipa de gestão e documentar processos e relações comerciais, reduzindo a dependência do acionista.",
    diversificarClientes: "Diversificar a base de clientes e formalizar contratos plurianuais com os principais clientes.",
    avaliarReplicabilidade: "Avaliar a replicabilidade do modelo noutras localizações, demonstrando potencial de escala ao investidor.",
    documentarCapex: "Documentar as necessidades de investimento, distinguindo capex de manutenção de capex de expansão.",
    prepararHistorico: "Preparar o histórico financeiro dos últimos três exercícios e a respetiva documentação de suporte.",
    definirImovel: "Definir antecipadamente se o imóvel deve integrar o perímetro da transação e obter uma avaliação independente.",
    validarMargem: "Validar a margem EBITDA e a classificação dos itens considerados extraordinários.",
    explicarContracao: "Preparar uma explicação sustentada da contração de faturação e do plano de recuperação.",
    validarComLealia: "Validar esta avaliação indicativa com a equipa da Lealia Advisory Partners antes de qualquer decisão de mercado.",
  },

  resumo: {
    comResultado: (params: {
      equityMin: string;
      equityMax: string;
      evMin: string;
      evMax: string;
      ebitdaBase: string;
      multMin: string;
      multMax: string;
      ano: number;
      tipoPeriodo: string;
      fat1: string;
      margem: string | null;
    }) =>
      `Com base nos dados disponibilizados, estima-se um <strong>valor indicativo para os acionistas entre ${params.equityMin} e ${params.equityMax}</strong>. ` +
      `O intervalo resulta de um Enterprise Value entre ${params.evMin} e ${params.evMax}, ` +
      `calculado sobre um EBITDA normalizado de ${params.ebitdaBase} ` +
      `e um múltiplo EV/EBITDA implícito ajustado de ${params.multMin}–${params.multMax}. ` +
      `Em ${params.ano} (${params.tipoPeriodo}), a empresa apresentou uma faturação de ${params.fat1}` +
      `${params.margem !== null ? ` e uma margem EBITDA de ${params.margem}` : ""}.`,
    semResultado:
      "Com os dados indicados não é possível apresentar um valor indicativo por múltiplo de EBITDA. Este relatório apresenta, ainda assim, o perfil operacional da empresa e as principais recomendações aplicáveis.",
  },

  mensagemAcionista: {
    historicoLimitado:
      "A principal oportunidade de preservação de valor antes de uma transação reside na consolidação de três exercícios financeiros reconciliados e na documentação dos ajustamentos ao EBITDA, reduzindo as lacunas de informação que tipicamente geram desconto em due diligence.",
    dependenciaAlta:
      "A principal oportunidade de criação de valor reside na redução da dependência do acionista, através do reforço da equipa de gestão e da formalização das relações comerciais em nome da empresa, aumentando a transferibilidade do negócio.",
    concentracaoAlta:
      "A principal oportunidade de criação de valor reside na diversificação da carteira de clientes e na formalização contratual das contas mais relevantes, reduzindo o risco comercial percebido pelo comprador.",
    padrao:
      "A principal oportunidade de criação de valor reside na validação da qualidade dos resultados, na documentação dos ajustamentos ao EBITDA e na redução das lacunas de informação que poderão gerar desconto em due diligence.",
  },

  riscos: {
    historicoLimitado: {
      risco: "Histórico financeiro limitado",
      evidenciaUm: "1 exercício disponibilizado",
      evidenciaVarios: (n: number) => `${n} exercícios disponibilizados`,
      impacto: "Reduz a confiança na sustentabilidade dos resultados e pode condicionar o múltiplo",
      mitigante: "Preparar e reconciliar a informação financeira dos últimos três exercícios",
    },
    dependenciaGestao: {
      risco: "Dependência de gestão do acionista",
      evidencia: (dep: string) => `Dependência do acionista na gestão: ${dep}`,
      impacto: "Aumenta o risco de transição e de continuidade operacional após a transação",
      mitigante: "Reforçar a equipa de gestão e documentar os processos-chave",
    },
    concentracaoClientes: {
      risco: "Concentração de clientes",
      evidencia: (top5: number) => `Cinco maiores clientes: ${top5}% da faturação`,
      impacto: "Aumenta a exposição à perda de clientes relevantes",
      mitigante: "Diversificar a carteira comercial e formalizar contratos plurianuais",
    },
    dependenciaComercial: {
      risco: "Dependência comercial do acionista",
      evidencia: (dep: string) => `Dependência do acionista na faturação: ${dep}`,
      impacto: "Reduz a transferibilidade das relações comerciais após a transação",
      mitigante: "Transferir contas-chave para gestores de conta e contratar em nome da empresa",
    },
    localizacaoUnica: {
      risco: "Operação numa única localização",
      evidencia: "Atividade concentrada num único site",
      impacto: "Limita a escalabilidade e concentra o risco operacional e geográfico",
      mitigante: "Avaliar replicabilidade do modelo e planos de expansão para novas localizações",
    },
    posicaoLiquidaElevada: {
      risco: "Posição Líquida elevada",
      evidencia: (racio: string) => `Posição Líquida equivalente a ${racio} o EBITDA normalizado`,
      evidenciaSemDados: "Posição Líquida equivalente a — o EBITDA normalizado",
      impacto: "Reduz o Equity Value e pode limitar o financiamento de aquisição",
      mitigante: "Reduzir dívida, otimizar caixa e preparar um mapa financeiro atualizado",
    },
    capexElevado: {
      risco: "CAPEX elevado",
      evidencia: (capex: string) => `CAPEX recorrente de ${capex} face ao EBITDA normalizado`,
      impacto: "Limita a conversão de EBITDA em geração de caixa",
      mitigante: "Separar CAPEX de manutenção e de crescimento e validar necessidades futuras",
    },
    imovelSemAvaliacao: {
      risco: "Imóvel próprio sem avaliação independente",
      evidencia: (metodo: string) => `Método de avaliação indicado: ${metodo}`,
      impacto: "Introduz incerteza no Equity Value quando o imóvel integra o perímetro",
      mitigante: "Obter avaliação independente e definir o perímetro da transação",
    },
    ajustamentosPorValidar: {
      risco: "Ajustamentos ao EBITDA por validar",
      evidencia: (valor: string) => `Ajustamentos de ${valor} declarados sem suporte documental`,
      impacto: "Pode gerar descontos ou ajustamentos durante a due diligence",
      mitigante: "Preparar reconciliação contabilística e documentação de suporte",
    },
    contracaoFaturacao: {
      risco: "Contração da faturação",
      evidencia: "Evolução negativa da faturação no período indicado",
      impacto: "Pode condicionar o múltiplo aplicável e a leitura de sustentabilidade",
      mitigante: "Documentar as causas e evidenciar a inflexão através de indicadores recentes",
    },
    niveis: { alto: "Alto", medio: "Médio", baixo: "Baixo" },
  },

  plano: {
    consolidarHistorico: "Consolidar três exercícios de informação financeira reconciliada",
    reconciliarEbitda: "Reconciliar EBITDA reportado e normalizado e documentar os ajustamentos",
    confirmarDivida: "Confirmar dívida total e caixa, depósitos e outros equivalentes disponíveis à data de referência",
    analisarFundoManeio: "Analisar o fundo de maneio normativo e a sazonalidade do negócio",
    reduzirDependencia: "Reduzir a dependência do acionista e criar plano de sucessão",
    mapearConcentracao: "Mapear a concentração de clientes e formalizar contratos relevantes",
    separarCapex: "Separar CAPEX de manutenção e de crescimento",
    definirImovel: "Definir o tratamento do imóvel e obter avaliação independente",
    demonstrarReplicabilidade: "Demonstrar a replicabilidade do modelo noutras localizações",
    definirEstrutura: "Definir a estrutura da transação e o perímetro pretendido",
    prioridade: { alta: "Alta", media: "Média" },
    impacto: { alto: "Alto", muitoAlto: "Muito alto", medioAlto: "Médio/alto", medio: "Médio" },
    esforco: { alto: "Alto", medio: "Médio", baixo: "Baixo" },
    prazo: {
      semanas2a6: "2-6 semanas",
      semanas1a3: "1-3 semanas",
      semanas1a2: "1-2 semanas",
      semanas2a4: "2-4 semanas",
      meses3a12: "3-12 meses",
      semanas4a8: "4-8 semanas",
      meses6a12: "6-12 meses",
    },
  },

  implicacoesParticipacao: {
    minoritaria:
      "Numa participação minoritária não existe prémio de controlo e o investidor valoriza sobretudo a governação, os direitos de saída e o plano de crescimento. É frequente o valor por ação refletir um desconto de minoria.",
    maioritaria:
      "Numa venda maioritária o comprador assume o controlo e tende a incorporar prémio de controlo, exigindo em contrapartida continuidade da gestão e mecanismos de alinhamento como earn-out ou rollover de parte do capital.",
    totalidade:
      "Na venda da totalidade o comprador paga tipicamente prémio de controlo, mas exige um período de transição, garantias de continuidade dos clientes e um pacote de representações e garantias mais alargado.",
    indefinida:
      "A percentagem a transacionar ainda não está definida. A decisão condiciona o universo de investidores, a existência de prémio de controlo e a estrutura de pagamento.",
  },

  limitacoes: {
    infoDeclarada: "A estimativa assenta exclusivamente na informação declarada, sem verificação documental ou auditoria.",
    fundoManeio: "Não foi realizada análise de fundo de maneio normativo nem de sazonalidade do negócio.",
    transacoesComparaveis: "Não foram analisadas transações comparáveis específicas nem o apetite atual de investidores para o ativo.",
    historicoInferior: "O histórico financeiro disponível é inferior a três exercícios.",
    setorGenerico: "O setor indicado não tem múltiplos específicos disponíveis; foi usada uma referência genérica de mercado.",
    periodoNaoEncerrado: "O período de referência não corresponde a contas encerradas, o que aumenta a incerteza da estimativa.",
  },

  qualidade: {
    notaUmAno:
      "Com apenas um período financeiro, não é possível avaliar com robustez o crescimento, a estabilidade de margens, a conversão de resultados em caixa ou a sustentabilidade do EBITDA. Esta limitação reduz a confiança da avaliação e pode condicionar o múltiplo aplicável.",
    margensEstaveis: "As margens EBITDA mantiveram-se estáveis no período analisado, o que sustenta a leitura de recorrência dos resultados.",
    margensModeradas: "As margens EBITDA apresentam variação moderada no período analisado, justificando a validação dos fatores que explicam a oscilação.",
    margensRelevantes: "As margens EBITDA apresentam variação relevante no período analisado, o que exige explicação documentada em due diligence.",
    conversaoCaixaComCapex: (capex: string, pct: string) =>
      `Após CAPEX recorrente de ${capex}, a conversão indicativa de EBITDA em caixa operacional é de ${pct}, antes de fundo de maneio, juros e impostos. Limitação: sem a desagregação entre CAPEX de manutenção e de crescimento, o fluxo de caixa livre subjacente à avaliação fica sujeito a correção em due diligence.`,
    conversaoCaixaSemCapex:
      "Não foi indicado CAPEX recorrente. Limitação: sem este dado não é possível estimar a conversão de EBITDA em caixa, o que reduz a fiabilidade do valor calculado e tende a traduzir-se em desconto por parte de um comprador.",
    fundoManeio:
      "O fundo de maneio não foi analisado nesta fase. Limitação: sem a normalização do fundo de maneio não é possível fixar com precisão a ponte entre Enterprise Value e Equity Value, podendo originar ajustamentos de closing euro-a-euro no preço final.",
    backlog: (valor: string) =>
      `Foi indicado backlog contratado de ${valor}. Limitação: sem detalhe das margens, prazos de execução e condições de cancelamento, a visibilidade de receita não foi incorporada quantitativamente na avaliação — apenas considerada de forma qualitativa.`,
    concentracaoTop5: (top5: number) => `Concentração comercial: os cinco maiores clientes representam ${top5}% da faturação`,
    concentracaoTop1: (top1: number) => ` e o maior cliente ${top1}%`,
    concentracaoFim: ". Limitação: a dependência de poucos clientes aumenta o risco percebido da receita e condiciona diretamente o múltiplo aplicável na avaliação.",
    ajustamentosDeclarados: (valor: string) =>
      `Foram declarados ajustamentos não recorrentes de ${valor}. Limitação: até serem validados documentalmente, o EBITDA ajustado — e, por consequência, o intervalo de avaliação apresentado — fica sujeito a revisão.`,
    ajustamentosNaoDeclarados:
      "Não foram declarados ajustamentos não recorrentes ao EBITDA. Limitação: qualquer normalização identificada em due diligence (remunerações de sócios, rendas fora de mercado, proveitos não recorrentes) poderá alterar o EBITDA base e o valor calculado.",
  },

  alertas: {
    umPeriodo: "Apenas foi disponibilizado um período financeiro. A análise de crescimento e estabilidade de margens não é conclusiva.",
    ajustamentosSemSuporte: 'Existem ajustamentos ao EBITDA sem suporte documental. Devem ser classificados como "a validar em due diligence".',
    fundoManeioNaoAnalisado: "Não foi analisado o fundo de maneio. O Equity Value poderá ser afetado por ajustamentos de closing.",
    imovelSemAvaliacao: "O valor do imóvel foi introduzido sem avaliação independente. O Equity Value poderá sofrer alteração material.",
    imovelSemValor: "O imóvel foi incluído no perímetro sem valor indicado, pelo que não foi somado ao Equity Value.",
    periodoNaoClassificado: "O período financeiro de referência não foi classificado (contas encerradas, estimativa ou orçamento).",
    concentracaoInconsistente: "O peso dos cinco maiores clientes é inferior ao do maior cliente. Os dados devem ser revistos.",
    minoritariaAtencao: "O valor de uma participação minoritária não corresponde a uma proporção simples do Equity Value de 100%.",
  },

  implicacoesEstrutura: {
    venda50: { estrutura: "Venda de 50%–51%", implicacao: "Exige regras claras de governação e acordo de acionistas" },
    venda60: { estrutura: "Venda de 60%–80%", implicacao: "Comprador obtém controlo; pode existir rollover relevante" },
    venda90: { estrutura: "Venda de 90%", implicacao: "Participação residual exige proteção e regras de saída" },
    venda100: { estrutura: "Venda de 100%", implicacao: "Estrutura mais simples; continuidade de gestão torna-se crítica" },
  },

  notas: {
    equity: "O Equity Value apresentado é indicativo e calculado antes de ajustamentos de closing, normalização de fundo de maneio, contingências, impostos aplicáveis e validação em due diligence.",
    minoria: "O valor de uma participação minoritária não deve ser assumido como uma simples proporção do Equity Value de 100%. O valor pode variar em função de controlo, direitos de governação, liquidez e estrutura da transação.",
  },

  engine: {
    ajustes: {
      volumeNegocios: {
        label: "Volume de negócios",
        abaixo5M: "Faturação abaixo de 5M€",
        entre5e20M: "Faturação entre 5M€ e 20M€",
        acima20M: "Faturação de 20M€ ou mais",
      },
      dimensaoResultados: {
        label: "Dimensão dos resultados",
        abaixo2M: "EBITDA normalizado abaixo de 2M€",
        acimaIgual2M: "EBITDA normalizado de 2M€ ou mais",
      },
      idadeEmpresa: {
        label: "Idade da empresa",
        menos3: "Menos de 3 anos",
        mais10: "Mais de 10 anos",
        entre3e10: "Entre 3 e 10 anos",
      },
      crescimento: {
        label: "Crescimento",
        historicoInsuficiente: "Histórico insuficiente",
        emQueda: "Faturação em queda face ao ano mais antigo indicado",
        acumulado: (pct: string) => `Crescimento acumulado de ${pct}%`,
        ate10: "Crescimento acumulado até 10%",
      },
      unidades: {
        label: "Unidades / localizações",
        naoIndicado: "Não indicado",
        unica: "Operação concentrada numa única localização",
        maisDe3: "Operação multi-unidade (mais de 3 localizações)",
        naoAplicavel: "Não aplicável ao modelo de negócio",
        entre2e3: "Operação em 2-3 localizações",
      },
      concentracaoClientes: {
        label: "Concentração de clientes",
        naoIndicada: "Não indicada",
        diversificada: "Base de clientes diversificada",
        moderada: "Concentração moderada nos 5 maiores clientes",
        forte: "Forte dependência dos 5 maiores clientes",
      },
      geografia: {
        label: "Geografia dos clientes",
        naoIndicada: "Não indicada",
        equilibrio: "Equilíbrio nacional/internacional",
      },
      depFaturacao: {
        label: "Dependência do acionista (faturação)",
        naoIndicada: "Não indicada",
        baixa: "Carteira pouco dependente do acionista",
        alta: "Forte dependência comercial do acionista",
        moderada: "Dependência moderada do acionista",
      },
      depGestao: {
        label: "Dependência do acionista (gestão)",
        naoIndicada: "Não indicada",
        baixa: "Gestão autónoma face ao acionista",
        alta: "Gestão fortemente centrada no acionista",
        moderada: "Dependência moderada do acionista",
      },
      capex: {
        label: "Intensidade de investimento (capex)",
        naoIndicada: "Não indicada",
        reduzido: "Capex recorrente reduzido face à faturação",
        relevante: "Capex recorrente relevante face à faturação",
        elevado: "Capex recorrente elevado face à faturação",
      },
    },
    cenarios: {
      conservador: "Comprador financeiro, ausência de prémio estratégico; múltiplo no limite inferior do intervalo ajustado.",
      base: "Processo normal, informação financeira preparada e continuidade operacional assegurada.",
      otimista: "Comprador estratégico com sinergias identificadas, com vários interessados e preparação prévia do negócio.",
    },
    linhasEbitda: {
      reportado: (ano: number) => `EBITDA reportado ${ano}`,
      despesasExtraordinarias: "Despesas extraordinárias não recorrentes",
      rendaTeorica: "Renda teórica de mercado (imóvel próprio)",
      acrescimoRenda: "Acréscimo de renda até valor de mercado",
      normalizado: "EBITDA normalizado",
    },
    dimensoes: {
      historicoFinanceiro: "Histórico financeiro",
      qualidadeEbitda: "Qualidade do EBITDA",
      posicaoFinanceira: "Posição financeira",
      enquadramentoSetorial: "Enquadramento setorial",
      perfilRisco: "Perfil de risco",
    },
    itensConfianca: {
      faturacaoAnoReferencia: "Faturação do ano de referência",
      faturacaoAnoAnterior: "Faturação do ano anterior",
      faturacaoTresAnos: "Faturação de há três anos",
      ebitdaAnoAnterior: "EBITDA do ano anterior",
      ebitdaTresAnos: "EBITDA de há três anos",
      tipoPeriodoReferencia: "Tipo de período de referência",
      despesasExtraordinariasIdentificadas: "Despesas extraordinárias identificadas",
      enquadramentoImovel: "Enquadramento do imóvel de operação",
      capexAnualRecorrente: "Capex anual recorrente",
      caixaDepositos: "Caixa e depósitos",
      dividaFinanceira: "Dívida financeira",
      industriaIdentificada: "Indústria identificada",
      subindustriaIdentificada: "Sub-indústria identificada",
      atividadePrincipalDescrita: "Atividade principal descrita",
      concentracaoTop5: "Concentração dos 5 maiores clientes",
      pesoMaiorCliente: "Peso do maior cliente",
      unidadesLocalizacoes: "Unidades / localizações",
      geografiaClientes: "Geografia dos clientes",
      depFaturacao: "Dependência do acionista (faturação)",
      depGestao: "Dependência do acionista (gestão)",
    },
    confExplicacao: {
      baixa: "Confiança baixa — a estimativa foi calculada com informação limitada.",
      media: "Confiança média — existe informação relevante, mas alguns dados adicionais poderão melhorar a análise.",
      alta: "Confiança alta — a informação fornecida cobre as dimensões críticas de uma avaliação preliminar.",
    },
  },

  // ---------------------------------------------------------------------
  // ReportDocument.tsx
  // ---------------------------------------------------------------------

  doc: {
    disclaimer:
      "O presente relatório constitui uma estimativa indicativa da avaliação da empresa, gerada com base na informação fornecida pelo utilizador, não configurando aconselhamento financeiro, proposta contratual, recomendação de investimento ou avaliação formal para efeitos legais, fiscais ou contabilísticos; os valores apresentados dependem da qualidade e exatidão dos dados introduzidos e das condições de mercado vigentes à data de elaboração deste documento.",
    footer: (empresa: string) => `Lealia Advisory Partners · Relatório de avaliação indicativa${empresa ? ` para ${empresa}` : ""}`,
    efeito: { neutro: "Neutro", positivo: "Positivo", negativo: "Negativo" },

    waterfall: {
      caption: "Equity Bridge · milhares de €",
      ariaLabel: "Gráfico waterfall da Equity Bridge",
      enterpriseValue: "Enterprise Value",
      equityValue: "Equity Value",
      divida: "Dívida",
      caixa: "Caixa",
      imovel: "Imóvel",
    },

    dcf: {
      titulo: "DCF Valuation",
      hTitulo: "Avaliação por fluxos de caixa descontados",
      semDados: "Não é possível apresentar uma análise DCF com a informação disponibilizada. Em particular, o custo de capital estimado tem de ser superior à taxa de crescimento na perpetuidade.",
      mapaFluxos: "Mapa de fluxos de caixa",
      unidadeMilhares: "milhares de €",
      linha: "Linha",
      tv: "TV",
      receita: "Receita",
      ebitda: "EBITDA",
      margemEbitda: "Margem EBITDA",
      da: "(−) D&A",
      ebit: "= EBIT",
      impostoEbit: "(−) Imposto s/ EBIT",
      nopat: "= NOPAT",
      maisDa: "(+) D&A",
      menosCapex: "(−) Capex",
      fcff: "= FCFF unlevered",
      fatorDesconto: "Fator de desconto",
      pvFcff: "= PV do FCFF",
      legenda: "A = exercício histórico · F = ano projetado · TV = valor terminal. Fluxo unlevered: o financiamento é refletido no custo de capital e na dívida líquida. TV por perpetuidade sobre o FCFF do ano 8.",
      pressupostosForecast: "Pressupostos do forecast",
      crescimentoInicial: "Crescimento inicial",
      anoEstabilizacao: "Ano de estabilização",
      anoN: (n: number) => `Ano ${n}`,
      crescimentoEstabilizado: "Crescimento estabilizado",
      crescimentoPerpetuidade: "Crescimento na perpetuidade",
      margemEbitdaProjetada: "Margem EBITDA projetada",
      capexPctReceita: "Capex (% receita)",
      daPctReceita: "D&A (% receita)",
      fundoManeio: "Fundo de maneio",
      naoProjetado: "Não projetado",
      taxaImposto: "Taxa de imposto (CIT)",
      indicadoresAvaliacao: "Indicadores de avaliação",
      enterpriseValue: "Enterprise Value",
      equityValue: "Equity Value",
      evEbitdaImplicito: "EV / EBITDA implícito",
      evReceitaImplicito: "EV / Receita implícito",
      wacc: "Custo médio ponderado de capital",
      riskFree: "Risk-free rate (Rf)",
      beta: "Beta unlevered / levered (β)",
      erp: "Equity Risk Premium (ERP)",
      crp: "Country Risk Premium (CRP)",
      premioDimensao: "Prémio de dimensão (PME)",
      premioEspecifico: "Prémio específico (iliquidez)",
      premioAtivoEspecifico: "Prémio específico do ativo",
      costOfEquity: "Cost of Equity (Ke)",
      costOfDebt: "Cost of Debt pre / post tax (Kd)",
      pesoEquityDivida: "Peso de equity / dívida (E / D)",
      waccLabel: "WACC",
      resultados: "Resultados",
      pvExplicito: "PV do forecast explícito (8 anos)",
      pvTerminal: "PV do valor terminal",
      pesoTerminal: "Peso do valor terminal no EV",
      ajusteDividaLiquida: "Ajustamento de dívida líquida",
      imovel: "Imóvel",
      notaCustoCapital: (pais: string, citNota: string, extra: string) =>
        `Custo de capital estimado numa ótica prudente: às referências setoriais acrescem prémios de dimensão e de iliquidez, porque uma PME não cotada tem risco superior ao das cotadas do setor. Beta, ERP, CRP, estrutura de capital e spread são proxies setoriais; CIT de ${pais} (${citNota})${extra ? ` ${extra}` : ""}`,
    },

    sensitivity: {
      titulo: "Sensitivity Analysis",
      hTitulo: "Análise de sensibilidade",
      semDados: "Sem análise DCF disponível, não é possível apresentar as matrizes de sensibilidade.",
      sensibilidadeEv: "Sensibilidade do Enterprise Value",
      notaMatriz: "A célula destacada corresponde ao cenário base apresentado no slide anterior. As matrizes isolam o efeito de cada variável, mantendo constantes os restantes pressupostos.",
      transparenciaPressupostos: "Transparência de pressupostos",
      introTransparencia: "Os pressupostos do modelo combinam a informação introduzida no formulário com referências setoriais de mercado, seguindo um critério conservador - na dúvida, adota-se o valor que resulta numa avaliação mais prudente. A tabela seguinte consolida os pressupostos estruturantes da avaliação e a respetiva fonte ou método de derivação.",
      parametro: "Parâmetro",
      valor: "Valor",
      metodoFonte: "Método / fonte",
    },

    lockedPages: {
      p4: "Âmbito e limitações",
      p5: "Método e alternativas",
      p6: "Ajustes ao múltiplo",
      p7: "Cenários e sensibilidade",
      p8: "Equity Bridge e contexto da transação",
      p9: "Drivers de Valor & Riscos",
      p10: "DCF Valuation",
      p11: "Sensitivity Analysis",
      p12: "Preparação para o mercado",
      p13: "Processo de M&A",
    },
    conteudoReservado: "Conteúdo reservado",
    lockedTexto: "Esta secção faz parte do relatório completo. Agende uma reunião de 20 minutos com a equipa da Lealia para visualizar a análise integral e a discussão dos resultados.",
    lockedCta: "Agendar reunião para ver o relatório completo",

    cover: {
      titulo: "Preliminary Valuation",
      preparadoPara: "Preparado para",
      data: "Data",
    },

    p2: {
      titulo: "Sumário executivo",
      evIndicativo: "Enterprise Value indicativo",
      equityIndicativo: "Equity Value Indicativo",
      faturacaoAno: "Faturação do ano de referência",
      ebitdaNormalizado: "EBITDA normalizado",
      margemNormalizada: "Margem EBITDA normalizada",
      multiploImplicito: "Múltiplo implícito",
      posicaoLiquida: "Posição Líquida",
      posicaoLiquidaHint: "caixa / (dívida)",
      completudeInformacao: "Completude da informação",
      metodologia: "Metodologia de avaliação",
      metodo1Titulo: "Determinação do EBITDA normalizado",
      metodo1: (ebitda: string) =>
        `EBITDA reportado último exercício de referência, excluindo o impacto de despesas extraordinárias não recorrentes e, se aplicável, considerando o impacto de uma correção teórica sobre a renda do imóvel ao mercado. O EBITDA normalizado é de ${ebitda}.`,
      metodo2Titulo: "Múltiplo setorial de base",
      metodo2: "Definido com referência aos múltiplos praticados em transações recentes e comparáveis no setor e na região.",
      metodo3Titulo: "Ajustes de perfil e risco",
      metodo3: "Dimensão, maturidade, crescimento, recorrência de receita, concentração de clientes, geografia, dependência do acionista e intensidade de investimento, com um limite global aplicado ao conjunto dos ajustes.",
      metodo4Titulo: "Equity Bridge",
      metodo4: "Ao Enterprise Value soma-se a caixa, depósitos e outros equivalentes, deduz-se a dívida total, e, se aplicável, soma-se o imóvel incluído no perímetro da transação e o impacto pro-forma em caixa resultante da alienação de ativos não operacionais, obtendo-se o Equity Value antes de ajustamentos de closing.",
    },

    p3: {
      titulo: "Perfil da empresa e outros indicadores",
      perfilEmpresa: "Perfil da empresa",
      indicador: "Indicador",
      valor: "Valor",
      historicoFinanceiro: "Histórico financeiro",
      ano: "Ano",
      faturacao: "Faturação",
      ebitda: "EBITDA",
      extraordinarios: "Extraordinários",
      normalizacoes: "Normalizações",
      cagrFaturacao: "CAGR da faturação",
      cagrEbitda: "CAGR do EBITDA normalizado",
      semInfoSuficiente: "Sem informação suficiente",
      normalizacaoEbitda: "Normalização do EBITDA",
      linha: "Linha",
      notaNormalizacao: "Os ajustamentos de normalização aproximam o resultado operacional recorrente num cenário pós-transação.",
      outrosIndicadores: "Outros Indicadores",
      caixaDepositos: "Caixa, depósitos e outros equivalentes",
      dividaTotal: "Dívida total",
      capexAnual: "CAPEX anual recorrente",
      unidadesLocalizacoes: "Unidades / localizações",
      concentracaoMaiorCliente: "% Concentração no maior cliente",
      concentracaoTop5: "% Concentração no top 5 clientes",
      clientesAtivos: "Clientes ativos",
    },

    p4: {
      titulo: "Âmbito e limitações",
      hTitulo: "Âmbito e limitações deste relatório",
      naturezaDocumento: "Natureza do documento",
      natureza1: "Trata-se de uma avaliação indicativa preliminar, elaborada exclusivamente a partir da informação fornecida pelo utilizador, sem verificação independente, auditoria ou revisão dos dados.",
      natureza2: "Não constitui aconselhamento financeiro, fiscal, contabilístico ou jurídico, nem uma recomendação de investimento ou desinvestimento.",
      natureza3: "Não configura uma avaliação formal (fairness opinion) para efeitos legais, fiscais, contabilísticos ou regulatórios, nem uma proposta contratual ou oferta vinculativa.",
      natureza4: "O documento destina-se ao uso exclusivo do destinatário identificado na capa e não deve ser divulgado a terceiros sem autorização escrita da Lealia Advisory Partners.",
      limitacoesFatores: "Limitações e fatores de variação",
      limitacao1: "Os valores apresentados dependem da qualidade, exatidão e completude dos dados introduzidos. Dados incompletos ou incorretos alteram materialmente o resultado.",
      limitacao2: "As referências de mercado utilizadas refletem condições vigentes à data de elaboração e podem variar rapidamente com o contexto macroeconómico, setorial e de financiamento.",
      limitacao3: "O preço efetivo de uma transação depende do perfil do comprador, da estrutura do negócio, das garantias, dos ajustamentos de closing e do processo negocial.",
      limitacao4: "Uma avaliação definitiva exige due diligence financeira, fiscal, legal e operacional, bem como a validação documental dos ajustamentos ao EBITDA.",
      semResponsabilidade: "A Lealia Advisory Partners não assume responsabilidade por decisões tomadas com base exclusiva neste documento.",
      leituraComplementar: "Leitura complementar",
      leituraFinal: "A sazonalidade e o CAPEX de manutenção face ao CAPEX de crescimento não foram desagregados nesta fase. Limitação: sem esta leitura não é possível aferir a recorrência mensal dos resultados nem a sustentabilidade do fluxo de caixa, pelo que o valor calculado não reflete eventuais picos ou necessidades estacionais de tesouraria.",
    },

    p5: {
      titulo: "Método e alternativas",
      porqueMultiplos: "Porquê múltiplos de EBITDA",
      par1: "A avaliação por múltiplos é uma abordagem de mercado: o valor de uma empresa é inferido a partir dos preços pagos por investidores em transações recentes por empresas com perfil comparável. No contexto de M&A de PME, o EBITDA é habitualmente utilizado como referência, por refletir a capacidade de geração de resultados operacionais antes do impacto da estrutura de financiamento, política de amortizações e do regime fiscal.",
      par2: "É também o método mais adequado a uma estimativa preliminar: exige poucos pressupostos discricionários, é transparente e reflete diretamente o apetite atual do mercado pelo setor. A sua limitação é a dependência da qualidade dos comparáveis e o facto de captar a fotografia atual do negócio, e não um plano de crescimento futuro.",
      par3: "O EV/EBITDA tende a ser mais adequado para empresas com EBITDA positivo, operações relativamente estáveis e estruturas de custos comparáveis às das empresas utilizadas como referência. É menos informativo quando a empresa apresenta resultados operacionais negativos ou muito voláteis, quando existem diferenças significativas de crescimento ou margem face aos comparáveis, ou quando o negócio se encontra numa fase de forte transformação.",
      par4: "A avaliação por múltiplos é, assim, uma referência simples, transparente e alinhada com o mercado, especialmente útil quando existem comparáveis sólidos e para suportar uma primeira estimativa de valor. A sua principal limitação é depender da qualidade desses comparáveis e não refletir, por si só, o potencial futuro do negócio.",
      nota: "Numa transação real, os múltiplos são o ponto de partida da negociação e são depois confrontados com uma análise de fluxos de caixa e com a due diligence.",
      metodosAlternativos: "Métodos alternativos",
      dcfTitulo: "DCF - fluxos de caixa descontados",
      dcfNota: "(ver slides 10 & 11)",
      dcfDesc: "Projeta os fluxos de caixa futuros e desconta-os a uma taxa que reflete o custo do capital (WACC). É o método mais rigoroso quando existe um plano de negócios credível, mas é muito sensível aos pressupostos.",
      outrosMultiplosTitulo: "Outros múltiplos de transação",
      outrosMultiplosDesc: "Para além do EV/EBITDA, podem ser utilizados múltiplos como EV/Receitas, EV/EBIT ou P/E, dependendo do setor, da maturidade e da rentabilidade da empresa. A sua relevância depende da comparabilidade das empresas e da qualidade da informação disponível.",
      metricasSetorTitulo: "Métricas específicas do setor",
      metricasSetorDesc: "Complementa os múltiplos financeiros através de métricas operacionais relevantes para cada negócio, como valor por unidade, cliente, cama, subscritor ou metro quadrado. É particularmente útil em setores onde estes indicadores explicam de forma mais direta o potencial económico da empresa.",
      valorPatrimonialTitulo: "Valor patrimonial / liquidação",
      valorPatrimonialDesc: "Avalia os ativos líquidos ao seu valor de mercado. Relevante em negócios intensivos em ativos, funcionando como valor mínimo de referência.",
    },

    p6: {
      titulo: "Ajustes ao múltiplo",
      hTitulo: "Ajustes aplicados ao múltiplo setorial",
      fator: "Fator",
      leitura: "Leitura",
      efeito: "Efeito",
      semAjustes: "Não foram aplicados ajustes ao múltiplo setorial de base.",
      nota: "O conjunto dos ajustes está limitado a um intervalo global de −40% a +35% sobre o múltiplo setorial de base, evitando que a combinação de fatores produza resultados extremos. Todos os fatores assentam em informação declarada e carecem de validação documental.",
    },

    p7: {
      titulo: "Cenários e sensibilidade",
      cenariosValorizacao: "Cenários de valorização",
      cenario: "Cenário",
      pressupostos: "Pressupostos",
      multiplo: "Múltiplo",
      enterpriseValue: "Enterprise Value",
      equityValue: "Equity Value",
      semCenarios: "Sem cenários disponíveis para os dados fornecidos.",
      sensibilidadeEv: "Sensibilidade do Enterprise Value",
      variacaoEbitda: "Variação do EBITDA",
      ebitda: "EBITDA",
      notaSensibilidade: "A tabela mostra como o Enterprise Value reage a variações do EBITDA normalizado e do múltiplo aplicado. O Equity Value acompanha estas variações, ajustado pela dívida total, caixa, depósitos e outros equivalentes, e o imóvel indicado na equity bridge.",
      semSensibilidade: "Sem análise de sensibilidade disponível.",
    },

    p8: {
      titulo: "Equity Bridge e contexto da transação",
      equityBridge: "Equity Bridge",
      componente: "Componente",
      valor: "Valor",
      contextoEstrutura: "Contexto e estrutura da transação",
      parametro: "Parâmetro",
      detalhe: "Detalhe",
      motivoTransacao: "Motivo da transação",
      pctATransacionar: "Percentagem de capital a transacionar",
      estruturaPretendida: "Estrutura pretendida",
      horizonteTemporal: "Horizonte temporal",
      permanenciaAcionista: "Permanência do acionista",
      imovel: "Imóvel",
      tipoInvestidor: "Tipo de investidor preferencial",
      estrutura: "Estrutura",
      implicacao: "Implicação",
    },

    p9: {
      titulo: "Drivers de Valor & Riscos",
      driversValor: "Drivers de Valor",
      driver: "Driver",
      descricao: "Descrição",
      semDrivers: "Não foram identificados drivers de valor específicos com base na informação disponibilizada.",
      riscosMitigantes: "Riscos e mitigantes",
      risco: "Risco",
      evidenciaDisponivel: "Evidência disponível",
      impacto: "Impacto",
      mitigante: "Mitigante",
      semRiscos: "Não foram identificados riscos materiais específicos com base na informação disponibilizada.",
    },

    p12: {
      titulo: "Preparação para o mercado",
      planoPreparacao: "Plano de preparação priorizado",
      notaSecao: "Esta secção destina-se a quem está a considerar avançar com um processo de M&A. A nossa equipa pode ajudá-lo a preparar o negócio para maximizar o valor na venda. Contacte-nos para uma conversa inicial sem compromisso.",
      prioridade: "Prioridade",
      acao: "Ação",
      impactoEsperado: "Impacto esperado",
      esforco: "Esforço",
      recomendacoesImediatas: "Recomendações imediatas",
    },

    p13: {
      titulo: "Processo de M&A",
      hTitulo: "Como decorre um processo de M&A",
      notaSecao: "Esta secção destina-se a quem está a considerar avançar com um processo de M&A. A nossa equipa pode ajudá-lo a preparar o negócio para maximizar o valor na venda. Contacte-nos para uma conversa inicial sem compromisso.",
    },

    p14: {
      titulo: "Próximo passo e contactos",
      obrigado: "Obrigado.",
      lead: "Obrigado pelo seu tempo. Este relatório é um ponto de partida: a conversão de uma estimativa indicativa numa avaliação sustentada exige a validação dos números, a análise de transações comparáveis recentes e a leitura do apetite atual de investidores financeiros e estratégicos para o seu setor.",
      proximoPassoTitulo: "Próximo passo · Reunião de 20 minutos",
      proximoPassoDesc: "Revisão conjunta dos pressupostos deste relatório com a equipa da Lealia e apresentação do relatório completo.",
      agendarReuniao: "Agendar reunião",
      contactos: "Contactos",
      managingPartner: "Managing Partner",
      notaFinal: (empresa: string) =>
        `Documento de natureza indicativa, preparado exclusivamente para ${empresa}. Não constitui aconselhamento financeiro nem proposta contratual.`,
    },
  },
};

const en: typeof pt = {
  common: {
    naoIndicado: "Not provided",
    nao: "No",
    neutro: "Neutral",
    positivo: "Positive",
    negativo: "Negative",
    naoAplicavel: "n/a",
    tracoLongo: "—",
  },

  perfil: {
    atividadePrincipal: "Core activity",
    setor: "Sector",
    geografia: "Geography",
    unidadesLocalizacoes: "Units / locations",
    anosAtividade: "Years in operation",
    anosAtividadeValor: (n: number) => `${n} years`,
    colaboradores: "Employees",
    anoReferencia: "Reference year",
    periodoReferencia: "Reference period",
  },

  ponte: {
    enterpriseValueBase: "Base Enterprise Value",
    maisCaixa: "Plus: cash, deposits and other equivalents",
    menosDivida: "Less: total debt",
    maisImovel: "Plus: real estate within perimeter",
    equityValueBase: "Base Equity Value",
  },

  historico: {
    umAno: "One year of financial history was provided.",
    variosAnos: (n: number) => `${n} years of financial history were provided.`,
  },

  imovel: {
    propriedadeIncluida: "Company-owned · included in perimeter",
    propriedadeExcluida: "Company-owned · outside perimeter",
    arrendadoTerceiros: "Leased to third parties",
    incluidoPerimetro: "Included in perimeter",
    excluidoPerimetro: "Excluded from perimeter",
    arrendado: "Leased",
  },

  drivers: {
    crescimentoSustentado: {
      driver: "Sustained growth",
      descricao:
        "Revenue evolved positively over the period analysed. A demonstrated growth trajectory supports the upper end of the multiple range and reduces the relative weight of execution risk in the negotiation.",
    },
    dimensaoRelevante: {
      driver: "Relevant scale",
      descricao: (fat1: string, ebitda: string) =>
        `With revenue of ${fat1} and normalised EBITDA of ${ebitda}, the company sits above the scale threshold at which institutional investors and international strategic buyers compete actively, widening the pool of counterparties.`,
    },
    rendibilidadeAcimaMedia: {
      driver: "Above-average profitability",
      descricao: (margem: string) =>
        `The normalised EBITDA margin of ${margem} evidences pricing power and cost discipline, attributes that buyers reward with multiples above the sector benchmark.`,
    },
    conversaoCaixa: {
      driver: "Strong EBITDA-to-cash conversion",
      descricao: (capexRacio: string) =>
        `Recurring capex represents only ${capexRacio} of normalised EBITDA. A capital-light model frees up cash for acquisition debt service, which is decisive for financial buyers.`,
    },
    gestaoAutonoma: {
      driver: "Management independent of the shareholder",
      descricao:
        "The business operates with low reliance on the shareholder for day-to-day management. A second layer of leadership able to ensure continuity reduces transition risk and shortens the retention period required by the buyer.",
    },
    relacoesTransferiveis: {
      driver: "Transferable commercial relationships",
      descricao:
        "Revenue does not materially depend on the shareholder's personal relationships with clients, which reduces the likelihood of revenue erosion after closing and limits the need for earn-outs or additional guarantees.",
    },
    carteiraDiversificada: {
      driver: "Diversified client portfolio",
      descricaoTop5: (top5: number) => `The top five clients account for ${top5}% of revenue`,
      descricaoTop1: (top1: number) => `The largest client accounts for ${top1}% of revenue`,
      descricaoFim:
        ", a comfortable concentration level that reduces perceived commercial risk and eases pressure on the indemnity package.",
    },
    visibilidadeReceita: {
      driver: "Contracted revenue visibility",
      descricao: (backlog: string, racio: string) =>
        `The contracted backlog of ${backlog} equates to ${racio} of annual revenue, lending predictability to the business plan presented to the buyer.`,
    },
    modeloReplicavel: {
      driver: "Model replicable across units",
      descricao: (unidades: string) =>
        `Operations across ${unidades} demonstrate that the business model is replicable and does not rely on a single asset or team, supporting consolidation and post-acquisition expansion theses.`,
    },
    exposicaoInternacional: {
      driver: "International exposure",
      descricao: (geografia: string) =>
        `The client distribution (${geografia}) reduces reliance on a single market and makes the company relevant to foreign buyers seeking a presence in the region.`,
    },
    posicaoLiquida: {
      driver: "Net cash position",
      descricao: (valor: string) =>
        `The company holds a positive net cash position of ${valor}, which adds directly to Equity Value and strengthens the shareholder's negotiating position on the pricing mechanism.`,
    },
    trackRecord: {
      driver: "Established track record",
      descricao: (anos: number) =>
        `${anos} years of operation support the reading of business model resilience across different cycles and reduce the operational risk perceived by the buyer.`,
    },
    imovelValorizado: {
      driver: "Externally appraised real estate asset",
      descricao: (metodo: string, valor: string) =>
        `The owned property included in the perimeter is supported by ${metodo} (${valor}), adding to Equity Value with a value that is defensible in due diligence.`,
    },
  },

  recomendacoes: {
    reforcarGestao:
      "Strengthen the management team and document processes and commercial relationships, reducing reliance on the shareholder.",
    diversificarClientes: "Diversify the client base and formalise multi-year contracts with key clients.",
    avaliarReplicabilidade: "Assess the replicability of the model in other locations, demonstrating scale potential to the investor.",
    documentarCapex: "Document investment needs, distinguishing maintenance capex from growth capex.",
    prepararHistorico: "Prepare the financial history of the last three financial years together with supporting documentation.",
    definirImovel: "Decide in advance whether the property should be included in the transaction perimeter and obtain an independent valuation.",
    validarMargem: "Validate the EBITDA margin and the classification of items treated as extraordinary.",
    explicarContracao: "Prepare a well-supported explanation of the revenue contraction and the recovery plan.",
    validarComLealia: "Validate this indicative valuation with the Lealia Advisory Partners team before any market decision.",
  },

  resumo: {
    comResultado: (params: {
      equityMin: string;
      equityMax: string;
      evMin: string;
      evMax: string;
      ebitdaBase: string;
      multMin: string;
      multMax: string;
      ano: number;
      tipoPeriodo: string;
      fat1: string;
      margem: string | null;
    }) =>
      `Based on the data provided, we estimate an <strong>indicative value for shareholders of between ${params.equityMin} and ${params.equityMax}</strong>. ` +
      `The range results from an Enterprise Value of between ${params.evMin} and ${params.evMax}, ` +
      `calculated on normalised EBITDA of ${params.ebitdaBase} ` +
      `and an implied adjusted EV/EBITDA multiple of ${params.multMin}–${params.multMax}. ` +
      `In ${params.ano} (${params.tipoPeriodo}), the company reported revenue of ${params.fat1}` +
      `${params.margem !== null ? ` and an EBITDA margin of ${params.margem}` : ""}.`,
    semResultado:
      "Based on the information provided, it is not possible to present an indicative value using an EBITDA multiple. This report nonetheless presents the company's operating profile and the main applicable recommendations.",
  },

  mensagemAcionista: {
    historicoLimitado:
      "The main opportunity to preserve value ahead of a transaction lies in consolidating three reconciled financial years and documenting the EBITDA adjustments, reducing the information gaps that typically drive discounts in due diligence.",
    dependenciaAlta:
      "The main opportunity to create value lies in reducing reliance on the shareholder, by strengthening the management team and formalising commercial relationships in the company's name, increasing the transferability of the business.",
    concentracaoAlta:
      "The main opportunity to create value lies in diversifying the client portfolio and formalising contracts with the most relevant accounts, reducing the commercial risk perceived by the buyer.",
    padrao:
      "The main opportunity to create value lies in validating the quality of earnings, documenting the EBITDA adjustments and reducing information gaps that could otherwise drive a discount in due diligence.",
  },

  riscos: {
    historicoLimitado: {
      risco: "Limited financial history",
      evidenciaUm: "1 financial year provided",
      evidenciaVarios: (n: number) => `${n} financial years provided`,
      impacto: "Reduces confidence in the sustainability of results and may constrain the multiple",
      mitigante: "Prepare and reconcile financial information for the last three financial years",
    },
    dependenciaGestao: {
      risco: "Reliance on shareholder management",
      evidencia: (dep: string) => `Reliance on the shareholder for management: ${dep}`,
      impacto: "Increases transition risk and operational continuity risk after the transaction",
      mitigante: "Strengthen the management team and document key processes",
    },
    concentracaoClientes: {
      risco: "Client concentration",
      evidencia: (top5: number) => `Top five clients: ${top5}% of revenue`,
      impacto: "Increases exposure to the loss of key clients",
      mitigante: "Diversify the client portfolio and formalise multi-year contracts",
    },
    dependenciaComercial: {
      risco: "Commercial reliance on the shareholder",
      evidencia: (dep: string) => `Reliance on the shareholder for revenue generation: ${dep}`,
      impacto: "Reduces the transferability of commercial relationships after the transaction",
      mitigante: "Transfer key accounts to account managers and contract in the company's name",
    },
    localizacaoUnica: {
      risco: "Single-site operation",
      evidencia: "Activity concentrated in a single site",
      impacto: "Limits scalability and concentrates operational and geographic risk",
      mitigante: "Assess model replicability and expansion plans for new locations",
    },
    posicaoLiquidaElevada: {
      risco: "High net debt position",
      evidencia: (racio: string) => `Net debt equivalent to ${racio} normalised EBITDA`,
      evidenciaSemDados: "Net debt equivalent to — normalised EBITDA",
      impacto: "Reduces Equity Value and may limit acquisition financing",
      mitigante: "Reduce debt, optimise cash and prepare an updated financial statement",
    },
    capexElevado: {
      risco: "High capex",
      evidencia: (capex: string) => `Recurring capex of ${capex} relative to normalised EBITDA`,
      impacto: "Limits the conversion of EBITDA into cash generation",
      mitigante: "Separate maintenance capex from growth capex and validate future needs",
    },
    imovelSemAvaliacao: {
      risco: "Owned property without an independent valuation",
      evidencia: (metodo: string) => `Valuation method indicated: ${metodo}`,
      impacto: "Introduces uncertainty into Equity Value when the property is included in the perimeter",
      mitigante: "Obtain an independent valuation and define the transaction perimeter",
    },
    ajustamentosPorValidar: {
      risco: "EBITDA adjustments pending validation",
      evidencia: (valor: string) => `Adjustments of ${valor} declared without supporting documentation`,
      impacto: "May result in discounts or adjustments during due diligence",
      mitigante: "Prepare an accounting reconciliation and supporting documentation",
    },
    contracaoFaturacao: {
      risco: "Revenue contraction",
      evidencia: "Negative revenue trend over the period indicated",
      impacto: "May constrain the applicable multiple and the reading of sustainability",
      mitigante: "Document the causes and evidence the turnaround through recent indicators",
    },
    niveis: { alto: "High", medio: "Medium", baixo: "Low" },
  },

  plano: {
    consolidarHistorico: "Consolidate three years of reconciled financial information",
    reconciliarEbitda: "Reconcile reported and normalised EBITDA and document the adjustments",
    confirmarDivida: "Confirm total debt and cash, deposits and other equivalents available at the reference date",
    analisarFundoManeio: "Analyse normative working capital and the seasonality of the business",
    reduzirDependencia: "Reduce reliance on the shareholder and create a succession plan",
    mapearConcentracao: "Map client concentration and formalise relevant contracts",
    separarCapex: "Separate maintenance capex from growth capex",
    definirImovel: "Define the treatment of the property and obtain an independent valuation",
    demonstrarReplicabilidade: "Demonstrate the replicability of the model in other locations",
    definirEstrutura: "Define the transaction structure and the intended perimeter",
    prioridade: { alta: "High", media: "Medium" },
    impacto: { alto: "High", muitoAlto: "Very high", medioAlto: "Medium/high", medio: "Medium" },
    esforco: { alto: "High", medio: "Medium", baixo: "Low" },
    prazo: {
      semanas2a6: "2-6 weeks",
      semanas1a3: "1-3 weeks",
      semanas1a2: "1-2 weeks",
      semanas2a4: "2-4 weeks",
      meses3a12: "3-12 months",
      semanas4a8: "4-8 weeks",
      meses6a12: "6-12 months",
    },
  },

  implicacoesParticipacao: {
    minoritaria:
      "In a minority stake there is no control premium, and the investor mainly values governance, exit rights and the growth plan. The value per share often reflects a minority discount.",
    maioritaria:
      "In a majority sale the buyer takes control and tends to pay a control premium, in exchange typically requiring management continuity and alignment mechanisms such as an earn-out or a rollover of part of the capital.",
    totalidade:
      "In a full sale the buyer typically pays a control premium, but requires a transition period, client continuity guarantees and a broader package of representations and warranties.",
    indefinida:
      "The percentage to be sold has not yet been defined. This decision shapes the universe of investors, the existence of a control premium and the payment structure.",
  },

  limitacoes: {
    infoDeclarada: "The estimate relies exclusively on the information declared, without documentary verification or audit.",
    fundoManeio: "No analysis of normative working capital or business seasonality was performed.",
    transacoesComparaveis: "No specific comparable transactions or current investor appetite for the asset were analysed.",
    historicoInferior: "The financial history available covers fewer than three financial years.",
    setorGenerico: "No sector-specific multiples are available for the sector indicated; a generic market reference was used.",
    periodoNaoEncerrado: "The reference period does not correspond to closed accounts, which increases the uncertainty of the estimate.",
  },

  qualidade: {
    notaUmAno:
      "With only one financial period, it is not possible to robustly assess growth, margin stability, cash conversion or the sustainability of EBITDA. This limitation reduces confidence in the valuation and may constrain the applicable multiple.",
    margensEstaveis: "EBITDA margins remained stable over the period analysed, supporting the reading of earnings recurrence.",
    margensModeradas: "EBITDA margins show moderate variation over the period analysed, warranting validation of the factors explaining the fluctuation.",
    margensRelevantes: "EBITDA margins show significant variation over the period analysed, which requires a documented explanation in due diligence.",
    conversaoCaixaComCapex: (capex: string, pct: string) =>
      `After recurring capex of ${capex}, the indicative conversion of EBITDA into operating cash is ${pct}, before working capital, interest and taxes. Limitation: without a breakdown between maintenance and growth capex, the free cash flow underlying the valuation remains subject to correction in due diligence.`,
    conversaoCaixaSemCapex:
      "No recurring capex was indicated. Limitation: without this data it is not possible to estimate the conversion of EBITDA into cash, which reduces the reliability of the value calculated and tends to translate into a discount by a buyer.",
    fundoManeio:
      "Working capital has not been analysed at this stage. Limitation: without normalising working capital it is not possible to precisely set the bridge between Enterprise Value and Equity Value, which may give rise to euro-for-euro closing adjustments to the final price.",
    backlog: (valor: string) =>
      `A contracted backlog of ${valor} was indicated. Limitation: without detail on margins, delivery timelines and cancellation terms, revenue visibility was not incorporated quantitatively into the valuation — it was only considered qualitatively.`,
    concentracaoTop5: (top5: number) => `Commercial concentration: the top five clients account for ${top5}% of revenue`,
    concentracaoTop1: (top1: number) => ` and the largest client for ${top1}%`,
    concentracaoFim: ". Limitation: reliance on a few clients increases the perceived risk of revenue and directly constrains the multiple applicable in the valuation.",
    ajustamentosDeclarados: (valor: string) =>
      `Non-recurring adjustments of ${valor} were declared. Limitation: until validated with supporting documentation, the adjusted EBITDA — and consequently the valuation range presented — remains subject to revision.`,
    ajustamentosNaoDeclarados:
      "No non-recurring adjustments to EBITDA were declared. Limitation: any normalisation identified in due diligence (shareholder remuneration, off-market rents, non-recurring income) could change the base EBITDA and the value calculated.",
  },

  alertas: {
    umPeriodo: "Only one financial period was provided. The growth and margin stability analysis is not conclusive.",
    ajustamentosSemSuporte: 'There are EBITDA adjustments without supporting documentation. They should be classified as "to be validated in due diligence".',
    fundoManeioNaoAnalisado: "Working capital has not been analysed. Equity Value may be affected by closing adjustments.",
    imovelSemAvaliacao: "The property value was entered without an independent valuation. Equity Value may change materially.",
    imovelSemValor: "The property was included in the perimeter without a stated value, so it was not added to Equity Value.",
    periodoNaoClassificado: "The reference financial period has not been classified (closed accounts, estimate or budget).",
    concentracaoInconsistente: "The share of the top five clients is lower than that of the largest client. The data should be reviewed.",
    minoritariaAtencao: "The value of a minority stake does not correspond to a simple proportion of the 100% Equity Value.",
  },

  implicacoesEstrutura: {
    venda50: { estrutura: "Sale of 50%–51%", implicacao: "Requires clear governance rules and a shareholders' agreement" },
    venda60: { estrutura: "Sale of 60%–80%", implicacao: "Buyer obtains control; a significant rollover may apply" },
    venda90: { estrutura: "Sale of 90%", implicacao: "Residual stake requires protection and exit rules" },
    venda100: { estrutura: "Sale of 100%", implicacao: "Simpler structure; management continuity becomes critical" },
  },

  notas: {
    equity: "The Equity Value presented is indicative and calculated before closing adjustments, working capital normalisation, contingencies, applicable taxes and due diligence validation.",
    minoria: "The value of a minority stake should not be assumed to be a simple proportion of the 100% Equity Value. The value may vary depending on control, governance rights, liquidity and the transaction structure.",
  },

  engine: {
    ajustes: {
      volumeNegocios: {
        label: "Business volume",
        abaixo5M: "Revenue below €5M",
        entre5e20M: "Revenue between €5M and €20M",
        acima20M: "Revenue of €20M or more",
      },
      dimensaoResultados: {
        label: "Scale of earnings",
        abaixo2M: "Normalised EBITDA below €2M",
        acimaIgual2M: "Normalised EBITDA of €2M or more",
      },
      idadeEmpresa: {
        label: "Company age",
        menos3: "Less than 3 years",
        mais10: "More than 10 years",
        entre3e10: "Between 3 and 10 years",
      },
      crescimento: {
        label: "Growth",
        historicoInsuficiente: "Insufficient history",
        emQueda: "Revenue declining versus the earliest year indicated",
        acumulado: (pct: string) => `Cumulative growth of ${pct}%`,
        ate10: "Cumulative growth of up to 10%",
      },
      unidades: {
        label: "Units / locations",
        naoIndicado: "Not indicated",
        unica: "Operation concentrated in a single location",
        maisDe3: "Multi-unit operation (more than 3 locations)",
        naoAplicavel: "Not applicable to the business model",
        entre2e3: "Operation across 2-3 locations",
      },
      concentracaoClientes: {
        label: "Client concentration",
        naoIndicada: "Not indicated",
        diversificada: "Diversified client base",
        moderada: "Moderate concentration in the top 5 clients",
        forte: "Strong reliance on the top 5 clients",
      },
      geografia: {
        label: "Client geography",
        naoIndicada: "Not indicated",
        equilibrio: "National/international balance",
      },
      depFaturacao: {
        label: "Reliance on the shareholder (revenue)",
        naoIndicada: "Not indicated",
        baixa: "Portfolio not heavily reliant on the shareholder",
        alta: "Strong commercial reliance on the shareholder",
        moderada: "Moderate reliance on the shareholder",
      },
      depGestao: {
        label: "Reliance on the shareholder (management)",
        naoIndicada: "Not indicated",
        baixa: "Management independent of the shareholder",
        alta: "Management heavily centred on the shareholder",
        moderada: "Moderate reliance on the shareholder",
      },
      capex: {
        label: "Investment intensity (capex)",
        naoIndicada: "Not indicated",
        reduzido: "Low recurring capex relative to revenue",
        relevante: "Significant recurring capex relative to revenue",
        elevado: "High recurring capex relative to revenue",
      },
    },
    cenarios: {
      conservador: "Financial buyer, no strategic premium; multiple at the lower end of the adjusted range.",
      base: "Normal process, prepared financial information and assured operational continuity.",
      otimista: "Strategic buyer with identified synergies, multiple interested parties and prior deal preparation.",
    },
    linhasEbitda: {
      reportado: (ano: number) => `Reported EBITDA ${ano}`,
      despesasExtraordinarias: "Non-recurring extraordinary expenses",
      rendaTeorica: "Theoretical market rent (owned property)",
      acrescimoRenda: "Rent increase to market value",
      normalizado: "Normalised EBITDA",
    },
    dimensoes: {
      historicoFinanceiro: "Financial history",
      qualidadeEbitda: "EBITDA quality",
      posicaoFinanceira: "Financial position",
      enquadramentoSetorial: "Sector framing",
      perfilRisco: "Risk profile",
    },
    itensConfianca: {
      faturacaoAnoReferencia: "Reference-year revenue",
      faturacaoAnoAnterior: "Prior-year revenue",
      faturacaoTresAnos: "Revenue three years ago",
      ebitdaAnoAnterior: "Prior-year EBITDA",
      ebitdaTresAnos: "EBITDA three years ago",
      tipoPeriodoReferencia: "Type of reference period",
      despesasExtraordinariasIdentificadas: "Extraordinary expenses identified",
      enquadramentoImovel: "Operating property arrangement",
      capexAnualRecorrente: "Recurring annual capex",
      caixaDepositos: "Cash and deposits",
      dividaFinanceira: "Financial debt",
      industriaIdentificada: "Industry identified",
      subindustriaIdentificada: "Sub-industry identified",
      atividadePrincipalDescrita: "Core activity described",
      concentracaoTop5: "Concentration of top 5 clients",
      pesoMaiorCliente: "Weight of the largest client",
      unidadesLocalizacoes: "Units / locations",
      geografiaClientes: "Client geography",
      depFaturacao: "Reliance on the shareholder (revenue)",
      depGestao: "Reliance on the shareholder (management)",
    },
    confExplicacao: {
      baixa: "Low confidence — the estimate was calculated with limited information.",
      media: "Medium confidence — relevant information exists, but some additional data could improve the analysis.",
      alta: "High confidence — the information provided covers the critical dimensions of a preliminary valuation.",
    },
  },

  doc: {
    disclaimer:
      "This report constitutes an indicative estimate of the company's valuation, generated on the basis of information provided by the user. It does not constitute financial advice, a contractual proposal, an investment recommendation or a formal valuation for legal, tax or accounting purposes; the values presented depend on the quality and accuracy of the data entered and on market conditions prevailing on the date this document was prepared.",
    footer: (empresa: string) => `Lealia Advisory Partners · Indicative Valuation Report${empresa ? ` for ${empresa}` : ""}`,
    efeito: { neutro: "Neutral", positivo: "Positive", negativo: "Negative" },

    waterfall: {
      caption: "Equity Bridge · € thousands",
      ariaLabel: "Equity Bridge waterfall chart",
      enterpriseValue: "Enterprise Value",
      equityValue: "Equity Value",
      divida: "Debt",
      caixa: "Cash",
      imovel: "Property",
    },

    dcf: {
      titulo: "DCF Valuation",
      hTitulo: "Discounted cash flow valuation",
      semDados: "It is not possible to present a DCF analysis with the information provided. In particular, the estimated cost of capital must be higher than the perpetuity growth rate.",
      mapaFluxos: "Cash flow map",
      unidadeMilhares: "€ thousands",
      linha: "Line",
      tv: "TV",
      receita: "Revenue",
      ebitda: "EBITDA",
      margemEbitda: "EBITDA margin",
      da: "(−) D&A",
      ebit: "= EBIT",
      impostoEbit: "(−) Tax on EBIT",
      nopat: "= NOPAT",
      maisDa: "(+) D&A",
      menosCapex: "(−) Capex",
      fcff: "= Unlevered FCFF",
      fatorDesconto: "Discount factor",
      pvFcff: "= PV of FCFF",
      legenda: "A = historical year · F = forecast year · TV = terminal value. Unlevered flow: financing is reflected in the cost of capital and in net debt. TV based on a perpetuity of the year-8 FCFF.",
      pressupostosForecast: "Forecast assumptions",
      crescimentoInicial: "Initial growth",
      anoEstabilizacao: "Stabilisation year",
      anoN: (n: number) => `Year ${n}`,
      crescimentoEstabilizado: "Stabilised growth",
      crescimentoPerpetuidade: "Perpetuity growth",
      margemEbitdaProjetada: "Projected EBITDA margin",
      capexPctReceita: "Capex (% of revenue)",
      daPctReceita: "D&A (% of revenue)",
      fundoManeio: "Working capital",
      naoProjetado: "Not projected",
      taxaImposto: "Tax rate (CIT)",
      indicadoresAvaliacao: "Valuation indicators",
      enterpriseValue: "Enterprise Value",
      equityValue: "Equity Value",
      evEbitdaImplicito: "Implied EV / EBITDA",
      evReceitaImplicito: "Implied EV / Revenue",
      wacc: "Weighted average cost of capital",
      riskFree: "Risk-free rate (Rf)",
      beta: "Unlevered / levered beta (β)",
      erp: "Equity Risk Premium (ERP)",
      crp: "Country Risk Premium (CRP)",
      premioDimensao: "Size premium (SME)",
      premioEspecifico: "Specific premium (illiquidity)",
      premioAtivoEspecifico: "Asset-specific premium",
      costOfEquity: "Cost of Equity (Ke)",
      costOfDebt: "Cost of Debt pre / post tax (Kd)",
      pesoEquityDivida: "Equity / debt weight (E / D)",
      waccLabel: "WACC",
      resultados: "Results",
      pvExplicito: "PV of explicit forecast (8 years)",
      pvTerminal: "PV of terminal value",
      pesoTerminal: "Weight of terminal value in EV",
      ajusteDividaLiquida: "Net debt adjustment",
      imovel: "Property",
      notaCustoCapital: (pais: string, citNota: string, extra: string) =>
        `Cost of capital estimated on a prudent basis: size and illiquidity premiums are added to sector references, since an unlisted SME carries higher risk than listed sector peers. Beta, ERP, CRP, capital structure and spread are sector proxies; ${pais} CIT (${citNota})${extra ? ` ${extra}` : ""}`,
    },

    sensitivity: {
      titulo: "Sensitivity Analysis",
      hTitulo: "Sensitivity analysis",
      semDados: "No DCF analysis is available, so the sensitivity matrices cannot be presented.",
      sensibilidadeEv: "Enterprise Value sensitivity",
      notaMatriz: "The highlighted cell corresponds to the base scenario presented on the previous slide. The matrices isolate the effect of each variable, holding the remaining assumptions constant.",
      transparenciaPressupostos: "Assumption transparency",
      introTransparencia: "The model's assumptions combine the information entered in the form with sector market references, following a conservative criterion — when in doubt, the value that results in a more prudent valuation is adopted. The table below sets out the valuation's structuring assumptions and their source or derivation method.",
      parametro: "Parameter",
      valor: "Value",
      metodoFonte: "Method / source",
    },

    lockedPages: {
      p4: "Scope and limitations",
      p5: "Method and alternatives",
      p6: "Multiple adjustments",
      p7: "Scenarios and sensitivity",
      p8: "Equity Bridge and transaction context",
      p9: "Value Drivers & Risks",
      p10: "DCF Valuation",
      p11: "Sensitivity Analysis",
      p12: "Market preparation",
      p13: "M&A process",
    },
    conteudoReservado: "Reserved content",
    lockedTexto: "This section is part of the full report. Schedule a 20-minute meeting with the Lealia team to view the full analysis and discuss the results.",
    lockedCta: "Schedule a meeting to view the full report",

    cover: {
      titulo: "Preliminary Valuation",
      preparadoPara: "Prepared for",
      data: "Date",
    },

    p2: {
      titulo: "Executive summary",
      evIndicativo: "Indicative Enterprise Value",
      equityIndicativo: "Indicative Equity Value",
      faturacaoAno: "Reference-year revenue",
      ebitdaNormalizado: "Normalised EBITDA",
      margemNormalizada: "Normalised EBITDA margin",
      multiploImplicito: "Implied multiple",
      posicaoLiquida: "Net Position",
      posicaoLiquidaHint: "cash / (debt)",
      completudeInformacao: "Information completeness",
      metodologia: "Valuation methodology",
      metodo1Titulo: "Determining normalised EBITDA",
      metodo1: (ebitda: string) =>
        `EBITDA reported for the last reference financial year, excluding the impact of non-recurring extraordinary expenses and, where applicable, factoring in a theoretical adjustment of property rent to market levels. Normalised EBITDA is ${ebitda}.`,
      metodo2Titulo: "Base sector multiple",
      metodo2: "Set by reference to the multiples applied in recent, comparable transactions in the sector and region.",
      metodo3Titulo: "Profile and risk adjustments",
      metodo3: "Scale, maturity, growth, revenue recurrence, client concentration, geography, reliance on the shareholder and investment intensity, subject to an overall cap applied to the combined adjustments.",
      metodo4Titulo: "Equity Bridge",
      metodo4: "Cash, deposits and other equivalents are added to Enterprise Value, total debt is deducted, and, where applicable, the property included in the transaction perimeter and the pro-forma cash impact of disposing of non-operating assets are added, arriving at Equity Value before closing adjustments.",
    },

    p3: {
      titulo: "Company profile and other indicators",
      perfilEmpresa: "Company profile",
      indicador: "Indicator",
      valor: "Value",
      historicoFinanceiro: "Financial history",
      ano: "Year",
      faturacao: "Revenue",
      ebitda: "EBITDA",
      extraordinarios: "Extraordinary items",
      normalizacoes: "Normalisations",
      cagrFaturacao: "Revenue CAGR",
      cagrEbitda: "Normalised EBITDA CAGR",
      semInfoSuficiente: "Insufficient information",
      normalizacaoEbitda: "EBITDA normalisation",
      linha: "Line",
      notaNormalizacao: "The normalisation adjustments approximate recurring operating income under a post-transaction scenario.",
      outrosIndicadores: "Other indicators",
      caixaDepositos: "Cash, deposits and other equivalents",
      dividaTotal: "Total debt",
      capexAnual: "Recurring annual capex",
      unidadesLocalizacoes: "Units / locations",
      concentracaoMaiorCliente: "% Concentration in largest client",
      concentracaoTop5: "% Concentration in top 5 clients",
      clientesAtivos: "Active clients",
    },

    p4: {
      titulo: "Scope and limitations",
      hTitulo: "Scope and limitations of this report",
      naturezaDocumento: "Nature of the document",
      natureza1: "This is a preliminary indicative valuation, prepared exclusively from information provided by the user, without independent verification, audit or review of the data.",
      natureza2: "It does not constitute financial, tax, accounting or legal advice, nor an investment or divestment recommendation.",
      natureza3: "It does not constitute a formal valuation (fairness opinion) for legal, tax, accounting or regulatory purposes, nor a contractual proposal or binding offer.",
      natureza4: "This document is intended solely for the use of the recipient identified on the cover page and must not be disclosed to third parties without the written authorisation of Lealia Advisory Partners.",
      limitacoesFatores: "Limitations and factors of variation",
      limitacao1: "The values presented depend on the quality, accuracy and completeness of the data entered. Incomplete or incorrect data will materially change the result.",
      limitacao2: "The market references used reflect conditions prevailing on the date of preparation and may change rapidly with the macroeconomic, sector and financing context.",
      limitacao3: "The actual transaction price depends on the buyer's profile, the deal structure, the guarantees, closing adjustments and the negotiation process.",
      limitacao4: "A definitive valuation requires financial, tax, legal and operational due diligence, as well as documentary validation of the EBITDA adjustments.",
      semResponsabilidade: "Lealia Advisory Partners assumes no responsibility for decisions made based solely on this document.",
      leituraComplementar: "Further reading",
      leituraFinal: "Seasonality and maintenance capex relative to growth capex have not been broken down at this stage. Limitation: without this analysis it is not possible to assess the monthly recurrence of results or the sustainability of cash flow, so the value calculated does not reflect any seasonal peaks or treasury needs.",
    },

    p5: {
      titulo: "Method and alternatives",
      porqueMultiplos: "Why EBITDA multiples",
      par1: "Multiples-based valuation is a market approach: a company's value is inferred from prices paid by investors in recent transactions for companies with a comparable profile. In SME M&A, EBITDA is commonly used as the reference metric because it reflects the capacity to generate operating results before the impact of financing structure, depreciation policy and the tax regime.",
      par2: "It is also the most appropriate method for a preliminary estimate: it requires few discretionary assumptions, is transparent and directly reflects current market appetite for the sector. Its limitation is dependence on the quality of the comparables and the fact that it captures a snapshot of the current business rather than a future growth plan.",
      par3: "EV/EBITDA tends to be most appropriate for companies with positive EBITDA, relatively stable operations and cost structures comparable to the companies used as reference. It is less informative when the company reports negative or highly volatile operating results, when there are significant differences in growth or margin relative to the comparables, or when the business is undergoing significant transformation.",
      par4: "Multiples-based valuation is thus a simple, transparent and market-aligned reference, particularly useful when solid comparables exist and to support an initial estimate of value. Its main limitation is its dependence on the quality of those comparables and the fact that it does not, on its own, reflect the future potential of the business.",
      nota: "In an actual transaction, multiples are the starting point of the negotiation and are subsequently tested against a cash flow analysis and due diligence.",
      metodosAlternativos: "Alternative methods",
      dcfTitulo: "DCF - discounted cash flows",
      dcfNota: "(see slides 10 & 11)",
      dcfDesc: "Projects future cash flows and discounts them at a rate reflecting the cost of capital (WACC). It is the most rigorous method when a credible business plan exists, but it is highly sensitive to the underlying assumptions.",
      outrosMultiplosTitulo: "Other transaction multiples",
      outrosMultiplosDesc: "In addition to EV/EBITDA, multiples such as EV/Revenue, EV/EBIT or P/E may be used, depending on the sector, maturity and profitability of the company. Their relevance depends on the comparability of the companies and the quality of the information available.",
      metricasSetorTitulo: "Sector-specific metrics",
      metricasSetorDesc: "Complements financial multiples with operating metrics relevant to each business, such as value per unit, client, bed, subscriber or square metre. Particularly useful in sectors where these indicators more directly explain the company's economic potential.",
      valorPatrimonialTitulo: "Asset value / liquidation",
      valorPatrimonialDesc: "Values net assets at their market value. Relevant for asset-intensive businesses, acting as a reference floor value.",
    },

    p6: {
      titulo: "Multiple adjustments",
      hTitulo: "Adjustments applied to the sector multiple",
      fator: "Factor",
      leitura: "Assessment",
      efeito: "Effect",
      semAjustes: "No adjustments were applied to the base sector multiple.",
      nota: "The combined adjustments are capped within an overall range of −40% to +35% of the base sector multiple, preventing the combination of factors from producing extreme results. All factors are based on declared information and require documentary validation.",
    },

    p7: {
      titulo: "Scenarios and sensitivity",
      cenariosValorizacao: "Valuation scenarios",
      cenario: "Scenario",
      pressupostos: "Assumptions",
      multiplo: "Multiple",
      enterpriseValue: "Enterprise Value",
      equityValue: "Equity Value",
      semCenarios: "No scenarios available for the data provided.",
      sensibilidadeEv: "Enterprise Value sensitivity",
      variacaoEbitda: "EBITDA variation",
      ebitda: "EBITDA",
      notaSensibilidade: "The table shows how Enterprise Value responds to variations in normalised EBITDA and the multiple applied. Equity Value moves accordingly, adjusted for total debt, cash, deposits and other equivalents, and the property indicated in the equity bridge.",
      semSensibilidade: "No sensitivity analysis available.",
    },

    p8: {
      titulo: "Equity Bridge and transaction context",
      equityBridge: "Equity Bridge",
      componente: "Component",
      valor: "Value",
      contextoEstrutura: "Transaction context and structure",
      parametro: "Parameter",
      detalhe: "Detail",
      motivoTransacao: "Reason for the transaction",
      pctATransacionar: "Percentage of capital to be sold",
      estruturaPretendida: "Intended structure",
      horizonteTemporal: "Time horizon",
      permanenciaAcionista: "Shareholder retention",
      imovel: "Property",
      tipoInvestidor: "Preferred investor type",
      estrutura: "Structure",
      implicacao: "Implication",
    },

    p9: {
      titulo: "Value Drivers & Risks",
      driversValor: "Value Drivers",
      driver: "Driver",
      descricao: "Description",
      semDrivers: "No specific value drivers were identified based on the information provided.",
      riscosMitigantes: "Risks and mitigants",
      risco: "Risk",
      evidenciaDisponivel: "Available evidence",
      impacto: "Impact",
      mitigante: "Mitigant",
      semRiscos: "No specific material risks were identified based on the information provided.",
    },

    p12: {
      titulo: "Market preparation",
      planoPreparacao: "Prioritised preparation plan",
      notaSecao: "This section is intended for those considering moving forward with an M&A process. Our team can help you prepare the business to maximise value at sale. Contact us for an initial no-obligation conversation.",
      prioridade: "Priority",
      acao: "Action",
      impactoEsperado: "Expected impact",
      esforco: "Effort",
      recomendacoesImediatas: "Immediate recommendations",
    },

    p13: {
      titulo: "M&A process",
      hTitulo: "How an M&A process unfolds",
      notaSecao: "This section is intended for those considering moving forward with an M&A process. Our team can help you prepare the business to maximise value at sale. Contact us for an initial no-obligation conversation.",
    },

    p14: {
      titulo: "Next step and contacts",
      obrigado: "Thank you.",
      lead: "Thank you for your time. This report is a starting point: turning an indicative estimate into a substantiated valuation requires validating the figures, analysing recent comparable transactions and reading current appetite among financial and strategic investors for your sector.",
      proximoPassoTitulo: "Next step · 20-minute meeting",
      proximoPassoDesc: "A joint review of this report's assumptions with the Lealia team and presentation of the full report.",
      agendarReuniao: "Schedule a meeting",
      contactos: "Contacts",
      managingPartner: "Managing Partner",
      notaFinal: (empresa: string) =>
        `This is an indicative document, prepared exclusively for ${empresa}. It does not constitute financial advice or a contractual proposal.`,
    },
  },
};

const es: typeof pt = {
  common: {
    naoIndicado: "No indicado",
    nao: "No",
    neutro: "Neutro",
    positivo: "Positivo",
    negativo: "Negativo",
    naoAplicavel: "n.d.",
    tracoLongo: "—",
  },

  perfil: {
    atividadePrincipal: "Actividad principal",
    setor: "Sector",
    geografia: "Geografía",
    unidadesLocalizacoes: "Unidades / ubicaciones",
    anosAtividade: "Años de actividad",
    anosAtividadeValor: (n: number) => `${n} años`,
    colaboradores: "Empleados",
    anoReferencia: "Año de referencia",
    periodoReferencia: "Periodo de referencia",
  },

  ponte: {
    enterpriseValueBase: "Enterprise Value base",
    maisCaixa: "Más: caja, depósitos y otros equivalentes",
    menosDivida: "Menos: deuda total",
    maisImovel: "Más: inmueble dentro del perímetro",
    equityValueBase: "Equity Value base",
  },

  historico: {
    umAno: "Se facilitó un año de histórico financiero.",
    variosAnos: (n: number) => `Se facilitaron ${n} años de histórico financiero.`,
  },

  imovel: {
    propriedadeIncluida: "Propiedad de la empresa · incluido en el perímetro",
    propriedadeExcluida: "Propiedad de la empresa · fuera del perímetro",
    arrendadoTerceiros: "Arrendado a terceros",
    incluidoPerimetro: "Incluido en el perímetro",
    excluidoPerimetro: "Excluido del perímetro",
    arrendado: "Arrendado",
  },

  drivers: {
    crescimentoSustentado: {
      driver: "Crecimiento sostenido",
      descricao:
        "La facturación evolucionó positivamente en el periodo analizado. Las trayectorias de crecimiento demostradas respaldan la parte alta del rango de múltiplos y reducen el peso relativo del riesgo de ejecución en la negociación.",
    },
    dimensaoRelevante: {
      driver: "Dimensión relevante",
      descricao: (fat1: string, ebitda: string) =>
        `Con una facturación de ${fat1} y un EBITDA normalizado de ${ebitda}, la empresa se sitúa por encima del umbral de tamaño a partir del cual inversores institucionales y compradores estratégicos internacionales compiten activamente, ampliando el universo de contrapartes.`,
    },
    rendibilidadeAcimaMedia: {
      driver: "Rentabilidad superior a la media",
      descricao: (margem: string) =>
        `El margen EBITDA normalizado del ${margem} evidencia poder de fijación de precios y disciplina de costes, atributos que los compradores retribuyen con múltiplos superiores a la referencia sectorial.`,
    },
    conversaoCaixa: {
      driver: "Fuerte conversión de EBITDA en caja",
      descricao: (capexRacio: string) =>
        `El capex recurrente representa solo el ${capexRacio} del EBITDA normalizado. Un modelo poco intensivo en inversión libera caja para el servicio de la deuda de adquisición, un factor determinante para los compradores financieros.`,
    },
    gestaoAutonoma: {
      driver: "Gestión autónoma del accionista",
      descricao:
        "La operación funciona con baja dependencia del accionista en la gestión diaria. La existencia de una segunda línea capaz de garantizar la continuidad reduce el riesgo de transición y acorta los periodos de permanencia exigidos por el comprador.",
    },
    relacoesTransferiveis: {
      driver: "Relaciones comerciales transferibles",
      descricao:
        "La facturación no depende de forma material de la relación personal del accionista con los clientes, lo que reduce la probabilidad de erosión de ingresos tras el cierre y limita la necesidad de earn-outs o garantías adicionales.",
    },
    carteiraDiversificada: {
      driver: "Cartera de clientes diversificada",
      descricaoTop5: (top5: number) => `Los cinco mayores clientes representan el ${top5}% de la facturación`,
      descricaoTop1: (top1: number) => `El mayor cliente representa el ${top1}% de la facturación`,
      descricaoFim:
        ", un nivel de concentración cómodo que reduce el riesgo comercial percibido y disminuye la presión sobre el paquete de garantías.",
    },
    visibilidadeReceita: {
      driver: "Visibilidad de ingresos contratados",
      descricao: (backlog: string, racio: string) =>
        `El backlog contratado de ${backlog} equivale al ${racio} de la facturación anual, aportando previsibilidad al plan de negocio presentado al comprador.`,
    },
    modeloReplicavel: {
      driver: "Modelo replicable en varias unidades",
      descricao: (unidades: string) =>
        `La operación en ${unidades} demuestra que el modelo de negocio es replicable y no depende de un único activo o equipo, lo que respalda tesis de consolidación y de expansión tras la adquisición.`,
    },
    exposicaoInternacional: {
      driver: "Exposición internacional",
      descricao: (geografia: string) =>
        `La distribución de clientes (${geografia}) reduce la dependencia de un único mercado y hace a la empresa relevante para compradores extranjeros que buscan presencia en la región.`,
    },
    posicaoLiquida: {
      driver: "Posición de caja neta",
      descricao: (valor: string) =>
        `La empresa presenta una posición de caja neta positiva de ${valor}, lo que se suma directamente al Equity Value y refuerza la capacidad negociadora del accionista respecto al mecanismo de precio.`,
    },
    trackRecord: {
      driver: "Trayectoria consolidada",
      descricao: (anos: number) =>
        `${anos} años de actividad respaldan la lectura de resiliencia del modelo de negocio a lo largo de distintos ciclos y reducen el riesgo operativo percibido por el comprador.`,
    },
    imovelValorizado: {
      driver: "Activo inmobiliario valorado externamente",
      descricao: (metodo: string, valor: string) =>
        `El inmueble propio incluido en el perímetro está respaldado por ${metodo} (${valor}), lo que se suma al Equity Value con un valor defendible en la due diligence.`,
    },
  },

  recomendacoes: {
    reforcarGestao:
      "Reforzar el equipo directivo y documentar los procesos y las relaciones comerciales, reduciendo la dependencia del accionista.",
    diversificarClientes: "Diversificar la base de clientes y formalizar contratos plurianuales con los principales clientes.",
    avaliarReplicabilidade: "Evaluar la replicabilidad del modelo en otras ubicaciones, demostrando el potencial de escala al inversor.",
    documentarCapex: "Documentar las necesidades de inversión, distinguiendo el capex de mantenimiento del capex de expansión.",
    prepararHistorico: "Preparar el histórico financiero de los últimos tres ejercicios y la documentación de soporte correspondiente.",
    definirImovel: "Definir con antelación si el inmueble debe integrar el perímetro de la transacción y obtener una valoración independiente.",
    validarMargem: "Validar el margen EBITDA y la clasificación de las partidas consideradas extraordinarias.",
    explicarContracao: "Preparar una explicación fundamentada de la contracción de la facturación y del plan de recuperación.",
    validarComLealia: "Validar esta valoración indicativa con el equipo de Lealia Advisory Partners antes de tomar cualquier decisión de mercado.",
  },

  resumo: {
    comResultado: (params: {
      equityMin: string;
      equityMax: string;
      evMin: string;
      evMax: string;
      ebitdaBase: string;
      multMin: string;
      multMax: string;
      ano: number;
      tipoPeriodo: string;
      fat1: string;
      margem: string | null;
    }) =>
      `Con base en los datos facilitados, se estima un <strong>valor indicativo para los accionistas de entre ${params.equityMin} y ${params.equityMax}</strong>. ` +
      `El rango resulta de un Enterprise Value de entre ${params.evMin} y ${params.evMax}, ` +
      `calculado sobre un EBITDA normalizado de ${params.ebitdaBase} ` +
      `y un múltiplo EV/EBITDA implícito ajustado de ${params.multMin}–${params.multMax}. ` +
      `En ${params.ano} (${params.tipoPeriodo}), la empresa presentó una facturación de ${params.fat1}` +
      `${params.margem !== null ? ` y un margen EBITDA del ${params.margem}` : ""}.`,
    semResultado:
      "Con los datos indicados no es posible presentar un valor indicativo mediante múltiplo de EBITDA. Este informe presenta, no obstante, el perfil operativo de la empresa y las principales recomendaciones aplicables.",
  },

  mensagemAcionista: {
    historicoLimitado:
      "La principal oportunidad de preservación de valor antes de una transacción reside en consolidar tres ejercicios financieros conciliados y documentar los ajustes al EBITDA, reduciendo las lagunas de información que habitualmente generan descuentos en la due diligence.",
    dependenciaAlta:
      "La principal oportunidad de creación de valor reside en reducir la dependencia del accionista, mediante el refuerzo del equipo directivo y la formalización de las relaciones comerciales a nombre de la empresa, aumentando la transferibilidad del negocio.",
    concentracaoAlta:
      "La principal oportunidad de creación de valor reside en diversificar la cartera de clientes y formalizar contractualmente las cuentas más relevantes, reduciendo el riesgo comercial percibido por el comprador.",
    padrao:
      "La principal oportunidad de creación de valor reside en validar la calidad de los resultados, documentar los ajustes al EBITDA y reducir las lagunas de información que podrían generar descuentos en la due diligence.",
  },

  riscos: {
    historicoLimitado: {
      risco: "Histórico financiero limitado",
      evidenciaUm: "1 ejercicio facilitado",
      evidenciaVarios: (n: number) => `${n} ejercicios facilitados`,
      impacto: "Reduce la confianza en la sostenibilidad de los resultados y puede condicionar el múltiplo",
      mitigante: "Preparar y conciliar la información financiera de los últimos tres ejercicios",
    },
    dependenciaGestao: {
      risco: "Dependencia de la gestión del accionista",
      evidencia: (dep: string) => `Dependencia del accionista en la gestión: ${dep}`,
      impacto: "Aumenta el riesgo de transición y de continuidad operativa tras la transacción",
      mitigante: "Reforzar el equipo directivo y documentar los procesos clave",
    },
    concentracaoClientes: {
      risco: "Concentración de clientes",
      evidencia: (top5: number) => `Cinco mayores clientes: ${top5}% de la facturación`,
      impacto: "Aumenta la exposición a la pérdida de clientes relevantes",
      mitigante: "Diversificar la cartera comercial y formalizar contratos plurianuales",
    },
    dependenciaComercial: {
      risco: "Dependencia comercial del accionista",
      evidencia: (dep: string) => `Dependencia del accionista en la facturación: ${dep}`,
      impacto: "Reduce la transferibilidad de las relaciones comerciales tras la transacción",
      mitigante: "Transferir las cuentas clave a gestores de cuenta y contratar a nombre de la empresa",
    },
    localizacaoUnica: {
      risco: "Operación en una única ubicación",
      evidencia: "Actividad concentrada en una única sede",
      impacto: "Limita la escalabilidad y concentra el riesgo operativo y geográfico",
      mitigante: "Evaluar la replicabilidad del modelo y los planes de expansión a nuevas ubicaciones",
    },
    posicaoLiquidaElevada: {
      risco: "Posición neta elevada",
      evidencia: (racio: string) => `Posición neta equivalente a ${racio} el EBITDA normalizado`,
      evidenciaSemDados: "Posición neta equivalente a — el EBITDA normalizado",
      impacto: "Reduce el Equity Value y puede limitar la financiación de la adquisición",
      mitigante: "Reducir la deuda, optimizar la caja y preparar un estado financiero actualizado",
    },
    capexElevado: {
      risco: "Capex elevado",
      evidencia: (capex: string) => `Capex recurrente de ${capex} frente al EBITDA normalizado`,
      impacto: "Limita la conversión de EBITDA en generación de caja",
      mitigante: "Separar el capex de mantenimiento del de crecimiento y validar las necesidades futuras",
    },
    imovelSemAvaliacao: {
      risco: "Inmueble propio sin valoración independiente",
      evidencia: (metodo: string) => `Método de valoración indicado: ${metodo}`,
      impacto: "Introduce incertidumbre en el Equity Value cuando el inmueble integra el perímetro",
      mitigante: "Obtener una valoración independiente y definir el perímetro de la transacción",
    },
    ajustamentosPorValidar: {
      risco: "Ajustes al EBITDA pendientes de validar",
      evidencia: (valor: string) => `Ajustes de ${valor} declarados sin soporte documental`,
      impacto: "Puede generar descuentos o ajustes durante la due diligence",
      mitigante: "Preparar la conciliación contable y la documentación de soporte",
    },
    contracaoFaturacao: {
      risco: "Contracción de la facturación",
      evidencia: "Evolución negativa de la facturación en el periodo indicado",
      impacto: "Puede condicionar el múltiplo aplicable y la lectura de sostenibilidad",
      mitigante: "Documentar las causas y evidenciar la inflexión mediante indicadores recientes",
    },
    niveis: { alto: "Alto", medio: "Medio", baixo: "Bajo" },
  },

  plano: {
    consolidarHistorico: "Consolidar tres ejercicios de información financiera conciliada",
    reconciliarEbitda: "Conciliar el EBITDA reportado y normalizado y documentar los ajustes",
    confirmarDivida: "Confirmar la deuda total y la caja, depósitos y otros equivalentes disponibles en la fecha de referencia",
    analisarFundoManeio: "Analizar el fondo de maniobra normativo y la estacionalidad del negocio",
    reduzirDependencia: "Reducir la dependencia del accionista y crear un plan de sucesión",
    mapearConcentracao: "Mapear la concentración de clientes y formalizar los contratos relevantes",
    separarCapex: "Separar el capex de mantenimiento del de crecimiento",
    definirImovel: "Definir el tratamiento del inmueble y obtener una valoración independiente",
    demonstrarReplicabilidade: "Demostrar la replicabilidad del modelo en otras ubicaciones",
    definirEstrutura: "Definir la estructura de la transacción y el perímetro pretendido",
    prioridade: { alta: "Alta", media: "Media" },
    impacto: { alto: "Alto", muitoAlto: "Muy alto", medioAlto: "Medio/alto", medio: "Medio" },
    esforco: { alto: "Alto", medio: "Medio", baixo: "Bajo" },
    prazo: {
      semanas2a6: "2-6 semanas",
      semanas1a3: "1-3 semanas",
      semanas1a2: "1-2 semanas",
      semanas2a4: "2-4 semanas",
      meses3a12: "3-12 meses",
      semanas4a8: "4-8 semanas",
      meses6a12: "6-12 meses",
    },
  },

  implicacoesParticipacao: {
    minoritaria:
      "En una participación minoritaria no existe prima de control y el inversor valora sobre todo la gobernanza, los derechos de salida y el plan de crecimiento. Es frecuente que el valor por acción refleje un descuento de minoría.",
    maioritaria:
      "En una venta mayoritaria el comprador asume el control y tiende a incorporar una prima de control, exigiendo a cambio continuidad de la gestión y mecanismos de alineación como un earn-out o un rollover de parte del capital.",
    totalidade:
      "En la venta de la totalidad el comprador suele pagar una prima de control, pero exige un periodo de transición, garantías de continuidad de los clientes y un paquete más amplio de manifestaciones y garantías.",
    indefinida:
      "El porcentaje a transmitir aún no está definido. Esta decisión condiciona el universo de inversores, la existencia de una prima de control y la estructura de pago.",
  },

  limitacoes: {
    infoDeclarada: "La estimación se basa exclusivamente en la información declarada, sin verificación documental ni auditoría.",
    fundoManeio: "No se realizó un análisis del fondo de maniobra normativo ni de la estacionalidad del negocio.",
    transacoesComparaveis: "No se analizaron transacciones comparables específicas ni el apetito actual de los inversores por el activo.",
    historicoInferior: "El histórico financiero disponible es inferior a tres ejercicios.",
    setorGenerico: "El sector indicado no dispone de múltiplos específicos; se utilizó una referencia de mercado genérica.",
    periodoNaoEncerrado: "El periodo de referencia no corresponde a cuentas cerradas, lo que aumenta la incertidumbre de la estimación.",
  },

  qualidade: {
    notaUmAno:
      "Con un único periodo financiero no es posible evaluar con solidez el crecimiento, la estabilidad de los márgenes, la conversión de resultados en caja ni la sostenibilidad del EBITDA. Esta limitación reduce la confianza de la valoración y puede condicionar el múltiplo aplicable.",
    margensEstaveis: "Los márgenes EBITDA se mantuvieron estables en el periodo analizado, lo que respalda la lectura de recurrencia de los resultados.",
    margensModeradas: "Los márgenes EBITDA presentan una variación moderada en el periodo analizado, lo que justifica validar los factores que explican la oscilación.",
    margensRelevantes: "Los márgenes EBITDA presentan una variación relevante en el periodo analizado, lo que exige una explicación documentada en la due diligence.",
    conversaoCaixaComCapex: (capex: string, pct: string) =>
      `Tras un capex recurrente de ${capex}, la conversión indicativa de EBITDA en caja operativa es del ${pct}, antes de fondo de maniobra, intereses e impuestos. Limitación: sin la desagregación entre capex de mantenimiento y de crecimiento, el flujo de caja libre subyacente a la valoración queda sujeto a corrección en la due diligence.`,
    conversaoCaixaSemCapex:
      "No se indicó capex recurrente. Limitación: sin este dato no es posible estimar la conversión de EBITDA en caja, lo que reduce la fiabilidad del valor calculado y suele traducirse en un descuento por parte del comprador.",
    fundoManeio:
      "El fondo de maniobra no ha sido analizado en esta fase. Limitación: sin la normalización del fondo de maniobra no es posible fijar con precisión el puente entre el Enterprise Value y el Equity Value, lo que puede originar ajustes de cierre euro a euro en el precio final.",
    backlog: (valor: string) =>
      `Se indicó un backlog contratado de ${valor}. Limitación: sin el detalle de los márgenes, los plazos de ejecución y las condiciones de cancelación, la visibilidad de ingresos no se incorporó cuantitativamente a la valoración, solo se consideró de forma cualitativa.`,
    concentracaoTop5: (top5: number) => `Concentración comercial: los cinco mayores clientes representan el ${top5}% de la facturación`,
    concentracaoTop1: (top1: number) => ` y el mayor cliente el ${top1}%`,
    concentracaoFim: ". Limitación: la dependencia de pocos clientes aumenta el riesgo percibido de los ingresos y condiciona directamente el múltiplo aplicable en la valoración.",
    ajustamentosDeclarados: (valor: string) =>
      `Se declararon ajustes no recurrentes de ${valor}. Limitación: hasta que se validen documentalmente, el EBITDA ajustado —y, en consecuencia, el rango de valoración presentado— queda sujeto a revisión.`,
    ajustamentosNaoDeclarados:
      "No se declararon ajustes no recurrentes al EBITDA. Limitación: cualquier normalización identificada en la due diligence (remuneraciones de socios, rentas fuera de mercado, ingresos no recurrentes) podría modificar el EBITDA base y el valor calculado.",
  },

  alertas: {
    umPeriodo: "Solo se facilitó un periodo financiero. El análisis de crecimiento y de estabilidad de los márgenes no es concluyente.",
    ajustamentosSemSuporte: 'Existen ajustes al EBITDA sin soporte documental. Deben clasificarse como "a validar en due diligence".',
    fundoManeioNaoAnalisado: "No se ha analizado el fondo de maniobra. El Equity Value podría verse afectado por ajustes de cierre.",
    imovelSemAvaliacao: "El valor del inmueble se introdujo sin valoración independiente. El Equity Value podría sufrir una alteración material.",
    imovelSemValor: "El inmueble se incluyó en el perímetro sin valor indicado, por lo que no se sumó al Equity Value.",
    periodoNaoClassificado: "El periodo financiero de referencia no ha sido clasificado (cuentas cerradas, estimación o presupuesto).",
    concentracaoInconsistente: "El peso de los cinco mayores clientes es inferior al del mayor cliente. Los datos deben revisarse.",
    minoritariaAtencao: "El valor de una participación minoritaria no corresponde a una proporción simple del Equity Value al 100%.",
  },

  implicacoesEstrutura: {
    venda50: { estrutura: "Venta del 50%–51%", implicacao: "Exige reglas claras de gobernanza y un pacto de socios" },
    venda60: { estrutura: "Venta del 60%–80%", implicacao: "El comprador obtiene el control; puede existir un rollover relevante" },
    venda90: { estrutura: "Venta del 90%", implicacao: "La participación residual exige protección y reglas de salida" },
    venda100: { estrutura: "Venta del 100%", implicacao: "Estructura más sencilla; la continuidad de la gestión se vuelve crítica" },
  },

  notas: {
    equity: "El Equity Value presentado es indicativo y se calcula antes de los ajustes de cierre, la normalización del fondo de maniobra, las contingencias, los impuestos aplicables y la validación en la due diligence.",
    minoria: "El valor de una participación minoritaria no debe asumirse como una simple proporción del Equity Value al 100%. El valor puede variar en función del control, los derechos de gobernanza, la liquidez y la estructura de la transacción.",
  },

  engine: {
    ajustes: {
      volumeNegocios: {
        label: "Volumen de negocio",
        abaixo5M: "Facturación inferior a 5M€",
        entre5e20M: "Facturación entre 5M€ y 20M€",
        acima20M: "Facturación de 20M€ o más",
      },
      dimensaoResultados: {
        label: "Dimensión de los resultados",
        abaixo2M: "EBITDA normalizado inferior a 2M€",
        acimaIgual2M: "EBITDA normalizado de 2M€ o más",
      },
      idadeEmpresa: {
        label: "Antigüedad de la empresa",
        menos3: "Menos de 3 años",
        mais10: "Más de 10 años",
        entre3e10: "Entre 3 y 10 años",
      },
      crescimento: {
        label: "Crecimiento",
        historicoInsuficiente: "Histórico insuficiente",
        emQueda: "Facturación en descenso respecto al año más antiguo indicado",
        acumulado: (pct: string) => `Crecimiento acumulado del ${pct}%`,
        ate10: "Crecimiento acumulado de hasta el 10%",
      },
      unidades: {
        label: "Unidades / ubicaciones",
        naoIndicado: "No indicado",
        unica: "Operación concentrada en una única ubicación",
        maisDe3: "Operación multiunidad (más de 3 ubicaciones)",
        naoAplicavel: "No aplicable al modelo de negocio",
        entre2e3: "Operación en 2-3 ubicaciones",
      },
      concentracaoClientes: {
        label: "Concentración de clientes",
        naoIndicada: "No indicada",
        diversificada: "Base de clientes diversificada",
        moderada: "Concentración moderada en los 5 mayores clientes",
        forte: "Fuerte dependencia de los 5 mayores clientes",
      },
      geografia: {
        label: "Geografía de los clientes",
        naoIndicada: "No indicada",
        equilibrio: "Equilibrio nacional/internacional",
      },
      depFaturacao: {
        label: "Dependencia del accionista (facturación)",
        naoIndicada: "No indicada",
        baixa: "Cartera poco dependiente del accionista",
        alta: "Fuerte dependencia comercial del accionista",
        moderada: "Dependencia moderada del accionista",
      },
      depGestao: {
        label: "Dependencia del accionista (gestión)",
        naoIndicada: "No indicada",
        baixa: "Gestión autónoma respecto al accionista",
        alta: "Gestión fuertemente centrada en el accionista",
        moderada: "Dependencia moderada del accionista",
      },
      capex: {
        label: "Intensidad de inversión (capex)",
        naoIndicada: "No indicada",
        reduzido: "Capex recurrente reducido frente a la facturación",
        relevante: "Capex recurrente relevante frente a la facturación",
        elevado: "Capex recurrente elevado frente a la facturación",
      },
    },
    cenarios: {
      conservador: "Comprador financiero, sin prima estratégica; múltiplo en el límite inferior del rango ajustado.",
      base: "Proceso normal, información financiera preparada y continuidad operativa asegurada.",
      otimista: "Comprador estratégico con sinergias identificadas, con varios interesados y preparación previa del negocio.",
    },
    linhasEbitda: {
      reportado: (ano: number) => `EBITDA reportado ${ano}`,
      despesasExtraordinarias: "Gastos extraordinarios no recurrentes",
      rendaTeorica: "Renta teórica de mercado (inmueble propio)",
      acrescimoRenda: "Incremento de renta hasta el valor de mercado",
      normalizado: "EBITDA normalizado",
    },
    dimensoes: {
      historicoFinanceiro: "Histórico financiero",
      qualidadeEbitda: "Calidad del EBITDA",
      posicaoFinanceira: "Posición financiera",
      enquadramentoSetorial: "Encuadre sectorial",
      perfilRisco: "Perfil de riesgo",
    },
    itensConfianca: {
      faturacaoAnoReferencia: "Facturación del año de referencia",
      faturacaoAnoAnterior: "Facturación del año anterior",
      faturacaoTresAnos: "Facturación de hace tres años",
      ebitdaAnoAnterior: "EBITDA del año anterior",
      ebitdaTresAnos: "EBITDA de hace tres años",
      tipoPeriodoReferencia: "Tipo de periodo de referencia",
      despesasExtraordinariasIdentificadas: "Gastos extraordinarios identificados",
      enquadramentoImovel: "Encuadre del inmueble de la operación",
      capexAnualRecorrente: "Capex anual recurrente",
      caixaDepositos: "Caja y depósitos",
      dividaFinanceira: "Deuda financiera",
      industriaIdentificada: "Industria identificada",
      subindustriaIdentificada: "Subindustria identificada",
      atividadePrincipalDescrita: "Actividad principal descrita",
      concentracaoTop5: "Concentración de los 5 mayores clientes",
      pesoMaiorCliente: "Peso del mayor cliente",
      unidadesLocalizacoes: "Unidades / ubicaciones",
      geografiaClientes: "Geografía de los clientes",
      depFaturacao: "Dependencia del accionista (facturación)",
      depGestao: "Dependencia del accionista (gestión)",
    },
    confExplicacao: {
      baixa: "Confianza baja — la estimación se calculó con información limitada.",
      media: "Confianza media — existe información relevante, pero algunos datos adicionales podrían mejorar el análisis.",
      alta: "Confianza alta — la información facilitada cubre las dimensiones críticas de una valoración preliminar.",
    },
  },

  doc: {
    disclaimer:
      "El presente informe constituye una estimación indicativa de la valoración de la empresa, generada a partir de la información facilitada por el usuario, y no constituye asesoramiento financiero, propuesta contractual, recomendación de inversión ni valoración formal a efectos legales, fiscales o contables; los valores presentados dependen de la calidad y exactitud de los datos introducidos y de las condiciones de mercado vigentes en la fecha de elaboración de este documento.",
    footer: (empresa: string) => `Lealia Advisory Partners · Informe de valoración indicativa${empresa ? ` para ${empresa}` : ""}`,
    efeito: { neutro: "Neutro", positivo: "Positivo", negativo: "Negativo" },

    waterfall: {
      caption: "Equity Bridge · miles de €",
      ariaLabel: "Gráfico waterfall del Equity Bridge",
      enterpriseValue: "Enterprise Value",
      equityValue: "Equity Value",
      divida: "Deuda",
      caixa: "Caja",
      imovel: "Inmueble",
    },

    dcf: {
      titulo: "DCF Valuation",
      hTitulo: "Valoración por flujos de caja descontados",
      semDados: "No es posible presentar un análisis DCF con la información facilitada. En particular, el coste de capital estimado debe ser superior a la tasa de crecimiento a perpetuidad.",
      mapaFluxos: "Mapa de flujos de caja",
      unidadeMilhares: "miles de €",
      linha: "Línea",
      tv: "TV",
      receita: "Ingresos",
      ebitda: "EBITDA",
      margemEbitda: "Margen EBITDA",
      da: "(−) D&A",
      ebit: "= EBIT",
      impostoEbit: "(−) Impuesto s/ EBIT",
      nopat: "= NOPAT",
      maisDa: "(+) D&A",
      menosCapex: "(−) Capex",
      fcff: "= FCFF unlevered",
      fatorDesconto: "Factor de descuento",
      pvFcff: "= VP del FCFF",
      legenda: "A = ejercicio histórico · F = año proyectado · TV = valor terminal. Flujo unlevered: la financiación se refleja en el coste de capital y en la deuda neta. TV por perpetuidad sobre el FCFF del año 8.",
      pressupostosForecast: "Hipótesis del forecast",
      crescimentoInicial: "Crecimiento inicial",
      anoEstabilizacao: "Año de estabilización",
      anoN: (n: number) => `Año ${n}`,
      crescimentoEstabilizado: "Crecimiento estabilizado",
      crescimentoPerpetuidade: "Crecimiento a perpetuidad",
      margemEbitdaProjetada: "Margen EBITDA proyectado",
      capexPctReceita: "Capex (% de ingresos)",
      daPctReceita: "D&A (% de ingresos)",
      fundoManeio: "Fondo de maniobra",
      naoProjetado: "No proyectado",
      taxaImposto: "Tipo impositivo (CIT)",
      indicadoresAvaliacao: "Indicadores de valoración",
      enterpriseValue: "Enterprise Value",
      equityValue: "Equity Value",
      evEbitdaImplicito: "EV / EBITDA implícito",
      evReceitaImplicito: "EV / Ingresos implícito",
      wacc: "Coste medio ponderado de capital",
      riskFree: "Tipo libre de riesgo (Rf)",
      beta: "Beta unlevered / levered (β)",
      erp: "Equity Risk Premium (ERP)",
      crp: "Country Risk Premium (CRP)",
      premioDimensao: "Prima de tamaño (pyme)",
      premioEspecifico: "Prima específica (iliquidez)",
      premioAtivoEspecifico: "Prima específica del activo",
      costOfEquity: "Cost of Equity (Ke)",
      costOfDebt: "Cost of Debt antes / después de impuestos (Kd)",
      pesoEquityDivida: "Peso de equity / deuda (E / D)",
      waccLabel: "WACC",
      resultados: "Resultados",
      pvExplicito: "VP del forecast explícito (8 años)",
      pvTerminal: "VP del valor terminal",
      pesoTerminal: "Peso del valor terminal en el EV",
      ajusteDividaLiquida: "Ajuste de deuda neta",
      imovel: "Inmueble",
      notaCustoCapital: (pais: string, citNota: string, extra: string) =>
        `Coste de capital estimado con un criterio prudente: a las referencias sectoriales se añaden primas de tamaño e iliquidez, ya que una pyme no cotizada tiene un riesgo superior al de las cotizadas del sector. Beta, ERP, CRP, estructura de capital y spread son proxies sectoriales; CIT de ${pais} (${citNota})${extra ? ` ${extra}` : ""}`,
    },

    sensitivity: {
      titulo: "Sensitivity Analysis",
      hTitulo: "Análisis de sensibilidad",
      semDados: "No hay un análisis DCF disponible, por lo que no es posible presentar las matrices de sensibilidad.",
      sensibilidadeEv: "Sensibilidad del Enterprise Value",
      notaMatriz: "La celda destacada corresponde al escenario base presentado en la diapositiva anterior. Las matrices aíslan el efecto de cada variable, manteniendo constantes las demás hipótesis.",
      transparenciaPressupostos: "Transparencia de hipótesis",
      introTransparencia: "Las hipótesis del modelo combinan la información introducida en el formulario con referencias sectoriales de mercado, siguiendo un criterio conservador: en caso de duda, se adopta el valor que resulta en una valoración más prudente. La siguiente tabla recoge las hipótesis estructurales de la valoración y su fuente o método de obtención.",
      parametro: "Parámetro",
      valor: "Valor",
      metodoFonte: "Método / fuente",
    },

    lockedPages: {
      p4: "Alcance y limitaciones",
      p5: "Método y alternativas",
      p6: "Ajustes al múltiplo",
      p7: "Escenarios y sensibilidad",
      p8: "Equity Bridge y contexto de la transacción",
      p9: "Drivers de valor y riesgos",
      p10: "DCF Valuation",
      p11: "Sensitivity Analysis",
      p12: "Preparación para el mercado",
      p13: "Proceso de M&A",
    },
    conteudoReservado: "Contenido reservado",
    lockedTexto: "Esta sección forma parte del informe completo. Agende una reunión de 20 minutos con el equipo de Lealia para ver el análisis íntegro y comentar los resultados.",
    lockedCta: "Agendar una reunión para ver el informe completo",

    cover: {
      titulo: "Preliminary Valuation",
      preparadoPara: "Preparado para",
      data: "Fecha",
    },

    p2: {
      titulo: "Resumen ejecutivo",
      evIndicativo: "Enterprise Value indicativo",
      equityIndicativo: "Equity Value indicativo",
      faturacaoAno: "Facturación del año de referencia",
      ebitdaNormalizado: "EBITDA normalizado",
      margemNormalizada: "Margen EBITDA normalizado",
      multiploImplicito: "Múltiplo implícito",
      posicaoLiquida: "Posición neta",
      posicaoLiquidaHint: "caja / (deuda)",
      completudeInformacao: "Completitud de la información",
      metodologia: "Metodología de valoración",
      metodo1Titulo: "Determinación del EBITDA normalizado",
      metodo1: (ebitda: string) =>
        `EBITDA reportado en el último ejercicio de referencia, excluyendo el impacto de gastos extraordinarios no recurrentes y, si procede, considerando el impacto de una corrección teórica de la renta del inmueble al mercado. El EBITDA normalizado es de ${ebitda}.`,
      metodo2Titulo: "Múltiplo sectorial base",
      metodo2: "Definido por referencia a los múltiplos aplicados en transacciones recientes y comparables del sector y la región.",
      metodo3Titulo: "Ajustes de perfil y riesgo",
      metodo3: "Tamaño, madurez, crecimiento, recurrencia de ingresos, concentración de clientes, geografía, dependencia del accionista e intensidad de inversión, con un límite global aplicado al conjunto de los ajustes.",
      metodo4Titulo: "Equity Bridge",
      metodo4: "Al Enterprise Value se le suma la caja, los depósitos y otros equivalentes, se deduce la deuda total y, si procede, se suma el inmueble incluido en el perímetro de la transacción y el impacto pro forma en caja resultante de la enajenación de activos no operativos, obteniendo el Equity Value antes de los ajustes de cierre.",
    },

    p3: {
      titulo: "Perfil de la empresa y otros indicadores",
      perfilEmpresa: "Perfil de la empresa",
      indicador: "Indicador",
      valor: "Valor",
      historicoFinanceiro: "Histórico financiero",
      ano: "Año",
      faturacao: "Facturación",
      ebitda: "EBITDA",
      extraordinarios: "Extraordinarios",
      normalizacoes: "Normalizaciones",
      cagrFaturacao: "CAGR de la facturación",
      cagrEbitda: "CAGR del EBITDA normalizado",
      semInfoSuficiente: "Información insuficiente",
      normalizacaoEbitda: "Normalización del EBITDA",
      linha: "Línea",
      notaNormalizacao: "Los ajustes de normalización aproximan el resultado operativo recurrente en un escenario posterior a la transacción.",
      outrosIndicadores: "Otros indicadores",
      caixaDepositos: "Caja, depósitos y otros equivalentes",
      dividaTotal: "Deuda total",
      capexAnual: "Capex anual recurrente",
      unidadesLocalizacoes: "Unidades / ubicaciones",
      concentracaoMaiorCliente: "% Concentración en el mayor cliente",
      concentracaoTop5: "% Concentración en el top 5 de clientes",
      clientesAtivos: "Clientes activos",
    },

    p4: {
      titulo: "Alcance y limitaciones",
      hTitulo: "Alcance y limitaciones de este informe",
      naturezaDocumento: "Naturaleza del documento",
      natureza1: "Se trata de una valoración indicativa preliminar, elaborada exclusivamente a partir de la información facilitada por el usuario, sin verificación independiente, auditoría ni revisión de los datos.",
      natureza2: "No constituye asesoramiento financiero, fiscal, contable o jurídico, ni una recomendación de inversión o desinversión.",
      natureza3: "No constituye una valoración formal (fairness opinion) a efectos legales, fiscales, contables o regulatorios, ni una propuesta contractual u oferta vinculante.",
      natureza4: "El documento está destinado al uso exclusivo del destinatario identificado en la portada y no debe divulgarse a terceros sin autorización escrita de Lealia Advisory Partners.",
      limitacoesFatores: "Limitaciones y factores de variación",
      limitacao1: "Los valores presentados dependen de la calidad, exactitud y exhaustividad de los datos introducidos. Datos incompletos o incorrectos alteran materialmente el resultado.",
      limitacao2: "Las referencias de mercado utilizadas reflejan las condiciones vigentes en la fecha de elaboración y pueden variar rápidamente según el contexto macroeconómico, sectorial y de financiación.",
      limitacao3: "El precio efectivo de una transacción depende del perfil del comprador, de la estructura del negocio, de las garantías, de los ajustes de cierre y del proceso de negociación.",
      limitacao4: "Una valoración definitiva exige due diligence financiera, fiscal, legal y operativa, así como la validación documental de los ajustes al EBITDA.",
      semResponsabilidade: "Lealia Advisory Partners no asume responsabilidad alguna por decisiones adoptadas basándose exclusivamente en este documento.",
      leituraComplementar: "Lectura complementaria",
      leituraFinal: "La estacionalidad y el capex de mantenimiento frente al capex de crecimiento no se han desglosado en esta fase. Limitación: sin este análisis no es posible evaluar la recurrencia mensual de los resultados ni la sostenibilidad del flujo de caja, por lo que el valor calculado no refleja posibles picos o necesidades estacionales de tesorería.",
    },

    p5: {
      titulo: "Método y alternativas",
      porqueMultiplos: "Por qué múltiplos de EBITDA",
      par1: "La valoración por múltiplos es un enfoque de mercado: el valor de una empresa se infiere a partir de los precios pagados por inversores en transacciones recientes de empresas con un perfil comparable. En el contexto de M&A de pymes, el EBITDA se utiliza habitualmente como referencia, por reflejar la capacidad de generación de resultados operativos antes del impacto de la estructura de financiación, la política de amortizaciones y el régimen fiscal.",
      par2: "Es también el método más adecuado para una estimación preliminar: exige pocas hipótesis discrecionales, es transparente y refleja directamente el apetito actual del mercado por el sector. Su limitación es la dependencia de la calidad de los comparables y el hecho de captar la fotografía actual del negocio, y no un plan de crecimiento futuro.",
      par3: "El EV/EBITDA tiende a ser más adecuado para empresas con EBITDA positivo, operaciones relativamente estables y estructuras de costes comparables a las de las empresas utilizadas como referencia. Es menos informativo cuando la empresa presenta resultados operativos negativos o muy volátiles, cuando existen diferencias significativas de crecimiento o margen frente a los comparables, o cuando el negocio atraviesa una fase de fuerte transformación.",
      par4: "La valoración por múltiplos es, por tanto, una referencia sencilla, transparente y alineada con el mercado, especialmente útil cuando existen comparables sólidos y para respaldar una primera estimación de valor. Su principal limitación es depender de la calidad de esos comparables y no reflejar, por sí sola, el potencial futuro del negocio.",
      nota: "En una transacción real, los múltiplos son el punto de partida de la negociación y después se contrastan con un análisis de flujos de caja y con la due diligence.",
      metodosAlternativos: "Métodos alternativos",
      dcfTitulo: "DCF - flujos de caja descontados",
      dcfNota: "(ver diapositivas 10 y 11)",
      dcfDesc: "Proyecta los flujos de caja futuros y los descuenta a una tasa que refleja el coste del capital (WACC). Es el método más riguroso cuando existe un plan de negocio creíble, pero es muy sensible a las hipótesis empleadas.",
      outrosMultiplosTitulo: "Otros múltiplos de transacción",
      outrosMultiplosDesc: "Además del EV/EBITDA, pueden emplearse múltiplos como EV/Ingresos, EV/EBIT o PER, según el sector, la madurez y la rentabilidad de la empresa. Su relevancia depende de la comparabilidad de las empresas y de la calidad de la información disponible.",
      metricasSetorTitulo: "Métricas específicas del sector",
      metricasSetorDesc: "Complementa los múltiplos financieros con métricas operativas relevantes para cada negocio, como el valor por unidad, cliente, cama, suscriptor o metro cuadrado. Es particularmente útil en sectores donde estos indicadores explican de forma más directa el potencial económico de la empresa.",
      valorPatrimonialTitulo: "Valor patrimonial / liquidación",
      valorPatrimonialDesc: "Valora los activos netos a su valor de mercado. Relevante en negocios intensivos en activos, funcionando como valor mínimo de referencia.",
    },

    p6: {
      titulo: "Ajustes al múltiplo",
      hTitulo: "Ajustes aplicados al múltiplo sectorial",
      fator: "Factor",
      leitura: "Lectura",
      efeito: "Efecto",
      semAjustes: "No se aplicaron ajustes al múltiplo sectorial base.",
      nota: "El conjunto de los ajustes está limitado a un rango global de −40% a +35% sobre el múltiplo sectorial base, evitando que la combinación de factores produzca resultados extremos. Todos los factores se basan en información declarada y requieren validación documental.",
    },

    p7: {
      titulo: "Escenarios y sensibilidad",
      cenariosValorizacao: "Escenarios de valoración",
      cenario: "Escenario",
      pressupostos: "Hipótesis",
      multiplo: "Múltiplo",
      enterpriseValue: "Enterprise Value",
      equityValue: "Equity Value",
      semCenarios: "No hay escenarios disponibles para los datos facilitados.",
      sensibilidadeEv: "Sensibilidad del Enterprise Value",
      variacaoEbitda: "Variación del EBITDA",
      ebitda: "EBITDA",
      notaSensibilidade: "La tabla muestra cómo reacciona el Enterprise Value a las variaciones del EBITDA normalizado y del múltiplo aplicado. El Equity Value evoluciona en consecuencia, ajustado por la deuda total, la caja, los depósitos y otros equivalentes, y el inmueble indicado en el equity bridge.",
      semSensibilidade: "No hay análisis de sensibilidad disponible.",
    },

    p8: {
      titulo: "Equity Bridge y contexto de la transacción",
      equityBridge: "Equity Bridge",
      componente: "Componente",
      valor: "Valor",
      contextoEstrutura: "Contexto y estructura de la transacción",
      parametro: "Parámetro",
      detalhe: "Detalle",
      motivoTransacao: "Motivo de la transacción",
      pctATransacionar: "Porcentaje de capital a transmitir",
      estruturaPretendida: "Estructura pretendida",
      horizonteTemporal: "Horizonte temporal",
      permanenciaAcionista: "Permanencia del accionista",
      imovel: "Inmueble",
      tipoInvestidor: "Tipo de inversor preferente",
      estrutura: "Estructura",
      implicacao: "Implicación",
    },

    p9: {
      titulo: "Drivers de valor y riesgos",
      driversValor: "Drivers de valor",
      driver: "Driver",
      descricao: "Descripción",
      semDrivers: "No se identificaron drivers de valor específicos con base en la información facilitada.",
      riscosMitigantes: "Riesgos y mitigantes",
      risco: "Riesgo",
      evidenciaDisponivel: "Evidencia disponible",
      impacto: "Impacto",
      mitigante: "Mitigante",
      semRiscos: "No se identificaron riesgos materiales específicos con base en la información facilitada.",
    },

    p12: {
      titulo: "Preparación para el mercado",
      planoPreparacao: "Plan de preparación priorizado",
      notaSecao: "Esta sección está dirigida a quienes estén considerando avanzar en un proceso de M&A. Nuestro equipo puede ayudarle a preparar el negocio para maximizar el valor en la venta. Contáctenos para una conversación inicial sin compromiso.",
      prioridade: "Prioridad",
      acao: "Acción",
      impactoEsperado: "Impacto esperado",
      esforco: "Esfuerzo",
      recomendacoesImediatas: "Recomendaciones inmediatas",
    },

    p13: {
      titulo: "Proceso de M&A",
      hTitulo: "Cómo se desarrolla un proceso de M&A",
      notaSecao: "Esta sección está dirigida a quienes estén considerando avanzar en un proceso de M&A. Nuestro equipo puede ayudarle a preparar el negocio para maximizar el valor en la venta. Contáctenos para una conversación inicial sin compromiso.",
    },

    p14: {
      titulo: "Siguiente paso y contactos",
      obrigado: "Gracias.",
      lead: "Gracias por su tiempo. Este informe es un punto de partida: convertir una estimación indicativa en una valoración fundamentada exige validar las cifras, analizar transacciones comparables recientes y conocer el apetito actual de inversores financieros y estratégicos por su sector.",
      proximoPassoTitulo: "Siguiente paso · Reunión de 20 minutos",
      proximoPassoDesc: "Revisión conjunta de las hipótesis de este informe con el equipo de Lealia y presentación del informe completo.",
      agendarReuniao: "Agendar una reunión",
      contactos: "Contactos",
      managingPartner: "Managing Partner",
      notaFinal: (empresa: string) =>
        `Documento de carácter indicativo, preparado exclusivamente para ${empresa}. No constituye asesoramiento financiero ni una propuesta contractual.`,
    },
  },
};

export const REPORT_I18N: Record<ReportLang, typeof pt> = { pt, en, es };

export function t(lang: ReportLang = "pt"): typeof pt {
  return REPORT_I18N[lang];
}
