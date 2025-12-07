import { MapData } from '../../types';

export const route18: MapData = {
  id: 'route_18',
  name: 'Route 18',
  description: 'La Pista Ciclabile termina qui, in un\'area erbosa vicino al mare. A est si trova la città di Fucsiapoli. Diversi allenatori di Pokémon uccello si allenano qui.',
  connections: {
    west: 'route_17', // Ingresso alla Pista Ciclabile
    east: 'fuchsia_city'
  },
  wildEncounters: [
    // Raticate: Comune (Livelli 20-24)
    { pokemonId: 20, minLevel: 20, maxLevel: 24, rate: 30 },
    // Spearow: Comune (Livelli 20-22)
    { pokemonId: 21, minLevel: 20, maxLevel: 22, rate: 25 },
    // Fearow: Raro (Livello 23)
    { pokemonId: 22, minLevel: 23, maxLevel: 23, rate: 5 },
    // Doduo: Molto comune (Livelli 20-24)
    { pokemonId: 84, minLevel: 20, maxLevel: 24, rate: 40 }
  ],
  trainers: [
    'bird_keeper_jacob_r18',
    'bird_keeper_wilton_r18',
    'bird_keeper_ramiro_r18'
  ],
  events: [
    {
      id: 'cycling_road_gate_west',
      trigger: 'interact',
      // Logica Engine:
      // "Guardia: 'Questa è la Pista Ciclabile! Ti serve una bicicletta per entrare!'"
      // Se hai 'bicycle': "Guardia: 'Oh, hai una bici! Prego, entra pure!'" -> Teleport a 'route_17'
    },
    {
      id: 'sign_fuchsia',
      trigger: 'interact',
      // Logica Engine: "FUCSIAPOLI - La città del paradiso rosa"
    }
  ]
};