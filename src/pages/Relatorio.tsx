import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { ReportDocument } from "@/components/lealia/ReportDocument";
import { descarregarRelatorioPdf } from "@/lib/report-pdf";
import type { ReportData } from "@core/report-data";

type RespostaOk = {
  ok: true;
  modo: "teaser" | "completo";
  pdfUrl?: string | null;
  relatorio: ReportData;
};
type RespostaErro = { ok: false; motivo?: string };
type Resposta = RespostaOk | RespostaErro;

const CALENDLY = "https://calendly.com/d/d3qm-jpm-t5x/valuation-full-report";

type Idioma = "pt" | "en" | "es";

const COPY: Record<Idioma, Record<string, string>> = {
  pt: {
    seoTitle: "Relatório de avaliação | Lealia Advisory Partners",
    seoDescription:
      "Relatório personalizado de avaliação indicativa da sua empresa, com metodologia, drivers de valor e recomendações de preparação.",
    loading: "A carregar relatório…",
    expiredTitle: "Este relatório expirou",
    missingTitle: "Relatório não encontrado",
    expiredText:
      "O acesso a este relatório era válido durante 7 dias. Agende uma reunião de 20 minutos para rever o relatório completo com a equipa Lealia.",
    missingText:
      "O link poderá estar incompleto ou já não ser válido. Pode gerar uma nova avaliação a qualquer momento.",
    schedule: "Agendar reunião de 20 minutos",
    backTool: "Voltar à ferramenta",
    back: "Voltar",
    reportOf: "Relatório de avaliação —",
    download: "Descarregar PDF",
    generating: "A gerar PDF…",
  },
  en: {
    seoTitle: "Valuation report | Lealia Advisory Partners",
    seoDescription:
      "Tailored indicative valuation report for your company, with methodology, value drivers and preparation recommendations.",
    loading: "Loading report…",
    expiredTitle: "This report has expired",
    missingTitle: "Report not found",
    expiredText:
      "Access to this report was valid for 7 days. Book a 20-minute meeting to review the full report with the Lealia team.",
    missingText: "The link may be incomplete or no longer valid. You can request a new valuation at any time.",
    schedule: "Book a 20-minute meeting",
    backTool: "Back to the tool",
    back: "Back",
    reportOf: "Valuation report —",
    download: "Download PDF",
    generating: "Generating PDF…",
  },
  es: {
    seoTitle: "Informe de valoración | Lealia Advisory Partners",
    seoDescription:
      "Informe personalizado de valoración indicativa de su empresa, con metodología, drivers de valor y recomendaciones de preparación.",
    loading: "Cargando informe…",
    expiredTitle: "Este informe ha caducado",
    missingTitle: "Informe no encontrado",
    expiredText:
      "El acceso a este informe era válido durante 7 días. Agende una reunión de 20 minutos para revisar el informe completo con el equipo de Lealia.",
    missingText: "El enlace puede estar incompleto o ya no ser válido. Puede solicitar una nueva valoración cuando quiera.",
    schedule: "Agendar reunión de 20 minutos",
    backTool: "Volver a la herramienta",
    back: "Volver",
    reportOf: "Informe de valoración —",
    download: "Descargar PDF",
    generating: "Generando PDF…",
  },
};

const Relatorio = () => {
  const { token } = useParams<{ token: string }>();
  const [searchParams] = useSearchParams();
  const chave = searchParams.get("k");
  const [dados, setDados] = useState<Resposta | null>(null);
  const [aGerarPdf, setAGerarPdf] = useState(false);

  useEffect(() => {
    document.body.classList.add("printing-report");
    return () => document.body.classList.remove("printing-report");
  }, []);


  useEffect(() => {
    let ativo = true;
    (async () => {
      if (!token) {
        setDados({ ok: false });
        return;
      }
      const { data, error } = await supabase.functions.invoke("obter-relatorio", {
        body: { token, chave: chave ?? null },
      });
      if (!ativo) return;
      if (error || !data) {
        setDados({ ok: false });
        return;
      }
      setDados(data as Resposta);
    })();
    return () => {
      ativo = false;
    };
  }, [token, chave]);

  const langBruto = dados && dados.ok ? (dados.relatorio as { lang?: string }).lang : undefined;
  const lang: Idioma = langBruto === "en" || langBruto === "es" ? langBruto : "pt";
  const c = COPY[lang];

  const head = (
    <Helmet>
      <title>{c.seoTitle}</title>
      <meta name="description" content={c.seoDescription} />
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
  );

  if (!dados) {
    return (
      <>
        {head}
        <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-3 px-6 text-center">
          <p className="text-sm tracking-[0.25em] uppercase text-muted-foreground">{c.loading}</p>
        </div>
      </>
    );
  }

  if (!dados.ok) {
    const expirado = (dados as RespostaErro).motivo === "expirado";
    return (
      <>
        {head}
        <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
          <h1 className="font-serif text-3xl">{expirado ? c.expiredTitle : c.missingTitle}</h1>
          <p className="text-sm text-muted-foreground">{expirado ? c.expiredText : c.missingText}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {expirado && (
              <a href={CALENDLY} target="_blank" rel="noreferrer" className="btn-primary">
                {c.schedule}
              </a>
            )}
            <Link to="/valuation" className={expirado ? "btn-outline" : "btn-primary"}>
              {c.backTool}
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {head}
      <div className="report-shell">
        <div className="report-toolbar print:hidden">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase opacity-70">Lealia Advisory Partners</p>
            <p className="font-serif text-lg">
              {c.reportOf} {dados.relatorio.empresa}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/valuation" className="text-xs underline underline-offset-4 opacity-80">
              {c.back}
            </Link>
            <button
              type="button"
              disabled={aGerarPdf}
              onClick={async () => {
                setAGerarPdf(true);
                try {
                  const nome = `Lealia_Valuation_${dados.relatorio.empresa.replace(/[^\p{L}\p{N}]+/gu, "_")}.pdf`;
                  await descarregarRelatorioPdf(nome);
                } catch (err) {
                  console.error(err);
                  window.print();
                } finally {
                  setAGerarPdf(false);
                }
              }}
              className="btn-primary disabled:opacity-60"
            >
              {aGerarPdf ? c.generating : c.download}
            </button>
          </div>
        </div>
        <ReportDocument d={dados.relatorio} modo={dados.modo} />
      </div>
    </>
  );
};

export default Relatorio;
