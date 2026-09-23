import { INDUSTRIAS, NUM_CLIENTES_ATIVOS, PAISES, UNIDADES } from "@core/valuation";
import { Field, SelectField } from "../fields";
import { isNum } from "../state";
import type { StepDef, FormErrors } from "../types";

export const sobreEmpresa: StepDef = {
  id: "sobre-empresa",
  Component({ form, set, copy, opt, err, subindustrias }) {
    return (
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={copy.fields.pais} htmlFor="pais">
          <SelectField id="pais" value={form.pais} onChange={(v) => set("pais", v)} options={PAISES} opt={opt} />
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
          <SelectField
            id="industria"
            value={form.industria}
            onChange={(v) => {
              set("industria", v);
              set("subindustria", "");
            }}
            options={INDUSTRIAS}
            opt={opt}
            placeholder={copy.selectPlaceholder}
          />
        </Field>
        <Field label={copy.fields.subindustria} error={err("subindustria")} htmlFor="subindustria">
          <SelectField
            id="subindustria"
            value={form.subindustria}
            onChange={(v) => set("subindustria", v)}
            options={subindustrias}
            opt={opt}
            placeholder={subindustrias.length === 0 ? copy.notApplicable : copy.selectPlaceholder}
            disabled={subindustrias.length === 0}
          />
        </Field>
        <Field label={copy.fields.unidades} tooltip={copy.tooltips.unidades} error={err("unidades")} htmlFor="unidades">
          <SelectField
            id="unidades"
            value={form.unidades}
            onChange={(v) => set("unidades", v)}
            options={UNIDADES}
            opt={opt}
            placeholder={copy.selectPlaceholder}
          />
        </Field>
        <Field label={copy.fields.clientesAtivos} hint={copy.optional} htmlFor="clientes">
          <SelectField
            id="clientes"
            value={form.num_clientes_ativos}
            onChange={(v) => set("num_clientes_ativos", v)}
            options={NUM_CLIENTES_ATIVOS}
            opt={opt}
            placeholder={copy.selectPlaceholder}
          />
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
    );
  },
  validate(form, copy, subindustrias) {
    const errors: FormErrors = {};
    if (!isNum(form.idade_empresa) || Number(form.idade_empresa) < 0) errors.idade_empresa = copy.errors.idadeInvalida;
    if (!form.industria) errors.industria = copy.errors.selecioneIndustria;
    if (subindustrias.length > 0 && !form.subindustria) errors.subindustria = copy.errors.selecioneSubindustria;
    if (!form.atividade_principal.trim()) errors.atividade_principal = copy.errors.campoObrigatorio;
    else if (form.atividade_principal.trim().length > 100) errors.atividade_principal = copy.errors.maximo100;
    if (!form.unidades) errors.unidades = copy.errors.selecioneOpcao;
    return errors;
  },
};
