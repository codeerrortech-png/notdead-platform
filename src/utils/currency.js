const USD_TO_INR = 83

export function formatPrice(amountInUsd) {
  const inr = Math.round(amountInUsd * USD_TO_INR)
  return `₹${inr.toLocaleString('en-IN')}`
}

export const CURRENCY_SYMBOL = '₹'
