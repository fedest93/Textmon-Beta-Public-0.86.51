import { MapData } from '../../types';

export const route2South: MapData = {
  id: 'route_2_south',
  name: 'Route 2 (South)',
  description: 'Un breve sentiero che collega Smeraldopoli all\'ingresso del Bosco Smeraldo. L\'erba è alta e gli alberi a nord diventano sempre più fitti.',
  connections: {
    south: 'viridian_city',
    north: 'viridian_forest'
  },
  wildEncounters: [
    // Pidgey: Molto comune (Livelli 2-5)
    { pokemonId: 16, minLevel: 2, maxLevel: 5, rate: 45 },
    // Rattata: Molto comune (Livelli 2-5)
    { pokemonId: 19, minLevel: 2, maxLevel: 5, rate: 45 },
    // Caterpie: Raro (Livelli 3-5) - Inseriti entrambi per completezza
    { pokemonId: 10, minLevel: 3, maxLevel: 5, rate: 5 },
    // Weedle: Raro (Livelli 3-5)
    { pokemonId: 13, minLevel: 3, maxLevel: 5, rate: 5 }
  ],
  trainers: [], // Nessun allenatore in questa sezione specifica
  events: [
    {
      id: 'sign_route2',
      trigger: 'interact',
      // Logica Engine: Mostra testo "Percorso 2: Smeraldopoli - Plumbeopoli"
    }
  ]
};