import { MapData } from '../../types';

export const route8: MapData = {
  id: 'route_8',
  name: 'Route 8',
  description: 'Un sentiero erboso che si estende tra Lavandonia e Zafferanopoli. Molti allenatori amano sfidarsi qui. C\'è un edificio che conduce a un passaggio sotterraneo.',
  connections: {
    east: 'lavender_town',
    west: 'saffron_city_gate' // Bloccato dalle guardie
  },
  wildEncounters: [
    // Pidgey: Comune (Livelli 15-20)
    { pokemonId: 16, minLevel: 15, maxLevel: 20, rate: 25 },
    // Ekans: Comune (Livelli 15-19)
    { pokemonId: 23, minLevel: 15, maxLevel: 19, rate: 20 },
    // Sandshrew: Comune (Livelli 15-19)
    { pokemonId: 27, minLevel: 15, maxLevel: 19, rate: 20 },
    // Vulpix: Non comune (Livelli 15-18)
    { pokemonId: 37, minLevel: 15, maxLevel: 18, rate: 15 },
    // Growlithe: Non comune (Livelli 15-18)
    { pokemonId: 58, minLevel: 15, maxLevel: 18, rate: 15 },
    // Mankey: Raro (Livelli 15-17)
    { pokemonId: 56, minLevel: 15, maxLevel: 17, rate: 5 }
  ],
  trainers: [
    // Tutti gli allenatori del Percorso 8
    'gambler_rich',
    'gambler_stan',
    'super_nerd_glenn',
    'lass_julia',
    'lass_paige',
    'super_nerd_leslie'
  ],
  events: [
    {
      id: 'underground_path_west_entrance',
      trigger: 'interact',
      // Logica Engine:
      // "Passaggio Sotterraneo per il Percorso 7 (Azzurropoli)"
      // -> Scelta: [Entra, Non Entrare] -> Se Entra, teleport a 'underground_path_west_east'
    },
    {
      id: 'saffron_guard_east',
      trigger: 'interact',
      // Logica Engine:
      // "Guardia: 'Ho una sete terribile... Non posso farti passare.'"
      // (Blocca il passaggio a Ovest verso Zafferanopoli)
    },
    {
      id: 'cut_bush_secret',
      trigger: 'interact',
      // Logica Engine:
      // "Un alberello blocca un'area erbosa segreta."
      // Se hai Taglio, puoi accedere a un'area con Pokémon diversi (es. Jigglypuff).
    }
  ]
};