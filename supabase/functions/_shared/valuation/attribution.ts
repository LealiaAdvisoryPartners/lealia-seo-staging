/**
 * Atribuição de campanhas: lista fechada de campos, partilhada entre o browser
 * (captura) e a função registar-lead (validação). Sem dados pessoais: URLs ficam
 * sem query string e valores com "@" são descartados.
 */
export const ATTRIBUTION_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "gbraid",
  "wbraid",
  "msclkid",
  "li_fat_id",
  "landing_page",
  "referrer",
  "captured_at",
] as const;

export type AttributionField = (typeof ATTRIBUTION_FIELDS)[number];
export type Touch = Partial<Record<AttributionField, string>>;
export type Attribution = { first_touch?: Touch; last_touch?: Touch };

/** Parâmetros lidos do URL de entrada. */
export const URL_PARAMS = ATTRIBUTION_FIELDS.filter(
  (f) => f !== "landing_page" && f !== "referrer" && f !== "captured_at",
);

export const MAX_VALUE_LENGTH = 200;
export const MAX_ATTRIBUTION_BYTES = 3000;

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === "object" && !Array.isArray(v);

/** URL sem query string nem fragmento (pode conter e-mails ou tokens). */
function urlSemQuery(v: string): string | undefined {
  try {
    const u = new URL(v);
    if (u.protocol !== "http:" && u.protocol !== "https:") return undefined;
    return `${u.origin}${u.pathname}`;
  } catch {
    return undefined;
  }
}

function limparValor(campo: AttributionField, bruto: unknown): string | undefined {
  if (typeof bruto !== "string") return undefined;
  // deno-lint-ignore no-control-regex
  let v = bruto.replace(/[\u0000-\u001f\u007f]/g, "").trim();
  if (!v) return undefined;
  if (campo === "landing_page" || campo === "referrer") {
    const limpo = urlSemQuery(v);
    if (!limpo) return undefined;
    v = limpo;
  } else if (campo === "captured_at") {
    const t = Date.parse(v);
    if (Number.isNaN(t)) return undefined;
    v = new Date(t).toISOString();
  } else if (v.includes("@")) {
    return undefined; // parece um e-mail: nunca guardar
  }
  return v.slice(0, MAX_VALUE_LENGTH);
}

export function sanitizeTouch(bruto: unknown): Touch | undefined {
  if (!isPlainObject(bruto)) return undefined;
  const out: Touch = {};
  for (const campo of ATTRIBUTION_FIELDS) {
    const v = limparValor(campo, bruto[campo]);
    if (v) out[campo] = v;
  }
  return Object.keys(out).length ? out : undefined;
}

/** Devolve só first_touch/last_touch com campos autorizados, ou null. */
export function sanitizeAttribution(bruto: unknown): Attribution | null {
  if (!isPlainObject(bruto)) return null;
  const out: Attribution = {};
  const first = sanitizeTouch(bruto.first_touch);
  const last = sanitizeTouch(bruto.last_touch);
  if (first) out.first_touch = first;
  if (last) out.last_touch = last;
  if (!first && !last) return null;
  if (JSON.stringify(out).length > MAX_ATTRIBUTION_BYTES) return null;
  return out;
}
