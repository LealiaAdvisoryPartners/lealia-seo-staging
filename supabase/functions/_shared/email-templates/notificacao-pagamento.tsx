// Notificação interna: alguém comprou o relatório completo.
import * as React from "npm:react@18.3.1";
import type { TemplateEntry } from "./registry.ts";
import {
  Body,
  Container,
  EmailHeader,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  RowValue,
  Section,
  SectionTitle,
  Text,
  container,
  footerInternal,
  footerLink,
  hrInternal,
  internalLink,
  internalLinkBlock,
  main,
  sectionInner,
} from "./ui.tsx";

interface Props {
  empresa?: string;
  nome?: string;
  email?: string;
  telefone?: string;
  valor?: string;
  metodo?: string;
  referencia?: string;
  pagoEm?: string;
  nif?: string;
  nomeFiscal?: string;
  moradaFiscal?: string;
  relatorioUrl?: string | null;
}

const METODOS: Record<string, string> = { mbway: "MB WAY", credit_card: "Cartão / Apple Pay / Google Pay" };

const Email = ({
  empresa,
  nome,
  email,
  telefone,
  valor,
  metodo,
  referencia,
  pagoEm,
  nif,
  nomeFiscal,
  moradaFiscal,
  relatorioUrl,
}: Props) => (
  <Html lang="pt" dir="ltr">
    <Head />

    <Preview>{`Pagamento confirmado${empresa ? ` — ${empresa}` : ""}`}</Preview>

    <Body style={main}>
      <Container style={container}>
        <EmailHeader
          eyebrowText="LEALIA — INTERNO"
          heading="Relatório completo pago"
          description={`${empresa ?? "Submissão"}${nome ? ` · ${nome}` : ""}`}
        />

        <Section style={sectionInner}>
          <SectionTitle>Pagamento</SectionTitle>
          <RowValue label="Valor" value={valor ?? "—"} />
          <RowValue label="Método" value={METODOS[metodo ?? ""] ?? metodo ?? "—"} />
          <RowValue label="Referência do pedido" value={referencia ?? "—"} />
          <RowValue label="Pago em" value={pagoEm ?? "—"} />
        </Section>

        <Section style={sectionInner}>
          <SectionTitle>Cliente</SectionTitle>
          <RowValue label="Nome" value={nome ?? "—"} />
          <RowValue label="Email" value={email ?? "—"} />
          <RowValue label="Telefone" value={telefone ?? "—"} />
        </Section>

        {(nif || nomeFiscal || moradaFiscal) && (
          <Section style={sectionInner}>
            <SectionTitle>Dados de faturação</SectionTitle>
            <RowValue label="NIF" value={nif ?? "—"} />
            <RowValue label="Nome fiscal" value={nomeFiscal ?? "—"} />
            <RowValue label="Morada" value={moradaFiscal ?? "—"} />
          </Section>
        )}

        {relatorioUrl && (
          <Section style={internalLinkBlock}>
            <Text style={{ margin: 0 }}>
              <Link href={relatorioUrl} style={internalLink}>
                Abrir relatório completo do comprador →
              </Link>
            </Text>
          </Section>
        )}

        <Hr style={hrInternal} />

        <Text style={footerInternal}>
          Email interno gerado automaticamente pela ferramenta de pré-avaliação.
          <br />
          <strong>Lealia Advisory Partners</strong>
          {" · "}
          <Link href="https://lealiaap.com" style={footerLink}>
            lealiaap.com
          </Link>
        </Text>
      </Container>
    </Body>
  </Html>
);

export const template = {
  component: Email,

  // deno-lint-ignore no-explicit-any
  subject: (data: Record<string, any>) =>
    `Pagamento confirmado — relatório completo${data["empresa"] ? ` — ${data["empresa"]}` : ""}`,

  displayName: "Notificação interna de pagamento",

  previewData: {
    empresa: "Empresa Exemplo, Lda.",
    nome: "Duarte Pereira",
    email: "duarte@exemplo.com",
    telefone: "+351 912 345 678",
    valor: "299,00 €",
    metodo: "mbway",
    referencia: "LP7KQ2M4X9AB",
    pagoEm: "24/09/2026 21:30",
    relatorioUrl: "https://lealiaap.com/empresa-exemplo-abcd?k=token",
  },
} satisfies TemplateEntry;

export default Email;
