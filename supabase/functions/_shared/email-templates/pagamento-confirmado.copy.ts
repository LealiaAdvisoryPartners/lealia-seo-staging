// Textos multilingues (PT/EN/ES) do e-mail de pagamento confirmado antes da entrega.

export type Lang = "pt" | "en" | "es";

const ref = (r?: string) => (r ? ` (ref. ${r})` : "");

// deno-lint-ignore no-explicit-any
export const dict = {
  pt: {
    preview: "Pagamento confirmado. O relatório completo está em elaboração.",
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "Pagamento confirmado",
    greeting: (nome: string) => `Olá ${nome}.`,
    confirm: (valor: string, referencia?: string) =>
      `Confirmamos a receção do pagamento de ${valor}${ref(referencia)} relativo ao Relatório Completo de Avaliação`,
    of: " da ",
    next:
      "A nossa equipa está a consolidar as projeções financeiras, a análise de sensibilidades e o plano de preparação para o mercado. Assim que concluído, receberá o link de acesso por esta via.",
    invoice: "A fatura será enviada para este e-mail no prazo máximo de 3 dias úteis.",
    note: "Caso pretenda partilhar dados ou documentação adicional entretanto, basta responder a esta mensagem.",
    previewReady: "Pagamento confirmado. O relatório completo já está disponível.",
    nextReady:
      "O seu relatório completo encontra-se disponível e o link de acesso foi enviado numa mensagem autónoma para este e-mail.",
    noteReady: "Para qualquer questão sobre a faturação, basta responder a esta mensagem.",
    disclaimer:
      "O relatório preparado constitui uma estimativa indicativa da avaliação da empresa, gerada com base na informação fornecida pelo utilizador, não configurando aconselhamento financeiro, proposta contratual, recomendação de investimento ou avaliação formal para efeitos legais, fiscais ou contabilísticos.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | Pagamento confirmado`,
    subjectWithoutCompany: "Lealia | Pagamento confirmado",
  },
  en: {
    preview: "Payment confirmed. Your full report is in preparation.",
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "Payment confirmed",
    greeting: (nome: string) => `Hello ${nome}.`,
    confirm: (valor: string, referencia?: string) =>
      `We confirm receipt of your payment of ${valor}${ref(referencia)} for the Full Valuation Report`,
    of: " of ",
    next:
      "Our team is consolidating the financial projections, the sensitivity analysis and the market-readiness plan. Once complete, you will receive your access link by email.",
    invoice: "The invoice will be sent to this email address within 3 business days.",
    note: "Should you wish to share additional data or documentation in the meantime, simply reply to this message.",
    previewReady: "Payment confirmed. Your full report is now available.",
    nextReady:
      "Your full report is now available and the access link has been sent to this email address in a separate message.",
    noteReady: "For any questions regarding invoicing, simply reply to this message.",
    disclaimer:
      "This report constitutes an indicative estimate of the company's valuation, generated based on the information provided by the user, and does not constitute financial advice, a contractual proposal, an investment recommendation, or a formal valuation for legal, tax or accounting purposes.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | Payment confirmed`,
    subjectWithoutCompany: "Lealia | Payment confirmed",
  },
  es: {
    preview: "Pago confirmado. El informe completo está en elaboración.",
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "Pago confirmado",
    greeting: (nome: string) => `Hola ${nome}.`,
    confirm: (valor: string, referencia?: string) =>
      `Confirmamos la recepción del pago de ${valor}${ref(referencia)} relativo al Informe Completo de Valoración`,
    of: " de ",
    next:
      "Nuestro equipo está consolidando las proyecciones financieras, el análisis de sensibilidades y el plan de preparación para el mercado. Una vez concluido, recibirá el enlace de acceso por esta vía.",
    invoice: "La factura se enviará a este correo electrónico en un plazo máximo de 3 días hábiles.",
    note: "Si desea compartir datos o documentación adicional mientras tanto, basta con responder a este mensaje.",
    previewReady: "Pago confirmado. El informe completo ya está disponible.",
    nextReady:
      "Su informe completo ya está disponible y el enlace de acceso se le ha enviado en un mensaje independiente a este correo electrónico.",
    noteReady: "Para cualquier cuestión relativa a la facturación, basta con responder a este mensaje.",
    disclaimer:
      "El presente informe constituye una estimación indicativa de la valoración de la empresa, generada a partir de la información facilitada por el usuario, y no constituye asesoramiento financiero, propuesta contractual, recomendación de inversión ni valoración formal a efectos legales, fiscales o contables.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | Pago confirmado`,
    subjectWithoutCompany: "Lealia | Pago confirmado",
  },
} satisfies Record<Lang, Record<string, any>>;
