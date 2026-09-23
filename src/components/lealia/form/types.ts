import type { FormCopy } from "@/translations/valuation-form";
export type { FormState } from "./state";
import type { FormState } from "./state";

export type FormErrors = Partial<Record<keyof FormState, string>>;

export type StepProps = {
  form: FormState;
  set: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  copy: FormCopy;
  opt: (v: string) => string;
  err: (k: keyof FormState) => string | undefined;
  errors: FormErrors;
  subindustrias: string[];
  anoLabel: (i: 1 | 2 | 3) => string;
};

export type StepDef = {
  id: string;
  Component: (props: StepProps) => JSX.Element;
  validate: (form: FormState, copy: FormCopy, subindustrias: string[]) => FormErrors;
};
