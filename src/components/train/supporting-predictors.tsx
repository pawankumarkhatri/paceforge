"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  LONG_DISTANCE_OPTIONS,
  cameronPredict,
  metersForId,
  predictAllDistances,
  riegelPredict,
} from "@/lib/predictions";
import { formatSeconds, parseTimeToSeconds } from "@/lib/time";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PastRaceBenchmark } from "@/components/ui/past-race-benchmark";
import { PREDICTOR_DISTANCE_OPTIONS } from "@/lib/race-time-presets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function SupportingPredictors() {
  const [open, setOpen] = useState(false);
  const [fromId, setFromId] = useState("half");
  const [timeInput, setTimeInput] = useState("1:42:00");

  const fromMeters = metersForId(fromId);
  const timeSec = parseTimeToSeconds(timeInput);

  const riegel = useMemo(() => {
    if (!fromMeters || !timeSec) return null;
    return predictAllDistances(timeSec, fromMeters, "riegel");
  }, [fromMeters, timeSec]);

  const cameron = useMemo(() => {
    if (!fromMeters || !timeSec) return null;
    return predictAllDistances(timeSec, fromMeters, "cameron");
  }, [fromMeters, timeSec]);

  return (
    <Card>
      <button
        type="button"
        className="w-full text-left"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
          <div>
            <CardTitle className="text-lg">Riegel & Cameron</CardTitle>
            <CardDescription>Optional cross-check vs VDOT.</CardDescription>
          </div>
          <ChevronDown
            className={cn("h-5 w-5 shrink-0 text-muted transition-transform", open && "rotate-180")}
          />
        </CardHeader>
      </button>
      {open && (
        <CardContent className="space-y-4 pt-0 border-t border-border">
          <PastRaceBenchmark
            distanceId={fromId}
            onDistanceChange={setFromId}
            timeValue={timeInput}
            onTimeChange={setTimeInput}
            distanceOptions={PREDICTOR_DISTANCE_OPTIONS.map((d) => ({ id: d.id, label: d.label }))}
            distanceLabel="Past race distance"
            timeLabel="Past race finish time"
          />
          {riegel && cameron && (
            <Tabs defaultValue="compare">
              <TabsList>
                <TabsTrigger value="compare">Side by side</TabsTrigger>
                <TabsTrigger value="riegel">Riegel</TabsTrigger>
                <TabsTrigger value="cameron">Cameron</TabsTrigger>
              </TabsList>
              <TabsContent value="compare">
                <div className="overflow-x-auto rounded-xl border border-border text-sm">
                  <table className="w-full text-left">
                    <thead className="bg-surface-elevated text-muted text-xs uppercase">
                      <tr>
                        <th className="p-2">Distance</th>
                        <th className="p-2">Riegel</th>
                        <th className="p-2">Cameron</th>
                      </tr>
                    </thead>
                    <tbody>
                      {LONG_DISTANCE_OPTIONS.map((d) => (
                        <tr key={d.id} className="border-t border-border/50 font-mono">
                          <td className="p-2">{d.label}</td>
                          <td className="p-2 text-runner-green/80">
                            {formatSeconds(riegel[d.id], riegel[d.id] >= 3600)}
                          </td>
                          <td className="p-2 text-electric-cyan/80">
                            {formatSeconds(cameron[d.id], cameron[d.id] >= 3600)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {fromMeters && timeSec && (
                  <p className="mt-2 text-xs text-muted">
                    Marathon gap (Riegel vs Cameron):{" "}
                    {formatSeconds(
                      Math.abs(
                        riegelPredict(timeSec, fromMeters, 42195) -
                          cameronPredict(timeSec, fromMeters, 42195),
                      ),
                    )}
                  </p>
                )}
              </TabsContent>
              <TabsContent value="riegel">
                <PredictorList data={riegel} />
                <p className="mt-2 text-xs text-muted">T₂ = T₁ × (D₂/D₁)^1.06</p>
              </TabsContent>
              <TabsContent value="cameron">
                <PredictorList data={cameron} accent="cyan" />
                <p className="mt-2 text-xs text-muted">Dave Cameron speed multiplier model.</p>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      )}
    </Card>
  );
}

function PredictorList({
  data,
  accent = "green",
}: {
  data: Record<string, number>;
  accent?: "green" | "cyan";
}) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {LONG_DISTANCE_OPTIONS.map((d) => (
        <li
          key={d.id}
          className="flex justify-between rounded-lg border border-border px-3 py-2 text-sm"
        >
          <span className="text-muted">{d.label}</span>
          <span
            className={cn(
              "font-mono",
              accent === "cyan" ? "text-electric-cyan/90" : "text-runner-green/90",
            )}
          >
            {data[d.id] ? formatSeconds(data[d.id], data[d.id] >= 3600) : "—"}
          </span>
        </li>
      ))}
    </ul>
  );
}
