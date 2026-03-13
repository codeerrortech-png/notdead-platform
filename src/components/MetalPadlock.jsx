/**
 * Realistic metal padlock - brushed metal, shackle, keyhole.
 * Used in center of locked course overlay.
 */
export default function MetalPadlock({ className = '', width = 48, height = 52 }) {
  const w = width
  const h = height
  const cx = w / 2
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className={className}
      style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))' }}
    >
      <defs>
        <linearGradient id="padlock-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b9199" />
          <stop offset="20%" stopColor="#a8aeb5" />
          <stop offset="50%" stopColor="#6b7280" />
          <stop offset="80%" stopColor="#4b5563" />
          <stop offset="100%" stopColor="#374151" />
        </linearGradient>
        <linearGradient id="padlock-shackle" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9ca3af" />
          <stop offset="50%" stopColor="#6b7280" />
          <stop offset="100%" stopColor="#4b5563" />
        </linearGradient>
        <linearGradient id="padlock-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
          <stop offset="50%" stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.2)" />
        </linearGradient>
        <filter id="padlock-inner-shadow">
          <feOffset dx="0" dy="1" />
          <feGaussianBlur stdDeviation="0.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {/* Shackle (U shape on top) */}
      <path
        d={`M ${cx - 10} ${14} L ${cx - 10} ${8} Q ${cx - 10} ${2} ${cx} ${2} Q ${cx + 10} ${2} ${cx + 10} ${8} L ${cx + 10} ${14}`}
        fill="none"
        stroke="url(#padlock-shackle)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Body - rounded rectangle */}
      <rect
        x={4}
        y={14}
        width={w - 8}
        height={h - 18}
        rx={6}
        ry={6}
        fill="url(#padlock-body)"
        stroke="#4b5563"
        strokeWidth="0.8"
      />
      {/* Brushed metal highlight strip */}
      <rect
        x={6}
        y={16}
        width={w - 12}
        height={4}
        rx={2}
        fill="url(#padlock-highlight)"
        opacity={0.9}
      />
      {/* Keyhole */}
      <circle cx={cx} cy={28} r={3} fill="#1f2937" />
      <rect x={cx - 1.5} y={28} width={3} height={12} rx={1} fill="#1f2937" />
    </svg>
  )
}
