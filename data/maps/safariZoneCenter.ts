import { MapData } from '../../types';

export const safariZoneCenter: MapData = {
  id: 'safari_zone_center',
  name: 'Safari Zone - Center Area',
  description: 'Sei nell\'Area Centrale della Zona Safari. Un grande spiazzo erboso si estende davanti a te, con un laghetto al centro. L\'erba è molto alta e senti movimenti ovunque.',
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
    // Venonat: Non comune (Livello 24)
    { pokemonId: 48, minLevel: 24, maxLevel: 24, rate: 15 },
    // Rhyhorn: Non comune (Livello 25)
    { pokemonId: 111, minLevel: 25, maxLevel: 25, rate: 15 },
    // Chansey: Raro (Livello 23)
    { pokemonId: 113, minLevel: 23, maxLevel: 23, rate: 5 },
    // **ESCLUSIVA DI ZONA:** Kangaskhan
    { pokemonId: 115, minLevel: 25, maxLevel: 25, rate: 15 }
  ],
  trainers: [],
  events: [
    {
      id: 'return_to_entrance',
      trigger: 'interact',
      // Logica Engine: "Torni all'ingresso della Zona Safari." -> Teleport a 'safari_zone_entrance'
    },
    {
      id: 'go_to_east_from_center',
      trigger: 'interact',
      // Logica Engine: "Prendi un sentiero che porta all'Area Est." -> Teleport a 'safari_zone_east'
    },
    {
      id: 'go_to_west_from_center',
      trigger: 'interact',
      // Logica Engine: "Prendi un sentiero che porta all'Area Ovest." -> Teleport a 'safari_zone_west'
    },
    {
      id: 'item_nugget_szc',
      trigger: 'interact',
      conditionFlag: '!item_szc_nugget_taken',
      // Logica Engine: "Hai trovato una Pepita!" -> Add Item 'nugget' -> Set flag true
    },
    {
      id: 'sign_center_area',
      trigger: 'interact',
      // Logica Engine: "CARTELLO: Area Centrale - Attenzione ai Kangaskhan!"
    }
  ]
};