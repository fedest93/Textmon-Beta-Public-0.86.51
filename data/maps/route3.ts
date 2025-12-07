import { MapData } from '../../types';

export const route3: MapData = {
  id: 'route_3',
  name: 'Route 3',
  description: 'Un sentiero montuoso e tortuoso pieno di allenatori ambiziosi. In fondo si staglia l\'imponente sagoma del Monte Luna.',
  connections: {
    west: 'pewter_city',
    east: 'mt_moon'
  },
  wildEncounters: [
    // Pidgey: Comune (Livelli 6-8)
    { pokemonId: 16, minLevel: 6, maxLevel: 8, rate: 30 },
    // Spearow: Comune (Livelli 6-8)
    { pokemonId: 21, minLevel: 6, maxLevel: 8, rate: 30 },
    // Nidoran F: Non comune (Livelli 6-7)
    { pokemonId: 29, minLevel: 6, maxLevel: 7, rate: 10 },
    // Nidoran M: Non comune (Livelli 6-7)
    { pokemonId: 32, minLevel: 6, maxLevel: 7, rate: 10 },
    // Mankey: Raro (Livelli 7-8)
    { pokemonId: 56, minLevel: 7, maxLevel: 8, rate: 10 },
    // Jigglypuff: Raro (Livelli 3-7)
    { pokemonId: 39, minLevel: 3, maxLevel: 7, rate: 10 }
  ],
  trainers: [
    'lass_janice',   // Definito in zone1.ts
    'youngster_ben'  // Definito in zone1.ts
    // Nota: In un gioco completo 1:1 qui ci sarebbero altri 6 allenatori (Youngster Calvin, Bug Catcher Greg, etc.)
  ],
  events: [
    {
      id: 'route3_sign',
      trigger: 'interact',
      // Logica Engine: "Percorso 3 - Verso il Monte Luna"
    },
    {
      id: 'mt_moon_pokecenter',
      trigger: 'interact',
      // Logica Engine: 
      // Si trova alla fine del percorso.
      // "Ti riposi un po' prima di entrare nella grotta?" -> Cura Team -> Setta Respawn.
    },
    {
      id: 'magikarp_salesman',
      trigger: 'interact',
      conditionFlag: '!magikarp_bought',
      // Logica Engine:
      // "Ehi tu! Vuoi un Pokemon speciale? Te lo vendo per soli 500$! È un affare!"
      // Se Sì e Money >= 500 -> -500$, Add Pokemon Magikarp lvl 5, Set flag 'magikarp_bought'.
      // "Non te ne pentirai!" (Heh heh heh...)
    }
  ]
};