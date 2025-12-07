import { MapData } from '../../types';

export const seafoamIslandsB3F: MapData = {
  id: 'seafoam_islands_b3f',
  name: 'Seafoam Islands - B3F',
  description: 'Sei nel terzo piano interrato. Un fiume sotterraneo scorre con una forza incredibile, trascinandoti via se provi a nuotare. Devi trovare un modo per fermare la corrente.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [
    // Zubat: Comune (Livelli 26-30)
    { pokemonId: 41, minLevel: 26, maxLevel: 30, rate: 30 },
    // Golbat: Raro (Livello 34)
    { pokemonId: 42, minLevel: 34, maxLevel: 34, rate: 5 },
    // Psyduck: Comune (Livelli 32-36)
    { pokemonId: 54, minLevel: 32, maxLevel: 36, rate: 20 },
    // Golduck: Raro (Livello 38)
    { pokemonId: 55, minLevel: 38, maxLevel: 38, rate: 5 },
    // Seel: Comune (Livelli 32-36)
    { pokemonId: 86, minLevel: 32, maxLevel: 36, rate: 20 },
    // Slowpoke: Comune (Livelli 32-36)
    { pokemonId: 79, minLevel: 32, maxLevel: 36, rate: 20 }
  ],
  trainers: [],
  events: [
    {
      id: 'ladder_to_b2f',
      trigger: 'interact',
      // Logica Engine: "Risali la scala verso il secondo piano interrato." -> Teleport a 'seafoam_islands_b2f'
    },
    {
      id: 'ladder_to_b4f',
      trigger: 'interact',
      // Logica Engine: "Scendi nell'ultimo livello della grotta." -> Teleport a 'seafoam_islands_b4f'
    },
    {
      id: 'strong_current',
      trigger: 'interact',
      // Logica Engine:
      // Se le flag 'boulder_1_pushed' e 'boulder_2_pushed' sono false:
      //   "Provi a usare Surf, ma la corrente è troppo forte e ti trascina via!" -> Teleport a 'route_20' (uscita forzata)
      // Se sono true:
      //   "I massi caduti dai piani superiori hanno rallentato la corrente. Ora puoi navigare."
    },
    {
      id: 'item_ultra_ball_sf',
      trigger: 'interact',
      conditionFlag: '!item_sf_ultra_ball_taken',
      // Logica Engine: "Hai trovato una Ultra Ball!" -> Add Item 'ultra_ball' -> Set flag true
    }
  ]
};