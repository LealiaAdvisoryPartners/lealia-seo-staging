import type { ReportData } from "@core/report-data";
import { t, type ReportLang, groupThousandsLang } from "@core/report-i18n";
import { Page, H } from "./primitives";

// Lista fechada de pressupostos a apresentar na secção de transparência.
const PRESSUPOSTOS_TRANSPARENCIA = [
  "Crescimento inicial da receita",
  "Margem EBITDA projetada",
  "Risk-free rate",
  "Beta unlevered / levered",
  "Equity Risk Premium",
  "Country Risk Premium",
  "Prémio de dimensão (PME)",
  "Prémio específico (iliquidez)",
  "Prémio específico do ativo",
  "Cost of debt (pre / post tax)",
  "Estrutura de capital (D / E)",
  "Crescimento estabilizado (anos 5-8)",
  "Crescimento na perpetuidade",
  "Convenção de desconto",
];

export function SensitivityPage({ d, numero, lang }: { d: ReportData; numero: number; lang: ReportLang }) {
  const dcf = d.dcf;
  const dictSens = t(lang).doc.sensitivity;
  const kEur = (v: number) => groupThousandsLang(v / 1000, lang);

  if (!dcf) {
    return (
      <Page numero={numero} titulo={dictSens.titulo} lang={lang}>
        <H>{dictSens.hTitulo}</H>
        <div className="report-note">{d.dcf_motivo ?? dictSens.semDados}</div>
      </Page>
    );
  }

  const pressupostosExtra = PRESSUPOSTOS_TRANSPARENCIA.map((label) =>
    dcf.pressupostos.find((p) => p.label === label),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <Page numero={numero} titulo={dictSens.titulo} lang={lang}>
      <div className="report-dcf-title">
        <H>{dictSens.sensibilidadeEv}</H>
        <span className="report-dcf-unit">{t(lang).doc.dcf.unidadeMilhares}</span>
      </div>
      <div className="report-sens-grid">
        {dcf.matrizes.map((m) => (
          <div key={m.titulo} className="report-sens-card">
            <strong>{m.titulo}</strong>
            <table className="report-table report-table-compact report-sens-table">
              <thead>
                <tr>
                  <th>
                    {m.eixo_y_label} \ {m.eixo_x_label}
                  </th>
                  {m.colunas.map((c) => (
                    <th key={c.label} className={c.base ? "report-sens-base" : undefined}>
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {m.linhas.map((l) => (
                  <tr key={l.label}>
                    <td className={l.base ? "report-sens-base" : undefined}>{l.label}</td>
                    {l.valores.map((v, i) => (
                      <td key={i} className={l.base && m.colunas[i]?.base ? "report-sens-cell-base" : undefined}>
                        {Number.isFinite(v) ? kEur(v) : t(lang).common.naoAplicavel}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <p className="report-small">{dictSens.notaMatriz}</p>

      <section className="report-sens-assumptions">
        <H>{dictSens.transparenciaPressupostos}</H>
        <p className="report-small report-dcf-assumptions-intro">{dictSens.introTransparencia}</p>
        <table className="report-table report-table-compact report-table-text">
          <thead>
            <tr>
              <th>{dictSens.parametro}</th>
              <th>{dictSens.valor}</th>
              <th>{dictSens.metodoFonte}</th>
            </tr>
          </thead>
          <tbody>
            {pressupostosExtra.map((p) => (
              <tr key={p.label}>
                <td>{p.label}</td>
                <td>{p.valor}</td>
                <td>{p.nota ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Page>
  );
}
