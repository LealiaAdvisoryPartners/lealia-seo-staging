import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { ReportDocument } from "@/components/lealia/report";
import { descarregarRelatorioPdf } from "@/lib/report-pdf";
import { isLanguage } from "@/lib/routing";
import { reportPageCopy } from "@/translations/report-page";
import type { ReportData } from "@core/report-data";

type RespostaOk = { ok: true; modo: "teaser" | "completo"; pdfUrl?: string | null; relatorio: ReportData };
type RespostaErro = { ok: false; motivo?: string };
type Resposta = RespostaOk | RespostaErro;

const CALENDLY = "https://calendly.com/lealiaap-drp/valuationcall";

const Relatorio = () => {
  const { token } = useParams<{ token: string }>();
  const chave = useSearchParams()[0].get("k");
  const [dados, setDados] = useState<Resposta | null>(null);
  const [aGerarPdf, setAGerarPdf] = useState(false);

  // Enquanto o relatório está aberto, o body usa o layout de impressão.
  useEffect(() => {
    document.body.classList.add("printing-report");
    return () => document.body.classList.remove("printing-report");
  }, []);

  useEffect(() => {
    let ativo = true;
    (async () => {
      if (!token) return setDados({ ok: false });
      const { data, error } = await supabase.functions.invoke("obter-relatorio", {
        body: { token, chave: chave ?? null },
      });
      if (ativo) setDados(error || !data ? { ok: false } : (data as Resposta));
    })();
    return () => {
      ativo = false;
    };
  }, [token, chave]);

  // O relatório traz congelado o idioma escolhido na submissão.
  const lang = dados?.ok && isLanguage(dados.relatorio.lang) ? dados.relatorio.lang : "pt";
  const c = reportPageCopy[lang];

  const head = (
    <Helmet>
      <title>{c.seoTitle}</title>
      <meta name="description" content={c.seoDescription} />
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
  );

  const descarregar = async () => {
    if (!dados?.ok) return;
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
  };

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
            <button type="button" disabled={aGerarPdf} onClick={descarregar} className="btn-primary disabled:opacity-60">
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
