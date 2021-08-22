import { API_4_ENDPOINT_GAMES } from '../../../../constants/paths/apiEndpoints';
import { API_URL_GAMES_4 } from '../../../../constants/paths/apiUrls';
import toObjectEntries from '../../../converter/middle/toObjectEntries';
import apiCall from '../base/apiCall';

const aC4gamesGET = async (rs, rd) => {
  const res = await apiCall(
    'GET',
    API_URL_GAMES_4,
    API_4_ENDPOINT_GAMES,
    false,
    0,
    rs,
    rd,
    'dataGames',
    false,
    toObjectEntries,
  );
  return res;
};

export default aC4gamesGET;
