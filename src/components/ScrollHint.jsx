import { motion } from 'framer-motion'

export default function ScrollHint() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.6 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cyber-text/50"
    >
      <motion.div
        className="w-7 h-10 rounded-full border-2 border-cyber-accent/30 flex justify-center pt-2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="w-1.5 h-2 rounded-full bg-cyber-accent/70"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
      <span className="font-mono text-[10px] uppercase tracking-widest">
        Scroll to explore
      </span>
    </motion.div>
  )
}
