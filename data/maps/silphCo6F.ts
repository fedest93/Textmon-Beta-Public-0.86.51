import { MapData } from '../../types';

export const silphCo6F: MapData = {
  id: 'silph_co_6f',
  name: 'Silph Co. - 6F',
  description: 'Sei al sesto piano. È un lungo corridoio con diverse stanze laterali. Molte sono chiuse a chiave. Una recluta Rocket pattuglia l\'area.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [],
  trainers: [
    'rocket_grunt_silph_6f_1'
  ],
  events: [
    {
      id: 'go_to_5f_stairs',
      trigger: 'interact',
      // Logica Engine: "Scendi le scale verso il quinto piano." -> Teleport a 'silph_co_5f'
    },
    {
      id: 'use_elevator_6f',
      trigger: 'interact',
      // Logica Engine: Apre il menu dell'ascensore
    },
    {
      id: 'teleporter_6f_to_8f',
      trigger: 'interact',
      // Logica Engine: "Sali sul teletrasporto... e ti ritrovi all'ottavo piano." -> Teleport a 'silph_co_8f'
    },
    {
      id: 'grunt_encounter_6f',
      trigger: 'interact',
      conditionFlag: '!rocket_grunt_silph_6f_1_defeated',
      // Logica Engine: "Grunt: 'Il capo si fida di me! Non ti farò passare!'" -> Avvia battaglia
    },
    {
      id: 'locked_door_1',
      trigger: 'interact',
      // Logica Engine:
      // Se hai 'card_key': "Usi la Card Key e apri la porta. Dentro trovi un impiegato."
      // "Impiegato: 'Grazie per avermi liberato! Prendi questo!'" -> Add Item 'hp_up'
      // Se non hai 'card_key': "La porta è chiusa a chiave."
    },
    {
      id: 'item_carbos_6f',
      trigger: 'interact',
      conditionFlag: '!item_silph_6f_carbos_taken',
      // Logica Engine: "Hai trovato Carburante!" -> Add Item 'carbos' -> Set flag true
    }
  ]
};