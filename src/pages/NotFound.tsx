import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildPath } from "@/lib/routing";

const COPY = {
  en: { eyebrow: "Error 404", heading: "Page not found", lead: "The page you are looking for does not exist or has been moved.", home: "Home", services: "Services", contact: "Contact" },
  pt: { eyebrow: "Erro 404", heading: "Página não encontrada", lead: "A página que procura não existe ou foi movida.", home: "Início", services: "Serviços", contact: "Contacto" },
  es: { eyebrow: "Error 404", heading: "Página no encontrada", lead: "La página que busca no existe o ha sido movida.", home: "Inicio", services: "Servicios", contact: "Contacto" },
} as const;

const NotFound = () => {
  const { language } = useLanguage();
  const c = COPY[language];

  return (
    <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <Helmet>
        <title>{`404 | ${c.heading} | Lealia Advisory Partners`}</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <p className="eyebrow">{c.eyebrow}</p>
      <h1 className="section-title mt-5 text-4xl md:text-6xl">{c.heading}</h1>
      <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-muted-foreground md:text-lg">{c.lead}</p>
      <div className="mt-6 h-px w-16 bg-accent" />
      <nav aria-label="404" className="mt-10 flex flex-wrap gap-4">
        <Link to={buildPath(language, "/")} className="btn-gold">{c.home}</Link>
        <Link to={buildPath(language, "/services")} className="rounded-full border border-border px-6 py-3 text-sm transition-colors hover:text-accent">{c.services}</Link>
        <a href={`${buildPath(language, "/")}#contact`} className="rounded-full border border-border px-6 py-3 text-sm transition-colors hover:text-accent">{c.contact}</a>
      </nav>
    </section>
  );
};

export default NotFound;
