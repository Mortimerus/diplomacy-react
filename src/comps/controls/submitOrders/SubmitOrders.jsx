import React, { useState } from 'react';
// import Draggable from 'react-draggable';
import { useTranslation } from 'react-i18next';
import { useRootDispatch, useRootState } from '../../../states/rootState';
import { RS_POST_SPREAD_OBJ } from '../../../states/selectors/sharedSelectors';
import { RS_BOARD_TOGGLE_COMPONENT, RS_DASH_TOGGLE_COMPONENT } from '../../../states/selectors/uiSelectors';
import { UI_STATE_BOARDVIEW_COMM, UI_STATE_BOARDVIEW_FULLMAP } from '../../../states/selectors/uiStateStelectors';
import getPlayersNetAssets from '../../converter/middle/gamePositions/getPlayersNetAssets';
import getPlayersUnitsByRole from '../../converter/middle/gamePositions/getPlayersUnitsByrole';
import playersDislodgedOnes from '../../converter/middle/gamePositions/playersDislodgedOnes';
import aC4gameOrdersGameIdPOST from '../../http/api/post/aC4gameOrdersGameIdPOST';
import './submitOrders.css';
// import OrderIcon from '../../icons/order/OrderIcon';
import FutureIcon from '../../icons/future/FutureIcon';
import TacticsIcon from '../../icons/tactics/TacticsIcon';
import InfoBox from '../../help/infoBox/InfoBox';
import CurrentOrders from '../../mainViews/shared/game/currentOrders/CurrentOrders';
import Loader from '../../spinner/loader/Loader';
import CheckIcon from '../../icons/check/CheckIcon';
import ActionNeededIcon from '../../icons/actionNeeded/ActionNeededIcon';
import PlayersOrders from '../../mainViews/shared/game/playersOrders/PlayersOrders';

