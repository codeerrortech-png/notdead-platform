export const plans = [
  {
    id: 'starter',
    name: 'Starter Plan',
    monthly: 2,
    yearly: 16,
    originalMonthly: 18,
    originalYearly: 158,
    features: ['Basic courses', 'Limited labs', 'Community access'],
    highlight: false,
  },
  {
    id: 'pro',
    name: 'Pro Hacker Plan',
    monthly: 5,
    yearly: 40,
    originalMonthly: 48,
    originalYearly: 398,
    features: [
      'All courses',
      'Advanced hacking labs',
      'Premium tool downloads',
      'Private community',
    ],
    highlight: true,
  },
  {
    id: 'elite',
    name: 'Elite Security Plan',
    monthly: 10,
    yearly: 80,
    originalMonthly: 98,
    originalYearly: 798,
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
