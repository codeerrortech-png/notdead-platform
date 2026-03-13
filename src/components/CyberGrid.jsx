export default function CyberGrid({ dimmed = false }) {
  return (
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-300 ${dimmed ? 'opacity-40' : 'opacity-100'}`} aria-hidden>
      <div className="absolute inset-0 cyber-grid opacity-50" />
      <div
        className="absolute inset-0 opacity-100"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0, 255, 156, 0.07), transparent 55%)',
        }}
      />
      <div className="absolute inset-0 scanline opacity-30" />
    </div>
  )
}
