import {
  ESTRUTURAS_TRANSACAO,
  HORIZONTES,
  MOTIVOS_INTERESSE,
  PCT_TRANSACIONAR,
  PERMANENCIAS_POS_VENDA,
  TIPOS_INVESTIDOR,
} from "@core/valuation";
import { Field, SelectField } from "../fields";
import type { FormErrors, StepDef } from "../types";

export const motivacao: StepDef = {
  id: "motivacao",
  Component({ form, set, copy, opt, err }) {
    return (
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={copy.fields.estruturaTransacao} error={err("estrutura_transacao")} htmlFor="estrutura">
          <SelectField
            id="estrutura"
            value={form.estrutura_transacao}
            onChange={(v) => set("estrutura_transacao", v)}
            options={ESTRUTURAS_TRANSACAO}
            opt={opt}
            placeholder={copy.selectPlaceholder}
          />
        </Field>
        <Field label={copy.fields.motivoInteresse} error={err("motivo_interesse")} htmlFor="motivo">
          <SelectField
            id="motivo"
            value={form.motivo_interesse}
            onChange={(v) => set("motivo_interesse", v)}
            options={MOTIVOS_INTERESSE}
            opt={opt}
            placeholder={copy.selectPlaceholder}
          />
        </Field>
        <Field label={copy.fields.horizonteTemporal} error={err("horizonte_temporal")} htmlFor="horizonte">
          <SelectField
            id="horizonte"
            value={form.horizonte_temporal}
            onChange={(v) => set("horizonte_temporal", v)}
            options={HORIZONTES}
            opt={opt}
            placeholder={copy.selectPlaceholder}
          />
        </Field>
        <Field label={copy.fields.pctATransacionar} error={err("pct_a_transacionar")} htmlFor="pcttrans">
          <SelectField
            id="pcttrans"
            value={form.pct_a_transacionar}
            onChange={(v) => set("pct_a_transacionar", v)}
            options={PCT_TRANSACIONAR}
            opt={opt}
            placeholder={copy.selectPlaceholder}
          />
        </Field>
        <Field label={copy.fields.permanenciaPosVenda} error={err("permanencia_pos_venda")} htmlFor="permanencia">
          <SelectField
            id="permanencia"
            value={form.permanencia_pos_venda}
            onChange={(v) => set("permanencia_pos_venda", v)}
            options={PERMANENCIAS_POS_VENDA}
            opt={opt}
            placeholder={copy.selectPlaceholder}
          />
        </Field>
        <Field label={copy.fields.tipoInvestidor} error={err("tipo_investidor")} htmlFor="tipoinvestidor">
          <SelectField
            id="tipoinvestidor"
            value={form.tipo_investidor}
            onChange={(v) => set("tipo_investidor", v)}
            options={TIPOS_INVESTIDOR}
            opt={opt}
            placeholder={copy.selectPlaceholder}
          />
        </Field>
      </div>
    );
  },
  validate(form, copy) {
    const errors: FormErrors = {};
    if (!form.estrutura_transacao) errors.estrutura_transacao = copy.errors.selecioneOpcao;
    if (!form.motivo_interesse) errors.motivo_interesse = copy.errors.selecioneOpcao;
    if (!form.horizonte_temporal) errors.horizonte_temporal = copy.errors.selecioneOpcao;
    if (!form.pct_a_transacionar) errors.pct_a_transacionar = copy.errors.selecioneOpcao;
    if (!form.permanencia_pos_venda) errors.permanencia_pos_venda = copy.errors.selecioneOpcao;
    if (!form.tipo_investidor) errors.tipo_investidor = copy.errors.selecioneOpcao;
    return errors;
  },
};
