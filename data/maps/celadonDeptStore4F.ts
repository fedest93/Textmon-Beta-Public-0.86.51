import { MapData } from '../../types';

export const celadonDeptStore4F: MapData = {
  id: 'celadon_dept_store_4f',
  name: 'Celadon Dept. Store - 4F',
  description: 'Sei al quarto piano, il reparto regali. Un commesso vende delle strane pietre colorate e delle Poké Bambole.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [],
  trainers: [],
  events: [
    {
      id: 'go_to_3f',
      trigger: 'interact',
      // Logica Engine: "Scendi le scale mobili verso il terzo piano." -> Teleport a 'celadon_dept_store_3f'
    },
    {
      id: 'go_to_5f',
      trigger: 'interact',
      // Logica Engine: "Sali le scale mobili verso il quinto piano." -> Teleport a 'celadon_dept_store_5f'
    },
    {
      id: 'use_elevator_4f',
      trigger: 'interact',
      // Logica Engine: Apre il menu dell'ascensore
    },
    {
      id: 'shop_evolution_stones',
      trigger: 'interact',
      // Logica Engine:
      // "Commesso: 'Cerchi un regalo speciale? Queste pietre hanno poteri misteriosi!'"
      // -> Apre ShopView con la lista delle pietre:
      // ['fire_stone', 'thunder_stone', 'water_stone', 'leaf_stone']
    },
    {
      id: 'shop_poke_dolls',
      trigger: 'interact',
      // Logica Engine:
      // "Commesso: 'Una Poké Bambola è il regalo perfetto!'"
      // -> Apre ShopView con un solo oggetto:
      // ['poke_doll']
    }
  ]
};