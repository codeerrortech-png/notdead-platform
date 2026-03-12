import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, IndianRupee, LayoutGrid } from 'lucide-react'
import NeonButton from '../components/NeonButton'
import SectionTitle from '../components/SectionTitle'
import GlassCard from '../components/GlassCard'
import { formatPrice } from '../utils/currency'

const categories = [
  'Vulnerability Scanners',
  'OSINT Investigation Tools',
  'Network Recon Tools',
  'Phishing Simulation Tools',
  'Digital Forensics Utilities',
]

const tools = [
  { name: 'NetScan Pro', desc: 'Network scanner with CVE detection', features: ['Port scan', 'Service fingerprint', 'Export reports'], price: 5, originalPrice: 48, category: 0 },
  { name: 'OSINT Kit', desc: 'All-in-one OSINT collection suite', features: ['Social, DNS, WHOIS', 'API integrations'], price: 8, originalPrice: 78, category: 1 },
  { name: 'ReconX', desc: 'Reconnaissance and enumeration', features: ['Subdomain enum', 'Screenshot capture'], price: 6, originalPrice: 58, category: 2 },
  { name: 'PhishSim', desc: 'Safe phishing simulation for teams', features: ['Templates', 'Analytics', 'Training'], price: 10, originalPrice: 98, category: 3 },
  { name: 'Forensics Lab', desc: 'Disk and memory forensics', features: ['Image analysis', 'Timeline', 'Hash DB'], price: 13, originalPrice: 128, category: 4 },
  { name: 'VulnScan X', desc: 'Automated vulnerability assessment', features: ['CVE DB', 'Exploit sugg.', 'Reports'], price: 7, originalPrice: 68, category: 0 },
]

export default function Tools() {
  const [activeCategory, setActiveCategory] = useState(null)
  const filteredTools = activeCategory === null
    ? tools
    : tools.filter((t) => t.category === activeCategory)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 min-h-[60vh]">
      <SectionTitle
        title="Cybersecurity Tools Marketplace"
        subtitle="Professional tools for scanning, OSINT, recon, and forensics."
      />
      <div className="flex flex-wrap gap-2 mb-6 sm:mb-10">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm border transition-colors ${
            activeCategory === null
              ? 'bg-cyber-accent/20 border-cyber-accent/50 text-cyber-accent'
              : 'border-cyber-accent/20 text-cyber-text/80 hover:border-cyber-accent/40'
          }`}
        >
          <LayoutGrid className="w-4 h-4" /> All
        </button>
        {categories.map((cat, idx) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(idx)}
            className={`px-4 py-2 rounded-lg font-mono text-sm border transition-colors ${
              activeCategory === idx
                ? 'bg-cyber-accent/20 border-cyber-accent/50 text-cyber-accent'
                : 'border-cyber-accent/20 text-cyber-text/80 hover:border-cyber-accent/40'
            }`}
          >
            {cat.split(' ')[0]}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredTools.map((t, i) => (
            <GlassCard key={t.name} delay={i * 0.05} hover>
              <div className="h-28 rounded-lg bg-cyber-secondary/80 border border-cyber-accent/10 flex items-center justify-center mb-4">
                <span className="font-mono text-cyber-accent/40 text-xs">Preview</span>
              </div>
              <p className="text-xs text-cyber-accent/80 mb-1">
                {categories[t.category]}
              </p>
              <h3 className="font-display font-semibold text-lg text-cyber-text mb-2">
                {t.name}
              </h3>
              <p className="text-sm text-cyber-text/70 mb-3">{t.desc}</p>
              <ul className="text-xs text-cyber-text/60 space-y-1 mb-4">
                {t.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  {t.originalPrice != null && (
                    <span className="text-sm text-cyber-text/50 line-through">
                      {formatPrice(t.originalPrice)}
                    </span>
                  )}
                  <span className="inline-block px-1.5 py-0.5 rounded bg-cyber-accent/20 text-cyber-accent text-xs font-bold">
                    90% OFF
                  </span>
                  <span className="flex items-center gap-1 text-cyber-accent font-semibold">
                    <IndianRupee className="w-4 h-4" /> {formatPrice(t.price)}
                  </span>
                </div>
                <NeonButton variant="primary" className="gap-1 shrink-0">
                  <Download className="w-4 h-4" /> Buy / Download
                </NeonButton>
              </div>
            </GlassCard>
          ))}
        </div>
      </AnimatePresence>
    </div>
  )
}
