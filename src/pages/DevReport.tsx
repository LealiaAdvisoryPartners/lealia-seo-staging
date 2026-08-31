import { buildReportFromLead, type ReportLead } from "@/lib/report-data";
import { ReportDocument } from "@/components/lealia/ReportDocument";

const lead = {
  nome: "Duarte", email: "a@b.pt", empresa: "Lealia", cargo: "CEO", pais: "Portugal",
  industria: "Manufatura/Indústria", subindustria: "Maquinaria industrial",
  atividade_principal: "Fabrico de maquinaria", idade_empresa: "10-20 anos", num_colaboradores: "20-49",
  unidades: "1", ano_referencia: 2025, tipo_periodo: "fechado",
  faturacao_ano1: 4200000, faturacao_ano2: 3900000, faturacao_ano3: 3500000,
  ebitda_ano1: 900000, ebitda_ano2: 800000, ebitda_ano3: 700000,
  despesas_extraordinarias_ano1: 50000, despesas_extraordinarias_ano2: 0, despesas_extraordinarias_ano3: 0,
  capex_anual_recorrente: 150000, depreciacoes_amortizacoes: 180000,
  caixa_e_depositos: 200000, divida_financeira: 800000, divida_liquida: 600000,
  percentagem_receita_recorrente: "40-60%", num_clientes_ativos: "50-200",
  pct_top5_clientes: "20-40%", pct_top1_clientes: "<20%",
} as unknown as ReportLead;

export default function DevReport() {
  const d = buildReportFromLead(lead);
  return <ReportDocument d={d as never} modo="completo" />;
}
