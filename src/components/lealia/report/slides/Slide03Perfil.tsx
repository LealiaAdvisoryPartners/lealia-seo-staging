import type { ReportData } from "@core/report-data";
import { type ReportLang, t } from "@core/report-i18n";
import { Page, H } from "../primitives";

export function Slide03Perfil({ d, lang }: { d: ReportData; lang: ReportLang }) {
  const dict = t(lang).doc;
  return (
    <Page numero={3} titulo={dict.p3.titulo} lang={lang}>
      <div className="report-two">
        <div>
          <H>{dict.p3.perfilEmpresa}</H>
          <table className="report-table report-table-compact report-table-perfil">
            <thead>
              <tr>
                <th>{dict.p3.indicador}</th>
                <th>{dict.p3.valor}</th>
              </tr>
            </thead>
            <tbody>
              {d.perfil.map((p) => (
                <tr key={p.label}>
                  <td>{p.label}</td>
                  <td className="report-perfil-valor">{p.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <H>{dict.p3.historicoFinanceiro}</H>
          <table className="report-table report-table-compact">
            <thead>
              <tr>
                <th>{dict.p3.ano}</th>
                <th>{dict.p3.faturacao}</th>
                <th>{dict.p3.ebitda}</th>
                <th>{dict.p3.extraordinarios}</th>
                <th>{dict.p3.normalizacoes}</th>
              </tr>
            </thead>
            <tbody>
              {d.historico.map((l) => (
                <tr key={l.ano}>
                  <td>{l.ano}</td>
                  <td>{l.faturacao}</td>
                  <td>{l.ebitda}</td>
                  <td>{l.despesas}</td>
                  <td>{l.normalizacoes}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {d.qualidade.tem_serie ? (
            <table className="report-table report-table-compact">
              <tbody>
                <tr>
                  <td>{dict.p3.cagrFaturacao}</td>
                  <td>{d.qualidade.cagr_faturacao ?? "—"}</td>
                </tr>
                <tr>
                  <td>{dict.p3.cagrEbitda}</td>
                  <td>{d.qualidade.cagr_ebitda ?? "—"}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p className="report-small">{dict.p3.semInfoSuficiente}</p>
          )}
        </div>
        <div>
          <H>{dict.p3.normalizacaoEbitda}</H>
          <table className="report-table report-table-compact">
            <thead>
              <tr>
                <th>{dict.p3.linha}</th>
                <th>{dict.p3.valor}</th>
              </tr>
            </thead>
            <tbody>
              {d.linhas_ebitda.map((l, i) => (
                <tr key={i} className={l.tipo === "total" ? "report-row-total" : undefined}>
                  <td>{l.label}</td>
                  <td>{l.formatado}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="report-small report-normalizacao-nota">{dict.p3.notaNormalizacao}</p>
          <H>{dict.p3.outrosIndicadores}</H>
          <table className="report-table report-table-compact">
            <thead>
              <tr>
                <th>{dict.p3.indicador}</th>
                <th>{dict.p3.valor}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{dict.p3.caixaDepositos}</td>
                <td>{d.caixa_formatado}</td>
              </tr>
              <tr>
                <td>{dict.p3.dividaTotal}</td>
                <td>{d.divida_financeira_formatado}</td>
              </tr>
              <tr>
                <td>{dict.p3.capexAnual}</td>
                <td>{d.capex_formatado}</td>
              </tr>
              <tr>
                <td>{dict.p3.unidadesLocalizacoes}</td>
                <td>{d.unidades || t(lang).common.naoIndicado}</td>
              </tr>
              <tr>
                <td>{dict.p3.concentracaoMaiorCliente}</td>
                <td>{d.concentracao_top1 || t(lang).common.naoIndicado}</td>
              </tr>
              <tr>
                <td>{dict.p3.concentracaoTop5}</td>
                <td>{d.concentracao_top5 || t(lang).common.naoIndicado}</td>
              </tr>
              <tr>
                <td>{dict.p3.clientesAtivos}</td>
                <td>{d.num_clientes_ativos || t(lang).common.naoIndicado}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  );
}
