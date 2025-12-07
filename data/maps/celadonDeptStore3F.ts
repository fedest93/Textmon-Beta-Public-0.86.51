import { MapData } from '../../types';

export const celadonDeptStore3F: MapData = {
  id: 'celadon_dept_store_3f',
  name: 'Celadon Dept. Store - 3F',
  description: 'Sei al terzo piano, dedicato ai giochi e all\'elettronica. Ci sono console in esposizione e diverse persone che ne discutono animatamente.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [],
  trainers: [],
  events: [
    {
      id: 'go_to_2f',
      trigger: 'interact',
      // Logica Engine: "Scendi le scale mobili verso il secondo piano." -> Teleport a 'celadon_dept_store_2f'
    },
    {
      id: 'go_to_4f',
      trigger: 'interact',
      // Logica Engine: "Sali le scale mobili verso il quarto piano." -> Teleport a 'celadon_dept_store_4f'
    },
    {
      id: 'use_elevator_3f',
      trigger: 'interact',
      // Logica Engine: Apre il menu dell'ascensore
    },
    {
      id: 'snes_gamer',
      trigger: 'interact',
      // Logica Engine:
      // "Ragazzo: 'Un Super NES con Mario Paint? Lo voglio!'"
    },
    {
      id: 'game_boy_kid',
      trigger: 'interact',
      // Logica Engine:
      // "Bambino: 'Wow! Un Game Boy! Ci si può giocare ovunque!'"
    },
    {
      id: 'shop_clerk_3f',
      trigger: 'interact',
      // Logica Engine:
      // "Commesso: 'Questo è il piano dei giochi. Purtroppo non abbiamo nulla in vendita al momento.'"
    }
  ]
};