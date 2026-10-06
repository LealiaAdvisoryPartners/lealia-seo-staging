import { ANOS_REFERENCIA, TIPOS_PERIODO } from "@core/valuation";
import { parseMoney } from "@/lib/money";
import { Field, MoneyInput, SelectField } from "../fields";
import { filled } from "../state";
import type { FormErrors, FormState, StepDef } from "../types";

export const dadosFinanceiros: StepDef = {
  id: "dados-financeiros",
  Component({ form, set, copy, err, anoLabel }) {
    return (
      <div className="space-y-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label={copy.fields.anoReferencia} error={err("ano_referencia")} htmlFor="anoRef">
            <SelectField
              id="anoRef"
              value={form.ano_referencia}
              onChange={(v) => set("ano_referencia", v)}
              options={ANOS_REFERENCIA.map(String)}
              opt={(v) => v}
            />
          </Field>
          <Field
            label={copy.fields.tipoPeriodo}
            tooltip={copy.tooltips.tipoPeriodo}
            error={err("tipo_periodo")}
            htmlFor="tipoperiodo"
          >
            <SelectField
              id="tipoperiodo"
              value={form.tipo_periodo}
              onChange={(v) => set("tipo_periodo", v)}
              options={TIPOS_PERIODO}
              opt={(v) => copy.options[v] ?? v}
              placeholder={copy.selectPlaceholder}
            />
          </Field>
        </div>

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
                  allowNegative
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
    );
  },
  validate(form, copy) {
    const errors: FormErrors = {};
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
    return errors;
  },
};
