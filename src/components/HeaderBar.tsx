import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Bookmark, Languages, Menu, X } from 'lucide-react'
import { branding } from '../lib/brandingAssets'
import { landingGradientBgStyle } from '../lib/landingGradient'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'
import { useAppShell } from '../context/AppShellContext'
import { useI18n } from '../i18n/useI18n'

export function HeaderBar() {
  const { t } = useI18n()
  const { openLanguageSettings, openBookmarkHistory } = useAppShell()
  const [menuOpen, setMenuOpen] = useState(false)

  useBodyScrollLock(menuOpen)

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

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
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-haspopup="dialog"
          className="inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25 transition hover:bg-white/25 active:scale-[0.98]"
          aria-label={t('hdr_menu')}
        >
          {menuOpen ? (
            <X className="h-6 w-6" strokeWidth={2.25} aria-hidden />
          ) : (
            <Menu className="h-6 w-6" strokeWidth={2.25} aria-hidden />
          )}
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

      {menuOpen
        ? createPortal(
            <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-start sm:justify-end sm:p-3">
              <button
                type="button"
                className="absolute inset-0 bg-slate-900/35 sm:bg-slate-900/20"
                aria-label={t('r_close_bd')}
                onClick={() => setMenuOpen(false)}
              />
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="flysmart-header-menu-title"
                className="relative z-10 m-0 w-full max-w-md rounded-t-3xl bg-white p-4 text-slate-900 shadow-2xl ring-1 ring-slate-200 sm:mt-14 sm:mr-[max(0.5rem,env(safe-area-inset-right))] sm:rounded-2xl sm:shadow-xl"
              >
                <p
                  id="flysmart-header-menu-title"
                  className="text-xs font-bold uppercase tracking-wide text-slate-500"
                >
                  {t('hdr_menu_sheet_title')}
                </p>
                <div className="mt-3 space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false)
                      openLanguageSettings()
                    }}
                    className="flex w-full touch-manipulation items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-left ring-1 ring-slate-100 transition hover:border-sky-200 hover:bg-white"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[rgb(2,20,50)] ring-1 ring-sky-100">
                      <Languages className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="text-sm font-semibold">{t('hdr_menu_language')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false)
                      openBookmarkHistory()
                    }}
                    className="flex w-full touch-manipulation items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-left ring-1 ring-slate-100 transition hover:border-sky-200 hover:bg-white"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[rgb(2,20,50)] ring-1 ring-sky-100">
                      <Bookmark className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="text-sm font-semibold">{t('hdr_menu_bookmarks')}</span>
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </header>
  )
}
