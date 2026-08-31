import { ReportDocument } from "@/components/lealia/ReportDocument";
import { buildReportFromLead } from "@/lib/report-data";
const d = buildReportFromLead({ nome:"A", empresa:"Acme", pais:"Portugal", industria:"Saúde", subindustria:"Clínicas médicas gerais", idade_empresa:12, ano_referencia:2026, faturacao_ano1:8000000, faturacao_ano2:7000000, faturacao_ano3:6000000, ebitda_ano1:1200000, ebitda_ano2:1000000, ebitda_ano3:900000, despesas_extraordinarias_ano1:0, caixa_e_depositos:500000, divida_financeira:1000000, capex_anual_recorrente:300000, depreciacoes_amortizacoes:250000 } as never);
export default function P() { return <div className="report-viewport"><ReportDocument d={d} /></div>; }
