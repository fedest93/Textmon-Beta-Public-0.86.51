import { PokemonInstance, StatStages, BaseStats } from '../types';
import { getEffectiveness } from '../data/typeChart';
import { moves as moveDatabase } from '../data/moves/moves';
import { pokemonList } from '../data/pokemon/pokemon';

export interface DamageResult {
  damage: number;
  isCritical: boolean;
  effectiveness: number; // 0, 0.25, 0.5, 1, 2, 4
  messages: string[];
  statChange?: {
    target: 'self' | 'enemy';
    stat: keyof StatStages;
    stages: number;
  };
  statusEffect?: string; // Status da applicare (dipende dal target della mossa)
  statusTarget?: 'self' | 'enemy'; // Chi riceve lo status
  volatileStatus?: string; // 'seeded', etc.
  drain?: number; // HP rubati/curati all'attaccante
  recoil?: number; // Danno da contraccolpo all'attaccante
  hits?: number; // Numero di colpi (per multi-hit)
}

/**
 * Recupera i tipi di un'istanza Pokémon guardando il database statico.
 */
const getPokemonTypes = (baseId: number): string[] => {
  const data = pokemonList.find(p => p.id === baseId);
  return data ? data.types : ['Normal'];
};

/**
 * Calcola il moltiplicatore delle statistiche basato sugli stage (-6 a +6).
 */
const getStageMultiplier = (stage: number, isAccuracyStat: boolean = false): number => {
  const num = isAccuracyStat ? 3 : 2;
  if (stage >= 0) return (num + stage) / num;
  return num / (num + Math.abs(stage));
};

/**
 * Calcola la statistica effettiva durante la battaglia.
 */
export const getEffectiveStat = (pokemon: PokemonInstance, stat: keyof BaseStats | 'accuracy' | 'evasion'): number => {
    if (stat === 'accuracy' || stat === 'evasion') {
        const stage = pokemon.statStages[stat] || 0;
        return getStageMultiplier(stage, true);
    }

    let value = pokemon.stats[stat as keyof BaseStats];
    
    const stageKeyMap: Record<keyof BaseStats, keyof StatStages | undefined> = {
        hp: undefined,
        attack: 'attack',
        defense: 'defense',
        special: 'special',
        speed: 'speed'
    };

    const stageKey = stageKeyMap[stat as keyof BaseStats];
    if (stageKey) {
        const stage = pokemon.statStages[stageKey] || 0;
        value = Math.floor(value * getStageMultiplier(stage, false));
    }

    // Effetti di Status
    if (stat === 'speed' && pokemon.status === 'PAR') {
        value = Math.floor(value * 0.25);
    }
    if (stat === 'attack' && pokemon.status === 'BRN') {
        value = Math.floor(value * 0.5);
    }

    return Math.max(1, value);
};

/**
 * Calcola il danno di una mossa o l'effetto di una mossa di stato.
 */
