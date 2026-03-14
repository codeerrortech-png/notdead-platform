import { useRef } from 'react'
import { Link } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'
import GlassCard from '../components/GlassCard'
import BounceHeading from '../components/BounceHeading'
import ChaosButton from '../components/ChaosButton'
import PageEntrance from '../components/PageEntrance'
import useBounceCards from '../hooks/useBounceCards'
import { services } from '../utils/servicesData'

export default function Services() {
  const servicesGridRef = useRef(null)
  useBounceCards(servicesGridRef)

  return (
    <PageEntrance className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <SectionTitle
        title="Breach Intelligence Services"
        subtitle="Professional services for enterprises and security teams."
        highlightBox
        scrollTrigger
      />
      <div ref={servicesGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {services.map((s) => (
          <GlassCard key={s.title} bounceScroll hover>
            <div className="p-3 rounded-xl bg-cyber-accent/10 w-fit mb-4">
              <s.icon className="w-10 h-10 text-cyber-accent" />
            </div>
            <BounceHeading
              as="h3"
              variant="physics"
              scrollTrigger
              className="font-display font-semibold text-lg text-white mb-2"
            >
              {s.title}
            </BounceHeading>
            <p className="text-sm text-slate-300 mb-6">{s.desc}</p>
            <ChaosButton variant="card" as={Link} to={`/services/${s.slug}`}>
              Learn More
            </ChaosButton>
          </GlassCard>
        ))}
      </div>
    </PageEntrance>
  )
}
