// Formatadores sensíveis ao idioma. Puros: sem I/O, sem dependências.

export type ReportLang = "pt" | "en" | "es";

const LOCALE: Record<ReportLang, string> = { pt: "pt-PT", en: "en-GB", es: "es-ES" };

const decimalSep = (lang: ReportLang) => (lang === "en" ? "." : ",");

/** Número com `casas` decimais, no separador decimal do idioma. */
export function formatDecimalLang(v: number, lang: ReportLang = "pt", casas = 1): string {
  return v.toFixed(casas).replace(".", decimalSep(lang));
}

/**
 * Agrupamento de milhares com espaço inquebrável — deliberadamente igual nos
 * três idiomas, para que os mesmos números sejam lidos da mesma forma em
 * qualquer versão do relatório.
 */
export function groupThousandsLang(n: number, _lang?: ReportLang): string {
  const s = Math.abs(Math.round(n))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
  return (n < 0 ? "-" : "") + s;
}

/** Montante em euros: "1 250 000 €". */
export function formatEURLang(n: number, _lang?: ReportLang): string {
  return `${groupThousandsLang(n)}\u00a0€`;
}

/** Percentagem: "12,5%" (pt/es) ou "12.5%" (en). */
export function formatPercentLang(v: number, lang: ReportLang = "pt", casas = 1): string {
  return `${formatDecimalLang(v, lang, casas)}%`;
}

/** Múltiplo com duas casas: "3,25x". `null` → travessão. */
export function formatMultipleLang(v: number | null, lang: ReportLang = "pt"): string {
  return v === null ? "—" : `${formatDecimalLang(v, lang, 2)}x`;
}

/** Fator com uma casa: "2,4x" (ex.: rácio dívida/EBITDA). */
export function formatFactorXLang(v: number, lang: ReportLang = "pt"): string {
  return `${formatDecimalLang(v, lang, 1)}x`;
}

/** Fator com três casas (ex.: fator de desconto DCF). */
export function formatFactor3Lang(v: number, lang: ReportLang = "pt"): string {
  return formatDecimalLang(v, lang, 3);
}

/** Data no formato local (dd/mm/aaaa em pt). */
export function formatDateLang(input: string | number | Date, lang: ReportLang = "pt"): string {
  return new Date(input).toLocaleDateString(LOCALE[lang], {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
