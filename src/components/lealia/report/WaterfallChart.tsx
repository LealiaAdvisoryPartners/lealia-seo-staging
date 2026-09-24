import type { ReportData } from "@core/report-data";
import { t, type ReportLang, groupThousandsLang } from "@core/report-i18n";

export function WaterfallChart({ items, lang }: { items: ReportData["ponte"]; lang: ReportLang }) {
  if (!items.length) return null;
  const kEur = (v: number) => groupThousandsLang(v / 1000, lang);
  const dictWaterfall = t(lang).doc.waterfall;

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
  const label = (value: number) => kEur(value);

  return (
    <figure className="report-waterfall">
      <figcaption>{dictWaterfall.caption}</figcaption>
      <svg viewBox={`0 0 ${width} 240`} role="img" aria-label={dictWaterfall.ariaLabel}>
        <line className="report-waterfall-axis" x1="10" x2={width - 10} y1={y(0)} y2={y(0)} />
        {chartItems.map((item, index) => {
          const x = startX + index * (barWidth + gap);
          const topValue = item.isTotal ? Math.max(0, item.valor) : Math.max(item.previous, item.next);
          const bottomValue = item.isTotal ? Math.min(0, item.valor) : Math.min(item.previous, item.next);
          const top = y(topValue);
          const height = Math.max(2, y(bottomValue) - top);
          const shortLabel =
            item.tipo === "base"
              ? dictWaterfall.enterpriseValue
              : item.tipo === "total"
                ? dictWaterfall.equityValue
                : item.valor < 0
                  ? dictWaterfall.divida
                  : item.label === t(lang).ponte.maisCaixa
                    ? dictWaterfall.caixa
                    : dictWaterfall.imovel;
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
