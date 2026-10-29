import { describe, expect, it } from 'vitest'
import { getAllPlayers } from '../src/data'
import { median, MIN_MINUTES, peerPool, per90, playerPercentiles, playersToCsv, roleGroup, teamOfSeason } from '../src/lib/stats'

describe('stats', () => {
  const players = getAllPlayers()
  const regular = players.find((p) => p.position === 'DEF' && p.stats.minutes >= MIN_MINUTES)!

  it('computes per-90 rates and guards zero minutes', () => {
    expect(per90(3, 270)).toBe(1)
    expect(per90(3, 0)).toBe(0)
  })

  it('takes the median of odd and even lists', () => {
    expect(median([3, 1, 2])).toBe(2)
    expect(median([4, 1, 2, 3])).toBe(2.5)
    expect(median([])).toBe(0)
  })

  it('builds peer pools from same position with enough minutes', () => {
    const pool = peerPool(regular, players)
    expect(pool.every((p) => p.position === regular.position && p.stats.minutes >= MIN_MINUTES)).toBe(true)
  })

  it('narrows the role pool to the same role group', () => {
    const role = peerPool(regular, players, 'role')
    expect(role.length).toBeLessThanOrEqual(peerPool(regular, players).length)
    expect(role.every((p) => roleGroup(p) === roleGroup(regular))).toBe(true)
  })

  it('keeps percentiles within 0-100', () => {
    for (const group of ['position', 'role'] as const) {
      for (const r of playerPercentiles(regular, players, group)) {
        expect(r.percentile).toBeGreaterThanOrEqual(0)
        expect(r.percentile).toBeLessThanOrEqual(100)
      }
    }
  })

  it('writes one CSV row per player and quotes commas', () => {
    const csv = playersToCsv(players.slice(0, 3), () => 'Club, FC')
    const lines = csv.split('\n')
    expect(lines).toHaveLength(4)
    expect(lines[1]).toContain('"Club, FC"')
  })
})

describe('teamOfSeason', () => {
  const xi = teamOfSeason(getAllPlayers())

  it('picks 11 unique players in a 1-4-3-3 shape', () => {
    expect(xi).toHaveLength(11)
    expect(new Set(xi.map((p) => p.player.id)).size).toBe(11)
    const count = (l: string) => xi.filter((p) => p.line === l).length
    expect([count('GK'), count('DEF'), count('MID'), count('FWD')]).toEqual([1, 4, 3, 3])
  })

  it('only picks players above the minutes threshold', () => {
    expect(xi.every((p) => p.player.stats.minutes >= MIN_MINUTES)).toBe(true)
  })
})
