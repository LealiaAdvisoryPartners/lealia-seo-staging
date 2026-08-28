import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildPath, getLanguageFromPath, getPathWithoutLanguage } from "@/lib/routing";

/** Páginas reais do site — tudo o resto num único segmento é um link de relatório. */
const KNOWN_PAGES = ["about", "services", "team", "valuation", "privacy", "relatorio"];

const isReportSlug = (pathname: string) => {
  const segments = getPathWithoutLanguage(pathname).split("/").filter(Boolean);
  return segments.length === 1 && !KNOWN_PAGES.includes(segments[0]);
};

/**
 * Component that redirects non-prefixed URLs to language-prefixed versions
 * e.g., /about -> /en/about (or /pt/about, /es/about based on user preference)
 * Report links (lealiaap.com/empresa-abcd) stay at the root, without prefix.
 */
const LanguageRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const hasRedirected = useRef(false);

  useEffect(() => {
    const currentLang = getLanguageFromPath(location.pathname);
    const suffix = `${location.search}${location.hash}`;

    // Links de relatório vivem na raiz: remove qualquer prefixo de idioma.
    if (isReportSlug(location.pathname)) {
      if (currentLang) {
        hasRedirected.current = true;
        navigate(`${getPathWithoutLanguage(location.pathname)}${suffix}`, { replace: true });
      }
      return;
    }

    // If URL already has a language prefix, do nothing
    if (currentLang) {
      hasRedirected.current = true;
      return;
    }

    if (!hasRedirected.current && location.pathname !== "/") {
      const pathWithoutLang = getPathWithoutLanguage(location.pathname);
      const newPath = buildPath(language, pathWithoutLang);

      if (newPath !== location.pathname) {
        hasRedirected.current = true;
        // Preserve query string and hash (e.g. ?k= admin key on report links)
        navigate(`${newPath}${suffix}`, { replace: true });
      }
    }
  }, [location.pathname, location.search, location.hash, language, navigate]);

  return null;
};

export default LanguageRedirect;
