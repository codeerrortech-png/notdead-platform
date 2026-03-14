const REGISTERED_USERS_KEY = 'notdead_registered_users'
const ACTIVITIES_KEY = 'notdead_admin_activities'
const USER_DATA_PREFIX = 'notdead_user_data_'

export function getRegisteredUsers() {
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function registerUser({ email, name = '' }) {
  const users = getRegisteredUsers()
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) return
  users.push({ email, name, createdAt: new Date().toISOString() })
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users))
  addActivity({ type: 'signup', email, name, detail: 'New sign up' })
}

export function getActivities() {
  try {
    const raw = localStorage.getItem(ACTIVITIES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function addActivity({ type, email, name, detail, meta = {} }) {
  const activities = getActivities()
  activities.unshift({
    type,
    email,
    name: name || email,
    detail,
    meta,
    createdAt: new Date().toISOString(),
  })
  localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(activities.slice(0, 200)))
}

export function getUserData(email) {
  if (!email) return null
  try {
    const key = USER_DATA_PREFIX + email.replace(/[^a-zA-Z0-9@._-]/g, '_')
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : { email, memberships: [], courses: [], tools: [], certificates: [], downloads: [], notifications: [] }
  } catch {
    return { email, memberships: [], courses: [], tools: [], certificates: [], downloads: [], notifications: [] }
  }
}

export function setUserData(email, data) {
  if (!email) return
  const key = USER_DATA_PREFIX + email.replace(/[^a-zA-Z0-9@._-]/g, '_')
  localStorage.setItem(key, JSON.stringify({ ...getUserData(email), ...data }))
}

export function addUserMembership(email, plan) {
  const u = getUserData(email)
  if (!u.memberships) u.memberships = []
  u.memberships.push({ plan: plan.name || plan, addedAt: new Date().toISOString() })
  setUserData(email, u)
  addActivity({ type: 'membership', email, name: u.name || email, detail: `Membership: ${plan.name || plan}` })
}
