export type FlightScope = 'domestic' | 'international'

/** International only: U.S. citizen vs non-citizen traveler. */
export type IntlTravelerSegment = 'citizen' | 'non_citizen'

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
}
