import { Link } from 'react-router-dom'
import { getAllPlayers, getTeam, getTeams } from '../data'
import type { Player } from '../types'
import { PlayerLink, TeamCard } from '../components/small'

function Leaderboard({ title, players, pick }: { title: string; players: Player[]; pick: (p: Player) => number }) {
  const top = [...players].sort((a, b) => pick(b) - pick(a)).slice(0, 5)
  return (
    <section className="panel">
      <h2>{title}</h2>
      <table className="leaders">
        <tbody>
          {top.map((p) => (
            <tr key={p.id}>
              <td className="big num">{pick(p)}</td>
              <td><PlayerLink player={p} /><small>{getTeam(p.teamId)?.name}</small></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default function HomePage() {
  const teams = getTeams()
  const players = getAllPlayers()
  return (
    <>
      <h1 className="page-title">Clubs</h1>
      <p className="lede">Open a club for its coach, formation and squad. Open a player for percentiles against others in the same position.</p>
      <div className="clubs">
        {teams.map((t) => <TeamCard key={t.id} team={t} />)}
      </div>

      <h2 className="section-title">League leaders</h2>
      <div className="split three">
        <Leaderboard title="Goals" players={players} pick={(p) => p.stats.goals} />
        <Leaderboard title="Assists" players={players} pick={(p) => p.stats.assists} />
        <Leaderboard title="Clean sheets" players={players.filter((p) => p.position === 'GK')} pick={(p) => p.stats.cleanSheets} />
      </div>
      <p><Link to="/players" className="textlink">Browse all players</Link></p>
    </>
  )
}