export const calculateDamage = (
  attacker: PokemonInstance,
  defender: PokemonInstance,
  moveId: string
): DamageResult => {
  const move = moveDatabase.find(m => m.id === moveId);
  const messages: string[] = [];

  // --- GESTIONE CONFUSIONE (Move ID interno) ---
  if (moveId === 'hit-self') {
      const atk = getEffectiveStat(attacker, 'attack');
      const def = getEffectiveStat(attacker, 'defense');
      let dmg = Math.floor((2 * attacker.level) / 5 + 2);
      dmg = Math.floor((dmg * 40 * atk) / Math.max(1, def));
      dmg = Math.floor(dmg / 50) + 2;
      return { damage: dmg, isCritical: false, effectiveness: 1, messages: ["Si è colpito da solo!"] };
  }

  if (!move) {
    return { damage: 0, isCritical: false, effectiveness: 1, messages: ['Errore: Mossa sconosciuta!'] };
  }

  // --- LOGICHE SPECIALI PRE-CALCOLO ---
  
  // 1. Mangiasogni (Fallisce se il nemico non dorme)
  if (moveId === 'dream_eater' && defender.status !== 'SLP') {
      return { damage: 0, isCritical: false, effectiveness: 0, messages: [`${attacker.name} usa Mangiasogni...`, "...ma ha fallito!"] };
  }

  // --- CALCOLO PRECISIONE ---
  // Mosse infallibili: Swift, Faint Attack, Aerial Ace (gestiti con accuracy 0 o check specifico)
  if (move.accuracy > 0 && move.id !== 'swift' && move.id !== 'faint_attack' && move.id !== 'aerial_ace') {
      const userAccMult = getEffectiveStat(attacker, 'accuracy');
      const targetEvaMult = getEffectiveStat(defender, 'evasion');
      let hitChance = move.accuracy * (userAccMult / targetEvaMult);
      
      // OHKO moves logic (simplified gen 3 style)
      if (move.effect?.note === 'OHKO') {
          hitChance = move.accuracy + (attacker.level - defender.level);
          if (attacker.level < defender.level) hitChance = 0;
      }

      if (Math.random() * 100 > hitChance) {
          // Eccezione per Jump Kick / High Jump Kick (Crash damage on miss)
          if (move.id === 'jump_kick' || move.id === 'high_jump_kick') {
              const crashDmg = Math.floor(attacker.stats.hp / 2);
              return { 
                  damage: 0, isCritical: false, effectiveness: 0, 
                  messages: [`${attacker.name} usa ${move.name}...`, "Ha fallito e si è schiantato!"],
                  recoil: crashDmg
              };
          }
          return { damage: 0, isCritical: false, effectiveness: 0, messages: [`${attacker.name} usa ${move.name}...`, "Ma ha fallito!"] };
      }
  }

  // --- MOSSE DI STATO (Category: Status) ---
  if (move.category === 'Status') {
    let statChange = undefined;
    let statusEffect = undefined;
    let volatileStatus = undefined;
    let drain = 0;
    let statusTarget: 'self' | 'enemy' = 'enemy';

    // Stat Changes
    if (move.effect?.type === 'stat_change' && move.effect.stat && move.effect.stages) {
      statChange = {
        target: move.effect.target,
        stat: move.effect.stat as keyof StatStages,
        stages: move.effect.stages
      };
    }

    // Status Ailments
    if (move.effect?.type === 'status' && move.effect.status) {
        statusEffect = move.effect.status;
        statusTarget = move.effect.target;
    }

    // Direct Heal (Recover, Soft-boiled, Moonlight, etc.)
    if (move.effect?.type === 'heal') {
        let healPct = move.effect.value || 0.5;
        // Weather check for Moonlight/Synthesis (Placeholder: always normal or assume inside building)
        if (move.id === 'moonlight' || move.id === 'synthesis' || move.id === 'morning_sun') {
            // Se ci fosse il meteo, qui cambierebbe la %
        }
        
        // Rest Logic: Heal 100%, Sleep 2 turns
        if (move.id === 'rest') {
            healPct = 1.0;
            statusEffect = 'SLP';
            statusTarget = 'self';
            messages.push(`${attacker.name} dorme e recupera le forze!`);
        } else {
            messages.push(`${attacker.name} recupera le forze!`);
        }
        
        drain = Math.floor(attacker.stats.hp * healPct); // Usiamo 'drain' field per curare l'attacker
    }

    // Volatiles (Leech Seed, Ingrain, Confuse Ray)
    if (move.id === 'leech_seed') {
        volatileStatus = 'seeded';
        messages.push(`I semi sono stati piantati su ${defender.name}!`);
    }
    if (move.id === 'ingrain') {
        volatileStatus = 'ingrain'; // Should be self, logic needed in useGameState
        messages.push(`${attacker.name} mette radici!`);
    }
    if (move.effect?.note === 'Confuse') {
        volatileStatus = 'confused';
        messages.push(`${defender.name} è confuso!`);
    }

    return { 
      damage: 0, 
      isCritical: false, 
      effectiveness: 1, 
      messages: [`${attacker.name} usa ${move.name}!`, ...messages], 
      statChange,
      statusEffect,
      statusTarget,
      volatileStatus,
      drain: (move.effect?.type === 'heal' && move.id !== 'leech_life' && move.id !== 'absorb' && move.id !== 'mega_drain' && move.id !== 'giga_drain' && move.id !== 'dream_eater') ? drain : 0
    };
  }

  // --- MOSSE DI DANNO (Physical / Special) ---
  const attackerTypes = getPokemonTypes(attacker.baseId);
  const defenderTypes = getPokemonTypes(defender.baseId);

  // Calcolo Efficacia
  const effectiveness = getEffectiveness(move.type, defenderTypes as any);
  
  // Eccezione: Night Shade / Seismic Toss / Sonic Boom / Dragon Rage ignorano effectiveness (eccetto Immunità Ghost per Normal/Fighting)
  let ignoreEffectivenessMessage = false;
  if (move.effect?.note?.includes('Fixed Damage') || move.effect?.note?.includes('Damage = Level')) {
      ignoreEffectivenessMessage = true;
      if (effectiveness === 0) { // Ghost immunity check still applies for Seismic Toss (Fighting) usually, but Night Shade hits all except Normal? 
          // Gen 1 mechanics: Night Shade hits all. Gen 2+: Normal immune to Ghost.
          // Let's stick to standard type chart.
          return { damage: 0, isCritical: false, effectiveness: 0, messages: [`${attacker.name} usa ${move.name}...`, "Non ha effetto..."] };
      }
  }

  if (!ignoreEffectivenessMessage) {
      if (effectiveness > 1) messages.push("È superefficace!");
      if (effectiveness < 1 && effectiveness > 0) messages.push("Non è molto efficace...");
      if (effectiveness === 0) messages.push("Non ha effetto...");
  }

  if (effectiveness === 0) {
    return { damage: 0, isCritical: false, effectiveness: 0, messages };
  }

  // --- CALCOLO DANNO BASE ---
  let damage = 0;
  let isCritical = false;

  // 1. FIXED DAMAGE & OHKO
  if (move.effect?.note === 'Fixed Damage') {
      damage = move.effect.value || 20; // Sonic Boom (20), Dragon Rage (40)
  } 
  else if (move.effect?.note === 'Damage = Level') {
      damage = attacker.level; // Seismic Toss, Night Shade
  }
  else if (move.id === 'super_fang') {
      damage = Math.floor(defender.currentHp / 2);
      if (damage < 1) damage = 1;
  }
  else if (move.id === 'psywave') {
      damage = Math.floor(attacker.level * (Math.random() * 1.5 + 0.5));
  }
  else if (move.effect?.note === 'OHKO') {
      damage = defender.stats.hp; // Kills instantly
      messages.push("Colpo da K.O. in un colpo!");
  }
  // 2. FORMULA DANNO STANDARD
  else {
      // Colpo Critico
      let critRate = 0.0625;
      if (move.effect?.note?.includes('High Crit')) critRate = 0.125;
      if (move.id === 'slash' || move.id === 'razor_leaf' || move.id === 'crabhammer' || move.id === 'karate_chop') critRate = 0.125; // Gen 2+ logic
      
      // Focus Energy logic would go here (increase critRate)
      
      isCritical = Math.random() < critRate;
      if (isCritical) messages.push("Brutto colpo!");

      const stab = attackerTypes.includes(move.type) ? 1.5 : 1;

      // Stats
      let atkStat = move.category === 'Physical' ? getEffectiveStat(attacker, 'attack') : getEffectiveStat(attacker, 'special');
      let defStat = move.category === 'Physical' ? getEffectiveStat(defender, 'defense') : getEffectiveStat(defender, 'special');

      // Critical Hit ignora drop attacco e boost difesa
      if (isCritical) {
          // Raw stats approx
          atkStat = move.category === 'Physical' ? attacker.stats.attack : attacker.stats.special;
          defStat = move.category === 'Physical' ? defender.stats.defense : defender.stats.special;
      }

      damage = Math.floor((2 * attacker.level) / 5 + 2);
      damage = Math.floor((damage * move.power * atkStat) / Math.max(1, defStat));
      damage = Math.floor(damage / 50) + 2;

      if (isCritical) damage = Math.floor(damage * 1.5); // Gen 3 crit is 2x, Gen 6 is 1.5x. Let's use 1.5x for balance.
      damage = Math.floor(damage * stab);
      damage = Math.floor(damage * effectiveness);

      const random = (Math.floor(Math.random() * 16) + 85) / 100;
      damage = Math.floor(damage * random);
  }

  // --- MULTI-HIT MOVES ---
  let hits = 1;
  if (move.effect?.type === 'multi_hit') {
      if (move.effect.min === 2 && move.effect.max === 2) {
          hits = 2; // Double Kick, Bonemerang
      } else {
          // 2-5 hits (Population Bomb style logic or standard Gen 3)
          // Gen 3: 2 (37.5%), 3 (37.5%), 4 (12.5%), 5 (12.5%)
          const r = Math.random();
          if (r < 0.375) hits = 2;
          else if (r < 0.75) hits = 3;
          else if (r < 0.875) hits = 4;
          else hits = 5;
      }
      damage *= hits; // Semplificazione: calcola danno singolo e moltiplica
      messages.push(`Colpito ${hits} volte!`);
  }

  if (damage < 1) damage = 1;

  // --- EFFETTI SECONDARI (Drain, Recoil, Status chance) ---
  
  let statChange = undefined;
  let statusEffect = undefined;
  let drain = 0;
  let recoil = 0;

  // Drain (Drenaggio / Mangiasogni)
  if (move.effect?.note?.includes('Drain') || move.id === 'dream_eater' || move.effect?.type === 'heal') {
      const drainPct = move.effect?.value || 0.5;
      drain = Math.floor(damage * drainPct);
      if (drain > 0) messages.push("L'energia rubata all'avversario viene assorbita!");
  }

  // Recoil (Contraccolpo / Esplosione)
  if (move.effect?.type === 'recoil') {
      if (move.effect.note?.includes('Faint')) {
          recoil = attacker.currentHp; // Explosion/Self-Destruct
      } else {
          recoil = Math.floor(damage * (move.effect.value || 0.25));
      }
  }

  // Chance Status/Stat
  const rng = Math.random() * 100;
  if (move.effect?.chance && rng < move.effect.chance) {
      if (move.effect.type === 'stat_change' && move.effect.stat) {
          statChange = {
              target: move.effect.target,
              stat: move.effect.stat as keyof StatStages,
              stages: move.effect.stages || -1
          };
      }
      if (move.effect.type === 'status' && move.effect.status) {
          statusEffect = move.effect.status;
      }
      // Tri Attack Special Logic
      if (move.id === 'tri_attack') {
          const triRng = Math.random();
          if (triRng < 0.33) statusEffect = 'PAR';
          else if (triRng < 0.66) statusEffect = 'BRN';
          else statusEffect = 'FRZ';
      }
  }

  return {
    damage,
    isCritical,
    effectiveness,
    messages,
    statChange,
    statusEffect,
    statusTarget: 'enemy',
    drain,
    recoil,
    hits
  };
};

/**
 * Calcola l'esperienza guadagnata sconfiggendo un Pokémon.
 */
export const calculateExpGain = (defeated: PokemonInstance, isTrainer: boolean): number => {
  const baseData = pokemonList.find(p => p.id === defeated.baseId);
  const baseYield = baseData ? baseData.expYield : 64; 
  
  const a = isTrainer ? 1.5 : 1;
  const L = defeated.level;
  
  // Formula Gen 3 semplificata
  return Math.floor((a * baseYield * L) / 7);
};