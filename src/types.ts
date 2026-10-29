export type Position = 'GK' | 'DEF' | 'MID' | 'FWD'

export type DetailedPosition =
  | 'GK' | 'RB' | 'CB' | 'LB' | 'RWB' | 'LWB'
  | 'DM' | 'CM' | 'AM' | 'RW' | 'LW' | 'ST'

export interface Coach {
  name: string
  nationality: string
  appointed: string
  style: string
}

export interface PlayerStats {
  appearances: number
  starts: number
  minutes: number
  goals: number
  assists: number
  xG: number
  xA: number
  shots: number
  shotsOnTarget: number
  keyPasses: number
  passAccuracy: number
  tackles: number
  interceptions: number
  clearances: number
  aerialsWon: number
  dribbles: number
  yellowCards: number
  redCards: number
  saves: number
  cleanSheets: number
  goalsConceded: number
}

export interface Player {
  id: string
  teamId: string
  name: string
  number: number
  position: Position
  detailedPosition: DetailedPosition
  nationality: string
  age: number
  stats: PlayerStats
  /** Last 10 match ratings, oldest first */
  form: number[]
}

export interface Team {
  id: string
  name: string
  shortName: string
  primaryColor: string
  secondaryColor: string
  stadium: string
  founded: number
  coach: Coach
  formation: string
  startingXI: string[]
}

export interface FormationSlot {
  role: DetailedPosition
  /** percent from left, 0-100 */
  x: number
  /** percent from top (opponent goal) to bottom (own goal), 0-100 */
  y: number
}
