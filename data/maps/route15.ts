import { MapData } from '../../types';

export const route15: MapData = {
  id: 'route_15',
  name: 'Route 15',
  description: 'Un lungo sentiero pianeggiante che porta direttamente a Fucsiapoli. È un luogo popolare per gli allenatori che vogliono testare la forza delle loro squadre prima di affrontare la palestra locale.',
  connections: {
    east: 'route_14',
    west: 'fuchsia_city'
  },
  wildEncounters: [
    // Pidgey: Comune (Livelli 24-28)
    { pokemonId: 16, minLevel: 24, maxLevel: 28, rate: 25 },
    // Pidgeotto: Raro (Livello 30)
    { pokemonId: 17, minLevel: 30, maxLevel: 30, rate: 5 },
    // Oddish: Comune (Livelli 24-28)
    { pokemonId: 43, minLevel: 24, maxLevel: 28, rate: 20 },
    // Bellsprout: Comune (Livelli 24-28)
    { pokemonId: 69, minLevel: 24, maxLevel: 28, rate: 20 },
    // Venonat: Non comune (Livelli 26-28)
    { pokemonId: 48, minLevel: 26, maxLevel: 28, rate: 15 },
    // Ditto: Raro (Livelli 23-25)
    { pokemonId: 132, minLevel: 23, maxLevel: 25, rate: 15 }
  ],
  trainers: [
    // L'intero gauntlet del Percorso 15
    'jr_trainer_f_jenna_r15',
    'jr_trainer_f_talia_r15',
    'biker_ernest_r15',
    'biker_alex_r15',
    'beauty_olivia_r15',
    'beauty_jessica_r15',
    'picnicker_alma_r15',
    'bird_keeper_chester_r15'
  ],
  events: [
    {
      id: 'cut_bush_tm20',
      trigger: 'interact',
      // Logica Engine:
      // "Un alberello blocca un piccolo sentiero."
      // Se hai Taglio: "Tagli l'alberello e trovi una MT!" -> Add Item 'tm20' (Ira)
    },
    {
      id: 'exp_all_aide',
      trigger: 'interact',
      conditionFlag: 'pokedex_count_50', // Esempio di flag basata sul Pokedex
      // Logica Engine:
      // "Assistente di Oak: 'Wow! Hai già catturato 50 tipi di Pokémon! Sei incredibile! Prendi questo, ti aiuterà ad allenare tutta la squadra!'"
      // -> Add Item 'exp_all'
    }
  ]
};