# Valuation core — single source of truth

Everything in this folder is shared by **both** runtimes:

- the Supabase edge functions (Deno) — via relative `./file.ts` imports;
- the React website (Vite) — via the `@core/*` alias declared in
  `vite.config.ts` and `tsconfig.app.json`.

It used to be copy-pasted into `src/lib/`, and the two copies drifted.
Do not copy it again: edit here and both sides update.

## Rules

- **Deno-compatible only.** Explicit `.ts` extensions on every relative import.
  No `@/` aliases, no JSX, no Node built-ins.
- **Browser-safe.** No `Deno.env`, no `npm:` imports, no secrets.
  The two exceptions below are edge-function-only and are never imported by the
  website: `report-pdf.ts` (`Deno.env`) and `valuation-email.ts` (`npm:`).

## Map

| File | Role |
| --- | --- |
| `valuation.ts` | Multiples-based valuation engine (`calcularValuation`). |
| `dcf.ts` | Discounted cash-flow engine + WACC build-up. |
| `report-data.ts` | Turns a lead row into the frozen `ReportData` document model. |
| `report-i18n/` | PT/EN/ES dictionaries + locale-aware formatters. |
| `timeline.ts` | Process timeline shown in the report and on the site. |
| `report-slug.ts` | Readable public report slugs (`empresa-abcd`). |
| `report-schedule.ts` | When the report email is dispatched. |
| `cors.ts` | Shared CORS headers + `json()` helper (edge only). |
