import type { DetailedPosition, Player, PlayerStats, Position } from '../types'

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

/** Role groups narrow a position into players who do similar jobs. */
const roleOf: Record<DetailedPosition, string> = {
  GK: 'Goalkeepers', CB: 'Centre-backs', RB: 'Full-backs', LB: 'Full-backs', RWB: 'Full-backs', LWB: 'Full-backs',
  DM: 'Central midfielders', CM: 'Central midfielders', AM: 'Attacking midfielders and wingers',
  RW: 'Attacking midfielders and wingers', LW: 'Attacking midfielders and wingers', ST: 'Strikers',
}
export const roleGroup = (p: Player) => roleOf[p.detailedPosition]

export type PeerGroup = 'position' | 'role'

/** Players a percentile is ranked against: same position (or role) with enough minutes. */
export function peerPool(player: Player, all: Player[], group: PeerGroup = 'position'): Player[] {
  return all.filter(
    (p) =>
      p.position === player.position &&
      (group === 'position' || roleGroup(p) === roleGroup(player)) &&
      p.stats.minutes >= MIN_MINUTES,
  )
}

export function playerPercentiles(player: Player, all: Player[], group: PeerGroup = 'position'): PercentileRow[] {
  const peers = peerPool(player, all, group)
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

export interface KeyStat {
  key: string
  label: string
  get: (p: Player) => number
  decimals?: number
}

const rate = (k: keyof PlayerStats) => (p: Player) => per90(p.stats[k], p.stats.minutes)

/** The stats that matter most for each position, in display order. */
export const keyStats: Record<Position, KeyStat[]> = {
  FWD: [
    { key: 'goals', label: 'Goals', get: (p) => p.stats.goals },
    { key: 'assists', label: 'Assists', get: (p) => p.stats.assists },
    { key: 'xG', label: 'xG', get: (p) => p.stats.xG, decimals: 1 },
    { key: 'shots90', label: 'Shots / 90', get: rate('shots'), decimals: 2 },
    { key: 'onTarget', label: 'On target %', get: (p) => (p.stats.shots ? (p.stats.shotsOnTarget / p.stats.shots) * 100 : 0), decimals: 0 },
    { key: 'dribbles90', label: 'Dribbles / 90', get: rate('dribbles'), decimals: 2 },
  ],
  MID: [
    { key: 'assists', label: 'Assists', get: (p) => p.stats.assists },
    { key: 'xA', label: 'xA', get: (p) => p.stats.xA, decimals: 1 },
    { key: 'keyPasses90', label: 'Key passes / 90', get: rate('keyPasses'), decimals: 2 },
    { key: 'pass', label: 'Pass %', get: (p) => p.stats.passAccuracy },
    { key: 'tackles90', label: 'Tackles / 90', get: rate('tackles'), decimals: 2 },
    { key: 'int90', label: 'Intercepts / 90', get: rate('interceptions'), decimals: 2 },
  ],
  DEF: [
    { key: 'tackles90', label: 'Tackles / 90', get: rate('tackles'), decimals: 2 },
    { key: 'int90', label: 'Intercepts / 90', get: rate('interceptions'), decimals: 2 },
    { key: 'clear90', label: 'Clearances / 90', get: rate('clearances'), decimals: 2 },
    { key: 'aerial90', label: 'Aerials won / 90', get: rate('aerialsWon'), decimals: 2 },
    { key: 'pass', label: 'Pass %', get: (p) => p.stats.passAccuracy },
    { key: 'yellow', label: 'Yellow cards', get: (p) => p.stats.yellowCards },
  ],
  GK: [
    { key: 'cleanSheets', label: 'Clean sheets', get: (p) => p.stats.cleanSheets },
    { key: 'saves', label: 'Saves', get: (p) => p.stats.saves },
    { key: 'savePct', label: 'Save %', get: (p) => savePct(p.stats), decimals: 0 },
    { key: 'conceded90', label: 'Conceded / 90', get: rate('goalsConceded'), decimals: 2 },
    { key: 'pass', label: 'Pass %', get: (p) => p.stats.passAccuracy },
  ],
}

export const formatKeyStat = (k: KeyStat, p: Player) => k.get(p).toFixed(k.decimals ?? 0)

/** League-wide metrics for the scatter explorer and CSV export. */
export const metrics: KeyStat[] = [
  { key: 'minutes', label: 'Minutes', get: (p) => p.stats.minutes },
  { key: 'goals', label: 'Goals', get: (p) => p.stats.goals },
  { key: 'assists', label: 'Assists', get: (p) => p.stats.assists },
  { key: 'xG', label: 'xG', get: (p) => p.stats.xG, decimals: 1 },
  { key: 'xA', label: 'xA', get: (p) => p.stats.xA, decimals: 1 },
  { key: 'goals90', label: 'Goals / 90', get: rate('goals'), decimals: 2 },
  { key: 'xG90', label: 'xG / 90', get: rate('xG'), decimals: 2 },
  { key: 'xA90', label: 'xA / 90', get: rate('xA'), decimals: 2 },
  { key: 'gMinusXg', label: 'Goals minus xG', get: (p) => p.stats.goals - p.stats.xG, decimals: 1 },
  { key: 'shots90', label: 'Shots / 90', get: rate('shots'), decimals: 2 },
  { key: 'keyPasses90', label: 'Key passes / 90', get: rate('keyPasses'), decimals: 2 },
  { key: 'pass', label: 'Pass %', get: (p) => p.stats.passAccuracy },
  { key: 'dribbles90', label: 'Dribbles / 90', get: rate('dribbles'), decimals: 2 },
  { key: 'tackles90', label: 'Tackles / 90', get: rate('tackles'), decimals: 2 },
  { key: 'int90', label: 'Intercepts / 90', get: rate('interceptions'), decimals: 2 },
  { key: 'clear90', label: 'Clearances / 90', get: rate('clearances'), decimals: 2 },
  { key: 'aerial90', label: 'Aerials won / 90', get: rate('aerialsWon'), decimals: 2 },
  { key: 'form', label: 'Average form', get: avgForm, decimals: 1 },
]

export function median(values: number[]): number {
  if (values.length === 0) return 0
  const s = [...values].sort((a, b) => a - b)
  const mid = s.length >> 1
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2
}

const csvCell = (v: string | number) => {
  const s = String(v)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

/** CSV of players with identity columns plus every metric. */
export function playersToCsv(players: Player[], teamName: (p: Player) => string): string {
  const header = ['Name', 'Club', 'Position', 'Role', 'Age', ...metrics.map((m) => m.label)]
  const rows = players.map((p) => [
    p.name, teamName(p), p.detailedPosition, roleGroup(p), p.age, ...metrics.map((m) => formatKeyStat(m, p)),
  ])
  return [header, ...rows].map((r) => r.map(csvCell).join(',')).join('\n')
}

/** Rating for team-of-the-season picks: mean axis percentile (70%) plus last-10 form scaled to 0-100 (30%). */
export function seasonScore(player: Player, all: Player[]): number {
  const rows = playerPercentiles(player, all)
  const pct = rows.reduce((a, r) => a + r.percentile, 0) / (rows.length || 1)
  const form = Math.max(0, Math.min(100, ((avgForm(player) - 5) / 5) * 100))
  return pct * 0.7 + form * 0.3
}

export interface SeasonPick {
  slot: string
  line: Position
  player: Player
  score: number
}

/** Slots for the 4-3-3 side: each lists the detailed roles it prefers. Unfilled slots fall back to any player in the line. */
const seasonSlots: { slot: string; line: Position; roles: DetailedPosition[] }[] = [
  { slot: 'GK', line: 'GK', roles: ['GK'] },
  { slot: 'LB', line: 'DEF', roles: ['LB', 'LWB'] },
  { slot: 'CB', line: 'DEF', roles: ['CB'] },
  { slot: 'CB', line: 'DEF', roles: ['CB'] },
  { slot: 'RB', line: 'DEF', roles: ['RB', 'RWB'] },
  { slot: 'MID', line: 'MID', roles: ['DM', 'CM', 'AM'] },
  { slot: 'MID', line: 'MID', roles: ['DM', 'CM', 'AM'] },
  { slot: 'MID', line: 'MID', roles: ['DM', 'CM', 'AM'] },
  { slot: 'LW', line: 'FWD', roles: ['LW'] },
  { slot: 'ST', line: 'FWD', roles: ['ST'] },
  { slot: 'RW', line: 'FWD', roles: ['RW'] },
]

/** Best XI from players with enough minutes, picked by seasonScore. Each player is used once. */
export function teamOfSeason(all: Player[]): SeasonPick[] {
  const pool = all
    .filter((p) => p.stats.minutes >= MIN_MINUTES)
    .map((player) => ({ player, score: seasonScore(player, all) }))
    .sort((a, b) => b.score - a.score)
  const used = new Set<string>()
  const picks: SeasonPick[] = []
  for (const s of seasonSlots) {
    const open = pool.filter((c) => c.player.position === s.line && !used.has(c.player.id))
    const best = open.find((c) => s.roles.includes(c.player.detailedPosition)) ?? open[0]
    if (!best) continue
    used.add(best.player.id)
    picks.push({ slot: s.slot, line: s.line, player: best.player, score: best.score })
  }
  return picks
}
