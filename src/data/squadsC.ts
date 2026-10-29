import type { RawTeam } from './build'

export const squadsC: RawTeam[] = [
  {
    id: 'leeds-united', name: 'Leeds United', shortName: 'LEE', primaryColor: '#FFCD00', secondaryColor: '#1D428A',
    stadium: 'Elland Road', founded: 1919, formation: '4-3-3',
    coach: { name: 'Daniel Farke', nationality: 'Germany', appointed: 'Jul 2023', style: 'Front-foot possession football with energetic wingers and a high line.' },
    players: [
      '1 GK Lucas Perri BRA 28', '2 RB Jayden Bogle ENG 25', '5 CB Joe Rodon WAL 28', '6 CB Pascal Struijk NED 26',
      '3 LB Gabriel Gudmundsson SWE 26', '4 DM Ethan Ampadu WAL 25', '22 CM Anton Stach GER 27', '8 CM Sean Longstaff ENG 28',
      '10 ST Dominic Calvert-Lewin ENG 28', '7 RW Daniel James WAL 28', '11 LW Wilfried Gnonto ITA 22', '9 ST Joël Piroe NED 26',
      '14 CM Brenden Aaronson USA 25', '18 AM Noah Okafor SUI 25', '15 CB Jaka Bijol SVN 26', '16 RB Junior Firpo DOM 29',
      '13 GK Illan Meslier FRA 25', '19 LW Largie Ramazani ESP 24', '20 CM Ilia Gruev BUL 25', '17 ST Lukas Nmecha GER 27',
    ],
  },
  {
    id: 'liverpool', name: 'Liverpool', shortName: 'LIV', primaryColor: '#C8102E', secondaryColor: '#F6EB61',
    stadium: 'Anfield', founded: 1892, formation: '4-2-3-1',
    coach: { name: 'Arne Slot', nationality: 'Netherlands', appointed: 'Jun 2024', style: 'Controlled possession with a relentless counter-press and fluid front line.' },
    players: [
      '1 GK Alisson Becker BRA 33', '30 RB Jeremie Frimpong NED 25', '4 CB Virgil van Dijk NED 35', '5 CB Ibrahima Konaté FRA 26',
      '26 LB Andy Robertson SCO 31', '38 DM Ryan Gravenberch NED 24', '8 DM Dominik Szoboszlai HUN 25', '7 RW Mohamed Salah EGY 33',
      '19 AM Florian Wirtz GER 23', '18 LW Cody Gakpo NED 27', '9 ST Alexander Isak SWE 26', '10 CM Alexis Mac Allister ARG 27',
      '17 LW Federico Chiesa ITA 28', '84 RB Conor Bradley NIR 22', '2 CB Joe Gomez ENG 28', '6 LB Milos Kerkez HUN 22',
      '62 GK Giorgi Mamardashvili GEO 25', '14 ST Hugo Ekitike FRA 23', '21 CM Curtis Jones ENG 24', '16 CB Giovanni Leoni ITA 19',
    ],
  },
  {
    id: 'manchester-city', name: 'Manchester City', shortName: 'MCI', primaryColor: '#6CABDD', secondaryColor: '#1C2C5B',
    stadium: 'Etihad Stadium', founded: 1880, formation: '4-1-4-1',
    coach: { name: 'Pep Guardiola', nationality: 'Spain', appointed: 'Jul 2016', style: 'Positional play, overloads between the lines and sustained territorial dominance.' },
    players: [
      '25 GK Gianluigi Donnarumma ITA 26', '82 RB Rico Lewis ENG 21', '3 CB Rúben Dias POR 28', '24 CB Joško Gvardiol CRO 24',
      '21 LB Nico O’Reilly ENG 20', '16 DM Rodri ESP 29', '47 CM Phil Foden ENG 26', '4 CM Tijjani Reijnders NED 27',
      '11 RW Jérémy Doku BEL 23', '8 CM Mateo Kovačić CRO 32', '9 ST Erling Haaland NOR 26', '10 LW Savinho BRA 21',
      '14 AM Nico González ESP 24', '27 CM Matheus Nunes POR 27', '5 CB John Stones ENG 32', '6 CB Nathan Aké NED 31',
      '18 GK Marcus Bettinelli ENG 33', '20 CM Bernardo Silva POR 31', '42 RW Claudio Echeverri ARG 20', '33 RB Issa Kaboré BFA 24',
    ],
  },
  {
    id: 'manchester-united', name: 'Manchester United', shortName: 'MUN', primaryColor: '#DA291C', secondaryColor: '#FBE122',
    stadium: 'Old Trafford', founded: 1878, formation: '3-4-2-1',
    coach: { name: 'Ruben Amorim', nationality: 'Portugal', appointed: 'Nov 2024', style: 'Back-three system with wing-backs providing width and a direct, vertical approach.' },
    players: [
      '1 GK Senne Lammens BEL 23', '3 CB Matthijs de Ligt NED 26', '6 CB Lisandro Martínez ARG 27', '5 CB Harry Maguire ENG 32',
      '20 RWB Diogo Dalot POR 26', '23 LWB Luke Shaw ENG 30', '18 CM Casemiro BRA 33', '25 CM Manuel Ugarte URU 24',
      '8 AM Bruno Fernandes POR 31', '10 AM Matheus Cunha BRA 27', '19 AM Bryan Mbeumo CMR 26', '30 ST Benjamin Šeško SVN 22',
      '37 CM Kobbie Mainoo ENG 20', '16 LWB Patrick Dorgu DEN 21', '15 CB Leny Yoro FRA 20', '2 RWB Noussair Mazraoui MAR 28',
      '22 GK Altay Bayındır TUR 27', '11 AM Joshua Zirkzee NED 25', '7 AM Mason Mount ENG 26', '4 CM Jack Fletcher SCO 18',
    ],
  },
  {
    id: 'newcastle', name: 'Newcastle United', shortName: 'NEW', primaryColor: '#241F20', secondaryColor: '#FFFFFF',
    stadium: 'St James’ Park', founded: 1892, formation: '4-3-3',
    coach: { name: 'Eddie Howe', nationality: 'England', appointed: 'Nov 2021', style: 'High-intensity pressing, physical midfield and fast wide transitions.' },
    players: [
      '1 GK Nick Pope ENG 33', '2 RB Tino Livramento ENG 23', '5 CB Fabian Schär SUI 34', '4 CB Sven Botman NED 25',
      '33 LB Dan Burn ENG 33', '39 DM Bruno Guimarães BRA 28', '7 CM Joelinton BRA 29', '8 CM Sandro Tonali ITA 25',
      '10 LW Anthony Gordon ENG 25', '14 ST Nick Woltemade GER 24', '11 RW Harvey Barnes ENG 28', '9 ST Yoane Wissa COD 29',
      '67 CM Lewis Miley ENG 19', '12 RB Kieran Trippier ENG 36', '6 CB Malick Thiaw GER 24', '3 LB Lewis Hall ENG 21',
      '22 GK Aaron Ramsdale ENG 27', '17 RW Jacob Murphy ENG 30', '23 RW Anthony Elanga SWE 24', '18 CM Joe Willock ENG 26',
    ],
  },
]
