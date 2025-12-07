import { MapData } from '../../types';

export const undergroundPathNorthSouth: MapData = {
  id: 'underground_path_north_south',
  name: 'Underground Path (Route 5-6)',
  description: 'Un tunnel sotterraneo ben illuminato e pulito. Si sentono i passi echeggiare. È una scorciatoia sicura per evitare Zafferanopoli.',
  connections: {
    north: 'route_5', // Uscita verso la casetta del Percorso 5
    south: 'route_6'  // Uscita verso la casetta del Percorso 6
  },
  wildEncounters: [], // Nessun incontro selvatico qui
  trainers: [], // Nessun allenatore qui
  events: [
    {
      id: 'hidden_item_1',
      trigger: 'interact',
      conditionFlag: '!item_up_ns_1_taken',
      // Logica Engine:
      // "C'è qualcosa che brilla per terra!" -> Trovi un oggetto (es. Pozione o Antidoto)
      // Setta flag per non poterlo raccogliere di nuovo.
    },
    {
      id: 'hidden_item_2',
      trigger: 'interact',
      conditionFlag: '!item_up_ns_2_taken',
      // Logica Engine:
      // "C'è qualcosa che brilla per terra!" -> Trovi un oggetto (es. Repellente)
      // Setta flag per non poterlo raccogliere di nuovo.
    }
  ]
};