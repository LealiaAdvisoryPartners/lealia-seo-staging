import type { ComponentType } from "npm:react@18.3.1";
import { template as resumoAvaliacaoTemplate } from "./resumo-avaliacao.tsx";
import { template as notificacaoLeadTemplate } from "./notificacao-lead.tsx";
import { template as confirmacaoSubmissaoTemplate } from "./confirmacao-submissao.tsx";
import { template as relatorioCompletoTemplate } from "./relatorio-completo.tsx";
import { template as notificacaoPagamentoTemplate } from "./notificacao-pagamento.tsx";

export interface TemplateEntry {
  // deno-lint-ignore no-explicit-any
  component: ComponentType<any>;
  // deno-lint-ignore no-explicit-any
  subject: string | ((data: Record<string, any>) => string);
  displayName?: string;
  // deno-lint-ignore no-explicit-any
  previewData?: Record<string, any>;
  /** Fixed recipient — overrides caller-provided recipient when set. */
  to?: string;
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  "resumo-avaliacao": resumoAvaliacaoTemplate,
  "confirmacao-submissao": confirmacaoSubmissaoTemplate,
  "notificacao-lead": notificacaoLeadTemplate,
};
