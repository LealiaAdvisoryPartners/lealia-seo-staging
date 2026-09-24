// Discounted cash-flow: mesma engine de valuation.ts, apenas repassado.
import type { Ctx } from "../types.ts";
import { traduzirDcf } from "../translate.ts";

export function buildDcf(ctx: Ctx) {
  const { r, lang } = ctx;
  return {
    dcf: r && r.dcf.ok ? traduzirDcf(r.dcf, lang) : null,
    dcf_motivo: r && !r.dcf.ok ? (r.dcf as { ok: false; motivo: string }).motivo : null,
  };
}
