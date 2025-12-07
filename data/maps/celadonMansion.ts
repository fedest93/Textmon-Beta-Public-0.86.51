import { MapData } from '../../types';

export const celadonMansion: MapData = {
  id: 'celadon_mansion',
  name: 'Celadon Mansion',
  description: 'Sei nell\'atrio di un grande condominio. Sembra che qui vivano molte persone, inclusi gli sviluppatori di questo gioco. C\'è un accesso sul retro che porta a un piccolo giardino.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [],
  trainers: [],
  events: [
    {
      id: 'exit_to_celadon',
      trigger: 'interact',
      // Logica Engine: "Esci dalla Villa e torni ad Azzurropoli." -> Teleport a 'celadon_city'
    },
    {
      id: 'game_freak_office',
      trigger: 'interact',
      // Logica Engine:
      // "Entri in un ufficio pieno di computer. È la sede di GAME FREAK!"
      // "Sviluppatore: 'Stiamo lavorando a un nuovo gioco su un ragazzo che cattura mostri!'"
    },
    {
      id: 'get_eevee',
      trigger: 'interact',
      conditionFlag: '!eevee_obtained',
      // Logica Engine:
      // "Sali all'ultimo piano ed entri in una stanza sul retro. C'è un uomo con una Poké Ball sul tavolo."
      // "Uomo: 'Ehi tu! Sembra che ti piacciano i Pokémon. Prendi questo Eevee, io non posso tenerlo.'"
      // -> Add Pokemon 'eevee' (livello 25) -> Set flag 'eevee_obtained'
    },
    {
      id: 'old_lady_tea',
      trigger: 'interact',
      // Logica Engine:
      // "Anziana: 'Le guardie di Zafferanopoli sono così fastidiose. Hanno sempre sete. Un po' di Tè le calmerebbe...'"
      // (Questo è un indizio su come sbloccare Saffron City)
    }
  ]
};