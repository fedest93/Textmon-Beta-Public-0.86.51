import { PokemonType } from '../types';

// Moltiplicatori: 
// 0   = Immune (Non ha effetto)
// 0.5 = Non molto efficace
// 1   = Normale
// 2   = Superefficace

export const typeChart: Record<PokemonType, Record<PokemonType, number>> = {
  Normal:   { Normal: 1, Fire: 1, Water: 1, Grass: 1, Electric: 1, Ice: 1, Fighting: 1, Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 1, Rock: 0.5, Ghost: 0, Dragon: 1, Steel: 0.5, Dark: 1 },
  Fire:     { Normal: 1, Fire: 0.5, Water: 0.5, Grass: 2, Electric: 1, Ice: 2, Fighting: 1, Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 2, Rock: 0.5, Ghost: 1, Dragon: 0.5, Steel: 2, Dark: 1 },
  Water:    { Normal: 1, Fire: 2, Water: 0.5, Grass: 0.5, Electric: 1, Ice: 1, Fighting: 1, Poison: 1, Ground: 2, Flying: 1, Psychic: 1, Bug: 1, Rock: 2, Ghost: 1, Dragon: 0.5, Steel: 1, Dark: 1 },
  Grass:    { Normal: 1, Fire: 0.5, Water: 2, Grass: 0.5, Electric: 1, Ice: 1, Fighting: 1, Poison: 0.5, Ground: 2, Flying: 0.5, Psychic: 1, Bug: 0.5, Rock: 2, Ghost: 1, Dragon: 0.5, Steel: 0.5, Dark: 1 },
  Electric: { Normal: 1, Fire: 1, Water: 2, Grass: 0.5, Electric: 0.5, Ice: 1, Fighting: 1, Poison: 1, Ground: 0, Flying: 2, Psychic: 1, Bug: 1, Rock: 1, Ghost: 1, Dragon: 0.5, Steel: 1, Dark: 1 },
  Ice:      { Normal: 1, Fire: 0.5, Water: 0.5, Grass: 2, Electric: 1, Ice: 0.5, Fighting: 1, Poison: 1, Ground: 2, Flying: 2, Psychic: 1, Bug: 1, Rock: 1, Ghost: 1, Dragon: 2, Steel: 0.5, Dark: 1 },
  Fighting: { Normal: 2, Fire: 1, Water: 1, Grass: 1, Electric: 1, Ice: 2, Fighting: 1, Poison: 0.5, Ground: 1, Flying: 0.5, Psychic: 0.5, Bug: 0.5, Rock: 2, Ghost: 0, Dragon: 1, Steel: 2, Dark: 2 },
  Poison:   { Normal: 1, Fire: 1, Water: 1, Grass: 2, Electric: 1, Ice: 1, Fighting: 1, Poison: 0.5, Ground: 0.5, Flying: 1, Psychic: 1, Bug: 1, Rock: 0.5, Ghost: 0.5, Dragon: 1, Steel: 0, Dark: 1 },
  Ground:   { Normal: 1, Fire: 2, Water: 1, Grass: 0.5, Electric: 2, Ice: 1, Fighting: 1, Poison: 2, Ground: 1, Flying: 0, Psychic: 1, Bug: 0.5, Rock: 2, Ghost: 1, Dragon: 1, Steel: 2, Dark: 1 },
  Flying:   { Normal: 1, Fire: 1, Water: 1, Grass: 2, Electric: 0.5, Ice: 1, Fighting: 2, Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 2, Rock: 0.5, Ghost: 1, Dragon: 1, Steel: 0.5, Dark: 1 },
  Psychic:  { Normal: 1, Fire: 1, Water: 1, Grass: 1, Electric: 1, Ice: 1, Fighting: 2, Poison: 2, Ground: 1, Flying: 1, Psychic: 0.5, Bug: 1, Rock: 1, Ghost: 1, Dragon: 1, Steel: 0.5, Dark: 0 },
  Bug:      { Normal: 1, Fire: 0.5, Water: 1, Grass: 2, Electric: 1, Ice: 1, Fighting: 0.5, Poison: 0.5, Ground: 1, Flying: 0.5, Psychic: 2, Bug: 1, Rock: 1, Ghost: 0.5, Dragon: 1, Steel: 0.5, Dark: 2 },
  Rock:     { Normal: 1, Fire: 2, Water: 1, Grass: 1, Electric: 1, Ice: 2, Fighting: 0.5, Poison: 1, Ground: 0.5, Flying: 2, Psychic: 1, Bug: 2, Rock: 1, Ghost: 1, Dragon: 1, Steel: 0.5, Dark: 1 },
  Ghost:    { Normal: 0, Fire: 1, Water: 1, Grass: 1, Electric: 1, Ice: 1, Fighting: 1, Poison: 1, Ground: 1, Flying: 1, Psychic: 2, Bug: 1, Rock: 1, Ghost: 2, Dragon: 1, Steel: 0.5, Dark: 0.5 },
  Dragon:   { Normal: 1, Fire: 1, Water: 1, Grass: 1, Electric: 1, Ice: 1, Fighting: 1, Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 1, Rock: 1, Ghost: 1, Dragon: 2, Steel: 0.5, Dark: 1 },
  Steel:    { Normal: 1, Fire: 0.5, Water: 0.5, Grass: 1, Electric: 0.5, Ice: 2, Fighting: 1, Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 1, Rock: 2, Ghost: 1, Dragon: 1, Steel: 0.5, Dark: 1 },
  Dark:     { Normal: 1, Fire: 1, Water: 1, Grass: 1, Electric: 1, Ice: 1, Fighting: 0.5, Poison: 1, Ground: 1, Flying: 1, Psychic: 2, Bug: 1, Rock: 1, Ghost: 2, Dragon: 1, Steel: 0.5, Dark: 0.5 },
};

/**
 * Calcola il moltiplicatore di efficacia di una mossa contro un bersaglio.
 * Gestisce automaticamente bersagli con 1 o 2 tipi.
 * 
 * @param moveType Il tipo della mossa attaccante
 * @param targetTypes Array dei tipi del difensore (es. ['Grass', 'Poison'])
 * @returns Il moltiplicatore finale (es. 0, 0.25, 0.5, 1, 2, 4)
 */
export const getEffectiveness = (moveType: PokemonType, targetTypes: PokemonType[]): number => {
  let multiplier = 1;

  targetTypes.forEach(type => {
    if (typeChart[moveType] && typeChart[moveType][type] !== undefined) {
      multiplier *= typeChart[moveType][type];
    }
  });

  return multiplier;
};