import type { Player, PlayerStats, Position } from '../types'

export const MIN_MINUTES = 270

export function per90(value: number, minutes: number): number {
  return minutes > 0 ? (value / minutes) * 90 : 0
}

export interface RadarAxis {
  key: string
  label: string
  /** returns the raw metric used for percentile ranking; higher is better */
  value: (s: PlayerStats) => number
}

const p90 = (k: keyof PlayerStats) => (s: PlayerStats) => per90(s[k], s.minutes)

export const radarAxes: Record<Position, RadarAxis[]> = {
  FWD: [
    { key: 'goals', label: 'Goals', value: p90('goals') },
    { key: 'xG', label: 'xG', value: p90('xG') },
    { key: 'shots', label: 'Shots', value: p90('shots') },
    { key: 'dribbles', label: 'Dribbles', value: p90('dribbles') },
    { key: 'keyPasses', label: 'Key passes', value: p90('keyPasses') },
    { key: 'aerialsWon', label: 'Aerials', value: p90('aerialsWon') },
  ],
  MID: [
    { key: 'keyPasses', label: 'Key passes', value: p90('keyPasses') },
    { key: 'xA', label: 'xA', value: p90('xA') },
    { key: 'passAccuracy', label: 'Pass %', value: (s) => s.passAccuracy },
    { key: 'tackles', label: 'Tackles', value: p90('tackles') },
    { key: 'interceptions', label: 'Intercepts', value: p90('interceptions') },
    { key: 'dribbles', label: 'Dribbles', value: p90('dribbles') },
  ],
  DEF: [
    { key: 'tackles', label: 'Tackles', value: p90('tackles') },
    { key: 'interceptions', label: 'Intercepts', value: p90('interceptions') },
    { key: 'clearances', label: 'Clearances', value: p90('clearances') },
    { key: 'aerialsWon', label: 'Aerials', value: p90('aerialsWon') },
    { key: 'passAccuracy', label: 'Pass %', value: (s) => s.passAccuracy },
    { key: 'xA', label: 'xA', value: p90('xA') },
  ],
  GK: [
    { key: 'savePct', label: 'Save %', value: (s) => savePct(s) },
    { key: 'cleanSheets', label: 'Clean sheets', value: (s) => (s.appearances ? s.cleanSheets / s.appearances : 0) },
    { key: 'saves', label: 'Saves/90', value: p90('saves') },
    { key: 'conceded', label: 'Goals prevented', value: (s) => -per90(s.goalsConceded, s.minutes) },
    { key: 'passAccuracy', label: 'Pass %', value: (s) => s.passAccuracy },
  ],
}

export function savePct(s: PlayerStats): number {
  const faced = s.saves + s.goalsConceded
  return faced ? (s.saves / faced) * 100 : 0
}

/** Percentile (0-100) of `value` among peers' values. */
function percentile(value: number, peers: number[]): number {
  if (peers.length === 0) return 50
  const below = peers.filter((v) => v < value).length
  const equal = peers.filter((v) => v === value).length
  return Math.round(((below + equal / 2) / peers.length) * 100)
}

export interface PercentileRow {
  key: string
  label: string
  percentile: number
}

export function playerPercentiles(player: Player, all: Player[]): PercentileRow[] {
  const peers = all.filter((p) => p.position === player.position && p.stats.minutes >= MIN_MINUTES)
  return radarAxes[player.position].map((axis) => ({
    key: axis.key,
    label: axis.label,
    percentile: percentile(
      axis.value(player.stats),
      peers.map((p) => axis.value(p.stats)),
    ),
  }))
}

/** Overall rating: mean of last-10 form ratings. */
export function avgForm(player: Player): number {
  const f = player.form
  return f.length ? f.reduce((a, b) => a + b, 0) / f.length : 0
}

export function goalContributions(s: PlayerStats): number {
  return s.goals + s.assists
}

export interface TeamAggregate {
  goals: number
  xG: number
  avgAge: number
  topScorer?: Player
  topAssister?: Player
}

export function teamAggregate(players: Player[]): TeamAggregate {
  const goals = players.reduce((a, p) => a + p.stats.goals, 0)
  const xG = players.reduce((a, p) => a + p.stats.xG, 0)
  const avgAge = players.length ? players.reduce((a, p) => a + p.age, 0) / players.length : 0
  const topScorer = [...players].sort((a, b) => b.stats.goals - a.stats.goals)[0]
  const topAssister = [...players].sort((a, b) => b.stats.assists - a.stats.assists)[0]
  return { goals, xG, avgAge, topScorer, topAssister }
}
