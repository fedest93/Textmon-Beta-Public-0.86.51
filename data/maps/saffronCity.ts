import { MapData } from '../../types';

export const saffronCity: MapData = {
  id: 'saffron_city',
  name: 'Saffron City',
  description: 'La più grande città di Kanto, un labirinto di grattacieli e strade affollate. Ora che il Team Rocket è stato sconfitto, la città è tornata alla normalità.',
  connections: {
    north: 'route_5',
    south: 'route_6',
    east: 'route_8',
    west: 'route_7'
  },
  wildEncounters: [],
  trainers: [], // Gli allenatori sono gestiti tramite eventi
  events: [
    {
      id: 'poke_center',
      trigger: 'interact',
      // Logica Engine: Cura e PC
    },
    {
      id: 'poke_mart',
      trigger: 'interact',
      // Logica Engine: Apre Shop (Hyper Potion, Max Repel, Full Heal, Revive)
    },
    {
      id: 'silph_co_entrance',
      trigger: 'interact',
      // Logica Engine:
      // Se flag 'giovanni_2_defeated' è false: "Una recluta Rocket blocca l'ingresso." -> Avvia gauntlet Silph Co.
      // Se true: "L'atrio della Silph SpA è tranquillo. Il presidente ti ringrazia ancora."
    },
    {
      id: 'saffron_gym',
      trigger: 'interact',
      // Logica Engine:
      // Se flag 'giovanni_2_defeated' è false: "Un uomo blocca la porta: 'Il Team Rocket ha spaventato la Capopalestra.'"
      // Se true e 'marshBadgeObtained' è false: "Benvenuto alla Palestra di Zafferanoli!" -> Avvia gauntlet:
      // 1. 'psychic_johan_sg'
      // 2. 'channeler_tasha_sg'
      // 3. 'psychic_tyron_sg'
      // 4. 'psychic_preston_sg'
      // 5. 'leader_sabrina'
      // Se 'marshBadgeObtained' è true: "Sabrina medita in silenzio."
    },
    {
      id: 'fighting_dojo',
      trigger: 'interact',
      // Logica Engine:
      // Se 'dojo_master_defeated' è false: "Benvenuto al Dojo Karate!" -> Avvia gauntlet:
      // 1. 'blackbelt_hitoshi'
      // 2. 'blackbelt_aaron'
      // 3. 'blackbelt_hideki'
      // 4. 'blackbelt_mike'
      // 5. 'blackbelt_koichi'
      // Se 'dojo_master_defeated' è true: "Il Maestro si inchina a te."
    },
    {
      id: 'mr_psychic_house',
      trigger: 'interact',
      // Logica Engine:
      // "Mr. Psychic: 'Vedo che hai un grande potenziale psichico! Prendi questa MT!'"
      // -> Add Item 'tm29' (Psichico) -> Set flag 'tm29_received'
    },
    {
      id: 'copycats_house',
      trigger: 'interact',
      // Logica Engine:
      // "Bambina: 'Ciao! Mi piace copiare le persone!'"
    }
  ]
};