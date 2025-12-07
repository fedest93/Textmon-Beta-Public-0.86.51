import { MapData } from '../../types';

export const pokemonTower3F: MapData = {
  id: 'pokemon_tower_3f',
  name: 'Pokémon Tower - 3F',
  description: 'Sei al terzo piano. L\'aria è ancora più fredda. Diverse allenatrici con uno sguardo assente fluttuano tra le lapidi, come se fossero possedute.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [
    // Gastly: Onnipresente (Livelli 13-19)
    { pokemonId: 92, minLevel: 13, maxLevel: 19, rate: 85 },
    // Cubone: Raro (Livelli 15-17)
    { pokemonId: 104, minLevel: 15, maxLevel: 17, rate: 15 }
  ],
  trainers: [
    // Le Channeler di questo piano
    'channeler_patricia',
    'channeler_carly'
  ],
  events: [
    {
      id: 'go_to_2f',
      trigger: 'interact',
      // Logica Engine: "Scendi le scale verso il secondo piano." -> Teleport a 'pokemon_tower_2f'
    },
    {
      id: 'go_to_4f',
      trigger: 'interact',
      // Logica Engine: "Sali le scale verso il quarto piano." -> Teleport a 'pokemon_tower_4f'
    },
    {
      id: 'channeler_encounter_1',
      trigger: 'interact',
      conditionFlag: '!channeler_patricia_defeated',
      // Logica Engine: "Channeler: 'Vattene... Spiriti maligni...'" -> Avvia battaglia con 'channeler_patricia'
    },
    {
      id: 'channeler_encounter_2',
      trigger: 'interact',
      conditionFlag: '!channeler_carly_defeated',
      // Logica Engine: "Channeler: 'Zombiii! Zombiii!'" -> Avvia battaglia con 'channeler_carly'
    },
    {
      id: 'item_escape_rope',
      trigger: 'interact',
      conditionFlag: '!item_pt3f_rope_taken',
      // Logica Engine: "Hai trovato una Fune di Fuga!" -> Add Item 'escape_rope' -> Set flag true
    },
    {
      id: 'purified_zone',
      trigger: 'interact',
      // Logica Engine:
      // "C'è un sigillo protettivo sul pavimento. Ti senti al sicuro qui."
      // (In questa zona, gli incontri selvatici sono disattivati)
    }
  ]
};