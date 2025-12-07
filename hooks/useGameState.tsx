import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { GameState, PokemonInstance, PlayerState, TrainerData, MenuOption, BattleMenuType, StatStages, PendingEvolution, PendingMove, LevelUpStats } from '../types';
import { pokemonList } from '../data/pokemon/pokemon';
import { handleGameEvent } from '../engine/eventHandler';
import { items as itemDatabase } from '../data/items/items';
import { calculateDamage, calculateExpGain, getEffectiveStat } from '../engine/battleEngine';
import { moves as moveDatabase } from '../data/moves/moves';
import { maps } from '../data/maps';

// Import All Trainers for Gauntlet Lookup
import { zone1Trainers } from '../data/trainers/zone1';
import { zone2Trainers } from '../data/trainers/zone2';
import { zone3Trainers } from '../data/trainers/zone3';
import { zone4Trainers } from '../data/trainers/zone4';

const allTrainers = [
  ...zone1Trainers,
  ...zone2Trainers,
  ...zone3Trainers,
  ...zone4Trainers
];

// --- UTILS ---
const generateUniqueId = () => '_' + Math.random().toString(36).substr(2, 9);

export const calculateStats = (base: any, level: number) => {
  return {
    hp: Math.floor(((2 * base.hp + 31) * level) / 100) + level + 10,
    attack: Math.floor(((2 * base.attack + 31) * level) / 100) + 5,
    defense: Math.floor(((2 * base.defense + 31) * level) / 100) + 5,
    special: Math.floor(((2 * base.special + 31) * level) / 100) + 5,
    speed: Math.floor(((2 * base.speed + 31) * level) / 100) + 5,
  };
};

// --- INITIAL STATE ---
const initialPlayerState: PlayerState = {
  name: '', 
  rivalName: 'Gary',
  money: 3000,
  bank: 0, 
  badges: 0,
  playTime: 0,
  position: { mapId: 'pallet_town', stepCount: 0 },
  lastHealPoint: 'pallet_town', // Default respawn point
  party: [],
  box: [],
  inventory: { items: [], keyItems: [] },
};

const initialGameState: GameState = {
  player: initialPlayerState,
  party: [],
  box: [],
  inventory: [],
  flags: {
    'intro_step': 0,
    'naming_process': false,
  },
  mode: 'INTRO',
  battle: undefined,
  gauntlet: undefined,
  menuOptions: undefined,
  battleMenu: 'MAIN',
};

// --- CONTEXT ---
interface GameContextType {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  handleInput: (input: 'A' | 'B' | 'START' | 'UP' | 'DOWN' | 'KEYBOARD') => void;
  setPlayerName: (name: string) => void; 
  changeLocation: (mapId: string) => void;
  interactWithEvent: (eventId: string) => void;
  advanceDialogue: () => void;
  addPokemon: (pokemonId: number, level: number) => void;
  addItem: (itemId: string, count?: number) => void;
  consumeItem: (itemId: string) => void;
  checkFlag: (flag: string) => boolean;
  setFlag: (flag: string, value: boolean | number | string) => void;
  setMenuOptions: (options: MenuOption[] | undefined) => void;
  setBattleMenu: (menu: BattleMenuType) => void;
  startBattle: (enemyData: TrainerData | any, isTrainer: boolean) => void;
  triggerWildEncounter: (isAuto?: boolean, mapIdOverride?: string) => void;
  executeTurn: (playerAction: { type: 'MOVE' | 'ITEM' | 'SWITCH', id: string }) => Promise<void>;
  attemptCapture: (ballId: string) => boolean;
  gameLog: string[];
  addLog: (text: string) => void;
  modifyMoney: (amount: number) => void;
  completeEvolution: () => void;
  resolveMoveLearning: (moveIndexToReplace: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGameState = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGameState must be used within a GameProvider');
  return context;
};

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [gameLog, setGameLog] = useState<string[]>(["Premi il tasto A per continuare..."]);

  const addLog = (text: string) => setGameLog((prev) => [...prev, text]);

  const checkFlag = (flag: string) => !!gameState.flags[flag];
  
  const setFlag = (flag: string, value: boolean | number | string) => {
    setGameState((prev) => ({
      ...prev,
      flags: { ...prev.flags, [flag]: value }
    }));
  };

  const setMenuOptions = (options: MenuOption[] | undefined) => {
    setGameState(prev => ({ ...prev, menuOptions: options }));
  };

  const setBattleMenu = (menu: BattleMenuType) => {
    setGameState(prev => ({ ...prev, battleMenu: menu }));
  };

  const addItem = (itemId: string, count: number = 1) => {
    setGameState((prev) => {
      const newInventory = { ...prev.player.inventory };
      const existing = newInventory.items.find(i => i.itemId === itemId);
      if (existing) {
        existing.count += count;
      } else {
        newInventory.items.push({ itemId, count });
      }
      return { ...prev, player: { ...prev.player, inventory: newInventory } };
    });
    addLog(`Hai ottenuto ${itemId} x${count}!`);
  };

  const consumeItem = (itemId: string) => {
    setGameState((prev) => {
      const newInventory = { ...prev.player.inventory };
      const index = newInventory.items.findIndex(i => i.itemId === itemId);
      if (index > -1) {
        newInventory.items[index].count--;
        if (newInventory.items[index].count <= 0) {
          newInventory.items.splice(index, 1);
        }
      }
      return { ...prev, player: { ...prev.player, inventory: newInventory } };
    });
  };

  const modifyMoney = (amount: number) => {
    setGameState(prev => ({
        ...prev,
        player: { ...prev.player, money: prev.player.money + amount }
    }));
  };

  // --- HELPER FOR GAUNTLET CONTINUATION ---
  const checkGauntlet = (currentState: GameState) => {
      if (currentState.gauntlet?.active && !currentState.battle) {
          const nextQueue = currentState.gauntlet.queue.slice(1);
          // Filtraggio rigoroso: prendi solo chi NON è flaggato come sconfitto
          const validNext = nextQueue.filter(tid => !currentState.flags[`${tid}_defeated`]);

          if (validNext.length > 0) {
              const nextTrainerId = validNext[0];
              const nextTrainer = allTrainers.find(t => t.id === nextTrainerId);
              if (nextTrainer) {
                  setTimeout(() => {
                      addLog(`${nextTrainer.name} vuole combattere!`);
                      startBattle(nextTrainer, true);
                  }, 1000);
                  return { 
                      ...currentState, 
                      battle: undefined, 
                      battleMenu: 'BUSY' as BattleMenuType, 
                      mode: 'EXPLORE' as const, // Temporary while waiting for battle
                      gauntlet: { ...currentState.gauntlet, queue: validNext, index: currentState.gauntlet.index + 1 } 
                  };
              }
          } else {
              addLog("Hai sconfitto tutti gli allenatori!");
              return { 
                  ...currentState, 
                  mode: 'EXPLORE' as const, 
                  battle: undefined, 
                  battleMenu: 'MAIN' as BattleMenuType, 
                  gauntlet: undefined 
              };
          }
      }
      return currentState;
  };

