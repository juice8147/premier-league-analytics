import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getAllPlayers, getPlayer, getTeam } from '../data'
import { avgForm, per90, playerPercentiles, savePct } from '../lib/stats'
import { PlayerRadar } from '../components/charts'
import PlayerPicker from '../components/PlayerPicker'
import type { Player } from '../types'

const COLOR_A = 'var(--ink)'
const COLOR_B = 'var(--b)'

function rowsFor(p: Player): [string, number][] {
  const s = p.stats
  if (p.position === 'GK') {
    return [['Saves', s.saves], ['Clean sheets', s.cleanSheets], ['Save %', +savePct(s).toFixed(0)], ['Conceded / 90', +per90(s.goalsConceded, s.minutes).toFixed(2)], ['Avg form', +avgForm(p).toFixed(1)]]
  }
  return [
    ['Goals', s.goals], ['Assists', s.assists], ['xG', s.xG], ['xA', s.xA],
    ['Shots / 90', +per90(s.shots, s.minutes).toFixed(2)], ['Key passes / 90', +per90(s.keyPasses, s.minutes).toFixed(2)],
    ['Tackles / 90', +per90(s.tackles, s.minutes).toFixed(2)], ['Pass %', s.passAccuracy], ['Avg form', +avgForm(p).toFixed(1)],
  ]
}

export default function ComparePage() {
  const [params, setParams] = useSearchParams()
  const all = getAllPlayers()
  const a = getPlayer(params.get('a') ?? '')
  const b = getPlayer(params.get('b') ?? '')

  const set = (key: 'a' | 'b', id: string) => {
    const next = new URLSearchParams(params)
    if (id) next.set(key, id)
    else next.delete(key)
    // Players are compared within one position, so a changed first pick can invalidate the second.
    const other = getPlayer(next.get(key === 'a' ? 'b' : 'a') ?? '')
    const picked = getPlayer(id)
    if (picked && other && picked.position !== other.position) next.delete(key === 'a' ? 'b' : 'a')
    setParams(next, { replace: true })
  }

  const optionsA = useMemo(() => all.filter((p) => p.id !== b?.id && (!b || p.position === b.position)), [all, b])
  const optionsB = useMemo(() => all.filter((p) => p.id !== a?.id && (!a || p.position === a.position)), [all, a])

  const ready = a && b && a.id !== b.id && a.position === b.position
  const ra = a ? rowsFor(a) : []
  const rb = b ? rowsFor(b) : []
  const posHint = (p?: Player) => (p ? `Showing ${p.position} players only, to compare like with like.` : undefined)

  return (
    <>
      <h1 className="page-title">Compare players</h1>
      <p className="lede">Type a name to find a player. Both players must play the same position, so goalkeepers face goalkeepers.</p>

      <div className="pickers">
        <PlayerPicker label="First player" value={a} options={optionsA} onSelect={(id) => set('a', id)} hint={posHint(b)} />
        <span className="versus" aria-hidden="true">vs</span>
        <PlayerPicker label="Second player" value={b} options={optionsB} onSelect={(id) => set('b', id)} hint={posHint(a)} />
      </div>

      {ready ? (
        <div className="split">
          <section className="panel" aria-labelledby="cmp-radar">
            <h2 id="cmp-radar">Percentile vs {a.position} peers</h2>
            <PlayerRadar
              series={[
                { name: a.name, color: COLOR_A, rows: playerPercentiles(a, all) },
                { name: b.name, color: COLOR_B, rows: playerPercentiles(b, all) },
              ]}
            />
          </section>
          <section className="panel" aria-labelledby="cmp-stats">
            <h2 id="cmp-stats">Season stats</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Stat</th>
                    <th scope="col" className="num"><span className="swatch" style={{ background: COLOR_A }} />{a.name}<small>{getTeam(a.teamId)?.shortName}</small></th>
                    <th scope="col" className="num"><span className="swatch" style={{ background: COLOR_B }} />{b.name}<small>{getTeam(b.teamId)?.shortName}</small></th>
                  </tr>
                </thead>
                <tbody>
                  {ra.map(([label, va], i) => {
                    const vb = rb[i][1]
                    const lowerBetter = label.startsWith('Conceded')
                    const aWins = lowerBetter ? va < vb : va > vb
                    const bWins = lowerBetter ? vb < va : vb > va
                    return (
                      <tr key={label}>
                        <th scope="row">{label}</th>
                        <td className={`num${aWins ? ' win' : ''}`}>{va}</td>
                        <td className={`num${bWins ? ' win' : ''}`}>{vb}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <p className="note">The underlined value is the better one in each row.</p>
          </section>
        </div>
      ) : (
        <p className="empty">
          {a || b ? 'Pick a second player to see the comparison.' : 'Pick two players to see their radar and stats side by side.'}
        </p>
      )}
    </>
  )
}
