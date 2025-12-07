import { MapData } from '../../types';

export const route12: MapData = {
  id: 'route_12',
  name: 'Route 12 (Silence Bridge)',
  description: 'Sei su un lunghissimo ponte di legno che si estende sopra il mare. Il silenzio è rotto solo dal verso dei Pokémon uccello e dalle lenze dei pescatori. Un Pokémon gigante blocca il sentiero.',
  connections: {
    north: 'lavender_town',
    south: 'route_13'
  },
  wildEncounters: [
    // Solo Pescando
    // { pokemonId: 129, minLevel: 5, maxLevel: 5, rate: 100, method: 'old_rod' },
    // { pokemonId: 60, minLevel: 10, maxLevel: 10, rate: 50, method: 'good_rod' },
    // { pokemonId: 118, minLevel: 10, maxLevel: 10, rate: 50, method: 'good_rod' }
  ],
  trainers: [
    // Tutti i pescatori del Ponte Silenzio
    'fisherman_ned_r12',
    'fisherman_chip_r12',
    'fisherman_hank_r12',
    'fisherman_elliot_r12',
    'fisherman_andrew_r12'
  ],
  events: [
    {
      id: 'snorlax_block_silence_bridge',
      trigger: 'interact',
      // Logica Engine:
      // "Un enorme Pokémon sta dormendo e bloccando la strada."
      // Se hai 'poke_flute': "Vuoi usare il Poké Flauto?"
      // -> Se sì, avvia battaglia con Snorlax (livello 30) -> Se sconfitto/catturato, sblocca il passaggio a sud.
    },
    {
      id: 'fishing_gurus_brother_house_r12',
      trigger: 'interact',
      // Logica Engine:
      // Se flag 'good_rod_received' è false: "Mio fratello è un guru della pesca! Io sono bravo, ma non come lui. Prendi questo!"
      // -> Add Item 'good_rod' -> Set flag 'good_rod_received'
    },
    {
      id: 'cut_bush_tm16',
      trigger: 'interact',
      // Logica Engine:
      // "Un alberello blocca un piccolo sentiero."
      // Se hai Taglio: "Tagli l'alberello e trovi una ragazza."
      // "Ragazza: 'Grazie! Prendi questa MT!'" -> Add Item 'tm16' (Giornopaga)
    },
    {
      id: 'sign_silence_bridge',
      trigger: 'interact',
      // Logica Engine: "CARTELLO: Ponte Silenzio - Per favore, non disturbate i Pokémon."
    }
  ]
};