  // --- POKEMON GENERATION ---
  const createPokemonInstance = (pokemonId: number, level: number, owner: string = 'Player', customMoves?: string[]): PokemonInstance | null => {
    const baseData = pokemonList.find(p => p.id === pokemonId);
    if (!baseData) return null;

    const stats = calculateStats(baseData.baseStats, level);
    
    let knownMoves;
    if (customMoves && customMoves.length > 0) {
        // Usa mosse specificate (per Allenatori)
        knownMoves = customMoves.map(moveId => {
            const moveInfo = moveDatabase.find(dbm => dbm.id === moveId);
            return { 
                moveId: moveId, 
                pp: moveInfo?.pp || 10, 
                maxPp: moveInfo?.pp || 10 
            };
        });
    } else {
        // Usa learnset per livello (per Selvatici / Player)
        knownMoves = baseData.learnset
          .filter(m => m.level <= level)
          .slice(-4)
          .map(m => {
            const moveInfo = moveDatabase.find(dbm => dbm.id === m.moveId);
            return { 
              moveId: m.moveId, 
              pp: moveInfo?.pp || 10, 
              maxPp: moveInfo?.pp || 10 
            };
          });
    }

    return {
      uniqueId: generateUniqueId(),
      baseId: baseData.id,
      name: baseData.name,
      level: level,
      currentHp: stats.hp,
      stats: stats,
      statStages: { attack: 0, defense: 0, special: 0, speed: 0, accuracy: 0, evasion: 0 },
      volatiles: {}, // Init Volatiles
      moves: knownMoves,
      status: 'OK',
      exp: Math.pow(level, 3),
      originalTrainer: owner,
    };
  };

  const addPokemon = (pokemonId: number, level: number) => {
    const newPokemon = createPokemonInstance(pokemonId, level);
    if (!newPokemon) return;

    setGameState((prev) => {
      newPokemon.currentHp = newPokemon.stats.hp;
      if (prev.party.length < 6) {
        return { ...prev, party: [...prev.party, newPokemon] };
      } else {
        addLog(`${newPokemon.name} inviato al PC di Bill.`);
        return { ...prev, box: [...prev.box, newPokemon] };
      }
    });
  };

  const healParty = () => {
    setGameState(prev => ({
      ...prev,
      player: { ...prev.player, lastHealPoint: prev.player.position.mapId }, // UPDATE LAST HEAL POINT
      party: prev.party.map(p => ({
        ...p,
        currentHp: p.stats.hp,
        status: 'OK',
        statStages: { attack: 0, defense: 0, special: 0, speed: 0, accuracy: 0, evasion: 0 },
        volatiles: {}, // Clear volatiles on heal
        moves: p.moves.map(m => {
            const moveInfo = moveDatabase.find(dbm => dbm.id === m.moveId);
            return { ...m, pp: moveInfo?.pp || m.maxPp || 10 };
        })
      }))
    }));
  };

  const startBattle = (enemyData: TrainerData | any, isTrainer: boolean) => {
    let enemyInstance: PokemonInstance;
    let trainerParty: PokemonInstance[] = [];

    if (isTrainer) {
      const trainer = enemyData as TrainerData;
      addLog(`${trainer.name} vuole combattere!`);
      addLog(`"${trainer.dialogue.intro}"`);
      
      if (trainer.party.length > 0) {
        const partyInstances = trainer.party.map(p => 
            createPokemonInstance(p.pokemonId, p.level, trainer.name, p.moves)!
        );
        enemyInstance = partyInstances[0];
        trainerParty = partyInstances.slice(1); 
      } else {
        console.error("Allenatore senza pokemon!", trainer);
        return;
      }
    } else {
      enemyInstance = createPokemonInstance(enemyData.pokemonId, enemyData.level, 'Wild')!;
      addLog(`È apparso un ${enemyInstance.name} selvatico!`);
    }

    setGameState(prev => ({
      ...prev,
      mode: 'BATTLE',
      battleMenu: 'MAIN',
      battle: {
        enemy: enemyInstance,
        trainerParty: trainerParty, 
        isTrainer: isTrainer,
        trainerId: isTrainer ? enemyData.id : undefined,
        flashTrainer: isTrainer
      }
    }));

    if (isTrainer) {
        setTimeout(() => {
            setGameState(prev => {
                if (prev.battle) {
                    return {
                        ...prev,
                        battle: { ...prev.battle, flashTrainer: false }
                    };
                }
                return prev;
            });
        }, 2500);
    }
  };

  const completeEvolution = () => {
      setGameState(prev => {
          if (!prev.pendingEvolution) return prev;

          const newParty = [...prev.party];
          const pokemon = newParty[prev.pendingEvolution.pokemonIndex];
          const nextFormBase = pokemonList.find(p => p.id === prev.pendingEvolution!.toBaseId);

          if (pokemon && nextFormBase) {
              const oldName = pokemon.name;
              const originalBase = pokemonList.find(p => p.id === pokemon.baseId);
              if (originalBase && pokemon.name === originalBase.name) {
                  pokemon.name = nextFormBase.name;
              }
              pokemon.baseId = nextFormBase.id;
              const evolvedStats = calculateStats(nextFormBase.baseStats, pokemon.level);
              const hpDiff = evolvedStats.hp - pokemon.stats.hp; 
              pokemon.stats = evolvedStats;
              pokemon.currentHp += hpDiff; 

              addLog(`Congratulazioni! Il tuo ${oldName}`);
              addLog(`si è evoluto in ${nextFormBase.name}!`);
          }

          // Check if we need to continue a gauntlet after evolution
          const stateAfterEvo = {
              ...prev,
              party: newParty,
              mode: 'EXPLORE' as const, 
              pendingEvolution: undefined,
              battle: undefined,
              battleMenu: 'MAIN' as BattleMenuType
          };

          return checkGauntlet(stateAfterEvo);
      });
  };

