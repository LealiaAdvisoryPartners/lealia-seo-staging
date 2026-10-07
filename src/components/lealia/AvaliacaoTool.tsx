import { useEffect, useRef, useState } from "react";
import { ValuationForm, type FormState } from "@/components/lealia/form";
import { ThankYouCard } from "@/components/lealia/ThankYouCard";
import { UpgradeCheckout } from "@/components/lealia/checkout/UpgradeCheckout";
import { SampleReport } from "@/components/lealia/SampleReport";
import { calendlyLinkProps } from "@/lib/calendly";
import { calcularValuation, type ValuationResult } from "@core/valuation";
import { registarLead } from "@/lib/leads";
import { leadDoFormulario, valuationInputDoFormulario } from "@/components/lealia/submeter-avaliacao";
import { useLanguage } from "@/contexts/LanguageContext";
import { pageCopy } from "@/translations/valuation-page";

export { CALENDLY_URL } from "@/lib/calendly";

export function AvaliacaoTool() {
  const { language } = useLanguage();
  const copy = pageCopy[language];
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [empresa, setEmpresa] = useState("");
  const [referencia, setReferencia] = useState<string | null>(null);
  const [telefone, setTelefone] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const sampleRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  useEffect(() => {
    if (result) scrollTo(resultRef);
  }, [result]);

  const handleSubmit = (data: FormState) => {
    setEmpresa(data.empresa);
    setTelefone(data.telefone ?? "");
    setReferencia(null);
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const r = calcularValuation(valuationInputDoFormulario(data));
      setResult(r);
      setLoading(false);

      void registarLead(leadDoFormulario(data, r))
        .then((resposta) => setReferencia(resposta?.ref ?? null))
        .catch((e) => console.error("Falha ao registar lead", e));
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
            <a className="btn-outline inline-block" {...calendlyLinkProps}>
              {copy.hero.ctaSecondary}
            </a>
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
          <div className="mx-auto mb-12 max-w-2xl">
            <p className="eyebrow">{copy.formSection.eyebrow}</p>
            <h2 className="section-title mt-5 text-3xl md:text-4xl">{copy.formSection.heading}</h2>
            <div className="mt-6 h-px w-16 bg-accent" />
          </div>
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
              result &&
              (result.ok ? (
                <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
                  <ThankYouCard empresa={empresa} calculoPossivel />
                  <div className="lg:border-l lg:border-border lg:pl-16">
                    <UpgradeCheckout
                      referencia={referencia}
                      telefone={telefone}
                      reportUrl={referencia ? `/${referencia}` : null}
                      layout="stacked"
                    />
                  </div>
                </div>
              ) : (
                <div className="mx-auto max-w-2xl">
                  <ThankYouCard empresa={empresa} calculoPossivel={result.ok} />
                </div>
              ))
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
            <SampleReport />
          </div>
        </div>
      </section>
    </div>
  );
}
