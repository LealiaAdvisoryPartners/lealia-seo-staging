import { ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildPath, stripLanguage } from "@/lib/routing";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const languages = [
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
    { code: "pt", label: "PT" },
  ];

  const activeLang = languages.find((l) => l.code === language);
  const otherLangs = languages.filter((l) => l.code !== language);

  const changeLanguage = (nextLang: "en" | "pt" | "es") => {
    // Update context (sets localStorage + nf_country cookie)
    setLanguage(nextLang);

    // Get current path without language prefix
    const currentPath = stripLanguage(location.pathname);
    
    // Build new path with new language
    const newPath = buildPath(nextLang, currentPath);
    
    // Navigate using React Router (no page reload)
    navigate(newPath, { replace: true });
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          className={`flex items-center gap-1 font-body font-medium transition-colors hover:text-accent text-foreground`}
        >
          {activeLang?.code.toUpperCase()}
          <ChevronDown className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-fit w-auto">
        {otherLangs.map((lang) => (
          <DropdownMenuItem key={lang.code} asChild className="hover:bg-transparent hover:text-accent focus:bg-transparent focus:text-accent cursor-pointer">
            {/* Link real para a página equivalente; o clique mantém a navegação sem recarregar. */}
            <a
              href={buildPath(lang.code as "en" | "pt" | "es", stripLanguage(location.pathname))}
              hrefLang={lang.code === "en" ? "en" : lang.code === "pt" ? "pt-PT" : "es-ES"}
              onClick={(e) => {
                e.preventDefault();
                changeLanguage(lang.code as "en" | "pt" | "es");
              }}
            >
              {lang.label}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
