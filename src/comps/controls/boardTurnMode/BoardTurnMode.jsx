import React from 'react';
import { useRootState } from '../../../states/rootState';
import { UI_STATE_BOARDVIEW_COMM, UI_STATE_BOARDVIEW_FULLMAP } from '../../../states/selectors/uiStateStelectors';
import BoardTurnModeBack from './BoardTurnModeBack';
import BoardTurnModeForward from './BoardTurnModeForward';

const BoardTurnMode = () => {
  const rs = useRootState();
  const { uiBoardLayout } = rs;
  return (
    <>
      {uiBoardLayout !== UI_STATE_BOARDVIEW_COMM ? (
        <div className={`btn-fr-turnmode${uiBoardLayout === UI_STATE_BOARDVIEW_FULLMAP ? ' isfixed' : ''}`}>
          <BoardTurnModeBack />
          <BoardTurnModeForward />
        </div>
      ) : null}

    </>
  );
};

export default BoardTurnMode;
