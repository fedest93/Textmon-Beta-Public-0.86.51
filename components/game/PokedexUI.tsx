import React, { useState, useRef, useEffect } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { PcView } from './PcView';
import { MapView } from './MapView';
import { BattleScene, BattleControls } from './BattleView';
import { PartyView } from './PartyView';
import { BagView } from './BagView'; 
import { ShopView } from './ShopView'; 
import { maps } from '../../data/maps';
import { pokemonList } from '../../data/pokemon/pokemon';
import { moves as moveDatabase } from '../../data/moves/moves';

// --- STYLES (CLASSIC RED POKEDEX) ---
const styles = {
  case: {
    width: '100%',
    maxWidth: '480px', // Mobile constraint
    height: '100%',
    maxHeight: '900px',
    backgroundColor: '#DC0A2D', // Pokedex Red
    borderRadius: '15px',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column' as const,
    boxShadow: '0px 10px 20px rgba(0,0,0,0.6)',
    border: '4px solid #8B0000', // Dark Red Border
    position: 'relative' as const,
    userSelect: 'none' as const,
    overflow: 'hidden',
    boxSizing: 'border-box' as const,
  },
  // TOP LIGHTS
  topBar: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '8px',
    paddingBottom: '8px',
    borderBottom: '4px solid #8B0000',
    boxShadow: '0 4px 4px rgba(0,0,0,0.1)',
    flexShrink: 0,
  },
  bigLight: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#28AAFD', // Blue Light
    border: '4px solid #FFF',
    boxShadow: 'inset 5px 5px 15px rgba(255,255,255,0.5), 2px 2px 5px rgba(0,0,0,0.5)',
    marginRight: '15px',
  },
  smallLightsContainer: {
    display: 'flex',
    gap: '8px',
    paddingTop: '5px'
  },
  smallLight: (color: string) => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: color,
    border: '1px solid rgba(0,0,0,0.3)',
    boxShadow: 'inset 2px 2px 2px rgba(255,255,255,0.5)',
  }),
  // SCREEN AREA (MAIN LCD)
  screenBezel: {
    flex: 1, // Main screen takes available space
    backgroundColor: '#DEDEDE', // Grey bezel
    borderRadius: '10px 10px 30px 10px', // Iconic shape
    padding: '10px', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '3px solid #8B0000',
    marginBottom: '8px',
    boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.2)',
    position: 'relative' as const,
    minHeight: '0', 
    overflow: 'hidden'
  },
  lcd: {
    width: '100%',
    height: '100%',
    backgroundColor: '#222', 
    borderRadius: '4px',
    border: '2px solid #555',
    overflow: 'hidden',
    position: 'relative' as const,
    imageRendering: 'pixelated' as const,
    fontFamily: "'VT323', monospace",
    display: 'flex',
    flexDirection: 'column' as const,
  },
  // RPG TEXT BOX (OVERLAY IN TOP SCREEN)
  rpgTextBox: {
    position: 'absolute' as const,
    bottom: '10px',
    left: '10px',
    right: '10px',
    minHeight: '60px',
    backgroundColor: 'rgba(0, 0, 0, 0.57)', 
    border: '2px solid #FFF',
    borderRadius: '4px',
    padding: '8px',
    color: '#FFF',
    fontSize: '16px',
    lineHeight: '1.2',
    boxShadow: '0 4px 4px rgba(0,0,0,0.5)',
    zIndex: 100,
    textShadow: '1px 1px 0 #000',
    display: 'flex',
    alignItems: 'center',
    maskImage: 'linear-gradient(to right, black 85%, rgba(0,0,0,0.3) 100%)',
    WebkitMaskImage: 'linear-gradient(to right, black 85%, rgba(0,0,0,0.3) 100%)' 
  },
  // LOWER SCREEN (CHOICES & BUTTONS)
  lowerScreen: {
    height: '180px', // Spacious for buttons
    backgroundColor: '#232323', // Dark background
    border: '3px solid #8B0000',
    borderRadius: '6px',
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'column' as const,
    boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.5)',
    fontFamily: "'VT323', monospace",
    color: '#E0E0E0',
    fontSize: '18px',
    position: 'relative' as const,
    flexShrink: 0,
    overflow: 'hidden'
  },
  // CONTROLS ROW
  controlsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end', 
    padding: '0 5px 5px 5px',
    height: '70px',
    flexShrink: 0,
  },
  // BUTTONS
  keyboardBtn: (active: boolean) => ({
    width: '70px',
    height: '35px',
    backgroundColor: '#222',
    border: active ? '2px solid #0F0' : '2px solid #000',
    borderRadius: '4px',
    color: active ? '#0F0' : '#555',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '10px',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: '2px 2px 0 #000',
    textAlign: 'center' as const,
  }),
  rightControls: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-end',
    gap: '8px',
  },
  btnA: {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    backgroundColor: '#333', 
    border: '2px solid #111',
    boxShadow: '3px 3px 5px rgba(0,0,0,0.5)',
    color: '#DDD',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStart: {
    width: '50px',
    height: '18px',
    borderRadius: '10px',
    backgroundColor: '#333',
    border: '2px solid #111',
    color: '#DDD',
    fontSize: '9px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    letterSpacing: '1px',
    boxShadow: '2px 2px 2px rgba(0,0,0,0.5)',
  },
  menuBtn: {
    backgroundColor: '#E0E0E0',
    border: '2px solid #555',
    borderRadius: '5px',
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#222',
    cursor: 'pointer',
    textAlign: 'center' as const,
    boxShadow: '2px 2px 0 #000',
    textTransform: 'uppercase' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    minHeight: '40px',
    lineHeight: '1.1'
  },
  moveLearnBtn: {
    backgroundColor: '#FFF',
    border: '1px solid #CCC',
    borderRadius: '4px',
    padding: '6px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#222',
    cursor: 'pointer',
    textAlign: 'left' as const,
    display: 'flex',
    flexDirection: 'column' as const,
  },
  hiddenInput: {
    position: 'absolute' as const,
    opacity: 0,
    top: 0,
    left: 0,
    height: '1px',
    width: '1px',
    pointerEvents: 'none' as const,
  },
  // Badges
  badgeContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '5px',
    backgroundColor: '#333',
    borderRight: '2px solid #555',
    width: '40px'
  },
  badge: (active: boolean, color: string) => ({
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: active ? color : '#222',
    border: active ? '2px solid white' : '1px solid #555',
    marginBottom: '4px',
    boxShadow: active ? `0 0 5px ${color}` : 'none'
  })
};

