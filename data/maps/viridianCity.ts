import { MapData } from '../../types';

export const viridianCity: MapData = {
  id: 'viridian_city',
  name: 'Viridian City',
  description: 'La città dell\'eterna primavera verde. Sede di una Palestra misteriosamente chiusa e crocevia per l\'Altopiano Blu.',
  connections: {
    south: 'route_1',
    north: 'route_2_south', // CORRETTO: Prima era 'route_2' che causava crash
    west: 'route_22'
  },
  wildEncounters: [],
  trainers: [],
  events: [
    {
      id: 'poke_center',
      trigger: 'interact',
    },
    {
      id: 'poke_mart',
      trigger: 'interact',
    },
    {
      id: 'trainer_school',
      trigger: 'interact',
    },
    {
      id: 'old_man',
      trigger: 'interact',
    },
    {
      id: 'viridian_gym',
      trigger: 'interact',
    }
  ]
};