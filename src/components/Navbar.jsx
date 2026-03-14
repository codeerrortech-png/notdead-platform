import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, LogIn, LayoutDashboard, LogOut } from 'lucide-react'
import ChaosButton from './ChaosButton'
import { isUserLoggedIn, logoutUser } from '../utils/auth'

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
  const navigate = useNavigate()
  const loggedIn = isUserLoggedIn()

  const handleLogout = () => {
    logoutUser()
    setOpen(false)
    navigate('/', { replace: true })
  }

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
                  `nav-link-underline text-sm font-mono font-semibold transition-colors hover:text-cyber-accent whitespace-nowrap py-1 ${isActive ? 'text-cyber-accent active' : 'text-[#e5e7eb]'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* RIGHT: Action buttons — when logged in: Dashboard + Logout; else Login + Sign Up */}
        <div className="hidden md:flex items-center justify-end gap-2 shrink-0">
          {loggedIn ? (
            <>
              <ChaosButton variant="card" as={Link} to="/dashboard">
                <LayoutDashboard className="w-5 h-5" /> Dashboard
              </ChaosButton>
              <ChaosButton variant="card" onClick={handleLogout} className="cursor-pointer">
                <LogOut className="w-5 h-5" /> Logout
              </ChaosButton>
            </>
          ) : (
            <>
              <ChaosButton variant="card" as={Link} to="/dashboard">
                <LayoutDashboard className="w-5 h-5" /> Dashboard
              </ChaosButton>
              <ChaosButton variant="card" as={Link} to="/login">
                <LogIn className="w-5 h-5" /> Login
              </ChaosButton>
              <ChaosButton variant="card" as={Link} to="/signup">
                <User className="w-5 h-5" /> Sign Up
              </ChaosButton>
            </>
          )}
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
                      `px-4 py-2.5 rounded text-base font-semibold ${isActive ? 'bg-cyber-accent/20 text-cyber-accent' : 'text-[#e5e7eb]'}`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
                <div className="flex flex-col gap-2 mt-2 px-4">
                  <ChaosButton variant="card" as={Link} to="/dashboard" className="w-full" onClick={() => setOpen(false)}>
                    <LayoutDashboard className="w-5 h-5" /> Dashboard
                  </ChaosButton>
                  {loggedIn ? (
                    <ChaosButton variant="card" className="w-full" onClick={handleLogout}>
                      <LogOut className="w-5 h-5" /> Logout
                    </ChaosButton>
                  ) : (
                    <div className="flex gap-2">
                      <ChaosButton variant="card" as={Link} to="/login" className="flex-1" onClick={() => setOpen(false)}>
                        Login
                      </ChaosButton>
                      <ChaosButton variant="card" as={Link} to="/signup" className="flex-1" onClick={() => setOpen(false)}>
                        Sign Up
                      </ChaosButton>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
