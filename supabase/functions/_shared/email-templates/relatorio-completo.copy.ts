// Textos multilingues (PT/EN/ES) do e-mail entregue após o pagamento do relatório completo.

export type Lang = "pt" | "en" | "es";

// deno-lint-ignore no-explicit-any
export const dict = {
  pt: {
    preview: (nome: string) => `${nome}, o relatório completo de avaliação está disponível.`,
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "Relatório completo de avaliação",
    greeting: (nome: string) => `Olá ${nome}`,
    concludedFrom: ", o relatório completo de ",
    bodyIntro:
      "O relatório completo (14 páginas) está disponível, sem secções reservadas, através do seu link pessoal. O link não expira e pode ser partilhado com quem entender.",
    reportLinkLabel: "Abrir o relatório completo",
    ctaEyebrow: "PRÓXIMO PASSO — CONVERSA COM OS SÓCIOS",
    ctaTitle: "Discussão estratégica do enquadramento de M&A: opções de transação, timing e preparação do processo.",
    ctaButton: "Agendar reunião",
    recibo: (valor: string, referencia: string) => `Pagamento de ${valor} — referência ${referencia}.`,
    disclaimer:
      "O relatório preparado constitui uma estimativa indicativa da avaliação da empresa, gerada com base na informação fornecida pelo utilizador, não configurando aconselhamento financeiro, proposta contratual, recomendação de investimento ou avaliação formal para efeitos legais, fiscais ou contabilísticos.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | Relatório Completo de Avaliação`,
    subjectWithoutCompany: "Lealia | Relatório Completo de Avaliação",
  },
  en: {
    preview: (nome: string) => `${nome}, your full valuation report is available.`,
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "Full valuation report",
    greeting: (nome: string) => `Hello ${nome}`,
    concludedFrom: ", the full report for ",
    bodyIntro:
      "The full report (14 pages) is available, with no reserved sections, through your personal link. The link does not expire and may be shared as you see fit.",
    reportLinkLabel: "Open the full report",
    ctaEyebrow: "NEXT STEP — CONVERSATION WITH THE PARTNERS",
    ctaTitle: "Strategic discussion of the M&A context: transaction options, timing and process preparation.",
    ctaButton: "Schedule a meeting",
    recibo: (valor: string, referencia: string) => `Payment of ${valor} — reference ${referencia}.`,
    disclaimer:
      "This report constitutes an indicative estimate of the company's valuation, generated based on the information provided by the user, and does not constitute financial advice, a contractual proposal, an investment recommendation, or a formal valuation for legal, tax or accounting purposes.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | Full Valuation Report`,
    subjectWithoutCompany: "Lealia | Full Valuation Report",
  },
  es: {
    preview: (nome: string) => `${nome}, el informe completo de valoración está disponible.`,
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "informe completo de valoración",
    greeting: (nome: string) => `Hola ${nome}`,
    concludedFrom: ", el informe completo de ",
    bodyIntro:
      "El informe completo (14 páginas) está disponible, sin secciones reservadas, a través de su enlace personal. El enlace no caduca y puede compartirlo con quien considere.",
    reportLinkLabel: "Abrir el informe completo",
    ctaEyebrow: "PRÓXIMO PASO — CONVERSACIÓN CON LOS SOCIOS",
    ctaTitle: "Discusión estratégica del contexto de M&A: opciones de transacción, timing y preparación del proceso.",
    ctaButton: "Agendar reunión",
    recibo: (valor: string, referencia: string) => `Pago de ${valor} — referencia ${referencia}.`,
    disclaimer:
      "El presente informe constituye una estimación indicativa de la valoración de la empresa, generada a partir de la información facilitada por el usuario, y no constituye asesoramiento financiero, propuesta contractual, recomendación de inversión ni valoración formal a efectos legales, fiscales o contables.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | Informe Completo de Valoración`,
    subjectWithoutCompany: "Lealia | Informe Completo de Valoración",
  },
} satisfies Record<Lang, Record<string, any>>;
