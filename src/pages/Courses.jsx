import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Star } from 'lucide-react'
import ChaosButton from '../components/ChaosButton'
import SectionTitle from '../components/SectionTitle'
import GlassCard from '../components/GlassCard'
import BounceHeading from '../components/BounceHeading'
import PageEntrance from '../components/PageEntrance'
import useBounceCards from '../hooks/useBounceCards'
import { courses, levelColors } from '../utils/coursesData'

export default function Courses() {
  const coursesGridRef = useRef(null)
  useBounceCards(coursesGridRef)

  return (
    <PageEntrance className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <SectionTitle
        title="Courses"
        subtitle="Structured paths from fundamentals to advanced offensive security."
        highlightBox
        scrollTrigger
      />
      <div ref={coursesGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {courses.map((c) => (
          <GlassCard key={c.id} bounceScroll hover className="overflow-hidden">
            <div
              className="h-32 -mx-6 -mt-6 mb-4 rounded-t-xl flex items-center justify-center border-b border-cyber-accent/10"
              style={{ background: c.thumb }}
            >
              <c.icon className="w-14 h-14 text-cyber-accent/60" />
            </div>
            <BounceHeading
              as="h3"
              variant="physics"
              scrollTrigger
              className="font-display font-semibold text-lg text-white mb-2 group-hover:text-cyber-accent transition-colors"
            >
              {c.title}
            </BounceHeading>
            <p className="text-sm text-slate-300 mb-4 line-clamp-2">{c.desc}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`text-xs px-2.5 py-1 rounded border ${levelColors[c.level]}`}>
                {c.level}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5" /> {c.duration}
              </span>
              <span className="flex items-center gap-1 text-xs text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" /> {c.rating}
              </span>
            </div>
            <ChaosButton variant="card" as={Link} to={`/courses/${c.id}`} className="w-full">
              View Details & Enroll
            </ChaosButton>
          </GlassCard>
        ))}
      </div>
    </PageEntrance>
  )
}
