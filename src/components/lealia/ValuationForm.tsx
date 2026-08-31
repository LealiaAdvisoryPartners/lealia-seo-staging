import { useEffect, useMemo, useState } from "react";
import { Info } from "lucide-react";
import {
  ANOS_REFERENCIA,
  DEPENDENCIAS_FATURACAO,
  DEPENDENCIAS_GESTAO,
  ESTRUTURAS_TRANSACAO,
  GEOGRAFIAS,
  HORIZONTES,
  INDUSTRIAS,
  METODOS_AVALIACAO_IMOVEL,
  MOTIVOS_INTERESSE,
  NUM_CLIENTES_ATIVOS,
  NUM_COLABORADORES,
  UNIDADES,
  PAISES,
  PCT_TRANSACIONAR,
  PERMANENCIAS_POS_VENDA,
  TIPOS_INVESTIDOR,
  TIPOS_PERIODO,
  subindustriasDe,
} from "@/lib/valuation";
import { formatThousands, digitsOnly, parseMoney } from "@/lib/money";

export type FormState = {
  pais: string;
  idade_empresa: string;
  industria: string;
  subindustria: string;
  atividade_principal: string;
  num_colaboradores: string;
  unidades: string;
  num_clientes_ativos: string;
  ano_referencia: string;
  tipo_periodo: string;
  faturacao_ano1: string;
  faturacao_ano2: string;
  faturacao_ano3: string;
  ebitda_ano1: string;
  ebitda_ano2: string;
  ebitda_ano3: string;
  despesas_extraordinarias_ano1: string;
  despesas_extraordinarias_ano2: string;
  despesas_extraordinarias_ano3: string;
  caixa_e_depositos: string;
  divida_financeira: string;
  capex_anual_recorrente: string;
  depreciacoes_amortizacoes: string;
  pct_top5_clientes: string;
  pct_top1_clientes: string;
  backlog_contratado: string;
  geografia_clientes: string;
  dependencia_faturacao: string;
  dependencia_gestao: string;
  proprietario_imovel: string;
  renda_reflete_mercado: string;
  acrescimo_renda_anual: string;
  incluir_imovel_perimetro: string;
  valorizacao_imovel: string;
  metodo_avaliacao_imovel: string;
  ano_avaliacao_imovel: string;
  estrutura_transacao: string;
  motivo_interesse: string;
  horizonte_temporal: string;
  pct_a_transacionar: string;
  permanencia_pos_venda: string;
  tipo_investidor: string;
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  cargo: string;
  consentimento_rgpd: boolean;
};

export const emptyForm: FormState = {
  pais: "Portugal",
  idade_empresa: "",
  industria: "",
  subindustria: "",
  atividade_principal: "",
  num_colaboradores: "",
  unidades: "",
  num_clientes_ativos: "",
  ano_referencia: "2025",
  tipo_periodo: "",
  faturacao_ano1: "",
  faturacao_ano2: "",
  faturacao_ano3: "",
  ebitda_ano1: "",
  ebitda_ano2: "",
  ebitda_ano3: "",
  despesas_extraordinarias_ano1: "",
  despesas_extraordinarias_ano2: "",
  despesas_extraordinarias_ano3: "",
  caixa_e_depositos: "",
  divida_financeira: "",
  capex_anual_recorrente: "",
  depreciacoes_amortizacoes: "",
  pct_top5_clientes: "",
  pct_top1_clientes: "",
  backlog_contratado: "",
  geografia_clientes: "",
  dependencia_faturacao: "",
  dependencia_gestao: "",
  proprietario_imovel: "",
  renda_reflete_mercado: "",
  acrescimo_renda_anual: "",
  incluir_imovel_perimetro: "",
  valorizacao_imovel: "",
  metodo_avaliacao_imovel: "",
  ano_avaliacao_imovel: "",
  estrutura_transacao: "",
  motivo_interesse: "",
  horizonte_temporal: "",
  pct_a_transacionar: "",
  permanencia_pos_venda: "",
  tipo_investidor: "",
  nome: "",
  email: "",
  telefone: "",
  empresa: "",
  cargo: "",
  consentimento_rgpd: false,
};

