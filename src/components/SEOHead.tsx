import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import { LANGUAGES } from "@/lib/routing";

const BASE_URL = "https://www.lealiaap.com";
const OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/gfBsJlrY8AVsnIsP11IQGqm68GY2/social-images/social-1770631896542-Lealia_AP_Business_Card.png";

const OG_LOCALE: Record<string, string> = { en: "en_US", pt: "pt_PT", es: "es_ES" };

/** Códigos BCP 47 para hreflang e <html lang>. */
export const HREFLANG: Record<string, string> = { en: "en", pt: "pt-PT", es: "es-ES" };

/** @id estáveis: as páginas referenciam a mesma entidade em vez de a repetir. */
export const ORG_ID = `${BASE_URL}/#organization`;
export const WEBSITE_ID = `${BASE_URL}/#website`;
const ORG = { "@id": ORG_ID } as const;

const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "Organization"],
  "@id": ORG_ID,
  name: "Lealia Advisory Partners",
  alternateName: "Lealia",
  description: "Independent M&A advisory firm specializing in SMEs and lower mid-market transactions in Iberia.",
  url: BASE_URL,
  logo: `${BASE_URL}/email-logo.png`,
  image: OG_IMAGE,
  email: "geral@lealiaap.com",
  telephone: "+351935882323",
  address: { "@type": "PostalAddress", addressCountry: "PT", addressLocality: "Lisbon" },
  areaServed: ["Portugal", "Spain", "Europe"],
  sameAs: ["https://www.linkedin.com/company/lealia-ap/"],
  founder: [{ "@id": `${BASE_URL}/#ricardo-ferreira` }, { "@id": `${BASE_URL}/#duarte-pereira` }],
};

const WEBSITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: "Lealia Advisory Partners",
  alternateName: "Lealia",
  url: `${BASE_URL}/`,
  inLanguage: ["en", "pt-PT", "es-ES"],
  publisher: ORG,
};

interface SchemaContext {
  title: string;
  description: string;
  url: string;
  lang: string;
}

/** Páginas transaccionais (dependem de uma referência): não indexar. */
const NOINDEX = new Set(["upgrade"]);

/** Schema.org específico por página; as restantes usam `WebPage`. */
const PAGE_SCHEMA: Record<string, (c: SchemaContext) => Record<string, unknown>> = {
  services: ({ description, url }) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: "M&A Advisory & Corporate Finance",
    provider: ORG,
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
    provider: ORG,
    areaServed: ["Portugal", "Spain"],
    description,
    url,
  }),
  about: ({ title, description, url, lang }) => ({
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${url}#webpage`,
    inLanguage: lang,
    isPartOf: { "@id": WEBSITE_ID },
    name: title,
    description,
    url,
    mainEntity: ORG,
  }),
  team: ({ title, description, url, lang }) => ({
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${url}#webpage`,
    inLanguage: lang,
    isPartOf: { "@id": WEBSITE_ID },
    name: title,
    description,
    url,
    mainEntity: [
      {
        "@type": "Person",
        "@id": `${BASE_URL}/#ricardo-ferreira`,
        name: "Ricardo Nascimento Ferreira",
        jobTitle: "Managing Partner",
        email: "ricardo.ferreira@lealiaap.com",
        sameAs: "https://www.linkedin.com/in/ricardo-a-n-ferreira/",
        worksFor: ORG,
      },
      {
        "@type": "Person",
        "@id": `${BASE_URL}/#duarte-pereira`,
        name: "Duarte Rocha Pereira",
        jobTitle: "Managing Partner",
        email: "duarte.pereira@lealiaap.com",
        sameAs: "https://www.linkedin.com/in/duarte-rocha-pereira/",
        worksFor: ORG,
      },
    ],
  }),
};

const webPageSchema = ({ title, description, url, lang }: SchemaContext) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${url}#webpage`,
  name: title,
  description,
  url,
  inLanguage: lang,
  isPartOf: { "@id": WEBSITE_ID },
  publisher: ORG,
});

/** Páginas que publicam o seu próprio schema principal (ex.: FAQPage). */
const OWN_SCHEMA = new Set(["faq"]);

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
  const url = `${BASE_URL}/${language}${suffix}/`;
  const lang = HREFLANG[language] ?? "en";
  const ctx: SchemaContext = { title, description, url, lang };
  const schemas: object[] = [];
  if (!slug) schemas.push(ORGANIZATION, WEBSITE);
  else schemas.push(breadcrumbFor());
  if (!OWN_SCHEMA.has(key)) schemas.push((PAGE_SCHEMA[key] ?? webPageSchema)(ctx));

  function breadcrumbFor() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/${language}/` },
      ...(slug
        ? [{ "@type": "ListItem", position: 2, name: title.split("|")[0].trim(), item: url }]
        : []),
    ],
  };
  }

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={NOINDEX.has(key) ? "noindex, follow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
      <link rel="canonical" href={url} />

      {LANGUAGES.map((l) => (
        <link key={l} rel="alternate" hrefLang={HREFLANG[l]} href={`${BASE_URL}/${l}${suffix}/`} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/en${suffix}/`} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Lealia Advisory Partners" />
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

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(schema)}</script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
