/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRootDispatch, useRootState } from '../../../../../states/rootState';
import { RS_BOARD_TOGGLE_COMPONENT } from '../../../../../states/selectors/uiSelectors';
import gameStatsList from '../../../../converter/middle/hybrids/gameStatsList';
import userPropsByroleId from '../../../../converter/middle/hybrids/userPropsByRoleId';
import aC3playersGET from '../../../../http/api/get/aC3playersGET';
import ActionNeededIcon from '../../../../icons/actionNeeded/ActionNeededIcon';
import CheckIcon from '../../../../icons/check/CheckIcon';
import FlagIcon from '../../../../icons/flag/FlagIcon';
import MinusCircleIcon from '../../../../icons/minusCircle/MinusCircleIcon';
import OneUserIcon from '../../../../icons/oneUser/OneUserIcon';
import TacticsIcon from '../../../../icons/tactics/TacticsIcon';
import UsersIcon from '../../../../icons/users/UsersIcon';
import Loader from '../../../../spinner/loader/Loader';
import './gameStats.css';

const GameStats = () => {
  const { t } = useTranslation();
  const rs = useRootState();
  const rd = useRootDispatch();
  const statsList = gameStatsList(rs);
  const [playerInfo, setPlayerInfo] = useState(null);
  const [choosenInfo, setChoosenInfo] = useState(null);
  const { thisPlayersRole, boardSubMenStatsExpanded, thisCurrentState } = rs;

  const onChoosePlayer = (e, id) => {
    if (e.target.value === choosenInfo) {
      setPlayerInfo(null);
      setChoosenInfo(null);
    } else {
      setPlayerInfo(userPropsByroleId(rs, id));
      setChoosenInfo(e.target.value);
    }
  };

  const onToggleComp = () => {
    rd({ type: RS_BOARD_TOGGLE_COMPONENT, payload: 'boardSubMenStatsExpanded' });
    setPlayerInfo(null);
  };

  useEffect(() => {
    aC3playersGET(rs, rd);
  }, []);

  return (
    <div className="gamestats-fr">
      {playerInfo ? (
        <table className="gamestats-playerdetails-tbl">
          <thead>
            <tr colSpan="2">
              <th colSpan="2" className="tr1">
                <span className="gamestats-playerdetails-hdr">
                  <OneUserIcon className={choosenInfo ? `player${choosenInfo}` : ''} />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="tr1">
              <td colSpan="2">
                {playerInfo.pseudo ? playerInfo.pseudo.replace(/_/g, ' ') : null}
              </td>
            </tr>
            <tr className="tr2">
              <td>{t('t_084')}</td>
              <td>
                {playerInfo.family_name}
              </td>
            </tr>
            <tr className="tr1">
              <td>{t('t_083')}</td>
              <td>
                {playerInfo.first_name}

              </td>
            </tr>
            <tr className="tr2">
              <td>{t('t_085')}</td>
              <td>
                {playerInfo.nationality}
              </td>
            </tr>

            <tr className="tr1">
              <td>
                {t('t_088')}
              </td>
              <td>
                {playerInfo.residence}
              </td>
            </tr>

            <tr className="tr2">
              <td>
                {t('t_089')}
              </td>
              <td>
                {playerInfo.time_zone}
              </td>
            </tr>
            <tr className="tr1" colSpan="2"><td colSpan="2">message</td></tr>
          </tbody>
        </table>

      ) : null}

      <table className="gamestats-playerslist-tbl">
        <thead>
          {statsList.length ? (
            <tr>
              <th className="gamestats-dispplayers-th">
                <button className="gamestats-dispplayers-btn" type="button" onClick={() => onToggleComp()}>
                  <UsersIcon />
                </button>
              </th>
              {boardSubMenStatsExpanded ? (
                <>
                  <th colSpan="2">
                    <FlagIcon
                      className=""
                    />
                  </th>
                  <th className="gamestats-small-nodisp">{t('t_127')}</th>
                  <th className="gamestats-small-nodisp">{t('t_128')}</th>
                  {thisCurrentState === 1 && thisPlayersRole !== null ? (
                    <th>
                      <TacticsIcon />
                    </th>
                  ) : null}
                </>
              ) : null}

            </tr>
          ) : null}

        </thead>
        <tbody>
          {boardSubMenStatsExpanded && statsList ? statsList.map((it, index) => {
            const [
              playersRoleId,
              thisRolesLabel,
              thisRolesAbr,
              thisPlayersArmies,
              thisPlayersFleets,
              thisPlayersUnits,
              thisPlayersCenters,
              thisPlayersNetVal,
              thisOrdersNeeded,
              thisOrdersSubmitted,
              thisActionRequired,
            ] = it;
            return (

              <tr key={`keygamestats${it[0]}`} className={`${index % 2 === 0 ? 'tr1' : 'tr2'}${playersRoleId.toString() === thisPlayersRole ? ' isbold' : ''}`}>
                {thisCurrentState === 1 ? (
                  <td className="loader-fr">
                    {userPropsByroleId(rs, playersRoleId).pseudo !== undefined ? (
                      <button className={`gamestats-listbtn${playersRoleId === choosenInfo ? ' isactive' : ''}`} value={playersRoleId} type="button" onClick={(e) => onChoosePlayer(e, playersRoleId)}>
                        {userPropsByroleId(rs, playersRoleId).pseudo.replace(/_/g, ' ')}
                      </button>
                    ) : <Loader />}
                  </td>
                ) : null}

                {thisCurrentState === 0 ? <td>?</td> : null}

                <td>
                  <svg className={`gamestats-col player${playersRoleId}`} viewBox="0 0 24 24" width="24" height="24">
                    <rect height="24" width="24" />
                  </svg>
                </td>
                <td>{thisRolesLabel}</td>
                <td className="gamestats-small-nodisp">{thisPlayersCenters}</td>
                <td className={`gamestats-small-nodisp gamestats-td-units${thisPlayersNetVal > 0 ? ' ispos' : ''}${thisPlayersNetVal < 0 ? ' isneg' : ''}`}>{thisPlayersUnits}</td>

                {thisCurrentState !== 0 && thisActionRequired !== 0 ? (
                  <td className="gamestats-icon-fr">
                    {thisOrdersNeeded === 1 ? <MinusCircleIcon /> : null}
                    {thisOrdersNeeded === 2 && thisOrdersSubmitted === 2 ? <CheckIcon /> : null}
                    {thisOrdersNeeded === 2
                    && thisOrdersSubmitted === 1 ? <ActionNeededIcon /> : null}
                  </td>
                ) : (
                  <>
                    {thisCurrentState === 1 && thisPlayersRole !== null ? (
                      <td className="gamestats-icon-fr"><MinusCircleIcon /></td>
                    ) : null}
                  </>
                )}

              </tr>

            );
          }) : null}
        </tbody>
      </table>
    </div>
  );
};

export default GameStats;
