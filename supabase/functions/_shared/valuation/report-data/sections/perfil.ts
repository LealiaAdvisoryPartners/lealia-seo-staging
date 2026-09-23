// Secção "Perfil da empresa" + campos de identificação usados no cabeçalho
// e nas páginas de contexto do relatório.
import { formatDateLang } from "../../report-i18n/index.ts";
import type { Ctx } from "../types.ts";

export function buildPerfil(ctx: Ctx) {
  const { lead, ano, NAO_INDICADO, L, top1, top5, fmt, proprietario, imovelNoPerimetro, lang } = ctx;
  const { eur } = fmt;

  const perfil = [
    { label: L.perfil.atividadePrincipal, valor: lead.atividade_principal || NAO_INDICADO },
    { label: L.perfil.setor, valor: `${lead.industria}${lead.subindustria ? ` · ${lead.subindustria}` : ""}` },
    { label: L.perfil.geografia, valor: lead.pais },
    { label: L.perfil.unidadesLocalizacoes, valor: lead.unidades || NAO_INDICADO },
    { label: L.perfil.anosAtividade, valor: lead.idade_empresa ? L.perfil.anosAtividadeValor(lead.idade_empresa) : NAO_INDICADO },
    { label: L.perfil.colaboradores, valor: lead.num_colaboradores || NAO_INDICADO },
    { label: L.perfil.anoReferencia, valor: String(ano) },
    { label: L.perfil.periodoReferencia, valor: lead.tipo_periodo || NAO_INDICADO },
  ];

  const dataRelatorio = formatDateLang(lead.created_at ?? Date.now(), lang);

  return {
    empresa: lead.empresa,
    nome: lead.nome,
    cargo: lead.cargo ?? null,
    pais: lead.pais,
    industria: lead.industria,
    subindustria: lead.subindustria ?? null,
    idade_empresa: lead.idade_empresa ?? null,
    ano_referencia: ano,
    data_relatorio: dataRelatorio,
    estrutura_transacao: lead.estrutura_transacao ?? null,
    pct_a_transacionar: lead.pct_a_transacionar ?? null,
    motivo_interesse: lead.motivo_interesse ?? null,
    horizonte_temporal: lead.horizonte_temporal ?? null,

    perfil,
    tipo_periodo: lead.tipo_periodo ?? null,
    atividade_principal: lead.atividade_principal ?? null,
    num_colaboradores: lead.num_colaboradores ?? null,
    unidades: lead.unidades ?? null,
    num_clientes_ativos: lead.num_clientes_ativos ?? null,
    concentracao_top5: typeof top5 === "number" ? `${top5}%` : NAO_INDICADO,
    concentracao_top1: typeof top1 === "number" ? `${top1}%` : NAO_INDICADO,
    geografia_clientes: lead.geografia_clientes || NAO_INDICADO,
    dependencia_faturacao: ctx.depFat || NAO_INDICADO,
    dependencia_gestao: ctx.depGest || NAO_INDICADO,
    backlog_formatado: typeof lead.backlog_contratado === "number" ? eur(lead.backlog_contratado) : null,
    metodo_avaliacao_imovel: lead.metodo_avaliacao_imovel ?? null,
    ano_avaliacao_imovel: lead.ano_avaliacao_imovel ?? null,
    permanencia_pos_venda: lead.permanencia_pos_venda ?? null,
    tipo_investidor: lead.tipo_investidor ?? null,
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
