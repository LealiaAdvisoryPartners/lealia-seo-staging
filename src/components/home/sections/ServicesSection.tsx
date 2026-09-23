import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildPath } from "@/lib/routing";
import { Magnetic } from "@/components/motion/MagneticButton";
import { parseInline } from "@/components/home/textParsing";

interface Service {
  no: string;
  title: string;
  desc: string;
  tag: string;
  link: string;
}

const ServiceRow = ({ service, index }: { service: Service; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={service.link}
        className="group grid grid-cols-12 gap-4 items-baseline py-6 md:py-8 border-t border-primary/10 hover:border-accent/40 transition-colors duration-500"
      >
        <span className="col-span-2 md:col-span-1 serif-accent text-accent text-lg md:text-xl leading-none">
          {service.no}
        </span>
        <div className="col-span-10 md:col-span-5">
          <h4
            className="font-heading text-primary transition-transform duration-700 group-hover:translate-x-2"
            style={{
              fontSize: "clamp(1.25rem, 2.2vw, 1.875rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            {service.title}
          </h4>
          <span className="block mt-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {service.tag}
          </span>
        </div>
        <p
          className="col-start-3 md:col-start-7 col-span-10 md:col-span-5 text-muted-foreground leading-relaxed text-sm md:text-base"
          style={{ fontWeight: 300 }}
        >
          {service.desc}
        </p>
        <div className="col-start-3 md:col-start-12 md:col-span-1 flex md:justify-end text-accent mt-2 md:mt-0">
          <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </Link>
    </motion.div>
  );
};

/* ---------- Act III: Stacked services reveal ---------- */
const ServicesSection = () => {
  const { t, language } = useLanguage();

  const services: Service[] = [
    {
      no: "01",
      title: t("services.ma"),
      desc: t("services.ma.desc"),
      tag: t("home.services.tag.ma"),
      link: buildPath(language, "/services#buy-side"),
    },
    {
      no: "02",
      title: t("services.performance"),
      desc: t("services.performance.desc"),
      tag: t("home.services.tag.performance"),
      link: buildPath(language, "/services#performance"),
    },
    {
      no: "03",
      title: t("services.modeling"),
      desc: t("services.modeling.desc"),
      tag: t("home.services.tag.modeling"),
      link: buildPath(language, "/services#modeling"),
    },
  ];

  return (
    <section className="relative px-6 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14"
        >
          <div>
            <span className="eyebrow mb-3">{t("services.title")}</span>
            <h3
              className="font-heading text-primary mt-3"
              style={{ fontSize: "clamp(1.75rem, 3.8vw, 3rem)", fontWeight: 300, letterSpacing: "-0.025em" }}
            >
              {parseInline(t("home.services.heading")).map((seg, i) => (
                <span
                  key={i}
                  className={`${seg.italic ? "serif-accent" : ""} ${seg.gold ? "text-accent" : ""}`}
                >
                  {seg.text}
                </span>
              ))}
            </h3>
          </div>
          <p
            className="text-muted-foreground max-w-sm text-sm leading-relaxed"
            style={{ fontWeight: 300 }}
          >
            {t("home.services.subheading")}
          </p>
        </motion.div>

        <div className="border-b border-primary/10">
          {services.map((s, i) => (
            <ServiceRow key={s.no} service={s} index={i} />
          ))}
        </div>

        <div className="flex justify-center mt-12 md:mt-16">
          <Magnetic>
            <Link to={buildPath(language, "/services")} className="btn-gold whitespace-nowrap">
              {t("services.cta")}
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
