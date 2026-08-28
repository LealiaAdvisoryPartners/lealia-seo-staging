import * as confirmacaoSubmissao from "./confirmacao-submissao.ts";
import * as notificacaoLead from "./notificacao-lead.ts";
import * as resumoAvaliacao from "./resumo-avaliacao.ts";

export interface TemplateEntry {
  render: (data: Record<string, any>) => string;
  subject: (data: Record<string, any>) => string;
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  "confirmacao-submissao": { render: confirmacaoSubmissao.render, subject: confirmacaoSubmissao.subject },
  "notificacao-lead": { render: notificacaoLead.render, subject: notificacaoLead.subject },
  "resumo-avaliacao": { render: resumoAvaliacao.render, subject: resumoAvaliacao.subject },
};
