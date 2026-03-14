import { useState } from 'react'
import { Routes, Route, NavLink, Link, Navigate } from 'react-router-dom'
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
import PageEntrance from '../../components/PageEntrance'
import BounceHeading from '../../components/BounceHeading'
import { isUserLoggedIn, getLoggedInEmail } from '../../utils/auth'
import { getUserData } from '../../utils/userStore'

const navItems = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/dashboard/courses', label: 'Course Progress', icon: BookOpen },
  { to: '/dashboard/tools', label: 'Purchased Tools', icon: Wrench },
  { to: '/dashboard/downloads', label: 'Downloads', icon: Download },
  { to: '/dashboard/certificates', label: 'Certificates', icon: Award },
]

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  if (!isUserLoggedIn()) return <Navigate to="/login" state={{ from: '/dashboard' }} replace />
  const email = getLoggedInEmail()
  const userData = getUserData(email)
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
                    : 'text-slate-200 hover:bg-cyber-accent/10 hover:text-cyber-accent border border-transparent'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl glass border border-cyber-accent/20">
          <p className="text-xs text-slate-400 uppercase tracking-wider">Membership</p>
          <p className="text-sm text-cyber-accent font-semibold mt-1">
            {userData.memberships?.length ? userData.memberships[userData.memberships.length - 1].plan : 'No plan'}
          </p>
          <Link to="/membership" className="text-xs text-slate-300 hover:text-cyber-accent mt-2 inline-flex items-center gap-1">
            {userData.memberships?.length ? 'Manage' : 'Get'} plan <ChevronRight className="w-3 h-3" />
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
          <Link to="/" className="text-sm text-slate-200 hover:text-cyber-accent mr-4">
            Back to site
          </Link>
          <button type="button" className="p-2 text-cyber-accent relative" aria-label="Notifications">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyber-accent shadow-[0_0_8px_#00ff9c]" />
          </button>
        </header>
        <main className="flex-1 p-6 relative z-10">
          <Routes>
            <Route index element={<DashboardHome userData={userData} />} />
            <Route path="courses" element={<DashboardSection title="Course Progress" userData={userData} />} />
            <Route path="tools" element={<DashboardSection title="Purchased Tools" userData={userData} />} />
            <Route path="downloads" element={<DashboardSection title="Downloads" userData={userData} />} />
            <Route path="certificates" element={<DashboardSection title="Certificates" userData={userData} />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function DashboardHome({ userData }) {
  const courses = userData?.courses ?? []
  const tools = userData?.tools ?? []
  const certs = userData?.certificates ?? []
  const memberships = userData?.memberships ?? []
  const notifications = userData?.notifications ?? []
  const stats = [
    { label: 'Courses in progress', value: String(courses.length), icon: BookOpen },
    { label: 'Tools owned', value: String(tools.length), icon: Wrench },
    { label: 'Certificates', value: String(certs.length), icon: Award },
  ]
  const currentPlan = memberships.length ? memberships[memberships.length - 1] : null
  return (
    <PageEntrance className="space-y-8">
      <BounceHeading as="h1" className="font-display font-bold text-2xl text-cyber-accent">
        Dashboard
      </BounceHeading>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item) => (
          <GlassCard key={item.label} hover>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-cyber-accent/10">
                <item.icon className="w-8 h-8 text-cyber-accent" />
              </div>
              <div>
                <p className="text-slate-300 text-sm">{item.label}</p>
                <p className="text-2xl font-bold text-cyber-accent">{item.value}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard hover={false}>
          <h2 className="font-display font-semibold text-lg text-white mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-cyber-accent" />
            Notifications
          </h2>
          {notifications.length === 0 ? (
            <p className="text-slate-400 text-sm py-4">No notifications yet.</p>
          ) : (
            <ul className="space-y-0">
              {notifications.map((n, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-200 border-b border-cyber-accent/10 py-4 last:border-0">
                  <Bell className="w-4 h-4 text-cyber-accent shrink-0 mt-0.5" />
                  <div>
                    <p>{typeof n === 'string' ? n : n.text}</p>
                    <p className="text-xs text-slate-400 mt-1">{typeof n === 'object' && n.time ? n.time : ''}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </GlassCard>
        <GlassCard hover={false}>
          <h2 className="font-display font-semibold text-lg text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-cyber-accent" />
            Membership Status
          </h2>
          <div className="p-4 rounded-xl bg-cyber-accent/10 border border-cyber-accent/30">
            <p className="text-cyber-accent font-semibold">{currentPlan ? currentPlan.plan : 'No active plan'}</p>
            <p className="text-sm text-slate-300 mt-1">
              {currentPlan ? 'Access all courses and tools. Manage or upgrade below.' : 'Get a plan to unlock courses and tools.'}
            </p>
            <Link to="/membership" className="inline-flex items-center gap-1 text-sm text-cyber-accent mt-3 hover:underline">
              {currentPlan ? 'Manage' : 'Get'} plan <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </GlassCard>
      </div>
    </PageEntrance>
  )
}

function DashboardSection({ title, userData }) {
  const isCourses = title === 'Course Progress'
  const isTools = title === 'Purchased Tools'
  const isDownloads = title === 'Downloads'
  const isCerts = title === 'Certificates'
  const courses = userData?.courses ?? []
  const tools = userData?.tools ?? []
  const downloads = userData?.downloads ?? []
  const certs = userData?.certificates ?? []
  return (
    <PageEntrance>
      <BounceHeading as="h1" className="font-display font-bold text-2xl text-cyber-accent mb-6">
        {title}
      </BounceHeading>
      <GlassCard hover={false}>
        {isCourses && (
          <div className="space-y-4">
            <p className="text-slate-300 text-sm">Your active courses and progress.</p>
            {courses.length === 0 ? (
              <p className="text-slate-400 text-sm py-4">No courses yet. Enroll via Courses page (contact to get started).</p>
            ) : (
              <div className="flex flex-col gap-3">
                {courses.map((c, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-cyber-secondary/50 border border-cyber-accent/10">
                    <span className="text-slate-100">{typeof c === 'string' ? c : c.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 rounded-full bg-cyber-secondary overflow-hidden">
                        <div className="h-full bg-cyber-accent rounded-full" style={{ width: `${typeof c === 'object' && c.progress != null ? c.progress : 0}%` }} />
                      </div>
                      <span className="text-xs text-cyber-accent font-mono">{typeof c === 'object' && c.progress != null ? c.progress : 0}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {isTools && (
          <div className="flex flex-wrap gap-4">
            {tools.length === 0 ? (
              <p className="text-slate-400 text-sm py-4">No tools purchased yet. Browse Tools and contact to get access.</p>
            ) : (
              tools.map((t, i) => (
                <div key={i} className="px-4 py-3 rounded-lg border border-cyber-accent/20 text-slate-200 text-sm flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-cyber-accent" /> {typeof t === 'string' ? t : t.name}
                </div>
              ))
            )}
          </div>
        )}
        {isDownloads && (
          <div className="space-y-3">
            <p className="text-slate-300 text-sm mb-4">Recent downloads.</p>
            {downloads.length === 0 ? (
              <p className="text-slate-400 text-sm py-4">No downloads yet.</p>
            ) : (
              downloads.map((d, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-cyber-secondary/50 border border-cyber-accent/10">
                  <FileDown className="w-4 h-4 text-cyber-accent" />
                  <span className="text-slate-200 text-sm">{typeof d === 'string' ? d : d.name}</span>
                  <button type="button" className="text-xs text-cyber-accent hover:underline">Download</button>
                </div>
              ))
            )}
          </div>
        )}
        {isCerts && (
          <div className="space-y-4">
            <p className="text-slate-300 text-sm">Your earned certificates.</p>
            {certs.length === 0 ? (
              <p className="text-slate-400 text-sm py-4">No certificates yet. Complete courses to earn them.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certs.map((c, i) => (
                  <div key={i} className="p-4 rounded-xl border border-cyber-accent/30 flex items-center gap-4">
                    <CheckCircle className="w-10 h-10 text-cyber-accent shrink-0" />
                    <div>
                      <p className="font-medium text-slate-100">{typeof c === 'string' ? c : c.name}</p>
                      <p className="text-xs text-slate-400">Certificate issued</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {!isCourses && !isTools && !isDownloads && !isCerts && (
          <p className="text-slate-400 text-center py-8">Content for {title} will appear here.</p>
        )}
      </GlassCard>
    </PageEntrance>
  )
}

export default function Dashboard() {
  return (
    <Routes>
      <Route path="*" element={<DashboardLayout />} />
    </Routes>
  )
}
