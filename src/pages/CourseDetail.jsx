import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Star, ArrowLeft, CheckCircle, CreditCard } from 'lucide-react'
import { getCourseById, levelColors } from '../utils/coursesData'
import NeonButton from '../components/NeonButton'
import GlassCard from '../components/GlassCard'

export default function CourseDetail() {
  const { id } = useParams()
  const course = getCourseById(id)

  if (!course) return <Navigate to="/courses" replace />

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <Link
        to="/courses"
        className="inline-flex items-center gap-2 text-sm text-cyber-accent/80 hover:text-cyber-accent mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Courses
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <GlassCard hover={false}>
          <div
            className="h-48 -mx-6 -mt-6 mb-6 rounded-t-xl flex items-center justify-center border-b border-cyber-accent/10"
            style={{ background: course.thumb }}
          >
            <course.icon className="w-20 h-20 text-cyber-accent/60" />
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`text-xs px-2.5 py-1 rounded border ${levelColors[course.level]}`}>
              {course.level}
            </span>
            <span className="flex items-center gap-1 text-xs text-cyber-text/60">
              <Clock className="w-3.5 h-3.5" /> {course.duration}
            </span>
            <span className="flex items-center gap-1 text-xs text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" /> {course.rating}
            </span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-cyber-text mb-4">
            {course.title}
          </h1>
          <p className="text-cyber-text/80 leading-relaxed mb-6">
            {course.fullDescription}
          </p>
          {course.modules && course.modules.length > 0 && (
            <div className="mb-8">
              <h3 className="font-display font-semibold text-cyber-accent mb-3">Curriculum</h3>
              <ul className="space-y-2">
                {course.modules.map((mod, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-cyber-text/80">
                    <CheckCircle className="w-4 h-4 text-cyber-accent shrink-0" />
                    {mod}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-cyber-accent/10">
            <div>
              <span className="text-cyber-text/60 text-sm">Price</span>
              <p className="text-2xl font-bold text-cyber-accent">${course.price}</p>
            </div>
            <Link to={`/checkout/${course.id}`}>
              <NeonButton variant="primary" className="w-full sm:w-auto gap-2">
                <CreditCard className="w-4 h-4" /> Enroll Now — Proceed to Payment
              </NeonButton>
            </Link>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}
