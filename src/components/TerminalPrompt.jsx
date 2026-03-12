import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Reusable terminal-style command prompt component.
 * Use for hacker-style UI blocks (e.g. "> run_scan --target example.com").
 */
export default function TerminalPrompt({ prefix = '$', command = '', className = '' }) {
  const [blink, setBlink] = useState(true)
  // Optional: blink cursor
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`font-mono text-sm text-cyber-accent/90 bg-cyber-secondary/80 border border-cyber-accent/30 rounded-lg px-4 py-3 ${className}`}
    >
      <span className="text-cyber-accent/60">{prefix}</span>{' '}
      {command}
      <span className={blink ? 'opacity-100' : 'opacity-0'}>|</span>
    </motion.div>
  )
}
