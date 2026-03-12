import { useRef, useEffect } from 'react'

const COMMANDS = [
  'sudo',
  'nmap',
  'whoami',
  'ssh root',
  'root_access',
  'decrypting',
  'packet_sniffer',
  'port_scan',
  'bruteforce_attack',
  'inject_payload',
  'bypass_firewall',
  'system_override',
  'access_granted',
  'hash_cracked',
  'SELECT * FROM users',
  'sudo rm -rf /',
  'chmod 777',
  'reverse_shell',
  'keylogger',
  'buffer_overflow',
  'SQL_inject',
  'XSS_payload',
  'phishing_hook',
  'zero_day',
  'exploit_db',
  'metasploit',
  'wireshark',
  'tcpdump',
  'netcat',
  'hydra',
  'john',
  'hashcat',
]

const DARK_NEON = '#00cc7a'
const OPACITY_MIN = 0.35
const OPACITY_MAX = 0.55

export default function HackerRain() {
  const canvasRef = useRef(null)
  const dropsRef = useRef([])
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let w = window.innerWidth
    let h = window.innerHeight
    const dpr = Math.min(devicePixelRatio || 1, 2)

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.scale(dpr, dpr)
      initDrops()
    }

    function initDrops() {
      const count = Math.min(80, Math.floor(w / 18))
      dropsRef.current = []
      for (let i = 0; i < count; i++) {
        dropsRef.current.push({
          x: Math.random() * w,
          y: Math.random() * h,
          speed: 0.6 + Math.random() * 1.8,
          cmdIndex: Math.floor(Math.random() * COMMANDS.length),
          opacity: OPACITY_MIN + Math.random() * (OPACITY_MAX - OPACITY_MIN),
        })
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h)
      ctx.font = '15px "JetBrains Mono", monospace'

      dropsRef.current.forEach((d) => {
        const text = COMMANDS[d.cmdIndex]
        ctx.fillStyle = DARK_NEON
        ctx.globalAlpha = d.opacity
        ctx.shadowColor = DARK_NEON
        ctx.shadowBlur = 8
        ctx.fillText(text, d.x, d.y)
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1

        d.y += d.speed
        if (d.y > h + 20) {
          d.y = -20
          d.x = Math.random() * w
          d.cmdIndex = Math.floor(Math.random() * COMMANDS.length)
          d.speed = 0.6 + Math.random() * 1.8
        }
      })

      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden
    />
  )
}
