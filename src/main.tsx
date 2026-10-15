import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { initAnalytics } from "./lib/analytics";
import { initConsentDefaults } from "./lib/tracking/consent";
import { captureAttribution } from "./lib/tracking/attribution";
import { loadGtm } from "./lib/tracking/gtm";

// Ordem obrigatória: consentimento recusado por defeito → dataLayer → GTM (só com ID real).
initConsentDefaults();
captureAttribution();
initAnalytics();
loadGtm();

const root = document.getElementById("root")!;
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// Páginas pré-geradas já trazem o HTML: hidratar. Restantes (dev, relatórios, checkout): montar.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
