import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRootDispatch, useRootState } from '../../../states/rootState';
import aCa3playerIdentifiersPseudoGET from '../../http/api/get/aC3playerIdentifiersPseudoGET';
import aC4gamesGET from '../../http/api/get/aC4gamesGET';
import aC4playerAllocationsPlayerIdGET from '../../http/api/get/aC4playerAllocationsPlayerIdGET';
import './myGames.css';
import { ROUTE_GAME, ROUTE_GAME_DESCRIPTION } from '../../../constants/paths/appRoutes';
import aC4gameOrdersSubmittedGameIdGET from '../../http/api/get/aC4gameOrdersSubmittedGameIdGET';
import ArrowIcon from '../../icons/dashArrow/ArrowIcon';
import InfoIcon from '../../icons/info/InfoIcon';
import HourGlass from '../../icons/hourGlass/HourGlass';
import CheckIcon from '../../icons/check/CheckIcon';
import OngoingIcon from '../../icons/ongoing/OngoingIcon';
import HaltIcon from '../../icons/halt/HaltIcon';
import ActionNeededIcon from '../../icons/actionNeeded/ActionNeededIcon';
import MinusCircleIcon from '../../icons/minusCircle/MinusCircleIcon';
import Loader from '../../spinner/loader/Loader';
import InfoBox from '../../help/infoBox/InfoBox';

