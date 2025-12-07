import { MapData } from '../../types';

export const route17: MapData = {
  id: 'route_17',
  name: 'Route 17 (Cycling Road)',
  description: 'Sei sulla Pista Ciclabile, una lunga e ripida discesa che sovrasta il mare. Il vento ti fischia nelle orecchie mentre sfrecci verso sud. Bande di motociclisti sono qui per sfidare chiunque passi.',
  connections: {
    north: 'route_16',
    south: 'route_18'
  },
  wildEncounters: [], // Nessun incontro selvatico sulla Pista Ciclabile
  trainers: [
    // L'intero gauntlet della Pista Ciclabile
    'biker_jax_cr',
    'biker_jaren_cr',
    'cue_ball_raul_cr',
    'biker_luke_cr',
    'cue_ball_koji_cr',
    'biker_lao_cr',
    'biker_nikolas_cr', // Aggiunti per densità
    'cue_ball_isaiah_cr',
    'biker_william_cr',
    'cue_ball_corey_cr'
  ],
  events: [
    {
      id: 'slope_down',
      trigger: 'enter', // Evento automatico che spinge il giocatore verso sud
      // Logica Engine:
      // "La pendenza ti spinge verso il basso!"
      // (Questo potrebbe essere gestito limitando le opzioni di movimento a solo "SUD" nella UI)
    },
    {
      id: 'item_rare_candy_cr',
      trigger: 'interact',
      conditionFlag: '!item_cr_rare_candy_taken',
      // Logica Engine: "Hai trovato una Caramella Rara!" -> Add Item 'rare_candy' -> Set flag true
    },
    {
      id: 'sign_cycling_road',
      trigger: 'interact',
      // Logica Engine: "CARTELLO: PISTA CICLABILE - Attenzione alla discesa!"
    }
  ]
};