import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";

import { LanguageProvider } from "./contexts/LanguageContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import LanguageRedirect from "./components/LanguageRedirect";
import { ScrollProgress } from "./components/motion/ScrollProgress";
import { LANGUAGES } from "./lib/routing";
import { SITE_PAGES } from "./pages";
// Relatório e checkout carregam à parte: levam os bundles pesados (PDF, gráficos, pagamentos).
const Relatorio = lazy(() => import("./pages/Relatorio"));
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/**
 * Cada página existe em quatro endereços: um por idioma (/pt/about) e um sem
 * prefixo (/about), que o LanguageRedirect encaminha para o idioma activo.
 */
const pagePaths = (slug: string) => [...LANGUAGES.map((l) => `/${l}${slug && `/${slug}`}`), `/${slug}`];

/**
 * O router é dado por quem monta a app: BrowserRouter no browser (main.tsx) e
 * StaticRouter na pré-geração (entry-server.tsx).
 */
const App = ({ helmetContext }: { helmetContext?: object }) => (
  <HelmetProvider context={helmetContext}>
    {/* Utilizadores com "reduzir movimento" recebem as animações sem deslocações. */}
    <MotionConfig reducedMotion="user">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
          <LanguageProvider>
            <ScrollToTop />
            <LanguageRedirect />
            <ScrollProgress />

            <div className="min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1 pt-16">
                <Suspense fallback={null}>
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
                </Suspense>
              </main>
              <Footer />
            </div>
          </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
    </MotionConfig>
  </HelmetProvider>
);

export default App;
