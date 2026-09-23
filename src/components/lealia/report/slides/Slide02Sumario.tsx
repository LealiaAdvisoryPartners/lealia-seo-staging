import type { ReportData } from "@core/report-data";
import { type ReportLang, t, formatMultipleLang } from "@core/report-i18n";
import { Page, H, Kv } from "../primitives";

export function Slide02Sumario({ d, lang }: { d: ReportData; lang: ReportLang }) {
  const dict = t(lang).doc;
  return (
    <Page numero={2} titulo={dict.p2.titulo} lang={lang}>
      <H>{dict.p2.titulo}</H>
      <p className="report-p" dangerouslySetInnerHTML={{ __html: d.resumo_textual }} />

      {d.ok ? (
        <div className="report-highlight">
          <div>
            <span>{dict.p2.evIndicativo}</span>
            <strong>
              {d.ev_min_formatado} — {d.ev_max_formatado}
            </strong>
          </div>
          <div>
            <span>{dict.p2.equityIndicativo}</span>
            <strong>
              {d.equity_min_formatado} — {d.equity_max_formatado}
            </strong>
          </div>
        </div>
      ) : (
        <div className="report-note">{d.motivo}</div>
      )}

      <div className="report-grid">
        <Kv label={dict.p2.faturacaoAno} value={d.faturacao_ano1_formatado} />
        <Kv label={dict.p2.ebitdaNormalizado} value={d.ebitda_normalizado_formatado} />
        <Kv label={dict.p2.margemNormalizada} value={d.margem_ebitda_ajustada_formatada} />
        <Kv
          label={dict.p2.multiploImplicito}
          value={
            d.multiplo_ajustado_min !== null && d.multiplo_ajustado_max !== null
              ? `${formatMultipleLang(d.multiplo_ajustado_min, lang)} — ${formatMultipleLang(d.multiplo_ajustado_max, lang)}`
              : "—"
          }
        />
        <Kv
          label={
            <span>
              {dict.p2.posicaoLiquida} <span className="report-kv-hint">{dict.p2.posicaoLiquidaHint}</span>
            </span>
          }
          value={
            <span>
              {d.posicao_liquida_valor !== null && d.posicao_liquida_valor < 0
                ? `(${d.divida_liquida_absoluta_formatado})`
                : d.divida_liquida_absoluta_formatado}
            </span>
          }
        />
        <Kv label={dict.p2.completudeInformacao} value={d.confianca ?? "—"} />
      </div>

      <H>{dict.p2.metodologia}</H>
      <ol className="report-list report-compact">
        <li>
          <strong>{dict.p2.metodo1Titulo}</strong> — {dict.p2.metodo1(d.ebitda_normalizado_formatado)}
        </li>
        <li>
          <strong>{dict.p2.metodo2Titulo}</strong> — {dict.p2.metodo2}
        </li>
        <li>
          <strong>{dict.p2.metodo3Titulo}</strong> — {dict.p2.metodo3}
        </li>
        <li>
          <strong>{dict.p2.metodo4Titulo}</strong> — {dict.p2.metodo4}
        </li>
      </ol>
    </Page>
  );
}
