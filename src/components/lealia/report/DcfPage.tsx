import type { ReportData } from "@core/report-data";
import { formatEUR } from "@core/valuation";
import { t, type ReportLang, groupThousandsLang, formatPercentLang, formatMultipleLang, formatFactor3Lang } from "@core/report-i18n";
import { Page, H } from "./primitives";

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

export function DcfPage({ d, numero, lang }: { d: ReportData; numero: number; lang: ReportLang }) {
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
