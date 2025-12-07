import { MapData } from '../../types';

export const pokemonMansion2F: MapData = {
  id: 'pokemon_mansion_2f',
  name: 'Pokémon Mansion - 2F',
  description: 'Sei al secondo piano. Un lungo corridoio porta a diverse stanze. Mobili coperti da teli bianchi e libri sparsi per terra. Un\'altra statua di Mew si trova in una stanza.',
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
    // Grimer: Non comune (Livello 30)
    { pokemonId: 88, minLevel: 30, maxLevel: 30, rate: 15 }
  ],
  trainers: [
    'scientist_braydon_pm'
  ],
  events: [
    {
      id: 'go_to_1f_main_stairs',
      trigger: 'interact',
      // Logica Engine: "Scendi la grande scalinata verso l'atrio." -> Teleport a 'pokemon_mansion_1f'
    },
    {
      id: 'go_to_3f',
      trigger: 'interact',
      // Logica Engine: "Sali una piccola scala verso il terzo piano." -> Teleport a 'pokemon_mansion_3f'
    },
    {
      id: 'mew_statue_switch_2',
      trigger: 'interact',
      // Logica Engine:
      // "Premi l'interruttore sulla statua." -> "Senti un altro 'clic' in lontananza." -> Set flag 'mansion_switch_2_pressed'
    },
    {
      id: 'diary_entry_2',
      trigger: 'interact',
      // Logica Engine: "Leggi un'altra pagina del diario: 'Luglio 10. Abbiamo chiamato la nuova specie MEW.'"
    },
    {
      id: 'scientist_encounter_2f',
      trigger: 'interact',
      conditionFlag: '!scientist_braydon_pm_defeated',
      // Logica Engine: "Scienziato: 'Stavo conducendo ricerche qui! Vattene!'" -> Avvia battaglia
    }
  ]
};