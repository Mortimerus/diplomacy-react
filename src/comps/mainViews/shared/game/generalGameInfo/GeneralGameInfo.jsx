import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTE_GAME_DESCRIPTION } from '../../../../../constants/paths/appRoutes';
import { useRootState } from '../../../../../states/rootState';
import { UI_STATE_BOARDVIEW_FULLMAP } from '../../../../../states/selectors/uiStateStelectors';
import getRolePropsById from '../../../../converter/middle/getRolePropsById';
import CalenderIcon from '../../../../icons/calender/CalenderIcon';
import FlagIcon from '../../../../icons/flag/FlagIcon';
import HourGlass from '../../../../icons/hourGlass/HourGlass';
import MapIcon from '../../../../icons/map/MapIcon';
import NowIcon from '../../../../icons/now/NowIcon';
import './generalGameInfo.css';

const GeneralGameInfo = () => {
  const rs = useRootState();
  const [displayGGI, setDisplayGGI] = useState(true);
  const {
    thisPlayersRole, thisVariant, thisGameName, thisCurrentState, uiBoardLayout, thisGameId,
    thisTurnMode, // th    </Draggable>isCurrentAdvancement, //  thisGameId,
  } = rs;
  const currentGameTime = rs[`dataGameTime|${thisGameName}`];
  const dataRoles = rs[`dataRoles|${thisVariant}`];
  const { t } = useTranslation();
  const dataGameAllocations = rs[`dataGameAllocations|${thisGameId}`] || [];
  const dataMap = rs[`dataMap|${thisVariant}`] || [];
  const { players } = dataMap;
  /*
  const fakeToGameTimeInput = {
    current_advancement: thisCurrentAdvancement - 1,
    deadline: 0,
  };
  */
  // const prevGameTime = toGameTime(fakeToGameTimeInput, yearZero);
  // const dataGamePosition = rs[`dataGamePositions|${thisGameId}`];
  return (
    <div className={`gginfofr${uiBoardLayout === UI_STATE_BOARDVIEW_FULLMAP ? ' gginfofxd' : ''}`}>
      {currentGameTime !== undefined ? (
        <>
          <table className="gginfo-it-grp">
            <tbody>
              {/** name */}
              <tr className="tr2">
                <td className="gginfo-hdr" colSpan="2">
                  <button className="gginfo-hdr-btn" type="button" onClick={() => setDisplayGGI((prev) => !prev)}>
                    {thisGameName.replace(/_/g, ' ')}
                  </button>
                </td>
              </tr>
              {displayGGI ? (

                <>
                  {/** variant */}
                  <tr>
                    <td><MapIcon /></td>
                    <td className="gginfo-item-inset"><em>{thisVariant}</em></td>
                  </tr>

                  {/* time */}
                  <tr className="tr2">
                    <td>
                      <CalenderIcon />
                    </td>
                    <td className="gginfo-item-inset">
                      {thisTurnMode === 0 && currentGameTime.season === 'spring' ? t('t_065') : null}
                      {thisTurnMode === 0 && currentGameTime.season === 'fall' ? t('t_066') : null}

                      {thisTurnMode === 0 ? ', ' : ''}

                      {thisTurnMode === 0 ? currentGameTime.year : null}

                      {thisTurnMode === -1 ? 'prev orders' : null}

                    </td>
                  </tr>
                  <tr>
                    <>
                      {players ? (
                        <>
                          {/** wait */}
                          {thisCurrentState === 0 ? (
                            <>
                              <td><HourGlass /></td>
                              <td className="gginfo-item-inset">
                                {dataGameAllocations.length - 1}
                                /
                                {players.length}
                              </td>
                            </>
                          ) : null}

                          {players.length + 1 >= dataGameAllocations.length
                      && thisCurrentState === 1 ? (
                        <>
                          <td className="gginfo-td-now">
                            <NowIcon />
                          </td>
                          <td className="gginfo-item-inset">
                            {thisTurnMode === 0 && currentGameTime.turnType === 'move' ? t('t_067') : null}
                            {thisTurnMode === 0 && currentGameTime.turnType === 'retreat' ? t('t_068') : null}
                            {thisTurnMode === 0 && currentGameTime.turnType === 'build' ? t('t_069') : null}

                          </td>
                        </>
                            ) : null}

                        </>
                      ) : null}

                    </>

                  </tr>
                  {/* nation */}
                  {// uiBoardLayout !== UI_STATE_BOARDVIEW_FULLMAP &&
              parseInt(thisPlayersRole, 10) > 0
                ? (
                  <tr className="tr2">
                    <td>
                      <FlagIcon className={`player${thisPlayersRole}`} />
                    </td>
                    <td className="gginfo-item-inset">
                      <em>
                        {getRolePropsById(thisPlayersRole, dataRoles)[1]}
                      </em>
                    </td>
                  </tr>
                ) : null
            }
                  {// uiBoardLayout !== UI_STATE_BOARDVIEW_FULLMAP
              parseInt(thisPlayersRole, 10) === 0 ? (
                <tr className="gginfo-it-sl1">
                  <td>
                    <FlagIcon className="" />
                  </td>
                  <td className="gginfo-item-inset">
                    {t('t_050')}
                  </td>

                </tr>
              ) : null
              }
                  <tr className="tr1">
                    <td colSpan="2"><Link className="gginfo-link" to={`${ROUTE_GAME_DESCRIPTION}/${thisGameName}`}>{t('t_126')}</Link></td>
                  </tr>
                </>
              ) : null}
            </tbody>
          </table>
          {/** game master */}
          {/*  */}
          {thisCurrentState === -1 && parseInt(thisPlayersRole, 10) === -1 ? (
            <div className="gginfo-it-sl1">{t('t_059')}</div>
          ) : null}

        </>
      ) : null}
    </div>
  );
};

export default GeneralGameInfo;
