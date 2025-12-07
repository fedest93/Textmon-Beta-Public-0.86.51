import React, { useState } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { items as itemDatabase, Item } from '../../data/items/items';
import { moves as moveDatabase } from '../../data/moves/moves';
import { pokemonList } from '../../data/pokemon/pokemon';

// --- STYLES (FireRed Style) ---
const styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: '#F8F8F0', // Crema chiaro
    fontFamily: 'monospace',
    color: '#333',
    position: 'relative' as const,
    border: '4px solid #405060',
    borderRadius: '4px',
    boxSizing: 'border-box' as const,
  },
  header: {
    backgroundColor: '#405060', // Blu scuro header
    color: 'white',
    padding: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid #F8A050', // Riga arancione
  },
  content: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
  },
  // Colonne
  leftPanel: {
    flex: 1.5,
    display: 'flex',
    flexDirection: 'column' as const,
    borderRight: '1px solid #CCC',
  },
  rightPanel: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E0',
    padding: '10px',
  },
  tabsRow: {
    display: 'flex',
    backgroundColor: '#E0E0D0',
    borderBottom: '1px solid #AAA',
  },
  tab: (active: boolean) => ({
    flex: 1,
    padding: '6px 0',
    textAlign: 'center' as const,
    cursor: 'pointer',
    backgroundColor: active ? '#F8F8F0' : 'transparent',
    color: active ? '#D04040' : '#666',
    fontWeight: 'bold',
    fontSize: '10px',
    borderBottom: active ? '2px solid #D04040' : 'none',
  }),
  listContainer: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: '5px',
  },
  itemRow: (selected: boolean) => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px',
    backgroundColor: selected ? '#D04040' : 'transparent', // Rosso selezione
    color: selected ? 'white' : 'black',
    cursor: 'pointer',
    borderRadius: '3px',
    marginBottom: '2px',
    fontSize: '12px',
    fontWeight: selected ? 'bold' : 'normal',
  }),
  descriptionBox: {
    height: '70px',
    backgroundColor: '#303030',
    color: 'white',
    padding: '8px',
    fontSize: '11px',
    borderTop: '2px solid #F8A050',
    lineHeight: '1.3',
  },
  // Action Menu (Usa/Butta)
  actionMenu: {
    position: 'absolute' as const,
    bottom: '80px',
    left: '50px', // Spostato un po'
    backgroundColor: 'white',
    border: '2px solid #333',
    borderRadius: '5px',
    boxShadow: '3px 3px 0px rgba(0,0,0,0.3)',
    zIndex: 20,
    overflow: 'hidden',
  },
  actionBtn: {
    display: 'block',
    width: '80px',
    padding: '10px',
    backgroundColor: 'white',
    border: 'none',
    borderBottom: '1px solid #eee',
    textAlign: 'left' as const,
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  // Target Selection Overlay
  targetOverlay: {
    position: 'absolute' as const,
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#384850', // Stile Party
    zIndex: 30,
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '10px',
  },
  targetSlot: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    marginBottom: '5px',
    padding: '5px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: '1px solid #ccc',
  },
  closeBtn: {
    backgroundColor: 'transparent',
    color: 'white',
    border: '1px solid white',
    borderRadius: '3px',
    padding: '2px 6px',
    cursor: 'pointer',
    fontSize: '10px',
  }
};

type Category = 'Items' | 'Key' | 'Balls' | 'TMs';

interface BagViewProps {
  onClose: () => void;
  onItemUse?: (itemId: string) => void; // Callback per uso in battaglia
}

