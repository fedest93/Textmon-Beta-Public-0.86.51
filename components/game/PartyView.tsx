import React, { useState } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { PokemonInstance } from '../../types';
import { moves as moveDatabase } from '../../data/moves/moves';
import { items as itemDatabase } from '../../data/items/items';
import { pokemonList } from '../../data/pokemon/pokemon';

// --- STYLES ---
const styles = {
  container: {
    display: 'flex',
    height: '100%',
    backgroundColor: '#384850', // Colore sfondo menu FRLG
    color: 'white',
    fontFamily: 'monospace',
    padding: '4px',
    gap: '4px',
    userSelect: 'none' as const,
  },
  leftCol: {
    width: '45%',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
    overflowY: 'auto' as const,
    paddingRight: '2px',
  },
  rightCol: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    borderRadius: '5px',
    color: '#333',
    padding: '8px',
    display: 'flex',
    flexDirection: 'column' as const,
    border: '2px solid #A0A0A0',
    boxShadow: 'inset 1px 1px 5px rgba(0,0,0,0.1)',
  },
  // Slot della lista a sinistra
  partySlot: (selected: boolean, isDragging: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: selected ? '#F8A050' : '#506880', // Arancione attivo, Blu spento
    borderRadius: '15px 5px 5px 15px', // Arrotondato a sinistra come nei giochi
    padding: '4px 8px',
    cursor: 'grab',
    border: selected ? '2px solid #FFF' : '1px solid #304050',
    height: '45px',
    opacity: isDragging ? 0.5 : 1,
    transition: 'background-color 0.2s',
    position: 'relative' as const,
  }),
  miniSprite: {
    width: '40px',
    height: '40px',
    imageRendering: 'pixelated' as const,
    marginRight: '8px',
    marginTop: '-5px', // Leggero offset per centrare visivamente
  },
  slotInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    fontSize: '10px',
    width: '100%',
    lineHeight: '1.2',
  },
  hpBarContainer: {
    width: '100%',
    height: '5px',
    backgroundColor: '#333',
    borderRadius: '3px',
    marginTop: '3px',
    border: '1px solid #222',
    overflow: 'hidden',
  },
  hpFill: (pct: number) => ({
    width: `${pct}%`,
    height: '100%',
    backgroundColor: pct > 50 ? '#00FF00' : pct > 20 ? '#FFFF00' : '#FF0000',
    transition: 'width 0.3s ease-out',
  }),
  heldItemIcon: {
    position: 'absolute' as const,
    bottom: '2px',
    left: '28px',
    fontSize: '10px',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: '50%',
    width: '12px',
    height: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#333',
    border: '1px solid #333'
  },
  // Colonna Dettagli (Destra)
  detailHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid #333',
    paddingBottom: '5px',
    marginBottom: '10px',
  },
  bigSpriteContainer: {
    width: '100%',
    height: '80px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: '5px',
    border: '1px solid #CCC',
    marginBottom: '10px',
  },
  bigSprite: {
    width: '80px',
    height: '80px',
    imageRendering: 'pixelated' as const,
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    fontSize: '10px',
    gap: '4px',
    backgroundColor: '#EEE',
    padding: '5px',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  movesList: {
    marginTop: 'auto',
    borderTop: '2px solid #333',
    paddingTop: '5px',
  },
  moveItem: {
    backgroundColor: '#485868',
    color: 'white',
    padding: '3px 6px',
    marginBottom: '3px',
    borderRadius: '3px',
    fontSize: '9px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeTag: (type: string) => ({
    fontSize: '9px',
    padding: '2px 4px',
    borderRadius: '3px',
    color: 'white',
    backgroundColor: getTypeColor(type),
    marginRight: '2px',
    textTransform: 'uppercase' as const,
  }),
  closeBtn: {
    marginTop: '5px',
    padding: '8px',
    backgroundColor: '#CC0000',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  }
};

// Helper per i colori dei tipi
const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    Normal: '#A8A878', Fire: '#F08030', Water: '#6890F0', Grass: '#78C850',
    Electric: '#F8D030', Ice: '#98D8D8', Fighting: '#C03028', Poison: '#A040A0',
    Ground: '#E0C068', Flying: '#A890F0', Psychic: '#F85888', Bug: '#A8B820',
    Rock: '#B8A038', Ghost: '#705898', Dragon: '#7038F8', Steel: '#B8B8D0', Dark: '#705848'
  };
  return colors[type] || '#68A090';
};

