import { Languages, UserRound } from 'lucide-react'
import { t } from '../i18n/t'
import { branding } from '../lib/brandingAssets'
import { LandingLayout } from './LandingLayout'
import type { LanguageCode } from '../types/language'
import { languages } from '../types/language'

type LandingLanguageProps = {
  selected: LanguageCode
  onSelect: (code: LanguageCode) => void
  onDone: () => void
}

function CompactBrand() {
  return (
    <img
      src={branding.wordmark}
      alt="FlySmart Seattle"
      className="mx-auto h-auto w-full max-w-[240px] object-contain"
      width={480}
      height={150}
      decoding="async"
    />
  )
}

export function LandingLanguage({ selected, onSelect, onDone }: LandingLanguageProps) {
  return (
    <LandingLayout>
      <div className="flex min-h-dvh flex-col px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))]">
        <header className="shrink-0 pt-2">
          <div className="mx-auto max-w-sm rounded-2xl bg-white/95 px-5 py-4 shadow-lg shadow-slate-900/15 ring-1 ring-white/70">
            <CompactBrand />
          </div>
        </header>

        <div className="mt-8 flex flex-col items-center gap-3 text-white">
          <div className="flex items-center gap-4 rounded-2xl bg-white/15 px-6 py-3 ring-1 ring-white/25">
            <UserRound className="h-10 w-10 text-white" strokeWidth={1.75} aria-hidden />
            <Languages className="h-10 w-10 text-white" strokeWidth={1.75} aria-hidden />
          </div>
          <p className="text-center text-sm font-medium text-white/90">
            {t(selected, 'lang_choose')}
          </p>
        </div>

        <div className="mt-8 grid flex-1 grid-cols-3 gap-2 sm:gap-3">
          {languages.map(({ code, label }) => {
            const isOn = selected === code
            return (
              <button
                key={code}
                type="button"
                onClick={() => onSelect(code)}
                className={`touch-manipulation rounded-2xl border px-1.5 py-3 text-center text-xs font-semibold leading-snug transition sm:text-sm ${
                  isOn
                    ? 'border-white/70 bg-sky-300/50 text-[#0a254d] shadow-md shadow-sky-900/10'
                    : 'border-white/45 bg-white/10 text-white hover:bg-white/15'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>

        <div className="mt-8 shrink-0">
          <button
            type="button"
            onClick={onDone}
            className="flex min-h-14 w-full touch-manipulation items-center justify-center rounded-full bg-[#0a254d] text-base font-bold uppercase tracking-widest text-white shadow-lg shadow-slate-900/30 transition hover:brightness-110 active:scale-[0.99]"
          >
            {t(selected, 'lang_done')}
          </button>
        </div>

        <p className="mt-6 text-center text-sm italic text-white/75">
          {t(selected, 'lang_step1')}
        </p>
      </div>
    </LandingLayout>
  )
}
