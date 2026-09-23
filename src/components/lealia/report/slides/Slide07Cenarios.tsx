import type { ReportData } from "@core/report-data";
import { type ReportLang, t } from "@core/report-i18n";
import { Page, H } from "../primitives";

export function Slide07Cenarios({ d, lang }: { d: ReportData; lang: ReportLang }) {
  const dict = t(lang).doc;
  return (
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
  );
}