export const PokedexUI: React.FC = () => {
  const { gameState, handleInput, setPlayerName, interactWithEvent, gameLog, changeLocation, triggerWildEncounter, completeEvolution, resolveMoveLearning, addLog } = useGameState();
  
  const [showParty, setShowParty] = useState(false);
  const [showBag, setShowBag] = useState(false);
  
  // Animation State for Evolution
  const [evoPhase, setEvoPhase] = useState<'IDLE' | 'ANIMATING' | 'DONE'>('IDLE');
  const [evoSpriteToggle, setEvoSpriteToggle] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const [tempName, setTempName] = useState("");

  const lastLog = gameLog.length > 0 ? gameLog[gameLog.length - 1] : "";

  const handleKeyboardClick = () => {
    if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.click();
    }
  };

  const handleNameSubmit = () => {
      if (tempName.trim().length > 0) {
        setPlayerName(tempName);
        setTempName("");
      }
  };

  // Evolution Animation Logic
  useEffect(() => {
      if (gameState.mode === 'EVOLUTION' && evoPhase === 'IDLE') {
          setEvoPhase('ANIMATING');
          let count = 0;
          const maxFlicker = 20; 
          
          const interval = setInterval(() => {
              setEvoSpriteToggle(prev => !prev);
              count++;
              
              if (count >= maxFlicker) {
                  clearInterval(interval);
                  setEvoPhase('DONE');
              }
          }, 200); 
          
          return () => clearInterval(interval);
      }
      if (gameState.mode !== 'EVOLUTION') {
          setEvoPhase('IDLE');
      }
  }, [gameState.mode]);

  // --- MOVEMENT GUARD ---
  // Questa funzione è il "Vero Blocco". Intercetta ogni tentativo di movimento.
  const attemptMove = (targetMapId: string, direction: string) => {
      const currentMapId = gameState.player.position.mapId;
      const flags = gameState.flags;
      const inventory = gameState.player.inventory;
      const hasItem = (id: string) => inventory.items.some(i => i.itemId === id) || inventory.keyItems.includes(id);
      const hasBadge = (flag: string) => !!flags[flag];

      // 0. BLOCCO PALLET TOWN (Inizio gioco - Oak ti ferma)
      if (currentMapId === 'pallet_town' && direction === 'north') {
          if (!flags['starterChosen']) {
              addLog("Oak: 'Ehi! Aspetta! Non andare nell'erba alta senza un Pokémon!'");
              return; 
          }
      }

      // 1. BLOCCO SMERALDOPOLI NORD (Anziano / Pacco Oak)
      if (currentMapId === 'viridian_city' && direction === 'north') {
          if (!flags['pokedexObtained']) {
              addLog("Anziano: 'Sei di fretta? Aspetta un attimo! Non puoi passare di qui!' (Devi portare il Pacco a Oak!)");
              return; // BLOCCO FISICO
          }
      }

      // 2. BLOCCO PLUMBEOPOLI EST (Verso Route 3 - Medaglia Sasso)
      if (currentMapId === 'pewter_city' && direction === 'east') {
          if (!flags['boulderBadgeObtained']) {
              addLog("Giovane: 'Ehi campione! Non puoi passare di qui se non hai battuto Brock!'");
              return; // BLOCCO FISICO
          }
      }

      // 3. BLOCCO GRADONI (Route 4 a ritroso)
      if (currentMapId === 'route_4' && direction === 'west') {
          addLog("I gradoni sono troppo alti per tornare indietro!");
          return;
      }

      // 4. BLOCCO CELESTOPOLI NORD (Ponte Pepita - Rivale)
      if (currentMapId === 'cerulean_city' && direction === 'north') {
          // Se non hai battuto il rivale (Gary), lui ti blocca
          if (!flags['rival_3_cerulean_defeated']) {
              addLog("Gary è sul ponte! Devi batterlo per passare.");
              return;
          }
      }

      // 5. BLOCCO CELESTOPOLI EST (Route 9 - Taglio & Medaglia Cascata)
      // La Medaglia Cascata abilita Taglio fuori dalla lotta in Gen 1/3
      if (currentMapId === 'cerulean_city' && direction === 'east') {
          if (!hasItem('hm01') || !flags['cascadeBadgeObtained']) {
              addLog("Un alberello blocca il sentiero. Sembra si possa tagliare con la MN01 e la Medaglia Cascata.");
              return;
          }
      }

      // 6. BLOCCO GUARDIE ZAFFERANOPOLI (Tè)
      const saffronGates = ['route_5', 'route_6', 'route_7', 'route_8'];
      if (saffronGates.includes(currentMapId) && targetMapId.includes('saffron')) {
          if (!flags['gave_tea_to_guards']) {
              addLog("Guardia: 'Ho una sete terribile... La strada è chiusa finché non bevo qualcosa!'");
              return;
          }
      }

      // 7. BLOCCO CERULEAN SUD (Casa svaligiata / Poliziotto)
      if (currentMapId === 'cerulean_city' && direction === 'south') {
          // Si può passare solo se Bill è stato aiutato (questo è un modo per forzare la quest di Bill prima di scendere)
          // Nei giochi originali è il poliziotto davanti alla porta.
          if (!flags['bill_helped']) {
              addLog("Agente: 'Indagini in corso. Vietato passare!'");
              return;
          }
      }

      // 8. BLOCCO SNORLAX (Route 12 & 16)
      // Aranciopoli (Route 11) -> Route 12 (Blocco Snorlax)
      if (currentMapId === 'route_11' && direction === 'east') {
          if (!flags['snorlax_12_defeated']) {
              addLog("Uno Snorlax dorme placidamente bloccando la strada.");
              return;
          }
      }
      
      // Route 16 -> Route 17 (Blocco Snorlax + Bici)
      if (currentMapId === 'route_16' && direction === 'west') {
          if (!flags['snorlax_16_defeated']) {
              addLog("Uno Snorlax dorme placidamente bloccando la strada.");
              return;
          }
      }

      // 9. BLOCCO PISTA CICLABILE (Bicicletta Obbligatoria)
      if (targetMapId === 'route_17') {
          if (!hasItem('bicycle')) {
              addLog("Guardia: 'Ehi! Solo le biciclette possono entrare nella Pista Ciclabile!'");
              return;
          }
      }

      // 10. BLOCCO SURF (Routes 19, 20, 21)
      const seaRoutes = ['route_19', 'route_20', 'route_21', 'seafoam_islands'];
      const isSeaTarget = seaRoutes.some(r => targetMapId.includes(r));
      // Se stiamo andando VERSO il mare DA terra
      if (isSeaTarget && !seaRoutes.some(r => currentMapId.includes(r))) {
          if (!hasItem('hm03') || !hasBadge('soulBadgeObtained')) {
              addLog("L'acqua è profonda scura. Ti serve Surf e la Medaglia Anima per navigare!");
              return;
          }
      }

      // 11. BLOCCO VIA VITTORIA (Medaglie)
      if (targetMapId === 'victory_road_1f' && !flags['earthBadgeObtained']) {
          addLog("Guardia: 'Solo gli allenatori con tutte le 8 medaglie possono accedere alla Via Vittoria!'");
          return;
      }

      // 12. BLOCCO S.S. ANNE (Partenza)
      if (targetMapId.includes('ss_anne') && flags['ss_anne_departed']) {
          addLog("La M/N Anna è salpata! Non puoi più salire.");
          return;
      }

      // SE NESSUN BLOCCO -> MUOVI
      changeLocation(targetMapId);
  };

  const getIntroSprite = () => {
    const step = gameState.flags['intro_step'] as number || 0;
    if (step <= 1) return "https://play.pokemonshowdown.com/sprites/trainers/oak-gen3.png";
    if (step <= 3) return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/33.png"; 
    if (step >= 4 && step <= 5) return "https://play.pokemonshowdown.com/sprites/trainers/oak-gen3.png";
    if (step >= 6 && step <= 7) return "https://play.pokemonshowdown.com/sprites/trainers/blue-gen3.png"; // Gary durante la presentazione
    return "https://play.pokemonshowdown.com/sprites/trainers/red-gen3.png";
  };

  const isChoosingStarter = gameState.menuOptions?.some(opt => opt.label === 'BULBASAUR');

  // --- LOGICA SCHERMO SUPERIORE (LCD) ---
  const renderScreenContent = () => {
    if (gameState.flags['pc_active']) return <PcView onClose={() => {/* Logic handled by bottom button */}} />;
    if (showParty) return <PartyView onClose={() => setShowParty(false)} />;
    if (showBag && gameState.mode !== 'BATTLE') return <BagView onClose={() => setShowBag(false)} />;
    
    if (gameState.flags['shop_active']) {
      const viridianShopItems = ['poke_ball', 'potion', 'antidote', 'paralyze_heal'];
      return <ShopView itemsForSale={viridianShopItems} onClose={() => {/* Logic handled by bottom button */}} />;
    }

    switch (gameState.mode) {
      case 'LEARN_MOVE':
          const pendingMove = gameState.pendingMove;
          if (!pendingMove) return <div/>;
          const learningPkmn = gameState.party[pendingMove.pokemonIndex];
          
          return (
            <div style={{ 
                width: '100%', height: '100%', 
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
                backgroundColor: '#303030', 
                color: 'white', textAlign: 'center', padding: '10px'
            }}>
                <img 
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/${learningPkmn.baseId}.png`} 
                    alt="Pkmn"
                    style={{width:'80px', imageRendering:'pixelated', marginBottom:'10px'}} 
                />
                <div style={{fontSize:'14px'}}>
                    Vuole imparare <span style={{color:'#F8A050'}}>{pendingMove.moveName}</span>!
                </div>
                <div style={{fontSize:'12px', marginTop:'5px'}}>
                    Ma conosce già 4 mosse!
                </div>
                <div style={{fontSize:'12px', marginTop:'5px', color:'#AAA'}}>
                    Scegli quale dimenticare.
                </div>
            </div>
          );

      case 'EVOLUTION':
          const pending = gameState.pendingEvolution;
          if (!pending) return <div/>;
          
          const fromSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/${pending.fromBaseId}.png`;
          const toSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/${pending.toBaseId}.png`;
          
          const currentSrc = evoPhase === 'DONE' ? toSrc : (evoSpriteToggle ? toSrc : fromSrc);
          const filterStyle = evoPhase === 'ANIMATING' ? 'grayscale(100%) brightness(1.5)' : 'none';

          return (
            <div style={{ 
                width: '100%', height: '100%', 
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
                backgroundColor: '#222', 
                backgroundImage: 'radial-gradient(circle, #404040 20%, #222 80%)'
            }}>
                <img 
                    src={currentSrc} 
                    alt="Evo"
                    style={{ 
                        width: '120px', 
                        height: '120px', 
                        imageRendering: 'pixelated',
                        filter: filterStyle,
                        transition: 'filter 0.2s'
                    }} 
                />
                <div style={{color:'white', marginTop:'20px', fontFamily:'monospace'}}>
                    {evoPhase === 'DONE' ? "EVOLUZIONE COMPLETATA!" : "Sta accadendo qualcosa..."}
                </div>
            </div>
          );

      case 'INTRO':
        return (
          <div style={{ 
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 50,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
            backgroundColor: '#F0F0F0'
          }}>
            <img 
              src={getIntroSprite()} 
              alt="Intro" 
              style={{ width: '100px', height: 'auto', imageRendering: 'pixelated' }}
            />
            {/* Text Overlay for Intro */}
            <div style={styles.rpgTextBox}>
               {lastLog}
            </div>
          </div>
        );
      case 'BATTLE':
        return <BattleScene />;
      case 'MENU':
      case 'EXPLORE':
      default:
        if (isChoosingStarter) {
            return (
                <div style={{
                    width:'100%', height:'100%', 
                    background: 'linear-gradient(#F8F8F8 70%, #E0E0E0 30%)',
                    display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end',
                    position: 'relative'
                }}>
                    <img 
                        src="https://play.pokemonshowdown.com/sprites/trainers/oak-gen3.png" 
                        alt="Oak"
                        style={{width:'90px', imageRendering:'pixelated', marginBottom:'20px', zIndex: 5}} 
                    />
                    <div style={{display:'flex', gap:'20px', paddingBottom:'40px', zIndex: 10}}>
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" style={{width:'32px', imageRendering:'pixelated'}} alt="ball" />
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" style={{width:'32px', imageRendering:'pixelated'}} alt="ball" />
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" style={{width:'32px', imageRendering:'pixelated'}} alt="ball" />
                    </div>
                    <div style={styles.rpgTextBox}>
                        {lastLog}
                    </div>
                </div>
            );
        }
        return (
            <div style={{width:'100%', height:'100%', position:'relative'}}>
                <MapView />
                <div style={styles.rpgTextBox}>
                    <div style={{marginRight: '20px'}}>{lastLog}</div>
                    <div style={{
                        animation:'blink 1s infinite', 
                        marginLeft:'auto', 
                        color:'yellow', 
                        fontSize: '12px',
                        alignSelf: 'flex-end',
                        marginBottom: '-2px'
                    }}>▼</div>
                </div>
                <style>{`@keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }`}</style>
            </div>
        );
    }
  };

  // --- LOGICA SCHERMO INFERIORE (SOLO BOTTONI) ---
  const renderLowerScreen = () => {
    // 1. Modalità Naming
    if (gameState.flags['naming_process']) {
        return (
            <div style={{textAlign:'center', padding:'10px'}}>
                <div style={{marginBottom:'5px'}}>INSERISCI NOME:</div>
                <div style={{fontSize:'22px', fontWeight:'bold', borderBottom:'2px solid #555', display:'inline-block', minWidth:'150px'}}>
                    {tempName || "___________"}
                </div>
                <div style={{fontSize:'12px', color:'#AAA', marginTop:'5px'}}>Usa la tastiera, poi premi A</div>
            </div>
        );
    }

    // 2. Modalità Apprendimento Mossa
    if (gameState.mode === 'LEARN_MOVE') {
        const pendingMove = gameState.pendingMove;
        const pokemon = pendingMove ? gameState.party[pendingMove.pokemonIndex] : null;
        
        if (!pokemon || !pendingMove) return null;

        return (
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', padding:'4px', width: '100%', height:'100%', overflowY:'auto', boxSizing:'border-box'}}>
                {pokemon.moves.map((m, i) => {
                    const dbMove = moveDatabase.find(x => x.id === m.moveId);
                    return (
                        <button key={i} style={styles.moveLearnBtn} onClick={() => resolveMoveLearning(i)}>
                            <div style={{color:'#333'}}>{dbMove?.name}</div>
                            <div style={{fontSize:'10px', color:'#666'}}>{dbMove?.type} / PP: {m.pp}</div>
                        </button>
                    );
                })}
                <button 
                    style={{...styles.moveLearnBtn, gridColumn: 'span 2', backgroundColor: '#FFDDDD', border:'1px solid #E88'}} 
                    onClick={() => resolveMoveLearning(-1)}
                >
                    NON IMPARARE {pendingMove.moveName.toUpperCase()}
                </button>
            </div>
        );
    }

    // 3. Modalità Evoluzione
    if (gameState.mode === 'EVOLUTION') {
        if (evoPhase === 'DONE') {
            return (
                <div style={{display: 'grid', placeItems: 'center', height: '100%'}}>
                    <button style={styles.menuBtn} onClick={completeEvolution}>
                        CONTINUA
                    </button>
                </div>
            );
        }
        return (
            <div style={{textAlign:'center', color:'#666', marginTop:'40px', fontSize:'14px'}}>
                ...
            </div>
        );
    }

    // 4. Modalità Battaglia (Include il "Level Up" visivo che è un overlay in BattleView)
    if (gameState.mode === 'BATTLE') {
        // Se siamo in attesa di input per il level up, mostriamo comunque "Premi A"
        if (gameState.waitingForLevelUpInput) {
             return (
                <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100%', color:'#888'}}>
                    PREMI A
                </div>
            );
        }
        return <BattleControls />;
    }

    // 5. MENU START
    if (gameState.mode === 'MENU') {
        return (
            <div style={{display:'flex', width:'100%', height:'100%'}}>
                {/* Colonnina Medaglie */}
                <div style={styles.badgeContainer}>
                    <div style={styles.badge(!!gameState.flags['boulderBadgeObtained'], '#909090')} title="Sasso"></div>
                    <div style={styles.badge(!!gameState.flags['cascadeBadgeObtained'], '#30A0F0')} title="Cascata"></div>
                    <div style={styles.badge(!!gameState.flags['thunderBadgeObtained'], '#F0C030')} title="Tuono"></div>
                    <div style={styles.badge(!!gameState.flags['rainbowBadgeObtained'], '#60C060')} title="Arcobaleno"></div>
                    <div style={styles.badge(!!gameState.flags['soulBadgeObtained'], '#C03080')} title="Anima"></div>
                    <div style={styles.badge(!!gameState.flags['marshBadgeObtained'], '#E0C040')} title="Palude"></div>
                    <div style={styles.badge(!!gameState.flags['volcanoBadgeObtained'], '#F05030')} title="Vulcano"></div>
                    <div style={styles.badge(!!gameState.flags['earthBadgeObtained'], '#E0C060')} title="Terra"></div>
                </div>
                
                {/* Opzioni Menu */}
                <div style={{flex:1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', padding:'10px', overflowY:'auto'}}>
                    <button style={styles.menuBtn} onClick={() => setShowParty(true)}>
                        SQUADRA
                    </button>
                    <button style={styles.menuBtn} onClick={() => setShowBag(true)}>
                        ZAINO
                    </button>
                    <button style={styles.menuBtn} onClick={() => addLog("Partita salvata!")}>
                        SALVA
                    </button>
                    <button style={styles.menuBtn} onClick={() => handleInput('START')}>
                        ESCI
                    </button>
                </div>
            </div>
        );
    }

    // 6. MENU SCELTE UNIFICATO
    let optionsToDisplay: { label: string, action: () => void, specialStyle?: any }[] = [];

    if (gameState.menuOptions && gameState.menuOptions.length > 0) {
        optionsToDisplay = gameState.menuOptions.map(opt => ({...opt}));
    } 
    else if (gameState.mode === 'EXPLORE') {
        const currentMap = maps[gameState.player.position.mapId];
        const connections = currentMap?.connections || {};
        const dirs = Object.keys(connections) as (keyof typeof connections)[];
        const hasWildEncounters = currentMap?.wildEncounters && currentMap.wildEncounters.length > 0;

        dirs.forEach(dir => {
            const targetId = connections[dir];
            if (targetId) {
                let icon = '➡️';
                let labelDir = 'VAI A';
                if (dir === 'north') { icon = '⬆️'; labelDir = 'NORD'; }
                if (dir === 'south') { icon = '⬇️'; labelDir = 'SUD'; }
                if (dir === 'west') { icon = '⬅️'; labelDir = 'OVEST'; }
                if (dir === 'east') { icon = '➡️'; labelDir = 'EST'; }

                optionsToDisplay.push({
                    label: `${icon} ${labelDir}`,
                    // USE attemptMove HERE instead of changeLocation
                    action: () => attemptMove(targetId, dir) 
                });
            }
        });

        const hasEvents = currentMap?.events?.filter(e => e.trigger === 'interact') || [];
        hasEvents.forEach(evt => {
            optionsToDisplay.push({
                label: `💬 ${evt.id.replace(/_/g, ' ').toUpperCase()}`,
                action: () => interactWithEvent(evt.id)
            });
        });

        if (hasWildEncounters) {
            optionsToDisplay.push({
                label: `🌿 CERCA POKÉMON`,
                action: () => triggerWildEncounter(),
                specialStyle: { backgroundColor: '#88CC88', border: '2px solid #448844' }
            });
        }
    }

    if (optionsToDisplay.length > 0) {
        return (
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', padding:'10px', width: '100%', height:'100%', overflowY:'auto', boxSizing:'border-box'}}>
                {optionsToDisplay.map((opt, i) => (
                    <button 
                        key={i} 
                        style={opt.specialStyle ? { ...styles.menuBtn, ...opt.specialStyle } : styles.menuBtn} 
                        onClick={opt.action}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
        );
    }

    return (
        <div style={{textAlign:'center', color:'#666', marginTop:'40px', fontSize:'14px'}}>
            NESSUNA AZIONE DISPONIBILE
        </div>
    );
  };

  return (
    <div style={styles.case}>
      <div style={styles.topBar}>
        <div style={styles.bigLight}></div>
        <div style={styles.smallLightsContainer}>
            <div style={styles.smallLight('#CC0000')}></div>
            <div style={styles.smallLight('#F1C40F')}></div>
            <div style={styles.smallLight('#2ECC71')}></div>
        </div>
      </div>
      
      <div style={styles.screenBezel}>
        <div style={styles.lcd}>
            {renderScreenContent()}
        </div>
      </div>

      <div style={styles.lowerScreen}>
          {renderLowerScreen()}
      </div>

      <div style={styles.controlsRow}>
        <div>
            <button 
                style={styles.keyboardBtn(!!gameState.flags['naming_process'])} 
                onClick={handleKeyboardClick}
            >
                KEYBOARD
                <div style={{fontSize:'12px'}}>⌨️</div>
            </button>
            <input 
                ref={inputRef}
                type="text" 
                style={styles.hiddenInput} 
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleNameSubmit();
                }}
            />
        </div>

        <div style={styles.rightControls}>
            <button style={styles.btnA} onClick={() => {
                if (gameState.flags['naming_process']) {
                    handleNameSubmit();
                } else {
                    handleInput('A');
                }
            }}>A</button>
            
            <button style={styles.btnStart} onClick={() => handleInput('START')}>START</button>
        </div>
      </div>
    </div>
  );
};