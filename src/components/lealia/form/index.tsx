import { useEffect, useMemo, useRef, useState } from "react";
import { pushEvent } from "@/lib/tracking/datalayer";
import { subindustriasDe } from "@core/valuation";
import { useLanguage } from "@/contexts/LanguageContext";
import { formCopy, type FormCopy } from "@/translations/valuation-form";
import { emptyForm, STORAGE_KEY } from "./state";
import type { FormState } from "./state";
import { sobreEmpresa } from "./steps/SobreEmpresa";
import { dadosFinanceiros } from "./steps/DadosFinanceiros";
import { balancoInvestimento } from "./steps/BalancoInvestimento";
import { riscoConcentracao } from "./steps/RiscoConcentracao";
import { imovel } from "./steps/Imovel";
import { motivacao } from "./steps/Motivacao";
import { contacto } from "./steps/Contacto";
import type { StepDef } from "./types";

export type { FormState };
export { emptyForm };

const STEPS: StepDef[] = [
  sobreEmpresa,
  dadosFinanceiros,
  balancoInvestimento,
  riscoConcentracao,
  imovel,
  motivacao,
  contacto,
];

export function ValuationForm({ onSubmit }: { onSubmit: (data: FormState) => void }) {
  const { language } = useLanguage();
  const copy: FormCopy = formCopy[language];
  const opt = (v: string) => copy.options[v] ?? v;

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [touched, setTouched] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [idiomaTocado, setIdiomaTocado] = useState(false);

  // Recuperar progresso guardado
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<FormState>;
        if (parsed.idioma) setIdiomaTocado(true);
        setForm({ ...emptyForm, ...parsed });
      }
    } catch {
      /* ignorar */
    }
  }, []);

  useEffect(() => {
    if (!idiomaTocado) {
      setForm((f) => ({ ...f, idioma: language }));
    }
  }, [language, idiomaTocado]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {
      /* ignorar */
    }
  }, [form]);

  const iniciado = useRef(false);
  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    if (key === "idioma") setIdiomaTocado(true);
    if (!iniciado.current) {
      iniciado.current = true;
      pushEvent("valuation_start", { form_name: "valuation", valuation_step: step + 1 });
    }
    setForm((f) => ({ ...f, [key]: value }));
  };

  const subindustrias = useMemo(() => (form.industria ? subindustriasDe(form.industria) : []), [form.industria]);

  const anoRef = Number(form.ano_referencia) || 2025;
  const anoLabel = (i: 1 | 2 | 3) => String(anoRef - (i - 1));

  const current = STEPS[step];
  const errors = current.validate(form, copy, subindustrias);
  const valid = Object.keys(errors).length === 0;
  const err = (k: keyof FormState) => (touched ? errors[k] : undefined);

  const next = () => {
    if (!valid) {
      setTouched(true);
      pushEvent("form_error", { form_name: "valuation", valuation_step: step + 1 });
      return;
    }
    setTouched(false);
    if (step === STEPS.length - 1) {
      if (honeypot.trim() !== "") return; // bot
      onSubmit(form);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignorar */
      }
    } else {
      pushEvent("valuation_step", { form_name: "valuation", valuation_step: step + 2 });
      setStep((s) => s + 1);
    }
  };

  const { Component } = current;

  return (
    <div className="mx-auto max-w-2xl">
      <p className="body-justified mb-8 whitespace-pre-line text-sm font-light text-muted-foreground">{copy.intro}</p>

      <div className="mb-10">
        <div className="flex items-baseline justify-between">
          <span className="num-index">
            0{step + 1} — {copy.steps[step]}
          </span>
          <span className="text-xs text-muted-foreground">{copy.stepOf(step + 1, STEPS.length)}</span>
        </div>
        <div className="mt-4 h-px w-full bg-border">
          <div
            className="h-px bg-accent transition-all duration-500"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* honeypot anti-bot */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website-hp">{copy.websiteLabel}</label>
        <input
          id="website-hp"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <Component
        form={form}
        set={set}
        copy={copy}
        opt={opt}
        err={err}
        errors={errors}
        subindustrias={subindustrias}
        anoLabel={anoLabel}
      />

      <div className="mt-10 flex items-center justify-between gap-4">
        <button
          type="button"
          className="btn-outline"
          onClick={() => {
            setTouched(false);
            setStep((s) => Math.max(0, s - 1));
          }}
          disabled={step === 0}
          style={step === 0 ? { visibility: "hidden" } : undefined}
        >
          {copy.previous}
        </button>
        <button type="button" className="btn-primary" onClick={next} disabled={touched && !valid}>
          {step === STEPS.length - 1 ? copy.submit : copy.next}
        </button>
      </div>
    </div>
  );
}
