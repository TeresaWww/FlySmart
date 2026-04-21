import type { CSSProperties } from 'react'

/** Shared vertical gradient art (served from `public/landing-gradient.png`). */
export const landingGradientUrl = `${import.meta.env.BASE_URL}landing-gradient.png`

export const landingGradientBgStyle: CSSProperties = {
  backgroundColor: '#002d52',
  backgroundImage: `url(${landingGradientUrl})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center top',
}
