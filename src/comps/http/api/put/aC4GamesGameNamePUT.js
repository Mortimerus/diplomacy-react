import { API_4_ENDPOINT_GAMES } from '../../../../constants/paths/apiEndpoints';
import { API_URL_GAMES_4 } from '../../../../constants/paths/apiUrls';
import apiCall from '../base/apiCall';

const aC4GameGameNamePUT = async (rs, rd, pseudo, name, state) => {
  const res = await apiCall(
    'PUT',
    API_URL_GAMES_4,
    API_4_ENDPOINT_GAMES,
    name,
    2,
    rs,
    rd,
    false,
    {
      current_state: state,
      pseudo,
      name,
    },
    false,
  );
  return res;
};

export default aC4GameGameNamePUT;
