import { MapData } from '../../types';

export const pokemonTower4F: MapData = {
  id: 'pokemon_tower_4f',
  name: 'Pokémon Tower - 4F',
  description: 'Sei al quarto piano. La nebbia spettrale è più fitta. Altre allenatrici possedute ti bloccano il cammino, i loro occhi brillano nel buio.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [
    // Gastly: Onnipresente (Livelli 14-20)
    { pokemonId: 92, minLevel: 14, maxLevel: 20, rate: 85 },
    // Cubone: Raro (Livelli 16-18)
    { pokemonId: 104, minLevel: 16, maxLevel: 18, rate: 15 }
  ],
  trainers: [
    // Le Channeler di questo piano
    'channeler_laurel',
    'channeler_jody', // Aggiunta per densità
    'channeler_paula'  // Aggiunta per densità
  ],
  events: [
    {
      id: 'go_to_3f',
      trigger: 'interact',
      // Logica Engine: "Scendi le scale verso il terzo piano." -> Teleport a 'pokemon_tower_3f'
    },
    {
      id: 'go_to_5f',
      trigger: 'interact',
      // Logica Engine: "Sali le scale verso il quinto piano." -> Teleport a 'pokemon_tower_5f'
    },
    {
      id: 'channeler_encounter_3',
      trigger: 'interact',
      conditionFlag: '!channeler_laurel_defeated',
      // Logica Engine: "Channeler: 'Kekeke...'" -> Avvia battaglia con 'channeler_laurel'
    },
    {
      id: 'item_elixir',
      trigger: 'interact',
      conditionFlag: '!item_pt4f_elixir_taken',
      // Logica Engine: "Hai trovato un Elisir!" -> Add Item 'elixir' -> Set flag true
    }
  ]
};