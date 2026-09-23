// Constrói, uma única vez, os dados partilhados por todas as secções do
// relatório (formatação, histórico, flags e agregados derivados do lead).
import { OUTRA_INDUSTRIA, OUTRO, type ValuationResult } from "../valuation.ts";
import { t, type ReportLang } from "../report-i18n/index.ts";
import { makeFormatters } from "./helpers.ts";
import type { AnoBruto, Ctx, LinhaHistorico, ReportFlags, ReportLead } from "./types.ts";

export function buildContext(lead: ReportLead, result: ValuationResult, lang: ReportLang): Ctx {
  const L = t(lang);
  const ok = result.ok;
  const r = result.ok ? result : null;
  const ano = lead.ano_referencia ?? new Date().getFullYear();
  const fat1 = lead.faturacao_ano1 ?? 0;

  const NAO_INDICADO = L.common.naoIndicado;
  const fmt = makeFormatters(lang, NAO_INDICADO);
  const { eur } = fmt;

  // Histórico: apenas anos efetivamente preenchidos.
  const anosBrutos: AnoBruto[] = [
    { ano, faturacao: lead.faturacao_ano1, ebitda: lead.ebitda_ano1, desp: lead.despesas_extraordinarias_ano1 },
    {
      ano: ano - 1,
      faturacao: lead.faturacao_ano2,
      ebitda: lead.ebitda_ano2,
      desp: lead.despesas_extraordinarias_ano2,
    },
    {
      ano: ano - 2,
      faturacao: lead.faturacao_ano3,
      ebitda: lead.ebitda_ano3,
      desp: lead.despesas_extraordinarias_ano3,
    },
  ].filter((a) => typeof a.faturacao === "number" || typeof a.ebitda === "number");

  // Impacto da normalização da renda em cada período (recorrente e anual):
  // é o mesmo ajuste que entra no EBITDA normalizado, com sinal negativo.
  const impactoRenda = r && r.ajuste_ebitda_imovel !== 0 ? r.ajuste_ebitda_imovel : null;
  const normalizacaoRenda = impactoRenda !== null ? `−${eur(Math.abs(impactoRenda))}` : L.common.tracoLongo;

  const historico: LinhaHistorico[] = anosBrutos.map((a) => ({
    ano: a.ano,
    faturacao: eur(a.faturacao),
    ebitda: eur(a.ebitda),
    normalizacoes: normalizacaoRenda,
    despesas: typeof a.desp === "number" && a.desp !== 0 ? eur(a.desp) : L.common.tracoLongo,
  }));

  const margem_ebitda_ajustada = r && fat1 > 0 ? (r.ebitda_base / fat1) * 100 : null;

  const proprietario = lead.proprietario_imovel === "Sim";
  const imovelNoPerimetro = proprietario && lead.incluir_imovel_perimetro === "Sim";
  const top5 = lead.pct_top5_clientes;
  const top1 = lead.pct_top1_clientes;
  const depGest = lead.dependencia_acionista_gestao ?? null;
  const depFat = lead.dependencia_acionista_faturacao ?? null;
  const capex = lead.capex_anual_recorrente;

  const crescimentoAjuste = r?.ajustes.find((a) => a.label === "Crescimento");
  const crescimento_forte = !!crescimentoAjuste && crescimentoAjuste.multiplicador > 1;
  const crescimento_negativo = !!crescimentoAjuste && crescimentoAjuste.multiplicador < 1;

  const capex_intensivo = !!(r && typeof capex === "number" && r.ebitda_base > 0 && capex / r.ebitda_base > 0.3);

  const flags: ReportFlags = {
    industria_saude: lead.industria === "Saúde",
    industria_energia: lead.industria === "Energia",
    industria_tecnologia: lead.industria === "Tecnologia",
    industria_manufatura: lead.industria === "Manufatura/Indústria",
    industria_generica: lead.industria === OUTRA_INDUSTRIA || (lead.subindustria ?? "") === OUTRO,
    concentracao_alta: typeof top5 === "number" && top5 > 60,
    concentracao_baixa: typeof top5 === "number" && top5 < 30,
    dependencia_gestao_alta: depGest === "Alta",
    dependencia_gestao_baixa: depGest === "Baixa",
    dependencia_faturacao_alta: !!depFat?.startsWith("Alta"),
    unidade_unica: lead.unidades === "Localização única",
    crescimento_forte,
    crescimento_negativo,
    capex_intensivo,
    empresa_jovem: typeof lead.idade_empresa === "number" && lead.idade_empresa < 3,
    tem_imovel_proprio: proprietario,
    imovel_no_perimetro: imovelNoPerimetro,
    tem_ajuste_imovel: !!r && r.ajuste_ebitda_imovel !== 0,
    tem_divida: !!r && r.tem_divida,
    mostrar_equity: !!r,
    tem_anos_anteriores: historico.length > 1,
  };

  const capexRacio = r && typeof capex === "number" && r.ebitda_base > 0 ? capex / r.ebitda_base : null;
  const ebitdaBase = r?.ebitda_base ?? null;
  const caixa = lead.caixa_e_depositos;
  const divida = lead.divida_financeira;
  const posicaoLiquida =
    typeof caixa === "number" || typeof divida === "number" ? (caixa ?? 0) - (divida ?? 0) : null;
  const backlog = lead.backlog_contratado;
  const backlogRacio = typeof backlog === "number" && fat1 > 0 ? backlog / fat1 : null;
  const geografiaInternacional =
    !!lead.geografia_clientes && !lead.geografia_clientes.startsWith("Nacional");
  const multiUnidade =
    !!lead.unidades && lead.unidades !== "Localização única" && lead.unidades !== "Não aplicável";
  const imovelAvaliadoExternamente =
    imovelNoPerimetro &&
    typeof lead.valorizacao_imovel === "number" &&
    (lead.metodo_avaliacao_imovel === "Avaliação independente recente" ||
      lead.metodo_avaliacao_imovel === "Avaliação bancária");
  const racioDivida = r && r.ebitda_base > 0 ? r.divida_liquida / r.ebitda_base : null;

  return {
    lead,
    result,
    r,
    ok,
    lang,
    L,
    ano,
    fat1,
    NAO_INDICADO,
    fmt,
    anosBrutos,
    historico,
    impactoRenda,
    normalizacaoRenda,
    margem_ebitda_ajustada,
    proprietario,
    imovelNoPerimetro,
    top5,
    top1,
    depGest,
    depFat,
    capex,
    caixa,
    divida,
    posicaoLiquida,
    backlog,
    backlogRacio,
    ebitdaBase,
    capexRacio,
    racioDivida,
    geografiaInternacional,
    multiUnidade,
    imovelAvaliadoExternamente,
    crescimento_forte,
    crescimento_negativo,
    flags,
  };
}
