import { initUIboardDefaultAuthView, initUIboardDefaultNonAuthView } from '../../../../../states/init/initUIboard';
import { RS_POST_SPREAD_OBJ } from '../../../../../states/selectors/sharedSelectors';

// in use?
const setLayout = (rs, rd) => {
  if (rs && rd) {
    const { isAuth } = rs;
    if (isAuth) {
      rd({ type: RS_POST_SPREAD_OBJ, palyload: initUIboardDefaultAuthView });
    } else {
      rd({ type: RS_POST_SPREAD_OBJ, palyload: initUIboardDefaultNonAuthView });
    }
  }
};

export default setLayout;
