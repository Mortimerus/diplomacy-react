import React, { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useRootDispatch, useRootState } from '../../../states/rootState';
import { RS_POST_SPREAD_OBJ } from '../../../states/selectors/sharedSelectors';
import { UI_STATE_BOARDVIEW_COMM, UI_STATE_BOARDVIEW_DEFAULT, UI_STATE_BOARDVIEW_FULLMAP } from '../../../states/selectors/uiStateStelectors';
import './boardLayout.css';
import GlobeIcon from '../../icons/globe/GlobeIcon';
import MessageIcon from '../../icons/message/MessageIcon';
import SplitIcon from '../../icons/globeMessage/SplitIcon';
import toggleFullScreen from '../../../theme/toggleFullScreen';
import HomeIcon from '../../icons/home/HomeIcon';
import useCurrentDim from '../../startUp/useCurrentDim';

const BoardLayout = () => {
  const rs = useRootState();
  const rd = useRootDispatch();
  const history = useHistory();
  const { push } = history;
  const { mapRef, uiBoardLayout } = rs;
  const [showSplit, setShowSplit] = useState(true);
  const dim = useCurrentDim();
  const { currentWidth, currentHeight } = dim;

  const onChangeLayout = (e) => {
    const layout = parseInt(e.target.value, 10);
    // full map
    if (layout === 0) {
      mapRef.classList.add('full');
      mapRef.classList.remove('default');
      mapRef.classList.remove('comm');
      rd({ type: RS_POST_SPREAD_OBJ, payload: { uiBoardLayout: UI_STATE_BOARDVIEW_FULLMAP } });
      toggleFullScreen(true);
    }
    // default / split
    if (layout === 1) {
      mapRef.classList.add('default');
      mapRef.classList.remove('full');
      mapRef.classList.remove('comm');
      toggleFullScreen(false);
      rd({
        type: RS_POST_SPREAD_OBJ,
        payload: {
          uiBoardLayout: UI_STATE_BOARDVIEW_DEFAULT,
          thisZoneInfo: null,
          boardMenGameInfo: false,
          boardMenGameMaster: false,
        },
      });
    }
    // communication mode
    if (layout === 2) {
      mapRef.classList.add('comm');
      mapRef.classList.remove('default');
      mapRef.classList.remove('full');
      toggleFullScreen(false);
      rd({
        type: RS_POST_SPREAD_OBJ,
        payload: {
          uiBoardLayout: UI_STATE_BOARDVIEW_COMM,
          thisZoneInfo: null,
          boardMenGameInfo: false,
          boardMenGameMaster: false,

          thisTurnMode: 0,
          thisHighlight: [],
        },
      });
    }
  };

  const onPushToMain = () => {
    toggleFullScreen(false);
    push('/');
  };
  const screenCssPixelRatio = (window.outerWidth - 8) / window.innerWidth;
  useEffect(() => {
    // DEV
    // see Game.jsx line67ff / boardLayout.css line41ff
    // https://stackoverflow.com/questions/1713771/how-to-detect-page-zoom-level-in-all-modern-browsers
    // const screenCssPixelRatio = (window.outerWidth - 8) / window.innerWidth;
    if (
      ((currentWidth > currentHeight)
      // && (uiBoardLayout !== UI_STATE_BOARDVIEW_COMM)
      && (currentWidth < 1400 / screenCssPixelRatio))
    ) {
      setShowSplit(false);
    } else if (currentWidth < 1400 / screenCssPixelRatio) {
      setShowSplit(false);
    } else {
      setShowSplit(true);
    }
  }, [currentHeight, currentWidth, uiBoardLayout, screenCssPixelRatio]);

  return (
    <div className={`brdlayoutfr ${uiBoardLayout === UI_STATE_BOARDVIEW_FULLMAP ? ' brdlayout-fxd' : ''}`}>
      {uiBoardLayout !== UI_STATE_BOARDVIEW_COMM ? <button className="brdlayout-fullmode-home" type="button" onClick={() => onPushToMain()}><HomeIcon /></button> : null}
      <button className={uiBoardLayout === UI_STATE_BOARDVIEW_COMM ? 'btn-tmode' : ''} type="button" value={2} onClick={(e) => onChangeLayout(e)}><MessageIcon /></button>
      {showSplit ? (
        <button className={`modedef${uiBoardLayout === UI_STATE_BOARDVIEW_DEFAULT ? ' btn-tmode' : ''}`} type="button" value={1} onClick={(e) => onChangeLayout(e)}><SplitIcon /></button>
      ) : null}
      {/* <button hidden={uiBoardLayout === UI_STATE_BOARDVIEW_FULLMAP}
      // type="button" value={0} onClick={(e) => onChangeLayout(e)}>{t('t_074')}</button> */}
      <button className={`btn-globe modefull${uiBoardLayout === UI_STATE_BOARDVIEW_FULLMAP ? ' btn-tmode' : ''}`} type="button" value={0} onClick={(e) => onChangeLayout(e)}><GlobeIcon /></button>
      {console.log(showSplit)}
    </div>
  );
};

export default BoardLayout;
