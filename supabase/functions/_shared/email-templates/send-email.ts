// Renders a registered React Email template and sends it through Resend.
import * as React from "npm:react@18.3.1";
import { render } from "npm:@react-email/render@0.0.17";
import { TEMPLATES } from "./registry.ts";

const FROM_EMAIL = "Lealia Advisory Partners <valuations@lealiaap.com>";

export type SendTemplateEmailResult = { sent: true } | { sent: false; reason: string };

export interface SendTemplateEmailOptions {
  // deno-lint-ignore no-explicit-any
  templateData?: Record<string, any>;
  /** Identifies the originating app event in the message headers. */
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

  const recipient = template.to || to;
  if (!recipient) throw new Error("Recipient is required (the template defines no fixed recipient)");

  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    console.warn(`[email] RESEND_API_KEY not configured — skipping '${templateName}' to ${recipient}`);
    return { sent: false, reason: "email_not_configured" };
  }

  const templateData = options.templateData ?? {};
  const html = await render(React.createElement(template.component, templateData));
  const subject = typeof template.subject === "function" ? template.subject(templateData) : template.subject;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...(options.idempotencyKey ? { "Idempotency-Key": options.idempotencyKey } : {}),
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [recipient],
      subject,
      html,
      ...(options.replyTo ? { reply_to: options.replyTo } : {}),
      headers: { "X-Lealia-Event-Id": options.idempotencyKey || crypto.randomUUID() },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`[email] Resend send failed [${response.status}] for '${templateName}': ${errorBody}`);
    if (response.status === 422 || response.status === 403) {
      return { sent: false, reason: "recipient_or_domain_rejected" };
    }
    throw new Error(`Resend send failed [${response.status}]: ${errorBody}`);
  }

  return { sent: true };
}
