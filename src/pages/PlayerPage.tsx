import { Link, useParams } from 'react-router-dom'
import { getAllPlayers, getPlayer, getTeam } from '../data'
import { avgForm, per90, playerPercentiles, savePct, MIN_MINUTES } from '../lib/stats'
import { chartColor, teamStyle } from '../lib/theme'
import { Badge, PosTag, StatBar } from '../components/small'
import { FormChart, PlayerRadar } from '../components/charts'

export default function PlayerPage() {
  const { playerId = '' } = useParams()
  const player = getPlayer(playerId)
  const team = player && getTeam(player.teamId)
  if (!player || !team) return <p>Player not found. <Link to="/players">Browse players</Link></p>

  const s = player.stats
  const rows = playerPercentiles(player, getAllPlayers())
  const enoughMinutes = s.minutes >= MIN_MINUTES
  const isGK = player.position === 'GK'
  const color = chartColor(team)

  const summary: [string, string | number][] = isGK
    ? [['Apps', s.appearances], ['Clean sheets', s.cleanSheets], ['Saves', s.saves], ['Save %', savePct(s).toFixed(0) + '%'], ['Conceded', s.goalsConceded]]
    : [['Apps', s.appearances], ['Goals', s.goals], ['Assists', s.assists], ['xG', s.xG.toFixed(1)], ['xA', s.xA.toFixed(1)]]

  const p90 = (v: number) => per90(v, s.minutes).toFixed(2)
  const detail: [string, string][] = isGK
    ? [['Minutes', String(s.minutes)], ['Saves / 90', p90(s.saves)], ['Conceded / 90', p90(s.goalsConceded)], ['Pass accuracy', s.passAccuracy + '%'], ['Yellow / red', `${s.yellowCards} / ${s.redCards}`]]
    : [
        ['Minutes', String(s.minutes)], ['Starts', String(s.starts)], ['Shots / 90', p90(s.shots)], ['On target', String(s.shotsOnTarget)],
        ['Key passes / 90', p90(s.keyPasses)], ['Pass accuracy', s.passAccuracy + '%'], ['Dribbles / 90', p90(s.dribbles)],
        ['Tackles / 90', p90(s.tackles)], ['Intercepts / 90', p90(s.interceptions)], ['Clearances / 90', p90(s.clearances)],
        ['Aerials won / 90', p90(s.aerialsWon)], ['Yellow / red', `${s.yellowCards} / ${s.redCards}`],
      ]

  return (
    <div style={teamStyle(team)}>
      <Link to={`/team/${team.id}`} className="breadcrumb">← {team.name}</Link>
      <div className="card team-hero">
        <Badge team={team} large />
        <div>
          <h1>#{player.number} {player.name}</h1>
          <div className="muted">
            <PosTag position={player.position} /> {player.detailedPosition} · {player.nationality} · Age {player.age} · {team.name}
          </div>
          <div className="stat-row">
            {summary.map(([label, v]) => <div key={label}><b>{v}</b><span>{label}</span></div>)}
            <div><b>{avgForm(player).toFixed(1)}</b><span>Avg form (L10)</span></div>
          </div>
        </div>
      </div>

      <div className="grid two section">
        <div className="card">
          <h2>Percentile vs {player.position} peers</h2>
          {enoughMinutes ? (
            <>
              <PlayerRadar series={[{ name: player.name, color, rows }]} />
              {rows.map((r) => <StatBar key={r.key} label={r.label} value={r.percentile} max={100} display={`${r.percentile}th`} />)}
            </>
          ) : (
            <p className="muted">Needs at least {MIN_MINUTES} minutes played for a reliable comparison.</p>
          )}
        </div>
        <div className="card">
          <h2>Recent form</h2>
          <FormChart form={player.form} color={color} />
          <h2 style={{ marginTop: 16 }}>Season detail</h2>
          <div className="kv">
            {detail.map(([label, v]) => <div key={label}><b>{v}</b><span>{label}</span></div>)}
          </div>
        </div>
      </div>
    </div>
  )
}
