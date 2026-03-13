import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import CyberGrid from './CyberGrid'
import FloatingParticles from './FloatingParticles'
import TokamakBackground from './TokamakBackground'

export default function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className="min-h-screen bg-cyber-bg relative">
      {!isHome && <TokamakBackground />}
      <CyberGrid dimmed={!isHome} />
      <FloatingParticles />
      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
