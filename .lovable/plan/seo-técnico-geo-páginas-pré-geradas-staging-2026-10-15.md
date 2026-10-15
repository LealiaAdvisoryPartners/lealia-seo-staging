# SEO técnico + GEO: páginas pré-geradas (staging)

Sem mudar design, textos, formulários, valuation, pagamentos, e-mails, cron ou analytics. Sem publicar.

## O que muda para o utilizador
Nada visível. Os motores de busca e assistentes de IA passam a receber, em cada um dos 24 endereços, a página completa (texto, título, descrição, links, dados estruturados) sem precisar de executar JavaScript.

## Abordagem
1. **Pré-geração no build** (sem novo framework): um segundo build de servidor com Vite + `react-dom/server`, e um script que renderiza as 24 rotas para `dist/<lang>/<page>/index.html`, com o `<head>` recolhido do Helmet. O browser "hidrata" esse HTML (`hydrateRoot`) em vez de o reconstruir.
2. **Segurança no build**: proteger os acessos a `window`/`document`/`localStorage` (LanguageContext, Navigation, ScrollToTop, analytics, Team, Services); BrowserRouter passa para `main.tsx`, StaticRouter no servidor.
3. **Metadados (SEOHead)**: hreflang `en`, `pt-PT`, `es-ES`, `x-default`; `<html lang>` igual; canonical/og:url absolutos em `https://www.lealiaap.com`; noindex no HTML inicial de `/upgrade` e relatórios.
4. **Schema**: `@id` estáveis (`#organization`, `#website`, `#webpage`), Organization+WebSite na homepage, LinkedIn corporativo adicionado, sem duplicar entidades entre `index.html` e as páginas.
5. **Homepage**: garantir exatamente um H1 reutilizando o título já visível (troca de tag, mesmo estilo).
6. **Seletor de idioma**: opções passam a `<a href>` para a página equivalente, mesmo aspeto.
7. **Sitemap**: 24 URLs com hreflang `pt-PT`/`es-ES`/`x-default`, sem lastmod inventado. robots.txt mantém-se (já declara o sitemap).
8. **Performance**: `React.lazy` para valuation, relatório e upgrade (bundles de PDF isolados); imagens abaixo da dobra com `loading="lazy"` e dimensões.
9. **Netlify**: o build passa a `vite build && build:ssr && prerender`; regras de reescrita servem os HTML pré-gerados.

## Ponto que exige decisão — 404 reais
O site trata **qualquer endereço de um só segmento** (ex. `lealiaap.com/empresa-abcd`) como link curto de relatório. Por isso `/qualquer-coisa` não pode devolver 404 sem partir os links curtos já enviados por e-mail. Proposta:
- `/en/*`, `/pt/*`, `/es/*` inexistentes → **404 real** (mantendo `/<lang>/relatorio/*`).
- Endereços de um segmento continuam a abrir a página de relatório (que já mostra "não encontrado" com noindex).

## Validação
Build completo, lista dos HTML gerados, inspeção do HTML estático (title, description, canonical, hreflang, H1, texto, links, OG, JSON-LD), Playwright nas 24 rotas com e sem JavaScript, consola sem erros de hidratação, seletor de idioma, refresh, mobile, 404. Tabela final + ficheiros alterados, dependências, riscos e rollback.

## Riscos
- Animações (framer-motion) podem gerar avisos de hidratação; corrigidos caso a caso, sem mudar o efeito.
- O teste de 404/reescritas Netlify só é 100% confirmável num deploy de pré-visualização Netlify; aqui testo com o build local.
- Rollback: repor `build` em package.json, `main.tsx` com `createRoot` e `_redirects` anterior.
