import { MapData } from '../../types';

export const route7: MapData = {
  id: 'route_7',
  name: 'Route 7',
  description: 'Un piccolo sentiero erboso. A ovest si intravede la grande e vivace Azzurropoli. A est, l\'ingresso del Passaggio Sotterraneo.',
  connections: {
    east: 'saffron_city_gate', // Bloccato dalle guardie
    west: 'celadon_city'
  },
  wildEncounters: [
    // Pidgey: Comune (Livelli 19-22)
    { pokemonId: 16, minLevel: 19, maxLevel: 22, rate: 25 },
    // Vulpix: Comune (Livelli 18-20)
    { pokemonId: 37, minLevel: 18, maxLevel: 20, rate: 20 },
    // Growlithe: Comune (Livelli 18-20)
    { pokemonId: 58, minLevel: 18, maxLevel: 20, rate: 20 },
    // Oddish: Comune (Livelli 19-22)
    { pokemonId: 43, minLevel: 19, maxLevel: 22, rate: 20 },
    // Bellsprout: Comune (Livelli 19-22)
    { pokemonId: 69, minLevel: 19, maxLevel: 22, rate: 15 }
  ],
  trainers: [], // Nessun allenatore in questo percorso
  events: [
    {
      id: 'underground_path_east_exit',
      trigger: 'interact',
      // Logica Engine:
      // "Passaggio Sotterraneo per il Percorso 8"
      // -> Scelta: [Entra, Non Entrare] -> Se Entra, teleport a 'underground_path_west_east'
    },
    {
      id: 'saffron_guard_west',
      trigger: 'interact',
      // Logica Engine:
      // "Guardia: 'Ho una sete terribile... Non posso farti passare.'"
      // (Blocca il passaggio a Est verso Zafferanopoli)
    }
  ]
};