import { MapData } from '../../types';

export const route13: MapData = {
  id: 'route_13',
  name: 'Route 13',
  description: 'Un vasto prato trasformato in un labirinto da una lunga serie di staccionate. Molti allenatori si nascondono tra i vicoli ciechi, pronti a sfidare chiunque si perda.',
  connections: {
    north: 'route_12',
    west: 'route_14'
  },
  wildEncounters: [
    // Pidgey: Comune (Livelli 22-26)
    { pokemonId: 16, minLevel: 22, maxLevel: 26, rate: 25 },
    // Pidgeotto: Raro (Livello 28)
    { pokemonId: 17, minLevel: 28, maxLevel: 28, rate: 5 },
    // Oddish: Comune (Livelli 22-26)
    { pokemonId: 43, minLevel: 22, maxLevel: 26, rate: 20 },
    // Bellsprout: Comune (Livelli 22-26)
    { pokemonId: 69, minLevel: 22, maxLevel: 26, rate: 20 },
    // Venonat: Non comune (Livelli 24-26)
    { pokemonId: 48, minLevel: 24, maxLevel: 26, rate: 15 },
    // Ditto: Raro (Livelli 23-25)
    { pokemonId: 132, minLevel: 23, maxLevel: 25, rate: 15 }
  ],
  trainers: [
    // L'intero gauntlet del labirinto di staccionate
    'jr_trainer_f_lisa_r13',
    'jr_trainer_f_valerie_r13',
    'bird_keeper_perry_r13',
    'jr_trainer_f_gwen_r13',
    'bird_keeper_robert_r13',
    'beauty_lola_r13',
    'beauty_sheila_r13',
    'bird_keeper_sebastian_r13',
    'picnicker_susie_r13',
    'camper_sid_r13'
  ],
  events: [
    {
      id: 'hidden_item_pp_up',
      trigger: 'interact',
      conditionFlag: '!item_r13_pp_up_taken',
      // Logica Engine:
      // "Usi il Detector. C'è qualcosa qui!" -> "Hai trovato un PP-SU!" -> Add Item 'pp_up' -> Set flag true
    },
    {
      id: 'sign_maze',
      trigger: 'interact',
      // Logica Engine: "CARTELLO: Attenzione! Labirinto di staccionate. È facile perdersi!"
    }
  ]
};