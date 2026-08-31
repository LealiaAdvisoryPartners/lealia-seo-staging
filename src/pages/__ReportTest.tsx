import { ReportDocument } from "@/components/lealia/ReportDocument";
import { buildReportData, type ReportLead } from "@/lib/report-data";
import { calcularValuation } from "@/lib/valuation";
import { valuationInputFromLead } from "@/lib/report-data";

const lead: ReportLead = {
  nome: "Teste",
  empresa: "Empresa Teste, Lda.",
  pais: "Portugal",
  industria: "Tecnologia",
  subindustria: "",
  idade_empresa: 12,
  ano_referencia: 2025,
  tipo_periodo: "Contas encerradas",
  num_colaboradores: "11-50",
  unidades: "2 a 5 localizações",
  num_clientes_ativos: "120",
  faturacao_ano1: 4_500_000,
  faturacao_ano2: 3_800_000,
  faturacao_ano3: 3_200_000,
  ebitda_ano1: 620_000,
  ebitda_ano2: 480_000,
  ebitda_ano3: 390_000,
  despesas_extraordinarias_ano1: 60_000,
  despesas_extraordinarias_ano2: 20_000,
  despesas_extraordinarias_ano3: 0,
  caixa_e_depositos: 400_000,
  divida_financeira: 250_000,
  capex_anual_recorrente: 90_000,
  depreciacoes_amortizacoes: 120_000,
  pct_top5_clientes: 35,
  pct_top1_clientes: 12,
  backlog_contratado: 800_000,
  geografia_clientes: "Nacional e internacional",
  dependencia_acionista_faturacao: "Baixa",
  dependencia_acionista_gestao: "Baixa",
  proprietario_imovel: "Não",
  permanencia_pos_venda: "1 a 2 anos",
  tipo_investidor: "Estratégico",
};

export default function ReportTest() {
  const result = calcularValuation(valuationInputFromLead(lead));
  const d = buildReportData(lead, result);
  return (
    <div style={{ background: "#666", padding: 20 }}>
      <ReportDocument d={d} modo="completo" />
    </div>
  );
}
