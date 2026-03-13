import { motion } from 'framer-motion'

const ITEMS = [
  { label: 'Firewall Status', value: 'ACTIVE', width: 100 },
  { label: 'Threat Detection', value: 'MONITORING', width: 95 },
  { label: 'Encryption Level', value: 'AES-256', width: 100 },
  { label: 'Network Security', value: 'SECURED', width: 98 },
]

export default function HeroSecurityMonitor() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full max-w-sm rounded-xl border-2 border-cyber-accent/30 bg-cyber-secondary/90 overflow-hidden shadow-[0_0_30px_rgba(0,255,156,0.15)]"
    >
      <div className="flex items-center gap-2 px-3 py-2 border-b border-cyber-accent/20 bg-cyber-bg/50">
        <span className="w-2 h-2 rounded-full bg-red-500/90" />
        <span className="w-2 h-2 rounded-full bg-amber-500/90" />
        <span className="w-2 h-2 rounded-full bg-cyber-accent shadow-[0_0_6px_#00ff9c]" />
        <span className="font-mono text-[10px] text-cyber-text/60 ml-1 tracking-wider">
          SECURITY DASHBOARD
        </span>
      </div>
      <div className="p-3 space-y-2">
        {ITEMS.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.1 }}
            className="p-2 rounded-lg border border-cyber-accent/10 bg-cyber-bg/40 hover:border-cyber-accent/25 transition-colors"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono text-[10px] text-cyber-text/70">
                {item.label}
              </span>
              <span className="font-mono text-[10px] font-semibold text-cyber-accent">
                {item.value}
              </span>
            </div>
            <div className="h-1 rounded-full bg-cyber-bg overflow-hidden">
              <motion.div
                className="h-full bg-cyber-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${item.width}%` }}
                transition={{ duration: 1, delay: 1 + i * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
