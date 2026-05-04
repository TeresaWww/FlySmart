import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { ChevronDown, Compass, Search, type LucideIcon } from 'lucide-react'
import type { DestinationGroupId } from '../data/destinationsCatalog'
import {
  destinationLabelForId,
  getGroupedDestinationsForQuery,
} from '../data/destinationsCatalog'
import type { MessageKey } from '../i18n/dictionaries'
import { labelDestination, labelDestinationBenchmark } from '../i18n/formOptions'
import { useI18n } from '../i18n/useI18n'

const GROUP_TITLE_KEY: Record<DestinationGroupId, MessageKey> = {
  popular: 'dest_grp_popular',
  eastside: 'dest_grp_eastside',
  north: 'dest_grp_north',
  south: 'dest_grp_south',
  broader: 'dest_grp_broader',
}

type DestinationInputProps = {
  id: string
  label: string
  /** Closed-state placeholder when nothing selected. */
  placeholder: string
  icon?: LucideIcon
  value: string
  onChange: (value: string) => void
  error?: string
}

export function DestinationInput({
  id,
  label,
  placeholder,
  icon: Icon = Compass,
  value,
  onChange,
  error,
}: DestinationInputProps) {
  const { language, t } = useI18n()
  const invalid = Boolean(error)
  const listboxId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const grouped = useMemo(() => getGroupedDestinationsForQuery(search), [search])

  const flatIds = useMemo(
    () => grouped.flatMap((g) => g.entries.map((e) => e.id)),
    [grouped],
  )

  const indexById = useMemo(() => {
    const m = new Map<string, number>()
    flatIds.forEach((fid, i) => m.set(fid, i))
    return m
  }, [flatIds])

  const selectedLabel = useMemo(() => {
    if (!value) return ''
    const cat = destinationLabelForId(value)
    if (cat) return cat
    return labelDestination(language, value)
  }, [language, value])

  const benchmarkHint = value ? labelDestinationBenchmark(language, value) : ''

  useEffect(() => {
    if (!open) return
    const id = requestAnimationFrame(() => {
      setActiveIndex(flatIds.length > 0 ? 0 : -1)
    })
    return () => cancelAnimationFrame(id)
  }, [open, flatIds])

  useEffect(() => {
    if (!open) return
    const tmr = window.setTimeout(() => searchRef.current?.focus(), 0)
    return () => window.clearTimeout(tmr)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  const selectById = useCallback(
    (nextId: string) => {
      onChange(nextId)
      setOpen(false)
      setSearch('')
    },
    [onChange],
  )

  const onKeyDownList = useCallback(
    (e: KeyboardEvent) => {
      if (flatIds.length === 0) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => (i + 1) % flatIds.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => (i - 1 + flatIds.length) % flatIds.length)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        const id = flatIds[activeIndex]
        if (id) selectById(id)
      } else if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
      }
    },
    [activeIndex, flatIds, selectById],
  )

  return (
    <div ref={rootRef} className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-bold uppercase tracking-wide text-slate-600">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg bg-slate-100 text-slate-700 ring-1 ring-slate-200/80">
          <Icon className="h-4 w-4" strokeWidth={2.25} />
        </span>
        <button
          type="button"
          id={id}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-invalid={invalid}
          aria-describedby={invalid ? `${id}-error` : undefined}
          onClick={() => setOpen((o) => !o)}
          className={`flex h-12 min-h-12 w-full touch-manipulation items-center justify-between gap-2 rounded-xl border bg-white pl-[3.25rem] pr-3 text-left text-base font-medium shadow-sm outline-none transition focus:ring-2 focus:ring-offset-0 sm:text-sm ${
            invalid
              ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
              : 'border-slate-200 focus:border-blue-400 focus:ring-blue-200'
          } ${value ? 'text-slate-900' : 'text-slate-400'}`}
        >
          <span className="min-w-0 flex-1 truncate">{value ? selectedLabel : placeholder}</span>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`}
            aria-hidden
          />
        </button>

        {open ? (
          <div
            id={listboxId}
            role="listbox"
            aria-label={t('f_dest_l')}
            className="absolute left-0 right-0 top-[calc(100%+0.35rem)] z-40 max-h-[min(22rem,55dvh)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/15 ring-1 ring-slate-200/80"
            onKeyDown={onKeyDownList}
          >
            <div className="border-b border-slate-100 p-2">
              <div className="mb-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    onChange('')
                    setOpen(false)
                    setSearch('')
                  }}
                  className="touch-manipulation rounded-lg px-2 py-1 text-xs font-semibold text-slate-600 underline-offset-2 hover:text-[rgb(2,20,50)] hover:underline"
                >
                  {t('f_dest_clear')}
                </button>
              </div>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  ref={searchRef}
                  type="search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setActiveIndex(0)
                  }}
                  placeholder={t('dest_search_ph')}
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-200"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                />
              </div>
            </div>
            <div className="max-h-[min(18rem,45dvh)] overflow-y-auto overscroll-y-contain py-1">
              {grouped.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-slate-500">{t('dest_empty')}</p>
              ) : (
                grouped.map(({ group, entries }) => (
                  <div key={group} className="px-1 pb-2">
                    <p className="sticky top-0 z-10 bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                      {t(GROUP_TITLE_KEY[group])}
                    </p>
                    <ul className="space-y-0.5">
                      {entries.map((entry) => {
                        const globalIndex = indexById.get(entry.id) ?? -1
                        const active = globalIndex === activeIndex
                        return (
                          <li key={entry.id}>
                            <button
                              type="button"
                              role="option"
                              aria-selected={value === entry.id}
                              onMouseEnter={() => setActiveIndex(globalIndex)}
                              onClick={() => selectById(entry.id)}
                              className={`flex w-full touch-manipulation items-center rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
                                active ? 'bg-sky-50 text-[rgb(2,20,50)]' : 'text-slate-800 hover:bg-slate-50'
                              }`}
                            >
                              {entry.label}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : null}
      </div>
      {value && benchmarkHint ? (
        <p className="text-xs font-medium text-slate-500">
          {t('dest_benchmark_hint', { area: benchmarkHint })}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  )
}
