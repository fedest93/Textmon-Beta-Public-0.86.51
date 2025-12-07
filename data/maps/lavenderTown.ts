import { MapData } from '../../types';

export const lavenderTown: MapData = {
  id: 'lavender_town',
  name: 'Lavender Town',
  description: 'Una piccola città avvolta da un\'atmosfera cupa e silenziosa. La grande Torre Pokémon si erge al centro, un cimitero per i Pokémon defunti. Una melodia malinconica fluttua nell\'aria.',
  connections: {
    north: 'route_10_south',
    south: 'route_12', // Verso il Ponte Silenzio
    west: 'route_8'   // Verso Zafferanopoli
  },
  wildEncounters: [],
  trainers: [],
  events: [
    {
      id: 'poke_center',
      trigger: 'interact',
      // Logica Engine: Cura e PC
    },
    {
      id: 'poke_mart',
      trigger: 'interact',
      // Logica Engine: Apre Shop (Revitalizzanti, Fune di Fuga, etc.)
    },
    {
      id: 'pokemon_tower',
      trigger: 'interact',
      // Logica Engine:
      // "Entri nella Torre Pokémon. Un'aura spettrale ti avvolge." -> Teleport a 'pokemon_tower_1f'
    },
    {
      id: 'mr_fuji_house',
      trigger: 'interact',
      // Logica Engine:
      // Se flag 'saved_mr_fuji' è false: "Una bambina: 'Hai visto Mr. Fuji? È andato alla Torre e non è più tornato!'"
      // Se true: "Mr. Fuji: 'Grazie per avermi salvato! Prendi questo Poké Flauto!'" -> Add Item 'poke_flute'
    },
    {
      id: 'name_rater_house',
      trigger: 'interact',
      // Logica Engine:
      // "Sono il Valutatore Nomi! Vuoi che dia un soprannome a uno dei tuoi Pokémon?"
      // -> Apre menu selezione Pokémon -> Permette di rinominare
    },
    {
      id: 'rival_encounter_lavender',
      trigger: 'interact', // O automatico
      conditionFlag: '!rival_5_tower_defeated',
      // Logica Engine:
      // "Gary: 'Che ci fai in un posto come questo? I tuoi Pokémon non sono mica morti!'"
      // -> Questo evento potrebbe essere gestito all'interno della torre, come nei giochi.
      // Per ora lo lasciamo qui come promemoria.
    }
  ]
};