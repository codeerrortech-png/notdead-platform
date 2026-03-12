import { motion } from 'framer-motion'
import { Wrench, Plus } from 'lucide-react'
import GlassCard from '../../components/GlassCard'
import NeonButton from '../../components/NeonButton'
import { formatPrice } from '../../utils/currency'

const mockTools = [
  { id: 1, name: 'NetScan Pro', category: 'Vulnerability Scanners', price: 5, sales: 320 },
  { id: 2, name: 'OSINT Kit', category: 'OSINT', price: 8, sales: 180 },
  { id: 3, name: 'Forensics Lab', category: 'Forensics', price: 13, sales: 95 },
]

export default function AdminTools() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-cyber-accent">Tools</h1>
          <p className="text-cyber-text/60 text-sm mt-1">Manage marketplace tools</p>
        </div>
        <NeonButton variant="primary" className="gap-2">
          <Plus className="w-4 h-4" /> Add Tool
        </NeonButton>
      </div>
      <GlassCard hover={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cyber-accent/20 text-left text-cyber-text/70">
                <th className="py-3 px-4">Tool</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Sales</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockTools.map((t) => (
                <tr key={t.id} className="border-b border-cyber-accent/10 hover:bg-cyber-accent/5">
                  <td className="py-3 px-4 text-cyber-text font-medium">{t.name}</td>
                  <td className="py-3 px-4 text-cyber-text/70">{t.category}</td>
                  <td className="py-3 px-4 text-cyber-accent">{formatPrice(t.price)}</td>
                  <td className="py-3 px-4 text-cyber-text/80">{t.sales}</td>
                  <td className="py-3 px-4">
                    <button type="button" className="text-cyber-accent hover:underline text-sm">Edit</button>
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
