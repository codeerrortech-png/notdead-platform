import { Link } from 'react-router-dom'
import { Clock, Star } from 'lucide-react'
import ChaosButton from '../components/ChaosButton'
import SectionTitle from '../components/SectionTitle'
import GlassCard from '../components/GlassCard'
import { courses, levelColors } from '../utils/coursesData'

export default function Courses() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <SectionTitle
        title="Courses"
        subtitle="Structured paths from fundamentals to advanced offensive security."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {courses.map((c, i) => (
          <GlassCard key={c.id} delay={i * 0.06} hover className="overflow-hidden">
            <div
              className="h-32 -mx-6 -mt-6 mb-4 rounded-t-xl flex items-center justify-center border-b border-cyber-accent/10"
              style={{ background: c.thumb }}
            >
              <c.icon className="w-14 h-14 text-cyber-accent/60" />
            </div>
            <h3 className="font-display font-semibold text-lg text-cyber-text mb-2 group-hover:text-cyber-accent transition-colors">
              {c.title}
            </h3>
            <p className="text-sm text-cyber-text/70 mb-4 line-clamp-2">{c.desc}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`text-xs px-2.5 py-1 rounded border ${levelColors[c.level]}`}>
                {c.level}
              </span>
              <span className="flex items-center gap-1 text-xs text-cyber-text/60">
                <Clock className="w-3.5 h-3.5" /> {c.duration}
              </span>
              <span className="flex items-center gap-1 text-xs text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" /> {c.rating}
              </span>
            </div>
            <ChaosButton as={Link} to={`/courses/${c.id}`} className="w-full">
              View Details & Enroll
            </ChaosButton>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
