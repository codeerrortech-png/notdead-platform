import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * Counts up from 0 to target when in view. For hero stat cards.
 */
export default function StatCounter({ target, suffix = '', duration = 2, delay = 0 }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) setStarted(true)
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const startTime = Date.now()
    const endTime = startTime + duration * 1000
    let raf = 0
    const tick = () => {
      const now = Date.now()
      const elapsed = (now - startTime) / 1000 - delay
      if (elapsed <= 0) {
        raf = requestAnimationFrame(tick)
        return
      }
      const t = Math.min(elapsed / duration, 1)
      const eased = 1 - (1 - t) * (1 - t)
      setCount(Math.floor(eased * target))
      if (now < endTime) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [started, target, duration, delay])

  return (
    <span ref={ref} className="inline-block">
      {count}
      {suffix}
    </span>
  )
}
