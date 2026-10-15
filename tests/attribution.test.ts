import { describe, expect, test } from "bun:test";
import { sanitizeAttribution } from "../supabase/functions/_shared/valuation/attribution";

describe("atribuição", () => {
  test("rejeita propriedades não autorizadas", () => {
    const r = sanitizeAttribution({ first_touch: { utm_source: "google", email: "a@b.pt", nome: "X" }, extra: 1 });
    expect(r).toEqual({ first_touch: { utm_source: "google" } });
  });
  test("descarta valores com @ (e-mails)", () => {
    expect(sanitizeAttribution({ last_touch: { utm_term: "joao@x.pt" } })).toBeNull();
  });
  test("remove query string de landing_page e referrer", () => {
    const r = sanitizeAttribution({ first_touch: { landing_page: "https://www.lealiaap.com/pt?k=TOKEN&utm_source=x", referrer: "https://google.com/search?q=a" } });
    expect(r?.first_touch?.landing_page).toBe("https://www.lealiaap.com/pt");
    expect(r?.first_touch?.referrer).toBe("https://google.com/search");
  });
  test("limita tamanho de cada valor a 200", () => {
    const r = sanitizeAttribution({ first_touch: { utm_campaign: "a".repeat(500) } });
    expect(r?.first_touch?.utm_campaign?.length).toBe(200);
  });
});
