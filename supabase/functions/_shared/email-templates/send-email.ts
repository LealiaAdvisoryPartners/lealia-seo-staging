// Sends transactional emails through the project's managed email system (Resend).
// Configure the RESEND_API_KEY secret and verify the sending domain to enable delivery.
// Until then, sends are logged and reported as not-sent so lead capture never fails.
import { TEMPLATES } from "./registry.ts";

const FROM_EMAIL = "Lealia Advisory Partners <valuations@lealiaap.com>";

export type SendTemplateEmailResult = { sent: true } | { sent: false; reason: string };

export interface SendTemplateEmailOptions {
  templateData?: Record<string, any>;
  /** Deduplicates retried sends for the same logical event. */
  idempotencyKey?: string;
  replyTo?: string;
}

export async function sendTemplateEmail(
  templateName: string,
  to: string,
  options: SendTemplateEmailOptions = {},
): Promise<SendTemplateEmailResult> {
  const template = TEMPLATES[templateName];
  if (!template) {
    throw new Error(`Template '${templateName}' not found. Available: ${Object.keys(TEMPLATES).join(", ")}`);
  }

  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    console.warn(
      `[email] RESEND_API_KEY not configured — skipping send of '${templateName}' to ${to} (idempotencyKey=${options.idempotencyKey ?? "n/a"})`,
    );
    return { sent: false, reason: "email_not_configured" };
  }

  const templateData = options.templateData ?? {};
  const html = template.render(templateData);
  const subject = template.subject(templateData);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...(options.idempotencyKey ? { "Idempotency-Key": options.idempotencyKey } : {}),
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [to],
      subject,
      html,
      ...(options.replyTo ? { reply_to: options.replyTo } : {}),
      headers: options.idempotencyKey ? { "X-Lealia-Event-Id": options.idempotencyKey } : undefined,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`[email] Resend send failed [${response.status}] for template '${templateName}': ${errorBody}`);
    if (response.status === 422 || response.status === 403) {
      return { sent: false, reason: "recipient_or_domain_rejected" };
    }
    throw new Error(`Resend send failed [${response.status}]: ${errorBody}`);
  }

  return { sent: true };
}
