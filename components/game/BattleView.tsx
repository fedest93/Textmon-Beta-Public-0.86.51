import React, { useEffect, useRef, useState } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { moves as moveDatabase } from '../../data/moves/moves';
import { BagView } from './BagView';
import { pokemonList } from '../../data/pokemon/pokemon';

// --- STYLES & CONSTANTS ---
const COLORS = {
  hpHigh: '#48C058',
  hpMid: '#F8E030',
  hpLow: '#F85838',
  expBar: '#30A0E0', 
  uiBg: '#F8F8D8',
  uiBorder: '#506860',
  text: '#404040',
};

const getHpColor = (current: number, max: number) => {
  const pct = (current / max) * 100;
  if (pct > 50) return COLORS.hpHigh;
  if (pct > 20) return COLORS.hpMid;
  return COLORS.hpLow;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PAR': return '#F8D030';
    case 'PSN': return '#A040A0';
    case 'BRN': return '#F08030';
    case 'FRZ': return '#98D8D8';
    case 'SLP': return '#888888';
    default: return '#FFF';
  }
};

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    Normal: '#A8A878', Fire: '#F08030', Water: '#6890F0', Grass: '#78C850',
    Electric: '#F8D030', Ice: '#98D8D8', Fighting: '#C03028', Poison: '#A040A0',
    Ground: '#E0C068', Flying: '#A890F0', Psychic: '#F85888', Bug: '#A8B820',
    Rock: '#B8A038', Ghost: '#705898', Dragon: '#7038F8', Steel: '#B8B8D0', Dark: '#705848'
  };
  return colors[type] || '#68A090';
};

