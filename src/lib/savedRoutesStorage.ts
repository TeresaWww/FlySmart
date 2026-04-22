import { defaultFormState, type ArrivalFormState } from '../types/arrival'

const STORAGE_KEY = 'flysmart-saved-routes-v1'
const MAX_ROUTES = 25

export type SavedRouteEntry = {
  id: string
  savedAt: number
  form: ArrivalFormState
}

export function normalizeArrivalForm(raw: unknown): ArrivalFormState {
  if (!raw || typeof raw !== 'object') return { ...defaultFormState }
  const o = raw as Record<string, unknown>
  const travelers = typeof o.travelers === 'number' ? Math.min(12, Math.max(1, Math.round(o.travelers))) : 1
  return {
    ...defaultFormState,
    flightScope: o.flightScope === 'international' ? 'international' : 'domestic',
    intlTravelerSegment: o.intlTravelerSegment === 'non_citizen' ? 'non_citizen' : 'citizen',
    trustedTravelerProgram: Boolean(o.trustedTravelerProgram),
    checkedBaggage: o.checkedBaggage === false ? false : true,
    gate: typeof o.gate === 'string' ? o.gate : '',
    transport: typeof o.transport === 'string' ? o.transport : '',
    destination: typeof o.destination === 'string' ? o.destination : '',
    travelers,
  }
}

export function loadSavedRoutes(): SavedRouteEntry[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed
      .map((row): SavedRouteEntry | null => {
        if (!row || typeof row !== 'object') return null
        const r = row as Record<string, unknown>
        const id = typeof r.id === 'string' ? r.id : crypto.randomUUID()
        const savedAt = typeof r.savedAt === 'number' ? r.savedAt : Date.now()
        const form = normalizeArrivalForm(r.form)
        return { id, savedAt, form }
      })
      .filter((x): x is SavedRouteEntry => x !== null)
  } catch {
    return []
  }
}

export function saveRouteSnapshot(form: ArrivalFormState): void {
  const entry: SavedRouteEntry = {
    id: crypto.randomUUID(),
    savedAt: Date.now(),
    form: normalizeArrivalForm(form),
  }
  const next = [entry, ...loadSavedRoutes()].slice(0, MAX_ROUTES)
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    /* quota or private mode */
  }
}
