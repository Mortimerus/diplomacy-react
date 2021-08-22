import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRootDispatch, useRootState } from '../../../../states/rootState';
import Map from '../../../map/main/Map';
import gameStartupProc from './startup/gameStartupProc';
import './game.css';
import GameControls from '../../../controls/gameControls/GameControls';
import setLayout from './startup/setLayout';
// import SiteNavigation from '../../../controls/siteNavigation/SiteNavigation';
import useCurrentDim from '../../../startUp/useCurrentDim';
import { RS_POST_SPREAD_OBJ } from '../../../../states/selectors/sharedSelectors';
// eslint-disable-next-line no-unused-vars
import { UI_STATE_BOARDVIEW_COMM, UI_STATE_BOARDVIEW_DEFAULT, UI_STATE_BOARDVIEW_FULLMAP } from '../../../../states/selectors/uiStateStelectors';
// import getMapConf from './startup/getMapConf';
import resetState from './startup/resetState';
// import toggleFullScreen from '../../../../theme/toggleFullScreen';

const Game = () => {
  const { variant, gameName } = useParams();
  const rd = useRootDispatch();
  const rs = useRootState();
  const {
    dom: { refMain }, mapRef, username, isAuth, uiBoardLayout,
  } = rs;
  const dim = useCurrentDim();
  const { currentWidth, currentHeight } = dim;

  const startCallBack = useCallback(() => {
    resetState(rd).then(() => {
      gameStartupProc(rs,
        rd, variant, gameName, username, isAuth);
    // getMapConf(rs, rd, variant);
    });
  }, [rd, variant, gameName, isAuth, username, rs]);

  useEffect(() => {
    // resetState(rd).then(() => {
    startCallBack();
    // });
  }, [variant, username, variant, isAuth]);

  useEffect(() => {
    setLayout(rs, rd);
    if (refMain) {
      if (refMain.current) {
        refMain.current.classList.add('boardview');
      }
    }
    const unsub = () => {
      if (refMain) {
        if (refMain.current) {
          refMain.current.classList.remove('boardview');
        }
      }
    };
    return () => unsub();
  }, [refMain]);

  useEffect(() => {
    if (mapRef) {
      // https://stackoverflow.com/questions/1713771/how-to-detect-page-zoom-level-in-all-modern-browsers
      const screenCssPixelRatio = (window.outerWidth - 8) / window.innerWidth;
      // console.log(screenCssPixelRatio);
      if (
        // FULL VIEW
        // mobiles, landscape/small screens
        ((currentWidth > currentHeight)
        && (uiBoardLayout !== UI_STATE_BOARDVIEW_COMM)
        && (currentWidth < 1400 / screenCssPixelRatio))
      ) {
        mapRef.classList.add('full');
        mapRef.classList.remove('default');
        mapRef.classList.remove('comm');
        rd({
          type: RS_POST_SPREAD_OBJ,
          payload: {
            uiBoardLayout: UI_STATE_BOARDVIEW_FULLMAP,
          },
        });
      } else if (
        ((currentWidth < currentHeight) && (uiBoardLayout === UI_STATE_BOARDVIEW_DEFAULT))
      || ((currentHeight > currentWidth) && (uiBoardLayout === UI_STATE_BOARDVIEW_FULLMAP))
      ) {
        mapRef.classList.add('default');
        mapRef.classList.remove('full');
        mapRef.classList.remove('comm');
        rd({
          type: RS_POST_SPREAD_OBJ,
          payload: {
            uiBoardLayout: UI_STATE_BOARDVIEW_DEFAULT,
          },
        });
        // toggleFullScreen(false);
      }
    }
  }, [currentWidth, mapRef, rd, currentHeight, uiBoardLayout]);

  useEffect(() => () => rd({
    type: RS_POST_SPREAD_OBJ,
    payload: {
      uiBoardLayout: null,
      thisCurrentAdvancement: null,
      thisOrderType: 0,
      thisAskForCoastalZone: null,
      thisFakeUnits: [],
      thisForbidden: [],
      thisGameId: null,
      thisGameName: null,
      thisHighLight: null,
      thisOrders: [],
      thisOrdersNeeded: false,
      thisOrdersSubmitted: false,
      thisPassiveZone: null,
      thisPlayersRole: null,
      thisTempZone: null,
      thisTurnMode: 0,
      thisVariant: null,
      thisZoneInfo: null,
    },
  }), []);

  return (

    <div className={`gamefr${uiBoardLayout !== UI_STATE_BOARDVIEW_FULLMAP ? ' iscomm' : ''}${uiBoardLayout === UI_STATE_BOARDVIEW_DEFAULT ? ' isdef' : ''}`}>
      <Map variant={variant} gameName={gameName} />
      <GameControls />
    </div>

  );
};

export default Game;
