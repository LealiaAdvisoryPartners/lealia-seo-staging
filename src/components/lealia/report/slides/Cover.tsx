import cover from "@/assets/report-cover.png";
import logo from "@/assets/lealia-logo.png";
import type { ReportData } from "@core/report-data";
import { type ReportLang, t } from "@core/report-i18n";

export function Cover({ d, lang }: { d: ReportData; lang: ReportLang }) {
  const dict = t(lang).doc;
  return (
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
        <p className="report-cover-disclaimer">{dict.disclaimer}</p>
      </div>
    </section>
  );
}
