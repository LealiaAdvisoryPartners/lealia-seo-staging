/**
 * Carrega o Google Tag Manager só quando existe um ID real em
 * VITE_GTM_CONTAINER_ID. Ambientes GTM (staging) via VITE_GTM_ENV_AUTH +
 * VITE_GTM_ENV_PREVIEW. Nunca corre na pré-geração (só no browser).
 */
const GTM_ID_RE = /^GTM-[A-Z0-9]{5,10}$/;

export function validGtmId(id: unknown): id is string {
  return typeof id === "string" && GTM_ID_RE.test(id) && !/X{4,}/.test(id);
}

export function loadGtm(id: unknown = import.meta.env.VITE_GTM_CONTAINER_ID) {
  if (typeof window === "undefined" || !validGtmId(id)) return false;
  if (document.querySelector('script[data-lealia-gtm]')) return false;

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
  return true;
}
