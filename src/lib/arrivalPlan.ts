import type { LanguageCode } from '../types/language'
import { t } from '../i18n/t'
import { labelDestination, labelGate, labelTransport } from '../i18n/formOptions'
import type { ArrivalFormState } from '../types/arrival'

export type ArrivalPlan = {
  steps: string[]
}

export function buildArrivalPlan(form: ArrivalFormState, lang: LanguageCode): ArrivalPlan {
  const gate = labelGate(lang, form.gate)
  const transport = labelTransport(lang, form.transport)
  const destination = labelDestination(lang, form.destination)

  const steps: string[] = [t(lang, 'plan_gate', { gate })]

  if (form.flightScope === 'international') {
    if (form.trustedTravelerProgram) {
      steps.push(t(lang, 'plan_ttp'))
    } else {
      steps.push(t(lang, 'plan_passport'))
    }
  }

  steps.push(
    t(lang, 'plan_bags'),
    t(lang, 'plan_exit', { transport }),
    t(lang, 'plan_route', { destination }),
    t(lang, 'plan_party', { n: form.travelers }),
  )

  return { steps }
}
