import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const NEON_GREEN = '#00ff9c'
const ORANGE = '#f97316'
const METAL_GRAY = '#9ca3af'
const DARK_METAL = '#4b5563'

/**
 * Cinematic explosion: shockwave, sparks, metal fragments, debris, screen flash.
 * Canvas draws sparks + metal pieces; Framer Motion for shockwave and particles.
 */
export default function ExplosionEffect({ active = false, onComplete }) {
  const canvasRef = useRef(null)
  const [particles, setParticles] = useState([])
  const [debris, setDebris] = useState([])

  useEffect(() => {
    if (!active) return
    const count = 48
    const list = Array.from({ length: count }, (_, i) => ({
      id: `p-${i}`,
      angle: (i / count) * 2 * Math.PI + Math.random() * 0.6,
      distance: 70 + Math.random() * 100,
      size: 1.5 + Math.random() * 3.5,
      color: i % 4 === 0 ? ORANGE : i % 4 === 1 ? METAL_GRAY : NEON_GREEN,
      duration: 0.35 + Math.random() * 0.4,
      delay: Math.random() * 0.08,
    }))
    setParticles(list)
    const debrisCount = 20
    const debrisList = Array.from({ length: debrisCount }, (_, i) => ({
      id: `d-${i}`,
      angle: (i / debrisCount) * 2 * Math.PI + Math.random() * 1.2,
      distance: 50 + Math.random() * 90,
      size: 2 + Math.random() * 5,
      color: Math.random() > 0.5 ? DARK_METAL : METAL_GRAY,
      duration: 0.5 + Math.random() * 0.3,
      delay: Math.random() * 0.06,
      rotation: (Math.random() - 0.5) * 720,
    }))
    setDebris(debrisList)
  }, [active])

  useEffect(() => {
    if (!active || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    let frame = 0
    const cx = rect.width / 2
    const cy = rect.height / 2
    const maxFrames = 40

    const draw = () => {
      ctx.clearRect(0, 0, rect.width, rect.height)
      frame++
      const t = Math.min(frame / maxFrames, 1)
      for (let i = 0; i < 40; i++) {
        const angle = (i / 40) * 2 * Math.PI + frame * 0.025
        const dist = 30 + t * 140
        const x = cx + Math.cos(angle) * dist
        const y = cy + Math.sin(angle) * dist
        const alpha = (1 - t) * (0.6 + 0.4 * Math.random())
        const isMetal = i % 5 === 0
        if (isMetal) {
          ctx.fillStyle = `rgba(156, 163, 175, ${alpha})`
        } else {
          ctx.fillStyle =
            i % 3 === 0
              ? `rgba(249, 115, 22, ${alpha})`
              : `rgba(0, 255, 156, ${alpha * 0.9})`
        }
        ctx.beginPath()
        const r = isMetal ? 2 + Math.random() * 3 : 1.5 + Math.random() * 2
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      }
      if (t < 1) requestAnimationFrame(draw)
    }
    draw()
  }, [active])

  if (!active) return null

  return (
    <>
      {/* Screen flash */}
      <motion.div
        className="absolute inset-0 rounded-xl z-30 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0] }}
        transition={{ duration: 0.35, times: [0, 0.1, 1] }}
        style={{
          background:
            'radial-gradient(circle at center, rgba(0,255,156,0.35) 0%, rgba(249,115,22,0.25) 35%, transparent 65%)',
          willChange: 'opacity',
        }}
      />
      {/* Shockwave ring */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center rounded-xl z-20 pointer-events-none"
        initial={{ scale: 0.25, opacity: 1 }}
        animate={{ scale: 2.3, opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
        onAnimationComplete={onComplete}
        style={{
          border: '3px solid rgba(0, 255, 156, 0.85)',
          boxShadow:
            '0 0 50px rgba(0, 255, 156, 0.5), inset 0 0 50px rgba(0, 255, 156, 0.15)',
          willChange: 'transform, opacity',
        }}
      />
      {/* Canvas: sparks + metal fragments */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full rounded-xl z-20 pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
      />
      {/* Framer Motion particles - sparks */}
      <div className="absolute inset-0 rounded-xl overflow-hidden z-20 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: '50%',
              top: '50%',
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos(p.angle) * p.distance,
              y: Math.sin(p.angle) * p.distance,
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>
      {/* Metal debris - larger fragments */}
      <div className="absolute inset-0 rounded-xl overflow-hidden z-20 pointer-events-none">
        {debris.map((d) => (
          <motion.div
            key={d.id}
            className="absolute rounded-sm"
            style={{
              left: '50%',
              top: '50%',
              width: d.size,
              height: d.size * 0.6,
              background: d.color,
              boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
            }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            animate={{
              x: Math.cos(d.angle) * d.distance,
              y: Math.sin(d.angle) * d.distance,
              opacity: 0,
              rotate: d.rotation,
            }}
            transition={{
              duration: d.duration,
              delay: d.delay,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        ))}
      </div>
    </>
  )
}
