import { MapData } from '../../types';

export const silphCo8F: MapData = {
  id: 'silph_co_8f',
  name: 'Silph Co. - 8F',
  description: 'Sei all\'ottavo piano. È un\'area tranquilla con diverse sale relax per i dipendenti, ora deserte. Una recluta Rocket sta di guardia vicino a un teletrasporto.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [],
  trainers: [
    'rocket_grunt_silph_8f_1'
  ],
  events: [
    {
      id: 'go_to_7f_stairs',
      trigger: 'interact',
      // Logica Engine: "Scendi le scale verso il settimo piano." -> Teleport a 'silph_co_7f'
    },
    {
      id: 'use_elevator_8f',
      trigger: 'interact',
      // Logica Engine: Apre il menu dell'ascensore
    },
    {
      id: 'teleporter_8f_to_2f',
      trigger: 'interact',
      // Logica Engine: "Sali sul teletrasporto... e ti ritrovi al secondo piano." -> Teleport a 'silph_co_2f'
    },
    {
      id: 'grunt_encounter_8f',
      trigger: 'interact',
      conditionFlag: '!rocket_grunt_silph_8f_1_defeated',
      // Logica Engine: "Grunt: 'Questo piano è sotto il mio controllo!'" -> Avvia battaglia
    },
    {
      id: 'silph_employee_info_8f',
      trigger: 'interact',
      // Logica Engine:
      // "Impiegato: 'Ho sentito che il capo del Team Rocket è all'undicesimo piano! Ma per arrivarci serve la Card Key!'"
    }
  ]
};