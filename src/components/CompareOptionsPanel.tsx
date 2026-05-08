import { useEffect, useMemo } from 'react'
import { Clock, DollarSign, Footprints, X } from 'lucide-react'
import type { ArrivalFormState } from '../types/arrival'
import { useI18n } from '../i18n/useI18n'
import { buildJourneyEstimate } from '../lib/journeyEstimate'
import { labelTransport } from '../i18n/formOptions'

type Props = {
  open: boolean
  form: ArrivalFormState
  transports: string[]
  onClose: () => void
}

type CompareCardModel = {
  transport: string
  title: string
  totalMin: number
  walkToPickupMin: number
  costLow: number
  costHigh: number
}

function clampCompareList(list: string[]): string[] {
  const uniq = Array.from(new Set(list.filter(Boolean)))
  return uniq.slice(0, 3)
}

export function CompareOptionsPanel({ open, form, transports, onClose }: Props) {
  const { language, t } = useI18n()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const cards = useMemo(() => {
    const list = clampCompareList(transports)
    return list.map((transport) => {
      const estimate = buildJourneyEstimate({ ...form, transport })
      const walkToPickupMin = estimate.steps.find((s) => s.kind === 'walk_transit')?.lineMin ?? 0
      return {
        transport,
        title: labelTransport(language, transport),
        totalMin: estimate.totalMin,
        walkToPickupMin,
        costLow: estimate.priceLow,
        costHigh: estimate.priceHigh,
      } satisfies CompareCardModel
    })
  }, [form, transports, language])

  const bestConvenience = useMemo(() => {
    return cards.reduce((best, c) => (best == null || c.totalMin < best.totalMin ? c : best), null as CompareCardModel | null)
  }, [cards])

  const lowestCost = useMemo(() => {
    return cards.reduce((best, c) => (best == null || c.costLow < best.costLow ? c : best), null as CompareCardModel | null)
  }, [cards])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/45 backdrop-blur-[2px] transition-opacity"
        aria-label={t('r_close_bd')}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="flysmart-compare-title"
        className="relative z-10 flex max-h-[min(94dvh,calc(100dvh-env(safe-area-inset-top)-0.5rem))] w-full max-w-3xl flex-col rounded-t-3xl bg-white shadow-2xl ring-1 ring-slate-200 sm:max-h-[min(90dvh,48rem)] sm:rounded-3xl"
      >
        <div className="shrink-0 border-b border-slate-100 px-5 pb-4 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 sm:pt-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2
                id="flysmart-compare-title"
                className="text-2xl font-bold tracking-tight text-[rgb(2,20,50)]"
              >
                {t('cmp_title')}
              </h2>
              <p className="mt-1 text-sm text-slate-600">{t('cmp_subtitle')}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-xl text-slate-500 ring-1 ring-slate-200 transition hover:bg-slate-50 hover:text-slate-800"
              aria-label={t('r_close')}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-5 pb-4 sm:px-6">
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
            {cards.map((c) => {
              const showConvenience = bestConvenience?.transport === c.transport
              const showLowest = lowestCost?.transport === c.transport
              return (
                <div
                  key={c.transport}
                  className="w-[min(19rem,86vw)] shrink-0 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">{c.title}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {showConvenience ? (
                          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200">
                            {t('cmp_badge_best_convenience')}
                          </span>
                        ) : null}
                        {showLowest ? (
                          <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 ring-1 ring-amber-200">
                            {t('cmp_badge_lowest_cost')}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-2">
                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2 ring-1 ring-slate-200/80">
                      <div className="flex items-center gap-2 text-sm font-semibold text-[rgb(2,20,50)]">
                        <Clock className="h-4 w-4 text-sky-600" aria-hidden />
                        <span>{t('cmp_metric_time')}</span>
                      </div>
                      <span className="text-sm font-bold text-[rgb(2,20,50)]">~{c.totalMin} min</span>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2 ring-1 ring-slate-200/80">
                      <div className="flex items-center gap-2 text-sm font-semibold text-[rgb(2,20,50)]">
                        <DollarSign className="h-4 w-4 text-sky-600" aria-hidden />
                        <span>{t('cmp_metric_cost')}</span>
                      </div>
                      <span className="text-sm font-bold text-[rgb(2,20,50)]">
                        {c.costLow}–{c.costHigh} USD
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2 ring-1 ring-slate-200/80">
                      <div className="flex items-center gap-2 text-sm font-semibold text-[rgb(2,20,50)]">
                        <Footprints className="h-4 w-4 text-sky-600" aria-hidden />
                        <span>{t('cmp_metric_walk_pickup')}</span>
                      </div>
                      <span className="text-sm font-bold text-[rgb(2,20,50)]">~{c.walkToPickupMin} min</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="shrink-0 border-t border-slate-100 bg-white px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-6 sm:pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-12 w-full touch-manipulation items-center justify-center rounded-2xl bg-[rgb(2,20,50)] text-base font-semibold text-white shadow-md shadow-slate-900/20 transition hover:brightness-110 active:scale-[0.99]"
          >
            {t('r_back')}
          </button>
        </div>
      </div>
    </div>
  )
}

