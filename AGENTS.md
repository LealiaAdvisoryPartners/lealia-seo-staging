# Architecture rules

- Serve sample-report PDFs as static files from public/sample-report/ so Netlify hosts them natively without proxying external CDNs.
- Public pages are prerendered at build time (vite client build, SSR build of src/entry-server.tsx, scripts/prerender.mjs) so crawlers get full HTML; code rendered by pages flagged `prerender` in src/pages/index.ts must not touch window/document/localStorage outside effects or handlers.
- The router is supplied by the mount point (BrowserRouter in main.tsx, StaticRouter in entry-server.tsx) so the same App renders on both sides.
- Report links and /upgrade are served from dist/app.html (noindex); unknown language-prefixed paths get dist/404.html with HTTP 404 via public/_redirects.
- Tracking goes only through src/lib/tracking (Consent Mode defaults then the official GTM snippet in index.html as the only gtm.js loader (gtm.ts never injects it, to avoid duplicates); events reach the dataLayer only with optional consent); vendor tags live in GTM, never in code, so consent and PII allowlists stay in one place.
- Campaign attribution fields are whitelisted in supabase/functions/_shared/valuation/attribution.ts and re-validated server-side in registar-lead, so the browser and backend share one allowlist.
