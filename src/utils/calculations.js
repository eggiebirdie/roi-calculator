export function calculateROI({ initialInvestment, monthlyRevenue, monthlyCosts, period }) {
  const monthlyNetProfit = monthlyRevenue - monthlyCosts

  const cashFlow = Array.from({ length: period }, (_, i) => ({
    month: i + 1,
    value: monthlyNetProfit * (i + 1) - initialInvestment,
  }))

  const totalNetProfit = monthlyNetProfit * period - initialInvestment
  const roi = initialInvestment > 0 ? (totalNetProfit / initialInvestment) * 100 : 0

  const paybackPeriod =
    monthlyNetProfit <= 0 ? null : Math.ceil(initialInvestment / monthlyNetProfit)

  return { cashFlow, totalNetProfit, roi, paybackPeriod }
}
