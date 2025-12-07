import { MapData } from '../../types';

export const pokemonTower7F: MapData = {
  id: 'pokemon_tower_7f',
  name: 'Pokémon Tower - 7F',
  description: 'Sei in cima alla Torre Pokémon. Questo piano è una stanza tranquilla e sacra. Un anziano signore, Mr. Fuji, ti attende con gratitudine.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [], // Nessun incontro qui
  trainers: [], // Nessun allenatore qui
  events: [
    {
      id: 'go_to_6f',
      trigger: 'interact',
      // Logica Engine: "Scendi le scale verso il sesto piano." -> Teleport a 'pokemon_tower_6f'
    },
    {
      id: 'rescue_mr_fuji',
      trigger: 'interact',
      conditionFlag: '!saved_mr_fuji',
      // Logica Engine:
      // "Mr. Fuji: 'Grazie per avermi salvato dal Team Rocket! Lo spirito di Marowak ora riposa in pace.'"
      // "Mr. Fuji: 'Seguimi a casa mia, ho qualcosa per te.'"
      // -> (Animazione/Fade out) -> Teleport a 'lavender_town' (davanti a casa sua)
      // -> Set flag 'saved_mr_fuji' = true
    },
    {
      id: 'talk_to_fuji_after',
      trigger: 'interact',
      conditionFlag: 'saved_mr_fuji',
      // Logica Engine:
      // "Mr. Fuji: 'Dobbiamo sempre onorare lo spirito dei Pokémon.'"
    }
  ]
};