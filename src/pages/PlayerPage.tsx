import { Link, useParams, useSearchParams } from 'react-router-dom'
import { getAllPlayers, getPlayer, getTeam } from '../data'
import { avgForm, formatKeyStat, keyStats, peerPool, per90, playerPercentiles, roleGroup, MIN_MINUTES, type PeerGroup } from '../lib/stats'
import { chartColor, teamStyle } from '../lib/theme'
import { Avatar, PosTag, StatBar } from '../components/small'
import { FormChart, PlayerRadar } from '../components/charts'

export default function PlayerPage() {
  const { playerId = '' } = useParams()
  const [params, setParams] = useSearchParams()
  const player = getPlayer(playerId)
  const team = player && getTeam(player.teamId)
  if (!player || !team) return <p className="empty">Player not found. <Link to="/players" className="textlink">Browse players</Link></p>

  const s = player.stats
  const group: PeerGroup = params.get('peers') === 'role' ? 'role' : 'position'
  const all = getAllPlayers()
  const rows = playerPercentiles(player, all, group)
  const poolSize = peerPool(player, all, group).length
  const setGroup = (g: PeerGroup) => setParams(g === 'role' ? { peers: 'role' } : {}, { replace: true })
  const enoughMinutes = s.minutes >= MIN_MINUTES
  const isGK = player.position === 'GK'
  const color = chartColor(team)

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
      <Link to={`/team/${team.id}`} className="back">{team.name}</Link>
      <div className="hero">
        <Avatar player={player} team={team} size="lg" />
        <p className="shirt" aria-label={`Shirt number ${player.number}`}>{player.number}</p>
        <div>
          <h1 className="hero-name">{player.name}</h1>
          <p className="hero-sub">
            <PosTag position={player.position} /> {player.detailedPosition}, {player.nationality}, age {player.age}, {team.name}
          </p>
          <p><Link to={`/compare?a=${player.id}`} className="textlink">Compare with another player</Link></p>
        </div>
      </div>
      <dl className="figures">
        {keyStats[player.position].map((k) => <div key={k.key}><dd>{formatKeyStat(k, player)}</dd><dt>{k.label}</dt></div>)}
        <div><dd>{avgForm(player).toFixed(1)}</dd><dt>Average form, last 10</dt></div>
      </dl>

      <div className="split">
        <section className="panel">
          <h2>Percentile vs {group === 'role' ? roleGroup(player).toLowerCase() : `${player.position} peers`}</h2>
          <div className="controls" role="group" aria-label="Compare against">
            <button type="button" className="btn" aria-pressed={group === 'position'} onClick={() => setGroup('position')}>All {player.position}</button>
            <button type="button" className="btn" aria-pressed={group === 'role'} onClick={() => setGroup('role')}>{roleGroup(player)}</button>
          </div>
          {enoughMinutes ? (
            <>
              <p className="muted">Ranked against {poolSize} players with {MIN_MINUTES}+ minutes.{poolSize < 10 && ' Small sample: treat with care.'}</p>
              <PlayerRadar series={[{ name: player.name, color, rows }]} />
              {rows.map((r) => <StatBar key={r.key} label={r.label} value={r.percentile} max={100} display={`${r.percentile}th`} />)}
            </>
          ) : (
            <p className="empty">Needs at least {MIN_MINUTES} minutes played for a reliable comparison.</p>
          )}
        </section>
        <section className="panel">
          <h2>Recent form</h2>
          <FormChart form={player.form} color={color} />
          <h2 className="gap-top">Season detail</h2>
          <dl className="kv">
            {detail.map(([label, v]) => <div key={label}><dd>{v}</dd><dt>{label}</dt></div>)}
          </dl>
        </section>
      </div>
    </div>
  )
}
