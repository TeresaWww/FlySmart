import type { LanguageCode } from '../types/language'
import { t } from '../i18n/t'
import { transportSelectOptions } from '../i18n/formOptions'
import type { ArrivalFormState } from '../types/arrival'
import { findGateGroup } from '../data/seaTacGates'

export type FieldErrors = Partial<Record<'gate' | 'transport' | 'destination', string>>

export function validateArrivalForm(
  form: ArrivalFormState,
  lang: LanguageCode,
): FieldErrors {
  const errors: FieldErrors = {}

  if (!form.gate || !findGateGroup(form.gate, form.flightScope)) errors.gate = t(lang, 'e_gate')
  if (!form.transport) errors.transport = t(lang, 'e_transport')
  else if (transportSelectOptions(lang).find((o) => o.value === form.transport)?.disabled) {
    errors.transport = t(lang, 'e_transport')
  }
  if (!form.destination.trim()) errors.destination = t(lang, 'e_dest')

  return errors
}
