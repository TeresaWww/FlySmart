/** One-way estimated vehicle fare from Sea-Tac by destination catalog id. */
export type VehicleFareRange = {
  rideshareLow: number
  rideshareHigh: number
  taxiLow: number
  taxiHigh: number
}

const DEFAULT_FARE: VehicleFareRange = {
  rideshareLow: 45,
  rideshareHigh: 70,
  taxiLow: 50,
  taxiHigh: 65,
}

/** Keys match `DestinationCatalogEntry.id` in `destinationsCatalog.ts`. */
export const DESTINATION_VEHICLE_FARES: Readonly<Record<string, VehicleFareRange>> = {
  seattle: { rideshareLow: 45, rideshareHigh: 70, taxiLow: 50, taxiHigh: 65 },
  downtown: { rideshareLow: 45, rideshareHigh: 70, taxiLow: 50, taxiHigh: 65 },
  bellevue: { rideshareLow: 55, rideshareHigh: 80, taxiLow: 60, taxiHigh: 75 },
  tacoma: { rideshareLow: 70, rideshareHigh: 110, taxiLow: 85, taxiHigh: 110 },
  kirkland: { rideshareLow: 55, rideshareHigh: 85, taxiLow: 60, taxiHigh: 80 },
  redmond: { rideshareLow: 65, rideshareHigh: 95, taxiLow: 70, taxiHigh: 90 },
  sammamish: { rideshareLow: 75, rideshareHigh: 105, taxiLow: 80, taxiHigh: 100 },
  bothell: { rideshareLow: 65, rideshareHigh: 95, taxiLow: 70, taxiHigh: 90 },
  issaquah: { rideshareLow: 60, rideshareHigh: 90, taxiLow: 65, taxiHigh: 85 },
  mercer_island: { rideshareLow: 45, rideshareHigh: 70, taxiLow: 50, taxiHigh: 70 },
  woodinville: { rideshareLow: 70, rideshareHigh: 100, taxiLow: 75, taxiHigh: 95 },
  newcastle: { rideshareLow: 50, rideshareHigh: 80, taxiLow: 55, taxiHigh: 75 },
  everett: { rideshareLow: 90, rideshareHigh: 130, taxiLow: 100, taxiHigh: 125 },
  shoreline: { rideshareLow: 55, rideshareHigh: 80, taxiLow: 60, taxiHigh: 80 },
  lynnwood: { rideshareLow: 70, rideshareHigh: 100, taxiLow: 75, taxiHigh: 95 },
  edmonds: { rideshareLow: 75, rideshareHigh: 105, taxiLow: 80, taxiHigh: 100 },
  mountlake_terrace: { rideshareLow: 65, rideshareHigh: 95, taxiLow: 70, taxiHigh: 90 },
  mukilteo: { rideshareLow: 85, rideshareHigh: 120, taxiLow: 95, taxiHigh: 115 },
  kent: { rideshareLow: 30, rideshareHigh: 50, taxiLow: 35, taxiHigh: 50 },
  renton: { rideshareLow: 35, rideshareHigh: 55, taxiLow: 40, taxiHigh: 60 },
  auburn: { rideshareLow: 45, rideshareHigh: 70, taxiLow: 50, taxiHigh: 70 },
  federal_way: { rideshareLow: 40, rideshareHigh: 65, taxiLow: 45, taxiHigh: 65 },
  burien: { rideshareLow: 20, rideshareHigh: 35, taxiLow: 25, taxiHigh: 40 },
  tukwila: { rideshareLow: 15, rideshareHigh: 30, taxiLow: 20, taxiHigh: 35 },
  maple_valley: { rideshareLow: 60, rideshareHigh: 90, taxiLow: 65, taxiHigh: 85 },
  puyallup: { rideshareLow: 65, rideshareHigh: 100, taxiLow: 75, taxiHigh: 95 },
  cruise: { rideshareLow: 50, rideshareHigh: 75, taxiLow: 55, taxiHigh: 75 },
  north: { rideshareLow: 55, rideshareHigh: 85, taxiLow: 60, taxiHigh: 85 },
  south: { rideshareLow: 25, rideshareHigh: 50, taxiLow: 30, taxiHigh: 50 },
  udistrict: { rideshareLow: 40, rideshareHigh: 65, taxiLow: 45, taxiHigh: 60 },
}

export function vehicleFareForDestination(
  destinationId: string,
  transport: 'rideshare' | 'taxi',
): { priceLow: number; priceHigh: number } {
  const row = DESTINATION_VEHICLE_FARES[destinationId.trim()] ?? DEFAULT_FARE
  if (transport === 'rideshare') {
    return { priceLow: row.rideshareLow, priceHigh: row.rideshareHigh }
  }
  return { priceLow: row.taxiLow, priceHigh: row.taxiHigh }
}
