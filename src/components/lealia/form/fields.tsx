import { Info } from "lucide-react";
import { formatThousands, digitsOnly } from "@/lib/money";

export function Field({
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

export function MoneyInput({
  id,
  value,
  onChange,
  allowNegative = false,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  /** Só o EBITDA pode ser negativo. */
  allowNegative?: boolean;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        className="field-input pr-9"
        inputMode="numeric"
        autoComplete="off"
        placeholder="0"
        value={formatThousands(value)}
        onChange={(e) => {
          const v = digitsOnly(e.target.value);
          onChange(allowNegative ? v : v.replace("-", ""));
        }}
      />
      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
        €
      </span>
    </div>
  );
}

export function PercentInput({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
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

export function SelectField({
  id,
  value,
  onChange,
  options,
  opt,
  placeholder,
  disabled,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  opt: (v: string) => string;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <select
      id={id}
      className="field-input"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    >
      {placeholder !== undefined && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o} value={o}>
          {opt(o)}
        </option>
      ))}
    </select>
  );
}
