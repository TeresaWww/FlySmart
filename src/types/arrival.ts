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
  destination: '',
  travelers: 1,
}
