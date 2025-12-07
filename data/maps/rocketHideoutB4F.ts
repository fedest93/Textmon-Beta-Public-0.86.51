import { MapData } from '../../types';

export const rocketHideoutB4F: MapData = {
  id: 'rocket_hideout_b4f',
  name: 'Rocket Hideout - B4F',
  description: 'Sei nel piano più profondo del rifugio. Qui si trovano gli uffici principali. Una recluta sorveglia un oggetto luccicante. C\'è un ascensore in fondo al corridoio.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [],
  trainers: [
    'rocket_grunt_hideout_6',
    'rocket_grunt_hideout_7',
    'boss_giovanni_1'
  ],
  events: [
    {
      id: 'go_to_b3f',
      trigger: 'interact',
      // Logica Engine: "Sali le scale verso il terzo piano sotterraneo." -> Teleport a 'rocket_hideout_b3f'
    },
    {
      id: 'get_lift_key',
      trigger: 'interact',
      conditionFlag: '!lift_key_obtained',
      // Logica Engine:
      // "Una recluta ti nota vicino alla chiave."
      // "Grunt: 'Ehi! Quella è la Chiave Ascensore! Non toccarla!'" -> Avvia battaglia con 'rocket_grunt_hideout_6'
      // Dopo la vittoria: "Grunt: 'Argh! L'ho lasciata cadere!'" -> Add Item 'lift_key' -> Set flag 'lift_key_obtained'
    },
    {
      id: 'elevator',
      trigger: 'interact',
      // Logica Engine:
      // Se flag 'lift_key_obtained' è false: "L'ascensore è bloccato. Serve una chiave."
      // Se true: "Usi la Chiave Ascensore. A quale piano vuoi andare?"
      // -> Scelta Multipla: [B1F, B2F, B3F, B4F] -> Teleport al piano corrispondente
    },
    {
      id: 'giovanni_office_guards',
      trigger: 'interact',
      conditionFlag: '!rocket_grunt_hideout_7_defeated',
      // Logica Engine:
      // "Due reclute sorvegliano una porta."
      // "Grunt: 'Sei l'ultimo ostacolo prima del capo!'" -> Avvia battaglia con 'rocket_grunt_hideout_7'
    },
    {
      id: 'giovanni_encounter',
      trigger: 'interact',
      conditionFlag: 'rocket_grunt_hideout_7_defeated && !boss_giovanni_1_defeated',
      // Logica Engine:
      // "Entri nell'ufficio. Un uomo elegante ti dà le spalle, accarezzando un Persian."
      // "Giovanni: 'Vedo che hai sconfitto i miei uomini...'" -> Avvia battaglia con 'boss_giovanni_1'
      // Dopo la vittoria: "Giovanni: 'Hai vinto... Prendi questo e sparisci!'" -> Add Item 'silph_scope' -> Set flag 'silph_scope_obtained'
    },
    {
      id: 'item_tm02',
      trigger: 'interact',
      conditionFlag: '!item_tm02_taken',
      // Logica Engine: "Hai trovato MT02 (Ventagliente)!" -> Add Item 'tm02' -> Set flag true
    }
  ]
};