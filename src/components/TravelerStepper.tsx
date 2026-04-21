import { Minus, Plus } from 'lucide-react'
import { useI18n } from '../i18n/useI18n'

type TravelerStepperProps = {
  value: number
  min?: number
  max?: number
  onChange: (n: number) => void
}

export function TravelerStepper({
  value,
  min = 1,
  max = 12,
  onChange,
}: TravelerStepperProps) {
  const { t } = useI18n()
  const dec = () => onChange(Math.max(min, value - 1))
  const inc = () => onChange(Math.min(max, value + 1))

  return (
    <div className="space-y-2">
      <p className="text-center text-sm font-semibold text-slate-800">{t('trav_label')}</p>
      <div className="mx-auto flex max-w-xs items-stretch overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-100">
        <button
          type="button"
          onClick={dec}
          disabled={value <= min}
          className="flex min-h-12 min-w-14 touch-manipulation items-center justify-center text-slate-700 transition enabled:hover:bg-slate-50 enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={t('trav_minus')}
        >
          <Minus className="h-5 w-5" strokeWidth={2.5} />
        </button>
        <div className="flex min-w-[4.5rem] flex-1 items-center justify-center border-x border-slate-200 bg-slate-50/60">
          <span className="text-lg font-bold tabular-nums text-slate-900">
            {value}
          </span>
        </div>
        <button
          type="button"
          onClick={inc}
          disabled={value >= max}
          className="flex min-h-12 min-w-14 touch-manipulation items-center justify-center text-slate-700 transition enabled:hover:bg-slate-50 enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={t('trav_plus')}
        >
          <Plus className="h-5 w-5" strokeWidth={2.5} />
        </button>
      </div>
      <p className="text-center text-[11px] text-slate-500">
        {t('trav_range', { min, max })}
      </p>
    </div>
  )
}
