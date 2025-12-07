import { MapData } from '../../types';

export const silphCo5F: MapData = {
  id: 'silph_co_5f',
  name: 'Silph Co. - 5F',
  description: 'Sei al quinto piano. Quest\'area è un labirinto di stanze e teletrasporti. In una stanza stretta, vedi un oggetto luccicare su un tavolo.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [],
  trainers: [
    'juggler_dalton_silph_5f',
    'rocket_grunt_silph_5f_1'
  ],
  events: [
    {
      id: 'go_to_4f_stairs',
      trigger: 'interact',
      // Logica Engine: "Scendi le scale verso il quarto piano." -> Teleport a 'silph_co_4f'
    },
    {
      id: 'use_elevator_5f',
      trigger: 'interact',
      // Logica Engine: Apre il menu dell'ascensore (se hai la Card Key)
    },
    {
      id: 'teleporter_5f_to_9f',
      trigger: 'interact',
      // Logica Engine: "Sali sul teletrasporto... e ti ritrovi al nono piano." -> Teleport a 'silph_co_9f'
    },
    {
      id: 'teleporter_5f_to_3f',
      trigger: 'interact',
      // Logica Engine: "Sali sul teletrasporto... e torni al terzo piano." -> Teleport a 'silph_co_3f'
    },
    {
      id: 'get_card_key',
      trigger: 'interact',
      conditionFlag: '!card_key_obtained',
      // Logica Engine:
      // "Una recluta ti blocca la strada per la Card Key."
      // "Grunt: 'Quella è la Card Key! Non ti avvicinare!'" -> Avvia battaglia con 'rocket_grunt_silph_5f_1'
      // Dopo la vittoria: "Hai raccolto la Card Key!" -> Add Item 'card_key' -> Set flag 'card_key_obtained'
    },
    {
      id: 'juggler_encounter_5f',
      trigger: 'interact',
      conditionFlag: '!juggler_dalton_silph_5f_defeated',
      // Logica Engine: "Un Juggler ti sfida!" -> Avvia battaglia
    },
    {
      id: 'item_protein_5f',
      trigger: 'interact',
      conditionFlag: '!item_silph_5f_protein_taken',
      // Logica Engine: "Hai trovato Proteine!" -> Add Item 'protein' -> Set flag true
    }
  ]
};