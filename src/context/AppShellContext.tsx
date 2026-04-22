import { createContext, useContext, type ReactNode } from 'react'

export type AppShellContextValue = {
  openLanguageSettings: () => void
  openBookmarkHistory: () => void
}

const AppShellContext = createContext<AppShellContextValue | null>(null)

export function AppShellProvider({
  value,
  children,
}: {
  value: AppShellContextValue
  children: ReactNode
}) {
  return <AppShellContext.Provider value={value}>{children}</AppShellContext.Provider>
}

export function useAppShell() {
  const ctx = useContext(AppShellContext)
  if (!ctx) {
    throw new Error('useAppShell must be used within AppShellProvider')
  }
  return ctx
}
