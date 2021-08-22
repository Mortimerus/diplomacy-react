import { API_4_ENDPOINT_GAME_TRANSITIONS } from '../../../../constants/paths/apiEndpoints';
import { API_URL_GAMES_4 } from '../../../../constants/paths/apiUrls';
import toDataTransitions from '../../../converter/api/toDataTransitions';
import apiCall from '../base/apiCall';

const aCa4gameTransitionsGameIdCurrentAdvancementGET = async (rs,
  rd, gameId, currentAdvancement) => {
  const res = await apiCall(
    'GET',
    API_URL_GAMES_4,
    API_4_ENDPOINT_GAME_TRANSITIONS,
    `${gameId}/${currentAdvancement}`,
    0,
    rs,
    rd,
    `dataGameTransitions|${gameId}|${currentAdvancement}`,
    false,
    toDataTransitions,
  );
  return res;
};

export default aCa4gameTransitionsGameIdCurrentAdvancementGET;
