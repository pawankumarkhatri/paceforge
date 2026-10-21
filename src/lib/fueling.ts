export type FuelTypeId =
  | "energy_gel"
  | "isotonic_gel"
  | "chews"
  | "drink_mix"
  | "banana"
  | "dates"
  | "rice_balls"
  | "potato";

export interface FuelType {
  id: FuelTypeId;
  label: string;
  shortLabel: string;
  carbsPerServingG: number;
  servingDescription: string;
  /** Extra hydration hint appended to course markers */
  hydrationNote: string;
}

export const FUEL_TYPES: FuelType[] = [
  {
    id: "energy_gel",
    label: "Energy gel",
    shortLabel: "Gel",
    carbsPerServingG: 25,
    servingDescription: "1 standard gel sachet",
    hydrationNote: "Sip 150–200 ml water after each gel.",
  },
  {
    id: "isotonic_gel",
    label: "Isotonic gel",
    shortLabel: "Iso gel",
    carbsPerServingG: 22,
    servingDescription: "1 isotonic gel (lighter, more fluid)",
    hydrationNote: "Still drink water at stations; less chase needed than thick gels.",
  },
  {
    id: "chews",
    label: "Energy chews",
    shortLabel: "Chews",
    carbsPerServingG: 24,
    servingDescription: "1 pack / 4 chews",
    hydrationNote: "Wash down with 100–150 ml water.",
  },
  {
    id: "drink_mix",
    label: "Sports drink (on course)",
    shortLabel: "Drink",
    carbsPerServingG: 14,
    servingDescription: "~500 ml bottle/cup of carb drink",
    hydrationNote: "Alternate carb drink with plain water if the course is hot.",
  },
  {
    id: "banana",
    label: "Banana (aid station)",
    shortLabel: "Banana",
    carbsPerServingG: 27,
    servingDescription: "1 medium banana",
    hydrationNote: "Pair with water; easy on the stomach for many runners.",
  },
  {
    id: "dates",
    label: "Dates",
    shortLabel: "Dates",
    carbsPerServingG: 36,
    servingDescription: "2 medjool dates (pocket or station)",
    hydrationNote: "Natural sugars — carry in a zip bag or use at stations.",
  },
  {
    id: "rice_balls",
    label: "Rice balls / onigiri",
    shortLabel: "Rice",
    carbsPerServingG: 30,
    servingDescription: "1 small rice ball",
    hydrationNote: "Common at ultras; practice on long runs first.",
  },
  {
    id: "potato",
    label: "Boiled potato + salt",
    shortLabel: "Potato",
    carbsPerServingG: 26,
    servingDescription: "1 small salted potato half",
    hydrationNote: "Solid fuel — best for marathon+; chew slowly and hydrate.",
  },
];

export function getFuelType(id: FuelTypeId): FuelType {
  return FUEL_TYPES.find((f) => f.id === id) ?? FUEL_TYPES[0];
}

export interface FuelingInputs {
  bodyWeightKg: number;
  raceDurationHours: number;
  distanceKm: number;
  tempC: number;
  humidityPercent: number;
  fuelTypeId: FuelTypeId;
}

export interface FuelingPlan {
  fuelType: FuelType;
  carbsPerHourG: number;
  fluidLossMlPerHour: number;
  totalFluidLossMl: number;
  carbsPerServingG: number;
  servingsPerHour: number;
  fuelIntervalKm: number;
  fuelIntervalMin: number;
  hydrationMarkers: { km: number; elapsedMin: number; action: string }[];
}

function formatServingAction(fuel: FuelType, index: number): string {
  const n = index;
  switch (fuel.id) {
    case "energy_gel":
    case "isotonic_gel":
      return `${fuel.shortLabel} #${n} — ${fuel.servingDescription} (~${fuel.carbsPerServingG}g carbs). ${fuel.hydrationNote}`;
    case "chews":
      return `Chews #${n} — ${fuel.servingDescription} (~${fuel.carbsPerServingG}g). ${fuel.hydrationNote}`;
    case "drink_mix":
      return `Fuel stop #${n} — ${fuel.servingDescription} (~${fuel.carbsPerServingG}g carbs). ${fuel.hydrationNote}`;
    case "banana":
      return `Aid station #${n} — ${fuel.servingDescription} (~${fuel.carbsPerServingG}g). ${fuel.hydrationNote}`;
    case "dates":
      return `Fuel #${n} — ${fuel.servingDescription} (~${fuel.carbsPerServingG}g per serving). ${fuel.hydrationNote}`;
    default:
      return `Fuel #${n} — ${fuel.servingDescription} (~${fuel.carbsPerServingG}g). ${fuel.hydrationNote}`;
  }
}

export function buildFuelingPlan(input: FuelingInputs): FuelingPlan {
  const { bodyWeightKg, raceDurationHours, distanceKm, tempC, humidityPercent, fuelTypeId } = input;
  const fuel = getFuelType(fuelTypeId);

  const heatFactor = 1 + Math.max(0, tempC - 15) * 0.02 + Math.max(0, humidityPercent - 50) * 0.003;
  const carbsPerHourG = raceDurationHours > 2 ? 60 : raceDurationHours > 1 ? 45 : 30;
  const sweatRateMlHr = (bodyWeightKg * 12 + tempC * 8) * heatFactor;
  const totalFluidLossMl = sweatRateMlHr * raceDurationHours;

  const paceMinPerKm = (raceDurationHours * 60) / distanceKm;
  const speedKmPerHour = distanceKm / raceDurationHours;

  const carbsPerServingG = fuel.carbsPerServingG;
  const servingsPerHour = carbsPerHourG / carbsPerServingG;
  const fuelIntervalHours = carbsPerServingG / carbsPerHourG;
  let fuelIntervalKm = fuelIntervalHours * speedKmPerHour;

  // Keep markers practical on course (aid stations ~every 3–8 km).
  if (fuel.id === "drink_mix") {
    fuelIntervalKm = Math.min(6, Math.max(4, fuelIntervalKm));
  } else if (fuel.id === "banana" || fuel.id === "potato" || fuel.id === "rice_balls") {
    fuelIntervalKm = Math.min(10, Math.max(6, fuelIntervalKm));
  } else {
    fuelIntervalKm = Math.min(8, Math.max(3.5, fuelIntervalKm));
  }

  const fuelIntervalMin = fuelIntervalKm * paceMinPerKm;

  const markers: FuelingPlan["hydrationMarkers"] = [];
  let km = fuelIntervalKm;
  let serving = 1;
  while (km < distanceKm - 0.5) {
    const elapsedMin = km * paceMinPerKm;
    markers.push({
      km: Math.round(km * 10) / 10,
      elapsedMin: Math.round(elapsedMin),
      action: formatServingAction(fuel, serving),
    });
    km += fuelIntervalKm;
    serving++;
  }

  markers.push({
    km: Math.round(distanceKm * 10) / 10,
    elapsedMin: Math.round(raceDurationHours * 60),
    action: "Finish — rehydrate, protein + carbs within 30–60 min.",
  });

  return {
    fuelType: fuel,
    carbsPerHourG,
    fluidLossMlPerHour: Math.round(sweatRateMlHr),
    totalFluidLossMl: Math.round(totalFluidLossMl),
    carbsPerServingG,
    servingsPerHour: Math.round(servingsPerHour * 10) / 10,
    fuelIntervalKm: Math.round(fuelIntervalKm * 10) / 10,
    fuelIntervalMin: Math.round(fuelIntervalMin),
    hydrationMarkers: markers,
  };
}
