import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo.png";

/* ---------- Act I: Hero ---------- */
const HeroSection = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <section ref={ref} className="relative h-[calc(100vh-4rem)] flex items-center justify-center">
      <motion.div
        style={{ y, opacity, scale, filter }}
        className="relative max-w-5xl mx-auto px-6 w-full flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src={logo} alt="Lealia Advisory Partners" className="w-full max-w-2xl mx-auto" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-muted-foreground text-xs sm:text-sm md:text-base text-center font-body uppercase mt-8"
          style={{ letterSpacing: "0.4em", fontWeight: 300 }}
        >
          {t("hero.services")}
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="h-px w-32 bg-gradient-to-r from-transparent via-accent to-transparent mt-8 origin-center"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-0 right-0 flex justify-center text-muted-foreground/60"
        style={{ opacity }}
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
