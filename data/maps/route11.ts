import { MapData } from '../../types';

export const route11: MapData = {
  id: 'route_11',
  name: 'Route 11',
  description: 'Un lungo percorso che costeggia il mare. L\'erba alta è piena di allenatori in cerca di sfide. In fondo, un Pokémon gigante blocca il passaggio e l\'ingresso di una grotta è visibile.',
  connections: {
    west: 'vermilion_city',
    east: 'route_12' // Bloccato da Snorlax
  },
  wildEncounters: [
    // Spearow: Comune (Livelli 13-17)
    { pokemonId: 21, minLevel: 13, maxLevel: 17, rate: 35 },
    // Ekans: Comune (Livelli 11-15)
    { pokemonId: 23, minLevel: 11, maxLevel: 15, rate: 25 },
    // Sandshrew: Comune (Livelli 11-15)
    { pokemonId: 27, minLevel: 11, maxLevel: 15, rate: 25 },
    // Drowzee: Non comune (Livelli 9-13)
    { pokemonId: 96, minLevel: 9, maxLevel: 13, rate: 15 }
  ],
  trainers: [
    // Tutti gli allenatori del Percorso 11
    'gambler_eustace',
    'youngster_eddie',
    // Aggiungiamo altri allenatori generici per densità, come da RossoFuoco
    'youngster_dillon',
    'engineer_bernie',
    'gambler_dirk',
    'youngster_yasu',
    'engineer_braxton',
    'biker_owen',
    'biker_jung'
  ],
  events: [
    {
      id: 'enter_digletts_cave',
      trigger: 'interact',
      // Logica Engine: "Entri nella Grotta Diglett." -> Teleport a 'digletts_cave'
    },
    {
      id: 'snorlax_block',
      trigger: 'interact',
      // Logica Engine:
      // "Un enorme Pokémon sta dormendo e bloccando la strada."
      // Se hai 'poke_flute' nell'inventario: "Vuoi usare il Poké Flauto?"
      // -> Se sì, avvia battaglia con Snorlax (livello 30)
    },
    {
      id: 'gatehouse_guard',
      trigger: 'interact',
      // Logica Engine:
      // "Guardia: 'Hai visto quel Drowzee? Sembrava ipnotizzare la gente!'"
    },
    {
      id: 'item_finder_aide',
      trigger: 'interact',
      conditionFlag: 'pokedex_count_30', // Esempio di flag basata sul Pokedex
      // Logica Engine:
      // "Assistente di Oak: 'Hai catturato 30 tipi di Pokémon! Incredibile! Prendi questo come premio!'"
      // -> Add Item 'item_finder'
    }
  ]
};