// Shared inline-style tokens ported from the source project's React Email templates.
export const NAVY = "#0f172a";
export const GOLD = "#BFA434";
export const MUTED = "#71717a";
export const GREY_LIGHT = "#f7f7f8";
export const BORDER = "#e5e6eb";
export const RESULT_BG = "#f8f7f1";
export const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export const LOGO_URL =
  "https://www.lealiaap.com/assets/Logo_text_biggerfont_samesize_2-D3_brI8L.png";
export const CALENDLY_URL = "https://calendly.com/d/d3qm-jpm-t5x/valuation-full-report";

export const shell = (title: string, bodyHtml: string) => `<!DOCTYPE html>
<html lang="pt" dir="ltr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
  </head>
  <body style="background-color:#f5f6f8;color:${NAVY};padding:40px 16px 56px 16px;font-family:${FONT};margin:0;">
    <div style="width:100%;max-width:560px;margin:0 auto;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 12px 36px rgba(2,6,23,0.08);font-family:${FONT};">
      ${bodyHtml}
    </div>
  </body>
</html>`;

export const header = (eyebrowText: string, heading: string, description: string) => `
  <table role="presentation" width="100%" style="padding:26px 32px 20px 32px;border-bottom:1px solid ${BORDER};">
    <tr>
      <td style="vertical-align:top;padding-right:12px;">
        <p style="margin:0 0 14px 0;color:#a1a1aa;font-size:10px;line-height:16px;letter-spacing:2px;font-weight:700;font-family:${FONT};">${eyebrowText}</p>
        <h1 style="margin:14px 0 0 0;color:${NAVY};font-size:28px;line-height:34px;font-weight:700;letter-spacing:-0.5px;font-family:${FONT};">${heading}</h1>
        <p style="margin:12px 0 0 0;color:#3f3f46;font-size:15px;line-height:24px;text-align:justify;font-family:${FONT};">${description}</p>
      </td>
      <td style="width:140px;vertical-align:top;text-align:right;">
        <img src="${LOGO_URL}" alt="Lealia Advisory Partners" width="140" style="display:block;width:140px;max-width:140px;height:auto;border:0;outline:none;text-decoration:none;" />
      </td>
    </tr>
  </table>`;

export const cta = (eyebrowText: string, title: string, ctaLabel: string, href: string) => `
  <div style="padding:28px 32px 32px 32px;">
    <table role="presentation" width="100%">
      <tr>
        <td style="width:100%;background-color:${GREY_LIGHT};border:1px solid ${GOLD};border-radius:12px;padding:26px 22px 28px 22px;text-align:center;box-sizing:border-box;">
          <p style="margin:0 0 8px 0;color:#a1a1aa;font-size:10px;line-height:16px;letter-spacing:1.8px;font-family:${FONT};">${eyebrowText}</p>
          <p style="margin:0 0 18px 0;color:#031A26;font-size:16px;line-height:24px;font-family:${FONT};">${title}</p>
          <a href="${href}" style="display:inline-block;background-color:${GOLD};color:#ffffff;font-size:15px;line-height:18px;font-weight:500;letter-spacing:0.3px;padding:12px 24px;text-decoration:none;border-radius:8px;font-family:${FONT};">${ctaLabel}</a>
        </td>
      </tr>
    </table>
  </div>`;

export const footer = () => `
  <hr style="border-color:${BORDER};margin:0 32px;" />
  <p style="margin:20px 32px 0 32px;color:${MUTED};font-size:11px;line-height:18px;text-align:justify;font-family:${FONT};">
    O relatório preparado constitui uma estimativa indicativa da avaliação da empresa, gerada com base na
    informação fornecida pelo utilizador, não configurando aconselhamento financeiro, proposta contratual,
    recomendação de investimento ou avaliação formal para efeitos legais, fiscais ou contabilísticos; os valores
    nele apresentados dependem da qualidade e exatidão dos dados introduzidos e das condições de mercado vigentes
    à data de elaboração do documento.
  </p>
  <p style="margin:20px 32px 28px 32px;color:${MUTED};font-size:11px;line-height:18px;font-family:${FONT};">
    <strong>Lealia Advisory Partners</strong> ·
    <a href="https://lealiaap.com" style="color:${MUTED};text-decoration:none;font-family:${FONT};">lealiaap.com</a> ·
    <a href="mailto:info@lealiaap.com" style="color:${MUTED};text-decoration:none;font-family:${FONT};">info@lealiaap.com</a>
  </p>`;

export const esc = (v: unknown): string =>
  v === null || v === undefined
    ? ""
    : String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
