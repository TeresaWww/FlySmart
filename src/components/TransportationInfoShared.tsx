import { type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

export function InfoAccordion({
  title,
  open,
  onClick,
  children,
}: {
  title: string
  open: boolean
  onClick: () => void
  children: ReactNode
}) {
  const id = title.replace(/\s+/g, '-').toLowerCase()

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={onClick}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        className="flex w-full touch-manipulation items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <h4 className="text-sm font-bold text-[rgb(2,20,50)]">{title}</h4>
        <ChevronDown className={`h-4 w-4 text-slate-500 transition ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>
      {open ? (
        <div id={`${id}-panel`} className="border-t border-slate-100 px-4 py-3">
          {children}
        </div>
      ) : null}
    </section>
  )
}

export function InfoHero({
  icon,
  title,
  children,
}: {
  icon: ReactNode
  title: string
  children: ReactNode
}) {
  return (
    <div className="rounded-2xl bg-blue-50 p-4 ring-1 ring-blue-100">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 ring-1 ring-blue-100">
          {icon}
        </span>
        <div>
          <h3 className="text-lg font-bold text-[rgb(2,20,50)]">{title}</h3>
          <p className="mt-1 text-sm leading-snug text-slate-700">{children}</p>
        </div>
      </div>
    </div>
  )
}
