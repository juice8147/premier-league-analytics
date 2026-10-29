import type { RawTeam } from './build'

export const squadsB: RawTeam[] = [
  {
    id: 'burnley', name: 'Burnley', shortName: 'BUR', primaryColor: '#6C1D45', secondaryColor: '#99D6EA',
    stadium: 'Turf Moor', founded: 1882, formation: '4-4-2',
    coach: { name: 'Scott Parker', nationality: 'England', appointed: 'Jun 2025', style: 'Organised mid-block with quick direct switches to wide players.' },
    players: [
      '1 GK Martin Dúbravka SVK 36', '2 RB Kyle Walker ENG 36', '5 CB Maxime Estève FRA 23', '4 CB Hjalmar Ekdal SWE 27',
      '3 LB Quilindschy Hartman NED 24', '8 CM Josh Cullen IRL 29', '24 CM Lesley Ugochukwu FRA 21', '7 RW Jaidon Anthony ENG 26',
      '11 LW Anass Zaroury MAR 25', '9 ST Zian Flemming NED 27', '10 ST Lyle Foster RSA 25', '20 CM Hannibal Mejbri TUN 22',
      '14 RB Connor Roberts WAL 30', '6 CB Axel Tuanzebe ENG 28', '22 CB Bashir Humphreys ENG 22', '15 LB Lucas Pires BRA 25',
      '21 GK James Trafford ENG 23', '17 LW Loum Tchaouna FRA 22', '19 ST Armando Broja ALB 24', '18 CM Jacob Bruun Larsen DEN 27',
    ],
  },
  {
    id: 'chelsea', name: 'Chelsea', shortName: 'CHE', primaryColor: '#034694', secondaryColor: '#FFFFFF',
    stadium: 'Stamford Bridge', founded: 1905, formation: '4-2-3-1',
    coach: { name: 'Enzo Maresca', nationality: 'Italy', appointed: 'Jun 2024', style: 'Possession-based build-up with inverted full-backs and a young, fluid attack.' },
    players: [
      '1 GK Robert Sánchez ESP 27', '24 RB Reece James ENG 25', '6 CB Levi Colwill ENG 23', '29 CB Wesley Fofana FRA 25',
      '3 LB Marc Cucurella ESP 27', '25 DM Moisés Caicedo ECU 24', '8 DM Enzo Fernández ARG 25', '11 RW Pedro Neto POR 25',
      '10 AM Cole Palmer ENG 24', '7 LW Jamie Gittens ENG 21', '9 ST Liam Delap ENG 22', '18 ST João Pedro BRA 24',
      '20 AM Estêvão BRA 18', '17 LW Alejandro Garnacho ARG 21', '15 CB Tosin Adarabioyo ENG 28', '23 CB Trevoh Chalobah ENG 26',
      '12 GK Filip Jörgensen DEN 23', '5 LB Benoît Badiashile FRA 24', '22 CM Dário Essugo POR 20', '14 CM Andrey Santos BRA 21',
    ],
  },
  {
    id: 'crystal-palace', name: 'Crystal Palace', shortName: 'CRY', primaryColor: '#1B458F', secondaryColor: '#C4122E',
    stadium: 'Selhurst Park', founded: 1905, formation: '3-4-2-1',
    coach: { name: 'Oliver Glasner', nationality: 'Austria', appointed: 'Feb 2024', style: 'Back-three with aggressive wing-backs and fast vertical counter-attacks.' },
    players: [
      '1 GK Dean Henderson ENG 28', '6 CB Marc Guéhi ENG 25', '5 CB Maxence Lacroix FRA 25', '26 CB Chris Richards USA 25',
      '17 RWB Daniel Muñoz COL 29', '3 LWB Tyrick Mitchell ENG 26', '16 CM Adam Wharton ENG 21', '8 CM Jefferson Lerma COL 31',
      '7 AM Ismaïla Sarr SEN 27', '11 AM Yéremy Pino ESP 23', '14 ST Jean-Philippe Mateta FRA 28', '10 AM Romain Esse ENG 20',
      '22 CM Will Hughes ENG 30', '9 ST Eddie Nketiah ENG 26', '18 CB Jaydee Canvot FRA 19', '2 RWB Nathaniel Clyne ENG 34',
      '31 GK Walter Benítez ARG 32', '20 CM Cheick Doucouré MLI 25', '29 AM Justin Devenny NIR 22', '12 LWB Borna Sosa CRO 27',
    ],
  },
  {
    id: 'everton', name: 'Everton', shortName: 'EVE', primaryColor: '#003399', secondaryColor: '#FFFFFF',
    stadium: 'Hill Dickinson Stadium', founded: 1878, formation: '4-2-3-1',
    coach: { name: 'David Moyes', nationality: 'Scotland', appointed: 'Jan 2025', style: 'Compact low-to-mid block, strong at set pieces and quick in transition.' },
    players: [
      '1 GK Jordan Pickford ENG 32', '2 RB Jake O’Brien IRL 24', '32 CB Jarrad Branthwaite ENG 23', '5 CB Michael Keane ENG 32',
      '16 LB Vitaliy Mykolenko UKR 26', '37 DM James Garner ENG 24', '27 DM Idrissa Gueye SEN 36', '7 RW Dwight McNeil ENG 26',
      '10 AM Iliman Ndiaye SEN 25', '11 LW Jack Grealish ENG 30', '9 ST Beto POR 27', '20 ST Thierno Barry FRA 23',
      '22 CM Kiernan Dewsbury-Hall ENG 24', '19 LB Adam Aznou MAR 19', '6 CB James Tarkowski ENG 33', '4 CM Tim Iroegbunam ENG 22',
      '31 GK Mark Travers IRL 26', '17 RB Nathan Patterson SCO 24', '14 ST Tyler Dibling ENG 20', '18 LW Merlin Röhl GER 23',
    ],
  },
  {
    id: 'fulham', name: 'Fulham', shortName: 'FUL', primaryColor: '#000000', secondaryColor: '#FFFFFF',
    stadium: 'Craven Cottage', founded: 1879, formation: '4-2-3-1',
    coach: { name: 'Marco Silva', nationality: 'Portugal', appointed: 'Jul 2021', style: 'Patient build-up through the midfield with creative wide rotations.' },
    players: [
      '1 GK Bernd Leno GER 33', '2 RB Kenny Tete NED 30', '5 CB Joachim Andersen DEN 29', '4 CB Calvin Bassey NGA 26',
      '33 LB Antonee Robinson USA 28', '18 DM Andreas Pereira BRA 30', '8 DM Sander Berge NOR 27', '17 RW Alex Iwobi NGA 29',
      '10 AM Emile Smith Rowe ENG 25', '11 LW Harry Wilson WAL 29', '7 ST Raúl Jiménez MEX 34', '9 ST Rodrigo Muniz BRA 24',
      '28 CM Harrison Reed ENG 30', '3 LB Ryan Sessegnon ENG 25', '15 CB Jorge Cuenca ESP 26', '22 RB Timothy Castagne BEL 30',
      '23 GK Benjamin Lecomte FRA 34', '14 LW Reiss Nelson ENG 25', '20 AM Josh King NOR 23', '16 CM Sasa Lukic SRB 29',
    ],
  },
]
