import { useMemo } from 'react'
import { motion } from 'framer-motion'

const PARTICLE_COUNT = 18
const chars = '01アイウエオカキクケコ<>{}[]|/\\'

function Particle({ delay, x, size, duration, char }) {
  return (
    <motion.span
      className="absolute text-cyber-accent/20 font-mono pointer-events-none"
      style={{
        left: `${x}%`,
        fontSize: `${size}px`,
        textShadow: '0 0 8px rgba(0, 255, 156, 0.3)',
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{
        opacity: [0, 0.4, 0.5, 0],
        y: ['0vh', '100vh'],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {char}
    </motion.span>
  )
}

export default function FloatingParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 10 + Math.random() * 14,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 5,
      char: chars[Math.floor(Math.random() * chars.length)],
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <Particle
          key={p.id}
          x={p.x}
          size={p.size}
          duration={p.duration}
          delay={p.delay}
          char={p.char}
        />
      ))}
    </div>
  )
}
