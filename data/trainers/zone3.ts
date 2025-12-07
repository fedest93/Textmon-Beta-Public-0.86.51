import { TrainerData } from '../../types';

export const zone3Trainers: TrainerData[] = [
  // --- FIGHTING DOJO (SAFFRON CITY) GAUNTLET ---
  {
    id: 'blackbelt_hitoshi',
    name: 'Blackbelt Hitoshi',
    sprite: 'blackbelt.png',
    dialogue: { intro: "Togliti le scarpe!", defeat: "Che dolore!", after: "Il maestro è forte." },
    party: [
      { pokemonId: 66, level: 31, moves: ['karate_chop', 'leer'] },
      { pokemonId: 67, level: 31, moves: ['karate_chop', 'leer'] }
    ],
    rewardMoney: 775
  },
  {
    id: 'blackbelt_aaron',
    name: 'Blackbelt Aaron',
    sprite: 'blackbelt.png',
    dialogue: { intro: "I miei pugni rompono la roccia!", defeat: "Le mie mani!", after: "Hitmonlee o Hitmonchan?" },
    party: [
      { pokemonId: 57, level: 32, moves: ['karate_chop', 'fury_swipes', 'rage'] }
    ],
    rewardMoney: 800
  },
  {
    id: 'blackbelt_hideki',
    name: 'Blackbelt Hideki',
    sprite: 'blackbelt.png',
    dialogue: { intro: "Velocità e potenza!", defeat: "Troppo veloce...", after: "Sei un vero lottatore." },
    party: [
      { pokemonId: 67, level: 31, moves: ['karate_chop', 'low_kick'] },
      { pokemonId: 67, level: 31, moves: ['karate_chop', 'low_kick'] }
    ],
    rewardMoney: 775
  },
  {
    id: 'blackbelt_mike',
    name: 'Blackbelt Mike',
    sprite: 'blackbelt.png',
    dialogue: { intro: "Hya! Hya! Hya!", defeat: "Oof!", after: "Il maestro ti aspetta." },
    party: [
      { pokemonId: 56, level: 31, moves: ['karate_chop', 'fury_swipes'] },
      { pokemonId: 56, level: 31, moves: ['karate_chop', 'fury_swipes'] },
      { pokemonId: 57, level: 31, moves: ['rage', 'seismic_toss'] }
    ],
    rewardMoney: 775
  },
  {
    id: 'blackbelt_koichi',
    name: 'Blackbelt Koichi',
    sprite: 'blackbelt.png',
    dialogue: { intro: "Sono il maestro del Dojo! Mostrami la tua forza!", defeat: "Sei tu il nuovo maestro!", after: "Scegli uno dei miei Pokemon come premio." },
    party: [
      { pokemonId: 106, level: 37, moves: ['jump_kick', 'focus_energy', 'high_jump_kick'] },
      { pokemonId: 107, level: 37, moves: ['fire_punch', 'ice_punch', 'thunder_punch', 'mega_punch'] }
    ],
    rewardMoney: 925
  },

  // --- CYCLING ROAD GAUNTLET (ROUTE 16, 17, 18) ---
  {
    id: 'biker_jax_cr',
    name: 'Biker Jax',
    sprite: 'biker.png',
    dialogue: { intro: "Ehi! Questa è la nostra strada! Paga il pedaggio!", defeat: "Ok, ok, passa pure!", after: "La discesa è veloce!" },
    party: [
      { pokemonId: 110, level: 29, moves: ['tackle', 'smog'] }
    ],
    rewardMoney: 580
  },
  {
    id: 'biker_jaren_cr',
    name: 'Biker Jaren',
    sprite: 'biker.png',
    dialogue: { intro: "Ti piace la mia moto?", defeat: "Ho sbandato!", after: "Devo fare benzina." },
    party: [
      { pokemonId: 88, level: 28, moves: ['pound', 'disable'] },
      { pokemonId: 88, level: 28, moves: ['pound', 'disable'] },
      { pokemonId: 89, level: 28, moves: ['sludge', 'minimize'] }
    ],
    rewardMoney: 560
  },
  {
    id: 'cue_ball_raul_cr',
    name: 'Cue Ball Raul',
    sprite: 'biker.png',
    dialogue: { intro: "Vuoi fare a botte?", defeat: "Sei tosto!", after: "Rispetto, fratello." },
    party: [
      { pokemonId: 66, level: 28, moves: ['karate_chop', 'low_kick'] },
      { pokemonId: 56, level: 28, moves: ['scratch', 'karate_chop'] }
    ],
    rewardMoney: 700
  },
  {
    id: 'biker_luke_cr',
    name: 'Biker Luke',
    sprite: 'biker.png',
    dialogue: { intro: "La mia bici è più veloce della tua!", defeat: "Ho bucato una gomma!", after: "Vai a Fucsiapoli?" },
    party: [
      { pokemonId: 109, level: 29, moves: ['smog', 'sludge'] },
      { pokemonId: 109, level: 29, moves: ['smog', 'sludge'] }
    ],
    rewardMoney: 580
  },
  {
    id: 'cue_ball_koji_cr',
    name: 'Cue Ball Koji',
    sprite: 'biker.png',
    dialogue: { intro: "Sfidami!", defeat: "Che forza!", after: "Devo allenarmi." },
    party: [
      { pokemonId: 67, level: 33, moves: ['submission'] },
      { pokemonId: 68, level: 33, moves: ['submission'] }
    ],
    rewardMoney: 825
  },
  {
    id: 'biker_lao_cr',
    name: 'Biker Lao',
    sprite: 'biker.png',
    dialogue: { intro: "Weezing è il mio compagno di viaggio!", defeat: "Gas di scarico...", after: "Attento al fumo." },
    party: [
      { pokemonId: 88, level: 29, moves: ['sludge'] },
      { pokemonId: 109, level: 29, moves: ['smog'] }
    ],
    rewardMoney: 580
  },
  {
    id: 'bird_keeper_jacob_r18',
    name: 'Bird Keeper Jacob',
    sprite: 'bird_keeper.png',
    dialogue: { intro: "I miei uccelli sono i re del cielo!", defeat: "In picchiata!", after: "Devo insegnargli Volo." },
    party: [
      { pokemonId: 21, level: 29, moves: ['fury_attack'] },
      { pokemonId: 22, level: 29, moves: ['drill_peck'] },
      { pokemonId: 84, level: 29, moves: ['fury_attack'] }
    ],
    rewardMoney: 725
  },

  // --- FUCHSIA GYM GAUNTLET ---
  {
    id: 'juggler_kirk_fg',
    name: 'Juggler Kirk',
    sprite: 'juggler.png',
    dialogue: { intro: "I muri invisibili ti confondono?", defeat: "Ho perso l'equilibrio!", after: "Koga è un maestro ninja." },
    party: [
      { pokemonId: 96, level: 34, moves: ['hypnosis', 'headbutt'] },
      { pokemonId: 64, level: 34, moves: ['psybeam', 'recover'] }
    ],
    rewardMoney: 1190
  },
  {
    id: 'juggler_nate_fg',
    name: 'Juggler Nate',
    sprite: 'juggler.png',
    dialogue: { intro: "Guarda le mie mosse!", defeat: "Ho fatto cadere tutto!", after: "Devo esercitarmi." },
    party: [
      { pokemonId: 96, level: 38, moves: ['hypnosis', 'psychic'] }
    ],
    rewardMoney: 1330
  },
  {
    id: 'tamer_phil_fg',
    name: 'Tamer Phil',
    sprite: 'rocker.png',
    dialogue: { intro: "La frusta schiocca!", defeat: "Ahi!", after: "I miei Pokemon sono selvaggi." },
    party: [
      { pokemonId: 28, level: 33, moves: ['slash', 'sand_attack'] },
      { pokemonId: 24, level: 33, moves: ['bite', 'glare'] }
    ],
    rewardMoney: 1320
  },
  {
    id: 'tamer_edgar_fg',
    name: 'Tamer Edgar',
    sprite: 'rocker.png',
    dialogue: { intro: "I miei Pokemon sono velenosi!", defeat: "Antidoto!", after: "Koga è il maestro del veleno." },
    party: [
      { pokemonId: 24, level: 34, moves: ['acid', 'glare'] },
      { pokemonId: 28, level: 34, moves: ['poison_sting', 'slash'] }
    ],
    rewardMoney: 1360
  },
  {
    id: 'juggler_shawn_fg',
    name: 'Juggler Shawn',
    sprite: 'juggler.png',
    dialogue: { intro: "Abra Kadabra!", defeat: "La magia è finita!", after: "Sei un mago della lotta." },
    party: [
      { pokemonId: 96, level: 31, moves: ['hypnosis'] },
      { pokemonId: 96, level: 31, moves: ['hypnosis'] },
      { pokemonId: 64, level: 31, moves: ['psybeam'] },
      { pokemonId: 97, level: 31, moves: ['psychic'] }
    ],
    rewardMoney: 1085
  },
  {
    id: 'leader_koga',
    name: 'Koga',
    sprite: 'koga.png',
    dialogue: { intro: "Fwahahaha! Un bambino come te osa sfidarmi? Ti mostrerò il terrore del veleno!", defeat: "Humph! Hai dimostrato il tuo valore.", after: "Ecco la Medaglia Anima." },
    party: [
      { pokemonId: 109, level: 37, moves: ['tackle', 'smog', 'sludge'] },
      { pokemonId: 89, level: 39, moves: ['minimize', 'sludge', 'acid_armor'] },
      { pokemonId: 109, level: 37, moves: ['tackle', 'smog', 'self_destruct'] },
      { pokemonId: 110, level: 43, moves: ['tackle', 'sludge', 'toxic', 'explosion'] }
    ],
    rewardMoney: 4257
  },
  // --- SILPH CO. GAUNTLET (15+ Allenatori) ---
  // Piano 2
  {
    id: 'rocket_grunt_silph_2f_1',
    name: 'Team Rocket Grunt',
    sprite: 'rocket.png',
    dialogue: { intro: "La Silph Co. è nostra!", defeat: "Non è possibile!", after: "Il capo è all'ultimo piano." },
    party: [
      { pokemonId: 118, level: 25, moves: ['peck'] },
      { pokemonId: 41, level: 25, moves: ['supersonic'] },
      { pokemonId: 41, level: 25, moves: ['supersonic'] },
      { pokemonId: 20, level: 25, moves: ['hyper_fang'] },
      { pokemonId: 42, level: 25, moves: ['wing_attack'] }
    ],
    rewardMoney: 750
  },
  {
    id: 'scientist_connor_silph_2f',
    name: 'Scientist Connor',
    sprite: 'scientist.png',
    dialogue: { intro: "Il Team Rocket mi paga bene!", defeat: "I miei occhiali!", after: "Stiamo sviluppando la Master Ball." },
    party: [
      { pokemonId: 88, level: 26, moves: ['sludge'] },
      { pokemonId: 110, level: 26, moves: ['smog'] },
      { pokemonId: 89, level: 26, moves: ['minimize'] }
    ],
    rewardMoney: 1300
  },
  // Piano 3
  {
    id: 'rocket_grunt_silph_3f_1',
    name: 'Team Rocket Grunt',
    sprite: 'rocket.png',
    dialogue: { intro: "Intruso! Intruso!", defeat: "Devo avvisare gli altri!", after: "Non passerai." },
    party: [
      { pokemonId: 20, level: 28, moves: ['hyper_fang'] },
      { pokemonId: 20, level: 28, moves: ['hyper_fang'] },
      { pokemonId: 42, level: 28, moves: ['wing_attack'] }
    ],
    rewardMoney: 840
  },
  // Piano 4
  {
    id: 'rocket_grunt_silph_4f_1',
    name: 'Team Rocket Grunt',
    sprite: 'rocket.png',
    dialogue: { intro: "Sei arrivato fin qui? Impressionante.", defeat: "Non abbastanza!", after: "Gary è già passato di qui." },
    party: [
      { pokemonId: 66, level: 29, moves: ['karate_chop'] },
      { pokemonId: 96, level: 29, moves: ['confusion'] }
    ],
    rewardMoney: 870
  },
  // Piano 5
  {
    id: 'juggler_dalton_silph_5f',
    name: 'Juggler Dalton',
    sprite: 'juggler.png',
    dialogue: { intro: "Guarda le mie sfere!", defeat: "Ho perso la concentrazione!", after: "I teletrasporti sono divertenti." },
    party: [
      { pokemonId: 64, level: 29, moves: ['psybeam'] },
      { pokemonId: 97, level: 29, moves: ['hypnosis'] }
    ],
    rewardMoney: 1015
  },
  {
    id: 'rocket_grunt_silph_5f_1',
    name: 'Team Rocket Grunt',
    sprite: 'rocket.png',
    dialogue: { intro: "La Card Key è mia!", defeat: "L'ho lasciata cadere!", after: "Non la troverai." },
    party: [
      { pokemonId: 97, level: 33, moves: ['psychic'] }
    ],
    rewardMoney: 990
  },
  // Piano 6
  {
    id: 'rocket_grunt_silph_6f_1',
    name: 'Team Rocket Grunt',
    sprite: 'rocket.png',
    dialogue: { intro: "Il capo si fida di me!", defeat: "Ho deluso il capo!", after: "Non ti perdonerà." },
    party: [
      { pokemonId: 67, level: 29, moves: ['submission'] },
      { pokemonId: 66, level: 29, moves: ['low_kick'] }
    ],
    rewardMoney: 870
  },
  // Piano 7
  {
    id: 'rival_6_silph',
    name: 'Gary',
    sprite: 'rival_1.png',
    dialogue: { intro: "Che ci fai qui? Non dirmi che vuoi salvare la Silph Co.! Lascia fare a me!", defeat: "Argh! Come hai fatto?!", after: "Vado alla Lega Pokemon. Lì vedremo chi è il migliore." },
    party: [
      { pokemonId: 18, level: 37, moves: ['wing_attack', 'quick_attack', 'sand_attack'] },
      { pokemonId: 58, level: 38, moves: ['bite', 'roar', 'ember', 'take_down'] },
      { pokemonId: 102, level: 35, moves: ['barrage', 'stun_spore'] },
      { pokemonId: 65, level: 35, moves: ['psybeam', 'recover', 'disable'] },
      { pokemonId: 9, level: 40, moves: ['water_gun', 'bite', 'withdraw', 'skull_bash'] }
    ],
    rewardMoney: 2600
  },
  // Piano 8
  {
    id: 'rocket_grunt_silph_8f_1',
    name: 'Team Rocket Grunt',
    sprite: 'rocket.png',
    dialogue: { intro: "Questo piano è sotto il mio controllo!", defeat: "Controllo perso!", after: "Il capo è vicino." },
    party: [
      { pokemonId: 20, level: 26, moves: ['hyper_fang'] },
      { pokemonId: 42, level: 26, moves: ['wing_attack'] },
      { pokemonId: 24, level: 26, moves: ['acid'] }
    ],
    rewardMoney: 780
  },
  // Piano 9
  {
    id: 'rocket_grunt_silph_9f_1',
    name: 'Team Rocket Grunt',
    sprite: 'rocket.png',
    dialogue: { intro: "Ho visto un fantasma!", defeat: "Era solo un Gastly...", after: "Odio questo posto." },
    party: [
      { pokemonId: 100, level: 28, moves: ['sonic_boom'] },
      { pokemonId: 41, level: 28, moves: ['bite'] },
      { pokemonId: 101, level: 28, moves: ['self_destruct'] }
    ],
    rewardMoney: 840
  },
  // Piano 10
  {
    id: 'scientist_josef_silph_10f',
    name: 'Scientist Josef',
    sprite: 'scientist.png',
    dialogue: { intro: "I miei esperimenti non devono essere interrotti!", defeat: "Formula sbagliata!", after: "Porygon è quasi completo." },
    party: [
      { pokemonId: 82, level: 29, moves: ['thunder_wave'] },
      { pokemonId: 110, level: 29, moves: ['sludge'] }
    ],
    rewardMoney: 1450
  },
  // Piano 11 (Boss Floor)
  {
    id: 'rocket_grunt_silph_11f_1',
    name: 'Team Rocket Grunt',
    sprite: 'rocket.png',
    dialogue: { intro: "Sei l'ultimo ostacolo prima del capo!", defeat: "Sei troppo forte!", after: "Il capo ti aspetta." },
    party: [
      { pokemonId: 96, level: 33, moves: ['hypnosis'] }
    ],
    rewardMoney: 990
  },
  {
    id: 'boss_giovanni_2',
    name: 'Giovanni',
    sprite: 'giovanni.png',
    dialogue: { intro: "Ancora tu?! Ti intrometti sempre nei miei affari! La Master Ball sarà mia!", defeat: "Maledizione! I miei piani rovinati!", after: "Il Team Rocket si ritira... per ora." },
    party: [
      { pokemonId: 33, level: 37, moves: ['horn_attack', 'fury_attack', 'horn_drill'] },
      { pokemonId: 115, level: 35, moves: ['comet_punch', 'rage', 'bite'] },
      { pokemonId: 111, level: 37, moves: ['stomp', 'tail_whip'] },
      { pokemonId: 31, level: 41, moves: ['scratch', 'poison_sting', 'body_slam'] }
    ],
    rewardMoney: 4059
  },

  // --- SAFFRON GYM GAUNTLET ---
  {
    id: 'psychic_johan_sg',
    name: 'Psychic Johan',
    sprite: 'psychic.png',
    dialogue: { intro: "Il potere della mente è infinito!", defeat: "La mia mente è vuota...", after: "Sabrina è imbattibile." },
    party: [
      { pokemonId: 64, level: 33, moves: ['psybeam', 'recover'] },
      { pokemonId: 79, level: 33, moves: ['confusion', 'headbutt'] },
      { pokemonId: 122, level: 33, moves: ['confusion', 'barrier'] }
    ],
    rewardMoney: 660
  },
  {
    id: 'channeler_tasha_sg',
    name: 'Channeler Tasha',
    sprite: 'channeler.png',
    dialogue: { intro: "Vedo il tuo futuro... è oscuro!", defeat: "Non l'avevo previsto!", after: "I poteri psichici sono spaventosi." },
    party: [
      { pokemonId: 92, level: 34, moves: ['lick', 'confuse_ray'] },
      { pokemonId: 93, level: 34, moves: ['lick', 'hypnosis'] }
    ],
    rewardMoney: 1020
  },
  {
    id: 'psychic_tyron_sg',
    name: 'Psychic Tyron',
    sprite: 'psychic.png',
    dialogue: { intro: "Posso leggere i tuoi pensieri!", defeat: "Silenzio!", after: "Sei mentalmente forte." },
    party: [
      { pokemonId: 122, level: 34, moves: ['light_screen', 'double_slap'] },
      { pokemonId: 64, level: 34, moves: ['psybeam', 'recover'] }
    ],
    rewardMoney: 680
  },
  {
    id: 'psychic_preston_sg',
    name: 'Psychic Preston',
    sprite: 'psychic.png',
    dialogue: { intro: "La telecinesi è la mia specialità!", defeat: "Ho perso il controllo!", after: "Sabrina ti aspetta." },
    party: [
      { pokemonId: 80, level: 38, moves: ['water_gun', 'withdraw', 'amnesia'] }
    ],
    rewardMoney: 760
  },
  {
    id: 'leader_sabrina',
    name: 'Sabrina',
    sprite: 'sabrina.png',
    dialogue: { intro: "Ho avuto una visione del tuo arrivo. Ho visto anche la tua sconfitta!", defeat: "La mia visione... era sbagliata?", after: "Meriti la Medaglia Palude." },
    party: [
      { pokemonId: 64, level: 38, moves: ['psybeam', 'recover', 'disable', 'psychic'] },
      { pokemonId: 122, level: 37, moves: ['confusion', 'barrier', 'light_screen'] },
      { pokemonId: 49, level: 38, moves: ['poison_powder', 'leech_life', 'psybeam'] },
      { pokemonId: 65, level: 43, moves: ['psychic', 'recover', 'psywave', 'reflect'] }
    ],
    rewardMoney: 4257
  }
];