const STEPS = [
  "Sobre a empresa",
  "Dados financeiros",
  "Balanço e investimento",
  "Risco e concentração",
  "Imóvel / Instalações",
  "Motivação e transação",
  "Contacto",
];
const STORAGE_KEY = "lealia:avaliacao:form:v5";


const isNum = (v: string) => v.trim() !== "" && !Number.isNaN(Number(v));
const filled = (v: string) => digitsOnly(v).replace("-", "") !== "";
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim());

const TOOLTIP_DESPESAS =
  "Custos pontuais e não recorrentes, ex: despesas extraordinárias, custos pessoais não-operacionais, indemnizações, bónus não-recorrentes, etc.";
const TOOLTIP_CAIXA = "Saldo de caixa, depósitos bancários e equivalentes de caixa à data mais recente disponível.";
const TOOLTIP_DIVIDA =
  " Dívida financeira (inc. IRC vencido e não pago, empréstimos bancários, leasings, factorings, etc.), dívida a fornecedores de CapEx, e dívida associada a receitas antecipadas.";
const TOOLTIP_CAPEX =
  "Investimento anual médio necessário para manter a operação atual (excluindo investimentos de expansão/crescimento).";
const TOOLTIP_DA =
  "Total anual de depreciações e amortizações registadas na demonstração de resultados. Se não for indicado, é estimado a partir da percentagem média de D&A sobre a receita do setor selecionado e assinalado no relatório como pressuposto.";
const TOOLTIP_ACRESCIMO_RENDA =
  "Diferença anual entre a renda atualmente paga e uma renda equivalente a preços de mercado atuais.";
const TOOLTIP_VALORIZACAO_IMOVEL =
  "Use o valor de um relatório de avaliação imobiliária recente, ou a sua melhor estimativa de mercado.";

function Field({
  label,
  hint,
  error,
  children,
  htmlFor,
  tooltip,
}: {
  label: string;
  hint?: string | undefined;
  error?: string | undefined;
  children: React.ReactNode;
  htmlFor: string;
  tooltip?: string;
}) {
  return (
    <div className="flex h-full flex-col gap-2">
      <label htmlFor={htmlFor} className="flex items-start gap-1.5 text-sm text-foreground">
        <span>
          {label}
          {hint && <span className="ml-2 text-xs text-muted-foreground">{hint}</span>}
        </span>
        {tooltip && (
          <span className="group relative inline-flex shrink-0">
            <Info className="h-3.5 w-3.5 cursor-help text-accent" aria-hidden="true" />
            <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden w-64 -translate-x-1/2 rounded-sm border border-border bg-card p-3 text-xs leading-relaxed font-light text-muted-foreground shadow-lg group-hover:block">
              {tooltip}
            </span>
            <span className="sr-only">{tooltip}</span>
          </span>
        )}
      </label>
      <div className="mt-auto">{children}</div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function MoneyInput({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <input
        id={id}
        className="field-input pr-9"
        inputMode="numeric"
        autoComplete="off"
        placeholder="0"
        value={formatThousands(value)}
        onChange={(e) => onChange(digitsOnly(e.target.value))}
      />
      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
        €
      </span>
    </div>
  );
}

function PercentInput({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <input
        id={id}
        className="field-input pr-9"
        inputMode="numeric"
        autoComplete="off"
        placeholder="0"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, "").slice(0, 3))}
      />
      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
        %
      </span>
    </div>
  );
}

