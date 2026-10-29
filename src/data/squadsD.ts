import type { RawTeam } from './build'

export const squadsD: RawTeam[] = [
  {
    id: 'nottingham-forest', name: 'Nottingham Forest', shortName: 'NFO', primaryColor: '#DD0000', secondaryColor: '#FFFFFF',
    stadium: 'City Ground', founded: 1865, formation: '4-2-3-1',
    coach: { name: 'Sean Dyche', nationality: 'England', appointed: 'Oct 2025', style: 'Pragmatic low block, strong aerial presence and direct counters.' },
    players: [
      '1 GK Matz Sels BEL 33', '22 RB Ola Aina NGA 29', '31 CB Nikola Milenković SRB 28', '4 CB Murillo BRA 23',
      '34 LB Neco Williams WAL 24', '8 DM Elliot Anderson ENG 23', '10 DM Ibrahim Sangaré CIV 28', '7 RW Callum Hudson-Odoi ENG 25',
      '14 AM Morgan Gibbs-White ENG 26', '11 LW Omari Hutchinson ENG 22', '9 ST Chris Wood NZL 33', '19 ST Taiwo Awoniyi NGA 28',
      '20 LW Jota Silva POR 25', '3 CB Morato BRA 24', '6 CB Willy Boly CIV 35', '15 CM Ryan Yates ENG 28',
      '26 GK John Victor BRA 30', '16 CM Nicolas Dominguez ARG 27', '21 RW Dan Ndoye SUI 25', '23 CM James Ward-Prowse ENG 31',
    ],
  },
  {
    id: 'sunderland', name: 'Sunderland', shortName: 'SUN', primaryColor: '#EB172B', secondaryColor: '#FFFFFF',
    stadium: 'Stadium of Light', founded: 1879, formation: '4-2-3-1',
    coach: { name: 'Régis Le Bris', nationality: 'France', appointed: 'Jun 2025', style: 'Youthful, energetic side that presses high and plays quickly through the wings.' },
    players: [
      '1 GK Robin Roefs NED 22', '2 RB Trai Hume NIR 23', '5 CB Dan Ballard NIR 26', '6 CB Nordi Mukiele FRA 28',
      '3 LB Reinildo Mandava MOZ 31', '4 DM Granit Xhaka SUI 33', '8 DM Habib Diarra SEN 22', '7 RW Chemsdine Talbi MAR 20',
      '10 AM Enzo Le Fée FRA 25', '11 LW Romaine Mundle ENG 23', '9 ST Brian Brobbey NED 23', '20 ST Wilson Isidor FRA 25',
      '17 RW Simon Adingra CIV 23', '12 RB Lutsharel Geertruida NED 25', '15 CB Omar Alderete PAR 28', '14 CB Luke O’Nien ENG 31',
      '13 GK Anthony Patterson ENG 25', '21 CM Noah Sadiki COD 21', '19 LW Bertrand Traoré BFA 30', '22 LB Dennis Cirkin ENG 23',
    ],
  },
  {
    id: 'tottenham', name: 'Tottenham Hotspur', shortName: 'TOT', primaryColor: '#132257', secondaryColor: '#FFFFFF',
    stadium: 'Tottenham Hotspur Stadium', founded: 1882, formation: '4-3-3',
    coach: { name: 'Thomas Frank', nationality: 'Denmark', appointed: 'Jun 2025', style: 'Well-drilled mid-block with strong set pieces and rapid wide counter-attacks.' },
    players: [
      '1 GK Guglielmo Vicario ITA 29', '23 RB Pedro Porro ESP 26', '37 CB Micky van de Ven NED 24', '17 CB Cristian Romero ARG 28',
      '13 LB Destiny Udogie ITA 23', '5 DM Pape Matar Sarr SEN 23', '8 CM Yves Bissouma MLI 29', '30 CM Rodrigo Bentancur URU 28',
      '10 CM James Maddison ENG 29', '7 RW Xavi Simons NED 22', '9 ST Richarlison BRA 28', '19 LW Mohammed Kudus GHA 25',
      '11 ST Mathys Tel FRA 20', '22 RW Brennan Johnson WAL 24', '6 CB Radu Drăgușin ROU 24', '14 CM Archie Gray ENG 19',
      '31 GK Antonin Kinsky CZE 22', '16 CB Kevin Danso AUT 27', '28 LB Djed Spence ENG 25', '15 ST Dominic Solanke ENG 28',
    ],
  },
  {
    id: 'west-ham', name: 'West Ham United', shortName: 'WHU', primaryColor: '#7A263A', secondaryColor: '#1BB1E7',
    stadium: 'London Stadium', founded: 1895, formation: '4-2-3-1',
    coach: { name: 'Nuno Espírito Santo', nationality: 'Portugal', appointed: 'Oct 2025', style: 'Compact defensive shape with fast transitions through direct runners.' },
    players: [
      '1 GK Alphonse Areola FRA 32', '2 RB Aaron Wan-Bissaka ENG 28', '4 CB Max Kilman ENG 28', '5 CB Jean-Clair Todibo FRA 26',
      '12 LB El Hadji Malick Diouf SEN 21', '28 DM Tomás Soucek CZE 30', '8 DM Mateus Fernandes POR 21', '7 RW Crysencio Summerville NED 24',
      '10 AM Lucas Paquetá BRA 28', '20 LW Jarrod Bowen ENG 29', '9 ST Niclas Füllkrug GER 32', '14 ST Callum Wilson ENG 33',
      '11 LW Luis Guilherme BRA 19', '25 CB Axel Disasi FRA 27', '15 RB Kyle Walker-Peters ENG 28', '3 CB Konstantinos Mavropanos GRE 28',
      '23 GK Mads Hermansen DEN 25', '27 CM Soungoutou Magassa FRA 22', '18 AM Andy Irving AUS 25', '16 LB Emerson Palmieri ITA 31',
    ],
  },
  {
    id: 'wolves', name: 'Wolverhampton Wanderers', shortName: 'WOL', primaryColor: '#FDB913', secondaryColor: '#231F20',
    stadium: 'Molineux Stadium', founded: 1877, formation: '3-5-2',
    coach: { name: 'Rob Edwards', nationality: 'Wales', appointed: 'Nov 2025', style: 'Back-three with wing-backs, compact midfield and quick forward outlets.' },
    players: [
      '1 GK José Sá POR 32', '3 CB Toti Gomes POR 26', '14 CB Yerson Mosquera COL 24', '4 CB Emmanuel Agbadou CIV 28',
      '37 RWB Matt Doherty IRL 33', '27 LWB Hugo Bueno ESP 23', '7 CM André BRA 24', '8 DM João Gomes BRA 24',
      '10 CM Jean-Ricner Bellegarde FRA 27', '9 ST Jørgen Strand Larsen NOR 25', '19 ST Hee-chan Hwang KOR 29', '11 ST Tolu Arokodare NGA 25',
      '15 CM Marshall Munetsi ZIM 29', '2 RWB Jackson Tchatchoua CMR 24', '5 CB Ladislav Krejčí CZE 26', '21 CM Tommy Doyle ENG 24',
      '25 GK Sam Johnstone ENG 32', '17 LWB Rodrigo Gomes POR 22', '20 AM Fer López ESP 21', '12 CB Santiago Bueno URU 27',
    ],
  },
]
