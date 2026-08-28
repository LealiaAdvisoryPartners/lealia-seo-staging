import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import SEOHead, { pageMeta } from "@/components/SEOHead";
import { AvaliacaoTool } from "@/components/lealia/AvaliacaoTool";

const Valuation = () => {
  const { t } = useLanguage();

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

      {/* Ferramenta de avaliação */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <AvaliacaoTool />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Valuation;
