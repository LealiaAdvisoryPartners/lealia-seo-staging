// Preparação dos dados do relatório personalizado.
// Puro: sem I/O, sem dependências de servidor — usado no cliente e no servidor.
// Ponto de entrada único: monta o contexto partilhado e compõe cada secção.
import { calcularValuation } from "../valuation.ts";
import { type ReportLang } from "../report-i18n/index.ts";
import { buildContext } from "./context.ts";
import { valuationInputFromLead } from "./types.ts";
import type { ReportLead, LinhaHistorico } from "./types.ts";
import { buildPerfil } from "./sections/perfil.ts";
import { buildDrivers } from "./sections/drivers.ts";
import { buildRiscos } from "./sections/riscos.ts";
import { buildEquity } from "./sections/equity.ts";
import { buildMultiplos } from "./sections/multiplos.ts";
import { buildHistorico } from "./sections/historico.ts";
import { buildPreparacao } from "./sections/preparacao.ts";
import { buildDcf } from "./sections/dcf.ts";

export type { ReportLead, LinhaHistorico, AnoBruto, Driver, Risco, ReportFlags, Ctx } from "./types.ts";
export { valuationInputFromLead } from "./types.ts";

export type ReportData = ReturnType<typeof buildReportData>;

/**
 * Prepara todos os dados (valores formatados, flags e textos dinâmicos) que o
 * template do relatório consome. `result` deve vir de `calcularValuation`
 * com o mesmo input, garantindo números idênticos aos da página.
 */
export function buildReportData(
  lead: ReportLead,
  result: ReturnType<typeof calcularValuation>,
  lang: ReportLang = "pt",
) {
  const ctx = buildContext(lead, result, lang);
  const { r, L, NAO_INDICADO, fmt, ano, historico, flags } = ctx;
  const { eur, pct1 } = fmt;

  const perfil = buildPerfil(ctx);
  const { drivers, recomendacoes } = buildDrivers(ctx);
  const { riscos } = buildRiscos(ctx);
  const equity = buildEquity(ctx);
  const multiplos = buildMultiplos(ctx);
  const historicoSecao = buildHistorico(ctx);
  const preparacao = buildPreparacao(ctx);
  const dcf = buildDcf(ctx);

  const margem_ebitda_ajustada = ctx.margem_ebitda_ajustada;

  return {
    ok: ctx.ok,
    motivo: result.ok ? null : (result as { ok: false; motivo: string }).motivo,
    lang,

    ...perfil,

    ebitda_normalizado_formatado: r ? eur(r.ebitda_base) : NAO_INDICADO,
    valor_imovel_perimetro_formatado: ctx.imovel_no_perimetro && lead.valorizacao_imovel ? eur(lead.valorizacao_imovel) : "n/a",
    ajuste_imovel_formatado: r && r.ajuste_ebitda_imovel !== 0 ? eur(Math.abs(r.ajuste_ebitda_imovel)) : null,
    margem_ebitda_ajustada,
    margem_ebitda_ajustada_formatada: margem_ebitda_ajustada !== null ? pct1(margem_ebitda_ajustada) : L.common.tracoLongo,

    ...equity,
    ...multiplos,

    anos_preenchidos: r?.anos_preenchidos ?? historico.length,
    historico,
    nota_historico: historico.length === 1 ? L.historico.umAno : L.historico.variosAnos(historico.length),

    resumo_textual: preparacao.resumo_textual,
    drivers,
    recomendacoes,

    ...historicoSecao,

    riscos,
    plano: preparacao.plano,
    implicacoes_participacao: preparacao.implicacoes_participacao,
    implicacoes_estrutura: preparacao.implicacoes_estrutura,
    mensagem_acionista: preparacao.mensagem_acionista,
    limitacoes: preparacao.limitacoes,

    nota_equity: L.notas.equity,
    nota_minoria: L.notas.minoria,

    ...dcf,
    ...flags,
  };
}

/** Atalho: calcula e prepara o relatório a partir da linha do lead. */
export function buildReportFromLead(lead: ReportLead, lang: ReportLang = "pt") {
  const result = calcularValuation(valuationInputFromLead(lead));
  return buildReportData(lead, result, lang);
}

/**
 * Versão "teaser" do relatório: conserva apenas os dados necessários às
 * páginas públicas 1, 3, 4, 5, 6, 13 e 14. O conteúdo exclusivo das páginas
 * 2 e 7 a 12 nunca é enviado para o browser do cliente.
 */
export function redigirRelatorioTeaser(d: ReportData): ReportData {
  return {
    ...d,
    dcf: null,
    dcf_motivo: null,
    grafico_evolucao: [],
    cenarios: [],
    sensibilidade: { colunas: [], linhas: [] },
    ponte: [],
    drivers: [],
    riscos: [],
    plano: [],
    recomendacoes: [],
    implicacoes_estrutura: [],
    implicacoes_participacao: "",
    dimensoes_confianca: [],
    limitacoes: [],
    alertas: [],
    mensagem_acionista: "",
  };
}
