"use client";

import { useMemo, useState } from "react";
import {
  INTERVAL_PRESETS,
  type IntervalSegment,
  type IntervalWorkout,
  segmentRecoverySeconds,
  segmentWorkTimeSeconds,
  workoutTotalSeconds,
} from "@/lib/sprint";
import { formatSeconds } from "@/lib/time";
import { saveVaultItem } from "@/lib/storage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function IntervalBuilder() {
  const [workout, setWorkout] = useState<IntervalWorkout>(INTERVAL_PRESETS[0]);
  const totalSec = useMemo(() => workoutTotalSeconds(workout), [workout]);

  function updateSegment(id: string, patch: Partial<IntervalSegment>) {
    setWorkout((w) => ({
      ...w,
      segments: w.segments.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interval Workout Builder</CardTitle>
        <CardDescription>Configure repeats with visual pace targets. Save plans to your Vault.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {INTERVAL_PRESETS.map((p) => (
            <Button
              key={p.name}
              type="button"
              variant={workout.name === p.name ? "default" : "secondary"}
              size="sm"
              onClick={() => setWorkout(p)}
            >
              {p.name}
            </Button>
          ))}
        </div>
        <Input
          value={workout.name}
          onChange={(e) => setWorkout((w) => ({ ...w, name: e.target.value }))}
          className="font-semibold"
        />
        <div className="space-y-4">
          {workout.segments.map((seg) => {
            const work = segmentWorkTimeSeconds(seg);
            const rec = segmentRecoverySeconds(seg);
            const intensity = Math.min(100, Math.round((360 / seg.targetPacePerKmSeconds) * 100));
            return (
              <div key={seg.id} className="rounded-lg border border-border p-4 space-y-3">
                <p className="text-sm font-medium">{seg.label}</p>
                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-runner-green to-electric-cyan transition-all"
                    style={{ width: `${intensity}%` }}
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-4">
                  <Field label="Reps" value={seg.reps} onChange={(v) => updateSegment(seg.id, { reps: v })} />
                  <Field label="Distance (m)" value={seg.distanceMeters} onChange={(v) => updateSegment(seg.id, { distanceMeters: v })} />
                  <Field label="Pace sec/km" value={seg.targetPacePerKmSeconds} onChange={(v) => updateSegment(seg.id, { targetPacePerKmSeconds: v })} />
                  <Field label="Recovery (s)" value={seg.recoverySeconds} onChange={(v) => updateSegment(seg.id, { recoverySeconds: v })} />
                </div>
                <p className="text-xs text-muted">
                  Work {formatSeconds(work)} · Recovery {formatSeconds(rec)}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <p className="text-sm">
            Estimated session: <span className="font-mono text-runner-green">{formatSeconds(totalSec, totalSec >= 3600)}</span>
          </p>
          <Button
            type="button"
            variant="cyan"
            onClick={() =>
              saveVaultItem({ type: "interval", title: workout.name, payload: workout })
            }
          >
            Save to Vault
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
      />
    </div>
  );
}
