import { MapData } from '../../types';

export const silphCo9F: MapData = {
  id: 'silph_co_9f',
  name: 'Silph Co. - 9F',
  description: 'Sei al nono piano. Sembra una sorta di infermeria o area di riposo. C\'è un letto in un angolo che sembra comodo. Una recluta Rocket blocca un teletrasporto.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [],
  trainers: [
    'rocket_grunt_silph_9f_1'
  ],
  events: [
    {
      id: 'go_to_8f_stairs',
      trigger: 'interact',
      // Logica Engine: "Scendi le scale verso l'ottavo piano." -> Teleport a 'silph_co_8f'
    },
    {
      id: 'use_elevator_9f',
      trigger: 'interact',
      // Logica Engine: Apre il menu dell'ascensore
    },
    {
      id: 'teleporter_9f_to_5f',
      trigger: 'interact',
      // Logica Engine: "Sali sul teletrasporto... e ti ritrovi al quinto piano." -> Teleport a 'silph_co_5f'
    },
    {
      id: 'rest_bed',
      trigger: 'interact',
      // Logica Engine:
      // "Una donna ti vede: 'Sei qui per salvarci? Per favore, fai riposare i tuoi Pokémon prima di continuare!'"
      // -> "Ti riposi sul letto." -> Heal Party
    },
    {
      id: 'grunt_encounter_9f',
      trigger: 'interact',
      conditionFlag: '!rocket_grunt_silph_9f_1_defeated',
      // Logica Engine: "Grunt: 'Ho visto un fantasma! Anzi no, sei solo tu!'" -> Avvia battaglia
    },
    {
      id: 'item_calcium_9f',
      trigger: 'interact',
      conditionFlag: '!item_silph_9f_calcium_taken',
      // Logica Engine: "Hai trovato Calcio!" -> Add Item 'calcium' -> Set flag true
    }
  ]
};