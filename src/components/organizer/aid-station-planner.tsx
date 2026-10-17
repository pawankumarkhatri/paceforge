"use client";

import { useMemo, useState } from "react";
import { planAidStations, type HeatLevel, type RaceCategory } from "@/lib/organizer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AidStationPlanner() {
  const [runners, setRunners] = useState("500");
  const [category, setCategory] = useState<RaceCategory>("half");
  const [heat, setHeat] = useState<HeatLevel>("warm");

  const plan = useMemo(() => {
    const n = Number(runners);
    if (!n || n < 1) return null;
    return planAidStations(n, category, heat);
  }, [runners, category, heat]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aid Station Logistics</CardTitle>
        <CardDescription>Placements, inventory, volunteers, and sweeper cut-offs.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label>Registered runners</Label>
            <Input value={runners} onChange={(e) => setRunners(e.target.value)} type="number" />
          </div>
          <div className="space-y-2">
            <Label>Race category</Label>
            <select
              className="flex h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value as RaceCategory)}
            >
              <option value="10k">10K</option>
              <option value="half">Half Marathon</option>
              <option value="full">Full Marathon</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Expected heat</Label>
            <select
              className="flex h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm"
              value={heat}
              onChange={(e) => setHeat(e.target.value as HeatLevel)}
            >
              <option value="mild">Mild</option>
              <option value="warm">Warm</option>
              <option value="hot">Hot</option>
            </select>
          </div>
        </div>
        {plan && (
          <>
            <div className="grid gap-3 sm:grid-cols-2">
              <Summary label="Total water" value={`${plan.totalWaterLiters} L`} />
              <Summary label="Volunteers (all stations)" value={String(plan.totalVolunteers)} />
            </div>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-surface-elevated text-muted">
                  <tr>
                    <th className="p-2">KM</th>
                    <th className="p-2">Water (L)</th>
                    <th className="p-2">Electrolyte</th>
                    <th className="p-2">Bananas</th>
                    <th className="p-2">Dates</th>
                    <th className="p-2">Sponge</th>
                    <th className="p-2">Vol.</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.stations.map((s) => (
                    <tr key={s.km} className="border-t border-border/50">
                      <td className="p-2 font-mono text-runner-green">{s.km}</td>
                      <td className="p-2">{s.waterLiters}</td>
                      <td className="p-2">{s.electrolytePacks}</td>
                      <td className="p-2">{s.bananas}</td>
                      <td className="p-2">{s.dates}</td>
                      <td className="p-2">{s.spongeBins}</td>
                      <td className="p-2">{s.volunteers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted mb-2">Sweeper cut-offs</p>
              <div className="flex flex-wrap gap-2">
                {plan.sweeperCutoffs.map((c) => (
                  <span
                    key={c.km}
                    className="rounded-md border border-electric-cyan/30 bg-electric-cyan/10 px-2 py-1 text-xs font-mono"
                  >
                    {c.km} km · {c.cutoffHours}h
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border p-3">
      <p className="text-[10px] uppercase text-muted">{label}</p>
      <p className="text-xl font-semibold text-runner-green">{value}</p>
    </div>
  );
}
