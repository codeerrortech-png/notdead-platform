import { motion } from 'framer-motion'
import { BookOpen, Plus } from 'lucide-react'
import GlassCard from '../../components/GlassCard'
import NeonButton from '../../components/NeonButton'

const mockCourses = [
  { id: 1, title: 'Ethical Hacking Fundamentals', level: 'Beginner', enrollments: 1250 },
  { id: 2, title: 'Kali Linux Mastery', level: 'Intermediate', enrollments: 890 },
  { id: 3, title: 'Bug Bounty Hunting', level: 'Advanced', enrollments: 420 },
]

export default function AdminCourses() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-cyber-accent">Courses</h1>
          <p className="text-cyber-text/60 text-sm mt-1">Manage courses and enrollments</p>
        </div>
        <NeonButton variant="primary" className="gap-2">
          <Plus className="w-4 h-4" /> Add Course
        </NeonButton>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCourses.map((c) => (
          <GlassCard key={c.id} hover>
            <div className="flex items-start justify-between">
              <BookOpen className="w-8 h-8 text-cyber-accent/80" />
              <span className="text-xs font-mono text-cyber-accent/70">{c.enrollments} enrolled</span>
            </div>
            <h3 className="font-display font-semibold text-cyber-text mt-3">{c.title}</h3>
            <p className="text-xs text-cyber-accent/80 mt-1">{c.level}</p>
            <div className="mt-4 flex gap-2">
              <button type="button" className="text-sm text-cyber-accent hover:underline">Edit</button>
              <button type="button" className="text-sm text-cyber-text/60 hover:text-cyber-accent">Stats</button>
            </div>
          </GlassCard>
        ))}
      </div>
    </motion.div>
  )
}
