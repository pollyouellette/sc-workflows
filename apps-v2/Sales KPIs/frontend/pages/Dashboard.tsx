import { TrendingUp, TrendingDown, DollarSign, Percent, Users, RefreshCw } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../lib/shadcn/card'
import { getKpis, getMonthlySeries } from '../data/metrics'

function formatMonth(month: string): string {
  const [y, m] = month.split('-')
  const date = new Date(Number(y), Number(m) - 1, 1)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

type KpiCardProps = {
  title: string
  value: string
  icon: React.ReactNode
  trend?: { positive: boolean; label: string }
}

function KpiCard({ title, value, icon, trend }: KpiCardProps) {
  return (
    <Card className="shadow-retool-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <span className="text-muted-foreground">{icon}</span>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div
            className={`mt-1 flex items-center gap-1 text-xs ${
              trend.positive ? 'text-success' : 'text-destructive'
            }`}
          >
            {trend.positive ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            {trend.label}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function Dashboard() {
  const kpis = getKpis()
  const series = getMonthlySeries().map((d) => ({ ...d, label: formatMonth(d.month) }))

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sales KPI Dashboard</h1>
          <p className="text-sm text-muted-foreground">Revenue and churn metrics</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <RefreshCw className="h-3.5 w-3.5" />
          Last refreshed: {formatMonth(kpis.latestMonth)}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Current MRR"
          value={formatCurrency(kpis.currentMrr)}
          icon={<DollarSign className="h-4 w-4" />}
        />
        <KpiCard
          title="MoM MRR Growth"
          value={`${kpis.momGrowthPct >= 0 ? '+' : ''}${kpis.momGrowthPct.toFixed(1)}%`}
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{
            positive: kpis.momGrowthPct >= 0,
            label: 'vs. previous month',
          }}
        />
        <KpiCard
          title="Gross Churn"
          value={`${kpis.grossChurnPct.toFixed(1)}%`}
          icon={<Percent className="h-4 w-4" />}
        />
        <KpiCard
          title="Net Churn"
          value={`${kpis.netChurnPct.toFixed(1)}%`}
          icon={<Users className="h-4 w-4" />}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-retool-sm">
          <CardHeader>
            <CardTitle className="text-base">MRR Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={series} margin={{ left: 10, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                  tickFormatter={(v: number) => `$${Math.round(v / 1000)}k`}
                />
                <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                <Line
                  type="monotone"
                  dataKey="mrr"
                  name="MRR"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-retool-sm">
          <CardHeader>
            <CardTitle className="text-base">Gross vs. Net Churn</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={series} margin={{ left: 10, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                  tickFormatter={(v: number) => `${v}%`}
                />
                <Tooltip formatter={(v) => `${Number(v)}%`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="gross_churn_pct"
                  name="Gross Churn"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="net_churn_pct"
                  name="Net Churn"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