export function ValuationForm({ onSubmit }: { onSubmit: (data: FormState) => void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [touched, setTouched] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  // Recuperar progresso guardado
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setForm({ ...emptyForm, ...(JSON.parse(saved) as Partial<FormState>) });
    } catch {
      /* ignorar */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {
      /* ignorar */
    }
  }, [form]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }));

  const subindustrias = useMemo(() => (form.industria ? subindustriasDe(form.industria) : []), [form.industria]);

  const anoRef = Number(form.ano_referencia) || 2025;
  const anoLabel = (i: 1 | 2 | 3) => String(anoRef - (i - 1));

  const pctOk = (v: string) => v === "" || (isNum(v) && Number(v) >= 0 && Number(v) <= 100);

  const errors: Partial<Record<keyof FormState, string>> = {};
  if (step === 0) {
    if (!isNum(form.idade_empresa) || Number(form.idade_empresa) < 0)
      errors.idade_empresa = "Indique um número de anos válido";
    if (!form.industria) errors.industria = "Selecione a indústria";
    if (subindustrias.length > 0 && !form.subindustria) errors.subindustria = "Selecione a sub-indústria";
    if (!form.atividade_principal.trim()) errors.atividade_principal = "Campo obrigatório";
    else if (form.atividade_principal.trim().length > 100)
      errors.atividade_principal = "Máximo 100 caracteres";
    if (!form.unidades) errors.unidades = "Selecione uma opção";
  }
  if (step === 1) {
    if (!form.ano_referencia) errors.ano_referencia = "Selecione o ano de referência";
    if (!form.tipo_periodo) errors.tipo_periodo = "Selecione uma opção";
    if (!filled(form.faturacao_ano1)) errors.faturacao_ano1 = "Campo obrigatório";
    if (!filled(form.ebitda_ano1)) errors.ebitda_ano1 = "Campo obrigatório";
    ([2, 3] as const).forEach((ano) => {
      const fatKey = `faturacao_ano${ano}` as "faturacao_ano2";
      const ebiKey = `ebitda_ano${ano}` as "ebitda_ano2";
      const temFat = filled(form[fatKey]);
      const temEbi = filled(form[ebiKey]);
      if (temFat && !temEbi)
        errors[ebiKey] = "Se preencheu a faturação deste ano, indique também o EBITDA correspondente";
      if (temEbi && !temFat)
        errors[fatKey] = "Se preencheu o EBITDA deste ano, indique também a faturação correspondente";
    });
    ([1, 2, 3] as const).forEach((ano) => {
      const fatKey = `faturacao_ano${ano}` as "faturacao_ano1";
      const ebiKey = `ebitda_ano${ano}` as "ebitda_ano1";
      const fat = parseMoney(form[fatKey]);
      const ebi = parseMoney(form[ebiKey]);
      if (fat !== null && ebi !== null && ebi > fat)
        errors[ebiKey] = "O EBITDA não pode ser superior à faturação do mesmo ano";
    });
    {
      const fat = parseMoney(form.faturacao_ano1);
      const ebi = parseMoney(form.ebitda_ano1);
      const despesas = parseMoney(form.despesas_extraordinarias_ano1);
      if (fat !== null && ebi !== null && despesas !== null && ebi + despesas > fat)
        errors.despesas_extraordinarias_ano1 =
          "A soma do EBITDA com as despesas extraordinárias não pode ser superior à faturação";
    }
  }
  if (step === 2) {
    if (!filled(form.caixa_e_depositos)) errors.caixa_e_depositos = "Campo obrigatório";
    if (!filled(form.divida_financeira)) errors.divida_financeira = "Campo obrigatório";
    if (!form.num_colaboradores) errors.num_colaboradores = "Selecione uma opção";
  }
  if (step === 3) {
    if (!pctOk(form.pct_top5_clientes)) errors.pct_top5_clientes = "Percentagem entre 0 e 100";
    if (!pctOk(form.pct_top1_clientes)) errors.pct_top1_clientes = "Percentagem entre 0 e 100";
    if (
      form.pct_top1_clientes !== "" &&
      form.pct_top5_clientes !== "" &&
      Number(form.pct_top1_clientes) > Number(form.pct_top5_clientes)
    )
      errors.pct_top1_clientes = "O maior cliente não pode pesar mais do que os cinco maiores";
  }
  if (step === 4) {
    if (!form.proprietario_imovel) {
      errors.proprietario_imovel = "Selecione uma opção";
    } else if (form.proprietario_imovel === "Não") {
      if (!form.renda_reflete_mercado) errors.renda_reflete_mercado = "Selecione uma opção";
      else if (form.renda_reflete_mercado === "Não" && !filled(form.acrescimo_renda_anual))
        errors.acrescimo_renda_anual = "Campo obrigatório";
    } else {
      if (!filled(form.valorizacao_imovel)) errors.valorizacao_imovel = "Campo obrigatório";
      if (!form.incluir_imovel_perimetro) errors.incluir_imovel_perimetro = "Selecione uma opção";
      if (!form.metodo_avaliacao_imovel) errors.metodo_avaliacao_imovel = "Selecione uma opção";
    }
  }
  if (step === 5) {
    if (!form.estrutura_transacao) errors.estrutura_transacao = "Selecione uma opção";
    if (!form.motivo_interesse) errors.motivo_interesse = "Selecione uma opção";
    if (!form.horizonte_temporal) errors.horizonte_temporal = "Selecione uma opção";
    if (!form.pct_a_transacionar) errors.pct_a_transacionar = "Selecione uma opção";
    if (!form.permanencia_pos_venda) errors.permanencia_pos_venda = "Selecione uma opção";
    if (!form.tipo_investidor) errors.tipo_investidor = "Selecione uma opção";
  }

  if (step === 6) {
    if (!form.nome.trim()) errors.nome = "Campo obrigatório";
    if (!emailOk(form.email)) errors.email = "Introduza um email válido";
    if (!form.telefone.trim()) errors.telefone = "Campo obrigatório";
    if (!form.empresa.trim()) errors.empresa = "Campo obrigatório";
    if (!form.cargo.trim()) errors.cargo = "Campo obrigatório";
    if (!form.consentimento_rgpd) errors.consentimento_rgpd = "É necessário o seu consentimento";
  }

  const valid = Object.keys(errors).length === 0;
  const err = (k: keyof FormState) => (touched ? errors[k] : undefined);

  const next = () => {
    if (!valid) {
      setTouched(true);
      return;
    }
    setTouched(false);
    if (step === STEPS.length - 1) {
      if (honeypot.trim() !== "") return; // bot
      onSubmit(form);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignorar */
      }
    } else setStep((s) => s + 1);
  };

  return (
    <div className="mx-auto max-w-2xl">
        <p className="body-justified mb-8 text-sm font-light text-muted-foreground">
          Este processo demora cerca de 5 minutos. 
Quanto mais completa for a informação, mais precisa será a avaliação.
        </p>

      <div className="mb-10">
        <div className="flex items-baseline justify-between">
          <span className="num-index">
            0{step + 1} — {STEPS[step]}
          </span>
          <span className="text-xs text-muted-foreground">
            Passo {step + 1} de {STEPS.length}
          </span>
        </div>
        <div className="mt-4 h-px w-full bg-border">
          <div
            className="h-px bg-accent transition-all duration-500"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* honeypot anti-bot */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website-hp">Website</label>
        <input
          id="website-hp"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {step === 0 && (
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="País" htmlFor="pais">
            <select id="pais" className="field-input" value={form.pais} onChange={(e) => set("pais", e.target.value)}>
              {PAISES.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </Field>
          <Field label="Idade da empresa" hint="anos" error={err("idade_empresa")} htmlFor="idade">
            <input
              id="idade"
              className="field-input"
              inputMode="numeric"
              value={form.idade_empresa}
              onChange={(e) => set("idade_empresa", e.target.value.replace(/[^\d]/g, ""))}
            />
          </Field>
          <Field label="Indústria" error={err("industria")} htmlFor="industria">
            <select
              id="industria"
              className="field-input"
              value={form.industria}
              onChange={(e) => {
                set("industria", e.target.value);
                set("subindustria", "");
              }}
            >
              <option value="">Selecione…</option>
              {INDUSTRIAS.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </Field>
          <Field label="Sub-indústria" error={err("subindustria")} htmlFor="subindustria">
            <select
              id="subindustria"
              className="field-input"
              value={form.subindustria}
              disabled={subindustrias.length === 0}
              onChange={(e) => set("subindustria", e.target.value)}
            >
              <option value="">{subindustrias.length === 0 ? "Não aplicável" : "Selecione…"}</option>
              {subindustrias.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Field
            label="Unidades / localizações"
            tooltip="Número de localizações ou unidades operacionais da empresa (lojas, clínicas, fábricas, escritórios)."
            error={err("unidades")}
            htmlFor="unidades"
          >
            <select
              id="unidades"
              className="field-input"
              value={form.unidades}
              onChange={(e) => set("unidades", e.target.value)}
            >
              <option value="">Selecione…</option>
              {UNIDADES.map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </Field>
          <Field label="Clientes ativos" hint="opcional" htmlFor="clientes">
            <select
              id="clientes"
              className="field-input"
              value={form.num_clientes_ativos}
              onChange={(e) => set("num_clientes_ativos", e.target.value)}
            >
              <option value="">Selecione…</option>
              {NUM_CLIENTES_ATIVOS.map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </Field>
          <div className="sm:col-span-2">
            <Field
              label="Atividade principal"
              hint={`${form.atividade_principal.length}/100`}
              error={err("atividade_principal")}
              htmlFor="atividade"
            >
              <input
                id="atividade"
                className="field-input"
                maxLength={100}
                placeholder="Ex: produção e instalação de estruturas metálicas para clientes industriais"
                value={form.atividade_principal}
                onChange={(e) => set("atividade_principal", e.target.value)}
              />
            </Field>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              label="Qual foi o ano mais recente com dados financeiros fechados?"
              error={err("ano_referencia")}
              htmlFor="anoRef"
            >
              <select
                id="anoRef"
                className="field-input"
                value={form.ano_referencia}
                onChange={(e) => set("ano_referencia", e.target.value)}
              >
                {ANOS_REFERENCIA.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </Field>
            <Field
              label="Tipo de período de referência"
              tooltip="Indica se os valores correspondem a contas encerradas, aos últimos 12 meses ou a uma estimativa. Determina o grau de fiabilidade da avaliação."
              error={err("tipo_periodo")}
              htmlFor="tipoperiodo"
            >
              <select
                id="tipoperiodo"
                className="field-input"
                value={form.tipo_periodo}
                onChange={(e) => set("tipo_periodo", e.target.value)}
              >
                <option value="">Selecione…</option>
                {TIPOS_PERIODO.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
          </div>

          <p className="text-sm text-muted-foreground">
            Indique valores em euros. O ano {anoLabel(1)} é obrigatório; os anos anteriores são opcionais e servem para
            aferir a tendência de crescimento.
          </p>
          {([1, 2, 3] as const).map((ano) => (
            <div key={ano} className="border-t border-border pt-6">
              <p className="eyebrow mb-4">
                {anoLabel(ano)}
                {ano > 1 ? " (opcional)" : ""}
              </p>
              <div className="grid gap-6 sm:grid-cols-3">
                <Field label="Faturação" error={err(`faturacao_ano${ano}` as keyof FormState)} htmlFor={`fat${ano}`}>
                  <MoneyInput
                    id={`fat${ano}`}
                    value={form[`faturacao_ano${ano}` as "faturacao_ano1"]}
                    onChange={(v) => set(`faturacao_ano${ano}` as "faturacao_ano1", v)}
                  />
                </Field>
                <Field label="EBITDA" error={err(`ebitda_ano${ano}` as keyof FormState)} htmlFor={`ebi${ano}`}>
                  <MoneyInput
                    id={`ebi${ano}`}
                    value={form[`ebitda_ano${ano}` as "ebitda_ano1"]}
                    onChange={(v) => set(`ebitda_ano${ano}` as "ebitda_ano1", v)}
                  />
                </Field>
                <Field
                  label="Desp. extraordinárias"
                  hint="opcional"
                  tooltip={TOOLTIP_DESPESAS}
                  error={err(`despesas_extraordinarias_ano${ano}` as keyof FormState)}
                  htmlFor={`dex${ano}`}
                >
                  <MoneyInput
                    id={`dex${ano}`}
                    value={form[`despesas_extraordinarias_ano${ano}` as "despesas_extraordinarias_ano1"]}
                    onChange={(v) => set(`despesas_extraordinarias_ano${ano}` as "despesas_extraordinarias_ano1", v)}
                  />
                </Field>
              </div>
            </div>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            label="Caixa e depósitos"
            tooltip={TOOLTIP_CAIXA}
            error={err("caixa_e_depositos")}
            htmlFor="caixa"
          >
            <MoneyInput id="caixa" value={form.caixa_e_depositos} onChange={(v) => set("caixa_e_depositos", v)} />
          </Field>
          <Field label="Dívida" tooltip={TOOLTIP_DIVIDA} error={err("divida_financeira")} htmlFor="divida">
            <MoneyInput id="divida" value={form.divida_financeira} onChange={(v) => set("divida_financeira", v)} />
          </Field>
          <Field label="Capex anual recorrente" hint="opcional" tooltip={TOOLTIP_CAPEX} htmlFor="capex">
            <MoneyInput
              id="capex"
              value={form.capex_anual_recorrente}
              onChange={(v) => set("capex_anual_recorrente", v)}
            />
          </Field>
          <Field
            label="Depreciações & Amortizações anuais (total)"
            hint="opcional"
            tooltip={TOOLTIP_DA}
            htmlFor="damortizacoes"
          >
            <MoneyInput
              id="damortizacoes"
              value={form.depreciacoes_amortizacoes}
              onChange={(v) => set("depreciacoes_amortizacoes", v)}
            />
          </Field>
          <Field label="Número de colaboradores" error={err("num_colaboradores")} htmlFor="colaboradores">
            <select
              id="colaboradores"
              className="field-input"
              value={form.num_colaboradores}
              onChange={(e) => set("num_colaboradores", e.target.value)}
            >
              <option value="">Selecione…</option>
              {NUM_COLABORADORES.map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </Field>
        </div>
      )}

      {step === 3 && (
        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            label="Faturação nos 5 maiores clientes"
            hint="opcional, %"
            error={err("pct_top5_clientes")}
            htmlFor="top5"
          >
            <PercentInput id="top5" value={form.pct_top5_clientes} onChange={(v) => set("pct_top5_clientes", v)} />
          </Field>
          <Field
            label="Faturação no maior cliente"
            hint="opcional, %"
            error={err("pct_top1_clientes")}
            htmlFor="top1"
          >
            <PercentInput id="top1" value={form.pct_top1_clientes} onChange={(v) => set("pct_top1_clientes", v)} />
          </Field>
          <Field
            label="Backlog contratado"
            hint="opcional"
            tooltip="Valor de encomendas ou contratos já adjudicados ainda por faturar."
            htmlFor="backlog"
          >
            <MoneyInput id="backlog" value={form.backlog_contratado} onChange={(v) => set("backlog_contratado", v)} />
          </Field>
          <Field label="Geografia dos clientes" hint="opcional" htmlFor="geografia">
            <select
              id="geografia"
              className="field-input"
              value={form.geografia_clientes}
              onChange={(e) => set("geografia_clientes", e.target.value)}
            >
              <option value="">Selecione…</option>
              {GEOGRAFIAS.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </Field>
          <Field label="Dependência do acionista na faturação" hint="opcional" htmlFor="depfat">
            <select
              id="depfat"
              className="field-input"
              value={form.dependencia_faturacao}
              onChange={(e) => set("dependencia_faturacao", e.target.value)}
            >
              <option value="">Selecione…</option>
              {DEPENDENCIAS_FATURACAO.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </Field>
          <Field label="Dependência do acionista na gestão" hint="opcional" htmlFor="depgest">
            <select
              id="depgest"
              className="field-input"
              value={form.dependencia_gestao}
              onChange={(e) => set("dependencia_gestao", e.target.value)}
            >
              <option value="">Selecione…</option>
              {DEPENDENCIAS_GESTAO.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </Field>
        </div>
      )}

      {step === 4 && (
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field
              label="A empresa é proprietária do imóvel onde opera?"
              error={err("proprietario_imovel")}
              htmlFor="propimovel"
            >
              <select
                id="propimovel"
                className="field-input"
                value={form.proprietario_imovel}
                onChange={(e) => set("proprietario_imovel", e.target.value)}
              >
                <option value="">Selecione…</option>
                <option>Sim</option>
                <option>Não</option>
              </select>
            </Field>
          </div>

          {form.proprietario_imovel === "Não" && (
            <>
              <div className="sm:col-span-2">
                <Field
                  label="A renda atual reflete preços de mercado?"
                  error={err("renda_reflete_mercado")}
                  htmlFor="rendamercado"
                >
                  <select
                    id="rendamercado"
                    className="field-input"
                    value={form.renda_reflete_mercado}
                    onChange={(e) => set("renda_reflete_mercado", e.target.value)}
                  >
                    <option value="">Selecione…</option>
                    <option>Sim</option>
                    <option>Não</option>
                  </select>
                </Field>
              </div>
              {form.renda_reflete_mercado === "Não" && (
                <div className="sm:col-span-2">
                  <Field
                    label="Qual o acréscimo anual a contabilizar para refletir preços de mercado?"
                    tooltip={TOOLTIP_ACRESCIMO_RENDA}
                    error={err("acrescimo_renda_anual")}
                    htmlFor="acrescimo"
                  >
                    <MoneyInput
                      id="acrescimo"
                      value={form.acrescimo_renda_anual}
                      onChange={(v) => set("acrescimo_renda_anual", v)}
                    />
                  </Field>
                </div>
              )}
            </>
          )}

          {form.proprietario_imovel === "Sim" && (
            <>
              <div className="sm:col-span-2">
                <Field
                  label="Qual a valorização do imóvel?"
                  tooltip={TOOLTIP_VALORIZACAO_IMOVEL}
                  error={err("valorizacao_imovel")}
                  htmlFor="valorizacao"
                >
                  <MoneyInput
                    id="valorizacao"
                    value={form.valorizacao_imovel}
                    onChange={(v) => set("valorizacao_imovel", v)}
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field
                  label="Pretende incluir o imóvel no perímetro da transação?"
                  error={err("incluir_imovel_perimetro")}
                  htmlFor="perimetro"
                >
                  <select
                    id="perimetro"
                    className="field-input"
                    value={form.incluir_imovel_perimetro}
                    onChange={(e) => set("incluir_imovel_perimetro", e.target.value)}
                  >
                    <option value="">Selecione…</option>
                    <option>Sim</option>
                    <option>Não</option>
                  </select>
                </Field>
              </div>
              <Field
                label="Como foi determinada a valorização?"
                error={err("metodo_avaliacao_imovel")}
                htmlFor="metodoimovel"
              >
                <select
                  id="metodoimovel"
                  className="field-input"
                  value={form.metodo_avaliacao_imovel}
                  onChange={(e) => set("metodo_avaliacao_imovel", e.target.value)}
                >
                  <option value="">Selecione…</option>
                  {METODOS_AVALIACAO_IMOVEL.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </Field>
              <Field label="Ano da avaliação do imóvel" hint="opcional" htmlFor="anoimovel">
                <input
                  id="anoimovel"
                  inputMode="numeric"
                  className="field-input"
                  value={form.ano_avaliacao_imovel}
                  onChange={(e) => set("ano_avaliacao_imovel", digitsOnly(e.target.value).slice(0, 4))}
                />
              </Field>

              <p className="text-xs leading-relaxed font-light text-muted-foreground sm:col-span-2">
                Se a empresa detiver o imóvel, o EBITDA é ajustado para refletir uma renda de mercado teórica. Se optar
                por incluir o imóvel na transação, o seu valor soma-se ao valor final da empresa; se ficar de fora, esse
                valor não é contabilizado.
              </p>
            </>
          )}
        </div>
      )}

      {step === 5 && (
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Estrutura de transação" error={err("estrutura_transacao")} htmlFor="estrutura">
            <select
              id="estrutura"
              className="field-input"
              value={form.estrutura_transacao}
              onChange={(e) => set("estrutura_transacao", e.target.value)}
            >
              <option value="">Selecione…</option>
              {ESTRUTURAS_TRANSACAO.map((e) => (
                <option key={e}>{e}</option>
              ))}
            </select>
          </Field>
          <Field label="Motivo do interesse" error={err("motivo_interesse")} htmlFor="motivo">
            <select
              id="motivo"
              className="field-input"
              value={form.motivo_interesse}
              onChange={(e) => set("motivo_interesse", e.target.value)}
            >
              <option value="">Selecione…</option>
              {MOTIVOS_INTERESSE.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </Field>
          <Field label="Horizonte temporal" error={err("horizonte_temporal")} htmlFor="horizonte">
            <select
              id="horizonte"
              className="field-input"
              value={form.horizonte_temporal}
              onChange={(e) => set("horizonte_temporal", e.target.value)}
            >
              <option value="">Selecione…</option>
              {HORIZONTES.map((h) => (
                <option key={h}>{h}</option>
              ))}
            </select>
          </Field>
          <Field label="Percentagem da empresa a transacionar" error={err("pct_a_transacionar")} htmlFor="pcttrans">
            <select
              id="pcttrans"
              className="field-input"
              value={form.pct_a_transacionar}
              onChange={(e) => set("pct_a_transacionar", e.target.value)}
            >
              <option value="">Selecione…</option>
              {PCT_TRANSACIONAR.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </Field>
          <Field
            label="Disponibilidade para permanecer após a venda"
            error={err("permanencia_pos_venda")}
            htmlFor="permanencia"
          >
            <select
              id="permanencia"
              className="field-input"
              value={form.permanencia_pos_venda}
              onChange={(e) => set("permanencia_pos_venda", e.target.value)}
            >
              <option value="">Selecione…</option>
              {PERMANENCIAS_POS_VENDA.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </Field>
          <Field label="Tipo de investidor preferencial" error={err("tipo_investidor")} htmlFor="tipoinvestidor">
            <select
              id="tipoinvestidor"
              className="field-input"
              value={form.tipo_investidor}
              onChange={(e) => set("tipo_investidor", e.target.value)}
            >
              <option value="">Selecione…</option>
              {TIPOS_INVESTIDOR.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>

        </div>
      )}

      {step === 6 && (
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Nome" error={err("nome")} htmlFor="nome">
            <input id="nome" className="field-input" value={form.nome} onChange={(e) => set("nome", e.target.value)} />
          </Field>
          <Field label="Email" error={err("email")} htmlFor="email">
            <input
              id="email"
              type="email"
              className="field-input"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </Field>
          <Field label="Telefone" error={err("telefone")} htmlFor="telefone">
            <input
              id="telefone"
              className="field-input"
              value={form.telefone}
              onChange={(e) => set("telefone", e.target.value)}
            />
          </Field>
          <Field label="Empresa" error={err("empresa")} htmlFor="empresa">
            <input
              id="empresa"
              className="field-input"
              value={form.empresa}
              onChange={(e) => set("empresa", e.target.value)}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Cargo" error={err("cargo")} htmlFor="cargo">
              <input
                id="cargo"
                className="field-input"
                placeholder="CEO, Fundador, Sócio-Gerente…"
                value={form.cargo}
                onChange={(e) => set("cargo", e.target.value)}
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="rgpd" className="flex items-start gap-3 text-sm text-muted-foreground">
              <input
                id="rgpd"
                type="checkbox"
                className="mt-1 size-4 accent-[var(--color-accent)]"
                checked={form.consentimento_rgpd}
                onChange={(e) => set("consentimento_rgpd", e.target.checked)}
              />
              <span>
                Autorizo a Lealia Advisory Partners a tratar os dados fornecidos para efeitos de contacto comercial e
                elaboração da avaliação indicativa, nos termos do RGPD.
              </span>
            </label>
            {err("consentimento_rgpd") && <p className="mt-2 text-xs text-destructive">{errors.consentimento_rgpd}</p>}
          </div>
        </div>
      )}

      <div className="mt-10 flex items-center justify-between gap-4">
        <button
          type="button"
          className="btn-outline"
          onClick={() => {
            setTouched(false);
            setStep((s) => Math.max(0, s - 1));
          }}
          disabled={step === 0}
          style={step === 0 ? { visibility: "hidden" } : undefined}
        >
          Anterior
        </button>
        <button type="button" className="btn-primary" onClick={next} disabled={touched && !valid}>
          {step === STEPS.length - 1 ? "Calcular avaliação" : "Seguinte"}
        </button>
      </div>
    </div>
  );
}
