// Ponte de equity (Enterprise Value -> Equity Value) e campos monetários
// associados (dívida líquida, imóvel, posição líquida).
import { formatFactorXLang } from "../../report-i18n/index.ts";
import type { Ctx } from "../types.ts";

export function buildEquity(ctx: Ctx) {
  const { L, r, fmt, lead, NAO_INDICADO, lang } = ctx;
  const { eur } = fmt;

  const ponte = r
    ? [
        { label: L.ponte.enterpriseValueBase, valor: r.ev_medio, tipo: "base" as const },
        { label: L.ponte.maisCaixa, valor: r.caixa, tipo: "ajuste" as const },
        { label: L.ponte.menosDivida, valor: -r.divida_financeira, tipo: "ajuste" as const },
        ...(r.valor_imovel > 0
          ? [
              {
                label: L.ponte.maisImovel,
                valor: r.valor_imovel,
                tipo: "ajuste" as const,
              },
            ]
          : []),
        {
          label: L.ponte.equityValueBase,
          valor: Math.round((r.equity_min + r.equity_max) / 2),
          tipo: "total" as const,
        },
      ].map((l) => ({
        ...l,
        formatado: `${l.tipo === "ajuste" && l.valor > 0 ? "+" : ""}${eur(l.valor)}`,
      }))
    : [];

  return {
    ev_min_formatado: r ? eur(r.ev_min) : L.common.tracoLongo,
    ev_max_formatado: r ? eur(r.ev_max) : L.common.tracoLongo,
    ev_medio_formatado: r ? eur(r.ev_medio) : L.common.tracoLongo,
    equity_min_formatado: r ? eur(r.equity_min) : L.common.tracoLongo,
    equity_max_formatado: r ? eur(r.equity_max) : L.common.tracoLongo,
    divida_liquida_formatado: r
      ? eur(r.divida_liquida)
      : eur((lead.divida_financeira ?? 0) - (lead.caixa_e_depositos ?? 0)),
    valor_imovel_formatado: r && r.valor_imovel > 0 ? eur(r.valor_imovel) : null,

    ponte,
    posicao_liquida: r?.posicao_liquida ?? null,
    posicao_liquida_valor: r ? r.caixa - r.divida_financeira : null,
    divida_liquida_absoluta_formatado: r ? eur(Math.abs(r.divida_liquida)) : NAO_INDICADO,
    racio_divida_ebitda: r && r.ebitda_base > 0 ? formatFactorXLang(r.divida_liquida / r.ebitda_base, lang) : L.common.tracoLongo,
  };
}
