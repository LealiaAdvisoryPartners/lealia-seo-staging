// Discounted cash-flow: mesma engine de valuation.ts, apenas repassado.
import type { Ctx } from "../types.ts";

export function buildDcf(ctx: Ctx) {
  const { r } = ctx;
  return {
    dcf: r && r.dcf.ok ? r.dcf : null,
    dcf_motivo: r && !r.dcf.ok ? (r.dcf as { ok: false; motivo: string }).motivo : null,
  };
}
