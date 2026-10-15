/**
 * Camada de eventos independente dos fornecedores: tudo vai para o dataLayer e
 * o GTM decide o destino. Só passam parâmetros da allowlist; nunca dados pessoais,
 * respostas, texto livre, tokens de relatório/pagamento ou chaves.
 *
 * Eventos só entram no dataLayer depois de o GTM ter carregado (ou seja, com
 * consentimento). O que acontece antes é descartado — nada é enviado
 * retroativamente.
 */
import { getLanguageFromPath, stripLanguage } from "@/lib/routing";
import { campaignParameters } from "./attribution";
import { isGtmLoaded } from "./gtm";
import { hasAnalyticsConsent } from "./consent";

export const EVENTS = [
  "form_start",
  "form_submit",
  "form_error",
  "click_email",
  "click_phone",
  "click_linkedin",
  "click_book_meeting",
  "valuation_start",
  "valuation_step",
  "valuation_complete",
  "report_request",
  "checkout_start",
  "purchase",
] as const;
export type TrackEvent = (typeof EVENTS)[number];

export type EventParams = {
  form_name?: string;
  service_interest?: string;
  valuation_step?: number;
  transaction_id?: string;
  value?: number;
  currency?: string;
  payment_status?: "paid";
};

const PUBLIC_SLUGS = new Set(["", "about", "services", "team", "valuation", "privacy", "terms", "faq"]);
const CHECKOUT_SLUGS = new Set(["upgrade"]);

/** Caminho sem identificadores nem query: relatórios, checkout e links curtos ficam "/report". */
export function safePagePath(pathname: string): string {
  const limpo = pathname.split(/[?#]/)[0];
  const semIdioma = stripLanguage(limpo).replace(/\/+$/, "");
  const lang = getLanguageFromPath(limpo);
  const slug = semIdioma.replace(/^\//, "");
  if (PUBLIC_SLUGS.has(slug)) return limpo.replace(/\/+$/, "") || "/";
  // Checkout (inclui o regresso da Stripe, que usa a mesma rota com query).
  if (CHECKOUT_SLUGS.has(slug)) return lang ? `/${lang}/checkout` : "/checkout";
  // Tudo o resto: /{token}, /relatorio/{token}, /{idioma}/relatorio/{token}.
  return lang ? `/${lang}/report` : "/report";
}

/** Referrer seguro: interno → caminho normalizado; externo → só a origem; nunca query/tokens. */
export function safeReferrer(referrer: string, origin: string): string {
  if (!referrer) return "";
  try {
    const u = new URL(referrer);
    if (u.origin === origin) return `${origin}${safePagePath(u.pathname)}`;
    return u.origin;
  } catch {
    return "";
  }
}

export function safePageFields(pathname: string, origin: string, referrer: string) {
  const path = safePagePath(pathname);
  const location = `${origin}${path}`;
  return {
    page_path_safe: path,
    page_location_safe: location,
    page_referrer_safe: safeReferrer(referrer, origin),
    page_location: location,
    page_path: path,
    page_referrer: safeReferrer(referrer, origin),
  };
}

const SAFE_TEXT = /^[a-z0-9_\-]{1,40}$/i;

export function sanitizeParams(event: TrackEvent, p: EventParams): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (p.form_name && SAFE_TEXT.test(p.form_name)) out.form_name = p.form_name;
  if (p.service_interest && SAFE_TEXT.test(p.service_interest)) out.service_interest = p.service_interest;
  if (typeof p.valuation_step === "number" && Number.isInteger(p.valuation_step) && p.valuation_step > 0 && p.valuation_step < 50)
    out.valuation_step = p.valuation_step;
  if (event === "purchase") {
    if (p.transaction_id && /^[A-Za-z0-9_-]{1,64}$/.test(p.transaction_id)) out.transaction_id = p.transaction_id;
    if (typeof p.value === "number" && Number.isFinite(p.value) && p.value > 0) out.value = p.value;
    if (p.currency && /^[A-Z]{3}$/.test(p.currency)) out.currency = p.currency;
    if (p.payment_status === "paid") out.payment_status = "paid";
  }
  return out;
}

function push(entry: Record<string, unknown>) {
  if (typeof window === "undefined" || !isGtmLoaded()) return false;
  const w = window as Window & { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(entry);
  return true;
}

export function pushEvent(event: TrackEvent, params: EventParams = {}) {
  if (typeof window === "undefined") return false;
  const path = window.location.pathname;
  const campanha = campaignParameters();
  return push({
    event,
    ...safePageFields(path, window.location.origin, document.referrer),
    page_language: getLanguageFromPath(path) ?? "en",
    ...sanitizeParams(event, params),
    ...(campanha ? { campaign_parameters: campanha } : {}),
  });
}

/** page_view com URL seguro (no GTM, o GA4 deve usar page_location = {{page_location_safe}}). */
let ultimoPageView = "";
export function pushPageContext(pathname: string) {
  if (typeof window === "undefined" || pathname === ultimoPageView || !hasAnalyticsConsent()) return false;
  const ok = push({
    event: "page_context",
    ...safePageFields(pathname, window.location.origin, document.referrer),
    page_language: getLanguageFromPath(pathname) ?? "en",
  });
  if (ok) ultimoPageView = pathname;
  return ok;
}

const PRODUCTION_HOST = /(^|\.)lealiaap\.(com|pt|es)$/;
export const isProductionHost = (host: string) => PRODUCTION_HOST.test(host);

export type CompraConfirmada = { transaction_id: string; value: number; currency: string; payment_status: "paid" };

export function validPurchase(c: Partial<CompraConfirmada> | null | undefined): c is CompraConfirmada {
  return (
    !!c &&
    c.payment_status === "paid" &&
    typeof c.transaction_id === "string" &&
    /^[A-Za-z0-9_-]{1,64}$/.test(c.transaction_id) &&
    typeof c.value === "number" &&
    Number.isFinite(c.value) &&
    c.value > 0 &&
    typeof c.currency === "string" &&
    /^[A-Z]{3}$/.test(c.currency)
  );
}

const PURCHASES_KEY = "lealia_purchases_sent";

/**
 * purchase só com dados confirmados pelo servidor (valor e moeda reais),
 * só no domínio de produção e uma única vez por transaction_id neste browser.
 */
export function pushPurchaseOnce(compra: Partial<CompraConfirmada> | null | undefined) {
  if (typeof window === "undefined" || !validPurchase(compra)) return false;
  if (!isProductionHost(window.location.hostname)) return false;
  let enviados: string[] = [];
  try {
    enviados = JSON.parse(window.localStorage.getItem(PURCHASES_KEY) ?? "[]");
  } catch {
    enviados = [];
  }
  if (enviados.includes(compra.transaction_id)) return false;
  if (!pushEvent("purchase", compra)) return false;
  try {
    window.localStorage.setItem(PURCHASES_KEY, JSON.stringify([...enviados, compra.transaction_id].slice(-20)));
  } catch {
    /* ignorar */
  }
  return true;
}
