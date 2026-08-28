import { formatEUR, type ValuationResult } from "@/lib/valuation";

export function ResultCard({
  empresa,
  result,
  onSample,
  onAgendar,
}: {
  empresa: string;
  result: ValuationResult;
  onSample: () => void;
  onAgendar: () => void;
}) {
  if (!result.ok) {
    return (
      <div className="card-elegant mx-auto max-w-2xl border-accent p-10 text-center shadow-lg">
        <h2 className="text-3xl">Precisamos de olhar mais de perto</h2>
        <p className="body-justified mt-4 text-sm leading-relaxed text-muted-foreground">
          {(result as { ok: false; motivo: string }).motivo}
        </p>
        <button className="btn-primary mt-8 scale-105" onClick={onAgendar}>
          Agendar reunião gratuita
        </button>
      </div>
    );
  }

  const span = result.ev_max - result.ev_min || 1;
  const midPct = ((result.ev_medio - result.ev_min) / span) * 100;

  return (
    <div className="mx-auto max-w-3xl">
      <p className="flex justify-center">
        <span className="eyebrow">Resultado indicativo</span>
      </p>
      <h2 className="mt-4 section-title text-center text-3xl md:text-5xl">A avaliação indicativa da {empresa}</h2>

      {result.aviso_margem && (
        <p className="card-elegant mt-8 border-accent/60 p-5 text-sm leading-relaxed text-accent">
          {result.aviso_margem}
        </p>
      )}

      {result.nota_setor && (
        <p className="body-justified card-elegant mt-6 p-5 text-sm leading-relaxed font-light text-muted-foreground">
          {result.nota_setor}
        </p>
      )}

      <div className="card-elegant mt-10 p-8 sm:p-12">
        <p className="eyebrow">Enterprise Value</p>
        <p className="mt-4 text-3xl font-light sm:text-5xl">
          {formatEUR(result.ev_min)} <span className="text-muted-foreground">—</span> {formatEUR(result.ev_max)}
        </p>

        <div className="mt-8">
          <div className="relative h-1.5 w-full bg-secondary">
            <div className="absolute inset-y-0 left-0 right-0 bg-accent/25" />
            <div
              className="absolute -top-1 h-3.5 w-0.5 bg-accent"
              style={{ left: `${Math.min(Math.max(midPct, 0), 100)}%` }}
            />
          </div>
          <div className="mt-3 flex justify-between text-xs text-muted-foreground">
            <span>{formatEUR(result.ev_min)}</span>
            <span className="text-accent">Valor mais provável {formatEUR(result.ev_medio)}</span>
            <span>{formatEUR(result.ev_max)}</span>
          </div>
        </div>

        {(result.tem_divida || result.valor_imovel > 0) && (
          <div className="mt-10 border-t border-border pt-6">
            <p className="eyebrow">Equity Value (valor para o acionista)</p>
            <p className="mt-3 text-2xl font-light sm:text-3xl">
              {formatEUR(result.equity_min)} <span className="text-muted-foreground">—</span>{" "}
              {formatEUR(result.equity_max)}
            </p>
            {result.valor_imovel > 0 && (
              <p className="body-justified mt-3 text-sm font-light text-muted-foreground">
                Inclui {formatEUR(result.valor_imovel)} de valor imobiliário adicionado ao valor da empresa.
              </p>
            )}
          </div>
        )}
      </div>

      <div className="card-elegant mt-8 grid gap-8 p-8 sm:p-12">
        <div>
          <p className="eyebrow">Base do cálculo</p>
          <dl className="mt-4 grid gap-3 text-sm">
            <div className="flex items-baseline justify-between gap-6 border-b border-border pb-2">
              <dt className="min-w-0 text-muted-foreground">EBITDA normalizado ({result.ano_referencia})</dt>
              <dd className="shrink-0 text-right">{formatEUR(Math.round(result.ebitda_base))}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 border-b border-border pb-2">
              <dt className="min-w-0 text-muted-foreground">Múltiplo base do setor</dt>
              <dd className="shrink-0 text-right">
                {result.multiplo_base_min.toFixed(1)}x — {result.multiplo_base_max.toFixed(1)}x
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 border-b border-border pb-2">
              <dt className="min-w-0 text-muted-foreground">Múltiplo implícito ajustado </dt>
              <dd className="shrink-0 text-right">
                {result.multiplo_ajustado_min.toFixed(2)}x — {result.multiplo_ajustado_max.toFixed(2)}x
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <p className="eyebrow">Equity Bridge</p>
          <dl className="mt-4 grid gap-3 text-sm">
            <div className="flex items-baseline justify-between gap-6 border-b border-border pb-2">
              <dt className="min-w-0 text-muted-foreground">Enterprise Value (valor médio)</dt>
              <dd className="shrink-0 text-right">{formatEUR(result.ev_medio)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 border-b border-border pb-2">
              <dt className="min-w-0 text-muted-foreground">Mais: caixa, depósitos e outros equivalentes</dt>
              <dd className="shrink-0 text-right">- {formatEUR(result.caixa)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 border-b border-border pb-2">
              <dt className="min-w-0 text-muted-foreground">Menos: dívida total</dt>
              <dd className="shrink-0 text-right">+ {formatEUR(result.divida_financeira)}</dd>
            </div>
            {result.valor_imovel > 0 && (
              <div className="flex items-baseline justify-between gap-6 border-b border-border pb-2">
                <dt className="min-w-0 text-muted-foreground">Mais: imóvel no perímetro</dt>
                <dd className="shrink-0 text-right">+ {formatEUR(result.valor_imovel)}</dd>
              </div>
            )}
            <div className="flex items-baseline justify-between gap-6 pt-2">
              <dt className="min-w-0 font-medium">Equity Value estimado</dt>
              <dd className="shrink-0 text-right font-medium">{formatEUR(result.equity_medio)}</dd>
            </div>
          </dl>
        </div>
      </div>

      <p className="body-justified mt-6 text-xs leading-relaxed text-muted-foreground">
        O relatório preparado constitui uma estimativa indicativa da avaliação da empresa, gerada com base na informação
        fornecida pelo utilizador, não configurando aconselhamento financeiro, proposta contratual, recomendação de
        investimento ou avaliação formal para efeitos legais, fiscais ou contabilísticos; os valores nele apresentados
        dependem da qualidade e exatidão dos dados introduzidos e das condições de mercado vigentes à data de elaboração
        do documento.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <button className="btn-primary" onClick={onSample}>
          Ver exemplo de relatório completo
        </button>
        <button className="btn-outline" onClick={onAgendar}>
          Agendar reunião
        </button>
      </div>
    </div>
  );
}
