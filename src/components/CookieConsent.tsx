import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildPath } from "@/lib/routing";
import { cookieCopy } from "@/translations/cookie-consent";
import {
  DENIED,
  OPEN_SETTINGS_EVENT,
  getStoredConsent,
  saveConsent,
  type ConsentChoice,
} from "@/lib/tracking/consent";

/**
 * Banner próprio (Consent Mode v2 básico). Três opções com o mesmo peso no
 * primeiro nível; só aparece no browser (nunca no HTML pré-gerado).
 */
const CookieConsent = () => {
  const { language } = useLanguage();
  const c = cookieCopy[language];
  const [aberto, setAberto] = useState(false);
  const [detalhe, setDetalhe] = useState(false);
  const [escolha, setEscolha] = useState<ConsentChoice>(DENIED);

  useEffect(() => {
    const guardado = getStoredConsent();
    if (!guardado) setAberto(true);
    else setEscolha(guardado);
    const abrir = () => {
      const atual = getStoredConsent();
      setEscolha(atual ?? DENIED);
      setDetalhe(true);
      setAberto(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, abrir);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, abrir);
  }, []);

  if (!aberto) return null;

  const decidir = (v: ConsentChoice) => {
    saveConsent(v);
    setEscolha(v);
    setAberto(false);
    setDetalhe(false);
  };

  const cats = ["analytics", "marketing", "experience"] as const;
  const btn = "h-11 px-5 rounded-lg border text-sm font-medium transition-colors";

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6"
    >
      <div className="mx-auto max-w-4xl rounded-xl border border-border bg-background p-6 text-foreground" style={{ boxShadow: "var(--shadow-elegant)" }}>
        <h2 id="cookie-title" className="font-heading text-lg font-light text-primary">{c.title}</h2>
        <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
          {c.text}{" "}
          <Link to={buildPath(language, "/privacy")} className="underline hover:text-accent">{c.privacyLink}</Link>
        </p>

        {detalhe && (
          <ul className="mt-5 space-y-4 border-t border-border pt-5">
            <li className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium">{c.categories.necessary.name}</p>
                <p className="text-xs font-light text-muted-foreground">{c.categories.necessary.desc}</p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">{c.alwaysOn}</span>
            </li>
            {cats.map((k) => (
              <li key={k} className="flex items-start justify-between gap-4">
                <label htmlFor={`cookie-${k}`} className="cursor-pointer">
                  <span className="block text-sm font-medium">{c.categories[k].name}</span>
                  <span className="block text-xs font-light text-muted-foreground">{c.categories[k].desc}</span>
                </label>
                <input
                  id={`cookie-${k}`}
                  type="checkbox"
                  className="mt-1 h-5 w-5 shrink-0 accent-[hsl(var(--accent))]"
                  checked={escolha[k]}
                  onChange={(e) => setEscolha((s) => ({ ...s, [k]: e.target.checked }))}
                />
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <button type="button" className={`${btn} border-primary bg-primary text-primary-foreground hover:bg-primary/90`} onClick={() => decidir({ analytics: true, marketing: true, experience: true })}>
            {c.acceptAll}
          </button>
          <button type="button" className={`${btn} border-primary bg-primary text-primary-foreground hover:bg-primary/90`} onClick={() => decidir(DENIED)}>
            {c.rejectOptional}
          </button>
          {detalhe ? (
            <button type="button" className={`${btn} border-primary bg-background text-primary hover:bg-secondary`} onClick={() => decidir(escolha)}>
              {c.save}
            </button>
          ) : (
            <button type="button" className={`${btn} border-primary bg-background text-primary hover:bg-secondary`} onClick={() => setDetalhe(true)}>
              {c.configure}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