  const resolveMoveLearning = (moveIndexToReplace: number) => {
    setGameState(prev => {
      if (!prev.pendingMove) return prev;

      const { pokemonIndex, moveId, moveName, source } = prev.pendingMove;
      const newParty = [...prev.party];
      const pokemon = newParty[pokemonIndex];
      let itemConsumed = false;

      // Se moveIndexToReplace è -1, l'utente ha rifiutato
      if (moveIndexToReplace === -1) {
        addLog(`${pokemon.name} non ha imparato ${moveName}.`);
        // Se la fonte era un item, non lo consumiamo perché non l'ha imparata
      } else {
        const moveData = moveDatabase.find(m => m.id === moveId);
        const oldMove = pokemon.moves[moveIndexToReplace];
        const oldMoveName = moveDatabase.find(m => m.id === oldMove?.moveId)?.name || 'Mossa';
        
        if (moveData) {
            pokemon.moves[moveIndexToReplace] = {
                moveId: moveId,
                pp: moveData.pp,
                maxPp: moveData.maxPp || moveData.pp
            };
            addLog(`1, 2 e... POOF!`);
            addLog(`${pokemon.name} ha scordato ${oldMoveName} e...`);
            addLog(`ha imparato ${moveName}!`);
            
            // Consuma l'item se l'ha imparata con successo
            if (source?.type === 'item') {
                itemConsumed = true;
            }
        }
      }

      let newInventory = { ...prev.player.inventory };
      if (itemConsumed && source?.itemId) {
          const index = newInventory.items.findIndex(i => i.itemId === source.itemId);
          if (index > -1) {
              newInventory.items[index].count--;
              if (newInventory.items[index].count <= 0) {
                  newInventory.items.splice(index, 1);
              }
          }
      }

      // Check if we are still in battle (Trainer Switch case)
      const inBattle = !!prev.battle;
      let nextMode = inBattle ? 'BATTLE' : 'EXPLORE';
      let pendingEvo = undefined;

      // CHECK EVOLUTION AFTER MOVE LEARNING (Only if battle is over)
      if (!inBattle) {
          const baseData = pokemonList.find(p => p.id === pokemon.baseId);
          if (baseData) {
              const evolution = baseData.evolutions.find(e => e.level && pokemon.level >= e.level);
              if (evolution) {
                  const nextFormBase = pokemonList.find(p => p.id === evolution.to);
                  if (nextFormBase) {
                      nextMode = 'EVOLUTION';
                      pendingEvo = {
                          pokemonIndex: pokemonIndex,
                          fromBaseId: pokemon.baseId,
                          toBaseId: nextFormBase.id,
                          name: pokemon.name
                      };
                  }
              }
          }
      }

      const nextState = {
        ...prev,
        party: newParty,
        player: { ...prev.player, inventory: newInventory },
        pendingMove: undefined,
        pendingEvolution: pendingEvo,
        mode: nextMode as any
      };

      // If we finished learning and are exploring, check gauntlet
      if (nextMode === 'EXPLORE' && !pendingEvo) {
          return checkGauntlet(nextState);
      }

      return nextState;
    });
  };

  const triggerWildEncounter = (isAuto: boolean = false, mapIdOverride?: string) => {
    const currentMapId = mapIdOverride || gameState.player.position.mapId;
    const currentMap = maps[currentMapId];
    
    if (!currentMap || !currentMap.wildEncounters || currentMap.wildEncounters.length === 0) {
      if (!isAuto) addLog("Non sembra esserci nulla qui.");
      return;
    }

    if (Math.random() > 0.5) {
      if (!isAuto) addLog("Non hai trovato nulla.");
      return;
    }

    const totalRate = currentMap.wildEncounters.reduce((sum, enc) => sum + enc.rate, 0);
    let roll = Math.random() * totalRate;
    
    let selectedEncounter = currentMap.wildEncounters[0];
    for (const enc of currentMap.wildEncounters) {
      roll -= enc.rate;
      if (roll <= 0) {
        selectedEncounter = enc;
        break;
      }
    }

    const level = Math.floor(Math.random() * (selectedEncounter.maxLevel - selectedEncounter.minLevel + 1)) + selectedEncounter.minLevel;

    startBattle({ pokemonId: selectedEncounter.pokemonId, level }, false);
  };

