import { MapData } from '../../types';

export const seafoamIslands1F: MapData = {
  id: 'seafoam_islands_1f',
  name: 'Seafoam Islands - 1F',
  description: 'Sei all\'ingresso delle Isole Spuma. L\'aria è gelida e le pareti della grotta sono ricoperte di ghiaccio. Vedi dei massi pesanti vicino a dei buchi nel pavimento e diverse scale che scendono.',
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
      id: 'exit_to_route_20',
      trigger: 'interact',
      // Logica Engine: "Esci dalla grotta e torni in mare aperto." -> Teleport a 'route_20'
    },
    {
      id: 'ladder_to_b1f_A',
      trigger: 'interact',
      // Logica Engine: "Scendi la scala A." -> Teleport a 'seafoam_islands_b1f' (con stato per indicare la posizione A)
    },
    {
      id: 'ladder_to_b1f_B',
      trigger: 'interact',
      // Logica Engine: "Scendi la scala B." -> Teleport a 'seafoam_islands_b1f' (con stato per indicare la posizione B)
    },
    {
      id: 'boulder_puzzle_1',
      trigger: 'interact',
      // Logica Engine:
      // "C'è un masso pesante vicino a un buco."
      // Se hai Forza: "Vuoi spingere il masso nel buco?"
      // -> Se sì: "Spingi il masso con tutte le tue forze! Senti un tonfo in profondità." -> Set flag 'boulder_1_pushed'
    },
    {
      id: 'boulder_puzzle_2',
      trigger: 'interact',
      // Logica Engine:
      // "C'è un altro masso vicino a un buco."
      // Se hai Forza: "Vuoi spingere il masso nel buco?"
      // -> Se sì: "Spingi il masso! Il rumore riecheggia nella grotta." -> Set flag 'boulder_2_pushed'
    }
  ]
};