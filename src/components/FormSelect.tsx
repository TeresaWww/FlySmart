import { ChevronDown, type LucideIcon } from 'lucide-react'

type Option = { value: string; label: string }

type FormSelectProps = {
  id: string
  label: string
  placeholder: string
  icon: LucideIcon
  value: string
  options: readonly Option[]
  onChange: (value: string) => void
  error?: string
}

export function FormSelect({
  id,
  label,
  placeholder,
  icon: Icon,
  value,
  options,
  onChange,
  error,
}: FormSelectProps) {
  const invalid = Boolean(error)

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-xs font-bold uppercase tracking-wide text-slate-600"
      >
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg bg-slate-100 text-slate-700 ring-1 ring-slate-200/80">
          <Icon className="h-4 w-4" strokeWidth={2.25} />
        </span>
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={invalid}
          aria-describedby={invalid ? `${id}-error` : undefined}
          className={`h-12 w-full min-h-12 touch-manipulation appearance-none rounded-xl border bg-white pl-[3.25rem] pr-10 text-base font-medium text-slate-900 shadow-sm outline-none transition focus:ring-2 focus:ring-offset-0 sm:text-sm ${
            invalid
              ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
              : 'border-slate-200 focus:border-blue-400 focus:ring-blue-200'
          }`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options
            .filter((o) => o.value !== '')
            .map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          aria-hidden
        />
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  )
}
