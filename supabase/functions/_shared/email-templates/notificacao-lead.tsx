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
  nome?: string;
  email?: string;
  telefone?: string | null;
  empresa?: string;
  cargo?: string | null;
  pais?: string;
  industria?: string;
  subindustria?: string | null;
  idadeEmpresa?: number | null;
  unidades?: string | null;
  anoReferencia?: number | null;

  // Financeiros
  // ano1 = ano de referência
  // ano2 = ano de referência - 1
  // ano3 = ano de referência - 2
  faturacaoAno1?: number | null;
  faturacaoAno2?: number | null;
  faturacaoAno3?: number | null;
  ebitdaAno1?: number | null;
  ebitdaAno2?: number | null;
  ebitdaAno3?: number | null;
  despesasExtraAno1?: number | null;
  despesasExtraAno2?: number | null;
  despesasExtraAno3?: number | null;

  // Balanço
  caixaEDepositos?: number | null;
  dividaFinanceira?: number | null;
  dividaLiquida?: number | null;
  capexAnualRecorrente?: number | null;
  numColaboradores?: string | null;

  // Risco
  pctTop5Clientes?: number | null;
  geografiaClientes?: string | null;
  dependenciaAcionistaFaturacao?: string | null;
  dependenciaAcionistaGestao?: string | null;

  // Imóvel
  proprietarioImovel?: string | null;
  rendaRefleteMercado?: string | null;
  acrescimoRendaAnual?: number | null;
  incluirImovelPerimetro?: string | null;
  valorizacaoImovel?: number | null;

  // Motivação
  estruturaTransacao?: string | null;
  pctATransacionar?: string | null;
  motivoInteresse?: string | null;
  horizonteTemporal?: string | null;

  // Resultado
  calculoPossivel?: boolean;
  evMin?: number | null;
  evMax?: number | null;
  equityMin?: number | null;
  equityMax?: number | null;
  multiploMin?: number | null;
  multiploMax?: number | null;
  confianca?: string | null;

  relatorioUrl?: string | null;
  pdfUrl?: string | null;
}

const eur = (value?: number | null) =>
  typeof value === "number"
    ? new Intl.NumberFormat("pt-PT", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }).format(value)
    : "—";

const pct = (value?: number | null) => (typeof value === "number" ? `${value}%` : "—");

const txt = (value?: string | number | null) =>
  value === null || value === undefined || value === "" ? "—" : String(value);

const multiple = (min?: number | null, max?: number | null) =>
  typeof min === "number" && typeof max === "number" ? `${min.toFixed(1)}x — ${max.toFixed(1)}x` : "—";

