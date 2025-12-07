import { MapData } from '../../types';

export const rocketHideoutB2F: MapData = {
  id: 'rocket_hideout_b2f',
  name: 'Rocket Hideout - B2F',
  description: 'Sei nel secondo piano sotterraneo. Il pavimento è coperto da strani pannelli con delle frecce. Sembra che ti spingano in direzioni specifiche. Ci sono diverse reclute e oggetti sparsi.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [],
  trainers: [
    'rocket_grunt_hideout_3',
    'rocket_grunt_hideout_4'
  ],
  events: [
    {
      id: 'go_to_b1f',
      trigger: 'interact',
      // Logica Engine: "Sali le scale verso il primo piano sotterraneo." -> Teleport a 'rocket_hideout_b1f'
    },
    {
      id: 'go_to_b3f',
      trigger: 'interact',
      // Logica Engine: "Trovi delle scale che scendono ancora più in profondità." -> Teleport a 'rocket_hideout_b3f'
    },
    {
      id: 'spin_panel_maze',
      trigger: 'interact',
      // Logica Engine:
      // "Sali su un pannello direzionale. Vieni trascinato via!"
      // -> Scelta Multipla: [Pannello a Sud, Pannello a Ovest]
      // -> Se Sud: "Vieni trascinato in un corridoio stretto." -> Avvia battaglia con 'rocket_grunt_hideout_3'
      // -> Se Ovest: "Vieni trascinato verso una stanza con degli oggetti."
    },
    {
      id: 'item_nugget_rh',
      trigger: 'interact',
      conditionFlag: '!item_rh_nugget_taken',
      // Logica Engine: "Hai trovato una Pepita!" -> Add Item 'nugget' -> Set flag true
    },
    {
      id: 'item_moon_stone_rh',
      trigger: 'interact',
      conditionFlag: '!item_rh_moon_stone_taken',
      // Logica Engine: "Hai trovato una Pietralunare!" -> Add Item 'moon_stone' -> Set flag true
    },
    {
      id: 'item_tm07',
      trigger: 'interact',
      conditionFlag: '!item_tm07_taken',
      // Logica Engine: "Hai trovato MT07 (Perforcorno)!" -> Add Item 'tm07' -> Set flag true
    }
  ]
};