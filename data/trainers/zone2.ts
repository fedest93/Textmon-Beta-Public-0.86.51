import { TrainerData } from '../../types';

export const zone2Trainers: TrainerData[] = [
  // --- ROUTE 6 (South of Vermilion) ---
  {
    id: 'bug_catcher_ricky_r6',
    name: 'Bug Catcher Ricky',
    sprite: 'bug_catcher.png',
    dialogue: { intro: "I miei insetti sono i migliori!", defeat: "Oh no!", after: "Devo allenarmi di più." },
    party: [
      { pokemonId: 13, level: 16, moves: ['poison_sting'] },
      { pokemonId: 11, level: 16, moves: ['harden'] }
    ],
    rewardMoney: 160
  },
  {
    id: 'picnicker_nancy_r6',
    name: 'Picnicker Nancy',
    sprite: 'lass.png',
    dialogue: { intro: "Che bella giornata per un picnic!", defeat: "Hai rovinato tutto!", after: "Vado a casa." },
    party: [
      { pokemonId: 19, level: 16, moves: ['quick_attack'] },
      { pokemonId: 25, level: 16, moves: ['thunder_shock'] }
    ],
    rewardMoney: 320
  },
  {
    id: 'camper_jeff_r6',
    name: 'Camper Jeff',
    sprite: 'camper.png',
    dialogue: { intro: "Esplorare è la mia passione!", defeat: "Mi sono perso...", after: "Dov'è Aranciopoli?" },
    party: [
      { pokemonId: 21, level: 16, moves: ['peck'] },
      { pokemonId: 20, level: 16, moves: ['hyper_fang'] }
    ],
    rewardMoney: 320
  },

  // --- S.S. ANNE GAUNTLET (TUTTI GLI ALLENATORI) ---
  // Main Deck
  {
    id: 'rival_4_ssanne',
    name: 'Gary',
    sprite: 'rival_1.png',
    dialogue: { intro: "Bonjour! Vediamo se sei migliorato!", defeat: "Umpf! Almeno stai allenando i tuoi Pokemon.", after: "Il Capitano ha una tecnica segreta, il Taglio." },
    party: [
      { pokemonId: 17, level: 19, moves: ['gust', 'sand_attack', 'quick_attack'] },
      { pokemonId: 20, level: 16, moves: ['hyper_fang', 'quick_attack'] },
      { pokemonId: 64, level: 18, moves: ['confusion', 'disable'] },
      { pokemonId: 8, level: 20, moves: ['water_gun', 'bite', 'withdraw'] }
    ],
    rewardMoney: 1300
  },
  {
    id: 'sailor_huey_ssa',
    name: 'Sailor Huey',
    sprite: 'sailor.png',
    dialogue: { intro: "Lavoro sodo ogni giorno!", defeat: "Ho bisogno di una pausa.", after: "La vita da marinaio è dura." },
    party: [
      { pokemonId: 66, level: 17, moves: ['karate_chop'] },
      { pokemonId: 90, level: 17, moves: ['withdraw'] }
    ],
    rewardMoney: 510
  },
  {
    id: 'sailor_dylan_ssa',
    name: 'Sailor Dylan',
    sprite: 'sailor.png',
    dialogue: { intro: "Il mare è la mia vita!", defeat: "Ho il mal di mare...", after: "Il Capitano si sente male." },
    party: [
      { pokemonId: 116, level: 17, moves: ['bubble', 'smokescreen'] },
      { pokemonId: 90, level: 17, moves: ['tackle', 'withdraw'] }
    ],
    rewardMoney: 510
  },
  {
    id: 'sailor_leonard_ssa',
    name: 'Sailor Leonard',
    sprite: 'sailor.png',
    dialogue: { intro: "Ho visto tutti i mari del mondo!", defeat: "Sono affondato!", after: "Kanto è la migliore." },
    party: [
      { pokemonId: 90, level: 21, moves: ['clamp', 'supersonic'] }
    ],
    rewardMoney: 630
  },
  // Cabins
  {
    id: 'fisherman_barny_ssa',
    name: 'Fisherman Barny',
    sprite: 'fisherman.png',
    dialogue: { intro: "Ho pescato questi dalla nave!", defeat: "Hanno abboccato...", after: "I Magikarp sono ovunque." },
    party: [
      { pokemonId: 72, level: 17, moves: ['acid'] },
      { pokemonId: 90, level: 17, moves: ['withdraw'] },
      { pokemonId: 72, level: 17, moves: ['acid'] }
    ],
    rewardMoney: 595
  },
  {
    id: 'gentleman_arthur_ssa',
    name: 'Gentleman Arthur',
    sprite: 'gentleman.png',
    dialogue: { intro: "Una sfida tra gentiluomini?", defeat: "Ben giocata!", after: "Questa crociera è squisita." },
    party: [
      { pokemonId: 32, level: 18, moves: ['horn_attack'] },
      { pokemonId: 29, level: 18, moves: ['scratch'] }
    ],
    rewardMoney: 1260
  },
  {
    id: 'gentleman_thomas_ssa',
    name: 'Gentleman Thomas',
    sprite: 'gentleman.png',
    dialogue: { intro: "I miei Pokemon sono di prima classe!", defeat: "Oh, cielo!", after: "Devo lucidarli." },
    party: [
      { pokemonId: 58, level: 18, moves: ['ember'] },
      { pokemonId: 58, level: 18, moves: ['ember'] }
    ],
    rewardMoney: 1260
  },
  {
    id: 'lass_dawn_ssa',
    name: 'Lass Dawn',
    sprite: 'lass.png',
    dialogue: { intro: "Sei carino! Lottiamo?", defeat: "Sei anche forte!", after: "Ci vediamo?" },
    party: [
      { pokemonId: 19, level: 18, moves: ['quick_attack'] },
      { pokemonId: 16, level: 18, moves: ['gust'] }
    ],
    rewardMoney: 270
  },
  {
    id: 'youngster_tyler_ssa',
    name: 'Youngster Tyler',
    sprite: 'youngster.png',
    dialogue: { intro: "Il mio Nidoran è il migliore!", defeat: "Nooo!", after: "Si evolverà presto." },
    party: [
      { pokemonId: 32, level: 21, moves: ['horn_attack', 'leer'] }
    ],
    rewardMoney: 315
  },
  // Kitchen
  {
    id: 'chef_lyman_ssa',
    name: 'Chef Lyman',
    sprite: 'rocker.png', // Placeholder for Chef sprite
    dialogue: { intro: "Fuori dalla mia cucina!", defeat: "Si brucia tutto!", after: "Ho fame." },
    party: [
      { pokemonId: 100, level: 20, moves: ['tackle'] },
      { pokemonId: 81, level: 20, moves: ['tackle'] }
    ],
    rewardMoney: 800
  },
  {
    id: 'sailor_trevor_ssa',
    name: 'Sailor Trevor',
    sprite: 'sailor.png',
    dialogue: { intro: "Machop mi aiuta a sollevare le casse!", defeat: "Ho bisogno di aiuto!", after: "Forza!" },
    party: [
      { pokemonId: 66, level: 18, moves: ['karate_chop'] },
      { pokemonId: 66, level: 18, moves: ['karate_chop'] }
    ],
    rewardMoney: 540
  },
  // Lower Deck
  {
    id: 'sailor_edmond_ssa',
    name: 'Sailor Edmond',
    sprite: 'sailor.png',
    dialogue: { intro: "Qui sotto si lavora sodo!", defeat: "Turno finito.", after: "Vado a riposare." },
    party: [
      { pokemonId: 66, level: 17, moves: ['low_kick'] },
      { pokemonId: 90, level: 17, moves: ['withdraw'] }
    ],
    rewardMoney: 510
  },
  {
    id: 'engineer_bailey_ssa',
    name: 'Engineer Bailey',
    sprite: 'super_nerd.png',
    dialogue: { intro: "Non toccare i motori!", defeat: "Cortocircuito!", after: "Questa nave è un capolavoro." },
    party: [
      { pokemonId: 100, level: 21, moves: ['sonic_boom'] },
      { pokemonId: 81, level: 21, moves: ['thunder_shock'] }
    ],
    rewardMoney: 1008
  },

  // --- VERMILION GYM ---
  {
    id: 'sailor_dwayne_vg',
    name: 'Sailor Dwayne',
    sprite: 'sailor.png',
    dialogue: { intro: "Preparati a una scossa!", defeat: "Sono a terra!", after: "Lt. Surge è un vero duro." },
    party: [
      { pokemonId: 25, level: 21, moves: ['thunder_shock'] },
      { pokemonId: 25, level: 21, moves: ['thunder_shock'] }
    ],
    rewardMoney: 630
  },
  {
    id: 'rocker_tucker_vg',
    name: 'Rocker Tucker',
    sprite: 'rocker.png',
    dialogue: { intro: "Sono elettrizzato! E tu?", defeat: "Cortocircuito!", after: "Lt. Surge è un eroe americano!" },
    party: [
      { pokemonId: 100, level: 20, moves: ['sonic_boom', 'screech'] },
      { pokemonId: 100, level: 20, moves: ['sonic_boom', 'tackle'] }
    ],
    rewardMoney: 500
  },
  {
    id: 'gentleman_gregory_vg',
    name: 'Gentleman Gregory',
    sprite: 'gentleman.png',
    dialogue: { intro: "Una lotta elettrizzante, non trovi?", defeat: "Scioccante!", after: "Devo trovare il secondo interruttore." },
    party: [
      { pokemonId: 25, level: 23, moves: ['thunder_wave', 'quick_attack'] }
    ],
    rewardMoney: 1610
  },
  {
    id: 'leader_surge',
    name: 'Lt. Surge',
    sprite: 'surge.png',
    dialogue: { intro: "Ehi, soldato! I Pokemon elettrici mi hanno salvato in guerra! Ti fulmineranno!", defeat: "Argh! La mia strategia è saltata!", after: "Prendi la Medaglia Tuono." },
    party: [
      { pokemonId: 100, level: 21, moves: ['sonic_boom', 'screech'] },
      { pokemonId: 25, level: 18, moves: ['thunder_shock', 'thunder_wave', 'quick_attack'] },
      { pokemonId: 26, level: 24, moves: ['thunderbolt', 'thunder_wave', 'growl'] }
    ],
    rewardMoney: 2376
  },
  // --- ROCK TUNNEL GAUNTLET (8 Allenatori) ---
  {
    id: 'pokemaniac_ashton_rt',
    name: 'Pokemaniac Ashton',
    sprite: 'pokemaniac.png',
    dialogue: { intro: "I Pokemon rari sono la mia passione!", defeat: "Il mio Cubone!", after: "Cubone è così solitario..." },
    party: [
      { pokemonId: 104, level: 23, moves: ['bone_club', 'headbutt'] },
      { pokemonId: 79, level: 23, moves: ['confusion', 'disable'] }
    ],
    rewardMoney: 1150
  },
  {
    id: 'pokemaniac_winston_rt',
    name: 'Pokemaniac Winston',
    sprite: 'pokemaniac.png',
    dialogue: { intro: "Slowpoke è il migliore!", defeat: "Oh no...", after: "Si evolverà presto." },
    party: [
      { pokemonId: 79, level: 25, moves: ['confusion', 'water_gun'] }
    ],
    rewardMoney: 1250
  },
  {
    id: 'hiker_allen_rt',
    name: 'Hiker Allen',
    sprite: 'hiker.png',
    dialogue: { intro: "Non sottovalutare i montanari!", defeat: "Ho inciampato!", after: "Attento agli Onix." },
    party: [
      { pokemonId: 74, level: 25, moves: ['rock_throw', 'defense_curl'] }
    ],
    rewardMoney: 875
  },
  {
    id: 'hiker_eric_rt',
    name: 'Hiker Eric',
    sprite: 'hiker.png',
    dialogue: { intro: "Hahaha! Ti farò a pezzi con le mie rocce!", defeat: "Duro come la roccia...", after: "Siamo quasi all'uscita." },
    party: [
      { pokemonId: 66, level: 20, moves: ['karate_chop'] },
      { pokemonId: 74, level: 20, moves: ['rock_throw'] }
    ],
    rewardMoney: 700
  },
  {
    id: 'hiker_lenny_rt',
    name: 'Hiker Lenny',
    sprite: 'hiker.png',
    dialogue: { intro: "Machop! Forza!", defeat: "Debole...", after: "Devo allenarmi." },
    party: [
      { pokemonId: 66, level: 19, moves: ['low_kick'] },
      { pokemonId: 66, level: 19, moves: ['low_kick'] }
    ],
    rewardMoney: 665
  },
  {
    id: 'jr_trainer_f_dana_rt',
    name: 'Jr. Trainer Dana',
    sprite: 'lass.png',
    dialogue: { intro: "Il tunnel è buio e spaventoso!", defeat: "Voglio andare a casa!", after: "Hai un Pokemon con Flash?" },
    party: [
      { pokemonId: 39, level: 22, moves: ['pound', 'sing'] },
      { pokemonId: 43, level: 22, moves: ['absorb'] }
    ],
    rewardMoney: 440
  },
  {
    id: 'jr_trainer_f_sofia_rt',
    name: 'Jr. Trainer Sofia',
    sprite: 'lass.png',
    dialogue: { intro: "Pikachu è così carino!", defeat: "Pika-nooo!", after: "Devo curarlo." },
    party: [
      { pokemonId: 25, level: 21, moves: ['thunder_shock'] },
      { pokemonId: 35, level: 21, moves: ['pound'] }
    ],
    rewardMoney: 420
  },
  {
    id: 'hiker_oliver_rt',
    name: 'Hiker Oliver',
    sprite: 'hiker.png',
    dialogue: { intro: "Onix! Distruggi!", defeat: "Impossibile!", after: "Il mio Onix..." },
    party: [
      { pokemonId: 95, level: 20, moves: ['tackle', 'screech'] },
      { pokemonId: 75, level: 20, moves: ['rock_throw'] }
    ],
    rewardMoney: 700
  },

  // --- POKEMON TOWER GAUNTLET (5 Allenatori + Rivale) ---
  {
    id: 'channeler_patricia',
    name: 'Channeler Patricia',
    sprite: 'channeler.png',
    dialogue: { intro: "Vattene... Spiriti maligni...", defeat: "Uuuh...", after: "Ero posseduta." },
    party: [ { pokemonId: 92, level: 22, moves: ['lick', 'confuse_ray'] } ],
    rewardMoney: 660
  },
  {
    id: 'channeler_carly',
    name: 'Channeler Carly',
    sprite: 'channeler.png',
    dialogue: { intro: "Zombiii! Zombiii!", defeat: "Cosa?!", after: "Ho ripreso i sensi." },
    party: [ { pokemonId: 92, level: 24, moves: ['lick', 'confuse_ray', 'night_shade'] } ],
    rewardMoney: 720
  },
  {
    id: 'channeler_laurel',
    name: 'Channeler Laurel',
    sprite: 'channeler.png',
    dialogue: { intro: "Kekeke...", defeat: "Lo spirito se n'è andato.", after: "Non ricordo nulla." },
    party: [ { pokemonId: 92, level: 23, moves: ['lick'] }, { pokemonId: 92, level: 23, moves: ['lick'] } ],
    rewardMoney: 690
  },
  {
    id: 'rival_5_tower',
    name: 'Gary',
    sprite: 'rival_1.png',
    dialogue: { intro: "Ehi! Che ci fai qui? I tuoi Pokemon non sono mica morti!", defeat: "Che sfortuna!", after: "Ho catturato un Cubone, ma non trovo Marowak." },
    party: [
      { pokemonId: 17, level: 25, moves: ['gust', 'sand_attack', 'quick_attack', 'whirlwind'] },
      { pokemonId: 58, level: 23, moves: ['bite', 'roar', 'ember'] },
      { pokemonId: 102, level: 22, moves: ['barrage', 'hypnosis'] },
      { pokemonId: 64, level: 20, moves: ['confusion', 'disable', 'psybeam'] },
      { pokemonId: 8, level: 25, moves: ['water_gun', 'bite', 'bubble_beam'] }
    ],
    rewardMoney: 1625
  },
  {
    id: 'rocket_grunt_tower_1',
    name: 'Team Rocket Grunt',
    sprite: 'rocket.png',
    dialogue: { intro: "Vogliamo rubare le ossa di Cubone!", defeat: "Maledizione!", after: "Mr. Fuji ci ostacola." },
    party: [
      { pokemonId: 41, level: 25, moves: ['supersonic', 'bite'] },
      { pokemonId: 41, level: 25, moves: ['supersonic', 'bite'] },
      { pokemonId: 42, level: 25, moves: ['wing_attack', 'confuse_ray'] }
    ],
    rewardMoney: 750
  },
  {
    id: 'rocket_grunt_tower_2',
    name: 'Team Rocket Grunt',
    sprite: 'rocket.png',
    dialogue: { intro: "Mr. Fuji è nostro ostaggio!", defeat: "Non ti avvicinerai!", after: "Il capo sarà furioso." },
    party: [
      { pokemonId: 96, level: 26, moves: ['hypnosis', 'confusion'] }
    ],
    rewardMoney: 780
  },
  {
    id: 'rocket_grunt_tower_3',
    name: 'Team Rocket Grunt',
    sprite: 'rocket.png',
    dialogue: { intro: "Sei l'ultimo ostacolo!", defeat: "Impossibile!", after: "Abbiamo fallito." },
    party: [
      { pokemonId: 109, level: 23, moves: ['smog'] },
      { pokemonId: 96, level: 23, moves: ['confusion'] },
      { pokemonId: 42, level: 23, moves: ['bite'] }
    ],
    rewardMoney: 690
  },

  // --- ROCKET HIDEOUT GAUNTLET (8 Allenatori + Giovanni) ---
  {
    id: 'rocket_grunt_hideout_1',
    name: 'Team Rocket Grunt',
    sprite: 'rocket.png',
    dialogue: { intro: "Come sei entrato qui?!", defeat: "Allarme!", after: "Il capo Giovanni ti sistemerà." },
    party: [
      { pokemonId: 20, level: 21, moves: ['hyper_fang', 'tail_whip'] },
      { pokemonId: 41, level: 21, moves: ['supersonic', 'bite'] }
    ],
    rewardMoney: 630
  },
  {
    id: 'rocket_grunt_hideout_2',
    name: 'Team Rocket Grunt',
    sprite: 'rocket.png',
    dialogue: { intro: "La chiave dell'ascensore è mia!", defeat: "L'ho persa...", after: "Non la troverai mai." },
    party: [
      { pokemonId: 109, level: 21, moves: ['tackle', 'smog'] },
      { pokemonId: 109, level: 21, moves: ['tackle', 'smog'] }
    ],
    rewardMoney: 630
  },
  {
    id: 'rocket_grunt_hideout_3',
    name: 'Team Rocket Grunt',
    sprite: 'rocket.png',
    dialogue: { intro: "Ti piacciono i pannelli rotanti?", defeat: "Mi gira la testa!", after: "Il capo è al piano di sotto." },
    party: [
      { pokemonId: 88, level: 22, moves: ['pound', 'disable'] },
      { pokemonId: 109, level: 22, moves: ['tackle', 'smog'] }
    ],
    rewardMoney: 660
  },
  {
    id: 'rocket_grunt_hideout_4',
    name: 'Team Rocket Grunt',
    sprite: 'rocket.png',
    dialogue: { intro: "Il capo Giovanni è un genio!", defeat: "Ho fallito il capo!", after: "Lunga vita al Team Rocket!" },
    party: [
      { pokemonId: 27, level: 23, moves: ['scratch', 'slash'] },
      { pokemonId: 28, level: 23, moves: ['slash', 'poison_sting'] }
    ],
    rewardMoney: 690
  },
  {
    id: 'rocket_grunt_hideout_5',
    name: 'Team Rocket Grunt',
    sprite: 'rocket.png',
    dialogue: { intro: "Proteggo l'ascensore!", defeat: "Non puoi passare!", after: "Serve la chiave." },
    party: [
      { pokemonId: 19, level: 20, moves: ['quick_attack'] },
      { pokemonId: 20, level: 20, moves: ['hyper_fang'] },
      { pokemonId: 19, level: 20, moves: ['quick_attack'] }
    ],
    rewardMoney: 600
  },
  {
    id: 'rocket_grunt_hideout_6',
    name: 'Team Rocket Grunt',
    sprite: 'rocket.png',
    dialogue: { intro: "Il capo è impegnato!", defeat: "Non disturbare!", after: "Vattene!" },
    party: [
      { pokemonId: 66, level: 22, moves: ['karate_chop'] },
      { pokemonId: 66, level: 22, moves: ['karate_chop'] }
    ],
    rewardMoney: 660
  },
  {
    id: 'rocket_grunt_hideout_7',
    name: 'Team Rocket Grunt',
    sprite: 'rocket.png',
    dialogue: { intro: "Sei l'ultimo ostacolo prima del capo!", defeat: "Sei troppo forte!", after: "Il capo ti aspetta." },
    party: [
      { pokemonId: 111, level: 25, moves: ['horn_attack'] },
      { pokemonId: 96, level: 25, moves: ['confusion'] }
    ],
    rewardMoney: 750
  },
  {
    id: 'boss_giovanni_1',
    name: 'Giovanni',
    sprite: 'giovanni.png',
    dialogue: { intro: "Vedo che hai sconfitto i miei uomini. Ma io sono di un altro livello.", defeat: "Cosa?! Battuto da un ragazzino?!", after: "Questa non è la fine. Il Team Rocket risorgerà!" },
    party: [
      { pokemonId: 95, level: 25, moves: ['rock_throw', 'rage', 'slam'] },
      { pokemonId: 111, level: 24, moves: ['horn_attack', 'stomp'] },
      { pokemonId: 115, level: 29, moves: ['bite', 'mega_punch', 'rage'] }
    ],
    rewardMoney: 2871
  },

  // --- CELADON GYM ---
  {
    id: 'leader_erika',
    name: 'Erika',
    sprite: 'erika.png',
    dialogue: { intro: "Ciao. Stavo facendo un pisolino... Oh, vuoi sfidarmi?", defeat: "Oh, ho perso. Sei molto forte.", after: "Ti dono la Medaglia Arcobaleno." },
    party: [
      { pokemonId: 71, level: 29, moves: ['stun_spore', 'acid', 'poison_powder', 'razor_leaf'] },
      { pokemonId: 114, level: 24, moves: ['constrict', 'bind', 'poison_powder'] },
      { pokemonId: 45, level: 29, moves: ['sleep_powder', 'mega_drain', 'petal_dance', 'poison_powder'] }
    ],
    rewardMoney: 2871
  }
];