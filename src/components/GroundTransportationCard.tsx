import {
  Car,
  ChevronDown,
  ParkingSquare,
  Smartphone,
  TrainFront,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'
import { useI18n } from '../i18n/useI18n'
import type { MessageKey } from '../i18n/dictionaries'

const quickOptions: {
  key: string
  titleKey: MessageKey
  subtitleKey: MessageKey
  icon: LucideIcon
}[] = [
  {
    key: 'rideshare',
    titleKey: 'g_ride_t',
    subtitleKey: 'g_ride_s',
    icon: Smartphone,
  },
  {
    key: 'link',
    titleKey: 'g_rail_t',
    subtitleKey: 'g_rail_s',
    icon: TrainFront,
  },
  {
    key: 'taxi',
    titleKey: 'g_taxi_t',
    subtitleKey: 'g_taxi_s',
    icon: Car,
  },
  {
    key: 'parking',
    titleKey: 'g_park_t',
    subtitleKey: 'g_park_s',
    icon: ParkingSquare,
  },
]

export function GroundTransportationCard() {
  const { t } = useI18n()
  const [open, setOpen] = useState(true)

  return (
    <section className="rounded-3xl bg-white p-5 shadow-lg shadow-slate-900/5 ring-1 ring-slate-200/70">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-12 w-full touch-manipulation items-start justify-between gap-3 text-left"
        aria-expanded={open}
      >
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[rgb(2,20,50)]">{t('g_title')}</h2>
            <Car className="h-4 w-4 text-blue-500" aria-hidden />
          </div>
          <p className="mt-1 text-sm text-slate-600">{t('g_sub')}</p>
        </div>
        <ChevronDown
          className={`mt-1 h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="mt-4 grid grid-cols-2 gap-3">
            {quickOptions.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.key}
                  type="button"
                  className="group flex min-h-[5.5rem] touch-manipulation flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:border-blue-300 hover:shadow-md active:scale-[0.99]"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 transition group-hover:bg-blue-500 group-hover:text-white group-hover:ring-blue-400">
                    <Icon className="h-5 w-5" strokeWidth={2.25} />
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {t(item.titleKey)}
                  </span>
                  <span className="text-[11px] leading-snug text-slate-600">
                    {t(item.subtitleKey)}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
