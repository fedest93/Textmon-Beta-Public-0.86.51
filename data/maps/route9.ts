import { MapData } from '../../types';

export const route9: MapData = {
  id: 'route_9',
  name: 'Route 9',
  description: 'Un percorso montuoso e arido, pieno di gradoni che rendono il cammino un labirinto a senso unico. Diversi allenatori si nascondono tra le rocce.',
  connections: {
    west: 'cerulean_city',
    east: 'route_10_north' // Porta alla parte superiore del Percorso 10
  },
  wildEncounters: [
    // Rattata: Comune (Livelli 11-17)
    { pokemonId: 19, minLevel: 11, maxLevel: 17, rate: 30 },
    // Spearow: Molto comune (Livelli 13-17)
    { pokemonId: 21, minLevel: 13, maxLevel: 17, rate: 40 },
    // Ekans: Non comune (Livelli 11-15)
    { pokemonId: 23, minLevel: 11, maxLevel: 15, rate: 15 },
    // Sandshrew: Non comune (Livelli 11-15)
    { pokemonId: 27, minLevel: 11, maxLevel: 15, rate: 15 }
  ],
  trainers: [
    // Tutti gli allenatori del Percorso 9
    'picnicker_gloria_r9',
    'hiker_jeremy_r9',
    'bug_catcher_brent_r9',
    'bug_catcher_calvin_r9',
    'hiker_tim_r9',
    'youngster_chris_r9',
    'hiker_sidney_r9',
    'camper_chris_r9',
    'bug_catcher_conner_r9'
  ],
  events: [
    {
      id: 'cut_bush_shortcut',
      trigger: 'interact',
      // Logica Engine:
      // "Un alberello blocca un sentiero laterale."
      // Se hai Taglio, puoi creare una scorciatoia.
    },
    {
      id: 'item_tm30',
      trigger: 'interact',
      conditionFlag: '!item_tm30_taken',
      // Logica Engine: "Hai trovato MT30 (Teletrasporto)!" -> Add Item 'tm30' -> Set flag true
    }
  ]
};