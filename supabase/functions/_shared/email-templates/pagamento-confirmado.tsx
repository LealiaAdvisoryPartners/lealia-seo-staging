import * as React from "npm:react@18.3.1";
import type { TemplateEntry } from "./registry.ts";
import { dict, type Lang } from "./pagamento-confirmado.copy.ts";
import {
  Body,
  Container,
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
  MUTED,
} from "./ui.tsx";

interface Props {
  nome: string;
  empresa?: string;
  dataEntrega?: string;
  valor?: string;
  metodo?: string;
  referencia?: string;
  pagoEm?: string;
  lang?: Lang;
}

const Email = ({ nome, empresa, valor = "299,00 €", referencia, lang = "pt" }: Props) => {
  const t = dict[lang] ?? dict.pt;

  return (
    <Html lang={lang} dir="ltr">
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <EmailHeader eyebrowText={t.eyebrow} heading={t.heading} description={t.greeting(nome)} />

          <Text style={bodyText}>
            {t.confirm(valor, referencia)}
            {empresa ? <>{t.of}<strong>{empresa}</strong>.</> : "."}
          </Text>

          <Text style={bodyText}>{t.next}</Text>

          <Text style={bodyText}>{t.invoice}</Text>

          <Text style={{ ...bodyText, color: MUTED, fontSize: "13px", lineHeight: "21px", margin: "20px 32px 24px 32px" }}>
            {t.note}
          </Text>

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
  displayName: "Pagamento confirmado",
  previewData: {
    nome: "Duarte Pereira",
    empresa: "Empresa Exemplo, Lda.",
    valor: "299,00 €",
    referencia: "LP7KQ2M4X9AB",
    lang: "pt",
  },
} satisfies TemplateEntry;

export default Email;
