/** Caminhos com prefixo de idioma: /pt/about, /en/services, … */

export const LANGUAGES = ["en", "pt", "es"] as const;

export type Language = (typeof LANGUAGES)[number];

export const isLanguage = (v: unknown): v is Language =>
  typeof v === "string" && (LANGUAGES as readonly string[]).includes(v);

const segmentsOf = (pathname: string) => pathname.split("/").filter(Boolean);

/** Idioma no início do caminho, ou `null` se não existir prefixo. */
export function getLanguageFromPath(pathname: string): Language | null {
  const [first] = segmentsOf(pathname);
  return isLanguage(first) ? first : null;
}

/** "/en/about" → "/about"; caminhos sem prefixo ficam inalterados. */
export function stripLanguage(pathname: string): string {
  const segments = segmentsOf(pathname);
  if (!isLanguage(segments[0])) return pathname;
  return "/" + segments.slice(1).join("/");
}

/** buildPath("en", "/about") → "/en/about"; buildPath("en", "/") → "/en". */
export function buildPath(language: Language, path: string): string {
  const slug = path.replace(/^\/+/, "");
  return slug ? `/${language}/${slug}` : `/${language}`;
}
