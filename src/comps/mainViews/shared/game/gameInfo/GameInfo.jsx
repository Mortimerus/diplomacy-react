import React from 'react';
import { useRootDispatch, useRootState } from '../../../../../states/rootState';
import { RS_POST_SPREAD_OBJ } from '../../../../../states/selectors/sharedSelectors';
import { RS_BOARD_TOGGLE_COMPONENT, RS_CHOOSE_BOARD_COMP } from '../../../../../states/selectors/uiSelectors';
import { UI_STATE_BOARDVIEW_FULLMAP } from '../../../../../states/selectors/uiStateStelectors';
import zonesCSS from '../../../../highlighters/zonesCSS';
import InfoIcon from '../../../../icons/info/InfoIcon';
import ListIcon from '../../../../icons/list/ListIcon';
import QuestionMarkIcon from '../../../../icons/questionMark/QuestionMark';
// import GameStats from '../gameStats/GameStats';
// import GeneralGameInfo from '../generalGameInfo/GeneralGameInfo';
import './gameInfo.css';

const GameInfo = () => {
  const rs = useRootState();
  const rd = useRootDispatch();
  const {
    uiBoardLayout, boardMenGameInfo, thisHighlight,
  } = rs;

  const toggleBody = () => {
    if (!boardMenGameInfo) {
      rd({
        type: RS_POST_SPREAD_OBJ,
        payload: { boardSubMenStatsExpanded: true, boardSubMenGGIExpanded: true },
      });
    }
    rd({ type: RS_BOARD_TOGGLE_COMPONENT, payload: 'boardMenGameInfo' });
    rd({ type: RS_POST_SPREAD_OBJ, payload: { thisZoneInfo: null } });

    if (thisHighlight.length) {
      for (let i = 0; i < thisHighlight.length; i += 1) {
        zonesCSS(thisHighlight[i], 'isactive').removeClass();
      }
    }
  };

  return (
    <>

      <div
        className={`brd-gameinfo-btn-fullview${uiBoardLayout === UI_STATE_BOARDVIEW_FULLMAP ? ' isfixed' : ''}`}
      >
        <div className={`brd-gameinfo-menu-btn-gr ${boardMenGameInfo ? ' isopen' : ''}`}>
          <button type="button">item</button>
          <button onClick={() => rd({ type: RS_CHOOSE_BOARD_COMP, payload: 'stats' })} type="button"><ListIcon /></button>
          <button onClick={() => rd({ type: RS_CHOOSE_BOARD_COMP, payload: 'generalInfo' })} type="button"><QuestionMarkIcon /></button>
        </div>
        <button
          className={`brd-gameinfo-btn-open${boardMenGameInfo ? ' isactive' : ''}`}
          type="button"
          onClick={() => toggleBody()}
        >
          <InfoIcon />
        </button>

      </div>
    </>
  );
};

export default GameInfo;
