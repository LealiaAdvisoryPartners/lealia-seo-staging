import { t, type ReportLang } from "@core/report-i18n";
import { Page } from "./primitives";

export function lockedPages(lang: ReportLang): { numero: number; titulo: string }[] {
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

export const irParaAgendamento = () => {
  if (typeof document === "undefined") return;
  document.getElementById("agendar")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export function LockedSkeleton() {
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

export function LockedPage({ numero, titulo, lang }: { numero: number; titulo: string; lang: ReportLang }) {
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
