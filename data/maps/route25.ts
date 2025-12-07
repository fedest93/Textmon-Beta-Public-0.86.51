import { MapData } from '../../types';

export const route25: MapData = {
  id: 'route_25',
  name: 'Route 25',
  description: 'Un percorso tortuoso pieno di allenatori che porta al promontorio. Si dice che un famoso ricercatore viva in fondo alla strada. L\'erba alta nasconde Pokémon elusivi.',
  connections: {
    west: 'route_24',
    east: 'bills_house' // La destinazione finale di questa zona
  },
  wildEncounters: [
    // Pidgey: Comune (Livelli 11-13)
    { pokemonId: 16, minLevel: 11, maxLevel: 13, rate: 30 },
    // Oddish: Comune (Livelli 12-14)
    { pokemonId: 43, minLevel: 12, maxLevel: 14, rate: 20 },
    // Bellsprout: Comune (Livelli 12-14)
    { pokemonId: 69, minLevel: 12, maxLevel: 14, rate: 20 },
    // Abra: Non comune (Livelli 10-12) - Il target principale qui!
    { pokemonId: 63, minLevel: 10, maxLevel: 12, rate: 15 },
    // Caterpie/Weedle: Rari (Livelli 10-12)
    { pokemonId: 10, minLevel: 10, maxLevel: 12, rate: 5 },
    { pokemonId: 13, minLevel: 10, maxLevel: 12, rate: 5 },
    // Metapod/Kakuna: Molto Rari
    { pokemonId: 11, minLevel: 10, maxLevel: 12, rate: 2 },
    { pokemonId: 14, minLevel: 10, maxLevel: 12, rate: 3 }
  ],
  trainers: [
    'hiker_franklin', // Definito specificamente per questa zona
    // Riutilizziamo allenatori generici per simulare il "Gauntlet" del percorso
    'youngster_ben',
    'lass_janice',
    'camper_liam'
  ],
  events: [
    {
      id: 'item_tm19',
      trigger: 'interact',
      conditionFlag: '!item_tm19_taken',
      // Logica Engine: "Hai trovato MT19 (Movimento Sismico)!" -> Add Item -> Set flag true.
    },
    {
      id: 'shortcut_bush',
      trigger: 'interact',
      // Logica Engine: 
      // Se flag 'hm01Obtained' è true: "Hai tagliato l'alberello!" (Sblocca scorciatoia per tornare a Celestopoli).
      // Se false: "Questo albero sembra si possa tagliare..."
    },
    {
      id: 'dating_couple',
      trigger: 'interact',
      // Logica Engine: "Siamo qui per guardare il mare, non disturbare!" (Flavor text classico).
    }
  ]
};