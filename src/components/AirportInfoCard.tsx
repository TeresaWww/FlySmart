import { ChevronRight } from 'lucide-react'
import { branding } from '../lib/brandingAssets'
import { useI18n } from '../i18n/useI18n'

export function AirportInfoCard() {
  const { t } = useI18n()
  return (
    <button
      type="button"
      className="flex min-h-14 w-full touch-manipulation items-center justify-between gap-3 rounded-3xl bg-white p-5 text-left shadow-md shadow-slate-900/5 ring-1 ring-slate-200/70 transition hover:border-blue-200 hover:shadow-lg active:scale-[0.99]"
    >
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-[rgb(2,20,50)]">{t('ap_title')}</h2>
          <img
            src={branding.airplane}
            alt=""
            className="h-6 w-auto max-w-[2rem] object-contain opacity-90"
            width={64}
            height={40}
            decoding="async"
            aria-hidden
          />
        </div>
        <p className="mt-1 text-sm text-slate-600">{t('ap_sub')}</p>
      </div>
      <ChevronRight className="h-5 w-5 shrink-0 text-slate-400" aria-hidden />
    </button>
  )
}
