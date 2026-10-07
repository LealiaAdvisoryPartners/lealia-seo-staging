import type { Language } from "@/contexts/language-context";

export type CheckoutCopy = {
  eyebrow: string;
  heading: string;
  lead: string;
  priceNote: string;
  methodTitle: string;
  methods: { mbway: string; card: string; cardNote: string };
  phoneLabel: string;
  phonePlaceholder: string;
  invoiceToggle: string;
  invoiceNote: string;
  nifLabel: string;
  fiscalNameLabel: string;
  addressLabel: string;
  submit: string;
  submitting: string;
  waitingTitle: string;
  waitingText: string;
  redirectText: string;
  paidTitle: string;
  paidText: string;
  openReport: string;
  backToReport: string;
  alreadyPaid: string;
  terms: string;
  summary: { brand: string; product: string; reference: string; subtotal: string; vat: string; total: string; secure: string; confidential: string; support: string; paymentTitle: string; cta: string };
  errors: {
    generic: string;
    phone: string;
    missingRef: string;
    notFound: string;
    gateway: string;
    declined: string;
  };
};

export const checkoutCopy: Record<Language, CheckoutCopy> = {
  pt: {
    eyebrow: "RELATÓRIO COMPLETO",
    heading: "Desbloqueie a avaliação integral da sua empresa",
    lead: "O relatório completo entrega a análise sem secções bloqueadas, com avaliação por múltiplos e por fluxos de caixa descontados, análises de sensibilidade e um plano concreto de preparação para o mercado.",
    priceNote: "Pagamento único · IVA incluído",
    methodTitle: "Como quer pagar?",
    methods: {
      mbway: "MB WAY",
      card: "Cartão",
      cardNote: "Visa, Mastercard, Apple Pay e Google Pay",
    },
    phoneLabel: "Telemóvel associado ao MB WAY",
    phonePlaceholder: "912 345 678",
    invoiceToggle: "Pretendo fatura com dados fiscais",
    invoiceNote: "Sem estes dados, a fatura é emitida como consumidor final.",
    nifLabel: "NIF",
    fiscalNameLabel: "Nome ou designação social",
    addressLabel: "Morada de faturação",
    submit: "Pagar 299 €",
    submitting: "A preparar o pagamento…",
    waitingTitle: "A confirmar o pagamento",
    waitingText: "Estamos a confirmar o pagamento junto da Stripe. Demora apenas uns segundos.",
    redirectText: "A encaminhar para o pagamento seguro…",
    paidTitle: "Pagamento confirmado",
    paidText: "O relatório completo está disponível e seguiu também para o seu email.",
    openReport: "Abrir o relatório completo",
    backToReport: "Voltar ao relatório",
    alreadyPaid: "Esta avaliação já tem o relatório completo pago. Verifique o email que lhe enviámos.",
    summary: { brand: "LEALIA ADVISORY · AVALIAÇÃO DE EMPRESAS", product: "Dossiê integral de avaliação", reference: "Avaliação associada", subtotal: "Subtotal", vat: "IVA (23%)", total: "Total a pagar", secure: "Pagamento encriptado e processado pela Stripe", confidential: "Sigilo profissional e confidencialidade estrita", support: "Dúvidas? geral@lealiaap.com", paymentTitle: "Pagamento", cta: "Prosseguir para pagamento seguro · 299 €" },
    terms: "Ao pagar, aceita os Termos e Condições e a Política de Privacidade.",
    errors: {
      generic: "Não foi possível concluir o pagamento. Tente novamente dentro de instantes.",
      phone: "Indique um número de telemóvel válido para o MB WAY.",
      missingRef: "Falta a referência da avaliação. Use o link que recebeu por email.",
      notFound: "Não encontrámos esta avaliação. Use o link que recebeu por email.",
      gateway: "O serviço de pagamentos não respondeu. Tente novamente dentro de instantes.",
      declined: "O pagamento não foi autorizado. Pode tentar de novo ou usar outro método.",
    },
  },
  en: {
    eyebrow: "FULL REPORT",
    heading: "Unlock the complete valuation of your company",
    lead: "The full report delivers the analysis with no locked sections: market multiples and discounted cash flow valuation, sensitivity analyses and a concrete market-readiness plan.",
    priceNote: "One-off payment · VAT included",
    methodTitle: "How would you like to pay?",
    methods: {
      mbway: "MB WAY",
      card: "Card",
      cardNote: "Visa, Mastercard, Apple Pay and Google Pay",
    },
    phoneLabel: "Mobile number linked to MB WAY",
    phonePlaceholder: "912 345 678",
    invoiceToggle: "I would like an invoice with tax details",
    invoiceNote: "Without these details, the invoice is issued to a final consumer.",
    nifLabel: "Tax number",
    fiscalNameLabel: "Name or company name",
    addressLabel: "Billing address",
    submit: "Pay €299",
    submitting: "Preparing your payment…",
    waitingTitle: "Confirming your payment",
    waitingText: "We are confirming your payment with Stripe. This only takes a few seconds.",
    redirectText: "Taking you to the secure payment page…",
    paidTitle: "Payment confirmed",
    paidText: "The full report is available and has also been sent to your email.",
    openReport: "Open the full report",
    backToReport: "Back to the report",
    alreadyPaid: "The full report for this valuation has already been paid. Please check the email we sent you.",
    summary: { brand: "LEALIA ADVISORY · BUSINESS VALUATION", product: "Full valuation dossier", reference: "Linked valuation", subtotal: "Subtotal", vat: "VAT (23%)", total: "Total due", secure: "Encrypted payment processed by Stripe", confidential: "Professional secrecy and strict confidentiality", support: "Questions? geral@lealiaap.com", paymentTitle: "Payment", cta: "Continue to secure payment · €299" },
    terms: "By paying, you accept the Terms and Conditions and the Privacy Policy.",
    errors: {
      generic: "We could not complete the payment. Please try again shortly.",
      phone: "Please enter a valid mobile number for MB WAY.",
      missingRef: "The valuation reference is missing. Please use the link we emailed you.",
      notFound: "We could not find this valuation. Please use the link we emailed you.",
      gateway: "The payment service did not respond. Please try again shortly.",
      declined: "The payment was not authorised. You can try again or use another method.",
    },
  },
  es: {
    eyebrow: "INFORME COMPLETO",
    heading: "Desbloquee la valoración integral de su empresa",
    lead: "El informe completo entrega el análisis sin secciones bloqueadas, con valoración por múltiplos y por flujos de caja descontados, análisis de sensibilidad y un plan concreto de preparación para el mercado.",
    priceNote: "Pago único · IVA incluido",
    methodTitle: "¿Cómo desea pagar?",
    methods: {
      mbway: "MB WAY",
      card: "Tarjeta",
      cardNote: "Visa, Mastercard, Apple Pay y Google Pay",
    },
    phoneLabel: "Móvil asociado a MB WAY",
    phonePlaceholder: "912 345 678",
    invoiceToggle: "Deseo factura con datos fiscales",
    invoiceNote: "Sin estos datos, la factura se emite como consumidor final.",
    nifLabel: "NIF",
    fiscalNameLabel: "Nombre o razón social",
    addressLabel: "Dirección de facturación",
    submit: "Pagar 299 €",
    submitting: "Preparando el pago…",
    waitingTitle: "Confirmando el pago",
    waitingText: "Estamos confirmando el pago con Stripe. Solo tarda unos segundos.",
    redirectText: "Redirigiendo al pago seguro…",
    paidTitle: "Pago confirmado",
    paidText: "El informe completo está disponible y también se ha enviado a su email.",
    openReport: "Abrir el informe completo",
    backToReport: "Volver al informe",
    alreadyPaid: "Esta valoración ya tiene el informe completo pagado. Consulte el email que le enviamos.",
    summary: { brand: "LEALIA ADVISORY · VALORACIÓN DE EMPRESAS", product: "Dossier integral de valoración", reference: "Valoración asociada", subtotal: "Subtotal", vat: "IVA (23%)", total: "Total a pagar", secure: "Pago cifrado y procesado por Stripe", confidential: "Secreto profesional y confidencialidad estricta", support: "¿Dudas? geral@lealiaap.com", paymentTitle: "Pago", cta: "Continuar al pago seguro · 299 €" },
    terms: "Al pagar, acepta los Términos y Condiciones y la Política de Privacidad.",
    errors: {
      generic: "No ha sido posible completar el pago. Inténtelo de nuevo en unos instantes.",
      phone: "Indique un número de móvil válido para MB WAY.",
      missingRef: "Falta la referencia de la valoración. Utilice el enlace que recibió por email.",
      notFound: "No hemos encontrado esta valoración. Utilice el enlace que recibió por email.",
      gateway: "El servicio de pagos no ha respondido. Inténtelo de nuevo en unos instantes.",
      declined: "El pago no fue autorizado. Puede intentarlo de nuevo o usar otro método.",
    },
  },
};
