import { MapData } from '../../types';

export const route4: MapData = {
  id: 'route_4',
  name: 'Route 4',
  description: 'Un sentiero roccioso in discesa. Hai saltato i gradoni uscendo dal Monte Luna: la via del ritorno è ormai irraggiungibile. Davanti a te si estende la pianura verso Celestopoli.',
  connections: {
    // west: 'mt_moon', // RIMOSSO: Non si può tornare indietro a causa dei gradoni!
    east: 'cerulean_city'
  },
  wildEncounters: [
    // Rattata: Molto comune (Livelli 8-12)
    { pokemonId: 19, minLevel: 8, maxLevel: 12, rate: 40 },
    // Spearow: Comune (Livelli 8-12)
    { pokemonId: 21, minLevel: 8, maxLevel: 12, rate: 35 },
    // Ekans: Non comune (Livelli 6-10)
    { pokemonId: 23, minLevel: 6, maxLevel: 10, rate: 15 },
    // Mankey: Raro (Livelli 10-12)
    { pokemonId: 56, minLevel: 10, maxLevel: 12, rate: 10 }
  ],
  trainers: [], 
  events: [
    {
      id: 'tutor_mega_punch',
      trigger: 'interact',
      conditionFlag: '!move_mega_punch_learned',
      // Logica Engine: Insegna Mega Pugno
    },
    {
      id: 'tutor_mega_kick',
      trigger: 'interact',
      conditionFlag: '!move_mega_kick_learned',
      // Logica Engine: Insegna Mega Calcio
    },
    {
      id: 'item_tm04',
      trigger: 'interact',
      conditionFlag: '!item_tm04_taken',
      // Logica Engine: Trova MT04
    },
    {
      id: 'sign_cerulean',
      trigger: 'interact',
      // Logica Engine: "Celestopoli - Città circondata dall'acqua blu"
    }
  ]
};