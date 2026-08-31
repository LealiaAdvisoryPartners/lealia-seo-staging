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
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Team from "./pages/Team";
import Privacy from "./pages/Privacy";
import Valuation from "./pages/Valuation";
import Relatorio from "./pages/Relatorio";
import ReportTest from "./pages/__ReportTest";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

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
                  {/* Language-prefixed routes */}
                  <Route path="/en" element={<Index />} />
                  <Route path="/pt" element={<Index />} />
                  <Route path="/es" element={<Index />} />
                  <Route path="/en/about" element={<About />} />
                  <Route path="/pt/about" element={<About />} />
                  <Route path="/es/about" element={<About />} />
                  <Route path="/en/services" element={<Services />} />
                  <Route path="/pt/services" element={<Services />} />
                  <Route path="/es/services" element={<Services />} />
                  <Route path="/en/team" element={<Team />} />
                  <Route path="/pt/team" element={<Team />} />
                  <Route path="/es/team" element={<Team />} />
                  <Route path="/en/valuation" element={<Valuation />} />
                  <Route path="/pt/valuation" element={<Valuation />} />
                  <Route path="/es/valuation" element={<Valuation />} />
                  <Route path="/en/privacy" element={<Privacy />} />
                  <Route path="/pt/privacy" element={<Privacy />} />
                  <Route path="/es/privacy" element={<Privacy />} />
                  
                  {/* Legacy routes without language prefix - will be redirected by LanguageRedirect */}
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/valuation" element={<Valuation />} />
                  <Route path="/privacy" element={<Privacy />} />

                  {/* Relatório de avaliação (link privado, sem prefixo de idioma) */}
                  <Route path="/relatorio/:token" element={<Relatorio />} />
                  <Route path="/__report-test" element={<ReportTest />} />
                  <Route path="/en/relatorio/:token" element={<Relatorio />} />
                  <Route path="/pt/relatorio/:token" element={<Relatorio />} />
                  <Route path="/es/relatorio/:token" element={<Relatorio />} />

                  {/* Link curto do relatório: lealiaap.com/empresa-abcd */}
                  <Route path="/:token" element={<Relatorio />} />


                  
                  
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
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
