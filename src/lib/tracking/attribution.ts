/**
 * Captura first-touch e last-touch. Antes do consentimento de analítica só em
 * sessionStorage; com consentimento também em localStorage durante 90 dias.
 * Retirar o consentimento apaga a cópia persistente.
 */
import {
  URL_PARAMS,
  sanitizeAttribution,
  type Attribution,
  type Touch,
} from "@core/attribution";
import { CONSENT_CHANGED_EVENT, hasAnalyticsConsent, type StoredConsent } from "./consent";

const KEY = "lealia_attribution";
const TTL_MS = 90 * 24 * 60 * 60 * 1000;

type Persisted = Attribution & { expires_at?: number };

function ler(storage: Storage): Attribution | null {
  try {
    const raw = storage.getItem(KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as Persisted;
    if (v.expires_at && v.expires_at < Date.now()) {
      storage.removeItem(KEY);
      return null;
    }
    return sanitizeAttribution(v);
  } catch {
    return null;
  }
}

function gravar(a: Attribution) {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(a));
    if (hasAnalyticsConsent()) {
      const anterior = ler(window.localStorage);
      const expires_at = anterior ? (JSON.parse(window.localStorage.getItem(KEY)!) as Persisted).expires_at : Date.now() + TTL_MS;
      window.localStorage.setItem(KEY, JSON.stringify({ ...a, expires_at }));
    }
  } catch {
    /* ignorar */
  }
}

export function getAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  return ler(window.sessionStorage) ?? (hasAnalyticsConsent() ? ler(window.localStorage) : null);
}

/** Lê o URL de entrada e o referrer. Chamada uma vez, no arranque. */
export function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  const touch: Touch = {};
  for (const p of URL_PARAMS) {
    const v = params.get(p);
    if (v) touch[p] = v;
  }
  const temCampanha = Object.keys(touch).length > 0;
  const ref = document.referrer;
  const referrerExterno = !!ref && !ref.startsWith(window.location.origin);
  if (referrerExterno) touch.referrer = ref;
  touch.landing_page = window.location.href;
  touch.captured_at = new Date().toISOString();

  const atual = getAttribution() ?? {};
  const novo: Attribution = { ...atual };
  if (!atual.first_touch) novo.first_touch = touch;
  if (!atual.last_touch || temCampanha || referrerExterno) novo.last_touch = touch;
  const limpo = sanitizeAttribution(novo);
  if (limpo) gravar(limpo);

  window.addEventListener(CONSENT_CHANGED_EVENT, (e) => {
    const c = (e as CustomEvent<StoredConsent>).detail;
    try {
      if (!c.analytics) window.localStorage.removeItem(KEY);
      else {
        const a = ler(window.sessionStorage);
        if (a) gravar(a);
      }
    } catch {
      /* ignorar */
    }
  });
}

/** Só os utm_*, para acompanhar eventos (sem identificadores de clique). */
export function campaignParameters(): Record<string, string> | undefined {
  const t = getAttribution()?.last_touch;
  if (!t) return undefined;
  const out: Record<string, string> = {};
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const) {
    if (t[k]) out[k] = t[k]!;
  }
  return Object.keys(out).length ? out : undefined;
}
