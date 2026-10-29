import { useMemo, useState } from 'react'
import type { Player, Position } from '../types'
import { Avatar, PlayerLink, PosTag } from './small'
import { getTeam } from '../data'
import { avgForm, formatKeyStat, keyStats } from '../lib/stats'

interface Column {
  key: string
  label: string
  get: (p: Player) => number
  format: (p: Player) => string
}

const num = (key: string, label: string, get: (p: Player) => number, decimals = 0): Column => ({
  key, label, get, format: (p) => get(p).toFixed(decimals),
})

const commonColumns: Column[] = [
  num('age', 'Age', (p) => p.age),
  num('appearances', 'Apps', (p) => p.stats.appearances),
  num('minutes', 'Mins', (p) => p.stats.minutes),
]
const formColumn = num('form', 'Form', avgForm, 1)

/** Mixed squads get goal columns; a single position gets the stats that matter for it. */
const mixedColumns: Column[] = [
  num('goals', 'G', (p) => p.stats.goals),
  num('assists', 'A', (p) => p.stats.assists),
  num('xG', 'xG', (p) => p.stats.xG, 1),
  num('xA', 'xA', (p) => p.stats.xA, 1),
]

const columnsFor = (position: Position | undefined): Column[] =>
  position
    ? keyStats[position].map((k) => ({ key: k.key, label: k.label, get: k.get, format: (p: Player) => formatKeyStat(k, p) }))
    : mixedColumns

type SortState = { key: string; dir: 1 | -1 }

export default function RosterTable({
  players,
  showTeam,
  showPositionFilter = true,
}: {
  players: Player[]
  showTeam?: (p: Player) => string
  showPositionFilter?: boolean
}) {
  const [filter, setFilter] = useState<Position | 'ALL'>('ALL')
  const [sort, setSort] = useState<SortState>({ key: 'number', dir: 1 })

  const filtered = useMemo(() => (filter === 'ALL' ? players : players.filter((p) => p.position === filter)), [players, filter])

  // One position on screen (by filter or because the list happens to hold only one): show its key stats.
  const positions = new Set(filtered.map((p) => p.position))
  const single = positions.size === 1 ? [...positions][0] : undefined
  const columns = [...commonColumns, ...columnsFor(single), formColumn]

  const rows = useMemo(() => {
    const col = columns.find((c) => c.key === sort.key)
    return [...filtered].sort((a, b) => {
      if (sort.key === 'number') return (a.number - b.number) * sort.dir
      if (sort.key === 'name') return a.name.localeCompare(b.name) * sort.dir
      return col ? (col.get(a) - col.get(b)) * sort.dir : 0
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered, sort, single])

  const toggle = (key: string, defaultDir: 1 | -1) =>
    setSort((s) => (s.key === key ? { key, dir: (s.dir * -1) as 1 | -1 } : { key, dir: defaultDir }))

  const head = (key: string, label: string, numeric: boolean, defaultDir: 1 | -1) => (
    <th key={key} className={numeric ? 'num' : undefined} aria-sort={sort.key === key ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'}>
      <button type="button" className="sort" onClick={() => toggle(key, defaultDir)}>
        {label}
        {sort.key === key ? (sort.dir === 1 ? ' ▲' : ' ▼') : ''}
      </button>
    </th>
  )

  return (
    <>
      <div className="controls">
        {showPositionFilter &&
          (['ALL', 'GK', 'DEF', 'MID', 'FWD'] as const).map((f) => (
            <button key={f} type="button" className="btn" aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {f === 'ALL' ? 'All' : f}
            </button>
          ))}
        <span className="muted count">{rows.length} players</span>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {head('number', '#', true, 1)}
              {head('name', 'Player', false, 1)}
              <th>Pos</th>
              {showTeam && <th>Club</th>}
              {columns.map((c) => head(c.key, c.label, true, c.key === 'age' ? 1 : -1))}
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => {
              const team = getTeam(p.teamId)
              return (
                <tr key={p.id}>
                  <td className="num">{p.number}</td>
                  <td>
                    <span className="name-cell">
                      {team && <Avatar player={p} team={team} size="sm" />}
                      <PlayerLink player={p} />
                    </span>
                  </td>
                  <td><PosTag position={p.position} /> <span className="muted">{p.detailedPosition}</span></td>
                  {showTeam && <td>{showTeam(p)}</td>}
                  {columns.map((c) => <td key={c.key} className="num">{c.format(p)}</td>)}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
