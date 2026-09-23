import { digitsOnly } from "@/lib/money";
import { METODOS_AVALIACAO_IMOVEL } from "@core/valuation";
import { Field, MoneyInput, SelectField } from "../fields";
import { filled } from "../state";
import type { FormErrors, StepDef } from "../types";

export const imovel: StepDef = {
  id: "imovel",
  Component({ form, set, copy, opt, err }) {
    return (
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label={copy.fields.proprietarioImovel} error={err("proprietario_imovel")} htmlFor="propimovel">
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
              <Field label={copy.fields.rendaReflectMercado} error={err("renda_reflete_mercado")} htmlFor="rendamercado">
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
                <MoneyInput id="valorizacao" value={form.valorizacao_imovel} onChange={(v) => set("valorizacao_imovel", v)} />
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
            <Field label={copy.fields.metodoAvaliacaoImovel} error={err("metodo_avaliacao_imovel")} htmlFor="metodoimovel">
              <SelectField
                id="metodoimovel"
                value={form.metodo_avaliacao_imovel}
                onChange={(v) => set("metodo_avaliacao_imovel", v)}
                options={METODOS_AVALIACAO_IMOVEL}
                opt={opt}
                placeholder={copy.selectPlaceholder}
              />
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
    );
  },
  validate(form, copy) {
    const errors: FormErrors = {};
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
    return errors;
  },
};
