import { MapData } from '../../types';

export const silphCo4F: MapData = {
  id: 'silph_co_4f',
  name: 'Silph Co. - 4F',
  description: 'Sei al quarto piano. È un\'area di stoccaggio con casse e scatoloni ovunque. Una recluta Rocket sta di guardia vicino a un teletrasporto.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [],
  trainers: [
    'rocket_grunt_silph_4f_1'
  ],
  events: [
    {
      id: 'go_to_3f_stairs',
      trigger: 'interact',
      // Logica Engine: "Scendi le scale verso il terzo piano." -> Teleport a 'silph_co_3f'
    },
    {
      id: 'use_elevator_4f',
      trigger: 'interact',
      // Logica Engine: Apre il menu dell'ascensore
    },
    {
      id: 'teleporter_4f_to_10f_deadend',
      trigger: 'interact',
      // Logica Engine: "Sali sul teletrasporto... e ti ritrovi in una piccola stanza al decimo piano." -> Teleport a 'silph_co_10f' (in una sezione isolata)
    },
    {
      id: 'grunt_encounter_4f',
      trigger: 'interact',
      conditionFlag: '!rocket_grunt_silph_4f_1_defeated',
      // Logica Engine: "Grunt: 'Stai cercando qualcosa? Non lo troverai!'" -> Avvia battaglia
    },
    {
      id: 'item_full_heal_4f',
      trigger: 'interact',
      conditionFlag: '!item_silph_4f_full_heal_taken',
      // Logica Engine: "Hai trovato una Cura Totale!" -> Add Item 'full_heal' -> Set flag true
    }
  ]
};