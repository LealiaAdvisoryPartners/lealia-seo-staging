import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import { LANGUAGES } from "@/lib/routing";

const BASE_URL = "https://www.lealiaap.com";
const OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/gfBsJlrY8AVsnIsP11IQGqm68GY2/social-images/social-1770631896542-Lealia_AP_Business_Card.png";

const OG_LOCALE: Record<string, string> = { en: "en_US", pt: "pt_PT", es: "es_ES" };

const ORG = { "@type": "Organization", name: "Lealia Advisory Partners", url: BASE_URL } as const;

interface SchemaContext {
  title: string;
  description: string;
  url: string;
}

/** Páginas transaccionais (dependem de uma referência): não indexar. */
const NOINDEX = new Set(["upgrade"]);

/** Schema.org específico por página; as restantes usam `WebPage`. */
const PAGE_SCHEMA: Record<string, (c: SchemaContext) => Record<string, unknown>> = {
  services: ({ description, url }) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: "M&A Advisory & Corporate Finance",
    provider: { "@type": "ProfessionalService", name: ORG.name, url: BASE_URL },
    areaServed: ["Portugal", "Spain", "Iberia", "Europe"],
    serviceType: [
      "Buy-Side M&A Advisory",
      "Sell-Side M&A Advisory",
      "Performance Improvement",
      "Corporate Finance",
      "Financial Modeling",
      "Valuation",
    ],
    description,
    url,
  }),
  valuation: ({ description, url }) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Company valuation",
    serviceType: "Company valuation",
    provider: { "@type": "ProfessionalService", name: ORG.name, url: BASE_URL },
    areaServed: ["Portugal", "Spain"],
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    description,
    url,
  }),
  about: ({ title, description, url }) => ({
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: title,
    description,
    url,
    mainEntity: ORG,
  }),
  team: ({ title, description, url }) => ({
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: title,
    description,
    url,
    mainEntity: [
      {
        "@type": "Person",
        name: "Ricardo Nascimento Ferreira",
        jobTitle: "Managing Partner",
        email: "ricardo.ferreira@lealiaap.com",
        sameAs: "https://www.linkedin.com/in/ricardo-a-n-ferreira/",
        worksFor: ORG,
      },
      {
        "@type": "Person",
        name: "Duarte Rocha Pereira",
        jobTitle: "Managing Partner",
        email: "duarte.pereira@lealiaap.com",
        sameAs: "https://www.linkedin.com/in/duarte-rocha-pereira/",
        worksFor: ORG,
      },
    ],
  }),
};

const webPageSchema = ({ title, description, url }: SchemaContext) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: title,
  description,
  url,
  isPartOf: { "@type": "WebSite", name: ORG.name, url: BASE_URL },
});

interface SEOHeadProps {
  /** Segmento da página ("" na página inicial). Define URL canónico e chaves SEO. */
  slug?: string;
}

/**
 * Metadados da página: título, descrição, canónico, hreflang, Open Graph e
 * dados estruturados — tudo derivado do slug e do idioma activo.
 */
const SEOHead = ({ slug = "" }: SEOHeadProps) => {
  const { t, language } = useLanguage();

  const key = slug || "home";
  const title = t(`seo.${key}.title`);
  const description = t(`seo.${key}.description`);

  const suffix = slug ? `/${slug}` : "";
  const url = `${BASE_URL}/${language}${suffix}`;
  const ctx: SchemaContext = { title, description, url };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${language}` },
      ...(slug
        ? [{ "@type": "ListItem", position: 2, name: title.split("|")[0].trim(), item: url }]
        : []),
    ],
  };

  return (
    <Helmet>
      <html lang={language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={NOINDEX.has(key) ? "noindex, follow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
      <link rel="canonical" href={url} />

      {LANGUAGES.map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={`${BASE_URL}/${l}${suffix}`} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/en${suffix}`} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={ORG.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={OG_LOCALE[language] ?? "en_US"} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1920" />
      <meta property="og:image:height" content="1080" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      <script type="application/ld+json">{JSON.stringify((PAGE_SCHEMA[key] ?? webPageSchema)(ctx))}</script>
    </Helmet>
  );
};

export default SEOHead;