export const BagView: React.FC<BagViewProps> = ({ onClose, onItemUse }) => {
  const { gameState, setGameState, addLog, consumeItem } = useGameState();
  const [activeTab, setActiveTab] = useState<Category>('Items');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showActions, setShowActions] = useState(false);
  
  // Stato per la selezione del Pokémon su cui usare l'oggetto (Fuori lotta)
  const [targetSelectionItem, setTargetSelectionItem] = useState<Item | null>(null);
  const [actionType, setActionType] = useState<'USE' | 'GIVE'>('USE');

  // 1. Costruisci l'inventario completo unendo dati dinamici e statici
  const inventoryItems = gameState.player.inventory.items
    .map(invItem => {
      const dbItem = itemDatabase.find(i => i.id === invItem.itemId);
      return dbItem ? { ...dbItem, count: invItem.count } : null;
    })
    .filter(item => item !== null) as (Item & { count: number })[];

  // 2. Filtra per la Tab corrente
  const currentItems = inventoryItems.filter(item => {
    if (activeTab === 'Items') return ['Medicine', 'Misc', 'Stone', 'Battle'].includes(item.category);
    if (activeTab === 'Key') return item.category === 'Key';
    if (activeTab === 'Balls') return item.category === 'Pokeball';
    if (activeTab === 'TMs') return item.category === 'TM';
    return false;
  });

  const selectedItem = currentItems[selectedIndex];

  // --- GESTIONE CLICK "USA" / "DAI" ---
  const handleActionClick = (type: 'USE' | 'GIVE') => {
    if (!selectedItem) return;
    setShowActions(false);
    setActionType(type);

    // SE SIAMO IN BATTAGLIA (onItemUse definito)
    if (onItemUse) {
      if (type === 'GIVE') {
          addLog("Non puoi dare strumenti in battaglia!");
          return;
      }
      if (['Medicine', 'Pokeball', 'Battle'].includes(selectedItem.category)) {
        // Passa l'ID al battle manager per l'esecuzione
        onItemUse(selectedItem.id);
        onClose(); // Chiudi zaino
        return;
      } else {
        addLog("Non puoi usare questo oggetto ora!");
        return;
      }
    }

    // SE SIAMO FUORI LOTTA
    if (type === 'GIVE') {
        if (selectedItem.category === 'Key') {
            addLog("Non puoi dare strumenti base!");
            return;
        }
        setTargetSelectionItem(selectedItem);
        return;
    }

    // TYPE USE
    // A. Strumenti che richiedono un target (Pozioni, Pietre, MT)
    if (['Medicine', 'Stone', 'TM'].includes(selectedItem.category) || selectedItem.effect?.type === 'evolve') {
      setTargetSelectionItem(selectedItem);
      return;
    }

    // B. Strumenti Chiave / Vari
    if (selectedItem.category === 'Key') {
      addLog(`Voce di Oak: "${gameState.player.name}! C'è un tempo e un luogo per ogni cosa!"`);
    } else if (selectedItem.effect?.type === 'repel') {
      addLog(`Hai usato ${selectedItem.name}. (Effetto repellente simulato)`);
      consumeItem(selectedItem.id);
    } else {
      addLog("Non puoi usarlo qui.");
    }
  };

  // --- GESTIONE APPLICAZIONE EFFETTO SU POKEMON (FUORI LOTTA) ---
  const handleApplyItem = (pokemonIndex: number) => {
    if (!targetSelectionItem) return;

    setGameState(prev => {
      const newParty = [...prev.party];
      const pkmn = newParty[pokemonIndex];
      let success = false;
      let consume = false;
      let nextMode = prev.mode;
      let pendingMove = undefined;

      // --- LOGICA "DAI" ---
      if (actionType === 'GIVE') {
          if (pkmn.heldItem) {
              // Swap or fail? For simplicity, swap is complex because we need to add old item back. 
              // Simple: Take old item back to bag, give new item.
              const oldItem = pkmn.heldItem;
              pkmn.heldItem = targetSelectionItem.id;
              
              // Logic to add oldItem back to inventory
              const newInventory = { ...prev.player.inventory };
              const existing = newInventory.items.find(i => i.itemId === oldItem);
              if (existing) existing.count++;
              else newInventory.items.push({ itemId: oldItem, count: 1 });
              
              // Remove gave item
              consume = true;
              
              addLog(`Hai preso ${oldItem} e dato ${targetSelectionItem.name} a ${pkmn.name}.`);
              
              // Apply inventory changes immediately here for swap logic
              const idx = newInventory.items.findIndex(i => i.itemId === targetSelectionItem.id);
              if (idx > -1) {
                 newInventory.items[idx].count--;
                 if (newInventory.items[idx].count <= 0) newInventory.items.splice(idx, 1);
              }
              
              return { ...prev, party: newParty, player: { ...prev.player, inventory: newInventory } };

          } else {
              pkmn.heldItem = targetSelectionItem.id;
              addLog(`${pkmn.name} ora tiene ${targetSelectionItem.name}.`);
              consume = true; // Will trigger standard consumption logic below
              success = true;
          }
      } 
      // --- LOGICA "USA" ---
      else {
          // 1. CURA HP
          if (targetSelectionItem.effect?.type === 'heal_hp') {
            if (pkmn.currentHp < pkmn.stats.hp) {
              const heal = targetSelectionItem.effect.value || 0;
              pkmn.currentHp = Math.min(pkmn.stats.hp, pkmn.currentHp + heal);
              addLog(`${pkmn.name} ha recuperato PS!`);
              success = true;
              consume = true;
            } else {
              addLog("Non avrà alcun effetto.");
            }
          }

          // 2. CURA STATUS
          else if (targetSelectionItem.effect?.type === 'heal_status') {
            const statusToHeal = targetSelectionItem.effect.status;
            if (pkmn.status !== 'OK' && (statusToHeal === 'ALL' || pkmn.status === statusToHeal)) {
              pkmn.status = 'OK';
              addLog(`${pkmn.name} è guarito!`);
              success = true;
              consume = true;
            } else {
              addLog("Non avrà alcun effetto.");
            }
          }

          // 3. REVITALIZZANTE
          else if (targetSelectionItem.effect?.type === 'revive') {
            if (pkmn.currentHp === 0) {
              const healPct = targetSelectionItem.effect.value || 0.5;
              pkmn.currentHp = Math.floor(pkmn.stats.hp * healPct);
              pkmn.status = 'OK';
              addLog(`${pkmn.name} è stato revitalizzato!`);
              success = true;
              consume = true;
            } else {
              addLog("Non avrà alcun effetto.");
            }
          }

          // 4. INSEGNA MOSSA (MT/MN)
          else if (targetSelectionItem.effect?.type === 'teach') {
            const moveId = targetSelectionItem.effect.moveId;
            const moveData = moveDatabase.find(m => m.id === moveId);
            
            // Check compatibility logic (Placeholder: Assume compatible if not implemented in data yet)
            const baseData = pokemonList.find(p => p.id === pkmn.baseId);
            const canLearn = baseData?.tmHM ? baseData.tmHM.includes(targetSelectionItem.id) : true; // Default allow if missing data for now

            if (!moveId || !moveData) {
                addLog("Errore dati mossa.");
            } else if (!canLearn) {
                addLog(`${pkmn.name} non può imparare questa mossa.`);
            } else if (pkmn.moves.some(m => m.moveId === moveId)) {
                addLog(`${pkmn.name} conosce già questa mossa.`);
            } else {
                if (pkmn.moves.length < 4) {
                  // Impara direttamente
                  pkmn.moves.push({ moveId, pp: moveData.pp, maxPp: moveData.pp });
                  addLog(`${pkmn.name} ha imparato ${moveData.name}!`);
                  success = true;
                  consume = true;
                } else {
                  // Modalità sostituzione
                  addLog(`${pkmn.name} vuole imparare ${moveData.name}...`);
                  nextMode = 'LEARN_MOVE';
                  pendingMove = {
                      pokemonIndex: pokemonIndex,
                      moveId: moveId,
                      moveName: moveData.name,
                      source: { type: 'item', itemId: targetSelectionItem.id } as any
                  };
                  // Non consumiamo qui, consumiamo in resolveMoveLearning se successo
                }
            }
          }
      }

      // Handle standard consumption
      if (consume && targetSelectionItem.category !== 'Key') {
           const newInventory = { ...prev.player.inventory };
           const idx = newInventory.items.findIndex(i => i.itemId === targetSelectionItem.id);
           if (idx > -1) {
             newInventory.items[idx].count--;
             if (newInventory.items[idx].count <= 0) newInventory.items.splice(idx, 1);
           }
           return { 
               ...prev, 
               party: newParty, 
               player: { ...prev.player, inventory: newInventory },
               mode: nextMode as any,
               pendingMove: pendingMove
           };
      } else if (pendingMove) {
           return { 
               ...prev, 
               mode: nextMode as any,
               pendingMove: pendingMove
           };
      }

      return success ? { ...prev, party: newParty } : prev;
    });

    // Chiudi il menu target se abbiamo finito l'azione (successo o fallimento immediato)
    // Se entriamo in LEARN_MOVE, la UI cambierà comunque.
    setTargetSelectionItem(null); 
  };

  // --- RENDER: SELEZIONE TARGET ---
  if (targetSelectionItem) {
    return (
      <div style={styles.targetOverlay}>
        <div style={{color:'white', marginBottom:'10px', textAlign:'center'}}>
          {actionType === 'GIVE' ? `Dai ${targetSelectionItem.name} a chi?` : `Usa ${targetSelectionItem.name} su chi?`}
        </div>
        
        <div style={{flex:1, overflowY:'auto'}}>
          {gameState.party.map((p, i) => (
            <div key={i} style={styles.targetSlot} onClick={() => handleApplyItem(i)}>
              <img 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/${p.baseId}.png`} 
                style={{width:'40px', height:'40px', marginRight:'10px', imageRendering:'pixelated'}}
                alt={p.name}
              />
              <div style={{flex:1}}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'12px', fontWeight:'bold'}}>
                  <span>{p.name}</span>
                  <span>Lv.{p.level}</span>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:'5px'}}>
                  <div style={{fontSize:'10px', width:'30px'}}>HP</div>
                  <div style={{flex:1, height:'6px', backgroundColor:'#555', borderRadius:'3px'}}>
                    <div style={{
                      width: `${(p.currentHp / p.stats.hp) * 100}%`,
                      height:'100%',
                      backgroundColor: (p.currentHp / p.stats.hp) > 0.5 ? '#00FF00' : '#FF0000'
                    }}></div>
                  </div>
                  <div style={{fontSize:'10px'}}>{p.currentHp}/{p.stats.hp}</div>
                </div>
                <div style={{fontSize:'10px', color: '#555', display:'flex', justifyContent:'space-between'}}>
                   <span>{p.status !== 'OK' ? p.status : ''}</span>
                   {p.heldItem && <span style={{color:'blue'}}>Ha strum.</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          style={{padding:'10px', backgroundColor:'#D04040', color:'white', border:'none', borderRadius:'5px', fontWeight:'bold', cursor:'pointer'}}
          onClick={() => setTargetSelectionItem(null)}
        >
          ANNULLA
        </button>
      </div>
    );
  }

  // --- RENDER: ZAINO PRINCIPALE ---
  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <span>ZAINO</span>
        <button style={styles.closeBtn} onClick={onClose}>X</button>
      </div>

      <div style={styles.content}>
        <div style={styles.leftPanel}>
            {/* Tabs */}
            <div style={styles.tabsRow}>
                <div style={styles.tab(activeTab === 'Items')} onClick={() => {setActiveTab('Items'); setSelectedIndex(0);}}>STRUM.</div>
                <div style={styles.tab(activeTab === 'Balls')} onClick={() => {setActiveTab('Balls'); setSelectedIndex(0);}}>BALL</div>
                <div style={styles.tab(activeTab === 'TMs')} onClick={() => {setActiveTab('TMs'); setSelectedIndex(0);}}>MT/MN</div>
                <div style={styles.tab(activeTab === 'Key')} onClick={() => {setActiveTab('Key'); setSelectedIndex(0);}}>BASE</div>
            </div>

            {/* Lista Oggetti */}
            <div style={styles.listContainer}>
                {currentItems.length > 0 ? (
                currentItems.map((item, i) => (
                    <div 
                    key={i} 
                    style={styles.itemRow(i === selectedIndex)}
                    onClick={() => { setSelectedIndex(i); setShowActions(true); }}
                    >
                    <span>{item.name}</span>
                    <span>x{item.count}</span>
                    </div>
                ))
                ) : (
                <div style={{padding:'20px', textAlign:'center', color:'#AAA', fontSize:'12px'}}>
                    Tasca vuota
                </div>
                )}
            </div>
        </div>

        {/* Pannello Destro (Immagine) */}
        <div style={styles.rightPanel}>
            <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dream-world/backpack.png" 
                alt="Backpack" 
                style={{width: '60px', height: '60px', opacity: 0.8, filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.3))'}}
            />
        </div>
      </div>

      {/* Descrizione */}
      <div style={styles.descriptionBox}>
        {selectedItem ? selectedItem.description : "Scegli un oggetto."}
      </div>

      {/* Menu Azioni (Popup) */}
      {showActions && selectedItem && (
        <div style={styles.actionMenu}>
          {/* ORDINE INVERTITO */}
          <button style={styles.actionBtn} onClick={() => { setShowActions(false); handleActionClick('GIVE'); }}>DAI</button>
          <button style={styles.actionBtn} onClick={() => { addLog("Non è il momento."); setShowActions(false); }}>BUTTA</button>
          <button style={styles.actionBtn} onClick={() => handleActionClick('USE')}>USA</button>
          <button style={styles.actionBtn} onClick={() => setShowActions(false)}>ESCI</button>
        </div>
      )}
    </div>
  );
};