import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRootDispatch, useRootState } from '../../../states/rootState';
import { RS_POST_SPREAD_OBJ } from '../../../states/selectors/sharedSelectors';
import aC4gamesGET from '../../http/api/get/aC4gamesGET';
import aCa3playerIdentifiersPseudoGET from '../../http/api/get/aC3playerIdentifiersPseudoGET';
import aC4playerAllocationsPlayerIdGET from '../../http/api/get/aC4playerAllocationsPlayerIdGET';
import addPlayerAllocationsToGameslist from '../../converter/api/addPlayerAllocationsToGameslist';
import {
  sortyBy3rdItemAsc, sortyBy3rdItemDesc,
} from '../../../tools/handleArrays';
import aC4allocationsPOST from '../../http/api/post/aC4allocationsPOST';
import SortButtonThGroup from '../../controls/sortButtonGroup/SortButtonThGroup';
import { ROUTE_GAME, ROUTE_GAME_DESCRIPTION } from '../../../constants/paths/appRoutes';
import './games.css';
import InfoIcon from '../../icons/info/InfoIcon';
import ArrowIcon from '../../icons/dashArrow/ArrowIcon';
import HourGlass from '../../icons/hourGlass/HourGlass';
import OngoingIcon from '../../icons/ongoing/OngoingIcon';
import HaltIcon from '../../icons/halt/HaltIcon';

const Games = () => {
  const rs = useRootState();
  const rd = useRootDispatch();
  const { t } = useTranslation();
  const [justJoined, setJustJoined] = useState({});
  const {
    dataGames, isAuth, username, dashCompMenGames,
  } = rs;
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  // const dataPlayerIdentifier = rs[`dataPlayerIdentifiers|${username}`] || '';
  // const dataPlayerAllocations = rs[`dataPlayerAllocations|${dataPlayerIdentifier}`] || [];
  let sortThisListItem = '';

  function sortyBy2ndItemAsc(a, b) {
    if (a[1][sortThisListItem] < b[1][sortThisListItem]) {
      return -1;
    }
    return 1;
  }
  function sortyBy2ndItemDesc(a, b) {
    if (a[1][sortThisListItem] < b[1][sortThisListItem]) {
      return 1;
    }
    return -1;
  }

  const onSortList = (e) => {
    sortThisListItem = e.target.name;
    const arr = [].concat(dataGames);
    if (e.target.value === '0') {
      rd({
        type: RS_POST_SPREAD_OBJ,
        payload: { dataGames: arr.sort(sortyBy2ndItemDesc) },
      });
    }
    if (e.target.value === '1') {
      rd({
        type: RS_POST_SPREAD_OBJ,
        payload: { dataGames: arr.sort(sortyBy2ndItemAsc) },
      });
    }
    if (e.target.value === 'a') {
      rd({ type: RS_POST_SPREAD_OBJ, payload: { dataGames: arr.sort(sortyBy3rdItemAsc) } });
    }
    if (e.target.value === 'b') {
      rd({ type: RS_POST_SPREAD_OBJ, payload: { dataGames: arr.sort(sortyBy3rdItemDesc) } });
    }
  };

  const onJoinGame = (e) => {
    const gameId = e.target.value;
    setJustJoined({ [gameId]: 1 });
    aC4allocationsPOST(rs, rd, gameId, username).then((res) => {
      if (res.msg.indexOf('Ok allocation updated or created') !== -1) {
        setJustJoined({ [gameId]: 2 });
        // ========
        // rd({ type: RS_POST_SPREAD_OBJ, payload:
        // { [`dataPlayerAllocations|${dataPlayerIdentifier}`]:
        // dataPlayerAllocations.concat([gameId.toString(), -1]) } });
      }
    });
  };

  useEffect(() => {
    if (dashCompMenGames) {
      aC4gamesGET(rs, rd).then((gms) => {
        if (isAuth && username && gms) {
          aCa3playerIdentifiersPseudoGET(rs, rd, username)
            .then((playerId) => {
              if (playerId) {
                aC4playerAllocationsPlayerIdGET(rs, rd, playerId)
                  .then((thisPlayersAllocations) => {
                    if (gms.length && thisPlayersAllocations) {
                      rd({
                        type: RS_POST_SPREAD_OBJ,
                        payload: {
                          dataGames:
                          addPlayerAllocationsToGameslist(thisPlayersAllocations, gms),
                        },
                      });
                    }
                  }).then(() => forceUpdate());
              }
            });
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, username, dashCompMenGames]);
  return (
    <div>
      {dashCompMenGames ? (
        <table className="tbl-games">
          <caption>games</caption>
          <thead>
            <tr>
              {[
                ['name', `${t('t_024')}`],
                ['variant', `${t('t_026')}`],
                ['deadline', `${t('t_096')}`],
                ['current_advancement', `${t('t_076')}`],
                ['current_state', `${t('t_095')}`],
              ].map((sortBtn) => (
                <SortButtonThGroup
                  key={`sortbuttongroupkey${sortBtn[0]}`}
                  sortItem={sortBtn[0]}
                  itemLabel={sortBtn[1]}
                  value1="1"
                  value2="0"
                  onSortList={onSortList}
                  className="clickable"
                />
              ))}

              {isAuth ? (
                <>
                  <SortButtonThGroup
                    sortItem="_NOT_SET_"
                    itemLabel={`${t('t_077')}`}
                    value1="a"
                    value2="b"
                    onSortList={onSortList}
                    className="clickable"
                  />
                  <th className="gameslist-th-link">
                    {t('t_078')}
                  </th>
                  <th className="gameslist-th-link">
                    info
                  </th>
                  <th className="gameslist-th-link" />
                </>
              ) : null}
            </tr>
          </thead>
          <tbody>

            {dataGames ? dataGames.map((it, index) => (
              <tr key={`gameslistkey${it[0]}`} className={index % 2 === 0 ? 'tr1' : 'tr2'}>
                <td><strong>{it[1].name.replace(/_/g, ' ')}</strong></td>
                <td><em>{it[1].variant}</em></td>
                <td>{new Date(it[1].deadline * 1000).toLocaleString('fr-FR')}</td>
                <td>{it[1].current_advancement}</td>
                <td>
                  {it[1].current_state === 0 ? <HourGlass /> : null}
                  {it[1].current_state === 1 ? <OngoingIcon /> : null}
                  {it[1].current_state === 2 ? <HaltIcon /> : null}
                </td>
                {it[2] !== undefined ? (
                  <td>
                    {it[2] === 0 ? t('t_050') : null}
                    {it[2] > 0 ? t('t_051') : null}
                    {it[1].current_state === 0 && it[2] === -1 ? t('t_057') : null}
                  </td>
                ) : <td />}

                <td className="tbl-mygames-td-listlink"><Link className="clickable" to={`${ROUTE_GAME}/${it[1].variant}/${it[1].name}`}><ArrowIcon /></Link></td>

                <td className="tbl-mygames-td-listlink">
                  <Link className="clickable" to={`${ROUTE_GAME_DESCRIPTION}/${it[1].name}`}>
                    <InfoIcon />
                  </Link>
                </td>

                {it[2] === -2 && it[1].current_state === 0 ? (
                  <td>
                    {justJoined[it[0]] === 1 ? t('t_058') : null}
                    {justJoined[it[0]] === 2 ? t('t_057') : null}
                    {justJoined[it[0]] === undefined ? (
                      <button className="games-btn-subscribe clickable" type="button" value={it[0]} onClick={(e) => onJoinGame(e)}>{t('t_079')}</button>
                    ) : null}
                  </td>
                ) : <td />}
              </tr>
            )) : null}

          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default Games;
