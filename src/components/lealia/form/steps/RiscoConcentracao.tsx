import { DEPENDENCIAS_FATURACAO, DEPENDENCIAS_GESTAO, GEOGRAFIAS } from "@core/valuation";
import { Field, MoneyInput, PercentInput, SelectField } from "../fields";
import { pctOk } from "../state";
import type { FormErrors, StepDef } from "../types";

export const riscoConcentracao: StepDef = {
  id: "risco-concentracao",
  Component({ form, set, copy, opt, err }) {
    return (
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={copy.fields.pctTop5} hint={`${copy.optional}, %`} error={err("pct_top5_clientes")} htmlFor="top5">
          <PercentInput id="top5" value={form.pct_top5_clientes} onChange={(v) => set("pct_top5_clientes", v)} />
        </Field>
        <Field label={copy.fields.pctTop1} hint={`${copy.optional}, %`} error={err("pct_top1_clientes")} htmlFor="top1">
          <PercentInput id="top1" value={form.pct_top1_clientes} onChange={(v) => set("pct_top1_clientes", v)} />
        </Field>
        <Field label={copy.fields.backlog} hint={copy.optional} tooltip={copy.tooltips.backlog} htmlFor="backlog">
          <MoneyInput id="backlog" value={form.backlog_contratado} onChange={(v) => set("backlog_contratado", v)} />
        </Field>
        <Field label={copy.fields.geografiaClientes} hint={copy.optional} htmlFor="geografia">
          <SelectField
            id="geografia"
            value={form.geografia_clientes}
            onChange={(v) => set("geografia_clientes", v)}
            options={GEOGRAFIAS}
            opt={opt}
            placeholder={copy.selectPlaceholder}
          />
        </Field>
        <Field label={copy.fields.dependenciaFaturacao} hint={copy.optional} htmlFor="depfat">
          <SelectField
            id="depfat"
            value={form.dependencia_faturacao}
            onChange={(v) => set("dependencia_faturacao", v)}
            options={DEPENDENCIAS_FATURACAO}
            opt={opt}
            placeholder={copy.selectPlaceholder}
          />
        </Field>
        <Field label={copy.fields.dependenciaGestao} hint={copy.optional} htmlFor="depgest">
          <SelectField
            id="depgest"
            value={form.dependencia_gestao}
            onChange={(v) => set("dependencia_gestao", v)}
            options={DEPENDENCIAS_GESTAO}
            opt={opt}
            placeholder={copy.selectPlaceholder}
          />
        </Field>
      </div>
    );
  },
  validate(form, copy) {
    const errors: FormErrors = {};
    if (!pctOk(form.pct_top5_clientes)) errors.pct_top5_clientes = copy.errors.percentagemEntre0e100;
    if (!pctOk(form.pct_top1_clientes)) errors.pct_top1_clientes = copy.errors.percentagemEntre0e100;
    if (
      form.pct_top1_clientes !== "" &&
      form.pct_top5_clientes !== "" &&
      Number(form.pct_top1_clientes) > Number(form.pct_top5_clientes)
    )
      errors.pct_top1_clientes = copy.errors.maiorClienteExcede;
    return errors;
  },
};
