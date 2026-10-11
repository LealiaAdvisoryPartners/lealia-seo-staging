import * as React from "npm:react@18.3.1";
import type { TemplateEntry } from "./registry.ts";
import { dict, type Lang } from "./resumo-avaliacao.copy.ts";
import {
  Body,
  Container,
  EditorialBlock,
  PrimaryAction,
  SupportNote,
  EmailHeader,
  FooterContact,
  Head,
  Hr,
  Html,
  Preview,
  Text,
  bodyText,
  container,
  footerDisclaimer,
  hr,
  main,
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

          {reportUrl && <PrimaryAction href={reportUrl} label={t.reportLinkLabel} />}

          {upgradeUrl && (
            <EditorialBlock
              eyebrowText={t.upgradeEyebrow}
              title={t.upgradeTitle}
              body={t.upgradeBody}
              href={upgradeUrl}
              linkLabel={t.upgradeButton}
            />
          )}

          <SupportNote text={t.meetingNote} href={calendlyUrl} linkLabel={t.meetingLink} />

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

  displayName: "Relatório indicativo (D+2)",

  previewData: {
    nome: "Duarte Pereira",
    empresa: "Empresa Exemplo, Lda.",
    relatorioUrl: "https://exemplo.lealiaap.com/relatorio/token",
    pdfUrl: "https://exemplo.lealiaap.com/relatorio/token.pdf",
    upgradeUrl: "https://www.lealiaap.com/pt/upgrade?ref=empresa-exemplo-abcd",
    lang: "pt",
  },
} satisfies TemplateEntry;

export default Email;
