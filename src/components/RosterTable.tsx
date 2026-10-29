import { useMemo, useState } from 'react'
import type { Player, PlayerStats, Position } from '../types'
import { PlayerLink, PosTag } from './small'
import { avgForm } from '../lib/stats'

type SortKey = 'number' | 'name' | 'age' | 'form' | keyof PlayerStats

const columns: { key: SortKey; label: string; numeric?: boolean }[] = [
  { key: 'appearances', label: 'Apps', numeric: true },
  { key: 'minutes', label: 'Mins', numeric: true },
  { key: 'goals', label: 'G', numeric: true },
  { key: 'assists', label: 'A', numeric: true },
  { key: 'form', label: 'Form', numeric: true },
]

function value(p: Player, key: SortKey): number | string {
  if (key === 'number') return p.number
  if (key === 'name') return p.name
  if (key === 'age') return p.age
  if (key === 'form') return avgForm(p)
  return p.stats[key]
}

export default function RosterTable({ players, showTeam }: { players: Player[]; showTeam?: (p: Player) => string }) {
  const [filter, setFilter] = useState<Position | 'ALL'>('ALL')
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: 'number', dir: 1 })

  const rows = useMemo(() => {
    const filtered = filter === 'ALL' ? players : players.filter((p) => p.position === filter)
    return [...filtered].sort((a, b) => {
      const x = value(a, sort.key)
      const y = value(b, sort.key)
      const c = typeof x === 'string' ? x.localeCompare(y as string) : (x as number) - (y as number)
      return c * sort.dir
    })
  }, [players, filter, sort])

  const toggle = (key: SortKey, defaultDir: 1 | -1) =>
    setSort((s) => (s.key === key ? { key, dir: (s.dir * -1) as 1 | -1 } : { key, dir: defaultDir }))

  const head = (key: SortKey, label: string, numeric: boolean, defaultDir: 1 | -1) => (
    <th
      className={`sortable${numeric ? ' num' : ''}`}
      onClick={() => toggle(key, defaultDir)}
      aria-sort={sort.key === key ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'}
    >
      {label}
      {sort.key === key ? (sort.dir === 1 ? ' ▲' : ' ▼') : ''}
    </th>
  )

  return (
    <>
      <div className="controls">
        {(['ALL', 'GK', 'DEF', 'MID', 'FWD'] as const).map((f) => (
          <button key={f} className={`btn${filter === f ? ' on' : ''}`} onClick={() => setFilter(f)}>
            {f === 'ALL' ? 'All' : f}
          </button>
        ))}
        <span className="muted">{rows.length} players</span>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {head('number', '#', true, 1)}
              {head('name', 'Player', false, 1)}
              <th>Pos</th>
              {showTeam && <th>Club</th>}
              {head('age', 'Age', true, 1)}
              {columns.map((c) => head(c.key, c.label, true, -1))}
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id}>
                <td className="num">{p.number}</td>
                <td><PlayerLink player={p} /></td>
                <td><PosTag position={p.position} /> <span className="muted">{p.detailedPosition}</span></td>
                {showTeam && <td>{showTeam(p)}</td>}
                <td className="num">{p.age}</td>
                <td className="num">{p.stats.appearances}</td>
                <td className="num">{p.stats.minutes}</td>
                <td className="num">{p.stats.goals}</td>
                <td className="num">{p.stats.assists}</td>
                <td className="num">{avgForm(p).toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
