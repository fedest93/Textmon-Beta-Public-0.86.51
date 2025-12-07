import { MapData } from '../../types';

export const ssAnne2F: MapData = {
  id: 'ss_anne_2f',
  name: 'S.S. Anne - 2F',
  description: 'Sei al secondo piano. Il corridoio porta a diverse cabine di lusso e, in fondo, all\'ufficio del Capitano. Senti odore di profumo e senti qualcuno vantarsi delle sue catture.',
  connections: {
    // Le connessioni sono gestite come eventi/teleport interni
  },
  wildEncounters: [],
  trainers: [
    // Allenatori presenti in questo piano
    'gentleman_thomas_ssa',
    'youngster_tyler_ssa',
    'rival_4_ssanne' // La sfida col rivale avviene qui
  ],
  events: [
    {
      id: 'go_to_1f',
      trigger: 'interact',
      // Logica Engine: "Scendi le scale verso il salone principale." -> Teleport a 'ss_anne_1f'
    },
    {
      id: 'enter_captains_office',
      trigger: 'interact',
      // Logica Engine: "Entri nell'ufficio del Capitano." -> Teleport a 'ss_anne_captains_office'
    },
    {
      id: 'rival_encounter',
      trigger: 'interact', // O trigger automatico
      conditionFlag: '!rival_4_ssanne_defeated',
      // Logica Engine:
      // "Gary: 'Bonjour! Che ci fai qui? Vediamo se sei migliorato!'" -> Avvia battaglia con 'rival_4_ssanne'
    },
    {
      id: 'cabin_gentleman',
      trigger: 'interact',
      // Logica Engine: "Un gentiluomo ti sfida a duello!" -> Avvia battaglia con 'gentleman_thomas_ssa'
    },
    {
      id: 'cabin_youngster',
      trigger: 'interact',
      // Logica Engine: "Un ragazzino ti mostra il suo Nidoran!" -> Avvia battaglia con 'youngster_tyler_ssa'
    }
  ]
};