import { describe, expect, test } from "bun:test";
import { safePagePath, safeReferrer, validPurchase, isProductionHost } from "../src/lib/tracking/datalayer";

describe("URLs seguros", () => {
  test("relatório normalizado para /report", () => expect(safePagePath("/pt/ABC123xyz")).toBe("/pt/report"));
  test("checkout normalizado para /report", () => expect(safePagePath("/en/upgrade")).toBe("/en/report"));
  test("página pública mantém-se", () => expect(safePagePath("/es/services/")).toBe("/es/services"));
  test("referrer interno sem token", () =>
    expect(safeReferrer("https://lealiaap.com/pt/TOKEN99?pedido=LP1", "https://lealiaap.com")).toBe("https://lealiaap.com/pt/report"));
  test("referrer externo só origem", () => expect(safeReferrer("https://google.com/search?q=x", "https://lealiaap.com")).toBe("https://google.com"));
});

describe("purchase", () => {
  test("recusa sem transaction_id", () => expect(validPurchase({ transaction_id: "", value: 299, currency: "EUR", payment_status: "paid" })).toBe(false));
  test("recusa se não pago", () => expect(validPurchase({ transaction_id: "LP1", value: 299, currency: "EUR" })).toBe(false));
  test("aceita valor real do servidor", () => expect(validPurchase({ transaction_id: "LP1", value: 249.5, currency: "EUR", payment_status: "paid" })).toBe(true));
  test("staging não é produção", () => expect(isProductionHost("id-preview--x.lovable.app")).toBe(false));
  test("produção", () => expect(isProductionHost("www.lealiaap.pt")).toBe(true));
});
