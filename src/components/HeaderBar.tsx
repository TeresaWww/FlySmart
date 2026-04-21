import { Menu } from 'lucide-react'
import { branding } from '../lib/brandingAssets'
import { landingGradientBgStyle } from '../lib/landingGradient'
import { useI18n } from '../i18n/useI18n'

export function HeaderBar() {
  const { t } = useI18n()
  return (
    <header
      className="relative overflow-hidden pb-10 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pt-[max(0.75rem,env(safe-area-inset-top))] text-white shadow-md"
      style={landingGradientBgStyle}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-16 h-40 w-40 rounded-full bg-white/10 blur-2xl"
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-md items-center justify-between">
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25 transition hover:bg-white/25 active:scale-[0.98]"
          aria-label={t('hdr_menu')}
        >
          <Menu className="h-6 w-6" strokeWidth={2.25} />
        </button>
        <img
          src={branding.airplane}
          alt=""
          className="h-9 w-auto max-w-[3.25rem] shrink-0 object-contain"
          width={120}
          height={72}
          decoding="async"
          aria-hidden
        />
      </div>
    </header>
  )
}
