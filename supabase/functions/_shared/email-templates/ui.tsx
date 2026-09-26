// Tokens de estilo e primitivas de layout partilhadas por todos os templates de e-mail.
import * as React from "npm:react@18.3.1";
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "npm:@react-email/components@0.0.22";

// -----------------------------------------------------------------------------
// Cores e tipografia
// -----------------------------------------------------------------------------

export const NAVY = "#0f172a";
export const GOLD = "#BFA434";
export const MUTED = "#71717a";
export const GREY_LIGHT = "#f7f7f8";
export const BORDER = "#e5e6eb";
export const RESULT_BG = "#f8f7f1";

export const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export const LOGO_URL = "https://www.lealiaap.com/assets/Logo_text_biggerfont_samesize_2-D3_brI8L.png";

// -----------------------------------------------------------------------------
// Estilos partilhados
// -----------------------------------------------------------------------------

export const main = {
  backgroundColor: "#f5f6f8",
  color: NAVY,
  padding: "40px 16px 56px 16px",
  fontFamily: FONT,
};

export const container = {
  width: "100%",
  maxWidth: "560px",
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 12px 36px rgba(2,6,23,0.08)",
  fontFamily: FONT,
};

export const headerRow = {
  padding: "26px 32px 20px 32px",
  borderBottom: `1px solid ${BORDER}`,
};

export const headerTextCol = {
  verticalAlign: "top" as const,
  paddingRight: "12px",
};

export const headerLogoCol = {
  width: "140px",
  verticalAlign: "top" as const,
  textAlign: "right" as const,
};

export const logo = {
  display: "block",
  width: "140px",
  maxWidth: "140px",
  height: "auto",
  border: "0",
  outline: "none",
  textDecoration: "none",
};

export const eyebrow = {
  margin: "0 0 14px 0",
  color: "#a1a1aa",
  fontSize: "10px",
  lineHeight: "16px",
  letterSpacing: "2px",
  fontWeight: 700,
  fontFamily: FONT,
};

export const h1 = {
  margin: "14px 0 0 0",
  color: NAVY,
  fontSize: "28px",
  lineHeight: "34px",
  fontWeight: 700,
  letterSpacing: "-0.5px",
  fontFamily: FONT,
};

export const headerDescription = {
  margin: "12px 0 0 0",
  color: "#52525b",
  fontSize: "14px",
  lineHeight: "22px",
  textAlign: "justify" as const,
  fontFamily: FONT,
};

export const text = {
  margin: "12px 0 0 0",
  color: "#3f3f46",
  fontSize: "15px",
  lineHeight: "24px",
  textAlign: "justify" as const,
  fontFamily: FONT,
};

export const bodyText = {
  margin: "28px 32px 0 32px",
  color: NAVY,
  fontSize: "15px",
  lineHeight: "24px",
  textAlign: "justify" as const,
  fontFamily: FONT,
};

export const linkBlock = {
  margin: "16px 32px 0 32px",
  fontSize: "15px",
  lineHeight: "24px",
  fontFamily: FONT,
};

export const reportLink = {
  color: GOLD,
  fontWeight: 600,
  textDecoration: "underline",
  fontFamily: FONT,
};

export const ctaSection = {
  padding: "28px 32px 32px 32px",
};

export const ctaCard = {
  width: "100%",
  backgroundColor: GREY_LIGHT,
  border: `1px solid ${GOLD}`,
  borderRadius: "12px",
  padding: "26px 22px 28px 22px",
  textAlign: "center" as const,
  boxSizing: "border-box" as const,
};

export const ctaEyebrow = {
  margin: "0 0 8px 0",
  color: "#a1a1aa",
  fontSize: "10px",
  lineHeight: "16px",
  letterSpacing: "1.8px",
  fontFamily: FONT,
};

export const ctaTitle = {
  margin: "0 0 18px 0",
  color: "#031A26",
  fontSize: "16px",
  lineHeight: "24px",
  fontFamily: FONT,
};

export const button = {
  display: "inline-block",
  backgroundColor: GOLD,
  color: "#ffffff",
  fontSize: "15px",
  lineHeight: "18px",
  fontWeight: 500,
  letterSpacing: "0.3px",
  padding: "12px 24px",
  textDecoration: "none",
  borderRadius: "8px",
  fontFamily: FONT,
};

export const hr = {
  borderColor: BORDER,
  margin: "0 32px",
};

export const footerDisclaimer = {
  margin: "20px 32px 0 32px",
  color: MUTED,
  fontSize: "11px",
  lineHeight: "18px",
  textAlign: "justify" as const,
  fontFamily: FONT,
};

export const footerContact = {
  margin: "20px 32px 28px 32px",
  color: MUTED,
  fontSize: "11px",
  lineHeight: "18px",
  fontFamily: FONT,
};

