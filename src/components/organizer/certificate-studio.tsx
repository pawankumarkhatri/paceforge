"use client";

import { useCallback, useRef, useState } from "react";
import { parseFinisherCsv, type FinisherRow } from "@/lib/organizer";
import { exportCertificatesPdf } from "@/lib/export";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CertificateStudio() {
  const [rows, setRows] = useState<FinisherRow[]>([]);
  const [eventName, setEventName] = useState("City Marathon 2026");
  const [signature, setSignature] = useState("Race Director");
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const onCsv = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? "");
      setRows(parseFinisherCsv(text));
    };
    reader.readAsText(file);
  }, []);

  const onLogo = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => setLogoDataUrl(String(reader.result));
    reader.readAsDataURL(file);
  }, []);

  async function bulkPdf() {
    if (!rows.length) return;
    const canvases: HTMLCanvasElement[] = [];
    for (const row of rows) {
      const canvas = document.createElement("canvas");
      canvas.width = 1122;
      canvas.height = 794;
      const ctx = canvas.getContext("2d");
      if (!ctx) continue;
      drawCertificate(ctx, canvas.width, canvas.height, row, eventName, signature);
      canvases.push(canvas);
    }
    exportCertificatesPdf(canvases, "paceforge-certificates.pdf");
  }

  const sample = rows[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Finisher Certificate Studio</CardTitle>
        <CardDescription>Import CSV — bulk PDF export, no server required.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>CSV (Name, BibNumber, Category, FinishTime, Rank)</Label>
            <Input
              type="file"
              accept=".csv"
              onChange={(e) => e.target.files?.[0] && onCsv(e.target.files[0])}
            />
          </div>
          <div className="space-y-2">
            <Label>Event logo</Label>
            <Input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && onLogo(e.target.files[0])} />
          </div>
          <div className="space-y-2">
            <Label>Event name</Label>
            <Input value={eventName} onChange={(e) => setEventName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Signature line</Label>
            <Input value={signature} onChange={(e) => setSignature(e.target.value)} />
          </div>
        </div>
        <p className="text-sm text-muted">{rows.length} finishers loaded</p>
        {sample && (
          <div ref={previewRef} className="mx-auto max-w-lg overflow-hidden rounded-xl border-2 border-runner-green/30 bg-gradient-to-br from-slate-900 to-slate-950 p-8 text-center text-white shadow-lg">
            {logoDataUrl && (
              <img src={logoDataUrl} alt="Logo" className="mx-auto mb-4 h-16 object-contain" />
            )}
            <p className="text-xs uppercase tracking-[0.3em] text-electric-cyan">Certificate of Finish</p>
            <h4 className="mt-2 text-2xl font-bold text-runner-green">{eventName}</h4>
            <p className="mt-6 text-sm text-slate-300">This certifies that</p>
            <p className="text-3xl font-semibold">{sample.name}</p>
            <p className="mt-4 text-sm">
              Bib {sample.bibNumber} · {sample.category}
            </p>
            <p className="mt-2 font-mono text-xl text-electric-cyan">{sample.finishTime}</p>
            <p className="mt-1 text-sm text-muted">Overall rank #{sample.rank}</p>
            <p className="mt-8 border-t border-border pt-4 text-sm italic">{signature}</p>
          </div>
        )}
        <Button type="button" disabled={!rows.length} onClick={bulkPdf}>
          Generate all certificates (PDF)
        </Button>
      </CardContent>
    </Card>
  );
}

function drawCertificate(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  row: FinisherRow,
  eventName: string,
  signature: string,
) {
  const grd = ctx.createLinearGradient(0, 0, w, h);
  grd.addColorStop(0, "#0f172a");
  grd.addColorStop(1, "#020617");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "#00FF87";
  ctx.lineWidth = 4;
  ctx.strokeRect(24, 24, w - 48, h - 48);

  ctx.fillStyle = "#00E5FF";
  ctx.font = "bold 22px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("CERTIFICATE OF FINISH", w / 2, 100);

  ctx.fillStyle = "#00FF87";
  ctx.font = "bold 36px sans-serif";
  ctx.fillText(eventName, w / 2, 160);

  ctx.fillStyle = "#e2e8f0";
  ctx.font = "20px sans-serif";
  ctx.fillText("This certifies that", w / 2, 240);

  ctx.font = "bold 48px sans-serif";
  ctx.fillText(row.name, w / 2, 310);

  ctx.font = "24px monospace";
  ctx.fillStyle = "#00E5FF";
  ctx.fillText(`Time: ${row.finishTime}  ·  Bib ${row.bibNumber}`, w / 2, 380);
  ctx.fillStyle = "#94a3b8";
  ctx.font = "20px sans-serif";
  ctx.fillText(`${row.category} · Rank #${row.rank}`, w / 2, 420);

  ctx.fillStyle = "#cbd5e1";
  ctx.font = "italic 22px sans-serif";
  ctx.fillText(signature, w / 2, h - 80);

}
