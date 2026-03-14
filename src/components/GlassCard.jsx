import { motion } from 'framer-motion'

export default function GlassCard({
  children,
  className = '',
  hover = true,
  delay = 0,
  bounceScroll = false,
  ...props
}) {
  const baseClass = `
    glass-card p-6
    ${hover ? '' : 'glass-card-no-hover'}
    ${className}
  `

  if (bounceScroll) {
    return (
      <div
        data-bounce-card
        className={baseClass}
        {...props}
      >
        {children}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0.6, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={
        hover
          ? {
              y: -6,
              scale: 1.02,
              transition: { duration: 0.25 },
            }
          : undefined
      }
      className={baseClass}
      {...props}
    >
      {children}
    </motion.div>
  )
}
