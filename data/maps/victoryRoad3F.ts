import { MapData } from '../../types';

export const victoryRoad3F: MapData = {
  id: 'victory_road_3f',
  name: 'Victory Road - 3F',
  description: 'Il terzo e ultimo piano della Via Vittoria. La luce del giorno filtra da un\'uscita lontana. Solo i migliori allenatori riescono ad arrivare fin qui.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [
    // Machop: Comune (Livelli 40-42) - Stranamente presenti ai piani alti in Gen 1/3
    { pokemonId: 66, minLevel: 40, maxLevel: 42, rate: 20 },
    // Machoke: Comune (Livelli 42-45)
    { pokemonId: 67, minLevel: 42, maxLevel: 45, rate: 25 },
    // Geodude: Comune (Livelli 40-42)
    { pokemonId: 74, minLevel: 40, maxLevel: 42, rate: 20 },
    // Graveler: Non comune (Livelli 42-45)
    { pokemonId: 75, minLevel: 42, maxLevel: 45, rate: 20 },
    // Venomoth: Raro (Livelli 40-45)
    { pokemonId: 49, minLevel: 40, maxLevel: 45, rate: 10 },
    // Marowak: Raro (Livelli 43-45)
    { pokemonId: 105, minLevel: 43, maxLevel: 45, rate: 5 }
  ],
  trainers: [
    'cooltrainer_george_vr',
    'cooltrainer_alexa_vr',
    'cooltrainer_colby_vr'
  ],
  events: [
    {
      id: 'ladder_to_2f',
      trigger: 'interact',
      // Logica Engine: "Scendi le scale verso il secondo piano." -> Teleport a 'victory_road_2f'
    },
    {
      id: 'exit_to_indigo_plateau',
      trigger: 'interact',
      // Logica Engine: 
      // "Vedi la luce! È l'uscita verso l'Altopiano Blu."
      // -> Teleport a 'indigo_plateau'
    },
    {
      id: 'boulder_puzzle_vr3',
      trigger: 'interact',
      // Logica Engine:
      // "Un masso blocca un interruttore. Spingilo per aprire l'ultimo cancello."
      // (Logica semplificata: Interagisci -> Se Forza -> Cancello si apre)
    },
    {
      id: 'item_max_revive_vr3',
      trigger: 'interact',
      conditionFlag: '!item_vr3f_max_revive_taken',
      // Logica Engine: "Hai trovato un Revitalizzante Max!" -> Add Item 'max_revive' -> Set flag true
    },
    {
      id: 'item_tm47',
      trigger: 'interact',
      conditionFlag: '!item_vr3f_tm47_taken',
      // Logica Engine: "Hai trovato MT47 (Esplosione)!" -> Add Item 'tm47' -> Set flag true
    }
  ]
};