import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Unlock } from 'lucide-react'
import ChainAnimation from './ChainAnimation'
import BombCountdown from './BombCountdown'
import ExplosionEffect from './ExplosionEffect'
import MetalPadlock from './MetalPadlock'

const LOCKED = 'locked'
const COUNTDOWN = 'countdown'
const EXPLODING = 'exploding'
const UNLOCKED = 'unlocked'

/**
 * Locked course overlay: real metal padlock, X-pattern chains, dark overlay.
 * Click → bomb attaches → countdown 2, 1 → explosion (shake, debris) → chains break → "Course Unlocked".
 */
export default function CourseLockOverlay({ children, onUnlock, className = '' }) {
  const [phase, setPhase] = useState(LOCKED)
  const [chainsBreaking, setChainsBreaking] = useState(false)

  const handleClickLocked = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (phase !== LOCKED) return
    setPhase(COUNTDOWN)
  }, [phase])

  const handleExplode = useCallback(() => {
    setPhase(EXPLODING)
    setChainsBreaking(true)
  }, [])

  const handleExplosionComplete = useCallback(() => {
    setPhase(UNLOCKED)
  }, [])

  useEffect(() => {
    if (phase !== UNLOCKED) return
    const t = setTimeout(() => onUnlock?.(), 900)
    return () => clearTimeout(t)
  }, [phase, onUnlock])

  const handleChainBreakComplete = useCallback(() => {})

  const showOverlay = phase !== UNLOCKED

  const isShaking = phase === EXPLODING

  return (
    <div className={`relative ${className}`}>
      {/* Card content */}
      <motion.div
        className="relative z-0"
        animate={{
          filter:
            phase === LOCKED || phase === COUNTDOWN
              ? 'brightness(0.5) saturate(0.7)'
              : 'brightness(1) saturate(1)',
          opacity: 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>

      {showOverlay && (
        <motion.div
          className="absolute inset-0 rounded-xl z-10 cursor-pointer select-none"
          onClick={handleClickLocked}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleClickLocked(e)}
          aria-label="Click to unlock course"
          animate={
            isShaking
              ? {
                  x: [0, -4, 4, -3, 3, -2, 2, 0],
                  y: [0, 2, -2, 1, -1, 0, 0, 0],
                  transition: {
                    duration: 0.5,
                    ease: 'easeOut',
                  },
                }
              : {}
          }
        >
          {/* Dark overlay + metallic texture */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            initial={false}
            animate={{
              opacity:
                phase === EXPLODING ? 0 : phase === LOCKED || phase === COUNTDOWN ? 1 : 0,
            }}
            transition={{ duration: 0.25 }}
            style={{
              background:
                'linear-gradient(135deg, rgba(11,15,23,0.88) 0%, rgba(17,24,39,0.92) 50%, rgba(11,15,23,0.88) 100%)',
              backgroundImage: `
                linear-gradient(135deg, rgba(11,15,23,0.92) 0%, rgba(17,24,39,0.94) 100%),
                repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(107,114,128,0.04) 2px, rgba(107,114,128,0.04) 4px),
                repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(107,114,128,0.04) 2px, rgba(107,114,128,0.04) 4px)
              `,
            }}
          />

          <ChainAnimation
            breaking={chainsBreaking}
            onBreakComplete={handleChainBreakComplete}
          />

          {/* Realistic metal padlock - breaks when exploding */}
          <AnimatePresence mode="wait">
            {(phase === LOCKED || phase === COUNTDOWN) && (
              <motion.div
                key="padlock"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
                initial={{ scale: 1, opacity: 1 }}
                exit={{
                  scale: 1.4,
                  opacity: 0,
                  filter: 'blur(6px)',
                  transition: { duration: 0.25 },
                }}
              >
                <MetalPadlock width={52} height={56} />
                <span className="text-xs text-cyber-text/70 mt-2 font-mono">
                  Click to unlock
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {phase === COUNTDOWN && <BombCountdown onExplode={handleExplode} />}

          {phase === EXPLODING && (
            <ExplosionEffect active onComplete={handleExplosionComplete} />
          )}
        </motion.div>
      )}

      {/* "Course Unlocked" badge */}
      <AnimatePresence>
        {phase === UNLOCKED && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none rounded-xl"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: [0, 1, 1, 0], scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, times: [0, 0.15, 0.7, 1] }}
          >
            <span
              className="font-display text-lg font-bold text-cyber-accent flex items-center gap-2"
              style={{ textShadow: '0 0 20px #00ff9c, 0 0 40px rgba(0,255,156,0.5)' }}
            >
              <Unlock className="w-5 h-5" /> Course Unlocked
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
