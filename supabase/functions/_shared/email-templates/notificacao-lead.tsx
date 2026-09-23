import * as React from "npm:react@18.3.1";
import type { TemplateEntry } from "./registry.ts";
import { previewData } from "./notificacao-lead.copy.ts";
import {
  Body,
  Column,
  Container,
  EmailHeader,
  Head,
  Hr,
  Html,
  Link,
  Metric,
  Preview,
  Row,
  RowValue,
  Section,
  SectionTitle,
  Text,
  cardSection,
  container,
  footerInternal,
  footerLink,
  hrInternal,
  internalBadge,
  internalLink,
  internalLinkBlock,
  internalLinkLabel,
  leadSubtitle,
  leadTitle,
  main,
  metricRow,
  resultCard,
  resultEyebrow,
  resultSection,
  resultWarning,
  section,
  sectionInner,
} from "./ui.tsx";

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
          <EmailHeader
            eyebrowText="LEALIA ADVISORY PARTNERS"
            heading="Nova submissão da ferramenta de avaliação"
            description="Informação completa submetida pelo utilizador e resultado da pré-avaliação automática."
          />

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
          <Hr style={hrInternal} />

          <Text style={footerInternal}>
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

  previewData,
} satisfies TemplateEntry;

export default Email;
