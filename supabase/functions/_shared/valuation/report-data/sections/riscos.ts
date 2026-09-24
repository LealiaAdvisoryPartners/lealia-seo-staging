// Riscos e mitigantes — apenas com evidência preenchida, máximo de quatro.
import { formatFactorXLang } from "../../report-i18n/index.ts";
import type { Ctx, Risco } from "../types.ts";
import { traduzirValorFormulario } from "../translate.ts";

export function buildRiscos(ctx: Ctx): { riscos: Risco[] } {
  const { L, historico, flags, depGest, top5, depFat, racioDivida, capex, lead, fmt, NAO_INDICADO, lang } = ctx;
  const { eur } = fmt;

  const riscosCandidatos: Array<[boolean, Risco]> = [
    [
      historico.length < 3,
      {
        risco: L.riscos.historicoLimitado.risco,
        evidencia: historico.length === 1 ? L.riscos.historicoLimitado.evidenciaUm : L.riscos.historicoLimitado.evidenciaVarios(historico.length),
        impacto: L.riscos.historicoLimitado.impacto,
        mitigante: L.riscos.historicoLimitado.mitigante,
        nivel: L.riscos.niveis.alto,
      },
    ],
    [
      flags.dependencia_gestao_alta,
      {
        risco: L.riscos.dependenciaGestao.risco,
        evidencia: L.riscos.dependenciaGestao.evidencia(traduzirValorFormulario(depGest, lang) ?? ""),
        impacto: L.riscos.dependenciaGestao.impacto,
        mitigante: L.riscos.dependenciaGestao.mitigante,
        nivel: L.riscos.niveis.alto,
      },
    ],
    [
      flags.concentracao_alta,
      {
        risco: L.riscos.concentracaoClientes.risco,
        evidencia: L.riscos.concentracaoClientes.evidencia(top5 ?? 0),
        impacto: L.riscos.concentracaoClientes.impacto,
        mitigante: L.riscos.concentracaoClientes.mitigante,
        nivel: L.riscos.niveis.alto,
      },
    ],
    [
      flags.dependencia_faturacao_alta,
      {
        risco: L.riscos.dependenciaComercial.risco,
        evidencia: L.riscos.dependenciaComercial.evidencia(traduzirValorFormulario(depFat, lang) ?? ""),
        impacto: L.riscos.dependenciaComercial.impacto,
        mitigante: L.riscos.dependenciaComercial.mitigante,
        nivel: L.riscos.niveis.alto,
      },
    ],
    [
      lead.unidades === "Localização única",
      {
        risco: L.riscos.localizacaoUnica.risco,
        evidencia: L.riscos.localizacaoUnica.evidencia,
        impacto: L.riscos.localizacaoUnica.impacto,
        mitigante: L.riscos.localizacaoUnica.mitigante,
        nivel: L.riscos.niveis.medio,
      },
    ],
    [
      !!racioDivida && racioDivida > 3,
      {
        risco: L.riscos.posicaoLiquidaElevada.risco,
        evidencia:
          racioDivida !== null
            ? L.riscos.posicaoLiquidaElevada.evidencia(formatFactorXLang(racioDivida, lang))
            : L.riscos.posicaoLiquidaElevada.evidenciaSemDados,
        impacto: L.riscos.posicaoLiquidaElevada.impacto,
        mitigante: L.riscos.posicaoLiquidaElevada.mitigante,
        nivel: L.riscos.niveis.alto,
      },
    ],
    [
      flags.capex_intensivo,
      {
        risco: L.riscos.capexElevado.risco,
        evidencia: L.riscos.capexElevado.evidencia(eur(capex)),
        impacto: L.riscos.capexElevado.impacto,
        mitigante: L.riscos.capexElevado.mitigante,
        nivel: L.riscos.niveis.medio,
      },
    ],
    [
      flags.tem_imovel_proprio && lead.metodo_avaliacao_imovel !== "Avaliação independente",
      {
        risco: L.riscos.imovelSemAvaliacao.risco,
        evidencia: L.riscos.imovelSemAvaliacao.evidencia(traduzirValorFormulario(lead.metodo_avaliacao_imovel, lang) || NAO_INDICADO),
        impacto: L.riscos.imovelSemAvaliacao.impacto,
        mitigante: L.riscos.imovelSemAvaliacao.mitigante,
        nivel: L.riscos.niveis.medio,
      },
    ],
    [
      typeof lead.despesas_extraordinarias_ano1 === "number" && lead.despesas_extraordinarias_ano1 !== 0,
      {
        risco: L.riscos.ajustamentosPorValidar.risco,
        evidencia: L.riscos.ajustamentosPorValidar.evidencia(eur(lead.despesas_extraordinarias_ano1)),
        impacto: L.riscos.ajustamentosPorValidar.impacto,
        mitigante: L.riscos.ajustamentosPorValidar.mitigante,
        nivel: L.riscos.niveis.medio,
      },
    ],
    [
      flags.crescimento_negativo,
      {
        risco: L.riscos.contracaoFaturacao.risco,
        evidencia: L.riscos.contracaoFaturacao.evidencia,
        impacto: L.riscos.contracaoFaturacao.impacto,
        mitigante: L.riscos.contracaoFaturacao.mitigante,
        nivel: L.riscos.niveis.alto,
      },
    ],
  ];

  const riscos: Risco[] = riscosCandidatos
    .filter(([c]) => c)
    .map(([, x]) => x)
    .slice(0, 4);

  return { riscos };
}
