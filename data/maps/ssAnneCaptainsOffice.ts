import { MapData } from '../../types';

export const ssAnneCaptainsOffice: MapData = {
  id: 'ss_anne_captains_office',
  name: 'S.S. Anne - Captain\'s Office',
  description: 'Sei nell\'ufficio del Capitano. L\'arredamento è elegante, con mappe nautiche appese alle pareti. Il Capitano è piegato sulla scrivania, con un colorito verdognolo.',
  connections: {
    // Le connessioni sono gestite come eventi/teleport interni
  },
  wildEncounters: [],
  trainers: [], // Nessuna battaglia qui
  events: [
    {
      id: 'exit_to_2f',
      trigger: 'interact',
      // Logica Engine: "Esci dall'ufficio e torni nel corridoio del secondo piano." -> Teleport a 'ss_anne_2f'
    },
    {
      id: 'talk_to_captain',
      trigger: 'interact',
      // Logica Engine:
      // Se flag 'hm01Obtained' è false:
      //   "Capitano: 'Urrgh... ho il mal di mare... Puoi farmi un massaggio alla schiena?'"
      //   -> (Animazione/Dialogo) -> "Capitano: 'Ahhh, grazie! Mi sento molto meglio! Come ricompensa, prendi questa MN segreta!'"
      //   -> Add Item 'hm01' (Taglio) -> Set flag 'hm01Obtained' -> AddLog("Hai ottenuto la MN01 TAGLIO!")
      //   -> "Capitano: 'TAGLIO permette di abbattere piccoli alberi. Ora scusami, devo dare l'ordine di salpare!'"
      //   -> Set flag 'ss_anne_departed' = true (Questo farà sparire la nave da Aranciopoli)
      // Se flag 'hm01Obtained' è true:
      //   "Capitano: 'Grazie ancora per l'aiuto! Buon viaggio!'"
    }
  ]
};