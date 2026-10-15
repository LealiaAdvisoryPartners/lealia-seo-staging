/**
 * Camada de eventos independente dos fornecedores: tudo vai para o dataLayer e
 * o GTM decide o destino. Só passam parâmetros da allowlist; nunca dados pessoais,
 * respostas, texto livre, tokens de relatório/pagamento ou chaves.
 */
import { getLanguageFromPath, stripLanguage } from "@/lib/routing";
import { campaignParameters } from "./attribution";

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
};

const PUBLIC_SLUGS = new Set(["", "about", "services", "team", "valuation", "privacy", "terms", "faq", "upgrade"]);

/** Caminho sem identificadores: relatórios e links curtos ficam "/report". */
export function safePagePath(pathname: string): string {
  const semIdioma = stripLanguage(pathname).replace(/\/+$/, "");
  const lang = getLanguageFromPath(pathname);
  const slug = semIdioma.replace(/^\//, "");
  if (PUBLIC_SLUGS.has(slug)) return pathname.replace(/\/+$/, "") || "/";
  return lang ? `/${lang}/report` : "/report";
}

const SAFE_TEXT = /^[a-z0-9_\-]{1,40}$/i;

export function sanitizeParams(event: TrackEvent, p: EventParams): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (p.form_name && SAFE_TEXT.test(p.form_name)) out.form_name = p.form_name;
  if (p.service_interest && SAFE_TEXT.test(p.service_interest)) out.service_interest = p.service_interest;
  if (typeof p.valuation_step === "number" && Number.isInteger(p.valuation_step) && p.valuation_step > 0 && p.valuation_step < 50)
    out.valuation_step = p.valuation_step;
  if (event === "purchase" || event === "checkout_start") {
    if (p.transaction_id && /^[A-Za-z0-9_-]{1,64}$/.test(p.transaction_id)) out.transaction_id = p.transaction_id;
    if (typeof p.value === "number" && Number.isFinite(p.value) && p.value >= 0) out.value = p.value;
    if (p.currency && /^[A-Z]{3}$/.test(p.currency)) out.currency = p.currency;
  }
  return out;
}

export function pushEvent(event: TrackEvent, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  const w = window as Window & { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  const path = window.location.pathname;
  w.dataLayer.push({
    event,
    page_path: safePagePath(path),
    page_language: getLanguageFromPath(path) ?? "en",
    ...sanitizeParams(event, params),
    ...(campaignParameters() ? { campaign_parameters: campaignParameters() } : {}),
  });
}

/** Contexto de página para o GTM (usar page_location_safe em vez do URL real). */
export function pushPageContext(pathname: string) {
  if (typeof window === "undefined") return;
  const w = window as Window & { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  const safe = safePagePath(pathname);
  w.dataLayer.push({
    event: "page_context",
    page_path: safe,
    page_location_safe: `${window.location.origin}${safe}`,
    page_language: getLanguageFromPath(pathname) ?? "en",
  });
}

const PURCHASES_KEY = "lealia_purchases_sent";

/** purchase só depois de confirmação real e uma única vez por transaction_id. */
export function pushPurchaseOnce(transactionId: string, value: number, currency: string) {
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(transactionId)) return false;
  let enviados: string[] = [];
  try {
    enviados = JSON.parse(window.localStorage.getItem(PURCHASES_KEY) ?? "[]");
  } catch {
    enviados = [];
  }
  if (enviados.includes(transactionId)) return false;
  pushEvent("purchase", { transaction_id: transactionId, value, currency });
  try {
    window.localStorage.setItem(PURCHASES_KEY, JSON.stringify([...enviados, transactionId].slice(-20)));
  } catch {
    /* ignorar */
  }
  return true;
}
