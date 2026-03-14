import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Sparkles, LogIn } from 'lucide-react'
import ChaosButton from '../components/ChaosButton'
import SectionTitle from '../components/SectionTitle'
import GlassCard from '../components/GlassCard'
import BounceHeading from '../components/BounceHeading'
import PageEntrance from '../components/PageEntrance'
import useBounceCards from '../hooks/useBounceCards'
import { plans } from '../utils/membershipPlansData'
import { formatPrice } from '../utils/currency'
import { isUserLoggedIn } from '../utils/auth'

export default function Membership() {
  const [yearly, setYearly] = useState(false)
  const navigate = useNavigate()
  const loggedIn = isUserLoggedIn()
  const plansGridRef = useRef(null)
  useBounceCards(plansGridRef)

  return (
    <PageEntrance className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <SectionTitle
        highlightBox
        title="Membership Plans"
        subtitle="Unlock labs, tools, and community. Choose monthly or yearly billing."
        titleClassName="text-black"
        subtitleClassName="text-black"
        scrollTrigger
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-center gap-4 mb-14"
      >
        <span className={`text-sm font-mono ${!yearly ? 'text-cyber-accent' : 'text-slate-400'}`}>
          Monthly
        </span>
        <button
          type="button"
          onClick={() => setYearly((y) => !y)}
          className="relative w-16 h-8 rounded-full bg-cyber-secondary border border-cyber-accent/30 focus:outline-none focus:ring-2 focus:ring-cyber-accent/50"
        >
          <motion.span
            layout
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="absolute top-1 w-6 h-6 rounded-full bg-cyber-accent shadow-neon"
            style={{ left: yearly ? '36px' : '4px' }}
          />
        </button>
        <span className={`text-sm font-mono ${yearly ? 'text-cyber-accent' : 'text-slate-400'}`}>
          Yearly
        </span>
        {yearly && (
          <span className="text-xs font-mono px-2 py-1 rounded bg-cyber-accent/20 text-cyber-accent border border-cyber-accent/30">
            Save 20%
          </span>
        )}
      </motion.div>
      <div ref={plansGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {plans.map((p) => (
          <GlassCard
            key={p.id}
            bounceScroll
            className={`flex flex-col h-full ${p.highlight ? 'border-cyber-accent/40 shadow-glow relative' : ''}`}
            hover
          >
            {p.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full bg-cyber-accent/20 border border-cyber-accent/40 text-cyber-accent text-xs font-mono">
                <Sparkles className="w-3 h-3" /> Popular
              </div>
            )}
            <div className="flex-1 flex flex-col">
              <BounceHeading
                as="h3"
                variant="physics"
                scrollTrigger
                className="font-display font-semibold text-xl text-white mb-2"
              >
                {p.name}
              </BounceHeading>
              <div className="mb-6">
                <span className="inline-block px-2 py-0.5 rounded bg-cyber-accent/20 text-cyber-accent text-xs font-bold mb-1">
                  90% OFF
                </span>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-lg text-slate-400 line-through">
                    {formatPrice(yearly ? p.originalYearly : p.originalMonthly)}
                  </span>
                  <span className="text-3xl font-bold text-cyber-accent">
                    {formatPrice(yearly ? p.yearly : p.monthly)}
                  </span>
                  <span className="text-slate-400 text-sm">
                    /{yearly ? 'year' : 'month'}
                  </span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-slate-200">
                    <Check className="w-4 h-4 text-cyber-accent shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            {loggedIn ? (
              <ChaosButton
                variant="card"
                as={Link}
                to={`/membership/checkout/${p.id}${yearly ? '?yearly=true' : ''}`}
                className="block w-full text-center mt-auto shrink-0"
              >
                Get Started
              </ChaosButton>
            ) : (
              <ChaosButton
                variant="card"
                as={Link}
                to="/login"
                state={{ from: `/membership/checkout/${p.id}${yearly ? '?yearly=true' : ''}` }}
                className="block w-full text-center mt-auto shrink-0"
              >
                <LogIn className="w-4 h-4" /> Login to Get Started
              </ChaosButton>
            )}
          </GlassCard>
        ))}
      </div>
    </PageEntrance>
  )
}
