import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRootDispatch, useRootState } from '../../../states/rootState';
import { RS_BOARD_TOGGLE_COMPONENT } from '../../../states/selectors/uiSelectors';
import { UI_STATE_BOARDVIEW_FULLMAP } from '../../../states/selectors/uiStateStelectors';
import aC4gameAdjudicationsGameIdPOST from '../../http/api/post/aC4gameAdjudicationsGameIdPOST';
import aC4GameGameNamePUT from '../../http/api/put/aC4GamesGameNamePUT';
import GameMasterIcon from '../../icons/gameMaster/GameMasterIcon';
import './gmConsole.css';

const GmConsole = () => {
  const rs = useRootState();
  const rd = useRootDispatch();
  const { t } = useTranslation();
  const [apiProc, setApiProc] = useState(0);
  const [didStart, setDidStart] = useState(null);
  const {
    thisPlayersRole, thisCurrentAdvancement, username, thisGameName, thisCurrentState, thisGameId,
    uiBoardLayout, boardMenGameMaster, thisVariant,
  } = rs;
  const dataGameOrdersSubmitted = rs[`dataGameOrdersSubmitted|${thisGameId}`];
  const { needed, submitted } = dataGameOrdersSubmitted || [];

  const dataGameAllocations = rs[`dataGameAllocations|${thisGameId}`] || [];
  const dataMap = rs[`dataMap|${thisVariant}`] || [];
  const { players } = dataMap;

  const onStartGame = () => {
    setDidStart(1);
    aC4GameGameNamePUT(rs, rd, username, thisGameName, 1).then((res) => {
      console.log('api response gameGameNamePUT \n', res);
      if (res.msg.indexOf('Not enough players !' !== -1)) {
        setDidStart(2);
      }
      if (res.msg === 'Ok but no change !') {
        setDidStart(3);
      }
      if (res.msg === 'Ok updated') {
        setDidStart(4);
      }
    });
  };

  const onProceedGame = () => {
    setApiProc(1);
    aC4gameAdjudicationsGameIdPOST(rs, rd).then((res) => {
      console.log('api response gameGameNamePUT \n', res);
      if (res) {
        if (res.msg !== undefined) {
          if (res.msg.includes('Ok adjudication performed and game updated')) {
            setApiProc(2);
          } else {
            setApiProc(3);
          }
        }
      }
    });
  };

  return (
    <>
      {needed && submitted && thisPlayersRole === 0 ? (
        <>

          {uiBoardLayout === UI_STATE_BOARDVIEW_FULLMAP ? (
            <button
              type="button"
              className={`brd-gmconsole-btn${uiBoardLayout === UI_STATE_BOARDVIEW_FULLMAP ? ' isfixed' : ''}${(needed.length === 0 && submitted.length === 0 && dataGameAllocations.length === players.length + 1)
            || ((needed.length > 0) && (needed.length === submitted.length)
              && dataGameAllocations.length === players.length + 1)
            || (thisPlayersRole === 0 && thisCurrentAdvancement === 0
              && thisCurrentState === 0 && dataGameAllocations.length === players.length + 1)
            || (thisCurrentAdvancement === 0 && players.length + 1 === dataGameAllocations.length)
                ? ' reqaction'
                : ''}`}
              onClick={() => rd({ type: RS_BOARD_TOGGLE_COMPONENT, payload: 'boardMenGameMaster' })}
            >
              <GameMasterIcon />
            </button>
          ) : null}

          <div className={`brd-gmconsole-fr${boardMenGameMaster ? ' isfixed' : ''}`}>

            {uiBoardLayout === UI_STATE_BOARDVIEW_FULLMAP ? (
              <div className="brd-icn-bg">
                <GameMasterIcon />
              </div>
            ) : null}

            {thisPlayersRole === 0 && thisCurrentAdvancement === 0 && thisCurrentState === 0
              && players.length + 1 === dataGameAllocations.length ? (
                <div>
                  {didStart === null ? (
                    <button className="gmconsole-btn" type="button" onClick={() => onStartGame()}>
                      {/* start game */}
                      {t('t_064')}
                    </button>
                  ) : null}
                  {didStart === 1 ? t('t_060') : null}
                  {didStart === 2 ? t('t_061') : null}
                  {didStart === 3 ? t('t_063') : null}
                  {didStart === 4 ? t('t_062') : null}
                </div>
              ) : null}

            {thisPlayersRole === 0 && needed && submitted ? (
              <>
                {(needed.length === 0 && submitted.length === 0)
                  || ((needed.length > 0) && (needed.length === submitted.length)) ? (
                    <div>
                      {apiProc === 0 ? (
                        <button className="gmconsole-btn" type="button" onClick={() => onProceedGame()}>
                          {/* proceed */}
                          {t('t_144')}
                        </button>
                      ) : null}
                      { apiProc === 1 ? (
                        <div className="brd-gmconsole-proceeding">
                          {/* proceding... */}
                          {t('t_234')}
                        </div>
                      ) : null}
                      { apiProc === 2 ? (
                        <div className="brd-gmconsole-didproceed">
                          {/* did proceed */}
                          {t('t_235')}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
              </>
            ) : null}
          </div>
        </>
      ) : null}

    </>
  );
};

export default GmConsole;
