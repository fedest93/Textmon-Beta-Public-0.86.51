import { MapData } from '../../types';

export const route14: MapData = {
  id: 'route_14',
  name: 'Route 14',
  description: 'Un percorso erboso che scende verso sud. Un gruppo di motociclisti si è radunato qui, sfidando chiunque passi. In lontananza si sente il verso di molti Pokémon uccello.',
  connections: {
    north: 'route_13',
    west: 'route_15'
  },
  wildEncounters: [
    // Pidgey: Comune (Livelli 23-27)
    { pokemonId: 16, minLevel: 23, maxLevel: 27, rate: 25 },
    // Pidgeotto: Raro (Livello 29)
    { pokemonId: 17, minLevel: 29, maxLevel: 29, rate: 5 },
    // Oddish: Comune (Livelli 23-27)
    { pokemonId: 43, minLevel: 23, maxLevel: 27, rate: 20 },
    // Bellsprout: Comune (Livelli 23-27)
    { pokemonId: 69, minLevel: 23, maxLevel: 27, rate: 20 },
    // Venonat: Non comune (Livelli 24-26)
    { pokemonId: 48, minLevel: 24, maxLevel: 26, rate: 15 },
    // Ditto: Raro (Livelli 23-25)
    { pokemonId: 132, minLevel: 23, maxLevel: 25, rate: 15 }
  ],
  trainers: [
    // L'intero gauntlet del Percorso 14
    'bird_keeper_mitch_r14',
    'bird_keeper_carter_r14',
    'bird_keeper_marlon_r14',
    'bird_keeper_beck_r14',
    'biker_gerald_r14',
    'biker_salvador_r14',
    'biker_lukas_r14',
    'biker_isaac_r14'
  ],
  events: [
    {
      id: 'ditto_grass_info',
      trigger: 'interact',
      // Logica Engine:
      // "Un allenatore ti ferma: 'Ehi! Sapevi che in quest'erba si nascondono dei Ditto? Si trasformano in qualsiasi cosa!'"
    }
  ]
};