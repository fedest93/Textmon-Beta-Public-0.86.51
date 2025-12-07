export interface Item {
  id: string;
  name: string;
  description: string;
  category: 'Pokeball' | 'Medicine' | 'Battle' | 'Key' | 'TM' | 'Misc' | 'Stone';
  price: number; // Prezzo di acquisto (vendita = prezzo / 2)
  effect?: {
    type: 'heal_hp' | 'heal_status' | 'revive' | 'capture' | 'evolve' | 'repel' | 'escape' | 'stat_boost' | 'teach' | 'key' | 'value';
    value?: number; // HP curati, rate cattura, steps repellente, prezzo vendita
    status?: string; // 'PSN', 'PAR', 'ALL'
    stat?: string; // 'attack', 'defense'
    moveId?: string; // Per le MT/MN
  };
}

export const items: Item[] = [
  // --- POKEBALLS ---
  {
    id: 'poke_ball',
    name: 'Poké Ball',
    description: 'Dispositivo per catturare Pokémon selvatici. Tasso di successo basso.',
    category: 'Pokeball',
    price: 200,
    effect: { type: 'capture', value: 1.0 }
  },
  {
    id: 'great_ball',
    name: 'Great Ball',
    description: 'Una Ball con prestazioni migliori della Poké Ball standard.',
    category: 'Pokeball',
    price: 600,
    effect: { type: 'capture', value: 1.5 }
  },
  {
    id: 'ultra_ball',
    name: 'Ultra Ball',
    description: 'Una Ball eccellente con un alto tasso di successo.',
    category: 'Pokeball',
    price: 1200,
    effect: { type: 'capture', value: 2.0 }
  },
  {
    id: 'master_ball',
    name: 'Master Ball',
    description: 'La Ball definitiva. Cattura qualsiasi Pokémon senza mai fallire.',
    category: 'Pokeball',
    price: 0,
    effect: { type: 'capture', value: 255.0 }
  },
  {
    id: 'safari_ball',
    name: 'Safari Ball',
    description: 'Una Ball speciale usata solo nella Zona Safari.',
    category: 'Pokeball',
    price: 0,
    effect: { type: 'capture', value: 1.5 }
  },

  // --- MEDICINE (HP) ---
  {
    id: 'potion',
    name: 'Potion',
    description: 'Restituisce 20 PS a un Pokémon.',
    category: 'Medicine',
    price: 300,
    effect: { type: 'heal_hp', value: 20 }
  },
  {
    id: 'super_potion',
    name: 'Super Potion',
    description: 'Restituisce 50 PS a un Pokémon.',
    category: 'Medicine',
    price: 700,
    effect: { type: 'heal_hp', value: 50 }
  },
  {
    id: 'hyper_potion',
    name: 'Hyper Potion',
    description: 'Restituisce 200 PS a un Pokémon.',
    category: 'Medicine',
    price: 1200,
    effect: { type: 'heal_hp', value: 200 }
  },
  {
    id: 'max_potion',
    name: 'Max Potion',
    description: 'Restituisce tutti i PS a un Pokémon.',
    category: 'Medicine',
    price: 2500,
    effect: { type: 'heal_hp', value: 9999 }
  },
  {
    id: 'full_restore',
    name: 'Full Restore',
    description: 'Restituisce tutti i PS e cura tutti i problemi di stato.',
    category: 'Medicine',
    price: 3000,
    effect: { type: 'heal_status', status: 'ALL', value: 9999 } // Hack: value cura anche HP
  },
  {
    id: 'fresh_water',
    name: 'Fresh Water',
    description: 'Acqua minerale. Restituisce 50 PS.',
    category: 'Medicine',
    price: 200,
    effect: { type: 'heal_hp', value: 50 }
  },
  {
    id: 'soda_pop',
    name: 'Soda Pop',
    description: 'Bibita frizzante. Restituisce 60 PS.',
    category: 'Medicine',
    price: 300,
    effect: { type: 'heal_hp', value: 60 }
  },
  {
    id: 'lemonade',
    name: 'Lemonade',
    description: 'Bibita dolce. Restituisce 80 PS.',
    category: 'Medicine',
    price: 350,
    effect: { type: 'heal_hp', value: 80 }
  },
  {
    id: 'moomoo_milk',
    name: 'MooMoo Milk',
    description: 'Latte nutriente. Restituisce 100 PS.',
    category: 'Medicine',
    price: 500,
    effect: { type: 'heal_hp', value: 100 }
  },

  // --- MEDICINE (STATUS & REVIVE) ---
  {
    id: 'antidote',
    name: 'Antidote',
    description: 'Cura un Pokémon dall\'avvelenamento.',
    category: 'Medicine',
    price: 100,
    effect: { type: 'heal_status', status: 'PSN' }
  },
  {
    id: 'burn_heal',
    name: 'Burn Heal',
    description: 'Cura un Pokémon dalle scottature.',
    category: 'Medicine',
    price: 250,
    effect: { type: 'heal_status', status: 'BRN' }
  },
  {
    id: 'ice_heal',
    name: 'Ice Heal',
    description: 'Scongela un Pokémon.',
    category: 'Medicine',
    price: 250,
    effect: { type: 'heal_status', status: 'FRZ' }
  },
  {
    id: 'awakening',
    name: 'Awakening',
    description: 'Sveglia un Pokémon addormentato.',
    category: 'Medicine',
    price: 250,
    effect: { type: 'heal_status', status: 'SLP' }
  },
  {
    id: 'paralyze_heal',
    name: 'Paralyze Heal',
    description: 'Cura un Pokémon dalla paralisi.',
    category: 'Medicine',
    price: 200,
    effect: { type: 'heal_status', status: 'PAR' }
  },
  {
    id: 'full_heal',
    name: 'Full Heal',
    description: 'Cura tutti i problemi di stato di un Pokémon.',
    category: 'Medicine',
    price: 600,
    effect: { type: 'heal_status', status: 'ALL' }
  },
  {
    id: 'revive',
    name: 'Revive',
    description: 'Revitalizza un Pokémon esausto restituendogli metà dei PS.',
    category: 'Medicine',
    price: 1500,
    effect: { type: 'revive', value: 0.5 }
  },
  {
    id: 'max_revive',
    name: 'Max Revive',
    description: 'Revitalizza un Pokémon esausto restituendogli tutti i PS.',
    category: 'Medicine',
    price: 0, // Non in vendita
    effect: { type: 'revive', value: 1.0 }
  },
  {
    id: 'ether',
    name: 'Ether',
    description: 'Restituisce 10 PP a una mossa.',
    category: 'Medicine',
    price: 0,
    effect: { type: 'heal_hp', value: 0 } // Placeholder: PP logic handled in engine
  },
  {
    id: 'max_ether',
    name: 'Max Ether',
    description: 'Restituisce tutti i PP a una mossa.',
    category: 'Medicine',
    price: 0,
    effect: { type: 'heal_hp', value: 0 }
  },
  {
    id: 'elixir',
    name: 'Elixir',
    description: 'Restituisce 10 PP a tutte le mosse.',
    category: 'Medicine',
    price: 0,
    effect: { type: 'heal_hp', value: 0 }
  },
  {
    id: 'max_elixir',
    name: 'Max Elixir',
    description: 'Restituisce tutti i PP a tutte le mosse.',
    category: 'Medicine',
    price: 0,
    effect: { type: 'heal_hp', value: 0 }
  },
  // --- EVOLUTION STONES ---
  {
    id: 'moon_stone',
    name: 'Moon Stone',
    description: 'Una pietra particolare che fa evolvere determinati Pokémon.',
    category: 'Stone',
    price: 0, // Non in vendita
    effect: { type: 'evolve' }
  },
  {
    id: 'fire_stone',
    name: 'Fire Stone',
    description: 'Una pietra particolare che fa evolvere determinati Pokémon di tipo Fuoco.',
    category: 'Stone',
    price: 2100,
    effect: { type: 'evolve' }
  },
  {
    id: 'thunder_stone',
    name: 'Thunder Stone',
    description: 'Una pietra particolare che fa evolvere determinati Pokémon di tipo Elettro.',
    category: 'Stone',
    price: 2100,
    effect: { type: 'evolve' }
  },
  {
    id: 'water_stone',
    name: 'Water Stone',
    description: 'Una pietra particolare che fa evolvere determinati Pokémon di tipo Acqua.',
    category: 'Stone',
    price: 2100,
    effect: { type: 'evolve' }
  },
  {
    id: 'leaf_stone',
    name: 'Leaf Stone',
    description: 'Una pietra particolare che fa evolvere determinati Pokémon di tipo Erba.',
    category: 'Stone',
    price: 2100,
    effect: { type: 'evolve' }
  },

  // --- BATTLE ITEMS ---
  {
    id: 'x_attack',
    name: 'X Attack',
    description: 'Aumenta l\'Attacco durante la lotta.',
    category: 'Battle',
    price: 500,
    effect: { type: 'stat_boost', stat: 'attack', value: 1 }
  },
  {
    id: 'x_defend',
    name: 'X Defend',
    description: 'Aumenta la Difesa durante la lotta.',
    category: 'Battle',
    price: 550,
    effect: { type: 'stat_boost', stat: 'defense', value: 1 }
  },
  {
    id: 'x_speed',
    name: 'X Speed',
    description: 'Aumenta la Velocità durante la lotta.',
    category: 'Battle',
    price: 350,
    effect: { type: 'stat_boost', stat: 'speed', value: 1 }
  },
  {
    id: 'x_special',
    name: 'X Special',
    description: 'Aumenta lo Speciale durante la lotta.',
    category: 'Battle',
    price: 350,
    effect: { type: 'stat_boost', stat: 'special', value: 1 }
  },
  {
    id: 'x_accuracy',
    name: 'X Accuracy',
    description: 'Aumenta la Precisione durante la lotta.',
    category: 'Battle',
    price: 950,
    effect: { type: 'stat_boost', stat: 'accuracy', value: 1 }
  },
  {
    id: 'dire_hit',
    name: 'Dire Hit',
    description: 'Aumenta la probabilità di brutti colpi durante la lotta.',
    category: 'Battle',
    price: 650,
    effect: { type: 'stat_boost', stat: 'crit', value: 1 }
  },
  {
    id: 'guard_spec',
    name: 'Guard Spec.',
    description: 'Protegge la squadra dalle riduzioni delle statistiche.',
    category: 'Battle',
    price: 700,
    effect: { type: 'stat_boost', stat: 'mist', value: 1 }
  },
  {
    id: 'poke_doll',
    name: 'Poké Doll',
    description: 'Bambola che attira l\'attenzione. Permette di fuggire da un Pokémon selvatico.',
    category: 'Battle',
    price: 1000,
    effect: { type: 'escape' }
  },

  // --- MISC / FIELD ITEMS ---
  {
    id: 'repel',
    name: 'Repel',
    description: 'Tiene lontani i Pokémon selvatici deboli per 100 passi.',
    category: 'Misc',
    price: 350,
    effect: { type: 'repel', value: 100 }
  },
  {
    id: 'super_repel',
    name: 'Super Repel',
    description: 'Tiene lontani i Pokémon selvatici deboli per 200 passi.',
    category: 'Misc',
    price: 500,
    effect: { type: 'repel', value: 200 }
  },
  {
    id: 'max_repel',
    name: 'Max Repel',
    description: 'Tiene lontani i Pokémon selvatici deboli per 250 passi.',
    category: 'Misc',
    price: 700,
    effect: { type: 'repel', value: 250 }
  },
  {
    id: 'escape_rope',
    name: 'Escape Rope',
    description: 'Fune lunga e resistente. Permette di uscire da grotte o dungeon.',
    category: 'Misc',
    price: 550,
    effect: { type: 'escape' }
  },
  {
    id: 'nugget',
    name: 'Nugget',
    description: 'Una pepita d\'oro puro. Si può vendere a caro prezzo.',
    category: 'Misc',
    price: 10000, // Vendita = 5000
    effect: { type: 'value', value: 5000 }
  },
  {
    id: 'rare_candy',
    name: 'Rare Candy',
    description: 'Caramella piena di energia. Fa salire un Pokémon al livello successivo.',
    category: 'Misc',
    price: 0, // Non in vendita
    effect: { type: 'evolve', value: 1 } // Hack: evolve type used for level up logic
  },
  {
    id: 'pp_up',
    name: 'PP Up',
    description: 'Aumenta leggermente i PP massimi di una mossa selezionata.',
    category: 'Misc',
    price: 0,
    effect: { type: 'teach' } // Placeholder logic
  },
  // --- KEY ITEMS ---
  {
    id: 'oak_parcel',
    name: 'Oak\'s Parcel',
    description: 'Un pacco indirizzato al Prof. Oak.',
    category: 'Key',
    price: 0,
    effect: { type: 'key' }
  },
  {
    id: 'town_map',
    name: 'Town Map',
    description: 'Una mappa che mostra la tua posizione nella regione di Kanto.',
    category: 'Key',
    price: 0,
    effect: { type: 'key' }
  },
  {
    id: 'bicycle',
    name: 'Bicycle',
    description: 'Una bici pieghevole per muoversi più velocemente.',
    category: 'Key',
    price: 0,
    effect: { type: 'key' }
  },
  {
    id: 'bike_voucher',
    name: 'Bike Voucher',
    description: 'Un buono per ottenere una bicicletta gratis.',
    category: 'Key',
    price: 0,
    effect: { type: 'key' }
  },
  {
    id: 'ss_ticket',
    name: 'S.S. Ticket',
    description: 'Biglietto per la M/N Anna.',
    category: 'Key',
    price: 0,
    effect: { type: 'key' }
  },
  {
    id: 'secret_key',
    name: 'Secret Key',
    description: 'Chiave per la Palestra dell\'Isola Cannella.',
    category: 'Key',
    price: 0,
    effect: { type: 'key' }
  },
  {
    id: 'card_key',
    name: 'Card Key',
    description: 'Apre le porte elettroniche della Silph Co.',
    category: 'Key',
    price: 0,
    effect: { type: 'key' }
  },
  {
    id: 'lift_key',
    name: 'Lift Key',
    description: 'Chiave per l\'ascensore del Rifugio Rocket.',
    category: 'Key',
    price: 0,
    effect: { type: 'key' }
  },
  {
    id: 'silph_scope',
    name: 'Silph Scope',
    description: 'Permette di vedere la vera natura dei fantasmi.',
    category: 'Key',
    price: 0,
    effect: { type: 'key' }
  },
  {
    id: 'poke_flute',
    name: 'Poké Flute',
    description: 'Un flauto che sveglia i Pokémon addormentati.',
    category: 'Key',
    price: 0,
    effect: { type: 'key' }
  },
  {
    id: 'gold_teeth',
    name: 'Gold Teeth',
    description: 'Dentiere d\'oro perse dal Guardiano del Safari.',
    category: 'Key',
    price: 0,
    effect: { type: 'key' }
  },
  {
    id: 'old_rod',
    name: 'Old Rod',
    description: 'Un vecchio amo per pescare Pokémon d\'acqua deboli.',
    category: 'Key',
    price: 0,
    effect: { type: 'key' }
  },
  {
    id: 'good_rod',
    name: 'Good Rod',
    description: 'Un buon amo per pescare Pokémon d\'acqua.',
    category: 'Key',
    price: 0,
    effect: { type: 'key' }
  },
  {
    id: 'super_rod',
    name: 'Super Rod',
    description: 'Il miglior amo per pescare Pokémon d\'acqua forti.',
    category: 'Key',
    price: 0,
    effect: { type: 'key' }
  },
  {
    id: 'helix_fossil',
    name: 'Helix Fossil',
    description: 'Un pezzo di conchiglia marina antica.',
    category: 'Key',
    price: 0,
    effect: { type: 'key' }
  },
  {
    id: 'dome_fossil',
    name: 'Dome Fossil',
    description: 'Un pezzo di guscio antico.',
    category: 'Key',
    price: 0,
    effect: { type: 'key' }
  },
  {
    id: 'old_amber',
    name: 'Old Amber',
    description: 'Un pezzo di ambra contenente il DNA di un Pokémon antico.',
    category: 'Key',
    price: 0,
    effect: { type: 'key' }
  },

  // --- HMs (HIDDEN MACHINES) ---
  {
    id: 'hm01',
    name: 'HM01',
    description: 'Insegna Taglio (Cut).',
    category: 'TM',
    price: 0,
    effect: { type: 'teach', moveId: 'cut' }
  },
  {
    id: 'hm02',
    name: 'HM02',
    description: 'Insegna Volo (Fly).',
    category: 'TM',
    price: 0,
    effect: { type: 'teach', moveId: 'fly' }
  },
  {
    id: 'hm03',
    name: 'HM03',
    description: 'Insegna Surf.',
    category: 'TM',
    price: 0,
    effect: { type: 'teach', moveId: 'surf' }
  },
  {
    id: 'hm04',
    name: 'HM04',
    description: 'Insegna Forza (Strength).',
    category: 'TM',
    price: 0,
    effect: { type: 'teach', moveId: 'strength' }
  },
  {
    id: 'hm05',
    name: 'HM05',
    description: 'Insegna Flash.',
    category: 'TM',
    price: 0,
    effect: { type: 'teach', moveId: 'flash' }
  },

  // --- TMs (TECHNICAL MACHINES) - COMPLETE LIST 01-50 ---
  { id: 'tm01', name: 'TM01', description: 'Insegna Mega Pugno (Mega Punch).', category: 'TM', price: 3000, effect: { type: 'teach', moveId: 'mega_punch' } },
  { id: 'tm02', name: 'TM02', description: 'Insegna Ventagliente (Razor Wind).', category: 'TM', price: 2000, effect: { type: 'teach', moveId: 'razor_wind' } },
  { id: 'tm03', name: 'TM03', description: 'Insegna Danzaspada (Swords Dance).', category: 'TM', price: 2000, effect: { type: 'teach', moveId: 'swords_dance' } },
  { id: 'tm04', name: 'TM04', description: 'Insegna Turbine (Whirlwind).', category: 'TM', price: 1000, effect: { type: 'teach', moveId: 'whirlwind' } },
  { id: 'tm05', name: 'TM05', description: 'Insegna Mega Calcio (Mega Kick).', category: 'TM', price: 3000, effect: { type: 'teach', moveId: 'mega_kick' } },
  { id: 'tm06', name: 'TM06', description: 'Insegna Tossina (Toxic).', category: 'TM', price: 4000, effect: { type: 'teach', moveId: 'toxic' } },
  { id: 'tm07', name: 'TM07', description: 'Insegna Perforcorno (Horn Drill).', category: 'TM', price: 2000, effect: { type: 'teach', moveId: 'horn_drill' } },
  { id: 'tm08', name: 'TM08', description: 'Insegna Corposcontro (Body Slam).', category: 'TM', price: 4000, effect: { type: 'teach', moveId: 'body_slam' } },
  { id: 'tm09', name: 'TM09', description: 'Insegna Riduttore (Take Down).', category: 'TM', price: 3000, effect: { type: 'teach', moveId: 'take_down' } },
  { id: 'tm10', name: 'TM10', description: 'Insegna Sdoppiatore (Double-Edge).', category: 'TM', price: 4000, effect: { type: 'teach', moveId: 'double_edge' } },
  { id: 'tm11', name: 'TM11', description: 'Insegna Bollaraggio (Bubble Beam).', category: 'TM', price: 2000, effect: { type: 'teach', moveId: 'bubble_beam' } },
  { id: 'tm12', name: 'TM12', description: 'Insegna Pistolacqua (Water Gun).', category: 'TM', price: 1000, effect: { type: 'teach', moveId: 'water_gun' } },
  { id: 'tm13', name: 'TM13', description: 'Insegna Geloraggio (Ice Beam).', category: 'TM', price: 4000, effect: { type: 'teach', moveId: 'ice_beam' } },
  { id: 'tm14', name: 'TM14', description: 'Insegna Bora (Blizzard).', category: 'TM', price: 5000, effect: { type: 'teach', moveId: 'blizzard' } },
  { id: 'tm15', name: 'TM15', description: 'Insegna Iper Raggio (Hyper Beam).', category: 'TM', price: 5500, effect: { type: 'teach', moveId: 'hyper_beam' } },
  { id: 'tm16', name: 'TM16', description: 'Insegna Giornopaga (Pay Day).', category: 'TM', price: 5000, effect: { type: 'teach', moveId: 'pay_day' } },
  { id: 'tm17', name: 'TM17', description: 'Insegna Sottomissione (Submission).', category: 'TM', price: 3000, effect: { type: 'teach', moveId: 'submission' } },
  { id: 'tm18', name: 'TM18', description: 'Insegna Contatore (Counter).', category: 'TM', price: 2000, effect: { type: 'teach', moveId: 'counter' } },
  { id: 'tm19', name: 'TM19', description: 'Insegna Movimento Sismico (Seismic Toss).', category: 'TM', price: 3000, effect: { type: 'teach', moveId: 'seismic_toss' } },
  { id: 'tm20', name: 'TM20', description: 'Insegna Ira (Rage).', category: 'TM', price: 1500, effect: { type: 'teach', moveId: 'rage' } },
  { id: 'tm21', name: 'TM21', description: 'Insegna Megassorbimento (Mega Drain).', category: 'TM', price: 3000, effect: { type: 'teach', moveId: 'mega_drain' } },
  { id: 'tm22', name: 'TM22', description: 'Insegna Solarraggio (Solar Beam).', category: 'TM', price: 4000, effect: { type: 'teach', moveId: 'solar_beam' } },
  { id: 'tm23', name: 'TM23', description: 'Insegna Ira di Drago (Dragon Rage).', category: 'TM', price: 3000, effect: { type: 'teach', moveId: 'dragon_rage' } },
  { id: 'tm24', name: 'TM24', description: 'Insegna Fulmine (Thunderbolt).', category: 'TM', price: 4000, effect: { type: 'teach', moveId: 'thunderbolt' } },
  { id: 'tm25', name: 'TM25', description: 'Insegna Tuono (Thunder).', category: 'TM', price: 5000, effect: { type: 'teach', moveId: 'thunder' } },
  { id: 'tm26', name: 'TM26', description: 'Insegna Terremoto (Earthquake).', category: 'TM', price: 4000, effect: { type: 'teach', moveId: 'earthquake' } },
  { id: 'tm27', name: 'TM27', description: 'Insegna Abisso (Fissure).', category: 'TM', price: 5000, effect: { type: 'teach', moveId: 'fissure' } },
  { id: 'tm28', name: 'TM28', description: 'Insegna Fossa (Dig).', category: 'TM', price: 2000, effect: { type: 'teach', moveId: 'dig' } },
  { id: 'tm29', name: 'TM29', description: 'Insegna Psichico (Psychic).', category: 'TM', price: 4000, effect: { type: 'teach', moveId: 'psychic' } },
  { id: 'tm30', name: 'TM30', description: 'Insegna Teletrasporto (Teleport).', category: 'TM', price: 1000, effect: { type: 'teach', moveId: 'teleport' } },
  { id: 'tm31', name: 'TM31', description: 'Insegna Mimica (Mimic).', category: 'TM', price: 2000, effect: { type: 'teach', moveId: 'mimic' } },
  { id: 'tm32', name: 'TM32', description: 'Insegna Doppioteam (Double Team).', category: 'TM', price: 1000, effect: { type: 'teach', moveId: 'double_team' } },
  { id: 'tm33', name: 'TM33', description: 'Insegna Riflesso (Reflect).', category: 'TM', price: 1000, effect: { type: 'teach', moveId: 'reflect' } },
  { id: 'tm34', name: 'TM34', description: 'Insegna Pazienza (Bide).', category: 'TM', price: 2000, effect: { type: 'teach', moveId: 'bide' } },
  { id: 'tm35', name: 'TM35', description: 'Insegna Metronomo (Metronome).', category: 'TM', price: 4000, effect: { type: 'teach', moveId: 'metronome' } },
  { id: 'tm36', name: 'TM36', description: 'Insegna Autodistruzione (Self-Destruct).', category: 'TM', price: 2000, effect: { type: 'teach', moveId: 'self_destruct' } },
  { id: 'tm37', name: 'TM37', description: 'Insegna Uovobomba (Egg Bomb).', category: 'TM', price: 2000, effect: { type: 'teach', moveId: 'egg_bomb' } },
  { id: 'tm38', name: 'TM38', description: 'Insegna Fuocobomba (Fire Blast).', category: 'TM', price: 5000, effect: { type: 'teach', moveId: 'fire_blast' } },
  { id: 'tm39', name: 'TM39', description: 'Insegna Comete (Swift).', category: 'TM', price: 2000, effect: { type: 'teach', moveId: 'swift' } },
  { id: 'tm40', name: 'TM40', description: 'Insegna Capocciata (Skull Bash).', category: 'TM', price: 2000, effect: { type: 'teach', moveId: 'skull_bash' } },
  { id: 'tm41', name: 'TM41', description: 'Insegna Covauova (Soft-Boiled).', category: 'TM', price: 4000, effect: { type: 'teach', moveId: 'soft_boiled' } },
  { id: 'tm42', name: 'TM42', description: 'Insegna Mangiasogni (Dream Eater).', category: 'TM', price: 4000, effect: { type: 'teach', moveId: 'dream_eater' } },
  { id: 'tm43', name: 'TM43', description: 'Insegna Aeroattacco (Sky Attack).', category: 'TM', price: 5000, effect: { type: 'teach', moveId: 'sky_attack' } },
  { id: 'tm44', name: 'TM44', description: 'Insegna Riposo (Rest).', category: 'TM', price: 2000, effect: { type: 'teach', moveId: 'rest' } },
  { id: 'tm45', name: 'TM45', description: 'Insegna Tuononda (Thunder Wave).', category: 'TM', price: 2000, effect: { type: 'teach', moveId: 'thunder_wave' } },
  { id: 'tm46', name: 'TM46', description: 'Insegna Psico-Onda (Psywave).', category: 'TM', price: 4000, effect: { type: 'teach', moveId: 'psywave' } },
  { id: 'tm47', name: 'TM47', description: 'Insegna Esplosione (Explosion).', category: 'TM', price: 3000, effect: { type: 'teach', moveId: 'explosion' } },
  { id: 'tm48', name: 'TM48', description: 'Insegna Frana (Rock Slide).', category: 'TM', price: 3000, effect: { type: 'teach', moveId: 'rock_slide' } },
  { id: 'tm49', name: 'TM49', description: 'Insegna Tripletta (Tri Attack).', category: 'TM', price: 3000, effect: { type: 'teach', moveId: 'tri_attack' } },
  { id: 'tm50', name: 'TM50', description: 'Insegna Sostituto (Substitute).', category: 'TM', price: 5000, effect: { type: 'teach', moveId: 'substitute' } }
];