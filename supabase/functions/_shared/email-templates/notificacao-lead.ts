import { shell, header, footer, esc, FONT, MUTED, BORDER, RESULT_BG, GOLD } from "./styles.ts";

export interface NotificacaoLeadData {
  nome?: string | null;
  email?: string | null;
  telefone?: string | null;
  empresa?: string | null;
  cargo?: string | null;
  pais?: string | null;
  industria?: string | null;
  subindustria?: string | null;
  idadeEmpresa?: number | null;
  unidades?: string | null;
  anoReferencia?: number | null;
  faturacaoAno1?: number | null;
  faturacaoAno2?: number | null;
  faturacaoAno3?: number | null;
  ebitdaAno1?: number | null;
  ebitdaAno2?: number | null;
  ebitdaAno3?: number | null;
  despesasExtraAno1?: number | null;
  despesasExtraAno2?: number | null;
  despesasExtraAno3?: number | null;
  caixaEDepositos?: number | null;
  dividaFinanceira?: number | null;
  dividaLiquida?: number | null;
  capexAnualRecorrente?: number | null;
  numColaboradores?: string | null;
  pctTop5Clientes?: number | null;
  geografiaClientes?: string | null;
  dependenciaAcionistaFaturacao?: string | null;
  dependenciaAcionistaGestao?: string | null;
  proprietarioImovel?: string | null;
  rendaRefleteMercado?: string | null;
  acrescimoRendaAnual?: number | null;
  incluirImovelPerimetro?: string | null;
  valorizacaoImovel?: number | null;
  estruturaTransacao?: string | null;
  pctATransacionar?: string | null;
  motivoInteresse?: string | null;
  horizonteTemporal?: string | null;
  calculoPossivel?: boolean;
  evMin?: number | null;
  evMax?: number | null;
  equityMin?: number | null;
  equityMax?: number | null;
  multiploMin?: number | null;
  multiploMax?: number | null;
  confianca?: string | null;
  relatorioUrl?: string | null;
  pdfUrl?: string | null;
}

const eur = (value?: number | null) =>
  typeof value === "number"
    ? new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value)
    : "—";
const pct = (value?: number | null) => (typeof value === "number" ? `${value}%` : "—");
const txt = (value?: string | number | null) => (value === null || value === undefined || value === "" ? "—" : String(value));
const multiple = (min?: number | null, max?: number | null) =>
  typeof min === "number" && typeof max === "number" ? `${min.toFixed(1)}x — ${max.toFixed(1)}x` : "—";

const rowValue = (label: string, value: string) => `
  <p style="margin:0 0 12px 0;font-size:14px;line-height:20px;font-family:${FONT};">
    <span style="color:${MUTED};display:block;font-size:11px;letter-spacing:0.3px;">${esc(label)}</span>
    <span style="color:#0f172a;font-weight:600;">${esc(value)}</span>
  </p>`;

const sectionTitle = (text: string) =>
  `<p style="margin:0 0 12px 0;color:#0f172a;font-size:13px;font-weight:700;letter-spacing:0.3px;font-family:${FONT};">${esc(text)}</p>`;

const cardSection = (title: string, rows: string) => `
  <div style="padding:20px 32px;border-bottom:1px solid ${BORDER};">
    ${sectionTitle(title)}
    ${rows}
  </div>`;

const metric = (label: string, value: string) => `
  <td style="width:50%;padding:0 8px;">
    <p style="margin:0;color:${MUTED};font-size:11px;font-family:${FONT};">${esc(label)}</p>
    <p style="margin:2px 0 0 0;color:#0f172a;font-size:18px;font-weight:700;font-family:${FONT};">${esc(value)}</p>
  </td>`;

export function subject(data: NotificacaoLeadData): string {
  return `Nova submissão${data.empresa ? ` — ${data.empresa}` : ""}${data.nome ? ` (${data.nome})` : ""}`;
}

