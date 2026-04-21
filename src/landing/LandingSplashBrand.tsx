import { t } from '../i18n/t'
import { branding } from '../lib/brandingAssets'
import { LandingLayout } from './LandingLayout'

type LandingSplashBrandProps = {
  onContinue: () => void
}

export function LandingSplashBrand({ onContinue }: LandingSplashBrandProps) {
  return (
    <LandingLayout>
      <button
        type="button"
        onClick={onContinue}
        className="flex min-h-dvh w-full touch-manipulation flex-col items-center justify-between px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] text-center active:opacity-95"
      >
        <div className="flex w-full max-w-md flex-col items-center gap-5 pt-10 sm:pt-14">
          <img
            src={branding.wordmark}
            alt="FlySmart Seattle"
            className="mx-auto w-full max-w-[min(82vw,300px)] object-contain drop-shadow-lg"
            width={640}
            height={200}
            decoding="async"
          />

          <div className="flex w-full justify-center">
            <img
              src={branding.fsStar}
              alt="FlySmart"
              className="mx-auto block h-32 w-32 shrink-0 object-contain drop-shadow-lg sm:h-36 sm:w-36"
              width={176}
              height={176}
              decoding="async"
            />
          </div>

          <p className="max-w-xs text-center text-base font-medium leading-relaxed text-white/95">
            {t('en', 'landing_tagline')}
          </p>
        </div>

        <p className="pt-6 text-sm font-medium text-white/60">{t('en', 'landing_tap')}</p>
      </button>
    </LandingLayout>
  )
}
