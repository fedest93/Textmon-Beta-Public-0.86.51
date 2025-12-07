import { MapData } from '../../types';

export const ssAnneExterior: MapData = {
  id: 'ss_anne_exterior',
  name: 'S.S. Anne - Deck',
  description: 'Sei sul ponte della lussuosa M/N Anna. Il sole splende e si sente la brezza marina. A sinistra c\'è l\'ingresso per il primo piano, a destra una scala che scende sottocoperta.',
  connections: {
    // Le connessioni sono gestite come eventi/teleport interni alla nave
  },
  wildEncounters: [],
  trainers: [], // Gli allenatori sono all'interno
  events: [
    {
      id: 'enter_1f',
      trigger: 'interact',
      // Logica Engine:
      // "Entri nel salone principale della nave." -> Teleport a 'ss_anne_1f'
    },
    {
      id: 'enter_b1f',
      trigger: 'interact',
      // Logica Engine:
      // "Scendi le scale verso le cabine inferiori." -> Teleport a 'ss_anne_b1f'
    },
    {
      id: 'lookout_point',
      trigger: 'interact',
      // Logica Engine:
      // "Guardi l'orizzonte. Il mare è vasto e blu."
    },
    {
      id: 'leave_ship',
      trigger: 'interact',
      // Logica Engine:
      // "Vuoi sbarcare?" -> Se sì, teleport a 'vermilion_city'
      // Nota: Dopo aver ottenuto Taglio, la nave salpa e questo evento scompare.
    }
  ]
};