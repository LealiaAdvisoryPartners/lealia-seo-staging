import { useEffect } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { pageCopy } from "@/translations/valuation-page";
import type { Language } from "@/contexts/language-context";

const PDFS: Record<Language, string> = {
  pt: "/sample-report/sample-pt.pdf",
  en: "/sample-report/sample-en.pdf",
  es: "/sample-report/sample-es.pdf",
};

const LABELS: Record<Language, string> = { pt: "PT", en: "EN", es: "ES" };

type Props = { open: boolean; onClose: () => void };

export function SampleReportViewer({ open, onClose }: Props) {
  const { language, setLanguage } = useLanguage();
  const c = pageCopy[language].sampleReport.viewer;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.metaKey || e.ctrlKey) && ["s", "p"].includes(e.key.toLowerCase())) e.preventDefault();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-4 py-4 sm:px-8">
        <div>
          <h3 className="text-lg font-light tracking-wide">{c.title}</h3>
          <p className="mt-1 text-xs font-light text-muted-foreground">{c.note}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 rounded-full border border-border p-1">
            {(Object.keys(PDFS) as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={`rounded-full px-4 py-1.5 text-xs tracking-widest transition-colors ${
                  l === language
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {LABELS[l]}
              </button>
            ))}
          </div>
          <button
            onClick={onClose}
            aria-label={c.close}
            className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        className="relative flex-1 overflow-hidden bg-secondary/40"
        onContextMenu={(e) => e.preventDefault()}
      >
        <iframe
          key={language}
          title={c.title}
          src={`${PDFS[language]}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
