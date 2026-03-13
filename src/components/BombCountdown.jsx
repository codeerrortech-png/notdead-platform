import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const COUNTDOWN_SECONDS = 2

/**
 * Time bomb: black cylinder, blinking red light, digital countdown (2, 1).
 * Light blinks faster as countdown progresses.
 */
export default function BombCountdown({ onExplode, className = '' }) {
  const [count, setCount] = useState(COUNTDOWN_SECONDS)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), count === 1 ? 200 : 400)
    return () => clearInterval(interval)
  }, [count])

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(timer)
          onExplode()
          return 0
        }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [onExplode])

  return (
    <motion.div
      className={`absolute z-20 flex flex-col items-center justify-center ${className}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      style={{ top: '36%', left: '50%', transform: 'translate(-50%, -50%)', willChange: 'transform' }}
    >
      {/* Black cylinder body */}
      <div className="relative flex flex-col items-center">
        <div
          className="w-12 h-16 rounded-full border-2 border-gray-800"
          style={{
            background: 'linear-gradient(180deg, #1f2937 0%, #111827 40%, #0b0f17 100%)',
            boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.06), 0 4px 12px rgba(0,0,0,0.5)',
          }}
        >
          {/* Blinking red light on top */}
          <motion.div
            className="absolute -top-1 left-1/2 w-2.5 h-2.5 -translate-x-1/2 rounded-full bg-red-500 border border-red-400"
            animate={{
              opacity: tick % 2 === 0 ? 1 : 0.35,
              boxShadow:
                tick % 2 === 0
                  ? '0 0 12px #ef4444, 0 0 24px rgba(239,68,68,0.6)'
                  : '0 0 4px #ef4444',
            }}
            transition={{ duration: 0.12 }}
          />
        </div>
      </div>
      {/* Digital countdown display */}
      <div
        className="mt-2 px-3 py-1.5 rounded border border-cyber-accent/40 flex items-center justify-center min-w-[3rem]"
        style={{
          background: 'rgba(11,15,23,0.9)',
          boxShadow: 'inset 0 0 12px rgba(0,255,156,0.1), 0 0 8px rgba(0,255,156,0.2)',
        }}
      >
        <AnimatePresence mode="wait">
          {count > 0 && (
            <motion.span
              key={count}
              className="font-mono text-2xl font-bold text-cyber-accent tabular-nums"
              initial={{ scale: 1.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{ textShadow: '0 0 16px #00ff9c, 0 0 32px rgba(0,255,156,0.4)' }}
            >
              {count}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
