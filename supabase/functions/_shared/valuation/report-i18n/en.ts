// Dicionário EN do relatório. A forma é imposta por `pt`.
import type { pt } from "./pt.ts";

export const en: typeof pt = {
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
    avaliarReplicabilidade:
      "Assess the replicability of the model in other locations, demonstrating scale potential to the investor.",
    documentarCapex: "Document investment needs, distinguishing maintenance capex from growth capex.",
    prepararHistorico:
      "Prepare the financial history of the last three financial years together with supporting documentation.",
    definirImovel:
      "Decide in advance whether the property should be included in the transaction perimeter and obtain an independent valuation.",
    validarMargem: "Validate the EBITDA margin and the classification of items treated as extraordinary.",
    explicarContracao: "Prepare a well-supported explanation of the revenue contraction and the recovery plan.",
    validarComLealia:
      "Validate this indicative valuation with the Lealia Advisory Partners team before any market decision.",
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
    infoDeclarada:
      "The estimate relies exclusively on the information declared, without documentary verification or audit.",
    fundoManeio: "No analysis of normative working capital or business seasonality was performed.",
    transacoesComparaveis:
      "No specific comparable transactions or current investor appetite for the asset were analysed.",
    historicoInferior: "The financial history available covers fewer than three financial years.",
    setorGenerico:
      "No sector-specific multiples are available for the sector indicated; a generic market reference was used.",
    periodoNaoEncerrado:
      "The reference period does not correspond to closed accounts, which increases the uncertainty of the estimate.",
  },

  qualidade: {
    notaUmAno:
      "With only one financial period, it is not possible to robustly assess growth, margin stability, cash conversion or the sustainability of EBITDA. This limitation reduces confidence in the valuation and may constrain the applicable multiple.",
    margensEstaveis:
      "EBITDA margins remained stable over the period analysed, supporting the reading of earnings recurrence.",
    margensModeradas:
      "EBITDA margins show moderate variation over the period analysed, warranting validation of the factors explaining the fluctuation.",
    margensRelevantes:
      "EBITDA margins show significant variation over the period analysed, which requires a documented explanation in due diligence.",
    conversaoCaixaComCapex: (capex: string, pct: string) =>
      `After recurring capex of ${capex}, the indicative conversion of EBITDA into operating cash is ${pct}, before working capital, interest and taxes. Limitation: without a breakdown between maintenance and growth capex, the free cash flow underlying the valuation remains subject to correction in due diligence.`,
    conversaoCaixaSemCapex:
      "No recurring capex was indicated. Limitation: without this data it is not possible to estimate the conversion of EBITDA into cash, which reduces the reliability of the value calculated and tends to translate into a discount by a buyer.",
    fundoManeio:
      "Working capital has not been analysed at this stage. Limitation: without normalising working capital it is not possible to precisely set the bridge between Enterprise Value and Equity Value, which may give rise to euro-for-euro closing adjustments to the final price.",
    backlog: (valor: string) =>
      `A contracted backlog of ${valor} was indicated. Limitation: without detail on margins, delivery timelines and cancellation terms, revenue visibility was not incorporated quantitatively into the valuation — it was only considered qualitatively.`,
    concentracaoTop5: (top5: number) =>
      `Commercial concentration: the top five clients account for ${top5}% of revenue`,
    concentracaoTop1: (top1: number) => ` and the largest client for ${top1}%`,
    concentracaoFim:
      ". Limitation: reliance on a few clients increases the perceived risk of revenue and directly constrains the multiple applicable in the valuation.",
    ajustamentosDeclarados: (valor: string) =>
      `Non-recurring adjustments of ${valor} were declared. Limitation: until validated with supporting documentation, the adjusted EBITDA — and consequently the valuation range presented — remains subject to revision.`,
    ajustamentosNaoDeclarados:
      "No non-recurring adjustments to EBITDA were declared. Limitation: any normalisation identified in due diligence (shareholder remuneration, off-market rents, non-recurring income) could change the base EBITDA and the value calculated.",
  },

  alertas: {
    umPeriodo: "Only one financial period was provided. The growth and margin stability analysis is not conclusive.",
    ajustamentosSemSuporte:
      'There are EBITDA adjustments without supporting documentation. They should be classified as "to be validated in due diligence".',
    fundoManeioNaoAnalisado:
      "Working capital has not been analysed. Equity Value may be affected by closing adjustments.",
    imovelSemAvaliacao:
      "The property value was entered without an independent valuation. Equity Value may change materially.",
    imovelSemValor:
      "The property was included in the perimeter without a stated value, so it was not added to Equity Value.",
    periodoNaoClassificado:
      "The reference financial period has not been classified (closed accounts, estimate or budget).",
    concentracaoInconsistente:
      "The share of the top five clients is lower than that of the largest client. The data should be reviewed.",
    minoritariaAtencao:
      "The value of a minority stake does not correspond to a simple proportion of the 100% Equity Value.",
  },

  implicacoesEstrutura: {
    venda50: {
      estrutura: "Sale of 50%–51%",
      implicacao: "Requires clear governance rules and a shareholders' agreement",
    },
    venda60: { estrutura: "Sale of 60%–80%", implicacao: "Buyer obtains control; a significant rollover may apply" },
    venda90: { estrutura: "Sale of 90%", implicacao: "Residual stake requires protection and exit rules" },
    venda100: { estrutura: "Sale of 100%", implicacao: "Simpler structure; management continuity becomes critical" },
  },

  notas: {
    equity:
      "The Equity Value presented is indicative and calculated before closing adjustments, working capital normalisation, contingencies, applicable taxes and due diligence validation.",
    minoria:
      "The value of a minority stake should not be assumed to be a simple proportion of the 100% Equity Value. The value may vary depending on control, governance rights, liquidity and the transaction structure.",
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
    footer: (empresa: string) =>
      `Lealia Advisory Partners · Indicative Valuation Report${empresa ? ` for ${empresa}` : ""}`,
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
      semDados:
        "It is not possible to present a DCF analysis with the information provided. In particular, the estimated cost of capital must be higher than the perpetuity growth rate.",
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
      legenda:
        "A = historical year · F = forecast year · TV = terminal value. Unlevered flow: financing is reflected in the cost of capital and in net debt. TV based on a perpetuity of the year-8 FCFF.",
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
      notaMatriz:
        "The highlighted cell corresponds to the base scenario presented on the previous slide. The matrices isolate the effect of each variable, holding the remaining assumptions constant.",
      transparenciaPressupostos: "Assumption transparency",
      introTransparencia:
        "The model's assumptions combine the information entered in the form with sector market references, following a conservative criterion — when in doubt, the value that results in a more prudent valuation is adopted. The table below sets out the valuation's structuring assumptions and their source or derivation method.",
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
    lockedTexto:
      "This section is reserved for Full Report subscribers. Unlock the complete analysis to access this section, detailed DCF projections, the sensitivity matrix and the market preparation plan.",
    lockedCta: "Get the Full Report · €299",

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
      metodo3:
        "Scale, maturity, growth, revenue recurrence, client concentration, geography, reliance on the shareholder and investment intensity, subject to an overall cap applied to the combined adjustments.",
      metodo4Titulo: "Equity Bridge",
      metodo4:
        "Cash, deposits and other equivalents are added to Enterprise Value, total debt is deducted, and, where applicable, the property included in the transaction perimeter and the pro-forma cash impact of disposing of non-operating assets are added, arriving at Equity Value before closing adjustments.",
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
      notaNormalizacao:
        "The normalisation adjustments approximate recurring operating income under a post-transaction scenario.",
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
      natureza1:
        "This is a preliminary indicative valuation, prepared exclusively from information provided by the user, without independent verification, audit or review of the data.",
      natureza2:
        "It does not constitute financial, tax, accounting or legal advice, nor an investment or divestment recommendation.",
      natureza3:
        "It does not constitute a formal valuation (fairness opinion) for legal, tax, accounting or regulatory purposes, nor a contractual proposal or binding offer.",
      natureza4:
        "This document is intended solely for the use of the recipient identified on the cover page and must not be disclosed to third parties without the written authorisation of Lealia Advisory Partners.",
      limitacoesFatores: "Limitations and factors of variation",
      limitacao1:
        "The values presented depend on the quality, accuracy and completeness of the data entered. Incomplete or incorrect data will materially change the result.",
      limitacao2:
        "The market references used reflect conditions prevailing on the date of preparation and may change rapidly with the macroeconomic, sector and financing context.",
      limitacao3:
        "The actual transaction price depends on the buyer's profile, the deal structure, the guarantees, closing adjustments and the negotiation process.",
      limitacao4:
        "A definitive valuation requires financial, tax, legal and operational due diligence, as well as documentary validation of the EBITDA adjustments.",
      semResponsabilidade:
        "Lealia Advisory Partners assumes no responsibility for decisions made based solely on this document.",
      leituraComplementar: "Further reading",
      leituraFinal:
        "The seasonality profile and the monthly distribution of activity have not been analysed at this stage. Limitation: without this analysis it is not possible to assess the intra-year recurrence of results, so the value calculated does not reflect any peaks in activity or seasonal treasury needs during the year.",
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
      dcfDesc:
        "Projects future cash flows and discounts them at a rate reflecting the cost of capital (WACC). It is the most rigorous method when a credible business plan exists, but it is highly sensitive to the underlying assumptions.",
      outrosMultiplosTitulo: "Other transaction multiples",
      outrosMultiplosDesc:
        "In addition to EV/EBITDA, multiples such as EV/Revenue, EV/EBIT or P/E may be used, depending on the sector, maturity and profitability of the company. Their relevance depends on the comparability of the companies and the quality of the information available.",
      metricasSetorTitulo: "Sector-specific metrics",
      metricasSetorDesc:
        "Complements financial multiples with operating metrics relevant to each business, such as value per unit, client, bed, subscriber or square metre. Particularly useful in sectors where these indicators more directly explain the company's economic potential.",
      valorPatrimonialTitulo: "Asset value / liquidation",
      valorPatrimonialDesc:
        "Values net assets at their market value. Relevant for asset-intensive businesses, acting as a reference floor value.",
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
      notaSensibilidade:
        "The table shows how Enterprise Value responds to variations in normalised EBITDA and the multiple applied. Equity Value moves accordingly, adjusted for total debt, cash, deposits and other equivalents, and the property indicated in the equity bridge.",
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
      notaSecao:
        "This section is intended for those considering moving forward with an M&A process. Our team can help you prepare the business to maximise value at sale. Contact us for an initial no-obligation conversation.",
      prioridade: "Priority",
      priorityHigh: "High",
      priorityMedium: "Medium",
      acao: "Action",
      impactoEsperado: "Expected impact",
      esforco: "Effort",
      recomendacoesImediatas: "Immediate recommendations",
    },

    p13: {
      titulo: "M&A process",
      hTitulo: "How an M&A process unfolds",
      notaSecao:
        "This section is intended for those considering moving forward with an M&A process. Our team can help you prepare the business to maximise value at sale. Contact us for an initial no-obligation conversation.",
    },

    p14: {
      titulo: "Next step and contacts",
      obrigado: "Thank you.",
      lead: "Thank you for your time. This report is a starting point: turning an indicative estimate into a substantiated valuation requires validating the figures, analysing recent comparable transactions and reading current appetite among financial and strategic investors for your sector.",
      proximoPassoTitulo: "Next step · 20-minute meeting",
      proximoPassoDesc:
        "A joint review of this report's assumptions, strategic options and market context with the Lealia team.",
      agendarReuniao: "Schedule a meeting",
      contactos: "Contacts",
      managingPartner: "Managing Partner",
      notaFinal: (empresa: string) =>
        `This is an indicative document, prepared exclusively for ${empresa}. It does not constitute financial advice or a contractual proposal.`,
    },
  },
};