export const PartyView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { gameState, setGameState } = useGameState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const selectedPokemon = gameState.party[selectedIndex];

  // Recupera i dati statici (Tipi) per il Pokémon selezionato
  const selectedBaseData = selectedPokemon 
    ? pokemonList.find(p => p.id === selectedPokemon.baseId) 
    : null;
  
  const heldItemName = selectedPokemon?.heldItem 
    ? itemDatabase.find(i => i.id === selectedPokemon.heldItem)?.name 
    : "Nessuno";

  // --- DRAG & DROP LOGIC ---
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDrop = (targetIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    setGameState(prev => {
      const newParty = [...prev.party];
      // Rimuovi l'elemento trascinato
      const [movedPokemon] = newParty.splice(draggedIndex, 1);
      // Inseriscilo nella nuova posizione
      newParty.splice(targetIndex, 0, movedPokemon);
      
      return { ...prev, party: newParty };
    });
    
    setSelectedIndex(targetIndex); // Mantieni la selezione sul Pokémon spostato
    setDraggedIndex(null);
  };

  return (
    <div style={styles.container}>
      {/* COLONNA SINISTRA: LISTA SQUADRA */}
      <div style={styles.leftCol}>
        {gameState.party.map((pkmn, i) => {
          const hpPct = (pkmn.currentHp / pkmn.stats.hp) * 100;
          return (
            <div
              key={pkmn.uniqueId}
              style={styles.partySlot(i === selectedIndex, i === draggedIndex)}
              onClick={() => setSelectedIndex(i)}
              draggable
              onDragStart={() => handleDragStart(i)}
              onDragOver={(e) => e.preventDefault()} // Necessario per permettere il drop
              onDrop={() => handleDrop(i)}
            >
              <img 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/${pkmn.baseId}.png`} 
                style={styles.miniSprite} 
                alt="icon"
                onError={(e) => e.currentTarget.src = 'https://via.placeholder.com/40'}
              />
              {pkmn.heldItem && <div style={styles.heldItemIcon} title="Tiene strumento">👜</div>}
              <div style={styles.slotInfo}>
                <div style={{display:'flex', justifyContent:'space-between', fontWeight: 'bold'}}>
                  <span>{pkmn.name}</span>
                  <span>Lv.{pkmn.level}</span>
                </div>
                <div style={styles.hpBarContainer}>
                  <div style={styles.hpFill(hpPct)}></div>
                </div>
                <div style={{textAlign:'right', fontSize: '9px', marginTop: '1px'}}>
                  {pkmn.currentHp}/{pkmn.stats.hp}
                </div>
              </div>
            </div>
          );
        })}
        
        <button style={styles.closeBtn} onClick={onClose}>
          INDIETRO
        </button>
      </div>

      {/* COLONNA DESTRA: DETTAGLI */}
      {selectedPokemon && selectedBaseData ? (
        <div style={styles.rightCol}>
          <div style={styles.detailHeader}>
            <div style={{display:'flex'}}>
              {selectedBaseData.types.map(t => (
                <span key={t} style={styles.typeTag(t)}>{t}</span>
              ))}
            </div>
            <span style={{fontSize:'10px', fontWeight:'bold'}}>N.{selectedPokemon.baseId}</span>
          </div>
          
          <div style={styles.bigSpriteContainer}>
            <img 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/${selectedPokemon.baseId}.png`} 
              style={styles.bigSprite} 
              alt="sprite"
              onError={(e) => e.currentTarget.src = 'https://via.placeholder.com/80'}
            />
          </div>

          <div style={styles.statsGrid}>
            <div>PS: <b>{selectedPokemon.currentHp}/{selectedPokemon.stats.hp}</b></div>
            <div>ATK: <b>{selectedPokemon.stats.attack}</b></div>
            <div>DEF: <b>{selectedPokemon.stats.defense}</b></div>
            <div>SPC: <b>{selectedPokemon.stats.special}</b></div>
            <div>SPD: <b>{selectedPokemon.stats.speed}</b></div>
            <div>EXP: <b>{selectedPokemon.exp}</b></div>
          </div>
          
          <div style={{fontSize:'9px', marginBottom:'5px', padding:'2px', backgroundColor:'#DDD', borderRadius:'3px'}}>
              Strumento: <b>{heldItemName}</b>
          </div>

          <div style={styles.movesList}>
            <div style={{fontSize:'10px', fontWeight:'bold', marginBottom:'3px'}}>MOSSE:</div>
            {selectedPokemon.moves.map((m, i) => {
              // Lookup del nome della mossa dal DB
              const moveData = moveDatabase.find(dbMove => dbMove.id === m.moveId);
              const moveName = moveData ? moveData.name : m.moveId;
              const moveType = moveData ? moveData.type : 'Normal';

              return (
                <div key={i} style={styles.moveItem}>
                  <div style={{display:'flex', alignItems:'center'}}>
                    <div style={{width:'8px', height:'8px', backgroundColor: getTypeColor(moveType), borderRadius:'50%', marginRight:'5px'}}></div>
                    <span>{moveName}</span>
                  </div>
                  <span>PP {m.pp}/{m.maxPp || 10}</span>
                </div>
              );
            })}
            {selectedPokemon.moves.length === 0 && <div style={{fontSize:'10px', fontStyle:'italic'}}>Nessuna mossa</div>}
          </div>
        </div>
      ) : (
        <div style={{...styles.rightCol, justifyContent:'center', alignItems:'center'}}>
          <p>Seleziona un Pokémon</p>
        </div>
      )}
    </div>
  );
};