// Textos multilingues (PT/EN/ES) do e-mail entregue após o pagamento do relatório completo.

export type Lang = "pt" | "en" | "es";

// deno-lint-ignore no-explicit-any
export const dict = {
  pt: {
    preview: (nome: string) => `Olá ${nome}! O seu relatório completo de avaliação já está disponível.`,
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "Pagamento confirmado — relatório completo disponível 🎉",
    greeting: (nome: string) => `Olá ${nome}`,
    concludedFrom: ", o relatório completo de ",
    bodyIntro:
      "Recebemos o seu pagamento e o relatório completo já se encontra disponível, sem secções bloqueadas, através do link abaixo. O link é pessoal e não expira.",
    reportLinkLabel: "Abrir o relatório completo →",
    ctaEyebrow: "PRÓXIMO PASSO — REUNIÃO DE 20 MINUTOS",
    ctaTitle: "Apresentação e discussão do relatório completo.",
    ctaButton: "Agendar reunião",
    recibo: (valor: string, referencia: string) => `Pagamento de ${valor} — referência ${referencia}.`,
    disclaimer:
      "O relatório preparado constitui uma estimativa indicativa da avaliação da empresa, gerada com base na informação fornecida pelo utilizador, não configurando aconselhamento financeiro, proposta contratual, recomendação de investimento ou avaliação formal para efeitos legais, fiscais ou contabilísticos.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | Relatório Completo de Avaliação`,
    subjectWithoutCompany: "Lealia | Relatório Completo de Avaliação",
  },
  en: {
    preview: (nome: string) => `Hello ${nome}! Your full valuation report is now available.`,
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "Payment confirmed — your full report is available 🎉",
    greeting: (nome: string) => `Hello ${nome}`,
    concludedFrom: ", the full report for ",
    bodyIntro:
      "We have received your payment and the full report is now available, with no locked sections, through the link below. The link is personal and does not expire.",
    reportLinkLabel: "Open the full report →",
    ctaEyebrow: "NEXT STEP — 20-MINUTE MEETING",
    ctaTitle: "Presentation and discussion of the full report.",
    ctaButton: "Schedule a meeting",
    recibo: (valor: string, referencia: string) => `Payment of ${valor} — reference ${referencia}.`,
    disclaimer:
      "This report constitutes an indicative estimate of the company's valuation, generated based on the information provided by the user, and does not constitute financial advice, a contractual proposal, an investment recommendation, or a formal valuation for legal, tax or accounting purposes.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | Full Valuation Report`,
    subjectWithoutCompany: "Lealia | Full Valuation Report",
  },
  es: {
    preview: (nome: string) => `¡Hola ${nome}! Su informe completo de valoración ya está disponible.`,
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "Pago confirmado — su informe completo está disponible 🎉",
    greeting: (nome: string) => `Hola ${nome}`,
    concludedFrom: ", el informe completo de ",
    bodyIntro:
      "Hemos recibido su pago y el informe completo ya está disponible, sin secciones bloqueadas, a través del siguiente enlace. El enlace es personal y no caduca.",
    reportLinkLabel: "Abrir el informe completo →",
    ctaEyebrow: "PRÓXIMO PASO — REUNIÓN DE 20 MINUTOS",
    ctaTitle: "Presentación y discusión del informe completo.",
    ctaButton: "Agendar reunión",
    recibo: (valor: string, referencia: string) => `Pago de ${valor} — referencia ${referencia}.`,
    disclaimer:
      "El presente informe constituye una estimación indicativa de la valoración de la empresa, generada a partir de la información facilitada por el usuario, y no constituye asesoramiento financiero, propuesta contractual, recomendación de inversión ni valoración formal a efectos legales, fiscales o contables.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | Informe Completo de Valoración`,
    subjectWithoutCompany: "Lealia | Informe Completo de Valoración",
  },
} satisfies Record<Lang, Record<string, any>>;
