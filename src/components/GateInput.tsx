import { Warehouse } from 'lucide-react'

type GateInputProps = {
  id: string
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  error?: string
}

const gateLetters = ['A', 'B', 'C', 'D', 'N', 'S'] as const

function parseGate(value: string): { letter: string; number: string } {
  const match = value.trim().toUpperCase().match(/^([A-Z])\s*(\d*)/)
  if (!match) return { letter: '', number: '' }
  return { letter: match[1] ?? '', number: match[2] ?? '' }
}

export function GateInput({ id, label, placeholder, value, onChange, error }: GateInputProps) {
  const invalid = Boolean(error)
  const parsed = parseGate(value)

  const setGate = (letter: string, number: string) => {
    onChange(letter ? `${letter}${number}` : '')
  }

  return (
    <div className="space-y-1.5">
      <label htmlFor={`${id}-letter`} className="block text-xs font-bold uppercase tracking-wide text-slate-600">
        {label}
      </label>
      <div className="grid grid-cols-[minmax(6.5rem,0.7fr)_minmax(0,1.3fr)] gap-2">
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg bg-slate-100 text-slate-700 ring-1 ring-slate-200/80">
            <Warehouse className="h-4 w-4" strokeWidth={2.25} />
          </span>
          <select
            id={`${id}-letter`}
            value={parsed.letter}
            onChange={(e) => setGate(e.target.value, parsed.number)}
            aria-invalid={invalid}
            className={`h-12 w-full min-h-12 touch-manipulation appearance-none rounded-xl border bg-white pl-[3.25rem] pr-3 text-base font-medium text-slate-900 shadow-sm outline-none transition focus:ring-2 focus:ring-offset-0 sm:text-sm ${
              invalid
                ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                : 'border-slate-200 focus:border-blue-400 focus:ring-blue-200'
            }`}
          >
            <option value="" disabled>
              Letter
            </option>
            {gateLetters.map((letter) => (
              <option key={letter} value={letter}>
                {letter}
              </option>
            ))}
          </select>
        </div>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={1}
          max={26}
          value={parsed.number}
          onChange={(e) => setGate(parsed.letter, e.target.value.replace(/\D/g, '').slice(0, 2))}
          aria-invalid={invalid}
          aria-describedby={invalid ? `${id}-error` : undefined}
          placeholder={placeholder}
          className={`h-12 min-h-12 w-full touch-manipulation rounded-xl border bg-white px-4 text-base font-medium text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-offset-0 sm:text-sm ${
            invalid
              ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
              : 'border-slate-200 focus:border-blue-400 focus:ring-blue-200'
          }`}
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
