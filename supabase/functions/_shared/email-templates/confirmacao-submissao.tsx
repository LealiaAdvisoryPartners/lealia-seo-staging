import * as React from "npm:react@18.3.1";
import type { TemplateEntry } from "./registry.ts";
import { dict, type Lang } from "./confirmacao-submissao.copy.ts";
import {
  Body,
  Container,
  CtaCard,
  EmailHeader,
  FooterContact,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Text,
  bodyText,
  container,
  footerDisclaimer,
  hr,
  main,
  reportLink,
} from "./ui.tsx";

interface Props {
  nome: string;
  empresa?: string;
  calculoPossivel?: boolean;
  calendlyUrl?: string;
  lang?: Lang;
}

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
          <EmailHeader
            eyebrowText={t.eyebrow}
            heading={t.heading}
            description={
              <>
                {t.greeting(nome)}
                {empresa ? t.receivedFrom : "."}
                {empresa && <strong>{empresa}</strong>}
                {empresa && "."}
              </>
            }
          />

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

          <CtaCard
            eyebrowText={t.ctaEyebrow}
            title={calculoPossivel ? t.ctaTitlePossivel : t.ctaTitleImpossivel}
            href={calendlyUrl}
            buttonLabel={calculoPossivel ? t.ctaButtonPossivel : t.ctaButtonImpossivel}
          />

          {/* Footer */}
          <Hr style={hr} />

          <Text style={footerDisclaimer}>{t.disclaimer}</Text>

          <FooterContact />
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

export default Email;
