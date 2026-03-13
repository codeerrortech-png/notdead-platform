import { motion } from 'framer-motion'
import ChainLink from './ChainLink'

/**
 * Realistic metal chains in X pattern (TL→BR and TR→BL). Each link is a real
 * oval ring. When breaking, links snap and fly outward with physics.
 */
function buildDiagonalLinks(startX, startY, endX, endY, count, rotation, offset) {
  const links = []
  for (let i = 0; i < count; i++) {
    const t = (i + 0.5) / count
    const x = startX + t * (endX - startX)
    const y = startY + t * (endY - startY)
    links.push({ id: `${offset + i}`, x, y, rotate: rotation })
  }
  return links
}

const DIAG1 = buildDiagonalLinks(10, 10, 90, 90, 9, 45, 0)
const DIAG2 = buildDiagonalLinks(90, 10, 10, 90, 9, -45, 9)
const ALL_LINKS = [...DIAG1, ...DIAG2]

export default function ChainAnimation({ breaking = false, onBreakComplete }) {
  const getFlyOff = (i) => {
    const angle = (i / ALL_LINKS.length) * 2 * Math.PI + (i % 3) * 0.7
    const dist = 80 + (i % 5) * 25
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      rotate: (i % 2 === 0 ? 1 : -1) * (120 + (i % 4) * 30),
    }
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible rounded-xl">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chain-metal-fill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4b5563" />
            <stop offset="35%" stopColor="#9ca3af" />
            <stop offset="50%" stopColor="#d1d5db" />
            <stop offset="65%" stopColor="#9ca3af" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>
          <filter id="chain-metal-shadow">
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#0b0f17" floodOpacity="0.85" />
            <feDropShadow dx="0" dy="0" stdDeviation="0.4" floodColor="#fff" floodOpacity="0.12" />
          </filter>
        </defs>
        <g>
          {ALL_LINKS.map((link, i) => {
            const fly = getFlyOff(i)
            return (
              <motion.g
                key={link.id}
                initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                animate={
                  breaking
                    ? {
                        opacity: 0,
                        x: fly.x,
                        y: fly.y,
                        rotate: fly.rotate,
                        transition: {
                          duration: 0.5,
                          ease: [0.25, 0.46, 0.45, 0.94],
                          delay: i * 0.02,
                        },
                      }
                    : {}
                }
                onAnimationComplete={
                  breaking && i === ALL_LINKS.length - 1 ? onBreakComplete : undefined
                }
                style={{ transformOrigin: `${link.x} ${link.y}` }}
              >
                <ChainLink x={link.x} y={link.y} width={9} height={4.5} rotate={link.rotate} />
              </motion.g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}
