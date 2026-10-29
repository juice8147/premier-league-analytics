import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getAllPlayers, getPlayer, getTeam } from '../data'
import { avgForm, per90, playerPercentiles, savePct } from '../lib/stats'
import { chartColor } from '../lib/theme'
import { PlayerRadar } from '../components/charts'
import type { Player } from '../types'

const COLORS = ['#e4572e', '#2e86e4']

function rowsFor(p: Player): [string, number][] {
  const s = p.stats
  if (p.position === 'GK') {
    return [['Saves', s.saves], ['Clean sheets', s.cleanSheets], ['Save %', +savePct(s).toFixed(0)], ['Conceded / 90', +per90(s.goalsConceded, s.minutes).toFixed(2)], ['Avg form', +avgForm(p).toFixed(1)]]
  }
  return [
    ['Goals', s.goals], ['Assists', s.assists], ['xG', s.xG], ['xA', s.xA],
    ['Shots / 90', +per90(s.shots, s.minutes).toFixed(2)], ['Key passes / 90', +per90(s.keyPasses, s.minutes).toFixed(2)],
    ['Tackles / 90', +per90(s.tackles, s.minutes).toFixed(2)], ['Pass %', s.passAccuracy], ['Avg form', +avgForm(p).toFixed(1)],
  ]
}

export default function ComparePage() {
  const [params, setParams] = useSearchParams()
  const all = getAllPlayers()
  const sorted = useMemo(() => [...all].sort((a, b) => a.name.localeCompare(b.name)), [all])
  const a = getPlayer(params.get('a') ?? '')
  const b = getPlayer(params.get('b') ?? '')

  const set = (key: 'a' | 'b', id: string) => {
    const next = new URLSearchParams(params)
    if (id) next.set(key, id)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const picker = (key: 'a' | 'b', value?: Player) => (
    <select value={value?.id ?? ''} onChange={(e) => set(key, e.target.value)} aria-label={`Player ${key.toUpperCase()}`}>
      <option value="">Select player…</option>
      {sorted
        .filter((p) => !(key === 'b' && a && p.position !== a.position) && !(key === 'a' && b && p.position !== b.position))
        .map((p) => <option key={p.id} value={p.id}>{p.name} ({getTeam(p.teamId)?.shortName})</option>)}
    </select>
  )

  const ready = a && b && a.id !== b.id && a.position === b.position
  const ra = a ? rowsFor(a) : []
  const rb = b ? rowsFor(b) : []

  return (
    <>
      <h1>Compare players</h1>
      <p className="muted">Compare two players in the same position (goalkeepers with goalkeepers, and so on).</p>
      <div className="controls">{picker('a', a)} <span className="muted">vs</span> {picker('b', b)}</div>

      {ready && (
        <div className="grid two">
          <div className="card">
            <h2>Percentile radar</h2>
            <PlayerRadar
              series={[
                { name: a.name, color: COLORS[0], rows: playerPercentiles(a, all) },
                { name: b.name, color: COLORS[1], rows: playerPercentiles(b, all) },
              ]}
            />
          </div>
          <div className="card table-wrap">
            <h2>Season stats</h2>
            <table>
              <thead>
                <tr><th>Stat</th><th className="num" style={{ color: chartColor(getTeam(a.teamId)!) }}>{a.name}</th><th className="num">{b.name}</th></tr>
              </thead>
              <tbody>
                {ra.map(([label, va], i) => {
                  const vb = rb[i][1]
                  const lowerBetter = label.startsWith('Conceded')
                  const aWins = lowerBetter ? va < vb : va > vb
                  const bWins = lowerBetter ? vb < va : vb > va
                  return (
                    <tr key={label}>
                      <td>{label}</td>
                      <td className="num" style={aWins ? { fontWeight: 700 } : undefined}>{va}</td>
                      <td className="num" style={bWins ? { fontWeight: 700 } : undefined}>{vb}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {!ready && <p className="muted">Choose two different players to see the comparison.</p>}
    </>
  )
}
