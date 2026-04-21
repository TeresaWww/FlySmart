import { CheckCircle2, X } from 'lucide-react'
import { useEffect } from 'react'
import type { ArrivalFormState } from '../types/arrival'
import type { ArrivalPlan } from '../lib/arrivalPlan'
import { labelDestination, labelGate, labelTransport } from '../i18n/formOptions'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'
import { useI18n } from '../i18n/useI18n'

type ResultModalProps = {
  open: boolean
  form: ArrivalFormState
  plan: ArrivalPlan
  onClose: () => void
}

export function ResultModal({ open, form, plan, onClose }: ResultModalProps) {
  const { language, t } = useI18n()
  useBodyScrollLock(open)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

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
        aria-labelledby="flysmart-result-title"
        className="relative z-10 flex max-h-[min(92dvh,calc(100dvh-env(safe-area-inset-top)-0.5rem))] w-full max-w-md flex-col rounded-t-3xl bg-white shadow-2xl ring-1 ring-slate-200 sm:max-h-[min(88dvh,40rem)] sm:rounded-3xl"
      >
        <div className="shrink-0 px-5 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 sm:pb-3 sm:pt-5">
          <div
            className="mx-auto mb-3 h-1 w-10 rounded-full bg-slate-200 sm:hidden"
            aria-hidden
          />
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2">
              <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                <CheckCircle2 className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h2
                  id="flysmart-result-title"
                  className="text-lg font-bold text-[rgb(2,20,50)]"
                >
                  {t('r_title')}
                </h2>
                <p className="mt-1 text-sm text-slate-600">{t('r_sub')}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-11 min-w-11 shrink-0 touch-manipulation items-center justify-center rounded-xl text-slate-500 ring-1 ring-slate-200 transition hover:bg-slate-50 hover:text-slate-800"
              aria-label={t('r_close')}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-5 pb-2 sm:px-6">
          <div className="mt-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200/80">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              {t('r_details')}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-800">
              <li>
                <span className="font-semibold text-slate-600">{t('r_l_flight')} </span>
                {form.flightScope === 'international' ? t('r_intl') : t('r_domestic')}
              </li>
              {form.flightScope === 'international' ? (
                <li>
                  <span className="font-semibold text-slate-600">{t('r_l_traveler')} </span>
                  {form.trustedTravelerProgram
                    ? t('r_ttp')
                    : form.intlTravelerSegment === 'non_citizen'
                      ? t('r_non_citizen')
                      : t('r_citizen')}
                </li>
              ) : null}
              <li>
                <span className="font-semibold text-slate-600">{t('r_l_gate')} </span>
                {labelGate(language, form.gate)}
              </li>
              <li>
                <span className="font-semibold text-slate-600">{t('r_l_transport')} </span>
                {labelTransport(language, form.transport)}
              </li>
              <li>
                <span className="font-semibold text-slate-600">{t('r_l_dest')} </span>
                {labelDestination(language, form.destination)}
              </li>
              <li>
                <span className="font-semibold text-slate-600">{t('r_l_party')} </span>
                {form.travelers}
              </li>
            </ul>
          </div>

          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              {t('r_next')}
            </p>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-800">
              {plan.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="shrink-0 border-t border-slate-100 bg-white px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-6 sm:pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-12 w-full touch-manipulation items-center justify-center rounded-2xl bg-[rgb(2,20,50)] text-base font-semibold text-white shadow-md shadow-slate-900/20 transition hover:brightness-110 active:scale-[0.99] sm:text-sm"
          >
            {t('r_back')}
          </button>
        </div>
      </div>
    </div>
  )
}
