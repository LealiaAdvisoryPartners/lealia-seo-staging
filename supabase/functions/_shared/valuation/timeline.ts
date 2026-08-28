export type Fase = {
  numero: string;
  titulo: string;
  duracao: string;
  etapas: string[];
};

export const FASES: Fase[] = [
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
