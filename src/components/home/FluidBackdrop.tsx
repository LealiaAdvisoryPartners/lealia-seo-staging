import { motion, useTransform, useMotionTemplate, MotionValue } from "framer-motion";

/**
 * Global animated backdrop that morphs hue/lightness with scroll progress.
 */
const FluidBackdrop = ({ progress }: { progress: MotionValue<number> }) => {
  // Morph through palette stops as we scroll
  const bg1 = useTransform(
    progress,
    [0, 0.25, 0.5, 0.75, 1],
    ["#FAF7F2", "#F1ECE4", "#0D1428", "#0A1020", "#FAF7F2"]
  );
  const orbX = useTransform(progress, [0, 1], ["10%", "85%"]);
  const orbY = useTransform(progress, [0, 0.5, 1], ["10%", "70%", "20%"]);
  const orb2X = useTransform(progress, [0, 1], ["80%", "15%"]);
  const orb2Y = useTransform(progress, [0, 0.5, 1], ["80%", "20%", "70%"]);
  const orbScale = useTransform(progress, [0, 0.5, 1], [1, 1.4, 1]);
  const accentOpacity = useTransform(progress, [0, 0.45, 0.55, 1], [0.18, 0.35, 0.35, 0.18]);
  const orb2Opacity = useTransform(progress, [0, 0.5, 1], [0.25, 0.5, 0.25]);
  const gridOpacity = useTransform(progress, [0, 0.4, 0.6, 1], [0.05, 0.02, 0.04, 0.06]);
  const gridColor = useTransform(progress, [0, 0.4, 0.6, 1], ["#0D1428", "#0D1428", "#E6C77A", "#0D1428"]);
  const gridMask = useMotionTemplate`linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`;

  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ backgroundColor: bg1 }}
    >
      <motion.div
        className="absolute w-[55vw] h-[55vw] rounded-full will-change-transform"
        style={{
          left: orbX,
          top: orbY,
          x: "-50%",
          y: "-50%",
          scale: orbScale,
          opacity: accentOpacity,
          background: "radial-gradient(circle, hsl(36 70% 58% / 0.75), transparent 65%)",
          filter: "blur(40px)",
        }}
      />
      <motion.div
        className="absolute w-[60vw] h-[60vw] rounded-full will-change-transform"
        style={{
          left: orb2X,
          top: orb2Y,
          x: "-50%",
          y: "-50%",
          scale: orbScale,
          opacity: orb2Opacity,
          background: "radial-gradient(circle, hsl(220 60% 22% / 0.55), transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: gridOpacity,
          backgroundImage: gridMask,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      {/* film grain */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </motion.div>
  );
};

export default FluidBackdrop;
