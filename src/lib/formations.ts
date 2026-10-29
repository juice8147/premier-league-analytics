import type { FormationSlot } from '../types'

const gk: FormationSlot = { role: 'GK', x: 50, y: 92 }

export const formations: Record<string, FormationSlot[]> = {
  '4-3-3': [
    gk,
    { role: 'LB', x: 15, y: 74 }, { role: 'CB', x: 38, y: 78 }, { role: 'CB', x: 62, y: 78 }, { role: 'RB', x: 85, y: 74 },
    { role: 'CM', x: 28, y: 54 }, { role: 'DM', x: 50, y: 60 }, { role: 'CM', x: 72, y: 54 },
    { role: 'LW', x: 18, y: 26 }, { role: 'ST', x: 50, y: 18 }, { role: 'RW', x: 82, y: 26 },
  ],
  '4-2-3-1': [
    gk,
    { role: 'LB', x: 15, y: 74 }, { role: 'CB', x: 38, y: 78 }, { role: 'CB', x: 62, y: 78 }, { role: 'RB', x: 85, y: 74 },
    { role: 'DM', x: 36, y: 58 }, { role: 'DM', x: 64, y: 58 },
    { role: 'LW', x: 18, y: 36 }, { role: 'AM', x: 50, y: 38 }, { role: 'RW', x: 82, y: 36 },
    { role: 'ST', x: 50, y: 16 },
  ],
  '4-4-2': [
    gk,
    { role: 'LB', x: 15, y: 74 }, { role: 'CB', x: 38, y: 78 }, { role: 'CB', x: 62, y: 78 }, { role: 'RB', x: 85, y: 74 },
    { role: 'LW', x: 15, y: 48 }, { role: 'CM', x: 38, y: 54 }, { role: 'CM', x: 62, y: 54 }, { role: 'RW', x: 85, y: 48 },
    { role: 'ST', x: 38, y: 20 }, { role: 'ST', x: 62, y: 20 },
  ],
  '4-1-4-1': [
    gk,
    { role: 'LB', x: 15, y: 74 }, { role: 'CB', x: 38, y: 78 }, { role: 'CB', x: 62, y: 78 }, { role: 'RB', x: 85, y: 74 },
    { role: 'DM', x: 50, y: 62 },
    { role: 'LW', x: 15, y: 42 }, { role: 'CM', x: 38, y: 46 }, { role: 'CM', x: 62, y: 46 }, { role: 'RW', x: 85, y: 42 },
    { role: 'ST', x: 50, y: 17 },
  ],
  '3-4-2-1': [
    gk,
    { role: 'CB', x: 24, y: 76 }, { role: 'CB', x: 50, y: 79 }, { role: 'CB', x: 76, y: 76 },
    { role: 'LWB', x: 10, y: 52 }, { role: 'CM', x: 38, y: 56 }, { role: 'CM', x: 62, y: 56 }, { role: 'RWB', x: 90, y: 52 },
    { role: 'AM', x: 32, y: 32 }, { role: 'AM', x: 68, y: 32 },
    { role: 'ST', x: 50, y: 16 },
  ],
  '3-5-2': [
    gk,
    { role: 'CB', x: 24, y: 76 }, { role: 'CB', x: 50, y: 79 }, { role: 'CB', x: 76, y: 76 },
    { role: 'LWB', x: 10, y: 50 }, { role: 'CM', x: 32, y: 54 }, { role: 'DM', x: 50, y: 60 }, { role: 'CM', x: 68, y: 54 }, { role: 'RWB', x: 90, y: 50 },
    { role: 'ST', x: 38, y: 20 }, { role: 'ST', x: 62, y: 20 },
  ],
  '5-3-2': [
    gk,
    { role: 'LWB', x: 9, y: 66 }, { role: 'CB', x: 28, y: 77 }, { role: 'CB', x: 50, y: 80 }, { role: 'CB', x: 72, y: 77 }, { role: 'RWB', x: 91, y: 66 },
    { role: 'CM', x: 30, y: 48 }, { role: 'DM', x: 50, y: 54 }, { role: 'CM', x: 70, y: 48 },
    { role: 'ST', x: 38, y: 20 }, { role: 'ST', x: 62, y: 20 },
  ],
}
