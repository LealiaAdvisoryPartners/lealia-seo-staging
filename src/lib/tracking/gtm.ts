/**
 * Google Tag Manager: a única tag instalada no código. Só carrega quando
 * (1) existe um ID real em VITE_GTM_CONTAINER_ID e (2) a pessoa aceitou pelo
 * menos uma categoria opcional. Sem consentimento não há pedido a
 * googletagmanager.com. Nunca corre na pré-geração (só no browser).
 */
import { CONSENT_CHANGED_EVENT, getStoredConsent, hasAnyOptionalConsent, type StoredConsent } from "./consent";

const GTM_ID_RE = /^GTM-[A-Z0-9]{5,10}$/;
const LOADED_EVENT = "lealia:gtm-loaded";

export function validGtmId(id: unknown): id is string {
  return typeof id === "string" && GTM_ID_RE.test(id) && !/X{4,}/.test(id);
}

export const isGtmLoaded = () =>
  typeof document !== "undefined" && !!document.querySelector("script[data-lealia-gtm]");

export function loadGtm(id: unknown = import.meta.env.VITE_GTM_CONTAINER_ID) {
  if (typeof window === "undefined" || !validGtmId(id)) return false;
  if (!hasAnyOptionalConsent(getStoredConsent())) return false;
  if (isGtmLoaded()) return false;

  const w = window as Window & { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

  const auth = import.meta.env.VITE_GTM_ENV_AUTH;
  const preview = import.meta.env.VITE_GTM_ENV_PREVIEW;
  const env =
    typeof auth === "string" && auth && typeof preview === "string" && /^env-\d+$/.test(preview)
      ? `&gtm_auth=${encodeURIComponent(auth)}&gtm_preview=${preview}&gtm_cookies_win=x`
      : "";

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${id}${env}`;
  s.setAttribute("data-lealia-gtm", id);
  document.head.appendChild(s);
  window.dispatchEvent(new Event(LOADED_EVENT));
  return true;
}

/** Diagnóstico só fora de produção com ?gtm_diag=1: indica se o ID existe e começa por "GTM-". */
function logGtmDiagnostic() {
  const host = window.location.hostname;
  if (/(^|\.)lealiaap\.(com|pt|es)$/.test(host)) return;
  if (!new URLSearchParams(window.location.search).has("gtm_diag")) return;
  const id = import.meta.env.VITE_GTM_CONTAINER_ID;
  console.info("[gtm_diag]", {
    configured: typeof id === "string" && id.length > 0,
    startsWithGTM: typeof id === "string" && id.startsWith("GTM-"),
    validFormat: validGtmId(id),
    consentGiven: hasAnyOptionalConsent(getStoredConsent()),
    scriptLoaded: isGtmLoaded(),
  });
}

/** Carrega já se houver consentimento guardado; senão, espera pela escolha. */
export function initGtm(onLoaded?: () => void) {
  if (typeof window === "undefined") return;
  logGtmDiagnostic();
  if (loadGtm()) onLoaded?.();
  window.addEventListener(CONSENT_CHANGED_EVENT, (e) => {
    const detail = (e as CustomEvent<StoredConsent>).detail;
    if (hasAnyOptionalConsent(detail) && loadGtm()) onLoaded?.();
  });
}
