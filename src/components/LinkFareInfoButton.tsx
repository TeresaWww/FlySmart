import { useEffect, useId, useRef, useState } from 'react'
import { ExternalLink, Info } from 'lucide-react'
import { useI18n } from '../i18n/useI18n'

const LINK_FARES_URL = 'https://www.soundtransit.org/ride-with-us/how-to-pay/fares'

type LinkFareInfoButtonProps = {
  label: string
  panelAlign?: 'left' | 'right'
  panelPlacement?: 'below' | 'above'
  className?: string
}

export function LinkFareInfoButton({
  label,
  panelAlign = 'left',
  panelPlacement = 'below',
  className = '',
}: LinkFareInfoButtonProps) {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const rootRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <span ref={rootRef} className={`relative inline-flex ${className}`}>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white py-1 pl-3 pr-1.5 text-xs font-semibold text-[rgb(2,20,50)] shadow-sm ring-1 ring-sky-100/80">
        <span>{label}</span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={t('link_fare_info_label')}
          className={`inline-flex min-h-7 min-w-7 shrink-0 touch-manipulation items-center justify-center rounded-full border border-sky-300 bg-sky-100 text-sky-800 shadow-sm transition hover:border-sky-500 hover:bg-sky-200 hover:text-sky-950 active:scale-95 ${
            open ? 'border-sky-600 bg-sky-200 ring-2 ring-sky-300/60' : ''
          }`}
        >
          <Info className="h-4 w-4" strokeWidth={2.25} aria-hidden />
        </button>
      </span>
      {open ? (
        <div
          id={panelId}
          role="region"
          aria-label={t('link_fare_info_title')}
          className={`absolute z-30 w-[min(15rem,calc(100vw-2.5rem))] rounded-xl border border-sky-200 bg-white px-3 py-2.5 text-left text-xs leading-snug text-slate-700 shadow-lg ring-1 ring-sky-100/80 ${
            panelPlacement === 'above'
              ? 'bottom-[calc(100%+0.375rem)]'
              : 'top-[calc(100%+0.375rem)]'
          } ${panelAlign === 'right' ? 'right-0' : 'left-0'}`}
        >
          <p className="font-semibold text-[rgb(2,20,50)]">{t('link_fare_info_title')}</p>
          <ul className="mt-1.5 list-disc space-y-1 pl-4">
            <li>{t('link_fare_info_adult')}</li>
            <li>{t('link_fare_info_youth')}</li>
            <li>{t('link_fare_info_senior')}</li>
          </ul>
          <a
            href={LINK_FARES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-sky-800 underline decoration-sky-300 underline-offset-2 hover:text-sky-950"
          >
            {t('link_fare_info_source')}
            <ExternalLink className="h-3 w-3 shrink-0" aria-hidden />
          </a>
        </div>
      ) : null}
    </span>
  )
}
