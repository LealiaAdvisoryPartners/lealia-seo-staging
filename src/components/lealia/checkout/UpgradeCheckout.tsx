import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { checkoutCopy } from "@/translations/checkout";
import {
  consultarPagamento,
  criarPagamento,
  type EstadoPagamento,
  type MetodoPagamento,
} from "@/lib/payments";

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
  const sondagem = useRef<number | null>(null);

  // Enquanto o cliente autoriza no telemóvel, vamos perguntando pelo estado.
  useEffect(() => {
    if (fase !== "aguardar" || !orderId) return;
    const parar = () => {
      if (sondagem.current) window.clearInterval(sondagem.current);
      sondagem.current = null;
    };
    const verificar = async () => {
      const estado: EstadoPagamento | null = await consultarPagamento(orderId);
      if (estado === "paid") {
        parar();
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
        <p className="mt-4 text-sm leading-relaxed font-light text-muted-foreground">{c.paidText}</p>
        {(urlCompleto ?? reportUrl) && (
          <a className="btn-primary mt-8 inline-block" href={(urlCompleto ?? reportUrl) as string}>
            {c.openReport}
          </a>
        )}
      </div>
    );
  }

  return (
    <div className={layout === "stacked" ? "grid gap-8" : "grid gap-10 lg:grid-cols-[1.1fr_1fr]"}>
      {/* Valor */}
      <div>
        <p className="eyebrow">{c.eyebrow}</p>
        <h2 className="section-title mt-5 text-3xl md:text-5xl">{c.heading}</h2>
        <p className="body-justified mt-6 text-sm leading-relaxed font-light text-muted-foreground md:text-base">
          {c.lead}
        </p>

        <div className="mt-10">
          <p className="eyebrow">{c.includesTitle}</p>
          <ul className="mt-5 space-y-3">
            {c.includes.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed font-light text-muted-foreground">
                <span aria-hidden className="mt-[0.45rem] h-1 w-4 shrink-0 bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pagamento */}
      <div className="card-elegant p-8 sm:p-10">
        <p className="serif-accent text-3xl text-accent">299 €</p>
        <p className="mt-2 text-xs tracking-wide uppercase text-muted-foreground">{c.priceNote}</p>

        {fase === "encaminhar" ? (
          <p className="mt-10 text-sm font-light text-muted-foreground">{c.redirectText}</p>
        ) : fase === "aguardar" ? (
          <div className="mt-10">
            <h3 className="text-xl">{c.waitingTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed font-light text-muted-foreground">{c.waitingText}</p>
            <div className="mt-6 h-[2px] w-full overflow-hidden bg-border">
              <div className="h-full w-1/3 animate-[pulse_1.6s_ease-in-out_infinite] bg-accent" />
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <p className="text-sm">{c.methods.card}</p>
            <p className="mt-1 text-xs font-light text-muted-foreground">{c.methods.cardNote}</p>

            <label className="mt-6 flex items-start gap-3 text-sm font-light text-muted-foreground">
              <input
                type="checkbox"
                checked={comFatura}
                onChange={(e) => setComFatura(e.target.checked)}
                className="mt-1 accent-[hsl(var(--accent))]"
              />
              <span>
                {c.invoiceToggle}
                <span className="mt-1 block text-xs">{c.invoiceNote}</span>
              </span>
            </label>

            {comFatura && (
              <div className="mt-5 space-y-4">
                {[
                  { label: c.nifLabel, value: nif, set: setNif },
                  { label: c.fiscalNameLabel, value: nomeFiscal, set: setNomeFiscal },
                  { label: c.addressLabel, value: morada, set: setMorada },
                ].map((campo) => (
                  <label key={campo.label} className="block">
                    <span className="text-xs tracking-wide uppercase text-muted-foreground">{campo.label}</span>
                    <input
                      value={campo.value}
                      onChange={(e) => campo.set(e.target.value)}
                      className="mt-2 w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
                    />
                  </label>
                ))}
              </div>
            )}

            {erro && <p className="mt-6 text-sm text-destructive">{erro}</p>}

            <button type="button" className="btn-primary mt-8 w-full" onClick={pagar}>
              {c.submit}
            </button>

            <p className="mt-4 text-xs leading-relaxed font-light text-muted-foreground">{c.terms}</p>
          </div>
        )}
      </div>
    </div>
  );
}
