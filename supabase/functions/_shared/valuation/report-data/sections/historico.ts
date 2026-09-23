// Waterfall do EBITDA normalizado, série gráfica de evolução, qualidade dos
// resultados e alertas automáticos.
import { traduzirLinhaEbitdaLabel } from "../translate.ts";
import type { Ctx } from "../types.ts";

export function buildHistorico(ctx: Ctx) {
  const { r, ano, lang, L, fmt, lead, proprietario, imovelNoPerimetro, top5, capex } = ctx;
  const { eur, pct1 } = fmt;

  // --- Normalização do EBITDA (waterfall) ---
  const linhas_ebitda = (r?.linhas_ebitda ?? []).map((l) => ({
    label: traduzirLinhaEbitdaLabel(l.label, ano, lang),
    tipo: l.tipo,
    valor: l.valor,
    formatado: `${l.tipo === "ajuste" && l.valor > 0 ? "+" : ""}${eur(l.valor)}`,
  }));

  // --- Dados para o gráfico de evolução ---
  const grafico_evolucao = [...ctx.anosBrutos]
    .reverse()
    .filter((a) => typeof a.faturacao === "number")
    .map((a) => ({
      ano: a.ano,
      faturacao: a.faturacao as number,
      ebitda: typeof a.ebitda === "number" ? a.ebitda : 0,
      ebitda_normalizado:
        (typeof a.ebitda === "number" ? a.ebitda : 0) + (typeof a.desp === "number" ? a.desp : 0),
      faturacao_formatada: eur(a.faturacao),
      ebitda_formatado: eur(a.ebitda),
    }));
  const grafico_max = Math.max(1, ...grafico_evolucao.map((g) => g.faturacao));

  // --- Qualidade dos resultados ---
  const serie = grafico_evolucao.filter((g) => g.faturacao > 0);
  const cagr = (ini: number, fim: number, anos: number) =>
    ini > 0 && fim > 0 && anos > 0 ? (Math.pow(fim / ini, 1 / anos) - 1) * 100 : null;

  const cagrFaturacao =
    serie.length >= 2 ? cagr(serie[0]!.faturacao, serie[serie.length - 1]!.faturacao, serie.length - 1) : null;
  // CAGR do EBITDA calculado sobre o EBITDA normalizado (EBITDA + extraordinários),
  // coerente com a base de avaliação.
  const serieEbitda = serie.filter((g) => g.ebitda_normalizado > 0);
  const cagrEbitda =
    serieEbitda.length >= 2
      ? cagr(
          serieEbitda[0]!.ebitda_normalizado,
          serieEbitda[serieEbitda.length - 1]!.ebitda_normalizado,
          serieEbitda.length - 1,
        )
      : null;

  const margensSerie = serie
    .filter((g) => g.ebitda !== 0)
    .map((g) => ({ ano: g.ano, margem: (g.ebitda / g.faturacao) * 100 }));
  const amplitudeMargem =
    margensSerie.length >= 2
      ? Math.max(...margensSerie.map((m) => m.margem)) - Math.min(...margensSerie.map((m) => m.margem))
      : null;

  const qualidade = {
    tem_serie: serie.length >= 2,
    apenas_um_ano: serie.length <= 1,
    nota_um_ano: L.qualidade.notaUmAno,
    cagr_faturacao: cagrFaturacao !== null ? pct1(cagrFaturacao) : null,
    cagr_ebitda: cagrEbitda !== null ? pct1(cagrEbitda) : null,
    margens: margensSerie.map((m) => ({ ano: m.ano, margem: pct1(m.margem), valor: m.margem })),
    comentario_margens:
      amplitudeMargem === null
        ? null
        : amplitudeMargem <= 2
          ? L.qualidade.margensEstaveis
          : amplitudeMargem <= 5
            ? L.qualidade.margensModeradas
            : L.qualidade.margensRelevantes,
    conversao_caixa:
      r && typeof capex === "number" && r.ebitda_base > 0
        ? L.qualidade.conversaoCaixaComCapex(eur(capex), pct1(((r.ebitda_base - capex) / r.ebitda_base) * 100))
        : L.qualidade.conversaoCaixaSemCapex,
    fundo_maneio: L.qualidade.fundoManeio,
    backlog:
      typeof lead.backlog_contratado === "number" ? L.qualidade.backlog(eur(lead.backlog_contratado)) : null,
    concentracao:
      typeof top5 === "number"
        ? L.qualidade.concentracaoTop5(top5) +
          (typeof lead.pct_top1_clientes === "number" ? L.qualidade.concentracaoTop1(lead.pct_top1_clientes) : "") +
          L.qualidade.concentracaoFim
        : null,
    ajustamentos:
      typeof lead.despesas_extraordinarias_ano1 === "number" && lead.despesas_extraordinarias_ano1 !== 0
        ? L.qualidade.ajustamentosDeclarados(eur(lead.despesas_extraordinarias_ano1))
        : L.qualidade.ajustamentosNaoDeclarados,
  };

  // --- Alertas automáticos ---
  const alertas: string[] = [];
  if (serie.length <= 1) alertas.push(L.alertas.umPeriodo);
  if (typeof lead.despesas_extraordinarias_ano1 === "number" && lead.despesas_extraordinarias_ano1 !== 0)
    alertas.push(L.alertas.ajustamentosSemSuporte);
  alertas.push(L.alertas.fundoManeioNaoAnalisado);
  if (proprietario && lead.metodo_avaliacao_imovel !== "Avaliação independente") alertas.push(L.alertas.imovelSemAvaliacao);
  if (imovelNoPerimetro && !(typeof lead.valorizacao_imovel === "number" && lead.valorizacao_imovel > 0))
    alertas.push(L.alertas.imovelSemValor);
  if (!lead.tipo_periodo) alertas.push(L.alertas.periodoNaoClassificado);
  if (typeof top5 === "number" && typeof lead.pct_top1_clientes === "number" && top5 < lead.pct_top1_clientes)
    alertas.push(L.alertas.concentracaoInconsistente);
  if ((lead.pct_a_transacionar ?? "").startsWith("Minoritária")) alertas.push(L.alertas.minoritariaAtencao);

  return { linhas_ebitda, grafico_evolucao, grafico_max, qualidade, alertas };
}
