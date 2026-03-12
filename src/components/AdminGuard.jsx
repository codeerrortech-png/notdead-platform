import { Navigate, useLocation } from 'react-router-dom'

/**
 * Protects /admin routes. Redirects to /admin/login if not authenticated.
 * Demo: uses sessionStorage key 'admin_authenticated'. Replace with real auth later.
 */
export default function AdminGuard({ children }) {
  const location = useLocation()
  const isAuthenticated = sessionStorage.getItem('admin_authenticated') === 'true'

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return children
}