const MyGames = () => {
  const rs = useRootState();
  const rd = useRootDispatch();
  const { t } = useTranslation();
  const {
    dashCompMenMyGames, username, isAuth, uiShowHelp,
  } = rs;

  const fetchData = async () => {
    const apiGames = await aC4gamesGET(rs, rd);
    const apiPlayerId = await aCa3playerIdentifiersPseudoGET(rs, rd, username);
    const apiAllocations = await aC4playerAllocationsPlayerIdGET(rs, rd, apiPlayerId);
    return {
      apiPlayerId, apiGames, apiAllocations,
    };
  };
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const [gamesList, dispatcher] = useReducer(((state, action) => {
    const pal = action.payload.apiAllocations;
    const gam = action.payload.apiGames;
    let glist = [];
    const ordersSubmitted = {};
    const gameCanProceed = {};
    // let didLoad = false;
    if (gam) {
      if (gam.length) {
        for (let i = 0; i < gam.length; i += 1) {
          const gamGameId = gam[i][0];
          const gamGameProps = gam[i][1];
          const gamGameCurrentState = gamGameProps.current_state;
          if (pal) {
            if (pal.length) {
              for (let j = 0; j < pal.length; j += 1) {
                const palGameId = pal[j][0];
                const palAlloc = pal[j][1];
                if (gamGameId.toString() === palGameId.toString()) {
                  glist = glist.concat([
                    [palGameId, palAlloc, gamGameProps],
                  ]);
                  // fetch ordersSubmitted if game is on and player has a role
                  if (gamGameCurrentState === 1 && palAlloc > -1) {
                    // fetch ordersSubmitted
                    aC4gameOrdersSubmittedGameIdGET(rs, rd, gamGameId).then((apiOrdsSubm) => {
                      if (apiOrdsSubm) {
                        const { needed, submitted } = apiOrdsSubm;
                        if (needed.includes(palAlloc)
                        && submitted.includes(palAlloc) && palAlloc > 0) {
                          ordersSubmitted[gamGameId] = 1; // submitted
                        }
                        if (needed.includes(palAlloc)
                          && !submitted.includes(palAlloc) && palAlloc > 0) {
                          ordersSubmitted[gamGameId] = 2; // orders needed
                        }
                        if (!needed.includes(palAlloc) && palAlloc > 0) {
                          ordersSubmitted[gamGameId] = 3; // no orders to submit
                        }
                        if (needed.length === submitted.length) {
                          gameCanProceed[gamGameId] = true;
                        } else {
                          gameCanProceed[gamGameId] = false;
                        }
                        if (i + 1 === gam.length) {
                          // console.log('BEFORE FORCE UPDATE MY GAMES');
                          // setTimeout(() => forceUpdate(), 500);
                          // forceUpdate();
                          // didLoad = true;
                        }
                      }
                    });
                  } else {
                    ordersSubmitted[gamGameId] = 4; // not running or terminated
                  }
                }
              }
            }
          }
          if (i + 1 === gam.length) {
            // console.log('BEFORE FORCE UPDATE MY GAMES');
            // if (rs.dashCompMyGamesHasData === false) {
            // if (dashCompMyGamesHasData === false) {
            // forceUpdate();
            // }
            // forceUpdate();
            setTimeout(() => forceUpdate(), 1500);
          }
        }
      }
    }

    switch (action.type) {
      case 'LOAD_RES':
        return {
          ...state,
          glist,
          gm: glist.filter((it) => it[1] === 0),
          pl: glist.filter((it) => it[1] !== 0),
          vl: glist.filter((it) => it[1] === 0).length
            ? glist.filter((it) => it[1] === 0) : glist.filter((it) => it[1] !== 0), // default
          gameCanProceed,
          ordersSubmitted,
          didLoad: true,
          shows: (() => {
            if (glist.filter((it) => it[1] === 0).length) {
              return 'gm';
            }
            return 'pl';
          })(),
        };

      case 'FILTER':
        return {
          ...state,
          vl: state[action.payload],
          shows: action.payload,
        };
      default: return state;
    }
  }), {
    glist: [],
    gm: [],
    pl: [],
    vl: [],
    shows: 'pl',
    gameCanProceed: {},
    ordersSubmitted: {},
    didLoad: false,
  });

  const { vl } = gamesList;

  useEffect(() => {
    fetchData().then((da) => dispatcher({ type: 'LOAD_RES', payload: da }));
    // if (dashCompMyGamesHasData) {
    // }
  }, [username]);

  useEffect(() => () => {
    forceUpdate();
    dispatcher();
  }, []);

  return (
    <>
      {isAuth && username ? (
        <div>
          {dashCompMenMyGames ? (
            <div className="mygamesfr">
              {gamesList.didLoad && gamesList.glist.length !== 0 ? (
                <table className="tbl-mygames">
                  <caption>
                    <button hidden={gamesList.pl.length === 0} className={gamesList.shows === 'pl' ? 'isactive' : ''} type="button" onClick={() => dispatcher({ type: 'FILTER', payload: 'pl' })}>Player</button>
                    <button hidden={gamesList.gm.length === 0} className={gamesList.shows === 'gm' ? 'isactive' : ''} type="button" onClick={() => dispatcher({ type: 'FILTER', payload: 'gm' })}>GM</button>
                  </caption>
                  <thead>
                    <tr>
                      <th>{t('t_024')}</th>
                      <th className="nodispsmall">{t('t_026')}</th>
                      <th>{t('t_095')}</th>
                      <th className="nodispsmall">{t('t_076')}</th>
                      <th>link</th>
                      <th className="nodispsmall">descr</th>
                      {gamesList.shows !== 'gm' ? <th>your orders</th> : null}

                      <th className="tbl-mygames-deadline">
                        {t('t_096')}
                      </th>
                      <th className="nodispsmall">other orders</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vl ? vl.map((it, index) => (
                      <tr key={`keyGamesList${it[0]}`} className={index % 2 === 0 ? 'tr1' : 'tr2'}>
                        <td><strong>{it[2].name.replace(/_/g, ' ')}</strong></td>
                        <td className="nodispsmall"><em>{it[2].variant}</em></td>
                        <td>
                          {it[2].current_state === 0 ? <HourGlass /> : null}
                          {it[2].current_state === 1 ? <OngoingIcon /> : null}
                          {it[2].current_state === 2 ? <HaltIcon /> : null}
                        </td>
                        <td className="nodispsmall">{it[2].current_advancement}</td>

                        <td className="tbl-mygames-td-listlink"><Link to={`${ROUTE_GAME.replace(/\//g, '')}/${it[2].variant}/${it[2].name}`}><ArrowIcon /></Link></td>
                        <td className="tbl-mygames-td-listlink nodispsmall"><Link to={`${ROUTE_GAME_DESCRIPTION.replace(/\//g, '')}/${it[2].name}`}><InfoIcon /></Link></td>
                        {gamesList.shows !== 'gm' ? (
                          <td>
                            {gamesList.ordersSubmitted[it[0]] !== undefined ? (
                              <>
                                {gamesList.ordersSubmitted[it[0]] === 1 ? <CheckIcon /> : null}
                                {gamesList.ordersSubmitted[it[0]] === 2
                                  ? <ActionNeededIcon /> : null}
                                {gamesList.ordersSubmitted[it[0]] === 3
                                  ? <MinusCircleIcon /> : null}

                              </>
                            ) : null }
                            {gamesList.ordersSubmitted[it[0]] === undefined
                            && gamesList.gameCanProceed[it[0]] === undefined ? (
                              <div className="tbl-mygames-loader-fr">
                                <Loader />
                              </div>
                              ) : null}
                          </td>
                        ) : null}
                        {gamesList.gameCanProceed[it[0]] !== undefined || gamesList.shows === 'gm' ? (
                          <>

                            <td>{new Date(it[2].deadline * 1000).toLocaleString('fr-FR')}</td>

                          </>
                        ) : <td />}

                        <td className="nodispsmall">
                          {gamesList.gameCanProceed[it[0]] !== undefined ? (
                            <>
                              {gamesList.ordersSubmitted[it[0]] !== 2 ? (
                                <>
                                  {gamesList.gameCanProceed[it[0]]
                                    ? <CheckIcon /> : <HourGlass />}
                                </>
                              ) : null}
                            </>
                          ) : null}
                        </td>
                      </tr>
                    )) : null}
                  </tbody>
                </table>
              ) : null}

              {gamesList.didLoad === false ? <Loader /> : null }

              {gamesList.didLoad && gamesList.glist.length === 0 ? (
                <div className="mygames-emptylist-fr">
                  <div className="mygames-emtpylist-inner">
                    <div className="mygames-emptylist-msg">
                      {t('t_183')}
                    </div>
                    {uiShowHelp ? (
                      <div>
                        <InfoBox
                          className=""
                          summary="t_184"
                          list={['t_185', 't_186', 't_187']}
                        />
                      </div>

                    ) : null}
                  </div>
                </div>
              ) : null}

            </div>
          ) : null}
        </div>

      ) : null}

    </>
  );
};

export default MyGames;
