import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import GlassCard from '../../components/GlassCard'

const mockServices = [
  'Data Breach Intelligence',
  'Dark Web Monitoring',
  'Threat Intelligence Reports',
  'Corporate Security Investigations',
  'Digital Footprint Analysis',
  'Incident Response & Recovery',
]

export default function AdminServices() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-cyber-accent">Services</h1>
        <p className="text-cyber-text/60 text-sm mt-1">Breach intelligence & service offerings</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockServices.map((name) => (
          <GlassCard key={name} hover>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-cyber-accent/10">
                <Shield className="w-6 h-6 text-cyber-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-medium text-cyber-text">{name}</h3>
                <button type="button" className="text-sm text-cyber-accent/80 hover:text-cyber-accent mt-1">
                  Edit
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </motion.div>
  )
}
