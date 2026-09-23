import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildPath } from "@/lib/routing";
import { Magnetic } from "@/components/motion/MagneticButton";
import { parseInline } from "@/components/home/textParsing";
import teamMember1 from "@/assets/Ricardo_cut.jpeg";
import teamMember2 from "@/assets/Duarte_cut.jpeg";

const teamMembers = [
  {
    id: "ricardo-nascimento-ferreira",
    name: "Ricardo Nascimento Ferreira",
    image: teamMember1,
    email: "ricardo.ferreira@lealiaap.com",
    linkedin: "https://www.linkedin.com/in/ricardo-a-n-ferreira/",
  },
  {
    id: "duarte-rocha-pereira",
    name: "Duarte Rocha Pereira",
    image: teamMember2,
    email: "duarte.pereira@lealiaap.com",
    linkedin: "https://www.linkedin.com/in/duarte-rocha-pereira/",
  },
];

type TeamMember = (typeof teamMembers)[number];

const TeamCard = ({ member, index, role, href }: { member: TeamMember; index: number; role: string; href: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`group ${index === 1 ? "md:mt-20" : ""}`}
    >
      <Link to={href} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-secondary aspect-[4/5]">
          <motion.img
            src={member.image}
            alt={member.name}
            style={{ y }}
            className="absolute inset-0 w-full h-[120%] object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-700" />
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
            <span className="text-[10px] uppercase tracking-[0.3em] text-accent">{role}</span>
            <h4 className="font-heading text-primary-foreground mt-2" style={{ fontSize: "clamp(1.125rem, 1.6vw, 1.5rem)", fontWeight: 400, letterSpacing: "-0.01em" }}>
              {member.name}
            </h4>
            <div className="flex gap-2 mt-4">
              <a href={`mailto:${member.email}`} onClick={(e) => e.stopPropagation()} className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-primary-foreground/30 text-primary-foreground hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-500" aria-label="Email">
                <Mail className="w-3.5 h-3.5" strokeWidth={1.5} />
              </a>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-primary-foreground/30 text-primary-foreground hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-500" aria-label="LinkedIn">
                <Linkedin className="w-3.5 h-3.5" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

/* ---------- Act IV: Team — cinematic dark ---------- */
const TeamSection = () => {
  const { t, language } = useLanguage();

  return (
    <section className="relative py-14 md:py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 max-w-2xl"
        >
          <span className="eyebrow mb-4">{t("team.title")}</span>
          <h3
            className="font-heading text-primary-foreground mt-4"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3.25rem)", fontWeight: 300, letterSpacing: "-0.025em" }}
          >
            {parseInline(t("home.team.heading")).map((seg, i) => (
              <span
                key={i}
                className={`${seg.italic ? "serif-accent" : ""} ${seg.gold ? "text-accent" : ""}`}
              >
                {seg.text}
              </span>
            ))}
          </h3>
          <p className="text-primary-foreground/65 mt-5 text-base max-w-xl leading-relaxed" style={{ fontWeight: 300 }}>
            {t("team.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-3xl mx-auto">
          {teamMembers.map((m, i) => (
            <TeamCard key={m.id} member={m} index={i} role={t("teampage.role")} href={`${buildPath(language, "/team")}#${m.id}`} />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Magnetic>
            <Link
              to={buildPath(language, "/team")}
              className="group inline-flex items-center gap-3 text-primary-foreground text-xs uppercase tracking-[0.25em]"
            >
              <span className="link-underline">{t("team.cta")}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
