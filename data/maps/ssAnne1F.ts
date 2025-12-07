import { MapData } from '../../types';

export const ssAnne1F: MapData = {
  id: 'ss_anne_1f',
  name: 'S.S. Anne - 1F',
  description: 'Sei nel salone principale della nave. Un tappeto rosso si estende davanti a te. Ci sono diverse cabine lungo i corridoi, una scala che sale e un passaggio verso la cucina.',
  connections: {
    // Le connessioni sono gestite come eventi/teleport interni
  },
  wildEncounters: [],
  trainers: [
    // Questi sono gli allenatori che ti sfidano appena entri in una cabina
    'sailor_huey_ssa',
    'sailor_dylan_ssa',
    'lass_ann_ssa',
    'gentleman_brooks' // Ricorda che il nome ID può essere generico
  ],
  events: [
    {
      id: 'go_to_deck',
      trigger: 'interact',
      // Logica Engine: "Torni sul ponte." -> Teleport a 'ss_anne_exterior'
    },
    {
      id: 'go_to_2f',
      trigger: 'interact',
      // Logica Engine: "Sali le scale verso il secondo piano." -> Teleport a 'ss_anne_2f'
    },
    {
      id: 'enter_kitchen',
      trigger: 'interact',
      // Logica Engine: "Entri nella cucina della nave." -> Teleport a 'ss_anne_kitchen'
    },
    {
      id: 'cabin_1',
      trigger: 'interact',
      // Logica Engine: "Entri in una cabina. Un marinaio vuole lottare!" -> Avvia battaglia con 'sailor_huey_ssa'
    },
    {
      id: 'cabin_2',
      trigger: 'interact',
      // Logica Engine: "Entri in una cabina. Una ragazza ti sfida!" -> Avvia battaglia con 'lass_ann_ssa'
    },
    {
      id: 'cabin_3',
      trigger: 'interact',
      // Logica Engine: "Entri in una cabina lussuosa. Un gentiluomo ti nota." -> Avvia battaglia con 'gentleman_brooks'
    },
    {
      id: 'healing_room',
      trigger: 'interact',
      // Logica Engine: "Una signora gentile ti offre di far riposare i tuoi Pokémon." -> Heal Party
    }
  ]
};