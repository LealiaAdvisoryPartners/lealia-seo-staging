// Dicionário PT do relatório. Ver ./index.ts.

export const pt = {
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
      titulo: "Avaliação preliminar",
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
      leituraFinal: "O perfil de sazonalidade e a distribuição mensal da atividade não foram analisados nesta fase. Limitação: sem esta leitura não é possível aferir a recorrência intra-anual dos resultados, pelo que o valor calculado não reflete eventuais picos de atividade nem necessidades estacionais de tesouraria ao longo do ano.",
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
      priorityHigh: "Alta",
      priorityMedium: "Média",
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
