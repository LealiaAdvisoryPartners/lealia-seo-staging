// Libertação dos relatórios: dia n+2 às 08:53, hora de Lisboa, sendo n o dia
// (de Lisboa) da submissão. Vale tanto para o sample como para o relatório
// completo pago antes dessa hora. Quem paga depois recebe de imediato.
const TZ = "Europe/Lisbon";
export const HORA_ENVIO_LISBOA = 8;
const MINUTO_ENVIO = 53;

/** Componentes de data/hora de um instante no fuso de Lisboa. */
function partesLisboa(d: Date) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: TZ, hourCycle: "h23",
      year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit",
    }).formatToParts(d).map((x) => [x.type, Number(x.value)]),
  ) as Record<string, number>;
  return p;
}

/** Diferença (ms) entre a hora de Lisboa e UTC num dado instante. */
function desvioLisboa(d: Date): number {
  const p = partesLisboa(d);
  return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - Math.floor(d.getTime() / 1000) * 1000;
}

export function calcularEnvioRelatorio(submissao: Date = new Date()): Date {
  const p = partesLisboa(submissao);
  const local = Date.UTC(p.year, p.month - 1, p.day + 2, HORA_ENVIO_LISBOA, MINUTO_ENVIO);
  return new Date(local - desvioLisboa(new Date(local)));
}

/** Hora atual em Lisboa (0–23) — o job só atua às 8h de Lisboa. */
export function horaLisboa(d: Date = new Date()): number {
  return partesLisboa(d).hour;
}

/** Validade do link do relatório: 7 dias a contar do envio ao utilizador. */
export function calcularExpiracaoRelatorio(envio: Date = new Date()): Date {
  return new Date(envio.getTime() + 7 * 24 * 60 * 60 * 1000);
}
