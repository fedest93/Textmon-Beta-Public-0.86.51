import { MapData } from '../../types';

export const route19: MapData = {
  id: 'route_19',
  name: 'Route 19',
  description: 'Sei in mare aperto. La spiaggia di Fucsiapoli è alle tue spalle. Le correnti sono forti e l\'acqua è piena di Pokémon. Diversi nuotatori si allenano qui.',
  connections: {
    north: 'fuchsia_city',
    south: 'route_20'
  },
  wildEncounters: [
    // Solo con Surf
    { pokemonId: 72, minLevel: 30, maxLevel: 35, rate: 60 }, // Tentacool
    { pokemonId: 73, minLevel: 35, maxLevel: 40, rate: 5 },  // Tentacruel
    { pokemonId: 120, minLevel: 30, maxLevel: 35, rate: 30 }, // Staryu
    { pokemonId: 116, minLevel: 30, maxLevel: 35, rate: 5 }   // Horsea
  ],
  trainers: [
    // Tutti gli allenatori del Percorso 19
    'swimmer_richard_sr',
    'swimmer_reece_sr',
    'swimmer_douglas_sr',
    'swimmer_david_sr'
  ],
  events: [
    {
      id: 'sign_seafoam_islands',
      trigger: 'interact',
      // Logica Engine: "CARTELLO: A sud, le Isole Spuma. Attenzione alle forti correnti."
    }
  ]
};