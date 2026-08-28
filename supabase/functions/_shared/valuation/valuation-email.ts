// Ported from src/lib/valuation-email.server.ts — sends the three lead emails
// through the project's managed email system instead of the source's Outlook connector.
import { sendTemplateEmail } from "../email-templates/send-email.ts";
import type { SupabaseClient } from "npm:@supabase/supabase-js@2";

const NOTIFICACAO_INTERNA = ["duarte.pereira@lealiaap.com", "ricardo.ferreira@lealiaap.com"];

// deno-lint-ignore no-explicit-any
type Lead = Record<string, any>;

const dadosNotificacao = (lead: Lead) => ({
  nome: lead.nome,
  email: lead.email,
  telefone: lead.telefone,
  empresa: lead.empresa,
  cargo: lead.cargo,
  pais: lead.pais,
  industria: lead.industria,
  subindustria: lead.subindustria,
  idadeEmpresa: lead.idade_empresa,
  anoReferencia: lead.ano_referencia,
  faturacaoAno1: lead.faturacao_ano1,
  faturacaoAno2: lead.faturacao_ano2,
  faturacaoAno3: lead.faturacao_ano3,
  ebitdaAno1: lead.ebitda_ano1,
  ebitdaAno2: lead.ebitda_ano2,
  ebitdaAno3: lead.ebitda_ano3,
  despesasExtraAno1: lead.despesas_extraordinarias_ano1,
  despesasExtraAno2: lead.despesas_extraordinarias_ano2,
  despesasExtraAno3: lead.despesas_extraordinarias_ano3,
  caixaEDepositos: lead.caixa_e_depositos,
  dividaFinanceira: lead.divida_financeira,
  dividaLiquida: lead.divida_liquida,
  capexAnualRecorrente: lead.capex_anual_recorrente,
  numColaboradores: lead.num_colaboradores,
  unidades: lead.unidades,
  pctTop5Clientes: lead.pct_top5_clientes,
  geografiaClientes: lead.geografia_clientes,
  dependenciaAcionistaFaturacao: lead.dependencia_acionista_faturacao,
  dependenciaAcionistaGestao: lead.dependencia_acionista_gestao,
  proprietarioImovel: lead.proprietario_imovel,
  rendaRefleteMercado: lead.renda_reflete_mercado,
  acrescimoRendaAnual: lead.acrescimo_renda_anual,
  incluirImovelPerimetro: lead.incluir_imovel_perimetro,
  valorizacaoImovel: lead.valorizacao_imovel,
  estruturaTransacao: lead.estrutura_transacao,
  pctATransacionar: lead.pct_a_transacionar,
  motivoInteresse: lead.motivo_interesse,
  horizonteTemporal: lead.horizonte_temporal,
  calculoPossivel: lead.calculo_possivel,
  evMin: lead.ev_min,
  evMax: lead.ev_max,
  equityMin: lead.equity_min,
  equityMax: lead.equity_max,
  multiploMin: lead.multiplo_ajustado_min,
  multiploMax: lead.multiplo_ajustado_max,
  confianca: lead.confianca,
});

export async function enviarConfirmacaoSubmissao(
  leadId: string,
  lead: { nome: string; email: string; empresa: string; calculo_possivel: boolean },
): Promise<boolean> {
  try {
    const result = await sendTemplateEmail("confirmacao-submissao", lead.email, {
      idempotencyKey: `confirmacao-submissao-${leadId}`,
      templateData: { nome: lead.nome, empresa: lead.empresa, calculoPossivel: lead.calculo_possivel },
    });
    return result.sent;
  } catch (error) {
    console.error(`Falha ao enviar confirmação de submissão do lead ${leadId}:`, error instanceof Error ? error.message : error);
    return false;
  }
}

export async function enviarResumoAvaliacao(
  admin: SupabaseClient,
  leadId: string,
  lead: Lead,
  relatorioUrl?: string | null,
  pdfUrl?: string | null,
): Promise<boolean> {
  try {
    const result = await sendTemplateEmail("resumo-avaliacao", lead.email, {
      idempotencyKey: `resumo-avaliacao-${leadId}`,
      templateData: {
        nome: lead.nome,
        empresa: lead.empresa,
        relatorioUrl: relatorioUrl ?? null,
        pdfUrl: pdfUrl ?? null,
      },
    });

    if (!result.sent) {
      await admin.from("leads").update({ email_enviado: false, email_erro: "Destinatário suprimido" }).eq("id", leadId);
      return false;
    }

    await admin.from("leads").update({ email_enviado: true, email_erro: null }).eq("id", leadId);
    return true;
  } catch (error) {
    const motivo = error instanceof Error ? error.message : String(error);
    console.error(`Falha ao enviar resumo do lead ${leadId}: ${motivo}`);
    await admin.from("leads").update({ email_enviado: false, email_erro: motivo.slice(0, 500) }).eq("id", leadId);
    return false;
  }
}

export async function notificarEquipaNovoLead(
  leadId: string,
  lead: Lead,
  relatorioUrl?: string | null,
  pdfUrl?: string | null,
): Promise<void> {
  for (const destinatario of NOTIFICACAO_INTERNA) {
    try {
      await sendTemplateEmail("notificacao-lead", destinatario, {
        idempotencyKey: `notificacao-lead-${leadId}-${destinatario}`,
        templateData: { ...dadosNotificacao(lead), relatorioUrl: relatorioUrl ?? null, pdfUrl: pdfUrl ?? null },
      });
    } catch (error) {
      console.error(`Falha ao enviar notificação interna do lead ${leadId}:`, error instanceof Error ? error.message : error);
    }
  }
}
