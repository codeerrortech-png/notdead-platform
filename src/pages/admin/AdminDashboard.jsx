import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, BookOpen, Wrench, Activity } from 'lucide-react'
import GlassCard from '../../components/GlassCard'
import { getRegisteredUsers, getActivities, getUserData } from '../../utils/userStore'

function timeAgo(iso) {
  if (!iso) return ''
  try {
    const d = new Date(iso)
    const sec = Math.floor((Date.now() - d.getTime()) / 1000)
    if (sec < 60) return 'Just now'
    if (sec < 3600) return `${Math.floor(sec / 60)} min ago`
    if (sec < 86400) return `${Math.floor(sec / 3600)}h ago`
    if (sec < 604800) return `${Math.floor(sec / 86400)}d ago`
    return d.toLocaleDateString()
  } catch {
    return ''
  }
}

export default function AdminDashboard() {
  const registeredUsers = useMemo(() => getRegisteredUsers(), [])
  const activities = useMemo(() => getActivities(), [])
  const membershipCount = useMemo(() => {
    return registeredUsers.reduce((acc, u) => {
      const d = getUserData(u.email)
      return acc + (d?.memberships?.length ?? 0)
    }, 0)
  }, [registeredUsers])

  const stats = [
    { label: 'Total Users', value: String(registeredUsers.length), icon: Users },
    { label: 'Active Courses', value: '—', icon: BookOpen },
    { label: 'Memberships', value: String(membershipCount), icon: Wrench },
    { label: 'Recent Activity', value: String(activities.length), icon: Activity },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div>
        <h1 className="font-display font-bold text-2xl text-cyber-accent">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Overview of your platform (sign-ups & activities)</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <GlassCard key={item.label} hover>
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-xl bg-cyber-accent/10">
                <item.icon className="w-6 h-6 text-cyber-accent" />
              </div>
            </div>
            <p className="text-slate-400 text-sm mt-3">{item.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{item.value}</p>
          </GlassCard>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard hover={false}>
          <h2 className="font-display font-semibold text-lg text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyber-accent" />
            Recent Activity
          </h2>
          {activities.length === 0 ? (
            <p className="text-slate-400 text-sm py-4">No activity yet. Sign-ups and membership purchases will appear here.</p>
          ) : (
            <ul className="space-y-0">
              {activities.slice(0, 10).map((a, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between py-3 border-b border-cyber-accent/10 last:border-0 text-sm"
                >
                  <div>
                    <p className="text-slate-200">{a.detail}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{a.email}</p>
                  </div>
                  <span className="text-cyber-accent/80 font-mono text-xs">{timeAgo(a.createdAt)}</span>
                </li>
              ))}
            </ul>
          )}
        </GlassCard>
        <GlassCard hover={false}>
          <h2 className="font-display font-semibold text-lg text-white mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/courses"
              className="px-4 py-2 rounded-lg border border-cyber-accent/30 text-cyber-accent hover:bg-cyber-accent/10 text-sm transition-colors"
            >
              Add Course
            </Link>
            <Link
              to="/admin/users"
              className="px-4 py-2 rounded-lg border border-cyber-accent/30 text-cyber-accent hover:bg-cyber-accent/10 text-sm transition-colors"
            >
              Manage Users
            </Link>
            <Link
              to="/admin/tools"
              className="px-4 py-2 rounded-lg border border-cyber-accent/30 text-cyber-accent hover:bg-cyber-accent/10 text-sm transition-colors"
            >
              Add Tool
            </Link>
          </div>
        </GlassCard>
      </div>
    </motion.div>
  )
}
