import React from 'react';
import SiteNavigation from '../siteNavigation/SiteNavigation';
import BoardLayout from '../boardLayout/BoardLayout';
import './gameControls.css';
import ZoneInfo from '../../mainViews/shared/game/zoneInfo/ZoneInfo';
import BoardTurnMode from '../boardTurnMode/BoardTurnMode';
import GameInfo from '../../mainViews/shared/game/gameInfo/GameInfo';
import GameAction from '../../mainViews/shared/game/gameAction/GameAction';
import { useRootState } from '../../../states/rootState';
import GeneralGameInfo from '../../mainViews/shared/game/generalGameInfo/GeneralGameInfo';
import GameStats from '../../mainViews/shared/game/gameStats/GameStats';
import { UI_STATE_BOARDVIEW_FULLMAP } from '../../../states/selectors/uiStateStelectors';

const GameControls = () => {
  const rs = useRootState();
  const {
    uiBoardLayout, boardSubMenGGI, boardMenGameInfo, boardSubMenStats, isAuth,
  } = rs;
  return (
    <div className="gamectrls-fr">
      {uiBoardLayout !== UI_STATE_BOARDVIEW_FULLMAP || !isAuth ? <SiteNavigation /> : null}
      <div className="gamectrls-comps-fr">
        <GameInfo />
        {uiBoardLayout !== UI_STATE_BOARDVIEW_FULLMAP ? (
          <>
            <div className="brd-gameinfo-fr isnotfixed">
              <GeneralGameInfo />
            </div>
            <div className="brd-gameinfo-fr isnotfixed">
              <GameStats />
            </div>
          </>
        ) : (
          <>
            <div className={`brd-gameinfo-fr isfixed${boardMenGameInfo ? ' isopen' : ''}`}>
              {boardSubMenGGI ? <GeneralGameInfo /> : null}
            </div>
            <div className={`brd-gameinfo-fr isfixed${boardMenGameInfo ? ' isopen' : ''}`}>
              {boardSubMenStats ? <GameStats /> : null}
            </div>
          </>
        )}
        <GameAction />
      </div>
      <BoardLayout />
      <BoardTurnMode />
      <ZoneInfo />
    </div>
  );
};
export default GameControls;
