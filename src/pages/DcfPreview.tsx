import { ReportDocument } from "@/components/lealia/ReportDocument";
import { buildReportFromLead, type ReportLead } from "@/lib/report-data";

const lead = {
  empresa: "Empresa Exemplo, S.A.",
  pais: "Portugal",
  industria: "Saúde",
  subindustria: "Clínicas médicas gerais",
  idade_empresa: 14,
  ano_referencia: 2025,
  faturacao_ano1: 8200000,
  faturacao_ano2: 7400000,
  faturacao_ano3: 6600000,
  ebitda_ano1: 1450000,
  ebitda_ano2: 1200000,
  ebitda_ano3: 980000,
  despesas_extraordinarias_ano1: 60000,
  despesas_extraordinarias_ano2: 0,
  despesas_extraordinarias_ano3: 0,
  caixa_e_depositos: 500000,
  divida_financeira: 1800000,
  capex_anual_recorrente: 240000,
  depreciacoes_amortizacoes: 310000,
} as unknown as ReportLead;

export default function DcfPreview() {
  const d = buildReportFromLead(lead);
  return <ReportDocument d={d} modo="completo" />;
}
