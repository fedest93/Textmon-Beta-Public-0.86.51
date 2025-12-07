import { MapData } from '../../types';

export const route23: MapData = {
  id: 'route_23',
  name: 'Route 23',
  description: 'La Via dei Campioni. Un lungo sentiero sorvegliato da otto guardie. Solo chi possiede tutte le medaglie di Kanto può ottenere il permesso di passare verso la Via Vittoria.',
  connections: {
    south: 'route_22', // Connessione con il cancello/Route 22
    north: 'victory_road_1f' // Ingresso della Via Vittoria
  },
  wildEncounters: [
    // Fearow: Comune (Livelli 38-42)
    { pokemonId: 22, minLevel: 38, maxLevel: 42, rate: 30 },
    // Arbok: Comune (Livelli 38-42)
    { pokemonId: 24, minLevel: 38, maxLevel: 42, rate: 30 },
    // Sandslash: Comune (Livelli 38-42)
    { pokemonId: 28, minLevel: 38, maxLevel: 42, rate: 30 },
    // Primeape: Non comune (Livelli 38-42)
    { pokemonId: 57, minLevel: 38, maxLevel: 42, rate: 10 }
  ],
  trainers: [], // Nessun allenatore, solo le guardie
  events: [
    {
      id: 'badge_check_cascade',
      trigger: 'interact',
      conditionFlag: 'cascadeBadgeObtained',
      // Logica Engine: "Guardia: 'Hai la Medaglia Cascata? Bene, puoi passare.'"
    },
    {
      id: 'badge_check_thunder',
      trigger: 'interact',
      conditionFlag: 'thunderBadgeObtained',
      // Logica Engine: "Guardia: 'Hai la Medaglia Tuono? Procedi pure.'"
    },
    {
      id: 'badge_check_soul',
      trigger: 'interact',
      conditionFlag: 'soulBadgeObtained',
      // Logica Engine: "Guardia: 'La Medaglia Anima! Sei un allenatore esperto.'"
    },
    {
      id: 'badge_check_marsh',
      trigger: 'interact',
      conditionFlag: 'marshBadgeObtained',
      // Logica Engine: "Guardia: 'Medaglia Palude confermata.'"
    },
    {
      id: 'badge_check_volcano',
      trigger: 'interact',
      conditionFlag: 'volcanoBadgeObtained',
      // Logica Engine: "Guardia: 'La Medaglia Vulcano! Fai caldo!'"
    },
    {
      id: 'badge_check_earth',
      trigger: 'interact',
      conditionFlag: '!earthBadgeObtained', // Questo blocca l'ingresso finale
      // Logica Engine: 
      // "Guardia: 'Fermo! Solo chi ha sconfitto Giovanni e ottenuto la Medaglia Terra può entrare nella Via Vittoria!'"
      // Blocca il movimento verso Nord.
    },
    {
      id: 'enter_victory_road',
      trigger: 'interact',
      conditionFlag: 'earthBadgeObtained',
      // Logica Engine: "Entri nella leggendaria Via Vittoria." -> Teleport a 'victory_road_1f'
    }
  ]
};