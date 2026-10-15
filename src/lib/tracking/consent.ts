/**
 * Consentimento (Consent Mode v2, modo básico). A escolha fica em localStorage
 * com versão e data; mudar CONSENT_VERSION volta a pedir consentimento.
 */
export const CONSENT_VERSION = "2026-10";
const KEY = "lealia_consent";
export const OPEN_SETTINGS_EVENT = "lealia:open-cookie-settings";
export const CONSENT_CHANGED_EVENT = "lealia:consent-changed";

export type ConsentChoice = { analytics: boolean; marketing: boolean; experience: boolean };
export type StoredConsent = ConsentChoice & { version: string; date: string };

type GoogleConsent = Record<
  | "analytics_storage"
  | "ad_storage"
  | "ad_user_data"
  | "ad_personalization"
  | "functionality_storage"
  | "personalization_storage"
  | "security_storage",
  "granted" | "denied"
>;

const g = (v: boolean) => (v ? "granted" : "denied") as const;

export function toGoogleConsent(c: ConsentChoice): GoogleConsent {
  return {
    analytics_storage: g(c.analytics),
    ad_storage: g(c.marketing),
    ad_user_data: g(c.marketing),
    ad_personalization: g(c.marketing),
    personalization_storage: g(c.experience),
    functionality_storage: "granted",
    security_storage: "granted",
  };
}

export const DENIED: ConsentChoice = { analytics: false, marketing: false, experience: false };

type W = Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };

function gtag(...args: unknown[]) {
  const w = window as W;
  w.dataLayer = w.dataLayer || [];
  // gtag.js / GTM esperam o objeto arguments.
  // eslint-disable-next-line prefer-rest-params
  w.dataLayer.push(arguments);
  void args;
}

export function getStoredConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as StoredConsent;
    if (c.version !== CONSENT_VERSION) return null;
    return { version: c.version, date: c.date, analytics: !!c.analytics, marketing: !!c.marketing, experience: !!c.experience };
  } catch {
    return null;
  }
}

export const hasAnalyticsConsent = () => !!getStoredConsent()?.analytics;

/** Tem de correr antes do GTM: estado inicial recusado e, se existir, a escolha guardada. */
export function initConsentDefaults() {
  const w = window as W;
  w.dataLayer = w.dataLayer || [];
  if (!w.gtag) w.gtag = gtag;
  gtag("consent", "default", { ...toGoogleConsent(DENIED), wait_for_update: 500 });
  gtag("set", "ads_data_redaction", true);
  gtag("set", "url_passthrough", false);
  const saved = getStoredConsent();
  if (saved) gtag("consent", "update", toGoogleConsent(saved));
}

const OPTIONAL_COOKIE_PREFIXES = ["_ga", "_gid", "_gat", "_gcl", "_clck", "_clsk", "li_", "lidc", "bcookie", "AnalyticsSyncHistory", "UserMatchHistory"];

/** Apaga cookies opcionais no domínio atual e no domínio principal. */
function apagarCookiesOpcionais(c: ConsentChoice) {
  const host = window.location.hostname;
  const dominios = ["", host, `.${host.split(".").slice(-2).join(".")}`];
  for (const par of document.cookie.split(";")) {
    const nome = par.split("=")[0]?.trim();
    if (!nome) continue;
    const analitica = nome.startsWith("_ga") || nome.startsWith("_gid") || nome.startsWith("_gat");
    const experiencia = nome.startsWith("_clck") || nome.startsWith("_clsk");
    const marketing = !analitica && !experiencia && OPTIONAL_COOKIE_PREFIXES.some((p) => nome.startsWith(p));
    if ((analitica && !c.analytics) || (experiencia && !c.experience) || (marketing && !c.marketing)) {
      for (const d of dominios) {
        document.cookie = `${nome}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
      }
    }
  }
}

export function saveConsent(choice: ConsentChoice) {
  const stored: StoredConsent = { ...choice, version: CONSENT_VERSION, date: new Date().toISOString() };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(stored));
  } catch {
    /* ignorar */
  }
  gtag("consent", "update", toGoogleConsent(choice));
  (window as W).dataLayer!.push({ event: "consent_update", consent_analytics: choice.analytics, consent_marketing: choice.marketing, consent_experience: choice.experience });
  apagarCookiesOpcionais(choice);
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: stored }));
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}
