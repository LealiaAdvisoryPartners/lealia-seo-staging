import type { Language } from "@/lib/routing";

/** Textos da página que aloja o relatório (fora do documento em si). */
export const reportPageCopy = {
  pt: {
    seoTitle: "Relatório de avaliação | Lealia Advisory Partners",
    seoDescription:
      "Relatório personalizado de avaliação indicativa da sua empresa, com metodologia, drivers de valor e recomendações de preparação.",
    loading: "A carregar relatório…",
    preparingTitle: "Análise em preparação",
    preparingText:
      "A nossa equipa está a validar e a trabalhar os dados da sua submissão. Receberá o relatório por e-mail em menos de 3 dias úteis.",
    expiredTitle: "Este relatório expirou",
    missingTitle: "Relatório não encontrado",
    expiredText:
      "O acesso a este relatório era válido durante 7 dias. Agende uma reunião de 20 minutos para rever o relatório completo com a equipa Lealia.",
    missingText:
      "O link poderá estar incompleto ou já não ser válido. Pode gerar uma nova avaliação a qualquer momento.",
    schedule: "Agendar reunião de 20 minutos",
    backTool: "Voltar à ferramenta",
    unlock: "Desbloquear relatório completo",
    back: "Voltar",
    reportOf: "Relatório de avaliação -",
    download: "Descarregar PDF",
    generating: "A gerar PDF…",
  },
  en: {
    seoTitle: "Valuation report | Lealia Advisory Partners",
    seoDescription:
      "Tailored indicative valuation report for your company, with methodology, value drivers and preparation recommendations.",
    loading: "Loading report…",
    preparingTitle: "Analysis in preparation",
    preparingText:
      "Our team is validating and working through the data you submitted. You will receive the report by e-mail in under 3 business days.",
    expiredTitle: "This report has expired",
    missingTitle: "Report not found",
    expiredText:
      "Access to this report was valid for 7 days. Book a 20-minute meeting to review the full report with the Lealia team.",
    missingText: "The link may be incomplete or no longer valid. You can request a new valuation at any time.",
    schedule: "Book a 20-minute meeting",
    backTool: "Back to the tool",
    unlock: "Unlock full report",
    back: "Back",
    reportOf: "Valuation report -",
    download: "Download PDF",
    generating: "Generating PDF…",
  },
  es: {
    seoTitle: "Informe de valoración | Lealia Advisory Partners",
    seoDescription:
      "Informe personalizado de valoración indicativa de su empresa, con metodología, drivers de valor y recomendaciones de preparación.",
    loading: "Cargando informe…",
    preparingTitle: "Análisis en preparación",
    preparingText:
      "Nuestro equipo está validando y trabajando los datos de su envío. Recibirá el informe por correo en menos de 3 días hábiles.",
    expiredTitle: "Este informe ha caducado",
    missingTitle: "Informe no encontrado",
    expiredText:
      "El acceso a este informe era válido durante 7 días. Agende una reunión de 20 minutos para revisar el informe completo con el equipo de Lealia.",
    missingText:
      "El enlace puede estar incompleto o ya no ser válido. Puede solicitar una nueva valoración cuando quiera.",
    schedule: "Agendar reunión de 20 minutos",
    backTool: "Volver a la herramienta",
    unlock: "Desbloquear informe completo",
    back: "Volver",
    reportOf: "Informe de valoración -",
    download: "Descargar PDF",
    generating: "Generando PDF…",
  },
} satisfies Record<Language, Record<string, string>>;

export type ReportPageCopy = (typeof reportPageCopy)["pt"];
