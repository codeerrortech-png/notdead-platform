import { useRef } from 'react'
import { Star, Quote } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import GlassCard from '../components/GlassCard'
import BounceHeading from '../components/BounceHeading'
import PageEntrance from '../components/PageEntrance'
import useBounceCards from '../hooks/useBounceCards'

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'Security Engineer',
    text: 'NOTDEAD turned my theoretical knowledge into hands-on skills. The labs are top-tier.',
    rating: 5,
    avatar: 'AC',
  },
  {
    name: 'Sarah M.',
    role: 'Penetration Tester',
    text: 'Best investment for my career. Pro plan tools and courses are worth every penny.',
    rating: 5,
    avatar: 'SM',
  },
  {
    name: 'James K.',
    role: 'SOC Analyst',
    text: 'OSINT and forensics courses helped me lead our first major incident response.',
    rating: 5,
    avatar: 'JK',
  },
]

export default function Testimonials() {
  const testimonialsGridRef = useRef(null)
  useBounceCards(testimonialsGridRef)

  return (
    <PageEntrance className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <SectionTitle
        title="Testimonials"
        subtitle="What our community says about NOTDEAD."
        highlightBox
        scrollTrigger
      />
      <div ref={testimonialsGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {testimonials.map((t) => (
          <GlassCard key={t.name} bounceScroll hover>
            <Quote className="w-10 h-10 text-cyber-accent mb-4" />
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star
                  key={j}
                  className="w-4 h-4 text-amber-400 fill-amber-400"
                />
              ))}
            </div>
            <p className="text-sm text-slate-200 mb-6 leading-relaxed">"{t.text}"</p>
            <div className="flex items-center gap-3 pt-4 border-t border-cyber-accent/10">
              <div className="w-12 h-12 rounded-full bg-cyber-accent/20 flex items-center justify-center text-cyber-accent font-mono font-semibold text-sm border border-cyber-accent/30">
                {t.avatar}
              </div>
              <div>
                <BounceHeading
                  as="p"
                  variant="physics"
                  scrollTrigger
                  className="font-semibold text-white"
                >
                  {t.name}
                </BounceHeading>
                <p className="text-xs text-slate-400">{t.role}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </PageEntrance>
  )
}
