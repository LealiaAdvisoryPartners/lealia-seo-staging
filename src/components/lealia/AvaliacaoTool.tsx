import { useEffect, useRef, useState } from "react";
import { ValuationForm, type FormState } from "@/components/lealia/ValuationForm";
import { ThankYouCard } from "@/components/lealia/ThankYouCard";
import { SampleReport } from "@/components/lealia/SampleReport";
import { CalendlyInline } from "@/components/lealia/CalendlyInline";
import { calcularValuation, type ValuationResult } from "@/lib/valuation";
import { parseMoney } from "@/lib/money";
import { registarLead } from "@/lib/leads";

export const CALENDLY_URL = "https://calendly.com/d/d3qm-jpm-t5x/valuation-full-report";

const num = (v: string) => {
  const n = parseMoney(v);
  return n === null ? 0 : n;
};
const optNum = (v: string) => parseMoney(v);

export function AvaliacaoTool() {
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [empresa, setEmpresa] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const sampleRef = useRef<HTMLDivElement>(null);
  const agendarRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  useEffect(() => {
    if (result) scrollTo(resultRef);
  }, [result]);

  const handleSubmit = (data: FormState) => {
    setEmpresa(data.empresa);
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const pct = (v: string) => (v === "" ? null : Number(v));
      const r = calcularValuation({
        pais: data.pais,
        industria: data.industria,
        subindustria: data.subindustria,
        idade_empresa: num(data.idade_empresa),
        ano_referencia: Number(data.ano_referencia) || 2025,
        faturacao_ano1: num(data.faturacao_ano1),
        faturacao_ano2: optNum(data.faturacao_ano2),
        faturacao_ano3: optNum(data.faturacao_ano3),
        ebitda_ano1: num(data.ebitda_ano1),
        ebitda_ano2: optNum(data.ebitda_ano2),
        ebitda_ano3: optNum(data.ebitda_ano3),
        despesas_extraordinarias_ano1: num(data.despesas_extraordinarias_ano1),
        despesas_extraordinarias_ano2: num(data.despesas_extraordinarias_ano2),
        despesas_extraordinarias_ano3: num(data.despesas_extraordinarias_ano3),
        caixa_e_depositos: optNum(data.caixa_e_depositos) ?? 0,
        divida_financeira: optNum(data.divida_financeira) ?? 0,
        capex_anual_recorrente: optNum(data.capex_anual_recorrente),
        pct_top5_clientes: pct(data.pct_top5_clientes),
        geografia_clientes: data.geografia_clientes || null,
        dependencia_faturacao: data.dependencia_faturacao || null,
        dependencia_gestao: data.dependencia_gestao || null,
        proprietario_imovel: data.proprietario_imovel || null,
        renda_reflete_mercado: data.renda_reflete_mercado || null,
        acrescimo_renda_anual: optNum(data.acrescimo_renda_anual),
        incluir_imovel_perimetro: data.incluir_imovel_perimetro || null,
        valorizacao_imovel: optNum(data.valorizacao_imovel),
        tipo_periodo: data.tipo_periodo || null,
        atividade_principal: data.atividade_principal || null,
        num_colaboradores: data.num_colaboradores || null,
        unidades: data.unidades || null,
        num_clientes_ativos: data.num_clientes_ativos || null,
        pct_top1_clientes: pct(data.pct_top1_clientes),
        backlog_contratado: optNum(data.backlog_contratado),
        metodo_avaliacao_imovel: data.metodo_avaliacao_imovel || null,
        ano_avaliacao_imovel: optNum(data.ano_avaliacao_imovel),
        permanencia_pos_venda: data.permanencia_pos_venda || null,
        tipo_investidor: data.tipo_investidor || null,
      });
      setResult(r);
      setLoading(false);

      const dividaLiquida = r.ok
        ? r.divida_liquida
        : (optNum(data.divida_financeira) ?? 0) - (optNum(data.caixa_e_depositos) ?? 0);

      void registarLead({
        nome: data.nome,
        email: data.email,
        telefone: data.telefone || null,
        empresa: data.empresa,
        cargo: data.cargo || null,
        pais: data.pais,
        industria: data.industria,
        subindustria: data.subindustria || null,
        idade_empresa: num(data.idade_empresa),
        ano_referencia: Number(data.ano_referencia) || 2025,
        faturacao_ano1: num(data.faturacao_ano1),
        faturacao_ano2: optNum(data.faturacao_ano2),
        faturacao_ano3: optNum(data.faturacao_ano3),
        ebitda_ano1: num(data.ebitda_ano1),
        ebitda_ano2: optNum(data.ebitda_ano2),
        ebitda_ano3: optNum(data.ebitda_ano3),
        despesas_extraordinarias_ano1: num(data.despesas_extraordinarias_ano1),
        despesas_extraordinarias_ano2: num(data.despesas_extraordinarias_ano2),
        despesas_extraordinarias_ano3: num(data.despesas_extraordinarias_ano3),
        caixa_e_depositos: optNum(data.caixa_e_depositos),
        divida_financeira: optNum(data.divida_financeira),
        capex_anual_recorrente: optNum(data.capex_anual_recorrente),
        divida_liquida: dividaLiquida,
        pct_top5_clientes: pct(data.pct_top5_clientes),
        geografia_clientes: data.geografia_clientes || null,
        dependencia_acionista_faturacao: data.dependencia_faturacao || null,
        dependencia_acionista_gestao: data.dependencia_gestao || null,
        proprietario_imovel: data.proprietario_imovel || null,
        renda_reflete_mercado: data.renda_reflete_mercado || null,
        acrescimo_renda_anual: optNum(data.acrescimo_renda_anual),
        incluir_imovel_perimetro: data.incluir_imovel_perimetro || null,
        valorizacao_imovel: optNum(data.valorizacao_imovel),
        tipo_periodo: data.tipo_periodo || null,
        atividade_principal: data.atividade_principal || null,
        num_colaboradores: data.num_colaboradores || null,
        unidades: data.unidades || null,
        num_clientes_ativos: data.num_clientes_ativos || null,
        pct_top1_clientes: pct(data.pct_top1_clientes),
        backlog_contratado: optNum(data.backlog_contratado),
        metodo_avaliacao_imovel: data.metodo_avaliacao_imovel || null,
        ano_avaliacao_imovel: optNum(data.ano_avaliacao_imovel),
        permanencia_pos_venda: data.permanencia_pos_venda || null,
        tipo_investidor: data.tipo_investidor || null,

        estrutura_transacao: data.estrutura_transacao || null,
        pct_a_transacionar: data.pct_a_transacionar || null,
        motivo_interesse: data.motivo_interesse || null,
        horizonte_temporal: data.horizonte_temporal || null,
        consentimento_rgpd: data.consentimento_rgpd,
        calculo_possivel: r.ok,
        ev_min: r.ok ? r.ev_min : null,
        ev_max: r.ok ? r.ev_max : null,
        equity_min: r.ok ? r.equity_min : null,
        equity_max: r.ok ? r.equity_max : null,
        multiplo_ajustado_min: r.ok ? r.multiplo_ajustado_min : null,
        multiplo_ajustado_max: r.ok ? r.multiplo_ajustado_max : null,
        confianca: r.ok ? r.confianca : null,
      }).catch((e) => console.error("Falha ao registar lead", e));
    }, 1400);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <h1 className="section-title mt-6 max-w-4xl text-4xl leading-[1.08] md:text-6xl lg:text-7xl">
            Quanto vale a sua empresa?{" "}
            <span className="serif-accent text-accent">Peça uma análise indicativa gratuita.</span>
          </h1>
          <p className="body-justified mt-8 max-w-2xl text-base leading-relaxed font-light text-muted-foreground md:text-lg">
            Submeta os dados da sua PME. A nossa equipa valida a informação, analisa os indicadores e prepara um
            relatório completo em poucas horas.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button className="btn-primary" onClick={() => scrollTo(formRef)}>
              Avaliar a minha empresa agora
            </button>
            <button className="btn-outline" onClick={() => scrollTo(agendarRef)}>
              Falar com a equipa
            </button>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <p className="eyebrow">Como funciona</p>
        <h2 className="section-title mt-5 text-3xl md:text-5xl">Três passos, uma análise de valor</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Preencha o questionário de sete passos",
              d: "Sete passos curtos sobre setor, histórico financeiro e contexto. Realizado em menos de 5 minutos.",
            },
            {
              n: "02",
              t: "Receba o relatório preliminar",
              d: "A nossa equipa valida e analisa os dados, monta a ponte de valor da sua empresa\ne envia o relatório para o seu e-mail.",
            },
            {
              n: "03",
              t: "Reveja o relatório completo connosco",
              d: "Agende uma reunião de 20 minutos com a nossa equipa para aceder ao relatório completo e conhecer as suas opções.",
            },
          ].map((s) => (
            <div key={s.n} className="card-elegant p-8">
              <span className="num-index">{s.n}</span>
              <h3 className="mt-4 text-2xl">{s.t}</h3>
              <p className="body-justified mt-3 text-sm leading-relaxed font-light text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Formulário */}
      <section ref={formRef} className="scroll-mt-24 border-y border-border bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <ValuationForm onSubmit={handleSubmit} />
        </div>
      </section>

      {/* Confirmação */}
      {(loading || result) && (
        <section ref={resultRef} className="scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
            {loading ? (
              <p className="serif-accent text-center text-2xl text-muted-foreground">A registar a sua submissão…</p>
            ) : (
              result && (
                <ThankYouCard empresa={empresa} calculoPossivel={result.ok} onAgendar={() => scrollTo(agendarRef)} />
              )
            )}
          </div>
        </section>
      )}

      {/* Sample report */}
      <section ref={sampleRef} className="scroll-mt-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <p className="eyebrow">Relatório completo</p>
          <h2 className="section-title mt-5 max-w-2xl text-3xl md:text-5xl">O que recebe numa análise Lealia</h2>
          <div className="mt-12">
            <SampleReport onAgendar={() => scrollTo(agendarRef)} />
          </div>
        </div>
      </section>

      {/* Agendamento */}
      <section ref={agendarRef} className="scroll-mt-24 border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 md:py-28 lg:px-8">
          <h2 className="section-title text-3xl md:text-5xl">Fale connosco e aceda ao relatório completo</h2>
          <p className="body-justified mx-auto mt-6 max-w-xl leading-relaxed font-light text-muted-foreground">
            Numa reunião de 20 minutos, apresentamos os detalhes completos da avaliação, respondemos a todas as suas
            questões e explicamos-lhe como se processa uma transação de M&A, de A a Z. Totalmente gratuito e sem
            compromisso.
          </p>
          <div className="card-elegant mx-auto mt-12 max-w-2xl overflow-hidden p-1 sm:p-2">
            <CalendlyInline url={CALENDLY_URL} />
          </div>
        </div>
      </section>
    </div>
  );
}
