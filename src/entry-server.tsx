/** Pré-geração (scripts/prerender.mjs): renderiza uma rota para HTML + <head>. */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import type { HelmetServerState } from "react-helmet-async";
import App from "./App";
import { SITE_PAGES } from "./pages";
import { LANGUAGES } from "./lib/routing";

export const PRERENDER_ROUTES = LANGUAGES.flatMap((l) =>
  SITE_PAGES.filter((p) => p.prerender).map((p) => `/${l}${p.slug && `/${p.slug}`}`),
);

export function render(url: string) {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <StaticRouter location={url}>
      <App helmetContext={helmetContext} />
    </StaticRouter>,
  );
  const h = helmetContext.helmet!;
  return {
    html,
    htmlAttributes: h.htmlAttributes.toString(),
    head: [h.title, h.meta, h.link, h.script].map((x) => x.toString()).join("\n    "),
  };
}
