import { DollarSign, TrendingUp, UserMinus, Users, Clock } from 'lucide-react'
import KpiCard from './ui/KpiCard'
import RevenueChart from './ui/RevenueChart'
import ChurnChart from './ui/ChurnChart'
import { getChartData, getKpiSummary, formatCurrency, formatPct } from './data/salesKpiData'

export default function SalesKpiDashboard() {
  const summary = getKpiSummary()
  const { revenueChart, churnChart } = getChartData()

  const growthTone = summary.mrrGrowthPct >= 0 ? 'positive' : 'negative'
  const iconClass = 'w-4 h-4 text-muted-foreground'

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-2xl font-bold">Sales KPI dashboard</h1>
            <p className="text-sm text-muted-foreground">Reporting period: {summary.currentMonthLabel}</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            Last refreshed: {summary.lastRefreshed}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            label="Current MRR"
            value={formatCurrency(summary.currentMrr)}
            icon={<DollarSign className={iconClass} />}
          />
          <KpiCard
            label="MoM MRR growth"
            value={formatPct(summary.mrrGrowthPct, { signed: true })}
            delta="vs. previous month"
            deltaTone={growthTone}
            icon={<TrendingUp className={iconClass} />}
          />
          <KpiCard
            label="Gross churn"
            value={formatPct(summary.currentGrossChurnPct)}
            icon={<UserMinus className={iconClass} />}
          />
          <KpiCard
            label="Net churn"
            value={formatPct(summary.currentNetChurnPct)}
            icon={<Users className={iconClass} />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RevenueChart data={revenueChart} />
          <ChurnChart data={churnChart} />
        </div>
      </div>
    </div>
  )
}
