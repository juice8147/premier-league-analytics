import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getAllPlayers, getTeam, getTeams } from '../data'
import RosterTable from '../components/RosterTable'
import { MIN_MINUTES, playersToCsv } from '../lib/stats'
import type { Player } from '../types'

const positions = ['ALL', 'GK', 'DEF', 'MID', 'FWD'] as const
type PositionFilter = (typeof positions)[number]

function exportCsv(players: Player[]) {
  const csv = playersToCsv(players, (p) => getTeam(p.teamId)?.name ?? '')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = 'players.csv'
  a.click()
  URL.revokeObjectURL(url)
}

export default function LeadersPage() {
  const [params, setParams] = useSearchParams()
  const all = getAllPlayers()

  const query = params.get('q') ?? ''
  const teamId = params.get('club') ?? ''
  const rawPos = params.get('pos') ?? 'ALL'
  const position: PositionFilter = (positions as readonly string[]).includes(rawPos) ? (rawPos as PositionFilter) : 'ALL'
  const regularsOnly = params.get('min') === '1'

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const players = useMemo(() => {
    const q = query.trim().toLowerCase()
    return all.filter(
      (p) =>
        (!teamId || p.teamId === teamId) &&
        (!q || p.name.toLowerCase().includes(q)) &&
        (position === 'ALL' || p.position === position) &&
        (!regularsOnly || p.stats.minutes >= MIN_MINUTES),
    )
  }, [all, teamId, query, position, regularsOnly])

  return (
    <>
      <h1 className="page-title">Players</h1>
      <div className="controls">
        <label className="field">
          <span>Search</span>
          <input type="search" placeholder="Player name" value={query} onChange={(e) => update('q', e.target.value)} />
        </label>
        <label className="field">
          <span>Club</span>
          <select value={teamId} onChange={(e) => update('club', e.target.value)}>
            <option value="">All clubs</option>
            {getTeams().map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </label>
      </div>
      <div className="controls">
        {positions.map((f) => (
          <button key={f} type="button" className="btn" aria-pressed={position === f} onClick={() => update('pos', f === 'ALL' ? '' : f)}>
            {f === 'ALL' ? 'All positions' : f}
          </button>
        ))}
        <button type="button" className="btn" aria-pressed={regularsOnly} onClick={() => update('min', regularsOnly ? '' : '1')}>
          {MIN_MINUTES}+ minutes
        </button>
        <button type="button" className="btn" disabled={players.length === 0} onClick={() => exportCsv(players)}>
          Export CSV ({players.length})
        </button>
      </div>
      {players.length === 0 && <p className="empty">No players match. Clear the search or choose another club.</p>}
      <RosterTable
        players={players}
        showTeam={(p) => getTeam(p.teamId)?.shortName ?? ''}
        showPositionFilter={false}
      />
    </>
  )
}
