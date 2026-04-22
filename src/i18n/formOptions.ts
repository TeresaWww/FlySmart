import { activeGateClusters } from '../data/seaTacGates'
import type { FlightScope } from '../types/arrival'
import type { LanguageCode } from '../types/language'
import { t } from './t'

export type SelectOption = { value: string; label: string }

/** One option per cluster (e.g. A1–A3), not individual gates. */
export function gateSelectOptions(lang: LanguageCode, flightScope: FlightScope): SelectOption[] {
  const w = t(lang, 'opt_gate_word')
  return [
    { value: '', label: t(lang, 'opt_gate_ph') },
    ...activeGateClusters(flightScope).map((g) => ({ value: g.range, label: `${w} ${g.range}` })),
  ]
}

export function transportSelectOptions(lang: LanguageCode): SelectOption[] {
  return [
    { value: '', label: t(lang, 'opt_tr_ph') },
    { value: 'rideshare', label: t(lang, 'opt_tr_rs') },
    { value: 'link', label: t(lang, 'opt_tr_link') },
    { value: 'taxi', label: t(lang, 'opt_tr_taxi') },
    { value: 'rental', label: t(lang, 'opt_tr_rent') },
    { value: 'shuttle', label: t(lang, 'opt_tr_shuttle') },
  ]
}

export function destinationSelectOptions(lang: LanguageCode): SelectOption[] {
  return [
    { value: '', label: t(lang, 'opt_dest_ph') },
    { value: 'downtown', label: t(lang, 'opt_de_dtw') },
    { value: 'bellevue', label: t(lang, 'opt_de_bel') },
    { value: 'udistrict', label: t(lang, 'opt_de_ud') },
    { value: 'cruise', label: t(lang, 'opt_de_cruise') },
    { value: 'south', label: t(lang, 'opt_de_south') },
    { value: 'north', label: t(lang, 'opt_de_north') },
  ]
}

export function labelGate(lang: LanguageCode, value: string) {
  if (!value) return ''
  return `${t(lang, 'opt_gate_word')} ${value}`
}

export function labelTransport(lang: LanguageCode, value: string) {
  return transportSelectOptions(lang).find((o) => o.value === value)?.label ?? value
}

export function labelDestination(lang: LanguageCode, value: string) {
  return destinationSelectOptions(lang).find((o) => o.value === value)?.label ?? value
}
