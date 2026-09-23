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
import type { TemplateEntry } from "./registry.ts";

type Lang = "pt" | "en" | "es";

interface Props {
  nome: string;
  empresa?: string;
  relatorioUrl?: string | null;
  pdfUrl?: string | null;
  calendlyUrl?: string;
  lang?: Lang;
}

const dict = {
  pt: {
    preview: (nome: string) => `Olá ${nome}! O relatório de avaliação indicativa que pediu já está pronto!`,
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "Boas notícias: o seu relatório está pronto 🎉",
    greeting: (nome: string) => `Olá ${nome}`,
    concludedFrom: ", concluímos agora mesmo a avaliação indicativa da ",
    bodyIntro:
      "O seu relatório de avaliação indicativa já está disponível e pode ser consultado através do link abaixo:",
    reportLinkLabel: "Ver o meu relatório →",
    ctaEyebrow: "PRÓXIMO PASSO — REUNIÃO DE 20 MINUTOS",
    ctaTitle: "Apresentação do relatório completo.",
    ctaButton: "Agendar reunião",
    disclaimer:
      "O relatório preparado constitui uma estimativa indicativa da avaliação da empresa, gerada com base na informação fornecida pelo utilizador, não configurando aconselhamento financeiro, proposta contratual, recomendação de investimento ou avaliação formal para efeitos legais, fiscais ou contabilísticos; os valores nele apresentados dependem da qualidade e exatidão dos dados introduzidos e das condições de mercado vigentes à data de elaboração do documento.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | Relatório de Avaliação Indicativa`,
    subjectWithoutCompany: "Lealia | Relatório de Avaliação Indicativa",
  },
  en: {
    preview: (nome: string) => `Hello ${nome}! The indicative valuation report you requested is now ready!`,
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "Good news: your report is ready 🎉",
    greeting: (nome: string) => `Hello ${nome}`,
    concludedFrom: ", we have just completed the indicative valuation of ",
    bodyIntro:
      "Your indicative valuation report is now available and can be accessed through the link below:",
    reportLinkLabel: "View my report →",
    ctaEyebrow: "NEXT STEP — 20-MINUTE MEETING",
    ctaTitle: "Presentation of the full report.",
    ctaButton: "Schedule a meeting",
    disclaimer:
      "This report constitutes an indicative estimate of the company's valuation, generated based on the information provided by the user, and does not constitute financial advice, a contractual proposal, an investment recommendation, or a formal valuation for legal, tax or accounting purposes; the figures presented depend on the quality and accuracy of the data entered and on prevailing market conditions at the time the document was prepared.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | Indicative Valuation Report`,
    subjectWithoutCompany: "Lealia | Indicative Valuation Report",
  },
  es: {
    preview: (nome: string) => `¡Hola ${nome}! El informe de valoración indicativa que solicitó ya está listo!`,
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "Buenas noticias: su informe ya está listo 🎉",
    greeting: (nome: string) => `Hola ${nome}`,
    concludedFrom: ", acabamos de finalizar la valoración indicativa de ",
    bodyIntro:
      "Su informe de valoración indicativa ya está disponible y puede consultarlo a través del siguiente enlace:",
    reportLinkLabel: "Ver mi informe →",
    ctaEyebrow: "PRÓXIMO PASO — REUNIÓN DE 20 MINUTOS",
    ctaTitle: "Presentación del informe completo.",
    ctaButton: "Agendar reunión",
    disclaimer:
      "El presente informe constituye una estimación indicativa de la valoración de la empresa, generada a partir de la información facilitada por el usuario, y no constituye asesoramiento financiero, propuesta contractual, recomendación de inversión ni valoración formal a efectos legales, fiscales o contables; los valores en él presentados dependen de la calidad y exactitud de los datos introducidos y de las condiciones de mercado vigentes en la fecha de elaboración del documento.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | Informe de Valoración Indicativa`,
    subjectWithoutCompany: "Lealia | Informe de Valoración Indicativa",
  },
} satisfies Record<Lang, Record<string, any>>;

const Email = ({
  nome,
  empresa,
  relatorioUrl,
  pdfUrl,
  calendlyUrl = "https://calendly.com/d/d3qm-jpm-t5x/valuation-full-report",
  lang = "pt",
}: Props) => {
  const reportUrl = relatorioUrl || pdfUrl;
  const t = dict[lang] ?? dict.pt;

  return (
    <Html lang={lang} dir="ltr">
      <Head />

      <Preview>{t.preview(nome)}</Preview>

      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Row style={headerRow}>
            <Column style={headerTextCol}>
              <Text style={eyebrow}>{t.eyebrow}</Text>

              <Heading style={h1}>{t.heading}</Heading>

              <Text style={text}>
                {t.greeting(nome)}
                {empresa ? t.concludedFrom : "."}
                {empresa && <strong>{empresa}</strong>}
                {empresa && "."}
              </Text>
            </Column>

            <Column style={headerLogoCol}>
              <Img
                src="https://www.lealiaap.com/assets/Logo_text_biggerfont_samesize_2-D3_brI8L.png"
                alt="Lealia Advisory Partners"
                width="140"
                style={logo}
              />
            </Column>
          </Row>

          {/* Corpo */}
          <Text style={bodyText}>{t.bodyIntro}</Text>

          {reportUrl && (
            <Text style={linkBlock}>
              <Link href={reportUrl} style={reportLink}>
                {t.reportLinkLabel}
              </Link>
            </Text>
          )}

          {/* CTA */}
          <Section style={ctaSection}>
            <Row>
              <Column style={ctaCard}>
                <Text style={ctaEyebrow}>{t.ctaEyebrow}</Text>

                <Text style={ctaTitle}>{t.ctaTitle}</Text>

                <Link href={calendlyUrl} style={button}>
                  {t.ctaButton}
                </Link>
              </Column>
            </Row>
          </Section>

          {/* Footer */}
          <Hr style={hr} />

          <Text style={footerDisclaimer}>{t.disclaimer}</Text>

          <Text style={footerContact}>
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
        </Container>
      </Body>
    </Html>
  );
};

