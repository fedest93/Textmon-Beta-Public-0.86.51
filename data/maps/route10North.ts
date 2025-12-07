import { MapData } from '../../types';

export const route10North: MapData = {
  id: 'route_10_north',
  name: 'Route 10 (North)',
  description: 'La fine del sentiero montuoso. Un Centro Pokémon offre riposo agli allenatori stanchi. Accanto, l\'ingresso oscuro di una grotta, il Tunnel Roccioso, attende.',
  connections: {
    west: 'route_9'
    // La connessione a sud (verso Lavandonia) è dall'altra parte del tunnel
  },
  wildEncounters: [
    // Spearow: Molto comune (Livelli 13-17)
    { pokemonId: 21, minLevel: 13, maxLevel: 17, rate: 30 },
    // Voltorb: Comune (Livelli 14-16) - Unico posto dove trovarlo!
    { pokemonId: 100, minLevel: 14, maxLevel: 16, rate: 25 },
    // Magnemite: Non comune (Livelli 14-16)
    { pokemonId: 81, minLevel: 14, maxLevel: 16, rate: 15 },
    // Ekans: Comune (Livelli 11-15)
    { pokemonId: 23, minLevel: 11, maxLevel: 15, rate: 15 },
    // Sandshrew: Comune (Livelli 11-15)
    { pokemonId: 27, minLevel: 11, maxLevel: 15, rate: 15 }
  ],
  trainers: [
    'picnicker_heidi_r10' // Un'allenatrice solitaria prima del tunnel
  ],
  events: [
    {
      id: 'rock_tunnel_pokecenter',
      trigger: 'interact',
      // Logica Engine:
      // "Benvenuto al Centro Pokémon! Vuoi curare la tua squadra prima di entrare nel Tunnel Roccioso?"
      // -> Cura Team, Setta Respawn Point.
    },
    {
      id: 'enter_rock_tunnel',
      trigger: 'interact',
      // Logica Engine:
      // "Entri nel Tunnel Roccioso. È buio pesto!"
      // Se non hai Flash: "Non si vede a un palmo dal naso! Sarà difficile proseguire."
      // -> Teleport a 'rock_tunnel_1f'
    },
    {
      id: 'sign_rock_tunnel',
      trigger: 'interact',
      // Logica Engine: "CARTELLO: TUNNEL ROCCIOSO - Attenzione, buio pesto all'interno."
    }
  ]
};