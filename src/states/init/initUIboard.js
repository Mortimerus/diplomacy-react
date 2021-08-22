import { UI_STATE_BOARDVIEW_DEFAULT } from '../selectors/uiStateStelectors';

const initUIboard = {
  uiBoardLayout: UI_STATE_BOARDVIEW_DEFAULT,
};

export const initUIboardDefaultNonAuthView = {
  uiBoardLayout: UI_STATE_BOARDVIEW_DEFAULT,
  uiMenSiteNav: true,
};

export const initUIboardDefaultAuthView = {
  uiBoardLayout: UI_STATE_BOARDVIEW_DEFAULT,
  uiMenSiteNav: true,
};

export default initUIboard;
