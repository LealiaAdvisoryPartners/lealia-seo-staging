import { shell, header, cta, footer, esc, CALENDLY_URL, MUTED, FONT, GOLD } from "./styles.ts";

export interface ConfirmacaoSubmissaoData {
  nome: string;
  empresa?: string | null;
  calculoPossivel?: boolean;
  calendlyUrl?: string;
}

export function subject(data: ConfirmacaoSubmissaoData): string {
  return data.empresa
    ? `${data.empresa} <> Lealia | Recebemos a sua submissão`
    : "Lealia | Recebemos a sua submissão";
}

export function render(data: ConfirmacaoSubmissaoData): string {
  const { nome, empresa, calendlyUrl = CALENDLY_URL } = data;
  const calculoPossivel = data.calculoPossivel ?? true;

  const bodyIntro = calculoPossivel
    ? `<p style="margin:28px 32px 0 32px;color:#0f172a;font-size:15px;line-height:24px;text-align:justify;font-family:${FONT};">
        A nossa equipa vai agora trabalhar a informação submetida e enviamos-lhe o relatório de avaliação indicativa
        assim que estiver finalizado.
      </p>`
    : `<p style="margin:28px 32px 0 32px;color:#0f172a;font-size:15px;line-height:24px;text-align:justify;font-family:${FONT};">
        A informação fornecida não permite, nesta fase, uma estimativa fiável de avaliação da sua empresa.
      </p>
      <p style="margin:12px 32px 0 32px;color:#0f172a;font-size:15px;line-height:24px;text-align:justify;font-family:${FONT};">
        Isto não significa que não tenha valor: fale connosco para podermos analisar a situação específica e
        ajudar com um processo de avaliação personalizado.
      </p>`;

  const contact = `<p style="margin:28px 32px 0 32px;color:#0f172a;font-size:15px;line-height:24px;text-align:justify;font-family:${FONT};">
      Para qualquer questão entretanto, pode contactar-nos através de
      <a href="mailto:valuations@lealiaap.com" style="color:${GOLD};font-weight:600;text-decoration:underline;font-family:${FONT};">valuations@lealiaap.com</a>.
    </p>`;

  const body = `
    ${header(
      "LEALIA ADVISORY PARTNERS",
      "Obrigado pela sua submissão",
      `Olá ${esc(nome)}${empresa ? `, recebemos os dados da <strong>${esc(empresa)}</strong>.` : "."}`,
    )}
    ${bodyIntro}
    ${contact}
    ${cta(
      "PRÓXIMO PASSO — REUNIÃO DE 20 MINUTOS",
      calculoPossivel ? "Apresentação do relatório completo." : "Análise personalizada da sua empresa.",
      calculoPossivel ? "Agendar reunião" : "Falar com a equipa",
      calendlyUrl,
    )}
    ${footer()}
  `;

  return shell(subject(data), body);
}
