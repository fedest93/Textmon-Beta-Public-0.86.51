import { MapData } from '../../types';

export const safariZoneEast: MapData = {
  id: 'safari_zone_east',
  name: 'Safari Zone - East Area',
  description: 'Sei nell\'Area Est della Zona Safari. L\'erba qui è particolarmente fitta e difficile da attraversare. In lontananza vedi una piccola capanna.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [
    // Nidoran M: Comune (Livello 22)
    { pokemonId: 32, minLevel: 22, maxLevel: 22, rate: 20 },
    // Nidorino: Non comune (Livello 31)
    { pokemonId: 33, minLevel: 31, maxLevel: 31, rate: 10 },
    // Exeggcute: Comune (Livello 25)
    { pokemonId: 102, minLevel: 25, maxLevel: 25, rate: 20 },
    // Paras: Non comune (Livello 24)
    { pokemonId: 46, minLevel: 24, maxLevel: 24, rate: 15 },
    // Doduo: Non comune (Livello 26)
    { pokemonId: 84, minLevel: 26, maxLevel: 26, rate: 15 },
    // Rhyhorn: Non comune (Livello 25)
    { pokemonId: 111, minLevel: 25, maxLevel: 25, rate: 15 },
    // **ESCLUSIVA DI ZONA:** Scyther
    { pokemonId: 123, minLevel: 28, maxLevel: 28, rate: 5 }
  ],
  trainers: [],
  events: [
    {
      id: 'return_to_center_from_east',
      trigger: 'interact',
      // Logica Engine: "Torni nell'Area Centrale." -> Teleport a 'safari_zone_center'
    },
    {
      id: 'item_tm32',
      trigger: 'interact',
      conditionFlag: '!item_tm32_taken',
      // Logica Engine: "Hai trovato MT32 (Doppioteam)!" -> Add Item 'tm32' -> Set flag true
    },
    {
      id: 'rest_house_2',
      trigger: 'interact',
      // Logica Engine: "Entri in una casa di riposo. Un uomo ti mostra le sue foto di Pokémon rari."
    }
  ]
};