import { MapData } from '../../types';

export const rockTunnel1F: MapData = {
  id: 'rock_tunnel_1f',
  name: 'Rock Tunnel - 1F',
  description: 'Sei nel primo piano del Tunnel Roccioso. È buio pesto e freddo. Senti lo sbattere d\'ali di innumerevoli Zubat. Il sentiero si biforca in più direzioni.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [
    // Zubat: Onnipresente (Livelli 11-17)
    { pokemonId: 41, minLevel: 11, maxLevel: 17, rate: 50 },
    // Geodude: Comune (Livelli 13-16)
    { pokemonId: 74, minLevel: 13, maxLevel: 16, rate: 25 },
    // Machop: Non comune (Livelli 15-17)
    { pokemonId: 66, minLevel: 15, maxLevel: 17, rate: 15 },
    // Onix: Raro (Livelli 13-15)
    { pokemonId: 95, minLevel: 13, maxLevel: 15, rate: 10 }
  ],
  trainers: [
    // Allenatori sparsi in questo piano
    'pokemaniac_ashton_rt',
    'hiker_allen_rt',
    'hiker_eric_rt',
    'jr_trainer_f_dana_rt'
  ],
  events: [
    {
      id: 'exit_to_route_10_north',
      trigger: 'interact',
      // Logica Engine: "Vedi la luce dell'uscita. Torni al Percorso 10." -> Teleport a 'route_10_north'
    },
    {
      id: 'exit_to_route_10_south',
      trigger: 'interact',
      // Logica Engine: "Vedi l'uscita sud verso Lavandonia!" -> Teleport a 'route_10_south'
    },
    {
      id: 'ladder_to_b1f',
      trigger: 'interact',
      // Logica Engine: "Trovi una scala a pioli che scende ancora più in profondità." -> Teleport a 'rock_tunnel_b1f'
    },
    {
      id: 'path_choice_1',
      trigger: 'interact',
      // Logica Engine:
      // "Il sentiero si divide. A nord senti odore di stantio, a sud senti delle voci."
      // -> Scelta Multipla: [Vai a Nord, Vai a Sud]
      // -> Se Nord: "Ti imbatti in un Pokemaniac!" -> Avvia battaglia con 'pokemaniac_ashton_rt'
      // -> Se Sud: "Un Hiker ti blocca la strada!" -> Avvia battaglia con 'hiker_allen_rt'
    },
    {
      id: 'hidden_item_repel',
      trigger: 'interact',
      conditionFlag: '!item_rt1f_repel_taken',
      // Logica Engine: "Frugando tra le rocce, trovi un Repellente!" -> Add Item 'repel' -> Set flag true
    }
  ]
};