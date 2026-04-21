import type { LanguageCode } from '../types/language'
import { dictionaries, type MessageKey } from './dictionaries'

export type { MessageKey }

/** Interpolate {{name}} placeholders */
export function interpolate(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) =>
    String(vars[key] ?? ''),
  )
}

export function t(lang: LanguageCode, key: MessageKey, vars?: Record<string, string | number>): string {
  const table = dictionaries[lang] ?? dictionaries.en
  const raw = (table[key] ?? dictionaries.en[key] ?? key) as string
  return vars ? interpolate(raw, vars) : raw
}
