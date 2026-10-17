import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

export async function exportElementAsPng(
  element: HTMLElement,
  filename: string,
  backgroundColor = "#ffffff",
) {
  const canvas = await html2canvas(element, {
    backgroundColor,
    scale: 2,
    useCORS: true,
  });
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

export async function exportElementAsPdf(
  element: HTMLElement,
  filename: string,
  orientation: "portrait" | "landscape" = "portrait",
) {
  const canvas = await html2canvas(element, {
    backgroundColor: "#ffffff",
    scale: 2,
    useCORS: true,
  });
  const img = canvas.toDataURL("image/png");
  const pdf = new jsPDF({ orientation, unit: "mm", format: "a4" });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const ratio = Math.min(pageW / canvas.width, pageH / canvas.height);
  const w = canvas.width * ratio;
  const h = canvas.height * ratio;
  pdf.addImage(img, "PNG", (pageW - w) / 2, (pageH - h) / 2, w, h);
  pdf.save(filename);
}

export function exportCertificatesPdf(
  canvases: HTMLCanvasElement[],
  filename: string,
) {
  const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  canvases.forEach((canvas, i) => {
    if (i > 0) pdf.addPage();
    const img = canvas.toDataURL("image/png");
    pdf.addImage(img, "PNG", 0, 0, pageW, pageH);
  });
  pdf.save(filename);
}
