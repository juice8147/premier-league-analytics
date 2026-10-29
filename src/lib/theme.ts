import type { CSSProperties } from 'react'
import type { Team } from '../types'

function luminance(hex: string): number {
  const n = parseInt(hex.replace('#', ''), 16)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255]
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255
}

export const readableOn = (hex: string) => (luminance(hex) > 0.6 ? '#111111' : '#ffffff')

/** Club color for chart strokes; very dark kits fall back to the theme accent so they stay visible. */
export const chartColor = (team: Team) => (luminance(team.primaryColor) < 0.4 ? 'var(--ink)' : team.primaryColor)

/** CSS variables that carry a club's colors down to its components. */
export function teamStyle(team: Team): CSSProperties {
  return {
    '--team': team.primaryColor,
    '--team-2': team.secondaryColor,
    '--team-text': readableOn(team.primaryColor),
  } as CSSProperties
}
