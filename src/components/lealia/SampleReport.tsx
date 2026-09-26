import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { pageCopy } from "@/translations/valuation-page";
import { SampleReportViewer } from "@/components/lealia/SampleReportViewer";

export function SampleReport() {
  const { language } = useLanguage();
  const c = pageCopy[language].sampleReport;
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {c.sections.map((s) => (
          <div key={s.numero} className="card-elegant p-8">
            <span className="num-index">{s.numero}</span>
            <h3 className="mt-3 text-xl">{s.titulo}</h3>
            <p className="body-justified mt-3 text-sm leading-relaxed font-light text-muted-foreground">{s.texto}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <button className="btn-primary" onClick={() => setOpen(true)}>
          {c.cta}
        </button>
      </div>

      <SampleReportViewer open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
