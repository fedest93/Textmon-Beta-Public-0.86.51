import { MapData } from '../../types';

export const celadonCity: MapData = {
  id: 'celadon_city',
  name: 'Celadon City',
  description: 'Una metropoli vibrante e piena di vita, conosciuta come la "Città dei Sogni Arcobaleno". È famosa per il suo enorme Centro Commerciale, il Casinò e la Palestra di tipo Erba.',
  connections: {
    east: 'route_7',
    west: 'route_16' // Verso la Pista Ciclabile
  },
  wildEncounters: [], // Solo pesca in un laghetto
  trainers: [],
  events: [
    {
      id: 'poke_center',
      trigger: 'interact',
      // Logica Engine: Cura e PC
    },
    {
      id: 'celadon_department_store',
      trigger: 'interact',
      // Logica Engine: "Entri nel Centro Commerciale di Azzurropoli." -> Teleport a 'celadon_dept_store_1f'
    },
    {
      id: 'celadon_mansion',
      trigger: 'interact',
      // Logica Engine: "Entri in un grande condominio." -> Teleport a 'celadon_mansion' (dove si ottiene Eevee)
    },
    {
      id: 'game_corner',
      trigger: 'interact',
      // Logica Engine: "Entri nel Casinò Rocket. Le slot machine tintinnano." -> (Logica Casinò WIP)
    },
    {
      id: 'rocket_hideout_entrance',
      trigger: 'interact',
      // Logica Engine:
      // "C'è un poster sul muro. Noti un interruttore nascosto dietro."
      // -> Scelta: [Premi l'interruttore] -> "Si apre una scala segreta!" -> Teleport a 'rocket_hideout_b1f'
    },
    {
      id: 'celadon_gym',
      trigger: 'interact',
      // Logica Engine:
      // Richiede Taglio per entrare.
      // "Un alberello blocca l'ingresso della Palestra."
      // Se hai Taglio -> Entra -> Gauntlet (Allenatrici + Erika)
    },
    {
      id: 'old_man_tea',
      trigger: 'interact',
      // Logica Engine:
      // "Anziano: 'Oh, sono così assetato...'"
      // Se hai 'fresh_water', 'soda_pop' o 'lemonade': "Vuoi dargli da bere?"
      // -> Se sì: "Anziano: 'Ahhh, grazie! Che delizia! Prendi, porta queste anche alle altre guardie!'"
      // -> Add Item 'tea' -> Set flag 'gave_tea_to_guards' (sblocca Zafferanopoli)
    },
    {
      id: 'hotel',
      trigger: 'interact',
      // Logica Engine: "Questo è l'Hotel di Azzurropoli. I programmatori del gioco alloggiano qui!"
    }
  ]
};