  // --- HELPER DI BATTAGLIA INTERNO ---
  const performAttack = async (
      attackerUniqueId: string, 
      isPlayerAttacker: boolean,
      moveId: string, 
      currentParty: PokemonInstance[],
      currentEnemy: PokemonInstance,
      updateStateCallback: (p: PokemonInstance[], e: PokemonInstance) => void
  ): Promise<{ party: PokemonInstance[], enemy: PokemonInstance }> => {
      
      // 1. Trova le istanze aggiornate dagli oggetti passati (CLONATI per sicurezza)
      let nextParty = [...currentParty];
      let nextEnemy = { ...currentEnemy };

      let attacker: PokemonInstance | undefined;
      let defender: PokemonInstance | undefined;

      if (isPlayerAttacker) {
          attacker = nextParty.find(p => p.uniqueId === attackerUniqueId);
          defender = nextEnemy;
      } else {
          attacker = nextEnemy; 
          defender = nextParty.find(p => p.uniqueId === gameState.party.find(x => x.currentHp > 0)?.uniqueId); // Target the active one
      }

      if (!attacker || !defender) return { party: currentParty, enemy: currentEnemy };

      // 1. Controllo Status
      if (attacker.status === 'SLP') {
          if (Math.random() < 0.33) {
              attacker.status = 'OK';
              addLog(`${attacker.name} si è svegliato!`);
          } else {
              addLog(`${attacker.name} dorme profondamente...`);
              return { party: nextParty, enemy: nextEnemy };
          }
      }
      if (attacker.status === 'FRZ') {
          if (Math.random() < 0.2) {
              attacker.status = 'OK';
              addLog(`${attacker.name} si è scongelato!`);
          } else {
              addLog(`${attacker.name} è congelato!`);
              return { party: nextParty, enemy: nextEnemy };
          }
      }
      if (attacker.status === 'PAR') {
          if (Math.random() < 0.25) {
              addLog(`${attacker.name} è paralizzato! Non può muoversi!`);
              return { party: nextParty, enemy: nextEnemy };
          }
      }

      // 2. Metronomo
      let actualMoveId = moveId;
      if (moveId === 'metronome') {
          addLog(`${attacker.name} usa Metronomo!`);
          await new Promise(r => setTimeout(r, 1000));
          const allMoves = moveDatabase.filter(m => m.id !== 'metronome' && m.power > 0);
          const randomMove = allMoves[Math.floor(Math.random() * allMoves.length)];
          actualMoveId = randomMove.id;
          addLog(`${attacker.name} usa ${randomMove.name}!`);
      }

      // 3. Calcolo Danno
      const res = calculateDamage(attacker, defender, actualMoveId);
      
      // 4. Log
      if (moveId !== 'metronome') addLog(`${attacker.name} usa ${moveDatabase.find(m=>m.id === actualMoveId)?.name}!`);
      await new Promise(r => setTimeout(r, 1000));
      res.messages.forEach(msg => addLog(msg));

      // 5. Applica Effetti
      // Applica Danno
      defender.currentHp = Math.max(0, defender.currentHp - res.damage);

      // Applica Stat Change
      if (res.statChange) {
          const subject = res.statChange.target === 'self' ? attacker : defender;
          const stat = res.statChange.stat;
          const stages = res.statChange.stages;
          const currentStages = subject.statStages || { attack: 0, defense: 0, special: 0, speed: 0, accuracy: 0, evasion: 0 };
          const newStages = Math.max(-6, Math.min(6, (currentStages[stat as keyof StatStages] || 0) + stages));
          subject.statStages = { ...subject.statStages, [stat]: newStages };
          
          const statNames: any = { attack: 'Attacco', defense: 'Difesa', speed: 'Velocità', special: 'Speciale', accuracy: 'Precisione', evasion: 'Elusione' };
          const changeText = stages > 0 ? 'aumenta' : 'diminuisce';
          addLog(`${subject.name}: ${statNames[stat] || stat} ${changeText}!`);
      }

      // Applica Status
      if (res.statusEffect) {
          if (defender.status === 'OK') {
              defender.status = res.statusEffect as any;
              addLog(`${defender.name} soffre di ${res.statusEffect}!`);
          }
      }

      // Applica Volatile (es. Leech Seed)
      if (res.volatileStatus) {
          if (!defender.volatiles) defender.volatiles = {};
          
          if (res.volatileStatus === 'seeded') {
              if (defender.volatiles.seeded) {
                  addLog("Ma i semi sono già stati piantati!");
              } else {
                  defender.volatiles.seeded = true;
                  // Note: Grass types are immune logic could be here, but keeping simple for now
              }
          }
      }

      // Gestione Drain (se presente in result)
      if (res.drain && res.drain > 0) {
          attacker.currentHp = Math.min(attacker.stats.hp, attacker.currentHp + res.drain);
          addLog(`${attacker.name} ha recuperato energia!`);
      }

      // Gestione Recoil (se presente in result)
      if (res.recoil && res.recoil > 0) {
          attacker.currentHp = Math.max(0, attacker.currentHp - res.recoil);
          addLog(`${attacker.name} subisce il contraccolpo!`);
      }

      // Aggiorna Attaccante (PP)
      attacker.moves = attacker.moves.map(m => 
          m.moveId === moveId ? { ...m, pp: Math.max(0, m.pp - 1) } : m
      );

      // 6. Aggiorna UI e Ritorna stato MODIFICATO
      updateStateCallback(nextParty, nextEnemy);
      return { party: nextParty, enemy: nextEnemy };
  };

