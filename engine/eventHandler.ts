import { GameState, PokemonInstance, TrainerData, MenuOption } from '../types';
import { pokemonList } from '../data/pokemon/pokemon';
import { zone1Trainers } from '../data/trainers/zone1';
import { zone2Trainers } from '../data/trainers/zone2';
import { zone3Trainers } from '../data/trainers/zone3';
import { zone4Trainers } from '../data/trainers/zone4';

const allTrainers = [
  ...zone1Trainers,
  ...zone2Trainers,
  ...zone3Trainers,
  ...zone4Trainers
];

interface EventActions {
  addLog: (text: string) => void;
  setFlag: (flag: string, val: boolean | number | string) => void;
  addItem: (id: string, qty: number) => void;
  consumeItem: (id: string) => void;
  addPokemon: (id: number, lvl: number) => void;
  healParty: () => void;
  startBattle: (enemyData: TrainerData | any, isTrainer: boolean) => void;
  teleport: (mapId: string) => void;
  setMenuOptions: (options: MenuOption[] | undefined) => void;
  modifyMoney: (amount: number) => void; 
}

export const handleGameEvent = (
  eventId: string, 
  gameState: GameState, 
  actions: EventActions
) => {
  const { addLog, setFlag, addItem, consumeItem, addPokemon, healParty, startBattle, teleport, setMenuOptions, modifyMoney } = actions;
  const flags = gameState.flags;
  const inventory = gameState.player.inventory;
  const currentMap = gameState.player.position.mapId;

  // --- HELPER: CHECK ITEMS & BADGES ---
  const hasItem = (id: string) => inventory.items.some(i => i.itemId === id) || inventory.keyItems.includes(id);
  const hasBadge = (badgeFlag: string) => !!flags[badgeFlag];
  
  // --- HELPER MENUS ---

  const showPokeCenterMenu = () => {
    setMenuOptions([
      {
        label: 'CURA SQUADRA',
        action: () => {
          healParty();
          addLog("Infermiera Joy: 'Ecco fatto! I tuoi Pokémon sono in perfetta forma!'");
          addLog("Infermiera Joy: 'Torna a trovarci!'");
          setTimeout(() => showPokeCenterMenu(), 1000); 
        }
      },
      {
        label: 'PC DI BILL',
        action: () => {
          addLog("Accedi al PC...");
          setFlag('pc_active', true);
          setMenuOptions([
            {
              label: 'ESCI DAL PC',
              action: () => {
                setFlag('pc_active', false);
                addLog("Hai spento il PC.");
                showPokeCenterMenu(); 
              }
            }
          ]);
        }
      },
      {
        label: 'ESCI',
        action: () => {
          addLog("Infermiera Joy: 'A presto!'");
          setMenuOptions(undefined); 
        }
      }
    ]);
  };

  const showElevatorMenu = (floors: { label: string, mapId: string }[]) => {
      const options = floors.map(f => ({
          label: f.label,
          action: () => {
              addLog(`Ding! Arrivo al piano ${f.label}.`);
              teleport(f.mapId);
              setMenuOptions(undefined);
          }
      }));
      options.push({ label: 'ESCI', action: () => setMenuOptions(undefined) });
      setMenuOptions(options);
  };

  const confirmStarter = (pokemonId: number, pokemonName: string) => {
      setMenuOptions([
          {
              label: 'SÌ!',
              action: () => {
                  addLog(`Hai scelto ${pokemonName}!`);
                  addPokemon(pokemonId, 5);
                  setFlag('starterChosen', true);
                  setMenuOptions(undefined);
                  setTimeout(() => {
                      addLog("Gary: 'Aspetta! Nonno, ne voglio uno anche io!'");
                      addLog("Gary spinge via il protagonista e afferra una delle Poké Ball rimaste.");
                      setTimeout(() => {
                          addLog("Gary: 'Ehi tu! Lottiamo per vedere chi è più forte!'");
                          const garyData = allTrainers.find(t => t.id === 'rival_1_lab');
                          if (garyData) startBattle(garyData, true);
                      }, 2000);
                  }, 1500);
              }
          },
          {
              label: 'NO',
              action: () => {
                  addLog("Oak: 'Scegli con attenzione! Questo Pokémon sarà il tuo compagno.'");
                  handleGameEvent('oak_lab', gameState, actions); 
              }
          }
      ]);
  };

  const showBankMenu = () => {
      const isSaving = gameState.flags['mom_saving_active'];
      const balance = gameState.player.bank;
      addLog(`Risparmi Attuali: ${balance}$`);

      setMenuOptions([
        {
            label: 'RITIRA TUTTO',
            action: () => {
                if (balance > 0) {
                    addLog(`Mamma: 'Ecco a te ${balance}$. Spendili bene, tesoro!'`);
                    modifyMoney(balance);
                    // Reset bank logic simulated
                } else {
                    addLog("Mamma: 'Non hai risparmi da ritirare al momento.'");
                }
                showBankMenu();
            }
        },
        {
            label: isSaving ? 'STOP RISPARMIO' : 'ATTIVA RISPARMIO',
            action: () => {
                setFlag('mom_saving_active', !isSaving);
                addLog(isSaving ? "Mamma: 'D'accordo, smetterò di mettere via i soldi per te.'" : "Mamma: 'Va bene! Metterò via una parte delle tue vincite!'");
                setMenuOptions(undefined); 
            }
        },
        { label: 'ESCI', action: () => setMenuOptions(undefined) }
      ]);
  };

  // --- GESTIONE EVENTI PRINCIPALE ---
  switch (eventId) {
    // --- PALLET TOWN ---
    case 'mom_house':
      addLog("Mamma: 'Oh, sei a casa! Ti vedi stanco. Dovresti riposarti un po'.'");
      healParty();
      addLog("(Ti sei riposato e i tuoi Pokémon hanno recuperato le forze.)");
      setMenuOptions([
        { label: 'BANCA', action: () => showBankMenu() },
        { label: 'ESCI', action: () => setMenuOptions(undefined) }
      ]);
      break;

    case 'rival_house':
      if (flags['starterChosen'] && !flags['map_obtained']) {
        addLog("Daisy: 'Ciao! Gary è già partito. Mi ha detto di darti questo se fossi passato.'");
        addItem('town_map', 1);
        setFlag('map_obtained', true);
        addLog("Hai ottenuto la Mappa Città!");
      } else {
        addLog("Daisy: 'Usa la mappa per orientarti a Kanto! E per favore, non litigare troppo con mio fratello.'");
      }
      break;

    case 'oak_lab':
      if (!flags['starterChosen']) {
        addLog("Oak: 'Eccoci qui! Ci sono tre Pokémon qui dentro. Scegline uno!'");
        setMenuOptions([
            { label: 'BULBASAUR', action: () => confirmStarter(1, 'Bulbasaur') },
            { label: 'CHARMANDER', action: () => confirmStarter(4, 'Charmander') },
            { label: 'SQUIRTLE', action: () => confirmStarter(7, 'Squirtle') }
        ]);
      } else if (flags['starterChosen'] && !flags['pokedexObtained']) {
        const hasParcel = hasItem('oak_parcel');
        if (hasParcel) {
          addLog("Oak: 'Ah, il mio pacco personalizzato! Grazie!'");
          addLog("Oak: 'Visto che sei qui, ho un regalo per te e Gary. Ecco il Pokédex!'");
          addItem('pokedex', 1);
          addItem('poke_ball', 5);
          setFlag('pokedexObtained', true);
          setFlag('oakParcelDelivered', true);
          addLog("Hai ottenuto il Pokédex e 5 Poké Ball!"); 
        } else {
          addLog("Oak: 'Il mio pacco è arrivato al Market di Smeraldopoli. Potresti andarlo a prendere?'");
        }
      } else {
        addLog("Oak: 'Il Pokédex è un'enciclopedia high-tech! Catturali tutti!'");
      }
      break;

    // --- ROUTE 1 ---
    case 'potion_npc':
      if (!flags['route1_potion_received']) {
        addLog("Commesso: 'Lavori al Market? Ah no? Tieni questo!'");
        addItem('potion', 1);
        setFlag('route1_potion_received', true);
        addLog("Hai ottenuto una Pozione!");
      } else {
        addLog("Commesso: 'Si dice che i Pokémon si nascondano nell'erba alta.'");
      }
      break;
    case 'sign_route1': addLog("CARTELLO: Percorso 1 - Pallet Town / Smeraldopoli"); break;

    // --- VIRIDIAN CITY ---
    case 'poke_center': showPokeCenterMenu(); break;
    case 'poke_mart':
      if (!flags['oakParcelDelivered'] && !hasItem('oak_parcel')) {
        addLog("Commesso: 'Ehi! Tu vieni da Pallet Town? Porta questo al Prof. Oak.'");
        addItem('oak_parcel', 1);
        addLog("Hai ottenuto il Pacco di Oak!");
      } else {
        setFlag('shop_active', true);
        setMenuOptions([{ label: 'ESCI', action: () => { setFlag('shop_active', false); setMenuOptions(undefined); } }]);
      }
      break;
    case 'old_man':
        if (!flags['pokedexObtained']) {
            addLog("Anziano: 'Sei di fretta? Aspetta un attimo! Sono troppo stanco...'");
            addLog("(L'anziano blocca la strada. Devi portare il pacco a Oak!)");
        } else {
            addLog("Anziano: 'Ho preso il mio caffè e mi sento benissimo! Fai attenzione là fuori!'");
        }
        break;
    case 'trainer_school': addLog("Lavagna: 'Il veleno toglie PS a ogni turno. La paralisi riduce la velocità.'"); break;
    case 'sign_route2': addLog("CARTELLO: Percorso 2 - Smeraldopoli / Plumbeopoli"); break;

    // --- VIRIDIAN FOREST ---
    case 'item_antidote': if(!flags['item_forest_antidote_taken']){ addItem('antidote',1); setFlag('item_forest_antidote_taken',true); addLog("Hai trovato un Antidoto!");} break;
    case 'item_potion': if(!flags['item_forest_potion_taken']){ addItem('potion',1); setFlag('item_forest_potion_taken',true); addLog("Hai trovato una Pozione!");} break;
    case 'sign_poison_warning': addLog("AVVISO: Molti Pokémon nel Bosco Smeraldo possono avvelenare. Porta degli Antidoti!"); break;
    case 'sign_exit': addLog("USCITA BOSCO SMERALDO - Verso Plumbeopoli"); break;

    // --- PEWTER CITY ---
    case 'sign_pewter': addLog("PLUMBEOPOLI - Una città grigia come la roccia."); break;
    case 'museum': addLog("Museo della Scienza: 'Ingresso 50$'. (Oggi è chiuso per inventario)"); break;
    case 'repel_guy': addLog("Cittadino: 'Usi i Repellenti? Sono ottimi per attraversare le grotte senza essere disturbati dai Pokémon deboli.'"); break;
    case 'pewter_gym':
      if (flags['boulderBadgeObtained']) addLog("Hai già sconfitto Brock.");
      else {
        addLog("Brock: 'La mia volontà è dura come la roccia! Mostrami cosa sai fare!'");
        startBattle(allTrainers.find(t=>t.id==='leader_brock'), true);
      }
      break;
    
    // --- ROUTE 3 ---
    case 'route_3_guard':
        if(!flags['boulderBadgeObtained']) {
            addLog("Giovane: 'Non puoi passare di qui se non hai battuto Brock! Torna indietro e dimostra il tuo valore!'");
        } else {
            addLog("Giovane: 'Quella è la Medaglia Sasso! Prego, passa pure. Buona fortuna al Monte Luna!'");
        }
        break;
    case 'route3_sign': addLog("CARTELLO: Percorso 3 - Verso il Monte Luna"); break;
    case 'mt_moon_pokecenter': 
        healParty(); 
        addLog("Hai riposato al Centro Pokémon prima della grotta."); 
        break;
    case 'magikarp_salesman':
        if (!flags['magikarp_bought']) {
            addLog("Venditore: 'Ehi tu! Ho un affare incredibile per te! Un Pokémon rarissimo e potente!'");
            setMenuOptions([
                {label:'COMPRA (500$)', action:()=>{
                    if(gameState.player.money>=500) { 
                        modifyMoney(-500); addPokemon(129, 5); setFlag('magikarp_bought',true); setMenuOptions(undefined); addLog("Hai comprato Magikarp! ... Sembra un po' debole."); 
                    } else { addLog("Non hai abbastanza soldi! Torna quando sarai ricco!"); setMenuOptions(undefined); }
                }}, 
                {label:'NO', action:()=>{ addLog("Venditore: 'Non sai cosa ti perdi!'"); setMenuOptions(undefined); }}
            ]);
        } else {
            addLog("Venditore: 'Nessun rimborso!'");
        }
        break;

    // --- MT MOON ---
    case 'explore_1f_left': 
        addLog("Un allenatore esce dall'ombra!");
        startBattle(allTrainers.find(t=>t.id==='youngster_ben'), true); 
        break;
    case 'explore_1f_right': 
        addLog("Sembrava un vicolo cieco, ma c'è qualcuno!");
        startBattle(allTrainers.find(t=>t.id==='lass_janice'), true); 
        break;
    case 'ladder_b1f': addLog("Scendi le scale verso il primo livello sotterraneo (B1F)."); teleport('mt_moon'); break; // Logica interna
    case 'ladder_b2f': addLog("Scendi ancora più in profondità (B2F)."); break;
    case 'rocket_ambush_1': 
        if(!flags['rocket_grunt_1_defeated']) {
            addLog("Recluta Rocket: 'Ehi! I fossili sono nostri! Sparisci!'");
            startBattle(allTrainers.find(t=>t.id==='rocket_grunt_1'), true); 
        }
        break;
    case 'super_nerd_battle': 
        if(!flags['super_nerd_miguel_defeated']) {
            addLog("Super Nerd: 'Ho trovato io questi fossili! Sono entrambi miei!'");
            startBattle(allTrainers.find(t=>t.id==='super_nerd_miguel'), true); 
        }
        break;
    case 'choose_fossil':
        if(flags['super_nerd_miguel_defeated'] && !flags['fossil_chosen']) {
            addLog("Super Nerd: 'Ok, ok! Ne prenderò solo uno. Tu puoi avere l'altro.'");
            setMenuOptions([
                {label:'HELIX FOSSIL', action:()=>{ addItem('helix_fossil',1); setFlag('fossil_chosen',true); setMenuOptions(undefined); addLog("Hai ottenuto l'Helix Fossil!"); }},
                {label:'DOME FOSSIL', action:()=>{ addItem('dome_fossil',1); setFlag('fossil_chosen',true); setMenuOptions(undefined); addLog("Hai ottenuto il Dome Fossil!"); }}
            ]);
        }
        break;
    case 'exit_cave': 
        if(flags['fossil_chosen']) {
            addLog("Uscita dal Monte Luna!");
            teleport('route_4'); 
        } else {
            addLog("Dovresti prendere un fossile prima di andare."); 
        }
        break;

    // --- ROUTE 4 ---
    case 'tutor_mega_punch': 
        if(!flags['mega_punch']) { 
            setFlag('mega_punch',true); 
            addLog("Cinturanera: 'I pugni sono tutto! Insegnerò Mega Pugno ai tuoi Pokémon!' (Logica WIP)"); 
        } 
        break;
    case 'tutor_mega_kick': 
        if(!flags['mega_kick']) { 
            setFlag('mega_kick',true); 
            addLog("Cinturanera: 'I calci sono devastanti! Insegnerò Mega Calcio ai tuoi Pokémon!' (Logica WIP)"); 
        } 
        break;
    case 'item_tm04': 
        if(!flags['tm04']) { 
            addItem('tm04',1); setFlag('tm04',true); addLog("Hai trovato MT04 (Turbine)!"); 
        } 
        break;
    case 'sign_cerulean': addLog("CELESTOPOLI - Città circondata dall'acqua blu"); break;

    // --- CERULEAN CITY ---
    case 'cerulean_gym':
        if(!flags['bill_helped']) { addLog("La palestra è chiusa momentaneamente. Misty è andata a trovare Bill al promontorio."); break; }
        if(!flags['cascadeBadgeObtained']) {
            addLog("Misty: 'Ciao! Sei qui per sfidarmi? La mia strategia d'acqua è imbattibile!'");
            startBattle(allTrainers.find(t=>t.id==='leader_misty'), true);
        } else {
            addLog("Misty: 'Sei diventato forte! Continua così.'");
        }
        break;
    case 'rival_block_north': 
        if(!flags['rival_3_cerulean_defeated']) {
            addLog("Gary: 'Ehi! Ancora tu? Stai andando da Bill? Vediamo se sei migliorato!'");
            startBattle(allTrainers.find(t=>t.id==='rival_3_cerulean'), true); 
        } else {
            addLog("La strada per il Ponte Pepita è libera.");
        }
        break;
    case 'robbed_house_guard': 
        if(!flags['bill_helped']) addLog("Agente: 'Siamo stati derubati dal Team Rocket. Non posso far passare nessuno finché non avremo finito le indagini.'"); 
        else if(!flags['tm28']) { 
            addLog("Agente: 'Abbiamo recuperato la refurtiva! Ah, tieni, il Team Rocket ha lasciato cadere questo.'");
            addItem('tm28',1); setFlag('tm28',true); addLog("Hai ottenuto MT28 (Fossa)!"); 
        } 
        break;
    case 'bike_shop': 
        if (hasItem('bicycle')) {
            addLog("Venditore Bici: 'Come va la tua nuova Bici? Scorre liscia come l'olio, vero?'");
        } else if (hasItem('bike_voucher')) {
            addLog("Venditore Bici: 'Oh! Quello è un Buono Bici del Fan Club Pokémon!'");
            addLog("Venditore Bici: 'Ok! Ecco la tua Bicicletta! Grazie per il supporto!'");
            consumeItem('bike_voucher');
            addItem('bicycle', 1);
            setFlag('bicycle_obtained', true);
            addLog("Hai ottenuto la Bicicletta!");
        } else {
            addLog("Venditore Bici: 'Benvenuto! Le nostre bici sono le migliori! Prezzo: 1.000.000$.' (Non hai abbastanza soldi!)"); 
        }
        break;
    case 'trade_jynx': addLog("Ragazza: 'Il mio Jynx è carino, vero? Vorrei tanto un Poliwhirl...' (Scambio WIP)"); break;

    // --- ROUTE 24/25 (NUGGET BRIDGE & BILL) ---
    case 'nugget_reward': 
        if(!flags['nugget_received']) { 
            addLog("Recluta Rocket: 'Congratulazioni! Hai battuto la nostra sfida di 5 allenatori!'");
            addLog("Recluta Rocket: 'Ecco il tuo fantastico premio: una Pepita!'");
            addItem('nugget', 1); setFlag('nugget_received', true); addLog("Hai ottenuto una Pepita!");
            setTimeout(() => {
                addLog("Recluta Rocket: 'A proposito... Ti va di unirti al Team Rocket?'");
                addLog("Recluta Rocket: 'Come? Rifiuti? Allora dovrò farti un'offerta che non potrai rifiutare!'");
                startBattle(allTrainers.find(t=>t.id==='rocket_grunt_nugget'), true);
            }, 3000);
        } else {
            addLog("Recluta Rocket: 'Con la tua abilità diventeresti un ottimo Boss... peccato.'");
        }
        break;
    case 'charmander_gift': 
        if(!flags['charmander_received']) { 
            addLog("Allenatore: 'Non sono bravo ad allenare i Pokémon... Il mio Charmander è troppo vivace.'");
            addLog("Allenatore: 'Tu sembri un allenatore esperto. Vuoi prenderti cura del mio Charmander?'");
            setMenuOptions([
                { label: 'SÌ', action: () => { addPokemon(4, 10); setFlag('charmander_received', true); setMenuOptions(undefined); addLog("Hai ricevuto Charmander!"); } }, 
                { label: 'NO', action: () => { addLog("Allenatore: 'Oh... capisco.'"); setMenuOptions(undefined); } }
            ]); 
        }
        break;
    case 'item_tm45': if(!flags['tm45']) { addItem('tm45', 1); setFlag('tm45', true); addLog("Hai trovato MT45 (Tuononda)!"); } break;
    case 'item_tm19': if(!flags['tm19']) { addItem('tm19', 1); setFlag('tm19', true); addLog("Hai trovato MT19 (Movimento Sismico)!"); } break;
    case 'shortcut_bush': 
        if(hasItem('hm01') && hasBadge('cascadeBadgeObtained')) addLog("Tagli l'alberello! Scorciatoia aperta.");
        else addLog("Un alberello blocca la strada. Sembra si possa tagliare, ma serve la Medaglia Cascata.");
        break;
    case 'dating_couple': addLog("Ragazzo: 'Siamo qui per guardare il lago... da soli. Non disturbare.'"); break;
    case 'bill_clefairy': 
        if(!flags['bill_helped']) { 
            addLog("Pokémon: 'Ciao! Sono un Pokémon... No, sono Bill! Un esperimento è andato storto!'");
            addLog("Bill: 'Aiutami a tornare normale! Attiva il sistema quando entro nella capsula!'");
            setMenuOptions([{ label: 'OK', action: () => { setFlag('bill_waiting', true); addLog("(Bill è entrato nella capsula.)"); setMenuOptions(undefined); } }]);
        } 
        break;
    case 'separation_machine': 
        if(flags['bill_waiting']) { 
            addLog("Avvii il Sistema di Separazione Cellulare...");
            addLog("Bip... Bip... Bip... VROOOM!");
            setFlag('bill_helped', true); setFlag('bill_waiting', false); 
            addLog("Dalla capsula sinistra esce un umano!");
            addLog("Bill: 'Yaho! Grazie mille! Sono tornato normale!'");
        } else {
            addLog("È un complesso macchinario per esperimenti.");
        }
        break;
    case 'bill_human': 
        if(flags['bill_helped'] && !flags['ss_ticket_received']) { 
            addLog("Bill: 'Ti devo un favore, amico! Tieni questo, l'ho trovato ma non mi piace la folla.'");
            addItem('ss_ticket', 1); setFlag('ss_ticket_received', true); setFlag('pc_renamed_to_bill', true); 
            addLog("Hai ottenuto il Biglietto Nave (S.S. Ticket)!"); 
            addLog("Bill: 'La M/N Anna è ad Aranciopoli. Ah, controlla pure il mio PC.'");
        }
        break;
    case 'bills_computer': 
        addLog("Accedi al PC di Bill... Dati su Eevee e le sue evoluzioni: Vaporeon, Jolteon, Flareon.");
        setMenuOptions([
            { label: 'ACCEDI AL BOX', action: () => { setFlag('pc_active', true); setMenuOptions([{label: 'ESCI', action: () => { setFlag('pc_active', false); setMenuOptions(undefined); }}]); } },
            { label: 'ESCI', action: () => setMenuOptions(undefined) }
        ]); 
        break;

    // --- ROUTE 5 & 6 ---
    case 'day_care': addLog("Pensione Pokémon: 'Ci prendiamo cura dei tuoi Pokémon!' (Funzionalità WIP)"); break;
    case 'underground_path_entrance': addLog("Scendi nel Passaggio Sotterraneo..."); teleport('underground_path_north_south'); break;
    case 'underground_path_exit': addLog("Risali dal Passaggio Sotterraneo."); teleport('underground_path_north_south'); break;
    case 'ledge_jump': addLog("Salti giù dal gradone. Non puoi tornare indietro."); teleport('route_5'); break;
    case 'hidden_item_1': if(!flags['hidden_1']) { addItem('full_restore', 1); setFlag('hidden_1', true); addLog("Hai trovato una Ricarica Totale nascosta!"); } break;
    case 'hidden_item_2': if(!flags['hidden_2']) { addItem('x_special', 1); setFlag('hidden_2', true); addLog("Hai trovato X Special nascosto!"); } break;
    case 'saffron_guard': case 'saffron_guard_south': case 'saffron_guard_east': case 'saffron_guard_west':
        if(flags['gave_tea_to_guards']) { 
            addLog("Guardia: 'Il Tè era delizioso! Passa pure.'"); 
        } else { 
            addLog("Guardia: 'Sono di guardia... ma ho una sete terribile! La strada è chiusa.'"); 
        } 
        break;
    case 'sign_vermilion': addLog("ARANCIOPOLI - Il porto dagli squisiti tramonti"); break;

    // --- VERMILION & SS ANNE ---
    case 'pokemon_fan_club':
        if (!flags['bike_voucher_received']) {
            addLog("Presidente Fan Club: 'I miei Rapidash sono adorabili... [segue monologo]...'");
            addLog("Presidente: 'Hai ascoltato tutto? Sei fantastico! Tieni questo!'");
            addItem('bike_voucher', 1); setFlag('bike_voucher_received', true); addLog("Hai ottenuto il Buono Bici!");
        } else {
            addLog("Presidente: 'Torna a trovarmi per parlare dei miei Pokémon!'");
        }
        break;
    case 'fishing_guru':
        if (!flags['old_rod_received']) {
            addLog("Guru Pescatore: 'Adoro pescare! E tu? Ti piace pescare?'");
            setMenuOptions([
                { label: 'SÌ', action: () => { addLog("Guru: 'Grande! Prendi questo!'"); addItem('old_rod', 1); setFlag('old_rod_received', true); addLog("Hai ottenuto l'Amo Vecchio!"); setMenuOptions(undefined); } },
                { label: 'NO', action: () => { addLog("Guru: 'Oh... che delusione.'"); setMenuOptions(undefined); } }
            ]);
        }
        break;
    case 'ss_anne_dock':
        if (hasItem('ss_ticket')) {
            addLog("Marinaio: 'Benvenuto sulla M/N Anna! Posso vedere il biglietto? Perfetto!'");
            teleport('ss_anne_exterior');
        } else {
            addLog("Marinaio: 'Mi spiace, serve un biglietto per salire a bordo.'");
        }
        break;
    case 'construction_site': addLog("Operaio: 'Il mio Machop sta spianando il terreno!'"); break;
    
    // --- S.S. ANNE NAVIGATION (EXPLICIT) ---
    case 'go_to_deck': teleport('ss_anne_exterior'); break;
    case 'enter_1f': teleport('ss_anne_1f'); break;
    case 'enter_b1f': teleport('ss_anne_b1f'); break;
    case 'go_to_1f':
        if (currentMap.includes('ss_anne')) teleport('ss_anne_1f');
        else if (currentMap.includes('tower')) teleport('pokemon_tower_1f');
        else if (currentMap.includes('dept')) teleport('celadon_dept_store_1f');
        else if (currentMap.includes('silph')) teleport('silph_co_1f'); // Silph uses _stairs but good fallback
        else if (currentMap.includes('mansion')) teleport('pokemon_mansion_1f');
        else if (currentMap.includes('victory')) teleport('victory_road_1f');
        break;
    case 'go_to_2f': 
        if (currentMap.includes('ss_anne')) teleport('ss_anne_2f');
        else if (currentMap.includes('tower')) teleport('pokemon_tower_2f');
        else if (currentMap.includes('dept')) teleport('celadon_dept_store_2f');
        else if (currentMap.includes('mansion')) teleport('pokemon_mansion_2f');
        else if (currentMap.includes('victory')) teleport('victory_road_2f');
        break;
    case 'enter_kitchen': teleport('ss_anne_kitchen'); break;
    case 'enter_captains_office': teleport('ss_anne_captains_office'); break;
    case 'exit_to_1f': teleport('ss_anne_1f'); break;
    case 'exit_to_2f': teleport('ss_anne_2f'); break;
    case 'exit_to_b1f': teleport('ss_anne_b1f'); break;

    case 'lookout_point': addLog("Guardi il mare sconfinato... Ti senti rilassato."); break;
    case 'leave_ship': 
        if(flags['hm01Obtained']) { 
            addLog("La M/N Anna è salpata!"); setFlag('ss_anne_departed', true); teleport('vermilion_city');
        } else { 
            setMenuOptions([
                { label: 'SCENDI', action: () => { teleport('vermilion_city'); setMenuOptions(undefined); }},
                { label: 'RESTA', action: () => setMenuOptions(undefined) }
            ]);
        } 
        break;
    case 'talk_to_captain':
        if(!flags['hm01Obtained']) {
            addLog("Capitano: 'Ooargh... ho il mal di mare... Puoi farmi un massaggio alla schiena?'");
            addLog("(Massaggi la schiena del Capitano)");
            addLog("Capitano: 'Ahhh, grazie! Mi sento molto meglio! Prendi questa MN segreta!'");
            addItem('hm01', 1); setFlag('hm01Obtained', true); addLog("Hai ottenuto MN01 (Taglio)!");
            addLog("Capitano: 'Ora salperemo!'");
        } else {
            addLog("Capitano: 'Grazie ancora! Buon viaggio!'");
        }
        break;
    case 'cabin_1': startBattle(allTrainers.find(t=>t.id==='sailor_huey_ssa'), true); break;
    case 'cabin_2': startBattle(allTrainers.find(t=>t.id==='sailor_dylan_ssa'), true); break;
    case 'cabin_3': addLog("Gentiluomo: 'Questa nave viaggia in tutto il mondo!'"); break;
    case 'healing_room': addLog("Infermiera: 'Riposati un po'.'"); healParty(); addLog("(I tuoi Pokémon sono stati curati)"); break;
    case 'rival_encounter': 
        if(!flags['rival_4_ssanne_defeated']) {
            addLog("Gary: 'Bonjour! Che ci fai qui? Ho sentito che il Capitano è un maestro di Taglio. Ma è malato... Ahah! Scommetto che sei qui per sfidarmi!'");
            startBattle(allTrainers.find(t=>t.id==='rival_4_ssanne'), true); 
        }
        break;
    case 'vermilion_gym':
        if (!hasItem('hm01')) { 
            addLog("Un alberello blocca l'ingresso. Sembra si possa tagliare."); 
        } else {
            if (hasBadge('thunderBadgeObtained')) {
                addLog("Lt. Surge: 'Ehi soldato! Stai attento là fuori!'");
            } else {
                addLog("Tagli l'alberello ed entri nella Palestra.");
                addLog("Guidapalestra: 'Ehi campione! Lt. Surge usa Pokémon elettrici!'");
                startBattle(allTrainers.find(t=>t.id==='leader_surge'), true);
            }
        }
        break;

    // --- ROUTE 9, 10, ROCK TUNNEL ---
    case 'cut_bush_shortcut': if(hasItem('hm01') && hasBadge('cascadeBadgeObtained')) addLog("Tagli l'alberello!"); else addLog("Serve Taglio."); break;
    case 'item_tm30': if(!flags['tm30']) { addItem('tm30',1); setFlag('tm30',true); addLog("Hai trovato MT30 (Teletrasporto)!"); } break;
    case 'rock_tunnel_pokecenter': healParty(); addLog("Infermiera: 'Il Tunnel Roccioso è buio. Fai attenzione!'"); break;
    case 'enter_rock_tunnel': 
        if(hasItem('hm05') && hasBadge('boulderBadgeObtained')) addLog("Usi Flash!");
        else addLog("È buio pesto. Serve Flash e la Medaglia Sasso!");
        teleport('rock_tunnel_1f'); 
        break;
    case 'enter_rock_tunnel_from_south': teleport('rock_tunnel_b1f'); break;
    case 'exit_to_route_10_north': teleport('route_10_north'); break;
    case 'exit_to_route_10_south': teleport('route_10_south'); break;
    case 'ladder_to_b1f': teleport('rock_tunnel_b1f'); break;
    case 'ladder_to_1f_start': teleport('rock_tunnel_1f'); break;
    case 'ladder_to_1f_end': teleport('rock_tunnel_1f'); break;
    case 'hidden_item_repel': if(!flags['hidden_repel_rt']) { addItem('repel',1); setFlag('hidden_repel_rt',true); addLog("Hai trovato un Repellente nascosto!"); } break;
    case 'hidden_item_escape_rope': if(!flags['hidden_rope_rt']) { addItem('escape_rope',1); setFlag('hidden_rope_rt',true); addLog("Hai trovato una Fune di Fuga nascosta!"); } break;

    // --- LAVENDER TOWN & TOWER ---
    case 'pokemon_tower': addLog("Entri nella Torre Pokémon..."); teleport('pokemon_tower_1f'); break;
    case 'mr_fuji_house':
        if(flags['saved_mr_fuji']) {
            if(!flags['poke_flute_received']) {
                addLog("Mr. Fuji: 'Grazie per avermi salvato. Prendi questo Poké Flauto.'");
                addItem('poke_flute', 1); setFlag('poke_flute_received', true); addLog("Hai ottenuto il Poké Flauto!");
            } else {
                addLog("Mr. Fuji: 'Prega per gli spiriti dei Pokémon.'");
            }
        } else {
            addLog("Bambina: 'Mr. Fuji è andato alla Torre e non è tornato.'");
        }
        break;
    case 'name_rater_house': addLog("Giudice Onomastico: 'Bei soprannomi!'"); break;
    case 'exit_to_lavender_town': teleport('lavender_town'); break;
    
    // Tower Specific Navigation
    case 'go_to_3f': 
        if (currentMap.includes('tower')) teleport('pokemon_tower_3f');
        else if (currentMap.includes('dept')) teleport('celadon_dept_store_3f');
        else if (currentMap.includes('silph')) teleport('silph_co_3f');
        else if (currentMap.includes('mansion')) teleport('pokemon_mansion_3f');
        else if (currentMap.includes('victory')) teleport('victory_road_3f');
        break;
    case 'go_to_4f': 
        if (currentMap.includes('tower')) teleport('pokemon_tower_4f');
        else if (currentMap.includes('dept')) teleport('celadon_dept_store_4f');
        else if (currentMap.includes('silph')) teleport('silph_co_4f');
        break;
    case 'go_to_5f': 
        if (currentMap.includes('tower')) teleport('pokemon_tower_5f');
        else if (currentMap.includes('dept')) teleport('celadon_dept_store_5f');
        else if (currentMap.includes('silph')) teleport('silph_co_5f');
        break;
    case 'go_to_6f': 
        if (currentMap.includes('tower')) teleport('pokemon_tower_6f');
        else if (currentMap.includes('silph')) teleport('silph_co_6f');
        break;
    case 'go_to_7f': 
        if (currentMap.includes('tower')) teleport('pokemon_tower_7f');
        else if (currentMap.includes('silph')) teleport('silph_co_7f');
        break;

    case 'rival_encounter_tower':
        if(!flags['rival_5_tower_defeated']) {
            addLog("Gary: 'Ehi! I tuoi Pokémon non sono morti! Lottiamo!'");
            startBattle(allTrainers.find(t=>t.id==='rival_5_tower'), true);
        }
        break;
    case 'marowak_ghost_encounter':
        if(flags['marowak_ghost_defeated']) break;
        if(hasItem('silph_scope')) {
            addLog("Usi lo Spettroscopio! È Marowak!");
            startBattle({ id: 'ghost_marowak', name: 'Marowak', sprite: 'marowak_ghost.png', party: [{ pokemonId: 105, level: 30 }] }, true); 
            setFlag('marowak_ghost_defeated', true);
        } else {
            addLog("È un fantasma! Non puoi colpirlo! Scappi al piano di sotto.");
            teleport('pokemon_tower_5f');
        }
        break;
    case 'rocket_ambush_tower':
        if(!flags['rocket_grunt_tower_1_defeated']) {
            addLog("Reclute Rocket: 'Hai placato lo spirito? Non importa!'");
            startBattle(allTrainers.find(t=>t.id==='rocket_grunt_tower_1'), true);
        }
        break;
    case 'rescue_mr_fuji':
        if(!flags['saved_mr_fuji']) {
            addLog("Mr. Fuji: 'Grazie per avermi salvato. Seguimi a casa mia.'");
            setFlag('saved_mr_fuji', true);
            teleport('lavender_town');
        }
        break;
    case 'purified_zone': addLog("Area purificata. I tuoi Pokémon riposano."); healParty(); break;
    case 'healing_zone': addLog("Ti senti al sicuro."); healParty(); break;

    // --- CELADON CITY ---
    case 'celadon_department_store': teleport('celadon_dept_store_1f'); break;
    case 'celadon_mansion': teleport('celadon_mansion'); break;
    case 'game_corner': addLog("Casinò Rocket: 'Le slot machine sono truccate!'"); break;
    case 'hotel': addLog("Hotel Azzurropoli: 'Tutto esaurito!'"); break;
    case 'celadon_gym':
        if(flags['rainbowBadgeObtained']) {
            addLog("Erika: 'I fiori sono sbocciati.'");
        } else {
            if(hasItem('hm01') && hasBadge('cascadeBadgeObtained')) {
                addLog("Tagli l'alberello ed entri nella Palestra.");
                startBattle(allTrainers.find(t=>t.id==='leader_erika'), true);
            } else {
                addLog("Serve Taglio per entrare.");
            }
        }
        break;
    case 'rocket_hideout_entrance':
        if(!flags['rocket_hideout_found']) {
            addLog("C'è un pulsante dietro il poster!");
            setMenuOptions([
                {label: 'PREMI', action: () => { addLog("Click! Si apre una scala segreta!"); setFlag('rocket_hideout_found', true); teleport('rocket_hideout_b1f'); setMenuOptions(undefined); }},
                {label: 'LASCIA', action: () => setMenuOptions(undefined)}
            ]);
        } else { teleport('rocket_hideout_b1f'); }
        break;
    case 'old_man_tea':
        if(!flags['gave_tea_to_guards']) {
            addLog("Anziana: 'Tieni, porta questo Tè alle guardie assetate.'");
            setFlag('gave_tea_to_guards', true); addItem('tea', 1); addLog("Hai ottenuto il Tè!");
        }
        break;
    
    // --- DEPT STORE & HIDEOUT & MANSION Navigation ---
    case 'exit_to_celadon': teleport('celadon_city'); break;
    case 'use_elevator': case 'use_elevator_2f': case 'use_elevator_3f': case 'use_elevator_4f': case 'use_elevator_5f': case 'use_elevator_rooftop':
        showElevatorMenu([{label: '1F', mapId: 'celadon_dept_store_1f'}, {label: '2F', mapId: 'celadon_dept_store_2f'}, {label: '3F', mapId: 'celadon_dept_store_3f'}, {label: '4F', mapId: 'celadon_dept_store_4f'}, {label: '5F', mapId: 'celadon_dept_store_5f'}, {label: 'TETTO', mapId: 'celadon_dept_store_rooftop'}]);
        break;
    case 'shop_standard_items': setFlag('shop_active', true); addLog("Apre Shop (Standard)"); break;
    case 'shop_tms': setFlag('shop_active', true); addLog("Apre Shop (MT)"); break;
    case 'shop_evolution_stones': 
        setMenuOptions([
            {label: 'FIRE STONE (2100$)', action:() => { if(gameState.player.money>=2100){ modifyMoney(-2100); addItem('fire_stone',1); } setMenuOptions(undefined); }},
            {label: 'THUNDER STONE (2100$)', action:() => { if(gameState.player.money>=2100){ modifyMoney(-2100); addItem('thunder_stone',1); } setMenuOptions(undefined); }},
            {label: 'WATER STONE (2100$)', action:() => { if(gameState.player.money>=2100){ modifyMoney(-2100); addItem('water_stone',1); } setMenuOptions(undefined); }},
            {label: 'LEAF STONE (2100$)', action:() => { if(gameState.player.money>=2100){ modifyMoney(-2100); addItem('leaf_stone',1); } setMenuOptions(undefined); }},
            {label: 'ESCI', action:() => setMenuOptions(undefined)}
        ]);
        break;
    case 'vending_machine_water': if(gameState.player.money >= 200) { modifyMoney(-200); addItem('fresh_water', 1); addLog("Clang! Acqua Fresca."); } break;
    case 'get_eevee': if(!flags['eevee_obtained']) { addLog("Trovato Eevee!"); addPokemon(133, 25); setFlag('eevee_obtained', true); } break;
    case 'exit_to_game_corner': teleport('celadon_city'); break;
    
    // Explicit Rocket Hideout
    case 'go_to_b1f': 
        if (currentMap.includes('mansion')) teleport('pokemon_mansion_b1f');
        else teleport('rocket_hideout_b1f'); 
        break;
    case 'go_to_b2f': teleport('rocket_hideout_b2f'); break;
    case 'go_to_b3f': teleport('rocket_hideout_b3f'); break;
    case 'go_to_b4f': teleport('rocket_hideout_b4f'); break;

    case 'grunt_encounter_1': if(!flags['rocket_grunt_hideout_1_defeated']) startBattle(allTrainers.find(t=>t.id==='rocket_grunt_hideout_1'), true); break;
    case 'grunt_encounter_2': if(!flags['rocket_grunt_hideout_2_defeated']) startBattle(allTrainers.find(t=>t.id==='rocket_grunt_hideout_2'), true); break;
    case 'spin_panel_maze': addLog("Vieni trascinato dai pannelli rotanti!"); break;
    case 'get_lift_key':
        if(!flags['lift_key_obtained']) {
            addLog("Grunt: 'La Chiave Ascensore è mia!'");
            startBattle(allTrainers.find(t=>t.id==='rocket_grunt_hideout_6'), true);
            addItem('lift_key', 1); setFlag('lift_key_obtained', true); addLog("Hai ottenuto la Chiave Ascensore!");
        }
        break;
    case 'elevator':
        if(hasItem('lift_key')) {
            showElevatorMenu([{label: 'B1F', mapId: 'rocket_hideout_b1f'}, {label: 'B2F', mapId: 'rocket_hideout_b2f'}, {label: 'B3F', mapId: 'rocket_hideout_b3f'}, {label: 'B4F', mapId: 'rocket_hideout_b4f'}]);
        } else {
            addLog("Serve la Chiave Ascensore.");
        }
        break;
    case 'giovanni_encounter':
        if(!flags['boss_giovanni_1_defeated']) {
            addLog("Giovanni: 'Vedo che sei arrivato fin qui...'");
            startBattle(allTrainers.find(t=>t.id==='boss_giovanni_1'), true);
        } else if (!flags['silph_scope_obtained']) {
            addLog("Giovanni se n'è andato, lasciando lo Spettroscopio.");
            addItem('silph_scope', 1); setFlag('silph_scope_obtained', true); addLog("Hai ottenuto lo Spettroscopio!");
        }
        break;

    // --- SAFFRON CITY & SILPH CO ---
    case 'fighting_dojo':
        if(!flags['dojo_master_defeated']) {
            addLog("Maestro Karate: 'Hyaaa! Sfidami!'");
            startBattle(allTrainers.find(t=>t.id==='blackbelt_koichi'), true);
        } else if (!flags['hitmon_chosen']) {
            addLog("Scegli: Hitmonlee o Hitmonchan?");
            setMenuOptions([
                {label: 'HITMONLEE', action: () => { addPokemon(106, 30); setFlag('hitmon_chosen', true); setMenuOptions(undefined); addLog("Ottieni Hitmonlee!"); }},
                {label: 'HITMONCHAN', action: () => { addPokemon(107, 30); setFlag('hitmon_chosen', true); setMenuOptions(undefined); addLog("Ottieni Hitmonchan!"); }}
            ]);
        }
        break;
    case 'silph_co_entrance':
        if(flags['silph_scope_obtained']) teleport('silph_co_1f'); // Sblocca Silph Co dopo il Rifugio Rocket
        else addLog("Guardia: 'L'edificio è chiuso per indagini.' (Devi battere Giovanni al Casinò)");
        break;
    case 'use_elevator_silph':
        if(hasItem('card_key')) {
             showElevatorMenu([{label: '1F', mapId: 'silph_co_1f'}, {label: '2F', mapId: 'silph_co_2f'}, {label: '3F', mapId: 'silph_co_3f'}, {label: '4F', mapId: 'silph_co_4f'}, {label: '5F', mapId: 'silph_co_5f'}, {label: '6F', mapId: 'silph_co_6f'}, {label: '7F', mapId: 'silph_co_7f'}, {label: '8F', mapId: 'silph_co_8f'}, {label: '9F', mapId: 'silph_co_9f'}, {label: '10F', mapId: 'silph_co_10f'}, {label: '11F', mapId: 'silph_co_11f'}]);
        } else {
            addLog("Serve la Card Key per l'ascensore.");
        }
        break;
    case 'get_card_key':
        if(!flags['card_key_obtained']) { addItem('card_key', 1); setFlag('card_key_obtained', true); addLog("Trovata la Card Key!"); }
        break;
    case 'rival_encounter_silph':
        if(!flags['rival_6_silph_defeated']) {
            addLog("Gary: 'Che ci fai qui? Lascia fare a me!'");
            startBattle(allTrainers.find(t=>t.id==='rival_6_silph'), true);
        }
        break;
    case 'lapras_gift':
        if(flags['rival_6_silph_defeated'] && !flags['lapras_obtained']) {
            addLog("Impiegato: 'Grazie! Tieni questo Lapras.'");
            addPokemon(131, 15); setFlag('lapras_obtained', true);
        }
        break;
    case 'giovanni_encounter_silph':
        if(!flags['boss_giovanni_2_defeated']) {
            addLog("Giovanni: 'Ancora tu?!'");
            startBattle(allTrainers.find(t=>t.id==='boss_giovanni_2'), true);
        } else if (!flags['master_ball_obtained']) {
            addLog("Presidente: 'Grazie! Prendi la Master Ball!'");
            addItem('master_ball', 1); setFlag('master_ball_obtained', true);
        }
        break;
    case 'saffron_gym':
        if(flags['boss_giovanni_2_defeated']) {
            if(flags['marshBadgeObtained']) addLog("Sabrina: 'Ho previsto il tuo successo.'");
            else {
                addLog("Sabrina: 'Ho avuto una visione... Tu che perdi!'");
                startBattle(allTrainers.find(t=>t.id==='leader_sabrina'), true);
            }
        } else {
            addLog("La Palestra è chiusa dal Team Rocket.");
        }
        break;

    // --- ROUTE 7, 8 & UNDERGROUND PATHS ---
    case 'underground_path_west_entrance': // Da Route 8
        addLog("Scendi nel Passaggio Sotterraneo...");
        teleport('underground_path_west_east');
        break;
    case 'underground_path_east_exit': // Da Route 7 (Uscita verso il tunnel)
        addLog("Scendi nel Passaggio Sotterraneo...");
        teleport('underground_path_west_east');
        break;

    // --- ROUTE 12-15 ---
    case 'snorlax_block': 
        if(hasItem('poke_flute')) {
            addLog("Suoni il Poké Flauto! Snorlax attacca!");
            startBattle({pokemonId: 143, level: 30}, false);
        } else {
            addLog("Snorlax dorme. Serve un flauto.");
        }
        break;
    case 'snorlax_block_silence_bridge': 
        if(hasItem('poke_flute')) {
            addLog("Suoni il Poké Flauto! Snorlax si sveglia e attacca!");
            startBattle({pokemonId: 143, level: 30}, false);
        } else {
            addLog("Uno Snorlax dorme profondamente. Serve un flauto per svegliarlo.");
        }
        break;
    case 'enter_digletts_cave': teleport('digletts_cave'); break;
    case 'exit_to_route_11': teleport('route_11'); break;
    case 'exit_to_route_2': teleport('route_2_east'); break;
    case 'enter_digletts_cave_from_r2': teleport('digletts_cave'); break;

    // --- CYCLING ROAD ---
    case 'cycling_road_gate_east': case 'cycling_road_gate_west':
        if(hasItem('bicycle')) { addLog("Guardia: 'Hai una bici! Vai pure!'"); teleport('route_17'); }
        else { addLog("Guardia: 'Solo biciclette ammesse.'"); }
        break;
    case 'snorlax_block_cycling_road':
        if(hasItem('poke_flute')) {
            addLog("Suoni il Poké Flauto! Snorlax attacca!");
            startBattle({pokemonId: 143, level: 30}, false);
        } else {
            addLog("Snorlax dorme. Serve un flauto.");
        }
        break;

    // --- FUCHSIA & SAFARI ---
    case 'safari_zone_entrance': addLog("Benvenuto alla Zona Safari! (WIP)"); teleport('safari_zone_center'); break;
    case 'item_gold_teeth': if(!flags['gold_teeth_found']){ addItem('gold_teeth',1); setFlag('gold_teeth_found',true); addLog("Trovati Denti d'Oro!"); } break;
    case 'secret_house_surf': if(!flags['hm03_obtained']){ addItem('hm03',1); setFlag('hm03_obtained',true); addLog("Ottenuta MN03 (Surf)!"); } break;
    case 'wardens_house':
        if(hasItem('gold_teeth') && !flags['hm04_obtained']) {
            addLog("Guardiano: 'Grazie per i denti! Tieni MN04 (Forza)!'");
            addItem('hm04', 1); setFlag('hm04_obtained', true);
        } else if (!hasItem('gold_teeth')) {
            addLog("Guardiano: 'Mff ghff...' (Ha perso la dentiera)");
        }
        break;
    case 'fuchsia_gym':
        if(flags['soulBadgeObtained']) addLog("Koga: 'Il veleno è arte.'");
        else {
            addLog("Koga: 'Fwahahaha!'");
            startBattle(allTrainers.find(t=>t.id==='leader_koga'), true);
        }
        break;

    // --- CINNABAR & SEAFOAM ---
    case 'articuno_encounter': if(!flags['articuno_defeated']) { addLog("Gyaoo!"); startBattle({pokemonId: 146, level: 50}, false); } break; // Corrected Articuno ID
    case 'pokemon_mansion': teleport('pokemon_mansion_1f'); break;
    case 'get_secret_key': if(!flags['secret_key_obtained']) { addItem('secret_key', 1); setFlag('secret_key_obtained', true); addLog("Trovata Chiave Segreta!"); } break;
    case 'cinnabar_gym':
        if(hasItem('secret_key')) {
            if(flags['volcanoBadgeObtained']) addLog("Blaine: 'Sei bollente!'");
            else { addLog("Blaine: 'Ti incenerirò!'"); startBattle(allTrainers.find(t=>t.id==='leader_blaine'), true); }
        } else { addLog("La porta è chiusa a chiave."); }
        break;
    case 'fossil_reviver': addLog("Scienziato: 'Posso resuscitare i fossili!' (Logica WIP)"); break;

    // --- VIRIDIAN GYM FINAL ---
    case 'viridian_gym':
        if(flags['boss_giovanni_2_defeated']) {
            if(flags['earthBadgeObtained']) addLog("Giovanni: 'Vai alla Lega.'");
            else { addLog("Giovanni: 'Questa è la fine!'"); startBattle(allTrainers.find(t=>t.id==='leader_giovanni_final'), true); }
        } else { addLog("La porta è chiusa."); }
        break;

    // --- VICTORY ROAD & LEAGUE ---
    case 'badge_check_earth':
        if(flags['earthBadgeObtained']) { addLog("Guardia: 'Hai tutte le medaglie! Passa.'"); teleport('victory_road_1f'); }
        else addLog("Guardia: 'Serve la Medaglia Terra.'");
        break;
    case 'badge_check_cascade': if(hasBadge('cascadeBadgeObtained')) addLog("Medaglia Cascata OK."); else addLog("Alt! Serve Medaglia Cascata."); break;
    case 'badge_check_thunder': if(hasBadge('thunderBadgeObtained')) addLog("Medaglia Tuono OK."); else addLog("Alt! Serve Medaglia Tuono."); break;
    case 'badge_check_soul': if(hasBadge('soulBadgeObtained')) addLog("Medaglia Anima OK."); else addLog("Alt! Serve Medaglia Anima."); break;
    case 'badge_check_marsh': if(hasBadge('marshBadgeObtained')) addLog("Medaglia Palude OK."); else addLog("Alt! Serve Medaglia Palude."); break;
    case 'badge_check_volcano': if(hasBadge('volcanoBadgeObtained')) addLog("Medaglia Vulcano OK."); else addLog("Alt! Serve Medaglia Vulcano."); break;
    
    case 'moltres_encounter': if(!flags['moltres_defeated']) { addLog("Gyaoo!"); startBattle({pokemonId: 146, level: 50}, false); } break;
    case 'exit_to_indigo_plateau': teleport('indigo_plateau'); break;
    case 'elite_four_gate':
        addLog("Sfida Finale!");
        startBattle(allTrainers.find(t=>t.id==='champion_gary'), true);
        break;

    // --- GENERIC TELEPORTS (CONTEXT AWARE) ---
    case 'go_to_1f_stairs': teleport('silph_co_1f'); break;
    case 'go_to_2f_stairs': teleport('silph_co_2f'); break;
    case 'go_to_3f_stairs': teleport('silph_co_3f'); break;
    case 'go_to_4f_stairs': teleport('silph_co_4f'); break;
    case 'go_to_5f_stairs': teleport('silph_co_5f'); break;
    case 'go_to_6f_stairs': teleport('silph_co_6f'); break;
    case 'go_to_7f_stairs': teleport('silph_co_7f'); break;
    case 'go_to_8f_stairs': teleport('silph_co_8f'); break;
    case 'go_to_9f_stairs': teleport('silph_co_9f'); break;
    case 'go_to_10f_stairs': teleport('silph_co_10f'); break;
    case 'go_to_1f_main_stairs': teleport('pokemon_mansion_1f'); break;
    case 'go_to_3f_from_b1f': teleport('pokemon_mansion_3f'); break;
    case 'ladder_to_1f': teleport('victory_road_1f'); break;
    case 'ladder_to_2f': teleport('victory_road_2f'); break;
    case 'ladder_to_3f': teleport('victory_road_3f'); break;
    
    // SEAFOAM ISLANDS EXPLICIT LADDERS
    case 'ladder_to_b1f_A': case 'ladder_to_b1f_B': teleport('seafoam_islands_b1f'); break;
    case 'ladder_to_1f_A': case 'ladder_to_1f_B': teleport('seafoam_islands_1f'); break;
    case 'ladder_to_b2f_A': teleport('seafoam_islands_b2f'); break;
    case 'ladder_to_b3f': teleport('seafoam_islands_b3f'); break;
    case 'ladder_to_b4f': teleport('seafoam_islands_b4f'); break;

    // CONTEXT AWARE TELEPORTS (Fixes Ship/Tower/Dept Store Mixing)
    case 'go_to_1f':
        if (currentMap.includes('ss_anne')) teleport('ss_anne_1f');
        else if (currentMap.includes('pokemon_tower')) teleport('pokemon_tower_1f');
        else if (currentMap.includes('celadon_dept')) teleport('celadon_dept_store_1f');
        else if (currentMap.includes('silph')) teleport('silph_co_1f');
        else if (currentMap.includes('mansion')) teleport('pokemon_mansion_1f');
        else if (currentMap.includes('victory')) teleport('victory_road_1f');
        break;
    case 'go_to_2f': 
        if (currentMap.includes('ss_anne')) teleport('ss_anne_2f');
        else if (currentMap.includes('pokemon_tower')) teleport('pokemon_tower_2f');
        else if (currentMap.includes('celadon_dept')) teleport('celadon_dept_store_2f');
        else if (currentMap.includes('mansion')) teleport('pokemon_mansion_2f');
        else if (currentMap.includes('victory')) teleport('victory_road_2f');
        break;
    case 'go_to_3f': 
        if (currentMap.includes('pokemon_tower')) teleport('pokemon_tower_3f');
        else if (currentMap.includes('celadon_dept')) teleport('celadon_dept_store_3f');
        else if (currentMap.includes('silph')) teleport('silph_co_3f');
        else if (currentMap.includes('mansion')) teleport('pokemon_mansion_3f');
        else if (currentMap.includes('victory')) teleport('victory_road_3f');
        break;
    case 'go_to_4f': 
        if (currentMap.includes('pokemon_tower')) teleport('pokemon_tower_4f');
        else if (currentMap.includes('celadon_dept')) teleport('celadon_dept_store_4f');
        else if (currentMap.includes('silph')) teleport('silph_co_4f');
        break;
    case 'go_to_5f': 
        if (currentMap.includes('pokemon_tower')) teleport('pokemon_tower_5f');
        else if (currentMap.includes('celadon_dept')) teleport('celadon_dept_store_5f');
        else if (currentMap.includes('silph')) teleport('silph_co_5f');
        break;
    case 'go_to_6f': 
        if (currentMap.includes('pokemon_tower')) teleport('pokemon_tower_6f');
        else if (currentMap.includes('silph')) teleport('silph_co_6f');
        break;
    case 'go_to_7f': 
        if (currentMap.includes('pokemon_tower')) teleport('pokemon_tower_7f');
        else if (currentMap.includes('silph')) teleport('silph_co_7f');
        break;

    default:
        // Fallback generico
        if (eventId.startsWith('go_to_')) {
             if(eventId.includes('1f')) teleport(eventId.split('_to_')[1]); 
             else addLog("Scale/Ascensore");
        }
        else addLog("Nessun effetto.");
        break;
    }
};