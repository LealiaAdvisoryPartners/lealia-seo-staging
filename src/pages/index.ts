/**
 * Registo único das páginas do site.
 *
 * Alimenta as rotas (App.tsx), o menu (Navigation.tsx), o SEO (SEOHead.tsx) e a
 * distinção entre página e link de relatório (LanguageRedirect.tsx). Adicionar
 * uma página é acrescentar uma linha aqui.
 */
import { lazy, type ComponentType } from "react";

import Index from "./Index";
import About from "./About";
import Services from "./Services";
import Team from "./Team";
import Valuation from "./Valuation";
import Privacy from "./Privacy";
import Terms from "./Terms";
// Checkout: fora da pré-geração e carregado à parte.
const Upgrade = lazy(() => import("./Upgrade"));
import FAQ from "./FAQ";

export interface SitePage {
  /** Segmento do URL; vazio na página inicial. */
  slug: string;
  Component: ComponentType;
  /** Pré-gerada em HTML estático e incluída no sitemap. */
  prerender?: boolean;
  /** Chave de tradução do nome no menu; ausente = fora do menu. */
  navKey?: string;
}

export const SITE_PAGES: SitePage[] = [
  { slug: "", prerender: true, Component: Index, navKey: "nav.home" },
  { slug: "about", prerender: true, Component: About, navKey: "nav.about" },
  { slug: "services", prerender: true, Component: Services, navKey: "nav.services" },
  { slug: "team", prerender: true, Component: Team, navKey: "nav.team" },
  { slug: "valuation", prerender: true, Component: Valuation, navKey: "nav.valuation" },
  { slug: "privacy", prerender: true, Component: Privacy },
  { slug: "terms", prerender: true, Component: Terms },
  { slug: "faq", prerender: true, Component: FAQ },
  { slug: "upgrade", Component: Upgrade },
];

export type NavPage = SitePage & { navKey: string };

export const NAV_PAGES = SITE_PAGES.filter((p): p is NavPage => Boolean(p.navKey));

/** Segmentos reservados: tudo o resto num único segmento é um link de relatório. */
export const PAGE_SLUGS = new Set([...SITE_PAGES.map((p) => p.slug), "relatorio"]);
