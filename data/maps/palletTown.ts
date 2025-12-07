import { MapData } from '../../types';

export const palletTown: MapData = {
  id: 'pallet_town',
  name: 'Pallet Town',
  description: 'Un tranquillo villaggio dove inizia la tua avventura. A nord si estende il Percorso 1, a sud il mare aperto.',
  connections: {
    north: 'route_1', // Bloccato da flag 'starterChosen' o 'pokedexObtained' nel motore
    south: 'route_21' // Bloccato da flag 'surfObtained' nel motore
  },
  wildEncounters: [], // Nessun incontro nell'erba a Pallet Town. La pesca è gestita a parte.
  trainers: [], // Nessun allenatore "vagante". La sfida con Gary avviene via evento nel Lab.
  events: [
    {
      id: 'mom_house',
      trigger: 'interact',
      // Logica Engine: Cura team, Setta Respawn, Dialogo risparmio 10%
    },
    {
      id: 'rival_house',
      trigger: 'interact',
      // Logica Engine: Daisy da la Mappa se flag 'pokedexObtained' è true
    },
    {
      id: 'oak_lab',
      trigger: 'interact',
      // Logica Engine:
      // 1. Se !starterChosen -> Intro Oak + Scelta Starter + Battaglia Gary
      // 2. Se starterChosen && !pokedexObtained -> Consegna Pokedex (Pacco Oak quest opzionale)
      // 3. Se pokedexObtained -> Valutazione Pokedex
    }
  ]
};