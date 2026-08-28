import logo from "@/assets/lealia-logo.png";
import cover from "@/assets/report-cover.png";
import { FASES } from "@/lib/timeline";
import type { ReportData } from "@/lib/report-data";

const DISCLAIMER =
  "O presente relatório constitui uma estimativa indicativa da avaliação da empresa, gerada com base na informação fornecida pelo utilizador, não configurando aconselhamento financeiro, proposta contratual, recomendação de investimento ou avaliação formal para efeitos legais, fiscais ou contabilísticos; os valores apresentados dependem da qualidade e exatidão dos dados introduzidos e das condições de mercado vigentes à data de elaboração deste documento.";

function Page({
  numero,
  titulo,
  id,
  children,
}: {
  numero: number;
  titulo?: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="report-page" id={id}>
      <header className="report-head">
        <img src={logo} alt="Lealia Advisory Partners" className="h-6 w-auto" />
        {titulo ? <span className="report-head-title">{titulo}</span> : null}
      </header>
      <div className="report-body">{children}</div>
      <footer className="report-foot">
        <span>Lealia Advisory Partners · Relatório de avaliação indicativa para {d.empresa} </span>
        <span>{numero}</span>
      </footer>
    </section>
  );
}

function efeitoQualitativo(multiplicador: number, semDados?: boolean) {
  if (semDados) return "Neutro";
  if (multiplicador > 0.995) return "Positivo";
  if (multiplicador < 0.995) return "Negativo";
  return "Neutro";
}

const H = ({ children }: { children: React.ReactNode }) => <h2 className="report-h2">{children}</h2>;

const Kv = ({ label, value }: { label: React.ReactNode; value: React.ReactNode }) => (
  <div className="report-kv">
    <span>{label}</span>
    <span className="report-kv-value">{value}</span>
  </div>
);

