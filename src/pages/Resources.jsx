import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import GlassCard from '../components/GlassCard'
import BounceHeading from '../components/BounceHeading'
import PageEntrance from '../components/PageEntrance'
import useBounceCards from '../hooks/useBounceCards'
import { resources } from '../utils/resourcesData'

export default function Resources() {
  const resourcesGridRef = useRef(null)
  useBounceCards(resourcesGridRef)

  return (
    <PageEntrance className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <SectionTitle
        title="Free Resources"
        subtitle="Blogs, guides, tutorials, and downloads to level up your skills."
        highlightBox
        scrollTrigger
      />
      <div ref={resourcesGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {resources.map((r) => (
          <GlassCard key={r.title} bounceScroll hover>
            <div className="p-3 rounded-xl bg-cyber-accent/10 w-fit mb-4">
              <r.icon className="w-10 h-10 text-cyber-accent" />
            </div>
            <BounceHeading
              as="h3"
              variant="physics"
              scrollTrigger
              className="font-display font-semibold text-lg text-white mb-2"
            >
              {r.title}
            </BounceHeading>
            <p className="text-sm text-slate-300 mb-6 flex-1">{r.desc}</p>
            <Link
              to={`/resources/${r.slug}`}
              className="btn-card-primary inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-2.5 font-mono text-sm font-medium min-h-[44px] sm:min-h-0"
            >
              Explore <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </GlassCard>
        ))}
      </div>
    </PageEntrance>
  )
}
