import { useState } from "react";
import { FASES } from "@/lib/timeline";
import { useLanguage } from "@/contexts/LanguageContext";
import { pageCopy } from "@/translations/valuation-page";

export function Timeline() {
  const [aberta, setAberta] = useState<string | null>("01");
  const { language } = useLanguage();
  const c = pageCopy[language].timeline;

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-5">
        {FASES.map((f) => {
          const ativa = aberta === f.numero;
          return (
            <button
              key={f.numero}
              onClick={() => setAberta(ativa ? null : f.numero)}
              className={`card-elegant p-6 text-left ${ativa ? "border-accent/50" : ""}`}
              aria-expanded={ativa}
            >
              <span className="num-index">{f.numero}</span>
              <p className="mt-3 text-lg leading-tight font-light">{f.titulo}</p>
              <p className="mt-2 text-xs text-muted-foreground">{f.duracao}</p>
            </button>
          );
        })}
      </div>

      {FASES.filter((f) => f.numero === aberta).map((f) => (
        <div key={f.numero} className="card-elegant mt-6 p-8">
          <p className="eyebrow">
            {c.phasePrefix} {f.numero} — {f.titulo}
          </p>
          <ul className="mt-6 space-y-4">
            {f.etapas.map((e, i) => (
              <li key={i} className="flex gap-4 text-sm leading-relaxed">
                <span className="num-index pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-light text-muted-foreground">{e}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <p className="mt-8 text-sm font-light text-muted-foreground">{c.footer}</p>
    </div>
  );
}
