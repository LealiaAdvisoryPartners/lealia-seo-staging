import { traduzirValorFormulario } from "../translate.ts";
// Drivers de valor (apenas fatores efetivamente favoráveis) e recomendações
// derivadas deles.
import type { Ctx, Driver } from "../types.ts";

export function buildDrivers(ctx: Ctx): { drivers: Driver[]; recomendacoes: string[] } {
  const { L, r, fmt, fat1, margem_ebitda_ajustada, capexRacio, top5, top1, ebitdaBase, depFat, backlog,
    backlogRacio, geografiaInternacional, multiUnidade, imovelAvaliadoExternamente, posicaoLiquida,
    lead, flags, historico, aviso_margem_r } = { ...ctx, aviso_margem_r: ctx.r?.aviso_margem };
  const { eur, pct1 } = fmt;
  const margemFmt = margem_ebitda_ajustada !== null ? pct1(margem_ebitda_ajustada) : null;

  // Ordenados por relevância para o comprador: primeiro o que move o múltiplo.
  const driversCandidatos: Array<[boolean, Driver]> = [
    [flags.crescimento_forte, L.drivers.crescimentoSustentado],
    [
      (typeof fat1 === "number" && fat1 >= 20_000_000) || (ebitdaBase !== null && ebitdaBase >= 2_000_000),
      { driver: L.drivers.dimensaoRelevante.driver, descricao: L.drivers.dimensaoRelevante.descricao(eur(fat1), eur(ebitdaBase)) },
    ],
    [
      margem_ebitda_ajustada !== null && margem_ebitda_ajustada >= 15,
      { driver: L.drivers.rendibilidadeAcimaMedia.driver, descricao: L.drivers.rendibilidadeAcimaMedia.descricao(margemFmt ?? "—") },
    ],
    [
      capexRacio !== null && capexRacio <= 0.15,
      {
        driver: L.drivers.conversaoCaixa.driver,
        descricao: L.drivers.conversaoCaixa.descricao(capexRacio !== null ? pct1(capexRacio * 100) : "—"),
      },
    ],
    [flags.dependencia_gestao_baixa, L.drivers.gestaoAutonoma],
    [!!depFat?.startsWith("Baixa"), L.drivers.relacoesTransferiveis],
    [
      (typeof top5 === "number" && top5 <= 40) || (typeof top1 === "number" && top1 <= 15),
      {
        driver: L.drivers.carteiraDiversificada.driver,
        descricao:
          (typeof top5 === "number"
            ? L.drivers.carteiraDiversificada.descricaoTop5(top5)
            : L.drivers.carteiraDiversificada.descricaoTop1(top1 ?? 0)) + L.drivers.carteiraDiversificada.descricaoFim,
      },
    ],
    [
      backlogRacio !== null && backlogRacio >= 0.25,
      {
        driver: L.drivers.visibilidadeReceita.driver,
        descricao: L.drivers.visibilidadeReceita.descricao(eur(backlog), backlogRacio !== null ? pct1(backlogRacio * 100) : "—"),
      },
    ],
    [
      multiUnidade,
      { driver: L.drivers.modeloReplicavel.driver, descricao: L.drivers.modeloReplicavel.descricao((traduzirValorFormulario(lead.unidades, lang) ?? "").toLowerCase()) },
    ],
    [
      geografiaInternacional,
      { driver: L.drivers.exposicaoInternacional.driver, descricao: L.drivers.exposicaoInternacional.descricao(traduzirValorFormulario(lead.geografia_clientes, lang) ?? "") },
    ],
    [
      posicaoLiquida !== null && posicaoLiquida > 0,
      { driver: L.drivers.posicaoLiquida.driver, descricao: L.drivers.posicaoLiquida.descricao(eur(posicaoLiquida)) },
    ],
    [
      typeof lead.idade_empresa === "number" && lead.idade_empresa >= 10,
      { driver: L.drivers.trackRecord.driver, descricao: L.drivers.trackRecord.descricao(lead.idade_empresa ?? 0) },
    ],
    [
      imovelAvaliadoExternamente,
      {
        driver: L.drivers.imovelValorizado.driver,
        descricao: L.drivers.imovelValorizado.descricao((traduzirValorFormulario(lead.metodo_avaliacao_imovel, lang) ?? "").toLowerCase(), eur(lead.valorizacao_imovel)),
      },
    ],
  ];

  const drivers: Driver[] = driversCandidatos
    .filter(([c]) => c)
    .map(([, d]) => d)
    .slice(0, 6);

  // Recomendações derivadas dos drivers.
  const recomendacoes: string[] = [];
  if (flags.dependencia_gestao_alta || flags.dependencia_faturacao_alta) recomendacoes.push(L.recomendacoes.reforcarGestao);
  if (flags.concentracao_alta) recomendacoes.push(L.recomendacoes.diversificarClientes);
  if (flags.unidade_unica) recomendacoes.push(L.recomendacoes.avaliarReplicabilidade);
  if (flags.capex_intensivo) recomendacoes.push(L.recomendacoes.documentarCapex);
  if (historico.length < 3) recomendacoes.push(L.recomendacoes.prepararHistorico);
  if (flags.tem_imovel_proprio) recomendacoes.push(L.recomendacoes.definirImovel);
  if (aviso_margem_r) recomendacoes.push(L.recomendacoes.validarMargem);
  if (flags.crescimento_negativo) recomendacoes.push(L.recomendacoes.explicarContracao);
  recomendacoes.push(L.recomendacoes.validarComLealia);

  return { drivers, recomendacoes };
}
