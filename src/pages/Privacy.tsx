import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import SEOHead from "@/components/SEOHead";

const Privacy = () => {
  const { t } = useLanguage();

  const sections = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Render a paragraph only if the translation key exists (t() returns the
  // key itself when missing).
  const para = (key: string) => {
    const value = t(key);
    return value === key ? null : value;
  };

  const items = (n: number) => {
    const list: string[] = [];
    for (let j = 1; j <= 10; j++) {
      const value = para(`privacy.section${n}.item${j}`);
      if (value) list.push(value);
    }
    return list;
  };

  return (
    <>
      <SEOHead slug="privacy" />

      {/* Hero */}
      <section
        className="relative overflow-hidden grain"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-40 pb-16 md:pb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="eyebrow mb-6">Legal</span>
            <h1 className="text-5xl md:text-6xl font-heading font-light text-primary tracking-tight leading-[1.05] mt-6 mb-6">
              <span className="serif-accent text-accent">
                {t("privacy.title").split(" ")[0]}
              </span>{" "}
              {t("privacy.title").split(" ").slice(1).join(" ")}
            </h1>
            <p className="text-sm text-muted-foreground font-body font-light tracking-wide">
              {t("privacy.lastUpdated")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-14">
            {sections.map((n, i) => (
              <motion.section
                key={n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 pb-14 border-b border-border/60 last:border-0"
              >
                <div className="md:col-span-3">
                  <span className="serif-accent text-3xl text-accent">
                    {String(n).padStart(2, "0")}
                  </span>
                  <h2 className="text-xl md:text-2xl font-heading font-light text-primary tracking-tight mt-2">
                    {t(`privacy.section${n}.title`)}
                  </h2>
                </div>
                <div className="md:col-span-9 space-y-4 text-foreground/75 font-body font-light leading-relaxed">
                  {para(`privacy.section${n}.p1`) && (
                    <p>{para(`privacy.section${n}.p1`)}</p>
                  )}
                  {items(n).length > 0 && (
                    <ul className="list-none space-y-2 pl-0 mt-4">
                      {items(n).map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="text-accent mt-2 w-2 h-px bg-accent shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {para(`privacy.section${n}.p2`) && (
                    <p>{para(`privacy.section${n}.p2`)}</p>
                  )}
                  {para(`privacy.section${n}.p3`) && (
                    <p>{para(`privacy.section${n}.p3`)}</p>
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

export default Privacy;
