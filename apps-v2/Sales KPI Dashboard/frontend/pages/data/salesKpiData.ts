import revenueData from '../../data/revenue.json'
import churnData from '../../data/churn.json'

export interface RevenueMonth {
  month: string
  mrr: number
  new_mrr: number
  expansion_mrr: number
  contraction_mrr: number
  churned_mrr: number
}

export interface ChurnMonth {
  month: string
  gross_churn_pct: number
  net_churn_pct: number
  customers_lost: number
  customers_total: number
}

export function getRevenueData(): RevenueMonth[] {
  return revenueData
}

export function getChurnData(): ChurnMonth[] {
  return churnData
}

function formatMonthLabel(month: string): string {
  const [year, monthNum] = month.split('-')
  if (!year || !monthNum) return month
  const date = new Date(Number(year), Number(monthNum) - 1, 1)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export interface KpiSummary {
  currentMonthLabel: string
  currentMrr: number
  mrrGrowthPct: number
  currentGrossChurnPct: number
  currentNetChurnPct: number
  lastRefreshed: string
}

export function getKpiSummary(): KpiSummary {
  const revenue = getRevenueData()
  const churn = getChurnData()

  const currentRevenue = revenue[revenue.length - 1]
  const previousRevenue = revenue.length > 1 ? revenue[revenue.length - 2] : undefined
  const currentChurn = churn[churn.length - 1]

  if (!currentRevenue || !currentChurn) {
    return {
      currentMonthLabel: '—',
      currentMrr: 0,
      mrrGrowthPct: 0,
      currentGrossChurnPct: 0,
      currentNetChurnPct: 0,
      lastRefreshed: '—',
    }
  }

  const mrrGrowthPct = previousRevenue
    ? ((currentRevenue.mrr - previousRevenue.mrr) / previousRevenue.mrr) * 100
    : 0

  return {
    currentMonthLabel: formatMonthLabel(currentRevenue.month),
    currentMrr: currentRevenue.mrr,
    mrrGrowthPct,
    currentGrossChurnPct: currentChurn.gross_churn_pct,
    currentNetChurnPct: currentChurn.net_churn_pct,
    lastRefreshed: formatMonthLabel(currentRevenue.month),
  }
}

export function getChartData() {
  const revenue = getRevenueData()
  const churn = getChurnData()

  const revenueChart = revenue.map((r) => ({
    month: formatMonthLabel(r.month),
    mrr: r.mrr,
  }))

  const churnChart = churn.map((c) => ({
    month: formatMonthLabel(c.month),
    gross: c.gross_churn_pct,
    net: c.net_churn_pct,
  }))

  return { revenueChart, churnChart }
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatPct(value: number, opts?: { signed?: boolean }): string {
  const sign = opts?.signed && value > 0 ? '+' : ''
  return `${sign}${value.toFixed(1)}%`
}
