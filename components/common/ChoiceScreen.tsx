import React from 'react';
import { useGameState } from '../../hooks/useGameState';

export const ChoiceScreen: React.FC = () => {
  const { gameState } = useGameState();

  return (
    <div className="w-full h-32 bg-[#9bbc0f] border-4 border-[#505c1d] rounded-sm shadow-inner p-4 font-mono text-[#0f380f] overflow-y-auto">
        {gameState.mode === 'DIALOGUE' ? (
          <div className="typing-effect">
            <p className="text-lg leading-tight uppercase">
              Welcome to the world of Pokemon! <br/>
              Press 'A' to start.
            </p>
            <div className="animate-bounce mt-2">▼</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 text-lg uppercase">
            {/* Placeholder for menu options */}
            <div className="cursor-pointer hover:before:content-['>'] hover:before:mr-1">Log</div>
            <div className="cursor-pointer hover:before:content-['>'] hover:before:mr-1">Map</div>
            <div className="cursor-pointer hover:before:content-['>'] hover:before:mr-1">Item</div>
            <div className="cursor-pointer hover:before:content-['>'] hover:before:mr-1">Save</div>
          </div>
        )}
    </div>
  );
};