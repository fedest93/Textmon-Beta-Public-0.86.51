import React, { useState } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { items as itemDatabase } from '../../data/items/items';

// --- STYLES ---
const styles = {
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: '#F8F8F8',
    fontFamily: 'monospace',
    position: 'relative' as const,
    color: '#333',
    boxSizing: 'border-box' as const,
  },
  header: {
    backgroundColor: '#283038',
    color: 'white',
    padding: '5px',
    textAlign: 'center' as const,
    fontWeight: 'bold',
    borderBottom: '2px solid #F8A050',
    fontSize: '12px',
    flexShrink: 0,
  },
  content: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  // Colonna Sinistra: Lista
  itemList: {
    flex: 2,
    overflowY: 'auto' as const,
    borderRight: '2px solid #ccc',
    backgroundColor: '#FFF',
  },
  itemRow: (selected: boolean) => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '6px 8px',
    backgroundColor: selected ? '#F8A050' : 'white', 
    color: selected ? 'white' : 'black',
    cursor: 'pointer',
    borderBottom: '1px solid #eee',
    fontSize: '11px',
  }),
  // Colonna Destra: Info e Azioni
  sidebar: {
    flex: 1.2,
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '5px',
    backgroundColor: '#EEE',
    gap: '5px',
  },
  moneyBox: {
    backgroundColor: 'white',
    border: '1px solid #333',
    borderRadius: '4px',
    padding: '4px',
    textAlign: 'right' as const,
    fontSize: '11px',
    boxShadow: '1px 1px 0 rgba(0,0,0,0.1)',
  },
  moneyLabel: {
    fontSize: '9px',
    color: '#666',
    textAlign: 'left' as const,
    marginBottom: '1px',
  },
  iconPlaceholder: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px dashed #999',
    borderRadius: '4px',
    backgroundColor: 'rgba(0,0,0,0.05)',
    fontSize: '24px',
  },
  buyBtn: {
    padding: '8px',
    backgroundColor: '#48C058',
    color: 'white',
    border: '1px solid #286038',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '11px',
    textTransform: 'uppercase' as const,
    boxShadow: '0 2px 0 #286038',
  },
  closeBtn: {
    padding: '6px',
    backgroundColor: '#D04040',
    color: 'white',
    border: '1px solid #802020',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '10px',
    marginTop: 'auto',
  },
  // Footer: Descrizione
  descriptionBox: {
    height: '60px',
    backgroundColor: '#303030',
    color: 'white',
    padding: '6px',
    fontSize: '10px',
    borderTop: '2px solid #F8A050',
    lineHeight: '1.2',
    flexShrink: 0,
  },
};

interface ShopViewProps {
  itemsForSale: string[]; // Array di ID (es. ['poke_ball', 'potion'])
  onClose: () => void;
}

export const ShopView: React.FC<ShopViewProps> = ({ itemsForSale, onClose }) => {
  const { gameState, setGameState, addItem, addLog, modifyMoney } = useGameState(); // Use modifyMoney
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Recupera i dati completi degli oggetti in vendita dal DB
  const shopItems = itemsForSale
    .map(id => itemDatabase.find(i => i.id === id))
    .filter(i => i !== undefined) as any[];

  const selectedItem = shopItems[selectedIndex];

  const handleBuy = () => {
    if (!selectedItem) return;

    if (gameState.player.money >= selectedItem.price) {
      // 1. Deduci soldi (Using helper for consistency if needed, but direct state update is fine here too since we are in a component)
      // Actually let's use modifyMoney from context if available, otherwise manual update
      if (modifyMoney) {
          modifyMoney(-selectedItem.price);
      } else {
          setGameState(prev => ({
            ...prev,
            player: { ...prev.player, money: prev.player.money - selectedItem.price }
          }));
      }
      
      // 2. Aggiungi oggetto
      addItem(selectedItem.id, 1);
      
      // 3. Feedback (addItem handles log usually? Let's check. Yes addItem logs "Hai ottenuto...")
      // But buying feels better with explicit confirmation sometimes.
      // addLog(`Hai comprato ${selectedItem.name}!`); 
      
    } else {
      addLog("Non hai abbastanza soldi!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>POKÉ MARKET</div>
      
      <div style={styles.content}>
        {/* Lista Oggetti */}
        <div style={styles.itemList}>
          {shopItems.map((item, i) => (
            <div 
              key={item.id} 
              style={styles.itemRow(i === selectedIndex)}
              onClick={() => setSelectedIndex(i)}
            >
              <span>{item.name}</span>
              <span>${item.price}</span>
            </div>
          ))}
        </div>

        {/* Sidebar Info */}
        <div style={styles.sidebar}>
          <div style={styles.moneyBox}>
            <div style={styles.moneyLabel}>I TUOI SOLDI</div>
            <div style={{fontWeight:'bold'}}>${gameState.player.money}</div>
          </div>
          
          <div style={styles.iconPlaceholder}>
            🎁
          </div>

          <button 
            style={{
              ...styles.buyBtn, 
              opacity: (selectedItem && gameState.player.money >= selectedItem.price) ? 1 : 0.5
            }} 
            onClick={handleBuy}
          >
            COMPRA
          </button>
          
          <button style={styles.closeBtn} onClick={onClose}>
            ESCI
          </button>
        </div>
      </div>

      <div style={styles.descriptionBox}>
        {selectedItem ? selectedItem.description : "Benvenuto! Dai un'occhiata alla merce."}
      </div>
    </div>
  );
};