import { MapData } from '../../types';

export const pokemonTower1F: MapData = {
  id: 'pokemon_tower_1f',
  name: 'Pokémon Tower - 1F',
  description: 'Sei al piano terra della Torre Pokémon. L\'aria è pesante e odora di incenso. Diverse persone sono qui per pregare per i loro Pokémon scomparsi. Una scala porta al piano superiore.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [], // Nessun incontro al piano terra
  trainers: [],
  events: [
    {
      id: 'exit_to_lavender_town',
      trigger: 'interact',
      // Logica Engine: "Esci dalla torre e torni a Lavandonia." -> Teleport a 'lavender_town'
    },
    {
      id: 'go_to_2f',
      trigger: 'interact',
      // Logica Engine: "Sali le scale verso il secondo piano." -> Teleport a 'pokemon_tower_2f'
    },
    {
      id: 'mourning_person_1',
      trigger: 'interact',
      // Logica Engine: "Signora: 'Il mio Growlithe era così buono...'"
    },
    {
      id: 'mourning_person_2',
      trigger: 'interact',
      // Logica Engine: "Ragazzo: 'Non riesco a credere che se ne sia andato...'"
    }
  ]
};