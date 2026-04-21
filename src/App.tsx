import { useState } from 'react'
import { ArrivalFormView } from './components/ArrivalFormView'
import { I18nProvider } from './i18n/I18nProvider'
import { LandingLanguage } from './landing/LandingLanguage'
import { LandingSplashBrand } from './landing/LandingSplashBrand'
import type { LanguageCode } from './types/language'

type LandingPhase = 'splash' | 'language' | 'arrival'

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
      <ArrivalFormView />
    </I18nProvider>
  )
}

export default App
