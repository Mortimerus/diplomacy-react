import { API_4_ENDPOINT_ALLOCATIONS } from '../../../../constants/paths/apiEndpoints';
import { API_URL_GAMES_4 } from '../../../../constants/paths/apiUrls';
import apiCall from '../base/apiCall';

const aC4allocationsPOST = async (rs, rd, gameId, username) => {
  const res = await apiCall(
    'POST',
    API_URL_GAMES_4,
    API_4_ENDPOINT_ALLOCATIONS,
    false,
    2,
    rs,
    rd,
    false,
    {
      game_id: gameId,
      // player_id: playerId,
      player_pseudo: username,
      pseudo: username,
      delete: 0,
    },
    false,
  );
  return res;
};

export default aC4allocationsPOST;
