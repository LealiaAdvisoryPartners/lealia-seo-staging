import ReportDocument from "@/components/lealia/ReportDocument";
import { buildReportFromLead } from "@/lib/report-data";

const lead = {
  nome: "Teste",
  email: "t@t.pt",
  empresa: "Empresa Teste",
  pais: "Portugal",
  industria: "Manufatura/Indústria",
  subindustria: "Maquinaria industrial",
  atividade_principal: "Produção",
  num_colaboradores: "11-50",
  unidades: "Localização única",
  num_clientes_ativos: "11-50",
  idade_empresa: 15,
  ano_referencia: 2025,
  tipo_periodo: "Contas encerradas",
  faturacao_ano1: 8_000_000,
  faturacao_ano2: 7_200_000,
  faturacao_ano3: 6_500_000,
  ebitda_ano1: 1_200_000,
  ebitda_ano2: 1_000_000,
  ebitda_ano3: 900_000,
  despesas_extraordinarias_ano1: 0,
  despesas_extraordinarias_ano2: 0,
  despesas_extraordinarias_ano3: 0,
  caixa_e_depositos: 500_000,
  divida_financeira: 800_000,
  capex_anual_recorrente: 200_000,
  depreciacoes_amortizacoes: 150_000,
};

export default function ReportTest() {
  const d = buildReportFromLead(lead);
  return <ReportDocument d={d} modo="completo" />;
}
