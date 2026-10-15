import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { initAnalytics } from "./lib/analytics";

initAnalytics();

const root = document.getElementById("root")!;
const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// Páginas pré-geradas já trazem o HTML: hidratar. Restantes (dev, relatórios, checkout): montar.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
