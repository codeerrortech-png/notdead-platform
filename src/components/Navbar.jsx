import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Shield, User, LogIn, LayoutDashboard } from 'lucide-react'

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

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="sticky top-0 z-50 glass border-b border-cyber-accent/10 backdrop-blur-xl pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl text-cyber-accent tracking-wider hover:drop-shadow-[0_0_12px_rgba(0,255,156,0.4)] transition-all shrink-0 -ml-4 sm:-ml-6 lg:-ml-8">
            <Shield className="w-7 h-7" />
            NOTDEAD
          </Link>
          <div className="hidden md:flex flex-1 items-center justify-center gap-5">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `nav-link-underline text-sm font-mono transition-colors hover:text-cyber-accent ${isActive ? 'text-cyber-accent active' : 'text-cyber-text/80'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3 shrink-0 pl-4 -mr-4 sm:-mr-6 lg:-mr-8">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cyber-accent/30 text-cyber-accent/90 hover:bg-cyber-accent/10 hover:border-cyber-accent/50 transition-all text-sm"
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cyber-accent/50 text-cyber-accent hover:bg-cyber-accent/10 hover:border-cyber-accent/70 transition-all text-sm"
              >
                <LogIn className="w-4 h-4" /> Login
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/signup"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyber-accent text-cyber-bg font-semibold hover:shadow-neon transition-all text-sm"
              >
                <User className="w-4 h-4" /> Sign Up
              </Link>
            </motion.div>
          </div>
          <button
            type="button"
            className="md:hidden p-2 text-cyber-accent"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 flex flex-col gap-2">
                {navLinks.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded text-cyber-text ${isActive ? 'bg-cyber-accent/20 text-cyber-accent' : ''}`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
                <div className="flex flex-col gap-2 mt-2 px-4">
                  <Link to="/dashboard" onClick={() => setOpen(false)} className="py-2 border border-cyber-accent/30 rounded text-center text-sm text-cyber-accent">
                    Dashboard
                  </Link>
                  <div className="flex gap-2">
                    <Link to="/login" onClick={() => setOpen(false)} className="flex-1 py-2 border border-cyber-accent/50 rounded text-center text-sm text-cyber-accent">
                      Login
                    </Link>
                    <Link to="/signup" onClick={() => setOpen(false)} className="flex-1 py-2 bg-cyber-accent text-cyber-bg rounded text-center text-sm font-semibold">
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
