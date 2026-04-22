import { useMemo, useState } from 'react'
import { ArrivalFormView } from './components/ArrivalFormView'
import { BookmarkHistorySheet } from './components/BookmarkHistorySheet'
import { ArrivalFormProvider } from './context/ArrivalFormContext'
import { AppShellProvider } from './context/AppShellContext'
import { I18nProvider } from './i18n/I18nProvider'
import { LandingLanguage } from './landing/LandingLanguage'
import { LandingSplashBrand } from './landing/LandingSplashBrand'
import type { LanguageCode } from './types/language'

type LandingPhase = 'splash' | 'language' | 'arrival'

function ArrivalExperience({ onRequestLanguage }: { onRequestLanguage: () => void }) {
  const [bookmarksOpen, setBookmarksOpen] = useState(false)
  const shell = useMemo(
    () => ({
      openLanguageSettings: onRequestLanguage,
      openBookmarkHistory: () => setBookmarksOpen(true),
    }),
    [onRequestLanguage],
  )
  return (
    <ArrivalFormProvider>
      <AppShellProvider value={shell}>
        <ArrivalFormView />
        <BookmarkHistorySheet open={bookmarksOpen} onClose={() => setBookmarksOpen(false)} />
      </AppShellProvider>
    </ArrivalFormProvider>
  )
}

function App() {
  const [phase, setPhase] = useState<LandingPhase>('splash')
  const [language, setLanguage] = useState<LanguageCode>('en')

  if (phase === 'splash') {
    return <LandingSplashBrand onContinue={() => setPhase('language')} />
  }

  if (phase === 'language') {
    return (
      <LandingLanguage
        selected={language}
        onSelect={setLanguage}
        onDone={() => setPhase('arrival')}
      />
    )
  }

  return (
    <I18nProvider language={language}>
      <ArrivalExperience onRequestLanguage={() => setPhase('language')} />
    </I18nProvider>
  )
}

export default App
