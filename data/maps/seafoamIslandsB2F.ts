import { MapData } from '../../types';

export const seafoamIslandsB2F: MapData = {
  id: 'seafoam_islands_b2f',
  name: 'Seafoam Islands - B2F',
  description: 'Sei nel secondo piano interrato. Il ghiaccio ricopre quasi ogni superficie. Il suono dell\'acqua che scorre è più forte qui. Il percorso si divide in più direzioni.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [
    // Zubat: Comune (Livelli 24-28)
    { pokemonId: 41, minLevel: 24, maxLevel: 28, rate: 30 },
    // Golbat: Raro (Livello 32)
    { pokemonId: 42, minLevel: 32, maxLevel: 32, rate: 5 },
    // Psyduck: Comune (Livelli 30-34)
    { pokemonId: 54, minLevel: 30, maxLevel: 34, rate: 20 },
    // Golduck: Raro (Livello 36)
    { pokemonId: 55, minLevel: 36, maxLevel: 36, rate: 5 },
    // Seel: Comune (Livelli 30-34)
    { pokemonId: 86, minLevel: 30, maxLevel: 34, rate: 20 },
    // Slowpoke: Comune (Livelli 30-34)
    { pokemonId: 79, minLevel: 30, maxLevel: 34, rate: 20 }
  ],
  trainers: [],
  events: [
    {
      id: 'ladder_to_b1f',
      trigger: 'interact',
      // Logica Engine: "Risali la scala verso il primo piano interrato." -> Teleport a 'seafoam_islands_b1f'
    },
    {
      id: 'ladder_to_b3f',
      trigger: 'interact',
      // Logica Engine: "Scendi ancora più in profondità, verso il cuore della grotta." -> Teleport a 'seafoam_islands_b3f'
    },
    {
      id: 'boulder_puzzle_4',
      trigger: 'interact',
      // Logica Engine:
      // "Un masso blocca un canale d'acqua."
      // Se hai Forza: "Spingi il masso nel buco." -> Set flag 'boulder_4_pushed'
    },
    {
      id: 'item_water_stone_sf',
      trigger: 'interact',
      conditionFlag: '!item_sf_water_stone_taken',
      // Logica Engine: "Hai trovato una Pietraidrica!" -> Add Item 'water_stone' -> Set flag true
    }
  ]
};