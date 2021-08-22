import { API_3_ENDPOINT_PLAYER_IDENTIFIERS } from '../../../../constants/paths/apiEndpoints';
import { API_URL_PLAYERS_3 } from '../../../../constants/paths/apiUrls';
import apiCall from '../base/apiCall';

const aCa3playerIdentifiersPseudoGET = async (rs, rd, pseudo) => {
  const res = await apiCall(
    'GET',
    API_URL_PLAYERS_3,
    API_3_ENDPOINT_PLAYER_IDENTIFIERS,
    pseudo,
    0,
    rs,
    rd,
    `dataPlayerIdentifiers|${pseudo}`,
    false,
    false,
  );
  return res;
};

export default aCa3playerIdentifiersPseudoGET;
