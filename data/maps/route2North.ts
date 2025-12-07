import { MapData } from '../../types';

export const route2North: MapData = {
  id: 'route_2_north',
  name: 'Route 2 (North)',
  description: 'L\'uscita del Bosco Smeraldo. L\'aria è più fresca qui. A nord si intravedono le luci di Plumbeopoli.',
  connections: {
    south: 'viridian_forest',
    north: 'pewter_city'
  },
  wildEncounters: [
    // Pidgey: Molto comune (Livelli 3-5)
    { pokemonId: 16, minLevel: 3, maxLevel: 5, rate: 45 },
    // Rattata: Molto comune (Livelli 3-5)
    { pokemonId: 19, minLevel: 3, maxLevel: 5, rate: 45 },
    // Caterpie: Raro (Livelli 4-5)
    { pokemonId: 10, minLevel: 4, maxLevel: 5, rate: 5 },
    // Weedle: Raro (Livelli 4-5)
    { pokemonId: 13, minLevel: 4, maxLevel: 5, rate: 5 }
  ],
  trainers: [], // Nessun allenatore qui
  events: [
    {
      id: 'sign_pewter',
      trigger: 'interact',
      // Logica Engine: Mostra testo "Plumbeopoli - Città Grigia come la roccia"
    }
  ]
};