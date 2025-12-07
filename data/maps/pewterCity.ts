import { MapData } from '../../types';

export const pewterCity: MapData = {
  id: 'pewter_city',
  name: 'Pewter City',
  description: 'Una città di pietra grigia e silenziosa. È famosa per il suo Museo della Scienza e per la Palestra di tipo Roccia.',
  connections: {
    south: 'route_2_north',
    east: 'route_3' // Bloccato logicamente dall'evento 'route_3_guard' se non hai la medaglia
  },
  wildEncounters: [],
  trainers: [], // Gli allenatori della palestra sono gestiti nell'evento della palestra
  events: [
    {
      id: 'poke_center',
      trigger: 'interact',
      // Logica Engine:
      // 1. "Benvenuto al Centro Pokemon!" -> Cura Team -> Setta Respawn Point = 'pewter_city'.
      // 2. Mostra Menu: [Cura, PC di Bill, Esci].
      // 3. Se PC di Bill -> Apre PcView.tsx.
    },
    {
      id: 'poke_mart',
      trigger: 'interact',
      // Logica Engine:
      // Apre Shop UI con inventario: Poke Ball, Potion, Antidote, Paralyze Heal, Burn Heal.
    },
    {
      id: 'pewter_gym',
      trigger: 'interact',
      // Logica Engine:
      // Se flag 'boulderBadgeObtained' è true: "Hai già battuto Brock."
      // Se false: Avvia dialogo con il tizio all'entrata ("Ehi campione in erba!"), poi avvia il Gauntlet/Battaglia (Camper Liam -> Brock).
    },
    {
      id: 'museum',
      trigger: 'interact',
      // Logica Engine:
      // "Vuoi entrare per 50$?" -> Se sì, mostra dialogo sui fossili e lo Shuttle Columbia.
      // (Opzionale: evento per ottenere l'Ambra Antica se implementiamo il retro del museo).
    },
    {
      id: 'route_3_guard',
      trigger: 'interact', // O trigger automatico se si prova ad andare a Est
      conditionFlag: '!boulderBadgeObtained',
      // Logica Engine:
      // "Ehi tu! Non puoi passare di qui se non hai battuto Brock!" -> Blocca movimento.
    },
    {
      id: 'repel_guy',
      trigger: 'interact',
      // Logica Engine: "Stai andando al Monte Luna? Ti consiglio di usare i Repellenti per evitare gli Zubat!"
    }
  ]
};