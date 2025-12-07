import { MapData } from '../../types';

export const fuchsiaCity: MapData = {
  id: 'fuchsia_city',
  name: 'Fuchsia City',
  description: 'Una città esotica nota per la sua Zona Safari e la Palestra gestita da un ninja. C\'è uno zoo all\'aperto con Pokémon rari.',
  connections: {
    west: 'route_18',
    east: 'route_15',
    south: 'route_19' // Verso i percorsi marini
  },
  wildEncounters: [], // Solo pesca nella Zona Safari
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
      // Logica Engine: Apre Shop (Ultra Ball, Super Repel, Full Heal, Revive)
    },
    {
      id: 'safari_zone_entrance',
      trigger: 'interact',
      // Logica Engine:
      // "Benvenuto alla Zona Safari! Per 500$ puoi entrare e catturare tutti i Pokémon che vuoi! Ti daremo 30 Safari Ball."
      // -> Scelta: [Entra, Non Entrare] -> Se Entra, teleport a 'safari_zone_entrance'
    },
    {
      id: 'fuchsia_gym',
      trigger: 'interact',
      // Logica Engine:
      // "Benvenuto alla Palestra di Fucsiapoli! Il capopalestra Koga è un maestro di veleni e illusioni!"
      // -> Entra -> Gauntlet (Juggler, Tamer, Koga)
    },
    {
      id: 'wardens_house',
      trigger: 'interact',
      // Logica Engine:
      // "Il Guardiano balbetta in modo incomprensibile. Sembra aver perso i suoi denti."
      // Se hai 'gold_teeth': "Dai i Denti d'Oro al Guardiano." -> "Grazie! Ora posso parlare! Prendi questa MN segreta!"
      // -> Add Item 'hm03' (Surf) -> Set flag 'hm03_obtained'
    },
    {
      id: 'fishing_gurus_brother_house',
      trigger: 'interact',
      // Logica Engine:
      // Se flag 'good_rod_received' è false: "Mio fratello è un guru della pesca! Io sono bravo, ma non come lui. Prendi questo!"
      // -> Add Item 'good_rod' -> Set flag 'good_rod_received'
    },
    {
      id: 'pokemon_zoo',
      trigger: 'interact',
      // Logica Engine:
      // "Guardi i recinti dello zoo. Vedi un Chansey, un Voltorb e un Kangaskhan."
    }
  ]
};