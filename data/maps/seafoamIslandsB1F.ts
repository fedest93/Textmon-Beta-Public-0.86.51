import { MapData } from '../../types';

export const seafoamIslandsB1F: MapData = {
  id: 'seafoam_islands_b1f',
  name: 'Seafoam Islands - B1F',
  description: 'Sei nel primo piano interrato. Il freddo è più intenso. Il pavimento è scivoloso e vedi l\'acqua scorrere in canali sotterranei. Ci sono altre scale e massi.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [
    // Zubat: Comune (Livelli 22-26)
    { pokemonId: 41, minLevel: 22, maxLevel: 26, rate: 30 },
    // Golbat: Raro (Livello 30)
    { pokemonId: 42, minLevel: 30, maxLevel: 30, rate: 5 },
    // Psyduck: Comune (Livelli 28-32)
    { pokemonId: 54, minLevel: 28, maxLevel: 32, rate: 20 },
    // Golduck: Raro (Livello 34)
    { pokemonId: 55, minLevel: 34, maxLevel: 34, rate: 5 },
    // Seel: Comune (Livelli 28-32)
    { pokemonId: 86, minLevel: 28, maxLevel: 32, rate: 20 },
    // Slowpoke: Comune (Livelli 28-32)
    { pokemonId: 79, minLevel: 28, maxLevel: 32, rate: 20 }
  ],
  trainers: [],
  events: [
    {
      id: 'ladder_to_1f_A',
      trigger: 'interact',
      // Logica Engine: "Risali la scala A." -> Teleport a 'seafoam_islands_1f'
    },
    {
      id: 'ladder_to_1f_B',
      trigger: 'interact',
      // Logica Engine: "Risali la scala B." -> Teleport a 'seafoam_islands_1f'
    },
    {
      id: 'ladder_to_b2f_A',
      trigger: 'interact',
      // Logica Engine: "Scendi ancora più in profondità." -> Teleport a 'seafoam_islands_b2f'
    },
    {
      id: 'boulder_puzzle_3',
      trigger: 'interact',
      // Logica Engine:
      // "Un masso blocca un passaggio."
      // Se hai Forza: "Spingi il masso nel buco." -> Set flag 'boulder_3_pushed'
    },
    {
      id: 'water_current',
      trigger: 'interact',
      // Logica Engine:
      // "Una forte corrente ti impedisce di usare Surf qui."
      // Se flag 'boulder_1_pushed' e 'boulder_2_pushed' sono true: "I massi hanno bloccato la corrente! Ora puoi usare Surf."
    }
  ]
};