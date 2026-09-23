import { Field } from "../fields";
import { emailOk } from "../state";
import type { FormErrors, StepDef } from "../types";

export const contacto: StepDef = {
  id: "contacto",
  Component({ form, set, copy, err, errors }) {
    return (
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
              onChange={(e) => set("idioma", e.target.value as "pt" | "en" | "es")}
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
    );
  },
  validate(form, copy) {
    const errors: FormErrors = {};
    if (!form.nome.trim()) errors.nome = copy.errors.campoObrigatorio;
    if (!emailOk(form.email)) errors.email = copy.errors.emailInvalido;
    if (!form.telefone.trim()) errors.telefone = copy.errors.campoObrigatorio;
    if (!form.empresa.trim()) errors.empresa = copy.errors.campoObrigatorio;
    if (!form.cargo.trim()) errors.cargo = copy.errors.campoObrigatorio;
    if (!form.consentimento_rgpd) errors.consentimento_rgpd = copy.errors.consentimentoNecessario;
    return errors;
  },
};
