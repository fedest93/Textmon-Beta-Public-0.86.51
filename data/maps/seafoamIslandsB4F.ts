import { MapData } from '../../types';

export const seafoamIslandsB4F: MapData = {
  id: 'seafoam_islands_b4f',
  name: 'Seafoam Islands - B4F',
  description: 'Sei nel punto più profondo delle Isole Spuma. Il freddo è quasi insopportabile. Al centro di una piccola isola ghiacciata, vedi una maestosa creatura alata. È immobile, come una statua di ghiaccio.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [
    // Incontri rari mentre si usa Surf per raggiungere Articuno
    { pokemonId: 86, minLevel: 35, maxLevel: 40, rate: 40 }, // Seel
    { pokemonId: 87, minLevel: 35, maxLevel: 40, rate: 10 }, // Dewgong
    { pokemonId: 79, minLevel: 35, maxLevel: 40, rate: 40 }, // Slowpoke
    { pokemonId: 80, minLevel: 35, maxLevel: 40, rate: 10 }  // Slowbro
  ],
  trainers: [],
  events: [
    {
      id: 'ladder_to_b3f',
      trigger: 'interact',
      // Logica Engine: "Risali la scala verso il terzo piano interrato." -> Teleport a 'seafoam_islands_b3f'
    },
    {
      id: 'articuno_encounter',
      trigger: 'interact',
      conditionFlag: '!articuno_defeated_or_captured',
      // Logica Engine:
      // "Ti avvicini alla creatura leggendaria. Apre gli occhi e lancia un grido glaciale!"
      // -> Avvia battaglia speciale con Articuno (livello 50, catturabile)
      // Dopo la battaglia: Set flag 'articuno_defeated_or_captured' = true
    },
    {
      id: 'exit_ladder_west',
      trigger: 'interact',
      // Logica Engine: "Questa scala porta direttamente all'uscita ovest delle isole." -> Teleport a 'route_20' (nella sezione ovest)
    },
    {
      id: 'item_revive_sf',
      trigger: 'interact',
      conditionFlag: '!item_sf_revive_taken',
      // Logica Engine: "Hai trovato un Revitalizzante!" -> Add Item 'revive' -> Set flag true
    }
  ]
};