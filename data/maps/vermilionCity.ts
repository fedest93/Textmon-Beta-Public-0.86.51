import { MapData } from '../../types';

export const vermilionCity: MapData = {
  id: 'vermilion_city',
  name: 'Vermilion City',
  description: 'Una città portuale vivace con un grande molo a sud. L\'aria odora di mare e si sentono i versi dei gabbiani. Un cantiere è in corso a est.',
  connections: {
    north: 'route_6',
    east: 'route_11' // Verso la Grotta Diglett
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
      // Logica Engine: Apre Shop (Pozioni, Repellenti, etc.)
    },
    {
      id: 'pokemon_fan_club',
      trigger: 'interact',
      // Logica Engine:
      // "Benvenuto al Pokémon Fan Club! Il mio Rapidash è... veloce... bello... forte..."
      // Se flag 'bike_voucher_received' è false: "Ascolti la mia storia? Grazie! Prendi questo!" -> Add Item 'bike_voucher' -> Set flag true.
    },
    {
      id: 'fishing_guru',
      trigger: 'interact',
      // Logica Engine:
      // Se flag 'old_rod_received' è false: "Ti piace pescare? Prendi questo!" -> Add Item 'old_rod' -> Set flag true.
      // Se true: "Come va la pesca?"
    },
    {
      id: 'vermilion_gym',
      trigger: 'interact',
      // Logica Engine:
      // Se flag 'hm01Obtained' è false: "Un alberello blocca l'ingresso della Palestra."
      // Se true: Permette l'accesso -> Gauntlet (Allenatori + Lt. Surge)
    },
    {
      id: 'ss_anne_dock',
      trigger: 'interact',
      // Logica Engine:
      // "Molo della M/N Anna."
      // Se flag 'ss_ticket_received' è true: "Guardia: 'Hai il biglietto? Prego, sali a bordo!'" -> Teleport a 'ss_anne_exterior'.
      // Se false: "Guardia: 'Solo i possessori di biglietto possono salire.'"
    },
    {
      id: 'construction_site',
      trigger: 'interact',
      // Logica Engine:
      // "Il mio Machop sta spianando il terreno per un nuovo edificio!"
    }
  ]
};