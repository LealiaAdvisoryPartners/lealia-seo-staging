import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";

interface SEOHeadProps {
  titleKey?: string;
  descriptionKey?: string;
  path?: string;
}

const pageMeta: Record<string, { titleKey: string; descriptionKey: string }> = {
  home: {
    titleKey: "seo.home.title",
    descriptionKey: "seo.home.description",
  },
  about: {
    titleKey: "seo.about.title",
    descriptionKey: "seo.about.description",
  },
  services: {
    titleKey: "seo.services.title",
    descriptionKey: "seo.services.description",
  },
  team: {
    titleKey: "seo.team.title",
    descriptionKey: "seo.team.description",
  },
  valuation: {
    titleKey: "seo.valuation.title",
    descriptionKey: "seo.valuation.description",
  },
  privacy: {
    titleKey: "seo.privacy.title",
    descriptionKey: "seo.privacy.description",
  },
  terms: {
    titleKey: "seo.terms.title",
    descriptionKey: "seo.terms.description",
  },
};

const BASE_URL = "https://www.lealiaap.com";
const OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/gfBsJlrY8AVsnIsP11IQGqm68GY2/social-images/social-1770631896542-Lealia_AP_Business_Card.png";

const langMap: Record<string, string> = {
  en: "en_US",
  pt: "pt_PT",
  es: "es_ES",
};

const buildJsonLd = (path: string, title: string, description: string, url: string) => {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
      ...(path
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: title.split("|")[0].trim(),
              item: url,
            },
          ]
        : []),
    ],
  };

  let pageSchema: Record<string, unknown> | null = null;
  if (path === "services") {
    pageSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "M&A Advisory & Corporate Finance",
      provider: {
        "@type": "ProfessionalService",
        name: "Lealia Advisory Partners",
        url: BASE_URL,
      },
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
    };
  } else if (path === "about") {
    pageSchema = {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: title,
      description,
      url,
      mainEntity: {
        "@type": "Organization",
        name: "Lealia Advisory Partners",
        url: BASE_URL,
      },
    };
  } else if (path === "team") {
    pageSchema = {
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
          worksFor: { "@type": "Organization", name: "Lealia Advisory Partners", url: BASE_URL },
        },
        {
          "@type": "Person",
          name: "Duarte Rocha Pereira",
          jobTitle: "Managing Partner",
          email: "duarte.pereira@lealiaap.com",
          sameAs: "https://www.linkedin.com/in/duarte-rocha-pereira/",
          worksFor: { "@type": "Organization", name: "Lealia Advisory Partners", url: BASE_URL },
        },
      ],
    };
  } else {
    pageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url,
      isPartOf: { "@type": "WebSite", name: "Lealia Advisory Partners", url: BASE_URL },
    };
  }

  return { breadcrumb, pageSchema };
};

const SEOHead = ({ titleKey, descriptionKey, path = "" }: SEOHeadProps) => {
  const { t, language } = useLanguage();

  const title = titleKey ? t(titleKey) : "Lealia Advisory Partners | M&A Advisory";
  const description = descriptionKey ? t(descriptionKey) : t("seo.home.description");

  const suffix = path ? `/${path}` : "";
  const canonicalUrl = `${BASE_URL}/${language}${suffix}`;
  const { breadcrumb, pageSchema } = buildJsonLd(path, title, description, canonicalUrl);

  return (
    <Helmet>
      <html lang={language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href={canonicalUrl} />

      {/* hreflang alternates for international SEO */}
      <link rel="alternate" hrefLang="en" href={`${BASE_URL}/en${suffix}`} />
      <link rel="alternate" hrefLang="pt" href={`${BASE_URL}/pt${suffix}`} />
      <link rel="alternate" hrefLang="es" href={`${BASE_URL}/es${suffix}`} />
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/en${suffix}`} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Lealia Advisory Partners" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={langMap[language] || "en_US"} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1920" />
      <meta property="og:image:height" content="1080" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {/* Per-page structured data */}
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      {pageSchema && <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>}
    </Helmet>
  );
};

export { pageMeta };
export default SEOHead;