export const footerLink = {
  color: MUTED,
  textDecoration: "none",
  fontFamily: FONT,
};

// Estilos específicos da notificação interna de lead (secções internas, tabela de dados, etc.)
export const section = {
  padding: "24px 32px 0 32px",
};

export const sectionInner = {
  backgroundColor: "#ffffff",
};

export const internalBadge = {
  margin: "0 0 8px 0",
  color: GOLD,
  fontSize: "10px",
  lineHeight: "16px",
  letterSpacing: "1.8px",
  fontWeight: 700,
  fontFamily: FONT,
};

export const leadTitle = {
  margin: "0",
  color: NAVY,
  fontSize: "21px",
  lineHeight: "28px",
  fontWeight: 700,
  fontFamily: FONT,
};

export const leadSubtitle = {
  margin: "5px 0 0 0",
  color: "#52525b",
  fontSize: "14px",
  lineHeight: "22px",
  fontFamily: FONT,
};

export const resultSection = {
  padding: "24px 32px 4px 32px",
};

export const resultCard = {
  backgroundColor: RESULT_BG,
  border: `1px solid ${GOLD}`,
  borderRadius: "12px",
  padding: "22px 20px 18px 20px",
};

export const resultEyebrow = {
  margin: "0 0 16px 0",
  color: "#8a8676",
  fontSize: "10px",
  lineHeight: "16px",
  letterSpacing: "1.8px",
  fontWeight: 700,
  fontFamily: FONT,
};

export const resultWarning = {
  margin: "0",
  color: "#991b1b",
  fontSize: "15px",
  lineHeight: "24px",
  fontWeight: 600,
  fontFamily: FONT,
};

export const metricRow = {
  width: "100%",
};

export const metricColumn = {
  width: "50%",
  padding: "0 8px 12px 0",
  verticalAlign: "top" as const,
};

export const metricLabel = {
  margin: "0 0 4px 0",
  color: "#8a8676",
  fontSize: "10px",
  lineHeight: "16px",
  letterSpacing: "0.8px",
  textTransform: "uppercase" as const,
  fontFamily: FONT,
};

export const metricValue = {
  margin: "0",
  color: NAVY,
  fontSize: "17px",
  lineHeight: "24px",
  fontWeight: 700,
  fontFamily: FONT,
};

export const cardSection = {
  padding: "0 32px",
};

export const sectionTitle = {
  margin: "28px 0 14px 0",
  paddingBottom: "9px",
  borderBottom: `1px solid ${BORDER}`,
  color: "#71717a",
  fontSize: "10px",
  lineHeight: "16px",
  letterSpacing: "1.8px",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  fontFamily: FONT,
};

export const row = {
  margin: "0 0 11px 0",
  color: "#33405a",
  fontSize: "13px",
  lineHeight: "20px",
  fontFamily: FONT,
};

export const rowLabel = {
  color: "#8a8676",
  fontSize: "11px",
  lineHeight: "17px",
  fontFamily: FONT,
};

export const rowValue = {
  color: NAVY,
  fontSize: "14px",
  lineHeight: "21px",
  fontFamily: FONT,
  wordBreak: "break-word" as const,
};

export const internalLinkBlock = {
  margin: "0 0 16px 0",
  fontSize: "13px",
  lineHeight: "20px",
  fontFamily: FONT,
};

export const internalLinkLabel = {
  color: "#8a8676",
  fontSize: "11px",
  fontWeight: 700,
  fontFamily: FONT,
};

export const internalLink = {
  color: GOLD,
  fontSize: "13px",
  lineHeight: "20px",
  textDecoration: "underline",
  wordBreak: "break-word" as const,
  fontFamily: FONT,
};

// Variante do <Hr /> de rodapé usada na notificação interna (margens diferentes do standard `hr`).
export const hrInternal = {
  borderColor: BORDER,
  margin: "26px 32px 0 32px",
};

// Variante do texto de rodapé usada na notificação interna (sem `justify` nas outras variantes de footer).
export const footerInternal = {
  margin: "16px 32px 28px 32px",
  color: MUTED,
  fontSize: "11px",
  lineHeight: "18px",
  textAlign: "justify" as const,
  fontFamily: FONT,
};

// -----------------------------------------------------------------------------
// Primitivas de layout
// -----------------------------------------------------------------------------

