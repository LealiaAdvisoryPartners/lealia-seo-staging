import * as React from "npm:react@18.3.1";
import type { TemplateEntry } from "./registry.ts";
import { dict, type Lang } from "./pagamento-confirmado.copy.ts";
import {
  Body,
  Container,
  EditorialBlock,
  EmailHeader,
  FooterContact,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  RowValue,
  Section,
  Text,
  bodyText,
  container,
  footerDisclaimer,
  hr,
  main,
  reportLink,
  ctaEyebrow,
} from "./ui.tsx";

interface Props {
  nome: string;
  empresa?: string;
  dataEntrega: string;
  valor?: string;
  metodo?: string;
  referencia?: string;
  pagoEm?: string;
  lang?: Lang;
}

const Email = ({ nome, empresa, dataEntrega, valor, metodo, referencia, pagoEm, lang = "pt" }: Props) => {
  const t = dict[lang] ?? dict.pt;
  const linhas: [string, string | undefined][] = [
    [t.valor, valor],
    [t.metodo, metodo],
    [t.referencia, referencia],
    [t.data, pagoEm],
  ];

  return (
    <Html lang={lang} dir="ltr">
      <Head />
      <Preview>{t.preview(dataEntrega)}</Preview>
      <Body style={main}>
        <Container style={container}>
          <EmailHeader
            eyebrowText={t.eyebrow}
            heading={t.heading}
            description={
              <>
                {t.greeting(nome)}
                {empresa ? t.about : "."}
                {empresa && <strong>{empresa}</strong>}
                {empresa && "."}
              </>
            }
          />

          <Text style={bodyText}>{t.body}</Text>

          <EditorialBlock eyebrowText={t.deliveryEyebrow} title={t.deliveryTitle(dataEntrega)} body={t.deliveryBody} />

          <Section style={{ padding: "20px 32px 8px 32px" }}>
            <Text style={{ ...ctaEyebrow, margin: "0 0 8px 0" }}>{t.receiptEyebrow}</Text>
            {linhas.filter(([, v]) => v).map(([l, v]) => <RowValue key={l} label={l} value={v!} />)}
          </Section>

          <Text style={bodyText}>
            {t.partnersNote}{" "}
            <Link href="mailto:valuations@lealiaap.com" style={reportLink}>valuations@lealiaap.com</Link>.
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
  displayName: "Pagamento confirmado (entrega agendada)",
  previewData: {
    nome: "Duarte Pereira",
    empresa: "Empresa Exemplo, Lda.",
    dataEntrega: "segunda-feira, 28 de setembro de 2026",
    valor: "299,00 €",
    metodo: "Cartão",
    referencia: "LP7KQ2M4X9AB",
    pagoEm: "26/09/2026 14:31",
    lang: "pt",
  },
} satisfies TemplateEntry;

export default Email;
