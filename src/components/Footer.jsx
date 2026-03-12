import { Link } from 'react-router-dom'
import { Shield, Github, Instagram } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative z-10 bg-cyber-secondary/80 border-t border-cyber-accent/10 mt-20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          <div className="flex items-center gap-2 font-display font-bold text-xl text-cyber-accent tracking-wider">
            <Shield className="w-6 h-6 text-cyber-accent" />
            NOTDEAD
          </div>
          <div>
            <h4 className="font-display font-semibold text-cyber-accent mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-cyber-text/80">
              <li><Link to="/" className="hover:text-cyber-accent transition-colors">About</Link></li>
              <li><Link to="/courses" className="hover:text-cyber-accent transition-colors">Courses</Link></li>
              <li><Link to="/tools" className="hover:text-cyber-accent transition-colors">Tools</Link></li>
              <li><a href="#" className="hover:text-cyber-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-cyber-accent transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-cyber-accent transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-cyber-accent mb-4 text-sm uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-sm text-cyber-text/80 mb-4">
              Get security updates and tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 min-w-0 px-3 py-2.5 rounded-lg bg-cyber-bg border border-cyber-accent/30 text-cyber-text placeholder-cyber-text/50 focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent/30 transition-all text-sm"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2.5 rounded-lg bg-cyber-accent text-cyber-bg font-semibold text-sm hover:shadow-neon transition-shadow"
              >
                Join
              </motion.button>
            </form>
          </div>
          <div>
            <h4 className="font-display font-semibold text-cyber-accent mb-4 text-sm uppercase tracking-wider">
              Follow
            </h4>
            <div className="flex gap-4">
              <motion.a
                href="https://github.com/codeerrortech-png"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Github"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="text-cyber-text/80 hover:text-cyber-accent transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/zero______trace?igsh=MWEyY2pjYzhhOW52aA=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="text-cyber-text/80 hover:text-cyber-accent transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/_code._.error?igsh=MjlkOGllemF3ZWdo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="text-cyber-text/80 hover:text-cyber-accent transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-cyber-accent/10 text-center text-sm text-cyber-text/50">
          © {new Date().getFullYear()} NOTDEAD. Cybersecurity Training Platform.
        </div>
      </div>
    </footer>
  )
}
