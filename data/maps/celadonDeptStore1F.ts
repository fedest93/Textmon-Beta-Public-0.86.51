import { MapData } from '../../types';

export const celadonDeptStore1F: MapData = {
  id: 'celadon_dept_store_1f',
  name: 'Celadon Dept. Store - 1F',
  description: 'Sei al piano terra del Centro Commerciale. Un addetto alla reception ti dà il benvenuto. Ci sono delle scale mobili che portano ai piani superiori e un ascensore in fondo.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [],
  trainers: [],
  events: [
    {
      id: 'exit_to_celadon',
      trigger: 'interact',
      // Logica Engine: "Esci dal Centro Commerciale." -> Teleport a 'celadon_city'
    },
    {
      id: 'go_to_2f',
      trigger: 'interact',
      // Logica Engine: "Sali le scale mobili verso il secondo piano." -> Teleport a 'celadon_dept_store_2f'
    },
    {
      id: 'use_elevator',
      trigger: 'interact',
      // Logica Engine:
      // "Ascensore. A quale piano vuoi andare?"
      // -> Scelta Multipla: [2F, 3F, 4F, 5F, Rooftop]
      // -> Teleport al piano corrispondente
    },
    {
      id: 'receptionist',
      trigger: 'interact',
      // Logica Engine:
      // "Receptionist: 'Benvenuto al Centro Commerciale di Azzurropoli! Qui puoi trovare di tutto!'"
      // -> Mostra una mappa dei piani:
      // 1F: Servizio Clienti
      // 2F: Articoli per Allenatori
      // 3F: Negozio TV Game
      // 4F: Articoli da Regalo
      // 5F: Farmaci e Vitamine
      // Rooftop: Distributori Automatici
    }
  ]
};