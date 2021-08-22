import { API_4_ENDPOINT_GAME_ORDERS_SUBMITTED } from '../../../../constants/paths/apiEndpoints';
import { API_URL_GAMES_4 } from '../../../../constants/paths/apiUrls';
import apiCall from '../base/apiCall';

const aC4gameOrdersSubmittedGameIdGET = async (rs, rd, gameId) => {
  const res = await apiCall(
    'GET',
    API_URL_GAMES_4,
    API_4_ENDPOINT_GAME_ORDERS_SUBMITTED,
    gameId,
    2,
    rs,
    rd,
    `dataGameOrdersSubmitted|${gameId}`,
    false,
    false,

  );
  return res;
};

export default aC4gameOrdersSubmittedGameIdGET;
