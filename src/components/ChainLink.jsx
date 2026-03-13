/**
 * Single realistic metal chain link - oval ring with metallic stroke.
 * Parent must provide url(#chain-link-fill) and url(#chain-link-shadow) in defs.
 */
export default function ChainLink({ x = 50, y = 50, width = 10, height = 5, rotate = 0 }) {
  const rx = width / 2
  const ry = height / 2
  const cx = x
  const cy = y
  const d = `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 1 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 1 ${cx - rx} ${cy}`
  return (
    <g transform={`rotate(${rotate} ${cx} ${cy})`}>
      <path
        d={d}
        fill="none"
        stroke="url(#chain-metal-fill)"
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#chain-metal-shadow)"
      />
    </g>
  )
}
