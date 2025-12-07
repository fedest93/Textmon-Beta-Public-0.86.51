import { MapData } from '../../types';

export const route6: MapData = {
  id: 'route_6',
  name: 'Route 6',
  description: 'Un sentiero erboso che scende verso il porto di Aranciopoli. L\'aria è salmastra. Diversi allenatori si stanno allenando nell\'erba alta.',
  connections: {
    north: 'saffron_city_gate', // Bloccato dalle guardie
    south: 'vermilion_city'
  },
  wildEncounters: [
    // Pidgey: Molto comune (Livelli 13-16)
    { pokemonId: 16, minLevel: 13, maxLevel: 16, rate: 30 },
    // Rattata: Comune (Livelli 11-14)
    { pokemonId: 19, minLevel: 11, maxLevel: 14, rate: 25 },
    // Mankey: Non comune (Livelli 13-15)
    { pokemonId: 56, minLevel: 13, maxLevel: 15, rate: 15 },
    // Oddish: Comune (Livelli 13-15)
    { pokemonId: 43, minLevel: 13, maxLevel: 15, rate: 15 },
    // Bellsprout: Comune (Livelli 13-15)
    { pokemonId: 69, minLevel: 13, maxLevel: 15, rate: 15 }
  ],
  trainers: [
    'bug_catcher_ricky_r6',
    'picnicker_nancy_r6',
    'camper_jeff_r6'
  ],
  events: [
    {
      id: 'underground_path_exit',
      trigger: 'interact',
      // Logica Engine:
      // "Passaggio Sotterraneo per il Percorso 5"
      // Scelta: [Entra, Non Entrare] -> Se Entra, teleport a 'underground_path_north_south'
    },
    {
      id: 'saffron_guard_south',
      trigger: 'interact',
      // Logica Engine:
      // "Ho una sete terribile... Non posso farti passare finché non bevo qualcosa."
      // (Blocca il passaggio a Nord verso Zafferanopoli)
    },
    {
      id: 'sign_vermilion',
      trigger: 'interact',
      // Logica Engine: "ARANCIOPOLI - Il porto del tramonto"
    }
  ]
};