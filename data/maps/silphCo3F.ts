import { MapData } from '../../types';

export const silphCo3F: MapData = {
  id: 'silph_co_3f',
  name: 'Silph Co. - 3F',
  description: 'Sei al terzo piano. Sembra una sala conferenze, ora occupata dal Team Rocket. Ci sono due teletrasporti in stanze separate.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [],
  trainers: [
    'rocket_grunt_silph_3f_1'
  ],
  events: [
    {
      id: 'go_to_2f_stairs',
      trigger: 'interact',
      // Logica Engine: "Scendi le scale verso il secondo piano." -> Teleport a 'silph_co_2f'
    },
    {
      id: 'use_elevator_3f',
      trigger: 'interact',
      // Logica Engine: Apre il menu dell'ascensore
    },
    {
      id: 'teleporter_3f_to_5f',
      trigger: 'interact',
      // Logica Engine: "Sali sul teletrasporto... e ti ritrovi al quinto piano." -> Teleport a 'silph_co_5f'
    },
    {
      id: 'teleporter_3f_to_7f_key',
      trigger: 'interact',
      // Logica Engine: "Questo teletrasporto sembra importante... Ti ritrovi in un corridoio stretto al settimo piano." -> Teleport a 'silph_co_7f'
    },
    {
      id: 'grunt_encounter_3f',
      trigger: 'interact',
      conditionFlag: '!rocket_grunt_silph_3f_1_defeated',
      // Logica Engine: "Grunt: 'Questo teletrasporto è sorvegliato!'" -> Avvia battaglia
    },
    {
      id: 'silph_employee_hiding',
      trigger: 'interact',
      // Logica Engine: "Impiegato (sottovoce): 'La Card Key si trova al quinto piano! Devi trovarla per usare l'ascensore!'"
    }
  ]
};