import { MapData } from '../../types';

export const ssAnneKitchen: MapData = {
  id: 'ss_anne_kitchen',
  name: 'S.S. Anne - Kitchen',
  description: 'Sei nella cucina della nave. C\'è un profumo delizioso di cibo. I cuochi sono indaffarati e non sembrano gradire intrusi. C\'è un cestino della spazzatura in un angolo.',
  connections: {
    // Le connessioni sono gestite come eventi/teleport interni
  },
  wildEncounters: [],
  trainers: [
    // Allenatori presenti in cucina
    'chef_lyman_ssa'
  ],
  events: [
    {
      id: 'exit_to_1f',
      trigger: 'interact',
      // Logica Engine: "Esci dalla cucina e torni nel salone principale." -> Teleport a 'ss_anne_1f'
    },
    {
      id: 'exit_to_b1f',
      trigger: 'interact',
      // Logica Engine: "Esci dalla cucina e torni nel corridoio inferiore." -> Teleport a 'ss_anne_b1f'
    },
    {
      id: 'chef_challenge',
      trigger: 'interact',
      conditionFlag: '!chef_lyman_ssa_defeated',
      // Logica Engine:
      // "Chef: 'Ehi! Fuori dalla mia cucina! Se vuoi restare, devi battermi!'" -> Avvia battaglia con 'chef_lyman_ssa'
    },
    {
      id: 'trash_can_item',
      trigger: 'interact',
      conditionFlag: '!item_kitchen_great_ball_taken',
      // Logica Engine:
      // "Controlli nel cestino... C'è una Mega Ball!" -> Add Item 'great_ball' -> Set flag true.
    }
  ]
};