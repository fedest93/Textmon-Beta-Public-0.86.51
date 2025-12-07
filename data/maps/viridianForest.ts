import { MapData } from '../../types';

export const viridianForest: MapData = {
  id: 'viridian_forest',
  name: 'Viridian Forest',
  description: 'Un bosco fitto e ombroso. I raggi del sole faticano a penetrare le chiome degli alberi. Si sente il ronzio costante di Pokémon insetto e l\'aria è umida.',
  connections: {
    south: 'route_2_south',
    north: 'route_2_north'
  },
  wildEncounters: [
    // Caterpie: Molto comune (Livelli 3-5)
    { pokemonId: 10, minLevel: 3, maxLevel: 5, rate: 35 },
    // Weedle: Molto comune (Livelli 3-5)
    { pokemonId: 13, minLevel: 3, maxLevel: 5, rate: 35 },
    // Metapod: Non comune (Livelli 4-6)
    { pokemonId: 11, minLevel: 4, maxLevel: 6, rate: 10 },
    // Kakuna: Non comune (Livelli 4-6)
    { pokemonId: 14, minLevel: 4, maxLevel: 6, rate: 10 },
    // Pikachu: Raro (Livelli 3-5) - Il premio ambito del bosco!
    { pokemonId: 25, minLevel: 3, maxLevel: 5, rate: 5 },
    // Pidgey: Raro (Livelli 3-5)
    { pokemonId: 16, minLevel: 3, maxLevel: 5, rate: 5 }
  ],
  trainers: [
    'bug_catcher_rick', // Definito in zone1.ts
    'bug_catcher_doug'  // Definito in zone1.ts
  ],
  events: [
    {
      id: 'item_antidote',
      trigger: 'interact',
      conditionFlag: '!item_forest_antidote_taken' 
      // Logica Engine: "Hai trovato un Antidoto!" -> Add Item -> Set flag true
    },
    {
      id: 'item_potion',
      trigger: 'interact',
      conditionFlag: '!item_forest_potion_taken'
      // Logica Engine: "Hai trovato una Pozione!" -> Add Item -> Set flag true
    },
    {
      id: 'sign_poison_warning',
      trigger: 'interact',
      // Logica Engine: Mostra testo "Consiglio Allenatori: Se un Pokemon è avvelenato, perde PS anche fuori dalla lotta! Usa un Antidoto!"
    },
    {
      id: 'sign_exit',
      trigger: 'interact',
      // Logica Engine: Mostra testo "Uscita per Plumbeopoli - Città Grigia come la roccia"
    }
  ]
};