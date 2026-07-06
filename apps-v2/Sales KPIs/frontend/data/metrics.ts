import revenue from './revenue.json'
import churn from './churn.json'

// Revenue and churn metrics. Sample data refreshes daily; the most recent
// month is treated as the current reporting period.

export type RevenuePoint = {
  month: string
  mrr: number
  new_mrr: number
  expansion_mrr: number
  contraction_mrr: number
  churned_mrr: number
}

export type ChurnPoint = {
  month: string
  gross_churn_pct: number
  net_churn_pct: number
  customers_lost: number
  customers_total: number
}

export const revenueData: RevenuePoint[] = revenue
export const churnData: ChurnPoint[] = churn

function lastOf<T>(arr: T[]): T {
  const item = arr[arr.length - 1]
  if (!item) throw new Error('No data available')
  return item
}

export function getKpis() {
  const current = lastOf(revenueData)
  const prev = revenueData[revenueData.length - 2]
  const currentChurn = lastOf(churnData)

  const momGrowthPct = prev ? ((current.mrr - prev.mrr) / prev.mrr) * 100 : 0

  return {
    latestMonth: current.month,
    currentMrr: current.mrr,
    momGrowthPct,
    grossChurnPct: currentChurn.gross_churn_pct,
    netChurnPct: currentChurn.net_churn_pct,
  }
}

// Merge revenue + churn by month for chart consumption.
export function getMonthlySeries() {
  return revenueData.map((r) => {
    const c = churnData.find((x) => x.month === r.month)
    return {
      month: r.month,
      mrr: r.mrr,
      gross_churn_pct: c?.gross_churn_pct ?? 0,
      net_churn_pct: c?.net_churn_pct ?? 0,
    }
  })
}
