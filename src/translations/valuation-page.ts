import type { Language } from "@/contexts/language-context";

export type PageCopy = {
  hero: {
    titlePrefix: string;
    titleAccent: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  howItWorks: {
    eyebrow: string;
    heading: string;
    steps: { n: string; t: string; d: string }[];
  };
  loading: string;
  sampleSection: {
    eyebrow: string;
    heading: string;
  };
  scheduling: {
    heading: string;
    lead: string;
  };
  thankYou: {
    eyebrow: string;
    heading: string;
    ok: {
      p1Prefix: string;
      p1CompanyPrefix: string;
      p1Suffix: string;
      p2Prefix: string;
      email: string;
      nextStepEyebrow: string;
      nextStepText: string;
      cta: string;
    };
    notOk: {
      p1Prefix: string;
      p1CompanyPrefix: string;
      p1Suffix: string;
      p2: string;
      nextStepEyebrow: string;
      nextStepText: string;
      cta: string;
    };
  };
  sampleReport: {
    sections: { numero: string; titulo: string; texto: string }[];
    cta: string;
  };
  resultCard: {
    needCloserLook: string;
    scheduleCta: string;
    eyebrow: string;
    heading: (empresa: string) => string;
    enterpriseValueEyebrow: string;
    mostLikelyValue: string;
    equityValueEyebrow: string;
    includesRealEstate: (v: string) => string;
    calculationBaseEyebrow: string;
    normalizedEbitda: (year: number | string) => string;
    sectorBaseMultiple: string;
    adjustedImpliedMultiple: string;
    equityBridgeEyebrow: string;
    enterpriseValueAvg: string;
    plusCash: string;
    lessDebt: string;
    plusRealEstate: string;
    estimatedEquityValue: string;
    disclaimer: string;
    ctaSample: string;
    ctaSchedule: string;
  };
  timeline: {
    phasePrefix: string;
    footer: string;
  };
};

export const pageCopy: Record<Language, PageCopy> = {
  pt: {
    hero: {
      titlePrefix: "Quanto vale a sua empresa? ",
      titleAccent: "Peça uma análise indicativa gratuita.",
      lead: "Submeta os dados da sua PME. A nossa equipa valida a informação, analisa os indicadores e prepara um relatório completo em poucas horas.",
      ctaPrimary: "Avaliar a minha empresa agora",
      ctaSecondary: "Falar com a equipa",
    },
    howItWorks: {
      eyebrow: "Como funciona",
      heading: "Três passos, uma análise de valor",
      steps: [
        {
          n: "01",
          t: "Preencha o questionário de sete passos",
          d: "Sete passos curtos sobre setor, histórico financeiro e contexto. Realizado em menos de 5 minutos.",
        },
        {
          n: "02",
          t: "Receba o relatório preliminar",
          d: "A nossa equipa valida e analisa os dados, monta a equity bridge da sua empresa\ne envia o relatório para o seu e-mail.",
        },
        {
          n: "03",
          t: "Reveja o relatório completo connosco",
          d: "Agende uma reunião de 20 minutos com a nossa equipa para aceder ao relatório completo e conhecer as suas opções.",
        },
      ],
    },
    loading: "A registar a sua submissão…",
    sampleSection: {
      eyebrow: "Relatório completo",
      heading: "O que recebe numa análise Lealia",
    },
    scheduling: {
      heading: "Fale connosco e aceda ao relatório completo",
      lead: "Numa reunião de 20 minutos, apresentamos os detalhes completos da avaliação, respondemos a todas as suas questões e explicamos-lhe como se processa uma transação de M&A, de A a Z. Totalmente gratuito e sem compromisso.",
    },
    thankYou: {
      eyebrow: "Submissão recebida",
      heading: "Obrigado pela sua submissão",
      ok: {
        p1Prefix: "Recebemos os dados",
        p1CompanyPrefix: " da ",
        p1Suffix:
          ". A nossa equipa vai agora trabalhar a informação submetida e enviamos-lhe o relatório de avaliação indicativa, por email, assim que estiver finalizado.",
        p2Prefix: "Para qualquer questão entretanto, pode contactar-nos através de",
        email: "valuations@lealiaap.com",
        nextStepEyebrow: "Próximo passo — reunião de 20 minutos",
        nextStepText: "Apresentação e discussão do relatório completo com um Managing Partner.",
        cta: "Agendar reunião",
      },
      notOk: {
        p1Prefix: "Recebemos os dados",
        p1CompanyPrefix: " da ",
        p1Suffix:
          ". A informação indicada não permite, nesta fase, uma estimativa automática fiável pelo método de múltiplo de EBITDA.",
        p2: "Isto não significa que não tenha valor: fale connosco para analisarmos a situação específica e ajudarmos com um processo de avaliação personalizado.",
        nextStepEyebrow: "Próximo passo — reunião de 20 minutos",
        nextStepText: "Vamos analisar o perfil da sua empresa e apresentar as opções de avaliação mais adequadas.",
        cta: "Falar com a equipa",
      },
    },
    sampleReport: {
      sections: [
        {
          numero: "01",
          titulo: "Sumário executivo",
          texto:
            "Síntese da posição da empresa, range de Enterprise Value e de Equity Value indicativos e pontos fulcrais da análise.",
        },
        {
          numero: "02",
          titulo: "Perfil da empresa e outros indicadores",
          texto:
            "Retrato do negócio, evolução de faturação e EBITDA dos últimos exercícios, posição líquida e outros indicadores operacionais relevantes.",
        },
        {
          numero: "03",
          titulo: "Qualidade dos resultados",
          texto:
            "Normalização do EBITDA, tratamento de despesas extraordinárias e leitura da sustentabilidade da margem ao longo do período analisado.",
        },
        {
          numero: "04",
          titulo: "Método e alternativas",
          texto:
            "Enquadramente e explicação da metodologia aplicada e comparativo face a abordagens alternativas de avaliação.",
        },
        {
          numero: "05",
          titulo: "Ajustes ao múltiplo",
          texto:
            "Detalhe de cada ajuste aplicado ao múltiplo base do setor: dimensão, crescimento, recorrência, concentração de clientes e dependência da gestão.",
        },
        {
          numero: "06",
          titulo: "Cenários e sensibilidade",
          texto:
            "Análise de sensibilidade do Enterprise Value a variações de EBITDA e de múltiplo, com cenários conservador, base e otimista.",
        },
        {
          numero: "07",
          titulo: "Equity Bridge e contexto da transação",
          texto:
            "Passagem de Enterprise Value a Equity Value — dívida, caixa e imóvel no perímetro — e leitura e enquadramento da estrutura de transação pretendida.",
        },
        {
          numero: "08",
          titulo: "Drivers de valor",
          texto:
            "Identificação e sugestão de plano de ação sobre os principais fatores que expandem ou comprimem o valor do negócio.",
        },
        {
          numero: "09",
          titulo: "Preparação para o mercado",
          texto:
            "Alterações de implementação imediata para maximizar o valor do negócio, com prioridades e horizonte de execução.",
        },
      ],
      cta: "Quero o relatório completo e uma análise personalizada",
    },
    resultCard: {
      needCloserLook: "Precisamos de olhar mais de perto",
      scheduleCta: "Agendar reunião gratuita",
      eyebrow: "Resultado indicativo",
      heading: (empresa) => `A avaliação indicativa da ${empresa}`,
      enterpriseValueEyebrow: "Enterprise Value",
      mostLikelyValue: "Valor mais provável",
      equityValueEyebrow: "Equity Value (valor para o acionista)",
      includesRealEstate: (v) => `Inclui ${v} de valor imobiliário adicionado ao valor da empresa.`,
      calculationBaseEyebrow: "Base do cálculo",
      normalizedEbitda: (year) => `EBITDA normalizado (${year})`,
      sectorBaseMultiple: "Múltiplo base do setor",
      adjustedImpliedMultiple: "Múltiplo implícito ajustado",
      equityBridgeEyebrow: "Equity Bridge",
      enterpriseValueAvg: "Enterprise Value (valor médio)",
      plusCash: "Mais: caixa, depósitos e outros equivalentes",
      lessDebt: "Menos: dívida total",
      plusRealEstate: "Mais: imóvel no perímetro",
      estimatedEquityValue: "Equity Value estimado",
      disclaimer:
        "O relatório preparado constitui uma estimativa indicativa da avaliação da empresa, gerada com base na informação fornecida pelo utilizador, não configurando aconselhamento financeiro, proposta contratual, recomendação de investimento ou avaliação formal para efeitos legais, fiscais ou contabilísticos; os valores nele apresentados dependem da qualidade e exatidão dos dados introduzidos e das condições de mercado vigentes à data de elaboração do documento.",
      ctaSample: "Ver exemplo de relatório completo",
      ctaSchedule: "Agendar reunião",
    },
    timeline: {
      phasePrefix: "Fase",
      footer:
        "Um processo de M&A típico demora entre 6 a 7 meses, do mandato ao closing — razão pela qual vale a pena ter a primeira conversa cedo.",
    },
  },
  en: {
    hero: {
      titlePrefix: "How much is your company worth? ",
      titleAccent: "Request a free indicative analysis.",
      lead: "Submit your SME's data. Our team validates the information, analyses the key indicators and prepares a full report within a few hours.",
      ctaPrimary: "Value my company now",
      ctaSecondary: "Speak with our team",
    },
    howItWorks: {
      eyebrow: "How it works",
      heading: "Three steps to a valuation",
      steps: [
        {
          n: "01",
          t: "Complete the seven-step questionnaire",
          d: "Seven brief steps covering sector, financial history and context. Completed in under 5 minutes.",
        },
        {
          n: "02",
          t: "Receive the preliminary report",
          d: "Our team validates and analyses the data, builds your company's equity bridge\nand sends the report to your inbox.",
        },
        {
          n: "03",
          t: "Review the full report with us",
          d: "Schedule a 20-minute meeting with our team to access the full report and explore your options.",
        },
      ],
    },
    loading: "Registering your submission…",
    sampleSection: {
      eyebrow: "Full report",
      heading: "What you receive with a Lealia analysis",
    },
    scheduling: {
      heading: "Speak with us and access the full report",
      lead: "In a 20-minute meeting, we present the full valuation details, answer all your questions and walk you through how an M&A transaction unfolds, from start to finish. Entirely free of charge and with no obligation.",
    },
    thankYou: {
      eyebrow: "Submission received",
      heading: "Thank you for your submission",
      ok: {
        p1Prefix: "We have received the data",
        p1CompanyPrefix: " for ",
        p1Suffix:
          ". Our team will now review the information submitted and will send you the indicative valuation report by email as soon as it is ready.",
        p2Prefix: "In the meantime, for any questions you can reach us at",
        email: "valuations@lealiaap.com",
        nextStepEyebrow: "Next step — 20-minute meeting",
        nextStepText: "Presentation and discussion of the full report with a Managing Partner.",
        cta: "Schedule a meeting",
      },
      notOk: {
        p1Prefix: "We have received the data",
        p1CompanyPrefix: " for ",
        p1Suffix:
          ". Based on the information provided, we are unable at this stage to produce a reliable automated estimate using the EBITDA multiple method.",
        p2: "This does not mean your company has no value: speak with us so we can review your specific situation and support you with a tailored valuation process.",
        nextStepEyebrow: "Next step — 20-minute meeting",
        nextStepText: "We will review your company's profile and present the most suitable valuation options.",
        cta: "Speak with our team",
      },
    },
    sampleReport: {
      sections: [
        {
          numero: "01",
          titulo: "Executive summary",
          texto:
            "Summary of the company's position, indicative Enterprise Value and Equity Value ranges, and the key takeaways of the analysis.",
        },
        {
          numero: "02",
          titulo: "Company profile and other indicators",
          texto:
            "Overview of the business, revenue and EBITDA trends over recent financial years, net debt position and other relevant operating indicators.",
        },
        {
          numero: "03",
          titulo: "Quality of earnings",
          texto:
            "EBITDA normalisation, treatment of extraordinary expenses, and an assessment of margin sustainability over the period analysed.",
        },
        {
          numero: "04",
          titulo: "Methodology and alternatives",
          texto:
            "Overview and explanation of the methodology applied, benchmarked against alternative valuation approaches.",
        },
        {
          numero: "05",
          titulo: "Multiple adjustments",
          texto:
            "Detail of each adjustment applied to the sector's base multiple: size, growth, recurrence, customer concentration and management dependency.",
        },
        {
          numero: "06",
          titulo: "Scenarios and sensitivity",
          texto:
            "Sensitivity analysis of Enterprise Value to changes in EBITDA and multiple, across conservative, base and optimistic scenarios.",
        },
        {
          numero: "07",
          titulo: "Equity bridge and transaction context",
          texto:
            "Bridge from Enterprise Value to Equity Value — debt, cash and real estate within the perimeter — together with an assessment of the intended transaction structure.",
        },
        {
          numero: "08",
          titulo: "Value drivers",
          texto:
            "Identification of, and suggested action plan for, the key factors that expand or compress the value of the business.",
        },
        {
          numero: "09",
          titulo: "Market readiness",
          texto:
            "Immediate actions to maximise the value of the business, with priorities and an execution timeline.",
        },
      ],
      cta: "I want the full report and a tailored analysis",
    },
    resultCard: {
      needCloserLook: "We need to take a closer look",
      scheduleCta: "Schedule a free meeting",
      eyebrow: "Indicative result",
      heading: (empresa) => `Indicative valuation for ${empresa}`,
      enterpriseValueEyebrow: "Enterprise Value",
      mostLikelyValue: "Most likely value",
      equityValueEyebrow: "Equity Value (value to shareholders)",
      includesRealEstate: (v) => `Includes ${v} of real estate value added to the enterprise value.`,
      calculationBaseEyebrow: "Basis of the calculation",
      normalizedEbitda: (year) => `Normalised EBITDA (${year})`,
      sectorBaseMultiple: "Sector base multiple",
      adjustedImpliedMultiple: "Adjusted implied multiple",
      equityBridgeEyebrow: "Equity bridge",
      enterpriseValueAvg: "Enterprise Value (mid-point)",
      plusCash: "Plus: cash, deposits and other equivalents",
      lessDebt: "Less: total debt",
      plusRealEstate: "Plus: real estate within the perimeter",
      estimatedEquityValue: "Estimated Equity Value",
      disclaimer:
        "This report constitutes an indicative estimate of the company's valuation, generated on the basis of the information provided by the user. It does not constitute financial advice, a contractual proposal, an investment recommendation, or a formal valuation for legal, tax or accounting purposes; the figures presented depend on the quality and accuracy of the data entered and on market conditions prevailing at the time the document was prepared.",
      ctaSample: "View a sample of the full report",
      ctaSchedule: "Schedule a meeting",
    },
    timeline: {
      phasePrefix: "Phase",
      footer:
        "A typical M&A process takes between 6 and 7 months, from mandate to closing — which is why it is worth having the first conversation early.",
    },
  },
  es: {
    hero: {
      titlePrefix: "¿Cuánto vale su empresa? ",
      titleAccent: "Solicite un análisis indicativo gratuito.",
      lead: "Envíe los datos de su pyme. Nuestro equipo valida la información, analiza los indicadores clave y prepara un informe completo en pocas horas.",
      ctaPrimary: "Valorar mi empresa ahora",
      ctaSecondary: "Hablar con el equipo",
    },
    howItWorks: {
      eyebrow: "Cómo funciona",
      heading: "Tres pasos, un análisis de valor",
      steps: [
        {
          n: "01",
          t: "Complete el cuestionario de siete pasos",
          d: "Siete pasos breves sobre sector, historial financiero y contexto. Se completa en menos de 5 minutos.",
        },
        {
          n: "02",
          t: "Reciba el informe preliminar",
          d: "Nuestro equipo valida y analiza los datos, construye el equity bridge de su empresa\ny le envía el informe a su correo electrónico.",
        },
        {
          n: "03",
          t: "Revise el informe completo con nosotros",
          d: "Programe una reunión de 20 minutos con nuestro equipo para acceder al informe completo y conocer sus opciones.",
        },
      ],
    },
    loading: "Registrando su envío…",
    sampleSection: {
      eyebrow: "Informe completo",
      heading: "Lo que recibe con un análisis Lealia",
    },
    scheduling: {
      heading: "Hable con nosotros y acceda al informe completo",
      lead: "En una reunión de 20 minutos, presentamos los detalles completos de la valoración, respondemos a todas sus preguntas y le explicamos cómo se desarrolla una transacción de M&A, de principio a fin. Totalmente gratuito y sin compromiso.",
    },
    thankYou: {
      eyebrow: "Envío recibido",
      heading: "Gracias por su envío",
      ok: {
        p1Prefix: "Hemos recibido los datos",
        p1CompanyPrefix: " de ",
        p1Suffix:
          ". Nuestro equipo trabajará ahora la información enviada y le remitiremos el informe de valoración indicativa por correo electrónico en cuanto esté finalizado.",
        p2Prefix: "Para cualquier duda mientras tanto, puede contactarnos en",
        email: "valuations@lealiaap.com",
        nextStepEyebrow: "Próximo paso — reunión de 20 minutos",
        nextStepText: "Presentación y análisis del informe completo con un Managing Partner.",
        cta: "Programar reunión",
      },
      notOk: {
        p1Prefix: "Hemos recibido los datos",
        p1CompanyPrefix: " de ",
        p1Suffix:
          ". La información indicada no permite, en esta fase, obtener una estimación automática fiable mediante el método del múltiplo de EBITDA.",
        p2: "Esto no significa que su empresa no tenga valor: hable con nosotros para analizar su situación concreta y ayudarle con un proceso de valoración personalizado.",
        nextStepEyebrow: "Próximo paso — reunión de 20 minutos",
        nextStepText: "Analizaremos el perfil de su empresa y le presentaremos las opciones de valoración más adecuadas.",
        cta: "Hablar con el equipo",
      },
    },
    sampleReport: {
      sections: [
        {
          numero: "01",
          titulo: "Resumen ejecutivo",
          texto:
            "Síntesis de la posición de la empresa, rango indicativo de Enterprise Value y Equity Value, y puntos clave del análisis.",
        },
        {
          numero: "02",
          titulo: "Perfil de la empresa y otros indicadores",
          texto:
            "Retrato del negocio, evolución de la facturación y del EBITDA en los últimos ejercicios, posición de deuda neta y otros indicadores operativos relevantes.",
        },
        {
          numero: "03",
          titulo: "Calidad de los resultados",
          texto:
            "Normalización del EBITDA, tratamiento de gastos extraordinarios y análisis de la sostenibilidad del margen a lo largo del periodo analizado.",
        },
        {
          numero: "04",
          titulo: "Método y alternativas",
          texto:
            "Explicación de la metodología aplicada y comparación con enfoques alternativos de valoración.",
        },
        {
          numero: "05",
          titulo: "Ajustes al múltiplo",
          texto:
            "Detalle de cada ajuste aplicado al múltiplo base del sector: tamaño, crecimiento, recurrencia, concentración de clientes y dependencia de la dirección.",
        },
        {
          numero: "06",
          titulo: "Escenarios y sensibilidad",
          texto:
            "Análisis de sensibilidad del Enterprise Value ante variaciones del EBITDA y del múltiplo, con escenarios conservador, base y optimista.",
        },
        {
          numero: "07",
          titulo: "Equity bridge y contexto de la transacción",
          texto:
            "Paso de Enterprise Value a Equity Value —deuda, caja e inmueble dentro del perímetro— y análisis de la estructura de transacción prevista.",
        },
        {
          numero: "08",
          titulo: "Drivers de valor",
          texto:
            "Identificación y propuesta de plan de acción sobre los principales factores que amplían o reducen el valor del negocio.",
        },
        {
          numero: "09",
          titulo: "Preparación para el mercado",
          texto:
            "Cambios de implementación inmediata para maximizar el valor del negocio, con prioridades y horizonte de ejecución.",
        },
      ],
      cta: "Quiero el informe completo y un análisis personalizado",
    },
    resultCard: {
      needCloserLook: "Necesitamos analizarlo más de cerca",
      scheduleCta: "Programar reunión gratuita",
      eyebrow: "Resultado indicativo",
      heading: (empresa) => `Valoración indicativa de ${empresa}`,
      enterpriseValueEyebrow: "Enterprise Value",
      mostLikelyValue: "Valor más probable",
      equityValueEyebrow: "Equity Value (valor para el accionista)",
      includesRealEstate: (v) => `Incluye ${v} de valor inmobiliario añadido al valor de la empresa.`,
      calculationBaseEyebrow: "Base del cálculo",
      normalizedEbitda: (year) => `EBITDA normalizado (${year})`,
      sectorBaseMultiple: "Múltiplo base del sector",
      adjustedImpliedMultiple: "Múltiplo implícito ajustado",
      equityBridgeEyebrow: "Equity bridge",
      enterpriseValueAvg: "Enterprise Value (valor medio)",
      plusCash: "Más: caja, depósitos y otros equivalentes",
      lessDebt: "Menos: deuda total",
      plusRealEstate: "Más: inmueble dentro del perímetro",
      estimatedEquityValue: "Equity Value estimado",
      disclaimer:
        "El informe elaborado constituye una estimación indicativa de la valoración de la empresa, generada a partir de la información facilitada por el usuario, y no constituye asesoramiento financiero, propuesta contractual, recomendación de inversión ni valoración formal a efectos legales, fiscales o contables; los valores presentados dependen de la calidad y exactitud de los datos introducidos y de las condiciones de mercado vigentes en la fecha de elaboración del documento.",
      ctaSample: "Ver un ejemplo del informe completo",
      ctaSchedule: "Programar reunión",
    },
    timeline: {
      phasePrefix: "Fase",
      footer:
        "Un proceso de M&A típico dura entre 6 y 7 meses, desde el mandato hasta el cierre, por lo que conviene mantener la primera conversación cuanto antes.",
    },
  },
};
