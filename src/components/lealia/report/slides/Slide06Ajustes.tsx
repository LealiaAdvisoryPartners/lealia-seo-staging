import type { ReportData } from "@core/report-data";
import { type ReportLang, t } from "@core/report-i18n";
import { Page, H } from "../primitives";

function efeitoQualitativo(multiplicador: number, lang: ReportLang, semDados?: boolean, efeito?: string) {
  const efeitos = t(lang).doc.efeito;
  if (efeito === "Positivo") return efeitos.positivo;
  if (efeito === "Negativo") return efeitos.negativo;
  if (efeito === "Neutro") return efeitos.neutro;
  if (efeito) return efeito;
  if (semDados) return efeitos.neutro;
  if (multiplicador > 0.995) return efeitos.positivo;
  if (multiplicador < 0.995) return efeitos.negativo;
  return efeitos.neutro;
}

export function Slide06Ajustes({ d, lang }: { d: ReportData; lang: ReportLang }) {
  const dict = t(lang).doc;
  return (
    <Page numero={6} titulo={dict.p6.titulo} lang={lang}>
      <H>{dict.p6.hTitulo}</H>
      {d.ajustes.length ? (
        <table className="report-table report-table-text">
          <thead>
            <tr>
              <th>{dict.p6.fator}</th>
              <th>{dict.p6.leitura}</th>
              <th>{dict.p6.efeito}</th>
            </tr>
          </thead>
          <tbody>
            {d.ajustes.map((a, i) => (
              <tr key={`${a.label}-${i}`}>
                <td>{a.label}</td>
                <td>{a.detalhe}</td>
                <td>{efeitoQualitativo(a.multiplicador, lang, a.semDados, a.efeito)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="report-p">{dict.p6.semAjustes}</p>
      )}
      <p className="report-small">{dict.p6.nota}</p>
    </Page>
  );
}
