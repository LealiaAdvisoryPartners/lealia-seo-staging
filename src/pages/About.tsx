import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildPath } from "@/lib/routing";
import SEOHead from "@/components/SEOHead";
import aboutStory from "@/assets/about-story.jpg";
import { ArrowRight } from "lucide-react";
import { SplitText } from "@/components/motion/SplitText";

const About = () => {
  const { t, language } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  const whyUsItems = [
    { title: t("about.whyus.expertise"), content: t("about.whyus.expertise.desc") },
    { title: t("about.whyus.tailored"), content: t("about.whyus.tailored.desc") },
    { title: t("about.whyus.track"), content: t("about.whyus.track.desc") },
    { title: t("about.whyus.client"), content: t("about.whyus.client.desc") },
  ];

  return (
    <>
      <SEOHead slug="about" />

      {/* Editorial Hero */}
      <section ref={heroRef} className="relative overflow-hidden grain" style={{ background: "var(--gradient-hero)" }}>
        {/* Floating orbs */}
        <div
          className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full float-slow pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.18), transparent 70%)" }}
        />
        <div
          className="absolute -bottom-40 -left-32 w-[420px] h-[420px] rounded-full float-slow pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.10), transparent 70%)",
            animationDelay: "3s",
          }}
        />

        <motion.div
          style={{ y, opacity }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-12 md:pb-16 relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <span className="eyebrow mb-8">{t("nav.about")}</span>
            <SplitText
              as="h1"
              className="text-5xl md:text-6xl lg:text-7xl font-heading text-primary tracking-tight leading-[1.05] mb-8 mt-6"
              highlightLast={1}
            >
              {t("about.title")}
            </SplitText>
            <p className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed font-light max-w-3xl">
              {t("about.intro")}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Us */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12"
          >
            <div className="lg:col-span-4">
              <span className="eyebrow mb-6">02 — Approach</span>
              <h2 className="section-title mt-4">
                {t("about.whyus.title").split(" ")[0]}{" "}
                <span className="serif-accent text-accent">{t("about.whyus.title").split(" ").slice(1).join(" ")}</span>
              </h2>
            </div>

            <div className="lg:col-span-8">
              <Accordion type="single" collapsible className="space-y-3">
                {whyUsItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                  >
                    <AccordionItem value={`item-${index}`} className="gradient-border px-6 border-0 overflow-hidden">
                      <AccordionTrigger className="text-lg md:text-xl font-heading font-light text-primary hover:text-accent hover:no-underline py-6">
                        <span className="flex items-center gap-5 text-left">
                          <span className="text-xs text-accent tracking-[0.2em]">0{index + 1}</span>
                          {item.title}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground font-body font-light leading-relaxed pb-6 pl-12">
                        {item.content}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="relative py-24 md:py-32 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <span className="eyebrow mb-6">03 — Origin</span>
            <h2 className="section-title mt-4 max-w-3xl">
              {t("about.story.title").split(" ").slice(0, -1).join(" ")}{" "}
              <span className="serif-accent text-accent">{t("about.story.title").split(" ").slice(-1)}</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative"
            >
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-accent/20 to-transparent blur-2xl" />
              <img
                src={aboutStory}
                alt="Lealia Advisory Partners Team"
                className="relative rounded-2xl shadow-[var(--shadow-elegant)] w-full"
              />
            </motion.div>

            <div className="lg:col-span-7 space-y-6 font-body font-light text-muted-foreground leading-relaxed text-lg">
              <p>{t("about.story.p1")}</p>
              <p>{t("about.story.p2")}</p>
              <p>{t("about.story.p3")}</p>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="pt-6"
              >
                <a
                  href={buildPath(language, "/services")}
                  className="group inline-flex items-center gap-3 text-primary font-heading font-semibold text-base tracking-wide link-underline"
                >
                  {t("about.servicesLink")}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
