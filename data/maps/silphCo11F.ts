import { MapData } from '../../types';

export const silphCo11F: MapData = {
  id: 'silph_co_11f',
  name: 'Silph Co. - 11F',
  description: 'Sei all\'undicesimo e ultimo piano, nell\'ufficio del presidente della Silph SpA. L\'arredamento è sontuoso. Giovanni, il capo del Team Rocket, sta minacciando il presidente.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [],
  trainers: [
    'rocket_grunt_silph_11f_1',
    'boss_giovanni_2'
  ],
  events: [
    {
      id: 'go_to_10f_stairs',
      trigger: 'interact',
      // Logica Engine: "Scendi le scale verso il decimo piano." -> Teleport a 'silph_co_10f'
    },
    {
      id: 'use_elevator_11f',
      trigger: 'interact',
      // Logica Engine: Apre il menu dell'ascensore
    },
    {
      id: 'teleporter_11f_to_7f_return',
      trigger: 'interact',
      // Logica Engine: "Questo teletrasporto ti riporta al settimo piano." -> Teleport a 'silph_co_7f'
    },
    {
      id: 'giovanni_encounter_silph',
      trigger: 'interact',
      conditionFlag: '!boss_giovanni_2_defeated',
      // Logica Engine:
      // "Presidente: 'No! Non vi darò mai la Master Ball!'"
      // "Giovanni: 'Ancora tu?! Ti intrometti sempre nei miei affari! Questa volta non mi scapperai!'"
      // -> Avvia battaglia con 'boss_giovanni_2'
    },
    {
      id: 'president_reward',
      trigger: 'interact',
      conditionFlag: 'boss_giovanni_2_defeated && !master_ball_obtained',
      // Logica Engine:
      // "Presidente: 'Grazie per averci salvato! Sei un eroe! Come ricompensa, prendi il nostro prototipo definitivo: la Master Ball! Usala con saggezza.'"
      // -> Add Item 'master_ball' -> Set flag 'master_ball_obtained'
    },
    {
      id: 'lapras_gift',
      trigger: 'interact',
      conditionFlag: 'rival_6_silph_defeated && !lapras_obtained',
      // Logica Engine:
      // "Impiegato (nella stanza a fianco): 'Grazie per averci salvato! Ho paura che il Team Rocket torni... Per favore, prendi questo Pokémon e proteggilo!'"
      // -> Add Pokemon 'lapras' (livello 15) -> Set flag 'lapras_obtained'
    }
  ]
};