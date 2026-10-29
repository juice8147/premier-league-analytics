import type { Coach, DetailedPosition, Player, PlayerStats, Position, Team } from '../types'
import { formations } from '../lib/formations'

/**
 * Compact squad definition. Each player line is `number pos Name... NAT age`.
 * Players are listed in rough order of selection priority; stats are
 * deterministic, position-based estimates seeded from the player id.
 */
export interface RawTeam {
  id: string
  name: string
  shortName: string
  primaryColor: string
  secondaryColor: string
  stadium: string
  founded: number
  coach: Coach
  formation: string
  players: string[]
}

const broad: Record<DetailedPosition, Position> = {
  GK: 'GK', RB: 'DEF', CB: 'DEF', LB: 'DEF', RWB: 'DEF', LWB: 'DEF',
  DM: 'MID', CM: 'MID', AM: 'MID', RW: 'FWD', LW: 'FWD', ST: 'FWD',
}

function hash(str: string): number {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function rng(seed: number) {
  let s = seed || 1
  return () => {
    s ^= s << 13; s >>>= 0
    s ^= s >>> 17
    s ^= s << 5; s >>>= 0
    return s / 4294967296
  }
}

const slug = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/** Per-90 baselines by detailed position: [goals, assists, shots, keyPasses, tackles, interceptions, clearances, aerials, dribbles] */
const base: Record<DetailedPosition, number[]> = {
  GK:  [0,    0,    0,   0.1, 0.1, 0.2, 1.0, 0.3, 0],
  CB:  [0.06, 0.04, 0.5, 0.4, 1.6, 1.3, 4.5, 3.2, 0.2],
  RB:  [0.05, 0.12, 0.7, 1.0, 2.0, 1.4, 2.2, 1.0, 1.0],
  LB:  [0.05, 0.12, 0.7, 1.0, 2.0, 1.4, 2.2, 1.0, 1.0],
  RWB: [0.07, 0.18, 1.0, 1.4, 1.9, 1.2, 1.8, 0.9, 1.4],
  LWB: [0.07, 0.18, 1.0, 1.4, 1.9, 1.2, 1.8, 0.9, 1.4],
  DM:  [0.06, 0.08, 0.9, 1.0, 2.6, 1.8, 2.0, 1.6, 0.7],
  CM:  [0.12, 0.15, 1.4, 1.7, 1.9, 1.2, 1.0, 1.0, 1.2],
  AM:  [0.25, 0.25, 2.0, 2.4, 1.2, 0.8, 0.5, 0.6, 2.0],
  RW:  [0.28, 0.22, 2.4, 2.1, 1.0, 0.6, 0.3, 0.5, 3.0],
  LW:  [0.28, 0.22, 2.4, 2.1, 1.0, 0.6, 0.3, 0.5, 3.0],
  ST:  [0.45, 0.12, 3.1, 1.2, 0.6, 0.3, 0.6, 2.4, 1.1],
}

export function parsePlayer(teamId: string, line: string, index: number): Player {
  const parts = line.trim().split(/\s+/)
  const number = Number(parts[0])
  const detailedPosition = parts[1] as DetailedPosition
  const age = Number(parts[parts.length - 1])
  const nationality = parts[parts.length - 2]
  const name = parts.slice(2, -2).join(' ')
  const id = `${teamId}-${slug(name)}`
  const position = broad[detailedPosition]
  const r = rng(hash(id))

  // Quality: scale 0.75..1.35, a little higher for earlier-listed players.
  const quality = 0.8 + r() * 0.35 + Math.max(0, 14 - index) * 0.012
  const starter = index < 13 || (position === 'GK' && index === 0)
  const appearances = position === 'GK' ? (index === 0 ? 36 : 2) : starter ? 28 + Math.floor(r() * 9) : 6 + Math.floor(r() * 18)
  const startRatio = starter ? 0.8 + r() * 0.18 : 0.2 + r() * 0.4
  const starts = Math.round(appearances * startRatio)
  const minutes = position === 'GK' ? (index === 0 ? 3240 : 180) : Math.round(starts * 82 + (appearances - starts) * 22)
  const n90 = minutes / 90

  const [g, a, sh, kp, tk, ic, cl, ae, dr] = base[detailedPosition]
  const q = position === 'FWD' || detailedPosition === 'AM' ? quality * quality : quality
  const jitter = () => 0.75 + r() * 0.5

  const goals = Math.round(g * n90 * q * jitter())
  const assists = Math.round(a * n90 * q * jitter())
  const shots = Math.round(sh * n90 * jitter() * (0.85 + 0.15 * q))
  const conceded = position === 'GK' ? Math.round(n90 * (1.05 + r() * 0.5)) : 0

  const stats: PlayerStats = {
    appearances,
    starts,
    minutes,
    goals,
    assists,
    xG: +(g * n90 * (0.85 + r() * 0.3) * q).toFixed(1),
    xA: +(a * n90 * (0.85 + r() * 0.3) * q).toFixed(1),
    shots,
    shotsOnTarget: Math.round(shots * (0.3 + r() * 0.2)),
    keyPasses: Math.round(kp * n90 * q * jitter()),
    passAccuracy: Math.round(
      (position === 'GK' ? 68 : position === 'DEF' ? 85 : position === 'MID' ? 86 : 78) + (r() - 0.5) * 8 + (q - 1) * 6,
    ),
    tackles: Math.round(tk * n90 * jitter()),
    interceptions: Math.round(ic * n90 * jitter()),
    clearances: Math.round(cl * n90 * jitter()),
    aerialsWon: Math.round(ae * n90 * jitter()),
    dribbles: Math.round(dr * n90 * q * jitter()),
    yellowCards: Math.round(n90 * 0.13 * (r() * 2)),
    redCards: r() < 0.04 ? 1 : 0,
    saves: position === 'GK' ? Math.round(n90 * (2.4 + r() * 1.6)) : 0,
    cleanSheets: position === 'GK' ? Math.round(appearances * (0.2 + r() * 0.2)) : 0,
    goalsConceded: conceded,
  }

  const form = Array.from({ length: 10 }, () => +(Math.min(9.4, Math.max(5.2, 6.4 + (q - 1) * 1.6 + (r() - 0.5) * 2.2))).toFixed(1))

  return { id, teamId, name, number, position, detailedPosition, nationality, age, stats, form }
}

/** Fill each formation slot with the first-listed unused player of the matching role. */
export function pickStartingXI(formation: string, players: Player[]): string[] {
  const slots = formations[formation]
  const used = new Set<string>()
  const compatible: Record<DetailedPosition, DetailedPosition[]> = {
    GK: ['GK'],
    RB: ['RB', 'RWB', 'CB'], LB: ['LB', 'LWB', 'CB'], CB: ['CB'],
    RWB: ['RWB', 'RB', 'RW'], LWB: ['LWB', 'LB', 'LW'],
    DM: ['DM', 'CM'], CM: ['CM', 'DM', 'AM'], AM: ['AM', 'CM', 'RW', 'LW'],
    RW: ['RW', 'LW', 'AM'], LW: ['LW', 'RW', 'AM'], ST: ['ST', 'AM', 'RW', 'LW'],
  }
  const xi: string[] = []
  for (const slot of slots) {
    const pick =
      players.find((p) => !used.has(p.id) && p.detailedPosition === slot.role) ??
      players.find((p) => !used.has(p.id) && compatible[slot.role].includes(p.detailedPosition)) ??
      players.find((p) => !used.has(p.id) && p.position === broad[slot.role])
    if (pick) {
      used.add(pick.id)
      xi.push(pick.id)
    }
  }
  return xi
}

export function buildTeam(raw: RawTeam): { team: Team; players: Player[] } {
  const players = raw.players.map((line, i) => parsePlayer(raw.id, line, i))
  const { players: _omit, ...rest } = raw
  void _omit
  return { team: { ...rest, startingXI: pickStartingXI(raw.formation, players) }, players }
}
