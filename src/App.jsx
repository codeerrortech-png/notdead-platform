import { useState, Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import LoadingScreen from './components/LoadingScreen'
import AdminGuard from './components/AdminGuard'

const Home = lazy(() => import('./pages/Home'))
const Courses = lazy(() => import('./pages/Courses'))
const CourseDetail = lazy(() => import('./pages/CourseDetail'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Membership = lazy(() => import('./pages/Membership'))
const MembershipCheckout = lazy(() => import('./pages/MembershipCheckout'))
const Tools = lazy(() => import('./pages/Tools'))
const Services = lazy(() => import('./pages/Services'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const Resources = lazy(() => import('./pages/Resources'))
const ResourceDetail = lazy(() => import('./pages/ResourceDetail'))
const Community = lazy(() => import('./pages/Community'))
const Testimonials = lazy(() => import('./pages/Testimonials'))
const About = lazy(() => import('./pages/About'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'))
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'))

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-cyber-accent border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  if (loading) return <LoadingScreen onComplete={() => setLoading(false)} />

  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetail />} />
          <Route path="membership" element={<Membership />} />
          <Route path="membership/checkout/:planId" element={<MembershipCheckout />} />
          <Route path="tools" element={<Tools />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="resources" element={<Resources />} />
          <Route path="resources/:slug" element={<ResourceDetail />} />
          <Route path="community" element={<Community />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="about" element={<About />} />
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
    </Suspense>
  )
}