const RowValue = ({ label, value }: { label: string; value: string }) => (
  <Text style={row}>
    <span style={rowLabel}>{label}</span>
    <br />
    <span style={rowValue}>{value}</span>
  </Text>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => <Text style={sectionTitle}>{children}</Text>;

const Metric = ({ label, value }: { label: string; value: string }) => (
  <Column style={metricColumn}>
    <Text style={metricLabel}>{label}</Text>
    <Text style={metricValue}>{value}</Text>
  </Column>
);

const Email = (p: Props) => {
  const anoReferencia = p.anoReferencia ?? null;

  const y1 = anoReferencia ? `${anoReferencia}` : "Ano ref.";
  const y2 = anoReferencia ? `${anoReferencia - 1}` : "Ano -1";
  const y3 = anoReferencia ? `${anoReferencia - 2}` : "Ano -2";

  const reportUrl = p.relatorioUrl;
  const pdfUrl = p.pdfUrl;

  return (
    <Html lang="pt" dir="ltr">
      <Head />

      <Preview>
        Nova submissão
        {p.empresa ? ` — ${p.empresa}` : ""}
        {p.nome ? ` (${p.nome})` : ""}
      </Preview>

      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Row style={headerRow}>
            <Column style={headerTextCol}>
              <Text style={eyebrow}>LEALIA ADVISORY PARTNERS</Text>

              <Heading style={h1}>Nova submissão da ferramenta de avaliação</Heading>

              <Text style={headerDescription}>
                Informação completa submetida pelo utilizador e resultado da pré-avaliação automática.
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

          {/* Identificação */}
          <Section style={section}>
            <Row>
              <Column style={sectionInner}>
                <Text style={internalBadge}>USO INTERNO</Text>

                <Text style={leadTitle}>{p.empresa || "Empresa não indicada"}</Text>

                <Text style={leadSubtitle}>
                  {p.nome || "Nome não indicado"}
                  {p.cargo ? ` · ${p.cargo}` : ""}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Resultado */}
          <Section style={resultSection}>
            <Row>
              <Column style={resultCard}>
                <Text style={resultEyebrow}>RESULTADO DA AVALIAÇÃO</Text>

                {p.calculoPossivel === false ? (
                  <Text style={resultWarning}>Cálculo não possível (EBITDA nulo ou negativo)</Text>
                ) : (
                  <>
                    <Row style={metricRow}>
                      <Metric label="Enterprise Value" value={`${eur(p.evMin)} — ${eur(p.evMax)}`} />

                      <Metric label="Equity Value" value={`${eur(p.equityMin)} — ${eur(p.equityMax)}`} />
                    </Row>

                    <Row style={metricRow}>
                      <Metric label="Múltiplo EBITDA" value={multiple(p.multiploMin, p.multiploMax)} />

                      <Metric label="Índice de confiança" value={txt(p.confianca)} />
                    </Row>
                  </>
                )}
              </Column>
            </Row>
          </Section>

          {/* Contacto */}
          <Section style={cardSection}>
            <SectionTitle>Contacto</SectionTitle>

            <RowValue label="Nome" value={txt(p.nome)} />
            <RowValue label="Email" value={txt(p.email)} />
            <RowValue label="Telefone" value={txt(p.telefone)} />
            <RowValue label="Cargo" value={txt(p.cargo)} />
          </Section>

          {/* Empresa */}
          <Section style={cardSection}>
            <SectionTitle>Empresa</SectionTitle>

            <RowValue label="Empresa" value={txt(p.empresa)} />
            <RowValue label="País" value={txt(p.pais)} />

            <RowValue label="Indústria" value={`${txt(p.industria)}${p.subindustria ? ` · ${p.subindustria}` : ""}`} />

            <RowValue label="Idade da empresa" value={p.idadeEmpresa != null ? `${p.idadeEmpresa} anos` : "—"} />

            <RowValue label="Ano de referência" value={txt(p.anoReferencia)} />
          </Section>

          {/* Dados financeiros */}
          <Section style={cardSection}>
            <SectionTitle>Dados financeiros</SectionTitle>

            <RowValue label={`Faturação ${y1}`} value={eur(p.faturacaoAno1)} />

            <RowValue label={`Faturação ${y2}`} value={eur(p.faturacaoAno2)} />

            <RowValue label={`Faturação ${y3}`} value={eur(p.faturacaoAno3)} />

            <RowValue label={`EBITDA ${y1}`} value={eur(p.ebitdaAno1)} />

            <RowValue label={`EBITDA ${y2}`} value={eur(p.ebitdaAno2)} />

            <RowValue label={`EBITDA ${y3}`} value={eur(p.ebitdaAno3)} />

            <RowValue label={`Despesas extraordinárias ${y1}`} value={eur(p.despesasExtraAno1)} />

            <RowValue label={`Despesas extraordinárias ${y2}`} value={eur(p.despesasExtraAno2)} />

            <RowValue label={`Despesas extraordinárias ${y3}`} value={eur(p.despesasExtraAno3)} />
          </Section>

          {/* Balanço */}
          <Section style={cardSection}>
            <SectionTitle>Balanço e investimento</SectionTitle>

            <RowValue label="Caixa e depósitos" value={eur(p.caixaEDepositos)} />

            <RowValue label="Dívida financeira" value={eur(p.dividaFinanceira)} />

            <RowValue label="Posição Líquida" value={eur(p.dividaLiquida)} />

            <RowValue label="CAPEX anual recorrente" value={eur(p.capexAnualRecorrente)} />

            <RowValue label="Número de colaboradores" value={txt(p.numColaboradores)} />
          </Section>

          {/* Risco */}
          <Section style={cardSection}>
            <SectionTitle>Risco e concentração</SectionTitle>

            <RowValue label="% top 5 clientes" value={pct(p.pctTop5Clientes)} />

            <RowValue label="Geografia dos clientes" value={txt(p.geografiaClientes)} />

            <RowValue label="Dependência do acionista — faturação" value={txt(p.dependenciaAcionistaFaturacao)} />

            <RowValue label="Dependência do acionista — gestão" value={txt(p.dependenciaAcionistaGestao)} />
          </Section>

          {/* Imóvel */}
          <Section style={cardSection}>
            <SectionTitle>Imóvel / instalações</SectionTitle>

            <RowValue label="Proprietário do imóvel onde opera" value={txt(p.proprietarioImovel)} />

            <RowValue label="Renda reflete valores de mercado" value={txt(p.rendaRefleteMercado)} />

            <RowValue label="Acréscimo de renda anual — mercado" value={eur(p.acrescimoRendaAnual)} />

            <RowValue label="Imóvel incluído no perímetro" value={txt(p.incluirImovelPerimetro)} />

            <RowValue label="Valorização do imóvel" value={eur(p.valorizacaoImovel)} />
          </Section>

          {/* Motivação */}
          <Section style={cardSection}>
            <SectionTitle>Motivação e transação</SectionTitle>

            <RowValue label="Estrutura pretendida" value={txt(p.estruturaTransacao)} />

            <RowValue label="Participação a transacionar" value={txt(p.pctATransacionar)} />

            <RowValue label="Motivo do interesse" value={txt(p.motivoInteresse)} />

            <RowValue label="Horizonte temporal" value={txt(p.horizonteTemporal)} />
          </Section>

          {/* Links internos */}
          {(reportUrl || pdfUrl) && (
            <Section style={cardSection}>
              <SectionTitle>Relatório completo — uso interno</SectionTitle>

              {reportUrl && (
                <Text style={internalLinkBlock}>
                  <span style={internalLinkLabel}>Relatório online</span>
                  <br />
                  <Link href={reportUrl} style={internalLink}>
                    {reportUrl}
                  </Link>
                </Text>
              )}

              {pdfUrl && (
                <Text style={internalLinkBlock}>
                  <span style={internalLinkLabel}>PDF</span>
                  <br />
                  <Link href={pdfUrl} style={internalLink}>
                    {pdfUrl}
                  </Link>
                </Text>
              )}
            </Section>
          )}

          {/* Footer */}
          <Hr style={hr} />

          <Text style={footer}>
            Email interno gerado automaticamente pela ferramenta de pré-avaliação.
            <br />
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

  subject: (data: Record<string, any>) =>
    `Nova submissão${data["empresa"] ? ` — ${data["empresa"]}` : ""}${data["nome"] ? ` (${data["nome"]})` : ""}`,

  displayName: "Notificação interna de novo lead",

  previewData: {
    nome: "Duarte Pereira",
    email: "exemplo@empresa.pt",
    telefone: "+351 910 000 000",
    empresa: "Empresa Exemplo, Lda.",
    cargo: "CEO",
    pais: "Portugal",
    industria: "Indústria e Produção",
    subindustria: "Metalomecânica",
    idadeEmpresa: 18,
    anoReferencia: 2025,

    faturacaoAno1: 5200000,
    faturacaoAno2: 4800000,
    faturacaoAno3: 4300000,

    ebitdaAno1: 820000,
    ebitdaAno2: 700000,
    ebitdaAno3: 610000,

    despesasExtraAno1: 40000,
    despesasExtraAno2: 30000,
    despesasExtraAno3: 25000,

    caixaEDepositos: 350000,
    dividaFinanceira: 900000,
    dividaLiquida: 550000,
    capexAnualRecorrente: 120000,
    percentagemReceitaRecorrente: 40,

    pctTop5Clientes: 35,
    geografiaClientes: "Maioritariamente nacional",
    dependenciaAcionistaFaturacao: "Média",
    dependenciaAcionistaGestao: "Elevada",

    proprietarioImovel: "Sim",
    rendaRefleteMercado: "Não",
    acrescimoRendaAnual: 60000,
    incluirImovelPerimetro: "Sim",
    valorizacaoImovel: 1000000,

    estruturaTransacao: "Venda total",
    pctATransacionar: "Totalidade (90-100%)",
    motivoInteresse: "Sucessão",
    horizonteTemporal: "1-2 anos",

    calculoPossivel: true,
    evMin: 4200000,
    evMax: 5600000,
    equityMin: 4800000,
    equityMax: 6200000,
    multiploMin: 5.2,
    multiploMax: 6.9,
    confianca: "Média",

    relatorioUrl: "https://exemplo.lealiaap.com/relatorio/token",
    pdfUrl: "https://exemplo.lealiaap.com/relatorio/token.pdf",
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
const RESULT_BG = "#f8f7f1";

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

const headerDescription = {
  margin: "12px 0 0 0",
  color: "#52525b",
  fontSize: "14px",
  lineHeight: "22px",
  textAlign: "justify" as const,
  fontFamily: FONT,
};

const section = {
  padding: "24px 32px 0 32px",
};

const sectionInner = {
  backgroundColor: "#ffffff",
};

const internalBadge = {
  margin: "0 0 8px 0",
  color: GOLD,
  fontSize: "10px",
  lineHeight: "16px",
  letterSpacing: "1.8px",
  fontWeight: 700,
  fontFamily: FONT,
};

const leadTitle = {
  margin: "0",
  color: NAVY,
  fontSize: "21px",
  lineHeight: "28px",
  fontWeight: 700,
  fontFamily: FONT,
};

const leadSubtitle = {
  margin: "5px 0 0 0",
  color: "#52525b",
  fontSize: "14px",
  lineHeight: "22px",
  fontFamily: FONT,
};

const resultSection = {
  padding: "24px 32px 4px 32px",
};

const resultCard = {
  backgroundColor: RESULT_BG,
  border: `1px solid ${GOLD}`,
  borderRadius: "12px",
  padding: "22px 20px 18px 20px",
};

const resultEyebrow = {
  margin: "0 0 16px 0",
  color: "#8a8676",
  fontSize: "10px",
  lineHeight: "16px",
  letterSpacing: "1.8px",
  fontWeight: 700,
  fontFamily: FONT,
};

const resultWarning = {
  margin: "0",
  color: "#991b1b",
  fontSize: "15px",
  lineHeight: "24px",
  fontWeight: 600,
  fontFamily: FONT,
};

const metricRow = {
  width: "100%",
};

const metricColumn = {
  width: "50%",
  padding: "0 8px 12px 0",
  verticalAlign: "top" as const,
};

const metricLabel = {
  margin: "0 0 4px 0",
  color: "#8a8676",
  fontSize: "10px",
  lineHeight: "16px",
  letterSpacing: "0.8px",
  textTransform: "uppercase" as const,
  fontFamily: FONT,
};

const metricValue = {
  margin: "0",
  color: NAVY,
  fontSize: "17px",
  lineHeight: "24px",
  fontWeight: 700,
  fontFamily: FONT,
};

const cardSection = {
  padding: "0 32px",
};

const sectionTitle = {
  margin: "28px 0 14px 0",
  paddingBottom: "9px",
  borderBottom: `1px solid ${BORDER}`,
  color: "#71717a",
  fontSize: "10px",
  lineHeight: "16px",
  letterSpacing: "1.8px",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  fontFamily: FONT,
};

const row = {
  margin: "0 0 11px 0",
  color: "#33405a",
  fontSize: "13px",
  lineHeight: "20px",
  fontFamily: FONT,
};

const rowLabel = {
  color: "#8a8676",
  fontSize: "11px",
  lineHeight: "17px",
  fontFamily: FONT,
};

const rowValue = {
  color: NAVY,
  fontSize: "14px",
  lineHeight: "21px",
  fontFamily: FONT,
  wordBreak: "break-word" as const,
};

const internalLinkBlock = {
  margin: "0 0 16px 0",
  fontSize: "13px",
  lineHeight: "20px",
  fontFamily: FONT,
};

const internalLinkLabel = {
  color: "#8a8676",
  fontSize: "11px",
  fontWeight: 700,
  fontFamily: FONT,
};

const internalLink = {
  color: GOLD,
  fontSize: "13px",
  lineHeight: "20px",
  textDecoration: "underline",
  wordBreak: "break-word" as const,
  fontFamily: FONT,
};

const hr = {
  borderColor: BORDER,
  margin: "26px 32px 0 32px",
};

const footer = {
  margin: "16px 32px 28px 32px",
  color: MUTED,
  fontSize: "11px",
  lineHeight: "18px",
  textAlign: "justify" as const,
  fontFamily: FONT,
};

const footerLink = {
  color: MUTED,
  textDecoration: "none",
  fontFamily: FONT,
};

export default Email;
