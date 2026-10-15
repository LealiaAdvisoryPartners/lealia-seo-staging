# SEO e GEO on-site: páginas de conteúdo (staging)

Sem publicar, sem domínios, sem tocar em pagamentos, e-mails, cron, valuation, relatórios ou analytics. O design atual mantém-se.

## Dimensão real do pedido
75 páginas novas (25 por idioma), cada uma com texto aprofundado e adaptado ao mercado: cerca de 250 a 350 mil caracteres de conteúdo editorial. Não cabe numa única ronda com qualidade. Por isso o trabalho segue em 5 blocos sem paragens para aprovação. Os testes completos correm só no fim, como foi pedido.

## Blocos
1. **Fundação técnica.** Registo de páginas com mapa explícito de hreflang (sem correspondências por slug), modelos reutilizáveis (Serviço, Setor, Geografia, Artigo, Partner, Hub de Insights, futuros Casos de Estudo fora do sitemap), breadcrumbs, linha de autor e revisor, datas, índice, FAQ por página, CTAs contextuais, menu com submenus acessíveis (Serviços e Setores) em desktop, telemóvel e teclado, schema (Service, Article, Person, FAQPage, BreadcrumbList) com referência aos @id, e geração automática de sitemap e pré-geração a partir do registo.
2. **7 serviços × 3 idiomas.** Venda, compra, preparação para venda, avaliação, corporate finance, modelação financeira e melhoria de desempenho.
3. **Setores (hub + 4) e geografia (Portugal / Espanha / Ibéria) × 3 idiomas.**
4. **Insights (hub + 8 artigos) × 3 idiomas.**
5. **Partners (2 × 3 idiomas), ligações internas, llms.txt, controlo editorial, bateria de 25 testes e relatório final** (com checklist externa e eventos GA4 recomendados).

## Decisões conservadoras
- "30+ transações" só aparece porque já está aprovado no site (secção About, EN). Fica igual, sem ser espalhado pelas páginas novas.
- Partners: uso apenas o que já está no site (cargo, foto, LinkedIn, e-mail, texto atual). As secções sem informação (formação, idiomas, anos de experiência) ficam omitidas e marcadas internamente.
- Setores: sem estatísticas. Texto qualitativo, sem afirmar mandatos.
- Corporate finance: só os serviços que o site já descreve, sem aconselhamento regulado.
- Autor e revisor dos artigos: alterno os dois partners (um escreve, o outro revê). **Isto tem de ser validado por vocês.**
- Data de publicação e de revisão: a data da implementação.
- Exemplos numéricos nos artigos (ex. ponte de EV para equity): sempre assinalados como hipotéticos.

## Detalhes técnicos
- Novas rotas declaradas no registo de páginas, com `prerender` e mapa `alternates: {en, pt, es}`. SEOHead passa a ler o hreflang do mapa, em vez de trocar só o prefixo.
- Conteúdo em ficheiros de dados por idioma (`src/content/{services,sectors,geo,insights,team}/…`), separado das traduções da interface.
- O sitemap é gerado no build a partir do registo. Mantém-se o URL base `https://www.lealiaap.com`, sem lastmod.
- `_redirects`: as novas rotas com prefixo de idioma servem o HTML pré-gerado; os 404 reais continuam.
- Sem dependências novas.
