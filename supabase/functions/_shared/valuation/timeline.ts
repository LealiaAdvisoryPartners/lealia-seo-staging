export type Fase = {
  numero: string;
  titulo: string;
  duracao: string;
  etapas: string[];
};

import type { ReportLang } from "./report-i18n/index.ts";

const FASES_PT: Fase[] = [
  {
    numero: "01",
    titulo: "Kick-Off",
    duracao: "~2-3 semanas",
    etapas: [
      "Assinatura do contrato & NDA — Formalização do mandato, alinhamento de objetivos, expectativas e forma de trabalho conjunta.",
      "Pedido de informação inicial — Envio da lista de informação necessária para compreender o negócio e estruturar a transação.",
      "Envio da informação & reunião de esclarecimento — Partilha dos dados chave pelo cliente e reunião para clarificar dúvidas.",
      "Análise da informação e preparação de materiais comerciais — Estruturação da \u201Cequity story\u201D e preparação dos materiais de marketing (teaser, info memo).",
    ],
  },
  {
    numero: "02",
    titulo: "Contactos Iniciais e Primeira Oferta",
    duracao: "~8-10 semanas",
    etapas: [
      "Contactos iniciais com potenciais investidores financeiros e/ou estratégicos — Abordagem discreta a investidores selecionados e envio de materiais anonimizados.",
      "Reuniões introdutórias com investidores interessados — Reuniões de enquadramento para apresentar o negócio e avaliar o grau de interesse.",
      "Resposta a pedidos de informação adicionais dos investidores.",
      "Receção e análise de propostas indicativas — Investidores apresentam propostas indicativas; comparação de condições e valorização.",
      "Seleção de investidor(es) preferencial(is) & negociação da proposta vinculativa — Negociação dos principais termos (cálculo e mecanismo do preço, ajustamentos).",
    ],
  },
  {
    numero: "03",
    titulo: "Due Diligence",
    duracao: "~6-8 semanas",
    etapas: [
      "Due diligence financeira, fiscal e de negócio — Análise detalhada de demonstrações financeiras, impostos, performance operacional e plano de negócios.",
      "Due diligence legal e documental — Revisão de contratos, estrutura societária, compliance e contingências legais.",
      "Gestão de Q&A e reuniões de follow-up de due diligence.",
      "Consolidação de conclusões de due diligence & alinhamento em ajustamentos.",
    ],
  },
  {
    numero: "04",
    titulo: "Transaction Documents",
    duracao: "~5-6 semanas",
    etapas: [
      "Confirmação e renegociação de mecanismos de preço e ajustamentos (net debt, fundo de maneio, earn-out).",
      "Redação e negociação do SPA e documentos acessórios.",
      "Signing da documentação definitiva.",
    ],
  },
  {
    numero: "05",
    titulo: "Closing",
    duracao: "~4-5 semanas",
    etapas: [
      "Cumprimento de condições precedentes e preparação do closing (autorizações regulatórias, consentimentos de terceiros).",
      "Closing & anúncio da transação — Transferência de capital/ações e comunicação às partes relevantes.",
    ],
  },
];

