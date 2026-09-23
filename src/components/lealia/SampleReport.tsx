import { useLanguage } from "@/contexts/LanguageContext";
import { pageCopy } from "@/translations/valuation-page";

export function SampleReport({ onAgendar }: { onAgendar: () => void }) {
  const { language } = useLanguage();
  const c = pageCopy[language].sampleReport;

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
        <button className="btn-primary" onClick={onAgendar}>
          {c.cta}
        </button>
      </div>
    </div>
  );
}
