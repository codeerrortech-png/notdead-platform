import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import GlassCard from '../components/GlassCard'
import { resources } from '../utils/resourcesData'

export default function Resources() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <SectionTitle
        title="Free Resources"
        subtitle="Blogs, guides, tutorials, and downloads to level up your skills."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {resources.map((r, i) => (
          <GlassCard key={r.title} delay={i * 0.08} hover>
            <div className="p-3 rounded-xl bg-cyber-accent/10 w-fit mb-4">
              <r.icon className="w-10 h-10 text-cyber-accent" />
            </div>
            <h3 className="font-display font-semibold text-lg text-cyber-text mb-2">
              {r.title}
            </h3>
            <p className="text-sm text-cyber-text/70 mb-6 flex-1">{r.desc}</p>
            <Link
              to={`/resources/${r.slug}`}
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-2.5 rounded-lg font-mono text-sm font-medium border border-cyber-accent text-cyber-accent hover:bg-cyber-accent/10 hover:shadow-neon hover:border-cyber-accent/70 transition-all duration-300 min-h-[44px] sm:min-h-0"
            >
              Explore <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
