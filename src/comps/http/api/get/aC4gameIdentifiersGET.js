import { API_4_ENDPOINT_GAME_IDENTIFIERS } from '../../../../constants/paths/apiEndpoints';
import { API_URL_GAMES_4 } from '../../../../constants/paths/apiUrls';
import apiCall from '../base/apiCall';

const aC4gameIdentifiersGET = async (rs, rd, gameName) => {
  const res = await apiCall(
    'GET',
    API_URL_GAMES_4,
    API_4_ENDPOINT_GAME_IDENTIFIERS,
    gameName,
    0,
    rs,
    rd,
    `dataGameIdentifiers|${gameName}`,
    false,
    false,
  );
  return res;
};

export default aC4gameIdentifiersGET;
