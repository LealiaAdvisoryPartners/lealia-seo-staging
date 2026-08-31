# Plan: Reintroduzir "Leitura complementar" no slide 4 (Âmbito e limitações)

## Objectivo
Adicionar ao slide 4 do relatório de avaliação indicativa uma secção "Leitura complementar" que recupere a parte anteriormente existente no slide de "Qualidade dos resultados". Esta secção explica as limitações do modelo com base na informação (ou falta dela) que o utilizador inseriu no formulário.

## O que vai ser alterado

### 1. `src/components/lealia/ReportDocument.tsx`
- No slide 4 (`Âmbito e limitações`), após o conteúdo atual de disclaimer (título, parágrafo inicial e colunas "Natureza do documento" / "Limitações e fatores de variação"), adicionar uma nova secção com o título **"Leitura complementar"**.
- A secção deve usar os dados já disponíveis em `d.qualidade`:
  - `d.qualidade.conversao_caixa`
  - `d.qualidade.fundo_maneio`
  - `d.qualidade.ajustamentos`
  - `d.qualidade.concentracao` (condicional)
  - `d.qualidade.backlog` (condicional)
  - Nota fixa sobre sazonalidade e desagregação de CAPEX de manutenção vs. crescimento.
- Apresentar os itens numa lista compacta (`report-list report-list-disc report-compact`), ocupando a largura total do slide, de forma a não quebrar o layout A4.
- Manter o rodapé existente e o restante conteúdo do slide inalterado.

### 2. Verificação de layout
- Garantir que a nova secção cabe no slide A4 sem empurrar o rodapé ou criar quebras de página indesejadas.
- Se necessário, ajustar ligeiramente o espaçamento entre as colunas superiores para libertar espaço vertical.

### 3. Validação
- Correr a verificação de tipos TypeScript (`tsgo` ou equivalente) para garantir que `d.qualidade` está corretamente tipado e acessível.
- Verificar visualmente o slide 4 no preview e no PDF gerado para confirmar que a lista aparece corretamente e que não há overflow.

## Notas
- Não serão alterados os cálculos nem a lógica do motor de valuation (`src/lib/valuation.ts` / `supabase/functions/_shared/valuation/valuation.ts`).
- Não serão alterados os dados devolvidos por `src/lib/report-data.tsx`, uma vez que `d.qualidade` e `d.limitacoes` já estão disponíveis no `ReportData`.
- O conteúdo permanece em português, conforme o restante relatório.
