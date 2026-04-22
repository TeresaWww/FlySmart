import type { FlightScope } from '../types/arrival'

/** Sea-Tac gate bands; walking time is minutes to reach Baggage Claim. */
export type GateGroup = {
  range: string
  instruction: string
  timeMin: number
  timeMax: number
}

export const gateGroups: GateGroup[] = [
  { range: 'A1–A3', instruction: 'Follow signs for "Baggage Claim"', timeMin: 2.5, timeMax: 4 },
  { range: 'A4–A5', instruction: 'Follow signs for "Baggage Claim"', timeMin: 4, timeMax: 6 },
  { range: 'A6–A8', instruction: 'Follow signs for "Baggage Claim"', timeMin: 5, timeMax: 7.5 },
  { range: 'A8–A10', instruction: 'Follow signs for "Baggage Claim"', timeMin: 5.5, timeMax: 7.5 },
  { range: 'A11–A21', instruction: 'Follow signs for "Baggage Claim"', timeMin: 7.5, timeMax: 10.5 },
  { range: 'B1–B3', instruction: 'Follow signs for "Baggage Claim"', timeMin: 2, timeMax: 3.5 },
  { range: 'B5–B9', instruction: 'Follow signs for "Baggage Claim"', timeMin: 3, timeMax: 4.5 },
  { range: 'B10–B12', instruction: 'Follow signs for "Baggage Claim"', timeMin: 4, timeMax: 6 },
  { range: 'B14–B15', instruction: 'Follow signs for "Baggage Claim"', timeMin: 4, timeMax: 6 },
  { range: 'B20–B21', instruction: 'Follow signs for "Baggage Claim"', timeMin: 4.5, timeMax: 6.5 },
  { range: 'C1–C10', instruction: 'Follow signs for "Baggage Claim"', timeMin: 4.5, timeMax: 6.5 },
  { range: 'C11–C20', instruction: 'Follow signs for "Baggage Claim"', timeMin: 6, timeMax: 8 },
  { range: 'D1–D2', instruction: 'Follow signs for "Baggage Claim"', timeMin: 3, timeMax: 4.5 },
  { range: 'D3–D5', instruction: 'Follow signs for "Baggage Claim"', timeMin: 4.5, timeMax: 7 },
  { range: 'D6–D11', instruction: 'Follow signs for "Baggage Claim"', timeMin: 6.5, timeMax: 8 },
  { range: 'D21–D26', instruction: 'Follow signs for "Baggage Claim"', timeMin: 6, timeMax: 8.5 },
  { range: 'N1–10', instruction: 'Take the airport train, and follow signs for "Baggage Claim" at all times', timeMin: 9, timeMax: 11 },
  { range: 'N11–20', instruction: 'Take the airport train, and follow signs for "Baggage Claim" at all times', timeMin: 8.5, timeMax: 10.5 },
  { range: 'S1–S9 Domestic Arrival', instruction: 'Take the airport train, and follow signs for "Baggage Claim" at all times', timeMin: 8, timeMax: 10.5 },
  { range: 'S10–S16 Domestic Arrival', instruction: 'Take the airport train, and follow signs for "Baggage Claim" at all times', timeMin: 7, timeMax: 9.5 },
  { range: 'S1–S9 International Arrival', instruction: 'Follow the "Baggage Claim" signs and cross the skybridge to reach the baggage claim area.', timeMin: 6, timeMax: 8.5 },
  { range: 'S10–S16 International Arrival', instruction: 'Follow the "Baggage Claim" signs and cross the skybridge to reach the baggage claim area.', timeMin: 6, timeMax: 8.5 },
]

function normRangeKey(s: string): string {
  return s.trim().replace(/[\u2013\u2014-]/g, '\u2013')
}

/** S or non-S clusters that apply for domestic vs international. */
function gateGroupAppliesToScope(g: GateGroup, scope: FlightScope): boolean {
  if (g.range.includes('Domestic Arrival')) return scope === 'domestic'
  if (g.range.includes('International Arrival')) return scope === 'international'
  return true
}

/**
 * The ~20 gate-area choices in UI order: one per band (not individual gates). S-bands
 * are filtered by domestic vs international.
 */
export function activeGateClusters(flightScope: FlightScope): readonly GateGroup[] {
  return gateGroups.filter((g) => gateGroupAppliesToScope(g, flightScope))
}

/**
 * Resolves a stored `form.gate` value: cluster range (e.g. A1–A3) or legacy single gate (A1).
 */
export function findGateGroup(gate: string, flightScope: FlightScope): GateGroup | null {
  const t = gate.trim()
  if (!t) return null
  const nk = normRangeKey(t)
  for (const g of gateGroups) {
    if (normRangeKey(g.range) === nk) {
      if (!gateGroupAppliesToScope(g, flightScope)) return null
      return g
    }
  }
  const p = parseArrivalGateCode(t)
  if (!p) return null
  const { concourse, num } = p
  for (const row of gateGroups) {
    if (rowMatchesGroup(row, concourse, num, flightScope)) return row
  }
  return null
}

function parseArrivalGateCode(gate: string): { concourse: string; num: number } | null {
  const m = gate.trim().toUpperCase().match(/^([A-Z])(\d+)$/)
  if (!m) return null
  return { concourse: m[1], num: parseInt(m[2], 10) }
}

/** Core range after stripping arrival qualifiers, e.g. A1–A3 or N1–10. */
function parseRangeBounds(
  range: string,
):
  | { c: string; lo: number; hi: number; domesticOnly: boolean; intlOnly: boolean }
  | null {
  const domesticOnly = range.includes('Domestic Arrival')
  const intlOnly = range.includes('International Arrival')
  const core = range
    .replace(/\s*Domestic Arrival.*$/i, '')
    .replace(/\s*International Arrival.*$/i, '')
    .trim()
  const m = core.match(/^([A-Z])(\d+)[-–](?:([A-Z])(\d+)|(\d+))$/i)
  if (!m) return null
  const c = m[1].toUpperCase()
  const lo = parseInt(m[2], 10)
  let hi: number
  if (m[3] !== undefined) {
    if (m[3].toUpperCase() !== c) return null
    hi = parseInt(m[4], 10)
  } else {
    hi = parseInt(m[5], 10)
  }
  return { c, lo, hi, domesticOnly, intlOnly }
}

function rowMatchesGroup(row: GateGroup, c: string, n: number, scope: FlightScope): boolean {
  const b = parseRangeBounds(row.range)
  if (!b) return false
  if (b.domesticOnly && scope !== 'domestic') return false
  if (b.intlOnly && scope !== 'international') return false
  if (c !== b.c) return false
  return n >= b.lo && n <= b.hi
}
