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

  if (!form.gate?.trim()) {
    errors.gate = t(lang, 'e_gate')
  } else if (!findGateGroup(form.gate, form.flightScope)) {
    errors.gate = t(lang, 'e_gate_invalid')
  }
  if (form.transport?.trim()) {
    if (transportSelectOptions(lang).find((o) => o.value === form.transport)?.disabled) {
      errors.transport = t(lang, 'e_transport')
    }
  }

  return errors
}
