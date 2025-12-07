import { MapData } from '../../types';

export const undergroundPathWestEast: MapData = {
  id: 'underground_path_west_east',
  name: 'Underground Path (Route 8-7)',
  description: 'Un altro tunnel sotterraneo, pulito e ben tenuto. È una scorciatoia per raggiungere Azzurropoli senza passare per la sorvegliatissima Zafferanopoli.',
  connections: {
    east: 'route_8', // Uscita verso la casetta del Percorso 8
    west: 'route_7'  // Uscita verso la casetta del Percorso 7
  },
  wildEncounters: [], // Nessun incontro selvatico
  trainers: [], // Nessun allenatore
  events: [
    {
      id: 'hidden_item_3',
      trigger: 'interact',
      conditionFlag: '!item_up_we_1_taken',
      // Logica Engine:
      // "C'è qualcosa che brilla per terra!" -> Trovi un oggetto (es. X Accuracy)
      // Setta flag per non poterlo raccogliere di nuovo.
    },
    {
      id: 'hidden_item_4',
      trigger: 'interact',
      conditionFlag: '!item_up_we_2_taken',
      // Logica Engine:
      // "C'è qualcosa che brilla per terra!" -> Trovi un oggetto (es. Revitalizzante)
      // Setta flag per non poterlo raccogliere di nuovo.
    }
  ]
};