import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, LogIn, LayoutDashboard } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/courses', label: 'Courses' },
  { to: '/membership', label: 'Membership' },
  { to: '/tools', label: 'Tools' },
  { to: '/services', label: 'Services' },
  { to: '/resources', label: 'Resources' },
  { to: '/community', label: 'Community' },
  { to: '/testimonials', label: 'Testimonials' },
]

const btnOutline =
  'flex items-center gap-2 px-4 py-2.5 rounded-lg border border-cyber-accent text-cyber-accent font-semibold transition-all duration-300 text-base hover:bg-cyber-accent/10 hover:border-cyber-accent hover:shadow-[0_0_20px_rgba(0,255,156,0.4)]'
const btnPrimary =
  'flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyber-accent text-cyber-bg font-bold transition-all duration-300 text-base hover:shadow-[0_0_20px_#00ff9c,0_0_40px_rgba(0,255,156,0.35)]'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav
      className="sticky top-0 z-50 w-full h-[70px] flex items-center bg-[#0b0f17] border-b border-cyber-accent/20 shadow-[0_0_20px_rgba(0,255,156,0.06)] backdrop-blur-xl pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]"
      style={{ minHeight: 70 }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 h-full">
        {/* LEFT: Logo — fixed width, no shrink */}
        <div className="shrink-0">
          <Link to="/" className="flex items-center">
            <img
              src="/Screenshot%202026-03-12%20113646.png"
              alt="NOTDEAD"
              className="h-10 sm:h-12 max-w-[120px] sm:max-w-[140px] object-contain object-left"
            />
          </Link>
        </div>

        {/* CENTER: Nav links — flex-1, centered in remaining space, no absolute */}
        <div className="hidden md:flex flex-1 min-w-0 justify-center items-center">
          <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `nav-link-underline text-sm font-mono font-semibold transition-colors hover:text-cyber-accent whitespace-nowrap py-1 ${isActive ? 'text-cyber-accent active' : 'text-cyber-text'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* RIGHT: Action buttons — fixed width, no shrink */}
        <div className="hidden md:flex items-center justify-end gap-2 shrink-0">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link to="/dashboard" className={btnOutline}>
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link to="/login" className={btnOutline}>
              <LogIn className="w-5 h-5" /> Login
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link to="/signup" className={btnPrimary}>
              <User className="w-5 h-5" /> Sign Up
            </Link>
          </motion.div>
        </div>

        {/* Mobile: Hamburger */}
        <button
          type="button"
          className="md:hidden shrink-0 p-2 text-cyber-accent hover:bg-cyber-accent/10 rounded-lg transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className="absolute left-0 right-0 top-[70px] md:hidden z-40 bg-[#0b0f17] border-b border-cyber-accent/20 shadow-lg">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden px-4 pb-4"
            >
              <div className="py-4 flex flex-col gap-2">
                {navLinks.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-2.5 rounded text-base font-semibold text-cyber-text ${isActive ? 'bg-cyber-accent/20 text-cyber-accent' : ''}`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
                <div className="flex flex-col gap-2 mt-2 px-4">
                  <Link to="/dashboard" onClick={() => setOpen(false)} className="py-2.5 border border-cyber-accent/30 rounded text-center text-base font-semibold text-cyber-accent">
                    Dashboard
                  </Link>
                  <div className="flex gap-2">
                    <Link to="/login" onClick={() => setOpen(false)} className="flex-1 py-2.5 border border-cyber-accent/50 rounded text-center text-base font-semibold text-cyber-accent">
                      Login
                    </Link>
                    <Link to="/signup" onClick={() => setOpen(false)} className="flex-1 py-2.5 bg-cyber-accent text-cyber-bg rounded text-center text-base font-bold">
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
