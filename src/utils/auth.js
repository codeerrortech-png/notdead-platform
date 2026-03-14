const USER_AUTH_KEY = 'user_authenticated'
const USER_EMAIL_KEY = 'user_email'

export function isUserLoggedIn() {
  return typeof window !== 'undefined' && sessionStorage.getItem(USER_AUTH_KEY) === 'true'
}

export function getLoggedInEmail() {
  return typeof window !== 'undefined' ? sessionStorage.getItem(USER_EMAIL_KEY) || '' : ''
}

export function setUserLoggedIn(email = '') {
  sessionStorage.setItem(USER_AUTH_KEY, 'true')
  if (email) sessionStorage.setItem(USER_EMAIL_KEY, email)
}

export function logoutUser() {
  sessionStorage.removeItem(USER_AUTH_KEY)
  sessionStorage.removeItem(USER_EMAIL_KEY)
}