const FASES_EN: Fase[] = [
  {
    numero: "01",
    titulo: "Kick-Off",
    duracao: "~2-3 weeks",
    etapas: [
      "Signing the engagement letter & NDA — Formalising the mandate and aligning objectives, expectations and ways of working.",
      "Initial information request — Sending the information list needed to understand the business and structure the transaction.",
      "Information delivery & clarification meeting — Sharing key data and resolving initial questions.",
      "Information analysis and preparation of marketing materials — Building the equity story and preparing the teaser and information memorandum.",
    ],
  },
  {
    numero: "02",
    titulo: "Initial Outreach and First Offer",
    duracao: "~8-10 weeks",
    etapas: [
      "Initial outreach to selected financial and strategic investors — Discreet approach and distribution of anonymised materials.",
      "Introductory meetings with interested investors — Presenting the business and assessing their level of interest.",
      "Responses to investors' additional information requests.",
      "Receipt and analysis of indicative offers — Comparing valuation and key terms.",
      "Selection of preferred investor(s) & negotiation of the binding offer — Negotiating price mechanics and adjustments.",
    ],
  },
  {
    numero: "03",
    titulo: "Due Diligence",
    duracao: "~6-8 weeks",
    etapas: [
      "Financial, tax and commercial due diligence — Detailed review of financial statements, tax, operational performance and the business plan.",
      "Legal and documentary due diligence — Review of contracts, corporate structure, compliance and legal contingencies.",
      "Management of Q&A and due-diligence follow-up meetings.",
      "Consolidation of due-diligence findings & alignment on adjustments.",
    ],
  },
  {
    numero: "04",
    titulo: "Transaction Documents",
    duracao: "~5-6 weeks",
    etapas: [
      "Confirmation and renegotiation of price mechanisms and adjustments (net debt, working capital, earn-out).",
      "Drafting and negotiation of the SPA and ancillary documents.",
      "Signing of the definitive documentation.",
    ],
  },
  {
    numero: "05",
    titulo: "Closing",
    duracao: "~4-5 weeks",
    etapas: [
      "Satisfaction of conditions precedent and closing preparation (regulatory approvals and third-party consents).",
      "Closing & transaction announcement — Transfer of ownership/shares and communication to relevant stakeholders.",
    ],
  },
];

const FASES_ES: Fase[] = [
  {
    numero: "01",
    titulo: "Kick-Off",
    duracao: "~2-3 semanas",
    etapas: [
      "Firma del contrato y NDA — Formalización del mandato y alineación de objetivos, expectativas y forma de trabajo.",
      "Solicitud inicial de información — Envío de la lista necesaria para comprender el negocio y estructurar la transacción.",
      "Entrega de información y reunión de aclaración — Puesta en común de los datos clave y resolución de dudas iniciales.",
      "Análisis de la información y preparación de materiales comerciales — Desarrollo de la equity story y preparación del teaser y del cuaderno de venta.",
    ],
  },
  {
    numero: "02",
    titulo: "Contactos iniciales y primera oferta",
    duracao: "~8-10 semanas",
    etapas: [
      "Contacto inicial con inversores financieros y estratégicos seleccionados — Aproximación discreta y envío de materiales anonimizados.",
      "Reuniones introductorias con inversores interesados — Presentación del negocio y evaluación del grado de interés.",
      "Respuesta a solicitudes de información adicional de los inversores.",
      "Recepción y análisis de ofertas indicativas — Comparación de valoración y condiciones.",
      "Selección de inversor(es) preferente(s) y negociación de la oferta vinculante — Negociación del precio, mecanismos y ajustes.",
    ],
  },
  {
    numero: "03",
    titulo: "Due Diligence",
    duracao: "~6-8 semanas",
    etapas: [
      "Due diligence financiera, fiscal y de negocio — Revisión detallada de estados financieros, fiscalidad, desempeño operativo y plan de negocio.",
      "Due diligence legal y documental — Revisión de contratos, estructura societaria, cumplimiento y contingencias legales.",
      "Gestión de Q&A y reuniones de seguimiento de due diligence.",
      "Consolidación de conclusiones de due diligence y alineación de ajustes.",
    ],
  },
  {
    numero: "04",
    titulo: "Documentación de la transacción",
    duracao: "~5-6 semanas",
    etapas: [
      "Confirmación y renegociación de mecanismos de precio y ajustes (deuda neta, capital circulante, earn-out).",
      "Redacción y negociación del SPA y de los documentos accesorios.",
      "Firma de la documentación definitiva.",
    ],
  },
  {
    numero: "05",
    titulo: "Cierre",
    duracao: "~4-5 semanas",
    etapas: [
      "Cumplimiento de condiciones precedentes y preparación del cierre (autorizaciones regulatorias y consentimientos de terceros).",
      "Cierre y anuncio de la transacción — Transmisión del capital/acciones y comunicación a las partes relevantes.",
    ],
  },
];

export function getFases(lang: ReportLang): Fase[] {
  if (lang === "en") return FASES_EN;
  if (lang === "es") return FASES_ES;
  return FASES_PT;
}
