import * as React from "npm:react@18.3.1";
import type { TemplateEntry } from "./registry.ts";
import { dict, type Lang } from "./relatorio-completo.copy.ts";
import {
  Body,
  Container,
  CtaCard,
  EmailHeader,
  FooterContact,
  Head,
  Hr,
  Html,
  PrimaryAction,
  Preview,
  Text,
  bodyText,
  container,
  footerDisclaimer,
  headerDescription,
  hr,
  main,
  text,
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
          <EmailHeader
            eyebrowText={t.eyebrow}
            heading={t.heading}
            descriptionStyle={headerDescription}
            description={
              <>
                {t.greeting(nome)}
                {empresa ? t.concludedFrom : "."}
                {empresa && <strong>{empresa}</strong>}
                {empresa && "."}
              </>
            }
          />

          <Text style={bodyText}>{t.bodyIntro}</Text>

          {relatorioUrl && <PrimaryAction href={relatorioUrl} label={t.reportLinkLabel} />}

          <CtaCard eyebrowText={t.ctaEyebrow} title={t.ctaTitle} href={calendlyUrl} buttonLabel={t.ctaButton} />

          <Hr style={hr} />

          {valor && referencia && <Text style={text}>{t.recibo(valor, referencia)}</Text>}

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
    const lang: Lang = data["lang"] ?? "pt";
    const t = dict[lang] ?? dict.pt;
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
