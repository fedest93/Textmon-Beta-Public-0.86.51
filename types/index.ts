
export type PokemonType = 'Normal' | 'Fire' | 'Water' | 'Grass' | 'Electric' | 'Ice' | 'Fighting' | 'Poison' | 'Ground' | 'Flying' | 'Psychic' | 'Bug' | 'Rock' | 'Ghost' | 'Dragon' | 'Steel' | 'Dark';

export interface BaseStats {
  hp: number;
  attack: number;
  defense: number;
  special: number;
  speed: number;
}

export interface StatStages {
  attack: number;
  defense: number;
  special: number;
  speed: number;
  accuracy: number;
  evasion: number;
}

export interface MoveEffect {
  type: 'status' | 'stat_change' | 'recoil' | 'multi_hit' | 'heal' | 'unique' | 'volatile';
  target: 'self' | 'enemy';
  chance?: number;
  value?: number; // Per stat stages o % heal, o recoil amount
  status?: string; // 'PAR', 'PSN', etc.
  stat?: string;
  min?: number;
  max?: number;
  note?: string;
  stages?: number; // Importante per stat_change (es. -2 per Millebave)
  volatile?: string; // 'seeded', 'confused', etc.
}

export interface Move {
  id: string;
  name: string;
  type: PokemonType;
  category: 'Physical' | 'Special' | 'Status';
  power: number;
  accuracy: number;
  pp: number;
  maxPp?: number;
  priority?: number;
  effect?: MoveEffect;
}

export interface PokemonBase {
  id: number;
  name: string;
  types: PokemonType[];
  baseStats: BaseStats;
  sprites: { front: string; back: string };
  growthRate: 'Slow' | 'MediumSlow' | 'MediumFast' | 'Fast';
  expYield: number;
  catchRate: number;
  evolutions: { level?: number; item?: string; trade?: boolean; to: number }[];
  learnset: { level: number; moveId: string }[];
  tmHM?: string[]; // Array di ID delle MT/MN compatibili (opzionale)
}

export interface PokemonInstance {
  uniqueId: string;
  baseId: number;
  name: string; // Nickname o nome specie
  level: number;
  currentHp: number;
  stats: BaseStats; // Calcolate
  statStages: StatStages; // Modificatori temporanei battaglia (-6 a +6)
  volatiles: { // Stati che si resettano allo switch
    seeded?: boolean;
    confused?: number; // turns left
    flinch?: boolean;
  };
  moves: { moveId: string; pp: number; maxPp?: number }[];
  status: 'OK' | 'PAR' | 'PSN' | 'BRN' | 'FRZ' | 'SLP';
  exp: number;
  ivs?: BaseStats;
  evs?: BaseStats;
  originalTrainer?: string;
  heldItem?: string; // ID dell'oggetto tenuto
}

export interface TrainerData {
  id: string;
  name: string;
  sprite: string;
  dialogue: { intro: string; defeat: string; after: string };
  party: { pokemonId: number; level: number; moves?: string[] }[]; // moves opzionale per custom moveset
  rewardMoney: number;
}

export interface MapData {
  id: string;
  name: string;
  description: string; // Testo descrittivo "Sei a Pallet Town..."
  connections: { north?: string; south?: string; east?: string; west?: string };
  wildEncounters?: { pokemonId: number; minLevel: number; maxLevel: number; rate: number }[];
  trainers?: string[]; // ID degli allenatori presenti (riferimento ai file zone)
  events?: {
    id: string;
    trigger: 'enter' | 'interact';
    conditionFlag?: string; // Es. "oakParcelDelivered" o "!flag"
  }[];
}

export interface Inventory {
  items: { itemId: string; count: number }[];
  keyItems: string[];
}

export interface PlayerState {
  name: string;
  rivalName: string;
  money: number;
  bank: number; // Risparmi dalla Mamma
  badges: number;
  playTime: number;
  position: { mapId: string; stepCount: number };
  lastHealPoint: string; // Mappa dell'ultimo Centro Pokemon (Respawn)
  party: PokemonInstance[];
  box: PokemonInstance[];
  inventory: Inventory;
}

// Nuova interfaccia per gestire le scelte del menu
export interface MenuOption {
  label: string;
  action: () => void;
  specialStyle?: any; // Per styling opzionale (es. pulsante verde)
}

export type BattleMenuType = 'MAIN' | 'MOVES' | 'BAG' | 'BUSY';

// Stati temporanei per Evoluzione e Apprendimento Mosse
export interface PendingEvolution {
  pokemonIndex: number;
  fromBaseId: number;
  toBaseId: number;
  name: string;
}

export interface PendingMove {
  pokemonIndex: number;
  moveId: string;
  moveName: string;
  source?: { type: 'level' | 'item'; itemId?: string }; // Per sapere se consumare l'item o no
}

export interface LevelUpStats {
    uniqueId: string; // Identificativo univoco del pokemon
    name: string;
    level: number;
    fromLevel: number; // Livello di partenza (fondamentale per check range mosse)
    statsDiff: BaseStats; // Quanto sono aumentate (es. hp: 2, attack: 1)
    currentStats: BaseStats; // I nuovi valori totali
}

export interface GameState {
  player: PlayerState;
  party: PokemonInstance[];
  box: PokemonInstance[];
  inventory: { itemId: string; count: number }[];
  flags: Record<string, boolean | number | string>; // "starterChosen", "rival1Defeated"
  mode: 'EXPLORE' | 'BATTLE' | 'MENU' | 'DIALOGUE' | 'INTRO' | 'EVOLUTION' | 'LEARN_MOVE';
  menuOptions?: MenuOption[]; // Se presente, mostra un menu di scelta
  battleMenu?: BattleMenuType; // Gestione stato menu battaglia (schermo inferiore)
  
  // Stati transitori
  pendingEvolution?: PendingEvolution;
  pendingMove?: PendingMove;
  levelUpStats?: LevelUpStats; // Dati per la schermata di level up
  waitingForLevelUpInput?: boolean; // Flag per bloccare l'input durante il level up screen

  battle?: {
    enemy: PokemonInstance;
    trainerParty?: PokemonInstance[]; // Squadra completa dell'allenatore
    isTrainer: boolean;
    trainerId?: string;
    flashTrainer?: boolean; // Se true, mostra lo sprite dell'allenatore prima del pokemon
  };
  gauntlet?: {
    active: boolean;
    queue: string[]; // ID allenatori
    index: number;
  };
}