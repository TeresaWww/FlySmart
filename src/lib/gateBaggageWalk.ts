import { findGateGroup } from '../data/seaTacGates'
import type { FlightScope } from '../types/arrival'

function spread(seed: number, salt: number, lo: number, hi: number): number {
  const x = Math.imul(seed ^ salt, 1597334677) >>> 0
  return lo + (x % (hi - lo + 1))
}

/**
 * If the gate is in a known concourse band, minutes to Baggage Claim (deterministic in-band).
 * Otherwise return null and callers keep a mock estimate.
 */
export function walkMinutesToBaggageClaim(
  gate: string,
  flightScope: FlightScope,
  seed: number,
): { lineMin: number; miles: number; timeMin: number; timeMax: number; instruction: string } | null {
  const g = findGateGroup(gate, flightScope)
  if (!g) return null
  const raw = g.timeMin + (spread(seed, 20, 0, 1000) / 1000) * (g.timeMax - g.timeMin)
  const lineMin = Math.max(1, Math.round(raw))
  const miles = Math.round((lineMin / 20) * 10) / 10
  return { lineMin, miles, timeMin: g.timeMin, timeMax: g.timeMax, instruction: g.instruction }
}