  const executeTurn = async (playerAction: { type: 'MOVE' | 'ITEM' | 'SWITCH', id: string }) => {
    setBattleMenu('BUSY');

    // Snapshot iniziale dello stato (clonazione locale per accumulare modifiche)
    let workingParty = JSON.parse(JSON.stringify(gameState.party)); // Deep copy safer
    let workingEnemy = JSON.parse(JSON.stringify(gameState.battle!.enemy));
    
    // Funzione locale per aggiornare la UI mantenendo la coerenza con le variabili locali
    const updateUI = (p: PokemonInstance[], e: PokemonInstance) => {
        setGameState(prev => ({
            ...prev,
            party: p,
            battle: { ...prev.battle!, enemy: e }
        }));
    };

    // Identifica Player Attivo
    const playerActiveIndex = workingParty.findIndex((p: PokemonInstance) => p.currentHp > 0);
    if (playerActiveIndex === -1) return; 
    let playerPokemon = workingParty[playerActiveIndex];

    // --- 1. GESTIONE SWITCH (Player) ---
    if (playerAction.type === 'SWITCH') {
        const targetIndex = parseInt(playerAction.id);
        if (!isNaN(targetIndex)) {
            // Swap
            const temp = workingParty[playerActiveIndex];
            // Clear volatiles on switch out
            temp.volatiles = {};
            temp.statStages = { attack: 0, defense: 0, special: 0, speed: 0, accuracy: 0, evasion: 0 };
            
            workingParty[playerActiveIndex] = workingParty[targetIndex];
            workingParty[targetIndex] = temp;
            
            playerPokemon = workingParty[playerActiveIndex]; // Update ref
            updateUI(workingParty, workingEnemy);
            
            addLog(`Vai! ${playerPokemon.name}!`);
            await new Promise(r => setTimeout(r, 1000));
        }
    }

    // --- 2. GESTIONE ITEM (Player) ---
    else if (playerAction.type === 'ITEM') {
        const dbItem = itemDatabase.find(i => i.id === playerAction.id);
        if (dbItem?.category === 'Pokeball') {
             const caught = attemptCapture(playerAction.id); 
             if (caught) return; // Stop if caught
             await new Promise(r => setTimeout(r, 1500));
        } else if (dbItem?.category === 'Medicine') {
             // Basic implementation for In-Battle healing
             if (dbItem.effect?.type === 'heal_hp') {
                 playerPokemon.currentHp = Math.min(playerPokemon.stats.hp, playerPokemon.currentHp + (dbItem.effect.value || 0));
                 consumeItem(playerAction.id);
                 addLog(`Hai usato ${dbItem.name}!`);
                 updateUI(workingParty, workingEnemy);
                 await new Promise(r => setTimeout(r, 1000));
             } else {
                 addLog("Non puoi usare questo oggetto ora.");
                 setBattleMenu('MAIN');
                 return;
             }
        } else {
             addLog("Non puoi usare oggetti in lotta!");
             setBattleMenu('MAIN');
             return;
        }
    }

    // --- 3. SELEZIONE MOSSE ---
    // Enemy AI
    const validEnemyMoves = workingEnemy.moves.filter((m: any) => m.pp > 0);
    const enemyMove = validEnemyMoves.length > 0 
        ? validEnemyMoves[Math.floor(Math.random() * validEnemyMoves.length)]
        : { moveId: 'struggle', pp: 1 };

    // Player Move
    let playerMoveId = '';
    let playerMovePriority = 0;
    let playerSpeed = getEffectiveStat(playerPokemon, 'speed');
    
    if (playerAction.type === 'MOVE') {
        const pMove = playerPokemon.moves.find((m: any) => m.moveId === playerAction.id);
        if (pMove) {
            playerMoveId = pMove.moveId;
            const dbMove = moveDatabase.find(m => m.id === playerMoveId);
            playerMovePriority = dbMove?.priority || 0;
        }
    }

    // --- 4. DETERMINAZIONE ORDINE ---
    let firstAttacker = 'player';
    if (playerAction.type !== 'MOVE') {
        firstAttacker = 'player_action'; // Player ha già agito
    } else {
        const enemySpeed = getEffectiveStat(workingEnemy, 'speed');
        const eMoveData = moveDatabase.find(m => m.id === enemyMove.moveId);
        const enemyPriority = eMoveData?.priority || 0;

        if (playerMovePriority > enemyPriority) firstAttacker = 'player';
        else if (enemyPriority > playerMovePriority) firstAttacker = 'enemy';
        else if (playerSpeed >= enemySpeed) firstAttacker = 'player';
        else firstAttacker = 'enemy';
    }

    // --- 5. ESECUZIONE ---
    
    // A. PRIMO ATTACCO
    if (firstAttacker === 'player') {
        const res = await performAttack(playerPokemon.uniqueId, true, playerMoveId, workingParty, workingEnemy, updateUI);
        workingParty = res.party;
        workingEnemy = res.enemy;
    } else if (firstAttacker === 'enemy') {
        const res = await performAttack(workingEnemy.uniqueId, false, enemyMove.moveId, workingParty, workingEnemy, updateUI);
        workingParty = res.party;
        workingEnemy = res.enemy;
    }

    // CHECK FAINT (Intermedio)
    // Aggiorna ref al player attivo (potrebbe essere cambiato o morto)
    const currentPlayerRef = workingParty.find((p: PokemonInstance) => p.uniqueId === playerPokemon.uniqueId);
    
    if (!currentPlayerRef || currentPlayerRef.currentHp <= 0 || workingEnemy.currentHp <= 0) {
        // Qualcuno è esausto, stop turno
    } else {
        // B. SECONDO ATTACCO
        if (firstAttacker === 'player') {
            // Enemy attacks
            const res = await performAttack(workingEnemy.uniqueId, false, enemyMove.moveId, workingParty, workingEnemy, updateUI);
            workingParty = res.party;
            workingEnemy = res.enemy;
        } else if (firstAttacker === 'enemy' && playerAction.type === 'MOVE') {
            // Player attacks
            const res = await performAttack(currentPlayerRef.uniqueId, true, playerMoveId, workingParty, workingEnemy, updateUI);
            workingParty = res.party;
            workingEnemy = res.enemy;
        } else if (firstAttacker === 'player_action') {
            // Enemy attacks (dopo switch/item)
            const res = await performAttack(workingEnemy.uniqueId, false, enemyMove.moveId, workingParty, workingEnemy, updateUI);
            workingParty = res.party;
            workingEnemy = res.enemy;
        }
    }

    // --- 6. FINE TURNO (Status Damage & Volatiles) ---
    const finalPlayerIndex = workingParty.findIndex((p: PokemonInstance) => p.currentHp > 0); 
    const activePlayer = finalPlayerIndex !== -1 ? workingParty[finalPlayerIndex] : null;
    
    // Helper to apply end turn damage
    const applyEndTurnEffects = (p: PokemonInstance, isPlayer: boolean) => {
        if (p.currentHp <= 0) return p;

        // Status
        if (p.status === 'PSN' || p.status === 'BRN') {
            const dmg = Math.floor(p.stats.hp / 8) || 1;
            p.currentHp = Math.max(0, p.currentHp - dmg);
            addLog(`${p.name} soffre per lo status!`);
        }

        // Leech Seed
        if (p.volatiles && p.volatiles.seeded) {
            const drain = Math.floor(p.stats.hp / 8) || 1;
            p.currentHp = Math.max(0, p.currentHp - drain);
            addLog(`I semi rubano energia a ${p.name}!`);
            
            // Give HP to opponent
            if (isPlayer) {
                // Player is seeded -> Enemy gets HP
                if (workingEnemy.currentHp > 0) {
                    workingEnemy.currentHp = Math.min(workingEnemy.stats.hp, workingEnemy.currentHp + drain);
                }
            } else {
                // Enemy is seeded -> Player gets HP
                if (activePlayer && activePlayer.currentHp > 0) {
                    activePlayer.currentHp = Math.min(activePlayer.stats.hp, activePlayer.currentHp + drain);
                }
            }
        }
        return p;
    };

    if (activePlayer) {
        workingParty[finalPlayerIndex] = applyEndTurnEffects(activePlayer, true);
    }
    if (workingEnemy.currentHp > 0) {
        workingEnemy = applyEndTurnEffects(workingEnemy, false);
    }

    // Aggiornamento finale UI
    updateUI(workingParty, workingEnemy);

    // --- 7. CHECK WIN/LOSS FINALE ---
    setTimeout(() => {
        setGameState(currentState => {
            // Usa currentState per sicurezza React, ma la logica hp <= 0 è basata su visual
            const currentEnemy = currentState.battle?.enemy;
            // CRUCIAL FIX: Check for living player pokemon properly
            const activePlayer = currentState.party.find(p => p.currentHp > 0);
            
            if (!currentEnemy) return currentState;

            // --- WIN CONDITION ---
            if (currentEnemy.currentHp <= 0) {
                // Double KO Check: If enemy is dead but I am also dead (Recoil/Poison/Explosion), it's a loss (or draw -> loss).
                if (!activePlayer) {
                     addLog(`Tutti i Pokémon sono esausti!`);
                     addLog(`Hai perso...`);
                     return {
                        ...currentState,
                        mode: 'EXPLORE',
                        battle: undefined,
                        gauntlet: undefined, // Reset gauntlet on loss
                        player: { 
                            ...currentState.player, 
                            money: Math.floor(currentState.player.money / 2),
                            position: { ...currentState.player.position, mapId: currentState.player.lastHealPoint || 'pallet_town' }
                        },
                        party: currentState.party.map(p => ({ ...p, currentHp: p.stats.hp, status: 'OK', volatiles: {} }))
                     };
                }

                addLog(`${currentEnemy.name} è esausto!`);
                const xp = calculateExpGain(currentEnemy, currentState.battle!.isTrainer);
                addLog(`Ottieni ${xp} Punti Exp!`);
                
                let winner = { ...currentState.party.find(p => p.currentHp > 0)! }; 
                if (!winner) winner = currentState.party[0]; // Fallback

                // LEVEL UP LOGIC WITH RANGE CHECK
                const oldLevel = winner.level;
                winner.exp += xp;
                let leveledUp = false;
                let lvlStats: LevelUpStats | undefined = undefined;

                while (winner.exp >= Math.pow(winner.level + 1, 3)) {
                    winner.level++;
                    leveledUp = true;
                }

                if (leveledUp) {
                    const baseData = pokemonList.find(p => p.id === winner.baseId);
                    if (baseData) {
                        // Calc stats diff
                        const newStats = calculateStats(baseData.baseStats, winner.level);
                        const previousStats = calculateStats(baseData.baseStats, oldLevel);

                        lvlStats = {
                            uniqueId: winner.uniqueId,
                            name: winner.name,
                            level: winner.level,
                            fromLevel: oldLevel, // IMPORTANT: Store where we came from
                            currentStats: newStats,
                            statsDiff: {
                                hp: newStats.hp - previousStats.hp,
                                attack: newStats.attack - previousStats.attack,
                                defense: newStats.defense - previousStats.defense,
                                special: newStats.special - previousStats.special,
                                speed: newStats.speed - previousStats.speed
                            }
                        };

                        winner.stats = newStats;
                        winner.currentHp += (newStats.hp - previousStats.hp);
                        addLog(`${winner.name} è salito al L.${winner.level}!`);
                    }
                }

                const newParty = currentState.party.map(p => p.uniqueId === winner.uniqueId ? winner : p);

                if (leveledUp && lvlStats) {
                    // STOP HERE: Pause execution flow to show stats
                    return {
                        ...currentState,
                        party: newParty,
                        levelUpStats: lvlStats,
                        waitingForLevelUpInput: true, 
                    };
                }

                // If no level up, proceed immediately
                return handleBattleEnd(currentState, newParty, winner, oldLevel);
            }

            // --- LOSS CONDITION ---
            // If we are here, Enemy HP > 0.
            // If activePlayer is undefined, it means ALL my pokemon are fainted.
            if (!activePlayer) {
                addLog(`Hai perso...`);
                return {
                    ...currentState,
                    mode: 'EXPLORE',
                    battle: undefined,
                    gauntlet: undefined, // Clear gauntlet state
                    player: { 
                        ...currentState.player, 
                        money: Math.floor(currentState.player.money / 2),
                        position: { ...currentState.player.position, mapId: currentState.player.lastHealPoint || 'pallet_town' }
                    },
                    party: currentState.party.map(p => ({ ...p, currentHp: p.stats.hp, status: 'OK', volatiles: {} }))
                };
            }

            return { ...currentState, battleMenu: 'MAIN' };
        });
    }, 2500);
  };

