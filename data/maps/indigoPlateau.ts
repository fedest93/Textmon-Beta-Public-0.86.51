import { MapData } from '../../types';

export const indigoPlateau: MapData = {
  id: 'indigo_plateau',
  name: 'Indigo Plateau',
  description: 'La sede della Lega Pokémon. L\'atmosfera è solenne. Qui si trovano un Centro Pokémon, un Pokémon Market e l\'ingresso verso la sfida finale. Solo i migliori allenatori arrivano fin qui.',
  connections: {
    south: 'victory_road_3f'
  },
  wildEncounters: [], // Zona sicura
  trainers: [], // Le sfide sono all'interno delle stanze dei Superquattro
  events: [
    {
      id: 'poke_center_league',
      trigger: 'interact',
      // Logica Engine: "Infermiera: 'Benvenuto alla Lega Pokémon! Preparati al meglio!'" -> Heal Party
    },
    {
      id: 'poke_mart_league',
      trigger: 'interact',
      // Logica Engine: Shop di alto livello (Full Restore, Max Revive, Full Heal)
    },
    {
      id: 'elite_four_gate',
      trigger: 'interact',
      // Logica Engine: 
      // "Guardia: 'Oltre questa porta ti attendono i Superquattro. Una volta entrato, non potrai uscire finché non avrai vinto o perso. Sei pronto?'"
      // Se Sì -> Teleport a 'lorelei_room' (Da creare prossimamente)
    },
    {
      id: 'statue_mewtwo_hint',
      trigger: 'interact',
      // Logica Engine: "Una statua dorata. La targhetta recita: 'Dedicata a tutti gli allenatori che hanno raggiunto la vetta'."
    }
  ]
};