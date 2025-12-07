import { MapData } from '../../types';

export const route16: MapData = {
  id: 'route_16',
  name: 'Route 16',
  description: 'Un percorso tranquillo che porta all\'inizio della Pista Ciclabile. Un enorme Pokémon addormentato blocca completamente la strada. C\'è una casa isolata in un piccolo spiazzo erboso.',
  connections: {
    east: 'celadon_city',
    west: 'route_17' // Accessibile solo dopo aver svegliato Snorlax
  },
  wildEncounters: [
    // Rattata: Comune (Livelli 18-22)
    { pokemonId: 19, minLevel: 18, maxLevel: 22, rate: 25 },
    // Raticate: Non comune (Livelli 20-22)
    { pokemonId: 20, minLevel: 20, maxLevel: 22, rate: 15 },
    // Spearow: Comune (Livelli 18-22)
    { pokemonId: 21, minLevel: 18, maxLevel: 22, rate: 30 },
    // Doduo: Non comune (Livelli 18-22)
    { pokemonId: 84, minLevel: 18, maxLevel: 22, rate: 30 }
  ],
  trainers: [], // Gli allenatori sono sulla Pista Ciclabile
  events: [
    {
      id: 'snorlax_block_cycling_road',
      trigger: 'interact',
      // Logica Engine:
      // "Un enorme Pokémon sta dormendo e bloccando la strada."
      // Se hai 'poke_flute': "Vuoi usare il Poké Flauto?"
      // -> Se sì, avvia battaglia con Snorlax (livello 30) -> Se sconfitto/catturato, sblocca la connessione 'west'.
    },
    {
      id: 'secret_house_fly',
      trigger: 'interact',
      // Logica Engine:
      // "Entri in una piccola casa."
      // "Ragazza: 'Mio padre si è perso nella Zona Safari! Oh, tu non sei mio padre...'"
      // "Ragazza: 'Comunque, se mantieni il segreto su questa casa, ti do una cosa fantastica!'"
      // -> Add Item 'hm02' (Volo) -> Set flag 'hm02_obtained'
    },
    {
      id: 'cycling_road_gate_east',
      trigger: 'interact',
      // Logica Engine:
      // "Guardia: 'Questa è la Pista Ciclabile! Ti serve una bicicletta per entrare!'"
      // Se hai 'bicycle': "Guardia: 'Oh, hai una bici! Prego, entra pure!'" -> Teleport a 'route_17'
    }
  ]
};