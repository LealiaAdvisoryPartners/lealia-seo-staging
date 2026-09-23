import type { ReportData } from "@core/report-data";
import { type ReportLang, t } from "@core/report-i18n";
import { Page, H } from "../primitives";
import { WaterfallChart } from "../WaterfallChart";

export function Slide08Bridge({ d, lang }: { d: ReportData; lang: ReportLang }) {
  const dict = t(lang).doc;
  const contexto: [string, string][] = [
    [dict.p8.motivoTransacao, d.motivo_interesse ?? "—"],
    [dict.p8.pctATransacionar, d.pct_a_transacionar ?? "—"],
    [dict.p8.estruturaPretendida, d.estrutura_transacao ?? "—"],
    [dict.p8.horizonteTemporal, d.horizonte_temporal ?? "—"],
    [dict.p8.permanenciaAcionista, d.permanencia_pos_venda ?? "—"],
    [dict.p8.imovel, d.imovel_no_perimetro_texto],
    [dict.p8.tipoInvestidor, d.tipo_investidor ?? "—"],
  ];
  return (
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
                  {contexto.map(([k, v]) => (
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
  );
}
