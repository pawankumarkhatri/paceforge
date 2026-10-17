export function secondsToHms(totalSeconds: number): { h: number; m: number; s: number } {
  const total = Math.max(0, Math.round(totalSeconds));
  return {
    h: Math.floor(total / 3600),
    m: Math.floor((total % 3600) / 60),
    s: total % 60,
  };
}

export function hmsToSeconds(h: number, m: number, s: number): number | null {
  if (h < 0 || m < 0 || s < 0 || m >= 60 || s >= 60) return null;
  return h * 3600 + m * 60 + s;
}

/** Build display string from parts (omits hours when zero unless forceHours). */
export function formatHmsParts(
  h: number,
  m: number,
  s: number,
  forceHours = false,
): string {
  const pad = (n: number) => n.toString().padStart(2, "0");
  if (h > 0 || forceHours) return `${h}:${pad(m)}:${pad(s)}`;
  return `${m}:${pad(s)}`;
}

/** Parse "m:ss", "mm:ss", or "h:mm:ss" into total seconds */
export function parseTimeToSeconds(input: string): number | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const parts = trimmed.split(":").map((p) => p.trim());
  if (parts.some((p) => p === "" || Number.isNaN(Number(p)))) return null;
  if (parts.length === 1) {
    const sec = Number(parts[0]);
    return sec >= 0 ? sec : null;
  }
  if (parts.length === 2) {
    const [m, s] = parts.map(Number);
    if (m < 0 || s < 0 || s >= 60) return null;
    return m * 60 + s;
  }
  if (parts.length === 3) {
    const [h, m, s] = parts.map(Number);
    if (h < 0 || m < 0 || s < 0 || m >= 60 || s >= 60) return null;
    return h * 3600 + m * 60 + s;
  }
  return null;
}

export function formatSeconds(totalSeconds: number, withHours = false): string {
  const s = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  if (withHours || h > 0) return `${h}:${pad(m)}:${pad(sec)}`;
  return `${m}:${pad(sec)}`;
}

export function formatPacePerKm(secondsPerKm: number): string {
  if (!Number.isFinite(secondsPerKm) || secondsPerKm <= 0) return "—";
  return formatSeconds(secondsPerKm);
}

export function formatPacePerMile(secondsPerMile: number): string {
  if (!Number.isFinite(secondsPerMile) || secondsPerMile <= 0) return "—";
  return formatSeconds(secondsPerMile);
}

const KM_PER_MILE = 1.609344;

export function kmToMile(km: number): number {
  return km / KM_PER_MILE;
}

export function mileToKm(mile: number): number {
  return mile * KM_PER_MILE;
}