/** Cabeçalho comum: eyebrow + título + descrição opcional, com o logótipo à direita. */
export const EmailHeader = ({
  eyebrowText,
  heading,
  description,
  descriptionStyle = text,
}: {
  eyebrowText: string;
  heading: React.ReactNode;
  description?: React.ReactNode;
  descriptionStyle?: React.CSSProperties;
}) => (
  <Row style={headerRow}>
    <Column style={headerTextCol}>
      <Text style={eyebrow}>{eyebrowText}</Text>

      <Heading style={h1}>{heading}</Heading>

      {description !== undefined && <Text style={descriptionStyle}>{description}</Text>}
    </Column>

    <Column style={headerLogoCol}>
      <Img src={LOGO_URL} alt="Lealia Advisory Partners" width="140" style={logo} />
    </Column>
  </Row>
);

/** Rodapé de contacto comum: marca + link do site + e-mail. */
export const FooterContact = ({ style = footerContact }: { style?: React.CSSProperties }) => (
  <Text style={style}>
    <strong>Lealia Advisory Partners</strong>
    {" · "}
    <Link href="https://lealiaap.com" style={footerLink}>
      lealiaap.com
    </Link>
    {" · "}
    <Link href="mailto:info@lealiaap.com" style={footerLink}>
      info@lealiaap.com
    </Link>
  </Text>
);

/** Cartão de CTA com eyebrow, título e botão. */
export const CtaCard = ({
  eyebrowText,
  title,
  href,
  buttonLabel,
}: {
  eyebrowText: string;
  title: React.ReactNode;
  href: string;
  buttonLabel: React.ReactNode;
}) => (
  <Section style={ctaSection}>
    <Row>
      <Column style={ctaCard}>
        <Text style={ctaEyebrow}>{eyebrowText}</Text>

        <Text style={ctaTitle}>{title}</Text>

        <Link href={href} style={button}>
          {buttonLabel}
        </Link>
      </Column>
    </Row>
  </Section>
);

/** Título de secção (usado na notificação interna). */
export const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Text style={sectionTitle}>{children}</Text>
);

/** Linha label/valor (usada na notificação interna). */
export const RowValue = ({ label, value }: { label: string; value: string }) => (
  <Text style={row}>
    <span style={rowLabel}>{label}</span>
    <br />
    <span style={rowValue}>{value}</span>
  </Text>
);

/** Métrica de duas colunas (usada no cartão de resultado da notificação interna). */
export const Metric = ({ label, value }: { label: string; value: string }) => (
  <Column style={metricColumn}>
    <Text style={metricLabel}>{label}</Text>
    <Text style={metricValue}>{value}</Text>
  </Column>
);

/** Botão principal centrado (ação nº 1 do e-mail). */
export const PrimaryAction = ({ href, label }: { href: string; label: React.ReactNode }) => (
  <Section style={{ padding: "24px 32px 4px 32px", textAlign: "center" as const }}>
    <Link href={href} style={button}>{label}</Link>
  </Section>
);

/** Bloco editorial sóbrio: filete dourado à esquerda, lista opcional e link discreto. */
export const EditorialBlock = ({
  eyebrowText,
  title,
  body,
  items,
  href,
  linkLabel,
}: {
  eyebrowText: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  items?: string[];
  href?: string | null;
  linkLabel?: React.ReactNode;
}) => (
  <Section style={{ padding: "28px 32px 8px 32px" }}>
    <Row>
      <Column style={{ borderLeft: `2px solid ${GOLD}`, padding: "2px 0 2px 18px" }}>
        <Text style={{ ...ctaEyebrow, margin: "0 0 6px 0" }}>{eyebrowText}</Text>
        <Text style={{ margin: "0 0 10px 0", color: NAVY, fontSize: "16px", lineHeight: "24px", fontWeight: 600, fontFamily: FONT }}>
          {title}
        </Text>
        {body && <Text style={{ margin: "0 0 10px 0", color: "#3f3f46", fontSize: "14px", lineHeight: "22px", fontFamily: FONT }}>{body}</Text>}
        {items?.map((it) => (
          <Text key={it} style={{ margin: "0 0 4px 0", color: "#3f3f46", fontSize: "14px", lineHeight: "22px", fontFamily: FONT }}>
            — {it}
          </Text>
        ))}
        {href && linkLabel && (
          <Text style={{ margin: "12px 0 0 0", fontSize: "14px", lineHeight: "22px", fontFamily: FONT }}>
            <Link href={href} style={reportLink}>{linkLabel}</Link>
          </Text>
        )}
      </Column>
    </Row>
  </Section>
);

/** Nota discreta de apoio (ex.: reunião), sem competir com a ação principal. */
export const SupportNote = ({ text, href, linkLabel }: { text: React.ReactNode; href: string; linkLabel: React.ReactNode }) => (
  <Text style={{ margin: "20px 32px 24px 32px", color: MUTED, fontSize: "13px", lineHeight: "21px", fontFamily: FONT }}>
    {text}{" "}
    <Link href={href} style={{ ...reportLink, fontWeight: 500 }}>{linkLabel}</Link>
  </Text>
);

export {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
};
