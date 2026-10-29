import { describe, expect, it } from 'vitest'
import { getAllPlayers, getPlayers, getTeams } from '../src/data'
import { formations } from '../src/lib/formations'

describe('dataset', () => {
  const teams = getTeams()
  const players = getAllPlayers()

  it('has 20 teams with unique ids', () => {
    expect(teams).toHaveLength(20)
    expect(new Set(teams.map((t) => t.id)).size).toBe(20)
  })

  it('has unique player ids', () => {
    expect(new Set(players.map((p) => p.id)).size).toBe(players.length)
  })

  it('has no player listed for two clubs', () => {
    const names = players.map((p) => p.name)
    const dupes = names.filter((n, i) => names.indexOf(n) !== i)
    expect(dupes).toEqual([])
  })

  it.each(teams.map((t) => [t.name, t] as const))('%s has a valid starting XI', (_n, team) => {
    expect(formations[team.formation]).toBeDefined()
    expect(team.startingXI).toHaveLength(11)
    expect(new Set(team.startingXI).size).toBe(11)
    const squad = getPlayers(team.id)
    expect(squad.length).toBeGreaterThanOrEqual(18)
    for (const id of team.startingXI) expect(squad.some((p) => p.id === id)).toBe(true)
    expect(squad.filter((p) => p.position === 'GK').length).toBeGreaterThanOrEqual(2)
    expect(team.startingXI[0]).toBe(squad.find((p) => p.position === 'GK')!.id)
  })

  it('has sane stats', () => {
    for (const p of players) {
      expect(Number.isNaN(p.stats.minutes)).toBe(false)
      expect(p.stats.starts).toBeLessThanOrEqual(p.stats.appearances)
      expect(p.stats.passAccuracy).toBeGreaterThan(40)
      expect(p.stats.passAccuracy).toBeLessThanOrEqual(100)
      expect(p.form).toHaveLength(10)
    }
  })
})
