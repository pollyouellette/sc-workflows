import type { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../lib/shadcn/card'
import { cn } from '../../lib/shadcn/utils'

interface KpiCardProps {
  label: string
  value: string
  delta?: string
  deltaTone?: 'positive' | 'negative' | 'neutral'
  icon?: ReactNode
}

export default function KpiCard({ label, value, delta, deltaTone = 'neutral', icon }: KpiCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {delta ? (
          <p
            className={cn(
              'text-xs mt-1',
              deltaTone === 'positive' && 'text-success',
              deltaTone === 'negative' && 'text-destructive',
              deltaTone === 'neutral' && 'text-muted-foreground'
            )}
          >
            {delta}
          </p>
        ) : null}
      </CardContent>
    </Card>
  )
}
