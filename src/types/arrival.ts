export type FlightScope = 'domestic' | 'international'

/** International only: U.S. citizen vs non-citizen traveler. */
export type IntlTravelerSegment = 'citizen' | 'non_citizen'

/** Age buckets for Link / bus one-way fare totals. */
export type TransitFareParty = {
  adults: number
  youth: number
  seniors: number
}

export const defaultFareParty: TransitFareParty = {
  adults: 1,
  youth: 0,
  seniors: 0,
}

export function sumFareParty(party: TransitFareParty): number {
  return party.adults + party.youth + party.seniors
}

export function usesTransitFareParty(transport: string): boolean {
  return transport === 'link' || transport === 'bus'
}

export type ArrivalFormState = {
  flightScope: FlightScope
  intlTravelerSegment: IntlTravelerSegment
  /** International: participates in Global Entry / NEXUS / SENTRI etc. */
  trustedTravelerProgram: boolean
  /** If false, directions skip baggage-claim time (carry-on only). */
  checkedBaggage: boolean
  gate: string
  transport: string
  /** 2–3 transports to compare side-by-side. */
  compareTransports: string[]
  /** If true, show short "best for" badges (heuristic for now). */
  recommendationMode: boolean
  destination: string
  travelers: number
  /** Link / bus only — synced to sum of adults + youth + seniors. */
  fareParty: TransitFareParty
}

export const defaultFormState: ArrivalFormState = {
  flightScope: 'domestic',
  intlTravelerSegment: 'citizen',
  trustedTravelerProgram: false,
  checkedBaggage: true,
  gate: '',
  transport: '',
  compareTransports: ['rideshare', 'link', 'taxi'],
  recommendationMode: true,
  destination: '',
  travelers: 1,
  fareParty: { ...defaultFareParty },
}
