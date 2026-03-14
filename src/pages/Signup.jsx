import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { setUserLoggedIn } from '../utils/auth'
import { registerUser } from '../utils/userStore'
import { motion } from 'framer-motion'
import { Shield, Mail, Lock, User, UserPlus } from 'lucide-react'
import ChaosButton from '../components/ChaosButton'
import CyberGrid from '../components/CyberGrid'

export default function Signup() {
  const navigate = useNavigate()
  const location = useLocation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    registerUser({ email, name })
    setUserLoggedIn(email)
    const from = location.state?.from ?? '/dashboard'
    navigate(from, { replace: true })
  }

  return (
    <div className="min-h-screen min-h-[100dvh] bg-cyber-bg relative flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
      <CyberGrid />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-cyber-accent/20 shadow-glow">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Shield className="w-10 h-10 text-cyber-accent drop-shadow-[0_0_12px_rgba(0,255,156,0.4)]" />
            <span className="font-display font-bold text-2xl text-cyber-accent tracking-wider">
              NOTDEAD
            </span>
          </div>
          <div className="font-mono text-sm text-cyber-accent/90 mb-6 p-3 rounded-lg bg-cyber-secondary/80 border border-cyber-accent/25">
            <span className="text-cyber-accent/60">&gt;</span> create_account --invite
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-slate-200 mb-2 font-mono">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-accent" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-cyber-secondary border border-cyber-accent/30 text-white placeholder-slate-400 focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent/30 transition-all"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-200 mb-2 font-mono">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-accent" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@domain.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-cyber-secondary border border-cyber-accent/30 text-white placeholder-slate-400 focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent/30 transition-all"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-200 mb-2 font-mono">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-accent" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-cyber-secondary border border-cyber-accent/30 text-white placeholder-slate-400 focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent/30 transition-all"
                  required
                />
              </div>
            </div>
            <ChaosButton type="submit" className="w-full mt-6">
              <UserPlus className="w-4 h-4" /> Sign Up
            </ChaosButton>
          </form>
          <p className="text-center text-sm text-slate-300 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-cyber-accent hover:underline font-mono">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
