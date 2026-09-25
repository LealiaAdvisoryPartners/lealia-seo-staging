/** Link único de agendamento de reunião. */
export const CALENDLY_URL = "https://calendly.com/lealiaap-drp/valuationcall";

/** Props comuns para abrir o Calendly numa nova janela. */
export const calendlyLinkProps = {
  href: CALENDLY_URL,
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
