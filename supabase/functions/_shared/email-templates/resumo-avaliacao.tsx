import * as React from "npm:react@18.3.1";
import type { TemplateEntry } from "./registry.ts";
import { dict, type Lang } from "./resumo-avaliacao.copy.ts";
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
  linkBlock,
  main,
  reportLink,
} from "./ui.tsx";

interface Props {
  nome: string;
  empresa?: string;
  relatorioUrl?: string | null;
  pdfUrl?: string | null;
  upgradeUrl?: string | null;
  calendlyUrl?: string;
  lang?: Lang;
}

const Email = ({
  nome,
  empresa,
  relatorioUrl,
  pdfUrl,
  upgradeUrl,
  calendlyUrl = "https://calendly.com/lealiaap-drp/valuationcall",
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
          <EmailHeader
            eyebrowText={t.eyebrow}
            heading={t.heading}
            description={
              <>
                {t.greeting(nome)}
                {empresa ? t.concludedFrom : "."}
                {empresa && <strong>{empresa}</strong>}
                {empresa && "."}
              </>
            }
          />

          {/* Corpo */}
          <Text style={bodyText}>{t.bodyIntro}</Text>

          {reportUrl && (
            <Text style={linkBlock}>
              <Link href={reportUrl} style={reportLink}>
                {t.reportLinkLabel}
              </Link>
            </Text>
          )}

          <CtaCard eyebrowText={t.ctaEyebrow} title={t.ctaTitle} href={calendlyUrl} buttonLabel={t.ctaButton} />

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

  displayName: "Relatório pronto",

  previewData: {
    nome: "Duarte Pereira",
    empresa: "Empresa Exemplo, Lda.",
    relatorioUrl: "https://exemplo.lealiaap.com/relatorio/token",
    pdfUrl: "https://exemplo.lealiaap.com/relatorio/token.pdf",
    lang: "pt",
  },
} satisfies TemplateEntry;

export default Email;
