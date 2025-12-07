import { MapData } from '../../types';

export const route10South: MapData = {
  id: 'route_10_south',
  name: 'Route 10 (South)',
  description: 'Sei uscito dal Tunnel Roccioso. L\'aria è fresca e pulita. A sud, si intravede la sagoma inquietante della Torre Pokémon di Lavandonia.',
  connections: {
    north: 'rock_tunnel_exit', // Uscita del tunnel, gestita come teleport
    south: 'lavender_town'
  },
  wildEncounters: [
    // Stessi incontri della parte nord, ma con l'aggiunta di Krabby pescando
    { pokemonId: 21, minLevel: 13, maxLevel: 17, rate: 30 },
    { pokemonId: 100, minLevel: 14, maxLevel: 16, rate: 25 },
    { pokemonId: 81, minLevel: 14, maxLevel: 16, rate: 15 },
    { pokemonId: 23, minLevel: 11, maxLevel: 15, rate: 15 },
    { pokemonId: 27, minLevel: 11, maxLevel: 15, rate: 15 }
  ],
  trainers: [], // Nessun allenatore in questa piccola sezione
  events: [
    {
      id: 'enter_rock_tunnel_from_south',
      trigger: 'interact',
      // Logica Engine: "Entri nel Tunnel Roccioso." -> Teleport a 'rock_tunnel_b1f' (all'uscita sud)
    },
    {
      id: 'sign_lavender',
      trigger: 'interact',
      // Logica Engine: "LAVANDONIA - La nobile città viola"
    }
  ]
};