import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

const NEON_GREEN = '#00ff9c'
const DARK_BG = '#0b0f17'

// Clean skull cursor — no glow, no blur, transparent background
function SkullIcon({ className = '' }) {
  return (
    <img
      src="/k.png"
      alt=""
      className={className}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      }}
    />
  )
}

// Canvas-based explosion: particles + shockwave + flash
function ExplosionCanvas({ onComplete, className = '' }) {
  const canvasRef = useRef(null)
  const frameRef = useRef(0)
  const particlesRef = useRef([])
  const startTimeRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = window.innerWidth
    const h = window.innerHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.scale(dpr, dpr)

    const cx = w / 2
    const cy = h / 2
    const particleCount = 80

    if (!particlesRef.current.length) {
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5
        const speed = 2 + Math.random() * 8
        particlesRef.current.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.015 + Math.random() * 0.02,
          size: 2 + Math.random() * 4,
          hue: 160,
        })
      }
    }

    startTimeRef.current = performance.now()
    const duration = 1200

    const tick = () => {
      const t = performance.now() - startTimeRef.current
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      // Flash (first ~150ms)
      if (t < 150) {
        const flashAlpha = 1 - t / 150
        ctx.fillStyle = NEON_GREEN
        ctx.globalAlpha = flashAlpha * 0.4
        ctx.fillRect(0, 0, w, h)
        ctx.globalAlpha = 1
      }

      // Shockwave rings
      const ringCount = 3
      for (let r = 0; r < ringCount; r++) {
        const ringProgress = (t / 600) - r * 0.15
        if (ringProgress > 0 && ringProgress < 1) {
          const radius = ringProgress * Math.max(w, h) * 0.6
          const alpha = (1 - ringProgress) * 0.5
          ctx.strokeStyle = NEON_GREEN
          ctx.globalAlpha = alpha
          ctx.lineWidth = 3
          ctx.beginPath()
          ctx.arc(cx, cy, radius, 0, Math.PI * 2)
          ctx.stroke()
          ctx.globalAlpha = 1
        }
      }

      // Particles
      particlesRef.current.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.98
        p.vy *= 0.98
        p.life -= p.decay
        if (p.life <= 0) return
        ctx.fillStyle = NEON_GREEN
        ctx.globalAlpha = p.life
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1

      if (t < duration) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        onComplete?.()
      }
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [onComplete])

  return <canvas ref={canvasRef} className={className} style={{ pointerEvents: 'none' }} aria-hidden />
}

function useWindowCenter() {
  const [center, setCenter] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const update = () => setCenter({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return center
}

export default function SkullNavigator() {
  const navigate = useNavigate()
  const location = useLocation()
  const { x: centerX, y: centerY } = useWindowCenter()
  const [visible, setVisible] = useState(false)
  const [isExploding, setIsExploding] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [pendingPath, setPendingPath] = useState(null)
  const skullSize = 48
  const overlayRef = useRef(null)
  const didInitRef = useRef(false)
  const isNavigatingRef = useRef(false)
  const motionX = useMotionValue(0)
  const motionY = useMotionValue(0)
  const motionRotate = useMotionValue(0)
  const displayX = useTransform(motionX, (v) => v)
  const displayY = useTransform(motionY, (v) => v)
  const targetX = useRef(0)
  const targetY = useRef(0)
  const currentX = useRef(0)
  const currentY = useRef(0)
  const LAG = 0.12

  const moveTo = useCallback((x, y, opts = {}) => {
    const { glitch = false } = opts
    targetX.current = x
    targetY.current = y
    if (glitch) {
      animate(motionRotate, [0, -8, 8, -4, 4, 0], { duration: 0.5, ease: 'easeOut' })
      setTimeout(() => motionRotate.set(0), 500)
    }
  }, [motionRotate])

  const triggerNavigationExplosion = useCallback((path) => {
    setPendingPath(path)
    setVisible(true)
    isNavigatingRef.current = true
    moveTo(centerX, centerY, { glitch: true })
    setTimeout(() => setIsExploding(true), 400)
  }, [centerX, centerY, moveTo])

  const handleExplosionComplete = useCallback(() => {
    setIsExploding(false)
    isNavigatingRef.current = false
    if (pendingPath != null) {
      navigate(pendingPath)
      setPendingPath(null)
    }
    setIsTransitioning(true)
    setTimeout(() => setIsTransitioning(false), 800)
  }, [navigate, pendingPath])

  useEffect(() => {
    if (didInitRef.current || !centerX || !centerY) return
    didInitRef.current = true
    setVisible(true)
    targetX.current = centerX
    targetY.current = centerY
    currentX.current = centerX
    currentY.current = centerY
    motionX.set(centerX)
    motionY.set(centerY)
  }, [centerX, centerY, motionX, motionY])

  // requestAnimationFrame: smooth lag follow only (no trail, no glow)
  useEffect(() => {
    let rafId = 0
    const tick = () => {
      const tx = targetX.current
      const ty = targetY.current
      const cx = currentX.current
      const cy = currentY.current
      currentX.current += (tx - cx) * LAG
      currentY.current += (ty - cy) * LAG
      motionX.set(currentX.current)
      motionY.set(currentY.current)
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [motionX, motionY])

  // Mouse: set target for rAF to follow
  useEffect(() => {
    const handleMove = (e) => {
      if (!visible || isExploding || isNavigatingRef.current) return
      targetX.current = e.clientX
      targetY.current = e.clientY
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [visible, isExploding])

  useEffect(() => {
    const handleClick = (e) => {
      if (!visible) return
      const target = e.target.closest('a')
      const href = target?.getAttribute('href') ?? ''
      if (href.startsWith('http://') || href.startsWith('https://')) return
      const isInternalLink = href.startsWith('/') && !target?.target
      if (isInternalLink) {
        e.preventDefault()
        e.stopPropagation()
        if (href && href !== location.pathname) triggerNavigationExplosion(href)
        return
      }
      moveTo(e.clientX, e.clientY, { glitch: true, rotate: 5 })
    }
    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [visible, location.pathname, moveTo, triggerNavigationExplosion])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 pointer-events-none"
      style={{ left: 0, top: 0, width: '100%', height: '100%', zIndex: 999999 }}
      aria-hidden
    >
      {/* Clean skull cursor only — no trail, no glow */}
      {visible && !isExploding && (
        <motion.div
          className="absolute top-0 left-0 w-12 h-12 flex items-center justify-center pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{
            x: displayX,
            y: displayY,
            rotate: motionRotate,
            willChange: 'transform',
          }}
        >
          <SkullIcon className="w-full h-full" />
        </motion.div>
      )}

      {/* Glitch overlay during explosion */}
      {isExploding && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.15, 0, 0.1, 0],
            x: [0, -2, 2, -1, 0],
          }}
          transition={{ duration: 0.4, times: [0, 0.2, 0.4, 0.7, 1] }}
          style={{
            background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,156,0.03) 2px, rgba(0,255,156,0.03) 4px)`,
            mixBlendMode: 'screen',
          }}
          aria-hidden
        />
      )}

      {/* Explosion canvas */}
      {isExploding && (
        <ExplosionCanvas
          onComplete={handleExplosionComplete}
          className="absolute inset-0 w-full h-full"
        />
      )}

      {/* Scan-line transition overlay — reveals new page with cyber effect */}
      {isTransitioning && (
        <motion.div
          className="absolute inset-0 scanline"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            background: `linear-gradient(transparent 50%, rgba(0, 255, 156, 0.04) 50%)`,
            backgroundSize: '100% 4px',
            backgroundColor: DARK_BG,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  )
}