  // Helper function to handle Battle End (Trainer Switch, Move Learn, etc.)
  const handleBattleEnd = (currentState: GameState, newParty: PokemonInstance[], winner: PokemonInstance, oldLevel: number): GameState => {
      let newFlags = { ...currentState.flags }; // CLONE FLAGS FOR SYNCHRONOUS UPDATE
      let newMoney = currentState.player.money;
      let nextMode = currentState.mode;
      let pendingMove = undefined;
      let pendingEvo = undefined;

      // --- 1. CHECK MOVE LEARNING (PRIORITY OVER TRAINER SWITCH) ---
      // We must apply moves to 'newParty' BEFORE the next trainer pokemon appears
      const baseData = pokemonList.find(p => p.id === winner.baseId);
      if (baseData) {
          // Check all levels from oldLevel + 1 to current level
          for (let l = oldLevel + 1; l <= winner.level; l++) {
              const learnableMoves = baseData.learnset.filter(m => m.level === l);
              for (const lm of learnableMoves) {
                  if (!winner.moves.some(m => m.moveId === lm.moveId)) {
                      if (winner.moves.length < 4) {
                          const moveData = moveDatabase.find(x => x.id === lm.moveId);
                          if(moveData) {
                              winner.moves.push({ moveId: lm.moveId, pp: moveData.pp, maxPp: moveData.maxPp || moveData.pp });
                              addLog(`${winner.name} ha imparato ${moveData.name}!`);
                          }
                      } else {
                          // Move Slot Full: Store pending move. 
                          // NOTE: In a trainer battle, this will pause the battle flow visually 
                          // but logically we will transition to LEARN_MOVE mode.
                          const moveData = moveDatabase.find(x => x.id === lm.moveId);
                          if (moveData) {
                              if (nextMode !== 'LEARN_MOVE') {
                                  nextMode = 'LEARN_MOVE';
                                  pendingMove = {
                                      pokemonIndex: newParty.findIndex(p => p.uniqueId === winner.uniqueId),
                                      moveId: lm.moveId,
                                      moveName: moveData.name,
                                      source: { type: 'level' }
                                  };
                                  addLog(`${winner.name} vuole imparare ${moveData.name}...`);
                              }
                          }
                      }
                  }
              }
          }
      }

      // --- 2. CHECK EVOLUTION (ONLY IF NOT LEARNING MOVE) ---
      if (nextMode !== 'LEARN_MOVE') {
          if (baseData) {
              const evolution = baseData.evolutions.find(e => e.level && winner.level >= e.level);
              if (evolution) {
                  const nextFormBase = pokemonList.find(p => p.id === evolution.to);
                  if (nextFormBase) {
                      nextMode = 'EVOLUTION';
                      pendingEvo = {
                          pokemonIndex: newParty.findIndex(p => p.uniqueId === winner.uniqueId),
                          fromBaseId: winner.baseId,
                          toBaseId: nextFormBase.id,
                          name: winner.name
                      };
                  }
              }
          }
      }

      // --- 3. TRAINER BATTLE CONTINUATION OR END ---
      if (currentState.battle?.isTrainer) {
          const remaining = currentState.battle.trainerParty || [];
          
          // A. NEXT POKEMON EXISTS
          if (remaining.length > 0) {
              const nextEnemy = remaining[0];
              // Even if we are in LEARN_MOVE or EVOLUTION mode, we set the next battle state
              // The UI will handle the mode overlay.
              if (nextMode === 'BATTLE' || nextMode === currentState.mode) {
                   addLog(`L'allenatore manda in campo ${nextEnemy.name}!`);
              }
              
              return {
                  ...currentState,
                  party: newParty,
                  // If we are learning a move, we preserve the battle state but paused
                  battle: { ...currentState.battle, enemy: nextEnemy, trainerParty: remaining.slice(1) },
                  battleMenu: 'MAIN',
                  levelUpStats: undefined,
                  waitingForLevelUpInput: false,
                  mode: nextMode as any, // Can be LEARN_MOVE or EVOLUTION or stay BATTLE
                  pendingMove: pendingMove,
                  pendingEvolution: pendingEvo
              };
          }
          
          // B. TRAINER DEFEATED (Rewards)
          const money = currentState.battle.enemy.level * 10 + 200; // Formula semplificata
          addLog(`Hai vinto ${money}$!`);
          newMoney += money; 
          
          if (currentState.battle.trainerId) {
              newFlags[`${currentState.battle.trainerId}_defeated`] = true;
              
              // --- BADGE REWARD LOGIC ---
              const BADGE_REWARDS: Record<string, string> = {
                  'leader_brock': 'boulderBadgeObtained',
                  'leader_misty': 'cascadeBadgeObtained',
                  'leader_surge': 'thunderBadgeObtained',
                  'leader_erika': 'rainbowBadgeObtained',
                  'leader_koga': 'soulBadgeObtained',
                  'leader_sabrina': 'marshBadgeObtained',
                  'leader_blaine': 'volcanoBadgeObtained',
                  'leader_giovanni_final': 'earthBadgeObtained'
              };
              
              const badgeFlag = BADGE_REWARDS[currentState.battle.trainerId];
              if (badgeFlag) {
                  newFlags[badgeFlag] = true;
                  // addLog handled in dialogue mostly, but flag is critical
              }
          }
      }

      // Clear volatiles on battle end (Only if battle is truly over)
      if (!currentState.battle?.isTrainer || (currentState.battle.trainerParty || []).length === 0) {
          newParty.forEach(p => p.volatiles = {});
      }

      // Final State Return for Wild Battle or End of Trainer Battle
      // If nextMode was set to LEARN/EVO during trainer battle end, it persists here.
      // If battle ended, mode naturally goes to EXPLORE unless overridden.
      if (nextMode === currentState.mode && !currentState.battle?.isTrainer) {
          nextMode = 'EXPLORE'; 
      }
      if (nextMode === currentState.mode && currentState.battle?.isTrainer) {
          nextMode = 'EXPLORE'; // Trainer defeated -> Explore
      }

      const finalState = {
          ...currentState,
          party: newParty,
          flags: newFlags, 
          player: { ...currentState.player, money: newMoney },
          mode: nextMode as any,
          battle: undefined,
          battleMenu: 'MAIN' as BattleMenuType,
          pendingMove: pendingMove,
          pendingEvolution: pendingEvo,
          levelUpStats: undefined,
          waitingForLevelUpInput: false
      };

      if (nextMode === 'EXPLORE') {
          return checkGauntlet(finalState);
      }
      return finalState;
  };

