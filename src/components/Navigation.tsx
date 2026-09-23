import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "./LanguageToggle";
import { buildPath, stripLanguage } from "@/lib/routing";
import { Magnetic } from "@/components/motion/MagneticButton";
import logoHeader from "@/assets/Logo_text_biggerfont_samesize_2.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t, language } = useLanguage();

  const basePaths = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.services"), path: "/services" },
    { name: t("nav.team"), path: "/team" },
    { name: t("nav.valuation"), path: "/valuation" },
  ];

  // Build language-prefixed paths
  const navLinks = basePaths.map((link) => ({
    ...link,
    path: buildPath(language, link.path),
  }));

  const isActive = (path: string) => {
    const currentPath = stripLanguage(location.pathname);
    const linkPath = stripLanguage(path);
    return currentPath === linkPath || (currentPath === "" && linkPath === "/");
  };

  const scrollToContact = () => {
    window.location.href = `${buildPath(language, "/")}#contact`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to={buildPath(language, "/")} className="flex items-center transition-opacity hover:opacity-80">
            <img src={logoHeader} alt="Lealia Advisory Partners" className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isValuationLink = stripLanguage(link.path) === "/valuation";
              const activeClass = isActive(link.path) ? "text-accent" : "text-foreground/80";
              const linkClass = isValuationLink
                ? `text-sm tracking-wide font-body transition-colors hover:text-accent border border-accent rounded-full px-3 py-1 bg-transparent ${activeClass}`
                : `text-sm tracking-wide font-body link-underline transition-colors hover:text-accent ${activeClass}`;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={linkClass}
                  style={{ fontWeight: 400 }}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Language Toggle */}
            <LanguageToggle />

            {/* Contact Us button styled like btn-gold */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Magnetic>
                <Button onClick={scrollToContact} className="btn-gold">
                  {t("nav.contact")}
                </Button>
              </Magnetic>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 font-body font-medium transition-colors hover:bg-secondary rounded-md ${
                  isActive(link.path) ? "text-accent bg-secondary" : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Language Toggle Mobile */}
            <div className="px-4 py-2 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Language:</span>
              <LanguageToggle />
            </div>

            {/* Mobile Contact Us button styled like btn-gold */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className=""
            >
              <Button
                onClick={() => {
                  setIsOpen(false);
                  scrollToContact();
                }}
                className="btn-gold w-full text-center"
              >
                {t("nav.contact")}
              </Button>
            </motion.div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
