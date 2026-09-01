import * as React from "react";
import logo from "@/assets/lealia-logo.png";
import cover from "@/assets/report-cover.png";
import { FASES } from "@/lib/timeline";
import type { ReportData } from "@/lib/report-data";
import { formatEUR } from "@/lib/valuation";

const DISCLAIMER =
  "O presente relatório constitui uma estimativa indicativa da avaliação da empresa, gerada com base na informação fornecida pelo utilizador, não configurando aconselhamento financeiro, proposta contratual, recomendação de investimento ou avaliação formal para efeitos legais, fiscais ou contabilísticos; os valores apresentados dependem da qualidade e exatidão dos dados introduzidos e das condições de mercado vigentes à data de elaboração deste documento.";

const EmpresaContext = React.createContext<string>("");

function Page({
  numero,
  titulo,
  id,
  children,
}: {
  numero: number;
  titulo?: string;
  id?: string;
  children: React.ReactNode;
}) {
  const empresa = React.useContext(EmpresaContext);
  return (
    <section className="report-page" id={id}>
      <header className="report-head">
        <img src={logo} alt="Lealia Advisory Partners" className="h-6 w-auto" />
        {titulo ? <span className="report-head-title">{titulo}</span> : null}
      </header>
      <div className="report-body">{children}</div>
      <footer className="report-foot">
        <span>Lealia Advisory Partners · Relatório de avaliação indicativa{empresa ? ` para ${empresa}` : ""}</span>
        <span>{numero}</span>
      </footer>
    </section>
  );
}

function efeitoQualitativo(multiplicador: number, semDados?: boolean, efeito?: string) {
  if (efeito) return efeito;
  if (semDados) return "Neutro";
  if (multiplicador > 0.995) return "Positivo";
  if (multiplicador < 0.995) return "Negativo";
  return "Neutro";
}

