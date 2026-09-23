import type { ReportData } from "@core/report-data";
import { type ReportLang, t } from "@core/report-i18n";
import { Page, H } from "../primitives";

export function Slide09Drivers({ d, lang }: { d: ReportData; lang: ReportLang }) {
  const dict = t(lang).doc;
  return (
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
  );
}
