import { MapData } from '../../types';

export const rocketHideoutB3F: MapData = {
  id: 'rocket_hideout_b3f',
  name: 'Rocket Hideout - B3F',
  description: 'Sei nel terzo piano sotterraneo. È un\'area più tranquilla, con meno pannelli rotanti. Una recluta solitaria sorveglia le scale che portano all\'ultimo piano.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [],
  trainers: [
    'rocket_grunt_hideout_5'
  ],
  events: [
    {
      id: 'go_to_b2f',
      trigger: 'interact',
      // Logica Engine: "Sali le scale verso il secondo piano sotterraneo." -> Teleport a 'rocket_hideout_b2f'
    },
    {
      id: 'go_to_b4f',
      trigger: 'interact',
      // Logica Engine: "Scendi le scale verso l'ultimo piano, dove si trova l'ufficio del capo." -> Teleport a 'rocket_hideout_b4f'
    },
    {
      id: 'grunt_encounter_b3f',
      trigger: 'interact',
      conditionFlag: '!rocket_grunt_hideout_5_defeated',
      // Logica Engine: "Grunt: 'Proteggo l'ascensore! Non passerai!'" -> Avvia battaglia con 'rocket_grunt_hideout_5'
    },
    {
      id: 'item_tm10',
      trigger: 'interact',
      conditionFlag: '!item_tm10_taken',
      // Logica Engine: "Hai trovato MT10 (Sdoppiatore)!" -> Add Item 'tm10' -> Set flag true
    }
  ]
};