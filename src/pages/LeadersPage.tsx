import { useMemo, useState } from 'react'
import { getAllPlayers, getTeam, getTeams } from '../data'
import RosterTable from '../components/RosterTable'

export default function LeadersPage() {
  const [teamId, setTeamId] = useState('')
  const [query, setQuery] = useState('')
  const all = getAllPlayers()

  const players = useMemo(() => {
    const q = query.trim().toLowerCase()
    return all.filter((p) => (!teamId || p.teamId === teamId) && (!q || p.name.toLowerCase().includes(q)))
  }, [all, teamId, query])

  return (
    <>
      <h1>All players</h1>
      <div className="controls">
        <input type="search" placeholder="Search player…" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search player" />
        <select value={teamId} onChange={(e) => setTeamId(e.target.value)} aria-label="Filter by club">
          <option value="">All clubs</option>
          {getTeams().map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>
      <div className="card">
        <RosterTable players={players} showTeam={(p) => getTeam(p.teamId)?.shortName ?? ''} />
      </div>
    </>
  )
}
