import { MapData } from '../../types';

export const route24: MapData = {
  id: 'route_24',
  name: 'Route 24',
  description: 'Il maestoso Ponte Pepita si estende sopra il fiume. Cinque allenatori attendono gli sfidanti per mettere alla prova la loro forza. Oltre il ponte, l\'erba alta nasconde Pokémon psichici.',
  connections: {
    south: 'cerulean_city',
    north: 'route_25' // Porta verso il promontorio di Bill
  },
  wildEncounters: [
    // Oddish: Comune (Livelli 12-14)
    { pokemonId: 43, minLevel: 12, maxLevel: 14, rate: 25 },
    // Bellsprout: Comune (Livelli 12-14)
    { pokemonId: 69, minLevel: 12, maxLevel: 14, rate: 25 },
    // Pidgey: Comune (Livelli 11-13)
    { pokemonId: 16, minLevel: 11, maxLevel: 13, rate: 20 },
    // Abra: Non comune (Livelli 8-12) - Difficile da catturare!
    { pokemonId: 63, minLevel: 8, maxLevel: 12, rate: 15 },
    // Caterpie/Weedle: Rari (Livelli 7-10)
    { pokemonId: 10, minLevel: 7, maxLevel: 10, rate: 5 },
    { pokemonId: 13, minLevel: 7, maxLevel: 10, rate: 5 },
    // Metapod/Kakuna: Molto Rari
    { pokemonId: 11, minLevel: 7, maxLevel: 10, rate: 2 },
    { pokemonId: 14, minLevel: 7, maxLevel: 10, rate: 3 }
  ],
  trainers: [
    // IL GAUNTLET DEL PONTE PEPITA
    'bug_catcher_caleb',
    'lass_ali',
    'youngster_timmy',
    'lass_reli',
    'camper_ethan',
    // IL BOSS FINALE DEL PONTE
    'rocket_grunt_nugget'
  ],
  events: [
    {
      id: 'nugget_reward',
      trigger: 'interact', // Si attiva parlando col Rocket Grunt PRIMA della lotta
      conditionFlag: '!nugget_received',
      // Logica Engine:
      // "Congratulazioni! Hai battuto i 5 allenatori! Ecco il tuo premio!"
      // Add Item 'nugget' -> Set flag 'nugget_received'.
      // Subito dopo parte il dialogo del Grunt: "Vuoi unirti al Team Rocket?" -> Battaglia.
    },
    {
      id: 'charmander_gift',
      trigger: 'interact',
      conditionFlag: '!charmander_received',
      // Logica Engine:
      // Un ragazzo sull'altopiano a nord-ovest.
      // "Non sono bravo ad allenare i Pokemon... Vuoi prenderti cura del mio Charmander?"
      // Se Sì -> Add Pokemon Charmander lvl 10 -> Set flag 'charmander_received'.
    },
    {
      id: 'item_tm45',
      trigger: 'interact',
      conditionFlag: '!item_tm45_taken',
      // Logica Engine: Trova MT45 (Tuononda) sull'altopiano.
    }
  ]
};