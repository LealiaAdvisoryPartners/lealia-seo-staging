import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildPath } from "@/lib/routing";
import { Mail, Linkedin, Phone } from "lucide-react";
import { openCookieSettings } from "@/lib/tracking/consent";
import { cookieCopy } from "@/translations/cookie-consent";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t, language } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Left: contact icons */}
          <div className="flex space-x-6">
            <a
              href="mailto:info@lealiaap.com"
              className="text-primary-foreground/60 hover:text-accent transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/lealia-ap/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/60 hover:text-accent transition-colors"
              aria-label="In"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="tel:+351935882323"
              className="text-primary-foreground/60 hover:text-accent transition-colors"
              aria-label="Phone"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>

          {/* Center: copyright */}
          <p className="text-sm text-primary-foreground/60 text-center">
            © {currentYear} Lealia Advisory Partners. {t("footer.copyright")}
          </p>

          {/* Right: legal links */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
            <Link to={buildPath(language, "/privacy")} className="text-primary-foreground/60 hover:text-accent transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link to={buildPath(language, "/faq")} className="text-primary-foreground/60 hover:text-accent transition-colors">
              {t("footer.faq")}
            </Link>
            <Link to={buildPath(language, "/terms")} className="text-primary-foreground/60 hover:text-accent transition-colors">
              {t("footer.terms")}
            </Link>
            <button type="button" onClick={openCookieSettings} className="text-primary-foreground/60 hover:text-accent transition-colors">
              {cookieCopy[language].footerLink}
            </button>
            <a href="https://www.livroreclamacoes.pt/Inicio/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-accent transition-colors">
              {t("footer.complaints")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
