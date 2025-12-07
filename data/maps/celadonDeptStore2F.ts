import { MapData } from '../../types';

export const celadonDeptStore2F: MapData = {
  id: 'celadon_dept_store_2f',
  name: 'Celadon Dept. Store - 2F',
  description: 'Sei al secondo piano, il paradiso degli allenatori. Due commessi gestiscono due banconi separati: uno per gli oggetti standard e uno per le MT.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [],
  trainers: [],
  events: [
    {
      id: 'go_to_1f',
      trigger: 'interact',
      // Logica Engine: "Scendi le scale mobili verso il piano terra." -> Teleport a 'celadon_dept_store_1f'
    },
    {
      id: 'go_to_3f',
      trigger: 'interact',
      // Logica Engine: "Sali le scale mobili verso il terzo piano." -> Teleport a 'celadon_dept_store_3f'
    },
    {
      id: 'use_elevator_2f',
      trigger: 'interact',
      // Logica Engine: Apre il menu dell'ascensore
    },
    {
      id: 'shop_standard_items',
      trigger: 'interact',
      // Logica Engine:
      // "Commesso: 'Benvenuto! Abbiamo tutto ciò che serve per un allenatore!'"
      // -> Apre ShopView con una lista di oggetti potenziata:
      // ['great_ball', 'super_potion', 'revive', 'escape_rope', 'super_repel', 'antidote', 'burn_heal', 'ice_heal', 'paralyze_heal', 'awakening']
    },
    {
      id: 'shop_tms',
      trigger: 'interact',
      // Logica Engine:
      // "Commesso: 'Vuoi potenziare le tue mosse? Ho delle MT fantastiche!'"
      // -> Apre ShopView con una lista di MT in vendita:
      // ['tm32', 'tm33', 'tm02', 'tm07', 'tm37'] (Doppioteam, Riflesso, Ventagliente, Perforcorno, Uovobomba)
    }
  ]
};