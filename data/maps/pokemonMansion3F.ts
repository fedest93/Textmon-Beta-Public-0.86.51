import { MapData } from '../../types';

export const pokemonMansion3F: MapData = {
  id: 'pokemon_mansion_3f',
  name: 'Pokémon Mansion - 3F',
  description: 'Sei al terzo piano. È un\'area più piccola con un paio di stanze. Una di queste sembra essere stata un laboratorio. Ci sono provette rotte e appunti scientifici sparsi ovunque.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [
    // Raticate: Comune (Livelli 28-32)
    { pokemonId: 20, minLevel: 28, maxLevel: 32, rate: 25 },
    // Vulpix: Comune (Livelli 28-32)
    { pokemonId: 37, minLevel: 28, maxLevel: 32, rate: 20 },
    // Growlithe: Comune (Livelli 28-32)
    { pokemonId: 58, minLevel: 28, maxLevel: 32, rate: 20 },
    // Koffing: Non comune (Livello 30)
    { pokemonId: 109, minLevel: 30, maxLevel: 30, rate: 15 },
    // Weezing: Raro (Livello 34)
    { pokemonId: 110, minLevel: 34, maxLevel: 34, rate: 5 },
    // Ditto: Raro (Livello 30)
    { pokemonId: 132, minLevel: 30, maxLevel: 30, rate: 15 }
  ],
  trainers: [
    'burglar_lewis_pm'
  ],
  events: [
    {
      id: 'go_to_2f',
      trigger: 'interact',
      // Logica Engine: "Scendi le scale verso il secondo piano." -> Teleport a 'pokemon_mansion_2f'
    },
    {
      id: 'diary_entry_3',
      trigger: 'interact',
      // Logica Engine: "Leggi un'altra pagina del diario: 'Febbraio 6. MEW ha dato alla luce. Abbiamo chiamato il piccolo MEWTWO.'"
    },
    {
      id: 'burglar_encounter_3f',
      trigger: 'interact',
      conditionFlag: '!burglar_lewis_pm_defeated',
      // Logica Engine: "Scassinatore: 'Ho sentito che qui c'è un tesoro!'" -> Avvia battaglia
    },
    {
      id: 'item_iron_3f',
      trigger: 'interact',
      conditionFlag: '!item_mansion_3f_iron_taken',
      // Logica Engine: "Hai trovato Ferro!" -> Add Item 'iron' -> Set flag true
    }
  ]
};