import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import SEOHead from "@/components/SEOHead";
import { ServicesSidebar } from "@/components/services/ServicesSidebar";

import { ServicesBuySide } from "@/components/services/ServicesBuySide";
import { ServicesSellSide } from "@/components/services/ServicesSellSide";
import { ServicesPerformance } from "@/components/services/ServicesPerformance";
import { ServicesModeling } from "@/components/services/ServicesModeling";
import { ServicesCTA } from "@/components/services/ServicesCTA";
import { SplitText } from "@/components/motion/SplitText";

const Services = () => {
  const [activeSection, setActiveSection] = useState("buy-side");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const sections = [
    { id: "buy-side", label: t("servicespage.buyside") },
    { id: "sell-side", label: t("servicespage.sellside") },
    { id: "performance", label: t("servicespage.performance") },
    { id: "modeling", label: t("servicespage.modeling") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 100;
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    setMobileNavOpen(false);
  };

  return (
    <>
      <SEOHead slug="services" />

      {/* Editorial hero */}
      <section ref={heroRef} className="relative overflow-hidden grain" style={{ background: "var(--gradient-hero)" }}>
        <div
          className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full float-slow pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.18), transparent 70%)" }}
        />
        <motion.div
          style={{ y }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-12 md:pb-16 relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <span className="eyebrow mb-8">{t("nav.services")}</span>
            <SplitText
              as="h1"
              className="text-5xl md:text-6xl lg:text-7xl font-heading text-primary tracking-tight leading-[1.05] mb-6 mt-6"
              highlightLast={1}
            >
              {t("servicespage.overview.title")}
            </SplitText>
            <div className="space-y-5 max-w-3xl text-lg md:text-xl text-muted-foreground font-body font-light leading-relaxed">
              <p>{t("servicespage.overview.p1")}</p>
              <p>{t("servicespage.overview.p2")}</p>
              <p>{t("servicespage.overview.p3")}</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Page Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
        <div className="flex gap-8">
          <ServicesSidebar
            sections={sections}
            activeSection={activeSection}
            mobileNavOpen={mobileNavOpen}
            setMobileNavOpen={setMobileNavOpen}
            scrollToSection={scrollToSection}
          />

          <main className="flex-1 max-w-4xl">
            <ServicesBuySide />
            <ServicesSellSide />
            <ServicesPerformance />
            <ServicesModeling />
          </main>
        </div>
      </section>

      <ServicesCTA />
    </>
  );
};

export default Services;
