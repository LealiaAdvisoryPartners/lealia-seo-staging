import { ReportDocument } from "@/components/lealia/ReportDocument";
import { buildReportFromLead, type ReportLead } from "@/lib/report-data";

const LEAD: ReportLead = {
  nome: "Teste",
  empresa: "Empresa Teste, Lda.",
  pais: "Portugal",
  industria: "Serviços B2B",
  num_colaboradores: "11-50",
  num_clientes_ativos: "21-50",
  idade_empresa: 12,
  ano_referencia: 2025,
  tipo_periodo: "anual",
  faturacao_ano1: 1000000,
  faturacao_ano2: 2000000,
  faturacao_ano3: 4000000,
  ebitda_ano1: 150000,
  ebitda_ano2: 380000,
  ebitda_ano3: 720000,
  despesas_extraordinarias_ano1: 0,
  despesas_extraordinarias_ano2: 0,
  despesas_extraordinarias_ano3: 0,
  caixa_e_depositos: 300000,
  divida_financeira: 500000,
  capex_anual_recorrente: 80000,
  depreciacoes_amortizacoes: 60000,
  pct_top5_clientes: 35,
  pct_top1_clientes: 12,
  geografia_clientes: "Nacional",
  dependencia_acionista_faturacao: "Baixa",
  dependencia_acionista_gestao: "Baixa",
  proprietario_imovel: "Não",
  estrutura_transacao: "Venda total",
  pct_a_transacionar: "100%",
  permanencia_pos_venda: "Sim, 1-2 anos",
  tipo_investidor: "Estratégico",
  motivo_interesse: "Reforma",
  horizonte_temporal: "12 meses",
};

export default function DevReportTest() {
  const data = buildReportFromLead(LEAD);
  return <ReportDocument d={data} modo="completo" />;
}
