// Máscara de milhares (pt/es): "1.250.000". Guarda-se sempre o valor limpo em dígitos.

export const digitsOnly = (v: string) => v.replace(/[^\d-]/g, "").replace(/(?!^)-/g, "");

export const formatThousands = (raw: string) => {
  const clean = digitsOnly(raw);
  if (clean === "" || clean === "-") return clean;
  const neg = clean.startsWith("-");
  const n = clean.replace("-", "").replace(/^0+(?=\d)/, "");
  return (neg ? "-" : "") + n.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const parseMoney = (raw: string): number | null => {
  const clean = digitsOnly(raw);
  if (clean === "" || clean === "-") return null;
  const n = Number(clean);
  return Number.isNaN(n) ? null : n;
};
