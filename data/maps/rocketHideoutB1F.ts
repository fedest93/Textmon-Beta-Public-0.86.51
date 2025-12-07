import { MapData } from '../../types';

export const rocketHideoutB1F: MapData = {
  id: 'rocket_hideout_b1f',
  name: 'Rocket Hideout - B1F',
  description: 'Sei nel primo piano sotterraneo del Rifugio Rocket. L\'aria è viziata e le pareti sono di freddo metallo. Diverse reclute pattugliano i corridoi. Vedi delle scale che scendono.',
  connections: {
    // Le connessioni sono gestite come eventi interni
  },
  wildEncounters: [],
  trainers: [
    'rocket_grunt_hideout_1',
    'rocket_grunt_hideout_2'
  ],
  events: [
    {
      id: 'exit_to_game_corner',
      trigger: 'interact',
      // Logica Engine: "Risali le scale segrete e torni al Casinò." -> Teleport a 'celadon_city' (o 'game_corner' se creata)
    },
    {
      id: 'go_to_b2f',
      trigger: 'interact',
      // Logica Engine: "Scendi le scale verso il secondo piano sotterraneo." -> Teleport a 'rocket_hideout_b2f'
    },
    {
      id: 'grunt_encounter_1',
      trigger: 'interact',
      conditionFlag: '!rocket_grunt_hideout_1_defeated',
      // Logica Engine: "Grunt: 'Come sei entrato qui?!'" -> Avvia battaglia con 'rocket_grunt_hideout_1'
    },
    {
      id: 'grunt_encounter_2',
      trigger: 'interact',
      conditionFlag: '!rocket_grunt_hideout_2_defeated',
      // Logica Engine: "Grunt: 'Fermati! Non puoi passare!'" -> Avvia battaglia con 'rocket_grunt_hideout_2'
    }
  ]
};