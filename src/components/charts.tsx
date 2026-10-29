import {
  CartesianGrid, Legend, Line, LineChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import type { PercentileRow } from '../lib/stats'

const tip = { background: 'var(--panel)', border: '1px solid var(--line)', color: 'var(--ink)', borderRadius: 2 }

export interface RadarSeries {
  name: string
  color: string
  rows: PercentileRow[]
}

/** Percentile radar for one or more players of the same position. */
export function PlayerRadar({ series }: { series: RadarSeries[] }) {
  const data = series[0].rows.map((r, i) => {
    const row: Record<string, string | number> = { axis: r.label }
    series.forEach((s) => (row[s.name] = s.rows[i].percentile))
    return row
  })
  return (
    <div className="chart-box">
      <ResponsiveContainer>
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid stroke="var(--hair)" />
          <PolarAngleAxis dataKey="axis" tick={{ fill: 'var(--ink)', fontSize: 12 }} />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          {series.map((s) => (
            <Radar key={s.name} name={s.name} dataKey={s.name} stroke={s.color} fill={s.color} fillOpacity={0.3} />
          ))}
          <Tooltip contentStyle={tip} />
          {series.length > 1 && <Legend wrapperStyle={{ color: 'var(--ink)' }} />}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function FormChart({ form, color }: { form: number[]; color: string }) {
  const data = form.map((rating, i) => ({ match: `M${i + 1}`, rating }))
  return (
    <div className="chart-box" style={{ height: 240 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: -20 }}>
          <CartesianGrid stroke="var(--hair)" strokeDasharray="3 3" />
          <XAxis dataKey="match" tick={{ fill: 'var(--muted)', fontSize: 12 }} />
          <YAxis domain={[5, 10]} tick={{ fill: 'var(--muted)', fontSize: 12 }} />
          <Tooltip contentStyle={tip} />
          <Line type="monotone" dataKey="rating" stroke={color} strokeWidth={2.5} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
