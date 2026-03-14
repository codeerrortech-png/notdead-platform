export function formatPrice(amountInr) {
  return `₹${Number(amountInr).toLocaleString('en-IN')}`
}

export const CURRENCY_SYMBOL = '₹'
