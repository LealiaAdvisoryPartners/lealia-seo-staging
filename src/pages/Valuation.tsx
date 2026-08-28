import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import SEOHead, { pageMeta } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/MagneticButton";
import { buildValuationUrl, VALUATION_APP_URL } from "@/config/valuation";
import { buildPath } from "@/lib/routing";
import { Link } from "react-router-dom";

const Valuation = () => {
  const { t, language } = useLanguage();
  const src = buildValuationUrl(language);

  return (
    <>
      <SEOHead
        titleKey={pageMeta.valuation.titleKey}
        descriptionKey={pageMeta.valuation.descriptionKey}
        path="valuation"
      />

      {/* Hero */}
      <section
        className="relative overflow-hidden grain"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-10 md:pb-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="eyebrow mb-6">{t("valuation.eyebrow")}</span>
            <h1 className="text-4xl md:text-5xl font-heading font-light text-primary tracking-tight leading-[1.05] mt-6 mb-5">
              {t("valuation.title")}{" "}
              <span className="text-accent serif-accent">{t("valuation.title.accent")}</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-body font-light leading-relaxed">
              {t("valuation.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Embedded tool */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 pb-16 md:pb-24">
          {src ? (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="rounded-2xl overflow-hidden border border-border/60 shadow-2xl bg-background"
            >
              <iframe
                src={src}
                title={t("valuation.title")}
                loading="lazy"
                className="w-full block"
                style={{ height: "min(1400px, max(720px, 100vh))", border: 0 }}
                allow="clipboard-write; fullscreen"
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur p-10 md:p-16 text-center"
            >
              <p className="text-lg md:text-xl font-heading font-light text-primary mb-3">
                {t("valuation.soon.title")}
              </p>
              <p className="text-sm md:text-base text-muted-foreground font-body font-light max-w-xl mx-auto mb-8">
                {t("valuation.soon.desc")}
              </p>
              <Magnetic>
                <Button asChild className="btn-gold">
                  <Link to={`${buildPath(language, "/")}#contact`}>{t("nav.contact")}</Link>
                </Button>
              </Magnetic>
            </motion.div>
          )}

          {VALUATION_APP_URL && (
            <p className="text-center text-xs text-muted-foreground font-body mt-4">
              <a
                href={VALUATION_APP_URL}
                target="_blank"
                rel="noopener"
                className="link-underline hover:text-accent"
              >
                {t("valuation.openNewTab")}
              </a>
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Valuation;
