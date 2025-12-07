import { MapData } from '../../types';

export const pokemonTower5F: MapData = {
  id: 'pokemon_tower_5f',
  name: 'Pokémon Tower - 5F',
  description: 'Sei al quinto piano. Al centro della stanza, un\'area è circondata da un sigillo luminoso che emana un senso di pace. È un rifugio sicuro in questo luogo spettrale.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [
    // Gastly: Onnipresente (Livelli 15-21)
    { pokemonId: 92, minLevel: 15, maxLevel: 21, rate: 80 },
    // Haunter: Raro (Livello 20)
    { pokemonId: 93, minLevel: 20, maxLevel: 20, rate: 5 },
    // Cubone: Non comune (Livelli 17-19)
    { pokemonId: 104, minLevel: 17, maxLevel: 19, rate: 15 }
  ],
  trainers: [
    // Le Channeler di questo piano
    'channeler_ruth',
    'channeler_karina',
    'channeler_janae'
  ],
  events: [
    {
      id: 'go_to_4f',
      trigger: 'interact',
      // Logica Engine: "Scendi le scale verso il quarto piano." -> Teleport a 'pokemon_tower_4f'
    },
    {
      id: 'go_to_6f',
      trigger: 'interact',
      // Logica Engine: "Sali le scale verso il sesto piano." -> Teleport a 'pokemon_tower_6f'
    },
    {
      id: 'healing_zone',
      trigger: 'interact',
      // Logica Engine:
      // "Entri nell'area protetta. I tuoi Pokémon si sentono rinvigoriti!"
      // -> Heal Party
      // (In questa zona, gli incontri selvatici sono disattivati)
    },
    {
      id: 'channeler_encounter_4',
      trigger: 'interact',
      // Logica Engine: "Channeler: 'Unisciti a noi...'" -> Avvia battaglia
    },
    {
      id: 'item_nugget',
      trigger: 'interact',
      conditionFlag: '!item_pt5f_nugget_taken',
      // Logica Engine: "Hai trovato una Pepita!" -> Add Item 'nugget' -> Set flag true
    }
  ]
};