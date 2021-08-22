import { API_4_ENDPOINT_GAMES } from '../../../../constants/paths/apiEndpoints';
import { API_URL_GAMES_4 } from '../../../../constants/paths/apiUrls';
import apiCall from '../base/apiCall';

const aC4gamesGameNameGET = async (rs, rd, gameName) => {
  const res = await apiCall(
    'GET',
    API_URL_GAMES_4,
    API_4_ENDPOINT_GAMES,
    gameName,
    0,
    rs,
    rd,
    `dataGames|${gameName}`,
    false,
    false,
  );
  return res;
};

export default aC4gamesGameNameGET;
