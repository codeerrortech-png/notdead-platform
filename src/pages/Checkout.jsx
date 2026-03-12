import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, CreditCard, Lock, ArrowLeft } from 'lucide-react'
import { getCourseById } from '../utils/coursesData'
import { formatPrice } from '../utils/currency'
import NeonButton from '../components/NeonButton'
import CyberGrid from '../components/CyberGrid'

export default function Checkout() {
  const { id } = useParams()
  const navigate = useNavigate()
  const course = getCourseById(id)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handlePayment = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setDone(true)
      setTimeout(() => navigate('/dashboard'), 2000)
    }, 1500)
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-cyber-text/80">Course not found.</p>
        <Link to="/courses" className="text-cyber-accent ml-2">Back to Courses</Link>
      </div>
    )
  }

  if (done) {
    return (
      <div className="min-h-screen bg-cyber-bg relative flex flex-col items-center justify-center px-4">
        <CyberGrid />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-cyber-accent/20 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-cyber-accent" />
          </div>
          <h1 className="font-display font-bold text-2xl text-cyber-accent mb-2">Payment Successful</h1>
          <p className="text-cyber-text/80 mb-4">You are enrolled in {course.title}. Redirecting to dashboard...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen min-h-[100dvh] bg-cyber-bg relative flex flex-col items-center justify-center px-4 py-12">
      <CyberGrid />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <Link
          to={`/courses/${course.id}`}
          className="inline-flex items-center gap-2 text-sm text-cyber-accent/80 hover:text-cyber-accent mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to course
        </Link>
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-cyber-accent/20 shadow-glow">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-5 h-5 text-cyber-accent" />
            <span className="font-display font-semibold text-cyber-accent">Secure Payment</span>
          </div>
          <div className="mb-6 p-4 rounded-xl bg-cyber-secondary/50 border border-cyber-accent/10">
            <p className="text-cyber-text/60 text-sm">Course</p>
            <p className="font-display font-semibold text-cyber-text">{course.title}</p>
            <div className="mt-2">
              {course.originalPrice != null && (
                <span className="text-sm text-cyber-text/50 line-through mr-2">{formatPrice(course.originalPrice)}</span>
              )}
              <span className="inline-block px-2 py-0.5 rounded bg-cyber-accent/20 text-cyber-accent text-xs font-bold mb-1">90% OFF</span>
              <p className="text-2xl font-bold text-cyber-accent">{formatPrice(course.price)}</p>
            </div>
          </div>
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block text-sm text-cyber-text/80 mb-2">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 rounded-lg bg-cyber-secondary border border-cyber-accent/30 text-cyber-text placeholder-cyber-text/40 focus:outline-none focus:border-cyber-accent text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-cyber-text/80 mb-2">Card number</label>
              <input
                type="text"
                placeholder="4242 4242 4242 4242"
                maxLength={19}
                className="w-full px-4 py-3 rounded-lg bg-cyber-secondary border border-cyber-accent/30 text-cyber-text placeholder-cyber-text/40 focus:outline-none focus:border-cyber-accent text-sm font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-cyber-text/80 mb-2">Expiry</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 rounded-lg bg-cyber-secondary border border-cyber-accent/30 text-cyber-text placeholder-cyber-text/40 focus:outline-none focus:border-cyber-accent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-cyber-text/80 mb-2">CVC</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-4 py-3 rounded-lg bg-cyber-secondary border border-cyber-accent/30 text-cyber-text placeholder-cyber-text/40 focus:outline-none focus:border-cyber-accent text-sm"
                />
              </div>
            </div>
            <NeonButton
              type="submit"
              variant="primary"
              className="w-full gap-2 mt-6"
              disabled={loading}
            >
              <CreditCard className="w-4 h-4" />
              {loading ? 'Processing...' : `Pay ${formatPrice(course.price)}`}
            </NeonButton>
          </form>
          <p className="text-center text-xs text-cyber-text/50 mt-6">
            Demo only. No real payment is processed.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
