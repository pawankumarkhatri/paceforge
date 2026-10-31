"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  RACE_DISTANCES,
  buildSplitMatrix,
  customDistanceKm,
  splitMatrixToDisplay,
  type PacingProfile,
} from "@/lib/endurance";
import { parseTimeToSeconds } from "@/lib/time";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TimeDurationInput } from "@/components/ui/time-duration-input";
import { PACING_PROFILE_HELP } from "@/lib/training-guide";

const PROFILES: { id: PacingProfile; label: string }[] = [
  { id: "even", label: "Even pace" },
  { id: "negative2", label: "Negative −2%" },
  { id: "negative3", label: "Negative −3%" },
  { id: "negative5", label: "Negative −5%" },
  { id: "elevation", label: "Hill-adjusted" },
];

export function SplitMatrix() {
  const searchParams = useSearchParams();
  const [raceId, setRaceId] = useState("half");
  const [customKm, setCustomKm] = useState("");
  const [goalTime, setGoalTime] = useState("1:45:00");
  const [profile, setProfile] = useState<PacingProfile>("negative3");

  useEffect(() => {
    const race = searchParams.get("race");
    if (!race) return;
    if (RACE_DISTANCES.some((r) => r.id === race)) {
      setRaceId(race);
      if (race === "marathon") setGoalTime("4:00:00");
      if (race === "half") setGoalTime("1:45:00");
      if (race === "10k") setGoalTime("0:50:00");
      if (race === "5k") setGoalTime("0:25:00");
    }
  }, [searchParams]);

  const distanceKm = useMemo(() => {
    if (raceId === "custom") return customDistanceKm(customKm);
    return RACE_DISTANCES.find((r) => r.id === raceId)?.km ?? 21.097;
  }, [raceId, customKm]);

  const goalSec = parseTimeToSeconds(goalTime);
  const rows = useMemo(() => {
    if (!distanceKm || !goalSec) return [];
    return splitMatrixToDisplay(buildSplitMatrix(distanceKm, goalSec, profile));
  }, [distanceKm, goalSec, profile]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Race Strategy & Split Matrix</CardTitle>
        <CardDescription>Per-km splits with elapsed time and pace (km / mile).</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label>Distance</Label>
            <select
              className="flex h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm"
              value={raceId}
              onChange={(e) => setRaceId(e.target.value)}
            >
              {RACE_DISTANCES.map((r) => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
              <option value="custom">Custom ultra</option>
            </select>
          </div>
          {raceId === "custom" && (
            <div className="space-y-2">
              <Label>Custom distance (km)</Label>
              <Input value={customKm} onChange={(e) => setCustomKm(e.target.value)} placeholder="50" />
            </div>
          )}
          <TimeDurationInput label="Goal finish time" value={goalTime} onChange={setGoalTime} />
          <div className="space-y-2 sm:col-span-2 lg:col-span-1">
            <Label>Pacing profile</Label>
            <select
              className="flex h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm"
              value={profile}
              onChange={(e) => setProfile(e.target.value as PacingProfile)}
            >
              {PROFILES.map((p) => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </select>
            <p className="text-xs text-muted leading-relaxed">{PACING_PROFILE_HELP[profile]}</p>
          </div>
        </div>
        {rows.length > 0 && (
          <>
            <div className="max-h-80 overflow-auto rounded-lg border border-border">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="sticky top-0 bg-surface-elevated text-muted">
                  <tr>
                    <th className="p-2">Km</th>
                    <th className="p-2">Mi</th>
                    <th className="p-2">Split</th>
                    <th className="p-2">Elapsed</th>
                    <th className="p-2">Pace/km</th>
                    <th className="p-2">Pace/mi</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.index} className="border-t border-border/50 font-mono">
                      <td className="p-2">{r.distKm}</td>
                      <td className="p-2">{r.distMi}</td>
                      <td className="p-2 text-runner-green">{r.split}</td>
                      <td className="p-2">{r.elapsed}</td>
                      <td className="p-2">{r.paceKm}</td>
                      <td className="p-2 text-electric-cyan">{r.paceMile}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
