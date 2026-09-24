import type { ReportData } from "@core/report-data";
import { type ReportLang, t } from "@core/report-i18n";
import { Page, H } from "../primitives";

export function Slide04Ambito({ d, lang }: { d: ReportData; lang: ReportLang }) {
  const dict = t(lang).doc;
  return (
    <Page numero={4} titulo={dict.p4.titulo} className="report-disclaimer-slide" lang={lang}>
      <H>{dict.p4.hTitulo}</H>
      <p className="report-p">{dict.disclaimer}</p>
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

      <H className="report-disclaimer-reading-title">{dict.p4.leituraComplementar}</H>
      <ul className="report-list report-list-disc report-leitura">
        <li>{d.qualidade.conversao_caixa}</li>
        <li>{d.qualidade.fundo_maneio}</li>
        <li>{d.qualidade.ajustamentos}</li>
        {d.qualidade.concentracao ? <li>{d.qualidade.concentracao}</li> : null}
        {d.qualidade.backlog ? <li>{d.qualidade.backlog}</li> : null}
        <li>{dict.p4.leituraFinal}</li>
      </ul>
    </Page>
  );
}
