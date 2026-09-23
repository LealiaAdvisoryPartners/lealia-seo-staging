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
} from "@core/valuation";
import { formatThousands, digitsOnly, parseMoney } from "@/lib/money";
import { useLanguage } from "@/contexts/LanguageContext";
import { formCopy, type FormCopy } from "@/translations/valuation-form";
import type { Language } from "@/contexts/language-context";

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
  idioma: "pt" | "en" | "es";
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
  idioma: "pt",
};

const STORAGE_KEY = "lealia:avaliacao:form:v6";

const isNum = (v: string) => v.trim() !== "" && !Number.isNaN(Number(v));
const filled = (v: string) => digitsOnly(v).replace("-", "") !== "";
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim());

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
  const { language } = useLanguage();
  const copy: FormCopy = formCopy[language];
  const opt = (v: string) => copy.options[v] ?? v;

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [touched, setTouched] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [idiomaTocado, setIdiomaTocado] = useState(false);

  const STEPS = copy.steps;

  // Recuperar progresso guardado
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<FormState>;
        if (parsed.idioma) setIdiomaTocado(true);
        setForm({ ...emptyForm, ...parsed });
      }
    } catch {
      /* ignorar */
    }
  }, []);

  useEffect(() => {
    if (!idiomaTocado) {
      setForm((f) => ({ ...f, idioma: language }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, idiomaTocado]);

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
      errors.idade_empresa = copy.errors.idadeInvalida;
    if (!form.industria) errors.industria = copy.errors.selecioneIndustria;
    if (subindustrias.length > 0 && !form.subindustria) errors.subindustria = copy.errors.selecioneSubindustria;
    if (!form.atividade_principal.trim()) errors.atividade_principal = copy.errors.campoObrigatorio;
    else if (form.atividade_principal.trim().length > 100)
      errors.atividade_principal = copy.errors.maximo100;
    if (!form.unidades) errors.unidades = copy.errors.selecioneOpcao;
  }
  if (step === 1) {
    if (!form.ano_referencia) errors.ano_referencia = copy.errors.selecioneAnoReferencia;
    if (!form.tipo_periodo) errors.tipo_periodo = copy.errors.selecioneOpcao;
    if (!filled(form.faturacao_ano1)) errors.faturacao_ano1 = copy.errors.campoObrigatorio;
    if (!filled(form.ebitda_ano1)) errors.ebitda_ano1 = copy.errors.campoObrigatorio;
    ([2, 3] as const).forEach((ano) => {
      const fatKey = `faturacao_ano${ano}` as "faturacao_ano2";
      const ebiKey = `ebitda_ano${ano}` as "ebitda_ano2";
      const temFat = filled(form[fatKey]);
      const temEbi = filled(form[ebiKey]);
      if (temFat && !temEbi) errors[ebiKey] = copy.errors.faltaEbitda;
      if (temEbi && !temFat) errors[fatKey] = copy.errors.faltaFaturacao;
    });
    ([1, 2, 3] as const).forEach((ano) => {
      const fatKey = `faturacao_ano${ano}` as "faturacao_ano1";
      const ebiKey = `ebitda_ano${ano}` as "ebitda_ano1";
      const fat = parseMoney(form[fatKey]);
      const ebi = parseMoney(form[ebiKey]);
      if (fat !== null && ebi !== null && ebi > fat) errors[ebiKey] = copy.errors.ebitdaSuperiorFaturacao;
    });
    {
      const fat = parseMoney(form.faturacao_ano1);
      const ebi = parseMoney(form.ebitda_ano1);
      const despesas = parseMoney(form.despesas_extraordinarias_ano1);
      if (fat !== null && ebi !== null && despesas !== null && ebi + despesas > fat)
        errors.despesas_extraordinarias_ano1 = copy.errors.despesasSuperiorFaturacao;
    }
  }
  if (step === 2) {
    if (!filled(form.caixa_e_depositos)) errors.caixa_e_depositos = copy.errors.campoObrigatorio;
    if (!filled(form.divida_financeira)) errors.divida_financeira = copy.errors.campoObrigatorio;
    if (!filled(form.depreciacoes_amortizacoes)) errors.depreciacoes_amortizacoes = copy.errors.campoObrigatorio;
    if (!form.num_colaboradores) errors.num_colaboradores = copy.errors.selecioneOpcao;
  }
  if (step === 3) {
    if (!pctOk(form.pct_top5_clientes)) errors.pct_top5_clientes = copy.errors.percentagemEntre0e100;
    if (!pctOk(form.pct_top1_clientes)) errors.pct_top1_clientes = copy.errors.percentagemEntre0e100;
    if (
      form.pct_top1_clientes !== "" &&
      form.pct_top5_clientes !== "" &&
      Number(form.pct_top1_clientes) > Number(form.pct_top5_clientes)
    )
      errors.pct_top1_clientes = copy.errors.maiorClienteExcede;
  }
  if (step === 4) {
    if (!form.proprietario_imovel) {
      errors.proprietario_imovel = copy.errors.selecioneOpcao;
    } else if (form.proprietario_imovel === "Não") {
      if (!form.renda_reflete_mercado) errors.renda_reflete_mercado = copy.errors.selecioneOpcao;
      else if (form.renda_reflete_mercado === "Não" && !filled(form.acrescimo_renda_anual))
        errors.acrescimo_renda_anual = copy.errors.campoObrigatorio;
    } else {
      if (!filled(form.valorizacao_imovel)) errors.valorizacao_imovel = copy.errors.campoObrigatorio;
      if (!form.incluir_imovel_perimetro) errors.incluir_imovel_perimetro = copy.errors.selecioneOpcao;
      if (!form.metodo_avaliacao_imovel) errors.metodo_avaliacao_imovel = copy.errors.selecioneOpcao;
    }
  }
  if (step === 5) {
    if (!form.estrutura_transacao) errors.estrutura_transacao = copy.errors.selecioneOpcao;
    if (!form.motivo_interesse) errors.motivo_interesse = copy.errors.selecioneOpcao;
    if (!form.horizonte_temporal) errors.horizonte_temporal = copy.errors.selecioneOpcao;
    if (!form.pct_a_transacionar) errors.pct_a_transacionar = copy.errors.selecioneOpcao;
    if (!form.permanencia_pos_venda) errors.permanencia_pos_venda = copy.errors.selecioneOpcao;
    if (!form.tipo_investidor) errors.tipo_investidor = copy.errors.selecioneOpcao;
  }

  if (step === 6) {
    if (!form.nome.trim()) errors.nome = copy.errors.campoObrigatorio;
    if (!emailOk(form.email)) errors.email = copy.errors.emailInvalido;
    if (!form.telefone.trim()) errors.telefone = copy.errors.campoObrigatorio;
    if (!form.empresa.trim()) errors.empresa = copy.errors.campoObrigatorio;
    if (!form.cargo.trim()) errors.cargo = copy.errors.campoObrigatorio;
    if (!form.consentimento_rgpd) errors.consentimento_rgpd = copy.errors.consentimentoNecessario;
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
        <p className="body-justified mb-8 whitespace-pre-line text-sm font-light text-muted-foreground">
          {copy.intro}
        </p>

      <div className="mb-10">
        <div className="flex items-baseline justify-between">
          <span className="num-index">
            0{step + 1} — {STEPS[step]}
          </span>
          <span className="text-xs text-muted-foreground">{copy.stepOf(step + 1, STEPS.length)}</span>
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
        <label htmlFor="website-hp">{copy.websiteLabel}</label>
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
          <Field label={copy.fields.pais} htmlFor="pais">
            <select id="pais" className="field-input" value={form.pais} onChange={(e) => set("pais", e.target.value)}>
              {PAISES.map((p) => (
                <option key={p} value={p}>
                  {opt(p)}
                </option>
              ))}
            </select>
          </Field>
          <Field label={copy.fields.idadeEmpresa} hint={copy.fields.idadeHint} error={err("idade_empresa")} htmlFor="idade">
            <input
              id="idade"
              className="field-input"
              inputMode="numeric"
              value={form.idade_empresa}
              onChange={(e) => set("idade_empresa", e.target.value.replace(/[^\d]/g, ""))}
            />
          </Field>
          <Field label={copy.fields.industria} error={err("industria")} htmlFor="industria">
            <select
              id="industria"
              className="field-input"
              value={form.industria}
              onChange={(e) => {
                set("industria", e.target.value);
                set("subindustria", "");
              }}
            >
              <option value="">{copy.selectPlaceholder}</option>
              {INDUSTRIAS.map((i) => (
                <option key={i} value={i}>
                  {opt(i)}
                </option>
              ))}
            </select>
          </Field>
          <Field label={copy.fields.subindustria} error={err("subindustria")} htmlFor="subindustria">
            <select
              id="subindustria"
              className="field-input"
              value={form.subindustria}
              disabled={subindustrias.length === 0}
              onChange={(e) => set("subindustria", e.target.value)}
            >
              <option value="">{subindustrias.length === 0 ? copy.notApplicable : copy.selectPlaceholder}</option>
              {subindustrias.map((s) => (
                <option key={s} value={s}>
                  {opt(s)}
                </option>
              ))}
            </select>
          </Field>
          <Field
            label={copy.fields.unidades}
            tooltip={copy.tooltips.unidades}
            error={err("unidades")}
            htmlFor="unidades"
          >
            <select
              id="unidades"
              className="field-input"
              value={form.unidades}
              onChange={(e) => set("unidades", e.target.value)}
            >
              <option value="">{copy.selectPlaceholder}</option>
              {UNIDADES.map((n) => (
                <option key={n} value={n}>
                  {opt(n)}
                </option>
              ))}
            </select>
          </Field>
          <Field label={copy.fields.clientesAtivos} hint={copy.optional} htmlFor="clientes">
            <select
              id="clientes"
              className="field-input"
              value={form.num_clientes_ativos}
              onChange={(e) => set("num_clientes_ativos", e.target.value)}
            >
              <option value="">{copy.selectPlaceholder}</option>
              {NUM_CLIENTES_ATIVOS.map((n) => (
                <option key={n} value={n}>
                  {opt(n)}
                </option>
              ))}
            </select>
          </Field>
          <div className="sm:col-span-2">
            <Field
              label={copy.fields.atividadePrincipal}
              hint={`${form.atividade_principal.length}/100`}
              error={err("atividade_principal")}
              htmlFor="atividade"
            >
              <input
                id="atividade"
                className="field-input"
                maxLength={100}
                placeholder={copy.fields.atividadePlaceholder}
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
              label={copy.fields.anoReferencia}
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
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </Field>
            <Field
              label={copy.fields.tipoPeriodo}
              tooltip={copy.tooltips.tipoPeriodo}
              error={err("tipo_periodo")}
              htmlFor="tipoperiodo"
            >
              <select
                id="tipoperiodo"
                className="field-input"
                value={form.tipo_periodo}
                onChange={(e) => set("tipo_periodo", e.target.value)}
              >
                <option value="">{copy.selectPlaceholder}</option>
                {TIPOS_PERIODO.map((t) => (
                  <option key={t} value={t}>
                    {opt(t)}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <p className="text-sm text-muted-foreground">{copy.fields.valoresEurosNote(anoLabel(1))}</p>
          {([1, 2, 3] as const).map((ano) => (
            <div key={ano} className="border-t border-border pt-6">
              <p className="eyebrow mb-4">
                {anoLabel(ano)}
                {ano > 1 ? ` (${copy.optional})` : ""}
              </p>
              <div className="grid gap-6 sm:grid-cols-3">
                <Field label={copy.fields.faturacao} error={err(`faturacao_ano${ano}` as keyof FormState)} htmlFor={`fat${ano}`}>
                  <MoneyInput
                    id={`fat${ano}`}
                    value={form[`faturacao_ano${ano}` as "faturacao_ano1"]}
                    onChange={(v) => set(`faturacao_ano${ano}` as "faturacao_ano1", v)}
                  />
                </Field>
                <Field label={copy.fields.ebitda} error={err(`ebitda_ano${ano}` as keyof FormState)} htmlFor={`ebi${ano}`}>
                  <MoneyInput
                    id={`ebi${ano}`}
                    value={form[`ebitda_ano${ano}` as "ebitda_ano1"]}
                    onChange={(v) => set(`ebitda_ano${ano}` as "ebitda_ano1", v)}
                  />
                </Field>
                <Field
                  label={copy.fields.despesasExtraordinarias}
                  hint={copy.optional}
                  tooltip={copy.tooltips.despesas}
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
            label={copy.fields.caixaEDepositos}
            tooltip={copy.tooltips.caixa}
            error={err("caixa_e_depositos")}
            htmlFor="caixa"
          >
            <MoneyInput id="caixa" value={form.caixa_e_depositos} onChange={(v) => set("caixa_e_depositos", v)} />
          </Field>
          <Field label={copy.fields.divida} tooltip={copy.tooltips.divida} error={err("divida_financeira")} htmlFor="divida">
            <MoneyInput id="divida" value={form.divida_financeira} onChange={(v) => set("divida_financeira", v)} />
          </Field>
          <Field label={copy.fields.capex} hint={copy.optional} tooltip={copy.tooltips.capex} htmlFor="capex">
            <MoneyInput
              id="capex"
              value={form.capex_anual_recorrente}
              onChange={(v) => set("capex_anual_recorrente", v)}
            />
          </Field>
          <Field
            label={copy.fields.depreciacoesAmortizacoes}
            tooltip={copy.tooltips.da}
            error={err("depreciacoes_amortizacoes")}
            htmlFor="damortizacoes"
          >
            <MoneyInput
              id="damortizacoes"
              value={form.depreciacoes_amortizacoes}
              onChange={(v) => set("depreciacoes_amortizacoes", v)}
            />
          </Field>
          <Field label={copy.fields.numColaboradores} error={err("num_colaboradores")} htmlFor="colaboradores">
            <select
              id="colaboradores"
              className="field-input"
              value={form.num_colaboradores}
              onChange={(e) => set("num_colaboradores", e.target.value)}
            >
              <option value="">{copy.selectPlaceholder}</option>
              {NUM_COLABORADORES.map((n) => (
                <option key={n} value={n}>
                  {opt(n)}
                </option>
              ))}
            </select>
          </Field>
        </div>
      )}

      {step === 3 && (
        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            label={copy.fields.pctTop5}
            hint={`${copy.optional}, %`}
            error={err("pct_top5_clientes")}
            htmlFor="top5"
          >
            <PercentInput id="top5" value={form.pct_top5_clientes} onChange={(v) => set("pct_top5_clientes", v)} />
          </Field>
          <Field
            label={copy.fields.pctTop1}
            hint={`${copy.optional}, %`}
            error={err("pct_top1_clientes")}
            htmlFor="top1"
          >
            <PercentInput id="top1" value={form.pct_top1_clientes} onChange={(v) => set("pct_top1_clientes", v)} />
          </Field>
          <Field
            label={copy.fields.backlog}
            hint={copy.optional}
            tooltip={copy.tooltips.backlog}
            htmlFor="backlog"
          >
            <MoneyInput id="backlog" value={form.backlog_contratado} onChange={(v) => set("backlog_contratado", v)} />
          </Field>
          <Field label={copy.fields.geografiaClientes} hint={copy.optional} htmlFor="geografia">
            <select
              id="geografia"
              className="field-input"
              value={form.geografia_clientes}
              onChange={(e) => set("geografia_clientes", e.target.value)}
            >
              <option value="">{copy.selectPlaceholder}</option>
              {GEOGRAFIAS.map((g) => (
                <option key={g} value={g}>
                  {opt(g)}
                </option>
              ))}
            </select>
          </Field>
          <Field label={copy.fields.dependenciaFaturacao} hint={copy.optional} htmlFor="depfat">
            <select
              id="depfat"
              className="field-input"
              value={form.dependencia_faturacao}
              onChange={(e) => set("dependencia_faturacao", e.target.value)}
            >
              <option value="">{copy.selectPlaceholder}</option>
              {DEPENDENCIAS_FATURACAO.map((d) => (
                <option key={d} value={d}>
                  {opt(d)}
                </option>
              ))}
            </select>
          </Field>
          <Field label={copy.fields.dependenciaGestao} hint={copy.optional} htmlFor="depgest">
            <select
              id="depgest"
              className="field-input"
              value={form.dependencia_gestao}
              onChange={(e) => set("dependencia_gestao", e.target.value)}
            >
              <option value="">{copy.selectPlaceholder}</option>
              {DEPENDENCIAS_GESTAO.map((d) => (
                <option key={d} value={d}>
                  {opt(d)}
                </option>
              ))}
            </select>
          </Field>
        </div>
      )}

      {step === 4 && (
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field
              label={copy.fields.proprietarioImovel}
              error={err("proprietario_imovel")}
              htmlFor="propimovel"
            >
              <select
                id="propimovel"
                className="field-input"
                value={form.proprietario_imovel}
                onChange={(e) => set("proprietario_imovel", e.target.value)}
              >
                <option value="">{copy.selectPlaceholder}</option>
                <option value="Sim">{copy.yes}</option>
                <option value="Não">{copy.no}</option>
              </select>
            </Field>
          </div>

          {form.proprietario_imovel === "Não" && (
            <>
              <div className="sm:col-span-2">
                <Field
                  label={copy.fields.rendaReflectMercado}
                  error={err("renda_reflete_mercado")}
                  htmlFor="rendamercado"
                >
                  <select
                    id="rendamercado"
                    className="field-input"
                    value={form.renda_reflete_mercado}
                    onChange={(e) => set("renda_reflete_mercado", e.target.value)}
                  >
                    <option value="">{copy.selectPlaceholder}</option>
                    <option value="Sim">{copy.yes}</option>
                    <option value="Não">{copy.no}</option>
                  </select>
                </Field>
              </div>
              {form.renda_reflete_mercado === "Não" && (
                <div className="sm:col-span-2">
                  <Field
                    label={copy.fields.acrescimoRendaAnual}
                    tooltip={copy.tooltips.acrescimoRenda}
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
                  label={copy.fields.valorizacaoImovel}
                  tooltip={copy.tooltips.valorizacaoImovel}
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
                  label={copy.fields.incluirImovelPerimetro}
                  error={err("incluir_imovel_perimetro")}
                  htmlFor="perimetro"
                >
                  <select
                    id="perimetro"
                    className="field-input"
                    value={form.incluir_imovel_perimetro}
                    onChange={(e) => set("incluir_imovel_perimetro", e.target.value)}
                  >
                    <option value="">{copy.selectPlaceholder}</option>
                    <option value="Sim">{copy.yes}</option>
                    <option value="Não">{copy.no}</option>
                  </select>
                </Field>
              </div>
              <Field
                label={copy.fields.metodoAvaliacaoImovel}
                error={err("metodo_avaliacao_imovel")}
                htmlFor="metodoimovel"
              >
                <select
                  id="metodoimovel"
                  className="field-input"
                  value={form.metodo_avaliacao_imovel}
                  onChange={(e) => set("metodo_avaliacao_imovel", e.target.value)}
                >
                  <option value="">{copy.selectPlaceholder}</option>
                  {METODOS_AVALIACAO_IMOVEL.map((m) => (
                    <option key={m} value={m}>
                      {opt(m)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={copy.fields.anoAvaliacaoImovel} hint={copy.optional} htmlFor="anoimovel">
                <input
                  id="anoimovel"
                  inputMode="numeric"
                  className="field-input"
                  value={form.ano_avaliacao_imovel}
                  onChange={(e) => set("ano_avaliacao_imovel", digitsOnly(e.target.value).slice(0, 4))}
                />
              </Field>

              <p className="text-xs leading-relaxed font-light text-muted-foreground sm:col-span-2">
                {copy.fields.imovelNota}
              </p>
            </>
          )}
        </div>
      )}

      {step === 5 && (
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label={copy.fields.estruturaTransacao} error={err("estrutura_transacao")} htmlFor="estrutura">
            <select
              id="estrutura"
              className="field-input"
              value={form.estrutura_transacao}
              onChange={(e) => set("estrutura_transacao", e.target.value)}
            >
              <option value="">{copy.selectPlaceholder}</option>
              {ESTRUTURAS_TRANSACAO.map((e) => (
                <option key={e} value={e}>
                  {opt(e)}
                </option>
              ))}
            </select>
          </Field>
          <Field label={copy.fields.motivoInteresse} error={err("motivo_interesse")} htmlFor="motivo">
            <select
              id="motivo"
              className="field-input"
              value={form.motivo_interesse}
              onChange={(e) => set("motivo_interesse", e.target.value)}
            >
              <option value="">{copy.selectPlaceholder}</option>
              {MOTIVOS_INTERESSE.map((m) => (
                <option key={m} value={m}>
                  {opt(m)}
                </option>
              ))}
            </select>
          </Field>
          <Field label={copy.fields.horizonteTemporal} error={err("horizonte_temporal")} htmlFor="horizonte">
            <select
              id="horizonte"
              className="field-input"
              value={form.horizonte_temporal}
              onChange={(e) => set("horizonte_temporal", e.target.value)}
            >
              <option value="">{copy.selectPlaceholder}</option>
              {HORIZONTES.map((h) => (
                <option key={h} value={h}>
                  {opt(h)}
                </option>
              ))}
            </select>
          </Field>
          <Field label={copy.fields.pctATransacionar} error={err("pct_a_transacionar")} htmlFor="pcttrans">
            <select
              id="pcttrans"
              className="field-input"
              value={form.pct_a_transacionar}
              onChange={(e) => set("pct_a_transacionar", e.target.value)}
            >
              <option value="">{copy.selectPlaceholder}</option>
              {PCT_TRANSACIONAR.map((p) => (
                <option key={p} value={p}>
                  {opt(p)}
                </option>
              ))}
            </select>
          </Field>
          <Field
            label={copy.fields.permanenciaPosVenda}
            error={err("permanencia_pos_venda")}
            htmlFor="permanencia"
          >
            <select
              id="permanencia"
              className="field-input"
              value={form.permanencia_pos_venda}
              onChange={(e) => set("permanencia_pos_venda", e.target.value)}
            >
              <option value="">{copy.selectPlaceholder}</option>
              {PERMANENCIAS_POS_VENDA.map((p) => (
                <option key={p} value={p}>
                  {opt(p)}
                </option>
              ))}
            </select>
          </Field>
          <Field label={copy.fields.tipoInvestidor} error={err("tipo_investidor")} htmlFor="tipoinvestidor">
            <select
              id="tipoinvestidor"
              className="field-input"
              value={form.tipo_investidor}
              onChange={(e) => set("tipo_investidor", e.target.value)}
            >
              <option value="">{copy.selectPlaceholder}</option>
              {TIPOS_INVESTIDOR.map((t) => (
                <option key={t} value={t}>
                  {opt(t)}
                </option>
              ))}
            </select>
          </Field>

        </div>
      )}

      {step === 6 && (
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label={copy.fields.nome} error={err("nome")} htmlFor="nome">
            <input id="nome" className="field-input" value={form.nome} onChange={(e) => set("nome", e.target.value)} />
          </Field>
          <Field label={copy.fields.email} error={err("email")} htmlFor="email">
            <input
              id="email"
              type="email"
              className="field-input"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </Field>
          <Field label={copy.fields.telefone} error={err("telefone")} htmlFor="telefone">
            <input
              id="telefone"
              className="field-input"
              value={form.telefone}
              onChange={(e) => set("telefone", e.target.value)}
            />
          </Field>
          <Field label={copy.fields.empresa} error={err("empresa")} htmlFor="empresa">
            <input
              id="empresa"
              className="field-input"
              value={form.empresa}
              onChange={(e) => set("empresa", e.target.value)}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label={copy.fields.cargo} error={err("cargo")} htmlFor="cargo">
              <input
                id="cargo"
                className="field-input"
                placeholder={copy.fields.cargoPlaceholder}
                value={form.cargo}
                onChange={(e) => set("cargo", e.target.value)}
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label={copy.fields.idiomaRelatorio} htmlFor="idiomaRelatorio">
              <select
                id="idiomaRelatorio"
                className="field-input"
                value={form.idioma}
                onChange={(e) => {
                  setIdiomaTocado(true);
                  set("idioma", e.target.value as "pt" | "en" | "es");
                }}
              >
                <option value="pt">Português</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
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
              <span>{copy.fields.consentimento}</span>
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
          {copy.previous}
        </button>
        <button type="button" className="btn-primary" onClick={next} disabled={touched && !valid}>
          {step === STEPS.length - 1 ? copy.submit : copy.next}
        </button>
      </div>
    </div>
  );
}
