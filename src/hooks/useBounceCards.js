import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Use with a ref on the container that wraps elements with data-bounce-card.
 * When scrollTrigger is true (default), cards animate when container enters viewport.
 * When scrollTrigger is false, cards animate on mount (for hero stats etc.).
 * Pass triggerKey (e.g. filter id) to re-run when list content changes (e.g. Tools filter).
 */
export default function useBounceCards(containerRef, options = {}) {
  const { scrollTrigger: useScroll = true, triggerKey = null } = options

  useEffect(() => {
    const el = containerRef?.current
    if (!el) return

    const cards = el.querySelectorAll('[data-bounce-card]')
    if (!cards.length) return

    gsap.set(cards, { y: -80, scale: 0.9, opacity: 0 })
    let trigger

    const runAnim = () => {
      gsap.to(cards, {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.65,
        stagger: 0.055,
        ease: 'elastic.out(1, 0.5)',
        overwrite: true,
      })
      if (trigger) {
        trigger.kill()
        trigger = null
      }
    }

    if (useScroll) {
      trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: runAnim,
      })
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) runAnim()
      })
    } else {
      const t = gsap.delayedCall(0.25, runAnim)
      return () => t.kill()
    }

    return () => {
      if (trigger) trigger.kill()
    }
  }, [useScroll, triggerKey])
}
