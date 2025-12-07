import React from 'react';
import { useGameState } from '../../hooks/useGameState';
import { MapView } from '../game/MapView';
import { BattleView } from '../game/BattleView';
// MenuView is now integrated into PokedexUI, but kept here if needed as standalone
import { MenuView } from '../game/MenuView'; 

export const LcdScreen: React.FC = () => {
  const { gameState } = useGameState();

  const renderContent = () => {
    switch (gameState.mode) {
      case 'BATTLE':
        return <BattleView />;
      case 'MENU':
        return <MenuView />;
      case 'EXPLORE':
      case 'DIALOGUE':
      case 'INTRO': // Intro is handled by PokedexUI overlay usually, but safe fallback
      case 'EVOLUTION':
      case 'LEARN_MOVE':
        return <MapView />; // MapView is the base layer for these modes in LcdScreen context
      default:
        return <MapView />;
    }
  };

  return (
    <div className="relative w-full aspect-[4/3] bg-[#9bbc0f] border-4 border-[#505c1d] rounded-sm shadow-inner overflow-hidden p-2">
      {/* Scanline effect overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]"></div>
      
      {/* Main Content Area */}
      <div className="relative z-0 h-full w-full text-[#0f380f]">
        {renderContent()}
      </div>
    </div>
  );
};