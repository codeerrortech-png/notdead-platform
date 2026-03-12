import { motion } from 'framer-motion'
import { forwardRef } from 'react'

const NeonButton = forwardRef(function NeonButton(
  { children, className = '', variant = 'primary', ...props },
  ref
) {
  const base =
    'inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-2.5 rounded-lg font-mono text-sm font-medium transition-all duration-300 min-h-[44px] sm:min-h-0'
  const variants = {
    primary:
      'bg-cyber-accent text-cyber-bg btn-neon hover:shadow-neon-button active:scale-[0.98]',
    outline:
      'border border-cyber-accent text-cyber-accent hover:bg-cyber-accent/10 hover:shadow-neon hover:border-cyber-accent/70',
    ghost: 'text-cyber-accent hover:bg-cyber-accent/10',
  }
  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
})

export default NeonButton
