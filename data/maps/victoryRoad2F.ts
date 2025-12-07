import { MapData } from '../../types';

export const victoryRoad2F: MapData = {
  id: 'victory_road_2f',
  name: 'Victory Road - 2F',
  description: 'Il secondo piano della Via Vittoria. Il calore aumenta man mano che ti addentri. Una creatura leggendaria di fuoco si annida in un angolo isolato.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [
    // Machoke: Comune (Livelli 40-45)
    { pokemonId: 67, minLevel: 40, maxLevel: 45, rate: 25 },
    // Marowak: Non comune (Livelli 40-45)
    { pokemonId: 105, minLevel: 40, maxLevel: 45, rate: 20 },
    // Golbat: Comune (Livelli 40-45)
    { pokemonId: 42, minLevel: 40, maxLevel: 45, rate: 25 },
    // Onix: Non comune (Livelli 42-46)
    { pokemonId: 95, minLevel: 42, maxLevel: 46, rate: 20 },
    // Venomoth: Raro (Livelli 40-42)
    { pokemonId: 49, minLevel: 40, maxLevel: 42, rate: 10 }
  ],
  trainers: [
    'blackbelt_daisuke_vr',
    'juggler_nelson_vr',
    'tamer_vincent_vr',
    'juggler_gregory_vr'
  ],
  events: [
    {
      id: 'ladder_to_1f',
      trigger: 'interact',
      // Logica Engine: "Scendi le scale verso il primo piano." -> Teleport a 'victory_road_1f'
    },
    {
      id: 'ladder_to_3f',
      trigger: 'interact',
      // Logica Engine: "Sali le scale verso il terzo piano." -> Teleport a 'victory_road_3f'
    },
    {
      id: 'moltres_encounter',
      trigger: 'interact',
      conditionFlag: '!moltres_defeated',
      // Logica Engine:
      // "L'aria trema per il calore... Una fenice di fuoco ti sbarra la strada!"
      // -> Avvia battaglia con Moltres (Livello 50)
      // -> Set flag 'moltres_defeated' se vinto/catturato
    },
    {
      id: 'item_full_heal_vr2',
      trigger: 'interact',
      conditionFlag: '!item_vr2f_full_heal_taken',
      // Logica Engine: "Hai trovato una Cura Totale!" -> Add Item 'full_heal' -> Set flag true
    },
    {
      id: 'item_tm05',
      trigger: 'interact',
      conditionFlag: '!item_vr2f_tm05_taken',
      // Logica Engine: "Hai trovato MT05 (Mega Calcio)!" -> Add Item 'tm05' -> Set flag true
    },
    {
      id: 'item_guard_spec_vr2',
      trigger: 'interact',
      conditionFlag: '!item_vr2f_guard_spec_taken',
      // Logica Engine: "Hai trovato Superguardia!" -> Add Item 'guard_spec' -> Set flag true
    }
  ]
};