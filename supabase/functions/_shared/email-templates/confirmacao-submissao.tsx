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
  calculoPossivel?: boolean;
  calendlyUrl?: string;
  lang?: Lang;
}

const dict = {
  pt: {
    preview: "Recebemos a sua submissão. Enviamos o relatório assim que estiver finalizado.",
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "Obrigado pela sua submissão",
    greeting: (nome: string) => `Olá ${nome}`,
    greetingWithCompany: (nome: string) => `Olá ${nome}`,
    receivedFrom: ", recebemos os dados da ",
    bodyPossivel:
      "A nossa equipa vai agora trabalhar a informação submetida e enviamos-lhe o relatório de avaliação indicativa assim que estiver finalizado.",
    bodyImpossivel1:
      "A informação fornecida não permite, nesta fase, uma estimativa fiável de avaliação da sua empresa.",
    bodyImpossivel2:
      "Isto não significa que não tenha valor: fale connosco para podermos analisar a situação específica e ajudar com um processo de avaliação personalizado.",
    contactPrefix: "Para qualquer questão entretanto, pode contactar-nos através de",
    ctaEyebrow: "PRÓXIMO PASSO — REUNIÃO DE 20 MINUTOS",
    ctaTitlePossivel: "Apresentação do relatório completo.",
    ctaTitleImpossivel: "Análise personalizada da sua empresa.",
    ctaButtonPossivel: "Agendar reunião",
    ctaButtonImpossivel: "Falar com a equipa",
    disclaimer:
      "O relatório preparado constitui uma estimativa indicativa da avaliação da empresa, gerada com base na informação fornecida pelo utilizador, não configurando aconselhamento financeiro, proposta contratual, recomendação de investimento ou avaliação formal para efeitos legais, fiscais ou contabilísticos; os valores nele apresentados dependem da qualidade e exatidão dos dados introduzidos e das condições de mercado vigentes à data de elaboração do documento.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | Recebemos a sua submissão`,
    subjectWithoutCompany: "Lealia | Recebemos a sua submissão",
  },
  en: {
    preview: "We have received your submission. We will send you the report as soon as it is ready.",
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "Thank you for your submission",
    greeting: (nome: string) => `Hello ${nome}`,
    greetingWithCompany: (nome: string) => `Hello ${nome}`,
    receivedFrom: ", we have received the information from ",
    bodyPossivel:
      "Our team will now review the information submitted and we will send you the indicative valuation report as soon as it is finalised.",
    bodyImpossivel1:
      "At this stage, the information provided does not allow for a reliable valuation estimate of your company.",
    bodyImpossivel2:
      "This does not mean your company has no value: get in touch with us so we can review your specific situation and support you with a tailored valuation process.",
    contactPrefix: "Should you have any questions in the meantime, please contact us at",
    ctaEyebrow: "NEXT STEP — 20-MINUTE MEETING",
    ctaTitlePossivel: "Presentation of the full report.",
    ctaTitleImpossivel: "A tailored analysis of your company.",
    ctaButtonPossivel: "Schedule a meeting",
    ctaButtonImpossivel: "Speak with our team",
    disclaimer:
      "This report constitutes an indicative estimate of the company's valuation, generated based on the information provided by the user, and does not constitute financial advice, a contractual proposal, an investment recommendation, or a formal valuation for legal, tax or accounting purposes; the figures presented depend on the quality and accuracy of the data entered and on prevailing market conditions at the time the document was prepared.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | We Received Your Submission`,
    subjectWithoutCompany: "Lealia | We Received Your Submission",
  },
  es: {
    preview: "Hemos recibido su solicitud. Le enviaremos el informe en cuanto esté finalizado.",
    eyebrow: "LEALIA ADVISORY PARTNERS",
    heading: "Gracias por su solicitud",
    greeting: (nome: string) => `Hola ${nome}`,
    greetingWithCompany: (nome: string) => `Hola ${nome}`,
    receivedFrom: ", hemos recibido los datos de ",
    bodyPossivel:
      "Nuestro equipo va a analizar ahora la información remitida y le enviaremos el informe de valoración indicativa en cuanto esté finalizado.",
    bodyImpossivel1:
      "La información facilitada no permite, en esta fase, realizar una estimación fiable de la valoración de su empresa.",
    bodyImpossivel2:
      "Esto no significa que su empresa carezca de valor: póngase en contacto con nosotros para que podamos analizar su situación concreta y ayudarle con un proceso de valoración personalizado.",
    contactPrefix: "Para cualquier consulta mientras tanto, puede contactarnos a través de",
    ctaEyebrow: "PRÓXIMO PASO — REUNIÓN DE 20 MINUTOS",
    ctaTitlePossivel: "Presentación del informe completo.",
    ctaTitleImpossivel: "Análisis personalizado de su empresa.",
    ctaButtonPossivel: "Agendar reunión",
    ctaButtonImpossivel: "Hablar con el equipo",
    disclaimer:
      "El presente informe constituye una estimación indicativa de la valoración de la empresa, generada a partir de la información facilitada por el usuario, y no constituye asesoramiento financiero, propuesta contractual, recomendación de inversión ni valoración formal a efectos legales, fiscales o contables; los valores en él presentados dependen de la calidad y exactitud de los datos introducidos y de las condiciones de mercado vigentes en la fecha de elaboración del documento.",
    subjectWithCompany: (empresa: string) => `${empresa} <> Lealia | Informe de Valoración Indicativa Recibido`,
    subjectWithoutCompany: "Lealia | Hemos Recibido su Solicitud",
  },
} satisfies Record<Lang, Record<string, any>>;

const Email = ({
  nome,
  empresa,
  calculoPossivel = true,
  calendlyUrl = "https://calendly.com/d/d3qm-jpm-t5x/valuation-full-report",
  lang = "pt",
}: Props) => {
  const t = dict[lang] ?? dict.pt;

  return (
    <Html lang={lang} dir="ltr">
      <Head />

      <Preview>{t.preview}</Preview>

      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Row style={headerRow}>
            <Column style={headerTextCol}>
              <Text style={eyebrow}>{t.eyebrow}</Text>

              <Heading style={h1}>{t.heading}</Heading>

              <Text style={text}>
                {t.greeting(nome)}
                {empresa ? t.receivedFrom : "."}
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
            <Text style={bodyText}>{t.bodyPossivel}</Text>
          ) : (
            <>
              <Text style={bodyText}>{t.bodyImpossivel1}</Text>
              <Text style={bodyText}>{t.bodyImpossivel2}</Text>
            </>
          )}

          <Text style={bodyText}>
            {t.contactPrefix}{" "}
            <Link href="mailto:valuations@lealiaap.com" style={reportLink}>
              valuations@lealiaap.com
            </Link>
            .
          </Text>

          {/* CTA */}
          <Section style={ctaSection}>
            <Row>
              <Column style={ctaCard}>
                <Text style={ctaEyebrow}>{t.ctaEyebrow}</Text>

                <Text style={ctaTitle}>{calculoPossivel ? t.ctaTitlePossivel : t.ctaTitleImpossivel}</Text>

                <Link href={calendlyUrl} style={button}>
                  {calculoPossivel ? t.ctaButtonPossivel : t.ctaButtonImpossivel}
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

  displayName: "Confirmação de submissão",

  previewData: {
    nome: "Duarte Pereira",
    empresa: "Empresa Exemplo, Lda.",
    calculoPossivel: true,
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
