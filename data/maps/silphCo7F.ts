import { MapData } from '../../types';

export const silphCo7F: MapData = {
  id: 'silph_co_7f',
  name: 'Silph Co. - 7F',
  description: 'Sei al settimo piano. È un corridoio stretto che porta a una sala riunioni. Appena entri, il tuo rivale ti vede e ti corre incontro!',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [],
  trainers: [
    'rival_6_silph',
    'rocket_grunt_silph_7f_1', // Aggiunto per densità
    'scientist_jerry_silph_7f' // Aggiunto per densità
  ],
  events: [
    {
      id: 'go_to_6f_stairs',
      trigger: 'interact',
      // Logica Engine: "Scendi le scale verso il sesto piano." -> Teleport a 'silph_co_6f'
    },
    {
      id: 'use_elevator_7f',
      trigger: 'interact',
      // Logica Engine: Apre il menu dell'ascensore
    },
    {
      id: 'rival_encounter_silph',
      trigger: 'enter', // Si attiva automaticamente all'ingresso
      conditionFlag: '!rival_6_silph_defeated',
      // Logica Engine:
      // "Gary: 'Che ci fai qui? Non dirmi che vuoi salvare la Silph Co.! Lascia fare a me!'"
      // -> Avvia battaglia con 'rival_6_silph'
    },
    {
      id: 'teleporter_7f_to_11f_boss',
      trigger: 'interact',
      conditionFlag: 'rival_6_silph_defeated',
      // Logica Engine:
      // "Questo teletrasporto sembra portare direttamente dal capo..."
      // -> Teleport a 'silph_co_11f'
    },
    {
      id: 'teleporter_7f_to_3f_return',
      trigger: 'interact',
      // Logica Engine: "Questo teletrasporto ti riporta al terzo piano." -> Teleport a 'silph_co_3f'
    },
    {
      id: 'item_tm03',
      trigger: 'interact',
      conditionFlag: '!item_tm03_taken',
      // Logica Engine: "Hai trovato MT03 (Danzaspada)!" -> Add Item 'tm03' -> Set flag true
    }
  ]
};