import { motion } from 'framer-motion'
import { Settings, Mail, Bell, Shield } from 'lucide-react'
import GlassCard from '../../components/GlassCard'
import NeonButton from '../../components/NeonButton'

export default function AdminSettings() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-cyber-accent">Settings</h1>
        <p className="text-cyber-text/60 text-sm mt-1">Platform configuration</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard hover={false}>
          <h3 className="font-display font-semibold text-cyber-text mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-cyber-accent" />
            Notifications
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 text-sm text-cyber-text/80">
              <input type="checkbox" className="rounded border-cyber-accent/50 text-cyber-accent bg-cyber-secondary" />
              Email on new user signup
            </label>
            <label className="flex items-center gap-3 text-sm text-cyber-text/80">
              <input type="checkbox" className="rounded border-cyber-accent/50 text-cyber-accent bg-cyber-secondary" defaultChecked />
              Email on course enrollment
            </label>
          </div>
        </GlassCard>
        <GlassCard hover={false}>
          <h3 className="font-display font-semibold text-cyber-text mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyber-accent" />
            Security
          </h3>
          <p className="text-sm text-cyber-text/70 mb-4">Change admin password and 2FA settings.</p>
          <NeonButton variant="outline">Security settings</NeonButton>
        </GlassCard>
      </div>
    </motion.div>
  )
}
