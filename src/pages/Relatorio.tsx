import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { ReportDocument } from "@/components/lealia/ReportDocument";
import { descarregarRelatorioPdf } from "@/lib/report-pdf";
import type { ReportData } from "@/lib/report-data";

type RespostaOk = {
  ok: true;
  modo: "teaser" | "completo";
  pdfUrl?: string | null;
  relatorio: ReportData;
};
type RespostaErro = { ok: false; motivo?: string };
type Resposta = RespostaOk | RespostaErro;

const CALENDLY = "https://calendly.com/d/d3qm-jpm-t5x/valuation-full-report";

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

  const head = (
    <Helmet>
      <title>Relatório de avaliação | Lealia Advisory Partners</title>
      <meta
        name="description"
        content="Relatório personalizado de avaliação indicativa da sua empresa, com metodologia, drivers de valor e recomendações de preparação."
      />
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
  );

  if (!dados) {
    return (
      <>
        {head}
        <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-3 px-6 text-center">
          <p className="text-sm tracking-[0.25em] uppercase text-muted-foreground">A carregar relatório…</p>
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
          <h1 className="font-serif text-3xl">
            {expirado ? "Este relatório expirou" : "Relatório não encontrado"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {expirado
              ? "O acesso a este relatório era válido durante 7 dias. Agende uma reunião de 20 minutos para rever o relatório completo com a equipa Lealia."
              : "O link poderá estar incompleto ou já não ser válido. Pode gerar uma nova avaliação a qualquer momento."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {expirado && (
              <a href={CALENDLY} target="_blank" rel="noreferrer" className="btn-primary">
                Agendar reunião de 20 minutos
              </a>
            )}
            <Link to="/valuation" className={expirado ? "btn-outline" : "btn-primary"}>
              Voltar à ferramenta
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
            <p className="font-serif text-lg">Relatório de avaliação — {dados.relatorio.empresa}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/valuation" className="text-xs underline underline-offset-4 opacity-80">
              Voltar
            </Link>
            <a
              href={dados.pdfUrl ?? undefined}
              onClick={(e) => {
                if (!dados.pdfUrl) {
                  e.preventDefault();
                  window.print();
                }
              }}
              target={dados.pdfUrl ? "_blank" : undefined}
              rel="noreferrer"
              className="btn-primary"
            >
              Descarregar PDF
            </a>
          </div>
        </div>
        <ReportDocument d={dados.relatorio} modo={dados.modo} />
      </div>
    </>
  );
};

export default Relatorio;
