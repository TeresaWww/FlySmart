import { useEffect, useMemo, useState, useCallback } from 'react'
import {
  Car,
  Globe,
  IdCard,
  MapPin,
  Users,
} from 'lucide-react'
import { HeaderBar } from './HeaderBar'
import { SegmentedToggle, type SegmentDefinition } from './SegmentedToggle'
import { FormSelect } from './FormSelect'
import { GateInput } from './GateInput'
import { DestinationInput } from './DestinationInput'
import { TravelerStepper } from './TravelerStepper'
import { GroundTransportationCard } from './GroundTransportationCard'
import { AirportInfoCard } from './AirportInfoCard'
import { DirectionsPanel } from './DirectionsPanel'
import { CompareOptionsPanel } from './CompareOptionsPanel'
import { transportSelectOptions } from '../i18n/formOptions'
import { findGateGroup } from '../data/seaTacGates'
import { useI18n } from '../i18n/useI18n'
import { useArrivalForm } from '../context/ArrivalFormContext'
import { validateArrivalForm, type FieldErrors } from '../lib/validation'
import { type ArrivalFormState, type FlightScope, type IntlTravelerSegment } from '../types/arrival'

const htmlLang = {
  en: 'en',
  es: 'es',
  zh: 'zh-Hans',
  ko: 'ko',
  ja: 'ja',
  vi: 'vi',
} as const

