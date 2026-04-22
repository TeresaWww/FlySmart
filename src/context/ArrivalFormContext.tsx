import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { defaultFormState, type ArrivalFormState } from '../types/arrival'
import { normalizeArrivalForm } from '../lib/savedRoutesStorage'

const DRAFT_KEY = 'flysmart-arrival-draft-v1'

type ArrivalFormContextValue = {
  form: ArrivalFormState
  setForm: React.Dispatch<React.SetStateAction<ArrivalFormState>>
}

const ArrivalFormContext = createContext<ArrivalFormContextValue | null>(null)

function readDraft(): ArrivalFormState {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY)
    if (!raw) return { ...defaultFormState }
    return normalizeArrivalForm(JSON.parse(raw))
  } catch {
    return { ...defaultFormState }
  }
}

export function ArrivalFormProvider({ children }: { children: ReactNode }) {
  const [form, setForm] = useState<ArrivalFormState>(() => readDraft())

  useEffect(() => {
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(form))
    } catch {
      /* ignore */
    }
  }, [form])

  const value = useMemo(() => ({ form, setForm }), [form])

  return <ArrivalFormContext.Provider value={value}>{children}</ArrivalFormContext.Provider>
}

export function useArrivalForm() {
  const ctx = useContext(ArrivalFormContext)
  if (!ctx) {
    throw new Error('useArrivalForm must be used within ArrivalFormProvider')
  }
  return ctx
}
