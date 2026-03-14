export const plans = [
  {
    id: 'starter',
    name: 'Starter Plan',
    monthly: 1199,
    yearly: 9999,
    originalMonthly: 2499,
    originalYearly: 19999,
    features: ['Basic courses', 'Community access'],
    highlight: false,
  },
  {
    id: 'pro',
    name: 'Pro Hacker Plan',
    monthly: 2499,
    yearly: 19999,
    originalMonthly: 4999,
    originalYearly: 19999,
    features: [
      'All courses',
      'Premium tool downloads',
      'Private community',
    ],
    highlight: true,
  },
  {
    id: 'elite',
    name: 'Elite Security Plan',
    monthly: 3999,
    yearly: 19999,
    originalMonthly: 7999,
    originalYearly: 19999,
    features: [
      'All pro features',
      'Exclusive investigation tools',
      'Live workshops',
      'Early access tools',
    ],
    highlight: false,
  },
]

export function getPlanById(id) {
  return plans.find((p) => p.id === id)
}
