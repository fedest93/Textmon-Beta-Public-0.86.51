import { MapData } from '../../types';

export const safariZoneEntrance: MapData = {
  id: 'safari_zone_entrance',
  name: 'Safari Zone - Entrance',
  description: 'Sei nell\'area di ingresso della Zona Safari. Ci sono diverse persone che si preparano per l\'esplorazione. Davanti a te, il parco si divide in tre grandi aree: Ovest, Centro e Est.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [], // Nessun incontro nell'area di ingresso
  trainers: [],
  events: [
    {
      id: 'exit_to_fuchsia',
      trigger: 'interact',
      // Logica Engine: "Vuoi uscire dalla Zona Safari?" -> Se sì, teleport a 'fuchsia_city'
    },
    {
      id: 'go_to_center_area',
      trigger: 'interact',
      // Logica Engine: "Entri nell'Area Centrale." -> Teleport a 'safari_zone_center'
    },
    {
      id: 'go_to_east_area',
      trigger: 'interact',
      // Logica Engine: "Prendi il sentiero per l'Area Est." -> Teleport a 'safari_zone_east'
    },
    {
      id: 'go_to_west_area',
      trigger: 'interact',
      // Logica Engine: "Prendi il sentiero per l'Area Ovest." -> Teleport a 'safari_zone_west'
    },
    {
      id: 'safari_game_info',
      trigger: 'interact',
      // Logica Engine:
      // "Guardia: 'Benvenuto! Hai 500 passi a disposizione. Buona fortuna!'"
      // (Qui l'engine dovrebbe avviare il contapassi)
    },
    {
      id: 'rest_house_1',
      trigger: 'interact',
      // Logica Engine: "Entri in una casa di riposo. Un uomo ti dà un consiglio."
      // "Uomo: 'Nella casa segreta in fondo al parco si trova una MN rara!'"
    }
  ]
};