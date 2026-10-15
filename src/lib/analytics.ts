/**
 * Cliques em e-mail, telefone, LinkedIn e marcação de reunião (Calendly),
 * ouvidos ao nível do documento. Envia para o dataLayer sem texto do link.
 */
import { pushEvent } from "./tracking/datalayer";

export function initAnalytics() {
  document.addEventListener(
    "click",
    (e) => {
      const el = (e.target as HTMLElement | null)?.closest("a, button");
      if (!el) return;
      const href = el.getAttribute("href") ?? "";
      if (href.includes("calendly.com") || el.closest("[data-calendly]")) pushEvent("click_book_meeting");
      else if (href.startsWith("mailto:")) pushEvent("click_email");
      else if (href.startsWith("tel:")) pushEvent("click_phone");
      else if (href.includes("linkedin.com")) pushEvent("click_linkedin");
    },
    { capture: true },
  );
}
