// Regras de agendamento do envio do email com o relatório.
// Envio = submissão + 6h06. Se essa hora cair entre as 23:00 e as 08:03
// (hora de Portugal), o envio é adiado para as 08:04.

const TZ = "Europe/Lisbon";
const ATRASO_MS = (6 * 60 + 6) * 60 * 1000;
const INICIO_BLOQUEIO = 23 * 60; // 23:00
const FIM_BLOQUEIO = 8 * 60 + 4; // 08:04

/** Minutos desde a meia-noite, em hora de Portugal, para um dado instante. */
function minutosLisboa(data: Date): number {
  const partes = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(data);
  const hora = Number(partes.find((p) => p.type === "hour")?.value ?? "0");
  const minuto = Number(partes.find((p) => p.type === "minute")?.value ?? "0");
  return (hora % 24) * 60 + minuto;
}

export function calcularEnvioRelatorio(submissao: Date = new Date()): Date {
  let alvo = new Date(submissao.getTime() + ATRASO_MS);

  const dentroDoBloqueio = (m: number) => m >= INICIO_BLOQUEIO || m < FIM_BLOQUEIO;

  let minutos = minutosLisboa(alvo);
  if (!dentroDoBloqueio(minutos)) return alvo;

  // Avança até às 08:04 seguintes.
  const avanco = minutos >= INICIO_BLOQUEIO ? 1440 - minutos + FIM_BLOQUEIO : FIM_BLOQUEIO - minutos;
  alvo = new Date(alvo.getTime() + avanco * 60 * 1000);

  // Correção de eventual mudança de hora (DST) no intervalo.
  minutos = minutosLisboa(alvo);
  if (minutos !== FIM_BLOQUEIO) {
    let delta = FIM_BLOQUEIO - minutos;
    if (delta > 720) delta -= 1440;
    if (delta < -720) delta += 1440;
    alvo = new Date(alvo.getTime() + delta * 60 * 1000);
  }

  return alvo;
}

/** Validade do link do relatório: 7 dias a contar do envio ao utilizador. */
export function calcularExpiracaoRelatorio(envio: Date = new Date()): Date {
  return new Date(envio.getTime() + 7 * 24 * 60 * 60 * 1000);
}