export function ArrivalFormView() {
  const { language, t } = useI18n()
  const { form, setForm } = useArrivalForm()
  const [errors, setErrors] = useState<FieldErrors>({})
  const [resultOpen, setResultOpen] = useState(false)
  const [compareOpen, setCompareOpen] = useState(false)
  const [transportClock, setTransportClock] = useState(() => new Date())

  const flightSegments: SegmentDefinition<FlightScope>[] = useMemo(
    () => [
      {
        value: 'domestic',
        title: t('seg_domestic_t'),
        description: t('seg_domestic_d'),
        icon: MapPin,
      },
      {
        value: 'international',
        title: t('seg_intl_t'),
        description: t('seg_intl_d'),
        icon: Globe,
      },
    ],
    [t],
  )

  const intlTravelerSegments: SegmentDefinition<IntlTravelerSegment>[] = useMemo(
    () => [
      {
        value: 'citizen',
        title: t('seg_citizen_t'),
        description: t('seg_citizen_d'),
        icon: IdCard,
      },
      {
        value: 'non_citizen',
        title: t('seg_non_citizen_t'),
        description: t('seg_non_citizen_d'),
        icon: Users,
      },
    ],
    [t],
  )

  const transports = useMemo(
    () => transportSelectOptions(language, transportClock),
    [language, transportClock],
  )
  const update = useCallback(<K extends keyof ArrivalFormState>(key: K, value: ArrivalFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    const field = key as keyof FieldErrors
    setErrors((e) => {
      if (!(field in e)) return e
      const next = { ...e }
      delete next[field]
      return next
    })
  }, [setForm])

  useEffect(() => {
    const prev = document.documentElement.lang
    document.documentElement.lang = htmlLang[language]
    return () => {
      document.documentElement.lang = prev
    }
  }, [language])

  useEffect(() => {
    const timer = window.setInterval(() => setTransportClock(new Date()), 60_000)
    return () => window.clearInterval(timer)
  }, [])

  const onFlightScope = (flightScope: FlightScope) => {
    setForm((prev) => {
      const next = {
        ...prev,
        flightScope,
        ...(flightScope === 'domestic'
          ? {
              intlTravelerSegment: 'citizen' as const,
              trustedTravelerProgram: false,
            }
          : {}),
      }
      if (prev.gate && !findGateGroup(prev.gate, flightScope)) {
        return { ...next, gate: '' as const }
      }
      return next
    })
  }

  const submit = () => {
    const nextErrors = validateArrivalForm(form, language)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    setResultOpen(true)
  }

  const openCompare = () => {
    const nextErrors = validateArrivalForm(form, language)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    setCompareOpen(true)
  }

  const compareOptions = transports.filter((o) => o.value !== '')
  const compareSelected = form.compareTransports ?? []
  const toggleCompare = (id: string) => {
    setForm((prev) => {
      const current = Array.from(new Set(prev.compareTransports.filter(Boolean)))
      const exists = current.includes(id)
      let next = exists ? current.filter((x) => x !== id) : [...current, id]
      next = next.filter(Boolean)
      if (next.length > 3) next = next.slice(next.length - 3)
      if (next.length === 0) next = [id]
      return { ...prev, compareTransports: next }
    })
  }

  return (
    <div className="min-h-dvh min-h-svh bg-slate-100 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <HeaderBar />

      <main className="mx-auto -mt-8 w-full max-w-2xl pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]">
        <div className="rounded-3xl bg-white/70 px-1 pb-6 pt-2 text-center shadow-sm ring-1 ring-white/60 backdrop-blur-sm">
          <h1 className="px-4 text-xl font-bold leading-snug text-[rgb(2,20,50)]">
            {t('arr_title')}
          </h1>
          <p className="mx-auto mt-2 max-w-sm px-4 text-sm text-slate-600">{t('arr_subtitle')}</p>
        </div>

        <section className="mt-5 rounded-3xl bg-white p-5 shadow-xl shadow-slate-900/10 ring-1 ring-slate-200/80">
          <div className="space-y-4">
            <SegmentedToggle
              options={flightSegments}
              value={form.flightScope}
              onChange={onFlightScope}
            />

            {form.flightScope === 'international' ? (
              <div className="space-y-3">
                <SegmentedToggle
                  options={intlTravelerSegments}
                  value={form.intlTravelerSegment}
                  onChange={(intlTravelerSegment) => {
                    setForm((prev) => ({
                      ...prev,
                      intlTravelerSegment,
                      trustedTravelerProgram:
                        intlTravelerSegment === 'non_citizen'
                          ? false
                          : prev.trustedTravelerProgram,
                    }))
                  }}
                />
                {form.intlTravelerSegment === 'citizen' ? (
                  <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2.5 text-left ring-1 ring-slate-100">
                    <input
                      type="checkbox"
                      checked={form.trustedTravelerProgram}
                      onChange={(e) => update('trustedTravelerProgram', e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs font-medium leading-snug text-slate-800 sm:text-sm">
                      {t('ttp_checkbox')}
                    </span>
                  </label>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="mt-6 space-y-4">
            <GateInput
              id="gate"
              label={t('f_gate_l')}
              placeholder={t('f_gate_p')}
              value={form.gate}
              onChange={(gate) => update('gate', gate)}
              error={errors.gate}
            />
            <DestinationInput
              id="destination"
              label={`${t('f_dest_l')} ${t('lbl_optional')}`}
              placeholder={t('f_dest_p')}
              value={form.destination}
              onChange={(destination) => update('destination', destination)}
              error={errors.destination}
            />
            <FormSelect
              id="transport"
              label={`${t('f_tr_l')} ${t('lbl_optional')}`}
              placeholder={t('f_tr_skip')}
              icon={Car}
              value={form.transport}
              options={transports}
              onChange={(transport) => update('transport', transport)}
              error={errors.transport}
              allowBlank
            />

            <div className="rounded-2xl border border-slate-200 bg-white p-3 ring-1 ring-slate-100">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[rgb(2,20,50)]">{t('cta_compare')}</p>
                  <p className="mt-0.5 text-xs text-slate-600">{t('cmp_subtitle')}</p>
                </div>
                <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={form.recommendationMode}
                    onChange={(e) => update('recommendationMode', e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Badges</span>
                </label>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {compareOptions.map((o) => {
                  const selected = compareSelected.includes(o.value)
                  const disabled = Boolean(o.disabled)
                  return (
                    <button
                      key={o.value}
                      type="button"
                      disabled={disabled}
                      onClick={() => toggleCompare(o.value)}
                      className={`min-h-10 touch-manipulation rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition ${
                        disabled
                          ? 'cursor-not-allowed bg-slate-50 text-slate-400 ring-slate-200'
                          : selected
                            ? 'bg-[rgb(2,20,50)] text-white ring-[rgb(2,20,50)]'
                            : 'bg-white text-slate-700 ring-slate-200 hover:bg-slate-50'
                      }`}
                      aria-pressed={selected}
                    >
                      {o.label}
                    </button>
                  )
                })}
              </div>
              <p className="mt-2 text-[11px] text-slate-500">Select up to 3.</p>
            </div>
            <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2.5 text-left ring-1 ring-slate-100">
              <input
                type="checkbox"
                checked={form.checkedBaggage}
                onChange={(e) => update('checkedBaggage', e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-xs font-medium leading-snug text-slate-800 sm:text-sm">
                {t('f_bags_chk')}
              </span>
            </label>
          </div>

          <div className="mt-7">
            <TravelerStepper
              value={form.travelers}
              min={1}
              max={12}
              onChange={(travelers) => update('travelers', travelers)}
            />
          </div>

          <button
            type="button"
            onClick={submit}
            className="mt-8 flex min-h-14 w-full touch-manipulation items-center justify-center rounded-2xl bg-[rgb(2,20,50)] text-base font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:brightness-110 active:scale-[0.99]"
          >
            {t('cta_directions')}
          </button>

          <button
            type="button"
            onClick={openCompare}
            className="mt-3 flex min-h-12 w-full touch-manipulation items-center justify-center rounded-2xl bg-white text-base font-semibold text-[rgb(2,20,50)] ring-1 ring-slate-200 shadow-sm transition hover:bg-slate-50 active:scale-[0.99]"
          >
            {t('cta_compare')}
          </button>

          <p className="mt-4 text-center text-xs italic text-slate-400">{t('step2')}</p>
        </section>

        <div className="mt-5 space-y-4">
          <GroundTransportationCard />
          <AirportInfoCard />
        </div>
      </main>

      <DirectionsPanel open={resultOpen} form={form} onClose={() => setResultOpen(false)} />
      <CompareOptionsPanel
        open={compareOpen}
        form={form}
        transports={form.compareTransports}
        onClose={() => setCompareOpen(false)}
      />
    </div>
  )
}
