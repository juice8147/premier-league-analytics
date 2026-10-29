import { Link } from 'react-router-dom'
import type { Player, Team } from '../types'
import { formations } from '../lib/formations'
import { teamStyle } from '../lib/theme'

export default function PitchFormation({ team, squad }: { team: Team; squad: Player[] }) {
  const slots = formations[team.formation]
  const byId = new Map(squad.map((p) => [p.id, p]))
  const line = "#ffffffcc"

  return (
    <div className="pitch" style={teamStyle(team)} role="group" aria-label={`${team.name} ${team.formation} formation`}>
      <svg viewBox="0 0 68 90" preserveAspectRatio="none" aria-hidden="true">
        <g fill="none" stroke={line} strokeWidth="0.4">
          <rect x="2" y="2" width="64" height="86" />
          <line x1="2" y1="45" x2="66" y2="45" />
          <circle cx="34" cy="45" r="8" />
          <rect x="14" y="2" width="40" height="15" />
          <rect x="25" y="2" width="18" height="5.5" />
          <rect x="14" y="73" width="40" height="15" />
          <rect x="25" y="82.5" width="18" height="5.5" />
        </g>
      </svg>
      {slots.map((slot, i) => {
        const player = byId.get(team.startingXI[i])
        if (!player) return null
        const surname = player.name.split(' ').slice(-1)[0]
        return (
          <Link
            key={player.id}
            to={`/player/${player.id}`}
            className="marker"
            style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
            title={`${player.name} (${slot.role})`}
          >
            <span className="dot">{player.number}</span>
            <span className="nm">{surname}</span>
          </Link>
        )
      })}
    </div>
  )
}
