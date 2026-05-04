import type { ArrivalFormState } from '../types/arrival'
import type { RecommendationRequest, TransportRecommendation } from '../types/recommendation'
import { createApiClient } from './apiClient'

/**
 * Backend contract stub.
 * We'll implement the real service later; frontend can call this now.
 */
export async function fetchTransportRecommendations(form: ArrivalFormState): Promise<TransportRecommendation> {
  const api = createApiClient()
  const req: RecommendationRequest = { form }
  return await api.post<TransportRecommendation>('/api/recommendations/transport', req)
}

export type CustomsWaitResponse = {
  customsWaitMin: number
  source: 'mock' | 'backend'
}

export async function fetchCustomsWait(form: ArrivalFormState): Promise<CustomsWaitResponse> {
  const api = createApiClient()
  return await api.post<CustomsWaitResponse>('/api/recommendations/customs-wait', { form })
}

