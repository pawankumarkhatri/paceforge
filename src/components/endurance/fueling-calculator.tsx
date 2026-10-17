"use client";

import { useMemo, useState } from "react";
import { buildFuelingPlan } from "@/lib/fueling";
import { parseTimeToSeconds } from "@/lib/time";
import { RACE_DISTANCES } from "@/lib/endurance";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TimeDurationInput } from "@/components/ui/time-duration-input";

export function FuelingCalculator() {
  const [weight, setWeight] = useState("70");
  const [raceId, setRaceId] = useState("marathon");
  const [goalTime, setGoalTime] = useState("3:45:00");
  const [tempC, setTempC] = useState("18");
  const [humidity, setHumidity] = useState("55");

  const distanceKm = RACE_DISTANCES.find((r) => r.id === raceId)?.km ?? 42.195;
  const goalSec = parseTimeToSeconds(goalTime);

  const plan = useMemo(() => {
    const w = Number(weight);
    if (!goalSec || !w) return null;
    return buildFuelingPlan({
      bodyWeightKg: w,
      raceDurationHours: goalSec / 3600,
      distanceKm,
      tempC: Number(tempC) || 15,
      humidityPercent: Number(humidity) || 50,
    });
  }, [weight, goalSec, distanceKm, tempC, humidity]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fueling & Hydration</CardTitle>
        <CardDescription>Carbs/hr, fluid loss, and gel/hydration markers on course.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label>Body weight (kg)</Label>
            <Input value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Race</Label>
            <select
              className="flex h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm"
              value={raceId}
              onChange={(e) => setRaceId(e.target.value)}
            >
              {RACE_DISTANCES.map((r) => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </select>
          </div>
          <TimeDurationInput label="Target time" value={goalTime} onChange={setGoalTime} />
          <div className="space-y-2">
            <Label>Temp (°C)</Label>
            <Input value={tempC} onChange={(e) => setTempC(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Humidity (%)</Label>
            <Input value={humidity} onChange={(e) => setHumidity(e.target.value)} />
          </div>
        </div>
        {plan && (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <Stat label="Carbs / hour" value={`${plan.carbsPerHourG} g`} />
              <Stat label="Fluid loss / hr" value={`${plan.fluidLossMlPerHour} ml`} />
              <Stat label="Total fluid (est.)" value={`${plan.totalFluidLossMl} ml`} />
            </div>
            <p className="text-sm text-muted">
              Gel every ~{plan.gelIntervalKm} km (~{plan.gelIntervalMin} min)
            </p>
            <ul className="space-y-2 text-sm">
              {plan.hydrationMarkers.map((m) => (
                <li key={m.km} className="flex gap-3 rounded-lg border border-border px-3 py-2">
                  <span className="font-mono text-runner-green w-16">{m.km} km</span>
                  <span className="text-muted w-14">{m.elapsedMin}&apos;</span>
                  <span>{m.action}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border p-3">
      <p className="text-[10px] uppercase text-muted">{label}</p>
      <p className="text-lg font-semibold text-electric-cyan">{value}</p>
    </div>
  );
}
