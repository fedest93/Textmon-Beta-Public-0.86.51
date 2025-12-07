import { MapData } from '../../types';

export const route22: MapData = {
  id: 'route_22',
  name: 'Route 22',
  description: 'Un sentiero lastricato a ovest di Smeraldopoli. Conduce alla prestigiosa Lega Pokémon. L\'erba alta qui nasconde Pokémon molto combattivi.',
  connections: {
    east: 'viridian_city',
    west: 'victory_road_gate' // Bloccato logicamente finché non si hanno le medaglie
  },
  wildEncounters: [
    // Rattata: Comune (Livelli 2-5)
    { pokemonId: 19, minLevel: 2, maxLevel: 5, rate: 40 },
    // Mankey: Molto comune qui (Livelli 3-5)
    { pokemonId: 56, minLevel: 3, maxLevel: 5, rate: 35 },
    // Spearow: Non comune (Livelli 3-5)
    { pokemonId: 21, minLevel: 3, maxLevel: 5, rate: 10 },
    // Nidoran F: Raro (Livelli 2-4)
    { pokemonId: 29, minLevel: 2, maxLevel: 4, rate: 5 },
    // Nidoran M: Raro (Livelli 2-4)
    { pokemonId: 32, minLevel: 2, maxLevel: 4, rate: 5 },
    // Spearow (Livello più alto): Molto raro
    { pokemonId: 21, minLevel: 5, maxLevel: 5, rate: 5 }
  ],
  trainers: ['rival_2_route22'], // Gary (Sfida opzionale)
  events: [
    {
      id: 'league_gate_guard',
      trigger: 'interact',
      // Logica Engine: 
      // "Fermo! Solo gli allenatori con 8 medaglie possono accedere alla Via Vittoria."
      // (Blocca il movimento verso ovest)
    },
    {
      id: 'rival_battle_trigger',
      trigger: 'enter',
      conditionFlag: '!rival_2_route22_defeated' 
      // Logica Engine:
      // Se il giocatore entra e non ha ancora battuto il rivale qui, 
      // Gary appare e sfida il giocatore automaticamente (o tramite dialogo forzato).
    }
  ]
};