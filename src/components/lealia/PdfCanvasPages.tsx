import { useEffect, useRef, useState } from "react";
import * as pdfjs from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

/** Renders every page of a PDF into <canvas> elements (no native viewer, no print/download UI). */
export function PdfCanvasPages({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    let cancelled = false;
    host.innerHTML = "";
    setLoading(true);
    const task = pdfjs.getDocument(src);

    task.promise
      .then(async (doc) => {
        const width = Math.min(host.clientWidth || 1000, 1400);
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        for (let i = 1; i <= doc.numPages && !cancelled; i++) {
          const page = await doc.getPage(i);
          const base = page.getViewport({ scale: 1 });
          const viewport = page.getViewport({ scale: (width / base.width) * dpr });
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = `${width}px`;
          canvas.style.maxWidth = "100%";
          canvas.className = "mx-auto mb-6 block shadow-lg";
          host.appendChild(canvas);
          await page.render({ canvasContext: canvas.getContext("2d")!, viewport }).promise;
          if (i === 1) setLoading(false);
        }
      })
      .catch(() => setLoading(false));

    return () => {
      cancelled = true;
      task.destroy();
    };
  }, [src]);

  return (
    <>
      {loading && <div className="py-24 text-center text-sm font-light text-muted-foreground">…</div>}
      <div ref={ref} className="select-none" onDragStart={(e) => e.preventDefault()} />
    </>
  );
}
