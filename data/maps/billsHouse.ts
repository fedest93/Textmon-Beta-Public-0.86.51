import { MapData } from '../../types';

export const billsHouse: MapData = {
  id: 'bills_house',
  name: 'Sea Cottage', // Nome ufficiale della casa di Bill
  description: 'Una casa disordinata piena di macchinari complessi e libri sui Pokémon. C\'è uno strano Pokémon che ti guarda con aria intelligente.',
  connections: {
    west: 'route_25'
  },
  wildEncounters: [],
  trainers: [],
  events: [
    {
      id: 'bill_clefairy',
      trigger: 'interact',
      conditionFlag: '!bill_helped',
      // Logica Engine:
      // Dialogo: "Sono un Pokémon... No! Sono Bill! Un esperimento di teletrasporto è andato storto! Aiutami!"
      // Scelta: "Aiuti Bill?" -> Sì.
      // Animazione: Lo sprite Clefairy entra nella capsula.
      // Setta stato temporaneo: 'bill_waiting_in_machine'.
    },
    {
      id: 'separation_machine',
      trigger: 'interact',
      // Logica Engine:
      // Se 'bill_waiting_in_machine' è attivo:
      //    Esegue script: Suoni, Flash schermo.
      //    Cambia sprite NPC da Clefairy a Bill (Umano).
      //    Setta flag 'bill_helped' = true.
      //    Rimuove stato 'bill_waiting_in_machine'.
      // Altrimenti: "È un macchinario complesso. Meglio non toccarlo."
    },
    {
      id: 'bill_human',
      trigger: 'interact',
      conditionFlag: 'bill_helped',
      // Logica Engine:
      // Se flag 'ss_ticket_received' è false:
      //    Dialogo: "Grazie mille! Ti devo un favore. Tieni questo, è per la festa sulla M/N Anna ad Aranciopoli."
      //    Add Item: 'ss_ticket'.
      //    Setta flag: 'ss_ticket_received' = true.
      //    Setta flag: 'pc_renamed_to_bill' = true. (Questo cambia la stringa nel menu PC da "PC di ???" a "PC di Bill").
      // Se flag 'ss_ticket_received' è true:
      //    Dialogo: "Vai a vedere il mio PC, ci sono dati rari sui Pokémon!"
    },
    {
      id: 'bills_computer',
      trigger: 'interact',
      // Logica Engine:
      // Mostra dati su Eevee e le sue evoluzioni (Vaporeon, Jolteon, Flareon).
      // Opzione: "Vuoi accedere al Sistema Memoria Pokémon?" -> Apre interfaccia PC.
    }
  ]
};