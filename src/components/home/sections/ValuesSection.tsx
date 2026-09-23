import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildPath } from "@/lib/routing";
import { Magnetic } from "@/components/motion/MagneticButton";
import { parseInline } from "@/components/home/textParsing";

interface Value {
  title: string;
  desc: string;
}

const ValueRow = ({ value, index }: { value: Value; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    className="group grid grid-cols-12 gap-4 items-baseline py-6 md:py-8 border-b border-primary-foreground/10 cursor-default"
  >
    <span className="col-span-2 md:col-span-1 text-[10px] tracking-[0.3em] text-accent">
      0{index + 1}
    </span>
    <h4
      className="col-span-10 md:col-span-4 font-heading text-primary-foreground transition-transform duration-700 group-hover:translate-x-2"
      style={{ fontSize: "clamp(1.125rem, 1.8vw, 1.625rem)", fontWeight: 300, letterSpacing: "-0.01em" }}
    >
      {value.title}
    </h4>
    <p
      className="col-start-3 md:col-start-6 col-span-10 md:col-span-7 text-primary-foreground/65 leading-relaxed text-sm md:text-base"
      style={{ fontWeight: 300 }}
    >
      {value.desc}
    </p>
  </motion.div>
);

/* ---------- Act V: Values as scrolling list ---------- */
const ValuesSection = () => {
  const { t, language } = useLanguage();
  const values: Value[] = [
    { title: t("values.integrity"), desc: t("values.integrity.desc") },
    { title: t("values.excellence"), desc: t("values.excellence.desc") },
    { title: t("values.partnership"), desc: t("values.partnership.desc") },
    { title: t("values.innovation"), desc: t("values.innovation.desc") },
  ];

  return (
    <section className="relative py-14 md:py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mb-10"
        >
          <span className="eyebrow mb-4">{t("values.title")}</span>
          <h3
            className="font-heading text-primary-foreground mt-4 max-w-3xl"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)", fontWeight: 300, letterSpacing: "-0.02em" }}
          >
            {parseInline(t("home.values.heading")).map((seg, i) => (
              <span
                key={i}
                className={`${seg.italic ? "serif-accent" : ""} ${seg.gold ? "text-accent" : ""}`}
              >
                {seg.text}
              </span>
            ))}
          </h3>
        </motion.div>

        <div className="border-t border-primary-foreground/10">
          {values.map((v, i) => (
            <ValueRow key={v.title} value={v} index={i} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Magnetic>
            <Link to={buildPath(language, "/about")} className="btn-gold">
              {t("values.cta")}
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
