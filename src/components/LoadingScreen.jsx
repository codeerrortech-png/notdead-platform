import { motion } from 'framer-motion'
import { Shield, Lock } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-cyber-bg flex flex-col items-center justify-center z-[100] overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-40" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0, 255, 156, 0.04), transparent 70%)',
        }}
      />
      <div className="absolute inset-0 scanline opacity-20" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center gap-8"
      >
        <motion.div
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-24 h-24 rounded-full border-2 border-cyber-accent/30 border-t-cyber-accent" />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Shield className="w-12 h-12 text-cyber-accent drop-shadow-[0_0_15px_rgba(0,255,156,0.5)]" />
          </motion.div>
        </motion.div>
        <div className="text-center">
          <h1 className="font-display font-bold text-4xl text-cyber-accent glow-text tracking-wider">
            NOTDEAD
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-mono text-sm text-cyber-text/70 mt-2 flex items-center justify-center gap-2"
          >
            <Lock className="w-3.5 h-3.5 text-cyber-accent/80" />
            Initializing secure connection...
          </motion.p>
        </div>
        <motion.div
          className="h-1 w-56 bg-cyber-secondary rounded-full overflow-hidden border border-cyber-accent/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            className="h-full bg-cyber-accent rounded-full shadow-neon"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="font-mono text-xs text-cyber-accent/60"
        >
          &gt; Bypassing firewall... OK
        </motion.p>
      </motion.div>
    </div>
  )
}
