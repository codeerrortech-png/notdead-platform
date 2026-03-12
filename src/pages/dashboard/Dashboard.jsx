import { useState } from 'react'
import { Routes, Route, NavLink, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  BookOpen,
  Wrench,
  Download,
  Award,
  Bell,
  Shield,
  Menu,
  X,
  ChevronRight,
  CheckCircle,
  FileDown,
} from 'lucide-react'
import CyberGrid from '../../components/CyberGrid'
import GlassCard from '../../components/GlassCard'

const navItems = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/dashboard/courses', label: 'Course Progress', icon: BookOpen },
  { to: '/dashboard/tools', label: 'Purchased Tools', icon: Wrench },
  { to: '/dashboard/downloads', label: 'Downloads', icon: Download },
  { to: '/dashboard/certificates', label: 'Certificates', icon: Award },
]

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="min-h-screen bg-cyber-bg relative flex">
      <CyberGrid />
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 glass-card border-r border-cyber-accent/10 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-cyber-accent/10">
          <Link to="/" className="font-display font-bold text-cyber-accent flex items-center gap-2 tracking-wider">
            <Shield className="w-6 h-6" /> NOTDEAD
          </Link>
          <button
            type="button"
            className="lg:hidden text-cyber-accent p-2"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/dashboard'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-cyber-accent/20 text-cyber-accent border border-cyber-accent/30'
                    : 'text-cyber-text/80 hover:bg-cyber-accent/10 hover:text-cyber-accent border border-transparent'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl glass border border-cyber-accent/20">
          <p className="text-xs text-cyber-text/50 uppercase tracking-wider">Membership</p>
          <p className="text-sm text-cyber-accent font-semibold mt-1">Pro Hacker</p>
          <Link to="/membership" className="text-xs text-cyber-accent/80 hover:text-cyber-accent mt-2 inline-flex items-center gap-1">
            Upgrade <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 glass border-b border-cyber-accent/10 flex items-center justify-between px-4 h-14">
          <button
            type="button"
            className="lg:hidden text-cyber-accent p-2"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex-1" />
          <Link to="/" className="text-sm text-cyber-text/80 hover:text-cyber-accent mr-4">
            Back to site
          </Link>
          <button type="button" className="p-2 text-cyber-accent relative" aria-label="Notifications">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyber-accent shadow-[0_0_8px_#00ff9c]" />
          </button>
        </header>
        <main className="flex-1 p-6 relative z-10">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="courses" element={<DashboardSection title="Course Progress" />} />
            <Route path="tools" element={<DashboardSection title="Purchased Tools" />} />
            <Route path="downloads" element={<DashboardSection title="Downloads" />} />
            <Route path="certificates" element={<DashboardSection title="Certificates" />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function DashboardHome() {
  const stats = [
    { label: 'Courses in progress', value: '3', icon: BookOpen },
    { label: 'Tools owned', value: '5', icon: Wrench },
    { label: 'Certificates', value: '2', icon: Award },
  ]
  const notifications = [
    { text: 'New course module: Kali Linux Mastery — Week 2 available.', time: '2h ago' },
    { text: 'Your certificate for Ethical Hacking Fundamentals is ready.', time: '1d ago' },
  ]
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <h1 className="font-display font-bold text-2xl text-cyber-accent">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item) => (
          <GlassCard key={item.label} hover>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-cyber-accent/10">
                <item.icon className="w-8 h-8 text-cyber-accent" />
              </div>
              <div>
                <p className="text-cyber-text/60 text-sm">{item.label}</p>
                <p className="text-2xl font-bold text-cyber-accent">{item.value}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard hover={false}>
          <h2 className="font-display font-semibold text-lg text-cyber-text mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-cyber-accent" />
            Notifications
          </h2>
          <ul className="space-y-0">
            {notifications.map((n, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-cyber-text/80 border-b border-cyber-accent/10 py-4 last:border-0">
                <Bell className="w-4 h-4 text-cyber-accent/70 shrink-0 mt-0.5" />
                <div>
                  <p>{n.text}</p>
                  <p className="text-xs text-cyber-text/50 mt-1">{n.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </GlassCard>
        <GlassCard hover={false}>
          <h2 className="font-display font-semibold text-lg text-cyber-text mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-cyber-accent" />
            Membership Status
          </h2>
          <div className="p-4 rounded-xl bg-cyber-accent/10 border border-cyber-accent/30">
            <p className="text-cyber-accent font-semibold">Pro Hacker Plan</p>
            <p className="text-sm text-cyber-text/70 mt-1">Renews next month. Access all courses and tools.</p>
            <Link to="/membership" className="inline-flex items-center gap-1 text-sm text-cyber-accent mt-3 hover:underline">
              Manage plan <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </GlassCard>
      </div>
    </motion.div>
  )
}

function DashboardSection({ title }) {
  const isCourses = title === 'Course Progress'
  const isTools = title === 'Purchased Tools'
  const isDownloads = title === 'Downloads'
  const isCerts = title === 'Certificates'
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="font-display font-bold text-2xl text-cyber-accent mb-6">
        {title}
      </h1>
      <GlassCard hover={false}>
        {isCourses && (
          <div className="space-y-4">
            <p className="text-cyber-text/70 text-sm">Your active courses and progress.</p>
            <div className="flex flex-col gap-3">
              {['Ethical Hacking Fundamentals', 'Kali Linux Mastery', 'OSINT Investigation'].map((c, i) => (
                <div key={c} className="flex items-center justify-between p-3 rounded-lg bg-cyber-secondary/50 border border-cyber-accent/10">
                  <span className="text-cyber-text">{c}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 rounded-full bg-cyber-secondary overflow-hidden">
                      <div className="h-full bg-cyber-accent rounded-full" style={{ width: `${30 + i * 25}%` }} />
                    </div>
                    <span className="text-xs text-cyber-accent/80 font-mono">{30 + i * 25}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {isTools && (
          <div className="flex flex-wrap gap-4">
            {['NetScan Pro', 'OSINT Kit', 'ReconX', 'PhishSim', 'Forensics Lab'].map((t) => (
              <div key={t} className="px-4 py-3 rounded-lg border border-cyber-accent/20 text-cyber-text text-sm flex items-center gap-2">
                <Wrench className="w-4 h-4 text-cyber-accent" /> {t}
              </div>
            ))}
          </div>
        )}
        {isDownloads && (
          <div className="space-y-3">
            <p className="text-cyber-text/70 text-sm mb-4">Recent downloads.</p>
            {['OSINT Kit v2.1', 'NetScan Pro Installer', 'Forensics Lab Pack'].map((d) => (
              <div key={d} className="flex items-center justify-between p-3 rounded-lg bg-cyber-secondary/50 border border-cyber-accent/10">
                <FileDown className="w-4 h-4 text-cyber-accent" />
                <span className="text-cyber-text text-sm">{d}</span>
                <button type="button" className="text-xs text-cyber-accent hover:underline">Download</button>
              </div>
            ))}
          </div>
        )}
        {isCerts && (
          <div className="space-y-4">
            <p className="text-cyber-text/70 text-sm">Your earned certificates.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Ethical Hacking Fundamentals', 'Digital Forensics Basics'].map((c) => (
                <div key={c} className="p-4 rounded-xl border border-cyber-accent/30 flex items-center gap-4">
                  <CheckCircle className="w-10 h-10 text-cyber-accent shrink-0" />
                  <div>
                    <p className="font-medium text-cyber-text">{c}</p>
                    <p className="text-xs text-cyber-accent/80">Certificate issued</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {!isCourses && !isTools && !isDownloads && !isCerts && (
          <p className="text-cyber-text/60 text-center py-8">Content for {title} will appear here.</p>
        )}
      </GlassCard>
    </motion.div>
  )
}

export default function Dashboard() {
  return (
    <Routes>
      <Route path="*" element={<DashboardLayout />} />
    </Routes>
  )
}
