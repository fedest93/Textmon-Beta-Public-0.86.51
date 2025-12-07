import { TrainerData } from '../../types';

export const zone4Trainers: TrainerData[] = [
  // --- SEA ROUTES GAUNTLET (19, 20, 21) ---
  {
    id: 'swimmer_richard_sr',
    name: 'Swimmer Richard',
    sprite: 'swimmer.png',
    dialogue: { intro: "Sto nuotando fino all'Isola Cannella!", defeat: "Sono stanco...", after: "L'acqua è fredda oggi." },
    party: [ { pokemonId: 72, level: 30, moves: ['acid', 'bubble_beam'] } ],
    rewardMoney: 150
  },
  {
    id: 'swimmer_reece_sr',
    name: 'Swimmer Reece',
    sprite: 'swimmer.png',
    dialogue: { intro: "Non c'è terra in vista!", defeat: "Affondato!", after: "Attento ai Tentacool." },
    party: [
      { pokemonId: 118, level: 28, moves: ['peck'] },
      { pokemonId: 90, level: 28, moves: ['clamp'] },
      { pokemonId: 120, level: 28, moves: ['water_gun'] }
    ],
    rewardMoney: 140
  },
  {
    id: 'beauty_anya_sr',
    name: 'Beauty Anya',
    sprite: 'beauty.png',
    dialogue: { intro: "Vuoi vedere i miei gioielli marini?", defeat: "I miei gioielli!", after: "Starmie è bellissimo." },
    party: [
      { pokemonId: 120, level: 30, moves: ['water_gun', 'swift'] },
      { pokemonId: 120, level: 30, moves: ['water_gun', 'swift'] }
    ],
    rewardMoney: 2100
  },
  {
    id: 'swimmer_douglas_sr',
    name: 'Swimmer Douglas',
    sprite: 'swimmer.png',
    dialogue: { intro: "Ho pescato questi Pokemon nelle profondità!", defeat: "Glu glu glu...", after: "Attento ai vortici." },
    party: [ { pokemonId: 117, level: 35, moves: ['water_gun', 'leer'] } ],
    rewardMoney: 175
  },
  {
    id: 'swimmer_david_sr',
    name: 'Swimmer David',
    sprite: 'swimmer.png',
    dialogue: { intro: "Le Isole Spuma sono gelide!", defeat: "Brrr!", after: "Si dice ci sia un Pokemon leggendario." },
    party: [
      { pokemonId: 91, level: 32, moves: ['aurora_beam'] },
      { pokemonId: 87, level: 32, moves: ['aurora_beam'] }
    ],
    rewardMoney: 160
  },
  {
    id: 'beauty_shirley_sr',
    name: 'Beauty Shirley',
    sprite: 'beauty.png',
    dialogue: { intro: "L'acqua salata rovina i capelli!", defeat: "Ho bisogno di un balsamo!", after: "Seaking è elegante." },
    party: [ { pokemonId: 119, level: 37, moves: ['waterfall'] } ],
    rewardMoney: 2590
  },
  {
    id: 'swimmer_spencer_sr',
    name: 'Swimmer Spencer',
    sprite: 'swimmer.png',
    dialogue: { intro: "Siamo quasi a Pallet Town!", defeat: "Ho i crampi!", after: "Pallet Town è tranquilla." },
    party: [
      { pokemonId: 116, level: 32, moves: ['water_gun'] },
      { pokemonId: 72, level: 32, moves: ['acid'] }
    ],
    rewardMoney: 160
  },
  {
    id: 'picnicker_irene_sr',
    name: 'Picnicker Irene',
    sprite: 'lass.png',
    dialogue: { intro: "Che bel panorama!", defeat: "Mi hai distratta!", after: "Voglio fare un picnic qui." },
    party: [
      { pokemonId: 72, level: 30, moves: ['acid'] },
      { pokemonId: 116, level: 30, moves: ['bubble'] },
      { pokemonId: 119, level: 30, moves: ['peck'] }
    ],
    rewardMoney: 600
  },
  {
    id: 'bird_keeper_roger_sr',
    name: 'Bird Keeper Roger',
    sprite: 'bird_keeper.png',
    dialogue: { intro: "I miei uccelli cacciano i pesci dall'alto!", defeat: "In picchiata!", after: "È difficile volare con questo vento." },
    party: [
      { pokemonId: 22, level: 33, moves: ['drill_peck', 'leer'] },
      { pokemonId: 85, level: 33, moves: ['drill_peck', 'fury_attack'] }
    ],
    rewardMoney: 825
  },
  {
    id: 'swimmer_roland_sr',
    name: 'Swimmer Roland',
    sprite: 'swimmer.png',
    dialogue: { intro: "Poliwrath è il re del mare!", defeat: "Il re è caduto!", after: "Devo allenarlo di più." },
    party: [ { pokemonId: 62, level: 33, moves: ['submission', 'hydro_pump'] } ],
    rewardMoney: 165
  },
  {
    id: 'beauty_grace_sr',
    name: 'Beauty Grace',
    sprite: 'beauty.png',
    dialogue: { intro: "I miei Pokemon sono i più belli!", defeat: "Oh no!", after: "Devo spazzolarli." },
    party: [
      { pokemonId: 120, level: 35, moves: ['swift'] },
      { pokemonId: 121, level: 35, moves: ['bubble_beam'] }
    ],
    rewardMoney: 2450
  },

  // --- POKEMON MANSION GAUNTLET (CINNABAR) ---
  {
    id: 'burglar_quinn_pm',
    name: 'Burglar Quinn',
    sprite: 'super_nerd.png',
    dialogue: { intro: "Cosa fai qui? Cerchi il tesoro anche tu?", defeat: "Prendi tutto quello che vuoi!", after: "C'è una chiave segreta da qualche parte." },
    party: [
      { pokemonId: 58, level: 34, moves: ['bite', 'roar', 'ember'] },
      { pokemonId: 5, level: 34, moves: ['ember', 'rage'] },
      { pokemonId: 38, level: 34, moves: ['fire_spin', 'quick_attack'] }
    ],
    rewardMoney: 3060
  },
  {
    id: 'scientist_braydon_pm',
    name: 'Scientist Braydon',
    sprite: 'scientist.png',
    dialogue: { intro: "Mewtwo... è nato qui...", defeat: "Argh! I dati!", after: "Il diario racconta tutto." },
    party: [
      { pokemonId: 82, level: 33, moves: ['sonic_boom', 'thunder_shock'] },
      { pokemonId: 101, level: 33, moves: ['swift', 'self_destruct'] }
    ],
    rewardMoney: 1650
  },
  {
    id: 'burglar_lewis_pm',
    name: 'Burglar Lewis',
    sprite: 'super_nerd.png',
    dialogue: { intro: "Non ho trovato nulla! Dammi i tuoi soldi!", defeat: "Ok, tieni i miei!", after: "Questa villa è inquietante." },
    party: [ { pokemonId: 37, level: 38, moves: ['flamethrower'] } ],
    rewardMoney: 3420
  },
  {
    id: 'scientist_ted_pm',
    name: 'Scientist Ted',
    sprite: 'scientist.png',
    dialogue: { intro: "Stavo studiando i gas vulcanici!", defeat: "Esperimento fallito!", after: "Blaine usa questi gas per i suoi Pokemon." },
    party: [
      { pokemonId: 101, level: 29, moves: ['sonic_boom'] },
      { pokemonId: 110, level: 29, moves: ['smog'] }
    ],
    rewardMoney: 1450
  },
  {
    id: 'burglar_arlon_pm',
    name: 'Burglar Arlon',
    sprite: 'super_nerd.png',
    dialogue: { intro: "Ho trovato la Chiave Segreta!", defeat: "Non è vero...", after: "Forse è al piano di sotto." },
    party: [ { pokemonId: 77, level: 40, moves: ['stomp', 'fire_spin'] } ],
    rewardMoney: 3600
  },
  {
    id: 'scientist_ivan_pm',
    name: 'Scientist Ivan',
    sprite: 'scientist.png',
    dialogue: { intro: "I miei calcoli sono perfetti!", defeat: "Errore di calcolo!", after: "Devo rivedere le formule." },
    party: [
      { pokemonId: 81, level: 34, moves: ['thunder_wave'] },
      { pokemonId: 100, level: 34, moves: ['screech'] }
    ],
    rewardMoney: 1700
  },

  // --- CINNABAR GYM GAUNTLET (QUIZ) ---
  {
    id: 'burglar_quinn_cg',
    name: 'Burglar Quinn',
    sprite: 'super_nerd.png',
    dialogue: { intro: "Risposta sbagliata! Combatti!", defeat: "Hai studiato!", after: "La prossima domanda è più difficile." },
    party: [
      { pokemonId: 58, level: 36, moves: ['ember'] },
      { pokemonId: 37, level: 36, moves: ['ember'] },
      { pokemonId: 77, level: 36, moves: ['ember'] }
    ],
    rewardMoney: 3240
  },
  {
    id: 'super_nerd_erik_cg',
    name: 'Super Nerd Erik',
    sprite: 'super_nerd.png',
    dialogue: { intro: "Ti piacciono i quiz? Sbagliato!", defeat: "Risposta errata!", after: "Blaine era un amico di Mr. Fuji." },
    party: [ { pokemonId: 38, level: 41, moves: ['fire_spin', 'quick_attack'] } ],
    rewardMoney: 1025
  },
  {
    id: 'super_nerd_avery_cg',
    name: 'Super Nerd Avery',
    sprite: 'super_nerd.png',
    dialogue: { intro: "Ho studiato la termodinamica! Sbagliato!", defeat: "La teoria era perfetta...", after: "Blaine è nell'ultima stanza." },
    party: [
      { pokemonId: 77, level: 37, moves: ['stomp', 'growl'] },
      { pokemonId: 5, level: 37, moves: ['slash', 'flamethrower'] }
    ],
    rewardMoney: 925
  },
  {
    id: 'burglar_ramon_cg',
    name: 'Burglar Ramon',
    sprite: 'super_nerd.png',
    dialogue: { intro: "Blaine è un tipo focoso! Sbagliato!", defeat: "Bruciato!", after: "Il fuoco scioglie il ghiaccio." },
    party: [ { pokemonId: 78, level: 41, moves: ['stomp', 'fire_spin'] } ],
    rewardMoney: 3690
  },
  {
    id: 'super_nerd_derek_cg',
    name: 'Super Nerd Derek',
    sprite: 'super_nerd.png',
    dialogue: { intro: "Sbagliato!", defeat: "Ho calcolato male!", after: "Blaine è un genio." },
    party: [ { pokemonId: 78, level: 41, moves: ['fire_spin'] } ],
    rewardMoney: 1025
  },
  {
    id: 'burglar_simon_cg',
    name: 'Burglar Simon',
    sprite: 'super_nerd.png',
    dialogue: { intro: "Sbagliato!", defeat: "Ho perso!", after: "Sei vicino." },
    party: [
      { pokemonId: 37, level: 37, moves: ['confuse_ray'] },
      { pokemonId: 37, level: 37, moves: ['confuse_ray'] }
    ],
    rewardMoney: 3330
  },
  {
    id: 'super_nerd_nelson_cg',
    name: 'Super Nerd Nelson',
    sprite: 'super_nerd.png',
    dialogue: { intro: "Sbagliato!", defeat: "Impossibile!", after: "Blaine ti aspetta." },
    party: [
      { pokemonId: 109, level: 37, moves: ['smog'] },
      { pokemonId: 89, level: 37, moves: ['sludge'] },
      { pokemonId: 110, level: 37, moves: ['sludge'] }
    ],
    rewardMoney: 925
  },
  {
    id: 'leader_blaine',
    name: 'Blaine',
    sprite: 'blaine.png',
    dialogue: { intro: "Hah! Sono Blaine! I miei Pokemon di fuoco inceneriranno ogni sfidante!", defeat: "Mi hai bruciato!", after: "Prendi la Medaglia Vulcano." },
    party: [
      { pokemonId: 58, level: 42, moves: ['bite', 'roar', 'take_down'] },
      { pokemonId: 77, level: 40, moves: ['tail_whip', 'stomp', 'growl'] },
      { pokemonId: 78, level: 42, moves: ['fire_spin', 'take_down', 'agility'] },
      { pokemonId: 59, level: 47, moves: ['fire_blast', 'take_down', 'leer', 'roar'] }
    ],
    rewardMoney: 4653
  },
  // --- VIRIDIAN GYM GAUNTLET (FINAL GYM) ---
  {
    id: 'cooltrainer_samuel_vg',
    name: 'Cooltrainer Samuel',
    sprite: 'cooltrainer_m.png',
    dialogue: { intro: "Sei arrivato all'ultima palestra!", defeat: "Sei forte!", after: "Il capo ti aspetta." },
    party: [
      { pokemonId: 111, level: 42, moves: ['stomp'] },
      { pokemonId: 34, level: 42, moves: ['thrash'] }
    ],
    rewardMoney: 1470
  },
  {
    id: 'tamer_cole_vg',
    name: 'Tamer Cole',
    sprite: 'rocker.png',
    dialogue: { intro: "La terra tremerà!", defeat: "Terremoto!", after: "Il Capo usa Pokemon di terra." },
    party: [
      { pokemonId: 24, level: 43, moves: ['glare', 'bite', 'acid'] }
    ],
    rewardMoney: 1720
  },
  {
    id: 'blackbelt_kiyo_vg',
    name: 'Blackbelt Kiyo',
    sprite: 'blackbelt.png',
    dialogue: { intro: "Il karate è la via!", defeat: "Non abbastanza forte!", after: "Devo allenarmi di più." },
    party: [
      { pokemonId: 68, level: 43, moves: ['submission', 'seismic_toss'] }
    ],
    rewardMoney: 1075
  },
  {
    id: 'cooltrainer_yuji_vg',
    name: 'Cooltrainer Yuji',
    sprite: 'cooltrainer_m.png',
    dialogue: { intro: "Il Capo ci ha ordinato di schiacciarti!", defeat: "Schiacciato!", after: "Il Capo non perdona." },
    party: [
      { pokemonId: 28, level: 40, moves: ['slash'] },
      { pokemonId: 91, level: 40, moves: ['clamp'] },
      { pokemonId: 101, level: 40, moves: ['swift'] },
      { pokemonId: 59, level: 40, moves: ['take_down'] }
    ],
    rewardMoney: 1400
  },
  {
    id: 'blackbelt_atsushi_vg',
    name: 'Blackbelt Atsushi',
    sprite: 'blackbelt.png',
    dialogue: { intro: "Hya!", defeat: "Oof!", after: "Sei un maestro." },
    party: [
      { pokemonId: 67, level: 38, moves: ['karate_chop'] },
      { pokemonId: 67, level: 38, moves: ['karate_chop'] }
    ],
    rewardMoney: 950
  },
  {
    id: 'tamer_jason_vg',
    name: 'Tamer Jason',
    sprite: 'rocker.png',
    dialogue: { intro: "I miei Pokemon sono selvaggi!", defeat: "Domati!", after: "Il capo è il più selvaggio." },
    party: [
      { pokemonId: 111, level: 43, moves: ['stomp', 'horn_drill'] }
    ],
    rewardMoney: 1720
  },
  {
    id: 'blackbelt_takashi_vg',
    name: 'Blackbelt Takashi',
    sprite: 'blackbelt.png',
    dialogue: { intro: "Forza e onore!", defeat: "Disonore...", after: "Il capo è l'onore." },
    party: [
      { pokemonId: 66, level: 38, moves: ['low_kick'] },
      { pokemonId: 75, level: 38, moves: ['rock_throw'] }
    ],
    rewardMoney: 950
  },
  {
    id: 'cooltrainer_yola_vg',
    name: 'Cooltrainer Yola',
    sprite: 'cooltrainer_f.png',
    dialogue: { intro: "Giovanni è il nostro leader!", defeat: "Ho fallito il leader!", after: "Non batterai mai Giovanni." },
    party: [
      { pokemonId: 111, level: 43, moves: ['stomp', 'tail_whip'] },
      { pokemonId: 31, level: 43, moves: ['body_slam', 'scratch'] }
    ],
    rewardMoney: 1505
  },
  {
    id: 'leader_giovanni_final',
    name: 'Giovanni',
    sprite: 'giovanni.png',
    dialogue: { intro: "Benvenuto nel mio nascondiglio! Sono io, il Capopalestra di Smeraldopoli!", defeat: "No! Non può essere! Il mio impero...", after: "Hai vinto. Il Team Rocket è sciolto. Prendi la Medaglia Terra." },
    party: [
      { pokemonId: 111, level: 45, moves: ['stomp', 'tail_whip', 'fissure'] },
      { pokemonId: 51, level: 42, moves: ['dig', 'sand_attack', 'slash', 'earthquake'] },
      { pokemonId: 31, level: 44, moves: ['body_slam', 'poison_sting', 'earthquake'] },
      { pokemonId: 34, level: 45, moves: ['thrash', 'horn_attack', 'earthquake'] },
      { pokemonId: 112, level: 50, moves: ['rock_slide', 'earthquake', 'horn_drill', 'fissure'] }
    ],
    rewardMoney: 4950
  },

  // --- ROUTE 22 (FINAL RIVAL BATTLE) ---
  {
    id: 'rival_7_route22',
    name: 'Gary',
    sprite: 'rival_1.png',
    dialogue: { intro: "Ehi! Stai andando alla Lega? Facciamo un po' di riscaldamento!", defeat: "Cosa?! Ho perso ancora?!", after: "Non montarti la testa. Alla Lega sarà diverso." },
    party: [
      { pokemonId: 18, level: 47, moves: ['wing_attack', 'mirror_move'] },
      { pokemonId: 111, level: 45, moves: ['stomp', 'horn_drill'] },
      { pokemonId: 58, level: 45, moves: ['flamethrower', 'take_down'] },
      { pokemonId: 102, level: 47, moves: ['solar_beam', 'poison_powder'] },
      { pokemonId: 65, level: 50, moves: ['psychic', 'recover', 'reflect'] },
      { pokemonId: 9, level: 53, moves: ['hydro_pump', 'blizzard', 'bite'] }
    ],
    rewardMoney: 3445
  },

  // --- VICTORY ROAD GAUNTLET ---
  {
    id: 'cooltrainer_naomi_vr',
    name: 'Cooltrainer Naomi',
    sprite: 'cooltrainer_f.png',
    dialogue: { intro: "Questa è l'ultima prova prima della Lega!", defeat: "Sei degno!", after: "I Superquattro sono mostruosi." },
    party: [
      { pokemonId: 53, level: 44, moves: ['slash', 'screech'] },
      { pokemonId: 38, level: 44, moves: ['fire_spin', 'confuse_ray'] },
      { pokemonId: 78, level: 44, moves: ['fire_spin', 'agility'] }
    ],
    rewardMoney: 1540
  },
  {
    id: 'cooltrainer_rolando_vr',
    name: 'Cooltrainer Rolando',
    sprite: 'cooltrainer_m.png',
    dialogue: { intro: "Vedo che hai le medaglie. Ma hai la forza?", defeat: "Hai la forza!", after: "Vai avanti." },
    party: [
      { pokemonId: 112, level: 42, moves: ['stomp', 'horn_drill'] },
      { pokemonId: 102, level: 42, moves: ['barrage', 'stun_spore'] },
      { pokemonId: 59, level: 42, moves: ['take_down'] },
      { pokemonId: 91, level: 42, moves: ['clamp'] },
      { pokemonId: 121, level: 42, moves: ['swift'] }
    ],
    rewardMoney: 1470
  },
  {
    id: 'blackbelt_daisuke_vr',
    name: 'Blackbelt Daisuke',
    sprite: 'blackbelt.png',
    dialogue: { intro: "Allenamento estremo! Spacca le rocce!", defeat: "Troppo estremo!", after: "Devo allenarmi di più." },
    party: [
      { pokemonId: 67, level: 43, moves: ['karate_chop', 'submission'] },
      { pokemonId: 68, level: 43, moves: ['submission', 'seismic_toss'] }
    ],
    rewardMoney: 1075
  },
  {
    id: 'juggler_nelson_vr',
    name: 'Juggler Nelson',
    sprite: 'juggler.png',
    dialogue: { intro: "Vedo la vittoria nelle mie sfere!", defeat: "Ho fatto cadere tutto!", after: "La Via Vittoria è dura." },
    party: [
      { pokemonId: 97, level: 41, moves: ['hypnosis', 'psychic'] },
      { pokemonId: 122, level: 41, moves: ['barrier'] }
    ],
    rewardMoney: 1435
  },
  {
    id: 'tamer_vincent_vr',
    name: 'Tamer Vincent',
    sprite: 'rocker.png',
    dialogue: { intro: "I miei Pokemon sono feroci!", defeat: "Calma, calma!", after: "Moltres vive qui vicino." },
    party: [
      { pokemonId: 53, level: 44, moves: ['slash', 'screech'] },
      { pokemonId: 55, level: 44, moves: ['confusion', 'fury_swipes'] }
    ],
    rewardMoney: 1760
  },
  {
    id: 'juggler_gregory_vr',
    name: 'Juggler Gregory',
    sprite: 'juggler.png',
    dialogue: { intro: "Abra Kadabra! Sparisci!", defeat: "Sono sparito io!", after: "La magia non funziona su di te." },
    party: [
      { pokemonId: 97, level: 48, moves: ['psychic', 'meditate'] }
    ],
    rewardMoney: 1680
  },
  {
    id: 'cooltrainer_george_vr',
    name: 'Cooltrainer George',
    sprite: 'cooltrainer_m.png',
    dialogue: { intro: "Siamo quasi alla fine! Non mollare!", defeat: "Sei incredibile!", after: "La Lega è proprio lì fuori." },
    party: [
      { pokemonId: 103, level: 45, moves: ['stomp', 'hypnosis'] },
      { pokemonId: 91, level: 45, moves: ['clamp', 'aurora_beam'] },
      { pokemonId: 59, level: 45, moves: ['fire_blast', 'take_down'] }
    ],
    rewardMoney: 1575
  },
  {
    id: 'cooltrainer_alexa_vr',
    name: 'Cooltrainer Alexa',
    sprite: 'cooltrainer_f.png',
    dialogue: { intro: "I Superquattro sono leggende. Pensi di poterli battere?", defeat: "Forse hai una possibilità.", after: "Buona fortuna." },
    party: [
      { pokemonId: 36, level: 44, moves: ['metronome', 'minimize'] },
      { pokemonId: 40, level: 44, moves: ['double_edge', 'sing'] },
      { pokemonId: 135, level: 44, moves: ['thunderbolt', 'pin_missile'] }
    ],
    rewardMoney: 1540
  },
  {
    id: 'cooltrainer_colby_vr',
    name: 'Cooltrainer Colby',
    sprite: 'cooltrainer_m.png',
    dialogue: { intro: "Sono l'ultimo guardiano della Via Vittoria!", defeat: "Sei pronto per la Lega!", after: "Vai e vinci!" },
    party: [
      { pokemonId: 149, level: 48, moves: ['slam', 'dragon_rage', 'hyper_beam'] },
      { pokemonId: 130, level: 48, moves: ['hydro_pump', 'hyper_beam'] }
    ],
    rewardMoney: 1680
  },

  // --- ELITE FOUR ---
  {
    id: 'elite_lorelei',
    name: 'Lorelei',
    sprite: 'lorelei.png',
    dialogue: { intro: "Benvenuto alla Lega. Io sono Lorelei. Nessuno può resistere al mio ghiaccio!", defeat: "Sei riuscito a sciogliere il mio ghiaccio...", after: "Vai avanti. Ma è solo l'inizio." },
    party: [
      { pokemonId: 87, level: 54, moves: ['growl', 'aurora_beam', 'rest', 'take_down'] },
      { pokemonId: 91, level: 53, moves: ['supersonic', 'clamp', 'aurora_beam', 'spike_cannon'] },
      { pokemonId: 80, level: 54, moves: ['water_gun', 'growl', 'withdraw', 'amnesia'] },
      { pokemonId: 124, level: 56, moves: ['double_slap', 'ice_punch', 'body_slam', 'thrash'] },
      { pokemonId: 131, level: 56, moves: ['body_slam', 'confuse_ray', 'blizzard', 'hydro_pump'] }
    ],
    rewardMoney: 5544
  },
  {
    id: 'elite_bruno',
    name: 'Bruno',
    sprite: 'bruno.png',
    dialogue: { intro: "Io sono Bruno! Attraverso un allenamento rigoroso, siamo diventati forti!", defeat: "Come ho potuto perdere?!", after: "Ho fatto del mio meglio. Non ho rimpianti." },
    party: [
      { pokemonId: 95, level: 53, moves: ['rock_throw', 'rage', 'slam', 'harden'] },
      { pokemonId: 107, level: 55, moves: ['ice_punch', 'thunder_punch', 'mega_punch', 'counter'] },
      { pokemonId: 106, level: 55, moves: ['jump_kick', 'focus_energy', 'high_jump_kick', 'mega_kick'] },
      { pokemonId: 95, level: 56, moves: ['rock_throw', 'rage', 'slam', 'harden'] },
      { pokemonId: 68, level: 58, moves: ['submission', 'fissure', 'leer', 'mega_kick'] }
    ],
    rewardMoney: 5742
  },
  {
    id: 'elite_agatha',
    name: 'Agatha',
    sprite: 'agatha.png',
    dialogue: { intro: "Sono Agatha. Oak è un vecchio sciocco. Ti mostrerò come combattono i veri allenatori!", defeat: "Oh, mio... Sei qualcosa di speciale, ragazzo.", after: "Sei molto simile a Oak quando era giovane." },
    party: [
      { pokemonId: 94, level: 56, moves: ['confuse_ray', 'night_shade', 'hypnosis', 'dream_eater'] },
      { pokemonId: 42, level: 56, moves: ['supersonic', 'confuse_ray', 'wing_attack', 'haze'] },
      { pokemonId: 93, level: 55, moves: ['confuse_ray', 'night_shade', 'hypnosis', 'dream_eater'] },
      { pokemonId: 24, level: 58, moves: ['bite', 'glare', 'screech', 'acid'] },
      { pokemonId: 94, level: 60, moves: ['confuse_ray', 'night_shade', 'toxic', 'dream_eater'] }
    ],
    rewardMoney: 5940
  },
  {
    id: 'elite_lance',
    name: 'Lance',
    sprite: 'lance.png',
    dialogue: { intro: "Ah! Sapevo che saresti arrivato. Io sono Lance. I draghi sono creature mitiche! Sei pronto a perdere?", defeat: "È finita! Odio ammetterlo, ma sei un maestro!", after: "Sei il nuovo Campione! ... O lo saresti, se non ci fosse qualcun altro." },
    party: [
      { pokemonId: 130, level: 58, moves: ['dragon_rage', 'leer', 'hydro_pump', 'hyper_beam'] },
      { pokemonId: 148, level: 56, moves: ['agility', 'slam', 'dragon_rage', 'hyper_beam'] },
      { pokemonId: 148, level: 56, moves: ['agility', 'slam', 'dragon_rage', 'hyper_beam'] },
      { pokemonId: 142, level: 60, moves: ['supersonic', 'bite', 'take_down', 'hyper_beam'] },
      { pokemonId: 149, level: 62, moves: ['agility', 'slam', 'barrier', 'hyper_beam'] }
    ],
    rewardMoney: 6138
  },

  // --- CHAMPION ---
  {
    id: 'champion_gary',
    name: 'Gary',
    sprite: 'rival_1.png',
    dialogue: { intro: "Ehi! Ti stavo aspettando! Sono diventato il Campione! Sono il più forte del mondo!", defeat: "NO! Non può essere! Ho perso...", after: "Nonno Oak... Ho deluso tutti..." },
    party: [
      { pokemonId: 18, level: 61, moves: ['wing_attack', 'mirror_move', 'sky_attack', 'whirlwind'] },
      { pokemonId: 65, level: 59, moves: ['psychic', 'recover', 'reflect', 'psybeam'] },
      { pokemonId: 112, level: 61, moves: ['tail_whip', 'fury_attack', 'horn_drill', 'leer'] },
      { pokemonId: 103, level: 61, moves: ['barrage', 'hypnosis', 'stomp'] },
      { pokemonId: 59, level: 63, moves: ['roar', 'ember', 'leer', 'take_down'] },
      { pokemonId: 9, level: 65, moves: ['hydro_pump', 'blizzard', 'bite', 'skull_bash'] }
    ],
    rewardMoney: 6435
  }
];
