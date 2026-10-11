import * as React from "npm:react@18.3.1";
import type { TemplateEntry } from "./registry.ts";
import { dict, type Lang } from "./relatorio-completo.copy.ts";
import {
  Body,
  Container,
  EmailHeader,
  FooterContact,
  Head,
  Hr,
  Html,
  PrimaryAction,
  Preview,
  SupportNote,
  Text,
  bodyText,
  container,
  footerDisclaimer,
  hr,
  main,
  MUTED,
  FONT,
} from "./ui.tsx";

interface Props {
  nome: string;
  empresa?: string;
  relatorioUrl?: string | null;
  valor?: string;
  referencia?: string;
  calendlyUrl?: string;
  lang?: Lang;
}

const Email = ({
  nome,
  empresa,
  relatorioUrl,
  valor,
  referencia,
  calendlyUrl = "https://calendly.com/lealiaap-drp/valuationcall",
  lang = "pt",
}: Props) => {
  const t = dict[lang] ?? dict.pt;

  return (
    <Html lang={lang} dir="ltr">
      <Head />
      <Preview>{t.preview(nome)}</Preview>
      <Body style={main}>
        <Container style={container}>
          <EmailHeader eyebrowText={t.eyebrow} heading={t.heading} description={t.greeting(nome)} />

          <Text style={bodyText}>
            {t.intro}
            {empresa && <>{t.of}<strong>{empresa}</strong></>}
            {t.ready}
          </Text>

          {relatorioUrl && <PrimaryAction href={relatorioUrl} label={t.reportLinkLabel} />}

          {valor && (
            <Text style={{ margin: "10px 32px 0 32px", textAlign: "center" as const, color: MUTED, fontSize: "12px", lineHeight: "18px", fontFamily: FONT }}>
              {t.recibo(valor, referencia)}
            </Text>
          )}

          <SupportNote text={t.meetingNote} href={calendlyUrl} linkLabel={t.meetingLink} />

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
  // deno-lint-ignore no-explicit-any
  subject: (data: Record<string, any>) => {
    const t = dict[(data["lang"] as Lang) ?? "pt"] ?? dict.pt;
    return data["empresa"] ? t.subjectWithCompany(data["empresa"]) : t.subjectWithoutCompany;
  },
  displayName: "Relatório completo (pago)",
  previewData: {
    nome: "Duarte Pereira",
    empresa: "Empresa Exemplo, Lda.",
    relatorioUrl: "https://lealiaap.com/empresa-exemplo-abcd?k=token",
    valor: "299,00 €",
    referencia: "LP7KQ2M4X9AB",
    lang: "pt",
  },
} satisfies TemplateEntry;

export default Email;