// --- BATTLE SCENE (TOP SCREEN - VISUALS + LOG OVERLAY) ---
export const BattleScene: React.FC = () => {
  const { gameState, gameLog } = useGameState();
  const battleState = gameState.battle;
  const logRef = useRef<HTMLDivElement>(null);
  
  const [visualPhase, setVisualPhase] = useState<'TRAINER' | 'POKEMON' | 'BATTLE'>('BATTLE');

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [gameLog]);

  useEffect(() => {
    if (battleState?.flashTrainer) {
        setVisualPhase('TRAINER');
        const timer1 = setTimeout(() => {
            setVisualPhase('POKEMON');
        }, 2500);
        const timer2 = setTimeout(() => {
            setVisualPhase('BATTLE');
        }, 3300);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    } else {
        if (visualPhase === 'TRAINER') setVisualPhase('BATTLE'); 
    }
  }, [battleState?.flashTrainer]);


  if (!battleState || !battleState.enemy) {
      return (
        <div style={{
            width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center',
            backgroundColor: '#222', color: 'white'
        }}>
            In attesa...
        </div>
      );
  }

  const enemy = battleState.enemy;
  const player = gameState.party.find(p => p.currentHp > 0) || gameState.party[0]; // Fallback for display
  const trainerId = battleState.trainerId;

  const enemySpriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/${enemy.baseId}.png`;
  const playerSpriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/back/${player.baseId}.png`;
  
  const getTrainerSprite = (tid: string) => {
      const baseUrl = "https://play.pokemonshowdown.com/sprites/trainers";
      // Simple lookup based on ID substrings
      if (tid.includes('rival') || tid.includes('champion')) return `${baseUrl}/blue-gen3.png`;
      if (tid.includes('giovanni')) return `${baseUrl}/giovanni-gen3.png`;
      if (tid.includes('rocket') || tid.includes('grunt')) return `${baseUrl}/rocketgrunt.png`;
      if (tid.includes('leader_brock')) return `${baseUrl}/brock-gen3.png`;
      if (tid.includes('leader_misty')) return `${baseUrl}/misty-gen3.png`;
      if (tid.includes('leader_surge')) return `${baseUrl}/ltsurge-gen3.png`;
      if (tid.includes('leader_erika')) return `${baseUrl}/erika-gen3.png`;
      if (tid.includes('leader_koga')) return `${baseUrl}/koga-gen3.png`;
      if (tid.includes('leader_sabrina')) return `${baseUrl}/sabrina-gen3.png`;
      if (tid.includes('leader_blaine')) return `${baseUrl}/blaine-gen3.png`;
      if (tid.includes('lorelei')) return `${baseUrl}/lorelei-gen3.png`;
      if (tid.includes('bruno')) return `${baseUrl}/bruno-gen3.png`;
      if (tid.includes('agatha')) return `${baseUrl}/agatha-gen3.png`;
      if (tid.includes('lance')) return `${baseUrl}/lance-gen3.png`;
      
      // Generic Classes
      if (tid.includes('bug_catcher')) return `${baseUrl}/bugcatcher-gen3.png`;
      if (tid.includes('lass')) return `${baseUrl}/lass-gen3.png`;
      if (tid.includes('youngster')) return `${baseUrl}/youngster-gen3.png`;
      if (tid.includes('hiker')) return `${baseUrl}/hiker-gen3.png`;
      if (tid.includes('super_nerd') || tid.includes('burglar')) return `${baseUrl}/supernerd.png`;
      if (tid.includes('camper')) return `${baseUrl}/camper.png`;
      if (tid.includes('picnicker')) return `${baseUrl}/picnicker.png`;
      if (tid.includes('pokemaniac')) return `${baseUrl}/pokemaniac.png`;
      if (tid.includes('gentleman')) return `${baseUrl}/gentleman-gen3.png`;
      if (tid.includes('sailor')) return `${baseUrl}/sailor.png`;
      if (tid.includes('rocker') || tid.includes('tamer')) return `${baseUrl}/rocker.png`;
      if (tid.includes('engineer')) return `${baseUrl}/engineer.png`;
      if (tid.includes('gambler')) return `${baseUrl}/gambler.png`;
      if (tid.includes('beauty')) return `${baseUrl}/beauty-gen3.png`;
      if (tid.includes('psychic')) return `${baseUrl}/psychic-gen3.png`;
      if (tid.includes('blackbelt')) return `${baseUrl}/blackbelt-gen3.png`;
      if (tid.includes('bird_keeper')) return `${baseUrl}/birdkeeper-gen3.png`;
      if (tid.includes('swimmer')) return `${baseUrl}/swimmer-gen3.png`; 
      if (tid.includes('channeler')) return `${baseUrl}/channeler.png`;
      if (tid.includes('scientist')) return `${baseUrl}/scientist-gen3.png`;
      if (tid.includes('cooltrainer')) return `${baseUrl}/cooltrainer-gen3.png`;
      if (tid.includes('juggler')) return `${baseUrl}/juggler.png`;
      if (tid.includes('cue_ball') || tid.includes('biker')) return `${baseUrl}/biker-gen3.png`;
      if (tid.includes('fisherman')) return `${baseUrl}/fisherman-gen3.png`;

      return `${baseUrl}/red-gen3.png`;
  };

  const trainerSpriteUrl = trainerId ? getTrainerSprite(trainerId) : "";

  const renderHpBar = (current: number, max: number) => (
    <div style={{
        width:'100%', height:'6px', backgroundColor:'#303030', 
        borderRadius:'4px', border:'1px solid #FFF', overflow: 'hidden'
    }}>
        <div style={{
            width: `${Math.min(100, (current / max) * 100)}%`,
            height: '100%',
            backgroundColor: getHpColor(current, max),
            transition: 'width 0.5s ease-out'
        }}></div>
    </div>
  );

  // EXP BAR CALCULATION
  const currentLvlExp = Math.pow(player.level, 3);
  const nextLvlExp = Math.pow(player.level + 1, 3);
  const expProgress = player.exp - currentLvlExp;
  const expNeeded = nextLvlExp - currentLvlExp;
  const expPercent = Math.min(100, Math.max(0, (expProgress / expNeeded) * 100));

  return (
    <div style={{
        position: 'relative', width: '100%', height: '100%',
        background: 'linear-gradient(to bottom, #d8f8d8 0%, #70c088 40%, #50a060 100%)',
        fontFamily: "'VT323', monospace", overflow: 'hidden'
    }}>
        <style>{`
            @keyframes trainerPass {
                0% { transform: translateX(-120%); opacity: 0; }
                15% { transform: translateX(-10%); opacity: 1; }
                25% { transform: translateX(0); opacity: 1; }
                75% { transform: translateX(0); opacity: 1; }
                100% { transform: translateX(120%); opacity: 0; }
            }
            @keyframes popIn {
                0% { transform: scale(0); opacity: 0; }
                60% { transform: scale(1.1); opacity: 1; }
                100% { transform: scale(1); opacity: 1; }
            }
            @keyframes slideInHud {
                0% { transform: translateX(-50px); opacity: 0; }
                100% { transform: translateX(0); opacity: 1; }
            }
            @keyframes pulseStatus {
                0% { opacity: 1; }
                50% { opacity: 0.7; }
                100% { opacity: 1; }
            }
            @keyframes blink {
                0% { opacity: 1; }
                50% { opacity: 0.5; }
                100% { opacity: 1; }
            }
        `}</style>

        {visualPhase === 'TRAINER' && trainerId && (
            <div style={{
                position:'absolute', top:0, left:0, right:0, bottom:0,
                display:'flex', alignItems:'center', justifyContent:'center',
                zIndex: 100,
                animation: 'trainerPass 2.5s ease-in-out forwards'
            }}>
                <img 
                    src={trainerSpriteUrl} 
                    alt="Trainer" 
                    style={{width:'240px', imageRendering:'pixelated', filter: 'drop-shadow(5px 5px 5px rgba(0,0,0,0.5))'}} 
                    onError={(e) => e.currentTarget.style.display = 'none'}
                />
            </div>
        )}

        <div style={{
            opacity: visualPhase === 'TRAINER' ? 0 : 1,
            transition: 'opacity 0.2s',
            width: '100%', height: '100%', position: 'relative'
        }}>
            
            {/* ENEMY HUD */}
            <div style={{
                position: 'absolute', top: '15px', left: '10px',
                backgroundColor: COLORS.uiBg,
                border: `2px solid ${COLORS.uiBorder}`,
                borderRadius: '0 8px 8px 0',
                padding: '2px 6px', width: '120px', zIndex: 10,
                boxShadow: '2px 2px 0 rgba(0,0,0,0.2)',
                animation: visualPhase === 'POKEMON' ? 'slideInHud 0.5s ease-out' : 'none'
            }}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'12px', fontWeight:'bold', lineHeight:'1', marginBottom:'2px'}}>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <span style={{color: COLORS.text, marginRight:'4px'}}>{enemy.name}</span>
                        {enemy.status !== 'OK' && (
                            <span style={{
                                backgroundColor: getStatusColor(enemy.status),
                                color: 'white', fontSize: '9px', padding: '0 2px', borderRadius: '2px',
                                animation: 'pulseStatus 1s infinite'
                            }}>{enemy.status}</span>
                        )}
                    </div>
                    <span style={{color: COLORS.text}}>Lv{enemy.level}</span>
                </div>
                {renderHpBar(enemy.currentHp, enemy.stats.hp)}
            </div>

            {/* ENEMY SPRITE */}
            <div style={{
                position:'absolute', top:'115px', right:'30px', zIndex: 4,
                width:'100px', height:'25px', backgroundColor:'rgba(0,0,0,0.3)', 
                borderRadius:'50%', transform:'scaleY(0.5)', 
                animation: visualPhase === 'POKEMON' ? 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none'
            }}></div>

            <div style={{
                position:'absolute', top:'35px', right:'30px', zIndex: 5,
                animation: visualPhase === 'POKEMON' ? 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none'
            }}>
                <img 
                    src={enemySpriteUrl} 
                    alt={enemy.name}
                    style={{
                        width:'100px', height:'100px', 
                        objectFit:'contain', imageRendering:'pixelated',
                    }}
                />
            </div>

            {/* PLAYER SPRITE */}
            <div style={{
                position:'absolute', bottom:'30px', left:'5px', zIndex: 6,
                animation: visualPhase === 'POKEMON' ? 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none'
            }}>
                <img 
                    src={playerSpriteUrl} 
                    alt={player.name}
                    style={{width:'140px', height:'140px', objectFit:'contain', imageRendering:'pixelated'}}
                />
            </div>

            {/* PLAYER HUD */}
            <div style={{
                position: 'absolute', bottom: '50px', right: '10px',
                backgroundColor: COLORS.uiBg,
                border: `2px solid ${COLORS.uiBorder}`,
                borderRadius: '8px 0 0 8px',
                padding: '4px 6px', width: '130px', zIndex: 10,
                boxShadow: '2px 2px 0 rgba(0,0,0,0.2)',
                animation: visualPhase === 'POKEMON' ? 'slideInHud 0.5s ease-out' : 'none'
            }}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'12px', fontWeight:'bold', lineHeight:'1', marginBottom:'2px'}}>
                    <div style={{display:'flex', alignItems:'center'}}>
                        <span style={{color: COLORS.text, marginRight:'4px'}}>{player.name}</span>
                        {player.status !== 'OK' && (
                            <span style={{
                                backgroundColor: getStatusColor(player.status),
                                color: 'white', fontSize: '9px', padding: '0 2px', borderRadius: '2px',
                                animation: 'pulseStatus 1s infinite'
                            }}>{player.status}</span>
                        )}
                    </div>
                    <span style={{color: COLORS.text}}>Lv{player.level}</span>
                </div>
                {renderHpBar(player.currentHp, player.stats.hp)}
                <div style={{textAlign:'right', fontSize:'10px', fontWeight:'bold', color: COLORS.text, marginTop:'1px'}}>
                    {player.currentHp}/{player.stats.hp}
                </div>
                <div style={{width:'100%', height:'2px', backgroundColor:'#AAA', marginTop:'2px'}}>
                    <div style={{width:`${expPercent}%`, height:'100%', backgroundColor: COLORS.expBar}}></div>
                </div>
            </div>

            {/* BATTLE LOG (Normal or Fullscreen Level Up) */}
            <div 
                ref={logRef}
                style={{
                    position: 'absolute', bottom: '0', left: '0', right: '0',
                    height: gameState.levelUpStats ? '100%' : '45px', // Expand full height if leveling up
                    backgroundColor: gameState.levelUpStats ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.75)',
                    color: '#FFF',
                    zIndex: 40,
                    padding: '4px 8px',
                    fontSize: '14px',
                    lineHeight: '1.2',
                    overflowY: 'auto',
                    borderTop: '2px solid rgba(255,255,255,0.4)',
                    textShadow: '1px 1px 0 #000',
                    pointerEvents: 'none', // Allow clicking through normally, but input logic handles 'A'
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: gameState.levelUpStats ? 'center' : 'flex-start',
                    alignItems: gameState.levelUpStats ? 'center' : 'flex-start',
                    transition: 'height 0.2s'
                }}
            >
                {gameState.levelUpStats ? (
                    // LEVEL UP STATS DISPLAY
                    <div style={{width:'80%', textAlign:'center'}}>
                        <div style={{fontSize:'16px', fontWeight:'bold', marginBottom:'10px', color:'#F8E030'}}>
                            {gameState.levelUpStats.name} è salito al L.{gameState.levelUpStats.level}!
                        </div>
                        <div style={{
                            display:'grid', gridTemplateColumns:'1fr 30px', 
                            gap:'4px', backgroundColor:'#333', padding:'10px', borderRadius:'5px',
                            border:'1px solid #666', fontSize:'14px', textAlign:'left'
                        }}>
                            <div>PS</div><div style={{color:'lightgreen'}}>+{gameState.levelUpStats.statsDiff.hp}</div>
                            <div>ATTACCO</div><div style={{color:'lightgreen'}}>+{gameState.levelUpStats.statsDiff.attack}</div>
                            <div>DIFESA</div><div style={{color:'lightgreen'}}>+{gameState.levelUpStats.statsDiff.defense}</div>
                            <div>SPECIALE</div><div style={{color:'lightgreen'}}>+{gameState.levelUpStats.statsDiff.special}</div>
                            <div>VELOCITÀ</div><div style={{color:'lightgreen'}}>+{gameState.levelUpStats.statsDiff.speed}</div>
                        </div>
                        <div style={{marginTop:'15px', color:'yellow', fontSize:'12px', animation:'blink 1s infinite'}}>
                            PREMI A PER CONTINUARE
                        </div>
                    </div>
                ) : (
                    // STANDARD LOG
                    gameLog.slice(-2).map((log, i) => (
                        <div key={i} style={{marginBottom: '2px'}}>{log}</div>
                    ))
                )}
            </div>
        </div>
    </div>
  );
};

