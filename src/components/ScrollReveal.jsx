import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Children, isValidElement } from 'react'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: -80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 22,
      stiffness: 300,
      mass: 0.8,
    },
  },
}

/**
 * When this section scrolls into view, children animate in with drop + bounce.
 * Use for long pages to animate sections on scroll.
 */
export default function ScrollReveal({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px -60px 0px', amount: 0.2 })

  const content = (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
      style={{ willChange: 'transform' }}
    >
      {Children.map(children, (child, i) => {
        if (!isValidElement(child)) return child
        return (
          <motion.div key={i} variants={item} style={{ willChange: 'transform' }}>
            {child}
          </motion.div>
        )
      })}
    </motion.div>
  )

  return content
}
