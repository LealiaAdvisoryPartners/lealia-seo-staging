// Helpers de formatação partilhados pelos construtores de secções do relatório.
import { formatEURLang, formatPercentLang, type ReportLang } from "../report-i18n/index.ts";

/** Formatadores de números sensíveis ao idioma, usados em todas as secções. */
export type Formatters = {
  /** Formata um valor em euros; devolve `naoIndicado` quando o valor não é um número. */
  eur: (v?: number | null) => string;
  /** Formata uma percentagem com uma casa decimal (o valor já vem em pontos percentuais). */
  pct1: (v: number) => string;
};

export function makeFormatters(lang: ReportLang, naoIndicado: string): Formatters {
  return {
    pct1: (v: number) => formatPercentLang(v, lang),
    eur: (v?: number | null) => (typeof v === "number" ? formatEURLang(Math.round(v), lang) : naoIndicado),
  };
}

/**
 * Escolhe o primeiro par `[condição, valor]` cuja condição é verdadeira, na
 * ordem dada — substitui cadeias de `if/else if` que mapeiam um valor para
 * um rótulo/qualificação. Devolve `fallback` se nenhuma condição bate certo.
 */
export function pickFirst<T>(candidatos: Array<[boolean, T]>, fallback: T): T {
  for (const [condicao, valor] of candidatos) {
    if (condicao) return valor;
  }
  return fallback;
}
