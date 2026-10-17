"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function StartWavePlanner() {
  const [total, setTotal] = useState("2000");
  const [waves, setWaves] = useState("4");
  const [intervalMin, setIntervalMin] = useState("5");

  const plan = useMemo(() => {
    const n = Number(total);
    const w = Number(waves);
    const gap = Number(intervalMin);
    if (!n || !w) return [];
    const perWave = Math.ceil(n / w);
    return Array.from({ length: w }, (_, i) => ({
      wave: i + 1,
      startMin: i * gap,
      runners: i === w - 1 ? n - perWave * (w - 1) : perWave,
      corral: `A${String.fromCharCode(65 + Math.min(i, 25))}`,
    }));
  }, [total, waves, intervalMin]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Start wave planner</CardTitle>
        <CardDescription>Staggered starts for marathon corrals — client-side estimates.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label>Total runners</Label>
            <Input type="number" value={total} onChange={(e) => setTotal(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Waves</Label>
            <Input type="number" value={waves} onChange={(e) => setWaves(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Minutes between waves</Label>
            <Input type="number" value={intervalMin} onChange={(e) => setIntervalMin(e.target.value)} />
          </div>
        </div>
        <ul className="space-y-2 text-sm">
          {plan.map((row) => (
            <li
              key={row.wave}
              className="flex justify-between rounded-lg border border-border px-3 py-2"
            >
              <span>Wave {row.wave} · Corral {row.corral}</span>
              <span className="font-mono text-electric-cyan">
                T+{row.startMin} min · {row.runners} runners
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
