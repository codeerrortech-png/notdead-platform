import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheck, Lock, User } from 'lucide-react'
import ChaosButton from '../../components/ChaosButton'
import CyberGrid from '../../components/CyberGrid'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Demo: any username/password works. In production use real auth.
    sessionStorage.setItem('admin_authenticated', 'true')
    navigate('/admin')
  }

  return (
    <div className="min-h-screen bg-cyber-bg relative flex flex-col items-center justify-center px-4 py-12">
      <CyberGrid />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-card rounded-2xl p-8 border border-cyber-accent/20 shadow-glow">
          <div className="flex items-center justify-center gap-2 mb-8">
            <ShieldCheck className="w-10 h-10 text-cyber-accent drop-shadow-[0_0_12px_rgba(0,255,156,0.4)]" />
            <span className="font-display font-bold text-2xl text-cyber-accent tracking-wider">
              Admin Panel
            </span>
          </div>
          <div className="font-mono text-sm text-cyber-accent/90 mb-6 p-3 rounded-lg bg-cyber-secondary/80 border border-cyber-accent/25">
            <span className="text-cyber-accent/60">&gt;</span> admin --secure
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-cyber-text/80 mb-2 font-mono">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-accent/60" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-cyber-secondary border border-cyber-accent/30 text-cyber-text placeholder-cyber-text/40 focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent/30 transition-all"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-cyber-text/80 mb-2 font-mono">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-accent/60" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-cyber-secondary border border-cyber-accent/30 text-cyber-text placeholder-cyber-text/40 focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent/30 transition-all"
                  required
                />
              </div>
            </div>
            <ChaosButton type="submit" className="w-full mt-6">
              <Lock className="w-4 h-4" /> Login to Admin
            </ChaosButton>
          </form>
          <p className="text-center text-sm text-cyber-text/50 mt-6">
            Demo: use any username & password to enter.
          </p>
          <p className="text-center mt-2">
            <a href="/" className="text-sm text-cyber-accent/80 hover:text-cyber-accent">
              ← Back to site
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
