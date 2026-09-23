import { NUM_COLABORADORES } from "@core/valuation";
import { Field, MoneyInput, SelectField } from "../fields";
import { filled } from "../state";
import type { FormErrors, StepDef } from "../types";

export const balancoInvestimento: StepDef = {
  id: "balanco-investimento",
  Component({ form, set, copy, opt, err }) {
    return (
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
          <SelectField
            id="colaboradores"
            value={form.num_colaboradores}
            onChange={(v) => set("num_colaboradores", v)}
            options={NUM_COLABORADORES}
            opt={opt}
            placeholder={copy.selectPlaceholder}
          />
        </Field>
      </div>
    );
  },
  validate(form, copy) {
    const errors: FormErrors = {};
    if (!filled(form.caixa_e_depositos)) errors.caixa_e_depositos = copy.errors.campoObrigatorio;
    if (!filled(form.divida_financeira)) errors.divida_financeira = copy.errors.campoObrigatorio;
    if (!filled(form.depreciacoes_amortizacoes)) errors.depreciacoes_amortizacoes = copy.errors.campoObrigatorio;
    if (!form.num_colaboradores) errors.num_colaboradores = copy.errors.selecioneOpcao;
    return errors;
  },
};
