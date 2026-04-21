import { useCallback, useMemo, type ReactNode } from 'react'
import type { LanguageCode } from '../types/language'
import { t as translate } from './t'
import { I18nContext, type TranslateFn } from './i18nContext'

export function I18nProvider({
  language,
  children,
}: {
  language: LanguageCode
  children: ReactNode
}) {
  const t = useCallback<TranslateFn>(
    (key, vars) => translate(language, key, vars),
    [language],
  )

  const value = useMemo(
    () => ({
      language,
      t,
    }),
    [language, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
