// Textos multilingues (PT/EN/ES) do e-mail entregue após o pagamento do relatório completo.

export type Lang = "pt" | "en" | "es";

const ref = (r?: string) => (r ? ` · ref. ${r}` : "");

// deno-lint-ignore no-explicit-any
export const dict = {
  pt: {
    preview: (nome: string) => `${nome}, o relatório completo de avaliação está disponível.`,
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "Relatório completo de avaliação",
    greeting: (nome: string) => `Olá ${nome}.`,
    intro: "O relatório completo de avaliação",
    of: " da ",
    ready: " (14 páginas) encontra-se concluído e disponível para consulta.",
    reportLinkLabel: "Consultar Relatório Completo →",
    recibo: (valor: string, referencia?: string) => `Pagamento recebido: ${valor}${ref(referencia)}`,
    meetingNote: "Gostaria de enquadrar as conclusões com os sócios da Lealia?",
    meetingLink: "Agendar discussão estratégica →",
    disclaimer:
      "O relatório preparado constitui uma estimativa indicativa da avaliação da empresa, gerada com base na informação fornecida pelo utilizador, não configurando aconselhamento financeiro, proposta contratual, recomendação de investimento ou avaliação formal para efeitos legais, fiscais ou contabilísticos.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | Relatório Completo de Avaliação`,
    subjectWithoutCompany: "Lealia | Relatório Completo de Avaliação",
  },
  en: {
    preview: (nome: string) => `${nome}, your full valuation report is available.`,
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "Full valuation report",
    greeting: (nome: string) => `Hello ${nome}.`,
    intro: "The full valuation report",
    of: " for ",
    ready: " (14 pages) is complete and available for review.",
    reportLinkLabel: "View Full Report →",
    recibo: (valor: string, referencia?: string) => `Payment received: ${valor}${ref(referencia)}`,
    meetingNote: "Would you like to discuss the findings with Lealia's partners?",
    meetingLink: "Schedule a strategic discussion →",
    disclaimer:
      "This report constitutes an indicative estimate of the company's valuation, generated based on the information provided by the user, and does not constitute financial advice, a contractual proposal, an investment recommendation, or a formal valuation for legal, tax or accounting purposes.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | Full Valuation Report`,
    subjectWithoutCompany: "Lealia | Full Valuation Report",
  },
  es: {
    preview: (nome: string) => `${nome}, el informe completo de valoración está disponible.`,
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "Informe completo de valoración",
    greeting: (nome: string) => `Hola ${nome}.`,
    intro: "El informe completo de valoración",
    of: " de ",
    ready: " (14 páginas) está concluido y disponible para su consulta.",
    reportLinkLabel: "Consultar Informe Completo →",
    recibo: (valor: string, referencia?: string) => `Pago recibido: ${valor}${ref(referencia)}`,
    meetingNote: "¿Desea analizar las conclusiones con los socios de Lealia?",
    meetingLink: "Agendar discusión estratégica →",
    disclaimer:
      "El presente informe constituye una estimación indicativa de la valoración de la empresa, generada a partir de la información facilitada por el usuario, y no constituye asesoramiento financiero, propuesta contractual, recomendación de inversión ni valoración formal a efectos legales, fiscales o contables.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | Informe Completo de Valoración`,
    subjectWithoutCompany: "Lealia | Informe Completo de Valoración",
  },
} satisfies Record<Lang, Record<string, any>>;
