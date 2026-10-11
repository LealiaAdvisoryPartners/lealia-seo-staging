/**
 * Máquina de estados da submissão e entrega do relatório completo.
 *
 * Regra dura: uma submissão em `full_paid` NUNCA recebe o resumo (sample).
 * A garantia é dada por reservas atómicas condicionais (`update ... .eq("status", …)`),
 * que só têm efeito se o estado na base de dados ainda for o esperado no instante
 * exato do envio — nunca com base num estado lido antes.
 */
import type { SupabaseClient } from "npm:@supabase/supabase-js@2";
import { enviarPagamentoConfirmado, enviarRelatorioCompleto, notificarEquipaPagamento } from "../valuation/valuation-email.ts";

export type EstadoSubmissao = "pending" | "sample_sent" | "full_paid";

export type EventoSubmissao =
  | "submission_created"
  | "payment_initiated"
  | "payment_confirmed"
  | "payment_failed"
  | "sample_send_attempted"
  | "sample_send_skipped_paid"
  | "sample_sent"
  | "full_report_sent";

/** Regista uma transição. Nunca lança: o registo não pode travar o fluxo. */
export async function registarEvento(
  admin: SupabaseClient,
  evento: EventoSubmissao,
  opcoes: { submissionId?: string | null; paymentId?: string | null; detalhes?: Record<string, unknown> } = {},
): Promise<void> {
  try {
    await admin.from("submission_audit_logs").insert({
      submission_id: opcoes.submissionId ?? null,
      payment_id: opcoes.paymentId ?? null,
      event: evento,
      details: opcoes.detalhes ?? null,
    });
  } catch (e) {
    console.error(`Falha a registar evento ${evento}`, e instanceof Error ? e.message : e);
  }
}

/**
 * Reserva o envio do resumo. Devolve `true` só quando a submissão ainda estava
 * em `pending` neste instante; `false` significa "já pago ou já processado".
 */
export async function reservarEnvioResumo(admin: SupabaseClient, submissionId: string): Promise<boolean> {
  const { data, error } = await admin
    .from("leads")
    .update({ status: "sample_sent", email_relatorio_enviado_em: new Date().toISOString() })
    .eq("id", submissionId)
    .eq("status", "pending")
    .is("email_relatorio_enviado_em", null)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error(`Falha a reservar envio do resumo do lead ${submissionId}`, error.message);
    return false;
  }
  return !!data;
}

/** Endereço do relatório completo do comprador (chave privada, sem expiração). */
export function urlRelatorioCompleto(lead: Record<string, unknown>): string | null {
  const base = String(lead["relatorio_url"] ?? "").replace(/\/$/, "");
  const chave = lead["full_report_token"] as string | null;
  if (!base || !chave) return null;
  return `${base}?k=${chave}`;
}

export interface ResultadoConfirmacao {
  ok: boolean;
  jaProcessado: boolean;
  motivo?: string;
}

/**
 * Confirma um pagamento de forma idempotente e entrega o relatório completo.
 * Chamadas repetidas com o mesmo `orderId` não reenviam nada.
 */
export async function confirmarPagamento(
  admin: SupabaseClient,
  orderId: string,
  contexto: { requestId?: string | null; montante?: string | null; origem: string; detalhes?: Record<string, unknown> },
): Promise<ResultadoConfirmacao> {
  const { data: pagamento, error } = await admin
    .from("payments")
    .select("*")
    .eq("ifthenpay_order_id", orderId)
    .maybeSingle();

  if (error) return { ok: false, jaProcessado: false, motivo: error.message };
  if (!pagamento) return { ok: false, jaProcessado: false, motivo: "pagamento_inexistente" };

  // Idempotência: a ifthenpay repete o callback até receber 200.
  if (pagamento.status === "paid") return { ok: true, jaProcessado: true };

  // Reserva atómica do pagamento: só uma chamada passa daqui.
  const { data: reservado } = await admin
    .from("payments")
    .update({
      status: "paid",
      paid_at: new Date().toISOString(),
      request_id: contexto.requestId ?? pagamento.request_id,
      payment_details: { ...(pagamento.payment_details ?? {}), confirmacao: contexto.detalhes ?? {}, origem: contexto.origem },
      fatura_estado: pagamento.nif ? "pendente" : pagamento.fatura_estado,
    })
    .eq("id", pagamento.id)
    .eq("status", "pending")
    .select("id")
    .maybeSingle();

  if (!reservado) return { ok: true, jaProcessado: true };

  const agora = new Date().toISOString();
  await admin
    .from("leads")
    .update({ status: "full_paid", full_report_pago_em: agora, relatorio_expira_em: null })
    .eq("id", pagamento.submission_id);

  await registarEvento(admin, "payment_confirmed", {
    submissionId: pagamento.submission_id,
    paymentId: pagamento.id,
    detalhes: { orderId, origem: contexto.origem, montante: contexto.montante ?? null, requestId: contexto.requestId ?? null },
  });

  const { data: lead } = await admin.from("leads").select("*").eq("id", pagamento.submission_id).maybeSingle();
  if (lead) {
    const linha = lead as Record<string, unknown>;
    const libertacao = linha["email_relatorio_agendado_para"] as string | null;
    // Pago antes da hora de libertação (n+2 às 08:53 Lisboa): entrega fica para o job.
    // Pago depois: comprovativo de pagamento e, logo a seguir, a entrega do relatório.
    const pago = { ...pagamento, paid_at: agora } as Record<string, unknown>;
    const disponivel = !libertacao || new Date(libertacao) <= new Date();
    await enviarPagamentoConfirmado(linha, pago, libertacao ? new Date(libertacao) : new Date(), disponivel);
    if (disponivel) await entregarRelatorioCompleto(admin, linha, pago);
    await notificarEquipaPagamento(linha, pagamento as Record<string, unknown>, urlRelatorioCompleto(linha));
  }

  return { ok: true, jaProcessado: false };
}

/**
 * Entrega o relatório completo uma única vez (reserva atómica em
 * `full_report_enviado_em`). Usado no pagamento tardio e no job diário.
 */
export async function entregarRelatorioCompleto(
  admin: SupabaseClient,
  lead: Record<string, unknown>,
  pagamento?: Record<string, unknown> | null,
): Promise<boolean> {
  const id = lead["id"] as string;
  const { data: reservado } = await admin
    .from("leads")
    .update({ full_report_enviado_em: new Date().toISOString() })
    .eq("id", id)
    .eq("status", "full_paid")
    .is("full_report_enviado_em", null)
    .select("id")
    .maybeSingle();
  if (!reservado) return false;

  let pago = pagamento ?? null;
  if (!pago) {
    const { data } = await admin
      .from("payments").select("*").eq("submission_id", id).eq("status", "paid")
      .order("paid_at", { ascending: false }).limit(1).maybeSingle();
    pago = (data as Record<string, unknown> | null) ?? null;
  }

  const url = urlRelatorioCompleto(lead);
  const enviado = await enviarRelatorioCompleto(admin, lead, url, pago);
  if (enviado) {
    await registarEvento(admin, "full_report_sent", {
      submissionId: id,
      paymentId: (pago?.["id"] as string | undefined) ?? null,
      detalhes: { url },
    });
  } else {
    // Liberta a reserva para nova tentativa no próximo job.
    await admin.from("leads").update({ full_report_enviado_em: null }).eq("id", id);
  }
  return enviado;
}
