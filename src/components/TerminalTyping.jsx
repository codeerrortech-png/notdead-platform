import { useState, useEffect } from 'react'

const lines = [
  '> NOTDEAD Security Framework v2.1',
  '> Scanning for vulnerabilities...',
  '> Firewall: ACTIVE | Encryption: ENABLED',
  '> Welcome to the grid. Think like a hacker.',
]

export default function TerminalTyping() {
  const [display, setDisplay] = useState('')
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const line = lines[lineIndex]
    if (!line) return
    if (charIndex < line.length) {
      const t = setTimeout(() => {
        setDisplay((d) => d + line[charIndex])
        setCharIndex((c) => c + 1)
      }, 50)
      return () => clearTimeout(t)
    }
    const next = setTimeout(() => {
      setLineIndex((i) => (i + 1) % lines.length)
      setCharIndex(0)
      setDisplay('')
    }, 2000)
    return () => clearTimeout(next)
  }, [lineIndex, charIndex])

  return (
    <div className="font-mono text-xs sm:text-sm text-cyber-accent/95 bg-cyber-secondary/90 border border-cyber-accent/40 rounded-xl p-4 sm:p-5 w-full max-w-lg overflow-hidden shadow-glow">
      <div className="flex items-center gap-2 mb-3 text-cyber-text/50">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-cyber-accent shadow-[0_0_8px_#00ff9c]" />
      </div>
      <div className="min-h-[4.5rem] text-cyber-accent break-all">
        <span className="text-cyber-accent/70">&gt;</span> {display}
        <span className="cursor-blink text-cyber-accent">|</span>
      </div>
    </div>
  )
}
