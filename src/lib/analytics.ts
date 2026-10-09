/**
 * Eventos GA4 sem tocar nos componentes: ouve cliques e submissões no documento.
 * Só envia se o gtag estiver carregado (ver bloco comentado em index.html).
 */
type Gtag = (cmd: "event", name: string, params?: Record<string, unknown>) => void;

export function track(name: string, params: Record<string, unknown> = {}) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", name, params);
}

export function initAnalytics() {
  document.addEventListener(
    "click",
    (e) => {
      const el = (e.target as HTMLElement | null)?.closest("a, button");
      if (!el) return;
      const href = el.getAttribute("href") ?? "";
      const label = (el.textContent ?? "").trim().slice(0, 80);
      if (href.includes("calendly.com") || el.closest("[data-calendly]")) track("schedule_meeting_click", { label });
      else if (href.startsWith("mailto:")) track("email_click", { label });
      else if (href.startsWith("tel:")) track("phone_click", { label });
      else if (el.tagName === "BUTTON" && el.getAttribute("type") === "submit") track("form_submit_click", { label, page: location.pathname });
    },
    { capture: true },
  );
  document.addEventListener(
    "submit",
    (e) => {
      const form = e.target as HTMLFormElement;
      track("form_submit", { form_name: form.getAttribute("name") ?? "form", page: location.pathname });
    },
    { capture: true },
  );
}
