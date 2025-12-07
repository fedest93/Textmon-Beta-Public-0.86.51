import { MapData } from '../../types';

export const route2East: MapData = {
  id: 'route_2_east',
  name: 'Route 2 (East)',
  description: 'Sei in una sezione isolata del Percorso 2, accessibile solo tramite un tunnel o tagliando un alberello. C\'è una casa solitaria e un edificio più grande poco più a sud.',
  connections: {
    north: 'pewter_city', // Si può tornare a Plumbeopoli
    south: 'viridian_city' // Si può tornare a Smeraldopoli saltando i gradoni
  },
  wildEncounters: [
    // Stessi incontri del Percorso 2, ma a livelli leggermente più alti
    { pokemonId: 16, minLevel: 7, maxLevel: 8, rate: 40 },
    { pokemonId: 19, minLevel: 7, maxLevel: 8, rate: 40 },
    { pokemonId: 10, minLevel: 6, maxLevel: 7, rate: 10 },
    { pokemonId: 13, minLevel: 6, maxLevel: 7, rate: 10 }
  ],
  trainers: [], // Nessun allenatore in questa sezione
  events: [
    {
      id: 'enter_digletts_cave_from_r2',
      trigger: 'interact',
      // Logica Engine: "Entri nella Grotta Diglett." -> Teleport a 'digletts_cave'
    },
    {
      id: 'trade_mr_mime_house',
      trigger: 'interact',
      // Logica Engine:
      // "Ragazzo: 'Ehi! Il mio Abra è fantastico, ma vorrei un Mr. Mime! Anzi no, aspetta...'"
      // "Ragazzo: 'Scambieresti il tuo Abra per il mio Mr. Mime?'"
      // -> Avvia logica di scambio (se hai Abra in squadra)
    },
    {
      id: 'hm05_aide_house',
      trigger: 'interact',
      conditionFlag: 'pokedex_count_10', // Esempio di flag basata sul Pokedex
      // Logica Engine:
      // "Assistente di Oak: 'Hai catturato 10 tipi di Pokémon! Ottimo lavoro! Prendi questa MN!'"
      // -> Add Item 'hm05' (Flash) -> Set flag 'hm05_obtained'
    },
    {
      id: 'item_moon_stone_r2',
      trigger: 'interact',
      conditionFlag: '!item_r2_moon_stone_taken',
      // Logica Engine: "Hai trovato una Pietralunare!" -> Add Item 'moon_stone' -> Set flag true
    }
  ]
};