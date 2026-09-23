# Traduzir avaliação, relatório e e-mails (PT / EN / ES)

Objetivo: a página de avaliação, o relatório e os e-mails passam a existir nas três línguas do site, e o utilizador escolhe, no último passo do formulário, em que idioma quer receber o relatório e os e-mails.

## 1. Escolha do idioma no formulário

- No último passo do formulário (dados de contacto/consentimento) entra um campo "Idioma do relatório e das comunicações" com Português, English, Español.
- Predefinido para o idioma em que a pessoa está a navegar no site.
- A escolha é gravada com o lead e passa a comandar: idioma do relatório gerado, idioma da página do relatório e idioma de todos os e-mails enviados a esse contacto (confirmação e relatório pronto).
- A notificação interna para a equipa mantém-se em português.
- Leads antigos, sem idioma gravado, continuam a ser tratados como português.

## 2. Página de avaliação

Todos os textos hoje fixos em português (herói, "Como funciona", formulário completo — títulos de passos, etiquetas, ajudas, opções das listas, mensagens de erro, cartão de agradecimento, exemplo de relatório, secção de agendamento) passam a vir dos ficheiros de tradução do site, em PT, EN e ES. A página segue o idioma da navegação, como o resto do site.

## 3. Relatório

- Todo o conteúdo do relatório (títulos de slides, etiquetas de tabelas, notas de rodapé, avisos legais, e também os textos gerados automaticamente: leitura complementar, drivers, riscos, recomendações, transparência de pressupostos) passa a ser produzido no idioma escolhido.
- Números, datas e moeda são formatados segundo o idioma (mantendo o euro e o separador de milhares atual em português).
- O relatório é gerado e congelado no idioma escolhido no momento da submissão; quem abrir o link vê-o sempre nesse idioma.

## 4. E-mails

- Confirmação de submissão e "relatório pronto" passam a ter versão PT/EN/ES, incluindo o assunto, o corpo, o botão e o rodapé legal.
- O e-mail enviado usa o idioma escolhido no formulário.
- A notificação interna à equipa mantém-se em português.

## Detalhe técnico

- Nova coluna `idioma` em `leads` (`pt` por omissão) e novo campo no `FormState`/`registarLead`.
- Novo dicionário do relatório em `src/lib/report-i18n.ts`, espelhado em `supabase/functions/_shared/valuation/report-i18n.ts` (o backend mantém cópias dos módulos de avaliação).
- `report-data` e `ReportDocument` passam a receber `lang` e a resolver todas as frases pelo dicionário, em vez de literais em português.
- `Relatorio.tsx` e a função `obter-relatorio` devolvem/usam o idioma guardado; `relatorio_dados` é construído nesse idioma.
- Templates de e-mail (`confirmacao-submissao`, `resumo-avaliacao`) recebem `lang` e têm dicionários internos; `subject` passa a depender de `data.lang`.
- Redeploy das funções `registar-lead`, `enviar-relatorios`, `obter-relatorio` e `preview-transactional-email`.

## Verificação

- Typecheck do projeto.
- Submissão de teste em cada idioma no preview, confirmando formulário, relatório aberto pelo link e conteúdo dos e-mails em PT, EN e ES.

## Nota de faseamento

É um volume grande de texto. A execução segue esta ordem, para que cada parte fique utilizável mesmo antes da seguinte: (1) idioma no formulário + e-mails, (2) página de avaliação, (3) relatório completo.
