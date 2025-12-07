import React, { useState, useCallback } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { PokemonInstance } from '../../types';

// --- GEN 3 THEME CONSTANTS ---
const THEME = {
  bg: '#70D0A0', // Sfondo verde chiaro tipico del PC FRLG
  boxBg: '#F8F8F8', // Sfondo bianco/crema del box
  partyBg: '#50A078', // Verde più scuro per la colonna squadra
  slotEmpty: 'rgba(0,0,0,0.1)',
  slotHover: 'rgba(255,255,255,0.5)',
  slotSelected: 'rgba(255,255,0,0.6)', // Evidenziazione selezione
  borderLight: '#A8E0C0',
  borderDark: '#408060',
  textShadow: '1px 1px 0px #306048',
  fontFamily: 'monospace',
};

type ContainerType = 'party' | 'box';

interface SelectionState {
  index: number;
  container: ContainerType;
}

const getPokemonIcon = (pokemon: PokemonInstance) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/${pokemon.baseId}.png`; 
};

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: THEME.bg,
    fontFamily: THEME.fontFamily,
    padding: '10px',
    boxSizing: 'border-box' as const,
    gap: '10px',
    userSelect: 'none' as const,
  },
  columnParty: {
    width: '90px',
    backgroundColor: THEME.partyBg,
    borderRadius: '8px 0 0 8px',
    border: `2px solid ${THEME.borderDark}`,
    borderRight: 'none',
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '10px 5px',
    gap: '10px',
    alignItems: 'center',
    boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.2)',
    overflowY: 'auto' as const, // SCROLLING VERTICALE SQUADRA
    maxHeight: '100%'
  },
  columnBox: {
    flex: 1,
    backgroundColor: THEME.boxBg,
    borderRadius: '0 8px 8px 0',
    border: `2px solid ${THEME.borderDark}`,
    display: 'flex',
    flexDirection: 'column' as const,
    position: 'relative' as const,
    overflow: 'hidden'
  },
  boxHeader: {
    backgroundColor: '#7860E0', 
    color: 'white',
    padding: '5px 10px',
    fontSize: '14px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `2px solid ${THEME.borderDark}`,
    textShadow: '1px 1px 0 #000',
    flexShrink: 0
  },
  boxGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)', 
    gridTemplateRows: 'repeat(5, 1fr)',    
    gap: '4px',
    padding: '10px',
    flex: 1,
    overflow: 'auto' as const, // SCROLLING SIA ORZ CHE VERT BOX
    backgroundImage: 'radial-gradient(#E0E0E0 15%, transparent 16%), radial-gradient(#E0E0E0 15%, transparent 16%)',
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 10px 10px',
  },
  slot: {
    width: '40px',
    height: '40px',
    backgroundColor: THEME.slotEmpty,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer', // Changed to pointer for click
    position: 'relative' as const,
    transition: 'transform 0.1s',
    border: '2px solid transparent',
  },
  slotParty: {
    width: '60px',
    height: '60px',
    borderRadius: '10px',
    backgroundColor: 'rgba(0,0,0,0.2)',
    border: '2px solid #306048',
  },
  pokemonImg: {
    width: '100%',
    height: '100%',
    objectFit: 'contain' as const,
    imageRendering: 'pixelated' as const,
    pointerEvents: 'none' as const,
  },
  instructionBar: {
    position: 'absolute' as const,
    bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: 'white',
    fontSize: '10px',
    padding: '2px 5px',
    textAlign: 'center' as const,
    pointerEvents: 'none' as const,
    zIndex: 10
  }
};

interface PokemonSlotProps {
  pokemon: PokemonInstance | null;
  index: number;
  container: ContainerType;
  isSelected: boolean;
  onClick: (index: number, container: ContainerType) => void;
}

const PokemonSlot: React.FC<PokemonSlotProps> = ({ pokemon, index, container, isSelected, onClick }) => {
  const baseStyle = container === 'party' ? { ...styles.slot, ...styles.slotParty } : styles.slot;
  
  const combinedStyle = {
    ...baseStyle,
    backgroundColor: isSelected 
      ? THEME.slotSelected 
      : (container === 'party' ? 'rgba(0,0,0,0.2)' : THEME.slotEmpty),
    border: isSelected 
      ? '2px solid red' 
      : (container === 'party' ? '2px solid #306048' : '2px solid transparent'),
    transform: isSelected ? 'scale(1.1)' : 'scale(1)',
    opacity: pokemon ? 1 : 0.7,
    boxShadow: isSelected ? '0 0 5px yellow' : 'none'
  };

  return (
    <div
      style={combinedStyle}
      onClick={() => onClick(index, container)}
      title={pokemon ? `${pokemon.name} (L.${pokemon.level})` : 'Slot Vuoto'}
    >
      {pokemon && (
        <>
          <img
            src={getPokemonIcon(pokemon)}
            alt={pokemon.name}
            style={styles.pokemonImg}
          />
          {container === 'party' && (
            <div style={{
              position: 'absolute',
              bottom: '2px',
              right: '4px',
              fontSize: '10px',
              color: 'white',
              textShadow: '1px 1px 0 #000',
              fontWeight: 'bold',
              fontFamily: 'monospace'
            }}>
              Lv.{pokemon.level}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export const PcView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { gameState, setGameState } = useGameState();
  const [selection, setSelection] = useState<SelectionState | null>(null);

  // LOGICA SPOSTAMENTO (CLICK-TO-MOVE per mobile compatibility)
  const handleSlotClick = useCallback((index: number, container: ContainerType) => {
    // 1. Se non ho selezionato nulla
    if (!selection) {
      // Se clicco su uno slot vuoto, non faccio nulla (non posso prendere il nulla)
      const clickedPokemon = container === 'party' ? gameState.party[index] : gameState.box[index];
      if (clickedPokemon) {
        setSelection({ index, container });
      }
      return;
    }

    // 2. Se ho già selezionato qualcosa...
    // Se clicco sullo stesso slot, deseleziono
    if (selection.index === index && selection.container === container) {
      setSelection(null);
      return;
    }

    // ALTRIMENTI: ESEGUI SPOSTAMENTO/SCAMBIO
    setGameState((prev) => {
      const newParty = [...prev.party];
      const newBox = [...prev.box];

      const sourceList = selection.container === 'party' ? newParty : newBox;
      const targetList = container === 'party' ? newParty : newBox;

      // VALIDAZIONE: Non svuotare la squadra (deve restarne almeno 1)
      if (selection.container === 'party' && container === 'box' && newParty.length <= 1) {
        console.warn("Non puoi lasciare la squadra vuota!");
        // Annulla selezione ma non modifica stato
        return prev;
      }

      const sourceItem = sourceList[selection.index];
      
      // LOGICA SCAMBIO vs SPOSTAMENTO
      // Se il target ha un pokemon, scambiamo.
      // Se il target è vuoto (solo nel box può succedere concettualmente, ma l'array ha lunghezza fissa 30, quindi ci sono undefined),
      // In JS array: party è dinamico (length < 6), box è fixed (length 30 con buchi o dinamico?).
      // Nel nostro state: box è array dinamico, party è dinamico.
      // Quindi "index" nel box potrebbe essere out of bounds se clicchiamo su slot vuoto visivo che non esiste nell'array.
      // Ma `PcView` renderizza `Array.from({ length: 30 })`.
      // Se `targetIndex` > length attuale, è un'aggiunta in fondo.
      
      // Gestione semplificata:
      // Rimuovi da source
      // Inserisci in target
      
      // A) Rimuovi
      sourceList.splice(selection.index, 1);

      // B) Inserisci
      // Se targetIndex è dentro i limiti attuali, inseriamo lì (spostando gli altri) o scambiamo?
      // Nei giochi PC: "MOVE" mode scambia se pieno, mette in spazio vuoto se vuoto.
      // Qui array sono liste compatte.
      
      if (container === selection.container) {
          // Stesso contenitore: Spostamento ordine
          if (index >= targetList.length) {
              targetList.push(sourceItem);
          } else {
              // Inserisci e sposta gli altri, o scambia? Scambia è più intuitivo per "organizzare"
              // Ma se voglio inserire tra due?
              // Facciamo insert at index
              targetList.splice(index, 0, sourceItem);
          }
      } else {
          // Contenitore diverso
          if (index >= targetList.length) {
              targetList.push(sourceItem);
          } else {
              targetList.splice(index, 0, sourceItem);
          }
      }

      return {
        ...prev,
        party: newParty,
        box: newBox
      };
    });

    setSelection(null); // Resetta selezione dopo mossa
  }, [gameState.party, gameState.box, selection, setGameState]);

  const boxName = gameState.flags['pc_renamed_to_bill'] ? "PC di Bill" : "PC di ???";

  return (
    <div style={styles.container}>
      <div style={styles.columnParty}>
        <div style={{ fontSize: '10px', fontWeight: 'bold', color: 'white', marginBottom: '5px' }}>SQUADRA</div>
        {Array.from({ length: 6 }).map((_, i) => (
          <PokemonSlot
            key={`party-${i}`}
            index={i}
            container="party"
            pokemon={gameState.party[i] || null}
            isSelected={selection?.container === 'party' && selection.index === i}
            onClick={handleSlotClick}
          />
        ))}
      </div>

      <div style={styles.columnBox}>
        <div style={styles.boxHeader}>
          <span>{boxName}</span>
          <button 
            onClick={onClose}
            style={{background:'red', border:'1px solid darkred', color:'white', fontSize:'10px', padding:'2px 5px', cursor:'pointer'}}
          >
            ESCI
          </button>
        </div>
        
        <div style={styles.boxGrid}>
          {Array.from({ length: 30 }).map((_, i) => (
            <PokemonSlot
              key={`box-${i}`}
              index={i}
              container="box"
              pokemon={gameState.box[i] || null}
              isSelected={selection?.container === 'box' && selection.index === i}
              onClick={handleSlotClick}
            />
          ))}
        </div>
        
        <div style={styles.instructionBar}>
            {selection 
                ? `TOCCA UN ALTRO SLOT PER SPOSTARE ${selection.container === 'party' ? gameState.party[selection.index].name : gameState.box[selection.index].name}`
                : "TOCCA UN POKÉMON PER SELEZIONARLO"
            }
        </div>
      </div>
    </div>
  );
};