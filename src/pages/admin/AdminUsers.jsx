import { motion } from 'framer-motion'
import { Users, Search, MoreVertical } from 'lucide-react'
import GlassCard from '../../components/GlassCard'

const mockUsers = [
  { id: 1, email: 'alex@example.com', plan: 'Pro Hacker', joined: 'Jan 2025' },
  { id: 2, email: 'sarah@example.com', plan: 'Starter', joined: 'Feb 2025' },
  { id: 3, email: 'james@example.com', plan: 'Elite', joined: 'Mar 2025' },
]

export default function AdminUsers() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-cyber-accent">Users</h1>
          <p className="text-cyber-text/60 text-sm mt-1">Manage platform users</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-accent/60" />
          <input
            type="search"
            placeholder="Search users..."
            className="pl-10 pr-4 py-2 rounded-lg bg-cyber-secondary border border-cyber-accent/30 text-cyber-text text-sm focus:outline-none focus:border-cyber-accent w-full sm:w-64"
          />
        </div>
      </div>
      <GlassCard hover={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cyber-accent/20 text-left text-cyber-text/70">
                <th className="py-3 px-4 font-mono">#</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Plan</th>
                <th className="py-3 px-4">Joined</th>
                <th className="py-3 px-4 w-10" />
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((u) => (
                <tr key={u.id} className="border-b border-cyber-accent/10 hover:bg-cyber-accent/5">
                  <td className="py-3 px-4 font-mono text-cyber-accent/80">{u.id}</td>
                  <td className="py-3 px-4 text-cyber-text">{u.email}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-cyber-accent/20 text-cyber-accent text-xs">
                      {u.plan}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-cyber-text/70">{u.joined}</td>
                  <td className="py-3 px-4">
                    <button type="button" className="p-1 text-cyber-accent/70 hover:text-cyber-accent">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </motion.div>
  )
}
