import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Users, Search, MoreVertical } from 'lucide-react'
import GlassCard from '../../components/GlassCard'
import { getRegisteredUsers } from '../../utils/userStore'
import { getUserData } from '../../utils/userStore'

function formatDate(iso) {
  if (!iso) return '—'
  try {
    const d = new Date(iso)
    return d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
  } catch {
    return '—'
  }
}

export default function AdminUsers() {
  const [search, setSearch] = useState('')
  const registeredUsers = useMemo(() => getRegisteredUsers(), [])
  const filtered = useMemo(() => {
    if (!search.trim()) return registeredUsers
    const q = search.trim().toLowerCase()
    return registeredUsers.filter((u) => u.email?.toLowerCase().includes(q) || (u.name || '').toLowerCase().includes(q))
  }, [registeredUsers, search])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-cyber-accent">Users</h1>
          <p className="text-slate-400 text-sm mt-1">Manage platform users (sign-ups appear here)</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-accent" />
          <input
            type="search"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-lg bg-cyber-secondary border border-cyber-accent/30 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyber-accent w-full sm:w-64"
          />
        </div>
      </div>
      <GlassCard hover={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cyber-accent/20 text-left text-slate-300">
                <th className="py-3 px-4 font-mono">#</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Plan</th>
                <th className="py-3 px-4">Joined</th>
                <th className="py-3 px-4 w-10" />
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    {registeredUsers.length === 0 ? 'No users yet. They will appear here after sign up.' : 'No users match your search.'}
                  </td>
                </tr>
              ) : (
                filtered.map((u, i) => {
                  const userData = getUserData(u.email)
                  const plan = userData?.memberships?.length ? userData.memberships[userData.memberships.length - 1].plan : '—'
                  return (
                    <tr key={u.email} className="border-b border-cyber-accent/10 hover:bg-cyber-accent/5">
                      <td className="py-3 px-4 font-mono text-cyber-accent">{i + 1}</td>
                      <td className="py-3 px-4 text-slate-200">{u.email}</td>
                      <td className="py-3 px-4 text-slate-200">{u.name || '—'}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-cyber-accent/20 text-cyber-accent text-xs">
                          {plan}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400">{formatDate(u.createdAt)}</td>
                      <td className="py-3 px-4">
                        <button type="button" className="p-1 text-cyber-accent/70 hover:text-cyber-accent" aria-label="More">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </motion.div>
  )
}
