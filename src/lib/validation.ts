import type { LanguageCode } from '../types/language'
import { t } from '../i18n/t'
import type { ArrivalFormState } from '../types/arrival'

export type FieldErrors = Partial<Record<'gate' | 'transport' | 'destination', string>>

export function validateArrivalForm(
  form: ArrivalFormState,
  lang: LanguageCode,
): FieldErrors {
  const errors: FieldErrors = {}

  if (!form.gate) errors.gate = t(lang, 'e_gate')
  if (!form.transport) errors.transport = t(lang, 'e_transport')
  if (!form.destination) errors.destination = t(lang, 'e_dest')

  return errors
}
