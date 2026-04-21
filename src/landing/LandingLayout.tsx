import type { ReactNode } from 'react'
import { landingGradientBgStyle } from '../lib/landingGradient'

type LandingLayoutProps = {
  children: ReactNode
  /** Extra classes on the outer gradient shell */
  className?: string
}

export function LandingLayout({ children, className = '' }: LandingLayoutProps) {
  return (
    <div
      className={`flex min-h-dvh min-h-svh w-full flex-col text-white ${className}`}
      style={landingGradientBgStyle}
    >
      {children}
    </div>
  )
}
