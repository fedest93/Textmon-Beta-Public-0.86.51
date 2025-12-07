import { MapData } from '../../types';

export const rockTunnelB1F: MapData = {
  id: 'rock_tunnel_b1f',
  name: 'Rock Tunnel - B1F',
  description: 'Sei nel piano interrato del Tunnel Roccioso. L\'aria è ancora più fredda e umida. Il labirinto di rocce è fitto, e vedi diverse scale che portano sia su che giù.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [
    // Zubat: Onnipresente (Livelli 11-17)
    { pokemonId: 41, minLevel: 11, maxLevel: 17, rate: 45 },
    // Geodude: Comune (Livelli 13-16)
    { pokemonId: 74, minLevel: 13, maxLevel: 16, rate: 20 },
    // Machop: Non comune (Livelli 15-17)
    { pokemonId: 66, minLevel: 15, maxLevel: 17, rate: 15 },
    // Onix: Raro (Livelli 13-15)
    { pokemonId: 95, minLevel: 13, maxLevel: 15, rate: 10 },
    // Graveler: Molto Raro (Livello 17)
    { pokemonId: 75, minLevel: 17, maxLevel: 17, rate: 10 }
  ],
  trainers: [
    // Allenatori sparsi in questo piano
    'hiker_lenny_rt',
    'jr_trainer_f_sofia_rt',
    'hiker_oliver_rt',
    'pokemaniac_winston_rt' // Aggiunto per densità
  ],
  events: [
    {
      id: 'ladder_to_1f_start',
      trigger: 'interact',
      // Logica Engine: "Risali la scala da cui sei sceso." -> Teleport a 'rock_tunnel_1f'
    },
    {
      id: 'ladder_to_1f_end',
      trigger: 'interact',
      // Logica Engine: "Trovi una scala che porta a una nuova sezione del primo piano." -> Teleport a 'rock_tunnel_1f' (con una flag/stato che indica una nuova posizione)
    },
    {
      id: 'path_choice_b1f',
      trigger: 'interact',
      // Logica Engine:
      // "Il tunnel si divide. A ovest senti un'eco, a est vedi una luce fioca."
      // -> Scelta Multipla: [Vai a Ovest, Vai a Est]
      // -> Se Ovest: "Un Hiker ti sfida!" -> Avvia battaglia con 'hiker_lenny_rt'
      // -> Se Est: "Una ragazza si è persa nel buio!" -> Avvia battaglia con 'jr_trainer_f_sofia_rt'
    },
    {
      id: 'dead_end_battle',
      trigger: 'interact',
      // Logica Engine:
      // "Arrivi in un vicolo cieco, ma non sei solo!" -> Avvia battaglia con 'hiker_oliver_rt'
    },
    {
      id: 'hidden_item_escape_rope',
      trigger: 'interact',
      conditionFlag: '!item_rtb1f_rope_taken',
      // Logica Engine: "Incastrata in una crepa, trovi una Fune di Fuga!" -> Add Item 'escape_rope' -> Set flag true
    }
  ]
};