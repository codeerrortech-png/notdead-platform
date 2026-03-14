import { useRef } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Users, Trophy, FlaskConical, Medal, ChevronRight } from 'lucide-react'
import ChaosButton from '../components/ChaosButton'
import SectionTitle from '../components/SectionTitle'
import GlassCard from '../components/GlassCard'
import BounceHeading from '../components/BounceHeading'
import PageEntrance from '../components/PageEntrance'
import useBounceCards from '../hooks/useBounceCards'

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
  const communityRef = useRef(null)
  useBounceCards(communityRef)

  return (
    <PageEntrance className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <SectionTitle
        title="Community"
        subtitle="Forums, groups, challenges, and CTF labs. Compete and collaborate."
        highlightBox
        scrollTrigger
      />
      <div ref={communityRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {communityFeatures.map((item) => (
            <GlassCard key={item.label} bounceScroll hover className="community-box-glow">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-amber-500/15 shadow-[0_0_15px_rgba(245,158,11,0.28)]">
                  <item.icon className="w-8 h-8 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                </div>
                <BounceHeading
                  as="span"
                  variant="physics"
                  scrollTrigger
                  className="font-display font-medium text-slate-200"
                >
                  {item.label}
                </BounceHeading>
                <ChevronRight className="w-5 h-5 text-amber-400 ml-auto" />
              </div>
            </GlassCard>
          ))}
        </div>
        <GlassCard bounceScroll hover={false} className="community-leaderboard-glow">
          <div className="flex items-center gap-2 mb-6">
            <Medal className="w-6 h-6 text-amber-400" />
            <BounceHeading
              as="h3"
              variant="physics"
              scrollTrigger
              className="font-display font-semibold text-xl text-amber-400"
            >
              Leaderboard
            </BounceHeading>
          </div>
          <ul className="space-y-0">
            {leaderboard.map((e) => (
              <motion.li
                key={e.rank}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + e.rank * 0.05 }}
                className="flex items-center gap-4 py-3 px-3 rounded-lg border-b border-amber-500/20 last:border-0 hover:bg-amber-500/10 transition-colors"
              >
                <span
                  className={`font-mono w-8 text-sm font-bold ${
                    e.rank <= 3 ? 'text-amber-400' : 'text-slate-300'
                  }`}
                >
                  #{e.rank}
                </span>
                <span className="flex-1 text-slate-200 font-medium">{e.name}</span>
                <span className="text-amber-400/90 font-mono text-sm">{e.points.toLocaleString()}</span>
              </motion.li>
            ))}
          </ul>
          <ChaosButton variant="card" className="w-full mt-6">
            Join Community
          </ChaosButton>
        </GlassCard>
      </div>
    </PageEntrance>
  )
}
