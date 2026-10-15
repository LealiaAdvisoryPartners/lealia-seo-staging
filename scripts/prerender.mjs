/**
 * Pré-geração estática: após `vite build` (cliente) e `vite build --ssr`,
 * escreve dist/<idioma>/<página>/index.html com HTML e <head> completos.
 * Gera também dist/app.html (shell noindex para relatórios/checkout) e dist/404.html.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const dist = path.resolve("dist");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

// Supabase client lê localStorage ao importar; no Node basta um stub em memória.
const mem = new Map();
globalThis.localStorage ??= {
  getItem: (k) => (mem.has(k) ? mem.get(k) : null),
  setItem: (k, v) => mem.set(k, String(v)),
  removeItem: (k) => mem.delete(k),
  clear: () => mem.clear(),
  key: () => null,
  length: 0,
};

const { render, PRERENDER_ROUTES } = await import(pathToFileURL(path.resolve("dist-ssr/entry-server.js")).href);

// Tags por página saem do template: cada rota recebe as suas (sem duplicados).
const PER_PAGE = [
  /\s*<title>[\s\S]*?<\/title>/g,
  /\s*<meta name="(description|keywords|robots)"[^>]*>/g,
  /\s*<meta (property|name)="(og|twitter):[^"]*"[^>]*>/g,
  /\s*<link rel="canonical"[^>]*>/g,
];
const base = PER_PAGE.reduce((t, re) => t.replace(re, ""), template).replace(/\s*<!-- (Open Graph|Twitter Card|Primary Meta) -->/g, "");

const fill = (url) => {
  const { html, head, htmlAttributes } = render(url);
  return base
    .replace(/<html[^>]*>/, `<html ${htmlAttributes}>`)
    .replace("</head>", `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
};

for (const url of PRERENDER_ROUTES) {
  const out = path.join(dist, url, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, fill(url));
  console.log("prerendered", url);
}

// Shell para relatórios e checkout: sem conteúdo indexável.
fs.writeFileSync(
  path.join(dist, "app.html"),
  base.replace("</head>", '    <title>Lealia Advisory Partners</title>\n    <meta name="robots" content="noindex, nofollow" />\n  </head>'),
);

// 404 real: HTML pré-gerado da página "não encontrada" (servido com status 404 pela Netlify).
// Um por idioma, para a hidratação coincidir com o idioma do endereço.
for (const l of ["en", "pt", "es"]) fs.writeFileSync(path.join(dist, l, "404.html"), fill(`/${l}/__not-found__`));
fs.copyFileSync(path.join(dist, "en", "404.html"), path.join(dist, "404.html"));
console.log("prerendered app.html, 404.html");
fs.rmSync(path.resolve("dist-ssr"), { recursive: true, force: true });
