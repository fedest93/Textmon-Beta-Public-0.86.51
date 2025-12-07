import { MapData } from '../../types';

export const victoryRoad1F: MapData = {
  id: 'victory_road_1f',
  name: 'Victory Road - 1F',
  description: 'Il primo piano della Via Vittoria. Una grotta immensa e opprimente. Massi giganti bloccano il passaggio e allenatori d\'élite sono in agguato dietro ogni angolo.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [
    // Onix: Comune (Livelli 40-45)
    { pokemonId: 95, minLevel: 40, maxLevel: 45, rate: 20 },
    // Machoke: Comune (Livelli 40-45)
    { pokemonId: 67, minLevel: 40, maxLevel: 45, rate: 30 },
    // Graveler: Comune (Livelli 40-45)
    { pokemonId: 75, minLevel: 40, maxLevel: 45, rate: 30 },
    // Golbat: Non comune (Livelli 40-45)
    { pokemonId: 42, minLevel: 40, maxLevel: 45, rate: 10 },
    // Marowak: Raro (Livelli 40-45)
    { pokemonId: 105, minLevel: 40, maxLevel: 45, rate: 10 }
  ],
  trainers: [
    'cooltrainer_naomi_vr',
    'cooltrainer_rolando_vr'
  ],
  events: [
    {
      id: 'exit_to_route_23',
      trigger: 'interact',
      // Logica Engine: "Esci dalla grotta e torni al Percorso 23." -> Teleport a 'route_23'
    },
    {
      id: 'ladder_to_2f',
      trigger: 'interact',
      // Logica Engine: "Sali la scala verso il secondo piano." -> Teleport a 'victory_road_2f'
    },
    {
      id: 'boulder_puzzle_vr1',
      trigger: 'interact',
      // Logica Engine:
      // "Un masso gigante blocca un interruttore a terra."
      // Se hai Forza: "Spingi il masso sull'interruttore." -> Rimuove una barriera o sblocca il passaggio.
    },
    {
      id: 'item_tm43',
      trigger: 'interact',
      conditionFlag: '!item_vr1f_tm43_taken',
      // Logica Engine: "Hai trovato MT43 (Aeroattacco)!" -> Add Item 'tm43' -> Set flag true
    },
    {
      id: 'item_rare_candy_vr1',
      trigger: 'interact',
      conditionFlag: '!item_vr1f_rare_candy_taken',
      // Logica Engine: "Hai trovato una Caramella Rara!" -> Add Item 'rare_candy' -> Set flag true
    }
  ]
};