  const handleInput = (input: 'A' | 'B' | 'START' | 'UP' | 'DOWN' | 'KEYBOARD') => {
    // --- SPECIAL INTERCEPT: LEVEL UP SCREEN ---
    if (gameState.waitingForLevelUpInput && input === 'A') {
        setGameState(prevState => {
            if (!prevState.levelUpStats) return prevState;

            // Find winner using UNIQUE ID to ensure we target the correct instance
            const winner = prevState.party.find(p => p.uniqueId === prevState.levelUpStats?.uniqueId);
            
            if (!winner) {
                // Fallback (should ideally not happen)
                console.error("Winner not found in state during level up callback");
                return { ...prevState, waitingForLevelUpInput: false, levelUpStats: undefined };
            }

            const fromLevel = prevState.levelUpStats.fromLevel;
            return handleBattleEnd(prevState, prevState.party, winner, fromLevel);
        });
        return;
    }

    if (input === 'A') {
        advanceDialogue();
    }

    if (input === 'START') {
      setGameState((prev) => {
        if (prev.mode === 'INTRO' || prev.mode === 'BATTLE' || prev.waitingForLevelUpInput) return prev;
        if (prev.mode === 'EXPLORE') return { ...prev, mode: 'MENU' };
        if (prev.mode === 'MENU') return { ...prev, mode: 'EXPLORE' };
        return prev;
      });
    }
  };

  // 1. setPlayerName
  const setPlayerName = (name: string) => {
    setGameState(prev => ({
      ...prev,
      player: { ...prev.player, name },
      flags: { ...prev.flags, naming_process: false }
    }));
    addLog(`Ciao, ${name}!`);
    setTimeout(() => {
        // Auto-advance intro if in naming step
        if (gameState.mode === 'INTRO' && gameState.flags['intro_step'] === 5) {
             setFlag('intro_step', 6);
             // Trigger next dialogue manually or let user press A. 
             // Providing next text immediately improves flow.
             addLog("Questo è mio nipote. È stato tuo rivale fin da quando eri piccolo.");
             addLog("Ehm... come si chiama lui?");
        }
    }, 1000);
  };

