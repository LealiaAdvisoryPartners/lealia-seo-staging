// Textos multilingues (PT/EN/ES) do e-mail de pagamento confirmado antes da data de entrega.

export type Lang = "pt" | "en" | "es";

// deno-lint-ignore no-explicit-any
export const dict = {
  pt: {
    preview: (data: string) => `Pagamento confirmado. O relatório completo será entregue a ${data}.`,
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "Pagamento confirmado — relatório em elaboração",
    greeting: (nome: string) => `Olá ${nome}`,
    about: ", confirmamos a receção do pagamento do relatório completo de avaliação da ",
    body: "A nossa equipa está a consolidar o modelo financeiro e o relatório completo da empresa.",
    deliveryEyebrow: "DATA DE ENTREGA",
    deliveryTitle: (data: string) => `${data}, às 08:53 (hora de Lisboa)`,
    deliveryBody:
      "Receberá nessa data, por e-mail, o link pessoal para o relatório completo (14 páginas). Não é necessária qualquer ação da sua parte.",
    receiptEyebrow: "DETALHES DO PAGAMENTO",
    valor: "Valor",
    metodo: "Método",
    referencia: "Referência",
    data: "Data",
    partnersNote:
      "Caso pretenda partilhar entretanto informação adicional sobre o negócio, pode responder a este e-mail ou escrever para",
    disclaimer:
      "O relatório preparado constitui uma estimativa indicativa da avaliação da empresa, gerada com base na informação fornecida pelo utilizador, não configurando aconselhamento financeiro, proposta contratual, recomendação de investimento ou avaliação formal para efeitos legais, fiscais ou contabilísticos.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | Pagamento confirmado — relatório em elaboração`,
    subjectWithoutCompany: "Lealia | Pagamento confirmado — relatório em elaboração",
  },
  en: {
    preview: (data: string) => `Payment confirmed. Your full report will be delivered on ${data}.`,
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "Payment confirmed — report in preparation",
    greeting: (nome: string) => `Hello ${nome}`,
    about: ", we confirm receipt of your payment for the full valuation report of ",
    body: "Our team is consolidating the financial model and the full report for the company.",
    deliveryEyebrow: "DELIVERY DATE",
    deliveryTitle: (data: string) => `${data}, at 08:53 (Lisbon time)`,
    deliveryBody:
      "On that date you will receive, by email, your personal link to the full report (14 pages). No action is required on your part.",
    receiptEyebrow: "PAYMENT DETAILS",
    valor: "Amount",
    metodo: "Method",
    referencia: "Reference",
    data: "Date",
    partnersNote:
      "Should you wish to share additional information about the business in the meantime, simply reply to this email or write to",
    disclaimer:
      "This report constitutes an indicative estimate of the company's valuation, generated based on the information provided by the user, and does not constitute financial advice, a contractual proposal, an investment recommendation, or a formal valuation for legal, tax or accounting purposes.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | Payment confirmed — report in preparation`,
    subjectWithoutCompany: "Lealia | Payment confirmed — report in preparation",
  },
  es: {
    preview: (data: string) => `Pago confirmado. El informe completo se entregará el ${data}.`,
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "Pago confirmado — informe en elaboración",
    greeting: (nome: string) => `Hola ${nome}`,
    about: ", confirmamos la recepción del pago del informe completo de valoración de ",
    body: "Nuestro equipo está consolidando el modelo financiero y el informe completo de la empresa.",
    deliveryEyebrow: "FECHA DE ENTREGA",
    deliveryTitle: (data: string) => `${data}, a las 08:53 (hora de Lisboa)`,
    deliveryBody:
      "En esa fecha recibirá, por correo electrónico, el enlace personal al informe completo (14 páginas). No es necesaria ninguna acción por su parte.",
    receiptEyebrow: "DETALLES DEL PAGO",
    valor: "Importe",
    metodo: "Método",
    referencia: "Referencia",
    data: "Fecha",
    partnersNote:
      "Si desea compartir mientras tanto información adicional sobre el negocio, puede responder a este correo o escribir a",
    disclaimer:
      "El presente informe constituye una estimación indicativa de la valoración de la empresa, generada a partir de la información facilitada por el usuario, y no constituye asesoramiento financiero, propuesta contractual, recomendación de inversión ni valoración formal a efectos legales, fiscales o contables.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | Pago confirmado — dossier en elaboración`,
    subjectWithoutCompany: "Lealia | Pago confirmado — dossier en elaboración",
  },
} satisfies Record<Lang, Record<string, any>>;
