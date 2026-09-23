// Textos multilingues (PT/EN/ES) do e-mail de relatório de avaliação pronto.

export type Lang = "pt" | "en" | "es";

// deno-lint-ignore no-explicit-any
export const dict = {
  pt: {
    preview: (nome: string) => `Olá ${nome}! O relatório de avaliação indicativa que pediu já está pronto!`,
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "Boas notícias: o seu relatório está pronto 🎉",
    greeting: (nome: string) => `Olá ${nome}`,
    concludedFrom: ", concluímos agora mesmo a avaliação indicativa da ",
    bodyIntro:
      "O seu relatório de avaliação indicativa já está disponível e pode ser consultado através do link abaixo:",
    reportLinkLabel: "Ver o meu relatório →",
    ctaEyebrow: "PRÓXIMO PASSO — REUNIÃO DE 20 MINUTOS",
    ctaTitle: "Apresentação do relatório completo.",
    ctaButton: "Agendar reunião",
    disclaimer:
      "O relatório preparado constitui uma estimativa indicativa da avaliação da empresa, gerada com base na informação fornecida pelo utilizador, não configurando aconselhamento financeiro, proposta contratual, recomendação de investimento ou avaliação formal para efeitos legais, fiscais ou contabilísticos; os valores nele apresentados dependem da qualidade e exatidão dos dados introduzidos e das condições de mercado vigentes à data de elaboração do documento.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | Relatório de Avaliação Indicativa`,
    subjectWithoutCompany: "Lealia | Relatório de Avaliação Indicativa",
  },
  en: {
    preview: (nome: string) => `Hello ${nome}! The indicative valuation report you requested is now ready!`,
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "Good news: your report is ready 🎉",
    greeting: (nome: string) => `Hello ${nome}`,
    concludedFrom: ", we have just completed the indicative valuation of ",
    bodyIntro:
      "Your indicative valuation report is now available and can be accessed through the link below:",
    reportLinkLabel: "View my report →",
    ctaEyebrow: "NEXT STEP — 20-MINUTE MEETING",
    ctaTitle: "Presentation of the full report.",
    ctaButton: "Schedule a meeting",
    disclaimer:
      "This report constitutes an indicative estimate of the company's valuation, generated based on the information provided by the user, and does not constitute financial advice, a contractual proposal, an investment recommendation, or a formal valuation for legal, tax or accounting purposes; the figures presented depend on the quality and accuracy of the data entered and on prevailing market conditions at the time the document was prepared.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | Indicative Valuation Report`,
    subjectWithoutCompany: "Lealia | Indicative Valuation Report",
  },
  es: {
    preview: (nome: string) => `¡Hola ${nome}! El informe de valoración indicativa que solicitó ya está listo!`,
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "Buenas noticias: su informe ya está listo 🎉",
    greeting: (nome: string) => `Hola ${nome}`,
    concludedFrom: ", acabamos de finalizar la valoración indicativa de ",
    bodyIntro:
      "Su informe de valoración indicativa ya está disponible y puede consultarlo a través del siguiente enlace:",
    reportLinkLabel: "Ver mi informe →",
    ctaEyebrow: "PRÓXIMO PASO — REUNIÓN DE 20 MINUTOS",
    ctaTitle: "Presentación del informe completo.",
    ctaButton: "Agendar reunión",
    disclaimer:
      "El presente informe constituye una estimación indicativa de la valoración de la empresa, generada a partir de la información facilitada por el usuario, y no constituye asesoramiento financiero, propuesta contractual, recomendación de inversión ni valoración formal a efectos legales, fiscales o contables; los valores en él presentados dependen de la calidad y exactitud de los datos introducidos y de las condiciones de mercado vigentes en la fecha de elaboración del documento.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | Informe de Valoración Indicativa`,
    subjectWithoutCompany: "Lealia | Informe de Valoración Indicativa",
  },
} satisfies Record<Lang, Record<string, any>>;
