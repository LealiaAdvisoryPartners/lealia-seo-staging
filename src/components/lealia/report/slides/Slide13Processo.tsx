import { getFases } from "@core/timeline";
import { type ReportLang, t } from "@core/report-i18n";
import { Page, H } from "../primitives";

export function Slide13Processo({ lang }: { lang: ReportLang }) {
  const dict = t(lang).doc;
  return (
    <Page numero={13} titulo={dict.p13.titulo} lang={lang}>
      <H>{dict.p13.hTitulo}</H>
      <div className="report-note report-disclaimer-inline">{dict.p13.notaSecao}</div>
      <div className="report-phases report-phases-2 report-phases-tall">
        {getFases(lang).map((f) => (
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
  );
}
