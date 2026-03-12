import { motion } from 'framer-motion'
import { BookOpen, FileText, Video, Download, ExternalLink } from 'lucide-react'
import NeonButton from '../components/NeonButton'
import SectionTitle from '../components/SectionTitle'
import GlassCard from '../components/GlassCard'

const resources = [
  { title: 'Cybersecurity Blog', desc: 'Latest articles and threat analyses', icon: BookOpen },
  { title: 'OSINT Guides', desc: 'Step-by-step OSINT methodologies', icon: FileText },
  { title: 'Tool Tutorials', desc: 'Video and written tool walkthroughs', icon: Video },
  { title: 'Case Studies', desc: 'Real-world breach and investigation cases', icon: FileText },
  { title: 'Downloadable Resources', desc: 'Cheat sheets, templates, checklists', icon: Download },
]

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
            <NeonButton variant="outline" className="gap-2">
              Explore <ExternalLink className="w-3.5 h-3.5" />
            </NeonButton>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
