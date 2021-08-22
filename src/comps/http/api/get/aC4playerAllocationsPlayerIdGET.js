import { API_4_ENDPOINT_PLAYER_ALLOCATIONS } from '../../../../constants/paths/apiEndpoints';
import { API_URL_GAMES_4 } from '../../../../constants/paths/apiUrls';
import toObjectEntries from '../../../converter/middle/toObjectEntries';
import apiCall from '../base/apiCall';

const aC4playerAllocationsPlayerIdGET = async (rs, rd, playerId) => {
  const res = await apiCall(
    'GET',
    API_URL_GAMES_4,
    API_4_ENDPOINT_PLAYER_ALLOCATIONS,
    playerId,
    0,
    rs,
    rd,
    `dataPlayerAllocations|${playerId}`,
    false,
    toObjectEntries,
  );
  return res;
};

export default aC4playerAllocationsPlayerIdGET;
