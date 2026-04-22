import { useEffect, useMemo, useState } from 'react'
import {
  Bookmark,
  Bus,
  Car,
  ChevronDown,
  Clock,
  Footprints,
  Luggage,
  MapPin,
  MapPinned,
  Plane,
  Stamp,
  TrainFront,
  X,
} from 'lucide-react'
import type { ArrivalFormState } from '../types/arrival'
import type { MessageKey } from '../i18n/dictionaries'
import { labelDestination, labelGate, labelTransport } from '../i18n/formOptions'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'
import { useI18n } from '../i18n/useI18n'
import { buildJourneyEstimate, type JourneyStepModel } from '../lib/journeyEstimate'
import { saveRouteSnapshot } from '../lib/savedRoutesStorage'

type DirectionsPanelProps = {
  open: boolean
  form: ArrivalFormState
  onClose: () => void
}

function StepIcon({ step, transport }: { step: JourneyStepModel; transport: string }) {
  const iconClass = 'h-5 w-5 text-[rgb(2,20,50)]'
  switch (step.kind) {
    case 'deplane':
      return <Plane className={iconClass} aria-hidden />
    case 'gate':
      return <Footprints className={iconClass} aria-hidden />
    case 'customs':
      return <Stamp className={iconClass} aria-hidden />
    case 'bags':
      return <Luggage className={iconClass} aria-hidden />
    case 'walk_transit':
      return <Footprints className={iconClass} aria-hidden />
    case 'transit':
      if (transport === 'link') return <TrainFront className={iconClass} aria-hidden />
      if (transport === 'rideshare' || transport === 'taxi' || transport === 'rental') {
        return <Car className={iconClass} aria-hidden />
      }
      return <Bus className={iconClass} aria-hidden />
    case 'walk_dest':
      return <Footprints className={iconClass} aria-hidden />
    case 'arrived':
      return <MapPin className={iconClass} aria-hidden />
    default:
      return <MapPin className={iconClass} aria-hidden />
  }
}

type TFn = (key: MessageKey, vars?: Record<string, string | number>) => string

function stepTitle(t: TFn, step: JourneyStepModel, labels: { gate: string; transport: string; dest: string }): string {
  const { gate, transport, dest } = labels
  switch (step.kind) {
    case 'deplane':
      return t('dir_step_deplane', { min: step.lineMin })
    case 'gate':
      return t('dir_step_gate', { gate, walk: step.lineMin })
    case 'customs':
      return t('dir_step_customs', { min: step.lineMin })
    case 'bags':
      return t('dir_step_bags', { min: step.lineMin })
    case 'walk_transit':
      return t('dir_step_walk_transit', { transport, walk: step.lineMin })
    case 'transit':
      return t('dir_step_transit', { dest, ride: step.rideMin })
    case 'walk_dest':
      return t('dir_step_walk_dest', { walk: step.lineMin })
    case 'arrived':
      return t('dir_step_arrived', { dest })
    default:
      return ''
  }
}

function stepDetail(t: TFn, step: JourneyStepModel): string | null {
  switch (step.kind) {
    case 'gate':
      return t('dir_step_gate_detail', { mi: step.miles, walk: step.lineMin })
    case 'bags':
      return t('dir_step_bags_detail', { min: step.lineMin })
    case 'walk_transit':
      return t('dir_step_walk_transit_detail', { mi: step.miles, walk: step.lineMin })
    case 'transit':
      return t('dir_step_transit_detail', { ride: step.rideMin })
    case 'walk_dest':
      return t('dir_step_walk_dest_detail', { mi: step.miles, walk: step.lineMin })
    default:
      return null
  }
}

