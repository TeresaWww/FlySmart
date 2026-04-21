const base = import.meta.env.BASE_URL

/** Raster branding in `public/branding/` */
export const branding = {
  airplane: `${base}branding/airplane.png`,
  wordmark: `${base}branding/flysmart-wordmark.png`,
  fsStar: `${base}branding/fs-star.png`,
} as const
