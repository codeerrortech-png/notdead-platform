import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

/**
 * Scrolls window to top whenever the route (pathname) changes.
 * Runs immediately and again after a short delay so lazy-loaded pages also start from top.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    scrollToTop()
    const t = setTimeout(scrollToTop, 100)
    return () => clearTimeout(t)
  }, [pathname])

  return null
}
