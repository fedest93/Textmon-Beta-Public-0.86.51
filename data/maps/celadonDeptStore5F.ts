import { MapData } from '../../types';

export const celadonDeptStore5F: MapData = {
  id: 'celadon_dept_store_5f',
  name: 'Celadon Dept. Store - 5F',
  description: 'Sei al quinto piano, la farmacia. L\'aria odora di medicinali. Due commessi vendono vitamine per potenziare i Pokémon e strumenti da usare in battaglia.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [],
  trainers: [],
  events: [
    {
      id: 'go_to_4f',
      trigger: 'interact',
      // Logica Engine: "Scendi le scale mobili verso il quarto piano." -> Teleport a 'celadon_dept_store_4f'
    },
    {
      id: 'go_to_rooftop',
      trigger: 'interact',
      // Logica Engine: "Sali le scale verso la terrazza." -> Teleport a 'celadon_dept_store_rooftop'
    },
    {
      id: 'use_elevator_5f',
      trigger: 'interact',
      // Logica Engine: Apre il menu dell'ascensore
    },
    {
      id: 'shop_vitamins',
      trigger: 'interact',
      // Logica Engine:
      // "Commesso: 'Vuoi rendere i tuoi Pokémon più forti? Prova le nostre vitamine!'"
      // -> Apre ShopView con la lista delle vitamine:
      // ['hp_up', 'protein', 'iron', 'carbos', 'calcium']
    },
    {
      id: 'shop_battle_items',
      trigger: 'interact',
      // Logica Engine:
      // "Commesso: 'Questi strumenti ti daranno un vantaggio in battaglia!'"
      // -> Apre ShopView con la lista degli strumenti lotta:
      // ['x_attack', 'x_defend', 'x_speed', 'x_special', 'x_accuracy', 'guard_spec', 'dire_hit']
    }
  ]
};