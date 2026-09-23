import type { ReportData } from "@core/report-data";
import { type ReportLang, t } from "@core/report-i18n";
import { Page, H } from "../primitives";

export function Slide12Plano({ d, lang }: { d: ReportData; lang: ReportLang }) {
  const dict = t(lang).doc;
  return (
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
                <span className={`report-badge report-badge-${p.prioridade.toLowerCase()}`}>{p.prioridade}</span>
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
  );
}
