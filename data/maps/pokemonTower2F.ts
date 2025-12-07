import { MapData } from '../../types';

export const pokemonTower2F: MapData = {
  id: 'pokemon_tower_2f',
  name: 'Pokémon Tower - 2F',
  description: 'Sei al secondo piano. L\'aria è gelida e una strana nebbia viola aleggia tra le lapidi. Senti dei sussurri indistinti. Appena metti piede sul piano, una figura familiare ti blocca la strada.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [
    // Gastly: Onnipresente (Livelli 13-19)
    { pokemonId: 92, minLevel: 13, maxLevel: 19, rate: 85 },
    // Cubone: Raro (Livelli 15-17)
    { pokemonId: 104, minLevel: 15, maxLevel: 17, rate: 15 }
  ],
  trainers: [
    'rival_5_tower' // Il rivale è l'unico "allenatore" di questo piano
  ],
  events: [
    {
      id: 'go_to_1f',
      trigger: 'interact',
      // Logica Engine: "Scendi le scale verso il piano terra." -> Teleport a 'pokemon_tower_1f'
    },
    {
      id: 'go_to_3f',
      trigger: 'interact',
      // Logica Engine: "Sali le scale verso il terzo piano." -> Teleport a 'pokemon_tower_3f'
    },
    {
      id: 'rival_encounter_tower',
      trigger: 'enter', // Si attiva appena si entra nella mappa
      conditionFlag: '!rival_5_tower_defeated',
      // Logica Engine:
      // "Gary: 'Ehi! Che ci fai qui? I tuoi Pokémon non sono mica morti! O forse sì, dopo che ti avrò battuto!'"
      // -> Avvia battaglia con 'rival_5_tower'
    },
    {
      id: 'ghost_encounter_placeholder',
      trigger: 'interact',
      // Logica Engine:
      // Se flag 'silph_scope_obtained' è false: "Un fantasma appare! Non puoi identificarlo! Scappi terrorizzato!"
      // Se true: "Un Gastly selvatico appare!" -> Avvia battaglia con un Gastly selvatico.
      // Questa logica sarà gestita dal motore di battaglia quando incontra un tipo Spettro.
    }
  ]
};