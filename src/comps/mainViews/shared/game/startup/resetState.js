import { RS_POST_SPREAD_OBJ } from '../../../../../states/selectors/sharedSelectors';
import { UI_STATE_BOARDVIEW_DEFAULT } from '../../../../../states/selectors/uiStateStelectors';

// TODO: items not complete
const resetState = async (rd) => {
  rd({
    type: RS_POST_SPREAD_OBJ,
    payload: {
      ordClickedZone: null,
      thisGameId: null,
      thisCurrentAdvancement: null,
      thisGameName: null,
      thisVariant: null,
      thisTurnMode: 0,
      thisPlayersRole: null,
      thisCurrentState: null,
      thisOrdersNeeded: false,
      thisOrders: [],
      uiBoardLayout: UI_STATE_BOARDVIEW_DEFAULT,
    },
  });
};

export default resetState;
