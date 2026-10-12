import { useEffect, useRef, useState } from "react";
import { CreditCard, Loader2, Lock, Mail, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { checkoutCopy } from "@/translations/checkout";
import { consultarPagamento, criarPagamento, type EstadoPagamento, type MetodoPagamento } from "@/lib/payments";

type Fase = "form" | "aguardar" | "pago" | "encaminhar";

const MOTIVOS: Record<string, keyof ReturnType<typeof textos>["errors"]> = {
  telemovel_invalido: "phone",
  referencia_invalida: "missingRef",
  submissao_inexistente: "notFound",
  falha_gateway: "gateway",
};

const textos = (lang: "pt" | "en" | "es") => checkoutCopy[lang];

export function UpgradeCheckout({
  referencia,
  telefone: _telefone,
  reportUrl,
  onPago,
  layout = "wide",
}: {
  /** Slug ou token público da avaliação a que o pagamento fica associado. */
  referencia: string | null;
  telefone?: string | null;
  reportUrl?: string | null;
  onPago?: () => void;
  /** "stacked" mantém tudo numa coluna (para uso lado a lado com outro bloco). */
  layout?: "wide" | "stacked";
}) {
  const { language } = useLanguage();
  const c = checkoutCopy[language];

  const metodo: MetodoPagamento = "credit_card";
  const [comFatura, setComFatura] = useState(false);
  const [nif, setNif] = useState("");
  const [nomeFiscal, setNomeFiscal] = useState("");
  const [morada, setMorada] = useState("");
  // Regresso da Stripe: ?pagamento=sucesso&pedido=LP… → confirmar o estado.
  const retorno = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const pedidoRetorno = retorno?.get("pagamento") === "sucesso" ? retorno.get("pedido") : null;
  const [fase, setFase] = useState<Fase>(pedidoRetorno ? "aguardar" : "form");
  const [erro, setErro] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(pedidoRetorno);
  const [urlCompleto, setUrlCompleto] = useState<string | null>(null);
  // Pago antes da libertação: o relatório ainda está em elaboração (mesma regra dos e-mails).
  const [disponivel, setDisponivel] = useState(true);
  const sondagem = useRef<number | null>(null);

  // Enquanto o cliente autoriza no telemóvel, vamos perguntando pelo estado.
  useEffect(() => {
    if (fase !== "aguardar" || !orderId) return;
    const parar = () => {
      if (sondagem.current) window.clearInterval(sondagem.current);
      sondagem.current = null;
    };
    const verificar = async () => {
      const resposta = await consultarPagamento(orderId);
      const estado: EstadoPagamento | null = resposta?.estado ?? null;
      if (estado === "paid") {
        parar();
        setDisponivel(!!resposta?.disponivel);
        setFase("pago");
        onPago?.();
      } else if (estado === "failed" || estado === "expired") {
        parar();
        setFase("form");
        setErro(c.errors.declined);
      }
    };
    void verificar();
    sondagem.current = window.setInterval(verificar, 3000);
    return parar;
  }, [fase, orderId, c.errors.declined, onPago]);

  const pagar = async () => {
    if (!referencia) return setErro(c.errors.missingRef);

    setErro(null);
    setFase("encaminhar");

    const resposta = await criarPagamento({
      ref: referencia,
      metodo,
      idioma: language,
      nif: comFatura ? nif : null,
      nome_fiscal: comFatura ? nomeFiscal : null,
      morada_fiscal: comFatura ? morada : null,
    });

    if (!resposta?.ok) {
      if (resposta?.erro === "ja_pago") {
        setFase("pago");
        setUrlCompleto(reportUrl ?? null);
        return;
      }
      const chave = MOTIVOS[resposta?.erro ?? ""] ?? "generic";
      setErro(c.errors[chave]);
      setFase("form");
      return;
    }

    setOrderId(resposta.orderId ?? null);
    if (resposta.paymentUrl) {
      window.location.href = resposta.paymentUrl;
      return;
    }
  };

  if (fase === "pago") {
    return (
      <div className="card-elegant p-8 text-center sm:p-12">
        <p className="eyebrow">{c.eyebrow}</p>
        <h3 className="section-title mt-4 text-2xl md:text-3xl">{c.paidTitle}</h3>
        <p className="mt-4 text-sm leading-relaxed font-light text-muted-foreground">
          {disponivel ? c.paidText : c.paidPendingText}
        </p>
        {!disponivel && (
          <p className="mt-3 text-xs leading-relaxed font-light text-muted-foreground">{c.paidPendingInvoice}</p>
        )}
        {disponivel && (urlCompleto ?? reportUrl) && (
          <a className="btn-primary mt-8 inline-block" href={(urlCompleto ?? reportUrl) as string}>
            {c.openReport}
          </a>
        )}
      </div>
    );
  }

  const s = c.summary;
  const compacto = layout === "stacked";

  const resumo = compacto ? (
    <div className="w-full">
      <p className="flex">
        <span className="eyebrow">{c.eyebrow}</span>
      </p>
      <h2 className="section-title mt-4 text-3xl md:text-5xl">{c.heading}</h2>
    </div>
  ) : (
    <div className="lg:sticky lg:top-28">
      <p className="text-[10px] tracking-[0.28em] text-accent">{s.brand}</p>
      <h1 className="section-title mt-5 text-3xl md:text-4xl">{c.heading}</h1>
      <p className="mt-5 text-sm leading-relaxed font-light text-muted-foreground">{c.lead}</p>

      <div className="mt-8 border border-border bg-background/60 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm">{s.product}</p>
            {referencia && (
              <p className="mt-1 text-xs font-light text-muted-foreground">
                {s.reference}: <span className="font-mono text-foreground/80">{referencia}</span>
              </p>
            )}
          </div>
          <p className="serif-accent text-2xl text-accent">299 €</p>
        </div>
        <p className="mt-3 text-[11px] tracking-wide uppercase text-muted-foreground">{c.priceNote}</p>
      </div>

      <ul className="mt-8 space-y-3 text-xs font-light text-muted-foreground">
        <li className="flex items-center gap-3">
          <Lock className="h-4 w-4 text-accent" />
          {s.secure}
        </li>
        <li className="flex items-center gap-3">
          <ShieldCheck className="h-4 w-4 text-accent" />
          {s.confidential}
        </li>
        <li className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-accent" />
          {s.support}
        </li>
      </ul>
    </div>
  );

  const painel = (
    <div className="card-elegant p-6 shadow-[0_30px_60px_-30px_hsl(var(--primary)/0.35)] sm:p-8">
      {compacto && (
        <div className="mb-6 border-b border-border pb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm">{s.product}</p>
              {referencia && (
                <p className="mt-1 text-xs font-light text-muted-foreground">
                  {s.reference}: <span className="font-mono text-foreground/80">{referencia}</span>
                </p>
              )}
            </div>
            <p className="serif-accent text-2xl text-accent">299 €</p>
          </div>
        </div>
      )}
      <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">{s.paymentTitle}</p>

      {fase === "encaminhar" ? (
        <div className="mt-8 flex items-center gap-3 text-sm font-light text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-accent" />
          {c.redirectText}
        </div>
      ) : fase === "aguardar" ? (
        <div className="mt-8">
          <h3 className="text-xl">{c.waitingTitle}</h3>
          <p className="mt-3 text-sm leading-relaxed font-light text-muted-foreground">{c.waitingText}</p>
          <div className="mt-6 h-[2px] w-full overflow-hidden bg-border">
            <div className="h-full w-1/3 animate-[pulse_1.6s_ease-in-out_infinite] bg-accent" />
          </div>
        </div>
      ) : (
        <div className="mt-5">
          <div className="flex items-center justify-between gap-3 border border-accent/60 bg-accent/5 px-4 py-4">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm">{c.methods.card}</p>
                <p className="text-xs font-light text-muted-foreground">{c.methods.cardNote}</p>
              </div>
            </div>
            <span className="h-3 w-3 rounded-full border-[3px] border-accent" />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {["VISA", "Mastercard", "Amex", "Apple Pay", "Google Pay"].map((m) => (
              <span key={m} className="border border-border px-2 py-1 text-[10px] tracking-wide text-muted-foreground">
                {m}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setComFatura(!comFatura)}
            className="mt-6 flex w-full items-center justify-between gap-4 border-t border-border pt-5 text-left"
            aria-pressed={comFatura}
          >
            <span>
              <span className="block text-sm">{c.invoiceToggle}</span>
              <span className="mt-1 block text-xs font-light text-muted-foreground">{c.invoiceNote}</span>
            </span>
            <span
              className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${comFatura ? "bg-accent" : "bg-border"}`}
            >
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-background transition-all ${comFatura ? "left-[18px]" : "left-0.5"}`}
              />
            </span>
          </button>

          {comFatura && (
            <div className="mt-5 space-y-3 animate-fade-in">
              {[
                { label: c.nifLabel, value: nif, set: setNif },
                { label: c.fiscalNameLabel, value: nomeFiscal, set: setNomeFiscal },
                { label: c.addressLabel, value: morada, set: setMorada },
              ].map((campo) => (
                <label key={campo.label} className="block">
                  <span className="text-[11px] tracking-wide uppercase text-muted-foreground">{campo.label}</span>
                  <input
                    value={campo.value}
                    onChange={(e) => campo.set(e.target.value)}
                    className="mt-1.5 w-full border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent"
                  />
                </label>
              ))}
            </div>
          )}

          {erro && <p className="mt-5 text-sm text-destructive">{erro}</p>}

          <button
            type="button"
            className="btn-primary mt-7 flex w-full items-center justify-center gap-2 disabled:cursor-wait disabled:opacity-60"
            onClick={pagar}
            disabled={!referencia}
          >
            <Lock className="h-4 w-4" />
            {s.cta}
          </button>

          <p className="mt-4 text-center text-[11px] leading-relaxed font-light text-muted-foreground">
            {s.invoiceInfo}
          </p>
          <p className="mt-2 text-center text-[11px] leading-relaxed font-light text-muted-foreground">{c.terms}</p>
          <p className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5" />
            Stripe
          </p>
        </div>
      )}
    </div>
  );

  return compacto ? (
    <div className="grid gap-6">
      {resumo}
      {painel}
    </div>
  ) : (
    <div className="grid items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
      {resumo}
      {painel}
    </div>
  );
}
