import { MapData } from '../../types';

export const pokemonMansionB1F: MapData = {
  id: 'pokemon_mansion_b1f',
  name: 'Pokémon Mansion - B1F',
  description: 'Sei nel seminterrato della villa. È un labirinto di stanze strette e corridoi bui. Sembra essere l\'area di ricerca segreta. In fondo a una stanza, vedi un oggetto luccicare su un tavolo.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [
    // Grimer: Comune (Livelli 30-34)
    { pokemonId: 88, minLevel: 30, maxLevel: 34, rate: 30 },
    // Muk: Raro (Livello 36)
    { pokemonId: 89, minLevel: 36, maxLevel: 36, rate: 5 },
    // Koffing: Comune (Livelli 30-34)
    { pokemonId: 109, minLevel: 30, maxLevel: 34, rate: 30 },
    // Weezing: Raro (Livello 36)
    { pokemonId: 110, minLevel: 36, maxLevel: 36, rate: 5 },
    // Ditto: Molto comune qui (Livelli 32-35)
    { pokemonId: 132, minLevel: 32, maxLevel: 35, rate: 30 }
  ],
  trainers: [
    'scientist_ted_pm',
    'burglar_arlon_pm'
  ],
  events: [
    {
      id: 'go_to_3f_from_b1f',
      trigger: 'interact',
      // Logica Engine: "Sali le scale e torni al terzo piano." -> Teleport a 'pokemon_mansion_3f'
    },
    {
      id: 'secret_key_room',
      trigger: 'interact',
      // Logica Engine:
      // "Questa stanza è bloccata da una porta di metallo."
      // Se flag 'mansion_switch_1_pressed' e 'mansion_switch_2_pressed' sono true:
      //   "La porta si apre con un 'clic'!" -> Permette l'accesso alla stanza con la chiave.
    },
    {
      id: 'get_secret_key',
      trigger: 'interact',
      conditionFlag: '!secret_key_obtained',
      // Logica Engine:
      // "Sul tavolo, trovi la Chiave Segreta!" -> Add Item 'secret_key' -> Set flag 'secret_key_obtained'
    },
    {
      id: 'diary_entry_final',
      trigger: 'interact',
      // Logica Engine: "Leggi l'ultima pagina del diario: 'Settembre 1. MEWTWO è troppo forte. Non riusciamo a controllarlo. È fuggito... ha distrutto il laboratorio...'"
    },
    {
      id: 'item_tm14',
      trigger: 'interact',
      conditionFlag: '!item_tm14_taken',
      // Logica Engine: "Hai trovato MT14 (Bora)!" -> Add Item 'tm14' -> Set flag true
    }
  ]
};