function WaterfallChart({ items }: { items: ReportData["ponte"] }) {
  if (!items.length) return null;

  const chartItems = items.map((item, index) => {
    const isTotal = item.tipo === "base" || item.tipo === "total";
    const previous =
      index === 0
        ? 0
        : items.slice(0, index).reduce((sum, current) => sum + (current.tipo === "total" ? 0 : current.valor), 0);
    const next = isTotal ? item.valor : previous + item.valor;
    return { ...item, previous, next, isTotal };
  });
  const points = chartItems.flatMap((item) => [item.isTotal ? 0 : item.previous, item.next]);
  const domainMin = Math.min(0, ...points);
  const domainMax = Math.max(1, ...points);
  const range = domainMax - domainMin || 1;
  const plotTop = 22;
  const plotHeight = 176;
  const y = (value: number) => plotTop + ((domainMax - value) / range) * plotHeight;
  const barWidth = 76;
  const gap = 34;
  const startX = 26;
  const width = startX * 2 + chartItems.length * barWidth + Math.max(0, chartItems.length - 1) * gap;
  const label = (value: number) =>
    new Intl.NumberFormat("pt-PT", { maximumFractionDigits: 0, useGrouping: true })
      .format(Math.round(value / 1000))
      .replace(/[\s\u202f\u2009\u00a0]/g, "\u00a0");

  return (
    <figure className="report-waterfall">
      <figcaption>Equity Bridge · milhares de €</figcaption>
      <svg viewBox={`0 0 ${width} 240`} role="img" aria-label="Gráfico waterfall da Equity Bridge">
        <line className="report-waterfall-axis" x1="10" x2={width - 10} y1={y(0)} y2={y(0)} />
        {chartItems.map((item, index) => {
          const x = startX + index * (barWidth + gap);
          const topValue = item.isTotal ? Math.max(0, item.valor) : Math.max(item.previous, item.next);
          const bottomValue = item.isTotal ? Math.min(0, item.valor) : Math.min(item.previous, item.next);
          const top = y(topValue);
          const height = Math.max(2, y(bottomValue) - top);
          const shortLabel =
            item.tipo === "base"
              ? "Enterprise Value"
              : item.tipo === "total"
                ? "Equity Value"
                : item.valor < 0
                  ? "Dívida"
                  : item.label.includes("caixa")
                    ? "Caixa"
                    : "Imóvel";
          const className =
            item.tipo === "total"
              ? "report-waterfall-total"
              : item.valor < 0
                ? "report-waterfall-negative"
                : item.tipo === "base"
                  ? "report-waterfall-base"
                  : "report-waterfall-positive";
          const connectorY = y(item.next);

          return (
            <g key={`${item.label}-${index}`}>
              {index < chartItems.length - 1 && item.tipo !== "total" ? (
                <line
                  className="report-waterfall-connector"
                  x1={x + barWidth}
                  x2={x + barWidth + gap}
                  y1={connectorY}
                  y2={connectorY}
                />
              ) : null}
              <rect className={className} x={x} y={top} width={barWidth} height={height} />
              <text
                className="report-waterfall-value"
                x={x + barWidth / 2}
                y={Math.max(11, top - 5)}
                textAnchor="middle"
              >
                {item.tipo === "ajuste" && item.valor > 0 ? "+" : ""}
                {label(item.valor)}
              </text>
              <text className="report-waterfall-label" x={x + barWidth / 2} y="216" textAnchor="middle">
                {shortLabel}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

export type ReportModo = "completo" | "teaser";

const LOCKED_PAGES: { numero: number; titulo: string }[] = [
  { numero: 4, titulo: "Qualidade dos resultados" },
  { numero: 5, titulo: "Método e alternativas" },
  { numero: 6, titulo: "Ajustes ao múltiplo" },
  { numero: 7, titulo: "Cenários e sensibilidade" },
  { numero: 8, titulo: "Equity Bridge e contexto da transação" },
  { numero: 9, titulo: "Drivers de Valor & Riscos" },
  { numero: 10, titulo: "Preparação para o mercado" },
  { numero: 11, titulo: "Processo de M&A" },
];

const irParaAgendamento = () => {
  if (typeof document === "undefined") return;
  document.getElementById("agendar")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

function LockedSkeleton() {
  return (
    <div className="report-locked-skeleton" aria-hidden="true">
      <div className="report-locked-block report-locked-title" />
      <div className="report-locked-two">
        <div>
          {[92, 78, 86, 64, 88, 72].map((w, i) => (
            <div key={i} className="report-locked-block" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div>
          {[70, 90, 60, 84, 76, 68].map((w, i) => (
            <div key={i} className="report-locked-block" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
      <div className="report-locked-block report-locked-chart" />
    </div>
  );
}

function LockedPage({ numero, titulo }: { numero: number; titulo: string }) {
  return (
    <Page numero={numero} titulo={titulo}>
      <div className="report-locked">
        <LockedSkeleton />
        <div className="report-locked-overlay">
          <span className="report-locked-eyebrow">Conteúdo reservado</span>
          <h2 className="report-locked-h">{titulo}</h2>
          <p className="report-locked-p">
            Esta secção faz parte do relatório completo. Agende uma reunião de 20 minutos com a equipa da Lealia para
            visualizar a análise integral e a discussão dos resultados.
          </p>
          <button type="button" className="report-locked-cta" onClick={irParaAgendamento}>
            Agendar reunião para ver o relatório completo
          </button>
        </div>
      </div>
    </Page>
  );
}

export function ReportDocument({ d, modo = "completo" }: { d: ReportData; modo?: ReportModo }) {
  return (
    <article className="report-doc">
      {/* 1 — Capa */}
      <section className="report-page report-cover">
        <img src={cover} alt="" className="report-cover-image" />
        <div className="report-cover-side">
          <img src={logo} alt="Lealia Advisory Partners" className="report-cover-logo" />
          <div className="mt-auto">
            <h1 className="report-title">Preliminary Valuation</h1>
            <p className="report-title-company">{d.empresa}</p>
            <p className="report-sub">
              {d.industria}
              {d.subindustria ? ` · ${d.subindustria}` : ""} · {d.pais}
            </p>
          </div>
          <div className="report-cover-meta">
            <div>
              <span>Preparado para</span>
              <strong>
                {d.nome}
                {d.cargo ? ` · ${d.cargo}` : ""}
              </strong>
            </div>
            <div>
              <span>Data</span>
              <strong>{d.data_relatorio}</strong>
            </div>
          </div>
          <p className="report-cover-disclaimer">{DISCLAIMER}</p>
        </div>
      </section>

      {/* 2 — Sumário executivo */}
      <Page numero={2} titulo="Sumário executivo">
        <H>Sumário executivo</H>
        <p className="report-p" dangerouslySetInnerHTML={{ __html: d.resumo_textual }} />

        {d.ok ? (
          <div className="report-highlight">
            <div>
              <span>Enterprise Value indicativo</span>
              <strong>
                {d.ev_min_formatado} — {d.ev_max_formatado}
              </strong>
            </div>
            <div>
              <span>Equity Value Indicativo</span>
              <strong>
                {d.equity_min_formatado} — {d.equity_max_formatado}
              </strong>
            </div>
          </div>
        ) : (
          <div className="report-note">{d.motivo}</div>
        )}

        <div className="report-grid">
          <Kv label="Faturação do ano de referência" value={d.faturacao_ano1_formatado} />
          <Kv label="EBITDA normalizado" value={d.ebitda_normalizado_formatado} />
          <Kv label="Margem EBITDA normalizada" value={d.margem_ebitda_ajustada_formatada} />
          <Kv
            label="Múltiplo implícito"
            value={
              d.multiplo_ajustado_min !== null && d.multiplo_ajustado_max !== null
                ? `${d.multiplo_ajustado_min.toFixed(2)}x — ${d.multiplo_ajustado_max.toFixed(2)}x`
                : "—"
            }
          />
          <Kv
            label={
              <span>
                Posição Líquida <span className="report-kv-hint">caixa / (dívida)</span>
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
          <Kv label="Completude da informação" value={d.confianca ?? "—"} />
        </div>

        <H>Metodologia de avaliação</H>
        <ol className="report-list report-compact">
          <li>
            <strong>Determinação do EBITDA normalizado</strong> — EBITDA reportado último exercício de referência,
            excluindo o impacto de despesas extraordinárias não recorrentes e, se aplicável, considerando o impacto de
            uma correção teórica sobre a renda do imóvel ao mercado. O EBITDA normalizado é de{" "}
            <strong>{d.ebitda_normalizado_formatado}</strong>.
          </li>
          <li>
            <strong>Múltiplo setorial de base</strong> — definido com referência aos múltiplos praticados em transações
            recentes e comparáveis no setor e na região.
          </li>
          <li>
            <strong>Ajustes de perfil e risco</strong> — dimensão, maturidade, crescimento, recorrência de receita,
            concentração de clientes, geografia, dependência do acionista e intensidade de investimento, com um limite
            global aplicado ao conjunto dos ajustes.
          </li>
          <li>
            <strong>Equity Bridge</strong> — ao Enterprise Value deduz-se a dívida total, soma-se a caixa disponível
            {d.imovel_no_perimetro ? " e soma-se o imóvel incluído no perímetro" : ""}, obtendo-se o Equity Value antes
            de ajustamentos de closing.
          </li>
        </ol>
      </Page>

      {/* 3 — Perfil, histórico e posição financeira */}
      <Page numero={3} titulo="Perfil da empresa e outros indicadores">
        <div className="report-two">
          <div>
            <H>Perfil da empresa</H>
            <table className="report-table report-table-compact">
              <thead>
                <tr>
                  <th>Indicador</th>
                  <th>Valor</th>
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

            <H>Histórico financeiro</H>
            <table className="report-table report-table-compact">
              <thead>
                <tr>
                  <th>Ano</th>
                  <th>Faturação</th>
                  <th>EBITDA</th>
                  <th>Margem</th>
                  <th>Extraordinários</th>
                </tr>
              </thead>
              <tbody>
                {d.historico.map((l) => (
                  <tr key={l.ano}>
                    <td>{l.ano}</td>
                    <td>{l.faturacao}</td>
                    <td>{l.ebitda}</td>
                    <td>{l.margem}</td>
                    <td>{l.despesas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="report-small">{d.nota_historico}</p>
          </div>
          <div>
            <H>Normalização do EBITDA</H>
            <table className="report-table report-table-compact">
              <thead>
                <tr>
                  <th>Linha</th>
                  <th>Valor</th>
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
            <p className="report-small report-normalizacao-nota">
              Os ajustamentos de normalização aproximam o resultado operacional recorrente num cenário pós-transação.
            </p>
            <H>Outros Indicadores</H>
            <table className="report-table report-table-compact">
              <thead>
                <tr>
                  <th>Indicador</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Caixa disponível</td>
                  <td>{d.caixa_formatado}</td>
                </tr>
                <tr>
                  <td>Dívida total</td>
                  <td>{d.divida_financeira_formatado}</td>
                </tr>
                <tr>
                  <td>CAPEX anual recorrente</td>
                  <td>{d.capex_formatado}</td>
                </tr>
                <tr>
                  <td>Unidades / localizações</td>
                  <td>{d.unidades || "Não indicado"}</td>
                </tr>
                <tr>
                  <td>% Concentração no maior cliente</td>
                  <td>{d.concentracao_top1 || "Não indicado"}</td>
                </tr>
                <tr>
                  <td>% Concentração no top 5 clientes</td>
                  <td>{d.concentracao_top5 || "Não indicado"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Page>

      {modo === "completo" ? (
        <>
          {/* 4 — Qualidade dos resultados */}
          <Page numero={4} titulo="Qualidade dos resultados">
            <H>Qualidade dos resultados</H>
            {d.qualidade.apenas_um_ano ? <div className="report-note">{d.qualidade.nota_um_ano}</div> : null}
            <div className="report-two">
              <div>
                {d.qualidade.tem_serie ? (
                  <>
                    <div className="report-grid report-grid-1 report-compact">
                      <Kv label="CAGR da faturação" value={d.qualidade.cagr_faturacao ?? "—"} />
                      <Kv label="CAGR do EBITDA" value={d.qualidade.cagr_ebitda ?? "—"} />
                      <Kv label="Margem EBITDA normalizada" value={d.margem_ebitda_ajustada_formatada} />
                    </div>
                    <table className="report-table report-table-compact">
                      <thead>
                        <tr>
                          <th>Ano</th>
                          <th>Faturação</th>
                          <th>EBITDA</th>
                        </tr>
                      </thead>
                      <tbody>
                        {d.grafico_evolucao.map((g) => (
                          <tr key={g.ano}>
                            <td>{g.ano}</td>
                            <td>{g.faturacao_formatada}</td>
                            <td>{g.ebitda_formatado}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {d.qualidade.margens.length ? (
                      <div className="report-conf">
                        {d.qualidade.margens.map((m) => (
                          <div key={m.ano} className="report-conf-row">
                            <div className="report-conf-head">
                              <span>Margem EBITDA {m.ano}</span>
                              <strong>{m.margem}</strong>
                            </div>
                            <div className="report-conf-track">
                              <div
                                className="report-conf-fill"
                                style={{ width: `${Math.max(0, Math.min(100, m.valor * 2))}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    {d.qualidade.comentario_margens ? (
                      <p className="report-small">{d.qualidade.comentario_margens}</p>
                    ) : null}
                  </>
                ) : (
                  <p className="report-p">
                    Não existem períodos financeiros suficientes para analisar crescimento, evolução de margens ou
                    estabilidade dos resultados. Esta é a principal lacuna de informação a resolver antes de ir a
                    mercado.
                  </p>
                )}
              </div>
              <div>
                <H>Leitura complementar</H>
                <ul className="report-list report-list-disc report-compact">
                  <li>{d.qualidade.conversao_caixa}</li>
                  <li>{d.qualidade.fundo_maneio}</li>
                  <li>{d.qualidade.ajustamentos}</li>
                  {d.qualidade.concentracao ? <li>{d.qualidade.concentracao}</li> : null}
                  {d.qualidade.backlog ? <li>{d.qualidade.backlog}</li> : null}
                  <li>
                    A sazonalidade e o CAPEX de manutenção face ao CAPEX de crescimento não foram desagregados nesta
                    fase e devem ser preparados antes de um processo formal.
                  </li>
                </ul>
                <div className="report-note">
                  A qualidade dos resultados é o principal determinante do desconto ou prémio aplicado em due diligence.
                  Cada ajustamento ao EBITDA deve ter suporte documental.
                </div>
              </div>
            </div>
          </Page>

          {/* 5 — Método e alternativas */}
          <Page numero={5} titulo="Método e alternativas">
            <H>Porquê múltiplos de EBITDA</H>
            <div className="report-two">
              <div>
                <p className="report-p">
                  A avaliação por múltiplos é uma abordagem de mercado: o valor de uma empresa é inferido a partir dos
                  preços pagos por investidores em transações recentes por empresas com perfil comparável. No contexto
                  de M&A de PME, o EBITDA é habitualmente utilizado como referência, por refletir a capacidade de
                  geração de resultados operacionais antes do impacto da estrutura de financiamento, política de
                  amortizações e do regime fiscal.
                </p>
                <p className="report-p">
                  É também o método mais adequado a uma estimativa preliminar: exige poucos pressupostos
                  discricionários, é transparente e reflete diretamente o apetite atual do mercado pelo setor. A sua
                  limitação é a dependência da qualidade dos comparáveis e o facto de captar a fotografia atual do
                  negócio, e não um plano de crescimento futuro.
                </p>
                <p className="report-p">
                  O EV/EBITDA tende a ser mais adequado para empresas com EBITDA positivo, operações relativamente
                  estáveis e estruturas de custos comparáveis às das empresas utilizadas como referência. É menos
                  informativo quando a empresa apresenta resultados operacionais negativos ou muito voláteis, quando
                  existem diferenças significativas de crescimento ou margem face aos comparáveis, ou quando o negócio
                  se encontra numa fase de forte transformação.
                </p>
                <p className="report-p">
                  A avaliação por múltiplos é, assim, uma referência simples, transparente e alinhada com o mercado,
                  especialmente útil quando existem comparáveis sólidos e para suportar uma primeira estimativa de
                  valor. A sua principal limitação é depender da qualidade desses comparáveis e não refletir, por si só,
                  o potencial futuro do negócio.
                </p>
                <div className="report-note">
                  Numa transação real, os múltiplos são o ponto de partida da negociação e são depois confrontados com
                  uma análise de fluxos de caixa e com a due diligence.
                </div>
              </div>
              <div>
                <H>Métodos alternativos</H>
                <div className="report-cards">
                  <div className="report-card">
                    <strong>DCF — fluxos de caixa descontados</strong>
                    <p>
                      Projeta os fluxos de caixa futuros e desconta-os a uma taxa que reflete o custo do capital (WACC).
                      É o método mais rigoroso quando existe um plano de negócios credível, mas é muito sensível aos
                      pressupostos.
                    </p>
                  </div>
                  <div className="report-card">
                    <strong>Transações comparáveis</strong>
                    <p>
                      Analisa múltiplos efetivamente pagos em operações recentes no setor, incluindo prémios de
                      controlo. Depende da comparabilidade das operações divulgadas.
                    </p>
                  </div>
                  <div className="report-card">
                    <strong>Comparáveis cotadas</strong>
                    <p>
                      Usa múltiplos de empresas cotadas do setor, ajustados por dimensão e liquidez. Útil como
                      referência de tendência de mercado.
                    </p>
                  </div>
                  <div className="report-card">
                    <strong>Valor patrimonial / liquidação</strong>
                    <p>
                      Avalia os ativos líquidos ao seu valor de mercado. Relevante em negócios intensivos em ativos,
                      funcionando como valor mínimo de referência.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Page>

          {/* 6 — Ajustes ao múltiplo */}
          <Page numero={6} titulo="Ajustes ao múltiplo">
            <H>Ajustes aplicados ao múltiplo setorial</H>
            {d.ajustes.length ? (
              <table className="report-table report-table-text">
                <thead>
                  <tr>
                    <th>Fator</th>
                    <th>Leitura</th>
                    <th>Efeito</th>
                  </tr>
                </thead>
                <tbody>
                  {d.ajustes.map((a, i) => (
                    <tr key={`${a.label}-${i}`}>
                      <td>{a.label}</td>
                      <td>{a.detalhe}</td>
                      <td>{efeitoQualitativo(a.multiplicador, a.semDados)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="report-p">Não foram aplicados ajustes ao múltiplo setorial de base.</p>
            )}
            <p className="report-small">
              O conjunto dos ajustes está limitado a um intervalo global de −40% a +35% sobre o múltiplo setorial de
              base, evitando que a combinação de fatores produza resultados extremos. Todos os fatores assentam em
              informação declarada e carecem de validação documental.
            </p>
          </Page>

          {/* 7 — Cenários e sensibilidade */}
          <Page numero={7} titulo="Cenários e sensibilidade">
            <H>Cenários de valorização</H>
            {d.cenarios.length ? (
              <table className="report-table report-table-text">
                <thead>
                  <tr>
                    <th>Cenário</th>
                    <th>Pressupostos</th>
                    <th>Múltiplo</th>
                    <th>Enterprise Value</th>
                    <th>Equity Value</th>
                  </tr>
                </thead>
                <tbody>
                  {d.cenarios.map((c) => (
                    <tr key={c.nome} className={c.nome === "Base" ? "report-row-total" : undefined}>
                      <td>{c.nome}</td>
                      <td>{c.pressuposto}</td>
                      <td>{c.multiplo}</td>
                      <td>{c.ev}</td>
                      <td>{c.equity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="report-p">Sem cenários disponíveis para os dados fornecidos.</p>
            )}

            <H>Sensibilidade do Enterprise Value</H>
            {d.sensibilidade ? (
              <>
                <table className="report-table report-table-compact">
                  <thead>
                    <tr>
                      <th>Variação do EBITDA</th>
                      <th>EBITDA</th>
                      {d.sensibilidade.colunas.map((c) => (
                        <th key={c}>{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[...d.sensibilidade.linhas].reverse().map((l) => (
                      <tr key={l.variacao} className={l.destaque ? "report-row-total" : undefined}>
                        <td>{l.variacao}</td>
                        <td>{l.ebitda}</td>
                        {l.valores.map((v, i) => (
                          <td key={i}>{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="report-small">
                  A tabela mostra como o Enterprise Value reage a variações do EBITDA normalizado e do múltiplo
                  aplicado. O Equity Value acompanha estas variações, ajustado pela dívida total, caixa disponível e
                  imóvel indicado na equity bridge.
                </p>
              </>
            ) : (
              <p className="report-p">Sem análise de sensibilidade disponível.</p>
            )}
          </Page>

          {/* 8 — Equity Bridge e contexto da transação */}
          <Page numero={8} titulo="Equity Bridge e contexto da transação">
            <div className="report-slide-eight">
              <section className="report-slide-eight-section">
                <H>Equity Bridge</H>
                <div className="report-slide-eight-bridge">
                  <div>
                    <table className="report-table report-table-compact">
                      <thead>
                        <tr>
                          <th>Componente</th>
                          <th>Valor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {d.ponte.map((l, i) => (
                          <tr key={i} className={l.tipo === "total" ? "report-row-total" : undefined}>
                            <td>{l.label}</td>
                            <td>{l.formatado}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="report-note report-slide-eight-note">{d.nota_equity}</div>
                  </div>
                  <WaterfallChart items={d.ponte} />
                </div>
              </section>

              <section className="report-slide-eight-section report-slide-eight-transaction">
                <H>Contexto e estrutura da transação</H>
                <div className="report-slide-eight-context">
                  <div>
                    <table className="report-table report-table-text report-table-compact">
                      <thead>
                        <tr>
                          <th>Parâmetro</th>
                          <th>Detalhe</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["Motivo da transação", d.motivo_interesse ?? "—"],
                          ["Percentagem de capital a transacionar", d.pct_a_transacionar ?? "—"],
                          ["Estrutura pretendida", d.estrutura_transacao ?? "—"],
                          ["Horizonte temporal", d.horizonte_temporal ?? "—"],
                          ["Permanência do acionista", d.permanencia_pos_venda ?? "—"],
                          ["Imóvel", d.imovel_no_perimetro_texto],
                          ["Tipo de investidor preferencial", d.tipo_investidor ?? "—"],
                        ].map(([k, v]) => (
                          <tr key={String(k)}>
                            <td>{k}</td>
                            <td>{v}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <table className="report-table report-table-text report-table-compact">
                      <thead>
                        <tr>
                          <th>Estrutura</th>
                          <th>Implicação</th>
                        </tr>
                      </thead>
                      <tbody>
                        {d.implicacoes_estrutura.map((e) => (
                          <tr key={e.estrutura}>
                            <td>{e.estrutura}</td>
                            <td>{e.implicacao}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="report-note report-slide-eight-note">{d.nota_minoria}</div>
                  </div>
                </div>
              </section>
            </div>
          </Page>

          {/* 9 — Drivers de Valor & Riscos */}
          <Page numero={9} titulo="Drivers de Valor & Riscos">
            <H>Drivers de Valor & Riscos</H>
            {d.drivers.length ? (
              <table className="report-table report-table-text">
                <thead>
                  <tr>
                    <th>Driver</th>
                    <th>Evidência disponível</th>
                    <th>Impacto</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {d.drivers.map((dr) => (
                    <tr key={dr.driver}>
                      <td>{dr.driver}</td>
                      <td>{dr.evidencia}</td>
                      <td>{dr.impacto}</td>
                      <td>{dr.estado}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="report-p">
                Não foram identificados drivers de valor específicos com base na informação disponibilizada.
              </p>
            )}

            <H>Riscos e mitigantes</H>
            {d.riscos.length ? (
              <table className="report-table report-table-text">
                <thead>
                  <tr>
                    <th>Risco</th>
                    <th>Evidência disponível</th>
                    <th>Impacto</th>
                    <th>Mitigante</th>
                  </tr>
                </thead>
                <tbody>
                  {d.riscos.map((rk, i) => (
                    <tr key={i}>
                      <td>
                        {rk.risco}
                        <em className="report-inline-note">{rk.nivel}</em>
                      </td>
                      <td>{rk.evidencia}</td>
                      <td>{rk.impacto}</td>
                      <td>{rk.mitigante}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="report-p">
                Não foram identificados riscos materiais específicos com base na informação disponibilizada.
              </p>
            )}
          </Page>

          {/* 10 — Plano de preparação */}
          <Page numero={10} titulo="Preparação para o mercado">
            <H>Plano de preparação priorizado</H>
            <table className="report-table report-table-text">
              <thead>
                <tr>
                  <th>Prioridade</th>
                  <th>Ação</th>
                  <th>Impacto esperado</th>
                  <th>Esforço</th>
                  <th>Prazo</th>
                </tr>
              </thead>
              <tbody>
                {d.plano.map((p, i) => (
                  <tr key={i}>
                    <td>
                      <span className={`report-badge report-badge-${p.prioridade.toLowerCase()}`}>{p.prioridade}</span>
                    </td>
                    <td>{p.acao}</td>
                    <td>{p.impacto}</td>
                    <td>{p.esforco}</td>
                    <td>{p.prazo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <H>Recomendações imediatas</H>
            <ol className="report-list report-compact">
              {d.recomendacoes.slice(0, 5).map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ol>
          </Page>

          {/* 11 — Processo de M&A */}

          <Page numero={11} titulo="Processo de M&A">
            <H>Como decorre um processo de M&amp;A</H>
            <div className="report-phases report-phases-2 report-phases-tall">
              {FASES.map((f) => (
                <div key={f.numero} className="report-phase">
                  <div className="report-phase-head">
                    <span>{f.numero}</span>
                    <strong>{f.titulo}</strong>
                    <em>{f.duracao}</em>
                  </div>
                  <ul>
                    {f.etapas.slice(0, 4).map((e, i) => (
                      <li key={i}>{e.split("—")[0]}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Page>
        </>
      ) : (
        LOCKED_PAGES.map((p) => <LockedPage key={p.numero} numero={p.numero} titulo={p.titulo} />)
      )}

      {/* 12 — Próximo passo e contactos */}
      <Page numero={12} titulo="Próximo passo e contactos" id="agendar">
        <div className="report-final">
          <div className="report-final-left">
            <h2 className="report-closing-title">Obrigado.</h2>
            <p className="report-closing-lead">
              Obrigado pelo seu tempo. Este relatório é um ponto de partida: a conversão de uma estimativa indicativa
              numa avaliação sustentada exige a validação dos números, a análise de transações comparáveis recentes e a
              leitura do apetite atual de investidores financeiros e estratégicos para o seu setor.
            </p>

            <div className="report-next-step-card report-final-card">
              <strong>Próximo passo · Reunião de 20 minutos</strong>
              <p>
                Revisão conjunta dos pressupostos deste relatório com a equipa da Lealia e apresentação do relatório
                completo.
              </p>
              <a
                href="https://calendly.com/d/d3qm-jpm-t5x/valuation-full-report"
                target="_blank"
                rel="noreferrer"
                className="report-next-step-btn"
              >
                Agendar reunião
              </a>
            </div>

            <div className="report-final-brand">
              <img src={logo} alt="Lealia Advisory Partners" className="report-contacts-logo" />
              <ul className="report-contact-list">
                <li>
                  <a href="https://lealiaap.com" target="_blank" rel="noreferrer">
                    lealiaap.com
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/lealia-ap" target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="mailto:geral@lealiaap.com">geral@lealiaap.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="report-final-right">
            <span className="report-final-eyebrow">Contactos</span>

            <div className="report-contact-card">
              <strong>Ricardo Nascimento Ferreira</strong>
              <span>Managing Partner</span>
              <ul className="report-contact-list">
                <li>
                  <a href="mailto:ricardo.ferreira@lealiaap.com">ricardo.ferreira@lealiaap.com</a>
                </li>
                <li>
                  <a href="tel:+351917179408">+351 917 179 408</a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/ricardo-a-n-ferreira" target="_blank" rel="noreferrer">
                    linkedin.com/in/ricardo-a-n-ferreira
                  </a>
                </li>
              </ul>
            </div>

            <div className="report-contact-card">
              <strong>Duarte Rocha Pereira</strong>
              <span>Managing Partner</span>
              <ul className="report-contact-list">
                <li>
                  <a href="mailto:duarte.pereira@lealiaap.com">duarte.pereira@lealiaap.com</a>
                </li>
                <li>
                  <a href="tel:+351935882323">+351 935 882 323</a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/duarte-rocha-pereira" target="_blank" rel="noreferrer">
                    linkedin.com/in/duarte-rocha-pereira
                  </a>
                </li>
              </ul>
            </div>

            <p className="report-closing-note">
              Documento de natureza indicativa, preparado exclusivamente para {d.empresa}. Não constitui aconselhamento
              financeiro nem proposta contratual.
            </p>
          </div>
        </div>
      </Page>
    </article>
  );
}
