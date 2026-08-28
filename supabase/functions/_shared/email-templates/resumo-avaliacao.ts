import { shell, header, cta, footer, esc, CALENDLY_URL, GOLD, FONT } from "./styles.ts";

export interface ResumoAvaliacaoData {
  nome: string;
  empresa?: string | null;
  relatorioUrl?: string | null;
  pdfUrl?: string | null;
  calendlyUrl?: string;
}

export function subject(data: ResumoAvaliacaoData): string {
  return data.empresa
    ? `${data.empresa} <> Lealia | Relatório de Avaliação Indicativa`
    : "Lealia | Relatório de Avaliação Indicativa";
}

export function render(data: ResumoAvaliacaoData): string {
  const { nome, empresa, calendlyUrl = CALENDLY_URL } = data;
  const reportUrl = data.relatorioUrl || data.pdfUrl || null;

  const linkBlock = reportUrl
    ? `<p style="margin:16px 32px 0 32px;font-size:15px;line-height:24px;font-family:${FONT};">
        <a href="${esc(reportUrl)}" style="color:${GOLD};font-weight:600;text-decoration:underline;font-family:${FONT};">Ver o meu relatório →</a>
      </p>`
    : "";

  const body = `
    ${header(
      "LEALIA ADVISORY PARTNERS",
      "Boas notícias: o seu relatório está pronto 🎉",
      `Olá ${esc(nome)}${empresa ? `, concluímos agora mesmo a avaliação indicativa da <strong>${esc(empresa)}</strong>.` : "."}`,
    )}
    <p style="margin:28px 32px 0 32px;color:#0f172a;font-size:15px;line-height:24px;text-align:justify;font-family:${FONT};">
      O seu relatório de avaliação indicativa já está disponível e pode ser consultado através do link abaixo:
    </p>
    ${linkBlock}
    ${cta("PRÓXIMO PASSO — REUNIÃO DE 20 MINUTOS", "Apresentação do relatório completo.", "Agendar reunião", calendlyUrl)}
    ${footer()}
  `;

  return shell(subject(data), body);
}
