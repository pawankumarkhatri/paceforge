"use client";

import { useMemo, useState } from "react";
import { TRACK_DISTANCES, computeVelocity } from "@/lib/sprint";
import { parseTimeToSeconds } from "@/lib/time";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function VelocityCalculator() {
  const [distanceId, setDistanceId] = useState<string>("100");
  const [timeInput, setTimeInput] = useState("10.50");

  const distance = TRACK_DISTANCES.find((d) => d.id === distanceId) ?? TRACK_DISTANCES[1];
  const seconds = parseTimeToSeconds(timeInput);

  const result = useMemo(() => {
    if (!seconds || seconds <= 0) return null;
    return computeVelocity(seconds, distance.meters);
  }, [seconds, distance.meters]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Velocity & Track Split Calculator</CardTitle>
        <CardDescription>Time → m/s, km/h, mph, and 100/200/400m split targets.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Event distance</Label>
            <select
              className="flex h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm"
              value={distanceId}
              onChange={(e) => setDistanceId(e.target.value)}
            >
              {TRACK_DISTANCES.map((d) => (
                <option key={d.id} value={d.id}>{d.label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label>Finish time (ss, mm:ss, or h:mm:ss)</Label>
            <Input value={timeInput} onChange={(e) => setTimeInput(e.target.value)} placeholder="10.50 or 0:10.5" />
          </div>
        </div>
        {result && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Metric label="Velocity" value={`${result.metersPerSecond.toFixed(2)} m/s`} />
            <Metric label="Speed" value={`${result.kmPerHour.toFixed(2)} km/h`} />
            <Metric label="Speed" value={`${result.mph.toFixed(2)} mph`} />
            <Metric label="100m split" value={result.split100m} accent="cyan" />
            <Metric label="200m split" value={result.split200m} accent="cyan" />
            <Metric label="400m split" value={result.split400m} accent="cyan" />
          </div>
        )}
        {!result && timeInput && (
          <p className="text-sm text-amber-400/90">Enter a valid time format.</p>
        )}
      </CardContent>
    </Card>
  );
}

function Metric({ label, value, accent }: { label: string; value: string; accent?: "cyan" }) {
  return (
    <div className="rounded-lg border border-border bg-surface-elevated p-3">
      <p className="text-[10px] uppercase tracking-wider text-muted">{label}</p>
      <p className={accent === "cyan" ? "text-lg font-mono font-semibold text-electric-cyan" : "text-lg font-mono font-semibold text-runner-green"}>
        {value}
      </p>
    </div>
  );
}
