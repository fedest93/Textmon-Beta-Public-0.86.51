import React from 'react';
import { GameProvider } from './hooks/useGameState'; // Corretto da GameStateProvider a GameProvider
import { PokedexUI } from './components/game/PokedexUI';

const App: React.FC = () => {
  return (
    <GameProvider>
      <div className="app-container" style={{ 
        backgroundColor: '#222', 
        height: '100vh', 
        width: '100vw',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        margin: 0,
        padding: 0,
        overflow: 'hidden' // Evita scrollbar indesiderate
      }}>
        <PokedexUI />
      </div>
    </GameProvider>
  );
};

export default App;