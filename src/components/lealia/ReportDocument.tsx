import * as React from "react";
import logo from "@/assets/lealia-logo.png";
import cover from "@/assets/report-cover.png";
import { FASES } from "@/lib/timeline";
import type { ReportData } from "@/lib/report-data";
import { formatEUR } from "@/lib/valuation";
import {
  t,
  type ReportLang,
  groupThousandsLang,
  formatPercentLang,
  formatMultipleLang,
  formatFactor3Lang,
} from "@/lib/report-i18n";

const EmpresaContext = React.createContext<string>("");

function Page({
  numero,
  titulo,
  id,
  className,
  children,
  empresaOverride,
  lang,
}: {
  numero: number;
  titulo?: string;
  id?: string;
  className?: string;
  children: React.ReactNode;
  empresaOverride?: string;
  lang: ReportLang;
}) {
  const empresaCtx = React.useContext(EmpresaContext);
  const empresa = empresaOverride ?? empresaCtx;
  return (
    <section className={`report-page${className ? ` ${className}` : ""}`} id={id}>
      <header className="report-head">
        <img src={logo} alt="Lealia Advisory Partners" className="h-6 w-auto" />
        {titulo ? <span className="report-head-title">{titulo}</span> : null}
      </header>
      <div className="report-body">{children}</div>
      <footer className="report-foot">
        <span>{t(lang).doc.footer(empresa)}</span>
        <span>{numero}</span>
      </footer>
    </section>
  );
}

