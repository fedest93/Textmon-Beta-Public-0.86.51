import { MapData } from '../../types';

export const celadonDeptStoreRooftop: MapData = {
  id: 'celadon_dept_store_rooftop',
  name: 'Celadon Dept. Store - Rooftop',
  description: 'Sei sulla terrazza del Centro Commerciale. C\'è una vista mozzafiato su Azzurropoli. Ci sono dei distributori automatici e una bambina assetata.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [],
  trainers: [],
  events: [
    {
      id: 'go_to_5f',
      trigger: 'interact',
      // Logica Engine: "Scendi le scale verso il quinto piano." -> Teleport a 'celadon_dept_store_5f'
    },
    {
      id: 'use_elevator_rooftop',
      trigger: 'interact',
      // Logica Engine: Apre il menu dell'ascensore
    },
    {
      id: 'vending_machine_water',
      trigger: 'interact',
      // Logica Engine:
      // "Distributore: Acqua Fresca - 200$. Vuoi comprarne una?"
      // -> Se sì e hai soldi -> -200$, Add Item 'fresh_water'
    },
    {
      id: 'vending_machine_soda',
      trigger: 'interact',
      // Logica Engine:
      // "Distributore: Gassosa - 300$. Vuoi comprarne una?"
      // -> Se sì e hai soldi -> -300$, Add Item 'soda_pop'
    },
    {
      id: 'vending_machine_lemonade',
      trigger: 'interact',
      // Logica Engine:
      // "Distributore: Lemonsucco - 350$. Vuoi comprarne una?"
      // -> Se sì e hai soldi -> -350$, Add Item 'lemonade'
    },
    {
      id: 'thirsty_girl_tm_gift',
      trigger: 'interact',
      // Logica Engine:
      // "Bambina: 'Ho tanta sete...'"
      // Se le dai Acqua Fresca -> "Grazie! Prendi questa!" -> Add Item 'tm13' (Geloraggio)
      // Se le dai Gassosa -> "Grazie! Prendi questa!" -> Add Item 'tm48' (Frana)
      // Se le dai Lemonsucco -> "Grazie! Prendi questa!" -> Add Item 'tm49' (Tripletta)
      // (La logica gestirà la scomparsa dell'evento dopo il primo regalo)
    }
  ]
};