import { MapData } from '../../types';

export const ssAnneB1F: MapData = {
  id: 'ss_anne_b1f',
  name: 'S.S. Anne - B1F',
  description: 'Sei nel ponte inferiore della nave. Le cabine qui sono più piccole e spartane. Si sentono i rumori dei motori e l\'odore di olio e vapore. Un corridoio porta alla sala macchine.',
  connections: {
    // Le connessioni sono gestite come eventi/teleport interni
  },
  wildEncounters: [],
  trainers: [
    // Allenatori presenti in questo piano
    'sailor_leonard_ssa',
    'sailor_edmond_ssa',
    'engineer_bailey_ssa',
    'sailor_trevor_ssa' // Quello che ti blocca la cucina
  ],
  events: [
    {
      id: 'go_to_deck',
      trigger: 'interact',
      // Logica Engine: "Torni sul ponte principale." -> Teleport a 'ss_anne_exterior'
    },
    {
      id: 'cabin_sailor_1',
      trigger: 'interact',
      // Logica Engine: "Entri in una cabina. Un marinaio ti sfida!" -> Avvia battaglia con 'sailor_leonard_ssa'
    },
    {
      id: 'cabin_sailor_2',
      trigger: 'interact',
      // Logica Engine: "Entri in un'altra cabina. Un marinaio ti aspetta!" -> Avvia battaglia con 'sailor_edmond_ssa'
    },
    {
      id: 'engineer_room',
      trigger: 'interact',
      // Logica Engine: "Entri nella sala macchine. Un ingegnere ti blocca la strada!" -> Avvia battaglia con 'engineer_bailey_ssa'
    },
    {
      id: 'kitchen_entrance_block',
      trigger: 'interact',
      conditionFlag: '!sailor_trevor_ssa_defeated',
      // Logica Engine:
      // "Sailor Trevor: 'Ehi! La cucina è solo per l'equipaggio! Non puoi passare!'" -> Avvia battaglia con 'sailor_trevor_ssa'
      // Se sconfitto: "Sailor Trevor: 'Ok, ok, puoi passare... ma non toccare nulla!'" -> Sblocca 'enter_kitchen'
    },
    {
      id: 'enter_kitchen_from_b1f',
      trigger: 'interact',
      conditionFlag: 'sailor_trevor_ssa_defeated',
      // Logica Engine: "Entri nella cucina." -> Teleport a 'ss_anne_kitchen'
    }
  ]
};