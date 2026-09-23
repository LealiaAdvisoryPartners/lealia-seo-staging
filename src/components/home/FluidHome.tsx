import { useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import ContactForm from "@/components/home/ContactForm";
import FluidBackdrop from "@/components/home/FluidBackdrop";
import HeroSection from "@/components/home/sections/HeroSection";
import ManifestoSection from "@/components/home/sections/ManifestoSection";
import ServicesSection from "@/components/home/sections/ServicesSection";
import TeamSection from "@/components/home/sections/TeamSection";
import ValuesSection from "@/components/home/sections/ValuesSection";

/**
 * One continuous, scroll-driven cinematic home.
 * A single scroll progress value drives the morphing backdrop; each act lives
 * in its own file under `sections/`.
 */
const FluidHome = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });

  return (
    <div ref={ref} className="relative">
      <FluidBackdrop progress={progress} />
      <HeroSection />
      <ManifestoSection />
      <ServicesSection />
      <TeamSection />
      <ValuesSection />
      <div className="relative">
        <ContactForm />
      </div>
    </div>
  );
};

export default FluidHome;
