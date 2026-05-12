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
  AlertTriangle,
  X,
} from 'lucide-react'
import type { ArrivalFormState } from '../types/arrival'
import type { MessageKey } from '../i18n/dictionaries'
import type { LanguageCode } from '../types/language'
import { labelDestination, labelGate, labelTransport } from '../i18n/formOptions'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'
import { useI18n } from '../i18n/useI18n'
import { buildJourneyEstimate, isAirportExitOnlyForm, isTransportPickupOnlyForm, type JourneyStepModel } from '../lib/journeyEstimate'
import { saveRouteSnapshot } from '../lib/savedRoutesStorage'

type DirectionsPanelProps = {
  open: boolean
  form: ArrivalFormState
  prediction: any
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

function stepTitle(
  t: TFn,
  step: JourneyStepModel,
  labels: { gate: string; transport: string; dest: string },
  opts: { airportExitOnly: boolean; pickupTerminalOnly: boolean },
): string {
  const { gate, transport, dest } = labels
  const { airportExitOnly, pickupTerminalOnly } = opts
  switch (step.kind) {
    case 'deplane':
      return t('dir_step_deplane', { min: step.lineMin })
    case 'gate':
      return t('dir_step_gate', { gate, walk: step.lineMin })
    case 'customs':
      return t('dir_step_customs', {
        min: step.lineMin
      })
    case 'bags':
      return t('dir_step_bags', { min: step.lineMin })
    case 'walk_transit':
      return t('dir_step_walk_transit', { transport, walk: step.lineMin })
    case 'transit':
      if (step.rideMin <= 0) {
        return t('dir_step_transit_pickup_only', { transport, wait: step.pickupWaitMin })
      }
      return t('dir_step_transit', { dest, ride: step.rideMin })
    case 'walk_dest':
      return t('dir_step_walk_dest', { walk: step.lineMin })
    case 'arrived':
      if (airportExitOnly) return t('dir_step_arrived_landside')
      if (pickupTerminalOnly) return t('dir_step_arrived_pickup', { transport })
      return t('dir_step_arrived', { dest: dest || t('dir_onward_generic') })
    default:
      return ''
  }
}

function afterMetricSeparator(text: string): string {
  const parts = text.split('·')
  return parts.length > 1 ? parts.slice(1).join('·').trim() : text
}

function transitDetail(t: TFn, step: Extract<JourneyStepModel, { kind: 'transit' }>, transport: string): string {
  if (transport === 'link') return `~${step.rideMin} min on ${t('opt_tr_link')} (scheduled service)`
  if (transport === 'bus') return `~${step.rideMin} min by bus (typical service)`
  return t('dir_step_transit_detail', { ride: step.rideMin })
}

function stepDetailBullets(t: TFn, step: JourneyStepModel, transport: string): string[] {
  switch (step.kind) {
    case 'gate':
      if (step.baggageInstruction != null) return [step.baggageInstruction]
      return []
    case 'bags':
      return [t('dir_step_bags_detail', { min: step.lineMin })]
    case 'walk_transit':
      return [afterMetricSeparator(t('dir_step_walk_transit_detail', { mi: step.miles, walk: step.lineMin }))]
    case 'transit':
      if (step.rideMin <= 0) {
        return [t('dir_step_transit_pickup_detail', { wait: step.pickupWaitMin })]
      }
      return [transitDetail(t, step, transport)]
    case 'walk_dest':
      return [afterMetricSeparator(t('dir_step_walk_dest_detail', { mi: step.miles, walk: step.lineMin }))]
    default:
      return []
  }
}

function minuteRange(center: number, spread = 2): string {
  return `${Math.max(1, center - spread)}-${center + spread} min`
}

function mileRange(center: number): string {
  const low = Math.max(0.1, Math.round((center - 0.1) * 10) / 10)
  const high = Math.round((center + 0.1) * 10) / 10
  return `${low}-${high} mi`
}

function formatDuration(totalMin: number, language: LanguageCode): string {
  if (totalMin < 60) {
    if (language === 'zh') return `${totalMin} 分钟`
    if (language === 'ja') return `${totalMin} 分`
    if (language === 'ko') return `${totalMin}분`
    if (language === 'vi') return `${totalMin} phút`
    return `${totalMin} min`
  }

  const hours = Math.floor(totalMin / 60)
  const minutes = totalMin % 60
  if (language === 'zh') return `${hours} 小时 ${minutes} 分钟`
  if (language === 'ja') return `${hours} 時間 ${minutes} 分`
  if (language === 'ko') return `${hours}시간 ${minutes}분`
  if (language === 'vi') return `${hours} giờ ${minutes} phút`
  if (language === 'es') return `${hours} h ${minutes} min`
  return `${hours} hr ${minutes} min`
}

function stepMetrics(step: JourneyStepModel, transport: string): { label: string; value: string }[] {
  if (step.kind === 'arrived') return []

  const metrics: { label: string; value: string }[] = []
  if ('miles' in step) metrics.push({ label: 'Distance', value: mileRange(step.miles) })
  if (step.kind === 'transit') {
    if (step.rideMin <= 0) {
      metrics.push({ label: 'Wait', value: minuteRange(step.pickupWaitMin, 3) })
      return metrics
    }
    metrics.push({ label: transport === 'link' ? 'Train' : transport === 'bus' ? 'Bus' : 'Ride', value: minuteRange(step.rideMin, 5) })
    metrics.push({ label: 'Wait', value: minuteRange(step.pickupWaitMin, 3) })
    return metrics
  }
  if (step.kind === 'gate' && step.walkToBaggageMin != null && step.walkToBaggageMax != null) {
    metrics.push({ label: 'Time', value: `${step.walkToBaggageMin}-${step.walkToBaggageMax} min` })
  } else {
    metrics.push({ label: 'Time', value: minuteRange(step.lineMin) })
  }
  return metrics
}

export function DirectionsPanel({
  open,
  form,
  prediction,
  onClose
}: DirectionsPanelProps) {
  const { language, t } = useI18n()
  const [saved, setSaved] = useState(false)
  const estimate = useMemo(() => buildJourneyEstimate(form, prediction), [form, prediction])
  const airportExitOnly = useMemo(() => isAirportExitOnlyForm(form), [form])
  const pickupTerminalOnly = useMemo(() => isTransportPickupOnlyForm(form), [form])

  const labels = useMemo(
    () => ({
      gate: labelGate(language, form.gate),
      transport: labelTransport(
        language,
        form.transport?.trim() ? form.transport : 'rideshare',
      ),
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
    if (!open) {
      const id = requestAnimationFrame(() => setSaved(false))
      return () => cancelAnimationFrame(id)
    }
    return undefined
  }, [open])

  if (!open) return null

  const visibleSteps = estimate.steps
  const routeDestLabel = labels.dest || t('dir_onward_generic')
  const routeOverviewText = pickupTerminalOnly
    ? t('dir_route_pickup_only', { gate: labels.gate, transport: labels.transport })
    : airportExitOnly
      ? t('dir_route_exit_only', { gate: labels.gate })
      : t('dir_route_line', { gate: labels.gate, dest: routeDestLabel })

  const peakHour =
    prediction?.is_peak_hour === true ||
    prediction?.is_peak_hour === 1

  const hasPeakSignal = prediction != null && 'is_peak_hour' in prediction

  const customsQueueChipClass = !hasPeakSignal
    ? 'inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-900'
    : peakHour
      ? 'inline-flex rounded-full border border-red-300 bg-red-50 px-3 py-1 text-xs font-semibold text-red-950'
      : 'inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-950'

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
            <p className="mt-2 text-sm leading-snug text-slate-700">{routeOverviewText}</p>
            {peakHour ? (
              <div
                role="status"
                className="mt-3 flex gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-semibold leading-snug text-red-950 ring-1 ring-red-100"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" aria-hidden />
                <span>{t('dir_peak_warning')}</span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-5 pb-4 sm:px-6">
          <ol className="mt-1 space-y-0">
            {visibleSteps.map((step, i) => {
              const isLast = i === visibleSteps.length - 1
              const title = stepTitle(t, step, labels, { airportExitOnly, pickupTerminalOnly })
              const transportForStep = form.transport?.trim() ? form.transport : 'rideshare'
              const bullets = stepDetailBullets(t, step, transportForStep)
              const metrics = stepMetrics(step, transportForStep)
              return (
                <li key={`${step.kind}-${i}`}>
                  <div className="flex gap-3 py-3">
                    <div className="flex w-11 shrink-0 flex-col items-center">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-50 ring-1 ring-sky-100">
                        <StepIcon
                          step={step}
                          transport={transportForStep}
                        />
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
                      {bullets.length > 0 ? (
                        <ul className="mt-2 space-y-1.5">
                          {bullets.map((detail) => (
                            <li
                              key={detail}
                              className={`flex items-start gap-2 text-sm leading-snug ${
                                step.kind === 'bags'
                                  ? !hasPeakSignal
                                    ? 'text-slate-600'
                                    : peakHour
                                      ? 'font-medium text-red-950'
                                      : 'font-medium text-emerald-950'
                                  : 'text-slate-600'
                              }`}
                            >
                              <span
                                className={`mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full ${
                                  step.kind === 'bags'
                                    ? !hasPeakSignal
                                      ? 'bg-sky-500'
                                      : peakHour
                                        ? 'bg-red-500'
                                        : 'bg-emerald-500'
                                    : 'bg-sky-500'
                                }`}
                              />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {metrics.length > 0 ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {metrics.map((metric) => {
                            const isWaitStep = step.kind === 'bags' || step.kind === 'customs'
                            const peakWaitHighlight = hasPeakSignal && peakHour && isWaitStep
                            const calmWaitHighlight = hasPeakSignal && !peakHour && isWaitStep
                            return (
                            <span
                              key={metric.label}
                              className={
                                peakWaitHighlight
                                  ? 'inline-flex items-center gap-1.5 rounded-full border border-red-300 bg-red-50 px-3 py-1 text-xs font-semibold text-red-950'
                                  : calmWaitHighlight
                                    ? 'inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-950'
                                    : 'inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-[rgb(2,20,50)]'
                              }
                            >
                              <span
                                className={
                                  peakWaitHighlight
                                    ? 'text-red-800'
                                    : calmWaitHighlight
                                      ? 'text-emerald-800'
                                      : 'text-slate-500'
                                }
                              >
                                {metric.label}
                              </span>
                              <span>{metric.value}</span>
                            </span>
                            )
                          })}
                        </div>
                      ) : null}
                      {step.kind === 'customs' ? (
                        <div className="mt-2 flex flex-wrap gap-2">
                          <p className={customsQueueChipClass}>
                            {t('dir_step_customs_badge', { min: step.badgeMin })}
                          </p>
                        </div>
                      ) : null}
                      {step.kind === 'transit' && estimate.priceLow > 0 && estimate.priceHigh > 0 ? (
                        <div className="mt-2 flex flex-wrap items-center gap-2">
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
              {t('dir_footer_total', {
                min: formatDuration(estimate.totalMin, language),
              })}
              </p>
            </div>
            <div className="shrink-0 text-right text-xs leading-relaxed text-slate-700">
              <div>{t('dir_footer_walk', { min: estimate.sumWalk })}</div>
              <div>{t('dir_footer_transit', { min: estimate.sumTransit })}</div>
              <div className="mt-1 font-semibold text-[rgb(2,20,50)]">
                {airportExitOnly && estimate.priceLow === 0 && estimate.priceHigh === 0
                  ? t('dir_footer_price_na')
                  : pickupTerminalOnly && estimate.priceLow === 0 && estimate.priceHigh === 0
                    ? t('dir_footer_price_pickup_na')
                    : t('dir_footer_price', { low: estimate.priceLow, high: estimate.priceHigh })}
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
