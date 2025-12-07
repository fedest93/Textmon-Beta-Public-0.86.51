import { MapData } from '../../types';

export const safariZoneWest: MapData = {
  id: 'safari_zone_west',
  name: 'Safari Zone - West Area',
  description: 'Sei nell\'Area Ovest della Zona Safari. Il terreno è più accidentato e ci sono più laghetti. In fondo al percorso, vedi una casa isolata.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [
    // Nidoran F: Comune (Livello 22)
    { pokemonId: 29, minLevel: 22, maxLevel: 22, rate: 20 },
    // Nidorina: Non comune (Livello 31)
    { pokemonId: 30, minLevel: 31, maxLevel: 31, rate: 10 },
    // Exeggcute: Comune (Livello 25)
    { pokemonId: 102, minLevel: 25, maxLevel: 25, rate: 20 },
    // Parasect: Raro (Livello 30)
    { pokemonId: 47, minLevel: 30, maxLevel: 30, rate: 5 },
    // Venomoth: Non comune (Livello 32)
    { pokemonId: 49, minLevel: 32, maxLevel: 32, rate: 15 },
    // Rhyhorn: Non comune (Livello 25)
    { pokemonId: 111, minLevel: 25, maxLevel: 25, rate: 15 },
    // **ESCLUSIVA DI ZONA:** Pinsir
    { pokemonId: 127, minLevel: 28, maxLevel: 28, rate: 5 },
    // **ESCLUSIVA DI ZONA (PESCA):** Dratini
    // { pokemonId: 147, minLevel: 15, maxLevel: 25, rate: 15, method: 'fishing' }
  ],
  trainers: [],
  events: [
    {
      id: 'return_to_center_from_west',
      trigger: 'interact',
      // Logica Engine: "Torni nell'Area Centrale." -> Teleport a 'safari_zone_center'
    },
    {
      id: 'item_gold_teeth',
      trigger: 'interact',
      conditionFlag: '!item_gold_teeth_taken',
      // Logica Engine: "Hai trovato dei Denti d'Oro! Chissà chi li ha persi..." -> Add Item 'gold_teeth' -> Set flag true
    },
    {
      id: 'secret_house_surf',
      trigger: 'interact',
      // Logica Engine:
      // "Entri nella Casa Segreta. Un uomo ti aspetta."
      // "Uomo: 'Sei arrivato fin qui! Sei un vero esploratore! Prendi questa MN rara!'"
      // -> Add Item 'hm03' (Surf) -> Set flag 'hm03_obtained'
    },
    {
      id: 'item_tm37',
      trigger: 'interact',
      conditionFlag: '!item_tm37_taken',
      // Logica Engine: "Hai trovato MT37 (Uovobomba)!" -> Add Item 'tm37' -> Set flag true
    }
  ]
};