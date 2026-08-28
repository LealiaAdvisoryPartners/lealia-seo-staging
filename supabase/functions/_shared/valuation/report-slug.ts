/** Gera um endereço legível para o relatório: "padaria-silva-4kq9". */
const ALFABETO = "abcdefghijkmnpqrstuvwxyz23456789";

function sufixo(n = 4) {
  const bytes = crypto.getRandomValues(new Uint8Array(n));
  return Array.from(bytes, (b) => ALFABETO[b % ALFABETO.length]).join("");
}

export function gerarSlugRelatorio(empresa: string, sufixoFixo?: string | null): string {
  const base =
    empresa
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40)
      .replace(/-+$/, "") || "relatorio";
  const marca = (sufixoFixo ?? "").toLowerCase().replace(/[^a-z0-9]/g, "").slice(-4);
  return `${base}-${marca.length === 4 ? marca : sufixo()}`;
}
