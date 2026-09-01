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

interface Props {
  nome: string;
  empresa?: string;
  calculoPossivel?: boolean;
  calendlyUrl?: string;
}

const Email = ({
  nome,
  empresa,
  calculoPossivel = true,
  calendlyUrl = "https://calendly.com/d/d3qm-jpm-t5x/valuation-full-report",
}: Props) => (
  <Html lang="pt" dir="ltr">
    <Head />

    <Preview>Recebemos a sua submissão. Enviamos o relatório assim que estiver finalizado.</Preview>

    <Body style={main}>
      <Container style={container}>
        {/* Header */}
        <Row style={headerRow}>
          <Column style={headerTextCol}>
            <Text style={eyebrow}>LEALIA ADVISORY PARTNERS</Text>

            <Heading style={h1}>Obrigado pela sua submissão</Heading>

            <Text style={text}>
              Olá {nome}
              {empresa ? ", recebemos os dados da " : "."}
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
        {calculoPossivel ? (
          <Text style={bodyText}>
            A nossa equipa vai agora trabalhar a informação submetida e enviamos-lhe o relatório de avaliação indicativa
            assim que estiver finalizado.
          </Text>
        ) : (
          <>
            <Text style={bodyText}>
              A informação fornecida não permite, nesta fase, uma estimativa fiável de avaliação da sua empresa.
            </Text>
            <Text style={bodyText}>
              Isto não significa que não tenha valor: fale connosco para podermos analisar a situação específica e
              ajudar com um processo de avaliação personalizado.
            </Text>
          </>
        )}

        <Text style={bodyText}>
          Para qualquer questão entretanto, pode contactar-nos através de{" "}
          <Link href="mailto:valuations@lealiaap.com" style={reportLink}>
            valuations@lealiaap.com
          </Link>
          .
        </Text>

        {/* CTA */}
        <Section style={ctaSection}>
          <Row>
            <Column style={ctaCard}>
              <Text style={ctaEyebrow}>PRÓXIMO PASSO — REUNIÃO DE 20 MINUTOS</Text>

              <Text style={ctaTitle}>
                {calculoPossivel ? "Apresentação do relatório completo." : "Análise personalizada da sua empresa."}
              </Text>

              <Link href={calendlyUrl} style={button}>
                {calculoPossivel ? "Agendar reunião" : "Falar com a equipa"}
              </Link>
            </Column>
          </Row>
        </Section>

        {/* Footer */}
        <Hr style={hr} />

        <Text style={footerDisclaimer}>
          O relatório preparado constitui uma estimativa indicativa da avaliação da empresa, gerada com base na
          informação fornecida pelo utilizador, não configurando aconselhamento financeiro, proposta contratual,
          recomendação de investimento ou avaliação formal para efeitos legais, fiscais ou contabilísticos; os valores
          nele apresentados dependem da qualidade e exatidão dos dados introduzidos e das condições de mercado vigentes
          à data de elaboração do documento.
        </Text>

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

export const template = {
  component: Email,

  subject: (data: Record<string, any>) =>
    data["empresa"] ? `${data["empresa"]} <> Lealia | Recebemos a sua submissão` : "Lealia | Recebemos a sua submissão",

  displayName: "Confirmação de submissão",

  previewData: {
    nome: "Duarte Pereira",
    empresa: "Empresa Exemplo, Lda.",
    calculoPossivel: true,
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
