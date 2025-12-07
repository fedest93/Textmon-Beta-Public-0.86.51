import { MapData } from '../../types';

export const route20: MapData = {
  id: 'route_20',
  name: 'Route 20',
  description: 'Sei nelle acque agitate del Percorso 20. Al centro del percorso si ergono le misteriose Isole Spuma. Molti allenatori amano la sfida di queste correnti.',
  connections: {
    north: 'route_19',
    east: 'cinnabar_island' // L'uscita est del percorso
    // La connessione ovest è gestita dall'evento delle Isole Spuma
  },
  wildEncounters: [
    // Solo con Surf
    { pokemonId: 72, minLevel: 30, maxLevel: 35, rate: 60 }, // Tentacool
    { pokemonId: 73, minLevel: 35, maxLevel: 40, rate: 5 },  // Tentacruel
    { pokemonId: 90, minLevel: 30, maxLevel: 35, rate: 30 }, // Shellder
    { pokemonId: 120, minLevel: 30, maxLevel: 35, rate: 5 }   // Staryu
  ],
  trainers: [
    // Tutti gli allenatori del Percorso 20
    'beauty_anya_sr',
    'picnicker_irene_sr',
    'bird_keeper_roger_sr',
    'swimmer_roland_sr',
    'beauty_grace_sr',
    'swimmer_nolan_r20', // Aggiunti per densità
    'jr_trainer_f_mary_r20'
  ],
  events: [
    {
      id: 'enter_seafoam_islands',
      trigger: 'interact',
      // Logica Engine: "Vedi l'ingresso di una grotta ghiacciata. Entri nelle Isole Spuma." -> Teleport a 'seafoam_islands_1f'
    },
    {
      id: 'sign_cinnabar_island',
      trigger: 'interact',
      // Logica Engine: "CARTELLO: A est, l'Isola Cannella."
    }
  ]
};