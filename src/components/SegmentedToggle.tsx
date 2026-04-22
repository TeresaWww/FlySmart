import type { LucideIcon } from 'lucide-react'

export type SegmentDefinition<T extends string> = {
  value: T
  title: string
  description: string
  icon: LucideIcon
}

type SegmentedToggleProps<T extends string> = {
  options: SegmentDefinition<T>[]
  value: T
  onChange: (next: T) => void
  className?: string
}

export function SegmentedToggle<T extends string>({
  options,
  value,
  onChange,
  className = '',
}: SegmentedToggleProps<T>) {
  return (
    <div
      className={`grid gap-1 rounded-2xl bg-slate-100/90 p-1 ring-1 ring-slate-200/80 ${className}`}
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
      role="tablist"
      aria-label="Selection"
    >
      {options.map((opt) => {
        const selected = value === opt.value
        const Icon = opt.icon
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(opt.value)}
            className={`flex min-h-11 touch-manipulation items-center rounded-xl px-1.5 py-1.5 text-left transition-all duration-200 active:scale-[0.99] sm:px-2 ${
              selected
                ? 'bg-blue-500 text-white shadow-md shadow-blue-500/25 ring-1 ring-blue-400/40'
                : 'bg-white text-slate-900 ring-1 ring-slate-200/70 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                  selected ? 'bg-white/15' : 'bg-slate-100'
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${selected ? 'text-white' : 'text-slate-700'}`}
                  strokeWidth={2}
                />
              </span>
              <span className="min-w-0">
                <span
                  className={`block text-xs font-semibold leading-snug tracking-tight sm:text-[13px] ${
                    selected ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {opt.title}
                </span>
                <span
                  className={`mt-0.5 block text-[11px] font-medium leading-snug tracking-tight sm:text-xs ${
                    selected ? 'text-white/80' : 'text-slate-500'
                  }`}
                >
                  {opt.description}
                </span>
              </span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
