import type { RawTeam } from './build'

export const squadsA: RawTeam[] = [
  {
    id: 'arsenal', name: 'Arsenal', shortName: 'ARS', primaryColor: '#EF0107', secondaryColor: '#FFFFFF',
    stadium: 'Emirates Stadium', founded: 1886, formation: '4-3-3',
    coach: { name: 'Mikel Arteta', nationality: 'Spain', appointed: 'Dec 2019', style: 'Positional play, aggressive counter-press and elite set pieces.' },
    players: [
      '1 GK David Raya ESP 30', '4 RB Ben White ENG 28', '2 CB William Saliba FRA 25', '6 CB Gabriel Magalhães BRA 28',
      '12 LB Jurriën Timber NED 25', '41 DM Declan Rice ENG 27', '8 CM Martin Ødegaard NOR 27', '36 CM Martín Zubimendi ESP 27',
      '7 RW Bukayo Saka ENG 24', '9 ST Viktor Gyökeres SWE 28', '19 LW Leandro Trossard BEL 31', '11 LW Gabriel Martinelli BRA 25',
      '23 ST Gabriel Jesus BRA 29', '20 CM Mikel Merino ESP 30', '5 CB Piero Hincapié ECU 24',
      '35 LB Myles Lewis-Skelly ENG 19', '49 AM Ethan Nwaneri ENG 19', '22 GK Kepa Arrizabalaga ESP 31', '15 CB Cristhian Mosquera ESP 22', '10 AM Eberechi Eze ENG 28',
    ],
  },
  {
    id: 'aston-villa', name: 'Aston Villa', shortName: 'AVL', primaryColor: '#670E36', secondaryColor: '#95BFE5',
    stadium: 'Villa Park', founded: 1874, formation: '4-4-2',
    coach: { name: 'Unai Emery', nationality: 'Spain', appointed: 'Oct 2022', style: 'High defensive line, structured pressing and quick vertical transitions.' },
    players: [
      '23 GK Emiliano Martínez ARG 33', '2 RB Matty Cash POL 28', '4 CB Ezri Konsa ENG 28', '14 CB Pau Torres ESP 29',
      '12 LB Lucas Digne FRA 32', '8 CM Youri Tielemans BEL 29', '6 CM Boubacar Kamara FRA 26', '7 LW John McGinn SCO 31',
      '27 RW Morgan Rogers ENG 23', '11 ST Ollie Watkins ENG 30', '9 ST Donyell Malen NED 26', '41 CM Jacob Ramsey ENG 25',
      '10 AM Emiliano Buendía ARG 29', '3 RB Ian Maatsen NED 23', '5 CB Tyrone Mings ENG 33', '26 LB Andrés García ESP 22',
      '22 CM Lamare Bogarde NED 22', '40 GK Marco Bizot NED 34', '19 LW Leon Bailey JAM 28', '18 CM Amadou Onana BEL 24',
    ],
  },
  {
    id: 'bournemouth', name: 'AFC Bournemouth', shortName: 'BOU', primaryColor: '#DA291C', secondaryColor: '#000000',
    stadium: 'Vitality Stadium', founded: 1899, formation: '4-2-3-1',
    coach: { name: 'Andoni Iraola', nationality: 'Spain', appointed: 'Jun 2023', style: 'Intense man-oriented pressing with direct, high-tempo attacks.' },
    players: [
      '1 GK Djordje Petrović SRB 26', '27 RB Julio Soler ARG 22', '5 CB Marcos Senesi ARG 28', '4 CB Bafodé Diakité FRA 25',
      '3 LB Adrien Truffert FRA 24', '16 DM Alex Scott ENG 22', '8 DM Tyler Adams USA 27', '10 RW Justin Kluivert NED 27',
      '11 AM Marcus Tavernier ENG 26', '9 LW Antoine Semenyo GHA 26', '19 ST Evanilson BRA 26', '7 AM Ryan Christie SCO 31',
      '18 ST Eli Junior Kroupi FRA 19', '2 RB Adam Smith ENG 34', '6 CB Veljko Milosavljević SRB 27', '20 CM Lewis Cook ENG 29',
      '12 GK Fraser Forster ENG 38', '17 LW Amine Adli MAR 25', '14 CB James Hill ENG 24', '24 CM Alex Jimenez ESP 20',
    ],
  },
  {
    id: 'brentford', name: 'Brentford', shortName: 'BRE', primaryColor: '#E30613', secondaryColor: '#FFB81C',
    stadium: 'Gtech Community Stadium', founded: 1889, formation: '4-3-3',
    coach: { name: 'Keith Andrews', nationality: 'Ireland', appointed: 'Jul 2025', style: 'Set-piece specialists with data-led recruitment and direct wide play.' },
    players: [
      '1 GK Caoimhín Kelleher IRL 27', '2 RB Michael Kayode ITA 21', '4 CB Sepp van den Berg NED 24', '5 CB Nathan Collins IRL 25',
      '3 LB Rico Henry ENG 28', '6 CM Christian Nørgaard DEN 31', '8 CM Jordan Henderson ENG 36', '10 CM Mathias Jensen DEN 30',
      '19 RW Kevin Schade GER 24', '9 ST Igor Thiago BRA 24', '7 LW Mikkel Damsgaard DEN 25', '11 LW Keane Lewis-Potter ENG 24',
      '20 DM Vitaly Janelt GER 27', '15 RB Aaron Hickey SCO 23', '22 CB Ethan Pinnock JAM 32', '33 LB Jayden Meghoma ENG 20',
      '13 GK Hákon Valdimarsson ISL 24', '21 AM Fabio Carvalho POR 23', '12 ST Dango Ouattara BFA 23', '18 CM Yunus Konak TUR 20',
    ],
  },
  {
    id: 'brighton', name: 'Brighton & Hove Albion', shortName: 'BHA', primaryColor: '#0057B8', secondaryColor: '#FFFFFF',
    stadium: 'American Express Stadium', founded: 1901, formation: '4-2-3-1',
    coach: { name: 'Fabian Hürzeler', nationality: 'Germany', appointed: 'Jun 2024', style: 'Possession-heavy build-up with fluid rotations and a high press.' },
    players: [
      '1 GK Bart Verbruggen NED 23', '34 RB Joël Veltman NED 33', '5 CB Lewis Dunk ENG 34', '29 CB Jan Paul van Hecke NED 25',
      '30 LB Pervis Estupiñán ECU 27', '8 DM Carlos Baleba CMR 21', '20 DM Diego Gómez PAR 22', '10 RW Kaoru Mitoma JPN 28',
      '7 AM Yasin Ayari SWE 22', '11 LW Georginio Rutter FRA 23', '18 ST Danny Welbeck ENG 34', '9 ST Stefanos Tzimas GRE 19',
      '24 AM Matt O’Riley DEN 25', '3 RB Mats Wieffer NED 26', '6 CB Adam Webster ENG 31', '4 CB Igor Julio BRA 27',
      '23 GK Jason Steele ENG 35', '22 LW Facundo Buonanotte ARG 21', '28 AM Brajan Gruda GER 21', '13 RW Yankuba Minteh GAM 21',
    ],
  },
]
