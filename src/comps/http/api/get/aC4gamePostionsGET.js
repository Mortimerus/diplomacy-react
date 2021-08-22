import { API_4_ENDPOINT_GAME_POSITIONS } from '../../../../constants/paths/apiEndpoints';
import { API_URL_GAMES_4 } from '../../../../constants/paths/apiUrls';
import toDataGamePostion from '../../../converter/api/toDataGamePostions';
import apiCall from '../base/apiCall';

const aC4gamePositionsGameIdGET = async (rs, rd, gameId) => {
  const res = await apiCall(
    'GET',
    API_URL_GAMES_4,
    API_4_ENDPOINT_GAME_POSITIONS,
    gameId,
    0,
    rs,
    rd,
    `dataGamePositions|${gameId}`,
    false,
    toDataGamePostion,
  );
  return res;
};

export default aC4gamePositionsGameIdGET;
