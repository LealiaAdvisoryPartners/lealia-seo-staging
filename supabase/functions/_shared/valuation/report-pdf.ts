// Optional PDF generation — no-ops unless a conversion service key is configured.
// Mirrors the source's report-pdf.server.ts behaviour without requesting any secret.
export async function gerarPdfRelatorio(
  _leadId: string,
  _url: string,
  _variante: "publico" | "admin" = "publico",
): Promise<string | null> {
  const pdfShiftKey = Deno.env.get("PDFSHIFT_API_KEY");
  const docRaptorKey = Deno.env.get("DOCRAPTOR_API_KEY");
  if (!pdfShiftKey && !docRaptorKey) return null;

  try {
    if (pdfShiftKey) {
      const res = await fetch("https://api.pdfshift.io/v3/convert/pdf", {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(`api:${pdfShiftKey}`)}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ source: _url }),
      });
      if (!res.ok) {
        console.error(`PDFShift falhou [${res.status}]`);
        return null;
      }
      // PDFShift returns the binary directly; without storage configured we cannot
      // persist it here, so this is left as a documented extension point.
      return null;
    }
    return null;
  } catch (error) {
    console.error("Falha ao gerar PDF do relatório", error instanceof Error ? error.message : error);
    return null;
  }
}