const H = ({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <h2 className={`report-h2${className ? ` ${className}` : ""}`} style={style}>
    {children}
  </h2>
);

const Kv = ({ label, value }: { label: React.ReactNode; value: React.ReactNode }) => (
  <div className="report-kv">
    <span>{label}</span>
    <span className="report-kv-value">{value}</span>
  </div>
);

function WaterfallChart({ items }: { items: ReportData["ponte"] }) {
  if (!items.length) return null;

  const chartItems = items.map((item, index) => {
    const isTotal = item.tipo === "base" || item.tipo === "total";
    const previous =
      index === 0
        ? 0
        : items.slice(0, index).reduce((sum, current) => sum + (current.tipo === "total" ? 0 : current.valor), 0);
    const next = isTotal ? item.valor : previous + item.valor;
    return { ...item, previous, next, isTotal };
  });
  const points = chartItems.flatMap((item) => [item.isTotal ? 0 : item.previous, item.next]);
  const domainMin = Math.min(0, ...points);
  const domainMax = Math.max(1, ...points);
  const range = domainMax - domainMin || 1;
  const plotTop = 22;
  const plotHeight = 176;
  const y = (value: number) => plotTop + ((domainMax - value) / range) * plotHeight;
  const barWidth = 76;
  const gap = 34;
  const startX = 26;
  const width = startX * 2 + chartItems.length * barWidth + Math.max(0, chartItems.length - 1) * gap;
  const label = (value: number) => kEur(value);

  return (
    <figure className="report-waterfall">
      <figcaption>Equity Bridge · milhares de €</figcaption>
      <svg viewBox={`0 0 ${width} 240`} role="img" aria-label="Gráfico waterfall da Equity Bridge">
        <line className="report-waterfall-axis" x1="10" x2={width - 10} y1={y(0)} y2={y(0)} />
        {chartItems.map((item, index) => {
          const x = startX + index * (barWidth + gap);
          const topValue = item.isTotal ? Math.max(0, item.valor) : Math.max(item.previous, item.next);
          const bottomValue = item.isTotal ? Math.min(0, item.valor) : Math.min(item.previous, item.next);
          const top = y(topValue);
          const height = Math.max(2, y(bottomValue) - top);
          const shortLabel =
            item.tipo === "base"
              ? "Enterprise Value"
              : item.tipo === "total"
                ? "Equity Value"
                : item.valor < 0
                  ? "Dívida"
                  : item.label.includes("caixa")
                    ? "Caixa"
                    : "Imóvel";
          const className =
            item.tipo === "total"
              ? "report-waterfall-total"
              : item.valor < 0
                ? "report-waterfall-negative"
                : item.tipo === "base"
                  ? "report-waterfall-base"
                  : "report-waterfall-positive";
          const connectorY = y(item.next);

          return (
            <g key={`${item.label}-${index}`}>
              {index < chartItems.length - 1 && item.tipo !== "total" ? (
                <line
                  className="report-waterfall-connector"
                  x1={x + barWidth}
                  x2={x + barWidth + gap}
                  y1={connectorY}
                  y2={connectorY}
                />
              ) : null}
              <rect className={className} x={x} y={top} width={barWidth} height={height} />
              <text
                className="report-waterfall-value"
                x={x + barWidth / 2}
                y={Math.max(11, top - 5)}
                textAnchor="middle"
              >
                {item.tipo === "ajuste" && item.valor > 0 ? "+" : ""}
                {label(item.valor)}
              </text>
              <text className="report-waterfall-label" x={x + barWidth / 2} y="216" textAnchor="middle">
                {shortLabel}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

/** Agrupamento de milhares consistente (espaço inquebrável), inclusive para números de 4 dígitos. */
const grupos = (n: number) => {
  const neg = n < 0;
  const s = Math.abs(Math.round(n))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
  return (neg ? "-" : "") + s;
};
const kEur = (v: number) => grupos(v / 1000);

const pctFmt = (v: number, casas = 1) => `${(v * 100).toFixed(casas).replace(".", ",")}%`;
const xFmt = (v: number | null) => (v === null ? "—" : `${v.toFixed(2).replace(".", ",")}x`);
const fatorFmt = (v: number) => v.toFixed(3).replace(".", ",");

type Dcf = NonNullable<ReportData["dcf"]>;
type DcfAno = Dcf["anos"][number];
type MapaLinha = {
  label: string;
  get: (a: DcfAno) => number | null;
  tv?: number | null;
  total?: boolean;
  fmt?: (v: number) => string;
};

function MapaTabela({ dcf, linhas, head = true }: { dcf: Dcf; linhas: MapaLinha[]; head?: boolean }) {
  return (
    <table className="report-table report-table-compact report-dcf-map">
      <thead className={head ? undefined : "report-dcf-head-hidden"}>
        <tr>
          <th>Linha</th>
          {dcf.anos.map((a) => (
            <th key={a.ano} className={a.tipo === "forecast" ? "report-dcf-fc" : "report-dcf-hist"}>
              {a.ano}
              {a.tipo === "forecast" ? "F" : "A"}
            </th>
          ))}
          <th className="report-dcf-tv">TV</th>
        </tr>
      </thead>
      <tbody>
        {linhas.map((l) => (
          <tr key={l.label} className={l.total ? "report-row-total" : undefined}>
            <td>{l.label}</td>
            {dcf.anos.map((a) => {
              const v = l.get(a);
              return (
                <td key={a.ano} className={a.tipo === "forecast" ? "report-dcf-fc" : "report-dcf-hist"}>
                  {v === null ? "—" : (l.fmt ?? kEur)(v)}
                </td>
              );
            })}
            <td className="report-dcf-tv">{l.tv === undefined || l.tv === null ? "—" : (l.fmt ?? kEur)(l.tv)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function DcfPage({ d, numero }: { d: ReportData; numero: number }) {
  const dcf = d.dcf;
  if (!dcf) {
    return (
      <Page numero={numero} titulo="DCF Valuation">
        <H>Avaliação por fluxos de caixa descontados</H>
        <div className="report-note">
          {d.dcf_motivo ??
            "Não é possível apresentar uma análise DCF com a informação disponibilizada. Em particular, o custo de capital estimado tem de ser superior à taxa de crescimento na perpetuidade."}
        </div>
      </Page>
    );
  }

  const fatorTv = 1 / Math.pow(1 + dcf.wacc, dcf.anos.filter((a) => a.tipo === "forecast").length);

  const linhasNopat: MapaLinha[] = [
    { label: "Receita", get: (a) => a.receita },
    { label: "EBITDA", get: (a) => a.ebitda },
    { label: "Margem EBITDA", get: (a) => a.margem_ebitda, fmt: (v) => pctFmt(v) },
    { label: "(−) D&A", get: (a) => -a.da },
    { label: "= EBIT", get: (a) => a.ebit, total: true },
    { label: "(−) Imposto s/ EBIT", get: (a) => -a.imposto },
    { label: "= NOPAT", get: (a) => a.nopat, total: true },
  ];

  const linhasFcff: MapaLinha[] = [
    { label: "NOPAT", get: (a) => a.nopat },
    { label: "(+) D&A", get: (a) => a.da },
    { label: "(−) Capex", get: (a) => -a.capex },
    { label: "= FCFF unlevered", get: (a) => a.fcff, tv: dcf.terminal_value, total: true },
    { label: "Fator de desconto", get: (a) => a.fator_desconto, tv: fatorTv, fmt: fatorFmt },
    { label: "= PV do FCFF", get: (a) => a.pv, tv: dcf.pv_terminal_value, total: true },
  ];

  return (
    <Page numero={numero} titulo="DCF Valuation">
      <div className="report-dcf">
        <section className="report-dcf-top">
          <div>
            <div className="report-dcf-title">
              <H>Mapa de fluxos de caixa</H>
              <span className="report-dcf-unit">milhares de €</span>
            </div>
            <MapaTabela dcf={dcf} linhas={linhasNopat} />
            <MapaTabela dcf={dcf} linhas={linhasFcff} head={false} />
            <p className="report-small">
              A = exercício histórico · F = ano projetado · TV = valor terminal. Fluxo unlevered: o financiamento é
              refletido no custo de capital e na dívida líquida. TV por perpetuidade sobre o FCFF do ano 8.
            </p>
          </div>
          <div>
            <H>Pressupostos do forecast</H>
            <table className="report-table report-table-compact">
              <tbody>
                <tr>
                  <td>Crescimento inicial</td>
                  <td>{pctFmt(dcf.crescimento_inicial)}</td>
                </tr>
                <tr>
                  <td>Ano de estabilização</td>
                  <td>Ano {dcf.ano_estabilizacao}</td>
                </tr>
                <tr>
                  <td>Crescimento estabilizado</td>
                  <td>{pctFmt(dcf.crescimento_estabilizado)}</td>
                </tr>
                <tr>
                  <td>Crescimento na perpetuidade</td>
                  <td>{pctFmt(dcf.terminal_growth)}</td>
                </tr>
                <tr>
                  <td>Margem EBITDA projetada</td>
                  <td>{pctFmt(dcf.margem_ebitda)}</td>
                </tr>
                <tr>
                  <td>Capex (% receita)</td>
                  <td>{pctFmt(dcf.capex_pct_receita)}</td>
                </tr>
                <tr>
                  <td>D&A (% receita)</td>
                  <td>{pctFmt(dcf.da_pct_receita)}</td>
                </tr>
                <tr>
                  <td>Fundo de maneio</td>
                  <td>Não projetado</td>
                </tr>
                <tr>
                  <td>Taxa de imposto (CIT)</td>
                  <td>{pctFmt(dcf.cit)}</td>
                </tr>
              </tbody>
            </table>
            <H>Indicadores de avaliação</H>
            <table className="report-table report-table-compact">
              <tbody>
                <tr className="report-row-total">
                  <td>Enterprise Value</td>
                  <td>{formatEUR(Math.round(dcf.enterprise_value))}</td>
                </tr>
                <tr className="report-row-total">
                  <td>Equity Value</td>
                  <td>{formatEUR(Math.round(dcf.equity_value))}</td>
                </tr>
                <tr>
                  <td>EV / EBITDA implícito</td>
                  <td>{xFmt(dcf.ev_ebitda_implicito)}</td>
                </tr>
                <tr>
                  <td>EV / Receita implícito</td>
                  <td>{xFmt(dcf.ev_receita_implicito)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="report-dcf-bottom">
          <div>
            <H>Custo médio ponderado de capital</H>
            <p className="report-dcf-formula">
              Ke = Rf + β<sub>L</sub> × ERP + CRP + prémio de dimensão + prémio específico · Kd<sub>pós</sub> = Kd
              <sub>pré</sub> × (1 − CIT) · WACC = E/(D+E) × Ke + D/(D+E) × Kd<sub>pós</sub>
            </p>
            <table className="report-table report-table-compact">
              <tbody>
                <tr>
                  <td>Risk-free rate (Rf)</td>
                  <td>{pctFmt(dcf.risk_free)}</td>
                </tr>
                <tr>
                  <td>Beta unlevered / levered (β)</td>
                  <td>
                    {dcf.beta_unlevered.toFixed(2)} / {dcf.beta_levered.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td>Equity Risk Premium (ERP)</td>
                  <td>{pctFmt(dcf.erp)}</td>
                </tr>
                <tr>
                  <td>Country Risk Premium (CRP)</td>
                  <td>{pctFmt(dcf.crp)}</td>
                </tr>
                <tr>
                  <td>Prémio de dimensão (PME)</td>
                  <td>{pctFmt(dcf.size_premium)}</td>
                </tr>
                <tr>
                  <td>Prémio específico (iliquidez)</td>
                  <td>{pctFmt(dcf.premio_especifico)}</td>
                </tr>
                <tr className="report-row-total">
                  <td>Cost of Equity (Ke)</td>
                  <td>{pctFmt(dcf.cost_of_equity)}</td>
                </tr>
                <tr>
                  <td>Cost of Debt pre / post tax (Kd)</td>
                  <td>
                    {pctFmt(dcf.cost_of_debt_pre)} / {pctFmt(dcf.cost_of_debt_pos)}
                  </td>
                </tr>
                <tr>
                  <td>Peso de equity / dívida (E / D)</td>
                  <td>
                    {pctFmt(dcf.peso_equity, 0)} / {pctFmt(dcf.peso_divida, 0)}
                  </td>
                </tr>
                <tr className="report-row-total">
                  <td>WACC</td>
                  <td>{pctFmt(dcf.wacc)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <H>Resultados</H>
            <table className="report-table report-table-compact">
              <tbody>
                <tr>
                  <td>PV do forecast explícito (8 anos)</td>
                  <td>{formatEUR(Math.round(dcf.pv_explicito))}</td>
                </tr>
                <tr>
                  <td>PV do valor terminal</td>
                  <td>{formatEUR(Math.round(dcf.pv_terminal_value))}</td>
                </tr>
                <tr>
                  <td>Peso do valor terminal no EV</td>
                  <td>{pctFmt(dcf.peso_terminal, 0)}</td>
                </tr>
                <tr className="report-row-total">
                  <td>Enterprise Value</td>
                  <td>{formatEUR(Math.round(dcf.enterprise_value))}</td>
                </tr>
                <tr>
                  <td>Ajustamento de dívida líquida</td>
                  <td>{formatEUR(Math.round(-dcf.divida_liquida))}</td>
                </tr>
                {dcf.ativos_nao_operacionais > 0 ? (
                  <tr>
                    <td>Ativos não operacionais</td>
                    <td>{formatEUR(Math.round(dcf.ativos_nao_operacionais))}</td>
                  </tr>
                ) : null}
                <tr className="report-row-total">
                  <td>Equity Value</td>
                  <td>{formatEUR(Math.round(dcf.equity_value))}</td>
                </tr>
              </tbody>
            </table>
            <p className="report-small">
              Custo de capital estimado numa ótica prudente: às referências setoriais acrescem prémios de dimensão e de
              iliquidez, porque uma PME não cotada tem risco superior ao das cotadas do setor. Beta, ERP, CRP, estrutura
              de capital e spread são proxies setoriais; CIT de {d.pais} ({dcf.cit_nota})
              {dcf.nota_reconciliacao ? ` ${dcf.nota_reconciliacao}` : ""}
            </p>
          </div>
        </section>
      </div>
    </Page>
  );
}

function SensitivityPage({ d, numero }: { d: ReportData; numero: number }) {
  const dcf = d.dcf;
  if (!dcf) {
    return (
      <Page numero={numero} titulo="Sensitivity Analysis">
        <H>Análise de sensibilidade</H>
        <div className="report-note">
          {d.dcf_motivo ?? "Sem análise DCF disponível, não é possível apresentar as matrizes de sensibilidade."}
        </div>
      </Page>
    );
  }
  // Lista fechada de pressupostos a apresentar na secção de transparência.
  const PRESSUPOSTOS_TRANSPARENCIA = [
    "Crescimento inicial da receita",
    "Margem EBITDA projetada",
    "Risk-free rate",
    "Beta unlevered / levered",
    "Equity Risk Premium",
    "Country Risk Premium",
    "Prémio de dimensão (PME)",
    "Prémio específico (iliquidez)",
    "Cost of debt (pre / post tax)",
    "Estrutura de capital (D / E)",
    "Crescimento estabilizado (anos 5-8)",
    "Crescimento na perpetuidade",
    "Convenção de desconto",
  ];
  const pressupostosExtra = PRESSUPOSTOS_TRANSPARENCIA.map((label) =>
    dcf.pressupostos.find((p) => p.label === label),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <Page numero={numero} titulo="Sensitivity Analysis">
      <div className="report-dcf-title">
        <H>Sensibilidade do Enterprise Value</H>
        <span className="report-dcf-unit">milhares de €</span>
      </div>
      <div className="report-sens-grid">
        {dcf.matrizes.map((m) => (
          <div key={m.titulo} className="report-sens-card">
            <strong>{m.titulo}</strong>
            <table className="report-table report-table-compact report-sens-table">
              <thead>
                <tr>
                  <th>
                    {m.eixo_y_label} \ {m.eixo_x_label}
                  </th>
                  {m.colunas.map((c) => (
                    <th key={c.label} className={c.base ? "report-sens-base" : undefined}>
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {m.linhas.map((l) => (
                  <tr key={l.label}>
                    <td className={l.base ? "report-sens-base" : undefined}>{l.label}</td>
                    {l.valores.map((v, i) => (
                      <td key={i} className={l.base && m.colunas[i]?.base ? "report-sens-cell-base" : undefined}>
                        {Number.isFinite(v) ? kEur(v) : "n.a."}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <p className="report-small">
        A célula destacada corresponde ao cenário base apresentado no slide anterior. As matrizes isolam o efeito de
        cada variável, mantendo constantes os restantes pressupostos.
      </p>

      <section className="report-sens-assumptions">
        <H>Transparência de pressupostos</H>
        <p className="report-small report-dcf-assumptions-intro">
          Os pressupostos do modelo combinam a informação introduzida no formulário com referências setoriais de
          mercado, seguindo um critério conservador — na dúvida, adota-se o valor que resulta numa avaliação mais
          prudente. A tabela seguinte consolida os pressupostos estruturantes da avaliação e a respetiva fonte ou método
          de derivação.
        </p>
        <table className="report-table report-table-compact report-table-text">
          <thead>
            <tr>
              <th>Parâmetro</th>
              <th>Valor</th>
              <th>Método / fonte</th>
            </tr>
          </thead>
          <tbody>
            {pressupostosExtra.map((p) => (
              <tr key={p.label}>
                <td>{p.label}</td>
                <td>{p.valor}</td>
                <td>{p.nota ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Page>
  );
}

export type ReportModo = "completo" | "teaser";

const LOCKED_PAGES: { numero: number; titulo: string }[] = [
  { numero: 4, titulo: "Âmbito e limitações" },
  { numero: 5, titulo: "Método e alternativas" },
  { numero: 6, titulo: "Ajustes ao múltiplo" },
  { numero: 7, titulo: "Cenários e sensibilidade" },
  { numero: 8, titulo: "Equity Bridge e contexto da transação" },
  { numero: 9, titulo: "Drivers de Valor & Riscos" },
  { numero: 10, titulo: "Preparação para o mercado" },
  { numero: 11, titulo: "DCF Valuation" },
  { numero: 12, titulo: "Sensitivity Analysis" },
  { numero: 13, titulo: "Processo de M&A" },
];

const irParaAgendamento = () => {
  if (typeof document === "undefined") return;
  document.getElementById("agendar")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

function LockedSkeleton() {
  return (
    <div className="report-locked-skeleton" aria-hidden="true">
      <div className="report-locked-block report-locked-title" />
      <div className="report-locked-two">
        <div>
          {[92, 78, 86, 64, 88, 72].map((w, i) => (
            <div key={i} className="report-locked-block" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div>
          {[70, 90, 60, 84, 76, 68].map((w, i) => (
            <div key={i} className="report-locked-block" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
      <div className="report-locked-block report-locked-chart" />
    </div>
  );
}

function LockedPage({ numero, titulo }: { numero: number; titulo: string }) {
  return (
    <Page numero={numero} titulo={titulo}>
      <div className="report-locked">
        <LockedSkeleton />
        <div className="report-locked-overlay">
          <span className="report-locked-eyebrow">Conteúdo reservado</span>
          <h2 className="report-locked-h">{titulo}</h2>
          <p className="report-locked-p">
            Esta secção faz parte do relatório completo. Agende uma reunião de 20 minutos com a equipa da Lealia para
            visualizar a análise integral e a discussão dos resultados.
          </p>
          <button type="button" className="report-locked-cta" onClick={irParaAgendamento}>
            Agendar reunião para ver o relatório completo
          </button>
        </div>
      </div>
    </Page>
  );
}

export function ReportDocument({ d, modo = "completo" }: { d: ReportData; modo?: ReportModo }) {
  return (
    <EmpresaContext.Provider value={d.empresa}>
      <article className="report-doc">
        {/* 1 — Capa */}
        <section className="report-page report-cover">
          <img src={cover} alt="" className="report-cover-image" />
          <div className="report-cover-side">
            <img src={logo} alt="Lealia Advisory Partners" className="report-cover-logo" />
            <div className="mt-auto">
              <h1 className="report-title">Preliminary Valuation</h1>
              <p className="report-title-company">{d.empresa}</p>
              <p className="report-sub">
                {d.industria}
                {d.subindustria ? ` · ${d.subindustria}` : ""} · {d.pais}
              </p>
            </div>
            <div className="report-cover-meta">
              <div>
                <span>Preparado para</span>
                <strong>
                  {d.nome}
                  {d.cargo ? ` · ${d.cargo}` : ""}
                </strong>
              </div>
              <div>
                <span>Data</span>
                <strong>{d.data_relatorio}</strong>
              </div>
            </div>
            <p className="report-cover-disclaimer">{DISCLAIMER}</p>
          </div>
        </section>

        {/* 2 — Sumário executivo */}
        <Page numero={2} titulo="Sumário executivo">
          <H>Sumário executivo</H>
          <p className="report-p" dangerouslySetInnerHTML={{ __html: d.resumo_textual }} />

          {d.ok ? (
            <div className="report-highlight">
              <div>
                <span>Enterprise Value indicativo</span>
                <strong>
                  {d.ev_min_formatado} — {d.ev_max_formatado}
                </strong>
              </div>
              <div>
                <span>Equity Value Indicativo</span>
                <strong>
                  {d.equity_min_formatado} — {d.equity_max_formatado}
                </strong>
              </div>
            </div>
          ) : (
            <div className="report-note">{d.motivo}</div>
          )}

          <div className="report-grid">
            <Kv label="Faturação do ano de referência" value={d.faturacao_ano1_formatado} />
            <Kv label="EBITDA normalizado" value={d.ebitda_normalizado_formatado} />
            <Kv label="Margem EBITDA normalizada" value={d.margem_ebitda_ajustada_formatada} />
            <Kv
              label="Múltiplo implícito"
              value={
                d.multiplo_ajustado_min !== null && d.multiplo_ajustado_max !== null
                  ? `${d.multiplo_ajustado_min.toFixed(2)}x — ${d.multiplo_ajustado_max.toFixed(2)}x`
                  : "—"
              }
            />
            <Kv
              label={
                <span>
                  Posição Líquida <span className="report-kv-hint">caixa / (dívida)</span>
                </span>
              }
              value={
                <span>
                  {d.posicao_liquida_valor !== null && d.posicao_liquida_valor < 0
                    ? `(${d.divida_liquida_absoluta_formatado})`
                    : d.divida_liquida_absoluta_formatado}
                </span>
              }
            />
            <Kv label="Completude da informação" value={d.confianca ?? "—"} />
          </div>

          <H>Metodologia de avaliação</H>
          <ol className="report-list report-compact">
            <li>
              <strong>Determinação do EBITDA normalizado</strong> — EBITDA reportado último exercício de referência,
              excluindo o impacto de despesas extraordinárias não recorrentes e, se aplicável, considerando o impacto de
              uma correção teórica sobre a renda do imóvel ao mercado. O EBITDA normalizado é de{" "}
              <strong>{d.ebitda_normalizado_formatado}</strong>.
            </li>
            <li>
              <strong>Múltiplo setorial de base</strong> — definido com referência aos múltiplos praticados em
              transações recentes e comparáveis no setor e na região.
            </li>
            <li>
              <strong>Ajustes de perfil e risco</strong> — dimensão, maturidade, crescimento, recorrência de receita,
              concentração de clientes, geografia, dependência do acionista e intensidade de investimento, com um limite
              global aplicado ao conjunto dos ajustes.
            </li>
            <li>
              <strong>Equity Bridge</strong> — ao Enterprise Value soma-se a caixa, depósitos e outros equivalentes,
              deduz-se a dívida total, e, se aplicável, soma-se o imóvel incluído no perímetro da transação e o impacto
              pro-forma em caixa resultante da alienação de ativos não operacionais, obtendo-se o Equity Value antes de
              ajustamentos de closing.
            </li>
          </ol>
        </Page>

        {/* 3 — Perfil, histórico e posição financeira */}
        <Page numero={3} titulo="Perfil da empresa e outros indicadores">
          <div className="report-two">
            <div>
              <H>Perfil da empresa</H>
              <table className="report-table report-table-compact">
                <thead>
                  <tr>
                    <th>Indicador</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {d.perfil.map((p) => (
                    <tr key={p.label}>
                      <td>{p.label}</td>
                      <td className="report-perfil-valor">{p.valor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <H>Histórico financeiro</H>
              <table className="report-table report-table-compact">
                <thead>
                  <tr>
                    <th>Ano</th>
                    <th>Faturação</th>
                    <th>EBITDA</th>
                    <th>Extraordinários</th>
                    <th>Margem norm.</th>
                  </tr>
                </thead>
                <tbody>
                  {d.historico.map((l) => (
                    <tr key={l.ano}>
                      <td>{l.ano}</td>
                      <td>{l.faturacao}</td>
                      <td>{l.ebitda}</td>
                      <td>{l.despesas}</td>
                      <td>{l.margem}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {d.qualidade.tem_serie ? (
                <table className="report-table report-table-compact">
                  <thead>
                    <tr>
                      <th>Indicador</th>
                      <th>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>CAGR da faturação</td>
                      <td>{d.qualidade.cagr_faturacao ?? "—"}</td>
                    </tr>
                    <tr>
                      <td>CAGR do EBITDA normalizado</td>
                      <td>{d.qualidade.cagr_ebitda ?? "—"}</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p className="report-small">Sem informação suficiente</p>
              )}
            </div>
            <div>
              <H>Normalização do EBITDA</H>
              <table className="report-table report-table-compact">
                <thead>
                  <tr>
                    <th>Linha</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {d.linhas_ebitda.map((l, i) => (
                    <tr key={i} className={l.tipo === "total" ? "report-row-total" : undefined}>
                      <td>{l.label}</td>
                      <td>{l.formatado}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="report-small report-normalizacao-nota">
                Os ajustamentos de normalização aproximam o resultado operacional recorrente num cenário pós-transação.
              </p>
              <H>Outros Indicadores</H>
              <table className="report-table report-table-compact">
                <thead>
                  <tr>
                    <th>Indicador</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Caixa, depósitos e outros equivalentes</td>
                    <td>{d.caixa_formatado}</td>
                  </tr>
                  <tr>
                    <td>Dívida total</td>
                    <td>{d.divida_financeira_formatado}</td>
                  </tr>
                  <tr>
                    <td>CAPEX anual recorrente</td>
                    <td>{d.capex_formatado}</td>
                  </tr>
                  <tr>
                    <td>Unidades / localizações</td>
                    <td>{d.unidades || "Não indicado"}</td>
                  </tr>
                  <tr>
                    <td>% Concentração no maior cliente</td>
                    <td>{d.concentracao_top1 || "Não indicado"}</td>
                  </tr>
                  <tr>
                    <td>% Concentração no top 5 clientes</td>
                    <td>{d.concentracao_top5 || "Não indicado"}</td>
                  </tr>
                  <tr>
                    <td>Clientes ativos</td>
                    <td>{d.num_clientes_ativos || "Não indicado"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Page>

        {modo === "completo" ? (
          <>
            {/* 4 — Âmbito e limitações */}
            <Page numero={4} titulo="Âmbito e limitações">
              <H>Âmbito e limitações deste relatório</H>
              <p className="report-p">{DISCLAIMER}</p>
              <div className="report-two">
                <div>
                  <H>Natureza do documento</H>
                  <ul className="report-list report-list-disc report-compact">
                    <li>
                      Trata-se de uma avaliação indicativa preliminar, elaborada exclusivamente a partir da informação
                      fornecida pelo utilizador, sem verificação independente, auditoria ou revisão dos dados.
                    </li>
                    <li>
                      Não constitui aconselhamento financeiro, fiscal, contabilístico ou jurídico, nem uma recomendação
                      de investimento ou desinvestimento.
                    </li>
                    <li>
                      Não configura uma avaliação formal (fairness opinion) para efeitos legais, fiscais,
                      contabilísticos ou regulatórios, nem uma proposta contratual ou oferta vinculativa.
                    </li>
                    <li>
                      O documento destina-se ao uso exclusivo do destinatário identificado na capa e não deve ser
                      divulgado a terceiros sem autorização escrita da Lealia Advisory Partners.
                    </li>
                  </ul>
                </div>
                <div>
                  <H>Limitações e fatores de variação</H>
                  <ul className="report-list report-list-disc report-compact">
                    <li>
                      Os valores apresentados dependem da qualidade, exatidão e completude dos dados introduzidos. Dados
                      incompletos ou incorretos alteram materialmente o resultado.
                    </li>
                    <li>
                      As referências de mercado utilizadas refletem condições vigentes à data de elaboração e podem
                      variar rapidamente com o contexto macroeconómico, setorial e de financiamento.
                    </li>
                    <li>
                      O preço efetivo de uma transação depende do perfil do comprador, da estrutura do negócio, das
                      garantias, dos ajustamentos de closing e do processo negocial.
                    </li>
                    <li>
                      Uma avaliação definitiva exige due diligence financeira, fiscal, legal e operacional, bem como a
                      validação documental dos ajustamentos ao EBITDA.
                    </li>
                  </ul>
                  <div className="report-note">
                    A Lealia Advisory Partners não assume responsabilidade por decisões tomadas com base exclusiva neste
                    documento.
                  </div>
                </div>
              </div>

              <H style={{ marginTop: "2.5mm", marginBottom: "2mm" }}>Leitura complementar</H>
              <ul className="report-list report-list-disc report-leitura">
                <li>{d.qualidade.conversao_caixa}</li>
                <li>{d.qualidade.fundo_maneio}</li>
                <li>{d.qualidade.ajustamentos}</li>
                {d.qualidade.concentracao ? <li>{d.qualidade.concentracao}</li> : null}
                {d.qualidade.backlog ? <li>{d.qualidade.backlog}</li> : null}
                <li>
                  A sazonalidade e o CAPEX de manutenção face ao CAPEX de crescimento não foram desagregados nesta fase.
                  Limitação: sem esta leitura não é possível aferir a recorrência mensal dos resultados nem a
                  sustentabilidade do fluxo de caixa, pelo que o valor calculado não reflete eventuais picos ou
                  necessidades estacionais de tesouraria.
                </li>
              </ul>
            </Page>

            {/* 5 — Método e alternativas */}
            <Page numero={5} titulo="Método e alternativas">
              <H>Porquê múltiplos de EBITDA</H>
              <div className="report-two">
                <div>
                  <p className="report-p">
                    A avaliação por múltiplos é uma abordagem de mercado: o valor de uma empresa é inferido a partir dos
                    preços pagos por investidores em transações recentes por empresas com perfil comparável. No contexto
                    de M&A de PME, o EBITDA é habitualmente utilizado como referência, por refletir a capacidade de
                    geração de resultados operacionais antes do impacto da estrutura de financiamento, política de
                    amortizações e do regime fiscal.
                  </p>
                  <p className="report-p">
                    É também o método mais adequado a uma estimativa preliminar: exige poucos pressupostos
                    discricionários, é transparente e reflete diretamente o apetite atual do mercado pelo setor. A sua
                    limitação é a dependência da qualidade dos comparáveis e o facto de captar a fotografia atual do
                    negócio, e não um plano de crescimento futuro.
                  </p>
                  <p className="report-p">
                    O EV/EBITDA tende a ser mais adequado para empresas com EBITDA positivo, operações relativamente
                    estáveis e estruturas de custos comparáveis às das empresas utilizadas como referência. É menos
                    informativo quando a empresa apresenta resultados operacionais negativos ou muito voláteis, quando
                    existem diferenças significativas de crescimento ou margem face aos comparáveis, ou quando o negócio
                    se encontra numa fase de forte transformação.
                  </p>
                  <p className="report-p">
                    A avaliação por múltiplos é, assim, uma referência simples, transparente e alinhada com o mercado,
                    especialmente útil quando existem comparáveis sólidos e para suportar uma primeira estimativa de
                    valor. A sua principal limitação é depender da qualidade desses comparáveis e não refletir, por si
                    só, o potencial futuro do negócio.
                  </p>
                  <div className="report-note">
                    Numa transação real, os múltiplos são o ponto de partida da negociação e são depois confrontados com
                    uma análise de fluxos de caixa e com a due diligence.
                  </div>
                </div>
                <div>
                  <H>Métodos alternativos</H>
                  <div className="report-cards">
                    <div className="report-card">
                      <strong>DCF - fluxos de caixa descontados</strong>
                      <p>
                        Projeta os fluxos de caixa futuros e desconta-os a uma taxa que reflete o custo do capital
                        (WACC). É o método mais rigoroso quando existe um plano de negócios credível, mas é muito
                        sensível aos pressupostos.
                      </p>
                    </div>
                    <div className="report-card">
                      <strong>Outros múltiplos de transação</strong>
                      <p>
                        Para além do EV/EBITDA, podem ser utilizados múltiplos como EV/Receitas, EV/EBIT ou P/E,
                        dependendo do setor, da maturidade e da rentabilidade da empresa. A sua relevância depende da
                        comparabilidade das empresas e da qualidade da informação disponível.
                      </p>
                    </div>
                    <div className="report-card">
                      <strong>Métricas específicas do setor</strong>
                      <p>
                        Complementa os múltiplos financeiros através de métricas operacionais relevantes para cada
                        negócio, como valor por unidade, cliente, cama, subscritor ou metro quadrado. É particularmente
                        útil em setores onde estes indicadores explicam de forma mais direta o potencial económico da
                        empresa.
                      </p>
                    </div>
                    <div className="report-card">
                      <strong>Valor patrimonial / liquidação</strong>
                      <p>
                        Avalia os ativos líquidos ao seu valor de mercado. Relevante em negócios intensivos em ativos,
                        funcionando como valor mínimo de referência.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Page>

            {/* 6 — Ajustes ao múltiplo */}
            <Page numero={6} titulo="Ajustes ao múltiplo">
              <H>Ajustes aplicados ao múltiplo setorial</H>
              {d.ajustes.length ? (
                <table className="report-table report-table-text">
                  <thead>
                    <tr>
                      <th>Fator</th>
                      <th>Leitura</th>
                      <th>Efeito</th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.ajustes.map((a, i) => (
                      <tr key={`${a.label}-${i}`}>
                        <td>{a.label}</td>
                        <td>{a.detalhe}</td>
                        <td>{efeitoQualitativo(a.multiplicador, a.semDados, a.efeito)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="report-p">Não foram aplicados ajustes ao múltiplo setorial de base.</p>
              )}
              <p className="report-small">
                O conjunto dos ajustes está limitado a um intervalo global de −40% a +35% sobre o múltiplo setorial de
                base, evitando que a combinação de fatores produza resultados extremos. Todos os fatores assentam em
                informação declarada e carecem de validação documental.
              </p>
            </Page>

            {/* 7 — Cenários e sensibilidade */}
            <Page numero={7} titulo="Cenários e sensibilidade">
              <H>Cenários de valorização</H>
              {d.cenarios.length ? (
                <table className="report-table report-table-text">
                  <thead>
                    <tr>
                      <th>Cenário</th>
                      <th>Pressupostos</th>
                      <th>Múltiplo</th>
                      <th>Enterprise Value</th>
                      <th>Equity Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.cenarios.map((c) => (
                      <tr key={c.nome} className={c.nome === "Base" ? "report-row-total" : undefined}>
                        <td>{c.nome}</td>
                        <td>{c.pressuposto}</td>
                        <td>{c.multiplo}</td>
                        <td>{c.ev}</td>
                        <td>{c.equity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="report-p">Sem cenários disponíveis para os dados fornecidos.</p>
              )}

              <H>Sensibilidade do Enterprise Value</H>
              {d.sensibilidade ? (
                <>
                  <table className="report-table report-table-compact">
                    <thead>
                      <tr>
                        <th>Variação do EBITDA</th>
                        <th>EBITDA</th>
                        {d.sensibilidade.colunas.map((c) => (
                          <th key={c}>{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[...d.sensibilidade.linhas].reverse().map((l) => (
                        <tr key={l.variacao} className={l.destaque ? "report-row-total" : undefined}>
                          <td>{l.variacao}</td>
                          <td>{l.ebitda}</td>
                          {l.valores.map((v, i) => (
                            <td key={i}>{v}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="report-small">
                    A tabela mostra como o Enterprise Value reage a variações do EBITDA normalizado e do múltiplo
                    aplicado. O Equity Value acompanha estas variações, ajustado pela dívida total, caixa, depósitos e
                    outros equivalentes, e o imóvel indicado na equity bridge.
                  </p>
                </>
              ) : (
                <p className="report-p">Sem análise de sensibilidade disponível.</p>
              )}
            </Page>

            {/* 8 — Equity Bridge e contexto da transação */}
            <Page numero={8} titulo="Equity Bridge e contexto da transação">
              <div className="report-slide-eight">
                <section className="report-slide-eight-section">
                  <H>Equity Bridge</H>
                  <div className="report-slide-eight-bridge">
                    <div>
                      <table className="report-table report-table-compact">
                        <thead>
                          <tr>
                            <th>Componente</th>
                            <th>Valor</th>
                          </tr>
                        </thead>
                        <tbody>
                          {d.ponte.map((l, i) => (
                            <tr key={i} className={l.tipo === "total" ? "report-row-total" : undefined}>
                              <td>{l.label}</td>
                              <td>{l.formatado}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <WaterfallChart items={d.ponte} />
                  </div>
                </section>

                <section className="report-slide-eight-section report-slide-eight-transaction">
                  <H>Contexto e estrutura da transação</H>
                  <div className="report-slide-eight-context">
                    <div>
                      <table className="report-table report-table-text report-table-compact">
                        <thead>
                          <tr>
                            <th>Parâmetro</th>
                            <th>Detalhe</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            ["Motivo da transação", d.motivo_interesse ?? "—"],
                            ["Percentagem de capital a transacionar", d.pct_a_transacionar ?? "—"],
                            ["Estrutura pretendida", d.estrutura_transacao ?? "—"],
                            ["Horizonte temporal", d.horizonte_temporal ?? "—"],
                            ["Permanência do acionista", d.permanencia_pos_venda ?? "—"],
                            ["Imóvel", d.imovel_no_perimetro_texto],
                            ["Tipo de investidor preferencial", d.tipo_investidor ?? "—"],
                          ].map(([k, v]) => (
                            <tr key={String(k)}>
                              <td>{k}</td>
                              <td>{v}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <table className="report-table report-table-text report-table-compact">
                        <thead>
                          <tr>
                            <th>Estrutura</th>
                            <th>Implicação</th>
                          </tr>
                        </thead>
                        <tbody>
                          {d.implicacoes_estrutura.map((e) => (
                            <tr key={e.estrutura}>
                              <td>{e.estrutura}</td>
                              <td>{e.implicacao}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="report-note report-slide-eight-note">{d.nota_minoria}</div>
                    </div>
                  </div>
                </section>
              </div>
            </Page>

            {/* 9 — Drivers de Valor & Riscos */}
            <Page numero={9} titulo="Drivers de Valor & Riscos">
              <H>Drivers de Valor</H>
              {d.drivers.length ? (
                <table className="report-table report-table-text">
                  <thead>
                    <tr>
                      <th style={{ width: "26%" }}>Driver</th>
                      <th>Descrição</th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.drivers.map((dr) => (
                      <tr key={dr.driver}>
                        <td>{dr.driver}</td>
                        <td>{dr.descricao}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="report-p">
                  Não foram identificados drivers de valor específicos com base na informação disponibilizada.
                </p>
              )}

              <H>Riscos e mitigantes</H>
              {d.riscos.length ? (
                <table className="report-table report-table-text">
                  <thead>
                    <tr>
                      <th>Risco</th>
                      <th>Evidência disponível</th>
                      <th>Impacto</th>
                      <th>Mitigante</th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.riscos.map((rk, i) => (
                      <tr key={i}>
                        <td>
                          {rk.risco}
                          <em className="report-inline-note">{rk.nivel}</em>
                        </td>
                        <td>{rk.evidencia}</td>
                        <td>{rk.impacto}</td>
                        <td>{rk.mitigante}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="report-p">
                  Não foram identificados riscos materiais específicos com base na informação disponibilizada.
                </p>
              )}
            </Page>

            {/* 10 — Plano de preparação */}
            <Page numero={10} titulo="Preparação para o mercado">
              <H>Plano de preparação priorizado</H>
              <table className="report-table report-table-text">
                <thead>
                  <tr>
                    <th>Prioridade</th>
                    <th>Ação</th>
                    <th>Impacto esperado</th>
                    <th>Esforço</th>
                  </tr>
                </thead>
                <tbody>
                  {d.plano.map((p, i) => (
                    <tr key={i}>
                      <td>
                        <span className={`report-badge report-badge-${p.prioridade.toLowerCase()}`}>
                          {p.prioridade}
                        </span>
                      </td>
                      <td>{p.acao}</td>
                      <td>{p.impacto}</td>
                      <td>{p.esforco}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <H>Recomendações imediatas</H>
              <ol className="report-list report-compact">
                {d.recomendacoes.slice(0, 5).map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ol>
            </Page>

            {/* 11 — DCF Valuation */}
            <DcfPage d={d} numero={11} />

            {/* 12 — Sensitivity Analysis */}
            <SensitivityPage d={d} numero={12} />

            {/* 13 — Processo de M&A */}

            <Page numero={13} titulo="Processo de M&A">
              <H>Como decorre um processo de M&amp;A</H>
              <div className="report-phases report-phases-2 report-phases-tall">
                {FASES.map((f) => (
                  <div key={f.numero} className="report-phase">
                    <div className="report-phase-head">
                      <span>{f.numero}</span>
                      <strong>{f.titulo}</strong>
                      <em>{f.duracao}</em>
                    </div>
                    <ul>
                      {f.etapas.slice(0, 4).map((e, i) => (
                        <li key={i}>{e.split("—")[0]}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Page>
          </>
        ) : (
          LOCKED_PAGES.map((p) => <LockedPage key={p.numero} numero={p.numero} titulo={p.titulo} />)
        )}

        {/* 15 — Próximo passo e contactos */}
        <Page numero={14} titulo="Próximo passo e contactos" id="agendar">
          <div className="report-final">
            <div className="report-final-left">
              <h2 className="report-closing-title">Obrigado.</h2>
              <p className="report-closing-lead">
                Obrigado pelo seu tempo. Este relatório é um ponto de partida: a conversão de uma estimativa indicativa
                numa avaliação sustentada exige a validação dos números, a análise de transações comparáveis recentes e
                a leitura do apetite atual de investidores financeiros e estratégicos para o seu setor.
              </p>

              <div className="report-next-step-card report-final-card">
                <strong>Próximo passo · Reunião de 20 minutos</strong>
                <p>
                  Revisão conjunta dos pressupostos deste relatório com a equipa da Lealia e apresentação do relatório
                  completo.
                </p>
                <a
                  href="https://calendly.com/d/d3qm-jpm-t5x/valuation-full-report"
                  target="_blank"
                  rel="noreferrer"
                  className="report-next-step-btn"
                >
                  Agendar reunião
                </a>
              </div>

              <div className="report-final-brand">
                <img src={logo} alt="Lealia Advisory Partners" className="report-contacts-logo" />
                <ul className="report-contact-list">
                  <li>
                    <a href="https://lealiaap.com" target="_blank" rel="noreferrer">
                      lealiaap.com
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/company/lealia-ap" target="_blank" rel="noreferrer">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="mailto:geral@lealiaap.com">geral@lealiaap.com</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="report-final-right">
              <span className="report-final-eyebrow">Contactos</span>

              <div className="report-contact-card">
                <strong>Ricardo Nascimento Ferreira</strong>
                <span>Managing Partner</span>
                <ul className="report-contact-list">
                  <li>
                    <a href="mailto:ricardo.ferreira@lealiaap.com">ricardo.ferreira@lealiaap.com</a>
                  </li>
                  <li>
                    <a href="tel:+351917179408">+351 917 179 408</a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/ricardo-a-n-ferreira" target="_blank" rel="noreferrer">
                      linkedin.com/in/ricardo-a-n-ferreira
                    </a>
                  </li>
                </ul>
              </div>

              <div className="report-contact-card">
                <strong>Duarte Rocha Pereira</strong>
                <span>Managing Partner</span>
                <ul className="report-contact-list">
                  <li>
                    <a href="mailto:duarte.pereira@lealiaap.com">duarte.pereira@lealiaap.com</a>
                  </li>
                  <li>
                    <a href="tel:+351935882323">+351 935 882 323</a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/duarte-rocha-pereira" target="_blank" rel="noreferrer">
                      linkedin.com/in/duarte-rocha-pereira
                    </a>
                  </li>
                </ul>
              </div>

              <p className="report-closing-note">
                Documento de natureza indicativa, preparado exclusivamente para {d.empresa}. Não constitui
                aconselhamento financeiro nem proposta contratual.
              </p>
            </div>
          </div>
        </Page>
      </article>
    </EmpresaContext.Provider>
  );
}