function efeitoQualitativo(multiplicador: number, lang: ReportLang, semDados?: boolean, efeito?: string) {
  if (efeito) return efeito;
  const efeitos = t(lang).doc.efeito;
  if (semDados) return efeitos.neutro;
  if (multiplicador > 0.995) return efeitos.positivo;
  if (multiplicador < 0.995) return efeitos.negativo;
  return efeitos.neutro;
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

function WaterfallChart({ items, lang }: { items: ReportData["ponte"]; lang: ReportLang }) {
  if (!items.length) return null;
  const kEur = (v: number) => groupThousandsLang(v / 1000, lang);
  const dictWaterfall = t(lang).doc.waterfall;

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
      <figcaption>{dictWaterfall.caption}</figcaption>
      <svg viewBox={`0 0 ${width} 240`} role="img" aria-label={dictWaterfall.ariaLabel}>
        <line className="report-waterfall-axis" x1="10" x2={width - 10} y1={y(0)} y2={y(0)} />
        {chartItems.map((item, index) => {
          const x = startX + index * (barWidth + gap);
          const topValue = item.isTotal ? Math.max(0, item.valor) : Math.max(item.previous, item.next);
          const bottomValue = item.isTotal ? Math.min(0, item.valor) : Math.min(item.previous, item.next);
          const top = y(topValue);
          const height = Math.max(2, y(bottomValue) - top);
          const shortLabel =
            item.tipo === "base"
              ? dictWaterfall.enterpriseValue
              : item.tipo === "total"
                ? dictWaterfall.equityValue
                : item.valor < 0
                  ? dictWaterfall.divida
                  : item.label.includes("caixa")
                    ? dictWaterfall.caixa
                    : dictWaterfall.imovel;
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

type Dcf = NonNullable<ReportData["dcf"]>;
type DcfAno = Dcf["anos"][number];
type MapaLinha = {
  label: string;
  get: (a: DcfAno) => number | null;
  tv?: number | null;
  total?: boolean;
  fmt?: (v: number) => string;
};

function MapaTabela({
  dcf,
  linhas,
  head = true,
  lang,
}: {
  dcf: Dcf;
  linhas: MapaLinha[];
  head?: boolean;
  lang: ReportLang;
}) {
  const kEur = (v: number) => groupThousandsLang(v / 1000, lang);
  const dictDcf = t(lang).doc.dcf;
  return (
    <table className="report-table report-table-compact report-dcf-map">
      <thead className={head ? undefined : "report-dcf-head-hidden"}>
        <tr>
          <th>{dictDcf.linha}</th>
          {dcf.anos.map((a) => (
            <th key={a.ano} className={a.tipo === "forecast" ? "report-dcf-fc" : "report-dcf-hist"}>
              {a.ano}
              {a.tipo === "forecast" ? "F" : "A"}
            </th>
          ))}
          <th className="report-dcf-tv">{dictDcf.tv}</th>
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

function DcfPage({ d, numero, lang }: { d: ReportData; numero: number; lang: ReportLang }) {
  const dcf = d.dcf;
  const dictDcf = t(lang).doc.dcf;
  const pctFmt = (v: number, casas = 1) => formatPercentLang(v * 100, lang, casas);
  const xFmt = (v: number | null) => formatMultipleLang(v, lang);
  const fatorFmt = (v: number) => formatFactor3Lang(v, lang);

  if (!dcf) {
    return (
      <Page numero={numero} titulo={dictDcf.titulo} lang={lang}>
        <H>{dictDcf.hTitulo}</H>
        <div className="report-note">{d.dcf_motivo ?? dictDcf.semDados}</div>
      </Page>
    );
  }

  const fatorTv = 1 / Math.pow(1 + dcf.wacc, dcf.anos.filter((a) => a.tipo === "forecast").length);

  const linhasNopat: MapaLinha[] = [
    { label: dictDcf.receita, get: (a) => a.receita },
    { label: dictDcf.ebitda, get: (a) => a.ebitda },
    { label: dictDcf.margemEbitda, get: (a) => a.margem_ebitda, fmt: (v) => pctFmt(v) },
    { label: dictDcf.da, get: (a) => -a.da },
    { label: dictDcf.ebit, get: (a) => a.ebit, total: true },
    { label: dictDcf.impostoEbit, get: (a) => -a.imposto },
    { label: dictDcf.nopat, get: (a) => a.nopat, total: true },
  ];

  const linhasFcff: MapaLinha[] = [
    { label: dictDcf.nopat, get: (a) => a.nopat },
    { label: dictDcf.maisDa, get: (a) => a.da },
    { label: dictDcf.menosCapex, get: (a) => -a.capex },
    { label: dictDcf.fcff, get: (a) => a.fcff, tv: dcf.terminal_value, total: true },
    { label: dictDcf.fatorDesconto, get: (a) => a.fator_desconto, tv: fatorTv, fmt: fatorFmt },
    { label: dictDcf.pvFcff, get: (a) => a.pv, tv: dcf.pv_terminal_value, total: true },
  ];

  return (
    <Page numero={numero} titulo={dictDcf.titulo} lang={lang}>
      <div className="report-dcf">
        <section className="report-dcf-top">
          <div>
            <div className="report-dcf-title">
              <H>{dictDcf.mapaFluxos}</H>
              <span className="report-dcf-unit">{dictDcf.unidadeMilhares}</span>
            </div>
            <MapaTabela dcf={dcf} linhas={linhasNopat} lang={lang} />
            <MapaTabela dcf={dcf} linhas={linhasFcff} head={false} lang={lang} />
            <p className="report-small">{dictDcf.legenda}</p>
          </div>
          <div>
            <H>{dictDcf.pressupostosForecast}</H>
            <table className="report-table report-table-compact">
              <tbody>
                <tr>
                  <td>{dictDcf.crescimentoInicial}</td>
                  <td>{pctFmt(dcf.crescimento_inicial)}</td>
                </tr>
                <tr>
                  <td>{dictDcf.anoEstabilizacao}</td>
                  <td>{dictDcf.anoN(dcf.ano_estabilizacao)}</td>
                </tr>
                <tr>
                  <td>{dictDcf.crescimentoEstabilizado}</td>
                  <td>{pctFmt(dcf.crescimento_estabilizado)}</td>
                </tr>
                <tr>
                  <td>{dictDcf.crescimentoPerpetuidade}</td>
                  <td>{pctFmt(dcf.terminal_growth)}</td>
                </tr>
                <tr>
                  <td>{dictDcf.margemEbitdaProjetada}</td>
                  <td>{pctFmt(dcf.margem_ebitda)}</td>
                </tr>
                <tr>
                  <td>{dictDcf.capexPctReceita}</td>
                  <td>{pctFmt(dcf.capex_pct_receita)}</td>
                </tr>
                <tr>
                  <td>{dictDcf.daPctReceita}</td>
                  <td>{pctFmt(dcf.da_pct_receita)}</td>
                </tr>
                <tr>
                  <td>{dictDcf.fundoManeio}</td>
                  <td>{dictDcf.naoProjetado}</td>
                </tr>
                <tr>
                  <td>{dictDcf.taxaImposto}</td>
                  <td>{pctFmt(dcf.cit)}</td>
                </tr>
              </tbody>
            </table>
            <H>{dictDcf.indicadoresAvaliacao}</H>
            <table className="report-table report-table-compact">
              <tbody>
                <tr className="report-row-total">
                  <td>{dictDcf.enterpriseValue}</td>
                  <td>{formatEUR(Math.round(dcf.enterprise_value))}</td>
                </tr>
                <tr className="report-row-total">
                  <td>{dictDcf.equityValue}</td>
                  <td>{formatEUR(Math.round(dcf.equity_value))}</td>
                </tr>
                <tr>
                  <td>{dictDcf.evEbitdaImplicito}</td>
                  <td>{xFmt(dcf.ev_ebitda_implicito)}</td>
                </tr>
                <tr>
                  <td>{dictDcf.evReceitaImplicito}</td>
                  <td>{xFmt(dcf.ev_receita_implicito)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="report-dcf-bottom">
          <div>
            <H>{dictDcf.wacc}</H>
            <table className="report-table report-table-compact">
              <tbody>
                <tr>
                  <td>{dictDcf.riskFree}</td>
                  <td>{pctFmt(dcf.risk_free)}</td>
                </tr>
                <tr>
                  <td>{dictDcf.beta}</td>
                  <td>
                    {dcf.beta_unlevered.toFixed(2)} / {dcf.beta_levered.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td>{dictDcf.erp}</td>
                  <td>{pctFmt(dcf.erp)}</td>
                </tr>
                <tr>
                  <td>{dictDcf.crp}</td>
                  <td>{pctFmt(dcf.crp)}</td>
                </tr>
                <tr>
                  <td>{dictDcf.premioDimensao}</td>
                  <td>{pctFmt(dcf.size_premium)}</td>
                </tr>
                <tr>
                  <td>{dictDcf.premioEspecifico}</td>
                  <td>{pctFmt(dcf.premio_especifico)}</td>
                </tr>
                {dcf.premio_ativo_especifico > 0 ? (
                  <tr>
                    <td>{dictDcf.premioAtivoEspecifico}</td>
                    <td>{pctFmt(dcf.premio_ativo_especifico)}</td>
                  </tr>
                ) : null}
                <tr className="report-row-total">
                  <td>{dictDcf.costOfEquity}</td>
                  <td>{pctFmt(dcf.cost_of_equity)}</td>
                </tr>
                <tr>
                  <td>{dictDcf.costOfDebt}</td>
                  <td>
                    {pctFmt(dcf.cost_of_debt_pre)} / {pctFmt(dcf.cost_of_debt_pos)}
                  </td>
                </tr>
                <tr>
                  <td>{dictDcf.pesoEquityDivida}</td>
                  <td>
                    {pctFmt(dcf.peso_equity, 0)} / {pctFmt(dcf.peso_divida, 0)}
                  </td>
                </tr>
                <tr className="report-row-total">
                  <td>{dictDcf.waccLabel}</td>
                  <td>{pctFmt(dcf.wacc)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <H>{dictDcf.resultados}</H>
            <table className="report-table report-table-compact">
              <tbody>
                <tr>
                  <td>{dictDcf.pvExplicito}</td>
                  <td>{formatEUR(Math.round(dcf.pv_explicito))}</td>
                </tr>
                <tr>
                  <td>{dictDcf.pvTerminal}</td>
                  <td>{formatEUR(Math.round(dcf.pv_terminal_value))}</td>
                </tr>
                <tr>
                  <td>{dictDcf.pesoTerminal}</td>
                  <td>{pctFmt(dcf.peso_terminal, 0)}</td>
                </tr>
                <tr className="report-row-total">
                  <td>{dictDcf.enterpriseValue}</td>
                  <td>{formatEUR(Math.round(dcf.enterprise_value))}</td>
                </tr>
                <tr>
                  <td>{dictDcf.ajusteDividaLiquida}</td>
                  <td>{formatEUR(Math.round(-dcf.divida_liquida))}</td>
                </tr>
                {dcf.ativos_nao_operacionais > 0 ? (
                  <tr>
                    <td>{dictDcf.imovel}</td>
                    <td>{formatEUR(Math.round(dcf.ativos_nao_operacionais))}</td>
                  </tr>
                ) : null}
                <tr className="report-row-total">
                  <td>{dictDcf.equityValue}</td>
                  <td>{formatEUR(Math.round(dcf.equity_value))}</td>
                </tr>
              </tbody>
            </table>
            <p className="report-small">
              {dictDcf.notaCustoCapital(d.pais, dcf.cit_nota, dcf.nota_reconciliacao ?? "")}
            </p>
          </div>
        </section>
      </div>
    </Page>
  );
}

function SensitivityPage({ d, numero, lang }: { d: ReportData; numero: number; lang: ReportLang }) {
  const dcf = d.dcf;
  const dictSens = t(lang).doc.sensitivity;
  const kEur = (v: number) => groupThousandsLang(v / 1000, lang);

  if (!dcf) {
    return (
      <Page numero={numero} titulo={dictSens.titulo} lang={lang}>
        <H>{dictSens.hTitulo}</H>
        <div className="report-note">{d.dcf_motivo ?? dictSens.semDados}</div>
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
    "Prémio específico do ativo",
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
    <Page numero={numero} titulo={dictSens.titulo} lang={lang}>
      <div className="report-dcf-title">
        <H>{dictSens.sensibilidadeEv}</H>
        <span className="report-dcf-unit">{t(lang).doc.dcf.unidadeMilhares}</span>
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
                        {Number.isFinite(v) ? kEur(v) : t(lang).common.naoAplicavel}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <p className="report-small">{dictSens.notaMatriz}</p>

      <section className="report-sens-assumptions">
        <H>{dictSens.transparenciaPressupostos}</H>
        <p className="report-small report-dcf-assumptions-intro">{dictSens.introTransparencia}</p>
        <table className="report-table report-table-compact report-table-text">
          <thead>
            <tr>
              <th>{dictSens.parametro}</th>
              <th>{dictSens.valor}</th>
              <th>{dictSens.metodoFonte}</th>
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

function lockedPages(lang: ReportLang): { numero: number; titulo: string }[] {
  const lp = t(lang).doc.lockedPages;
  return [
    { numero: 4, titulo: lp.p4 },
    { numero: 5, titulo: lp.p5 },
    { numero: 6, titulo: lp.p6 },
    { numero: 7, titulo: lp.p7 },
    { numero: 8, titulo: lp.p8 },
    { numero: 9, titulo: lp.p9 },
    { numero: 10, titulo: lp.p10 },
    { numero: 11, titulo: lp.p11 },
    { numero: 12, titulo: lp.p12 },
    { numero: 13, titulo: lp.p13 },
  ];
}

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

function LockedPage({ numero, titulo, lang }: { numero: number; titulo: string; lang: ReportLang }) {
  const dictDoc = t(lang).doc;
  return (
    <Page numero={numero} titulo={titulo} lang={lang}>
      <div className="report-locked">
        <LockedSkeleton />
        <div className="report-locked-overlay">
          <span className="report-locked-eyebrow">{dictDoc.conteudoReservado}</span>
          <h2 className="report-locked-h">{titulo}</h2>
          <p className="report-locked-p">{dictDoc.lockedTexto}</p>
          <button type="button" className="report-locked-cta" onClick={irParaAgendamento}>
            {dictDoc.lockedCta}
          </button>
        </div>
      </div>
    </Page>
  );
}

export function ReportDocument({ d, modo = "completo" }: { d: ReportData; modo?: ReportModo }) {
  const lang: ReportLang = (d as { lang?: ReportLang }).lang ?? "pt";
  const dict = t(lang).doc;
  const disclaimer = dict.disclaimer;

  return (
    <EmpresaContext.Provider value={d.empresa}>
      <article className="report-doc">
        {/* 1 — Capa */}
        <section className="report-page report-cover">
          <img src={cover} alt="" className="report-cover-image" />
          <div className="report-cover-side">
            <img src={logo} alt="Lealia Advisory Partners" className="report-cover-logo" />
            <div className="mt-auto">
              <h1 className="report-title">{dict.cover.titulo}</h1>
              <p className="report-title-company">{d.empresa}</p>
              <p className="report-sub">
                {d.industria}
                {d.subindustria ? ` · ${d.subindustria}` : ""} · {d.pais}
              </p>
            </div>
            <div className="report-cover-meta">
              <div>
                <span>{dict.cover.preparadoPara}</span>
                <strong>
                  {d.nome}
                  {d.cargo ? ` · ${d.cargo}` : ""}
                </strong>
              </div>
              <div>
                <span>{dict.cover.data}</span>
                <strong>{d.data_relatorio}</strong>
              </div>
            </div>
            <p className="report-cover-disclaimer">{disclaimer}</p>
          </div>
        </section>

        {/* 2 — Sumário executivo */}
        <Page numero={2} titulo={dict.p2.titulo} lang={lang}>
          <H>{dict.p2.titulo}</H>
          <p className="report-p" dangerouslySetInnerHTML={{ __html: d.resumo_textual }} />

          {d.ok ? (
            <div className="report-highlight">
              <div>
                <span>{dict.p2.evIndicativo}</span>
                <strong>
                  {d.ev_min_formatado} — {d.ev_max_formatado}
                </strong>
              </div>
              <div>
                <span>{dict.p2.equityIndicativo}</span>
                <strong>
                  {d.equity_min_formatado} — {d.equity_max_formatado}
                </strong>
              </div>
            </div>
          ) : (
            <div className="report-note">{d.motivo}</div>
          )}

          <div className="report-grid">
            <Kv label={dict.p2.faturacaoAno} value={d.faturacao_ano1_formatado} />
            <Kv label={dict.p2.ebitdaNormalizado} value={d.ebitda_normalizado_formatado} />
            <Kv label={dict.p2.margemNormalizada} value={d.margem_ebitda_ajustada_formatada} />
            <Kv
              label={dict.p2.multiploImplicito}
              value={
                d.multiplo_ajustado_min !== null && d.multiplo_ajustado_max !== null
                  ? `${formatMultipleLang(d.multiplo_ajustado_min, lang)} — ${formatMultipleLang(d.multiplo_ajustado_max, lang)}`
                  : "—"
              }
            />
            <Kv
              label={
                <span>
                  {dict.p2.posicaoLiquida} <span className="report-kv-hint">{dict.p2.posicaoLiquidaHint}</span>
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
            <Kv label={dict.p2.completudeInformacao} value={d.confianca ?? "—"} />
          </div>

          <H>{dict.p2.metodologia}</H>
          <ol className="report-list report-compact">
            <li>
              <strong>{dict.p2.metodo1Titulo}</strong> — {dict.p2.metodo1(d.ebitda_normalizado_formatado)}
            </li>
            <li>
              <strong>{dict.p2.metodo2Titulo}</strong> — {dict.p2.metodo2}
            </li>
            <li>
              <strong>{dict.p2.metodo3Titulo}</strong> — {dict.p2.metodo3}
            </li>
            <li>
              <strong>{dict.p2.metodo4Titulo}</strong> — {dict.p2.metodo4}
            </li>
          </ol>
        </Page>

        {/* 3 — Perfil, histórico e posição financeira */}
        <Page numero={3} titulo={dict.p3.titulo} lang={lang}>
          <div className="report-two">
            <div>
              <H>{dict.p3.perfilEmpresa}</H>
              <table className="report-table report-table-compact">
                <thead>
                  <tr>
                    <th>{dict.p3.indicador}</th>
                    <th>{dict.p3.valor}</th>
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

              <H>{dict.p3.historicoFinanceiro}</H>
              <table className="report-table report-table-compact">
                <thead>
                  <tr>
                    <th>{dict.p3.ano}</th>
                    <th>{dict.p3.faturacao}</th>
                    <th>{dict.p3.ebitda}</th>
                    <th>{dict.p3.extraordinarios}</th>
                    <th>{dict.p3.normalizacoes}</th>
                  </tr>
                </thead>
                <tbody>
                  {d.historico.map((l) => (
                    <tr key={l.ano}>
                      <td>{l.ano}</td>
                      <td>{l.faturacao}</td>
                      <td>{l.ebitda}</td>
                      <td>{l.despesas}</td>
                      <td>{l.normalizacoes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {d.qualidade.tem_serie ? (
                <table className="report-table report-table-compact">
                  <tbody>
                    <tr>
                      <td>{dict.p3.cagrFaturacao}</td>
                      <td>{d.qualidade.cagr_faturacao ?? "—"}</td>
                    </tr>
                    <tr>
                      <td>{dict.p3.cagrEbitda}</td>
                      <td>{d.qualidade.cagr_ebitda ?? "—"}</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p className="report-small">{dict.p3.semInfoSuficiente}</p>
              )}
            </div>
            <div>
              <H>{dict.p3.normalizacaoEbitda}</H>
              <table className="report-table report-table-compact">
                <thead>
                  <tr>
                    <th>{dict.p3.linha}</th>
                    <th>{dict.p3.valor}</th>
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
              <p className="report-small report-normalizacao-nota">{dict.p3.notaNormalizacao}</p>
              <H>{dict.p3.outrosIndicadores}</H>
              <table className="report-table report-table-compact">
                <thead>
                  <tr>
                    <th>{dict.p3.indicador}</th>
                    <th>{dict.p3.valor}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{dict.p3.caixaDepositos}</td>
                    <td>{d.caixa_formatado}</td>
                  </tr>
                  <tr>
                    <td>{dict.p3.dividaTotal}</td>
                    <td>{d.divida_financeira_formatado}</td>
                  </tr>
                  <tr>
                    <td>{dict.p3.capexAnual}</td>
                    <td>{d.capex_formatado}</td>
                  </tr>
                  <tr>
                    <td>{dict.p3.unidadesLocalizacoes}</td>
                    <td>{d.unidades || t(lang).common.naoIndicado}</td>
                  </tr>
                  <tr>
                    <td>{dict.p3.concentracaoMaiorCliente}</td>
                    <td>{d.concentracao_top1 || t(lang).common.naoIndicado}</td>
                  </tr>
                  <tr>
                    <td>{dict.p3.concentracaoTop5}</td>
                    <td>{d.concentracao_top5 || t(lang).common.naoIndicado}</td>
                  </tr>
                  <tr>
                    <td>{dict.p3.clientesAtivos}</td>
                    <td>{d.num_clientes_ativos || t(lang).common.naoIndicado}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Page>

        {modo === "completo" ? (
          <>
            {/* 4 — Âmbito e limitações */}
            <Page numero={4} titulo={dict.p4.titulo} lang={lang}>
              <H>{dict.p4.hTitulo}</H>
              <p className="report-p">{disclaimer}</p>
              <div className="report-two">
                <div>
                  <H>{dict.p4.naturezaDocumento}</H>
                  <ul className="report-list report-list-disc report-compact">
                    <li>{dict.p4.natureza1}</li>
                    <li>{dict.p4.natureza2}</li>
                    <li>{dict.p4.natureza3}</li>
                    <li>{dict.p4.natureza4}</li>
                  </ul>
                </div>
                <div>
                  <H>{dict.p4.limitacoesFatores}</H>
                  <ul className="report-list report-list-disc report-compact">
                    <li>{dict.p4.limitacao1}</li>
                    <li>{dict.p4.limitacao2}</li>
                    <li>{dict.p4.limitacao3}</li>
                    <li>{dict.p4.limitacao4}</li>
                  </ul>
                  <div className="report-note">{dict.p4.semResponsabilidade}</div>
                </div>
              </div>

              <H style={{ marginTop: "2.5mm", marginBottom: "2mm" }}>{dict.p4.leituraComplementar}</H>
              <ul className="report-list report-list-disc report-leitura">
                <li>{d.qualidade.conversao_caixa}</li>
                <li>{d.qualidade.fundo_maneio}</li>
                <li>{d.qualidade.ajustamentos}</li>
                {d.qualidade.concentracao ? <li>{d.qualidade.concentracao}</li> : null}
                {d.qualidade.backlog ? <li>{d.qualidade.backlog}</li> : null}
                <li>{dict.p4.leituraFinal}</li>
              </ul>
            </Page>

            {/* 5 — Método e alternativas */}
            <Page numero={5} titulo={dict.p5.titulo} lang={lang}>
              <H>{dict.p5.porqueMultiplos}</H>
              <div className="report-two">
                <div>
                  <p className="report-p">{dict.p5.par1}</p>
                  <p className="report-p">{dict.p5.par2}</p>
                  <p className="report-p">{dict.p5.par3}</p>
                  <p className="report-p">{dict.p5.par4}</p>
                  <div className="report-note">{dict.p5.nota}</div>
                </div>
                <div>
                  <H>{dict.p5.metodosAlternativos}</H>
                  <div className="report-cards">
                    <div className="report-card">
                      <strong>
                        {dict.p5.dcfTitulo} <em>{dict.p5.dcfNota}</em>
                      </strong>
                      <p>{dict.p5.dcfDesc}</p>
                    </div>
                    <div className="report-card">
                      <strong>{dict.p5.outrosMultiplosTitulo}</strong>
                      <p>{dict.p5.outrosMultiplosDesc}</p>
                    </div>
                    <div className="report-card">
                      <strong>{dict.p5.metricasSetorTitulo}</strong>
                      <p>{dict.p5.metricasSetorDesc}</p>
                    </div>
                    <div className="report-card">
                      <strong>{dict.p5.valorPatrimonialTitulo}</strong>
                      <p>{dict.p5.valorPatrimonialDesc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Page>

            {/* 6 — Ajustes ao múltiplo */}
            <Page numero={6} titulo={dict.p6.titulo} lang={lang}>
              <H>{dict.p6.hTitulo}</H>
              {d.ajustes.length ? (
                <table className="report-table report-table-text">
                  <thead>
                    <tr>
                      <th>{dict.p6.fator}</th>
                      <th>{dict.p6.leitura}</th>
                      <th>{dict.p6.efeito}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.ajustes.map((a, i) => (
                      <tr key={`${a.label}-${i}`}>
                        <td>{a.label}</td>
                        <td>{a.detalhe}</td>
                        <td>{efeitoQualitativo(a.multiplicador, lang, a.semDados, a.efeito)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="report-p">{dict.p6.semAjustes}</p>
              )}
              <p className="report-small">{dict.p6.nota}</p>
            </Page>

            {/* 7 — Cenários e sensibilidade */}
            <Page numero={7} titulo={dict.p7.titulo} lang={lang}>
              <H>{dict.p7.cenariosValorizacao}</H>
              {d.cenarios.length ? (
                <table className="report-table report-table-text">
                  <thead>
                    <tr>
                      <th>{dict.p7.cenario}</th>
                      <th>{dict.p7.pressupostos}</th>
                      <th>{dict.p7.multiplo}</th>
                      <th>{dict.p7.enterpriseValue}</th>
                      <th>{dict.p7.equityValue}</th>
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
                <p className="report-p">{dict.p7.semCenarios}</p>
              )}

              <H>{dict.p7.sensibilidadeEv}</H>
              {d.sensibilidade ? (
                <>
                  <table className="report-table report-table-compact">
                    <thead>
                      <tr>
                        <th>{dict.p7.variacaoEbitda}</th>
                        <th>{dict.p7.ebitda}</th>
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
                  <p className="report-small">{dict.p7.notaSensibilidade}</p>
                </>
              ) : (
                <p className="report-p">{dict.p7.semSensibilidade}</p>
              )}
            </Page>

            {/* 8 — Equity Bridge e contexto da transação */}
            <Page numero={8} titulo={dict.p8.titulo} lang={lang}>
              <div className="report-slide-eight">
                <section className="report-slide-eight-section">
                  <H>{dict.p8.equityBridge}</H>
                  <div className="report-slide-eight-bridge">
                    <div>
                      <table className="report-table report-table-compact">
                        <thead>
                          <tr>
                            <th>{dict.p8.componente}</th>
                            <th>{dict.p8.valor}</th>
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
                    <WaterfallChart items={d.ponte} lang={lang} />
                  </div>
                </section>

                <section className="report-slide-eight-section report-slide-eight-transaction">
                  <H>{dict.p8.contextoEstrutura}</H>
                  <div className="report-slide-eight-context">
                    <div>
                      <table className="report-table report-table-text report-table-compact">
                        <thead>
                          <tr>
                            <th>{dict.p8.parametro}</th>
                            <th>{dict.p8.detalhe}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            [dict.p8.motivoTransacao, d.motivo_interesse ?? "—"],
                            [dict.p8.pctATransacionar, d.pct_a_transacionar ?? "—"],
                            [dict.p8.estruturaPretendida, d.estrutura_transacao ?? "—"],
                            [dict.p8.horizonteTemporal, d.horizonte_temporal ?? "—"],
                            [dict.p8.permanenciaAcionista, d.permanencia_pos_venda ?? "—"],
                            [dict.p8.imovel, d.imovel_no_perimetro_texto],
                            [dict.p8.tipoInvestidor, d.tipo_investidor ?? "—"],
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
                            <th>{dict.p8.estrutura}</th>
                            <th>{dict.p8.implicacao}</th>
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
            <Page numero={9} titulo={dict.p9.titulo} className="report-drivers" lang={lang}>
              <H>{dict.p9.driversValor}</H>
              {d.drivers.length ? (
                <table className="report-table report-table-text report-drivers-table">
                  <thead>
                    <tr>
                      <th>{dict.p9.driver}</th>
                      <th>{dict.p9.descricao}</th>
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
                <p className="report-p">{dict.p9.semDrivers}</p>
              )}

              <H>{dict.p9.riscosMitigantes}</H>
              {d.riscos.length ? (
                <table className="report-table report-table-text report-risks-table">
                  <thead>
                    <tr>
                      <th>{dict.p9.risco}</th>
                      <th>{dict.p9.evidenciaDisponivel}</th>
                      <th>{dict.p9.impacto}</th>
                      <th>{dict.p9.mitigante}</th>
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
                <p className="report-p">{dict.p9.semRiscos}</p>
              )}
            </Page>

            {/* 10 — DCF Valuation */}
            <DcfPage d={d} numero={10} lang={lang} />

            {/* 11 — Sensitivity Analysis */}
            <SensitivityPage d={d} numero={11} lang={lang} />

            {/* 12 — Plano de preparação */}
            <Page numero={12} titulo={dict.p12.titulo} className="report-preparation" lang={lang}>
              <H>{dict.p12.planoPreparacao}</H>
              <div className="report-note report-disclaimer-inline">{dict.p12.notaSecao}</div>
              <table className="report-table report-table-text">
                <thead>
                  <tr>
                    <th>{dict.p12.prioridade}</th>
                    <th>{dict.p12.acao}</th>
                    <th>{dict.p12.impactoEsperado}</th>
                    <th>{dict.p12.esforco}</th>
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
              <H className="report-h2-tight">{dict.p12.recomendacoesImediatas}</H>
              <ol className="report-list report-compact">
                {d.recomendacoes.slice(0, 5).map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ol>
            </Page>

            {/* 13 — Processo de M&A */}

            <Page numero={13} titulo={dict.p13.titulo} lang={lang}>
              <H>{dict.p13.hTitulo}</H>
              <div className="report-note report-disclaimer-inline">{dict.p13.notaSecao}</div>
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
          lockedPages(lang).map((p) => <LockedPage key={p.numero} numero={p.numero} titulo={p.titulo} lang={lang} />)
        )}

        {/* 15 — Próximo passo e contactos */}
        <Page numero={14} titulo={dict.p14.titulo} id="agendar" lang={lang}>
          <div className="report-final">
            <div className="report-final-left">
              <h2 className="report-closing-title">{dict.p14.obrigado}</h2>
              <p className="report-closing-lead">{dict.p14.lead}</p>

              <div className="report-next-step-card report-final-card">
                <strong>{dict.p14.proximoPassoTitulo}</strong>
                <p>{dict.p14.proximoPassoDesc}</p>
                <a
                  href="https://calendly.com/d/d3qm-jpm-t5x/valuation-full-report"
                  target="_blank"
                  rel="noreferrer"
                  className="report-next-step-btn"
                >
                  {dict.p14.agendarReuniao}
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
              <span className="report-final-eyebrow">{dict.p14.contactos}</span>

              <div className="report-contact-card">
                <strong>Ricardo Nascimento Ferreira</strong>
                <span>{dict.p14.managingPartner}</span>
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
                <span>{dict.p14.managingPartner}</span>
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

              <p className="report-closing-note">{dict.p14.notaFinal(d.empresa)}</p>
            </div>
          </div>
        </Page>
      </article>
    </EmpresaContext.Provider>
  );
}
