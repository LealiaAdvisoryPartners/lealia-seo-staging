import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildPath, getLanguageFromPath, getPathWithoutLanguage } from "@/lib/routing";

/**
 * Component that redirects non-prefixed URLs to language-prefixed versions
 * e.g., /about -> /en/about (or /pt/about, /es/about based on user preference)
 * Only runs client-side after initial load to avoid conflicts with Netlify redirects
 */
const LanguageRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Skip redirect on initial mount if we're already on a language-prefixed path
    // This allows Netlify's server-side redirects to work first
    const currentLang = getLanguageFromPath(location.pathname);
    
    // If URL already has a language prefix, do nothing
    if (currentLang) {
      hasRedirected.current = true;
      return;
    }

    // Only redirect if we haven't redirected yet and we're not on the root path
    // (root path should be handled by Netlify redirects)
    if (!hasRedirected.current && location.pathname !== "/") {
      const pathWithoutLang = getPathWithoutLanguage(location.pathname);
      const newPath = buildPath(language, pathWithoutLang);
      
      // Only redirect if the path would actually change
      if (newPath !== location.pathname) {
        hasRedirected.current = true;
        // Preserve query string and hash (e.g. ?k= admin key on report links)
        navigate(`${newPath}${location.search}${location.hash}`, { replace: true });
      }
    }
  }, [location.pathname, location.search, location.hash, language, navigate]);


  return null;
};

export default LanguageRedirect;

