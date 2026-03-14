import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, Target, Zap, Users, BookOpen, Lock } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import GlassCard from '../components/GlassCard'
import ChaosButton from '../components/ChaosButton'
import PageEntrance from '../components/PageEntrance'

const values = [
  {
    icon: Shield,
    title: 'Security First',
    desc: 'We build everything with defense in mind. Every course and tool is designed to make you think like an attacker so you can defend like a pro.',
  },
  {
    icon: Target,
    title: 'Hands-On Learning',
    desc: 'Real labs, real tools, real scenarios. No fluff—only practical skills you can use in the field from day one.',
  },
  {
    icon: Zap,
    title: 'Stay Current',
    desc: 'Threats evolve daily. We keep our content and platforms updated so you’re always learning the latest techniques and defenses.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    desc: 'Learn alongside peers, share findings, and grow with a community of security researchers and practitioners.',
  },
]

export default function About() {
  return (
    <PageEntrance className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <SectionTitle
        highlightBox
        title="About Us"
        subtitle="NOTDEAD is a cybersecurity training platform built for aspiring ethical hackers, penetration testers, and security professionals."
        titleClassName="text-black"
        scrollTrigger
        subtitleClassName="text-black"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-12 sm:mb-16"
      >
        <GlassCard delay={0} hover={false} className="p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-cyber-accent/10 shrink-0">
              <Lock className="w-8 h-8 text-cyber-accent" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-white mb-2">Our Mission</h3>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                We exist to close the gap between theoretical security knowledge and real-world skills.
                Through structured courses, hands-on labs, investigation tools, and a supportive community,
                we help you master offensive security and defend systems with confidence.
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="font-display font-bold text-xl sm:text-2xl text-white mb-6"
      >
        What We Believe
      </motion.h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
        {values.map((v, i) => (
          <GlassCard key={v.title} delay={0.15 + i * 0.06} hover>
            <div className="p-3 rounded-xl bg-cyber-accent/10 w-fit mb-4">
              <v.icon className="w-8 h-8 text-cyber-accent" />
            </div>
            <h4 className="font-display font-semibold text-white mb-2">{v.title}</h4>
            <p className="text-sm text-slate-200">{v.desc}</p>
          </GlassCard>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
      >
        <ChaosButton as={Link} to="/courses">
          <BookOpen className="w-4 h-4 inline-block mr-2 align-middle" />
          Explore Courses
        </ChaosButton>
        <ChaosButton as={Link} to="/community">
          <Users className="w-4 h-4 inline-block mr-2 align-middle" />
          Join Community
        </ChaosButton>
      </motion.div>
    </PageEntrance>
  )
}
