import { API_4_ENDPOINT_GAME_ALLOCATIONS } from '../../../../constants/paths/apiEndpoints';
import { API_URL_GAMES_4 } from '../../../../constants/paths/apiUrls';
import toObjectEntries from '../../../converter/middle/toObjectEntries';
import apiCall from '../base/apiCall';

const aCa4gameAllocationsGameIdGET = async (rs, rd, gameId) => {
  const res = await apiCall(
    'GET',
    API_URL_GAMES_4,
    API_4_ENDPOINT_GAME_ALLOCATIONS,
    gameId,
    0,
    rs,
    rd,
    `dataGameAllocations|${gameId}`,
    false,
    toObjectEntries,
  );
  return res;
};

export default aCa4gameAllocationsGameIdGET;
