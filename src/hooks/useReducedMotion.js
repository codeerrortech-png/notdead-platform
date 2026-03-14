import { useState, useEffect } from 'react'

/**
 * Returns true when we should reduce animation cost (mobile or prefers-reduced-motion).
 * Use to lower particle counts, FPS, or effect density.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return true
    return (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(max-width: 768px)').matches
    )
  })

  useEffect(() => {
    const mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mqMobile = window.matchMedia('(max-width: 768px)')
    const update = () =>
      setReduced(mqReduced.matches || mqMobile.matches)
    mqReduced.addEventListener('change', update)
    mqMobile.addEventListener('change', update)
    return () => {
      mqReduced.removeEventListener('change', update)
      mqMobile.removeEventListener('change', update)
    }
  }, [])

  return reduced
}
