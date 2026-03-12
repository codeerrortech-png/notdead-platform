import { motion } from 'framer-motion'
import { Shield, Eye, FileText, Search, Fingerprint, ShieldAlert } from 'lucide-react'
import NeonButton from '../components/NeonButton'
import SectionTitle from '../components/SectionTitle'
import GlassCard from '../components/GlassCard'

const services = [
  {
    title: 'Data Breach Intelligence',
    desc: 'Monitor and analyze breach databases; get alerts and attribution.',
    icon: Shield,
  },
  {
    title: 'Dark Web Monitoring',
    desc: 'Track mentions of your brand and credentials on dark web markets.',
    icon: Eye,
  },
  {
    title: 'Threat Intelligence Reports',
    desc: 'Regular reports on emerging threats and actor TTPs.',
    icon: FileText,
  },
  {
    title: 'Corporate Security Investigations',
    desc: 'Internal and external investigations with legal-grade documentation.',
    icon: Search,
  },
  {
    title: 'Digital Footprint Analysis',
    desc: "Map your organization's exposed attack surface and exposure.",
    icon: Fingerprint,
  },
  {
    title: 'Incident Response & Recovery',
    desc: 'Rapid containment, forensics, and recovery support for security incidents.',
    icon: ShieldAlert,
  },
]

export default function Services() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <SectionTitle
        title="Breach Intelligence Services"
        subtitle="Professional services for enterprises and security teams."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {services.map((s, i) => (
          <GlassCard key={s.title} delay={i * 0.08} hover>
            <div className="p-3 rounded-xl bg-cyber-accent/10 w-fit mb-4">
              <s.icon className="w-10 h-10 text-cyber-accent" />
            </div>
            <h3 className="font-display font-semibold text-lg text-cyber-text mb-2">
              {s.title}
            </h3>
            <p className="text-sm text-cyber-text/70 mb-6">{s.desc}</p>
            <NeonButton variant="outline">Learn More</NeonButton>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
