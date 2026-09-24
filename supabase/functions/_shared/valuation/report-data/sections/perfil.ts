// Secção "Perfil da empresa" + campos de identificação usados no cabeçalho
// e nas páginas de contexto do relatório.
import { formatDateLang } from "../../report-i18n/index.ts";
import type { Ctx } from "../types.ts";
import { traduzirValorFormulario } from "../translate.ts";

export function buildPerfil(ctx: Ctx) {
  const { lead, ano, NAO_INDICADO, L, top1, top5, fmt, proprietario, imovelNoPerimetro, lang } = ctx;
  const { eur } = fmt;

  const industria = traduzirValorFormulario(lead.industria, lang) ?? lead.industria;
  const subindustria = traduzirValorFormulario(lead.subindustria, lang);
  const perfil = [
    { label: L.perfil.atividadePrincipal, valor: lead.atividade_principal || NAO_INDICADO },
    { label: L.perfil.setor, valor: `${industria}${subindustria ? ` · ${subindustria}` : ""}` },
    { label: L.perfil.geografia, valor: lead.pais },
    { label: L.perfil.unidadesLocalizacoes, valor: traduzirValorFormulario(lead.unidades, lang) || NAO_INDICADO },
    { label: L.perfil.anosAtividade, valor: lead.idade_empresa ? L.perfil.anosAtividadeValor(lead.idade_empresa) : NAO_INDICADO },
    { label: L.perfil.colaboradores, valor: lead.num_colaboradores || NAO_INDICADO },
    { label: L.perfil.anoReferencia, valor: String(ano) },
    { label: L.perfil.periodoReferencia, valor: traduzirValorFormulario(lead.tipo_periodo, lang) || NAO_INDICADO },
  ];

  const dataRelatorio = formatDateLang(lead.created_at ?? Date.now(), lang);

  return {
    empresa: lead.empresa,
    nome: lead.nome,
    cargo: lead.cargo ?? null,
    pais: traduzirValorFormulario(lead.pais, lang) ?? lead.pais,
    industria,
    subindustria,
    idade_empresa: lead.idade_empresa ?? null,
    ano_referencia: ano,
    data_relatorio: dataRelatorio,
    estrutura_transacao: traduzirValorFormulario(lead.estrutura_transacao, lang),
    pct_a_transacionar: traduzirValorFormulario(lead.pct_a_transacionar, lang),
    motivo_interesse: traduzirValorFormulario(lead.motivo_interesse, lang),
    horizonte_temporal: traduzirValorFormulario(lead.horizonte_temporal, lang),

    perfil,
    tipo_periodo: lead.tipo_periodo ?? null,
    atividade_principal: lead.atividade_principal ?? null,
    num_colaboradores: lead.num_colaboradores ?? null,
    unidades: traduzirValorFormulario(lead.unidades, lang),
    num_clientes_ativos: lead.num_clientes_ativos ?? null,
    concentracao_top5: typeof top5 === "number" ? `${top5}%` : NAO_INDICADO,
    concentracao_top1: typeof top1 === "number" ? `${top1}%` : NAO_INDICADO,
    geografia_clientes: traduzirValorFormulario(lead.geografia_clientes, lang) || NAO_INDICADO,
    dependencia_faturacao: traduzirValorFormulario(ctx.depFat, lang) || NAO_INDICADO,
    dependencia_gestao: traduzirValorFormulario(ctx.depGest, lang) || NAO_INDICADO,
    backlog_formatado: typeof lead.backlog_contratado === "number" ? eur(lead.backlog_contratado) : null,
    metodo_avaliacao_imovel: traduzirValorFormulario(lead.metodo_avaliacao_imovel, lang),
    ano_avaliacao_imovel: lead.ano_avaliacao_imovel ?? null,
    permanencia_pos_venda: traduzirValorFormulario(lead.permanencia_pos_venda, lang),
    tipo_investidor: traduzirValorFormulario(lead.tipo_investidor, lang),
    imovel_descricao: proprietario
      ? imovelNoPerimetro
        ? L.imovel.propriedadeIncluida
        : L.imovel.propriedadeExcluida
      : lead.proprietario_imovel === "Não"
        ? L.imovel.arrendadoTerceiros
        : NAO_INDICADO,
    imovel_no_perimetro_texto: proprietario
      ? imovelNoPerimetro
        ? L.imovel.incluidoPerimetro
        : L.imovel.excluidoPerimetro
      : L.imovel.arrendado,
    valorizacao_imovel_formatado: typeof lead.valorizacao_imovel === "number" ? eur(lead.valorizacao_imovel) : null,
    caixa_formatado: eur(lead.caixa_e_depositos),
    divida_financeira_formatado: eur(lead.divida_financeira),
    capex_formatado: eur(lead.capex_anual_recorrente),

    faturacao_ano1_formatado: eur(lead.faturacao_ano1),
    ebitda_ano1_formatado: eur(lead.ebitda_ano1),
    despesas_extraordinarias_ano1_formatado: eur(lead.despesas_extraordinarias_ano1),
  };
}
