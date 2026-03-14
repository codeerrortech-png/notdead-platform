import { motion } from 'framer-motion'
import { Children, cloneElement, isValidElement } from 'react'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
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
 * Wraps page content so each direct child drops in from above with a stagger and bounce.
 * Use as: <PageEntrance><Block1 /><Block2 />...</PageEntrance>
 */
export default function PageEntrance({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
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
}

export { container as pageEntranceContainer, item as pageEntranceItem }
