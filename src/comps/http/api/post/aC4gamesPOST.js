import { API_4_ENDPOINT_GAMES } from '../../../../constants/paths/apiEndpoints';
import { API_URL_GAMES_4 } from '../../../../constants/paths/apiUrls';
import apiCall from '../base/apiCall';

const ac4gamesPOST = async (rs, rd, gameConfig) => {
  const res = await apiCall(
    'POST',
    API_URL_GAMES_4,
    API_4_ENDPOINT_GAMES,
    false,
    2,
    rs,
    rd,
    false,
    gameConfig,
    false,
  );
  return res;
};

export default ac4gamesPOST;
