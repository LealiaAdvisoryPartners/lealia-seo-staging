// Plano de preparação priorizado, limitações da análise, implicações da
// estrutura/participação, mensagem ao acionista e resumo textual.
import { formatMultipleLang } from "../../report-i18n/index.ts";
import { traduzirValorFormulario } from "../translate.ts";
import type { Ctx } from "../types.ts";

type Etapa = {
  prioridade: string;
  acao: string;
  impacto: string;
  esforco: string;
  prazo: string;
};

export function buildPreparacao(ctx: Ctx) {
  const { L, r, lang, lead, flags, historico, fmt, ano, fat1, margem_ebitda_ajustada } = ctx;
  const { eur, pct1 } = fmt;

  // --- Resumo textual ---
  const resumo_textual = r
    ? L.resumo.comResultado({
        equityMin: eur(r.equity_min),
        equityMax: eur(r.equity_max),
        evMin: eur(r.ev_min),
        evMax: eur(r.ev_max),
        ebitdaBase: eur(r.ebitda_base),
        multMin: formatMultipleLang(r.multiplo_ajustado_min, lang),
        multMax: formatMultipleLang(r.multiplo_ajustado_max, lang),
        ano,
        tipoPeriodo: traduzirValorFormulario(lead.tipo_periodo, lang) ?? "",
        fat1: eur(fat1),
        margem: margem_ebitda_ajustada !== null ? pct1(margem_ebitda_ajustada) : null,
      })
    : L.resumo.semResultado;

  // --- Mensagem ao acionista: principal oportunidade de criação/preservação de valor ---
  const mensagem_acionista =
    historico.length < 3
      ? L.mensagemAcionista.historicoLimitado
      : flags.dependencia_gestao_alta || flags.dependencia_faturacao_alta
        ? L.mensagemAcionista.dependenciaAlta
        : flags.concentracao_alta
          ? L.mensagemAcionista.concentracaoAlta
          : L.mensagemAcionista.padrao;

  // --- Plano de preparação priorizado ---
  const plano: Etapa[] = [
    ...(historico.length < 3
      ? [
          {
            prioridade: L.plano.prioridade.alta,
            acao: L.plano.consolidarHistorico,
            impacto: L.plano.impacto.alto,
            esforco: L.plano.esforco.medio,
            prazo: L.plano.prazo.semanas2a6,
          },
        ]
      : []),
    {
      prioridade: L.plano.prioridade.alta,
      acao: L.plano.reconciliarEbitda,
      impacto: L.plano.impacto.alto,
      esforco: L.plano.esforco.medio,
      prazo: L.plano.prazo.semanas1a3,
    },
    {
      prioridade: L.plano.prioridade.alta,
      acao: L.plano.confirmarDivida,
      impacto: L.plano.impacto.alto,
      esforco: L.plano.esforco.baixo,
      prazo: L.plano.prazo.semanas1a2,
    },
    {
      prioridade: L.plano.prioridade.alta,
      acao: L.plano.analisarFundoManeio,
      impacto: L.plano.impacto.alto,
      esforco: L.plano.esforco.medio,
      prazo: L.plano.prazo.semanas2a4,
    },
    ...(flags.dependencia_gestao_alta || flags.dependencia_faturacao_alta
      ? [
          {
            prioridade: L.plano.prioridade.alta,
            acao: L.plano.reduzirDependencia,
            impacto: L.plano.impacto.muitoAlto,
            esforco: L.plano.esforco.alto,
            prazo: L.plano.prazo.meses3a12,
          },
        ]
      : []),
    ...(flags.concentracao_alta
      ? [
          {
            prioridade: L.plano.prioridade.media,
            acao: L.plano.mapearConcentracao,
            impacto: L.plano.impacto.medioAlto,
            esforco: L.plano.esforco.medio,
            prazo: L.plano.prazo.semanas2a4,
          },
        ]
      : []),
    ...(flags.capex_intensivo
      ? [
          {
            prioridade: L.plano.prioridade.media,
            acao: L.plano.separarCapex,
            impacto: L.plano.impacto.medioAlto,
            esforco: L.plano.esforco.medio,
            prazo: L.plano.prazo.semanas2a4,
          },
        ]
      : []),
    ...(flags.tem_imovel_proprio
      ? [
          {
            prioridade: L.plano.prioridade.media,
            acao: L.plano.definirImovel,
            impacto: L.plano.impacto.medioAlto,
            esforco: L.plano.esforco.baixo,
            prazo: L.plano.prazo.semanas4a8,
          },
        ]
      : []),
    ...(flags.unidade_unica
      ? [
          {
            prioridade: L.plano.prioridade.media,
            acao: L.plano.demonstrarReplicabilidade,
            impacto: L.plano.impacto.medio,
            esforco: L.plano.esforco.alto,
            prazo: L.plano.prazo.meses6a12,
          },
        ]
      : []),
    {
      prioridade: L.plano.prioridade.media,
      acao: L.plano.definirEstrutura,
      impacto: L.plano.impacto.alto,
      esforco: L.plano.esforco.medio,
      prazo: L.plano.prazo.semanas2a4,
    },
  ].slice(0, 8);

  // --- Implicações da percentagem a transacionar ---
  const pctT = lead.pct_a_transacionar ?? "";
  const implicacoes_participacao = pctT.startsWith("Minoritária")
    ? L.implicacoesParticipacao.minoritaria
    : pctT.startsWith("Maioritária")
      ? L.implicacoesParticipacao.maioritaria
      : pctT.startsWith("Totalidade")
        ? L.implicacoesParticipacao.totalidade
        : L.implicacoesParticipacao.indefinida;

  // --- Implicações da estrutura de participação ---
  const implicacoes_estrutura = [
    L.implicacoesEstrutura.venda50,
    L.implicacoesEstrutura.venda60,
    L.implicacoesEstrutura.venda90,
    L.implicacoesEstrutura.venda100,
  ];

  // --- Limitações da análise ---
  const limitacoes = [
    L.limitacoes.infoDeclarada,
    L.limitacoes.fundoManeio,
    L.limitacoes.transacoesComparaveis,
    ...(historico.length < 3 ? [L.limitacoes.historicoInferior] : []),
    ...(flags.industria_generica ? [L.limitacoes.setorGenerico] : []),
    ...((lead.tipo_periodo ?? "").startsWith("Orçamento") || (lead.tipo_periodo ?? "").startsWith("Estimativa")
      ? [L.limitacoes.periodoNaoEncerrado]
      : []),
  ];

  return {
    resumo_textual,
    mensagem_acionista,
    plano,
    implicacoes_participacao,
    implicacoes_estrutura,
    limitacoes,
  };
}
