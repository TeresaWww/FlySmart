import { useEffect, useMemo, useState } from 'react'
import { Bookmark, X } from 'lucide-react'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'
import { useArrivalForm } from '../context/ArrivalFormContext'
import { useI18n } from '../i18n/useI18n'
import { labelDestination, labelGate, labelTransport } from '../i18n/formOptions'
import { loadSavedRoutes, type SavedRouteEntry } from '../lib/savedRoutesStorage'

type BookmarkHistorySheetProps = {
  open: boolean
  onClose: () => void
}

function formatWhen(savedAt: number, locale: string) {
  try {
    return new Intl.DateTimeFormat(locale, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(savedAt))
  } catch {
    return new Date(savedAt).toLocaleString()
  }
}

export function BookmarkHistorySheet({ open, onClose }: BookmarkHistorySheetProps) {
  const { language, t } = useI18n()
  const { setForm } = useArrivalForm()
  const [entries, setEntries] = useState<SavedRouteEntry[]>([])

  const locale = useMemo(() => {
    const map: Record<string, string> = {
      en: 'en-US',
      es: 'es-US',
      zh: 'zh-Hans-CN',
      ko: 'ko-KR',
      ja: 'ja-JP',
      vi: 'vi-VN',
    }
    return map[language] ?? 'en-US'
  }, [language])

  useBodyScrollLock(open)

  useEffect(() => {
    if (!open) return
    setEntries(loadSavedRoutes())
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const lineFor = (form: SavedRouteEntry['form']) =>
    `${labelGate(language, form.gate)} → ${labelDestination(language, form.destination)} · ${labelTransport(language, form.transport)}`

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/45 backdrop-blur-[2px]"
        aria-label={t('r_close_bd')}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="flysmart-bookmarks-title"
        className="relative z-10 flex max-h-[min(88dvh,calc(100dvh-env(safe-area-inset-top)-0.5rem))] w-full max-w-md flex-col rounded-t-3xl bg-white shadow-2xl ring-1 ring-slate-200 sm:max-h-[min(80dvh,36rem)] sm:rounded-3xl"
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 sm:pt-5">
          <div className="flex min-w-0 items-center gap-2">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[rgb(2,20,50)] ring-1 ring-sky-100">
              <Bookmark className="h-5 w-5" aria-hidden />
            </span>
            <h2
              id="flysmart-bookmarks-title"
              className="truncate text-lg font-bold text-[rgb(2,20,50)]"
            >
              {t('hdr_bookmarks_title')}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 min-w-11 shrink-0 touch-manipulation items-center justify-center rounded-xl text-slate-500 ring-1 ring-slate-200 transition hover:bg-slate-50"
            aria-label={t('r_close')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-5 py-4 sm:px-6">
          {entries.length === 0 ? (
            <p className="text-center text-sm text-slate-600">{t('hdr_bookmarks_empty')}</p>
          ) : (
            <>
              <p className="mb-3 text-xs text-slate-500">{t('hdr_bookmarks_hint')}</p>
              <ul className="space-y-2">
                {entries.map((e) => (
                  <li key={e.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setForm(e.form)
                        onClose()
                      }}
                      className="flex w-full touch-manipulation flex-col items-start gap-1 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-left ring-1 ring-slate-100 transition hover:border-sky-200 hover:bg-white"
                    >
                      <span className="text-sm font-semibold text-[rgb(2,20,50)]">{lineFor(e.form)}</span>
                      <span className="text-xs text-slate-500">{formatWhen(e.savedAt, locale)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="shrink-0 border-t border-slate-100 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-12 w-full touch-manipulation items-center justify-center rounded-2xl bg-[rgb(2,20,50)] text-base font-semibold text-white shadow-md transition hover:brightness-110 active:scale-[0.99]"
          >
            {t('r_back')}
          </button>
        </div>
      </div>
    </div>
  )
}
