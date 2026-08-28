/**
 * Live URL of the Lealia Valuation tool (separate app, embedded on /valuation).
 *
 * Paste the PUBLISHED url of the valuation app here (including the /avaliacao path),
 * e.g. "https://lealia-valuation.lovable.app/avaliacao" or a custom domain.
 * While this is empty, the page shows a graceful fallback instead of a blank frame.
 */
export const VALUATION_APP_URL = "";

/** Optional: language query param appended so the tool can react to the site language. */
export const buildValuationUrl = (language: string) => {
  if (!VALUATION_APP_URL) return "";
  const url = new URL(VALUATION_APP_URL);
  url.searchParams.set("lang", language);
  url.searchParams.set("embed", "1");
  return url.toString();
};
