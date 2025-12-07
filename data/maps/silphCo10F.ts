import { MapData } from '../../types';

export const silphCo10F: MapData = {
  id: 'silph_co_10f',
  name: 'Silph Co. - 10F',
  description: 'Sei al decimo piano. Sembra un laboratorio di ricerca, pieno di macchinari complessi. Uno scienziato sta lavorando a un prototipo.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [],
  trainers: [
    'scientist_josef_silph_10f'
  ],
  events: [
    {
      id: 'go_to_9f_stairs',
      trigger: 'interact',
      // Logica Engine: "Scendi le scale verso il nono piano." -> Teleport a 'silph_co_9f'
    },
    {
      id: 'use_elevator_10f',
      trigger: 'interact',
      // Logica Engine: Apre il menu dell'ascensore
    },
    {
      id: 'teleporter_10f_to_4f',
      trigger: 'interact',
      // Logica Engine: "Sali sul teletrasporto... e ti ritrovi al quarto piano." -> Teleport a 'silph_co_4f'
    },
    {
      id: 'scientist_encounter_10f',
      trigger: 'interact',
      conditionFlag: '!scientist_josef_silph_10f_defeated',
      // Logica Engine: "Scienziato: 'I miei esperimenti non devono essere interrotti!'" -> Avvia battaglia
    },
    {
      id: 'item_tm26',
      trigger: 'interact',
      conditionFlag: '!item_tm26_taken',
      // Logica Engine: "Hai trovato MT26 (Terremoto)!" -> Add Item 'tm26' -> Set flag true
    },
    {
      id: 'item_rare_candy_10f',
      trigger: 'interact',
      conditionFlag: '!item_silph_10f_rare_candy_taken',
      // Logica Engine: "Hai trovato una Caramella Rara!" -> Add Item 'rare_candy' -> Set flag true
    }
  ]
};