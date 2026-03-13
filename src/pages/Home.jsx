import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Crown,
  Wrench,
  ArrowRight,
  Shield,
  Zap,
  Server,
  Calendar,
  Award,
  Users,
} from 'lucide-react'
import ChaosButton from '../components/ChaosButton'
import TerminalTyping from '../components/TerminalTyping'
import SectionTitle from '../components/SectionTitle'
import GlassCard from '../components/GlassCard'
import StatCounter from '../components/StatCounter'
import HeroSecurityMonitor from '../components/HeroSecurityMonitor'
import ScrollHint from '../components/ScrollHint'

const featuredCourses = [
  { title: 'Ethical Hacking Fundamentals', level: 'Beginner', to: '/courses/1' },
  { title: 'Kali Linux Mastery', level: 'Intermediate', to: '/courses/2' },
  { title: 'Bug Bounty Hunting', level: 'Advanced', to: '/courses/6' },
]

const TITLE_WORDS = [
  { text: 'Master', highlight: false },
  { text: 'Cybersecurity.', highlight: false },
  { text: 'Think', highlight: false },
  { text: 'Like', highlight: false },
  { text: 'a', highlight: false },
  { text: 'Hacker.', highlight: true },
  { text: 'Defend', highlight: false },
  { text: 'Like', highlight: false },
  { text: 'a', highlight: false },
  { text: 'Professional.', highlight: false },
]

const HERO_STATS = [
  { icon: Server, value: 500, suffix: '+', label: 'Systems Secured' },
  { icon: Calendar, value: 10, suffix: '+', label: 'Years Experience' },
  { icon: Award, value: 25, suffix: '+', label: 'Certifications' },
  { icon: Users, value: 200, suffix: '+', label: 'Clients Protected' },
]

export default function Home() {
  return (
    <div className="text-[#e5e7eb]">
      {/* Hero */}
      <section className="relative min-h-[95vh] sm:min-h-[100vh] flex flex-col items-center justify-center px-4 sm:px-6 py-20 sm:py-28 text-center overflow-hidden">
        {/* Background effects */}
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-radial-cyber opacity-60"
          aria-hidden
        />
        <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />
        <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />
        <div className="absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyber-accent/50 to-transparent pointer-events-none hero-scan-line" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-cyber-accent/20 mb-8 sm:mb-10 animate-glow-pulse"
        >
          <Zap className="w-5 h-5 text-cyber-accent" />
          <span className="font-mono text-sm sm:text-base font-semibold text-[#e5e7eb]">
            Elite Cybersecurity Training
          </span>
        </motion.div>

        {/* Staggered title words */}
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-6xl xl:text-7xl text-[#e5e7eb] max-w-5xl leading-tight mb-5 sm:mb-6 px-1 flex flex-wrap justify-center gap-x-2 gap-y-1">
          {TITLE_WORDS.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
              className={
                word.highlight ? 'text-cyber-accent glow-text' : 'text-[#e5e7eb]'
              }
            >
              {word.text}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-[#e5e7eb]/90 font-medium max-w-2xl mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed px-1"
        >
          Penetration Testing
          <span className="text-cyber-accent mx-2">|</span>
          Vulnerability Assessment
          <span className="text-cyber-accent mx-2">|</span>
          Security Architecture
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="text-[#e5e7eb]/85 font-medium max-w-2xl mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed px-1"
        >
          A cybersecurity learning platform offering advanced courses, investigation
          tools, threat intelligence services, and premium memberships.
        </motion.p>

        {/* Stat cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mb-8 sm:mb-10"
        >
          {HERO_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + i * 0.08 }}
              className="glass-card rounded-xl p-4 sm:p-5 border border-cyber-accent/10 hover:border-cyber-accent/30 transition-all group"
            >
              <stat.icon className="w-8 h-8 sm:w-9 sm:h-9 text-cyber-accent/80 mx-auto mb-2 group-hover:text-cyber-accent transition-colors" />
              <div className="font-display font-bold text-xl sm:text-2xl text-cyber-accent mb-0.5">
                <StatCounter target={stat.value} suffix={stat.suffix} delay={1.2} />
              </div>
              <div className="text-[10px] sm:text-xs text-[#e5e7eb]/70 font-mono">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-10 sm:mb-12"
        >
          <ChaosButton as={Link} to="/courses">
            <BookOpen className="w-4 h-4 inline-block mr-2 align-middle" />
            Explore Courses
          </ChaosButton>
          <ChaosButton as={Link} to="/membership">
            <Crown className="w-4 h-4 inline-block mr-2 align-middle" />
            Join Premium
          </ChaosButton>
          <ChaosButton as={Link} to="/tools">
            <Wrench className="w-4 h-4 inline-block mr-2 align-middle" />
            Browse Security Tools
          </ChaosButton>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-5xl items-start">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex justify-center lg:justify-end"
          >
            <TerminalTyping />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="flex justify-center lg:justify-start"
          >
            <HeroSecurityMonitor />
          </motion.div>
        </div>

        <ScrollHint />
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
                    <h3 className="font-display font-semibold text-lg text-[#e5e7eb] mt-1">
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
            <ChaosButton as={Link} to="/courses">
              View All Courses
            </ChaosButton>
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
                <h3 className="font-display font-semibold text-[#e5e7eb] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#e5e7eb]/85">{item.desc}</p>
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
            <h2 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-[#e5e7eb] mb-4">
              Ready to level up your security skills?
            </h2>
            <p className="text-[#e5e7eb]/85 mb-8 max-w-xl mx-auto">
              Join thousands of ethical hackers and security professionals on NOTDEAD.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <ChaosButton as={Link} to="/signup">
                Create Free Account
              </ChaosButton>
              <ChaosButton as={Link} to="/membership">
                See Membership Plans
              </ChaosButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
