import React from 'react';
import { useGameState } from '../../hooks/useGameState';

const styles = {
  container: {
    backgroundColor: '#F8F8F8',
    height: '100%',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column' as const,
    border: '2px solid #333',
    borderRadius: '5px',
  },
  menuItem: {
    backgroundColor: 'white',
    border: '1px solid #ccc',
    padding: '10px',
    marginBottom: '5px',
    cursor: 'pointer',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  partyPreview: {
    display: 'flex',
    gap: '2px',
  }
};

export const MenuView: React.FC = () => {
  const { gameState, handleInput, addLog } = useGameState();

  const handleSave = () => {
    // Qui implementeremo il salvataggio su localStorage
    localStorage.setItem('pokemonRedSave', JSON.stringify(gameState));
    addLog("Gioco salvato con successo!");
  };

  return (
    <div style={styles.container}>
      <h3 style={{ borderBottom: '2px solid black', paddingBottom: '5px' }}>MENU</h3>
      
      <div style={styles.menuItem} onClick={() => addLog("Apre Squadra (WIP)")}>
        <span>POKÉMON</span>
        <div style={styles.partyPreview}>
          {gameState.party.length}/6
        </div>
      </div>

      <div style={styles.menuItem} onClick={() => addLog("Apre Zaino (WIP)")}>
        <span>ZAINO</span>
      </div>

      <div style={styles.menuItem} onClick={() => addLog(`Badge: ${gameState.player.badges}`)}>
        <span>{gameState.player.name || 'RED'}</span>
      </div>

      <div style={styles.menuItem} onClick={handleSave}>
        <span>SALVA</span>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <button 
          style={{ ...styles.menuItem, width: '100%', backgroundColor: '#eee' }}
          onClick={() => handleInput('START')} // Chiude il menu
        >
          ESCI
        </button>
      </div>
    </div>
  );
};