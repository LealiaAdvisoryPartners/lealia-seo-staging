import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { parseManifestoWords } from "@/components/home/textParsing";

/* ---------- Act II: Big editorial manifesto ---------- */
const ManifestoSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const words = parseManifestoWords(t("home.manifesto.words"));

  return (
    <section ref={ref} className="relative min-h-[60vh] flex items-center justify-center px-6 py-16">
      <motion.div style={{ y, opacity }} className="max-w-5xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="eyebrow mb-6 justify-center"
        >
          {t("home.manifesto.eyebrow")}
        </motion.span>

        <h2
          className="font-heading text-primary leading-[1.05] tracking-tight mt-6"
          style={{ fontSize: "clamp(1.75rem, 4.5vw, 4rem)", fontWeight: 300, letterSpacing: "-0.025em" }}
        >
          {words.map((w, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em] mr-[0.25em]"
            >
              <motion.span
                initial={{ y: "110%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.1, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className={`inline-block ${w.italic ? "serif-accent" : ""} ${w.gold ? "text-accent" : ""}`}
              >
                {w.text}
              </motion.span>
            </span>
          ))}
        </h2>
      </motion.div>
    </section>
  );
};

export default ManifestoSection;
