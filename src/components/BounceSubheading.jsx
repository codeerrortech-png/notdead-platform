import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

/**
 * Subheading: letters drop from top/sides with a softer, shorter bounce.
 * Use scrollTrigger when the subheading is in a section that enters view on scroll.
 */
export default function BounceSubheading({
  as: Tag = 'p',
  className = '',
  children,
  scrollTrigger = false,
}) {
  const ref = useRef(null)

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
      const chars = splitInstance.chars
        if (!chars || chars.length === 0 || cancelled) return

      gsap.set(chars, { y: -48, opacity: 0 })
      const anim = gsap.to(chars, {
        y: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.02,
        ease: 'bounce.out',
        overwrite: true,
        paused: scrollTrigger,
      })

      if (scrollTrigger) {
        trigger = ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          onEnter: () => {
            anim.play()
            anim.eventCallback('onComplete', () => {
              if (trigger) trigger.kill()
              trigger = null
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
    }
  }, [children, scrollTrigger])

  if (typeof children !== 'string') {
    return <Tag className={className} ref={ref}>{children}</Tag>
  }

  return (
    <Tag
      ref={ref}
      className={`bounce-heading bounce-subheading ${className}`}
      style={{ fontKerning: 'none' }}
    >
      {children}
    </Tag>
  )
}
