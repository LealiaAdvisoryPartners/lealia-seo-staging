// Textos multilingues (PT/EN/ES) do e-mail de confirmação de submissão.

export type Lang = "pt" | "en" | "es";

// deno-lint-ignore no-explicit-any
export const dict = {
  pt: {
    preview: "Recebemos a sua submissão. Enviamos o relatório assim que estiver finalizado.",
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "Obrigado pela sua submissão",
    greeting: (nome: string) => `Olá ${nome}`,
    greetingWithCompany: (nome: string) => `Olá ${nome}`,
    receivedFrom: ", recebemos os dados da ",
    bodyPossivel:
      "A nossa equipa vai agora trabalhar a informação submetida e enviamos-lhe o relatório de avaliação indicativa assim que estiver finalizado.",
    bodyImpossivel1:
      "A informação fornecida não permite, nesta fase, uma estimativa fiável de avaliação da sua empresa.",
    bodyImpossivel2:
      "Isto não significa que não tenha valor: fale connosco para podermos analisar a situação específica e ajudar com um processo de avaliação personalizado.",
    contactPrefix: "Para qualquer questão entretanto, pode contactar-nos através de",
    ctaEyebrow: "PRÓXIMO PASSO — REUNIÃO DE 20 MINUTOS",
    ctaTitlePossivel: "Apresentação do relatório completo.",
    ctaTitleImpossivel: "Análise personalizada da sua empresa.",
    ctaButtonPossivel: "Agendar reunião",
    ctaButtonImpossivel: "Falar com a equipa",
    disclaimer:
      "O relatório preparado constitui uma estimativa indicativa da avaliação da empresa, gerada com base na informação fornecida pelo utilizador, não configurando aconselhamento financeiro, proposta contratual, recomendação de investimento ou avaliação formal para efeitos legais, fiscais ou contabilísticos; os valores nele apresentados dependem da qualidade e exatidão dos dados introduzidos e das condições de mercado vigentes à data de elaboração do documento.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | Recebemos a sua submissão`,
    subjectWithoutCompany: "Lealia | Recebemos a sua submissão",
  },
  en: {
    preview: "We have received your submission. We will send you the report as soon as it is ready.",
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "Thank you for your submission",
    greeting: (nome: string) => `Hello ${nome}`,
    greetingWithCompany: (nome: string) => `Hello ${nome}`,
    receivedFrom: ", we have received the information from ",
    bodyPossivel:
      "Our team will now review the information submitted and we will send you the indicative valuation report as soon as it is finalised.",
    bodyImpossivel1:
      "At this stage, the information provided does not allow for a reliable valuation estimate of your company.",
    bodyImpossivel2:
      "This does not mean your company has no value: get in touch with us so we can review your specific situation and support you with a tailored valuation process.",
    contactPrefix: "Should you have any questions in the meantime, please contact us at",
    ctaEyebrow: "NEXT STEP — 20-MINUTE MEETING",
    ctaTitlePossivel: "Presentation of the full report.",
    ctaTitleImpossivel: "A tailored analysis of your company.",
    ctaButtonPossivel: "Schedule a meeting",
    ctaButtonImpossivel: "Speak with our team",
    disclaimer:
      "This report constitutes an indicative estimate of the company's valuation, generated based on the information provided by the user, and does not constitute financial advice, a contractual proposal, an investment recommendation, or a formal valuation for legal, tax or accounting purposes; the figures presented depend on the quality and accuracy of the data entered and on prevailing market conditions at the time the document was prepared.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | We Received Your Submission`,
    subjectWithoutCompany: "Lealia | We Received Your Submission",
  },
  es: {
    preview: "Hemos recibido su solicitud. Le enviaremos el informe en cuanto esté finalizado.",
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "Gracias por su solicitud",
    greeting: (nome: string) => `Hola ${nome}`,
    greetingWithCompany: (nome: string) => `Hola ${nome}`,
    receivedFrom: ", hemos recibido los datos de ",
    bodyPossivel:
      "Nuestro equipo va a analizar ahora la información remitida y le enviaremos el informe de valoración indicativa en cuanto esté finalizado.",
    bodyImpossivel1:
      "La información facilitada no permite, en esta fase, realizar una estimación fiable de la valoración de su empresa.",
    bodyImpossivel2:
      "Esto no significa que su empresa carezca de valor: póngase en contacto con nosotros para que podamos analizar su situación concreta y ayudarle con un proceso de valoración personalizado.",
    contactPrefix: "Para cualquier consulta mientras tanto, puede contactarnos a través de",
    ctaEyebrow: "PRÓXIMO PASO — REUNIÓN DE 20 MINUTOS",
    ctaTitlePossivel: "Presentación del informe completo.",
    ctaTitleImpossivel: "Análisis personalizado de su empresa.",
    ctaButtonPossivel: "Agendar reunión",
    ctaButtonImpossivel: "Hablar con el equipo",
    disclaimer:
      "El presente informe constituye una estimación indicativa de la valoración de la empresa, generada a partir de la información facilitada por el usuario, y no constituye asesoramiento financiero, propuesta contractual, recomendación de inversión ni valoración formal a efectos legales, fiscales o contables; los valores en él presentados dependen de la calidad y exactitud de los datos introducidos y de las condiciones de mercado vigentes en la fecha de elaboración del documento.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | Informe de Valoración Indicativa Recibido`,
    subjectWithoutCompany: "Lealia | Hemos Recibido su Solicitud",
  },
} satisfies Record<Lang, Record<string, any>>;
