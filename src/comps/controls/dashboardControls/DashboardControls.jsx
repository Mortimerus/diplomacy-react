import React from 'react';
import { useRootDispatch, useRootState } from '../../../states/rootState';
import { RS_DASH_TOGGLE_COMPONENT } from '../../../states/selectors/uiSelectors';
import './dashboardControls.css';

const DashboardControls = () => {
  const rs = useRootState();
  const rd = useRootDispatch();
  const {
    dashCompMenGames, dashCompGMMenCreateGame, dashCompMenUsers, dashCompMenMyGames,
  } = rs;

  return (
    <div>
      <button className={`dath-ctrls-btn${dashCompMenMyGames ? ' isactive' : ''}`} type="button" onClick={() => rd({ type: RS_DASH_TOGGLE_COMPONENT, payload: 'dashCompMenMyGames' })}>
        my games
      </button>
      <button className={`dath-ctrls-btn${dashCompMenGames ? ' isactive' : ''}`} type="button" onClick={() => rd({ type: RS_DASH_TOGGLE_COMPONENT, payload: 'dashCompMenGames' })}>
        all games
      </button>
      <button className={`dath-ctrls-btn${dashCompGMMenCreateGame ? ' isactive' : ''}`} type="button" onClick={() => rd({ type: RS_DASH_TOGGLE_COMPONENT, payload: 'dashCompGMMenCreateGame' })}>
        create game
      </button>
      <button className={`dath-ctrls-btn${dashCompMenUsers ? ' isactive' : ''}`} type="button" onClick={() => rd({ type: RS_DASH_TOGGLE_COMPONENT, payload: 'dashCompMenUsers' })}>
        players
      </button>
    </div>
  );
};

export default DashboardControls;
