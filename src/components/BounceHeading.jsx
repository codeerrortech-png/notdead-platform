import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

const defaultConfig = {
  y: -120,
  opacity: 0,
  duration: 0.6,
  ease: 'bounce.out',
  stagger: 0.022,
  scrollTrigger: false,
  scrollTriggerVars: { start: 'top 85%' },
}

/** Random in range [min, max] */
function randomIn(min, max) {
  return min + Math.random() * (max - min)
}

/**
 * Physics variant: random start positions near edges, rotation, then settle.
 * Uses GPU-friendly transforms (x, y, rotation, opacity).
 */
function setupPhysicsAnimation(chars, opts) {
  if (!chars?.length) return null
  const duration = opts.duration ?? 0.9
  const stagger = opts.stagger ?? 0.028
  const ease = opts.ease ?? 'elastic.out(1, 0.5)'

  chars.forEach((char) => {
    gsap.set(char, {
      x: randomIn(-240, 240),
      y: randomIn(-140, 20),
      rotation: randomIn(-12, 12),
      opacity: 0,
    })
  })

  return gsap.to(chars, {
    x: 0,
    y: 0,
    rotation: 0,
    opacity: 1,
    duration,
    stagger,
    ease,
    overwrite: true,
  })
}

/**
 * Renders a heading whose text is split into letters and animates with
 * physics-like bounce. variant: "simple" = drop from above; "physics" = random start + rotation.
 */
export default function BounceHeading({
  as: Tag = 'h2',
  className = '',
  children,
  scrollTrigger = false,
  variant = 'simple',
  ...configOverrides
}) {
  const ref = useRef(null)
  const splitRef = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof children !== 'string') return

    let splitInstance
    let trigger = null
    let cancelled = false

    const run = () => {
      if (cancelled) return
      try {
        splitInstance = new SplitType(el, { types: ['chars'] })
        splitRef.current = splitInstance
        const chars = splitInstance.chars
        if (!chars || chars.length === 0 || cancelled) return

      const opts = { ...defaultConfig, ...configOverrides }
      let anim

      if (variant === 'physics') {
        anim = setupPhysicsAnimation(chars, {
          duration: 0.9,
          stagger: 0.028,
          ease: opts.ease ?? 'elastic.out(1, 0.5)',
        })
      } else {
        anim = gsap.fromTo(
          chars,
          {
            y: opts.y,
            opacity: opts.opacity,
          },
          {
            y: 0,
            opacity: 1,
            duration: opts.duration,
            ease: opts.ease,
            stagger: opts.stagger,
            overwrite: true,
            paused: scrollTrigger,
          }
        )
      }

      if (anim && scrollTrigger) {
        anim.pause()
        trigger = ScrollTrigger.create({
          trigger: el,
          start: opts.scrollTriggerVars?.start ?? 'top 85%',
          onEnter: () => {
            anim.play()
            anim.eventCallback('onComplete', () => {
              if (trigger) {
                trigger.kill()
                trigger = null
              }
            })
          },
        })
      }
    } catch (e) {
        if (splitInstance?.revert) splitInstance.revert()
      }
    }

    const frameId = requestAnimationFrame(run)
    return () => {
      cancelled = true
      cancelAnimationFrame(frameId)
      if (trigger) trigger.kill()
      if (splitInstance?.revert) splitInstance.revert()
      splitRef.current = null
    }
  }, [children, scrollTrigger, variant])

  if (typeof children !== 'string') {
    return <Tag className={className} ref={ref}>{children}</Tag>
  }

  return (
    <Tag
      ref={ref}
      className={`bounce-heading ${className}`}
      style={{ fontKerning: 'none' }}
    >
      {children}
    </Tag>
  )
}
