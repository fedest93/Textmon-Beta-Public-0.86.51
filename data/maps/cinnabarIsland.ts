import { MapData } from '../../types';

export const cinnabarIsland: MapData = {
  id: 'cinnabar_island',
  name: 'Cinnabar Island',
  description: 'Un\'isola vulcanica che ospita un avanzato laboratorio di ricerca. L\'aria è calda e odora di zolfo. Una grande villa in rovina si erge a nord-ovest.',
  connections: {
    north: 'route_21',
    east: 'route_20'
  },
  wildEncounters: [], // Solo pesca
  trainers: [],
  events: [
    {
      id: 'poke_center',
      trigger: 'interact',
      // Logica Engine: Cura e PC
    },
    {
      id: 'poke_mart',
      trigger: 'interact',
      // Logica Engine: Apre Shop (Ultra Ball, Great Ball, Hyper Potion, Full Heal, Revive, Escape Rope, Max Repel)
    },
    {
      id: 'cinnabar_gym',
      trigger: 'interact',
      // Logica Engine:
      // Se flag 'secret_key_obtained' è false: "La porta della Palestra è chiusa a chiave. Sembra serva una chiave speciale."
      // Se true: "Usi la Chiave Segreta ed entri." -> Avvia gauntlet dei quiz di Blaine.
    },
    {
      id: 'pokemon_mansion',
      trigger: 'interact',
      // Logica Engine: "Entri nella villa abbandonata. Un'aria pesante e antica ti accoglie." -> Teleport a 'pokemon_mansion_1f'
    },
    {
      id: 'pokemon_lab',
      trigger: 'interact',
      // Logica Engine:
      // "Benvenuto al Laboratorio Pokémon dell'Isola Cannella!"
      // -> Scelta Multipla: [Resuscita Fossile, Sala Scambi, Esci]
    },
    {
      id: 'fossil_reviver',
      trigger: 'interact', // Sotto-evento del laboratorio
      // Logica Engine:
      // "Scienziato: 'Hai un fossile? Possiamo provare a riportarlo in vita!'"
      // Se hai 'helix_fossil' -> "Vuoi resuscitare l'Helix Fossil?" -> Ottieni Omanyte
      // Se hai 'dome_fossil' -> "Vuoi resuscitare il Dome Fossil?" -> Ottieni Kabuto
      // Se hai 'old_amber' -> "Vuoi resuscitare l'Ambra Antica?" -> Ottieni Aerodactyl
    },
    {
      id: 'trade_room',
      trigger: 'interact', // Sotto-evento del laboratorio
      // Logica Engine:
      // "Qui puoi scambiare Pokémon con altri allenatori."
      // -> Scambio Raichu per Electrode, Ponyta per Seel, etc.
    }
  ]
};