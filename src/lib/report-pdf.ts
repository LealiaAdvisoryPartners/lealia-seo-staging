import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

const A4_LANDSCAPE = { width: 297, height: 210 };

/**
 * Gera o PDF do relatório no browser (sem serviços externos):
 * cada `.report-page` é rasterizada e colocada numa página A4 landscape.
 */
export async function descarregarRelatorioPdf(nomeFicheiro: string) {
  const paginas = Array.from(document.querySelectorAll<HTMLElement>(".report-doc .report-page"));
  if (!paginas.length) throw new Error("Relatório não encontrado na página");

  const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4", compress: true });

  for (let i = 0; i < paginas.length; i += 1) {
    const canvas = await html2canvas(paginas[i], {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false,
size: 0,
    } as never);
    const imagem = canvas.toDataURL("image/jpeg", 0.92);
    if (i > 0) pdf.addPage("a4", "landscape");
    pdf.addImage(imagem, "JPEG", 0, 0, A4_LANDSCAPE.width, A4_LANDSCAPE.height, undefined, "FAST");
  }

  pdf.save(nomeFicheiro);
}
