import { Link } from 'react-router-dom'
import type { Player, Position, Team } from '../types'
import { teamStyle } from '../lib/theme'

export function PosTag({ position }: { position: Position }) {
  return <span className={`pos ${position}`}>{position}</span>
}

export function Badge({ team, large }: { team: Team; large?: boolean }) {
  return (
    <span className={`badge${large ? ' lg' : ''}`} style={teamStyle(team)} aria-hidden="true">
      {team.shortName}
    </span>
  )
}

export function TeamCard({ team }: { team: Team }) {
  return (
    <Link to={`/team/${team.id}`} className="card team-card" style={teamStyle(team)}>
      <Badge team={team} />
      <h3>{team.name}</h3>
      <div className="muted">{team.coach.name}</div>
      <div style={{ marginTop: 6 }}>
        <span className="pill">{team.formation}</span>
      </div>
    </Link>
  )
}

export function StatBar({ label, value, max, display }: { label: string; value: number; max: number; display?: string }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className="stat-bar">
      <div className="top">
        <span>{label}</span>
        <b>{display ?? value}</b>
      </div>
      <div className="track" role="presentation">
        <div className="fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export function PlayerLink({ player }: { player: Player }) {
  return <Link to={`/player/${player.id}`}>{player.name}</Link>
}
