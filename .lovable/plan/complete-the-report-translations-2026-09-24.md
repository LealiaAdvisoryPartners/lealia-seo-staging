# Complete the report translations

## Goal
Ensure every user-visible value on report slides 1, 2, 6, 7, 8, 9, 11, and 13 follows the report language (PT, EN, or ES), without changing calculations or layout.

## Changes
- Translate canonical form values used for industry, subindustry, locations/units, transaction context, and transaction structure before report rendering.
- Translate the cover title and reuse the translated industry/subindustry values on both the cover and company profile.
- Translate qualitative adjustment effects and scenario names while preserving the Portuguese canonical values used by calculations.
- Correct Equity Bridge label selection so cash is shown as “Cash” / “Caja,” not property, and localize transaction detail values.
- Localize risk levels and every dynamic “available evidence” value.
- Move slide 11’s assumption labels, matrix titles/axes, notes, and generated DCF descriptions into the shared report dictionaries.
- Replace the Portuguese-only transaction timeline with language-specific slide 13 phases, durations, and steps.
- Keep Portuguese output unchanged and use the shared report source so browser reports and emailed reports remain aligned.

## Validation
- Type-check the project and confirm the preview build remains clean.
- Generate or load reports in EN and ES and inspect all affected slides, including mobile report viewing.
- Redeploy the report-related functions so newly generated and emailed reports use the same translations.