export function render(p: NotificacaoLeadData): string {
  const y1 = p.anoReferencia ? `${p.anoReferencia}` : "Ano ref.";
  const y2 = p.anoReferencia ? `${p.anoReferencia - 1}` : "Ano -1";
  const y3 = p.anoReferencia ? `${p.anoReferencia - 2}` : "Ano -2";
  const reportUrl = p.relatorioUrl;
  const pdfUrl = p.pdfUrl;

  const resultado =
    p.calculoPossivel === false
      ? `<p style="margin:8px 0 0 0;color:#b45309;font-size:14px;font-weight:600;font-family:${FONT};">Cálculo não possível (EBITDA nulo ou negativo)</p>`
      : `<table role="presentation" width="100%" style="margin-top:8px;">
          <tr>
            ${metric("Enterprise Value", `${eur(p.evMin)} — ${eur(p.evMax)}`)}
            ${metric("Equity Value", `${eur(p.equityMin)} — ${eur(p.equityMax)}`)}
          </tr>
          <tr>
            ${metric("Múltiplo EBITDA", multiple(p.multiploMin, p.multiploMax))}
            ${metric("Índice de confiança", txt(p.confianca))}
          </tr>
        </table>`;

  const linksInternos =
    reportUrl || pdfUrl
      ? cardSection(
          "Relatório completo — uso interno",
          `${reportUrl ? `<p style="margin:0 0 8px 0;font-size:13px;font-family:${FONT};"><span style="color:${MUTED};display:block;font-size:11px;">Relatório online</span><a href="${esc(reportUrl)}" style="color:${GOLD};text-decoration:underline;">${esc(reportUrl)}</a></p>` : ""}
           ${pdfUrl ? `<p style="margin:0;font-size:13px;font-family:${FONT};"><span style="color:${MUTED};display:block;font-size:11px;">PDF</span><a href="${esc(pdfUrl)}" style="color:${GOLD};text-decoration:underline;">${esc(pdfUrl)}</a></p>` : ""}`,
        )
      : "";

  const body = `
    ${header("LEALIA ADVISORY PARTNERS", "Nova submissão da ferramenta de avaliação", "Informação completa submetida pelo utilizador e resultado da pré-avaliação automática.")}
    <div style="padding:20px 32px 0 32px;">
      <p style="margin:0 0 4px 0;color:${GOLD};font-size:10px;font-weight:700;letter-spacing:1px;font-family:${FONT};">USO INTERNO</p>
      <p style="margin:0;color:#0f172a;font-size:20px;font-weight:700;font-family:${FONT};">${esc(p.empresa || "Empresa não indicada")}</p>
      <p style="margin:2px 0 0 0;color:${MUTED};font-size:13px;font-family:${FONT};">${esc(p.nome || "Nome não indicado")}${p.cargo ? ` · ${esc(p.cargo)}` : ""}</p>
    </div>
    <div style="margin:20px 32px;background-color:${RESULT_BG};border-radius:12px;padding:20px;">
      <p style="margin:0;color:${MUTED};font-size:10px;font-weight:700;letter-spacing:1px;font-family:${FONT};">RESULTADO DA AVALIAÇÃO</p>
      ${resultado}
    </div>
    ${cardSection("Contacto", `${rowValue("Nome", txt(p.nome))}${rowValue("Email", txt(p.email))}${rowValue("Telefone", txt(p.telefone))}${rowValue("Cargo", txt(p.cargo))}`)}
    ${cardSection(
      "Empresa",
      `${rowValue("Empresa", txt(p.empresa))}${rowValue("País", txt(p.pais))}${rowValue("Indústria", `${txt(p.industria)}${p.subindustria ? ` · ${p.subindustria}` : ""}`)}${rowValue("Idade da empresa", p.idadeEmpresa != null ? `${p.idadeEmpresa} anos` : "—")}${rowValue("Ano de referência", txt(p.anoReferencia))}`,
    )}
    ${cardSection(
      "Dados financeiros",
      `${rowValue(`Faturação ${y1}`, eur(p.faturacaoAno1))}${rowValue(`Faturação ${y2}`, eur(p.faturacaoAno2))}${rowValue(`Faturação ${y3}`, eur(p.faturacaoAno3))}${rowValue(`EBITDA ${y1}`, eur(p.ebitdaAno1))}${rowValue(`EBITDA ${y2}`, eur(p.ebitdaAno2))}${rowValue(`EBITDA ${y3}`, eur(p.ebitdaAno3))}${rowValue(`Despesas extraordinárias ${y1}`, eur(p.despesasExtraAno1))}${rowValue(`Despesas extraordinárias ${y2}`, eur(p.despesasExtraAno2))}${rowValue(`Despesas extraordinárias ${y3}`, eur(p.despesasExtraAno3))}`,
    )}
    ${cardSection(
      "Balanço e investimento",
      `${rowValue("Caixa e depósitos", eur(p.caixaEDepositos))}${rowValue("Dívida financeira", eur(p.dividaFinanceira))}${rowValue("Posição Líquida", eur(p.dividaLiquida))}${rowValue("CAPEX anual recorrente", eur(p.capexAnualRecorrente))}${rowValue("Número de colaboradores", txt(p.numColaboradores))}`,
    )}
    ${cardSection(
      "Risco e concentração",
      `${rowValue("% top 5 clientes", pct(p.pctTop5Clientes))}${rowValue("Geografia dos clientes", txt(p.geografiaClientes))}${rowValue("Dependência do acionista — faturação", txt(p.dependenciaAcionistaFaturacao))}${rowValue("Dependência do acionista — gestão", txt(p.dependenciaAcionistaGestao))}`,
    )}
    ${cardSection(
      "Imóvel / instalações",
      `${rowValue("Proprietário do imóvel onde opera", txt(p.proprietarioImovel))}${rowValue("Renda reflete valores de mercado", txt(p.rendaRefleteMercado))}${rowValue("Acréscimo de renda anual — mercado", eur(p.acrescimoRendaAnual))}${rowValue("Imóvel incluído no perímetro", txt(p.incluirImovelPerimetro))}${rowValue("Valorização do imóvel", eur(p.valorizacaoImovel))}`,
    )}
    ${cardSection(
      "Motivação e transação",
      `${rowValue("Estrutura pretendida", txt(p.estruturaTransacao))}${rowValue("Participação a transacionar", txt(p.pctATransacionar))}${rowValue("Motivo do interesse", txt(p.motivoInteresse))}${rowValue("Horizonte temporal", txt(p.horizonteTemporal))}`,
    )}
    ${linksInternos}
    <p style="margin:20px 32px 28px 32px;color:${MUTED};font-size:11px;line-height:18px;font-family:${FONT};">
      Email interno gerado automaticamente pela ferramenta de pré-avaliação.<br/>
      <strong>Lealia Advisory Partners</strong> ·
      <a href="https://lealiaap.com" style="color:${MUTED};text-decoration:none;">lealiaap.com</a> ·
      <a href="mailto:info@lealiaap.com" style="color:${MUTED};text-decoration:none;">info@lealiaap.com</a>
    </p>
  `;

  return shell(subject(p), body);
}
