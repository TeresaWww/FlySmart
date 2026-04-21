import { useEffect } from 'react'

/**
 * Prevents background scroll when overlays (e.g. modals) are open — important on mobile Safari.
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [locked])
}
