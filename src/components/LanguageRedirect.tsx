import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildPath, getLanguageFromPath, stripLanguage } from "@/lib/routing";
import { PAGE_SLUGS } from "@/pages";

/** Um único segmento que não é uma página do site é um link de relatório. */
const isReportSlug = (pathname: string) => {
  const segments = stripLanguage(pathname).split("/").filter(Boolean);
  return segments.length === 1 && !PAGE_SLUGS.has(segments[0]);
};

/**
 * Normaliza o URL: as páginas vivem sob um prefixo de idioma (/about → /pt/about)
 * e os links de relatório vivem na raiz (/pt/empresa-abcd → /empresa-abcd).
 * A query string e o hash são sempre preservados (ex.: ?k= dos links internos).
 */
const LanguageRedirect = () => {
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const temPrefixo = getLanguageFromPath(pathname) !== null;
    const destino = isReportSlug(pathname)
      ? stripLanguage(pathname)
      : temPrefixo || pathname === "/"
        ? pathname
        : buildPath(language, pathname);

    if (destino !== pathname) navigate(`${destino}${search}${hash}`, { replace: true });
  }, [pathname, search, hash, language, navigate]);

  return null;
};

export default LanguageRedirect;
