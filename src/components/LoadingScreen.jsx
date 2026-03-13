import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TERMINAL_LINES = [
  { text: '[INFO] Scanning system vulnerabilities...', delay: 0 },
  { text: '[INFO] Firewall configuration: ', success: 'ACTIVE', delay: 400 },
  { text: '[INFO] Encryption protocols: ', success: 'ENABLED', delay: 800 },
  { text: '[INFO] Intrusion detection: ', success: 'ONLINE', delay: 1200 },
  { text: '[SUCCESS] System secured. Access granted.', success: true, delay: 1600 },
]

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [visibleLines, setVisibleLines] = useState([])
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const lineTimeouts = TERMINAL_LINES.map((line, i) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, line])
      }, line.delay)
    )

    let progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return p + Math.random() * 12 + 4
      })
    }, 80)

    return () => {
      lineTimeouts.forEach(clearTimeout)
      clearInterval(progressInterval)
    }
  }, [])

  useEffect(() => {
    if (progress < 100) return
    const t = setTimeout(() => {
      setHidden(true)
      onComplete?.()
    }, 500)
    return () => clearTimeout(t)
  }, [progress, onComplete])

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-cyber-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="absolute inset-0 opacity-50"
            style={{
              background:
                'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0,255,156,0.06), transparent 60%)',
            }}
          />
          <div className="absolute inset-0 cyber-grid opacity-30" />
          <div className="absolute inset-0 scanline opacity-10" />

          <div className="relative w-full max-w-lg mx-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass border-2 border-cyber-accent/30 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(0,255,156,0.15)]"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-cyber-accent/20 bg-cyber-secondary/80">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/90" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90" />
                <span className="w-2.5 h-2.5 rounded-full bg-cyber-accent shadow-[0_0_8px_#00ff9c]" />
                <span className="font-mono text-xs text-cyber-text/70 ml-2 tracking-wider">
                  SECURITY PROTOCOL INITIALIZATION
                </span>
              </div>
              <div className="p-4 font-mono text-sm min-h-[220px] bg-black/30">
                <div className="mb-2">
                  <span className="text-cyber-accent">root@notdead:~$</span>
                  <span className="text-cyber-text ml-1">./init_security.sh</span>
                </div>
                {visibleLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-1.5"
                  >
                    {line.success === true ? (
                      <span className="text-cyber-accent">{line.text}</span>
                    ) : line.success ? (
                      <>
                        <span className="text-cyber-text/80">{line.text}</span>
                        <span className="text-cyber-accent font-semibold">
                          {line.success}
                        </span>
                      </>
                    ) : (
                      <span className="text-cyber-text/80">{line.text}</span>
                    )}
                  </motion.div>
                ))}
                <div className="mt-2 flex items-center gap-1">
                  <span className="text-cyber-accent">root@notdead:~$</span>
                  <span className="cursor-blink text-cyber-accent">_</span>
                </div>
              </div>
              <div className="px-4 pb-4">
                <div className="h-1.5 w-full bg-cyber-secondary rounded-full overflow-hidden border border-cyber-accent/20">
                  <motion.div
                    className="h-full bg-cyber-accent rounded-full shadow-[0_0_12px_#00ff9c]"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                <p className="text-center font-mono text-xs text-cyber-accent mt-2">
                  {Math.min(Math.floor(progress), 100)}%
                </p>
              </div>
            </motion.div>
            <div className="absolute -inset-1 rounded-2xl border border-cyber-accent/10 pointer-events-none" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
