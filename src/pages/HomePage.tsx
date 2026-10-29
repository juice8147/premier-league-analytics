import { Link } from 'react-router-dom'
import { getAllPlayers, getTeam, getTeams } from '../data'
import type { Player } from '../types'
import { PlayerLink, TeamCard } from '../components/small'

function Leaderboard({ title, players, pick }: { title: string; players: Player[]; pick: (p: Player) => number }) {
  const top = [...players].sort((a, b) => pick(b) - pick(a)).slice(0, 5)
  return (
    <div className="card">
      <h2>{title}</h2>
      <table>
        <tbody>
          {top.map((p, i) => (
            <tr key={p.id}>
              <td className="num muted">{i + 1}</td>
              <td><PlayerLink player={p} /></td>
              <td className="muted">{getTeam(p.teamId)?.shortName}</td>
              <td className="num"><b>{pick(p)}</b></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function HomePage() {
  const teams = getTeams()
  const players = getAllPlayers()
  return (
    <>
      <h1>Premier League Clubs</h1>
      <p className="muted">Pick a club to see its coach, formation, squad and player analytics.</p>
      <div className="grid teams">
        {teams.map((t) => <TeamCard key={t.id} team={t} />)}
      </div>

      <section className="section">
        <h2>League leaders</h2>
        <div className="grid two">
          <Leaderboard title="Top scorers" players={players} pick={(p) => p.stats.goals} />
          <Leaderboard title="Top assists" players={players} pick={(p) => p.stats.assists} />
          <Leaderboard
            title="Clean sheets (GK)"
            players={players.filter((p) => p.position === 'GK')}
            pick={(p) => p.stats.cleanSheets}
          />
        </div>
        <p><Link to="/players" className="muted">Browse all players →</Link></p>
      </section>
    </>
  )
}
