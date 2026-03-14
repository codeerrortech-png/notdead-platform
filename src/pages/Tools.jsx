import { useState, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { IndianRupee, LayoutGrid, Mail } from 'lucide-react'
import ChaosButton from '../components/ChaosButton'
import SectionTitle from '../components/SectionTitle'
import GlassCard from '../components/GlassCard'
import BounceHeading from '../components/BounceHeading'
import PageEntrance from '../components/PageEntrance'
import useBounceCards from '../hooks/useBounceCards'
import { formatPrice } from '../utils/currency'

const categories = [
  'Vulnerability Scanners',
  'OSINT Investigation Tools',
  'Network Recon Tools',
  'Phishing Simulation Tools',
  'Digital Forensics Utilities',
]

const INSTAGRAM_1 = 'https://www.instagram.com/zero______trace?igsh=MWEyY2pjYzhhOW52aA=='
const INSTAGRAM_2 = 'https://www.instagram.com/_code._.error?igsh=MjlkOGllemF3ZWdo'

const tools = [
  { name: 'NetScan Pro', desc: 'Network scanner with CVE detection', features: ['Port scan', 'Service fingerprint', 'Export reports'], price: 2999, originalPrice: 9999, category: 0, contactUrl: INSTAGRAM_1 },
  { name: 'OSINT Kit', desc: 'All-in-one OSINT collection suite', features: ['Social, DNS, WHOIS', 'API integrations'], price: 4499, originalPrice: 14999, category: 1, contactUrl: INSTAGRAM_1 },
  { name: 'ReconX', desc: 'Reconnaissance and enumeration', features: ['Subdomain enum', 'Screenshot capture'], price: 3499, originalPrice: 11999, category: 2, contactUrl: INSTAGRAM_1 },
  { name: 'PhishSim', desc: 'Safe phishing simulation for teams', features: ['Templates', 'Analytics', 'Training'], price: 4999, originalPrice: 17999, category: 3, contactUrl: INSTAGRAM_2 },
  { name: 'Forensics Lab', desc: 'Disk and memory forensics', features: ['Image analysis', 'Timeline', 'Hash DB'], price: 6499, originalPrice: 21999, category: 4, contactUrl: INSTAGRAM_2 },
  { name: 'VulnScan X', desc: 'Automated vulnerability assessment', features: ['CVE DB', 'Exploit sugg.', 'Reports'], price: 3999, originalPrice: 12999, category: 0, contactUrl: INSTAGRAM_2 },
]

export default function Tools() {
  const [activeCategory, setActiveCategory] = useState(null)
  const toolsGridRef = useRef(null)
  useBounceCards(toolsGridRef, { triggerKey: activeCategory })
  const filteredTools = activeCategory === null
    ? tools
    : tools.filter((t) => t.category === activeCategory)

  return (
    <PageEntrance className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 min-h-[60vh]">
      <SectionTitle
        title="Cybersecurity Tools Marketplace"
        subtitle="Professional tools for scanning, OSINT, recon, and forensics."
        highlightBox
        scrollTrigger
      />
      <div className="flex flex-wrap gap-2 mb-6 sm:mb-10">
        <button
          type="button"
          onClick={() => setActiveCategory(null)}
          className={`filter-pill flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-sm ${
            activeCategory === null ? 'filter-pill-active' : ''
          }`}
        >
          <LayoutGrid className="w-4 h-4 shrink-0" /> All
        </button>
        {categories.map((cat, idx) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(idx)}
            className={`filter-pill px-4 py-2.5 rounded-lg font-mono text-sm ${
              activeCategory === idx ? 'filter-pill-active' : ''
            }`}
          >
            {cat.split(' ')[0]}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <div ref={toolsGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredTools.map((t) => (
            <GlassCard key={t.name} bounceScroll hover>
              <div className="h-28 rounded-lg bg-cyber-secondary/80 border border-cyber-accent/10 flex items-center justify-center mb-4">
                <span className="font-mono text-cyber-accent/40 text-xs">Preview</span>
              </div>
              <p className="text-xs text-cyber-accent/80 mb-1">
                {categories[t.category]}
              </p>
              <BounceHeading
                as="h3"
                variant="physics"
                scrollTrigger
                className="font-display font-semibold text-lg text-white mb-2"
              >
                {t.name}
              </BounceHeading>
              <p className="text-sm text-slate-300 mb-3">{t.desc}</p>
              <ul className="text-xs text-slate-300 space-y-1 mb-4">
                {t.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  {t.originalPrice != null && (
                    <span className="text-sm text-slate-400 line-through">
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
                <ChaosButton variant="card" as="a" href={t.contactUrl} target="_blank" rel="noopener noreferrer" className="gap-1 shrink-0">
                  <Mail className="w-4 h-4" /> Contact
                </ChaosButton>
              </div>
            </GlassCard>
          ))}
        </div>
      </AnimatePresence>
    </PageEntrance>
  )
}
