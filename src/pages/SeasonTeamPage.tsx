import { getAllPlayers, getTeam } from '../data'
import { teamOfSeason, MIN_MINUTES, type SeasonPick } from '../lib/stats'
import type { Position } from '../types'
import { PlayerLink } from '../components/small'

const lines: { line: Position; title: string }[] = [
  { line: 'FWD', title: 'Forwards' },
  { line: 'MID', title: 'Midfielders' },
  { line: 'DEF', title: 'Defenders' },
  { line: 'GK', title: 'Goalkeeper' },
]

function PickRow({ pick }: { pick: SeasonPick }) {
  const team = getTeam(pick.player.teamId)
  return (
    <tr>
      <td className="big num">{Math.round(pick.score)}</td>
      <td>
        <PlayerLink player={pick.player} />
        <small>{pick.player.detailedPosition}, {team?.name}</small>
      </td>
      <td className="num">{pick.player.stats.goals} G / {pick.player.stats.assists} A</td>
    </tr>
  )
}

export default function SeasonTeamPage() {
  const picks = teamOfSeason(getAllPlayers())
  return (
    <>
      <h1 className="page-title">Team of the season</h1>
      <p className="lede">
        Best 4-3-3 chosen from the stats. Each player is scored out of 100: 70% average percentile on the key
        metrics for their position, 30% last-10 form. Players need {MIN_MINUTES}+ minutes. Stats are estimates.
      </p>
      <div className="split">
        {lines.map(({ line, title }) => {
          const group = picks.filter((p) => p.line === line)
          return (
            <section className="panel" key={line}>
              <h2>{title}</h2>
              <table className="leaders">
                <tbody>{group.map((p, i) => <PickRow key={p.player.id + i} pick={p} />)}</tbody>
              </table>
            </section>
          )
        })}
      </div>
    </>
  )
}
