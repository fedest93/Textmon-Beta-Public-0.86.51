import { MapData } from '../../types';

export const silphCo2F: MapData = {
  id: 'silph_co_2f',
  name: 'Silph Co. - 2F',
  description: 'Sei al secondo piano. È un grande ufficio open-space con diverse scrivanie. Alcune reclute Rocket e uno scienziato stanno rovistando tra i documenti. In un angolo, vedi un pannello teletrasporto.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [],
  trainers: [
    'rocket_grunt_silph_2f_1',
    'scientist_connor_silph_2f'
  ],
  events: [
    {
      id: 'go_to_1f_stairs',
      trigger: 'interact',
      // Logica Engine: "Scendi le scale verso l'atrio." -> Teleport a 'silph_co_1f'
    },
    {
      id: 'use_elevator_2f',
      trigger: 'interact',
      // Logica Engine: Apre il menu dell'ascensore (se hai la Card Key)
    },
    {
      id: 'teleporter_2f_to_8f',
      trigger: 'interact',
      // Logica Engine:
      // "Sali sul teletrasporto. Vieni avvolto da una luce accecante!"
      // -> (Animazione) -> Teleport a 'silph_co_8f'
    },
    {
      id: 'grunt_encounter_2f',
      trigger: 'interact',
      conditionFlag: '!rocket_grunt_silph_2f_1_defeated',
      // Logica Engine: "Grunt: 'Stiamo cercando la Card Key! Non disturbarci!'" -> Avvia battaglia
    },
    {
      id: 'scientist_encounter_2f',
      trigger: 'interact',
      conditionFlag: '!scientist_connor_silph_2f_defeated',
      // Logica Engine: "Scienziato: 'Il Team Rocket mi paga bene per i miei servigi!'" -> Avvia battaglia
    }
  ]
};