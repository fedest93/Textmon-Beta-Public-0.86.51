import { MapData } from '../../types';

export const pokemonTower6F: MapData = {
  id: 'pokemon_tower_6f',
  name: 'Pokémon Tower - 6F',
  description: 'Sei al sesto piano. L\'aria è carica di tristezza. Davanti alle scale per l\'ultimo piano, una figura spettrale e imponente ti blocca il passaggio, emanando un\'aura di rabbia.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [
    // Gastly: Molto comune (Livelli 17-23)
    { pokemonId: 92, minLevel: 17, maxLevel: 23, rate: 70 },
    // Haunter: Comune (Livelli 20-24)
    { pokemonId: 93, minLevel: 20, maxLevel: 24, rate: 25 },
    // Cubone: Raro (Livelli 19-21)
    { pokemonId: 104, minLevel: 19, maxLevel: 21, rate: 5 }
  ],
  trainers: [
    // Le reclute Rocket appaiono solo dopo aver sconfitto Marowak
    'rocket_grunt_tower_1',
    'rocket_grunt_tower_2',
    'rocket_grunt_tower_3'
  ],
  events: [
    {
      id: 'go_to_5f',
      trigger: 'interact',
      // Logica Engine: "Scendi le scale verso il quinto piano." -> Teleport a 'pokemon_tower_5f'
    },
    {
      id: 'marowak_ghost_encounter',
      trigger: 'enter', // Si attiva automaticamente
      conditionFlag: '!marowak_ghost_defeated',
      // Logica Engine:
      // Se flag 'silph_scope_obtained' è false: "Un fantasma appare! Scappi terrorizzato!" -> Teleport a 'pokemon_tower_5f'
      // Se true: "Lo Spettroscopio rivela l'identità del fantasma! È lo spirito di un Marowak!" -> Avvia battaglia speciale con Marowak (livello 30, non catturabile)
      // Dopo la vittoria: "Lo spirito di Marowak si è placato..." -> Set flag 'marowak_ghost_defeated' -> Sblocca 'go_to_7f'
    },
    {
      id: 'go_to_7f',
      trigger: 'interact',
      conditionFlag: 'marowak_ghost_defeated',
      // Logica Engine: "Le scale per l'ultimo piano sono libere." -> Teleport a 'pokemon_tower_7f'
    },
    {
      id: 'rocket_ambush_tower',
      trigger: 'interact',
      conditionFlag: 'marowak_ghost_defeated',
      // Logica Engine:
      // "Appena lo spirito svanisce, vedi delle reclute Rocket!"
      // "Rocket: 'Cosa?! Il fantasma è sparito! E tu chi sei?'"
      // -> Avvia un gauntlet con 'rocket_grunt_tower_1', 'rocket_grunt_tower_2', 'rocket_grunt_tower_3'
    }
  ]
};