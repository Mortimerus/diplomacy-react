import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRootDispatch, useRootState } from '../../../states/rootState';
// import { RS_POST_SPREAD_OBJ } from '../../../states/selectors/sharedSelectors';
import { HISTORY_SCROLL } from '../../../states/selectors/uiSelectors';
import NowIcon from '../../icons/now/NowIcon';
// import aCa4gameTransitionsGameIdCurrentAdvancementGET from
//  '../../http/api/get/aC4gameTransitionsGameIdCurrentAdvancementGET';

const BoardTurnModeForward = () => {
  // const rs = useRootState();
  const rd = useRootDispatch();
  const rs = useRootState();
  const { t } = useTranslation();
  const { thisCurrentAdvancement, thisCurrentState, thisTurnMode } = rs;

  /**
   * DEV: scroll time
   */
  /*
  /*
  const { thisTurnMode, thisCurrentAdvancement, thisGameId } = rs;

  const onGoBack = () => {
    const gameTransitions1 = rs[`dataGameTransitions|${thisGameId}|
      ${thisCurrentAdvancement + (thisTurnMode - 1)}`];
    const gameTransitions2 = rs[`dataGameTransitions|${thisGameId}|
      ${thisCurrentAdvancement + (thisTurnMode - 2)}`];

    if (gameTransitions1 === undefined) {
      aCa4gameTransitionsGameIdCurrentAdvancementGET(rs, rd,
        thisGameId, thisCurrentAdvancement + (thisTurnMode - 1));
    }
    if (gameTransitions2 === undefined) {
      aCa4gameTransitionsGameIdCurrentAdvancementGET(rs, rd,
        thisGameId, thisCurrentAdvancement + (thisTurnMode - 2));
    }
    rd({ type: RS_POST_SPREAD_OBJ, payload: { thisTurnMode: -2 } });
  };
  */
  return (
    <>
      {thisCurrentState > 0 && thisCurrentAdvancement > 0 ? (

        <button
          title={t('t_142')}
          className={`btn-tmode${thisTurnMode === -1 ? ' disable' : ''}`}
          type="button"
          onClick={() => rd({
            type: HISTORY_SCROLL, dir: 'fwd',
          })}
        >
          <NowIcon />
        </button>

      ) : null}

    </>
  );
};

export default BoardTurnModeForward;
