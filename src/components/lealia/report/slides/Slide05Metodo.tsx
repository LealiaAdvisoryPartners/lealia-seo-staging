import { type ReportLang, t } from "@core/report-i18n";
import { Page, H } from "../primitives";

export function Slide05Metodo({ lang }: { lang: ReportLang }) {
  const dict = t(lang).doc;
  return (
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
  );
}