export const template = {
  component: Email,

  subject: (data: Record<string, any>) => {
    const lang: Lang = data["lang"] ?? "pt";
    const t = dict[lang] ?? dict.pt;
    return data["empresa"] ? t.subjectWithCompany(data["empresa"]) : t.subjectWithoutCompany;
  },

  displayName: "Relatório pronto",

  previewData: {
    nome: "Duarte Pereira",
    empresa: "Empresa Exemplo, Lda.",
    relatorioUrl: "https://exemplo.lealiaap.com/relatorio/token",
    pdfUrl: "https://exemplo.lealiaap.com/relatorio/token.pdf",
    lang: "pt",
  },
} satisfies TemplateEntry;

// -----------------------------------------------------------------------------
// Styles
// -----------------------------------------------------------------------------

const NAVY = "#0f172a";
const GOLD = "#BFA434";
const MUTED = "#71717a";
const GREY_LIGHT = "#f7f7f8";
const BORDER = "#e5e6eb";

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const main = {
  backgroundColor: "#f5f6f8",
  color: NAVY,
  padding: "40px 16px 56px 16px",
  fontFamily: FONT,
};

const container = {
  width: "100%",
  maxWidth: "560px",
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 12px 36px rgba(2,6,23,0.08)",
  fontFamily: FONT,
};

const headerRow = {
  padding: "26px 32px 20px 32px",
  borderBottom: `1px solid ${BORDER}`,
};

const headerTextCol = {
  verticalAlign: "top" as const,
  paddingRight: "12px",
};

const headerLogoCol = {
  width: "140px",
  verticalAlign: "top" as const,
  textAlign: "right" as const,
};

const logo = {
  display: "block",
  width: "140px",
  maxWidth: "140px",
  height: "auto",
  border: "0",
  outline: "none",
  textDecoration: "none",
};

const eyebrow = {
  margin: "0 0 14px 0",
  color: "#a1a1aa",
  fontSize: "10px",
  lineHeight: "16px",
  letterSpacing: "2px",
  fontWeight: 700,
  fontFamily: FONT,
};

const h1 = {
  margin: "14px 0 0 0",
  color: NAVY,
  fontSize: "28px",
  lineHeight: "34px",
  fontWeight: 700,
  letterSpacing: "-0.5px",
  fontFamily: FONT,
};

const text = {
  margin: "12px 0 0 0",
  color: "#3f3f46",
  fontSize: "15px",
  lineHeight: "24px",
  textAlign: "justify" as const,
  fontFamily: FONT,
};

const bodyText = {
  margin: "28px 32px 0 32px",
  color: NAVY,
  fontSize: "15px",
  lineHeight: "24px",
  textAlign: "justify" as const,
  fontFamily: FONT,
};

const linkBlock = {
  margin: "16px 32px 0 32px",
  fontSize: "15px",
  lineHeight: "24px",
  fontFamily: FONT,
};

const reportLink = {
  color: GOLD,
  fontWeight: 600,
  textDecoration: "underline",
  fontFamily: FONT,
};

const ctaSection = {
  padding: "28px 32px 32px 32px",
};

const ctaCard = {
  width: "100%",
  backgroundColor: GREY_LIGHT,
  border: `1px solid ${GOLD}`,
  borderRadius: "12px",
  padding: "26px 22px 28px 22px",
  textAlign: "center" as const,
  boxSizing: "border-box" as const,
};

const ctaEyebrow = {
  margin: "0 0 8px 0",
  color: "#a1a1aa",
  fontSize: "10px",
  lineHeight: "16px",
  letterSpacing: "1.8px",
  fontFamily: FONT,
};

const ctaTitle = {
  margin: "0 0 18px 0",
  color: "#031A26",
  fontSize: "16px",
  lineHeight: "24px",
  fontFamily: FONT,
};

const button = {
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

const hr = {
  borderColor: BORDER,
  margin: "0 32px",
};

const footerDisclaimer = {
  margin: "20px 32px 0 32px",
  color: MUTED,
  fontSize: "11px",
  lineHeight: "18px",
  textAlign: "justify" as const,
  fontFamily: FONT,
};

const footerContact = {
  margin: "20px 32px 28px 32px",
  color: MUTED,
  fontSize: "11px",
  lineHeight: "18px",
  fontFamily: FONT,
};

const footerLink = {
  color: MUTED,
  textDecoration: "none",
  fontFamily: FONT,
};

export default Email;
