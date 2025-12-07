import { MapData } from '../../types';

export const silphCo1F: MapData = {
  id: 'silph_co_1f',
  name: 'Silph Co. - 1F',
  description: 'Sei nell\'enorme e lussuoso atrio della Silph SpA. L\'atmosfera è tesa. Diverse reclute del Team Rocket pattugliano l\'area. Una donna alla reception sembra terrorizzata.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [],
  trainers: [], // Gli allenatori sono gestiti come eventi di interazione
  events: [
    {
      id: 'exit_to_saffron',
      trigger: 'interact',
      // Logica Engine: "Esci dall'edificio e torni a Zafferanopoli." -> Teleport a 'saffron_city'
    },
    {
      id: 'go_to_2f_stairs',
      trigger: 'interact',
      // Logica Engine: "Sali le scale verso il secondo piano." -> Teleport a 'silph_co_2f'
    },
    {
      id: 'use_elevator_silph',
      trigger: 'interact',
      // Logica Engine:
      // Se flag 'card_key_obtained' è false: "L'ascensore è bloccato. Serve una Card Key."
      // Se true: "Usi la Card Key. A quale piano vuoi andare?"
      // -> Scelta Multipla: [2F, 3F, ..., 11F] -> Teleport al piano corrispondente
    },
    {
      id: 'receptionist_help',
      trigger: 'interact',
      // Logica Engine:
      // "Receptionist (sottovoce): 'Aiuto! Il Team Rocket ci ha presi in ostaggio! Stanno cercando di rubare la Master Ball dal nostro presidente all'ultimo piano!'"
    },
    {
      id: 'guard_grunt_1f',
      trigger: 'interact',
      conditionFlag: '!grunt_1f_defeated',
      // Logica Engine:
      // "Grunt: 'Ehi tu! Questa è proprietà del Team Rocket ora! Fuori di qui!'" -> Avvia battaglia con un Grunt generico di livello appropriato.
    }
  ]
};