import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Crown, Wrench, ArrowRight, Shield, Zap } from 'lucide-react'
import NeonButton from '../components/NeonButton'
import TerminalTyping from '../components/TerminalTyping'
import SectionTitle from '../components/SectionTitle'
import GlassCard from '../components/GlassCard'

const featuredCourses = [
  { title: 'Ethical Hacking Fundamentals', level: 'Beginner', to: '/courses/1' },
  { title: 'Kali Linux Mastery', level: 'Intermediate', to: '/courses/2' },
  { title: 'Bug Bounty Hunting', level: 'Advanced', to: '/courses/6' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[95vh] sm:min-h-[100vh] flex flex-col items-center justify-center px-4 sm:px-6 py-20 sm:py-28 text-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-radial-cyber opacity-60"
          aria-hidden
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-cyber-accent/20 mb-10 animate-glow-pulse"
        >
          <Zap className="w-5 h-5 text-cyber-accent" />
          <span className="font-mono text-sm sm:text-base font-semibold text-cyber-text">
            Elite Cybersecurity Training
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-extrabold text-4xl sm:text-5xl lg:text-7xl xl:text-8xl text-cyber-text max-w-5xl leading-tight mb-5 sm:mb-6 px-1"
        >
          Master Cybersecurity.{' '}
          <span className="text-cyber-accent glow-text">Think Like a Hacker.</span>{' '}
          Defend Like a Professional.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-cyber-text font-medium max-w-2xl mb-8 sm:mb-12 text-base sm:text-lg leading-relaxed px-1"
        >
          A cybersecurity learning platform offering advanced courses, investigation tools,
          threat intelligence services, and premium memberships.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-12 sm:mb-16"
        >
          <Link to="/courses">
            <NeonButton variant="primary">
              <BookOpen className="w-4 h-4" /> Explore Courses
            </NeonButton>
          </Link>
          <Link to="/membership">
            <NeonButton variant="outline">
              <Crown className="w-4 h-4" /> Join Premium
            </NeonButton>
          </Link>
          <Link to="/tools">
            <NeonButton variant="outline">
              <Wrench className="w-4 h-4" /> Browse Security Tools
            </NeonButton>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <TerminalTyping />
        </motion.div>
      </section>

      {/* Featured Courses strip */}
      <section className="relative py-12 sm:py-16 lg:py-20 border-y border-cyber-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Featured Courses"
            subtitle="Start with fundamentals and advance to offensive security."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredCourses.map((c, i) => (
              <GlassCard key={c.title} delay={i * 0.08} hover>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-cyber-accent/80 uppercase tracking-wider">
                      {c.level}
                    </span>
                    <h3 className="font-display font-semibold text-lg text-cyber-text mt-1">
                      {c.title}
                    </h3>
                  </div>
                  <Link
                    to={c.to}
                    className="shrink-0 p-2 rounded-lg border border-cyber-accent/30 text-cyber-accent hover:bg-cyber-accent/10 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <Link to="/courses">
              <NeonButton variant="outline">View All Courses</NeonButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why NOTDEAD */}
      <section className="relative py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Why NOTDEAD"
            subtitle="Built for aspiring ethical hackers and security professionals."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: 'Hands-on Labs',
                desc: 'Real-world scenarios in isolated environments.',
              },
              {
                icon: BookOpen,
                title: 'Structured Learning',
                desc: 'From fundamentals to advanced offensive security.',
              },
              {
                icon: Zap,
                title: 'Tools & Intelligence',
                desc: 'Access premium tools and threat intelligence.',
              },
            ].map((item, i) => (
              <GlassCard key={item.title} delay={i * 0.08}>
                <item.icon className="w-10 h-10 text-cyber-accent mb-4" />
                <h3 className="font-display font-semibold text-cyber-text mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-cyber-text/70">{item.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-6 sm:p-10 lg:p-14 border-cyber-accent/20"
          >
            <h2 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-cyber-text mb-4">
              Ready to level up your security skills?
            </h2>
            <p className="text-cyber-text/70 mb-8 max-w-xl mx-auto">
              Join thousands of ethical hackers and security professionals on NOTDEAD.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/signup">
                <NeonButton variant="primary">Create Free Account</NeonButton>
              </Link>
              <Link to="/membership">
                <NeonButton variant="outline">See Membership Plans</NeonButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
