import { MapData } from '../../types';

export const route21: MapData = {
  id: 'route_21',
  name: 'Route 21',
  description: 'Un lungo canale marino che scorre verso nord. A sud si vede il vulcano dell\'Isola Cannella, mentre a nord si intravede la familiare Pallet Town. Ci sono piccole strisce d\'erba lungo la costa.',
  connections: {
    north: 'pallet_town',
    south: 'cinnabar_island'
  },
  wildEncounters: [
    // Erba
    { pokemonId: 19, minLevel: 21, maxLevel: 25, rate: 40 }, // Rattata
    { pokemonId: 20, minLevel: 25, maxLevel: 30, rate: 10 }, // Raticate
    { pokemonId: 114, minLevel: 22, maxLevel: 28, rate: 50 }, // Tangela
    // Surf
    { pokemonId: 72, minLevel: 20, maxLevel: 35, rate: 90 }, // Tentacool
    { pokemonId: 73, minLevel: 35, maxLevel: 40, rate: 10 }  // Tentacruel
  ],
  trainers: [
    // Tutti gli allenatori del Percorso 21
    'swimmer_spencer_sr', // Riciclato per coerenza
    'fisherman_claude_r21',
    'swimmer_harold_r21',
    'fisherman_nolan_r21',
    'swimmer_jerome_r21'
  ],
  events: [
    {
      id: 'sign_pallet_town',
      trigger: 'interact',
      // Logica Engine: "CARTELLO: A nord, Pallet Town. Il luogo delle origini."
    }
  ]
};