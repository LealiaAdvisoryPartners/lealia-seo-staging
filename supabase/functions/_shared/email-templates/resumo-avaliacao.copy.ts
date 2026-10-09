// Textos multilingues (PT/EN/ES) do e-mail de relatório de avaliação pronto.

export type Lang = "pt" | "en" | "es";

// deno-lint-ignore no-explicit-any
export const dict = {
  pt: {
    upgradeItems: [
      "Avaliação por DCF, com projeções e WACC detalhado",
      "Matriz de sensibilidades WACC vs. crescimento terminal",
      "Ajustamentos ao EBITDA e equity bridge linha a linha",
      "Drivers de valor, riscos e plano de preparação para o mercado",
    ],
    upgradeBody: "Entrega imediata após confirmação do pagamento.",
    meetingNote:
      "Para discutir o enquadramento estratégico e as opções de mercado, pode marcar uma conversa de 20 minutos com os sócios:",
    meetingLink: "agendar reunião",
    preview: (nome: string) => `${nome}, o relatório de avaliação indicativa está disponível.`,
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "Relatório de avaliação indicativa",
    greeting: (nome: string) => `Olá ${nome}`,
    concludedFrom: ", concluímos a avaliação indicativa da ",
    bodyIntro:
      "O relatório preparado pela nossa equipa está disponível para consulta através do seu link pessoal, válido durante 7 dias.",
    reportLinkLabel: "Consultar relatório indicativo",
    ctaEyebrow: "PRÓXIMO PASSO — REUNIÃO DE 20 MINUTOS",
    ctaTitle: "Discussão estratégica e enquadramento de mercado com os sócios.",
    ctaButton: "Agendar reunião",
    upgradeEyebrow: "RELATÓRIO COMPLETO DE AVALIAÇÃO — 299 €",
    upgradeTitle: "As secções reservadas do relatório integram o relatório completo (14 páginas).",
    upgradeButton: "Solicitar o relatório completo →",
    disclaimer:
      "O relatório preparado constitui uma estimativa indicativa da avaliação da empresa, gerada com base na informação fornecida pelo utilizador, não configurando aconselhamento financeiro, proposta contratual, recomendação de investimento ou avaliação formal para efeitos legais, fiscais ou contabilísticos; os valores nele apresentados dependem da qualidade e exatidão dos dados introduzidos e das condições de mercado vigentes à data de elaboração do documento.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | Relatório de Avaliação Indicativa`,
    subjectWithoutCompany: "Lealia | Relatório de Avaliação Indicativa",
  },
  en: {
    upgradeItems: [
      "DCF valuation, with projections and a detailed WACC",
      "Sensitivity matrix: WACC vs. terminal growth",
      "EBITDA adjustments and a line-by-line equity bridge",
      "Value drivers, risks and a market-readiness plan",
    ],
    upgradeBody: "Delivered immediately once payment is confirmed.",
    meetingNote:
      "To discuss the strategic context and market options, you can book a 20-minute conversation with the partners:",
    meetingLink: "schedule a meeting",
    preview: (nome: string) => `${nome}, your indicative valuation report is available.`,
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "Indicative valuation report",
    greeting: (nome: string) => `Hello ${nome}`,
    concludedFrom: ", we have completed the indicative valuation of ",
    bodyIntro: "The report prepared by our team is available through your personal link, valid for 7 days.",
    reportLinkLabel: "View indicative report",
    ctaEyebrow: "NEXT STEP — 20-MINUTE MEETING",
    ctaTitle: "Strategic discussion and market context with the partners.",
    ctaButton: "Schedule a meeting",
    upgradeEyebrow: "FULL VALUATION REPORT — €299",
    upgradeTitle: "The reserved sections of the report form part of the full report (14 pages).",
    upgradeButton: "Request the full report →",
    disclaimer:
      "This report constitutes an indicative estimate of the company's valuation, generated based on the information provided by the user, and does not constitute financial advice, a contractual proposal, an investment recommendation, or a formal valuation for legal, tax or accounting purposes; the figures presented depend on the quality and accuracy of the data entered and on prevailing market conditions at the time the document was prepared.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | Indicative Valuation Report`,
    subjectWithoutCompany: "Lealia | Indicative Valuation Report",
  },
  es: {
    upgradeItems: [
      "Valoración por DCF, con proyecciones y WACC detallado",
      "Matriz de sensibilidades WACC vs. crecimiento terminal",
      "Ajustes al EBITDA y equity bridge línea a línea",
      "Drivers de valor, riesgos y plan de preparación para el mercado",
    ],
    upgradeBody: "Entrega inmediata tras la confirmación del pago, con enlace personal sin caducidad.",
    meetingNote:
      "Para comentar el contexto estratégico y las opciones de mercado, puede agendar una conversación de 20 minutos con los socios:",
    meetingLink: "agendar reunión",
    preview: (nome: string) => `${nome}, el informe de valoración indicativa está disponible.`,
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "Informe de valoración indicativa",
    greeting: (nome: string) => `Hola ${nome}`,
    concludedFrom: ", hemos finalizado la valoración indicativa de ",
    bodyIntro:
      "El informe preparado por nuestro equipo está disponible a través de su enlace personal, válido durante 7 días.",
    reportLinkLabel: "Consultar informe indicativo",
    ctaEyebrow: "PRÓXIMO PASO — REUNIÓN DE 20 MINUTOS",
    ctaTitle: "Discusión estratégica y contexto de mercado con los socios.",
    ctaButton: "Agendar reunión",
    upgradeEyebrow: "INFORME COMPLETO DE VALORACIÓN — 299 €",
    upgradeTitle: "Las secciones reservadas del informe forman parte del informe completo (14 páginas).",
    upgradeButton: "Solicitar el informe completo →",
    disclaimer:
      "El presente informe constituye una estimación indicativa de la valoración de la empresa, generada a partir de la información facilitada por el usuario, y no constituye asesoramiento financiero, propuesta contractual, recomendación de inversión ni valoración formal a efectos legales, fiscales o contables; los valores en él presentados dependen de la calidad y exactitud de los datos introducidos y de las condiciones de mercado vigentes en la fecha de elaboración del documento.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | Informe de Valoración Indicativa`,
    subjectWithoutCompany: "Lealia | Informe de Valoración Indicativa",
  },
} satisfies Record<Lang, Record<string, any>>;