// --- BATTLE CONTROLS (BOTTOM SCREEN - PURE INPUT) ---
export const BattleControls: React.FC = () => {
  const { gameState, setBattleMenu, executeTurn, addLog, setGameState } = useGameState();
  const { battleMenu } = gameState;
  
  // Custom view state for Party switching within Battle
  const [internalMode, setInternalMode] = useState<'DEFAULT' | 'PARTY'>('DEFAULT');
  
  const player = gameState.party.find(p => p.currentHp > 0);
  
  // Handling forced switch (if current is fainted but others exist)
  if (!player && gameState.party.some(p => p.currentHp > 0)) {
      // Force Party View if active is dead but team alive
      if (internalMode !== 'PARTY') setInternalMode('PARTY');
  } else if (!player) {
      return <div style={{color:'white', padding:'10px'}}>Errore Squadra</div>;
  }

  // --- PARTY SELECTION VIEW ---
  if (internalMode === 'PARTY') {
      return (
          <div style={{display: 'flex', flexDirection:'column', width: '100%', height: '100%', backgroundColor: '#222', padding:'4px'}}>
              <div style={{color:'white', borderBottom:'1px solid white', marginBottom:'5px', textAlign:'center'}}>
                  SCEGLI POKÉMON
              </div>
              <div style={{flex: 1, overflowY:'auto', display:'flex', flexDirection:'column', gap:'4px'}}>
                  {gameState.party.map((p, i) => {
                      const isFainted = p.currentHp === 0;
                      const isActive = p.uniqueId === player?.uniqueId;
                      return (
                          <div key={i} style={{
                              display:'flex', alignItems:'center', justifyContent:'space-between',
                              backgroundColor: isActive ? '#506070' : '#404040',
                              padding:'5px', borderRadius:'4px',
                              opacity: isFainted ? 0.5 : 1,
                              border: isActive ? '1px solid #F8A050' : '1px solid #333'
                          }}>
                              <div style={{display:'flex', alignItems:'center', gap:'5px'}}>
                                  <img 
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/${p.baseId}.png`} 
                                    style={{width:'30px', height:'30px', imageRendering:'pixelated'}}
                                    alt="icon"
                                  />
                                  <div style={{fontSize:'12px', color:'white'}}>
                                      {p.name} <span style={{fontSize:'10px', color:'#CCC'}}>Lv{p.level}</span>
                                  </div>
                              </div>
                              
                              <div style={{display:'flex', alignItems:'center', gap:'5px'}}>
                                  <div style={{color: isFainted ? 'red' : 'lightgreen', fontSize:'10px'}}>
                                      {p.currentHp}/{p.stats.hp}
                                  </div>
                                  {!isActive && !isFainted && (
                                      <button 
                                          style={{
                                              padding:'2px 6px', fontSize:'10px', fontWeight:'bold', 
                                              backgroundColor:'#F8A050', border:'none', borderRadius:'2px', cursor:'pointer'
                                          }}
                                          onClick={() => {
                                              executeTurn({ type: 'SWITCH', id: i.toString() });
                                              setInternalMode('DEFAULT');
                                              setBattleMenu('MAIN');
                                          }}
                                      >
                                          SCAMBIA
                                      </button>
                                  )}
                              </div>
                          </div>
                      );
                  })}
              </div>
              <button 
                style={{marginTop:'4px', padding:'8px', backgroundColor:'#555', color:'white', border:'none', borderRadius:'4px', fontWeight:'bold', fontSize:'14px'}} 
                onClick={() => {
                    // Prevent closing if current is fainted (must switch)
                    if (player && player.currentHp > 0) {
                        setInternalMode('DEFAULT');
                        setBattleMenu('MAIN');
                    } else {
                        addLog("Devi scegliere un Pokémon!");
                    }
                }}
              >
                  INDIETRO
              </button>
          </div>
      );
  }

  // 1. MAIN MENU
  if (battleMenu === 'MAIN') {
      return (
          <div style={{
              width: '100%', height: '100%', 
              display: 'grid', gridTemplateColumns: '1fr 1fr', 
              gridTemplateRows: '1fr 1fr',
              gap: '4px', padding: '4px', backgroundColor: '#222'
          }}>
              <button style={btnStyle('#F83030')} onClick={() => setBattleMenu('MOVES')}>
                  LOTTA
              </button>
              <button style={btnStyle('#E8A020')} onClick={() => setBattleMenu('BAG')}>
                  ZAINO
              </button>
              <button style={btnStyle('#3090F0')} onClick={() => setInternalMode('PARTY')}>
                  SQUADRA
              </button>
              <button style={btnStyle('#30C040')} onClick={() => {
                  if (gameState.battle?.isTrainer) addLog("Non puoi scappare da un allenatore!");
                  else setGameState(prev => ({...prev, mode: 'EXPLORE', battle: undefined}));
              }}>
                  FUGA
              </button>
          </div>
      );
  }

  // 2. MOVES MENU
  if (battleMenu === 'MOVES') {
      return (
          <div style={{display: 'flex', flexDirection:'column', width: '100%', height: '100%', backgroundColor: '#222', padding:'4px'}}>
              <div style={{flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '4px'}}>
                  {player!.moves.map((m, i) => {
                      const dbMove = moveDatabase.find(x => x.id === m.moveId);
                      const isNoPP = m.pp === 0;
                      return (
                          <button key={i} 
                              disabled={isNoPP}
                              style={{
                                  ...moveBtnStyle(getTypeColor(dbMove?.type || 'Normal')),
                                  opacity: isNoPP ? 0.5 : 1,
                                  cursor: isNoPP ? 'not-allowed' : 'pointer',
                                  backgroundColor: isNoPP ? '#DDD' : '#FFF'
                              }}
                              onClick={() => !isNoPP && executeTurn({ type: 'MOVE', id: m.moveId })}
                          >
                              <div style={{textTransform:'uppercase', marginBottom:'2px'}}>{dbMove?.name}</div>
                              <div style={{fontSize:'10px', opacity:0.8, color: isNoPP ? 'red' : 'inherit'}}>
                                  PP {m.pp}/{m.maxPp || 10}
                              </div>
                              <div style={{fontSize:'10px', position:'absolute', bottom:'2px', right:'4px'}}>{dbMove?.type}</div>
                          </button>
                      );
                  })}
                  {[...Array(4 - player!.moves.length)].map((_, i) => (
                      <div key={`empty-${i}`} style={{backgroundColor:'#333', borderRadius:'4px'}}></div>
                  ))}
              </div>
              <button 
                style={{marginTop:'4px', padding:'8px', backgroundColor:'#555', color:'white', border:'none', borderRadius:'4px', fontWeight:'bold', fontSize:'14px'}} 
                onClick={() => setBattleMenu('MAIN')}
              >
                  INDIETRO
              </button>
          </div>
      );
  }

  // 3. BAG MENU
  if (battleMenu === 'BAG') {
      return <BagView 
        onClose={() => setBattleMenu('MAIN')} 
        onItemUse={(itemId) => executeTurn({ type: 'ITEM', id: itemId })}
      />;
  }

  // 4. BUSY STATE
  return (
      <div style={{
          width: '100%', height: '100%', display: 'flex', 
          alignItems: 'center', justifyContent: 'center',
          backgroundColor: '#111', color: '#FFF', fontSize: '14px',
          fontFamily: "'VT323', monospace", padding: '10px', textAlign: 'center'
      }}>
          ...
      </div>
  );
};

// --- STYLES HELPER ---
const btnStyle = (color: string) => ({
    backgroundColor: '#EEE', 
    border: `4px solid ${color}`, 
    borderRadius: '8px',
    fontWeight: 'bold', fontSize: '20px', 
    cursor: 'pointer',
    color: '#333',
    fontFamily: "'VT323', monospace",
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)'
});

const moveBtnStyle = (color: string) => ({
    backgroundColor: '#FFF', 
    borderLeft: `6px solid ${color}`, 
    borderTop: '1px solid #CCC', borderRight: '1px solid #CCC', borderBottom: '1px solid #CCC',
    borderRadius: '4px',
    textAlign: 'left' as const, fontSize: '14px', fontWeight: 'bold',
    cursor: 'pointer', padding: '6px',
    position: 'relative' as const,
    color: '#222',
    fontFamily: "'VT323', monospace",
});

export const BattleView: React.FC = () => {
    return <BattleScene />;
};