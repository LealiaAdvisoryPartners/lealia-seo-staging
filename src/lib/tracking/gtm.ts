/**
 * Google Tag Manager: carregado SÓ pelo snippet oficial em index.html
 * (GTM-KPB93JXG), depois do Consent Mode v2 com tudo recusado por defeito.
 * Este módulo nunca injeta gtm.js — não há carregamento duplicado.
 * Os eventos da camada de dados só seguem com consentimento opcional.
 */
import { CONSENT_CHANGED_EVENT, getStoredConsent, hasAnyOptionalConsent, type StoredConsent } from "./consent";

const GTM_ID_RE = /^GTM-[A-Z0-9]{5,10}$/;

export function validGtmId(id: unknown): id is string {
  return typeof id === "string" && GTM_ID_RE.test(id) && !/X{4,}/.test(id);
}

/** Snippet oficial presente na página. */
export const hasGtmSnippet = () =>
  typeof document !== "undefined" && !!document.querySelector("script[data-lealia-gtm]");

/** GTM ativo para a camada de eventos: snippet presente E consentimento opcional. */
export const isGtmLoaded = () => hasGtmSnippet() && hasAnyOptionalConsent(getStoredConsent());

/** Diagnóstico só fora de produção com ?gtm_diag=1. */
function logGtmDiagnostic() {
  const host = window.location.hostname;
  if (/(^|\.)lealiaap\.(com|pt|es)$/.test(host)) return;
  if (!new URLSearchParams(window.location.search).has("gtm_diag")) return;
  console.info("[gtm_diag]", {
    snippetPresent: hasGtmSnippet(),
    gtmScriptTags: document.querySelectorAll('script[src*="googletagmanager.com/gtm.js"]').length,
    consentGiven: hasAnyOptionalConsent(getStoredConsent()),
  });
}

/** Não carrega nada: só avisa quando há consentimento (agora ou após a escolha). */
export function initGtm(onConsented?: () => void) {
  if (typeof window === "undefined") return;
  logGtmDiagnostic();
  if (isGtmLoaded()) onConsented?.();
  window.addEventListener(CONSENT_CHANGED_EVENT, (e) => {
    const detail = (e as CustomEvent<StoredConsent>).detail;
    if (hasGtmSnippet() && hasAnyOptionalConsent(detail)) onConsented?.();
  });
}
