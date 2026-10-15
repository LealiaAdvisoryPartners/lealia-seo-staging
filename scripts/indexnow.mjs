/**
 * Submissão manual ao IndexNow. NÃO corre no build.
 * Só em produção: exige INDEXNOW_ENV=production e --confirm; recusa se a Netlify
 * indicar outro contexto (deploy-preview, branch-deploy).
 *
 * Uso: INDEXNOW_ENV=production node scripts/indexnow.mjs --confirm https://www.lealiaap.com/pt/services ...
 * Sem --confirm: apenas mostra o que seria submetido (dry-run).
 *
 * Allowlist = URLs do public/sitemap.xml (relatórios, checkout, noindex e 404 nunca lá estão).
 */
import fs from "node:fs";

const HOST = "www.lealiaap.com";
const KEY = "8213365a2ea9773aa9e7a8eff2ece602";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const args = process.argv.slice(2);
const confirm = args.includes("--confirm");
const pedidos = args.filter((a) => !a.startsWith("--"));

const sitemap = fs.readFileSync("public/sitemap.xml", "utf8");
const allow = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim()));

const urls = pedidos.filter((u) => allow.has(u));
const rejeitados = pedidos.filter((u) => !allow.has(u));
if (rejeitados.length) console.warn("Ignorados (fora do sitemap):", rejeitados);
if (!urls.length) {
  console.error("Nenhum URL válido. Indique URLs novos ou materialmente atualizados do sitemap.");
  process.exit(1);
}

const payload = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls };

if (!confirm) {
  console.log("Dry-run (sem --confirm):", JSON.stringify(payload, null, 2));
  process.exit(0);
}
if (process.env.INDEXNOW_ENV !== "production" || (process.env.CONTEXT && process.env.CONTEXT !== "production")) {
  console.error("Recusado: só corre em produção (INDEXNOW_ENV=production e sem CONTEXT de preview).");
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});
console.log("IndexNow:", res.status, await res.text());
process.exit(res.ok ? 0 : 1);
