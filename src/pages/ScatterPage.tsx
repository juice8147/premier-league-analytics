import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CartesianGrid, ReferenceLine, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts'
import { getAllPlayers, getTeam } from '../data'
import { median, metrics, MIN_MINUTES } from '../lib/stats'

const positions = ['ALL', 'GK', 'DEF', 'MID', 'FWD'] as const
const tip = { background: 'var(--panel)', border: '1px solid var(--line)', color: 'var(--ink)', borderRadius: 2 }

interface Point { id: string; name: string; club: string; x: number; y: number }

export default function ScatterPage() {
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const xMetric = metrics.find((m) => m.key === params.get('x')) ?? metrics.find((m) => m.key === 'xG90')!
  const yMetric = metrics.find((m) => m.key === params.get('y')) ?? metrics.find((m) => m.key === 'goals90')!
  const rawPos = params.get('pos') ?? 'ALL'
  const position = (positions as readonly string[]).includes(rawPos) ? rawPos : 'ALL'

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  // Per-90 rates are noisy on small minutes, so only regulars are plotted.
  const points: Point[] = useMemo(
    () =>
      getAllPlayers()
        .filter((p) => p.stats.minutes >= MIN_MINUTES && (position === 'ALL' || p.position === position))
        .map((p) => ({ id: p.id, name: p.name, club: getTeam(p.teamId)?.shortName ?? '', x: xMetric.get(p), y: yMetric.get(p) })),
    [position, xMetric, yMetric],
  )
  const mx = median(points.map((p) => p.x))
  const my = median(points.map((p) => p.y))
  const fmt = (v: number, d = 0) => v.toFixed(d)

  return (
    <>
      <h1 className="page-title">Scatter</h1>
      <p className="lede">
        Plot any two metrics for players with {MIN_MINUTES}+ minutes. Dashed lines mark the median, so the top-right
        quadrant is above average on both. Select a dot to open the player.
      </p>
      <div className="controls">
        <label className="field">
          <span>Horizontal</span>
          <select value={xMetric.key} onChange={(e) => update('x', e.target.value)}>
            {metrics.map((m) => <option key={m.key} value={m.key}>{m.label}</option>)}
          </select>
        </label>
        <label className="field">
          <span>Vertical</span>
          <select value={yMetric.key} onChange={(e) => update('y', e.target.value)}>
            {metrics.map((m) => <option key={m.key} value={m.key}>{m.label}</option>)}
          </select>
        </label>
      </div>
      <div className="controls">
        {positions.map((f) => (
          <button key={f} type="button" className="btn" aria-pressed={position === f} onClick={() => update('pos', f === 'ALL' ? '' : f)}>
            {f === 'ALL' ? 'All positions' : f}
          </button>
        ))}
      </div>
      {points.length === 0 ? (
        <p className="empty">No players match. Choose another position.</p>
      ) : (
        <section className="panel">
          <div className="chart-box" style={{ height: 460 }}>
            <ResponsiveContainer>
              <ScatterChart margin={{ top: 12, right: 16, bottom: 24, left: 0 }}>
                <CartesianGrid stroke="var(--hair)" strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name={xMetric.label} tick={{ fill: 'var(--muted)', fontSize: 12 }}
                  label={{ value: xMetric.label, position: 'insideBottom', offset: -12, fill: 'var(--muted)', fontSize: 12 }} />
                <YAxis type="number" dataKey="y" name={yMetric.label} tick={{ fill: 'var(--muted)', fontSize: 12 }}
                  label={{ value: yMetric.label, angle: -90, position: 'insideLeft', offset: 16, fill: 'var(--muted)', fontSize: 12 }} />
                <ReferenceLine x={mx} stroke="var(--muted)" strokeDasharray="4 4" />
                <ReferenceLine y={my} stroke="var(--muted)" strokeDasharray="4 4" />
                <Tooltip
                  contentStyle={tip}
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ payload }) => {
                    const p = payload?.[0]?.payload as Point | undefined
                    return p ? (
                      <div style={{ ...tip, padding: '0.5rem 0.7rem' }}>
                        <strong>{p.name}</strong> <span className="muted">{p.club}</span>
                        <div>{xMetric.label}: {fmt(p.x, xMetric.decimals)}</div>
                        <div>{yMetric.label}: {fmt(p.y, yMetric.decimals)}</div>
                      </div>
                    ) : null
                  }}
                />
                <Scatter data={points} fill="var(--flood)" fillOpacity={0.7} cursor="pointer"
                  onClick={(d) => navigate(`/player/${(d as unknown as Point).id}`)} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <p className="muted">{points.length} players. Median {xMetric.label} {fmt(mx, xMetric.decimals)}, median {yMetric.label} {fmt(my, yMetric.decimals)}.</p>
        </section>
      )}
    </>
  )
}
