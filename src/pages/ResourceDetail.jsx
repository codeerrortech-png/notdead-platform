import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import { getResourceBySlug } from '../utils/resourcesData'

export default function ResourceDetail() {
  const { slug } = useParams()
  const resource = getResourceBySlug(slug)

  if (!resource) return <Navigate to="/resources" replace />

  const Icon = resource.icon

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <Link
        to="/resources"
        className="inline-flex items-center gap-2 text-sm text-cyber-accent/80 hover:text-cyber-accent mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Resources
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <GlassCard hover={false}>
          <div className="p-4 rounded-xl bg-cyber-accent/10 w-fit mb-6">
            <Icon className="w-12 h-12 text-cyber-accent" />
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-cyber-text mb-4">
            {resource.title}
          </h1>
          <p className="text-cyber-text/80 leading-relaxed mb-8">
            {resource.fullDescription}
          </p>
          {resource.items && resource.items.length > 0 && (
            <div>
              <h3 className="font-display font-semibold text-cyber-accent mb-3">
                What you’ll find here
              </h3>
              <ul className="space-y-2">
                {resource.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-cyber-text/80"
                  >
                    <CheckCircle className="w-4 h-4 text-cyber-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </div>
  )
}
