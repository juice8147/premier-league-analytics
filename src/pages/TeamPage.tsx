import { Link, useParams } from 'react-router-dom'
import { getPlayers, getTeam } from '../data'
import { teamAggregate } from '../lib/stats'
import { teamStyle } from '../lib/theme'
import { Badge, PlayerLink, VenuePhoto } from '../components/small'
import PitchFormation from '../components/PitchFormation'
import RosterTable from '../components/RosterTable'

export default function TeamPage() {
  const { teamId = '' } = useParams()
  const team = getTeam(teamId)
  if (!team) return <p className="empty">Club not found. <Link to="/" className="textlink">Back to clubs</Link></p>

  const squad = getPlayers(team.id)
  const agg = teamAggregate(squad)

  return (
    <div style={teamStyle(team)}>
      <Link to="/" className="back">All clubs</Link>
      <div className="hero">
        <Badge team={team} large />
        <div>
          <h1 className="hero-name">{team.name}</h1>
          <p className="hero-sub">{team.stadium}, founded {team.founded}</p>
        </div>
      </div>
      <dl className="figures">
        <div><dd>{agg.goals}</dd><dt>Squad goals</dt></div>
        <div><dd>{agg.xG.toFixed(1)}</dd><dt>Squad xG</dt></div>
        <div><dd>{agg.avgAge.toFixed(1)}</dd><dt>Average age</dt></div>
        <div><dd>{squad.length}</dd><dt>Players</dt></div>
      </dl>

      <div className="split">
        <section className="panel">
          <h2>Head coach</h2>
          <p className="coach">{team.coach.name}</p>
          <p className="muted">{team.coach.nationality}, appointed {team.coach.appointed}</p>
          <p>{team.coach.style}</p>
          <p className="muted">Preferred formation <span className="pill">{team.formation}</span></p>
          {agg.topScorer && (
            <p>
              Top scorer: <PlayerLink player={agg.topScorer} /> ({agg.topScorer.stats.goals})<br />
              {agg.topAssister && <>Top assister: <PlayerLink player={agg.topAssister} /> ({agg.topAssister.stats.assists})</>}
            </p>
          )}
        </section>
        <section className="panel">
          <VenuePhoto team={team} />
          <h2 className="gap-top">Formation {team.formation}</h2>
          <PitchFormation team={team} squad={squad} />
        </section>
      </div>

      <h2 className="section-title">Squad</h2>
      <RosterTable players={squad} />
    </div>
  )
}
