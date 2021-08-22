import { API_3_ENDPOINT_PLAYERS } from '../../../../constants/paths/apiEndpoints';
import { API_URL_PLAYERS_3 } from '../../../../constants/paths/apiUrls';
import toObjectEntries from '../../../converter/middle/toObjectEntries';
import apiCall from '../base/apiCall';

const aC3playersGET = async (rs, rd) => {
  const res = await apiCall(
    'GET',
    API_URL_PLAYERS_3,
    API_3_ENDPOINT_PLAYERS,
    false,
    0,
    rs,
    rd,
    'dataPlayers',
    false,
    toObjectEntries,
  );
  return res;
};

export default aC3playersGET;
