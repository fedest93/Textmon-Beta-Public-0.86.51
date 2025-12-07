import { MapData } from '../../types';

export const route1: MapData = {
  id: 'route_1',
  name: 'Route 1',
  description: 'Un sentiero collinare che collega Pallet Town a Smeraldopoli. L\'erba alta ondeggia al vento, nascondendo piccoli Pokémon.',
  connections: {
    south: 'pallet_town',
    north: 'viridian_city'
  },
  wildEncounters: [
    // Pidgey: Molto comune (Livelli 2-5)
    { pokemonId: 16, minLevel: 2, maxLevel: 5, rate: 50 },
    // Rattata: Molto comune (Livelli 2-4)
    { pokemonId: 19, minLevel: 2, maxLevel: 4, rate: 50 }
  ],
  trainers: [], // Nessun allenatore nel Percorso 1 originale, quindi niente Gauntlet qui.
  events: [
    {
      id: 'potion_npc',
      trigger: 'interact',
      // Logica Engine: 
      // Check flag 'route1_potion_received'. 
      // Se false: "Ehi! Lavori al PokeMarket? Ah no? Tieni, prendi questo per il viaggio!" -> Add Item 'potion' -> Set flag true.
      // Se true: "Le pozioni sono utili se i tuoi Pokemon sono feriti."
    },
    {
      id: 'sign_route1',
      trigger: 'interact',
      // Logica Engine: Mostra testo "Percorso 1: Pallet Town - Smeraldopoli"
    }
  ]
};