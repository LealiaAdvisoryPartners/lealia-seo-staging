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

export type IdiomaLead = "pt" | "en" | "es";

const idiomaDe = (v: unknown): IdiomaLead => (v === "en" || v === "es" ? v : "pt");

/** Endereço do checkout do relatório completo, no idioma do lead. */
export function urlCompraRelatorio(lead: Lead): string | null {
  const url = String(lead.relatorio_url ?? "");
  if (!url) return null;
  try {
    const { origin } = new URL(url);
    const ref = lead.relatorio_slug ?? lead.relatorio_token;
    if (!ref) return null;
    return `${origin}/${idiomaDe(lead.idioma)}/upgrade?ref=${encodeURIComponent(String(ref))}`;
  } catch {
    return null;
  }
}

export async function enviarConfirmacaoSubmissao(
  leadId: string,
  lead: { nome: string; email: string; empresa: string; calculo_possivel: boolean; idioma?: string | null },
  upgradeUrl?: string | null,
): Promise<boolean> {
  try {
    const result = await sendTemplateEmail("confirmacao-submissao", lead.email, {
      idempotencyKey: `confirmacao-submissao-${leadId}`,
      templateData: {
        nome: lead.nome,
        empresa: lead.empresa,
        calculoPossivel: lead.calculo_possivel,
        lang: idiomaDe(lead.idioma),
        upgradeUrl: upgradeUrl ?? null,
      },
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
        upgradeUrl: urlCompraRelatorio(lead),
        lang: idiomaDe(lead.idioma),
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

// -----------------------------------------------------------------------------
// Relatório completo (pago)
// -----------------------------------------------------------------------------

const formatarEuros = (v: number, idioma: IdiomaLead) =>
  new Intl.NumberFormat(idioma === "en" ? "en-GB" : idioma === "es" ? "es-ES" : "pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(v);

/** Entrega o relatório completo ao comprador. Idempotente pela chave de envio. */
export async function enviarRelatorioCompleto(
  admin: SupabaseClient,
  lead: Lead,
  relatorioUrl: string | null,
  pagamento?: Lead | null,
): Promise<boolean> {
  const idioma = idiomaDe(lead.idioma);
  try {
    const result = await sendTemplateEmail("relatorio-completo", lead.email, {
      idempotencyKey: `relatorio-completo-${lead.id}`,
      templateData: {
        nome: lead.nome,
        empresa: lead.empresa,
        relatorioUrl,
        valor: pagamento?.amount ? formatarEuros(Number(pagamento.amount), idioma) : undefined,
        referencia: pagamento?.ifthenpay_order_id ?? undefined,
        lang: idioma,
      },
    });
    return result.sent;
  } catch (error) {
    console.error(
      `Falha ao enviar relatório completo do lead ${lead.id}:`,
      error instanceof Error ? error.message : error,
    );
    void admin;
    return false;
  }
}

const METODOS: Record<IdiomaLead, Record<string, string>> = {
  pt: { credit_card: "Cartão", mbway: "MB WAY", ccard: "Cartão" },
  en: { credit_card: "Card", mbway: "MB WAY", ccard: "Card" },
  es: { credit_card: "Tarjeta", mbway: "MB WAY", ccard: "Tarjeta" },
};
const LOCALE: Record<IdiomaLead, string> = { pt: "pt-PT", en: "en-GB", es: "es-ES" };

/** Confirma o pagamento feito antes da data de entrega e indica quando chega o dossiê. */
export async function enviarPagamentoConfirmado(lead: Lead, pagamento: Lead, entrega: Date): Promise<boolean> {
  const idioma = idiomaDe(lead.idioma);
  const fmt = (d: Date, o: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(LOCALE[idioma], { timeZone: "Europe/Lisbon", ...o }).format(d);
  try {
    const result = await sendTemplateEmail("pagamento-confirmado", lead.email, {
      idempotencyKey: `pagamento-confirmado-${pagamento.id}`,
      templateData: {
        nome: lead.nome,
        empresa: lead.empresa,
        dataEntrega: fmt(entrega, { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
        valor: formatarEuros(Number(pagamento.amount ?? 0), idioma),
        metodo: METODOS[idioma][String(pagamento.method)] ?? pagamento.method,
        referencia: pagamento.ifthenpay_order_id,
        pagoEm: fmt(new Date(pagamento.paid_at ?? Date.now()), { dateStyle: "short", timeStyle: "short" }),
        lang: idioma,
      },
    });
    return result.sent;
  } catch (error) {
    console.error(`Falha ao enviar confirmação de pagamento ${pagamento.id}:`, error instanceof Error ? error.message : error);
    return false;
  }
}

/** Avisa a equipa de que uma submissão foi paga. */
export async function notificarEquipaPagamento(
  lead: Lead,
  pagamento: Lead,
  relatorioUrl: string | null,
): Promise<void> {
  for (const destinatario of NOTIFICACAO_INTERNA) {
    try {
      await sendTemplateEmail("notificacao-pagamento", destinatario, {
        idempotencyKey: `notificacao-pagamento-${pagamento.id}-${destinatario}`,
        templateData: {
          empresa: lead.empresa,
          nome: lead.nome,
          email: lead.email,
          telefone: lead.telefone,
          valor: formatarEuros(Number(pagamento.amount ?? 0), "pt"),
          metodo: pagamento.method,
          referencia: pagamento.ifthenpay_order_id,
          pagoEm: pagamento.paid_at ?? new Date().toISOString(),
          nif: pagamento.nif ?? undefined,
          nomeFiscal: pagamento.nome_fiscal ?? undefined,
          moradaFiscal: pagamento.morada_fiscal ?? undefined,
          relatorioUrl,
        },
      });
    } catch (error) {
      console.error(
        `Falha ao enviar notificação de pagamento ${pagamento.id}:`,
        error instanceof Error ? error.message : error,
      );
    }
  }
}
