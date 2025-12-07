import { MapData } from '../../types';

export const pokemonMansion1F: MapData = {
  id: 'pokemon_mansion_1f',
  name: 'Pokémon Mansion - 1F',
  description: 'Sei nell\'atrio della villa. Tappeti strappati e mobili rotti sono sparsi ovunque. Una grande scalinata porta al secondo piano, mentre un\'altra scende verso il seminterrato. Ci sono delle strane statue di Pokémon.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [
    // Rattata: Comune (Livelli 25-28)
    { pokemonId: 19, minLevel: 25, maxLevel: 28, rate: 25 },
    // Raticate: Non comune (Livello 30)
    { pokemonId: 20, minLevel: 30, maxLevel: 30, rate: 10 },
    // Vulpix: Comune (Livelli 26-30)
    { pokemonId: 37, minLevel: 26, maxLevel: 30, rate: 20 },
    // Growlithe: Comune (Livelli 26-30)
    { pokemonId: 58, minLevel: 26, maxLevel: 30, rate: 20 },
    // Koffing: Non comune (Livello 28)
    { pokemonId: 109, minLevel: 28, maxLevel: 28, rate: 15 },
    // Grimer: Non comune (Livello 28)
    { pokemonId: 88, minLevel: 28, maxLevel: 28, rate: 10 }
  ],
  trainers: [
    'burglar_quinn_pm'
  ],
  events: [
    {
      id: 'exit_to_cinnabar',
      trigger: 'interact',
      // Logica Engine: "Esci dalla villa e torni all'aria aperta." -> Teleport a 'cinnabar_island'
    },
    {
      id: 'go_to_2f',
      trigger: 'interact',
      // Logica Engine: "Sali la grande scalinata verso il secondo piano." -> Teleport a 'pokemon_mansion_2f'
    },
    {
      id: 'go_to_b1f',
      trigger: 'interact',
      // Logica Engine: "Scendi le scale verso il seminterrato." -> Teleport a 'pokemon_mansion_b1f'
    },
    {
      id: 'mew_statue_switch',
      trigger: 'interact',
      // Logica Engine:
      // "C'è una statua di un Pokémon misterioso. Noti un interruttore nascosto."
      // -> Scelta: [Premi l'interruttore] -> "Senti un 'clic' provenire da un'altra stanza." -> Set flag 'mansion_switch_1_pressed'
    },
    {
      id: 'diary_entry_1',
      trigger: 'interact',
      // Logica Engine: "Leggi una pagina strappata di un diario: 'Luglio 5. Guyana, Sud America. Un nuovo Pokémon è stato scoperto nelle profondità della giungla...'"
    }
  ]
};