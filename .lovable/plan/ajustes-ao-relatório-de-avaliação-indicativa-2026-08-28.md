# Ajustes ao relatório de avaliação indicativa

Três alterações independentes, todas ao nível de apresentação do relatório. Os valores de avaliação calculados (múltiplos, EV, equity) mantêm-se exatamente iguais aos de hoje.

## 1. Rodapé de todos os slides

O rodapé de cada página passa a ler:

```text
Lealia Advisory Partners · Relatório de avaliação indicativa para {empresa}
```

`{empresa}` é o nome da empresa em análise, já disponível nos dados do relatório. Aplica-se a todas as páginas que usam o rodapé partilhado (a capa mantém-se como está).

## 2. Slide "Ajustes ao múltiplo" — efeito da faturação

Passa a existir uma linha dedicada à faturação, com leitura e efeito definidos manualmente pela faturação do ano de referência:

- abaixo de 5M€ → Negativo
- entre 5M€ (inclusive 5M€) e INFERIOR A 20M€ → Neutro
- igual ou superior a 20M€ → Positivo

Nenhum coeficiente automático de inflação/deflação influencia esta coluna.

## 3. Slide "Ajustes ao múltiplo" — efeito do EBITDA

A linha "Dimensão (EBITDA)", que hoje mostra sempre "Positivo" (multiplicador fixo em 1.0), passa a seguir o EBITDA normalizado:

- inferior a 2M€ → Negativo
- igual ou superior a 2M€ → Positivo

## Detalhe técnico

- `src/components/lealia/ReportDocument.tsx`: rodapé recebe o nome da empresa; a tabela de ajustes passa a mostrar um campo de efeito explícito quando o ajuste o define.
- Novo campo opcional `efeito: "Positivo" | "Neutro" | "Negativo"` no tipo `Ajuste` (`src/lib/valuation.ts` e a cópia em `supabase/functions/_shared/valuation/valuation.ts`, mantidas em espelho). Quando presente, o relatório usa-o em vez de derivar o efeito do multiplicador.
- Linhas na lista de `ajustes`: nova entrada "Dimensão (faturação)" com `multiplicador: 1.0` e o `efeito` das regras acima; entrada "Dimensão (EBITDA)" mantém `multiplicador: 1.0` e ganha `efeito` conforme o limiar de 2M€. Como ambos os multiplicadores continuam a 1.0, o cálculo do múltiplo final não muda.
- Sem alterações ao motor de cálculo, à base de dados ou aos e-mails.