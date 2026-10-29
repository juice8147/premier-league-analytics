import { useId } from 'react'
import { Link } from 'react-router-dom'
import type { Player, Position, Team } from '../types'
import { teamStyle } from '../lib/theme'

export function PosTag({ position }: { position: Position }) {
  return <span className="pos">{position}</span>
}

/** Club crest image when one is set; otherwise a shield drawn in the club's colors (not the official logo). */
export function Badge({ team, large }: { team: Team; large?: boolean }) {
  const clip = useId()
  if (team.crest) {
    return <img className={large ? 'crest lg' : 'crest'} src={team.crest} alt="" loading="lazy" />
  }
  return (
    <svg className={large ? 'crest lg' : 'crest'} style={teamStyle(team)} viewBox="0 0 40 48" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={clip}><path d="M3 3h34v21c0 10-8 18-17 21C11 42 3 34 3 24z" /></clipPath>
      </defs>
      <path d="M3 3h34v21c0 10-8 18-17 21C11 42 3 34 3 24z" fill="var(--team)" />
      <rect x="0" y="34" width="40" height="6" fill="var(--team-2)" clipPath={`url(#${clip})`} />
      <path d="M3 3h34v21c0 10-8 18-17 21C11 42 3 34 3 24z" fill="none" stroke="var(--team-2)" strokeWidth="2.5" />
      <text x="20" y="23" textAnchor="middle" dominantBaseline="middle" fill="var(--team-text)" fontFamily="var(--display)" fontWeight="700" fontSize={team.shortName.length > 3 ? 11 : 13}>{team.shortName}</text>
    </svg>
  )
}

export function TeamCard({ team }: { team: Team }) {
  return (
    <Link to={`/team/${team.id}`} className="club" style={teamStyle(team)}>
      <Badge team={team} />
      <span className="club-text">
        <span className="club-name">{team.name}</span>
        <span className="muted">{team.coach.name}</span>
      </span>
      <span className="pill">{team.formation}</span>
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

const initials = (name: string) => {
  const parts = name.split(' ').filter(Boolean)
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase()
}

/** Player photo, or club-colored initials when no photo is set. */
export function Avatar({ player, team, size = 'md' }: { player: Player; team: Team; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <span className={`avatar ${size}`} style={teamStyle(team)}>
      {player.photo ? <img src={player.photo} alt={player.name} loading="lazy" /> : <span aria-hidden="true">{initials(player.name)}</span>}
    </span>
  )
}

/** Club photo (stadium), or the crest on a club-colored band when no photo is set. */
export function VenuePhoto({ team }: { team: Team }) {
  return (
    <figure className="venue" style={teamStyle(team)}>
      {team.photo ? (
        <img src={team.photo} alt={`${team.stadium}, home of ${team.name}`} loading="lazy" />
      ) : (
        <div className="venue-fallback"><Badge team={team} large /></div>
      )}
      <figcaption>{team.stadium}</figcaption>
    </figure>
  )
}
