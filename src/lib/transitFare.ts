import type { TransitFareParty } from '../types/arrival'
import { usesTransitFareParty } from '../types/arrival'

export const LINK_FARE_RATES = {
  adult: 3,
  youth: 0,
  senior: 1,
} as const

/** Regional bus / streetcar single-ride tiers (estimate uses party buckets). */
export const BUS_FARE_RATES = {
  adult: 3,
  youth: 0,
  senior: 1,
} as const

export function transitFareTotalUsd(transport: string, party: TransitFareParty): number | null {
  if (!usesTransitFareParty(transport)) return null
  const rates = transport === 'link' ? LINK_FARE_RATES : BUS_FARE_RATES
  return (
    party.adults * rates.adult +
    party.youth * rates.youth +
    party.seniors * rates.senior
  )
}

export function formatTransitFareUsd(amount: number): string {
  return amount.toFixed(2)
}
