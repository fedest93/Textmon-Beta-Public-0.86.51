import { MapData } from '../../types';

export const ceruleanCity: MapData = {
  id: 'cerulean_city',
  name: 'Cerulean City',
  description: 'Una bellissima città circondata da corsi d\'acqua. Si respira un\'aria misteriosa a causa del recente furto in una casa.',
  connections: {
    west: 'route_4', // Arrivo dai gradoni
    south: 'route_5', // Verso la Pensione/Zafferanopoli
    north: 'route_24', // Ponte Pepita (Bloccato dal rivale inizialmente)
    east: 'route_9' // Verso il Tunnel Roccioso (Bloccato da alberello Taglio)
  },
  wildEncounters: [], // In città si pesca, ma per ora lasciamo vuoto o aggiungiamo pesca in futuro
  trainers: [], // Gary è gestito come evento trigger
  events: [
    {
      id: 'poke_center',
      trigger: 'interact',
      // Logica Engine: Cura e PC
    },
    {
      id: 'poke_mart',
      trigger: 'interact',
      // Logica Engine: Shop
    },
    {
      id: 'cerulean_gym',
      trigger: 'interact',
      // Logica Engine:
      // Se flag 'cascadeBadgeObtained' è true: "Hai già battuto Misty."
      // Se false: Entra in palestra -> Gauntlet (Swimmer Luis -> Misty).
    },
    {
      id: 'rival_block_north',
      trigger: 'interact', // O trigger automatico provando ad andare a Nord
      conditionFlag: '!rival_3_cerulean_defeated',
      // Logica Engine:
      // Gary appare: "Ehi! Ancora tu? Stai andando da Bill? Fammi vedere se sei migliorato!"
      // Battle Start: 'rival_3_cerulean' (definito in zone1.ts)
      // Win: Set flag 'rival_3_cerulean_defeated' -> Gary se ne va -> Nord sbloccato.
    },
    {
      id: 'robbed_house_guard',
      trigger: 'interact',
      conditionFlag: '!bill_helped', // L'agente si sposta solo dopo aver aiutato Bill
      // Logica Engine:
      // "La gente di qui è stata derubata. Il Team Rocket è sospettato. Non posso far passare nessuno."
      // Blocca l'accesso alla casa svaligiata (che porta al retro).
    },
    {
      id: 'bike_shop',
      trigger: 'interact',
      // Logica Engine:
      // "Bici da corsa: 1.000.000$!" -> "Non hai abbastanza soldi!"
    },
    {
      id: 'trade_jynx',
      trigger: 'interact',
      // Logica Engine:
      // "Cerco un Poliwhirl. Vuoi scambiarlo per il mio Jynx?"
      // Se hai Poliwhirl -> Scambio (Rimuovi Poliwhirl, Aggiungi Jynx 'Zynx').
    }
  ]
};