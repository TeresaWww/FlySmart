import { createContext } from 'react'
import type { LanguageCode } from '../types/language'
import type { MessageKey } from './dictionaries'

export type TranslateFn = (
  key: MessageKey,
  vars?: Record<string, string | number>,
) => string

export type I18nContextValue = {
  language: LanguageCode
  t: TranslateFn
}

export const I18nContext = createContext<I18nContextValue | null>(null)
