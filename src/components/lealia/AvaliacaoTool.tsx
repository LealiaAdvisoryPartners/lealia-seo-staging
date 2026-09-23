import { useEffect, useRef, useState } from "react";
import { ValuationForm, type FormState } from "@/components/lealia/form";
import { ThankYouCard } from "@/components/lealia/ThankYouCard";
import { SampleReport } from "@/components/lealia/SampleReport";
import { CalendlyInline } from "@/components/lealia/CalendlyInline";
import { calcularValuation, type ValuationResult } from "@core/valuation";
import { registarLead } from "@/lib/leads";
import { leadDoFormulario, valuationInputDoFormulario } from "@/components/lealia/submeter-avaliacao";
import { useLanguage } from "@/contexts/LanguageContext";
import { pageCopy } from "@/translations/valuation-page";

export const CALENDLY_URL = "https://calendly.com/d/d3qm-jpm-t5x/valuation-full-report";

export function AvaliacaoTool() {
  const { language } = useLanguage();
  const copy = pageCopy[language];
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [empresa, setEmpresa] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const sampleRef = useRef<HTMLDivElement>(null);
  const agendarRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  useEffect(() => {
    if (result) scrollTo(resultRef);
  }, [result]);

  const handleSubmit = (data: FormState) => {
    setEmpresa(data.empresa);
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const r = calcularValuation(valuationInputDoFormulario(data));
      setResult(r);
      setLoading(false);

      void registarLead(leadDoFormulario(data, r)).catch((e) =>
        console.error("Falha ao registar lead", e),
      );
    }, 1400);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <h1 className="section-title mt-6 max-w-4xl text-4xl leading-[1.08] md:text-6xl lg:text-7xl">
            {copy.hero.titlePrefix}
            <span className="serif-accent text-accent">{copy.hero.titleAccent}</span>
          </h1>
          <p className="body-justified mt-8 max-w-2xl text-base leading-relaxed font-light text-muted-foreground md:text-lg">
            {copy.hero.lead}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button className="btn-primary" onClick={() => scrollTo(formRef)}>
              {copy.hero.ctaPrimary}
            </button>
            <button className="btn-outline" onClick={() => scrollTo(agendarRef)}>
              {copy.hero.ctaSecondary}
            </button>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <p className="eyebrow">{copy.howItWorks.eyebrow}</p>
        <h2 className="section-title mt-5 text-3xl md:text-5xl">{copy.howItWorks.heading}</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {copy.howItWorks.steps.map((s) => (
            <div key={s.n} className="card-elegant p-8">
              <span className="num-index">{s.n}</span>
              <h3 className="mt-4 text-2xl">{s.t}</h3>
              <p className="body-justified mt-3 text-sm leading-relaxed font-light text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Formulário */}
      <section ref={formRef} className="scroll-mt-24 border-y border-border bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <ValuationForm onSubmit={handleSubmit} />
        </div>
      </section>

      {/* Confirmação */}
      {(loading || result) && (
        <section ref={resultRef} className="scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
            {loading ? (
              <p className="serif-accent text-center text-2xl text-muted-foreground">{copy.loading}</p>
            ) : (
              result && (
                <ThankYouCard empresa={empresa} calculoPossivel={result.ok} onAgendar={() => scrollTo(agendarRef)} />
              )
            )}
          </div>
        </section>
      )}

      {/* Sample report */}
      <section ref={sampleRef} className="scroll-mt-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <p className="eyebrow">{copy.sampleSection.eyebrow}</p>
          <h2 className="section-title mt-5 max-w-2xl text-3xl md:text-5xl">{copy.sampleSection.heading}</h2>
          <div className="mt-12">
            <SampleReport onAgendar={() => scrollTo(agendarRef)} />
          </div>
        </div>
      </section>

      {/* Agendamento */}
      <section ref={agendarRef} className="scroll-mt-24 border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8">
          <h2 className="section-title text-3xl md:text-5xl">{copy.scheduling.heading}</h2>
          <p className="body-justified mx-auto mt-6 max-w-xl leading-relaxed font-light text-muted-foreground">
            {copy.scheduling.lead}
          </p>
          <div className="card-elegant mx-auto mt-12 max-w-2xl overflow-hidden p-1 sm:p-2">
            <CalendlyInline url={CALENDLY_URL} />
          </div>
        </div>
      </section>
    </div>
  );
}
