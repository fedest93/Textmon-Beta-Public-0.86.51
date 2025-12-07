import { MapData } from '../../types';

export const diglettsCave: MapData = {
  id: 'digletts_cave',
  name: 'Diglett\'s Cave',
  description: 'Un tunnel lungo e stretto, scavato interamente da Diglett. È buio e umido, e si sentono costantemente rumori di scavo. Non ci sono bivi, solo un lungo percorso.',
  connections: {
    // Le connessioni sono le due uscite del tunnel
    east: 'route_11',
    west: 'route_2_east'
  },
  wildEncounters: [
    // Diglett: Molto comune (Livelli 15-22)
    { pokemonId: 50, minLevel: 15, maxLevel: 22, rate: 95 },
    // Dugtrio: Molto raro (Livelli 29-31)
    { pokemonId: 51, minLevel: 29, maxLevel: 31, rate: 5 }
  ],
  trainers: [], // Nessun allenatore nella Grotta Diglett
  events: [
    {
      id: 'exit_to_route_11',
      trigger: 'interact',
      // Logica Engine: "Vedi la luce dell'uscita verso Aranciopoli." -> Teleport a 'route_11'
    },
    {
      id: 'exit_to_route_2',
      trigger: 'interact',
      // Logica Engine: "Vedi la luce dell'uscita verso Smeraldopoli." -> Teleport a 'route_2_east'
    }
  ]
};