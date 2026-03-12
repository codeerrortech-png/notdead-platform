import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import CyberGrid from './CyberGrid'
import FloatingParticles from './FloatingParticles'

export default function Layout() {
  return (
    <div className="min-h-screen bg-cyber-bg relative">
      <CyberGrid />
      <FloatingParticles />
      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
