import { MapData } from '../../types';

export const mtMoon: MapData = {
  id: 'mt_moon',
  name: 'Mt. Moon',
  description: 'Una vasta grotta labirintica su più livelli. È buio e pieno di Zubat. Davanti a te vedi diverse strade: un sentiero che esplora il piano terra e una scala a pioli che scende nell\'oscurità.',
  connections: {
    west: 'route_3',
    east: 'route_4' // Uscita verso Celestopoli (da creare poi)
  },
  wildEncounters: [
    // Zubat: Onnipresente (Livelli 6-10)
    { pokemonId: 41, minLevel: 6, maxLevel: 10, rate: 60 },
    // Geodude: Comune (Livelli 7-9)
    { pokemonId: 74, minLevel: 7, maxLevel: 9, rate: 25 },
    // Paras: Non comune (Livelli 6-8)
    { pokemonId: 46, minLevel: 6, maxLevel: 8, rate: 10 },
    // Clefairy: Molto Raro (Livelli 8-9)
    { pokemonId: 35, minLevel: 8, maxLevel: 9, rate: 5 }
  ],
  trainers: [
    'rocket_grunt_1',    // Il Grunt principale
    'super_nerd_miguel', // Il Nerd dei fossili
    'youngster_ben',     // Riutilizzato come "Allenatore perso"
    'lass_janice'        // Riutilizzata come "Allenatrice persa"
  ],
  events: [
    // --- PIANO TERRA (1F) ---
    {
      id: 'explore_1f_left',
      trigger: 'interact',
      // Logica Engine:
      // Testo: "Esplori l'ala ovest del piano terra. Un allenatore ti salta fuori dal buio!"
      // Battle Start: 'youngster_ben' (Simulato come "Youngster Josh")
      // Reward: Item 'potion'
    },
    {
      id: 'explore_1f_right',
      trigger: 'interact',
      // Logica Engine:
      // Testo: "Trovi un angolo tranquillo... ma è una trappola! Un Lass ti sfida!"
      // Battle Start: 'lass_janice' (Simulato come "Lass Miriam")
      // Reward: Item 'moon_stone' (Raro!)
    },

    // --- PIANO INTERRATO 1 (B1F) ---
    {
      id: 'ladder_b1f',
      trigger: 'interact',
      // Logica Engine:
      // Testo: "Scendi la scala... L'aria si fa più pesante. Senti delle voci losche."
      // Aggiorna descrizione mappa: "Sei nel B1F. Lunghi corridoi scavati nella roccia. Vedi uomini in uniforme nera."
    },
    {
      id: 'rocket_ambush_1',
      trigger: 'interact',
      conditionFlag: '!rocket_grunt_1_defeated',
      // Logica Engine:
      // Testo: "Ehi tu! Il Team Rocket sta lavorando qui! Sparisci!"
      // Battle Start: 'rocket_grunt_1'
    },

    // --- PIANO INTERRATO 2 (B2F - FOSSILI) ---
    {
      id: 'ladder_b2f',
      trigger: 'interact',
      // Logica Engine:
      // Testo: "Scendi ancora più in profondità. Vedi uno scienziato che protegge due fossili."
    },
    {
      id: 'super_nerd_battle',
      trigger: 'interact',
      conditionFlag: '!super_nerd_miguel_defeated',
      // Logica Engine:
      // Testo: "Questi fossili sono miei! Non te li darò mai!"
      // Battle Start: 'super_nerd_miguel'
    },
    {
      id: 'choose_fossil',
      trigger: 'interact',
      conditionFlag: 'super_nerd_miguel_defeated',
      // Logica Engine:
      // Dialogo Scelta: "Quale fossile vuoi prendere?"
      // Opzioni: [Helix Fossil, Dome Fossil]
      // Azione: Add KeyItem (helix_fossil o dome_fossil) -> Remove other fossil -> Set flag 'fossil_chosen'.
      // Testo Miguel: "Ok, tu prendi quello, io mi tengo questo!"
    },
    {
      id: 'exit_cave',
      trigger: 'interact',
      conditionFlag: 'fossil_chosen',
      // Logica Engine:
      // "Vedi la luce in fondo al tunnel! È l'uscita verso il Percorso 4."
      // Teleport -> 'route_4'
    }
  ]
};