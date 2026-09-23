// Cenários, múltiplos, sensibilidade e índice de confiança do resultado.
import { formatMultipleLang, type Ajuste } from "../../report-i18n/index.ts";
import { CONF_LEVEL_WORD, DIMENSAO_MAP, ITEM_CONFIANCA_MAP, traduzirAjuste, traduzirCenarioPressuposto } from "../translate.ts";
import type { Confianca } from "../../valuation.ts";
import type { Ctx } from "../types.ts";

export function buildMultiplos(ctx: Ctx) {
  const { L, r, lang, fmt } = ctx;
  const { eur, pct1 } = fmt;

  const cenarios = (r?.cenarios ?? []).map((c) => ({
    nome: c.nome,
    multiplo: formatMultipleLang(c.multiplo, lang),
    ev: eur(c.ev),
    equity: eur(c.equity),
    pressuposto: traduzirCenarioPressuposto(c.nome, c.pressuposto, lang),
  }));

  const sensibilidade = r
    ? {
        colunas: r.sensibilidade.multiplos.map((m) => formatMultipleLang(m, lang)),
        linhas: r.sensibilidade.linhas.map((l) => ({
          variacao: l.variacao,
          ebitda: eur(l.ebitda),
          valores: l.valores.map((v) => eur(v)),
          destaque: l.variacao === "Base",
        })),
      }
    : null;

  const dimensoes_confianca = (r?.dimensoes_confianca ?? []).map((d) => {
    const dimKey = DIMENSAO_MAP[d.dimensao];
    return {
      dimensao: dimKey ? L.engine.dimensoes[dimKey] : d.dimensao,
      peso: d.peso,
      percentagem: Math.round(d.cobertura * 100),
      em_falta: d.em_falta.map((item) => {
        const itemKey = ITEM_CONFIANCA_MAP[item];
        return itemKey ? L.engine.itensConfianca[itemKey] : item;
      }),
    };
  });

  void pct1;

  return {
    multiplo_base_min: r?.multiplo_base_min ?? null,
    multiplo_base_max: r?.multiplo_base_max ?? null,
    multiplo_ajustado_min: r?.multiplo_ajustado_min ?? null,
    multiplo_ajustado_max: r?.multiplo_ajustado_max ?? null,

    pontos_confianca: r?.pontos_confianca ?? null,
    confianca: (r ? CONF_LEVEL_WORD[r.confianca][lang] : null) as Confianca | null,
    confianca_explicacao: r
      ? r.confianca === "Baixa"
        ? L.engine.confExplicacao.baixa
        : r.confianca === "Média"
          ? L.engine.confExplicacao.media
          : L.engine.confExplicacao.alta
      : null,

    ajustes: (r?.ajustes ?? []).map((a) => {
      const trad = traduzirAjuste(a, lang);
      return { ...a, label: trad.label, detalhe: trad.detalhe };
    }) as Ajuste[],
    aviso_margem: r?.aviso_margem ?? null,
    nota_setor: r?.nota_setor ?? null,

    cenarios,
    sensibilidade,
    dimensoes_confianca,
  };
}
