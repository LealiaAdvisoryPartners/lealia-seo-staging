import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LanguageProvider } from "./contexts/LanguageContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import LanguageRedirect from "./components/LanguageRedirect";
import { ScrollProgress } from "./components/motion/ScrollProgress";
import { LANGUAGES } from "./lib/routing";
import { SITE_PAGES } from "./pages";
import Relatorio from "./pages/Relatorio";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/**
 * Cada página existe em quatro endereços: um por idioma (/pt/about) e um sem
 * prefixo (/about), que o LanguageRedirect encaminha para o idioma activo.
 */
const pagePaths = (slug: string) => [...LANGUAGES.map((l) => `/${l}${slug && `/${slug}`}`), `/${slug}`];

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LanguageProvider>
            <ScrollToTop />
            <LanguageRedirect />
            <ScrollProgress />

            <div className="min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1 pt-16">
                <Routes>
                  {SITE_PAGES.flatMap(({ slug, Component }) =>
                    pagePaths(slug).map((path) => <Route key={path} path={path} element={<Component />} />),
                  )}

                  {/* Relatório de avaliação: link longo e link curto (lealiaap.com/empresa-abcd). */}
                  {["/relatorio/:token", ...LANGUAGES.map((l) => `/${l}/relatorio/:token`)].map((path) => (
                    <Route key={path} path={path} element={<Relatorio />} />
                  ))}
                  <Route path="/:token" element={<Relatorio />} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </LanguageProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