  // 2. changeLocation
  const changeLocation = (mapId: string) => {
    const targetMap = maps[mapId];
    if (!targetMap) {
        console.error(`Map ${mapId} not found`);
        return;
    }
    
    setGameState(prev => ({
      ...prev,
      player: { ...prev.player, position: { mapId, stepCount: 0 } },
      mode: 'EXPLORE',
      menuOptions: undefined
    }));
    addLog(`Sei arrivato a ${targetMap.name}.`);
    
    // --- 1. GESTIONE GAUNTLET (TRAINERS) ---
    // Ripristinato il controllo per avviare il gauntlet all'ingresso
    if (targetMap.trainers && targetMap.trainers.length > 0) {
        const remainingTrainers = targetMap.trainers.filter(t => !gameState.flags[`${t}_defeated`]);
        if (remainingTrainers.length > 0) {
            const firstTrainerId = remainingTrainers[0];
            const firstTrainer = allTrainers.find(t => t.id === firstTrainerId);
            
            if (firstTrainer) {
                // Initialize Gauntlet Mode
                setGameState(prev => ({
                    ...prev,
                    gauntlet: { active: true, queue: remainingTrainers, index: 0 }
                }));
                
                // Ritardo per effetto scenico
                setTimeout(() => {
                    addLog("Un allenatore incrocia il tuo sguardo!");
                    startBattle(firstTrainer, true);
                }, 800);
                
                return; // IMPORTANTE: Interrompe l'esecuzione qui per evitare che partano eventi o wild encounters
            }
        }
    }

    // --- 2. GESTIONE EVENTI (ENTER TRIGGER) ---
    // Check 'enter' events immediately upon arrival
    const enterEvents = targetMap.events?.filter(e => e.trigger === 'enter') || [];
    
    if (enterEvents.length > 0) {
        setTimeout(() => {
            enterEvents.forEach(evt => {
                let conditionMet = true;
                if (evt.conditionFlag) {
                    const flagName = evt.conditionFlag.replace('!', '');
                    const isNegated = evt.conditionFlag.startsWith('!');
                    const flagValue = !!gameState.flags[flagName];
                    conditionMet = isNegated ? !flagValue : !!flagValue;
                }
                
                if (conditionMet) {
                    interactWithEvent(evt.id);
                }
            });
        }, 100);
    } else {
        // --- 3. GESTIONE WILD ENCOUNTER ALL'INGRESSO ---
        // Se non ci sono trainer né eventi, c'è una chance di incontro
        if (targetMap.wildEncounters && targetMap.wildEncounters.length > 0) {
            if (Math.random() < 0.25) { // 25% chance on enter map
                setTimeout(() => {
                    triggerWildEncounter(true, mapId); 
                }, 500); 
            }
        }
    }
  };

  // 3. interactWithEvent
  const interactWithEvent = (eventId: string) => {
      // Create actions object binding current functions
      const actions = {
          addLog,
          setFlag, 
          addItem,
          consumeItem, // Added
          addPokemon,
          healParty,
          startBattle,
          teleport: changeLocation,
          setMenuOptions,
          modifyMoney
      };
      
      handleGameEvent(eventId, gameState, actions);
  };

  // 4. advanceDialogue
  const advanceDialogue = () => {
      if (gameState.mode === 'INTRO') {
          const step = (gameState.flags['intro_step'] as number) || 0;
          
          const nextStep = (s: number, msg: string) => {
              addLog(msg);
              setFlag('intro_step', s);
          };

          if (step === 0) nextStep(1, "Il mio nome è Oak. La gente mi chiama Prof. Pokémon!");
          else if (step === 1) nextStep(2, "Questo mondo è abitato da creature chiamate Pokémon!");
          else if (step === 2) nextStep(3, "Per alcuni i Pokémon sono animali domestici, altri li usano per lottare.");
          else if (step === 3) {
              addLog("Ma prima... dimmi, come ti chiami?");
              setFlag('naming_process', true);
              setFlag('intro_step', 5); // Move to 5 waiting for name
          }
          // Step 5 handled by setPlayerName
          else if (step === 6) { 
              // Dialogo di transizione gestito in setPlayerName o qui se l'utente preme A
              setFlag('intro_step', 7);
          }
          else if (step === 7) nextStep(8, "Ah, sì! Si chiama Gary!");
          else if (step === 8) nextStep(9, gameState.player.name + "! La tua leggenda sta per iniziare!");
          else if (step === 9) nextStep(10, "Ti aspetta un mondo di sogni e avventure! Andiamo!");
          else if (step === 10) {
              // CHANGE LOCATION LOGIC
              setGameState(prev => ({ ...prev, mode: 'EXPLORE' }));
              changeLocation('pallet_town');
              setTimeout(() => {
                  interactWithEvent('oak_lab');
              }, 500);
          }
      }
  };

  // 5. attemptCapture
  const attemptCapture = (ballId: string): boolean => {
      const enemy = gameState.battle?.enemy;
      if (!enemy) return false;
      
      if (gameState.battle?.isTrainer) {
          addLog("Non puoi rubare i Pokémon degli altri!");
          return false; 
      }

      const item = itemDatabase.find(i => i.id === ballId);
      const ballRate = item?.effect?.value || 1;
      
      const maxHp = enemy.stats.hp;
      const curHp = enemy.currentHp;
      const catchRate = pokemonList.find(p => p.id === enemy.baseId)?.catchRate || 45;
      
      let statusBonus = 1;
      if (enemy.status === 'SLP' || enemy.status === 'FRZ') statusBonus = 2.5; 
      else if (enemy.status === 'PAR' || enemy.status === 'PSN' || enemy.status === 'BRN') statusBonus = 1.5;

      const a = (((3 * maxHp - 2 * curHp) * catchRate * ballRate) / (3 * maxHp)) * statusBonus;
      
      addLog(`Lanci ${item?.name || 'Ball'}!`);
      consumeItem(ballId); 

      // Shake check logic
      const b = 1048560 / Math.sqrt(Math.sqrt(16711680 / a));
      let shakes = 0;
      for (let i = 0; i < 4; i++) {
          if (Math.floor(Math.random() * 65535) < b) shakes++;
      }
      
      const caught = (a >= 255) || (shakes === 4);

      if (caught) {
          addLog(`Preso! ${enemy.name} è stato catturato!`);
          const capturedPokemon = { ...enemy, originalTrainer: gameState.player.name };
          
          setGameState(prev => {
              const inParty = prev.party.length < 6;
              const newList = inParty ? [...prev.party, capturedPokemon] : [...prev.party];
              const newBox = inParty ? [...prev.box] : [...prev.box, capturedPokemon];
              
              if (!inParty) addLog(`${enemy.name} inviato al PC.`);
              
              return {
                  ...prev,
                  party: newList,
                  box: newBox,
                  battle: undefined,
                  mode: 'EXPLORE',
                  battleMenu: 'MAIN'
              };
          });
          return true; 
      } else {
          if (shakes === 0) addLog("Oh no! Il Pokémon si è liberato!");
          else if (shakes === 1) addLog("Aah! Sembrava preso!");
          else if (shakes === 2) addLog("Argh! C'eri quasi!");
          else if (shakes === 3) addLog("Maledizione! Era così vicino!");
          return false; 
      }
  };

  return (
    <GameContext.Provider value={{ 
      gameState, setGameState, handleInput, changeLocation, 
      addPokemon, addItem, consumeItem, checkFlag, setFlag, gameLog, addLog,
      interactWithEvent, advanceDialogue, startBattle, triggerWildEncounter, executeTurn, attemptCapture, setPlayerName,
      setMenuOptions, setBattleMenu, modifyMoney, completeEvolution, resolveMoveLearning
    }}>
      {children}
    </GameContext.Provider>
  );
};