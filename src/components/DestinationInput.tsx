import { Compass, type LucideIcon } from 'lucide-react'
import type { SelectOption } from '../i18n/formOptions'
import { matchDestinationBenchmark } from '../lib/destinationBenchmarks'

type DestinationInputProps = {
  id: string
  label: string
  placeholder: string
  icon?: LucideIcon
  value: string
  options: readonly SelectOption[]
  onChange: (value: string) => void
  error?: string
}

export function DestinationInput({
  id,
  label,
  placeholder,
  icon: Icon = Compass,
  value,
  options,
  onChange,
  error,
}: DestinationInputProps) {
  const invalid = Boolean(error)
  const matchedValue = value ? matchDestinationBenchmark(value) : ''
  const matchedLabel = options.find((option) => option.value === matchedValue)?.label

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-bold uppercase tracking-wide text-slate-600">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg bg-slate-100 text-slate-700 ring-1 ring-slate-200/80">
          <Icon className="h-4 w-4" strokeWidth={2.25} />
        </span>
        <input
          id={id}
          list={`${id}-benchmarks`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={invalid}
          aria-describedby={invalid ? `${id}-error` : undefined}
          placeholder={`${placeholder}, address, or county`}
          className={`h-12 w-full min-h-12 touch-manipulation rounded-xl border bg-white pl-[3.25rem] pr-4 text-base font-medium text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-offset-0 sm:text-sm ${
            invalid
              ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
              : 'border-slate-200 focus:border-blue-400 focus:ring-blue-200'
          }`}
        />
        <datalist id={`${id}-benchmarks`}>
          {options
            .filter((option) => option.value)
            .map((option) => (
              <option key={option.value} value={option.label} />
            ))}
        </datalist>
      </div>
      {value && matchedLabel ? (
        <p className="text-xs font-medium text-slate-500">Estimate benchmark: {matchedLabel}</p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  )
}
