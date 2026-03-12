import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, BookOpen, Wrench, DollarSign, TrendingUp, Activity } from 'lucide-react'
import GlassCard from '../../components/GlassCard'

const stats = [
  { label: 'Total Users', value: '12,450', icon: Users, change: '+12%' },
  { label: 'Active Courses', value: '6', icon: BookOpen, change: '' },
  { label: 'Tools Sold', value: '3,289', icon: Wrench, change: '+8%' },
  { label: 'Revenue (MTD)', value: '$24,500', icon: DollarSign, change: '+18%' },
]

const recentActivity = [
  { action: 'New user registered', user: 'alex@example.com', time: '2 min ago' },
  { action: 'Course enrollment', user: 'Ethical Hacking Fundamentals', time: '15 min ago' },
  { action: 'Tool purchase', user: 'NetScan Pro', time: '1 hour ago' },
  { action: 'Membership upgrade', user: 'Pro Hacker Plan', time: '2 hours ago' },
]

export default function AdminDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div>
        <h1 className="font-display font-bold text-2xl text-cyber-accent">Dashboard</h1>
        <p className="text-cyber-text/60 text-sm mt-1">Overview of your platform</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <GlassCard key={item.label} hover>
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-xl bg-cyber-accent/10">
                <item.icon className="w-6 h-6 text-cyber-accent" />
              </div>
              {item.change && (
                <span className="text-xs font-mono text-cyber-accent flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> {item.change}
                </span>
              )}
            </div>
            <p className="text-cyber-text/60 text-sm mt-3">{item.label}</p>
            <p className="text-2xl font-bold text-cyber-text mt-1">{item.value}</p>
          </GlassCard>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard hover={false}>
          <h2 className="font-display font-semibold text-lg text-cyber-text mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyber-accent" />
            Recent Activity
          </h2>
          <ul className="space-y-0">
            {recentActivity.map((a, i) => (
              <li
                key={i}
                className="flex items-center justify-between py-3 border-b border-cyber-accent/10 last:border-0 text-sm"
              >
                <div>
                  <p className="text-cyber-text">{a.action}</p>
                  <p className="text-cyber-text/50 text-xs mt-0.5">{a.user}</p>
                </div>
                <span className="text-cyber-accent/70 font-mono text-xs">{a.time}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
        <GlassCard hover={false}>
          <h2 className="font-display font-semibold text-lg text-cyber-text mb-4">Quick Actions</h2>
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
