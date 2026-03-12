import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import LoadingScreen from './components/LoadingScreen'
import AdminGuard from './components/AdminGuard'
import Home from './pages/Home'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import Checkout from './pages/Checkout'
import Membership from './pages/Membership'
import MembershipCheckout from './pages/MembershipCheckout'
import Tools from './pages/Tools'
import Services from './pages/Services'
import Resources from './pages/Resources'
import Community from './pages/Community'
import Testimonials from './pages/Testimonials'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/dashboard/Dashboard'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'

export default function App() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(t)
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:id" element={<CourseDetail />} />
        <Route path="membership" element={<Membership />} />
        <Route path="membership/checkout/:planId" element={<MembershipCheckout />} />
        <Route path="tools" element={<Tools />} />
        <Route path="services" element={<Services />} />
        <Route path="resources" element={<Resources />} />
        <Route path="community" element={<Community />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/checkout/:id" element={<Checkout />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/*"
        element={
          <AdminGuard>
            <AdminLayout />
          </AdminGuard>
        }
      />
    </Routes>
  )
}
