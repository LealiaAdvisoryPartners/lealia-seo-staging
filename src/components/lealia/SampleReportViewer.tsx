import { lazy, Suspense, useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { pageCopy } from "@/translations/valuation-page";
import type { Language } from "@/contexts/language-context";
// pdf.js só é descarregado quando o visualizador abre.
const PdfCanvasPages = lazy(() => import("./PdfCanvasPages").then((m) => ({ default: m.PdfCanvasPages })));

const PDFS: Record<Language, string> = {
  pt: "/sample-report/sample-report-pt.pdf",
  en: "/sample-report/sample-report-en.pdf",
  es: "/sample-report/sample-report-es.pdf",
};

const LABELS: Record<Language, string> = { pt: "PT", en: "EN", es: "ES" };

type Props = { open: boolean; onClose: () => void };

export function SampleReportViewer({ open, onClose }: Props) {
  const { language } = useLanguage();
  const [docLang, setDocLang] = useState<Language>(language);
  const c = pageCopy[language].sampleReport.viewer;

  useEffect(() => setDocLang(language), [language]);

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
    <div className="sample-viewer fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-sm">
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
                onClick={() => setDocLang(l)}
                className={`rounded-full px-4 py-1.5 text-xs tracking-widest transition-colors ${
                  l === docLang
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
        className="relative flex-1 overflow-y-auto bg-secondary/40 px-4 py-6"
        onContextMenu={(e) => e.preventDefault()}
      >
        <Suspense fallback={null}><PdfCanvasPages key={docLang} src={PDFS[docLang]} /></Suspense>
      </div>
    </div>
  );
}
