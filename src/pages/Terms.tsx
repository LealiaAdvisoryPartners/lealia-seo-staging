import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildPath } from "@/lib/routing";
import { termsContent } from "@/translations/terms";

const linkify = (text: string) => {
  const parts = text.split(/((?:https?:\/\/|www\.)[^\s—]+)/g);
  return parts.map((part, index) => {
    if (!/^(?:https?:\/\/|www\.)/.test(part)) return part;
    const trailing = part.match(/[.,;:)]+$/)?.[0] ?? "";
    const url = trailing ? part.slice(0, -trailing.length) : part;
    const href = url.startsWith("http") ? url : `https://${url}`;
    return (
      <span key={`${url}-${index}`}>
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4 hover:text-accent/75">
          {url}
        </a>
        {trailing}
      </span>
    );
  });
};

const Terms = () => {
  const { language } = useLanguage();
  const content = termsContent[language];

  return (
    <>
      <SEOHead slug="terms" />

      <section className="relative overflow-hidden grain" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-40 pb-16 md:pb-20 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="eyebrow mb-6">{content.eyebrow}</span>
            <h1 className="text-5xl md:text-6xl font-heading font-light text-primary tracking-tight leading-[1.05] mt-6 mb-6">
              <span className="serif-accent text-accent">{content.title.split(" ")[0]}</span>{" "}
              {content.title.split(" ").slice(1).join(" ")}
            </h1>
            <p className="text-sm text-muted-foreground font-body font-light tracking-wide">{content.lastUpdated}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-14">
            {content.sections.map((section, index) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.025 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 pb-14 border-b border-border/60 last:border-0"
              >
                <div className="md:col-span-3">
                  <span className="serif-accent text-3xl text-accent">{String(index + 1).padStart(2, "0")}</span>
                  <h2 className="text-xl md:text-2xl font-heading font-light text-primary tracking-tight mt-2">{section.title}</h2>
                </div>
                <div className="md:col-span-9 space-y-4 text-foreground/75 font-body font-light leading-relaxed">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{linkify(paragraph)}</p>)}
                  {section.details && (
                    <div className="border-l border-accent/60 pl-5 space-y-2 text-foreground/85">
                      {section.details.map((detail) => <p key={detail}>{linkify(detail)}</p>)}
                    </div>
                  )}
                  {section.afterDetails?.map((paragraph) => <p key={paragraph}>{linkify(paragraph)}</p>)}
                  {section.privacyLink && (
                    <Link to={buildPath(language, "/privacy")} className="inline-block text-accent underline underline-offset-4 hover:text-accent/75">
                      {language === "pt" ? "Consultar Política de Privacidade" : language === "es" ? "Consultar Política de Privacidad" : "View Privacy Policy"}
                    </Link>
                  )}
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Terms;