const SubmitOrders = () => {
  const rs = useRootState();
  const rd = useRootDispatch();
  const { t } = useTranslation();
  const [displayComp, setDisplayComp] = useState(false);
  const {
    thisOrdersNeeded, thisOrdersSubmitted, thisOrders, boardIsEnteringOrders,
    thisGameId, thisPlayersRole, boardShowCurrentOrders, boardOrderErrorMsg,
    thisGameName, uiBoardLayout, thisTurnMode, thisCurrentAdvancement, boardMenGameAction,
    uiShowHelp, uiProcSendOrders,
  } = rs;
  const dataGamePositions = rs[`dataGamePositions|${thisGameId}`];
  const dataGameOrders = rs[`dataGameOrders|${thisGameId}`];
  const dataGameTime = rs[`dataGameTime|${thisGameName}`];
  const { turnType } = dataGameTime || [];
  const { units, dislodgedOnes } = dataGamePositions || [];
  // const { orders } = dataGameOrders || [];
  const currentPosition = rs[`dataGamePositions|${thisGameId}`];

  const onSubmitOrders = () => {
    aC4gameOrdersGameIdPOST(rs, rd);
  };

  const onToggleGameAction = () => {
    rd({ type: RS_BOARD_TOGGLE_COMPONENT, payload: 'boardMenGameAction' });
    rd({ type: RS_POST_SPREAD_OBJ, payload: { boardMenGameInfo: false } });
  };

  const onShowCurrentOrders = () => {
    if (!boardShowCurrentOrders) {
      rd({
        type: RS_POST_SPREAD_OBJ,
        payload: {
          thisOrders: dataGameOrders.orders,
          thisFakeUnits: dataGameOrders.fake_units,
          // boardIsEnteringOrders: true,
          boardShowCurrentOrders: true,
        },
      });
    } else {
      rd({
        type: RS_POST_SPREAD_OBJ,
        payload: {
          thisOrders: [],
          thisFakeUnits: [],
          boardIsEnteringOrders: false,
          boardShowCurrentOrders: false,
        },
      });
    }
    rd({ type: RS_DASH_TOGGLE_COMPONENT, payload: 'boardShowCurrentOrders' });
  };

  return (
    <div className={uiBoardLayout === UI_STATE_BOARDVIEW_FULLMAP ? 'brd-isfull' : ''}>
      {uiBoardLayout !== UI_STATE_BOARDVIEW_COMM && thisPlayersRole > 0
      && thisTurnMode === 0 && thisOrdersSubmitted ? (
        <button title={t('t_143')} className={`btn-futureorders${uiBoardLayout === UI_STATE_BOARDVIEW_FULLMAP ? ' isfixed' : ''}${boardShowCurrentOrders ? ' isactive' : ''}${thisCurrentAdvancement < 1 ? ' issolo' : ''}`} type="button" onClick={() => onShowCurrentOrders()}>
          <FutureIcon />
        </button>
        ) : null}
      {thisPlayersRole > -2 ? (
        <>

          {(thisTurnMode === 0 // && thisPlayersRole > 0
      && uiBoardLayout === UI_STATE_BOARDVIEW_FULLMAP)
      || (thisTurnMode < 0 && uiBoardLayout === UI_STATE_BOARDVIEW_FULLMAP) ? (
        <button
          className={`brd-gameaction-btn-oc${(thisOrdersNeeded && thisTurnMode === 0
        && thisOrdersSubmitted) ? ' done' : ''}${(thisOrdersNeeded && thisTurnMode === 0
          && !thisOrdersSubmitted) ? ' reqaction' : ''}`}
          type="button"
          onClick={() => onToggleGameAction()}
        >
          <TacticsIcon />
        </button>
            ) : null}

          <div>

            <div className={`brd-gameaction-mn-fr${(thisTurnMode === 0 && thisPlayersRole > 0
      && uiBoardLayout === UI_STATE_BOARDVIEW_FULLMAP && boardMenGameAction)
      || (thisTurnMode < 0 && uiBoardLayout === UI_STATE_BOARDVIEW_FULLMAP && boardMenGameAction)
              ? ' isfixed' : ''}`}
            >
              {/** orders needed */}
              {thisOrdersNeeded && !thisOrdersSubmitted ? (
                <div className="brd-gameaction-grp">
                  <div className="brd-gameaction-message">
                    <button className="brd-gameaction-hdr-btn" type="button" onClick={() => setDisplayComp((prev) => !prev)}>
                      <div className="brd-gameaction-message-icon-fr cta">
                        {/** orders needed */}
                        {t('t_105')}
                        <ActionNeededIcon />
                      </div>
                    </button>
                  </div>
                  {displayComp && uiShowHelp ? (
                    <>
                      <InfoBox
                        className=""
                        summary="t_130"
                        list={['t_190', 't_189']}
                      />
                      <InfoBox
                        className=""
                        summary="t_191"
                        list={['t_192', 't_193', 't_194', 't_195', 't_196']}
                      />
                    </>
                  ) : null}
                </div>
              ) : null}

              {/** show orders */}
              {thisTurnMode === 0
            && thisOrdersNeeded
            && thisOrdersSubmitted
                ? (

                  <div className="brd-gameaction-grp">
                    <div className="brd-gameaction-message nocta">
                      <button className="brd-gameaction-hdr-btn" type="button" onClick={() => setDisplayComp((prev) => !prev)}>
                        <div className="brd-gameaction-message-icon-fr nocta">
                          {t('t_106')}
                          <CheckIcon />
                        </div>
                      </button>
                    </div>
                    {displayComp && uiShowHelp ? (
                      <>
                        <InfoBox
                          className=""
                          summary="t_130"
                          list={['t_131', 't_132', 't_133']}
                        />
                        <InfoBox
                          className=""
                          summary="t_134"
                          list={['t_135', 't_136', 't_137', 't_138', 't_139', 't_140']}
                        />
                        <InfoBox
                          className=""
                          summary="t_170"
                          list={['t_171', 't_172', 't_174', 't_173']}
                        />
                      </>
                    ) : null}
                  </div>

                ) : null}

              {/** no orders needed */}
              {!thisOrdersNeeded && thisTurnMode === 0 && thisPlayersRole > 0 ? (
                <div className="brd-gameaction-grp">
                  <div className="brd-gameaction-message noint">
                    <button className="brd-gameaction-hdr-btn" type="button" onClick={() => setDisplayComp((prev) => !prev)}>
                      <div>
                        {t('t_107')}
                      </div>
                    </button>
                  </div>
                  {displayComp && uiShowHelp ? (
                    <InfoBox
                      className=""
                      summary="t_130"
                      list={['t_131', 't_215', 't_133']}
                    />
                  ) : null}
                </div>
              ) : null}

              {/** submit */}

              {/** how many builds */}
              {displayComp && thisOrdersNeeded && turnType === 'build'
          && getPlayersNetAssets(currentPosition, thisPlayersRole) - thisOrders.length >= 0 ? (
            <div className="brd-gameaction-grp">
              <div className="brd-gameaction-message noint">
                <div>
                  {t('t_148')}
                  :
                  {' '}
                  {getPlayersNetAssets(currentPosition, thisPlayersRole) - thisOrders.length}
                </div>
              </div>
              {uiShowHelp ? (
                <>
                  <InfoBox
                    className=""
                    summary="t_130"
                    list={['t_150', 't_151', 't_152']}
                  />
                  <InfoBox
                    className=""
                    summary="t_153"
                    list={['t_154', 't_155', 't_156', 't_157', 't_139']}
                  />
                  <InfoBox
                    className=""
                    summary="t_158"
                    list={['t_159']}
                  />
                  <InfoBox
                    className=""
                    summary="t_160"
                    list={['t_161']}
                  />
                  <InfoBox
                    className=""
                    summary="t_170"
                    list={['t_171', 't_172', 't_174', 't_173']}
                  />
                </>
              ) : null}
            </div>
                ) : null}

              {/** how many dispands */}
              {displayComp && thisOrdersNeeded && turnType === 'build' && getPlayersNetAssets(currentPosition, thisPlayersRole) < 0
          && getPlayersNetAssets(currentPosition, thisPlayersRole) - thisOrders.length <= 0 ? (
            <div className="brd-gameaction-grp">
              <div className="brd-gameaction-message noint">
                <div>
                  {t('t_149')}
                  :
                  {' '}
                  {Math.abs(getPlayersNetAssets(currentPosition, thisPlayersRole)
                    + thisOrders.length)}
                </div>
              </div>
              {uiShowHelp ? (
                <>
                  <InfoBox
                    className=""
                    summary="t_130"
                    list={['t_162', 't_163', 't_164']}
                  />
                  <InfoBox
                    className=""
                    summary="t_165"
                    list={['t_166', 't_167', 't_168', 't_169']}
                  />
                </>
              ) : null}
            </div>
                ) : null}
              {displayComp && thisTurnMode === 0 ? <CurrentOrders /> : null}
              {thisTurnMode < 0 ? (<PlayersOrders />) : null}

              {(displayComp && boardIsEnteringOrders && thisOrdersNeeded && turnType === 'move' && thisOrders.length === getPlayersUnitsByRole(units, thisPlayersRole).length)
      || (displayComp && boardIsEnteringOrders && thisOrdersNeeded && turnType === 'build' && getPlayersNetAssets(currentPosition, thisPlayersRole) < 0 && getPlayersNetAssets(currentPosition, thisPlayersRole) + thisOrders.length === 0)
      || (displayComp && boardIsEnteringOrders && thisOrdersNeeded && turnType === 'build' && getPlayersNetAssets(currentPosition, thisPlayersRole) >= thisOrders.length)
      || (displayComp && boardIsEnteringOrders && thisOrdersNeeded && turnType === 'retreat' && playersDislodgedOnes(dislodgedOnes, thisPlayersRole).length - thisOrders.length === 0)
                ? (
                  <div className="brd-gameaction-grp">
                    <div className="brd-gameaction-message noint subm">
                      <div className="brd-gameaction-message-icon-fr nocta">
                        {/** ready to submit orders */}
                        {t('t_147')}
                        <TacticsIcon />
                      </div>
                      <button disabled={uiProcSendOrders} className={`btn-submorders${uiBoardLayout === UI_STATE_BOARDVIEW_FULLMAP ? ' isfixed' : ''}${uiProcSendOrders ? ' sending' : ''}`} type="button" onClick={() => onSubmitOrders()}>
                        {/** sumbit orders */}
                        {!uiProcSendOrders ? t('t_139') : <Loader />}
                      </button>
                    </div>
                    {uiShowHelp ? (
                      <>
                        <InfoBox
                          className=""
                          summary="t_130"
                          list={['t_145', 't_146']}
                        />

                      </>
                    ) : null}
                  </div>
                ) : null}

              {/** error message */}
              {boardOrderErrorMsg ? (

                <div className="orderr-fr">
                  <div className="oderr-msg">
                    {boardOrderErrorMsg}
                  </div>
                  <br />
                  <button className="orderr-btn" type="button" onClick={() => rd({ type: RS_POST_SPREAD_OBJ, payload: { boardOrderErrorMsg: null } })}>
                    ok
                  </button>
                </div>
              ) : null}

            </div>

          </div>
        </>
      ) : null}
    </div>
  );
};

export default SubmitOrders;
