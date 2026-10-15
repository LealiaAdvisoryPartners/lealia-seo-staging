import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { initAnalytics } from "./lib/analytics";
import { CONSENT_CHANGED_EVENT, initConsentDefaults } from "./lib/tracking/consent";
import { captureAttribution } from "./lib/tracking/attribution";
import { initGtm } from "./lib/tracking/gtm";
import { pushPageContext } from "./lib/tracking/datalayer";

// Ordem obrigatória: dataLayer + consentimento recusado → escolha guardada →
// GTM só com ID real e consentimento opcional → page_view da página atual.
initConsentDefaults();
captureAttribution();
initAnalytics();
initGtm(() => pushPageContext(window.location.pathname));
// Analítica aceite mais tarde com o GTM já carregado (ex.: só marketing antes).
window.addEventListener(CONSENT_CHANGED_EVENT, () => pushPageContext(window.location.pathname));

const root = document.getElementById("root")!;
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// Páginas pré-geradas já trazem o HTML: hidratar. Restantes (dev, relatórios, checkout): montar.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
