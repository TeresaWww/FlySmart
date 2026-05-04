import type { ArrivalFormState } from './arrival'

export type TransportOptionId =
  | 'rideshare'
  | 'link'
  | 'bus'
  | 'taxi'
  | 'rental'
  | 'shuttle'

export type TransportCompareMetrics = {
  totalMin: number
  costLowUsd: number
  costHighUsd: number
  /** Walking time to reach pickup point / station (minutes). */
  walkToPickupMin: number
  /** Wait time at pickup / headway (minutes). */
  pickupWaitMin: number
  /** In-vehicle time (minutes). */
  rideMin: number
}

export type TransportCompareOption = {
  id: TransportOptionId
  metrics: TransportCompareMetrics
}

export type RecommendationBadge = 'best_convenience' | 'lowest_cost'

export type TransportRecommendation = {
  /** 2–3 options to compare. */
  options: TransportCompareOption[]
  /** Optional short labels to highlight. */
  badges?: Partial<Record<TransportOptionId, RecommendationBadge[]>>
  /** Server can return its own messaging later; for now we keep UI minimal. */
  source: 'mock' | 'backend'
}

export type RecommendationRequest = {
  form: ArrivalFormState
}

