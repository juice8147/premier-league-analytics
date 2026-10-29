import { Link, useParams } from 'react-router-dom'
import { getPlayers, getTeam } from '../data'
import { teamAggregate } from '../lib/stats'
import { teamStyle } from '../lib/theme'
import { Badge, PlayerLink } from '../components/small'
import PitchFormation from '../components/PitchFormation'
import RosterTable from '../components/RosterTable'

export default function TeamPage() {
  const { teamId = '' } = useParams()
  const team = getTeam(teamId)
  if (!team) return <p>Club not found. <Link to="/">Back to clubs</Link></p>

  const squad = getPlayers(team.id)
  const agg = teamAggregate(squad)

  return (
    <div style={teamStyle(team)}>
      <Link to="/" className="breadcrumb">← All clubs</Link>
      <div className="card team-hero">
        <Badge team={team} large />
        <div>
          <h1>{team.name}</h1>
          <div className="muted">{team.stadium} · Founded {team.founded}</div>
          <div className="stat-row">
            <div><b>{agg.goals}</b><span>Squad goals</span></div>
            <div><b>{agg.xG.toFixed(1)}</b><span>Squad xG</span></div>
            <div><b>{agg.avgAge.toFixed(1)}</b><span>Avg age</span></div>
            <div><b>{squad.length}</b><span>Players</span></div>
          </div>
        </div>
      </div>

      <div className="grid two section">
        <div className="card">
          <h2>Head coach</h2>
          <h3>{team.coach.name}</h3>
          <div className="muted">{team.coach.nationality} · Appointed {team.coach.appointed}</div>
          <p>{team.coach.style}</p>
          <p className="muted">Preferred formation: <span className="pill">{team.formation}</span></p>
          {agg.topScorer && (
            <p>Top scorer: <PlayerLink player={agg.topScorer} /> ({agg.topScorer.stats.goals})<br />
              Top assister: {agg.topAssister && <><PlayerLink player={agg.topAssister} /> ({agg.topAssister.stats.assists})</>}
            </p>
          )}
        </div>
        <div className="card">
          <h2>Formation · {team.formation}</h2>
          <PitchFormation team={team} squad={squad} />
        </div>
      </div>

      <section className="section card">
        <h2>Squad</h2>
        <RosterTable players={squad} />
      </section>
    </div>
  )
}
