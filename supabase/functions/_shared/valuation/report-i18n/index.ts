// Textos e formatação do relatório de avaliação (PT | EN | ES).
//
//   format.ts  formatadores sensíveis ao idioma
//   pt.ts      dicionário de referência — define a forma dos outros dois
//   en.ts      \ traduções; o TypeScript garante que nenhuma chave falta
//   es.ts      /
//
// Uso: `const c = t(lang); c.slide3.titulo`

import { pt } from "./pt.ts";
import { en } from "./en.ts";
import { es } from "./es.ts";
import type { ReportLang } from "./format.ts";

export * from "./format.ts";

export type ReportCopy = typeof pt;

export const REPORT_I18N: Record<ReportLang, ReportCopy> = { pt, en, es };

/** Dicionário do idioma pedido (português por omissão). */
export function t(lang: ReportLang = "pt"): ReportCopy {
  return REPORT_I18N[lang];
}
