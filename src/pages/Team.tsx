import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SEOHead from "@/components/SEOHead";
import teamMember1 from "@/assets/Ricardo_cut.jpeg";
import teamMember2 from "@/assets/Duarte_cut.jpeg";
import { SplitText } from "@/components/motion/SplitText";
import { Magnetic } from "@/components/motion/MagneticButton";

const Team = () => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const teamMembers = [
    {
      id: "ricardo-nascimento-ferreira",
      name: "Ricardo Nascimento Ferreira",
      role: t("teampage.role"),
      email: "ricardo.ferreira@lealiaap.com",
      linkedin: "https://www.linkedin.com/in/ricardo-a-n-ferreira/",
      linkedinPath: "/ricardo-a-n-ferreira",
      image: teamMember1,
      bio: [t("teampage.bio1.p1"), t("teampage.bio1.p2"), t("teampage.bio1.p3"), t("teampage.bio1.p4")],
    },
    {
      id: "duarte-rocha-pereira",
      name: "Duarte Rocha Pereira",
      role: t("teampage.role"),
      email: "duarte.pereira@lealiaap.com",
      linkedin: "https://www.linkedin.com/in/duarte-rocha-pereira/",
      linkedinPath: "/duarte-rocha-pereira",
      image: teamMember2,
      bio: [t("teampage.bio2.p1"), t("teampage.bio2.p2"), t("teampage.bio2.p3"), t("teampage.bio2.p4")],
    },
  ];

  return (
    <>
      <SEOHead slug="team" />

      {/* Editorial Hero */}
      <section ref={heroRef} className="relative overflow-hidden grain" style={{ background: "var(--gradient-hero)" }}>
        <div
          className="absolute -top-32 -left-20 w-[460px] h-[460px] rounded-full float-slow pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.16), transparent 70%)" }}
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
            <span className="eyebrow mb-8">{t("nav.team")}</span>
            <SplitText
              as="h1"
              className="text-5xl md:text-6xl lg:text-7xl font-heading text-primary tracking-tight leading-[1.05] mb-8 mt-6"
              highlightLast={1}
            >
              {t("teampage.title")}
            </SplitText>
            <p className="text-lg md:text-xl text-muted-foreground font-body font-light leading-relaxed max-w-3xl">
              {t("teampage.intro")}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Team Members */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 md:space-y-40">
          {teamMembers.map((member, index) => {
            const isEven = index % 2 === 0;

            const imageBlock = (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                className="relative group"
              >
                <div
                  className={`absolute -inset-4 rounded-2xl blur-2xl transition-opacity duration-700 group-hover:opacity-100 opacity-60 ${
                    isEven
                      ? "bg-gradient-to-br from-accent/25 to-transparent"
                      : "bg-gradient-to-bl from-primary/15 to-accent/15"
                  }`}
                />
                <div className="relative overflow-hidden rounded-2xl shadow-[var(--shadow-elegant)]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-[4/5] object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                </div>
              </motion.div>
            );

            const contactsBlock = (
              <div className="flex flex-col gap-6 pt-6 border-t border-border/60">
                <a
                  href={`mailto:${member.email}`}
                  className="group flex items-center gap-3 text-sm text-foreground hover:text-accent transition-colors"
                >
                  <Mail className="w-4 h-4 text-accent" />
                  <span className="font-body link-underline break-all">{member.email}</span>
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm text-foreground hover:text-accent transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-accent" />
                  <span className="font-body link-underline">{member.linkedinPath}</span>
                </a>
              </div>
            );

            const nameBlock = (
              <>
                <span className="eyebrow mb-5">Partner</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-primary tracking-tight mt-4 mb-3 leading-tight">
                  {member.name}
                </h2>
                <p className="serif-accent text-lg md:text-xl text-accent">{member.role}</p>
              </>
            );

            const bioBlock = (
              <div className="space-y-5 font-body font-light text-muted-foreground leading-relaxed">
                {member.bio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            );

            return (
              <motion.article
                id={member.id}
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                {/* Small screens: name/role -> image -> contacts -> bio */}
                <div className="sm:hidden flex flex-col gap-8">
                  <div>{nameBlock}</div>
                  <div>{imageBlock}</div>
                  {contactsBlock}
                  {bioBlock}
                </div>

                {/* sm+ alternating two-column layout */}
                <div className="hidden sm:grid sm:grid-cols-12 sm:gap-8 lg:gap-16 sm:items-center">
                  {isEven ? (
                    <>
                      <div className="sm:col-span-5 flex flex-col gap-8">
                        {imageBlock}
                        {contactsBlock}
                      </div>
                      <div className="sm:col-span-7">
                        {nameBlock}
                        <div className="mt-8">{bioBlock}</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="sm:col-span-7">
                        {nameBlock}
                        <div className="mt-8">{bioBlock}</div>
                      </div>
                      <div className="sm:col-span-5 flex flex-col gap-8">
                        {imageBlock}
                        {contactsBlock}
                      </div>
                    </>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24 md:py-32" style={{ background: "var(--gradient-dark)" }}>
        <div
          className="absolute -top-20 right-1/4 w-[400px] h-[400px] rounded-full float-slow pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.18), transparent 70%)" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-primary-foreground tracking-tight mb-6 leading-tight">
            {t("teampage.cta").split(" ").slice(0, -1).join(" ")}{" "}
            <span className="serif-accent text-accent">{t("teampage.cta").split(" ").slice(-1)}</span>
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/70 font-body font-light leading-relaxed mb-12 max-w-2xl mx-auto">
            {t("teampage.cta.desc")}
          </p>
          <Magnetic>
            <button onClick={() => (window.location.href = "/#contact")} className="btn-gold group">
              {t("nav.contact")}
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Magnetic>
        </motion.div>
      </section>
    </>
  );
};

export default Team;
