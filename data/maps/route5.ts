import { MapData } from '../../types';

export const route5: MapData = {
  id: 'route_5',
  name: 'Route 5',
  description: 'Un percorso in discesa che collega Celestopoli a Zafferanopoli. Un grande edificio, la Pensione Pokémon, domina l\'area. A est c\'è un piccolo edificio che conduce a un passaggio sotterraneo.',
  connections: {
    north: 'cerulean_city',
    south: 'saffron_city_gate' // Bloccato dalle guardie assetate
  },
  wildEncounters: [
    // Pidgey: Molto comune (Livelli 13-16)
    { pokemonId: 16, minLevel: 13, maxLevel: 16, rate: 30 },
    // Mankey: Comune (Livelli 13-15)
    { pokemonId: 56, minLevel: 13, maxLevel: 15, rate: 25 },
    // Oddish: Comune (Livelli 13-15)
    { pokemonId: 43, minLevel: 13, maxLevel: 15, rate: 25 },
    // Bellsprout: Comune (Livelli 13-15)
    { pokemonId: 69, minLevel: 13, maxLevel: 15, rate: 20 }
  ],
  trainers: [], // Nessun allenatore in questo percorso
  events: [
    {
      id: 'day_care',
      trigger: 'interact',
      // Logica Engine:
      // "Benvenuto alla Pensione Pokémon! Vuoi che ci prendiamo cura di uno dei tuoi Pokémon?"
      // (Logica deposito/ritiro Pokémon e calcolo EXP per passi: WIP)
    },
    {
      id: 'underground_path_entrance',
      trigger: 'interact',
      // Logica Engine:
      // "Passaggio Sotterraneo per il Percorso 6"
      // Scelta: [Entra, Non Entrare] -> Se Entra, teleport a 'underground_path_north'
    },
    {
      id: 'saffron_guard',
      trigger: 'interact',
      // Logica Engine:
      // "Ho una sete terribile... Non posso farti passare finché non bevo qualcosa."
      // (Blocca il passaggio a Sud verso Zafferanopoli)
    },
    {
      id: 'ledge_jump',
      trigger: 'interact',
      // Logica Engine:
      // "Salta il gradone?" -> Se sì, teleport a 'route_5' (stessa mappa, ma la connessione a nord viene rimossa logicamente)
      // Questo è un punto di non ritorno verso Celestopoli da questo percorso.
    }
  ]
};