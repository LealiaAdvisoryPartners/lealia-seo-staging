// O sample fica elegível para envio exatamente 16 horas após a submissão.
// O job diário envia todos os samples já elegíveis na execução seguinte.
const ATRASO_MS = 16 * 60 * 60 * 1000;

export function calcularEnvioRelatorio(submissao: Date = new Date()): Date {
  return new Date(submissao.getTime() + ATRASO_MS);
}

/** Validade do link do relatório: 7 dias a contar do envio ao utilizador. */
export function calcularExpiracaoRelatorio(envio: Date = new Date()): Date {
  return new Date(envio.getTime() + 7 * 24 * 60 * 60 * 1000);
}
