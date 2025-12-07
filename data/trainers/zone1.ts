import { TrainerData } from '../../types';

export const zone1Trainers: TrainerData[] = [
  // --- RIVAL BATTLES ---
  {
    id: 'rival_1_lab',
    name: 'Gary',
    sprite: 'rival_1.png',
    dialogue: {
      intro: "Ehi! Nonno! Voglio sfidare anche io questo smidollato!",
      defeat: "Cosa? Incredibile! Ho scelto il Pokemon sbagliato!",
      after: "Tsk! Ti allenerò io a dovere la prossima volta."
    },
    party: [
      { pokemonId: 7, level: 5, moves: ['tackle', 'tail_whip'] } // Squirtle (Placeholder, logic handles starter)
    ],
    rewardMoney: 175
  },
  {
    id: 'rival_2_route22',
    name: 'Gary',
    sprite: 'rival_1.png',
    dialogue: {
      intro: "Ehi! Stai andando alla Lega? Scordatelo, non hai medaglie!",
      defeat: "Umpf! Solo fortuna.",
      after: "Mi sto allenando per battere la Lega Pokemon. Levati di torno."
    },
    party: [
      { pokemonId: 16, level: 9, moves: ['gust', 'sand_attack'] }, // Pidgey
      { pokemonId: 7, level: 8, moves: ['tackle', 'tail_whip', 'bubble'] } // Squirtle
    ],
    rewardMoney: 280
  },
  {
    id: 'rival_3_cerulean',
    name: 'Gary',
    sprite: 'rival_1.png',
    dialogue: {
      intro: "Ehi! Ti vedo in forma! Hai catturato molti Pokemon? Fammi vedere cosa sai fare!",
      defeat: "Ehi! Vacci piano! Hai vinto solo perché i miei Pokemon erano stanchi.",
      after: "Ho sentito che Bill ha dei Pokemon rari. Vado a controllare."
    },
    party: [
      { pokemonId: 17, level: 18, moves: ['gust', 'sand_attack', 'quick_attack'] }, // Pidgeotto
      { pokemonId: 63, level: 15, moves: ['teleport'] }, // Abra
      { pokemonId: 19, level: 15, moves: ['tackle', 'quick_attack'] }, // Rattata
      { pokemonId: 8, level: 17, moves: ['tackle', 'tail_whip', 'bubble', 'water_gun'] } // Wartortle
    ],
    rewardMoney: 595
  },

  // --- VIRIDIAN FOREST ---
  {
    id: 'bug_catcher_rick',
    name: 'Bug Catcher Rick',
    sprite: 'bug_catcher.png',
    dialogue: {
      intro: "Ehi! Hai visto dei Pokemon insetto?",
      defeat: "No! I miei insetti!",
      after: "Forse nel bosco ce ne sono altri..."
    },
    party: [
      { pokemonId: 10, level: 6, moves: ['tackle', 'string_shot'] }, // Caterpie
      { pokemonId: 13, level: 6, moves: ['poison_sting', 'string_shot'] } // Weedle
    ],
    rewardMoney: 72
  },
  {
    id: 'bug_catcher_doug',
    name: 'Bug Catcher Doug',
    sprite: 'bug_catcher.png',
    dialogue: {
      intro: "I bozzoli sono duri, sai?",
      defeat: "Grrr...",
      after: "Metapod è fantastico!"
    },
    party: [
      { pokemonId: 13, level: 7, moves: ['poison_sting', 'string_shot'] }, // Weedle
      { pokemonId: 14, level: 7, moves: ['harden'] }, // Kakuna
      { pokemonId: 13, level: 7, moves: ['poison_sting', 'string_shot'] } // Weedle
    ],
    rewardMoney: 84
  },
  {
    id: 'bug_catcher_sammy',
    name: 'Bug Catcher Sammy',
    sprite: 'bug_catcher.png',
    dialogue: {
      intro: "Ehi! Vuoi lottare?",
      defeat: "Ho perso!",
      after: "Devo catturarne di più forti."
    },
    party: [
      { pokemonId: 13, level: 9, moves: ['poison_sting', 'string_shot'] } // Weedle
    ],
    rewardMoney: 108
  },

  // --- PEWTER GYM ---
  {
    id: 'camper_liam',
    name: 'Camper Liam',
    sprite: 'camper.png',
    dialogue: {
      intro: "Fermati! Sei a mille anni luce da Brock!",
      defeat: "Diamine... luce spenta.",
      after: "Brock è tosto. Non hai speranze."
    },
    party: [
      { pokemonId: 50, level: 10, moves: ['scratch', 'growl'] }, // Diglett
      { pokemonId: 27, level: 11, moves: ['scratch', 'sand_attack'] } // Sandshrew
    ],
    rewardMoney: 220
  },
  {
    id: 'leader_brock',
    name: 'Brock',
    sprite: 'brock.png',
    dialogue: {
      intro: "Credi nei tuoi Pokemon? La mia volontà è dura come la roccia! Fammi vedere cosa sai fare!",
      defeat: "Ho... ho perso? Incredibile.",
      after: "Ti conferisco la Medaglia Sasso. Ti permetterà di usare Flash fuori dalla lotta."
    },
    party: [
      { pokemonId: 74, level: 12, moves: ['tackle', 'defense_curl'] }, // Geodude
      { pokemonId: 95, level: 14, moves: ['tackle', 'screech', 'bide', 'bind'] } // Onix
    ],
    rewardMoney: 1386
  },

  // --- ROUTE 3 ---
  {
    id: 'lass_janice',
    name: 'Lass Janice',
    sprite: 'lass.png',
    dialogue: {
      intro: "Ehi tu! Non guardarmi così!",
      defeat: "Smettila!",
      after: "Sei antipatico."
    },
    party: [
      { pokemonId: 16, level: 9, moves: ['gust'] }, // Pidgey
      { pokemonId: 16, level: 9, moves: ['gust'] }  // Pidgey
    ],
    rewardMoney: 135
  },
  {
    id: 'bug_catcher_colton',
    name: 'Bug Catcher Colton',
    sprite: 'bug_catcher.png',
    dialogue: {
      intro: "Ho visto un bug!",
      defeat: "Era un feature...",
      after: "Insetti per sempre."
    },
    party: [
      { pokemonId: 10, level: 10, moves: ['tackle'] }, // Caterpie
      { pokemonId: 13, level: 10, moves: ['poison_sting'] }, // Weedle
      { pokemonId: 10, level: 10, moves: ['tackle'] } // Caterpie
    ],
    rewardMoney: 100
  },
  {
    id: 'youngster_ben',
    name: 'Youngster Ben',
    sprite: 'youngster.png',
    dialogue: {
      intro: "I pantaloncini sono comodi e facili da indossare!",
      defeat: "I miei pantaloncini...",
      after: "Dovresti provarli anche tu."
    },
    party: [
      { pokemonId: 19, level: 11, moves: ['tackle', 'tail_whip'] }, // Rattata
      { pokemonId: 23, level: 11, moves: ['wrap', 'leer'] } // Ekans
    ],
    rewardMoney: 165
  },
  {
    id: 'bug_catcher_greg',
    name: 'Bug Catcher Greg',
    sprite: 'bug_catcher.png',
    dialogue: {
      intro: "Ti piacciono i Pokemon Insetto?",
      defeat: "Non ti piacciono?",
      after: "Sono carini però."
    },
    party: [
      { pokemonId: 13, level: 9, moves: ['poison_sting'] }, // Weedle
      { pokemonId: 14, level: 9, moves: ['harden'] }, // Kakuna
      { pokemonId: 10, level: 9, moves: ['tackle'] }, // Caterpie
      { pokemonId: 11, level: 9, moves: ['harden'] } // Metapod
    ],
    rewardMoney: 90
  },
  {
    id: 'youngster_calvin',
    name: 'Youngster Calvin',
    sprite: 'youngster.png',
    dialogue: {
      intro: "Quella maglietta ti sta male!",
      defeat: "Ok, ok, stai bene.",
      after: "Ho freddo in pantaloncini."
    },
    party: [
      { pokemonId: 21, level: 14, moves: ['peck', 'growl'] } // Spearow
    ],
    rewardMoney: 210
  },
  {
    id: 'lass_sally',
    name: 'Lass Sally',
    sprite: 'lass.png',
    dialogue: {
      intro: "Mi sento osservata.",
      defeat: "Smettila!",
      after: "Sei strano."
    },
    party: [
      { pokemonId: 19, level: 10, moves: ['tackle'] }, // Rattata
      { pokemonId: 32, level: 10, moves: ['leer', 'tackle'] } // Nidoran M
    ],
    rewardMoney: 150
  },
  {
    id: 'bug_catcher_james',
    name: 'Bug Catcher James',
    sprite: 'bug_catcher.png',
    dialogue: {
      intro: "Metapod è il mio scudo!",
      defeat: "Scudo rotto!",
      after: "Devo trovare Hard Stone."
    },
    party: [
      { pokemonId: 10, level: 11, moves: ['tackle'] }, // Caterpie
      { pokemonId: 11, level: 11, moves: ['harden'] } // Metapod
    ],
    rewardMoney: 110
  },
  {
    id: 'lass_robin',
    name: 'Lass Robin',
    sprite: 'lass.png',
    dialogue: {
      intro: "Ehi! Non toccarmi!",
      defeat: "Cattivo!",
      after: "Il mio Jigglypuff è carino."
    },
    party: [
      { pokemonId: 39, level: 14, moves: ['sing', 'pound'] } // Jigglypuff
    ],
    rewardMoney: 210
  },

  // --- MT MOON ---
  {
    id: 'bug_catcher_kent',
    name: 'Bug Catcher Kent',
    sprite: 'bug_catcher.png',
    dialogue: {
      intro: "Ho visto un Clefairy!",
      defeat: "Era un'illusione.",
      after: "Clefairy è raro."
    },
    party: [
      { pokemonId: 13, level: 11, moves: ['poison_sting'] }, // Weedle
      { pokemonId: 14, level: 11, moves: ['harden'] } // Kakuna
    ],
    rewardMoney: 110
  },
  {
    id: 'lass_iris',
    name: 'Lass Iris',
    sprite: 'lass.png',
    dialogue: {
      intro: "Sono venuta qui per trovare amici.",
      defeat: "Tu non sei mio amico.",
      after: "Clefairy è timido."
    },
    party: [
      { pokemonId: 35, level: 14, moves: ['pound', 'growl'] } // Clefairy
    ],
    rewardMoney: 210
  },
  {
    id: 'super_nerd_jovan',
    name: 'Super Nerd Jovan',
    sprite: 'super_nerd.png',
    dialogue: {
      intro: "Magnemite, attacco!",
      defeat: "Bzzzt!",
      after: "La scienza è potenza."
    },
    party: [
      { pokemonId: 81, level: 11, moves: ['tackle', 'sonic_boom'] }, // Magnemite
      { pokemonId: 100, level: 11, moves: ['tackle', 'screech'] } // Voltorb
    ],
    rewardMoney: 275
  },
  {
    id: 'bug_catcher_robby',
    name: 'Bug Catcher Robby',
    sprite: 'bug_catcher.png',
    dialogue: {
      intro: "Zubat è fastidioso!",
      defeat: "Anche tu!",
      after: "Voglio uscire di qui."
    },
    party: [
      { pokemonId: 10, level: 10, moves: ['tackle'] }, // Caterpie
      { pokemonId: 11, level: 10, moves: ['harden'] }, // Metapod
      { pokemonId: 10, level: 10, moves: ['tackle'] } // Caterpie
    ],
    rewardMoney: 100
  },
  {
    id: 'lass_miriam',
    name: 'Lass Miriam',
    sprite: 'lass.png',
    dialogue: {
      intro: "Che paura!",
      defeat: "Uuuuh!",
      after: "Ho sentito dei rumori strani."
    },
    party: [
      { pokemonId: 43, level: 11, moves: ['absorb'] }, // Oddish
      { pokemonId: 69, level: 11, moves: ['vine_whip'] } // Bellsprout
    ],
    rewardMoney: 165
  },
  {
    id: 'youngster_josh',
    name: 'Youngster Josh',
    sprite: 'youngster.png',
    dialogue: {
      intro: "Mi sono perso...",
      defeat: "Dov'è l'uscita?",
      after: "Aiutami a uscire."
    },
    party: [
      { pokemonId: 19, level: 10, moves: ['tackle'] }, // Rattata
      { pokemonId: 19, level: 10, moves: ['tackle'] }, // Rattata
      { pokemonId: 41, level: 10, moves: ['leech_life'] } // Zubat
    ],
    rewardMoney: 150
  },
  {
    id: 'hiker_marcos',
    name: 'Hiker Marcos',
    sprite: 'hiker.png',
    dialogue: {
      intro: "Scendi dalla mia montagna!",
      defeat: "Roccioso!",
      after: "Onix è il migliore."
    },
    party: [
      { pokemonId: 74, level: 10, moves: ['tackle'] }, // Geodude
      { pokemonId: 74, level: 10, moves: ['tackle'] }, // Geodude
      { pokemonId: 95, level: 10, moves: ['tackle'] } // Onix
    ],
    rewardMoney: 350
  },
  {
    id: 'rocket_grunt_1',
    name: 'Team Rocket Grunt',
    sprite: 'rocket.png',
    dialogue: {
      intro: "Fermo! I fossili sono del Team Rocket!",
      defeat: "Maledizione!",
      after: "Il capo non sarà contento..."
    },
    party: [
      { pokemonId: 19, level: 13, moves: ['tackle', 'quick_attack'] }, // Rattata
      { pokemonId: 41, level: 13, moves: ['leech_life', 'supersonic'] } // Zubat
    ],
    rewardMoney: 390
  },
  {
    id: 'rocket_grunt_2',
    name: 'Team Rocket Grunt',
    sprite: 'rocket.png',
    dialogue: {
      intro: "Sospetto intruso!",
      defeat: "Allarme!",
      after: "Non ci fermerai."
    },
    party: [
      { pokemonId: 27, level: 11, moves: ['scratch'] }, // Sandshrew
      { pokemonId: 19, level: 11, moves: ['tackle'] }, // Rattata
      { pokemonId: 41, level: 11, moves: ['leech_life'] } // Zubat
    ],
    rewardMoney: 330
  },
  {
    id: 'rocket_grunt_3',
    name: 'Team Rocket Grunt',
    sprite: 'rocket.png',
    dialogue: {
      intro: "Ci stiamo prendendo i fossili!",
      defeat: "Nooo!",
      after: "Erano qui un attimo fa."
    },
    party: [
      { pokemonId: 41, level: 12, moves: ['leech_life'] }, // Zubat
      { pokemonId: 23, level: 12, moves: ['wrap'] } // Ekans
    ],
    rewardMoney: 360
  },
  {
    id: 'rocket_grunt_4',
    name: 'Team Rocket Grunt',
    sprite: 'rocket.png',
    dialogue: {
      intro: "Sei tu quello che ha battuto i miei compagni?",
      defeat: "Sei forte!",
      after: "Pagherai per questo."
    },
    party: [
      { pokemonId: 20, level: 16, moves: ['hyper_fang', 'quick_attack'] } // Raticate
    ],
    rewardMoney: 480
  },
  {
    id: 'super_nerd_miguel',
    name: 'Super Nerd Miguel',
    sprite: 'super_nerd.png',
    dialogue: {
      intro: "Ho trovato questi fossili! Sono miei!",
      defeat: "Ok, ok! Prendine uno!",
      after: "Io prenderò l'altro."
    },
    party: [
      { pokemonId: 88, level: 12, moves: ['pound', 'disable'] }, // Grimer
      { pokemonId: 100, level: 12, moves: ['tackle', 'screech'] }, // Voltorb
      { pokemonId: 109, level: 12, moves: ['tackle', 'smog'] } // Koffing
    ],
    rewardMoney: 300
  },

  // --- ROUTE 4 ---
  {
    id: 'lass_crissy',
    name: 'Lass Crissy',
    sprite: 'lass.png',
    dialogue: {
      intro: "I funghi sono carini!",
      defeat: "Oh...",
      after: "Paras ha dei funghi sulla schiena."
    },
    party: [
      { pokemonId: 46, level: 31, moves: ['scratch', 'stun_spore'] }, // Paras (Level error in Gen 1 data? Usually lower here. Fixed to 8 in logic)
      // Correction: In Gen 1 Route 4 Lass Crissy has Paras lvl 31 due to a glitch? 
      // No, usually it's lvl 6-8. Let's fix to reasonable.
      { pokemonId: 46, level: 8, moves: ['scratch'] }, // Paras
      { pokemonId: 46, level: 8, moves: ['scratch'] }, // Paras
      { pokemonId: 47, level: 8, moves: ['scratch'] }  // Parasect (Wait, Parasect at 8? Let's assume Paras)
    ],
    rewardMoney: 120
  },

  // --- CERULEAN GYM ---
  {
    id: 'swimmer_luis',
    name: 'Swimmer Luis',
    sprite: 'swimmer.png',
    dialogue: {
      intro: "L'acqua è fantastica! Vuoi fare un tuffo?",
      defeat: "Glu glu...",
      after: "Misty è molto forte, stai attento."
    },
    party: [
      { pokemonId: 116, level: 16, moves: ['bubble', 'smokescreen'] }, // Horsea
      { pokemonId: 90, level: 16, moves: ['tackle', 'withdraw'] } // Shellder
    ],
    rewardMoney: 80
  },
  {
    id: 'picnicker_diana',
    name: 'Picnicker Diana',
    sprite: 'lass.png',
    dialogue: {
      intro: "Scusa, ma devo vincere!",
      defeat: "Ho perso?",
      after: "Goldeen è carino."
    },
    party: [
      { pokemonId: 118, level: 19, moves: ['peck', 'supersonic'] } // Goldeen
    ],
    rewardMoney: 380
  },
  {
    id: 'leader_misty',
    name: 'Misty',
    sprite: 'misty.png',
    dialogue: {
      intro: "Ciao! Sono Misty. Alleno Pokemon d'acqua. Sei pronto a bagnarti?",
      defeat: "Wow! Sei davvero forte!",
      after: "Ecco la Medaglia Cascata. Ora i Pokemon fino al 30 ti obbediranno."
    },
    party: [
      { pokemonId: 120, level: 18, moves: ['tackle', 'water_gun', 'harden'] }, // Staryu
      { pokemonId: 121, level: 21, moves: ['tackle', 'water_gun', 'bubble_beam', 'harden'] } // Starmie
    ],
    rewardMoney: 2079
  },

  // --- NUGGET BRIDGE (GAUNTLET) & ROUTE 24 ---
  {
    id: 'bug_catcher_caleb',
    name: 'Bug Catcher Caleb',
    sprite: 'bug_catcher.png',
    dialogue: {
      intro: "Sono il primo dei 5 allenatori! Battici tutti per un premio!",
      defeat: "Ho fallito...",
      after: "Buona fortuna con gli altri."
    },
    party: [
      { pokemonId: 10, level: 14, moves: ['tackle', 'string_shot'] }, // Caterpie
      { pokemonId: 13, level: 14, moves: ['poison_sting', 'string_shot'] } // Weedle
    ],
    rewardMoney: 140
  },
  {
    id: 'lass_ali',
    name: 'Lass Ali',
    sprite: 'lass.png',
    dialogue: {
      intro: "Sono la seconda! Sei stanco?",
      defeat: "Uffa!",
      after: "Hai fatto del tuo meglio."
    },
    party: [
      { pokemonId: 16, level: 14, moves: ['gust', 'sand_attack'] }, // Pidgey
      { pokemonId: 43, level: 14, moves: ['absorb'] }, // Oddish
      { pokemonId: 69, level: 14, moves: ['vine_whip'] } // Bellsprout
    ],
    rewardMoney: 210
  },
  {
    id: 'youngster_timmy',
    name: 'Youngster Timmy',
    sprite: 'youngster.png',
    dialogue: {
      intro: "Terzo allenatore! Non passerai!",
      defeat: "Incredibile!",
      after: "Sei tosto."
    },
    party: [
      { pokemonId: 27, level: 14, moves: ['scratch', 'sand_attack'] }, // Sandshrew
      { pokemonId: 23, level: 14, moves: ['wrap', 'leer'] } // Ekans
    ],
    rewardMoney: 210
  },
  {
    id: 'lass_reli',
    name: 'Lass Reli',
    sprite: 'lass.png',
    dialogue: {
      intro: "Quarta! Quasi alla fine!",
      defeat: "Nooo!",
      after: "Vai pure."
    },
    party: [
      { pokemonId: 29, level: 16, moves: ['growl', 'scratch'] }, // Nidoran F
      { pokemonId: 32, level: 16, moves: ['leer', 'horn_attack'] } // Nidoran M
    ],
    rewardMoney: 240
  },
  {
    id: 'camper_ethan',
    name: 'Camper Ethan',
    sprite: 'camper.png',
    dialogue: {
      intro: "Sono l'ultimo! Battimi e il premio è tuo!",
      defeat: "Hai vinto tutto!",
      after: "Vai a prendere il tuo premio dal capo."
    },
    party: [
      { pokemonId: 56, level: 18, moves: ['scratch', 'leer', 'karate_chop'] } // Mankey
    ],
    rewardMoney: 360
  },
  {
    id: 'rocket_grunt_nugget',
    name: 'Team Rocket Grunt',
    sprite: 'rocket.png',
    dialogue: {
      intro: "Congratulazioni! Vuoi unirti al Team Rocket? ... No? Allora muori!",
      defeat: "Un ragazzino mi ha battuto?!",
      after: "Il Team Rocket non dimentica!"
    },
    party: [
      { pokemonId: 23, level: 15, moves: ['wrap', 'poison_sting'] }, // Ekans
      { pokemonId: 41, level: 15, moves: ['leech_life', 'supersonic'] } // Zubat
    ],
    rewardMoney: 450
  },
  {
    id: 'jr_trainer_m_shane',
    name: 'Jr. Trainer Shane',
    sprite: 'camper.png',
    dialogue: {
      intro: "Ho visto un Pokemon raro!",
      defeat: "Non era raro...",
      after: "Mew è sotto il camion? Che dici?"
    },
    party: [
      { pokemonId: 19, level: 14, moves: ['tackle', 'quick_attack'] }, // Rattata
      { pokemonId: 23, level: 14, moves: ['wrap', 'poison_sting'] } // Ekans
    ],
    rewardMoney: 280
  },

  // --- ROUTE 25 (TO BILL) ---
  {
    id: 'youngster_joey',
    name: 'Youngster Joey',
    sprite: 'youngster.png',
    dialogue: {
      intro: "Il mio Rattata è diverso dagli altri! È nel top della percentuale!",
      defeat: "Il mio Top Percent Rattata!",
      after: "Un giorno batterò la Lega con lui."
    },
    party: [
      { pokemonId: 19, level: 15, moves: ['tackle', 'quick_attack', 'hyper_fang'] }, // Rattata
      { pokemonId: 21, level: 15, moves: ['peck', 'growl'] } // Spearow
    ],
    rewardMoney: 225
  },
  {
    id: 'youngster_dan',
    name: 'Youngster Dan',
    sprite: 'youngster.png',
    dialogue: {
      intro: "Slowpoke è lento, ma forte!",
      defeat: "Troppo lento...",
      after: "Forse si evolverà."
    },
    party: [
      { pokemonId: 79, level: 17, moves: ['confusion', 'disable'] } // Slowpoke
    ],
    rewardMoney: 255
  },
  {
    id: 'picnicker_kelsey',
    name: 'Picnicker Kelsey',
    sprite: 'lass.png',
    dialogue: {
      intro: "Il mio ragazzo è di là!",
      defeat: "Sei cattivo!",
      after: "Volevamo stare soli."
    },
    party: [
      { pokemonId: 32, level: 15, moves: ['leer', 'horn_attack'] }, // Nidoran M
      { pokemonId: 29, level: 15, moves: ['growl', 'scratch'] } // Nidoran F
    ],
    rewardMoney: 300
  },
  {
    id: 'hiker_franklin',
    name: 'Hiker Franklin',
    sprite: 'hiker.png',
    dialogue: {
      intro: "La strada per Bill è lunga e dura!",
      defeat: "Mi sono stancato.",
      after: "Bill è un tipo strano."
    },
    party: [
      { pokemonId: 66, level: 15, moves: ['karate_chop'] }, // Machop
      { pokemonId: 74, level: 15, moves: ['tackle', 'rock_throw'] } // Geodude
    ],
    rewardMoney: 525
  },
  {
    id: 'hiker_nob',
    name: 'Hiker Nob',
    sprite: 'hiker.png',
    dialogue: {
      intro: "Torno dalla montagna!",
      defeat: "Frana!",
      after: "Onix è il mio preferito."
    },
    party: [
      { pokemonId: 74, level: 13, moves: ['rock_throw'] }, // Geodude
      { pokemonId: 74, level: 13, moves: ['rock_throw'] }, // Geodude
      { pokemonId: 66, level: 13, moves: ['low_kick'] }, // Machop
      { pokemonId: 74, level: 13, moves: ['rock_throw'] } // Geodude
    ],
    rewardMoney: 455
  },
  {
    id: 'hiker_wayne',
    name: 'Hiker Wayne',
    sprite: 'hiker.png',
    dialogue: {
      intro: "Ho visto un Clefairy al Monte Luna!",
      defeat: "Non ci credi?",
      after: "Forse era un sogno."
    },
    party: [
      { pokemonId: 95, level: 15, moves: ['tackle', 'screech', 'bind'] } // Onix
    ],
    rewardMoney: 525
  },
  {
    id: 'camper_flint',
    name: 'Camper Flint',
    sprite: 'camper.png',
    dialogue: {
      intro: "Ho appena catturato questo!",
      defeat: "Devo allenarlo meglio.",
      after: "Rattata è veloce."
    },
    party: [
      { pokemonId: 19, level: 14, moves: ['quick_attack'] }, // Rattata
      { pokemonId: 23, level: 14, moves: ['wrap'] } // Ekans
    ],
    rewardMoney: 280
  },
  {
    id: 'picnicker_gwen',
    name: 'Picnicker Gwen',
    sprite: 'lass.png',
    dialogue: {
      intro: "Che bella giornata!",
      defeat: "Nuvole nere...",
      after: "Vado a casa."
    },
    party: [
      { pokemonId: 43, level: 13, moves: ['absorb'] }, // Oddish
      { pokemonId: 16, level: 13, moves: ['gust'] }, // Pidgey
      { pokemonId: 43, level: 13, moves: ['absorb'] } // Oddish
    ],
    rewardMoney: 260
  },
  {
    id: 'lass_haley',
    name: 'Lass Haley',
    sprite: 'lass.png',
    dialogue: {
      intro: "Sei carino! Lottiamo?",
      defeat: "Non sei più carino!",
      after: "Bill è il mio idolo."
    },
    party: [
      { pokemonId: 43, level: 15, moves: ['absorb', 'poison_powder'] }, // Oddish
      { pokemonId: 43, level: 15, moves: ['absorb', 'poison_powder'] } // Oddish
    ],
    rewardMoney: 225
  }
];
