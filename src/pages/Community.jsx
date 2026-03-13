import { motion } from 'framer-motion'
import { MessageCircle, Users, Trophy, FlaskConical, Medal, ChevronRight } from 'lucide-react'
import ChaosButton from '../components/ChaosButton'
import SectionTitle from '../components/SectionTitle'
import GlassCard from '../components/GlassCard'

const leaderboard = [
  { rank: 1, name: '0xShadow', points: 12450 },
  { rank: 2, name: 'NetRunner', points: 11820 },
  { rank: 3, name: 'Cipher_Queen', points: 10900 },
  { rank: 4, name: 'Root_Access', points: 9870 },
  { rank: 5, name: 'ByteHunter', points: 9120 },
]

const communityFeatures = [
  { icon: MessageCircle, label: 'Discussion Forums' },
  { icon: Users, label: 'Private Groups' },
  { icon: Trophy, label: 'Security Challenges' },
  { icon: FlaskConical, label: 'CTF Practice Labs' },
]

export default function Community() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <SectionTitle
        title="Community"
        subtitle="Forums, groups, challenges, and CTF labs. Compete and collaborate."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {communityFeatures.map((item, i) => (
            <GlassCard key={item.label} delay={i * 0.06} hover>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-cyber-accent/10">
                  <item.icon className="w-8 h-8 text-cyber-accent" />
                </div>
                <span className="font-display font-medium text-cyber-text">
                  {item.label}
                </span>
                <ChevronRight className="w-5 h-5 text-cyber-accent/60 ml-auto" />
              </div>
            </GlassCard>
          ))}
        </div>
        <GlassCard delay={0.2} hover={false}>
          <div className="flex items-center gap-2 mb-6">
            <Medal className="w-6 h-6 text-cyber-accent" />
            <h3 className="font-display font-semibold text-xl text-cyber-accent">
              Leaderboard
            </h3>
          </div>
          <ul className="space-y-0">
            {leaderboard.map((e) => (
              <motion.li
                key={e.rank}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + e.rank * 0.05 }}
                className="flex items-center gap-4 py-3 px-3 rounded-lg border-b border-cyber-accent/10 last:border-0 hover:bg-cyber-accent/5 transition-colors"
              >
                <span
                  className={`font-mono w-8 text-sm font-bold ${
                    e.rank <= 3 ? 'text-cyber-accent' : 'text-cyber-text/70'
                  }`}
                >
                  #{e.rank}
                </span>
                <span className="flex-1 text-cyber-text font-medium">{e.name}</span>
                <span className="text-cyber-accent/90 font-mono text-sm">{e.points.toLocaleString()}</span>
              </motion.li>
            ))}
          </ul>
          <ChaosButton className="w-full mt-6">
            Join Community
          </ChaosButton>
        </GlassCard>
      </div>
    </div>
  )
}
