export interface FuelingInputs {
  bodyWeightKg: number;
  raceDurationHours: number;
  distanceKm: number;
  tempC: number;
  humidityPercent: number;
}

export interface FuelingPlan {
  carbsPerHourG: number;
  fluidLossMlPerHour: number;
  totalFluidLossMl: number;
  gelIntervalKm: number;
  gelIntervalMin: number;
  hydrationMarkers: { km: number; elapsedMin: number; action: string }[];
}

export function buildFuelingPlan(input: FuelingInputs): FuelingPlan {
  const { bodyWeightKg, raceDurationHours, distanceKm, tempC, humidityPercent } = input;
  const heatFactor = 1 + Math.max(0, tempC - 15) * 0.02 + Math.max(0, humidityPercent - 50) * 0.003;
  const carbsPerHourG = raceDurationHours > 2 ? 60 : raceDurationHours > 1 ? 45 : 30;
  const sweatRateMlHr = (bodyWeightKg * 12 + tempC * 8) * heatFactor;
  const totalFluidLossMl = sweatRateMlHr * raceDurationHours;

  const paceMinPerKm = (raceDurationHours * 60) / distanceKm;
  const gelIntervalKm = Math.min(8, Math.max(4, paceMinPerKm * 0.9));
  const gelIntervalMin = gelIntervalKm * paceMinPerKm;

  const markers: FuelingPlan["hydrationMarkers"] = [];
  let km = gelIntervalKm;
  let gel = 1;
  while (km < distanceKm) {
    const elapsedMin = km * paceMinPerKm;
    markers.push({
      km: Math.round(km * 10) / 10,
      elapsedMin: Math.round(elapsedMin),
      action: `Gel #${gel} (~25g carbs) + sip 150–200ml`,
    });
    km += gelIntervalKm;
    gel++;
  }
  markers.push({
    km: distanceKm,
    elapsedMin: Math.round(raceDurationHours * 60),
    action: "Finish — rehydrate & recover",
  });

  return {
    carbsPerHourG,
    fluidLossMlPerHour: Math.round(sweatRateMlHr),
    totalFluidLossMl: Math.round(totalFluidLossMl),
    gelIntervalKm: Math.round(gelIntervalKm * 10) / 10,
    gelIntervalMin: Math.round(gelIntervalMin),
    hydrationMarkers: markers,
  };
}