export function DirectionsPanel({ open, form, onClose }: DirectionsPanelProps) {
  const { language, t } = useI18n()
  const [saved, setSaved] = useState(false)
  const estimate = useMemo(() => buildJourneyEstimate(form), [form])

  const labels = useMemo(
    () => ({
      gate: labelGate(language, form.gate),
      transport: labelTransport(language, form.transport),
      dest: labelDestination(language, form.destination),
    }),
    [language, form.gate, form.transport, form.destination],
  )

  useBodyScrollLock(open)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) setSaved(false)
  }, [open])

  if (!open) return null

  const visibleSteps = estimate.steps

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
        aria-labelledby="flysmart-dir-title"
        className="relative z-10 flex max-h-[min(94dvh,calc(100dvh-env(safe-area-inset-top)-0.5rem))] w-full max-w-md flex-col rounded-t-3xl bg-white shadow-2xl ring-1 ring-slate-200 sm:max-h-[min(90dvh,44rem)] sm:rounded-3xl"
      >
        <div className="shrink-0 border-b border-slate-100 px-5 pb-4 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 sm:pt-5">
          <div
            className="mx-auto mb-3 h-1 w-10 rounded-full bg-slate-200 sm:hidden"
            aria-hidden
          />
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2
                id="flysmart-dir-title"
                className="text-2xl font-bold tracking-tight text-[rgb(2,20,50)]"
              >
                {t('dir_title')}
              </h2>
              <p className="mt-1 text-sm text-slate-600">{t('dir_subtitle')}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setSaved((v) => {
                    const next = !v
                    if (next) saveRouteSnapshot(form)
                    return next
                  })
                }}
                className={`inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-xl ring-1 transition ${
                  saved
                    ? 'bg-[rgb(2,20,50)] text-white ring-[rgb(2,20,50)]'
                    : 'text-slate-500 ring-slate-200 hover:bg-slate-50 hover:text-slate-800'
                }`}
                aria-pressed={saved}
                aria-label={t('dir_bookmark')}
              >
                <Bookmark className={`h-5 w-5 ${saved ? 'fill-current' : ''}`} aria-hidden />
              </button>
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

          <div className="mt-5 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200/80">
            <div className="flex items-center gap-2 text-sm font-semibold text-[rgb(2,20,50)]">
              <MapPinned className="h-4 w-4 shrink-0" aria-hidden />
              {t('dir_overview')}
            </div>
            <p className="mt-2 text-sm leading-snug text-slate-700">
              {t('dir_route_line', { gate: labels.gate, dest: labels.dest })}
            </p>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-5 pb-4 sm:px-6">
          <ol className="mt-1 space-y-0">
            {visibleSteps.map((step, i) => {
              const isLast = i === visibleSteps.length - 1
              const title = stepTitle(t, step, labels)
              const detail = stepDetail(t, step)
              return (
                <li key={`${step.kind}-${i}`}>
                  <div className="flex gap-3 py-3">
                    <div className="flex w-11 shrink-0 flex-col items-center">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-50 ring-1 ring-sky-100">
                        <StepIcon step={step} transport={form.transport} />
                      </span>
                      {!isLast ? (
                        <ChevronDown
                          className="mt-1 h-4 w-4 shrink-0 text-sky-500"
                          strokeWidth={2.5}
                          aria-hidden
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1 border-b border-slate-100 pb-3">
                      <p className="text-[15px] font-semibold leading-snug text-[rgb(2,20,50)]">
                        {title}
                      </p>
                      {detail ? (
                        <p className="mt-1 flex items-start gap-1 text-sm text-slate-600">
                          <span className="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                          {detail}
                        </p>
                      ) : null}
                      {step.kind === 'customs' ? (
                        <p className="mt-2 inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-900">
                          {t('dir_step_customs_badge', { min: step.badgeMin })}
                        </p>
                      ) : null}
                      {step.kind === 'transit' ? (
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-900">
                            {t('dir_step_transit_wait_badge', { min: step.pickupWaitMin })}
                          </span>
                          <span className="inline-flex rounded-full border border-sky-200 bg-white px-3 py-1 text-xs font-semibold text-[rgb(2,20,50)]">
                            {t('dir_step_transit_price', {
                              low: estimate.priceLow,
                              high: estimate.priceHigh,
                            })}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="shrink-0 border-t border-slate-100 bg-white px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-6 sm:pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <div className="flex items-stretch justify-between gap-4 rounded-2xl border-2 border-sky-600 bg-sky-50/40 px-4 py-3.5">
            <div className="flex min-w-0 items-center gap-2">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-sky-200">
                <Clock className="h-5 w-5 text-[rgb(2,20,50)]" aria-hidden />
              </span>
              <p className="text-base font-bold text-[rgb(2,20,50)]">
                {t('dir_footer_total', { min: estimate.totalMin })}
              </p>
            </div>
            <div className="shrink-0 text-right text-xs leading-relaxed text-slate-700">
              <div>{t('dir_footer_wait', { min: estimate.sumWait })}</div>
              <div>{t('dir_footer_walk', { min: estimate.sumWalk })}</div>
              <div>{t('dir_footer_transit', { min: estimate.sumTransit })}</div>
              <div className="mt-1 font-semibold text-[rgb(2,20,50)]">
                {t('dir_footer_price', { low: estimate.priceLow, high: estimate.priceHigh })}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-4 flex min-h-12 w-full touch-manipulation items-center justify-center rounded-2xl bg-[rgb(2,20,50)] text-base font-semibold text-white shadow-md shadow-slate-900/20 transition hover:brightness-110 active:scale-[0.99]"
          >
            {t('r_back')}
          </button>
        </div>
      </div>
    </div>
  )
}
