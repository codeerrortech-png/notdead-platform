import { useState } from 'react'
import { Routes, Route, NavLink, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Wrench,
  Shield,
  Settings,
  Bell,
  Menu,
  X,
  LogOut,
  ShieldCheck,
} from 'lucide-react'
import CyberGrid from '../../components/CyberGrid'
import GlassCard from '../../components/GlassCard'
import AdminDashboard from './AdminDashboard'
import AdminUsers from './AdminUsers'
import AdminCourses from './AdminCourses'
import AdminTools from './AdminTools'
import AdminServices from './AdminServices'
import AdminSettings from './AdminSettings'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/courses', label: 'Courses', icon: BookOpen },
  { to: '/admin/tools', label: 'Tools', icon: Wrench },
  { to: '/admin/services', label: 'Services', icon: Shield },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    // Clear admin session (when you add real auth, clear token here)
    sessionStorage.removeItem('admin_authenticated')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-cyber-bg relative flex">
      <CyberGrid />
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 glass-card border-r border-cyber-accent/10 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-cyber-accent/10">
          <Link to="/admin" className="font-display font-bold text-cyber-accent flex items-center gap-2 tracking-wider">
            <ShieldCheck className="w-6 h-6" /> Admin
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
              end={to === '/admin'}
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
          <p className="text-xs text-cyber-text/50 uppercase tracking-wider">NOTDEAD Admin</p>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-2 flex items-center gap-2 text-sm text-cyber-accent/80 hover:text-cyber-accent transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
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
            View site
          </Link>
          <button type="button" className="p-2 text-cyber-accent relative" aria-label="Notifications">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyber-accent shadow-[0_0_8px_#00ff9c]" />
          </button>
        </header>
        <main className="flex-1 p-6 relative z-10 overflow-auto">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="tools" element={<AdminTools />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="settings" element={<AdminSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
