import React from 'react';
import { useGameState } from '../../hooks/useGameState';
import { maps } from '../../data/maps';

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: '#202020',
    color: '#FFF',
    fontFamily: "'VT323', monospace",
    position: 'relative' as const,
    overflow: 'hidden',
  },
  // Header con nome località (Overlay in alto a sinistra)
  header: {
    position: 'absolute' as const,
    top: '10px',
    left: '10px',
    backgroundColor: 'rgba(0,0,0,0.8)',
    color: '#FFF',
    padding: '4px 8px',
    borderRadius: '4px',
    borderLeft: '4px solid #D05828', // Accento arancione
    zIndex: 10,
    fontSize: '16px',
    textTransform: 'uppercase' as const,
    boxShadow: '2px 2px 0 rgba(0,0,0,0.5)',
  },
  // Descrizione località (Overlay in ALTO A DESTRA)
  descBox: {
    position: 'absolute' as const,
    top: '10px',
    right: '10px',
    width: '180px', // Larghezza fissa per incorniciare
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: '#EEE',
    padding: '6px',
    borderRadius: '4px',
    zIndex: 10,
    fontSize: '12px',
    lineHeight: '1.2',
    textAlign: 'right' as const, // Allineato a destra
    borderRight: '4px solid #28AAFD', // Accento blu
    boxShadow: '-2px 2px 0 rgba(0,0,0,0.5)',
    textShadow: '1px 1px 0 #000',
  },
  // Area visiva del mondo
  worldView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F8FF', 
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 10px 10px',
    position: 'relative' as const,
  },
};

export const MapView: React.FC = () => {
  const { gameState } = useGameState();
  const currentMapId = gameState.player.position.mapId;
  const currentMap = maps[currentMapId];

  if (!currentMap) return <div>Map Error</div>;

  // Logica avanzata per sfondi
  const getBackgroundStyle = (id: string) => {
      // Interni (Case, Lab) - Parquet
      if (id.includes('house') || id.includes('home') || id.includes('lab') || id.includes('school')) {
          return { 
            backgroundColor: '#D0A070', 
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 19px, #A07050 20px)',
            backgroundSize: '20px 100%' 
          };
      }
      // Centri Pokemon / Market - Piastrelle
      if (id.includes('center') || id.includes('mart')) {
          return { 
            backgroundColor: '#F0F0F0', 
            backgroundImage: 'conic-gradient(#E0E0E0 90deg, transparent 90deg)',
            backgroundSize: '40px 40px'
          };
      }
      // Palestre e Grotte
      if (id.includes('gym') || id.includes('mt_moon') || id.includes('tunnel') || id.includes('cave')) {
          return { 
            backgroundColor: '#606060', 
            backgroundImage: 'repeating-linear-gradient(45deg, #505050 25%, transparent 25%, transparent 75%, #505050 75%, #505050), repeating-linear-gradient(45deg, #505050 25%, #606060 25%, #606060 75%, #505050 75%, #505050)',
            backgroundSize: '20px 20px'
          };
      }
      // Percorsi (Erba)
      if (id.includes('route') || id.includes('forest')) {
          return { 
            backgroundColor: '#98D888', 
            backgroundImage: 'radial-gradient(#70A050 15%, transparent 16%)',
            backgroundSize: '16px 16px'
          };
      }
      // Città (Pavimentazione)
      if (id.includes('city') || id.includes('town')) {
          return { 
            backgroundColor: '#D0D0E0', 
            backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(255,255,255,.4) 50%)',
            backgroundSize: '40px 40px'
          };
      }
      return {};
  };

  return (
    <div style={styles.container}>
      {/* 1. Header Location */}
      <div style={styles.header}>
        📍 {currentMap.name}
      </div>

      {/* 2. Description Box (TOP RIGHT) */}
      <div style={styles.descBox}>
        {currentMap.description}
      </div>

      {/* 3. World Graphics */}
      <div style={{...styles.worldView, ...getBackgroundStyle(currentMapId)}}>
        {/* Player Sprite (Red) */}
        <img 
            src="https://play.pokemonshowdown.com/sprites/trainers/red-gen3.png" 
            alt="Player" 
            style={{
                width:'64px', 
                height:'64px', 
                imageRendering:'pixelated',
                filter: 'drop-shadow(0px 4px 2px rgba(0,0,0,0.3))'
            }}
        />
      </div>
    </div>
  );
};