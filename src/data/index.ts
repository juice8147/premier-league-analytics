import type { Player, Team } from '../types'
import { buildTeam } from './build'
import { squadsA } from './squadsA'
import { squadsB } from './squadsB'
import { squadsC } from './squadsC'
import { squadsD } from './squadsD'
import { playerPhotos, teamPhotos } from './photos'
import { sportsDbCrests, sportsDbPlayerPhotos } from './sportsdb.generated'

export const SEASON = '2025/26'
export const DATA_NOTE =
  'Squads, coaches and formations are a snapshot and may be out of date. Player statistics are representative estimates, not official figures.'

const built = [...squadsA, ...squadsB, ...squadsC, ...squadsD].map(buildTeam)

// Manual entries in photos.ts win over the generated TheSportsDB values.
const teams: Team[] = built
  .map((b) => ({ ...b.team, photo: teamPhotos[b.team.id], crest: sportsDbCrests[b.team.id] }))
  .sort((a, b) => a.name.localeCompare(b.name))
const players: Player[] = built
  .flatMap((b) => b.players)
  .map((p) => ({ ...p, photo: playerPhotos[p.id] ?? sportsDbPlayerPhotos[p.id] }))

const teamById = new Map(teams.map((t) => [t.id, t]))
const playerById = new Map(players.map((p) => [p.id, p]))

export const getTeams = () => teams
export const getTeam = (id: string) => teamById.get(id)
export const getAllPlayers = () => players
export const getPlayer = (id: string) => playerById.get(id)
export const getPlayers = (teamId: string) => players.filter((p) => p.teamId === teamId)
