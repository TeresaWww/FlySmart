import { Minus, Plus } from 'lucide-react'
import type { TransitFareParty } from '../types/arrival'
import { sumFareParty } from '../types/arrival'
import { useI18n } from '../i18n/useI18n'

const MAX_PARTY = 12

type RowKey = keyof TransitFareParty

type TransitFarePartyInputsProps = {
  value: TransitFareParty
  onChange: (party: TransitFareParty, totalTravelers: number) => void
}

const rows: { key: RowKey; labelKey: 'trav_fare_adults' | 'trav_fare_youth' | 'trav_fare_seniors' }[] = [
  { key: 'adults', labelKey: 'trav_fare_adults' },
  { key: 'youth', labelKey: 'trav_fare_youth' },
  { key: 'seniors', labelKey: 'trav_fare_seniors' },
]

function FarePartyRow({
  label,
  value,
  canDec,
  canInc,
  onDec,
  onInc,
  decLabel,
  incLabel,
}: {
  label: string
  value: number
  canDec: boolean
  canInc: boolean
  onDec: () => void
  onInc: () => void
  decLabel: string
  incLabel: string
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm ring-1 ring-slate-100">
      <p className="min-w-0 flex-1 text-left text-sm font-medium leading-snug text-slate-800">{label}</p>
      <div className="flex shrink-0 items-stretch overflow-hidden rounded-xl border border-slate-200 bg-slate-50/60">
        <button
          type="button"
          onClick={onDec}
          disabled={!canDec}
          className="flex min-h-10 min-w-11 touch-manipulation items-center justify-center text-slate-700 transition enabled:hover:bg-white enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={decLabel}
        >
          <Minus className="h-4 w-4" strokeWidth={2.5} aria-hidden />
        </button>
        <div className="flex min-w-[2.75rem] items-center justify-center border-x border-slate-200 bg-white px-1">
          <span className="text-base font-bold tabular-nums text-slate-900">{value}</span>
        </div>
        <button
          type="button"
          onClick={onInc}
          disabled={!canInc}
          className="flex min-h-10 min-w-11 touch-manipulation items-center justify-center text-slate-700 transition enabled:hover:bg-white enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={incLabel}
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} aria-hidden />
        </button>
      </div>
    </div>
  )
}

export function TransitFarePartyInputs({ value, onChange }: TransitFarePartyInputsProps) {
  const { t } = useI18n()
  const total = sumFareParty(value)

  const bump = (key: RowKey, delta: number) => {
    const next = { ...value, [key]: value[key] + delta }
    const nextTotal = sumFareParty(next)
    if (nextTotal < 1 || nextTotal > MAX_PARTY || next[key] < 0) return
    onChange(next, nextTotal)
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch sm:justify-between">
      <div className="min-w-0 flex-1 space-y-2">
        <p className="text-center text-sm font-semibold text-slate-800 sm:text-left">{t('trav_fare_section')}</p>
        {rows.map(({ key, labelKey }) => (
          <FarePartyRow
            key={key}
            label={t(labelKey)}
            value={value[key]}
            canDec={value[key] > 0 && total > 1}
            canInc={total < MAX_PARTY}
            onDec={() => bump(key, -1)}
            onInc={() => bump(key, 1)}
            decLabel={t('trav_minus')}
            incLabel={t('trav_plus')}
          />
        ))}
        <p className="text-center text-[11px] text-slate-500 sm:text-left">{t('trav_range', { min: 1, max: MAX_PARTY })}</p>
      </div>

      <div
        className="flex shrink-0 flex-col items-center justify-center rounded-2xl border border-sky-200 bg-sky-50/80 px-5 py-4 text-center shadow-sm ring-1 ring-sky-100 sm:min-w-[8.5rem]"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="text-[11px] font-semibold uppercase tracking-wide text-sky-800">{t('trav_fare_total_label')}</p>
        <p className="mt-1 text-3xl font-bold tabular-nums text-[rgb(2,20,50)]">{total}</p>
        <p className="mt-0.5 text-xs text-slate-600">{t('trav_label')}</p>
      </div>
    </div>
  )
}
