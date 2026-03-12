export const plans = [
  {
    id: 'starter',
    name: 'Starter Plan',
    monthly: 19,
    yearly: 159,
    features: ['Basic courses', 'Limited labs', 'Community access'],
    highlight: false,
  },
  {
    id: 'pro',
    name: 'Pro Hacker Plan',
    monthly: 49,
    yearly: 399,
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
    monthly: 99,
    yearly: 799,
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
